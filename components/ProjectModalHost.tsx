"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VideoModal, type PortfolioVideo } from "@/components/PortfolioGrid";
import { PROJECT_OPEN_EVENT } from "@/lib/openProject";

// Único modal de trabajos de la home. Al abrir un trabajo pone /slug en la barra (para
// copiar y compartir el link) y al cerrarlo vuelve a "/". Si se entra directo por
// /slug, arranca con ese trabajo abierto (initialSlug, ver app/[slug]/page.tsx).
export default function ProjectModalHost({
  videos,
  initialSlug,
}: {
  videos: PortfolioVideo[];
  initialSlug?: string;
}) {
  const findBySlug = useCallback(
    (slug: string | null | undefined) => videos.find((v) => v.slug === slug) ?? null,
    [videos]
  );
  const [selected, setSelected] = useState<PortfolioVideo | null>(() => findBySlug(initialSlug));
  // true si el link lo agregamos nosotros al historial: al cerrar se vuelve atrás en vez de
  // apilar otra entrada, así el botón "atrás" del navegador no queda con pasos de más
  const pushedRef = useRef(false);
  // título de la pestaña sin trabajo abierto (la página /slug arranca con el del trabajo)
  const baseTitleRef = useRef("");

  useEffect(() => {
    baseTitleRef.current = initialSlug ? "Batalla Studio" : document.title;
  }, [initialSlug]);

  useEffect(() => {
    if (!baseTitleRef.current) return;
    document.title = selected ? `${selected.title} — Batalla Studio` : baseTitleRef.current;
  }, [selected]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const project = findBySlug((e as CustomEvent<{ slug: string }>).detail.slug);
      if (!project) return;
      setSelected(project);
      window.history.pushState(null, "", `/${project.slug}`);
      pushedRef.current = true;
    };
    const onPop = () => {
      pushedRef.current = false;
      setSelected(findBySlug(window.location.pathname.slice(1)));
    };
    window.addEventListener(PROJECT_OPEN_EVENT, onOpen);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener(PROJECT_OPEN_EVENT, onOpen);
      window.removeEventListener("popstate", onPop);
    };
  }, [findBySlug]);

  const close = useCallback(() => {
    setSelected(null);
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  return selected ? <VideoModal video={selected} onClose={close} /> : null;
}
