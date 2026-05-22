import React from "react";

interface ButtonProps {
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Button = ({
  label = "Ver proyectos",
  isActive = false,
  onClick,
  className = "",
  style,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`batalla-border font-playfair focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 ${isActive ? "is-active" : ""} ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 24px",
        background: "#1a1008",
        width: "fit-content",
        border: "none",
        transform: isActive ? "scale(1.25)" : "scale(1)",
        transition: "color 0.5s ease, transform 0.5s ease",
        color: isActive ? "#1a1008" : "#F7E1B1",
        fontSize: "0.6rem",
        textTransform: "uppercase",
        letterSpacing: "0.35em",
        cursor: "none",
        ...style,
      }}
    >
      {label}
      <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>→</span>
    </button>
  );
};
