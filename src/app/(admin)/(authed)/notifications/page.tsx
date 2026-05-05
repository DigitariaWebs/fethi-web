"use client";

import { useState } from "react";
import {
  IdCard,
  Scale,
  Banknote,
  ShieldAlert,
  ShoppingBag,
  Tag,
  Webhook,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { timeAgo } from "@/lib/utils/format";

type Notif = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconTone: string;
  title: string;
  body: string;
  at: string;
  unread: boolean;
};

const initial: Notif[] = [
  {
    id: "n1",
    icon: IdCard,
    iconTone: "bg-info-soft text-info",
    title: "3 KYC en attente de revue",
    body: "Anaïs Caron, Hugo Faure et 1 autre. Délai SLA : 24 h.",
    at: "2026-05-04T13:42:00Z",
    unread: true,
  },
  {
    id: "n2",
    icon: Scale,
    iconTone: "bg-danger-soft text-danger",
    title: "Nouveau litige ouvert sur MS-26-05-0017",
    body: "Julien Picard conteste l'état du vélo enfant.",
    at: "2026-05-04T11:42:00Z",
    unread: true,
  },
  {
    id: "n3",
    icon: Banknote,
    iconTone: "bg-primary-soft text-primary-ink",
    title: "Versements programmés demain",
    body: "14 580 € à libérer vers 32 vendeurs (cycle J+2).",
    at: "2026-05-04T08:00:00Z",
    unread: true,
  },
  {
    id: "n4",
    icon: Webhook,
    iconTone: "bg-warning-soft text-warning",
    title: "Webhook Stripe — 1 retry",
    body: "stripe.charge.refunded sur /sendgrid — 502 Bad Gateway.",
    at: "2026-05-04T07:30:00Z",
    unread: false,
  },
  {
    id: "n5",
    icon: ShieldAlert,
    iconTone: "bg-warning-soft text-warning",
    title: "7 annonces en attente de modération",
    body: "Files modération : >24 h pour 2 annonces — à prioriser.",
    at: "2026-05-03T22:14:00Z",
    unread: false,
  },
  {
    id: "n6",
    icon: ShoppingBag,
    iconTone: "bg-success-soft text-success",
    title: "Pic de ventes ce week-end",
    body: "GMV samedi-dimanche : +18 % vs. semaine précédente.",
    at: "2026-05-03T20:00:00Z",
    unread: false,
  },
  {
    id: "n7",
    icon: Tag,
    iconTone: "bg-accent-soft text-accent",
    title: "Annonce signalée : iPhone 13 Pro",
    body: "Olivier Thibault signale objet potentiellement volé.",
    at: "2026-05-03T14:42:00Z",
    unread: false,
  },
  {
    id: "n8",
    icon: AlertTriangle,
    iconTone: "bg-danger-soft text-danger",
    title: "Compte automatiquement suspendu",
    body: "Julien Picard — 5 signalements actifs, suspension auto.",
    at: "2026-05-03T18:30:00Z",
    unread: false,
  },
];

type Filter = "all" | "unread";

export default function AdminNotificationsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [items, setItems] = useState(initial);
  const visible = items.filter((n) => filter === "all" || n.unread);
  const unreadCount = items.filter((n) => n.unread).length;

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { label: "Notifications" },
        ]}
        title="Notifications"
        description="Alertes système et opérationnelles."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setItems((s) => s.map((n) => ({ ...n, unread: false })))}
          >
            Tout marquer comme lu
          </Button>
        }
      />

      <Tabs<Filter>
        value={filter}
        onChange={setFilter}
        tabs={[
          { value: "all", label: "Toutes", count: items.length },
          { value: "unread", label: "Non lues", count: unreadCount },
        ]}
      />

      <ul className="divide-y divide-n-100 rounded-lg border border-n-100 bg-surface">
        {visible.map((n) => {
          const Icon = n.icon;
          return (
            <li key={n.id} className="flex items-start gap-3 px-5 py-4 hover:bg-n-50">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${n.iconTone}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-body font-medium text-ink">{n.title}</p>
                  {n.unread ? <Pill tone="primary" dot>Non lu</Pill> : null}
                </div>
                <p className="mt-0.5 text-body-sm text-n-700">{n.body}</p>
                <p className="mt-1 text-caption text-n-500">{timeAgo(n.at)}</p>
              </div>
              {n.unread ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setItems((s) => s.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                  }
                >
                  Marquer lu
                </Button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
