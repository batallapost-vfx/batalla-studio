import dynamic from "next/dynamic";
import { getVimeoVideos } from "@/lib/vimeo";

// browser-only (@vimeo/player accede al DOM)
const ShowreelPlayer = dynamic(() => import("@/components/ShowreelPlayer"), { ssr: false });

// Reel general del estudio (Vimeo no listado — necesita su hash de privacidad para embeberse)
const GENERAL_REEL_ID = 1227860706;
const GENERAL_REEL_HASH = "5af9e00b20";

async function getGeneralReelThumbnail(): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${GENERAL_REEL_ID}/${GENERAL_REEL_HASH}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.thumbnail_url;
  } catch {
    return undefined;
  }
}

// TODO: reemplazar por los reels dedicados de cada especialidad cuando el estudio los tenga listos —
// por ahora las miniaturas de 3D/IA/VFX/Color Grading apuntan a un video placeholder
export default async function Showreel() {
  const [videos, generalThumb] = await Promise.all([getVimeoVideos(), getGeneralReelThumbnail()]);
  const placeholderId = videos.length > 0 ? videos[0].id : 76979871;
  const placeholderThumb = videos.length > 0 ? videos[0].thumbnail_small : undefined;

  const reels = [
    { key: "general", label: "GENERAL", videoId: GENERAL_REEL_ID, hash: GENERAL_REEL_HASH, thumbnail: generalThumb },
    { key: "3d", label: "3D", videoId: placeholderId, thumbnail: placeholderThumb },
    { key: "ia", label: "IA", videoId: placeholderId, thumbnail: placeholderThumb },
    { key: "vfx", label: "VFX", videoId: placeholderId, thumbnail: placeholderThumb },
    { key: "color", label: "COLOR GRADING", videoId: placeholderId, thumbnail: placeholderThumb },
  ];

  return (
    <section id="reel" className="py-[10vh] px-4 md:px-8 scroll-mt-24">
      {/* Section header */}
      <div className="text-center mb-24">
        <h2 className="font-playfair font-bold text-cream text-4xl md:text-5xl tracking-wide">
          SHOWREEL
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-12 h-px bg-gold opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold opacity-70" />
          <div className="w-12 h-px bg-gold opacity-40" />
        </div>
      </div>

      <ShowreelPlayer reels={reels} />
    </section>
  );
}
