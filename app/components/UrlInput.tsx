"use client";

const PROTOCOL = /^https?:\/\//i;

export default function UrlInput({
  id,
  value,
  onChange,
  placeholder,
  invalid,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
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
    </div>
  );
}
