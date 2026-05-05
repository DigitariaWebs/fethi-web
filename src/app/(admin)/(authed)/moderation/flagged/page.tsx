"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Flag } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { listings, Listing } from "@/lib/fixtures/listings";
import { reports, ReportPriority } from "@/lib/fixtures/reports";
import { getUser } from "@/lib/fixtures/users";
import { formatDate, initials } from "@/lib/utils/format";

const priorityTone: Record<ReportPriority, React.ComponentProps<typeof Pill>["tone"]> = {
  low: "neutral",
  medium: "info",
  high: "warning",
  critical: "danger",
};
const priorityLabel: Record<ReportPriority, string> = {
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
  critical: "Critique",
};
const priorityRank: Record<ReportPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
};

function lastReportFor(listingId: string) {
  const matched = reports
    .filter((r) => r.targetType === "listing" && r.targetId === listingId)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return matched[0];
}
function maxPriorityFor(listingId: string): ReportPriority | undefined {
  const matched = reports.filter(
    (r) => r.targetType === "listing" && r.targetId === listingId,
  );
  if (matched.length === 0) return undefined;
  return matched.reduce<ReportPriority>(
    (acc, r) => (priorityRank[r.priority] > priorityRank[acc] ? r.priority : acc),
    "low",
  );
}

export default function FlaggedListingsPage() {
  const router = useRouter();

  const data = React.useMemo(
    () => listings.filter((l) => l.status === "flagged" || (l.flags ?? 0) > 0),
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
              <p className="text-body-sm font-medium text-ink truncate">{row.original.title}</p>
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
          const u = getUser(row.original.sellerId);
          if (!u) return <span className="text-n-400">—</span>;
          return (
            <Link
              href={`/users/${u.id}`}
              className="inline-flex items-center gap-2 text-body-sm text-n-700 hover:text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar initials={initials(u.name)} seed={u.id} size="xs" />
              {u.name}
            </Link>
          );
        },
      },
      {
        id: "flags",
        header: "Signalements",
        accessorFn: (l) => l.flags ?? 0,
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-body-sm tabular text-warning">
            <Flag className="h-3.5 w-3.5" /> {row.original.flags ?? 0}
          </span>
        ),
      },
      {
        id: "lastReported",
        header: "Dernier signalement",
        cell: ({ row }) => {
          const last = lastReportFor(row.original.id);
          return (
            <span className="text-caption text-n-500">
              {formatDate(last?.createdAt ?? row.original.createdAt)}
            </span>
          );
        },
      },
      {
        id: "priority",
        header: "Priorité",
        cell: ({ row }) => {
          const p = maxPriorityFor(row.original.id);
          if (!p) return <span className="text-caption text-n-400">—</span>;
          return (
            <Pill tone={priorityTone[p]} dot>
              {priorityLabel[p]}
            </Pill>
          );
        },
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => {
          const last = lastReportFor(row.original.id);
          const href = last ? `/moderation/${last.id}` : `/listings/${row.original.id}`;
          return (
            <Link
              href={href}
              className="text-body-sm font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Examiner →
            </Link>
          );
        },
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
          { label: "Annonces signalées" },
        ]}
        title="Annonces signalées"
        description={`${data.length} annonces avec un ou plusieurs signalements actifs.`}
      />

      <DataTable
        columns={columns}
        data={data}
        getRowId={(l) => l.id}
        onRowClick={(l) => router.push(`/listings/${l.id}`)}
        empty="Aucune annonce signalée."
      />
    </div>
  );
}
