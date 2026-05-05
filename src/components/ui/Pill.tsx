import * as React from "react";
import { cn } from "@/lib/utils/cn";

type Tone =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "ink";

const tones: Record<Tone, string> = {
  neutral: "bg-n-100 text-n-700",
  primary: "bg-primary-soft text-primary-ink",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  ink: "bg-ink text-paper",
};

export function Pill({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-medium tabular",
        tones[tone],
        className,
      )}
    >
      {dot ? (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-n-500": tone === "neutral",
            "bg-primary": tone === "primary",
            "bg-accent": tone === "accent",
            "bg-success": tone === "success",
            "bg-warning": tone === "warning",
            "bg-danger": tone === "danger",
            "bg-info": tone === "info",
            "bg-paper": tone === "ink",
          })}
        />
      ) : null}
      {children}
    </span>
  );
}
