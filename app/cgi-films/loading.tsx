import NavbarInner from "@/components/NavbarInner";

export default function Loading() {
  return (
    <>
      <NavbarInner />
      <main>
        <section className="pt-36 pb-20 px-8 text-center">
          <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
            — Especialidad —
          </p>
          <h1 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(2rem,6vw,6rem)] whitespace-nowrap">
            CREATIVE 3D &amp; IA
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gold opacity-35" />
            <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-65" />
            <div className="w-16 h-px bg-gold opacity-35" />
          </div>
        </section>

        <section className="pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video bg-dark-brown/60 animate-pulse" />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
