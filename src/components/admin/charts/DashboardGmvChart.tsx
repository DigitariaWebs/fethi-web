"use client";

import { AreaChart } from "./Chart";
import { dailyGmv, newSignups } from "@/lib/fixtures/metrics";
import { colors } from "@/lib/tokens";

export function DashboardGmvChart() {
  const data = dailyGmv.map((d, i) => ({
    date: d.date.slice(5),
    gmv: d.value,
    signups: newSignups[i]?.value ?? 0,
  }));
  return (
    <AreaChart
      height={260}
      data={data}
      series={[
        { key: "gmv", label: "GMV", color: colors.primary },
        { key: "signups", label: "Inscriptions", color: colors.accent },
      ]}
      formatY={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`)}
    />
  );
}
