"use client";

import type { VimeoVideo } from "@/lib/vimeo";

// Reproductor(es) de un proyecto de Vimeo. Si el proyecto tiene varias piezas (2 o 3 videos),
// se muestran todas apiladas en un panel con scroll; solo la primera arranca sola.
export default function VimeoEmbeds({ video, colorHex }: { video: VimeoVideo; colorHex: string }) {
  const pieces = video.pieces?.length ? video.pieces : [{ id: video.id, hash: video.hash }];
  const multiple = pieces.length > 1;

  const embeds = pieces.map((piece, i) => (
    <div key={piece.id} className="video-container border border-gold/20">
      <iframe
        src={`https://player.vimeo.com/video/${piece.id}?${i === 0 ? "autoplay=1&" : ""}color=${colorHex}&title=0&byline=0&portrait=0&transparent=0${piece.hash ? `&h=${piece.hash}` : ""}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={multiple ? `${video.title} — ${i + 1}/${pieces.length}` : video.title}
      />
    </div>
  ));

  if (!multiple) {
    return (
      <div className="relative">
        <span className="corner-ornament tl" aria-hidden="true" />
        <span className="corner-ornament tr" aria-hidden="true" />
        <span className="corner-ornament bl" aria-hidden="true" />
        <span className="corner-ornament br" aria-hidden="true" />
        {embeds[0]}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-3 max-h-[78vh] overflow-y-auto overscroll-contain"
      data-lenis-prevent
      // el scroll suave (Lenis) intercepta el wheel a nivel window antes que llegue acá —
      // lo cortamos y movemos el scroll de este panel a mano
      onWheel={(e) => {
        e.stopPropagation();
        e.currentTarget.scrollTop += e.deltaY;
      }}
    >
      {embeds}
    </div>
  );
}
