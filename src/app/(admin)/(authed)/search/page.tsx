"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { users } from "@/lib/fixtures/users";
import { listings } from "@/lib/fixtures/listings";
import { orders } from "@/lib/fixtures/orders";
import { reports } from "@/lib/fixtures/reports";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatEuro, formatDate } from "@/lib/utils/format";

type Tab = "all" | "users" | "listings" | "orders" | "moderation";

export default function SearchPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const u = users.slice(0, 4);
  const l = listings.slice(0, 4);
  const o = orders.slice(0, 4);
  const r = reports.slice(0, 4);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Recherche" }]}
        title="Recherche globale"
        description="Trouve un utilisateur, une annonce, une commande, un signalement."
      />

      <Input
        placeholder="Rechercher dans toute la marketplace…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        leadingIcon={<Search className="h-4 w-4" />}
      />

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "all", label: "Tout" },
          { value: "users", label: "Utilisateurs" },
          { value: "listings", label: "Annonces" },
          { value: "orders", label: "Commandes" },
          { value: "moderation", label: "Modération" },
        ]}
      />

      {tab === "all" || tab === "users" ? (
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-3">
            <p className="text-label uppercase tracking-wide text-n-500">Utilisateurs</p>
          </header>
          <ul className="divide-y divide-n-100">
            {u.map((user) => (
              <li key={user.id}>
                <Link href={`/users/${user.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-n-50">
                  <Avatar initials={user.avatarSeed} seed={user.id} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-ink">{user.name}</p>
                    <p className="text-caption text-n-500">{user.email} · {neighborhoodName(user.neighborhood)}</p>
                  </div>
                  <Pill tone={user.status === "active" ? "success" : "warning"}>{user.status}</Pill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "all" || tab === "listings" ? (
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-3">
            <p className="text-label uppercase tracking-wide text-n-500">Annonces</p>
          </header>
          <ul className="divide-y divide-n-100">
            {l.map((item) => (
              <li key={item.id}>
                <Link href={`/listings/${item.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-n-50">
                  <span
                    className="h-10 w-10 shrink-0 rounded-md"
                    style={{ background: "linear-gradient(135deg, rgba(200,85,61,0.18), rgba(47,107,94,0.10))" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 text-body-sm font-medium text-ink">{item.title}</p>
                    <p className="text-caption text-n-500">{neighborhoodName(item.neighborhood)} · {formatEuro(item.price)}</p>
                  </div>
                  <Pill tone="neutral">{item.category}</Pill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "all" || tab === "orders" ? (
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-3">
            <p className="text-label uppercase tracking-wide text-n-500">Commandes</p>
          </header>
          <ul className="divide-y divide-n-100">
            {o.map((order) => (
              <li key={order.id}>
                <Link href={`/orders/${order.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-n-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-ink font-mono">{order.ref}</p>
                    <p className="text-caption text-n-500">{formatDate(order.createdAt)} · {formatEuro(order.amount)}</p>
                  </div>
                  <Pill tone={order.status === "completed" ? "success" : order.status === "disputed" ? "danger" : "info"}>
                    {order.status}
                  </Pill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "all" || tab === "moderation" ? (
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-3">
            <p className="text-label uppercase tracking-wide text-n-500">Modération</p>
          </header>
          <ul className="divide-y divide-n-100">
            {r.map((report) => (
              <li key={report.id}>
                <Link href={`/moderation/${report.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-n-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-ink line-clamp-1">{report.targetTitle}</p>
                    <p className="text-caption text-n-500">{report.reason.replace(/_/g, " ")}</p>
                  </div>
                  <Pill tone={report.priority === "critical" ? "danger" : report.priority === "high" ? "warning" : "neutral"}>
                    {report.priority}
                  </Pill>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
