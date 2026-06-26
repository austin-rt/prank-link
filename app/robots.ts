import type { MetadataRoute } from "next";

// Allow everything: social preview crawlers (Discord/Twitter/Facebook/Slack/
// Telegram) respect robots.txt, and the /r/ pages depend on them fetching the
// OG tags. Those pages carry a noindex meta instead, so they stay out of
// search results without blocking preview generation.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ends.to/sitemap.xml",
    host: "https://ends.to",
  };
}
