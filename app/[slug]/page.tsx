import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pranks } from "@/pranks";

type Params = { slug: string };

// Pre-render every prank at build time.
export function generateStaticParams(): Params[] {
  return Object.keys(pranks).map((slug) => ({ slug }));
}

// Server-rendered OG/Twitter tags. Crawlers scrape these directly — no JS needed.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prank = pranks[slug];
  if (!prank) return {};

  return {
    title: prank.title,
    description: prank.description,
    openGraph: {
      title: prank.title,
      description: prank.description,
      images: [prank.image],
    },
    twitter: {
      card: "summary_large_image",
      title: prank.title,
      description: prank.description,
      images: [prank.image],
    },
  };
}

export default async function PrankPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const prank = pranks[slug];
  if (!prank) notFound();

  const dest = prank.destination;

  return (
    <>
      {/*
        Redirect via meta-refresh + JS, NOT a server 301/307. A server redirect
        fires before the crawler reads the OG tags above and would spoil the
        preview. Crawlers ignore the refresh and just read the tags; humans get
        bounced instantly.
      */}
      <meta httpEquiv="refresh" content={`0;url=${dest}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(dest)});`,
        }}
      />
      <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <p>
          Redirecting… <a href={dest}>Continue</a>
        </p>
      </main>
    </>
  );
}
