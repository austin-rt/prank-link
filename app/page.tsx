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
  const label = "block text-sm font-medium mb-1";

  return (
    <main className="mx-auto max-w-xl px-6 py-12 font-sans">
      <h1 className="text-2xl font-bold mb-1">Prank Link Generator</h1>
      <p className="text-sm text-gray-500 mb-8">
        The preview shows the disguise. The click goes to the destination.
      </p>

      <div className="space-y-4">
        <div>
          <label className={label}>Preview title</label>
          <input
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Preview description</label>
          <input
            className={field}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Preview thumbnail URL</label>
          <input
            className={field}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className={label}>Destination URL (where the click goes)</label>
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
