import type { MetadataRoute } from "next";

// Only the homepage is indexable. Generated /r/ links are disposable and
// noindex, so they're intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ends.to",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
