"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("inline-flex items-center gap-2.5", disabled && "opacity-50", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors duration-150",
          checked ? "bg-primary" : "bg-n-200",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-subtle transition-transform duration-150",
            checked && "translate-x-4",
          )}
        />
      </button>
      {label ? <span className="text-body text-n-700">{label}</span> : null}
    </label>
  );
}
