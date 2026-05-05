"use client";

import { PageHeader } from "@/components/admin/shell/PageHeader";
import { BarChart } from "@/components/admin/charts/Chart";
import { geoBreakdown } from "@/lib/fixtures/metrics";
import { formatEuro, formatNumber } from "@/lib/utils/format";
import { chartPalette, colors } from "@/lib/tokens";

export default function AnalyticsGeoPage() {
  const data = geoBreakdown.map((g) => ({ name: g.neighborhood, users: g.users }));
  const maxUsers = Math.max(...geoBreakdown.map((g) => g.users));

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Géographie" },
        ]}
        title="Analytique — géographie"
        description="Répartition par quartier de Lille intra-muros."
      />

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Utilisateurs par quartier</p>
        </header>
        <BarChart
          height={300}
          data={data}
          xKey="name"
          series={[{ key: "users", label: "Utilisateurs", color: colors.primary }]}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Carte</p>
          <p className="mt-1 text-body-sm text-n-500">Visualisation Lille intra-muros — bientôt</p>
        </header>
        <div className="relative h-[320px] rounded-md bg-paper border border-dashed border-n-200 overflow-hidden">
          {geoBreakdown.map((g, i) => {
            const size = 40 + (g.users / maxUsers) * 90;
            const positions = [
              { top: "20%", left: "32%" },
              { top: "55%", left: "28%" },
              { top: "42%", left: "18%" },
              { top: "70%", left: "48%" },
              { top: "22%", left: "70%" },
              { top: "48%", left: "8%" },
              { top: "80%", left: "32%" },
              { top: "55%", left: "72%" },
            ];
            const pos = positions[i] ?? { top: "50%", left: "50%" };
            return (
              <div
                key={g.neighborhood}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-caption font-medium text-paper"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: size,
                  height: size,
                  background: chartPalette[i % chartPalette.length],
                  opacity: 0.78,
                }}
                title={`${g.neighborhood} — ${g.users} utilisateurs`}
              >
                {g.neighborhood.split("-")[0]}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Détail par quartier</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Quartier</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Utilisateurs</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Annonces</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">GMV</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">GMV / utilisateur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {geoBreakdown.map((g) => (
                <tr key={g.neighborhood} className="hover:bg-n-50">
                  <td className="px-5 py-3 text-ink">{g.neighborhood}</td>
                  <td className="px-5 py-3 tabular text-n-700">{formatNumber(g.users)}</td>
                  <td className="px-5 py-3 tabular text-n-700">{formatNumber(g.listings)}</td>
                  <td className="px-5 py-3 tabular text-ink">{formatEuro(g.gmv)}</td>
                  <td className="px-5 py-3 tabular text-n-700">{formatEuro(g.gmv / g.users)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
