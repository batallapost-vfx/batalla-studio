import { ProjectCategory } from "@/lib/vimeo";

// Proyectos de Behance que se muestran en el sitio, con sus tags (mismos que en lib/projects.ts).
// Para agregar uno nuevo, sumar la URL acá — se trae en vivo en cada visita (ver lib/behance.ts).
// Por ahora vacío: la lista de proyectos de la web sale del sheet del estudio (lib/projects.ts).
export const BEHANCE_PROJECTS: { url: string; categories: ProjectCategory[]; featured?: boolean }[] = [];
