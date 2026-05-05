"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Filter, LayoutGrid, ListIcon, Search, Star, Tag as TagIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { listings, Listing, ListingStatus, ListingCategory } from "@/lib/fixtures/listings";
import { neighborhoods, neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { getUser } from "@/lib/fixtures/users";
import { Avatar } from "@/components/ui/Avatar";
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

const categoriesList: ListingCategory[] = [
  "vélo",
  "mode",
  "maison",
  "high-tech",
  "jardinage",
  "loisirs",
  "livres",
  "enfant",
  "services",
  "location",
];

// Build a CSV in-memory and trigger a Blob download. No backend round-trip —
// works entirely client-side, which is exactly what an admin export is meant
// to do for a snapshot of the currently-filtered list.
function exportCSV(rows: Listing[]) {
  const headers = [
    "id",
    "title",
    "category",
    "type",
    "price",
    "neighborhood",
    "sellerId",
    "status",
    "views",
    "saves",
    "messages",
    "createdAt",
  ];
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r.id,
        r.title,
        r.category,
        r.type,
        r.price,
        r.neighborhood,
        r.sellerId,
        r.status,
        r.views,
        r.saves,
        r.messages,
        r.createdAt,
      ]
        .map(escape)
        .join(","),
    ),
  ];
  const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `mystreet-annonces-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ListingsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<ListingStatus | "all">("all");
  const [category, setCategory] = React.useState<ListingCategory | "all">("all");
  const [neighborhood, setNeighborhood] = React.useState<string>("all");

  const filtered = listings.filter((l) => {
    if (status !== "all" && l.status !== status) return false;
    if (category !== "all" && l.category !== category) return false;
    if (neighborhood !== "all" && l.neighborhood !== neighborhood) return false;
    if (
      query &&
      !`${l.title} ${l.description}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  const columns = React.useMemo<ColumnDef<Listing>[]>(
    () => [
      {
        id: "title",
        header: "Annonce",
        accessorKey: "title",
        size: 320,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-n-100">
              {row.original.photo ? (
                <Image
                  src={row.original.photo}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : null}
            </span>
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
          <span className="text-body-sm text-n-700">{neighborhoodName(row.original.neighborhood)}</span>
        ),
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
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Annonces" }]}
        title="Annonces"
        description={`${listings.length} annonces — ${listings.filter((l) => l.status === "active").length} actives.`}
        actions={
          <>
            <Link
              href="/listings/grid"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-n-200 bg-surface px-3 text-body-sm font-medium text-n-700 hover:bg-n-50"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Vue grille
            </Link>
            <Button variant="outline" size="sm" onClick={() => exportCSV(filtered)}>
              <Filter className="h-3.5 w-3.5" />
              Exporter
            </Button>
          </>
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
        <Select
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value as ListingStatus | "all")}
          className="w-44"
        >
          <option value="all">Tous statuts</option>
          {(Object.keys(statusLabel) as ListingStatus[]).map((s) => (
            <option key={s} value={s}>{statusLabel[s]}</option>
          ))}
        </Select>
        <Select
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value as ListingCategory | "all")}
          className="w-40"
        >
          <option value="all">Toutes catégories</option>
          {categoriesList.map((c) => (
            <option key={c} value={c} className="capitalize">{c}</option>
          ))}
        </Select>
        <Select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.currentTarget.value)}
          className="w-56"
        >
          <option value="all">Tous quartiers</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </Select>
        <div className="ml-auto inline-flex items-center gap-1 rounded-md border border-n-200 bg-surface p-0.5">
          <button className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-caption font-medium bg-paper text-ink">
            <ListIcon className="h-3.5 w-3.5" /> Liste
          </button>
          <Link
            href="/listings/grid"
            className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-caption font-medium text-n-500"
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Grille
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(l) => l.id}
        onRowClick={(l) => router.push(`/listings/${l.id}`)}
        empty="Aucune annonce ne correspond aux filtres."
      />
    </div>
  );
}
