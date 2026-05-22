"use client";

import { useEffect, useRef } from "react";

type CursorMode = "default" | "link" | "text";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLSpanElement>(null);
  const pos       = useRef({ x: -100, y: -100 });
  const rotation  = useRef(0);
  const modeRef   = useRef<CursorMode>("default");

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const apply = () => {
      el.style.transform = `translate(-50%, -50%) translate(${pos.current.x}px, ${pos.current.y}px) rotate(${rotation.current}deg)`;
    };

    const setMode = (next: CursorMode, label: string) => {
      if (modeRef.current !== next) {
        modeRef.current = next;
        el.dataset.mode = next;
      }
      if (labelRef.current && labelRef.current.textContent !== label) {
        labelRef.current.textContent = label;
        el.dataset.hasLabel = label ? "1" : "0";
      }
    };

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      apply();
    };

    const click = () => {
      rotation.current += 180;
      el.style.transition =
        "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-radius 0.3s, padding 0.3s, background-color 0.3s, color 0.3s";
      apply();
      setTimeout(() => {
        el.style.transition =
          "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-radius 0.3s, padding 0.3s, background-color 0.3s, color 0.3s";
      }, 520);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const withCursor = target.closest<HTMLElement>("[data-cursor]");
      if (withCursor) {
        const raw = withCursor.dataset.cursor || "";
        const sep = raw.indexOf(":");
        const type = (sep === -1 ? raw : raw.slice(0, sep)) as CursorMode;
        const label = sep === -1 ? "" : raw.slice(sep + 1);
        setMode(type || "link", label);
        return;
      }
      if (target.closest("input, textarea, [contenteditable='true']")) {
        setMode("text", "");
        return;
      }
      if (target.closest("a, button, [role='button']")) {
        setMode("link", "");
        return;
      }
      setMode("default", "");
    };

    const hide = () => { el.style.opacity = "0"; };
    const show = () => { el.style.opacity = "1"; };

    el.style.transition =
      "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-radius 0.3s, padding 0.3s, background-color 0.3s, color 0.3s";

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", click);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    document.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-mode="default"
      data-has-label="0"
      aria-hidden="true"
    >
      <span ref={labelRef} className="custom-cursor-label" />
    </div>
  );
}
