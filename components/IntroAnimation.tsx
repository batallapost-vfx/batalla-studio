"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) {
      setVisible(false);
      window.dispatchEvent(new CustomEvent("intro:done"));
      return;
    }
    document.body.style.overflow = "hidden";

    const video = videoRef.current;
    if (!video) return;

    const finish = () => {
      sessionStorage.setItem("intro-played", "1");
      setFading(true);
      window.dispatchEvent(new CustomEvent("intro:done"));
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 700);
    };

    video.addEventListener("ended", finish);
    // fallback: si el video no carga en 12s, continúa igual
    const fallback = setTimeout(finish, 12000);

    return () => {
      video.removeEventListener("ended", finish);
      clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "#120905",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Ocupa toda la pantalla — se recorta con object-cover en vez de dejarlo chico
          y recuadrado; el 102% de más evita que se note el borde del video en el límite. */}
      <video
        ref={videoRef}
        src="/videos/logo-animation-intro-2.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scale(1.02)" }}
      />
    </div>
  );
}
