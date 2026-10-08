import NavbarInner from "@/components/NavbarInner";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import { getPortfolioVideos } from "@/lib/portfolio";

export const metadata = {
  title: "CGI Films",
  description:
    "Photorealistic CGI productions by Batalla Studio, a 3D animation and post-production studio based in Rosario, Santa Fe, Argentina.",
  keywords: ["CGI films", "animación 3D Rosario", "estudio CGI Argentina", "Batalla Studio"],
};

export default async function CGIFilmsPage() {
  // esta página agrupa los proyectos con tag "3D" o "AI"
  const all = await getPortfolioVideos();
  const videos = all.filter((v) => v.categories.includes("3D") || v.categories.includes("AI"));

  return (
    <>
      <NavbarInner />
      <main>
        {/* Hero header */}
        <section className="pt-36 pb-20 px-8 text-center">
          <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
            — Specialty —
          </p>
          <h1 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(2rem,6vw,6rem)] whitespace-nowrap">
            CREATIVE 3D &amp; AI
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gold opacity-35" />
            <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-65" />
            <div className="w-16 h-px bg-gold opacity-35" />
          </div>
          <p className="text-cream/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            Photorealistic CGI productions, from concept to final frame,
            for the most demanding brands.
          </p>
        </section>

        <CategoryGrid videos={videos} accentColor="gold" />
      </main>
      <Footer />
    </>
  );
}
