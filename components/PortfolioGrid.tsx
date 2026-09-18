"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { VimeoVideo, ProjectCategory } from "@/lib/vimeo";

export interface PortfolioVideo extends VimeoVideo {
  category: ProjectCategory;
}

interface PortfolioGridProps {
  videos: PortfolioVideo[];
}

type FilterOption = "ALL ITEMS" | ProjectCategory;
type OrderOption = "Relevancia" | "Fecha" | "Nombre";

const FILTERS: FilterOption[] = ["ALL ITEMS", "3D", "IA", "POST"];
const ORDER_OPTIONS: OrderOption[] = ["Relevancia", "Fecha", "Nombre"];

const ACCENTS: Record<ProjectCategory, string> = {
  "3D": "#CD8641",
  IA: "#B65939",
  POST: "#769D8D",
};

function accentFor(category: ProjectCategory) {
  return ACCENTS[category];
}

export default function PortfolioGrid({ videos }: PortfolioGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [filter, setFilter] = useState<FilterOption>("ALL ITEMS");
  const [orderBy, setOrderBy] = useState<OrderOption>("Relevancia");

  const visibleVideos = useMemo(() => {
    const base = filter === "ALL ITEMS" ? videos : videos.filter((v) => v.category === filter);
    if (orderBy === "Relevancia") return base;
    const sorted = [...base];
    if (orderBy === "Fecha") {
      sorted.sort((a, b) => {
        const da = a.upload_date ? new Date(a.upload_date).getTime() : -Infinity;
        const db = b.upload_date ? new Date(b.upload_date).getTime() : -Infinity;
        return db - da;
      });
    } else if (orderBy === "Nombre") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
    }
    return sorted;
  }, [videos, filter, orderBy]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  /* ESC to close */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // el hero de la home dispara este evento al clickear 3D/IA/POST, para aplicar el filtro acá
  useEffect(() => {
    const onSetFilter = (e: Event) => {
      const category = (e as CustomEvent<{ category?: ProjectCategory }>).detail?.category;
      if (category) setFilter(category);
    };
    window.addEventListener("trabajos:filter", onSetFilter as EventListener);
    return () => window.removeEventListener("trabajos:filter", onSetFilter as EventListener);
  }, []);

  return (
    <section id="portfolio" className="py-[10vh] px-[10%] scroll-mt-24">
      {/* Filtros + orden */}
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                  active
                    ? "border-gold text-gold"
                    : "border-gold/20 text-cream/50 hover:text-cream hover:border-gold/50"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3">
          <span className="text-[0.55rem] uppercase tracking-[0.35em] text-cream/40">Order by</span>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as OrderOption)}
            className="bg-studio-bg border border-gold/20 text-cream/80 text-[0.6rem] uppercase tracking-[0.3em] px-3 py-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold hover:border-gold/50 transition-colors duration-300"
          >
            {ORDER_OPTIONS.map((o) => (
              <option key={o} value={o} className="bg-studio-bg text-cream">
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {visibleVideos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
        ))}
      </div>

      {visibleVideos.length === 0 && (
        <p className="text-center text-cream/60 text-sm mt-16 uppercase tracking-[0.3em] px-6">
          No works to show yet.
        </p>
      )}

      {/* Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
}

/* ─── Video Card ─── */
function VideoCard({
  video,
  onClick,
}: {
  video: PortfolioVideo;
  onClick: () => void;
}) {
  const thumbnail =
    video.thumbnail_large ||
    video.thumbnail_medium ||
    video.thumbnail_small ||
    "";
  const accent = accentFor(video.category);

  return (
    <button
      onClick={onClick}
      aria-label={`Play ${video.title}`}
      className="group relative overflow-hidden bg-dark-brown aspect-video w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-studio-bg"
    >
      {/* Thumbnail */}
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-dark-brown flex items-center justify-center">
          <span className="text-gold/30 font-playfair text-2xl font-bold">B</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.3) 50%, transparent 100%)",
          opacity: 0.85,
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-studio-bg/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Categoría — visible siempre, esquina inferior izq */}
      <p
        className="absolute bottom-3 left-4 text-[0.55rem] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: accent }}
      >
        {video.category}
      </p>

      {/* Title — centrado, visible solo en hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6">
        <p className="text-cream font-playfair font-medium leading-snug text-center line-clamp-3" style={{ fontSize: "1.1rem" }}>
          {video.title}
        </p>
      </div>
    </button>
  );
}

/* ─── Video Modal ─── */
export function VideoModal({
  video,
  onClose,
}: {
  video: PortfolioVideo;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const accent = accentFor(video.category);

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => { lastFocused.current?.focus?.(); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = document.querySelectorAll<HTMLElement>(
        '[data-modal-root] button, [data-modal-root] a, [data-modal-root] iframe'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (video.provider === "behance") {
    // Behance bloquea embeber la página completa del proyecto — reconstruimos la galería
    // leyendo los módulos reales (imagen/texto/video) en cada visita. Columna angosta de
    // punta a punta, como en behance.net
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        data-modal-root
        className="fixed inset-0 z-[90] flex justify-center bg-studio-bg/92 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
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
          style={{ backgroundColor: video.behanceBackground || "#1a1008" }}
          data-lenis-prevent
          onWheel={(e) => {
            e.stopPropagation();
            e.currentTarget.scrollTop += e.deltaY;
          }}
        >
          {video.behanceModules?.length ? (
            video.behanceModules.map((mod, i) => (
              <div key={i}>
                {i > 0 && <div style={{ height: video.behanceSpacerHeight ?? 60 }} />}
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
                      color: video.behanceTextColor || "#F7E1B1",
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
                      title={`${video.title} — video`}
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
            style={{ color: video.behanceTextColor || "#F7E1B1" }}
          >
            <div>
              <h3 id="portfolio-modal-title" className="font-playfair text-lg font-medium">
                {video.title}
              </h3>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] mt-1" style={{ color: accent }}>
                {video.category}
              </p>
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 hover:text-gold text-[0.55rem] uppercase tracking-[0.3em] transition-all mt-1 shrink-0"
            >
              Behance ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      data-modal-root
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-studio-bg/92 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-[72vw] animate-modal-in">
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute -top-10 right-0 text-cream/70 hover:text-gold transition-colors duration-200 text-[0.6rem] uppercase tracking-[0.35em] flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          <span>Cerrar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Corner ornaments */}
        <div className="relative">
          <span className="corner-ornament tl" aria-hidden="true" />
          <span className="corner-ornament tr" aria-hidden="true" />
          <span className="corner-ornament bl" aria-hidden="true" />
          <span className="corner-ornament br" aria-hidden="true" />

          <div className="video-container border border-gold/20">
            <iframe
              src={`https://player.vimeo.com/video/${video.id}?autoplay=1&color=${accent.replace("#", "")}&title=0&byline=0&portrait=0&transparent=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between mt-4 px-1">
          <div>
            <h3 id="portfolio-modal-title" className="font-playfair text-cream text-lg font-medium">
              {video.title}
            </h3>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] mt-1" style={{ color: accent }}>
              {video.category}
            </p>
          </div>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/60 hover:text-gold text-[0.55rem] uppercase tracking-[0.3em] transition-colors mt-1 shrink-0"
          >
            Vimeo ↗
          </a>
        </div>
      </div>
    </div>
  );
}
