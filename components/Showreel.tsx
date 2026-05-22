import dynamic from "next/dynamic";
import { getVimeoVideos } from "@/lib/vimeo";

// browser-only (@vimeo/player accede al DOM)
const ShowreelPlayer = dynamic(() => import("@/components/ShowreelPlayer"), { ssr: false });

export default async function Showreel() {
  const videos = await getVimeoVideos();
  const featuredId = videos.length > 0 ? videos[0].id : 76979871;

  return (
    <section id="showreel" className="py-20 px-6 md:px-12" style={{ maxWidth: "80rem", margin: "0 auto" }}>
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
          — Featured —
        </p>
        <h2 className="font-playfair font-bold text-cream text-4xl md:text-5xl tracking-wide">
          Showreel
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-12 h-px bg-gold opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold opacity-70" />
          <div className="w-12 h-px bg-gold opacity-40" />
        </div>
      </div>

      <ShowreelPlayer videoId={featuredId} />

      <p className="text-center text-cream/60 text-xs uppercase tracking-[0.35em] mt-10">
        Batalla Studio · Rosario, Santa Fe · Since 2010
      </p>
    </section>
  );
}
