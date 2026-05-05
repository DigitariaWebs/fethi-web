"use client";

import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { AreaChart } from "@/components/admin/charts/Chart";
import { formatNumber } from "@/lib/utils/format";
import { colors } from "@/lib/tokens";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const dau = Array.from({ length: 30 }, (_, i) => {
  const dayOfWeek = i % 7;
  const base = 580 + (i * 6);
  const dip = dayOfWeek === 5 || dayOfWeek === 6 ? -120 : 0;
  return { date: `j-${30 - i}`, value: base + dip + ((i * 13) % 80) };
});

function heatValue(d: number, h: number): number {
  // Simulate realistic engagement: peaks 12-14 and 19-22, weekend midday spike
  const isWeekend = d >= 5;
  const morning = h >= 8 && h <= 11 ? 0.5 : 0;
  const lunch = h >= 12 && h <= 14 ? 0.85 : 0;
  const evening = h >= 18 && h <= 22 ? 1.0 : 0;
  const night = h >= 23 || h <= 5 ? 0.05 : 0.2;
  const base = Math.max(morning, lunch, evening, night);
  const mod = isWeekend && h >= 11 && h <= 17 ? 0.3 : 0;
  return Math.min(1, base + mod + ((d * 7 + h * 3) % 13) / 100);
}

const features = [
  { name: "Recherche annonces", users: 4218, share: 81 },
  { name: "Messages", users: 3640, share: 70 },
  { name: "Sauvegardes", users: 2842, share: 55 },
  { name: "Filtre quartier", users: 2410, share: 46 },
  { name: "Publication annonce", users: 1248, share: 24 },
  { name: "Profil vendeur", users: 1042, share: 20 },
];

export default function AnalyticsEngagementPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Engagement" },
        ]}
        title="Analytique — engagement"
        description="Activité, fréquence et heures de pointe."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat label="DAU" value={formatNumber(742)} delta={0.061} hint="Utilisateurs actifs jour" />
        <KPIStat label="WAU" value={formatNumber(1842)} delta={0.115} hint="7 derniers jours" />
        <KPIStat label="MAU" value={formatNumber(3940)} delta={0.082} hint="30 derniers jours" />
        <KPIStat label="Session moy." value="4 min 12 s" delta={0.04} hint="Tous écrans" />
      </div>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Utilisateurs actifs jour — 30 j</p>
        </header>
        <AreaChart
          height={240}
          data={dau}
          series={[{ key: "value", label: "DAU", color: colors.accent }]}
        />
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <header className="pb-4">
          <p className="text-label uppercase tracking-wide text-n-500">Heures d&apos;activité</p>
          <p className="mt-1 text-body-sm text-n-500">7 jours × 24 heures · intensité d&apos;engagement</p>
        </header>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="flex items-center gap-1 pl-12 mb-1">
              {hours.map((h) => (
                <span key={h} className="flex-1 text-center text-caption text-n-400 tabular">
                  {h % 4 === 0 ? `${h}h` : ""}
                </span>
              ))}
            </div>
            {days.map((d, di) => (
              <div key={d} className="flex items-center gap-1 mb-1">
                <span className="w-12 text-caption text-n-500">{d}</span>
                {hours.map((h) => {
                  const v = heatValue(di, h);
                  return (
                    <span
                      key={h}
                      className="flex-1 h-7 rounded-sm"
                      title={`${d} ${h}h — ${Math.round(v * 100)}%`}
                      style={{ background: `rgba(200,85,61,${0.06 + v * 0.55})` }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Fonctionnalités les plus utilisées</p>
          <p className="text-body-sm text-n-500">7 derniers jours</p>
        </header>
        <ul className="divide-y divide-n-100">
          {features.map((f) => (
            <li key={f.name} className="flex items-center gap-4 px-5 py-3">
              <span className="flex-1 text-body text-ink">{f.name}</span>
              <span className="text-body-sm tabular text-n-700">{formatNumber(f.users)} utilisateurs</span>
              <div className="hidden sm:block w-32 h-1.5 overflow-hidden rounded-full bg-n-100">
                <div className="h-full bg-primary" style={{ width: `${f.share}%` }} />
              </div>
              <span className="w-12 text-right text-caption tabular text-n-500">{f.share}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
