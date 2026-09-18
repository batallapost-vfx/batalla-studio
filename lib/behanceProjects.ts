import { ProjectCategory } from "@/lib/vimeo";

// Proyectos de Behance que se muestran en el sitio, con su categoría propia.
// Para agregar uno nuevo, sumar la URL acá — se trae en vivo en cada visita (ver lib/behance.ts).
export const BEHANCE_PROJECTS: { url: string; category: ProjectCategory }[] = [
  { url: "https://www.behance.net/gallery/255755833/Test", category: "3D" },
  { url: "https://www.behance.net/gallery/255760357/VAX-TEAM", category: "IA" },
  { url: "https://www.behance.net/gallery/221076949/TTRacing-Aeroflex-Ergochair", category: "3D" },
];
