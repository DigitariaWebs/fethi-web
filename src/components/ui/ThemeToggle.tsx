"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";

type Size = "sm" | "md";

const sizes: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
};

export function ThemeToggle({
  className,
  size = "md",
}: {
  className?: string;
  size?: Size;
}) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      onClick={(e) => toggle({ clientX: e.clientX, clientY: e.clientY })}
      className={cn(
        // Glass pill — matches the Button system; mode-aware via tokens.
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-divider bg-surface/80 text-ink backdrop-blur-[16px] backdrop-saturate-[1.4] shadow-btn-glass transition-all duration-200 hover:shadow-btn-glass-hover",
        sizes[size],
        className,
      )}
    >
      {/* Crossfade the two icons; whichever isn't active is rotated and faded out */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isDark ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      >
        <Moon className="h-4 w-4" />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
        )}
      >
        <Sun className="h-4 w-4" />
      </span>
    </button>
  );
}
