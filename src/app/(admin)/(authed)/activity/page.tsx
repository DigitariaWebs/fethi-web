"use client";

import * as React from "react";
import Link from "next/link";
import {
  Activity as ActivityIcon,
  Filter,
  ShoppingBag,
  Users as UsersIcon,
  Tag,
  ShieldAlert,
  Banknote,
  IdCard,
  Scale,
} from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { activity, ActivityType } from "@/lib/fixtures/activity";
import { Pill } from "@/components/ui/Pill";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime, formatEuro, timeAgo } from "@/lib/utils/format";

const labels: Record<ActivityType, { label: string; tone: React.ComponentProps<typeof Pill>["tone"]; icon: React.ElementType }> = {
  listing_sold: { label: "Vente", tone: "success", icon: ShoppingBag },
  user_signup: { label: "Nouveau compte", tone: "info", icon: UsersIcon },
  report_filed: { label: "Signalement", tone: "warning", icon: ShieldAlert },
  kyc_verified: { label: "KYC validé", tone: "success", icon: IdCard },
  kyc_submitted: { label: "KYC soumis", tone: "info", icon: IdCard },
  listing_published: { label: "Annonce publiée", tone: "neutral", icon: Tag },
  listing_rejected: { label: "Annonce rejetée", tone: "danger", icon: Tag },
  payout_completed: { label: "Virement effectué", tone: "primary", icon: Banknote },
  user_suspended: { label: "Compte suspendu", tone: "danger", icon: ShieldAlert },
  dispute_opened: { label: "Litige ouvert", tone: "danger", icon: Scale },
};

export default function ActivityPage() {
  const [query, setQuery] = React.useState("");
  const [type, setType] = React.useState<ActivityType | "all">("all");

  const filtered = activity.filter((a) => {
    if (type !== "all" && a.type !== type) return false;
    if (
      query &&
      !`${a.actor} ${a.target ?? ""}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Activité" }]}
        title="Activité"
        description="Tous les évènements de la marketplace, en temps réel."
        actions={
          <Button variant="outline" size="sm">
            <Filter className="h-3.5 w-3.5" />
            Exporter (CSV)
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Rechercher acteur ou cible…"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="w-72"
        />
        <Select
          value={type}
          onChange={(e) => setType(e.currentTarget.value as ActivityType | "all")}
          className="w-56"
        >
          <option value="all">Tous les évènements</option>
          {(Object.keys(labels) as ActivityType[]).map((k) => (
            <option key={k} value={k}>
              {labels[k].label}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ActivityIcon className="h-5 w-5" />}
          title="Aucun évènement ne correspond"
          description="Ajustez vos filtres ou patientez quelques minutes — les évènements arrivent en temps réel."
        />
      ) : (
        <div className="rounded-lg border border-n-100 bg-surface">
          <ul className="divide-y divide-n-100">
            {filtered.map((e) => {
              const cfg = labels[e.type];
              const Icon = cfg.icon;
              return (
                <li key={e.id} className="flex items-start gap-4 px-5 py-3.5">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-n-100 text-n-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm text-ink">
                      <span className="font-medium">{e.actor}</span>
                      {e.target ? (
                        <>
                          {" "}— <span className="text-n-700">{e.target}</span>
                        </>
                      ) : null}
                      {typeof e.amount === "number" ? (
                        <>
                          {" "}<span className="text-n-700">· {formatEuro(e.amount)}</span>
                        </>
                      ) : null}
                    </p>
                    <p className="text-caption text-n-500">{formatDateTime(e.at)}</p>
                  </div>
                  <Pill tone={cfg.tone}>{cfg.label}</Pill>
                  <span className="hidden sm:inline text-caption text-n-400 tabular w-20 text-right">
                    {timeAgo(e.at)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t border-n-100 bg-paper px-5 py-2.5 text-caption text-n-500">
            <span className="tabular">{filtered.length} évènements</span>
            <Link
              href="/settings/audit"
              className="font-medium text-primary hover:text-primary-hover"
            >
              Voir l&apos;audit log brut →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
