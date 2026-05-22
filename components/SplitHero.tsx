"use client";

import { useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { Button as RainbowButton } from "@/components/ui/rainbow-borders-button";

export default function SplitHero() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const [revealed, setRevealed] = useState(false);

  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("intro-played")) {
      const t = setTimeout(() => setRevealed(true), 120);
      return () => clearTimeout(t);
    }
    const onDone = () => setRevealed(true);
    window.addEventListener("intro:done", onDone);
    return () => window.removeEventListener("intro:done", onDone);
  }, []);

  const leftWidth =
    hovered === "right" ? "35%" : hovered === "left" ? "65%" : "50%";
  const rightWidth =
    hovered === "left" ? "35%" : hovered === "right" ? "65%" : "50%";
  const dividerLeft =
    hovered === "right" ? "35%" : hovered === "left" ? "65%" : "50%";

  function handleEnter(side: "left" | "right") {
    setHovered(side);
    const ref = side === "left" ? leftVideoRef : rightVideoRef;
    ref.current?.play();
    window.dispatchEvent(new CustomEvent("hero:hover", { detail: { active: true } }));
  }

  function handleLeave(side: "left" | "right") {
    setHovered(null);
    const ref = side === "left" ? leftVideoRef : rightVideoRef;
    ref.current?.pause();
    window.dispatchEvent(new CustomEvent("hero:hover", { detail: { active: false } }));
  }

  return (
    <section
      id="hero"
      className={`relative flex h-screen overflow-hidden ${revealed ? "hero-revealed" : ""}`}
      style={{ minHeight: "100svh" }}
    >
      {/* ── LEFT PANEL: CGI Films ── */}
      <TransitionLink
        href="/cgi-films"
        className="relative overflow-hidden cursor-pointer block"
        style={{
          width: leftWidth,
          transition: "width 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
        }}
        onMouseEnter={() => handleEnter("left")}
        onMouseLeave={() => handleLeave("left")}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
          e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >

        {/* pointer-events-none en video y overlays para que el click llegue al Link */}
        <video
          ref={leftVideoRef}
          src="/videos/cgi-films.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: hovered === "left" ? 1 : 0.50,
            transition: "opacity 0.65s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 35% 50%, rgba(61,26,10,0.75) 0%, rgba(13,8,4,0.92) 100%)",
            opacity: hovered === "left" ? 0 : 1,
            transition: "opacity 0.65s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(13,8,4,0.75) 0%, rgba(13,8,4,0.3) 50%, transparent 100%)",
            opacity: hovered === "left" ? 1 : 0,
            transition: "opacity 0.65s ease",
          }}
        />

        <div
          className="relative z-10 flex flex-col justify-center h-full px-12 md:px-20 pt-20 pointer-events-none"
          style={{
            opacity: hovered === "right" ? 0.38 : 1,
            transition: "opacity 0.45s ease",
          }}
        >
          <span
            className="hero-stagger text-[0.6rem] uppercase tracking-[0.5em] mb-8 block"
            style={{ color: "rgba(247, 225, 177, 0.6)", "--reveal-delay": "0.30s" } as React.CSSProperties}
          >
            Full CGI Commercial
          </span>
          <h1
            className="hero-stagger font-playfair font-bold text-cream leading-[0.9] mb-5 text-[clamp(3.5rem,8vw,7rem)]"
            style={{ "--reveal-delay": "0.42s" } as React.CSSProperties}
          >
            CREATIVE
            <br />
            3D &amp; IA
          </h1>
          <div
            className="hero-stagger w-14 h-px mb-5"
            style={{ background: "#F7E1B1", "--reveal-delay": "0.62s" } as React.CSSProperties}
          />
          <p
            className="hero-stagger text-[0.6rem] uppercase tracking-[0.45em] mb-5"
            style={{ color: "#F7E1B1", "--reveal-delay": "0.70s" } as React.CSSProperties}
          >
            100% Digital Commercials
          </p>
          <p
            className="hero-stagger text-gold/70 text-[0.55rem] uppercase tracking-[0.4em] mb-2"
            style={{ "--reveal-delay": "0.80s" } as React.CSSProperties}
          >
            (EN)
          </p>
          <p
            className="hero-stagger text-cream/65 text-sm leading-relaxed max-w-xs mb-4 font-light"
            style={{ "--reveal-delay": "0.88s" } as React.CSSProperties}
          >
            We make 100% digital commercials. 3D, AI, and — above all — the judgment to use them right. Everything that used to need a shoot, we solve right here.
          </p>
          <div
            className="hero-stagger flex items-center gap-1.5 max-w-xs mb-4"
            style={{ "--reveal-delay": "1.00s" } as React.CSSProperties}
          >
            <div className="w-5 h-px bg-gold/50" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="w-2 h-2 rotate-45 border border-gold/60" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="flex-1 h-px bg-gold/50" />
          </div>
          <p
            className="hero-stagger text-gold/70 text-[0.55rem] uppercase tracking-[0.4em] mb-2"
            style={{ "--reveal-delay": "1.10s" } as React.CSSProperties}
          >
            (ES)
          </p>
          <p
            className="hero-stagger text-cream/65 text-sm leading-relaxed max-w-xs mb-10 font-light"
            style={{ "--reveal-delay": "1.18s" } as React.CSSProperties}
          >
            Hacemos comerciales 100% digitales. 3D, IA y, sobre todo, criterio para usarlos. Todo lo que antes pedía un rodaje, hoy lo resolvemos acá.
          </p>
          <span
            className="hero-stagger"
            style={{ "--reveal-delay": "1.35s" } as React.CSSProperties}
          >
            <RainbowButton label="Ver proyectos" isActive={hovered === "left"} style={{ pointerEvents: "all" }} />
          </span>
        </div>
      </TransitionLink>

      {/* ── CENTER DIVIDER ── */}
      <div
        className="hero-stagger-divider absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{
          left: dividerLeft,
          transform: "translateX(-50%)",
          transition: "left 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "2px",
          "--reveal-delay": "0.20s",
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #CD8641 20%, #CD8641 80%, transparent 100%)",
            opacity: 0.45,
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-6 h-px bg-gold opacity-40" />
          <div className="w-1 h-1 rounded-full bg-gold opacity-60" />
          <div
            className="w-3.5 h-3.5 rotate-45 border border-gold bg-studio-bg"
            style={{ opacity: 0.85 }}
          />
          <div className="w-1 h-1 rounded-full bg-gold opacity-60" />
          <div className="w-6 h-px bg-gold opacity-40" />
        </div>
      </div>

      {/* ── RIGHT PANEL: VFX & Post ── */}
      <TransitionLink
        href="/vfx-post"
        className="relative overflow-hidden cursor-pointer block ml-auto"
        style={{
          width: rightWidth,
          transition: "width 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          flexShrink: 0,
        }}
        onMouseEnter={() => handleEnter("right")}
        onMouseLeave={() => handleLeave("right")}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
          e.currentTarget.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >
        <video
          ref={rightVideoRef}
          src="/videos/vfx-post.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: hovered === "right" ? 1 : 0.50,
            transition: "opacity 0.65s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 65% 50%, rgba(14,34,32,0.75) 0%, rgba(10,12,8,0.92) 100%)",
            opacity: hovered === "right" ? 0 : 1,
            transition: "opacity 0.65s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(13,8,4,0.75) 0%, rgba(13,8,4,0.3) 50%, transparent 100%)",
            opacity: hovered === "right" ? 1 : 0,
            transition: "opacity 0.65s ease",
          }}
        />

        <div
          className="relative z-10 flex flex-col justify-center items-end h-full px-12 md:px-20 pt-20 pointer-events-none"
          style={{
            opacity: hovered === "left" ? 0.38 : 1,
            transition: "opacity 0.45s ease",
          }}
        >
          <span
            className="hero-stagger text-gold/60 text-[0.6rem] uppercase tracking-[0.5em] mb-8 block"
            style={{ "--reveal-delay": "0.38s" } as React.CSSProperties}
          >
            Film · Commercial · Digital
          </span>
          <h1
            className="hero-stagger font-playfair font-bold text-cream leading-[0.9] mb-5 text-right text-[clamp(3.5rem,8vw,7rem)]"
            style={{ "--reveal-delay": "0.50s" } as React.CSSProperties}
          >
            VFX &amp;
            <br />
            POST
          </h1>
          <div
            className="hero-stagger w-14 h-px bg-gold mb-5"
            style={{ "--reveal-delay": "0.70s" } as React.CSSProperties}
          />
          <p
            className="hero-stagger text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-5"
            style={{ "--reveal-delay": "0.78s" } as React.CSSProperties}
          >
            Visual Effects &amp; Finishing
          </p>
          <p
            className="hero-stagger text-gold/70 text-[0.55rem] uppercase tracking-[0.4em] mb-2 text-right"
            style={{ "--reveal-delay": "0.88s" } as React.CSSProperties}
          >
            (EN)
          </p>
          <p
            className="hero-stagger text-cream/65 text-sm leading-relaxed max-w-xs mb-4 text-right font-light"
            style={{ "--reveal-delay": "0.96s" } as React.CSSProperties}
          >
            Post-production, VFX and color for film and advertising. 15 years of experience and on-time delivery.
          </p>
          <div
            className="hero-stagger flex items-center gap-1.5 w-full max-w-xs mb-4"
            style={{ "--reveal-delay": "1.08s" } as React.CSSProperties}
          >
            <div className="w-5 h-px bg-gold/50" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="w-2 h-2 rotate-45 border border-gold/60" />
            <div className="w-1 h-1 rounded-full bg-gold/60" />
            <div className="flex-1 h-px bg-gold/50" />
          </div>
          <p
            className="hero-stagger text-gold/70 text-[0.55rem] uppercase tracking-[0.4em] mb-2 text-right"
            style={{ "--reveal-delay": "1.18s" } as React.CSSProperties}
          >
            (ES)
          </p>
          <p
            className="hero-stagger text-cream/65 text-sm leading-relaxed max-w-xs mb-10 text-right font-light"
            style={{ "--reveal-delay": "1.26s" } as React.CSSProperties}
          >
            Postproducción, VFX y color para cine y publicidad. 15 años de experiencia y entregas a tiempo.
          </p>
          <span
            className="hero-stagger"
            style={{ "--reveal-delay": "1.43s" } as React.CSSProperties}
          >
            <RainbowButton label="Ver proyectos" isActive={hovered === "right"} style={{ pointerEvents: "all" }} />
          </span>
        </div>
      </TransitionLink>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div
          className="hero-stagger flex flex-col items-center gap-2"
          style={{ "--reveal-delay": "1.55s" } as React.CSSProperties}
        >
          <span className="text-cream/50 text-[0.55rem] uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-10 bg-gold/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
