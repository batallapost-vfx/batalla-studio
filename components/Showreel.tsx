import dynamic from "next/dynamic";

// browser-only (@vimeo/player accede al DOM)
const ShowreelPlayer = dynamic(() => import("@/components/ShowreelPlayer"), { ssr: false });

// Reels no listados en Vimeo — necesitan su hash de privacidad para embeberse
const VFX_REEL_ID = 1232025028;
const VFX_REEL_HASH = "2963e73a47";
const IA_REEL_ID = 1232042079;
const IA_REEL_HASH = "993913523e";
const REEL_3D_ID = 1232044573;
const REEL_3D_HASH = "ab83a8da99";
// videos públicos de Vimeo (listados) — no necesitan hash de privacidad
const GENERAL_REEL_ID = 76996352;
const COLOR_REEL_ID = 887690081;

async function getReelThumbnail(id: number, hash?: string): Promise<string | undefined> {
  try {
    const url = hash ? `https://vimeo.com/${id}/${hash}` : `https://vimeo.com/${id}`;
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=${url}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.thumbnail_url;
  } catch {
    return undefined;
  }
}

export default async function Showreel() {
  const [generalThumb, vfxThumb, iaThumb, reel3dThumb, colorThumb] = await Promise.all([
    getReelThumbnail(GENERAL_REEL_ID),
    getReelThumbnail(VFX_REEL_ID, VFX_REEL_HASH),
    getReelThumbnail(IA_REEL_ID, IA_REEL_HASH),
    getReelThumbnail(REEL_3D_ID, REEL_3D_HASH),
    getReelThumbnail(COLOR_REEL_ID),
  ]);

  const reels = [
    { key: "general", label: "GENERAL", videoId: GENERAL_REEL_ID, thumbnail: generalThumb },
    { key: "3d", label: "3D", videoId: REEL_3D_ID, hash: REEL_3D_HASH, thumbnail: reel3dThumb },
    { key: "ia", label: "IA", videoId: IA_REEL_ID, hash: IA_REEL_HASH, thumbnail: iaThumb },
    { key: "vfx", label: "VFX", videoId: VFX_REEL_ID, hash: VFX_REEL_HASH, thumbnail: vfxThumb },
    { key: "color", label: "COLOR GRADING", videoId: COLOR_REEL_ID, thumbnail: colorThumb },
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
