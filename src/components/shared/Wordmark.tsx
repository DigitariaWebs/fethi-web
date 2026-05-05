import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function Wordmark({
  className,
  invert,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-serif text-[1.5rem] leading-none tracking-tight",
        // Use a STATIC cream literal in dark mode. We can't reuse `dark:text-paper`
        // here because `paper` itself is a CSS variable that flips to a dark
        // warm-earth value in dark mode — that override would render the
        // wordmark dark-on-dark.
        invert ? "text-paper" : "text-ink dark:!text-white",
        className,
      )}
    >
      My
      <em
        className={cn(
          "not-italic font-serif italic",
          // Light: brand terracotta italic. Dark / inverted: cream literal —
          // terracotta italic on the dark warm surface reads muddy and merges
          // with the Mark sitting next to it.
          invert ? "text-paper" : "text-primary dark:!text-white",
        )}
      >
        Street
      </em>
    </span>
  );
}

// The brand mark — terracotta map-pin + house glyph (public/mystreet-logo.png).
// `invert` re-colors the PNG to solid white via CSS filter, so the same single
// asset works on light AND dark/coloured surfaces (`brightness(0)` flattens
// the colours, then `invert(1)` flips black → white).
export function Mark({
  className,
  size = 32,
  invert,
}: {
  className?: string;
  size?: number;
  invert?: boolean;
}) {
  return (
    <span
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Image
        src="/mystreet-logo.png"
        alt=""
        fill
        sizes={`${size}px`}
        priority
        className={cn(
          "object-contain",
          invert && "[filter:brightness(0)_invert(1)]",
        )}
      />
    </span>
  );
}

export function Logo({
  className,
  invert,
  size = 32,
}: {
  className?: string;
  invert?: boolean;
  size?: number;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      aria-label="MyStreet"
    >
      <Mark size={size} invert={invert} />
      <Wordmark invert={invert} />
    </span>
  );
}
