import NavbarInner from "@/components/NavbarInner";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import { getVimeoVideos } from "@/lib/vimeo";

export const metadata = {
  title: "CGI Films — Batalla Studio",
  description: "Producciones CGI fotorrealistas de Batalla Studio, Rosario, Santa Fe, Argentina.",
};

export default async function CGIFilmsPage() {
  const all = await getVimeoVideos();
  // Índices pares para CGI — después se categoriza manualmente
  const videos = all.filter((_, i) => i % 2 === 0).slice(0, 6);

  return (
    <>
      <NavbarInner />
      <main>
        {/* Hero header */}
        <section className="pt-36 pb-20 px-8 text-center">
          <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
            — Especialidad —
          </p>
          <h1 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(3rem,8vw,6rem)]">
            CGI Films
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gold opacity-35" />
            <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-65" />
            <div className="w-16 h-px bg-gold opacity-35" />
          </div>
          <p className="text-cream/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            Producciones CGI fotorrealistas, desde concepto hasta frame final,
            para las marcas más exigentes del mercado.
          </p>
        </section>

        <CategoryGrid videos={videos} accentColor="gold" />
      </main>
      <Footer />
    </>
  );
}
