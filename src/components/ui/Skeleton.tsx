import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-[length:1000px_100%] bg-no-repeat",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(31,36,33,0.04) 0%, rgba(31,36,33,0.08) 50%, rgba(31,36,33,0.04) 100%)",
      }}
    />
  );
}
