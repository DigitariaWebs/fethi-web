"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavTabs({
  items,
  className,
}: {
  items: { href: string; label: string; count?: number }[];
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={cn("flex items-center gap-1 border-b border-n-100", className)}>
      {items.map((it) => {
        const active = pathname === it.href || pathname.startsWith(it.href + "/");
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "relative px-3 py-2.5 text-body-sm font-medium transition-colors",
              active ? "text-ink" : "text-n-500 hover:text-n-700",
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              {it.label}
              {typeof it.count === "number" ? (
                <span className={cn("rounded-full px-1.5 py-px text-caption tabular", active ? "bg-primary-soft text-primary-ink" : "bg-n-100 text-n-500")}>
                  {it.count}
                </span>
              ) : null}
            </span>
            {active ? (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 border-b border-n-100", className)}>
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className={cn(
              "relative px-3 py-2.5 text-body-sm font-medium transition-colors",
              active ? "text-ink" : "text-n-500 hover:text-n-700",
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              {t.label}
              {typeof t.count === "number" ? (
                <span className={cn("rounded-full px-1.5 py-px text-caption tabular", active ? "bg-primary-soft text-primary-ink" : "bg-n-100 text-n-500")}>
                  {t.count}
                </span>
              ) : null}
            </span>
            {active ? (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
