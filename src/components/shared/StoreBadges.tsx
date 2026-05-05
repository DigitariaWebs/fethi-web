import * as React from "react";
import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { h: "h-10", icon: "h-5 w-5", small: "text-[8px]", main: "text-[12px]" },
  md: { h: "h-14", icon: "h-7 w-7", small: "text-[10px]", main: "text-base" },
  lg: { h: "h-16", icon: "h-8 w-8", small: "text-[11px]", main: "text-[18px]" },
};

/**
 * Black pill app-store badge with the official Apple silhouette logo and the
 * canonical two-line label ("Télécharger dans l'App Store"). The SVG path is
 * the standard Apple glyph (open-source — used widely in marketing).
 */
export function AppleStoreBadge({ href = "#", className, size = "md" }: BadgeProps) {
  const s = sizes[size];
  return (
    <a
      href={href}
      aria-label="Télécharger dans l'App Store"
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl bg-black px-5 text-white shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.02] hover:bg-[#171615]",
        s.h,
        className,
      )}
    >
      <svg viewBox="0 0 384 512" aria-hidden className={cn("shrink-0 fill-current", s.icon)}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C72.7 141.9 24 184.1 24 269.7c0 25.3 4.6 51.4 13.8 78.4 12.3 35.5 56.6 122.5 102.8 121.1 24.1-.6 41.2-17.2 72.6-17.2 30.5 0 46.3 17.2 73.2 17.2 46.6-.7 86.7-79.8 98.4-115.4-62.6-29.5-66.1-86.4-66.1-88.1zm-91.4-150.6c25.4-29.6 23.1-56.4 22.4-66.1-22.5 1.3-49.5 16.8-65.8 35.6-17.7 20.5-28 45.7-25.8 65.7 24.4 1.9 46.5-9 69.2-35.2z" />
      </svg>
      <span className="text-left leading-tight">
        <span className={cn("block uppercase tracking-wider text-white/70", s.small)}>
          Télécharger dans l&apos;
        </span>
        <span className={cn("block font-semibold", s.main)}>App Store</span>
      </span>
    </a>
  );
}

/**
 * Black pill Play Store badge with the four-segment colored play triangle (the
 * canonical Google Play glyph). All four gradients are inlined as <linearGradient>
 * defs so it renders identically anywhere — no external assets.
 */
export function PlayStoreBadge({ href = "#", className, size = "md" }: BadgeProps) {
  const s = sizes[size];
  const id = React.useId();
  return (
    <a
      href={href}
      aria-label="Disponible sur Google Play"
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl bg-black px-5 text-white shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.02] hover:bg-[#171615]",
        s.h,
        className,
      )}
    >
      <svg viewBox="0 0 32 32" aria-hidden className={cn("shrink-0", s.icon)}>
        <defs>
          <linearGradient id={`${id}-a`} x1="3.5" y1="2" x2="20" y2="18.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00A0FF" />
            <stop offset="1" stopColor="#00DEFF" />
          </linearGradient>
          <linearGradient id={`${id}-b`} x1="29" y1="16" x2="14" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE000" />
            <stop offset="1" stopColor="#FFBD00" />
          </linearGradient>
          <linearGradient id={`${id}-c`} x1="22" y1="22" x2="6" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id={`${id}-d`} x1="6" y1="2" x2="22" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#32A071" />
            <stop offset="1" stopColor="#2DA771" />
          </linearGradient>
        </defs>
        <path d="M3.7 2.4C3.3 2.8 3 3.4 3 4.2v23.6c0 .8.3 1.4.7 1.8L17 16.2 3.7 2.4z" fill={`url(#${id}-a)`} />
        <path d="M21.4 20.6 17 16.2l4.4-4.4 5.5 3.1c1.6.9 1.6 2.4 0 3.3l-5.5 3.4z" fill={`url(#${id}-b)`} />
        <path d="M3.7 29.6c.5.6 1.4.7 2.4.1L21.4 20.6 17 16.2 3.7 29.6z" fill={`url(#${id}-c)`} />
        <path d="M21.4 11.8 6.1 2.3c-1-.6-1.9-.5-2.4.1L17 16.2l4.4-4.4z" fill={`url(#${id}-d)`} />
      </svg>
      <span className="text-left leading-tight">
        <span className={cn("block uppercase tracking-wider text-white/70", s.small)}>
          Disponible sur
        </span>
        <span className={cn("block font-semibold", s.main)}>Google Play</span>
      </span>
    </a>
  );
}
