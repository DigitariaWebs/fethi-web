"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "link";
type Size = "sm" | "md" | "lg";

// Pill button system — parity with MyStreet-Mobile design (components.jsx).
// • All variants render as full pills (rounded-full).
// • Primary / danger have a glossy top shine gradient + warm drop shadow.
// • Secondary / outline use frosted glass with backdrop-blur + saturate.
// • Ghost is a transparent fill that wakes up on hover.
// • Link is the only non-pill — inline text with underline-on-hover.
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-150 ease-out-quint disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper select-none";

// Glass variants — same recipe in both modes: a translucent surface, an inset
// highlight, and a soft drop shadow. In dark we just flip white→cream so the
// frost reads correctly over a dark page (and so cream text-ink doesn't melt
// into a white pill, which is how the Google SSO button broke in dark mode).
const glassClasses =
  "bg-white/[0.72] text-ink border border-[rgba(31,36,33,0.10)] backdrop-blur-[16px] backdrop-saturate-[1.4] shadow-btn-glass hover:bg-white/[0.85] hover:border-[rgba(31,36,33,0.14)] hover:shadow-btn-glass-hover active:bg-[rgba(236,230,221,0.85)] " +
  "dark:bg-white/[0.06] dark:border-white/[0.10] dark:hover:bg-white/[0.10] dark:hover:border-white/[0.18] dark:active:bg-white/[0.14]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-btn-shine hover:bg-primary-hover hover:shadow-btn-shine-hover active:bg-primary-pressed active:shadow-btn-shine",
  secondary: glassClasses,
  outline: glassClasses,
  ghost:
    "text-ink hover:bg-[rgba(31,36,33,0.05)] active:bg-[rgba(31,36,33,0.09)] dark:hover:bg-white/[0.06] dark:active:bg-white/[0.10]",
  danger:
    "bg-danger text-white shadow-btn-shine-danger hover:opacity-95 active:opacity-90",
  link:
    "rounded-none px-0 text-primary underline-offset-4 hover:underline shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-body-sm gap-1.5",
  md: "h-11 px-5 text-body gap-2",
  lg: "h-14 px-7 text-body-lg gap-2.5",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

export function Button(props: ButtonProps | ButtonAsLinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);
  // Glossy top-half shine for solid variants. Sits above background, below content.
  const showShine = variant === "primary" || variant === "danger";
  const shine = showShine ? <Shine /> : null;
  const wrapped = (
    <>
      {shine}
      <span className="relative z-[1] inline-flex items-center gap-[inherit]">
        {children}
      </span>
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest;
    // Hash-only links go through native <a> — Next/Link concatenates the
    // fragment on same-page hash navigation (would produce /#waitlist#waitlist).
    const isHashAnchor = href.startsWith("#") || href.startsWith("/#");
    if (isHashAnchor) {
      return (
        <a href={href} className={cls} {...anchorRest}>
          {wrapped}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {wrapped}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {wrapped}
    </button>
  );
}

function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent"
    />
  );
}
