"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,          // interpolación frame a frame — no acumula cola al scrollear rápido
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });
    // se expone para que otros componentes (ej. los links de la nav) puedan
    // pedir un scroll suave con lenis.scrollTo() en vez de pelearse con él
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
