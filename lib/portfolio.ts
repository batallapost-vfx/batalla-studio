import { getBehanceProject, behanceProjectToVideoShape } from "@/lib/behance";
import { BEHANCE_PROJECTS } from "@/lib/behanceProjects";
import { PROJECTS, parseVimeoLink } from "@/lib/projects";
import type { PortfolioVideo } from "@/components/PortfolioGrid";

interface OEmbedData {
  title?: string;
  thumbnail_url?: string;
  upload_date?: string;
  duration?: number;
}

async function getOEmbed(id: number, hash?: string): Promise<OEmbedData | null> {
  try {
    const url = `https://vimeo.com/${id}${hash ? `/${hash}` : ""}`;
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}&width=960`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// proyectos del sheet del estudio — la miniatura y la fecha salen del primer link de cada proyecto
async function getSheetProjects(): Promise<PortfolioVideo[]> {
  const entries = await Promise.all(
    PROJECTS.map(async (project): Promise<PortfolioVideo | null> => {
      // proyecto de Behance: se lee la galería en vivo, pero el nombre y los tags son los del sheet
      const behanceLink = project.links.find((l) => /behance\.net\/gallery\//i.test(l));
      if (behanceLink) {
        const behance = await getBehanceProject(behanceLink);
        if (!behance) return null;
        return {
          ...behanceProjectToVideoShape(behance),
          title: project.name,
          categories: project.tags,
          featured: project.featured,
        };
      }

      const pieces = project.links
        .map(parseVimeoLink)
        .filter((p): p is NonNullable<typeof p> => p !== null);
      if (pieces.length === 0) return null;

      const main = pieces[0];
      const meta = await getOEmbed(main.id, main.hash);
      const thumb = meta?.thumbnail_url ?? "";

      return {
        id: main.id,
        hash: main.hash,
        pieces: pieces.length > 1 ? pieces : undefined,
        title: project.name,
        description: null,
        url: `https://vimeo.com/${main.id}${main.hash ? `/${main.hash}` : ""}`,
        thumbnail_small: thumb,
        thumbnail_medium: thumb,
        thumbnail_large: thumb,
        embed_privacy: "anywhere",
        stats_number_of_plays: 0,
        duration: meta?.duration ?? 0,
        upload_date: meta?.upload_date,
        provider: "vimeo",
        categories: project.tags,
        featured: project.featured,
      };
    })
  );
  return entries.filter((e): e is PortfolioVideo => e !== null);
}

// todos los proyectos de la web (sheet + Behance, si hay) — usado por /portfolio y por la home
export async function getPortfolioVideos(): Promise<PortfolioVideo[]> {
  const [sheetEntries, behanceProjects] = await Promise.all([
    getSheetProjects(),
    Promise.all(BEHANCE_PROJECTS.map((p) => getBehanceProject(p.url))),
  ]);

  const behanceEntries: PortfolioVideo[] = behanceProjects
    .map((p, i) =>
      p
        ? {
            ...behanceProjectToVideoShape(p),
            categories: BEHANCE_PROJECTS[i].categories,
            featured: BEHANCE_PROJECTS[i].featured ?? false,
          }
        : null
    )
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return [...sheetEntries, ...behanceEntries];
}
