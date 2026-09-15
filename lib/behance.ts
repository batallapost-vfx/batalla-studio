export type BehanceModule =
  | { type: "image"; src: string; width: number; height: number; alt: string }
  | { type: "text"; html: string; alignment?: string }
  | { type: "video"; embedSrc: string; width: number; height: number }
  // "colección de imágenes" de Behance — varias fotos agrupadas en una grilla
  | { type: "imageRow"; images: { src: string; width: number; height: number; alt: string }[] };

export interface BehanceProject {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  modules: BehanceModule[];
  /** fondo y separación entre módulos tal como los define el propio proyecto en Behance */
  background: string;
  textColor: string;
  spacerHeight: number;
}

// forma común que usan CategoryGrid/PortfolioGrid para mostrar cualquier proyecto,
// sea de Vimeo o de Behance
export function behanceProjectToVideoShape(project: BehanceProject) {
  return {
    id: project.id,
    title: project.title,
    description: null,
    url: project.url,
    thumbnail_small: project.thumbnail,
    thumbnail_medium: project.thumbnail,
    thumbnail_large: project.thumbnail,
    embed_privacy: "anywhere",
    stats_number_of_plays: 0,
    duration: 0,
    provider: "behance" as const,
    behanceModules: project.modules,
    behanceBackground: project.background,
    behanceTextColor: project.textColor,
    behanceSpacerHeight: project.spacerHeight,
  };
}

// texto claro sobre fondos oscuros, texto oscuro sobre fondos claros — igual que decide Behance
function readableTextColor(bgHex: string): string {
  const hex = bgHex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1a1008" : "#F7E1B1";
}

// Behance no tiene una API pública sin key, así que leemos la misma página
// del proyecto que ve cualquier visitante y sacamos el JSON que trae embebido
// (el estado con el que React arma la galería en behance.net). Esto hace que
// el contenido se actualice solo cuando se edita el proyecto en Behance —
// revalidate: 3600 = se vuelve a pedir como máximo una vez por hora.
const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

interface RawImageSize {
  type: string;
  url: string;
  width: number | null;
}

function pickImageUrl(sizes: RawImageSize[] | undefined): string | null {
  if (!sizes?.length) return null;
  const jpgs = sizes.filter((s) => s.type === "JPG" && s.width);
  jpgs.sort((a, b) => (a.width as number) - (b.width as number));
  const target = jpgs.find((s) => (s.width as number) >= 1200);
  return (target ?? jpgs[jpgs.length - 1] ?? sizes[0])?.url ?? null;
}

export async function getBehanceProject(url: string): Promise<BehanceProject | null> {
  try {
    const res = await fetch(url, { headers: BROWSER_HEADERS, next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const html = await res.text();

    const match = html.match(
      /<script type="application\/json" id="beconfig-store_state">([\s\S]*?)<\/script>/
    );
    if (!match) return null;

    const data = JSON.parse(match[1]);
    const project = data?.project?.project;
    if (!project) return null;

    const modules: BehanceModule[] = [];
    for (const m of project.modules ?? []) {
      if (m.__typename === "ImageModule") {
        const src = pickImageUrl(m.imageSizes?.allAvailable);
        if (src) {
          modules.push({ type: "image", src, width: m.width, height: m.height, alt: m.altText || project.name });
        }
      } else if (m.__typename === "TextModule" && m.text) {
        modules.push({ type: "text", html: m.text, alignment: m.alignment });
      } else if (m.__typename === "VideoModule" && m.embed) {
        const srcMatch = (m.embed as string).match(/src="([^"]+)"/);
        if (srcMatch) {
          modules.push({ type: "video", embedSrc: srcMatch[1], width: m.width, height: m.height });
        }
      } else if (m.__typename === "MediaCollectionModule" && m.components?.length) {
        const images = (m.components as { imageSizes?: { allAvailable?: RawImageSize[] }; width: number; height: number }[])
          .map((c) => {
            const src = pickImageUrl(c.imageSizes?.allAvailable);
            return src ? { src, width: c.width, height: c.height, alt: project.name } : null;
          })
          .filter((img): img is NonNullable<typeof img> => img !== null);
        if (images.length) modules.push({ type: "imageRow", images });
      }
    }

    // La tarjeta del grid es 16:9. La "portada" que se recorta a mano en Behance casi
    // nunca tiene esa proporción (acá era 1.28:1), así que se termina cortando de más al
    // forzarla — en vez de esa portada, usamos la imagen del proyecto más cercana a 16:9.
    const imageModules = modules.filter(
      (m): m is Extract<BehanceModule, { type: "image" }> => m.type === "image"
    );
    const TARGET_RATIO = 16 / 9;
    const closestToWidescreen = imageModules.reduce<typeof imageModules[number] | null>((best, m) => {
      const diff = Math.abs(m.width / m.height - TARGET_RATIO);
      const bestDiff = best ? Math.abs(best.width / best.height - TARGET_RATIO) : Infinity;
      return diff < bestDiff ? m : best;
    }, null);

    const thumbnail =
      closestToWidescreen?.src ??
      pickImageUrl(project.covers?.allAvailable) ??
      "";

    // Behance guarda el fondo y el alto del espaciador del proyecto en un bloque de CSS
    // suelto (project.stylesInline) — no hay un campo estructurado para esto
    const styles: string = project.stylesInline ?? "";
    const background = styles.match(/#primary-project-content\s*\{[^}]*background-color:\s*(#[0-9a-fA-F]{3,8})/)?.[1] ?? "#1a1008";
    const spacerHeight = Number(styles.match(/\.spacer\s*\{\s*height:\s*(\d+)px/)?.[1] ?? 60);

    return {
      id: project.id,
      title: project.name,
      url,
      thumbnail,
      modules,
      background,
      textColor: readableTextColor(background),
      spacerHeight,
    };
  } catch {
    return null;
  }
}
