import type { MetadataRoute } from "next";
import { PROJECTS, projectSlug } from "@/lib/projects";

const SITE_URL = "https://studiobatalla.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/cgi-films", "/vfx-post", "/about", "/contact"];

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/${projectSlug(p.name)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
