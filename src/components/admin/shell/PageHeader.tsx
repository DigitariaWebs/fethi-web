import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-body-sm text-n-500">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="inline-flex items-center gap-1">
            {c.href && !last ? (
              <Link href={c.href} className="hover:text-n-700">
                {c.label}
              </Link>
            ) : (
              <span className={cn(last && "text-ink font-medium")}>{c.label}</span>
            )}
            {!last ? <ChevronRight className="h-3 w-3 text-n-300" /> : null}
          </span>
        );
      })}
    </nav>
  );
}

export function PageHeader({
  crumbs,
  title,
  description,
  meta,
  actions,
  className,
}: {
  crumbs?: Crumb[];
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {crumbs ? <Breadcrumbs items={crumbs} /> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-h1 font-medium tracking-tight text-ink">{title}</h1>
          {description ? (
            <p className="text-body text-n-500 max-w-2xl">{description}</p>
          ) : null}
          {meta ? <div className="pt-1">{meta}</div> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
