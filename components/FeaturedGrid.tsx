"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoModal, type PortfolioVideo } from "@/components/PortfolioGrid";

interface FeaturedGridProps {
  videos: PortfolioVideo[];
}

// los "Selected Works" del sheet del estudio (6), 2 columnas x 3 filas
export default function FeaturedGrid({ videos }: FeaturedGridProps) {
  const [selected, setSelected] = useState<PortfolioVideo | null>(null);
  const featured = videos.filter((v) => v.featured).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="py-20">
      <div className="text-center mb-20 px-6 md:px-12">
        <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
          — Our —
        </p>
        <h2 className="font-playfair font-bold text-cream text-4xl md:text-5xl tracking-wide">
          SELECTED WORKS
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-12 h-px bg-gold opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold opacity-70" />
          <div className="w-12 h-px bg-gold opacity-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {featured.map((video) => {
          const thumb = video.thumbnail_large || video.thumbnail_medium || video.thumbnail_small || "";
          return (
            <button
              key={video.id}
              onClick={() => setSelected(video)}
              aria-label={`Play ${video.title}`}
              className="group relative overflow-hidden bg-dark-brown aspect-video w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-studio-bg"
            >
              {thumb ? (
                <Image
                  src={thumb}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gold/30 font-playfair text-3xl font-bold">B</span>
                </div>
              )}

              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(26,16,8,0.95) 0%, rgba(26,16,8,0.2) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 bg-studio-bg/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6">
                <p className="text-cream font-playfair font-medium leading-snug text-center line-clamp-3 text-xl md:text-2xl">
                  {video.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
