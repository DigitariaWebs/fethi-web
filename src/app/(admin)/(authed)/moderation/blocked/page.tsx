"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { users, User, UserStatus, KycStatus } from "@/lib/fixtures/users";
import { initials, timeAgo } from "@/lib/utils/format";

const statusTone: Record<UserStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  active: "success",
  pending: "warning",
  suspended: "warning",
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
  pending: "En attente",
  review: "Revue",
  unverified: "Non vérifié",
  rejected: "Rejeté",
};

export default function BlockedAccountsPage() {
  const router = useRouter();

  const data = React.useMemo(
    () => users.filter((u) => u.status === "banned" || u.status === "suspended"),
    [],
  );

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "user",
        header: "Utilisateur",
        accessorKey: "name",
        size: 320,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar
              initials={initials(row.original.name)}
              seed={row.original.id}
              size="sm"
            />
            <div className="min-w-0">
              <p className="text-body-sm font-medium text-ink truncate">{row.original.name}</p>
              <p className="text-caption text-n-500 truncate">{row.original.email}</p>
            </div>
          </div>
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
        id: "flagged",
        header: "Sanctions",
        accessorKey: "flagged",
        cell: ({ row }) => (
          <span className="text-body-sm tabular text-danger">{row.original.flagged}</span>
        ),
      },
      {
        id: "lastActiveAt",
        header: "Dernière activité",
        accessorKey: "lastActiveAt",
        cell: ({ row }) => (
          <span className="text-caption text-n-500">{timeAgo(row.original.lastActiveAt)}</span>
        ),
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/users/${row.original.id}`}
            className="text-body-sm font-medium text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Voir le profil →
          </Link>
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
          { href: "/moderation", label: "Modération" },
          { label: "Comptes bannis" },
        ]}
        title="Comptes bannis"
        description="Comptes définitivement exclus de la plateforme."
        actions={
          <Button variant="outline" size="sm" href="/moderation">
            Retour à la file
          </Button>
        }
      />

      {data.length === 0 ? (
        <EmptyState
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Aucun compte sanctionné"
          description="Bonne nouvelle — aucun compte n'est suspendu ni banni en ce moment."
        />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          getRowId={(u) => u.id}
          onRowClick={(u) => router.push(`/users/${u.id}`)}
          empty="Aucun compte sanctionné."
        />
      )}
    </div>
  );
}
