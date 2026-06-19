"use client";

import { useState } from "react";
import { encodePrank } from "@/lib/prank";

export default function Home() {
  const [title, setTitle] = useState("Q3 Financial Report — Final");
  const [description, setDescription] = useState(
    "Reviewed numbers, ready for sign-off.",
  );
  const [image, setImage] = useState(
    "https://placehold.co/1200x630/2563eb/ffffff/png?text=Q3+Report",
  );
  const [destination, setDestination] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    if (!/^https?:\/\//i.test(destination)) {
      setLink("");
      alert("Destination must be a full http(s):// URL");
      return;
    }
    const code = encodePrank({ title, description, image, destination });
    setLink(`${window.location.origin}/r/${code}`);
    setCopied(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  const field = "w-full rounded border border-gray-300 px-3 py-2 text-sm";
  const label = "block text-sm font-medium";
  const hint = "block text-xs text-gray-500 mb-1";
  const heading = "text-xs font-semibold uppercase tracking-wide text-gray-400";

  return (
    <main className="mx-auto max-w-xl px-6 py-12 font-sans">
      <h1 className="text-2xl font-bold mb-1">Prank Link Generator</h1>
      <p className="text-sm text-gray-500 mb-8">
        Make a link whose chat preview looks innocent, but sends whoever clicks
        it somewhere else.
      </p>

      <div className="space-y-4">
        <p className={heading}>What they see in the chat preview</p>
        <div>
          <label className={label}>Headline on the preview card</label>
          <span className={hint}>The big bold text recipients read first.</span>
          <input
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Subtext under the headline</label>
          <span className={hint}>The smaller grey line below the title.</span>
          <input
            className={field}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Thumbnail image on the preview card</label>
          <span className={hint}>
            Direct URL to the innocent-looking image shown in the preview.
          </span>
          <input
            className={field}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <p className={`${heading} pt-2`}>Where they actually go</p>
        <div>
          <label className={label}>Real destination after they click</label>
          <span className={hint}>
            The surprise. Recipients never see this until they tap the link.
          </span>
          <input
            className={field}
            placeholder="https://i.imgur.com/your-image.jpeg"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <button
          onClick={generate}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Generate link
        </button>
      </div>

      {link && (
        <div className="mt-8 rounded border border-gray-200 bg-gray-50 p-4">
          <div className="mb-2 text-sm font-medium">Your prank link</div>
          <div className="flex gap-2">
            <input className={field} readOnly value={link} />
            <button
              onClick={copy}
              className="shrink-0 rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
