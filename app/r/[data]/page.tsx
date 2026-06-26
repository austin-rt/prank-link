import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodePrank } from "@/lib/prank";

type Params = { data: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { data } = await params;
  const prank = decodePrank(data);
  // Keep generated links out of search indexes. Social preview crawlers
  // (Discord, Twitter, Facebook, etc.) ignore robots meta and still read the
  // OG tags below, so the disguise preview keeps working.
  const robots = { index: false, follow: false } as const;
  if (!prank) return { robots };

  return {
    title: prank.title,
    description: prank.description,
    robots,
    openGraph: {
      title: prank.title,
      description: prank.description,
      images: prank.image ? [prank.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: prank.title,
      description: prank.description,
      images: prank.image ? [prank.image] : [],
    },
  };
}

export default async function RedirectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { data } = await params;
  const prank = decodePrank(data);
  if (!prank) notFound();

  const dest = prank.destination;
  // Escape "<" so a destination URL can't break out of the inline <script>.
  const jsDest = JSON.stringify(dest).replace(/</g, "\\u003c");

  return (
    <>
      {/*
        meta-refresh + JS, NOT a server 301/307: a server redirect fires before
        the crawler reads the OG tags above and would spoil the preview.
      */}
      <meta httpEquiv="refresh" content={`0;url=${dest}`} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.location.replace(${jsDest});` }}
      />
      <main className="flex min-h-screen items-center justify-center font-sans">
        <p>
          Redirecting…{" "}
          <a className="underline" href={dest}>
            Continue
          </a>
        </p>
      </main>
    </>
  );
}
