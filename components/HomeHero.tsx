"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import type { ProjectCategory } from "@/lib/vimeo";

const CATEGORIES: ProjectCategory[] = ["3D", "IA", "VFX"];

// todavía no hay un reel propio de IA — por ahora reusa el de 3D (ver conversación con el estudio)
const CATEGORY_VIDEO: Record<ProjectCategory, string> = {
  "3D": "/videos/cgi-films.mp4",
  IA: "/videos/cgi-films.mp4",
  VFX: "/videos/vfx-post.mp4",
};

const CATEGORY_PHRASE: Record<ProjectCategory, { line1: string; line2: string }> = {
  "3D": { line1: "Lorem ipsum dolor sit amet,", line2: "consectetur adipiscing elit." },
  IA: { line1: "Sed do eiusmod tempor incididunt,", line2: "ut labore et dolore magna aliqua." },
  VFX: { line1: "Ut enim ad minim veniam, quis nostrud", line2: "exercitation ullamco laboris nisi." },
};

const DEFAULT_PHRASE = { line1: "Lorem ipsum dolor sit amet,", line2: "consectetur adipiscing elit." };

const NAV_LINKS = [
  { label: "REEL", id: "reel" },
  { label: "TRABAJOS", id: "portfolio" },
  { label: "ABOUT US", id: "about" },
  { label: "CONTACTO", id: "contact" },
];

// negativo: deja espacio arriba del target para que no quede tapado por el header fijo
const HEADER_SCROLL_OFFSET = -90;

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: HEADER_SCROLL_OFFSET });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function HomeHero() {
  const [revealed, setRevealed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // una vez que se posiciona sobre un botón, la selección queda — no vuelve al video
  // por default al sacar el cursor (por eso no es "hovered", es "active")
  const [active, setActive] = useState<ProjectCategory | null>(null);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleCategoryClick(category: ProjectCategory) {
    scrollToId("portfolio");
    window.dispatchEvent(new CustomEvent("trabajos:filter", { detail: { category } }));
  }

  const phrase = active ? CATEGORY_PHRASE[active] : DEFAULT_PHRASE;

  return (
    <>
      {/* Header fijo — se mantiene en toda la home, no solo en el hero, y se achica al scrollear.
          No usa hero-stagger (esa animación anima "transform" y acá no la necesitamos: alcanza con un fade). */}
      <div
        id="site-header"
        className="fixed top-0 left-0 right-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-8 md:px-12"
        style={{
          zIndex: 75,
          backgroundColor: scrolled ? "rgba(247,225,177,0.55)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          paddingTop: scrolled ? "0.6rem" : "1.25rem",
          paddingBottom: scrolled ? "0.6rem" : "1.25rem",
          opacity: revealed ? 1 : 0,
          transition: "padding-top 0.4s ease, padding-bottom 0.4s ease, opacity 0.8s ease 0.1s, background-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <TransitionLink href="/" onClick={scrollToTop} className="select-none shrink-0 relative block" style={{ width: 242, height: scrolled ? 43 : 72 }}>
          <Image
            src="/images/batalla/Batalla_cremita.png"
            alt="Batalla Studio"
            width={161}
            height={77}
            className="w-auto absolute inset-0"
            style={{ height: scrolled ? "43px" : "72px", opacity: scrolled ? 0 : 1, transition: "height 0.4s ease, opacity 0.4s ease" }}
            priority
          />
          <Image
            src="/images/batalla/Batalla_marron.png"
            alt="Batalla Studio"
            width={161}
            height={77}
            className="w-auto absolute inset-0"
            style={{ height: scrolled ? "43px" : "72px", opacity: scrolled ? 1 : 0, transition: "height 0.4s ease, opacity 0.4s ease" }}
            priority
          />
        </TransitionLink>

        <nav
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] uppercase tracking-[0.3em] font-bold"
          style={{ color: scrolled ? "rgba(61,26,10,0.8)" : "rgba(247,225,177,0.9)", transition: "color 0.4s ease" }}
        >
          {NAV_LINKS.map(({ label, id }, i) => (
            <span key={id} className="flex items-center gap-3">
              {i > 0 && <span className="text-gold/50">|</span>}
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(id);
                }}
                className="hover:text-gold transition-colors duration-300"
              >
                {label}
              </a>
            </span>
          ))}
        </nav>
      </div>

      <section
        className={`relative flex flex-col justify-end overflow-hidden ${revealed ? "hero-revealed" : ""}`}
        style={{ minHeight: "100svh" }}
      >
        {/* Video por default — se ve mientras no se seleccionó ninguna categoría */}
        <video
          src="/videos/reel-gral_2024.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: active === null ? 1 : 0, transition: "opacity 0.6s ease", zIndex: 0 }}
          aria-hidden="true"
        />
        {/* Videos por categoría — cross-fade al pasar el mouse por los botones, y queda fijo */}
        {CATEGORIES.map((cat) => (
          <video
            key={cat}
            src={CATEGORY_VIDEO[cat]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: active === cat ? 1 : 0,
              transition: "opacity 0.6s ease",
              zIndex: 0,
            }}
            aria-hidden="true"
          />
        ))}
        {/* velo oscuro para que el texto se lea siempre, con o sin video */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(26,16,8,0.45)", zIndex: 1 }} />

        {/* Frase + botones de categoría */}
        <div
          className="hero-stagger relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 px-8 md:px-12 pb-12"
          style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
        >
          <p className="text-cream/80 text-base md:text-lg leading-relaxed font-light max-w-sm">
            {phrase.line1}
            <br />
            {phrase.line2}
          </p>

          <div className="flex flex-col gap-2 w-full sm:w-auto sm:items-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onMouseEnter={() => setActive(cat)}
                onClick={() => handleCategoryClick(cat)}
                className="px-8 py-2.5 rounded-full border text-[0.65rem] uppercase tracking-[0.3em] text-center transition-all duration-300 sm:min-w-[9rem]"
                style={{
                  borderColor: active === cat ? "#CD8641" : "rgba(247,225,177,0.3)",
                  color: active === cat ? "#CD8641" : "#F7E1B1",
                  backgroundColor: active === cat ? "rgba(205,134,65,0.1)" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
