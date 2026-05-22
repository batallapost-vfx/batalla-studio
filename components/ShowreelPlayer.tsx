"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

interface ShowreelPlayerProps {
  videoId: number;
}

export default function ShowreelPlayer({ videoId }: ShowreelPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new Player(iframeRef.current);
    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("ended", () => setIsPlaying(false));
    return () => { player.off("play"); player.off("pause"); player.off("ended"); };
  }, []);

  return (
    <div className="relative mx-auto" style={{ maxWidth: "80rem" }}>
      {/* Corner ornaments — se desvanecen al reproducir */}
      <span
        className="corner-ornament tl transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
        aria-hidden="true"
      />
      <span
        className="corner-ornament tr transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
        aria-hidden="true"
      />
      <span
        className="corner-ornament bl transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
        aria-hidden="true"
      />
      <span
        className="corner-ornament br transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0 : 1 }}
        aria-hidden="true"
      />

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
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?color=CD8641&title=0&byline=0&portrait=0&transparent=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Batalla Studio Showreel"
        />
      </div>
    </div>
  );
}
