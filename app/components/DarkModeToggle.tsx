"use client";

import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

type Mode = "light" | "dark";

export default function DarkModeToggle() {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-mode");
    setMode(current === "dark" ? "dark" : "light");
  }, []);

  function apply(next: Mode) {
    document.documentElement.setAttribute("data-mode", next);
    try {
      localStorage.setItem("mode", next);
    } catch {}
    setMode(next);
  }

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        aria-label="Toggle dark mode"
        checked={mode === "dark"}
        onChange={(e) => apply(e.target.checked ? "dark" : "light")}
      />
      <div className="relative h-8 w-16 rounded-full bg-gray-300 transition-colors dark:bg-gray-700">
        <HiSun className="absolute left-1.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <HiMoon className="absolute right-1.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <div
          className={`absolute left-0.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow transition-transform dark:bg-gray-900 ${
            mode === "dark" ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {mode === "dark" ? (
            <HiMoon className="h-4 w-4 text-indigo-400" />
          ) : (
            <HiSun className="h-4 w-4 text-amber-500" />
          )}
        </div>
      </div>
    </label>
  );
}
