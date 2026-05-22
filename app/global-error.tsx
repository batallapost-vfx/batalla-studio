"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ background: "#1a1008", color: "#F7E1B1", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "1.5rem", textAlign: "center", padding: "2rem" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.6em", textTransform: "uppercase", color: "#CD8641" }}>— Error —</p>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>Something went wrong</h2>
        <p style={{ color: "rgba(247,225,177,0.4)", fontSize: "0.875rem", maxWidth: "24rem" }}>{error.message}</p>
        <button
          onClick={reset}
          style={{ marginTop: "1rem", padding: "0.75rem 2rem", border: "1px solid rgba(205,134,65,0.5)", color: "#CD8641", background: "transparent", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
