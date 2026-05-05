"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Flag, Search, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { listings, Listing, ListingStatus } from "@/lib/fixtures/listings";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { getUser } from "@/lib/fixtures/users";
import { formatDate, formatEuro, initials } from "@/lib/utils/format";

const statusTone: Record<ListingStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  active: "success",
  pending: "warning",
  sold: "neutral",
  rejected: "danger",
  flagged: "warning",
  draft: "neutral",
};

const statusLabel: Record<ListingStatus, string> = {
  active: "Actif",
  pending: "En attente",
  sold: "Vendu",
  rejected: "Refusé",
  flagged: "Signalé",
  draft: "Brouillon",
};

export default function ListingsPendingPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const data = React.useMemo(
    () => listings.filter((l) => l.status === "pending" || l.status === "flagged"),
    [],
  );

  const columns = React.useMemo<ColumnDef<Listing>[]>(
    () => [
      {
        id: "title",
        header: "Annonce",
        accessorKey: "title",
        size: 320,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <span
              className="h-9 w-9 shrink-0 rounded-md"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,85,61,0.20) 0%, rgba(47,107,94,0.10) 100%)",
              }}
            />
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-ink truncate">
                {row.original.title}{" "}
                {row.original.featured ? (
                  <Star className="inline-block h-3 w-3 fill-warning text-warning" />
                ) : null}
              </p>
              <p className="text-caption text-n-500 capitalize">
                {row.original.category} · {row.original.type}
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "seller",
        header: "Vendeur",
        cell: ({ row }) => {
          const seller = getUser(row.original.sellerId);
          if (!seller) return <span className="text-n-400">—</span>;
          return (
            <div className="flex items-center gap-2">
              <Avatar initials={initials(seller.name)} seed={seller.id} size="xs" />
              <span className="text-body-sm text-n-700">{seller.name}</span>
            </div>
          );
        },
      },
      {
        id: "price",
        header: "Prix",
        accessorKey: "price",
        cell: ({ row }) => (
          <span className="text-body-sm tabular text-ink">
            {formatEuro(row.original.price)}
            {row.original.priceUnit ? (
              <span className="text-n-500">/{row.original.priceUnit}</span>
            ) : null}
          </span>
        ),
      },
      {
        id: "neighborhood",
        header: "Quartier",
        cell: ({ row }) => (
          <span className="text-body-sm text-n-700">
            {neighborhoodName(row.original.neighborhood)}
          </span>
        ),
      },
      {
        id: "flags",
        header: "Signalements",
        accessorFn: (l) => l.flags ?? 0,
        cell: ({ row }) => {
          const n = row.original.flags ?? 0;
          if (n === 0) return <span className="text-caption text-n-400">—</span>;
          return (
            <span className="inline-flex items-center gap-1 text-body-sm tabular text-warning">
              <Flag className="h-3.5 w-3.5" /> {n}
            </span>
          );
        },
      },
      {
        id: "status",
        header: "Statut",
        accessorKey: "status",
        cell: ({ row }) => (
          <Pill tone={statusTone[row.original.status]} dot>
            {statusLabel[row.original.status]}
          </Pill>
        ),
      },
      {
        id: "views",
        header: "Vues",
        accessorKey: "views",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-body-sm tabular text-n-700">
            <Eye className="h-3.5 w-3.5" /> {row.original.views}
          </span>
        ),
      },
      {
        id: "createdAt",
        header: "Publiée",
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
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/listings", label: "Annonces" },
          { label: "En attente" },
        ]}
        title="Annonces en attente de modération"
        description={`${data.length} annonces à examiner — en attente ou signalées.`}
        actions={
          <Button variant="outline" size="sm" href="/listings">
            Toutes les annonces
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Rechercher titre, description…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leadingIcon={<Search className="h-4 w-4" />}
          className="w-80"
        />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-caption text-n-500">Statut</span>
          <Pill tone="warning" dot>En attente / Signalé</Pill>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-n-200 bg-paper px-4 py-2.5">
        <div className="flex items-center gap-3 text-body-sm text-n-700">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-n-200 bg-surface text-caption tabular">
            0
          </span>
          <span>annonce sélectionnée</span>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm">
            Approuver 0 sélectionnée
          </Button>
          <Button type="button" variant="outline" size="sm">
            Rejeter 0
          </Button>
          <Link
            href="/moderation"
            className="text-body-sm font-medium text-primary hover:underline"
          >
            Voir la file de modération →
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        globalFilter={query}
        getRowId={(l) => l.id}
        onRowClick={(l) => router.push(`/listings/${l.id}`)}
        empty="Aucune annonce en attente."
      />
    </div>
  );
}
