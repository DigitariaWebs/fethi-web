"use client";

import * as React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { orders, Order } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { formatEuro, formatDate, timeAgo } from "@/lib/utils/format";

export default function DisputesPage() {
  const items = orders.filter((o) => o.status === "disputed");

  const columns: ColumnDef<Order>[] = [
    {
      id: "ref",
      header: "Référence",
      accessorKey: "ref",
      cell: ({ row }) => <span className="font-medium tabular text-ink">{row.original.ref}</span>,
    },
    {
      id: "subject",
      header: "Annonce",
      cell: ({ row }) => (
        <span className="text-body-sm text-n-700 truncate block max-w-[260px]">
          {getListing(row.original.listingId)?.title ?? "—"}
        </span>
      ),
    },
    {
      id: "buyer",
      header: "Acheteur",
      cell: ({ row }) => (
        <span className="text-body-sm text-n-700">{getUser(row.original.buyerId)?.name ?? "—"}</span>
      ),
    },
    {
      id: "seller",
      header: "Vendeur",
      cell: ({ row }) => (
        <span className="text-body-sm text-n-700">{getUser(row.original.sellerId)?.name ?? "—"}</span>
      ),
    },
    {
      id: "amount",
      header: "Montant",
      accessorKey: "amount",
      cell: ({ row }) => <span className="tabular text-ink">{formatEuro(row.original.amount)}</span>,
    },
    {
      id: "openedAt",
      header: "Ouvert",
      accessorKey: "createdAt",
      cell: ({ row }) => <span className="text-caption text-n-500">{timeAgo(row.original.createdAt)}</span>,
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => (
        <Link href={`/disputes/${row.original.id}`} className="text-body-sm font-medium text-primary hover:text-primary-hover">
          Examiner →
        </Link>
      ),
    },
  ];

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Litiges" }]}
        title="Litiges"
        description={`${items.length} litiges ouverts. Médiation requise.`}
      />
      {items.length === 0 ? (
        <div className="rounded-lg border border-n-100 bg-surface p-12 text-center">
          <Scale className="mx-auto h-8 w-8 text-success" />
          <p className="mt-3 text-body font-medium text-ink">Aucun litige en attente</p>
          <p className="mt-1 text-body-sm text-n-500">La marketplace tourne en confiance ce mois-ci.</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          <KPI label="Litiges ouverts" value={items.length} tone="danger" />
          <KPI label="Délai moyen de résolution" value="2,4 j" tone="info" />
          <KPI label="Taux d'arbitrage en faveur acheteur" value="64%" tone="warning" />
        </div>
      )}
      <DataTable columns={columns} data={items} getRowId={(o) => o.id} empty="Aucun litige." />
      <p className="text-caption text-n-500">
        Conseil : examinez l&apos;échange de messages avant toute décision. Documentation
        admin :{" "}
        <Link href="/moderation/policies" className="text-primary hover:underline">
          politiques de modération
        </Link>
        .
      </p>
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
