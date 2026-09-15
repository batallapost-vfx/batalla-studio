import NavbarInner from "@/components/NavbarInner";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import { getVimeoVideos, VimeoVideo, assignCategory } from "@/lib/vimeo";
import { getBehanceProject, behanceProjectToVideoShape } from "@/lib/behance";
import { CGI_FILMS_BEHANCE_URLS } from "@/lib/behanceProjects";

export const metadata = {
  title: "CGI Films — Batalla Studio",
  description: "Producciones CGI fotorrealistas de Batalla Studio, Rosario, Santa Fe, Argentina.",
};

export default async function CGIFilmsPage() {
  const [all, behanceProjects] = await Promise.all([
    getVimeoVideos(),
    Promise.all(CGI_FILMS_BEHANCE_URLS.map(getBehanceProject)),
  ]);

  // proyectos traídos en vivo de Behance — se actualizan solos cuando se editan ahí (ver lib/behance.ts)
  const behanceEntries: VimeoVideo[] = behanceProjects
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map(behanceProjectToVideoShape);

  // Índices pares para CGI — después se categoriza manualmente
  const videos = [
    ...behanceEntries,
    ...all.filter((_, i) => assignCategory(i) === "3D & IA").slice(0, 6),
  ];

  return (
    <>
      <NavbarInner />
      <main>
        {/* Hero header */}
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
