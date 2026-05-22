import NavbarInner from "@/components/NavbarInner";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";
import { getVimeoVideos } from "@/lib/vimeo";

export const metadata = {
  title: "VFX & Post — Batalla Studio",
  description: "VFX, compositing y post-producción de Batalla Studio, Rosario, Santa Fe, Argentina.",
};

export default async function VFXPostPage() {
  const all = await getVimeoVideos();
  // Índices impares para VFX & Post — después se categoriza manualmente
  const videos = all.filter((_, i) => i % 2 !== 0).slice(0, 6);

  return (
    <>
      <NavbarInner />
      <main>
        {/* Hero header */}
        <section className="pt-36 pb-20 px-8 text-center">
          <p className="text-teal text-[0.6rem] uppercase tracking-[0.6em] mb-4">
            — Especialidad —
          </p>
          <h1 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(3rem,8vw,6rem)]">
            VFX &amp; Post
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-px bg-teal opacity-35" />
            <div className="w-2.5 h-2.5 rotate-45 border border-teal opacity-65" />
            <div className="w-16 h-px bg-teal opacity-35" />
          </div>
          <p className="text-cream/60 text-sm font-light max-w-md mx-auto leading-relaxed">
            VFX compositing, color grading y post-producción de alta exigencia
            para cine y publicidad, con ojo técnico y sensibilidad artística.
          </p>
        </section>

        <CategoryGrid videos={videos} accentColor="teal" />
      </main>
      <Footer />
    </>
  );
}
