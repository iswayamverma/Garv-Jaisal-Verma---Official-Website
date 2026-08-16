import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// All six routes are included here regardless of nav visibility — /live is
// a real, valid, crawlable page even when its nav link is hidden (§6, §17).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/music", "/about", "/media", "/contact", "/live"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
