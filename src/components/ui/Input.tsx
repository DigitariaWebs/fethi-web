"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, leadingIcon, trailingIcon, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "flex h-10 items-center gap-2 rounded-md border bg-surface px-3 text-body transition-colors",
        invalid
          ? "border-danger focus-within:border-danger focus-within:ring-2 focus-within:ring-danger/20"
          : "border-n-200 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20",
        className,
      )}
    >
      {leadingIcon ? <span className="text-n-400 shrink-0">{leadingIcon}</span> : null}
      <input
        ref={ref}
        className="w-full bg-transparent text-ink placeholder:text-n-400 outline-none"
        {...props}
      />
      {trailingIcon ? <span className="text-n-400 shrink-0">{trailingIcon}</span> : null}
    </div>
  );
});
