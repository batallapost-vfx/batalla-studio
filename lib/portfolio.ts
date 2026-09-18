import { getVimeoVideos, assignCategory } from "@/lib/vimeo";
import { getBehanceProject, behanceProjectToVideoShape } from "@/lib/behance";
import { BEHANCE_PROJECTS } from "@/lib/behanceProjects";
import type { PortfolioVideo } from "@/components/PortfolioGrid";

// todos los proyectos (Vimeo + Behance) con su categoría — usado por /portfolio y por la home
export async function getPortfolioVideos(): Promise<PortfolioVideo[]> {
  const [all, behanceProjects] = await Promise.all([
    getVimeoVideos(),
    Promise.all(BEHANCE_PROJECTS.map((p) => getBehanceProject(p.url))),
  ]);

  const vimeoEntries: PortfolioVideo[] = all.map((video, i) => ({
    ...video,
    category: assignCategory(i),
  }));

  const behanceEntries: PortfolioVideo[] = behanceProjects
    .map((p, i) => (p ? { ...behanceProjectToVideoShape(p), category: BEHANCE_PROJECTS[i].category } : null))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return [...behanceEntries, ...vimeoEntries];
}
