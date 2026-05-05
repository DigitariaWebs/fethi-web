"use client";

import { useState } from "react";
import { Download, Play } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { formatDateTime } from "@/lib/utils/format";

const saved = [
  { name: "GMV par quartier — mensuel", metric: "GMV", dim: "Quartier", lastRun: "2026-05-04T08:30:00Z", format: "Tableau" },
  { name: "Top 20 vendeurs — trimestre", metric: "Ventes", dim: "Vendeur", lastRun: "2026-05-03T16:12:00Z", format: "Tableau" },
  { name: "Conversion par catégorie", metric: "Conversion", dim: "Catégorie", lastRun: "2026-05-02T11:00:00Z", format: "Graphique" },
  { name: "Rétention cohorte W4", metric: "Rétention", dim: "Cohorte", lastRun: "2026-04-30T09:14:00Z", format: "Tableau" },
  { name: "Litiges par cause — annuel", metric: "Litiges", dim: "Raison", lastRun: "2026-04-22T18:00:00Z", format: "Graphique" },
];

export default function AnalyticsReportsPage() {
  const [metric, setMetric] = useState("GMV");
  const [dim, setDim] = useState("Quartier");
  const [from, setFrom] = useState("2026-04-01");
  const [to, setTo] = useState("2026-05-04");
  const [fmt, setFmt] = useState("Tableau");

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/analytics/users", label: "Analytique" },
          { label: "Rapports personnalisés" },
        ]}
        title="Rapports personnalisés"
        description="Compose et exporte tes propres tableaux de bord."
      />

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <p className="text-h3 font-medium text-ink">Nouveau rapport</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Field label="Métrique">
            <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
              <option>GMV</option>
              <option>Ventes</option>
              <option>Inscriptions</option>
              <option>Conversion</option>
              <option>Rétention</option>
              <option>Litiges</option>
            </Select>
          </Field>
          <Field label="Dimension">
            <Select value={dim} onChange={(e) => setDim(e.target.value)}>
              <option>Quartier</option>
              <option>Catégorie</option>
              <option>Vendeur</option>
              <option>Cohorte</option>
              <option>Raison</option>
              <option>Jour</option>
            </Select>
          </Field>
          <Field label="Format">
            <Select value={fmt} onChange={(e) => setFmt(e.target.value)}>
              <option>Tableau</option>
              <option>Graphique</option>
            </Select>
          </Field>
          <Field label="Du">
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="Au">
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Button variant="primary"><Play className="h-3.5 w-3.5" /> Exécuter</Button>
          <Button variant="outline">Sauvegarder</Button>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="border-b border-n-100 px-5 py-4">
          <p className="text-h3 font-medium text-ink">Rapports sauvegardés</p>
        </header>
        <ul className="divide-y divide-n-100">
          {saved.map((r) => (
            <li key={r.name} className="flex items-center gap-4 px-5 py-3 hover:bg-n-50">
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-ink">{r.name}</p>
                <p className="text-caption text-n-500">
                  {r.metric} · {r.dim} · dernière exécution {formatDateTime(r.lastRun)}
                </p>
              </div>
              <Pill tone="neutral">{r.format}</Pill>
              <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /> CSV</Button>
              <Button variant="outline" size="sm">Ouvrir</Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
