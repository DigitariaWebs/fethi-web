"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

const recent = [
  { name: "Bienvenue mai 2026", channel: "Email", status: "sent", sent: 312, opened: 184, clicked: 48 },
  { name: "Boost Pro — relance", channel: "Push + Email", status: "sent", sent: 1842, opened: 942, clicked: 217 },
  { name: "Nouveaux quartiers", channel: "Push", status: "scheduled", sent: 0, opened: 0, clicked: 0 },
  { name: "Été à Lille", channel: "Email", status: "draft", sent: 0, opened: 0, clicked: 0 },
  { name: "Rappel KYC", channel: "Email", status: "sent", sent: 96, opened: 71, clicked: 22 },
];

const statusTone: Record<string, "success" | "info" | "neutral"> = {
  sent: "success",
  scheduled: "info",
  draft: "neutral",
};

const statusLabel: Record<string, string> = {
  sent: "Envoyé",
  scheduled: "Planifié",
  draft: "Brouillon",
};

export default function CommunicationsNotificationsPage() {
  const [channel, setChannel] = useState("Push");
  const [subject, setSubject] = useState("Une nouvelle annonce dans ton quartier");
  const [body, setBody] = useState("Marie a publié un vélo de ville Peugeot à Vieux-Lille — à 180 m de chez toi.");

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/communications/notifications", label: "Communications" },
          { label: "Notifications" },
        ]}
        title="Composer une notification"
        description="Push, e-mail ou in-app — selon ton segment cible."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-lg border border-n-100 bg-surface p-5 space-y-4">
          <p className="text-h3 font-medium text-ink">Configuration</p>
          <Field label="Segment">
            <Select defaultValue="all">
              <option value="all">Tous les utilisateurs</option>
              <option>Vendeurs actifs</option>
              <option>Acheteurs actifs</option>
              <option>Inactifs 30 j+</option>
              <option>KYC en attente</option>
              <option>Vieux-Lille uniquement</option>
            </Select>
          </Field>
          <Field label="Canal">
            <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
              <option>Push</option>
              <option>Email</option>
              <option>In-app</option>
              <option>Push + Email</option>
            </Select>
          </Field>
          <Field label="Sujet">
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Field>
          <Field label="Message">
            <Textarea rows={5} value={body} onChange={(e) => setBody(e.target.value)} />
          </Field>
          <Field label="Programmation">
            <Select defaultValue="now">
              <option value="now">Envoyer maintenant</option>
              <option>Programmer pour plus tard</option>
              <option>Brouillon</option>
            </Select>
          </Field>
          <div className="flex items-center gap-2 pt-2">
            <Button variant="primary">Envoyer</Button>
            <Button variant="outline">Sauvegarder le brouillon</Button>
          </div>
        </section>

        <section className="rounded-lg border border-n-100 bg-paper p-5 space-y-5">
          <p className="text-label uppercase tracking-wide text-n-500">Aperçu</p>

          <div className="rounded-2xl bg-ink p-3 shadow-medium">
            <div className="rounded-xl bg-surface p-3">
              <div className="flex items-center gap-2 text-caption text-n-500">
                <span className="h-5 w-5 rounded-md bg-primary inline-flex items-center justify-center">
                  <Smartphone className="h-3 w-3 text-white" />
                </span>
                <span className="font-medium text-ink">MyStreet</span>
                <span className="ml-auto">à l&apos;instant</span>
              </div>
              <p className="mt-2 text-body-sm font-medium text-ink line-clamp-1">{subject}</p>
              <p className="mt-1 text-caption text-n-500 line-clamp-2">{body}</p>
            </div>
          </div>

          <div className="rounded-md border border-n-200 bg-surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-n-100 bg-n-50 px-3 py-2 text-caption text-n-500">
              <Mail className="h-3.5 w-3.5" />
              <span>De : MyStreet &lt;hello@mystreet.fr&gt;</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-body-sm font-medium text-ink">{subject}</p>
              <p className="mt-2 text-body-sm text-n-700">Bonjour,</p>
              <p className="mt-2 text-body-sm text-n-700">{body}</p>
              <p className="mt-3 text-body-sm text-n-700">À tout de suite sur MyStreet.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-n-100 bg-surface">
        <header className="flex items-center justify-between border-b border-n-100 px-5 py-4">
          <div>
            <p className="text-h3 font-medium text-ink">Envois récents</p>
            <p className="text-body-sm text-n-500">Performance des dernières campagnes</p>
          </div>
          <Bell className="h-4 w-4 text-n-400" />
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Campagne</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Canal</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Statut</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Envoyés</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Ouverts</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Clics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {recent.map((r) => (
                <tr key={r.name} className="hover:bg-n-50">
                  <td className="px-5 py-3 text-ink">{r.name}</td>
                  <td className="px-5 py-3 text-n-700">{r.channel}</td>
                  <td className="px-5 py-3"><Pill tone={statusTone[r.status]} dot>{statusLabel[r.status]}</Pill></td>
                  <td className="px-5 py-3 tabular text-n-700">{r.sent}</td>
                  <td className="px-5 py-3 tabular text-n-700">{r.opened}</td>
                  <td className="px-5 py-3 tabular text-n-700">{r.clicked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
