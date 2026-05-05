"use client";

import * as React from "react";
import { Banknote } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { EmptyState } from "@/components/ui/EmptyState";
import { orders } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { formatEuro, formatDate } from "@/lib/utils/format";

export default function RefundsPage() {
  const items = orders.filter((o) => o.status === "refunded");

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Remboursements" }]}
        title="Remboursements"
        description="Tous les remboursements émis depuis l'ouverture de la plateforme."
      />
      <div className="grid gap-3 md:grid-cols-3">
        <KPI label="Remboursements ce mois" value={items.length} />
        <KPI label="Montant total remboursé" value={formatEuro(items.reduce((acc, o) => acc + o.amount, 0))} />
        <KPI label="Taux sur GMV" value="0,4%" />
      </div>
      {items.length === 0 ? (
        <EmptyState
          icon={<Banknote className="h-5 w-5" />}
          title="Aucun remboursement émis"
          description="C'est plutôt bon signe — aucun remboursement n'a été déclenché récemment."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
                <th className="px-4 py-2.5 text-left">Référence</th>
                <th className="px-4 py-2.5 text-left">Acheteur</th>
                <th className="px-4 py-2.5 text-left">Annonce</th>
                <th className="px-4 py-2.5 text-left">Montant</th>
                <th className="px-4 py-2.5 text-left">Motif</th>
                <th className="px-4 py-2.5 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
                  <td className="px-4 py-3 font-medium tabular text-ink">{o.ref}</td>
                  <td className="px-4 py-3 text-n-700">{getUser(o.buyerId)?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-n-700 truncate max-w-[260px]">
                    {getListing(o.listingId)?.title ?? "—"}
                  </td>
                  <td className="px-4 py-3 tabular text-ink">{formatEuro(o.amount)}</td>
                  <td className="px-4 py-3"><Pill tone="warning">Litige résolu</Pill></td>
                  <td className="px-4 py-3 text-caption text-n-500">{formatDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function KPI({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-n-100 bg-surface p-4">
      <p className="text-label text-n-500">{label}</p>
      <p className="mt-1 text-h2 font-medium tabular text-ink">{value}</p>
    </div>
  );
}
