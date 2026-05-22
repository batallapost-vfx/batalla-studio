"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { VimeoVideo } from "@/lib/vimeo";

interface PortfolioGridProps {
  videos: VimeoVideo[];
}

export default function PortfolioGrid({ videos }: PortfolioGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<VimeoVideo | null>(null);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

  return (
    <section id="portfolio" className="py-20">
      {/* Section header */}
      <div className="text-center mb-14 px-6 md:px-12">
        <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
          — Selected Work —
        </p>
        <h2 className="font-playfair font-bold text-cream text-4xl md:text-5xl tracking-wide">
          Portfolio
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-12 h-px bg-gold opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold opacity-70" />
          <div className="w-12 h-px bg-gold opacity-40" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {videos.length === 0 && (
        <p className="text-center text-cream/60 text-sm mt-16 uppercase tracking-[0.3em] px-6">
          No works to show yet.
        </p>
      )}

      {/* Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}

/* ─── Video Card ─── */
function VideoCard({
  video,
  onClick,
}: {
  video: VimeoVideo;
  onClick: () => void;
}) {
  const thumbnail =
    video.thumbnail_large ||
    video.thumbnail_medium ||
    video.thumbnail_small ||
    "";

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
function VideoModal({
  video,
  onClose,
}: {
  video: VimeoVideo;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

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
          <span>Close</span>
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
              src={`https://player.vimeo.com/video/${video.id}?autoplay=1&color=CD8641&title=0&byline=0&portrait=0&transparent=0`}
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
