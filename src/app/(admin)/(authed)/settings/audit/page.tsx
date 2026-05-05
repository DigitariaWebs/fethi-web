"use client";

import Link from "next/link";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Pill } from "@/components/ui/Pill";
import { formatDateTime } from "@/lib/utils/format";

const logs = [
  {
    id: "ev_001",
    at: "2026-05-04T13:42:00Z",
    actor: "admin",
    action: "Compte suspendu",
    target: "Julien Picard",
    targetHref: "/users/u_julien_p",
    severity: "warning" as const,
  },
  {
    id: "ev_002",
    at: "2026-05-03T20:42:00Z",
    actor: "système",
    action: "Annonce rejetée",
    target: "Rolex Submariner réplique",
    targetHref: "/listings/l_montre_pas_cher",
    severity: "danger" as const,
  },
  {
    id: "ev_003",
    at: "2026-05-03T18:14:00Z",
    actor: "admin",
    action: "Remboursement émis",
    target: "MS-26-04-0772",
    targetHref: "/orders/o_008",
    severity: "info" as const,
  },
  {
    id: "ev_004",
    at: "2026-05-03T11:00:00Z",
    actor: "admin",
    action: "Catégorie modifiée",
    target: "high-tech",
    targetHref: "/settings/categories",
    severity: "info" as const,
  },
  {
    id: "ev_005",
    at: "2026-05-02T16:30:00Z",
    actor: "admin",
    action: "Réglage modifié",
    target: "commission : 4 % → 5 %",
    targetHref: "/settings/system",
    severity: "info" as const,
  },
  {
    id: "ev_006",
    at: "2026-05-02T10:14:00Z",
    actor: "admin",
    action: "KYC validé",
    target: "Nora Khaled",
    targetHref: "/users/u_nora_k",
    severity: "success" as const,
  },
  {
    id: "ev_007",
    at: "2026-05-01T09:50:00Z",
    actor: "admin",
    action: "Litige attribué",
    target: "MS-26-05-0017",
    targetHref: "/disputes",
    severity: "warning" as const,
  },
  {
    id: "ev_008",
    at: "2026-04-30T22:11:00Z",
    actor: "système",
    action: "Webhook rejoué",
    target: "stripe.payout.paid",
    targetHref: "/settings/webhooks",
    severity: "info" as const,
  },
  {
    id: "ev_009",
    at: "2026-04-30T14:00:00Z",
    actor: "admin",
    action: "Annonce mise en avant",
    target: "PS4 + 5 jeux",
    targetHref: "/listings/l_ps4",
    severity: "info" as const,
  },
  {
    id: "ev_010",
    at: "2026-04-29T09:14:00Z",
    actor: "admin",
    action: "Clé API créée",
    target: "Mobile App",
    targetHref: "/settings/api-keys",
    severity: "warning" as const,
  },
];

const sevTone: Record<string, "info" | "success" | "warning" | "danger"> = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

export default function SettingsAuditPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Journal d'audit" },
        ]}
        title="Journal d&apos;audit"
        description="Trace de toutes les actions admin & système."
      />

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <div className="grid gap-3 md:grid-cols-4">
          <Field label="Acteur">
            <Select defaultValue="all">
              <option value="all">Tous</option>
              <option>admin</option>
              <option>système</option>
            </Select>
          </Field>
          <Field label="Action">
            <Select defaultValue="all">
              <option value="all">Toutes</option>
              <option>Suspensions</option>
              <option>Rejets</option>
              <option>Remboursements</option>
              <option>Réglages</option>
            </Select>
          </Field>
          <Field label="Du">
            <Input type="date" defaultValue="2026-04-01" />
          </Field>
          <Field label="Au">
            <Input type="date" defaultValue="2026-05-04" />
          </Field>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Quand</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Acteur</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Action</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Cible</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Sévérité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-n-50">
                  <td className="px-5 py-3 text-n-500">{formatDateTime(l.at)}</td>
                  <td className="px-5 py-3 text-ink">{l.actor}</td>
                  <td className="px-5 py-3 text-n-700">{l.action}</td>
                  <td className="px-5 py-3">
                    <Link href={l.targetHref} className="text-primary hover:text-primary-hover">
                      {l.target}
                    </Link>
                  </td>
                  <td className="px-5 py-3"><Pill tone={sevTone[l.severity]} dot>{l.severity}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
