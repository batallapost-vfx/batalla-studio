import { BehanceModule } from "@/lib/behance";

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
  upload_date?: string;
  /** proyectos que no vienen de Vimeo (ej. galería traída en vivo de Behance) */
  provider?: "vimeo" | "behance";
  /** módulos del proyecto de Behance (imágenes, texto, video) en el orden real del proyecto */
  behanceModules?: BehanceModule[];
  /** fondo, color de texto y separación entre módulos, tal como están en el proyecto de Behance */
  behanceBackground?: string;
  behanceTextColor?: string;
  behanceSpacerHeight?: number;
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

export type ProjectCategory = "3D & IA" | "VFX & POST";

// Placeholder por índice — después se categoriza manualmente (ver nota en cgi-films/page.tsx).
// Vive acá para que /cgi-films, /vfx-post y /portfolio repartan los mismos videos en las mismas categorías.
export function assignCategory(index: number): ProjectCategory {
  return index % 2 === 0 ? "3D & IA" : "VFX & POST";
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
