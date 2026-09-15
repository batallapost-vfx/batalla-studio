"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { VimeoVideo } from "@/lib/vimeo";

type OrderOption = "Relevancia" | "Fecha" | "Nombre";
const ORDER_OPTIONS: OrderOption[] = ["Relevancia", "Fecha", "Nombre"];

interface CategoryGridProps {
  videos: VimeoVideo[];
  accentColor: "gold" | "teal";
}

export default function CategoryGrid({ videos, accentColor }: CategoryGridProps) {
  const [selected, setSelected] = useState<VimeoVideo | null>(null);
  const [orderBy, setOrderBy] = useState<OrderOption>("Relevancia");
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const accent = accentColor === "gold" ? "#CD8641" : "#769D8D";

  const orderedVideos = useMemo(() => {
    if (orderBy === "Relevancia") return videos;
    const sorted = [...videos];
    if (orderBy === "Fecha") {
      sorted.sort((a, b) => {
        const da = a.upload_date ? new Date(a.upload_date).getTime() : -Infinity;
        const db = b.upload_date ? new Date(b.upload_date).getTime() : -Infinity;
        return db - da;
      });
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
    }
    return sorted;
  }, [videos, orderBy]);

  useEffect(() => {
    if (selected) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selected) return;
      if (e.key === "Escape") setSelected(null);
      if (e.key === "Tab") {
        const focusables = document.querySelectorAll<HTMLElement>(
          '[data-modal-root] button, [data-modal-root] a, [data-modal-root] iframe'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  if (videos.length === 0) {
    return (
      <section className="pb-24 flex flex-col items-center justify-center text-center px-8 py-24">
        <p className="text-[0.6rem] uppercase tracking-[0.4em] mb-4" style={{ color: accent }}>— Soon —</p>
        <p className="text-cream/70 text-sm max-w-sm leading-relaxed mb-8 font-light">
          Estamos actualizando esta categoría. Mientras tanto, escribinos para ver material bajo NDA.
        </p>
        <a
          href="mailto:fede@batallapost.com"
          className="inline-flex items-center gap-3 px-6 py-3 border border-gold/40 text-gold text-[0.6rem] uppercase tracking-[0.35em] hover:bg-gold hover:text-studio-bg transition-all duration-300"
        >
          Escribir al estudio
        </a>
      </section>
    );
  }

  return (
    <section className="pb-24">
      <div className="flex justify-end px-6 md:px-12 mb-8">
        <label className="flex items-center gap-3">
          <span className="text-[0.55rem] uppercase tracking-[0.35em] text-cream/40">Order by</span>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as OrderOption)}
            className="bg-studio-bg border border-gold/20 text-cream/80 text-[0.6rem] uppercase tracking-[0.3em] px-3 py-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold transition-colors duration-300"
            style={{ borderColor: `${accent}33` } as React.CSSProperties}
          >
            {ORDER_OPTIONS.map((o) => (
              <option key={o} value={o} className="bg-studio-bg text-cream">
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {orderedVideos.map((video) => {
          const thumb = video.thumbnail_large || video.thumbnail_medium || "";
          return (
            <button
              key={video.id}
              onClick={() => setSelected(video)}
              aria-label={`Play ${video.title}`}
              className="group relative overflow-hidden bg-dark-brown aspect-video w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-studio-bg"
              style={{ "--tw-ring-color": accent } as React.CSSProperties}
            >
              {thumb ? (
                <Image
                  src={thumb}
                  alt={video.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-playfair text-3xl font-bold" style={{ color: accent, opacity: 0.3 }}>B</span>
                </div>
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.2) 60%, transparent 100%)",
                }}
              />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-studio-bg/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Title — centrado, visible solo en hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6">
                <p className="text-cream font-playfair font-medium leading-snug text-center line-clamp-3" style={{ fontSize: "1.1rem" }}>
                  {video.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selected && selected.provider === "behance" ? (
        // Behance no permite embeber la página completa del proyecto (bloquea el iframe) —
        // reconstruimos la galería leyendo los módulos reales (imagen/texto/video) del proyecto
        // en cada visita (ver lib/behance.ts). Columna angosta de punta a punta, como en behance.net
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          data-modal-root
          className="fixed inset-0 z-[90] flex justify-center bg-studio-bg/92 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <button
            ref={closeBtnRef}
            onClick={() => setSelected(null)}
            aria-label="Cerrar modal"
            className="fixed top-4 right-4 md:top-6 md:right-6 z-20 bg-studio-bg/70 backdrop-blur-sm px-3 py-2 text-cream/80 hover:text-gold transition-colors duration-200 text-[0.6rem] uppercase tracking-[0.35em] flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span>Cerrar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-full sm:w-[55vw] max-w-4xl h-full overflow-y-auto overscroll-contain animate-modal-in"
            style={{ backgroundColor: selected.behanceBackground || "#1a1008" }}
            data-lenis-prevent
            // el scroll suave (Lenis) intercepta el wheel a nivel window antes que
            // llegue acá — lo cortamos y movemos el scroll de este panel a mano
            onWheel={(e) => {
              e.stopPropagation();
              e.currentTarget.scrollTop += e.deltaY;
            }}
          >
            {selected.behanceModules?.length ? (
              selected.behanceModules.map((mod, i) => (
                <div key={i}>
                  {i > 0 && <div style={{ height: selected.behanceSpacerHeight ?? 60 }} />}
                  {mod.type === "image" && (
                    <Image
                      src={mod.src}
                      alt={mod.alt}
                      width={mod.width}
                      height={mod.height}
                      sizes="36rem"
                      className="w-full h-auto block"
                      unoptimized
                    />
                  )}
                  {mod.type === "text" && (
                    <div
                      className="px-6 md:px-10 text-sm leading-relaxed font-light [&_a]:text-gold [&_a]:underline [&_p]:mb-3 [&_strong]:font-medium"
                      style={{
                        textAlign: (mod.alignment as React.CSSProperties["textAlign"]) || "left",
                        color: selected.behanceTextColor || "#F7E1B1",
                      }}
                      dangerouslySetInnerHTML={{ __html: mod.html }}
                    />
                  )}
                  {mod.type === "imageRow" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                      {mod.images.map((img, j) => (
                        <Image
                          key={j}
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes="18rem"
                          className="w-full h-full object-cover block"
                          unoptimized
                        />
                      ))}
                    </div>
                  )}
                  {mod.type === "video" && (
                    <div className="video-container">
                      <iframe
                        src={mod.embedSrc}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${selected.title} — video`}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-cream/60 text-sm p-10 text-center font-light">
                No se pudo cargar el proyecto de Behance en este momento.
              </p>
            )}
            <div
              className="flex items-start justify-between px-6 md:px-10 py-8"
              style={{ color: selected.behanceTextColor || "#F7E1B1" }}
            >
              <div>
                <h3 id="video-modal-title" className="font-playfair text-lg font-medium">{selected.title}</h3>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] mt-1" style={{ color: accent }}>
                  {accentColor === "gold" ? "CGI Films" : "VFX & Post"}
                </p>
              </div>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 hover:text-gold text-[0.55rem] uppercase tracking-[0.3em] transition-all mt-1 shrink-0"
              >
                Behance ↗
              </a>
            </div>
          </div>
        </div>
      ) : selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          data-modal-root
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="absolute inset-0 bg-studio-bg/92 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 w-full max-w-[72vw] animate-modal-in">
            <button
              ref={closeBtnRef}
              onClick={() => setSelected(null)}
              aria-label="Cerrar modal"
              className="absolute -top-10 right-0 text-cream/70 hover:text-gold transition-colors duration-200 text-[0.6rem] uppercase tracking-[0.35em] flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span>Cerrar</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative">
              <span className="corner-ornament tl" aria-hidden="true" />
              <span className="corner-ornament tr" aria-hidden="true" />
              <span className="corner-ornament bl" aria-hidden="true" />
              <span className="corner-ornament br" aria-hidden="true" />
              <div className="video-container border border-gold/20">
                <iframe
                  src={`https://player.vimeo.com/video/${selected.id}?autoplay=1&color=${accentColor === "gold" ? "CD8641" : "769D8D"}&title=0&byline=0&portrait=0&transparent=0`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={selected.title}
                />
              </div>
            </div>
            <div className="flex items-start justify-between mt-4 px-1">
              <div>
                <h3 id="video-modal-title" className="font-playfair text-cream text-lg font-medium">{selected.title}</h3>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] mt-1" style={{ color: accent }}>
                  {accentColor === "gold" ? "CGI Films" : "VFX & Post"}
                </p>
              </div>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold text-[0.55rem] uppercase tracking-[0.3em] transition-colors mt-1 shrink-0"
              >
                Vimeo ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
