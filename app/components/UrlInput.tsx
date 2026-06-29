"use client";

import { useRef, useState } from "react";
import { HiArrowUpTray } from "react-icons/hi2";

const PROTOCOL = /^https?:\/\//i;

export default function UrlInput({
  id,
  value,
  onChange,
  placeholder,
  invalid,
  allowUpload,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  allowUpload?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function upload(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Upload failed.");
      onChange(String(json.url).replace(PROTOCOL, ""));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div
        className={`flex items-stretch overflow-hidden rounded-lg border bg-white text-sm transition focus-within:ring-2 dark:bg-gray-950 ${
          invalid
            ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-100 dark:border-red-500/70 dark:focus-within:ring-red-900/40"
            : "border-gray-300 focus-within:border-indigo-500 focus-within:ring-indigo-100 dark:border-gray-700 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-900/40"
        }`}
      >
        <span
          aria-hidden
          className="flex select-none items-center border-r border-gray-200 bg-secondary px-3 text-secondary-foreground dark:border-gray-700"
        >
          https://
        </span>
        <input
          id={id}
          type="url"
          inputMode="url"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="w-full bg-transparent px-3 py-2.5 outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
          placeholder={placeholder}
          value={value}
          aria-invalid={invalid || undefined}
          onChange={(e) => onChange(e.target.value.replace(PROTOCOL, ""))}
        />
        {allowUpload && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            aria-label="Upload an image"
            className="flex shrink-0 select-none items-center gap-1.5 border-l border-gray-200 bg-secondary px-3 text-xs font-medium text-secondary-foreground transition hover:text-gray-700 disabled:opacity-60 dark:border-gray-700 dark:hover:text-gray-200"
          >
            <HiArrowUpTray className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload"}
          </button>
        )}
      </div>

      {allowUpload && (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />
      )}

      {uploadError && (
        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {uploadError}
        </p>
      )}
    </div>
  );
}
