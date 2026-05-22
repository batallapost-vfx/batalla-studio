"use client";

interface GlowButtonProps {
  label?: string;
  accent: string;
  isActive: boolean;
}

export default function GlowButton({ label = "Ver proyectos", accent, isActive }: GlowButtonProps) {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      {/* Glow que irradia hacia afuera desde el borde del botón */}
      <div
        style={{
          position: "absolute",
          inset: "-55px",
          background: `radial-gradient(ellipse at var(--gx, 50%) var(--gy, 50%), ${accent}55 0%, transparent 65%)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Botón compacto */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          border: `1px solid ${accent}`,
          padding: "7px 16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "all",
        }}
      >
        <span
          style={{
            color: accent,
            fontSize: "0.6rem",
            textTransform: "uppercase" as const,
            letterSpacing: "0.35em",
          }}
        >
          {label}
        </span>
        <span style={{ color: accent, fontSize: "0.8rem", lineHeight: 1 }}>→</span>
      </div>
    </div>
  );
}
