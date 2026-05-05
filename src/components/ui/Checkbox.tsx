"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: React.ReactNode }
>(function Checkbox({ className, label, id, ...props }, ref) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return (
    <label htmlFor={inputId} className={cn("inline-flex items-center gap-2 cursor-pointer", className)}>
      <span className="relative inline-flex h-4 w-4">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer absolute inset-0 m-0 h-4 w-4 cursor-pointer appearance-none rounded border border-n-300 bg-surface checked:border-primary checked:bg-primary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-paper outline-none transition-colors"
          {...props}
        />
        <Check className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
      </span>
      {label ? <span className="text-body text-n-700 select-none">{label}</span> : null}
    </label>
  );
});
