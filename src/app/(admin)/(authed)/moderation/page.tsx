"use client";

import * as React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, MessageSquare, Search, User as UserIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { DataTable } from "@/components/admin/tables/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardBody } from "@/components/ui/Card";
import {
  reports,
  Report,
  ReportPriority,
  ReportStatus,
} from "@/lib/fixtures/reports";
import { getUser } from "@/lib/fixtures/users";
import { Avatar } from "@/components/ui/Avatar";
import { formatDateTime, initials } from "@/lib/utils/format";

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
const statusTone: Record<ReportStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  open: "warning",
  in_review: "info",
  resolved: "success",
  dismissed: "neutral",
};
const statusLabel: Record<ReportStatus, string> = {
  open: "Ouvert",
  in_review: "En cours",
  resolved: "Résolu",
  dismissed: "Rejeté",
};

const targetIcon = {
  listing: <FileText className="h-3.5 w-3.5" />,
  user: <UserIcon className="h-3.5 w-3.5" />,
  message: <MessageSquare className="h-3.5 w-3.5" />,
} as const;

const targetLabel = {
  listing: "Annonce",
  user: "Utilisateur",
  message: "Message",
} as const;

export default function ModerationPage() {
  const [query, setQuery] = React.useState("");
  const [priority, setPriority] = React.useState<ReportPriority | "all">("all");
  const [status, setStatus] = React.useState<ReportStatus | "all">("all");
  const [targetType, setTargetType] = React.useState<"all" | "listing" | "user" | "message">(
    "all",
  );

  const open = reports.filter((r) => r.status === "open").length;
  const inReview = reports.filter((r) => r.status === "in_review").length;
  const resolvedToday = reports.filter((r) => r.status === "resolved").length;

  const queue = reports.filter((r) => r.status === "open" || r.status === "in_review");

  const filtered = queue.filter((r) => {
    if (priority !== "all" && r.priority !== priority) return false;
    if (status !== "all" && r.status !== status) return false;
    if (targetType !== "all" && r.targetType !== targetType) return false;
    return true;
  });

  const columns = React.useMemo<ColumnDef<Report>[]>(
    () => [
      {
        id: "target",
        header: "Cible",
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-n-100 text-n-700">
                {targetIcon[r.targetType]}
              </span>
              <div className="min-w-0">
                <p className="text-body-sm font-medium text-ink truncate">{r.targetTitle}</p>
                <p className="text-caption text-n-500">{targetLabel[r.targetType]}</p>
              </div>
            </div>
          );
        },
      },
      {
        id: "reason",
        header: "Motif",
        cell: ({ row }) => (
          <span className="text-body-sm text-n-700 capitalize">
            {row.original.reason.replace(/_/g, " ")}
          </span>
        ),
      },
      {
        id: "priority",
        header: "Priorité",
        accessorKey: "priority",
        cell: ({ row }) => (
          <Pill tone={priorityTone[row.original.priority]} dot>
            {priorityLabel[row.original.priority]}
          </Pill>
        ),
      },
      {
        id: "reporter",
        header: "Signalé par",
        cell: ({ row }) => {
          const u = getUser(row.original.reporterId);
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
        id: "createdAt",
        header: "Reçu le",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span className="text-caption text-n-500">{formatDateTime(row.original.createdAt)}</span>
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
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link
            href={`/moderation/${row.original.id}`}
            className="text-body-sm font-medium text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Ouvrir →
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Modération" }]}
        title="Modération"
        description={`${open + inReview} signalements en cours de traitement.`}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiTile label="Ouverts" value={open} tone="warning" />
        <KpiTile label="En cours" value={inReview} tone="info" />
        <KpiTile label="Résolus aujourd'hui" value={resolvedToday} tone="success" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Rechercher cible, motif…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leadingIcon={<Search className="h-4 w-4" />}
          className="w-80"
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.currentTarget.value as ReportPriority | "all")}
          className="w-40"
        >
          <option value="all">Toutes priorités</option>
          {(Object.keys(priorityLabel) as ReportPriority[]).map((p) => (
            <option key={p} value={p}>
              {priorityLabel[p]}
            </option>
          ))}
        </Select>
        <Select
          value={status}
          onChange={(e) => setStatus(e.currentTarget.value as ReportStatus | "all")}
          className="w-40"
        >
          <option value="all">Tous statuts</option>
          {(Object.keys(statusLabel) as ReportStatus[]).map((s) => (
            <option key={s} value={s}>
              {statusLabel[s]}
            </option>
          ))}
        </Select>
        <Select
          value={targetType}
          onChange={(e) =>
            setTargetType(e.currentTarget.value as "all" | "listing" | "user" | "message")
          }
          className="w-40"
        >
          <option value="all">Toutes cibles</option>
          <option value="listing">Annonce</option>
          <option value="user">Utilisateur</option>
          <option value="message">Message</option>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        globalFilter={query}
        getRowId={(r) => r.id}
        empty="Aucun signalement à examiner."
      />
    </div>
  );
}

function KpiTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "warning" | "info" | "success";
}) {
  return (
    <Card>
      <CardBody className="space-y-2">
        <p className="text-label uppercase tracking-wide text-n-500">{label}</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-display tracking-tight text-ink tabular">{value}</p>
          <Pill tone={tone} dot>
            {label}
          </Pill>
        </div>
      </CardBody>
    </Card>
  );
}
