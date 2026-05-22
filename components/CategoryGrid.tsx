"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VimeoVideo } from "@/lib/vimeo";

interface CategoryGridProps {
  videos: VimeoVideo[];
  accentColor: "gold" | "teal";
}

export default function CategoryGrid({ videos, accentColor }: CategoryGridProps) {
  const [selected, setSelected] = useState<VimeoVideo | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const accent = accentColor === "gold" ? "#CD8641" : "#769D8D";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {videos.map((video) => {
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
      {selected && (
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
