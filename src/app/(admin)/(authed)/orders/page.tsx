"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Filter, Search } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { orders, Order, OrderStatus } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { formatEuro, formatDate } from "@/lib/utils/format";

const tone: Record<OrderStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  completed: "success",
  shipped: "info",
  in_transit: "info",
  pending_payment: "warning",
  disputed: "danger",
  refunded: "danger",
  cancelled: "neutral",
};

const label: Record<OrderStatus, string> = {
  completed: "Finalisée",
  shipped: "Expédiée",
  in_transit: "En transit",
  pending_payment: "Paiement en attente",
  disputed: "Litige",
  refunded: "Remboursée",
  cancelled: "Annulée",
};

export default function OrdersPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<OrderStatus | "all">("all");

  const filtered = orders.filter((o) => {
    if (status !== "all" && o.status !== status) return false;
    if (query && !o.ref.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "ref",
        header: "Référence",
        accessorKey: "ref",
        cell: ({ row }) => (
          <span className="font-medium text-ink tabular">{row.original.ref}</span>
        ),
      },
      {
        id: "buyer",
        header: "Acheteur",
        cell: ({ row }) => (
          <span className="text-body-sm text-n-700">
            {getUser(row.original.buyerId)?.name ?? "—"}
          </span>
        ),
      },
      {
        id: "seller",
        header: "Vendeur",
        cell: ({ row }) => (
          <span className="text-body-sm text-n-700">
            {getUser(row.original.sellerId)?.name ?? "—"}
          </span>
        ),
      },
      {
        id: "listing",
        header: "Annonce",
        cell: ({ row }) => (
          <span className="text-body-sm text-n-700 truncate block max-w-[260px]">
            {getListing(row.original.listingId)?.title ?? row.original.listingId}
          </span>
        ),
      },
      {
        id: "amount",
        header: "Montant",
        accessorKey: "amount",
        cell: ({ row }) => (
          <span className="text-body-sm tabular text-ink">{formatEuro(row.original.amount)}</span>
        ),
      },
      {
        id: "fee",
        header: "Frais",
        accessorKey: "fee",
        cell: ({ row }) => (
          <span className="text-body-sm tabular text-n-500">{formatEuro(row.original.fee)}</span>
        ),
      },
      {
        id: "status",
        header: "Statut",
        accessorKey: "status",
        cell: ({ row }) => <Pill tone={tone[row.original.status]} dot>{label[row.original.status]}</Pill>,
      },
      {
        id: "createdAt",
        header: "Date",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span className="text-caption text-n-500">{formatDate(row.original.createdAt)}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Commandes" }]}
        title="Commandes"
        description={`${orders.length} transactions — ${orders.filter((o) => o.status === "disputed").length} en litige.`}
        actions={
          <Button variant="outline" size="sm">
            <Filter className="h-3.5 w-3.5" />
            Exporter
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Rechercher référence (MS-…)"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leadingIcon={<Search className="h-4 w-4" />}
          className="w-72"
        />
        <Select
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value as OrderStatus | "all")}
          className="w-52"
        >
          <option value="all">Tous statuts</option>
          {(Object.keys(label) as OrderStatus[]).map((s) => (
            <option key={s} value={s}>{label[s]}</option>
          ))}
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(o) => o.id}
        onRowClick={(o) => router.push(`/orders/${o.id}`)}
        empty="Aucune commande."
      />
    </div>
  );
}
