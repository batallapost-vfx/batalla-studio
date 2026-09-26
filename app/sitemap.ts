import type { MetadataRoute } from "next";

const SITE_URL = "https://studiobatalla.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/portfolio", "/cgi-films", "/vfx-post", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
