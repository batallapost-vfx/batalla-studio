import NavbarInner from "@/components/NavbarInner";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";
import { getVimeoVideos } from "@/lib/vimeo";

export const metadata = {
  title: "Portfolio — Batalla Studio",
  description: "Todos los proyectos de Batalla Studio — CGI Films y VFX & Post Production.",
};

export default async function PortfolioPage() {
  const videos = await getVimeoVideos();

  return (
    <>
      <NavbarInner />
      <main>
        <section className="pt-36 pb-20 px-8 text-center">
          <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
            — Selected Work —
          </p>
          <h1 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(3rem,8vw,6rem)]">
            Portfolio
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-gold opacity-35" />
            <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-65" />
            <div className="w-16 h-px bg-gold opacity-35" />
          </div>
          <p className="text-cream/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            CGI Films y VFX & Post — toda la producción de Batalla Studio desde Rosario, Santa Fe, Argentina.
          </p>
        </section>

        <PortfolioGrid videos={videos} />
      </main>
      <Footer />
    </>
  );
}
