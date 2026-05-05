"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Filter, Plus, Search, Star } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { users, User, UserStatus, KycStatus } from "@/lib/fixtures/users";
import { neighborhoodName, neighborhoods } from "@/lib/fixtures/neighborhoods";
import { formatEuro, formatDate, initials } from "@/lib/utils/format";

const statusTone: Record<UserStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  active: "success",
  pending: "warning",
  suspended: "danger",
  banned: "danger",
};

const statusLabel: Record<UserStatus, string> = {
  active: "Actif",
  pending: "En attente",
  suspended: "Suspendu",
  banned: "Banni",
};

const kycTone: Record<KycStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  verified: "success",
  pending: "warning",
  review: "info",
  unverified: "neutral",
  rejected: "danger",
};

const kycLabel: Record<KycStatus, string> = {
  verified: "Vérifié",
  pending: "En cours",
  review: "À examiner",
  unverified: "Non vérifié",
  rejected: "Refusé",
};

export default function UsersListPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<UserStatus | "all">("all");
  const [kyc, setKyc] = React.useState<KycStatus | "all">("all");
  const [neighborhood, setNeighborhood] = React.useState<string>("all");

  const filtered = users.filter((u) => {
    if (status !== "all" && u.status !== status) return false;
    if (kyc !== "all" && u.kyc !== kyc) return false;
    if (neighborhood !== "all" && u.neighborhood !== neighborhood) return false;
    if (
      query &&
      !`${u.name} ${u.email} ${u.handle}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "name",
        header: "Utilisateur",
        size: 280,
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <Avatar initials={initials(row.original.name)} seed={row.original.id} size="sm" />
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-ink truncate">{row.original.name}</p>
              <p className="text-caption text-n-500 truncate">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        id: "neighborhood",
        header: "Quartier",
        accessorKey: "neighborhood",
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
        id: "kyc",
        header: "KYC",
        accessorKey: "kyc",
        cell: ({ row }) => (
          <Pill tone={kycTone[row.original.kyc]}>{kycLabel[row.original.kyc]}</Pill>
        ),
      },
      {
        id: "rating",
        header: "Note",
        accessorKey: "rating",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-body-sm tabular text-n-700">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {row.original.rating.toFixed(1).replace(".", ",")}
            <span className="text-n-400">({row.original.reviews})</span>
          </span>
        ),
      },
      {
        id: "listings",
        header: "Annonces",
        accessorKey: "listings",
        cell: ({ row }) => <span className="text-body-sm tabular text-n-700">{row.original.listings}</span>,
      },
      {
        id: "gmv",
        header: "GMV",
        accessorKey: "gmv",
        cell: ({ row }) => <span className="text-body-sm tabular text-n-700">{formatEuro(row.original.gmv)}</span>,
      },
      {
        id: "joinedAt",
        header: "Inscrit",
        accessorKey: "joinedAt",
        cell: ({ row }) => (
          <span className="text-caption text-n-500">{formatDate(row.original.joinedAt)}</span>
        ),
      },
    ],
    [],
  );

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Utilisateurs" }]}
        title="Utilisateurs"
        description={`${users.length} comptes au total — Lille intra-muros.`}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5" />
              Exporter
            </Button>
            <Button size="sm">
              <Plus className="h-3.5 w-3.5" />
              Inviter un admin
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Rechercher nom, e-mail, handle…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leadingIcon={<Search className="h-4 w-4" />}
          className="w-80"
        />
        <Select
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value as UserStatus | "all")}
          className="w-44"
        >
          <option value="all">Tous les statuts</option>
          {(Object.keys(statusLabel) as UserStatus[]).map((s) => (
            <option key={s} value={s}>{statusLabel[s]}</option>
          ))}
        </Select>
        <Select
          value={kyc}
          onChange={(e) => setKyc(e.currentTarget.value as KycStatus | "all")}
          className="w-44"
        >
          <option value="all">Tous KYC</option>
          {(Object.keys(kycLabel) as KycStatus[]).map((k) => (
            <option key={k} value={k}>{kycLabel[k]}</option>
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
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowId={(u) => u.id}
        onRowClick={(u) => router.push(`/users/${u.id}`)}
        empty="Aucun utilisateur ne correspond à ces filtres."
      />
    </div>
  );
}
