export interface VimeoVideo {
  id: number;
  title: string;
  description: string | null;
  url: string;
  thumbnail_small: string;
  thumbnail_medium: string;
  thumbnail_large: string;
  embed_privacy: string;
  stats_number_of_plays: number;
  duration: number;
}

export async function getVimeoVideos(): Promise<VimeoVideo[]> {
  try {
    const res = await fetch(
      "https://vimeo.com/api/v2/batallapost/videos.json",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_VIDEOS;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_VIDEOS;
  } catch {
    return FALLBACK_VIDEOS;
  }
}

export function getVideoCategory(video: VimeoVideo): "CGI Films" | "VFX & Post" {
  const text = ((video.title ?? "") + " " + (video.description ?? "")).toLowerCase();
  const vfxKeywords = ["vfx", "post", "composit", "effect", "motion", "grade", "color", "retouche"];
  if (vfxKeywords.some((k) => text.includes(k))) return "VFX & Post";
  return video.id % 2 === 0 ? "CGI Films" : "VFX & Post";
}

const FALLBACK_VIDEOS: VimeoVideo[] = [
  {
    id: 76979871,
    title: "Batalla Studio — Showreel 2024",
    description: "CGI films and visual stories crafted in Buenos Aires.",
    url: "https://vimeo.com/76979871",
    thumbnail_small: "https://i.vimeocdn.com/video/452001751_100x75.jpg",
    thumbnail_medium: "https://i.vimeocdn.com/video/452001751_200x150.jpg",
    thumbnail_large: "https://i.vimeocdn.com/video/452001751_640x360.jpg",
    embed_privacy: "anywhere",
    stats_number_of_plays: 0,
    duration: 120,
  },
  {
    id: 148751763,
    title: "KIA — Full CGI Campaign",
    description: "Full CG automotive commercial for KIA.",
    url: "https://vimeo.com/148751763",
    thumbnail_small: "https://i.vimeocdn.com/video/548278895_100x75.jpg",
    thumbnail_medium: "https://i.vimeocdn.com/video/548278895_200x150.jpg",
    thumbnail_large: "https://i.vimeocdn.com/video/548278895_640x360.jpg",
    embed_privacy: "anywhere",
    stats_number_of_plays: 0,
    duration: 90,
  },
  {
    id: 191655410,
    title: "Ford — VFX Compositing",
    description: "VFX compositing and post production for Ford.",
    url: "https://vimeo.com/191655410",
    thumbnail_small: "https://i.vimeocdn.com/video/603272994_100x75.jpg",
    thumbnail_medium: "https://i.vimeocdn.com/video/603272994_200x150.jpg",
    thumbnail_large: "https://i.vimeocdn.com/video/603272994_640x360.jpg",
    embed_privacy: "anywhere",
    stats_number_of_plays: 0,
    duration: 60,
  },
];
