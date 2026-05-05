import * as React from "react";
import { cn } from "@/lib/utils/cn";

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-caption",
  md: "h-10 w-10 text-body-sm",
  lg: "h-14 w-14 text-h3",
  xl: "h-20 w-20 text-h2",
};

const palette = [
  "bg-[#E4EDE9] text-[#2F6B5E]",
  "bg-[#FBE9E2] text-[#5C2419]",
  "bg-[#F7ECD6] text-[#7A5B22]",
  "bg-[#E1EAF4] text-[#284C7A]",
  "bg-[#F5F1EB] text-[#574E42]",
  "bg-[#F7E1DC] text-[#822A20]",
];

function hashToken(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function Avatar({
  initials,
  seed = "",
  size = "md",
  className,
}: {
  initials: string;
  seed?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const tone = palette[hashToken(seed || initials) % palette.length];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-tight select-none",
        sizes[size],
        tone,
        className,
      )}
    >
      {initials}
    </span>
  );
}
