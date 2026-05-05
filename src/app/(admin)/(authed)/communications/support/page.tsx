import Link from "next/link";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { getUser } from "@/lib/fixtures/users";
import { timeAgo } from "@/lib/utils/format";

export const metadata = { title: "Support" };

const tickets = [
  {
    id: "t_001",
    subject: "Mon vélo a été vendu mais je n'ai pas reçu le virement",
    userId: "u_marie_l",
    status: "open",
    priority: "high",
    lastActivity: "2026-05-04T11:42:00Z",
  },
  {
    id: "t_002",
    subject: "L'acheteur ne répond plus après confirmation",
    userId: "u_karim_b",
    status: "answered",
    priority: "medium",
    lastActivity: "2026-05-04T09:14:00Z",
  },
  {
    id: "t_003",
    subject: "Problème pour publier en catégorie Services",
    userId: "u_nora_k",
    status: "open",
    priority: "low",
    lastActivity: "2026-05-03T22:00:00Z",
  },
  {
    id: "t_004",
    subject: "KYC refusé : pourriez-vous expliquer la raison ?",
    userId: "u_anais_c",
    status: "open",
    priority: "medium",
    lastActivity: "2026-05-03T16:32:00Z",
  },
  {
    id: "t_005",
    subject: "Comment supprimer mon compte ?",
    userId: "u_sophie_d",
    status: "answered",
    priority: "low",
    lastActivity: "2026-05-03T10:15:00Z",
  },
  {
    id: "t_006",
    subject: "Annonce signalée à tort — demande de revue",
    userId: "u_olivier_t",
    status: "open",
    priority: "high",
    lastActivity: "2026-05-02T19:50:00Z",
  },
  {
    id: "t_007",
    subject: "Le rayon de recherche dépasse Lille — bug ?",
    userId: "u_camille_b",
    status: "closed",
    priority: "low",
    lastActivity: "2026-04-29T12:00:00Z",
  },
  {
    id: "t_008",
    subject: "Modifier l'adresse e-mail de mon compte",
    userId: "u_pierre_v",
    status: "answered",
    priority: "low",
    lastActivity: "2026-04-28T15:20:00Z",
  },
];

const statusTone: Record<string, "warning" | "info" | "neutral"> = {
  open: "warning",
  answered: "info",
  closed: "neutral",
};
const statusLabel: Record<string, string> = {
  open: "Ouvert",
  answered: "Répondu",
  closed: "Clos",
};
const priorityTone: Record<string, "danger" | "warning" | "neutral"> = {
  high: "danger",
  medium: "warning",
  low: "neutral",
};

export default function CommunicationsSupportPage() {
  const open = tickets.filter((t) => t.status === "open").length;

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/communications/notifications", label: "Communications" },
          { label: "Support" },
        ]}
        title="Centre de support"
        description="Demandes des utilisateurs, par ordre d'arrivée."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-4">
            <p className="text-h3 font-medium text-ink">Boîte de réception</p>
            <p className="text-body-sm text-n-500">{tickets.length} tickets total</p>
          </header>
          <ul className="divide-y divide-n-100">
            {tickets.map((t) => {
              const u = getUser(t.userId);
              return (
                <li key={t.id} className="hover:bg-n-50">
                  <div className="flex items-center gap-3 px-5 py-3">
                    {u ? <Avatar initials={u.avatarSeed} seed={u.id} size="sm" /> : null}
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-ink line-clamp-1">{t.subject}</p>
                      <p className="text-caption text-n-500">
                        {u ? (
                          <Link href={`/users/${u.id}`} className="hover:text-primary">
                            {u.name}
                          </Link>
                        ) : "—"}
                        {" · "}
                        {timeAgo(t.lastActivity)}
                      </p>
                    </div>
                    <Pill tone={priorityTone[t.priority]}>{t.priority}</Pill>
                    <Pill tone={statusTone[t.status]} dot>{statusLabel[t.status]}</Pill>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="space-y-3">
          <div className="rounded-lg border border-n-100 bg-surface p-5">
            <p className="text-label uppercase tracking-wide text-n-500">Tickets ouverts</p>
            <p className="mt-1 text-h1 font-medium tabular text-ink">{open}</p>
            <p className="mt-1 text-body-sm text-n-500">Sur {tickets.length} au total</p>
          </div>
          <div className="rounded-lg border border-n-100 bg-surface p-5">
            <p className="text-label uppercase tracking-wide text-n-500">SLA</p>
            <ul className="mt-3 space-y-2 text-body-sm">
              <li className="flex justify-between"><span className="text-n-500">1<sup>re</sup> réponse moy.</span><span className="tabular text-ink">2 h 14</span></li>
              <li className="flex justify-between"><span className="text-n-500">Résolution moy.</span><span className="tabular text-ink">9 h 42</span></li>
              <li className="flex justify-between"><span className="text-n-500">Satisfaction</span><span className="tabular text-success">94 %</span></li>
              <li className="flex justify-between"><span className="text-n-500">SLA respecté</span><span className="tabular text-success">98 %</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
