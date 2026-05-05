"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function Textarea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[100px] w-full rounded-md border bg-surface px-3 py-2 text-body text-ink placeholder:text-n-400 outline-none transition-colors",
        invalid
          ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
          : "border-n-200 focus:border-accent focus:ring-2 focus:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
});
