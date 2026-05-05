"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { AreaChart, BarChart } from "@/components/admin/charts/Chart";
import { listings } from "@/lib/fixtures/listings";
import { dailyGmv } from "@/lib/fixtures/metrics";
import { getUser } from "@/lib/fixtures/users";
import { formatEuro, formatNumber } from "@/lib/utils/format";
import { colors } from "@/lib/tokens";

const publications = dailyGmv.map((d, i) => ({
  date: d.date.slice(5),
  value: i % 2 === 0 ? 30 + (i % 7) * 4 : 45 + (i % 5) * 4,
}));

export default function AnalyticsListingsPage() {
  const byCategory = Array.from(
    listings.reduce((acc, l) => {
      acc.set(l.category, (acc.get(l.category) ?? 0) + 1);
      return acc;
    }, new Map<string, number>()),
  ).map(([name, value]) => ({ name, value }));

  const topViewed = [...listings].sort((a, b) => b.views - a.views).slice(0, 10);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Annonces" },
        ]}
        title="Analytique — annonces"
        description="Cycle de vie, performance et catégories."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat label="Annonces actives" value={formatNumber(982)} delta={0.043} hint="En ligne maintenant" />
        <KPIStat label="Publiées 7 j" value={formatNumber(284)} delta={0.121} hint="vs. semaine précédente" />
        <KPIStat label="Délai moyen de vente" value="6,2 j" delta={-0.08} hint="Médiane sur 30 j" />
        <KPIStat label="Taux de conversion" value="11,4 %" delta={0.014} hint="Vues → ventes" />
      </div>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Publications — 30 jours</p>
          <p className="mt-1 text-h2 font-medium tabular text-ink">
            {formatNumber(publications.reduce((a, d) => a + d.value, 0))}
          </p>
        </header>
        <AreaChart
          height={240}
          data={publications}
          series={[{ key: "value", label: "Annonces", color: colors.primary }]}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Annonces par catégorie</p>
        </header>
        <BarChart
          height={260}
          data={byCategory}
          xKey="name"
          series={[{ key: "value", label: "Annonces", color: colors.accent }]}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Top 10 annonces les plus vues</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Titre</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Vendeur</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Prix</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Vues</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Sauvegardes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {topViewed.map((l) => {
                const seller = getUser(l.sellerId);
                return (
                  <tr key={l.id} className="hover:bg-n-50">
                    <td className="px-5 py-3">
                      <Link href={`/listings/${l.id}`} className="text-ink hover:text-primary">
                        {l.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-n-700">{seller?.name ?? "—"}</td>
                    <td className="px-5 py-3 tabular text-n-700">{formatEuro(l.price)}</td>
                    <td className="px-5 py-3 tabular text-ink">{formatNumber(l.views)}</td>
                    <td className="px-5 py-3 tabular text-n-700">{l.saves}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
