export const PROJECT_OPEN_EVENT = "project:open";

// lo escucha ProjectModalHost: abre el modal del trabajo y pone su link (/slug) en la barra
export function openProject(slug: string) {
  window.dispatchEvent(new CustomEvent(PROJECT_OPEN_EVENT, { detail: { slug } }));
}
