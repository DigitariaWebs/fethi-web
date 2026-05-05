"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, FileBadge, Search } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { users, KycStatus } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { initials, formatDate } from "@/lib/utils/format";

const tone: Record<KycStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  verified: "success",
  pending: "warning",
  review: "info",
  unverified: "neutral",
  rejected: "danger",
};

const label: Record<KycStatus, string> = {
  verified: "Vérifié",
  pending: "En cours",
  review: "À examiner",
  unverified: "Non vérifié",
  rejected: "Refusé",
};

export default function KycQueuePage() {
  const [query, setQuery] = React.useState("");
  const queue = users
    .filter((u) => u.kyc === "review" || u.kyc === "pending")
    .filter((u) => !query || u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "KYC" }]}
        title="Vérifications KYC"
        description={`${queue.length} dossiers en attente. SLA cible : 24 h.`}
        actions={
          <>
            <Link
              href="/kyc/verified"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-n-200 bg-surface px-3 text-body-sm font-medium text-n-700 hover:bg-n-50"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Comptes vérifiés
            </Link>
            <Link
              href="/kyc/appeals"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-n-200 bg-surface px-3 text-body-sm font-medium text-n-700 hover:bg-n-50"
            >
              Recours
            </Link>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <KPI label="En attente" value={queue.length} tone="warning" />
        <KPI label="Délai médian" value="14 h" tone="info" />
        <KPI label="Taux d'approbation" value="92%" tone="success" />
      </div>

      <Input
        placeholder="Rechercher un nom…"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        leadingIcon={<Search className="h-4 w-4" />}
        className="max-w-md"
      />

      {queue.length === 0 ? (
        <div className="rounded-lg border border-n-100 bg-surface p-12 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
          <p className="mt-3 text-body font-medium text-ink">File vide</p>
          <p className="mt-1 text-body-sm text-n-500">Tous les dossiers KYC sont à jour.</p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {queue.map((u) => (
            <li key={u.id}>
              <Link
                href={`/kyc/${u.id}`}
                className="block rounded-lg border border-n-100 bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium"
              >
                <div className="flex items-start gap-3">
                  <Avatar initials={initials(u.name)} seed={u.id} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-medium text-ink truncate">{u.name}</p>
                    <p className="text-caption text-n-500 truncate">{u.email}</p>
                  </div>
                  <Pill tone={tone[u.kyc]}>{label[u.kyc]}</Pill>
                </div>
                <ul className="mt-3 space-y-1 text-body-sm">
                  <li className="flex justify-between text-n-500">
                    <span>Quartier</span>
                    <span className="text-ink">{neighborhoodName(u.neighborhood)}</span>
                  </li>
                  <li className="flex justify-between text-n-500">
                    <span>Inscrit</span>
                    <span className="text-ink">{formatDate(u.joinedAt)}</span>
                  </li>
                  <li className="flex justify-between text-n-500">
                    <span>Annonces</span>
                    <span className="text-ink tabular">{u.listings}</span>
                  </li>
                  <li className="flex justify-between text-n-500">
                    <span>Signalements</span>
                    <span className={`tabular ${u.flagged > 0 ? "text-danger" : "text-ink"}`}>
                      {u.flagged}
                    </span>
                  </li>
                </ul>
                <div className="mt-3 flex justify-end">
                  <span className="text-body-sm font-medium text-primary">Examiner →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KPI({ label, value, tone }: { label: string; value: React.ReactNode; tone: React.ComponentProps<typeof Pill>["tone"] }) {
  return (
    <div className="rounded-lg border border-n-100 bg-surface p-4">
      <Pill tone={tone}>{label}</Pill>
      <p className="mt-2 text-h2 font-medium tabular tracking-tight text-ink">{value}</p>
    </div>
  );
}
