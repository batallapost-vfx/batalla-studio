"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOGO_HEIGHT_TOP = 140;  // ~200% bigger than scrolled
const LOGO_HEIGHT_SCROLLED = 46;
const LOGO_DROP = 52;         // px below nav centre when at top

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) =>
      setHeroHovered((e as CustomEvent<{ active: boolean }>).detail.active);
    window.addEventListener("hero:hover", handler as EventListener);
    return () => window.removeEventListener("hero:hover", handler as EventListener);
  }, []);

  const logoHeight = scrolled ? LOGO_HEIGHT_SCROLLED : LOGO_HEIGHT_TOP;
  const logoShift  = scrolled ? 0 : LOGO_DROP;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: scrolled ? "rgba(247,225,177,0.70)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(205,134,65,0.20)" : "none",
        transition: "background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-center">
        <a
          href="#"
          className="select-none relative"
          style={{
            display: "inline-block",
            height: `${logoHeight}px`,
            transform: `translateY(${logoShift}px)`,
            transition: "height 0.5s ease, transform 0.5s ease, opacity 0.5s ease",
            opacity: heroHovered ? 0.4 : 1,
          }}
        >
          {/* Cremita — visible at top */}
          <Image
            src="/images/batalla/Batalla_cremita.png"
            alt="Batalla Studio"
            width={161}
            height={77}
            className="w-auto absolute inset-0"
            style={{
              height: `${logoHeight}px`,
              opacity: scrolled ? 0 : 0.95,
              transition: "opacity 0.5s ease, height 0.5s ease",
            }}
            priority
          />
          {/* Marrón — visible when scrolled */}
          <Image
            src="/images/batalla/Batalla_marron.png"
            alt=""
            width={161}
            height={77}
            className="w-auto"
            style={{
              height: `${logoHeight}px`,
              opacity: scrolled ? 0.9 : 0,
              transition: "opacity 0.5s ease, height 0.5s ease",
            }}
            priority
          />
        </a>
      </div>
    </nav>
  );
}
