"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Tooltip({
  label,
  children,
  side = "top",
  className,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
}) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-caption text-paper opacity-0 shadow-medium transition-opacity duration-150 group-hover:opacity-100",
          side === "top" ? "bottom-full mb-2" : "top-full mt-2",
          className,
        )}
      >
        {label}
      </span>
    </span>
  );
}
