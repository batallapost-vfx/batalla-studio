"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-studio-bg px-8 text-center">
      <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em]">— Error —</p>
      <h2 className="font-playfair text-cream text-4xl font-bold">Something went wrong</h2>
      <p className="text-cream/60 text-sm max-w-sm leading-relaxed">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 px-8 py-3 border border-gold/50 text-gold text-[0.6rem] uppercase tracking-[0.35em] hover:bg-gold hover:text-studio-bg transition-all duration-300"
      >
        Try again
      </button>
    </div>
  );
}
