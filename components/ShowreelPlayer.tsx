"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Player from "@vimeo/player";

export interface ShowreelItem {
  key: string;
  label: string;
  videoId: number;
  /** hash de privacidad de Vimeo (?h=...) — lo necesitan los videos no listados/privados para embeberse */
  hash?: string;
  thumbnail?: string;
}

interface ShowreelPlayerProps {
  reels: ShowreelItem[];
}

export default function ShowreelPlayer({ reels }: ShowreelPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = reels[activeIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // mientras no se tocó el video, hay una capa transparente encima del iframe:
  // así el mouse nunca "entra" al iframe de Vimeo y la rueda del mouse sigue
  // scrolleando la página en vez de quedar atrapada adentro del embed
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);
    playerRef.current = player;
    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("ended", () => setIsPlaying(false));

    // arranca solo al llegar a la sección (o al cambiar de reel) — el navegador exige
    // silenciarlo para permitir el autoplay, el visitante lo puede desmutear con los controles
    let hasAutoplayed = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoplayed) {
          hasAutoplayed = true;
          player.setMuted(true).finally(() => player.play().catch(() => {}));
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      player.off("play");
      player.off("pause");
      player.off("ended");
      observer.disconnect();
    };
  }, [active.videoId]);

  // "imán" de scroll: al llegar a la sección bajando, la centra y retiene la posición —
  // hacen falta unos cuantos scrolls más para poder seguir bajando. Se intercepta el wheel
  // directamente (capture, antes que Lenis) para poder frenar esos scrolls de verdad; un
  // enfoque basado en mirar la posición después de scrollear no alcanza a "retener" nada.
  useEffect(() => {
    // centra el bloque del video en sí (no la sección entera con el título) — si
    // centráramos la sección completa, al ser más alta que el viewport el video
    // termina cortado arriba o abajo
    const target = containerRef.current;
    if (!target) return;

    // una sola "pasada de rueda" dispara muchos eventos wheel seguidos (sobre todo con
    // trackpad) — hay que contar GESTOS de scroll completos (con una pausa entre medio),
    // no eventos sueltos, si no el conteo se consume entero en el mismo gesto inicial
    const REQUIRED_GESTURES = 2;
    const GESTURE_GAP_MS = 140;
    let armed = true;
    let locked = false;
    let completedGestures = 0;
    let gapTimer: ReturnType<typeof setTimeout> | null = null;

    function distanceToCenter() {
      const rect = target!.getBoundingClientRect();
      const targetCenter = rect.top + rect.height / 2;
      // el header fijo tapa una franja arriba — centramos en el espacio visible debajo de él,
      // no en el viewport completo, para que no corte el video
      const headerHeight = document.getElementById("site-header")?.getBoundingClientRect().height ?? 0;
      const visibleCenter = headerHeight + (window.innerHeight - headerHeight) / 2;
      return targetCenter - visibleCenter;
    }

    function scheduleGestureEnd() {
      if (gapTimer) clearTimeout(gapTimer);
      gapTimer = setTimeout(() => {
        gapTimer = null;
        completedGestures++;
        if (completedGestures >= REQUIRED_GESTURES) locked = false;
      }, GESTURE_GAP_MS);
    }

    function onWheel(e: WheelEvent) {
      const distance = distanceToCenter();
      const zone = window.innerHeight * 0.4;
      const within = Math.abs(distance) < zone;

      if (!within) {
        armed = true;
        locked = false;
        completedGestures = 0;
        if (gapTimer) {
          clearTimeout(gapTimer);
          gapTimer = null;
        }
        return;
      }

      if (locked) {
        if (e.deltaY < 0) {
          locked = false;
          if (gapTimer) {
            clearTimeout(gapTimer);
            gapTimer = null;
          }
          return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        scheduleGestureEnd();
        return;
      }

      if (armed && e.deltaY > 0) {
        e.preventDefault();
        e.stopImmediatePropagation();
        armed = false;
        locked = true;
        completedGestures = 0;
        window.__lenis?.scrollTo(window.scrollY + distance, { duration: 0.6 });
        scheduleGestureEnd();
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
      if (gapTimer) clearTimeout(gapTimer);
    };
  }, []);

  function selectReel(index: number) {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setHasInteracted(true);
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Video grande — marginado a la izquierda */}
        <div className="relative lg:flex-[3]" ref={containerRef}>
          {/* Corner ornaments — grandes y siempre visibles, recubriendo el reel */}
          <span className="corner-ornament corner-ornament-lg tl" aria-hidden="true" style={{ zIndex: 2 }} />
          <span className="corner-ornament corner-ornament-lg tr" aria-hidden="true" style={{ zIndex: 2 }} />
          <span className="corner-ornament corner-ornament-lg bl" aria-hidden="true" style={{ zIndex: 2 }} />
          <span className="corner-ornament corner-ornament-lg br" aria-hidden="true" style={{ zIndex: 2 }} />

          {/* Etiqueta del reel activo — centrada respecto al video, no a toda la fila */}
          <p className="text-center text-gold text-[0.6rem] uppercase tracking-[0.5em] mb-3">
            {active.label}
          </p>

          {/* Marco decorativo dorado — desaparece al reproducir */}
          <div
            className="transition-opacity duration-700"
            style={{ opacity: isPlaying ? 0 : 1 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #CD8641 0%, transparent 40%, transparent 60%, #CD8641 100%)",
                opacity: 0.45,
                zIndex: 1,
              }}
            />
          </div>

          {/* Iframe al 100% de opacidad siempre */}
          <div className="video-container border border-gold/15">
          <iframe
            key={active.videoId}
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${active.videoId}?color=CD8641&title=0&byline=0&portrait=0&transparent=0&muted=1${active.hash ? `&h=${active.hash}` : ""}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={`Batalla Studio — ${active.label}`}
          />
          {!hasInteracted && (
            <button
              type="button"
              aria-label="Activar controles del reel"
              onClick={() => {
                setHasInteracted(true);
                playerRef.current?.play().catch(() => {});
              }}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 2, background: "transparent", cursor: "none" }}
            />
          )}
        </div>
      </div>

        {/* Columna de miniaturas — las 5, incluyendo GENERAL — completa el espacio a la derecha */}
        <div className="grid grid-cols-5 gap-3 lg:flex lg:flex-col lg:flex-1 lg:gap-4">
          {reels.map((reel) => (
            <ReelThumb
              key={reel.key}
              reel={reel}
              active={active.key === reel.key}
              onClick={() => selectReel(reels.indexOf(reel))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReelThumb({ reel, active, onClick }: { reel: ShowreelItem; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-video w-full overflow-hidden border transition-colors duration-300 lg:flex-1 lg:aspect-auto"
      style={{ borderColor: active ? "#CD8641" : "rgba(205,134,65,0.25)" }}
      aria-pressed={active}
    >
      {reel.thumbnail ? (
        <Image
          src={reel.thumbnail}
          alt={reel.label}
          fill
          sizes="(min-width: 1024px) 20vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-dark-brown" />
      )}
      {/* se oscurece en reposo y se prende al pasar el cursor o si está activa */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          active ? "opacity-10" : "opacity-70 group-hover:opacity-25"
        }`}
        style={{ background: "#1a1008" }}
      />
      <div className="absolute inset-0 flex items-center justify-center px-2">
        <p
          className={`text-center text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
            active ? "text-gold" : "text-cream/70 group-hover:text-cream group-hover:tracking-[0.25em]"
          }`}
        >
          {reel.label}
        </p>
      </div>
    </button>
  );
}
