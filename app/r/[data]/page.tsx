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
  const jsDest = JSON.stringify(dest).replace(/</g, "\\u003c");

  return (
    <>
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
