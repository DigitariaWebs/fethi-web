"use client";

import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { LineChart, BarChart } from "@/components/admin/charts/Chart";
import { newSignups, geoBreakdown, summary } from "@/lib/fixtures/metrics";
import { formatNumber } from "@/lib/utils/format";
import { colors } from "@/lib/tokens";

const cohorts = [
  { cohort: "Sem. 14 — 7 avr.", size: 312, w1: 100, w2: 68, w3: 51, w4: 42 },
  { cohort: "Sem. 15 — 14 avr.", size: 348, w1: 100, w2: 72, w3: 54, w4: 44 },
  { cohort: "Sem. 16 — 21 avr.", size: 396, w1: 100, w2: 70, w3: 52, w4: null },
  { cohort: "Sem. 17 — 28 avr.", size: 412, w1: 100, w2: 74, w3: null, w4: null },
  { cohort: "Sem. 18 — 5 mai", size: 287, w1: 100, w2: null, w3: null, w4: null },
];

export default function AnalyticsUsersPage() {
  const signupsData = newSignups.map((d) => ({ date: d.date.slice(5), value: d.value }));
  const geoData = geoBreakdown.map((g) => ({ name: g.neighborhood, users: g.users }));

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Utilisateurs" },
        ]}
        title="Analytique — utilisateurs"
        description="Acquisition, rétention et répartition par quartier."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat label="Utilisateurs totaux" value={formatNumber(summary.users)} delta={summary.usersDelta} hint="Tous comptes confondus" />
        <KPIStat label="Inscriptions 7 j" value={formatNumber(342)} delta={0.094} hint="vs. semaine précédente" />
        <KPIStat label="Rétention W4" value="42 %" delta={0.018} hint="Cohorte avr.-S15" />
        <KPIStat label="Taux de churn" value="4,8 %" delta={-0.006} hint="Mensuel glissant" />
      </div>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Inscriptions — 30 jours</p>
          <p className="mt-1 text-h2 font-medium tabular tracking-tight text-ink">
            {formatNumber(signupsData.reduce((a, d) => a + d.value, 0))}
          </p>
        </header>
        <LineChart
          height={240}
          data={signupsData}
          series={[{ key: "value", label: "Inscriptions", color: colors.primary }]}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Cohortes hebdomadaires</p>
          <p className="text-body-sm text-n-500">Rétention en % par semaine après inscription</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Cohorte</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Taille</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">S1</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">S2</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">S3</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">S4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {cohorts.map((c) => (
                <tr key={c.cohort}>
                  <td className="px-5 py-3 text-ink">{c.cohort}</td>
                  <td className="px-5 py-3 tabular text-n-700">{c.size}</td>
                  {[c.w1, c.w2, c.w3, c.w4].map((v, i) => (
                    <td key={i} className="px-5 py-3">
                      {v === null ? (
                        <span className="text-n-300">—</span>
                      ) : (
                        <span
                          className="inline-flex h-7 min-w-[48px] items-center justify-center rounded-md text-caption font-medium tabular"
                          style={{
                            background: `rgba(200,85,61,${0.06 + (v / 100) * 0.32})`,
                            color: colors.primaryInk,
                          }}
                        >
                          {v}%
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Utilisateurs par quartier</p>
          <p className="mt-1 text-body-sm text-n-500">Lille intra-muros</p>
        </header>
        <BarChart
          height={300}
          vertical
          data={geoData}
          xKey="name"
          series={[{ key: "users", label: "Utilisateurs", color: colors.primary }]}
        />
      </section>
    </div>
  );
}
