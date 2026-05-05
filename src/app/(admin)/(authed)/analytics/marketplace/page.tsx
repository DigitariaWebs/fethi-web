"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { Avatar } from "@/components/ui/Avatar";
import { LineChart } from "@/components/admin/charts/Chart";
import { dailyGmv, funnel, summary } from "@/lib/fixtures/metrics";
import { users } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatEuro, formatNumber } from "@/lib/utils/format";
import { colors } from "@/lib/tokens";

export default function AnalyticsMarketplacePage() {
  const gmvData = dailyGmv.map((d) => ({ date: d.date.slice(5), value: d.value }));
  const topVendors = [...users].sort((a, b) => b.gmv - a.gmv).slice(0, 5);
  const funnelMax = funnel[0].value;

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Marketplace" },
        ]}
        title="Analytique — marketplace"
        description="GMV, funnel d'achat et performance commerciale."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat label="GMV — mois" value={formatEuro(summary.gmvMonth)} delta={summary.gmvDelta} />
        <KPIStat label="Take rate" value="4,0 %" hint="Effectif après remboursements" />
        <KPIStat label="Panier moyen" value={formatEuro(72)} delta={0.024} hint="Hors expéditions" />
        <KPIStat label="Conversion" value="1,9 %" delta={0.011} hint="Visite → achat" />
      </div>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">GMV quotidien — 30 jours</p>
          <p className="mt-1 text-h2 font-medium tabular text-ink">
            {formatEuro(gmvData.reduce((a, d) => a + d.value, 0))}
          </p>
        </header>
        <LineChart
          height={240}
          data={gmvData}
          series={[{ key: "value", label: "GMV", color: colors.primary }]}
          formatY={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`)}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Funnel d&apos;achat — 30 j</p>
          <p className="mt-1 text-body-sm text-n-500">De la visite à l&apos;achat finalisé</p>
        </header>
        <ul className="space-y-3">
          {funnel.map((f, i) => {
            const pct = Math.round((f.value / funnelMax) * 100);
            const dropoff = i > 0 ? Math.round(((funnel[i - 1].value - f.value) / funnel[i - 1].value) * 100) : 0;
            return (
              <li key={f.step}>
                <div className="flex items-center justify-between text-body-sm mb-1">
                  <span className="text-n-700">{f.step}</span>
                  <span className="tabular text-ink">
                    {formatNumber(f.value)}{" "}
                    <span className="text-n-500">({pct}%)</span>
                    {i > 0 ? <span className="ml-2 text-danger">−{dropoff}%</span> : null}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-md bg-n-100">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Leaderboard vendeurs</p>
          <p className="text-body-sm text-n-500">Top 5 par GMV</p>
        </header>
        <ul className="divide-y divide-n-100">
          {topVendors.map((u, i) => (
            <li key={u.id}>
              <Link
                href={`/users/${u.id}`}
                className="flex items-center gap-4 px-5 py-3 hover:bg-n-50"
              >
                <span className="text-h3 font-medium tabular text-n-400 w-6">{i + 1}</span>
                <Avatar initials={u.avatarSeed} seed={u.id} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium text-ink">{u.name}</p>
                  <p className="text-caption text-n-500">{neighborhoodName(u.neighborhood)} · {u.sales} ventes</p>
                </div>
                <span className="text-h3 font-medium tabular text-ink">{formatEuro(u.gmv)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
