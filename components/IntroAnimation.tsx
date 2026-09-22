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
        backgroundColor: "#F7E1B1",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Marco 16:9 que recorta el 1% de cada borde del video: el borde exterior del cuadro tiene una
          línea apenas más oscura que el fondo, y se veía como dos rayas verticales a los costados */}
      <div
        className="relative overflow-hidden"
        style={{ width: "min(100vw, calc(100vh * 16 / 9))", aspectRatio: "16 / 9" }}
      >
        <video
          ref={videoRef}
          src="/videos/logo-animation-intro.mp4"
          autoPlay
          muted
          playsInline
          className="absolute max-w-none object-cover"
          style={{ width: "102%", height: "102%", left: "-1%", top: "-1%" }}
        />
      </div>
    </div>
  );
}
