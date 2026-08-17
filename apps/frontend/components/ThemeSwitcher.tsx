"use client";

import { Palette } from "lucide-react";
import clsx from "clsx";
import { ThemeName } from "@/lib/types";
import { useTheme } from "@/components/ThemeProvider";

const THEMES: Array<{ id: ThemeName; label: string }> = [
  { id: "dawn", label: "Dawn" },
  { id: "night", label: "Night" },
  { id: "meadow", label: "Meadow" }
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] p-1 shadow-soft">
      <div className="px-2 text-[var(--muted)]">
        <Palette className="h-4 w-4" />
      </div>
      {THEMES.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setTheme(option.id)}
          className={clsx(
            "rounded-full px-3 py-1 text-xs font-semibold transition-all",
            theme === option.id
              ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
              : "text-[var(--muted)] hover:bg-[var(--panel)]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
