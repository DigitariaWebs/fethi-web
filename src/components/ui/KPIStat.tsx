import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function KPIStat({
  label,
  value,
  delta,
  hint,
  trend,
  className,
}: {
  label: string;
  value: string | number;
  delta?: number; // 0.082 = +8.2%
  hint?: string;
  trend?: React.ReactNode;
  className?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className={cn("rounded-lg border border-n-100 bg-surface p-4", className)}>
      <p className="text-label text-n-500">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <p className="text-h2 font-medium tabular tracking-tight text-ink">{value}</p>
        {typeof delta === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-caption font-medium tabular",
              positive ? "text-success" : "text-danger",
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {(delta * 100).toFixed(1).replace(".", ",")}%
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-1 text-caption text-n-400">{hint}</p> : null}
      {trend ? <div className="mt-3 h-10 -mx-1">{trend}</div> : null}
    </div>
  );
}
