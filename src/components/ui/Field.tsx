import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <span className="text-label font-medium text-n-700">
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
      ) : null}
      {children}
      {error ? (
        <span className="text-caption text-danger">{error}</span>
      ) : hint ? (
        <span className="text-caption text-n-400">{hint}</span>
      ) : null}
    </label>
  );
}
