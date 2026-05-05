"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(function Select({ className, invalid, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 w-full appearance-none rounded-md border bg-surface px-3 pr-9 text-body text-ink outline-none transition-colors",
          invalid
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
            : "border-n-200 focus:border-accent focus:ring-2 focus:ring-accent/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-n-400" />
    </div>
  );
});
