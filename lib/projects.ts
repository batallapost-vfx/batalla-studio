import type { ProjectCategory } from "@/lib/vimeo";

// Proyectos de la web, tomados del sheet del estudio (mismo orden que la columna "Nro").
// - tags: además de "ALL ITEMS" (donde entran todos), los filtros específicos 3D / IA / VFX
// - featured: los "Selected Works" — van en la sección Destacados
// - links: uno por pieza; si el proyecto tiene 2 o 3 piezas, se muestran todas al abrirlo
export interface ProjectDef {
  name: string;
  tags: ProjectCategory[];
  featured: boolean;
  links: string[];
}

export const PROJECTS: ProjectDef[] = [
  // los links de behance.net se traen en vivo de Behance (ver lib/behance.ts); el resto son de Vimeo
  { name: "Mabe Continental", tags: ["IA"], featured: true, links: ["https://www.behance.net/gallery/256360691/Mabe-Continental"] },
  { name: "Mabe BIC 7", tags: ["3D"], featured: true, links: ["https://www.behance.net/gallery/256374957/BIC-7-ALL-PROJECTS"] },
  { name: "Mabe BIC 7 | Heladeras", tags: ["3D"], featured: false, links: ["https://www.behance.net/gallery/256361195/BIC-7-HELADERAS-MABE"] },
  { name: "Mabe BIC 7 | Lavavajillas Ge Profile", tags: ["3D"], featured: false, links: ["https://www.behance.net/gallery/256370179/BIC-7-GE-PROFILE"] },
  { name: "Mabe BIC 7 | Lavavajillas Mabe", tags: ["3D"], featured: false, links: ["https://www.behance.net/gallery/256367565/BIC-7-LAVAVAJILLAS-MABE"] },
  { name: "Mabe BIC 7 | Estufa eléctrica", tags: ["3D"], featured: false, links: ["https://www.behance.net/gallery/256367297/BIC-7-ESTUFA-MABE"] },
  { name: "Mabe BIC 7 | Lavadora y secadora Appliance", tags: ["3D"], featured: false, links: ["https://www.behance.net/gallery/256363601/BIC-7-GE-APPLIANCES"] },
  { name: "Juegos Suramericanos", tags: ["IA"], featured: false, links: ["https://www.behance.net/gallery/256373095/Juegos-Suramericanos-2026-Institucional"] },
  { name: "Juegos Suramericanos | CAPI", tags: ["3D", "IA"], featured: true, links: ["https://www.behance.net/gallery/256360931/Juegos-Suramericanos-2026-CAPI"] },
  { name: "Vax Team", tags: ["IA"], featured: true, links: ["https://www.behance.net/gallery/255760357/VAX-TEAM"] },

  { name: "Seguridad Vial", tags: ["3D"], featured: false, links: ["https://vimeo.com/1020751215"] },
  { name: "MC Donals", tags: [], featured: false, links: ["https://vimeo.com/1074690501"] },
  { name: "Amex 100 | 200 | 300 | 400", tags: [], featured: false, links: ["https://vimeo.com/1020948163"] },
  { name: "Tomas Schneider", tags: [], featured: false, links: ["https://vimeo.com/1014928731"] },
  { name: "Principe", tags: [], featured: false, links: ["https://vimeo.com/1014927911"] },
  { name: "Principe Drops", tags: ["3D"], featured: true, links: ["https://vimeo.com/1014927646"] },
  { name: "Hepatalgina", tags: ["3D"], featured: false, links: ["https://vimeo.com/1014802876"] },
  { name: "Imperial Frescura", tags: ["VFX", "3D"], featured: false, links: ["https://vimeo.com/1014802661"] },
  { name: "Kía", tags: [], featured: false, links: ["https://vimeo.com/1014798999"] },
  {
    name: "Takis",
    tags: ["3D", "VFX"],
    featured: true,
    links: [
      "https://vimeo.com/1233417985/d5258268e3",
      "https://vimeo.com/925119526",
      "https://vimeo.com/884907260",
      "https://vimeo.com/884907196",
    ],
  },
  { name: "Adermicina facial", tags: [], featured: false, links: ["https://vimeo.com/910952458"] },
  { name: "Olympics 2025", tags: [], featured: false, links: ["https://vimeo.com/886832583"] },
  {
    name: "Caladryl",
    tags: ["3D", "VFX"],
    featured: false,
    links: ["https://vimeo.com/885720213", "https://vimeo.com/884906686", "https://vimeo.com/884906658"],
  },
  { name: "Activia", tags: [], featured: false, links: ["https://vimeo.com/884907375", "https://vimeo.com/884907334"] },
  { name: "Metamucil", tags: [], featured: false, links: ["https://vimeo.com/884907130"] },
  { name: "Chocolinas", tags: ["3D", "VFX"], featured: false, links: ["https://vimeo.com/734108482"] },
  { name: "Mapfre", tags: ["3D", "VFX"], featured: false, links: ["https://vimeo.com/558732495"] },
  { name: "KFCeina", tags: [], featured: false, links: ["https://vimeo.com/558714992", "https://vimeo.com/558714861"] },
  { name: "KFX Hot Spicy", tags: ["3D", "VFX"], featured: false, links: ["https://vimeo.com/558714221"] },
  { name: "Hyundai Creta", tags: [], featured: false, links: ["https://vimeo.com/555936607"] },
  { name: "Bimbo Jaldres", tags: ["3D", "VFX"], featured: false, links: ["https://vimeo.com/499808722"] },
  { name: "Dadá", tags: [], featured: false, links: ["https://vimeo.com/497238898"] },
  { name: "KFC Kruji", tags: [], featured: false, links: ["https://vimeo.com/472578915"] },
  { name: "Morenita", tags: [], featured: false, links: ["https://vimeo.com/362379487"] },
  { name: "Adidas MALUMA", tags: [], featured: false, links: ["https://vimeo.com/336850917"] },
  { name: "Frugos Fresh", tags: ["3D", "VFX"], featured: false, links: ["https://vimeo.com/336841540"] },
  { name: "Yogurisimo", tags: [], featured: false, links: ["https://vimeo.com/229310749"] },
  { name: "Coca Cola", tags: [], featured: false, links: ["https://vimeo.com/361877034"] },
];

// link propio de cada trabajo: www.studiobatalla.com/<slug> — sale del nombre del sheet
// ("Mabe BIC 7 | Heladeras" → "mabe-bic-7-heladeras", "Kía" → "kia")
export function projectSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// "https://vimeo.com/123456789" o, si es no listado, "https://vimeo.com/123456789/abcdef1234"
export function parseVimeoLink(url: string): { id: number; hash?: string } | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([0-9a-f]+))?/i);
  if (!m) return null;
  return { id: Number(m[1]), hash: m[2] };
}
