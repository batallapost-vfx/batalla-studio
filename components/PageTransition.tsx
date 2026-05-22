"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const EASE  = "cubic-bezier(0.76, 0, 0.24, 1)";
const SPEED = 500;
const LAG   = 140;

export default function PageTransition() {
  const router   = useRouter();
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const p1    = useRef<HTMLDivElement>(null); // cream
  const p2    = useRef<HTMLDivElement>(null); // gold
  const isNav = useRef(false);

  function placeBelow() {
    [p1.current, p2.current].forEach(el => {
      if (!el) return;
      el.style.transition = "none";
      el.style.transform  = "translateY(100%)";
    });
    p1.current?.offsetHeight;
  }

  function reveal() {
    if (!p1.current || !p2.current) return;
    p2.current.style.transition = `transform ${SPEED}ms ${EASE} 0ms`;
    p2.current.style.transform  = "translateY(-100%)";
    p1.current.style.transition = `transform ${SPEED}ms ${EASE} ${LAG}ms`;
    p1.current.style.transform  = "translateY(-100%)";
  }

  function cover(onDone: () => void) {
    placeBelow();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!p1.current || !p2.current) return;
        p1.current.style.transition = `transform ${SPEED}ms ${EASE} 0ms`;
        p1.current.style.transform  = "translateY(0%)";
        p2.current.style.transition = `transform ${SPEED}ms ${EASE} ${LAG}ms`;
        p2.current.style.transform  = "translateY(0%)";
        setTimeout(onDone, SPEED + LAG + 40);
      });
    });
  }

  /* pathname cambió → revelar */
  useEffect(() => {
    if (pathname !== prevPath.current && isNav.current) {
      prevPath.current = pathname;
      isNav.current    = false;
      const t = setTimeout(reveal, 40);
      return () => clearTimeout(t);
    }
    prevPath.current = pathname;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* escucha TransitionLink */
  useEffect(() => {
    const handler = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail.href;
      if (href === pathname) return;
      isNav.current = true;
      cover(() => router.push(href));
    };
    window.addEventListener("transition:navigate", handler as EventListener);
    return () => window.removeEventListener("transition:navigate", handler as EventListener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none" aria-hidden="true">
      {/* Panel cream */}
      <div
        ref={p1}
        style={{
          position: "absolute", inset: 0,
          backgroundColor: "#F7E1B1",
          transform: "translateY(100%)",
          willChange: "transform",
        }}
      />
      {/* Panel gold — logo viaja dentro */}
      <div
        ref={p2}
        style={{
          position: "absolute", inset: 0,
          backgroundColor: "#CD8641",
          transform: "translateY(100%)",
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/batalla/Batalla_cremita.png"
          alt=""
          style={{ height: "240px", width: "auto" }}
        />
      </div>
    </div>
  );
}
