import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
  width = "default",
}: {
  className?: string;
  children: React.ReactNode;
  width?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        width === "narrow" && "max-w-[760px]",
        width === "default" && "max-w-[1200px]",
        width === "wide" && "max-w-[1320px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-label uppercase tracking-[0.16em] text-n-500",
        className,
      )}
    >
      <span className="h-px w-8 bg-n-300" />
      {children}
    </span>
  );
}
