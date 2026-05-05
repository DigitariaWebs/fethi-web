import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-n-200 bg-paper px-6 py-12 text-center",
        className,
      )}
    >
      {icon ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-n-100 text-n-500">
          {icon}
        </span>
      ) : null}
      <div className="space-y-1">
        <p className="text-body font-medium text-ink">{title}</p>
        {description ? <p className="text-body-sm text-n-500 max-w-sm mx-auto">{description}</p> : null}
      </div>
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
