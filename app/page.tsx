"use client";

import { useRef, useState } from "react";
import { encodePrank } from "@/lib/prank";
import DarkModeToggle from "./components/DarkModeToggle";
import UrlInput from "./components/UrlInput";

const PROTOCOL = /^https?:\/\//i;

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return PROTOCOL.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const linkRef = useRef<HTMLInputElement>(null);

  function generate() {
    const dest = normalizeUrl(destination);
    if (!dest) {
      setError("Enter a destination URL.");
      setLink("");
      return;
    }
    try {
      new URL(dest);
    } catch {
      setError("That doesn't look like a valid URL.");
      setLink("");
      return;
    }
    setError("");
    const code = encodePrank({
      title,
      description,
      image: normalizeUrl(image),
      destination: dest,
    });
    setLink(`${window.location.origin}/r/${code}`);
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      linkRef.current?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const field =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/40";
  const label = "block text-sm font-medium text-gray-800 dark:text-gray-200";
  const hint = "block text-xs text-gray-500 mt-0.5 mb-1.5 dark:text-gray-400";
  const heading =
    "text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 dark:text-gray-500";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Custom Link Preview Generator",
    url: "https://ends.to",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description:
      "Create a short link with a custom preview — choose the title, description, and thumbnail shown when it's shared, then point it anywhere.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-2xl px-6 py-12">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">
              ends.to
            </h1>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
              Custom link previews, pointed anywhere you want.
            </p>
          </div>
          <DarkModeToggle />
        </header>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <section>
            <p className={heading}>Preview</p>
            <div className="space-y-4">
              <div>
                <label className={label}>Preview headline</label>
                <span className={hint}>
                  The bold title shown on the preview card.
                </span>
                <input
                  className={field}
                  placeholder="Q3 Financial Report — Final"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Preview subtext</label>
                <span className={hint}>
                  The smaller description line under the title.
                </span>
                <input
                  className={field}
                  placeholder="Reviewed numbers, ready for sign-off."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Preview thumbnail</label>
                <span className={hint}>
                  Direct image URL shown on the preview card.
                </span>
                <UrlInput
                  allowUpload
                  placeholder="example.com/preview.png"
                  value={image}
                  onChange={setImage}
                />
              </div>
            </div>
          </section>

          <hr className="my-6 border-gray-100 dark:border-gray-800" />

          <section>
            <p className={heading}>Destination</p>
            <div>
              <label className={label}>Send visitors to</label>
              <span className={hint}>
                Where the link actually opens when clicked.
              </span>
              <UrlInput
                allowUpload
                placeholder="example.com/your-page"
                value={destination}
                invalid={!!error}
                onChange={(v) => {
                  setDestination(v);
                  if (error) setError("");
                }}
              />
              {error && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
          </section>

          <button
            onClick={generate}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Create link
          </button>

          {link && (
            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/40">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                Your link is ready
              </div>
              <div className="flex gap-2">
                <input
                  ref={linkRef}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2.5 text-sm dark:border-indigo-800 dark:bg-gray-950 dark:text-gray-100"
                  readOnly
                  value={link}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={copy}
                  className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
