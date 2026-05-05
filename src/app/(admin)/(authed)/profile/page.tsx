"use client";

import { useState } from "react";
import { Laptop, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { formatDate, timeAgo } from "@/lib/utils/format";

type Tab = "general" | "security" | "preferences" | "sessions";

const sessions = [
  { device: "MacBook Pro · Safari", location: "Lille, FR", lastActive: "2026-05-04T14:00:00Z", current: true, icon: Laptop },
  { device: "iPhone 15 · App MyStreet", location: "Lille, FR", lastActive: "2026-05-04T11:42:00Z", current: false, icon: Smartphone },
  { device: "Chrome · Linux", location: "Paris, FR", lastActive: "2026-04-30T09:00:00Z", current: false, icon: Laptop },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("general");
  const [twoFa, setTwoFa] = useState(true);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { label: "Profil" },
        ]}
        title="Profil"
        description="Informations du compte admin."
      />

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <div className="flex items-center gap-4">
          <Avatar initials="FA" seed="fadi" size="xl" />
          <div className="flex-1 min-w-0">
            <p className="text-h2 font-medium text-ink">Fadi A.</p>
            <p className="text-body-sm text-n-500">fadiprogix@gmail.com</p>
            <div className="mt-2 flex items-center gap-2">
              <Pill tone="primary" dot>Propriétaire</Pill>
              <Pill tone="neutral">Europe/Paris</Pill>
            </div>
          </div>
        </div>
      </section>

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "general", label: "Général" },
          { value: "security", label: "Sécurité" },
          { value: "preferences", label: "Préférences" },
          { value: "sessions", label: "Sessions" },
        ]}
      />

      {tab === "general" ? (
        <section className="rounded-lg border border-n-100 bg-surface p-5">
          <p className="text-h3 font-medium text-ink">Informations</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Nom complet">
              <Input defaultValue="Fadi A." />
            </Field>
            <Field label="E-mail">
              <Input type="email" defaultValue="fadiprogix@gmail.com" />
            </Field>
            <Field label="Rôle" hint="Le rôle est attribué par l'équipe">
              <Input defaultValue="Propriétaire" disabled />
            </Field>
            <Field label="Fuseau horaire">
              <Select defaultValue="Europe/Paris">
                <option>Europe/Paris</option>
                <option>Europe/London</option>
                <option>UTC</option>
              </Select>
            </Field>
            <Field label="Langue">
              <Select defaultValue="fr">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </Select>
            </Field>
            <Field label="Téléphone">
              <Input defaultValue="+33 6 12 34 56 78" />
            </Field>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Button variant="primary">Enregistrer</Button>
            <Button variant="outline">Annuler</Button>
          </div>
        </section>
      ) : null}

      {tab === "security" ? (
        <section className="rounded-lg border border-n-100 bg-surface p-5 space-y-5">
          <div>
            <p className="text-h3 font-medium text-ink">Authentification à 2 facteurs</p>
            <p className="mt-1 text-body-sm text-n-500">App authenticator (Google Authenticator, 1Password)</p>
            <div className="mt-3">
              <Toggle checked={twoFa} onChange={setTwoFa} label={twoFa ? "2FA activé" : "2FA désactivé"} />
            </div>
          </div>
          <div className="border-t border-n-100 pt-5">
            <p className="text-h3 font-medium text-ink">Mot de passe</p>
            <p className="mt-1 text-body-sm text-n-500">Dernière modification le {formatDate("2026-03-22")}</p>
            <div className="mt-3">
              <Button variant="outline" size="sm">Changer le mot de passe</Button>
            </div>
          </div>
          <div className="border-t border-n-100 pt-5">
            <p className="text-h3 font-medium text-ink">Connexions reconnues</p>
            <p className="mt-1 text-body-sm text-n-500">3 appareils approuvés · révoquer si suspect</p>
          </div>
        </section>
      ) : null}

      {tab === "preferences" ? (
        <section className="rounded-lg border border-n-100 bg-surface p-5 space-y-4">
          <p className="text-h3 font-medium text-ink">Préférences</p>
          <div className="space-y-3">
            <Toggle checked={true} onChange={() => {}} label="E-mails de digest hebdomadaire" />
            <Toggle checked={true} onChange={() => {}} label="Alertes critiques (litiges, KYC)" />
            <Toggle checked={false} onChange={() => {}} label="Alertes commerciales (boost, abonnements)" />
            <Toggle checked={true} onChange={() => {}} label="Mode dense (tables compactes)" />
          </div>
        </section>
      ) : null}

      {tab === "sessions" ? (
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="border-b border-n-100 px-5 py-4">
            <p className="text-h3 font-medium text-ink">Sessions actives</p>
            <p className="text-body-sm text-n-500">3 appareils connectés en ce moment</p>
          </header>
          <ul className="divide-y divide-n-100">
            {sessions.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.device} className="flex items-center gap-4 px-5 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-paper text-n-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-medium text-ink">{s.device}</p>
                    <p className="text-caption text-n-500">{s.location} · {timeAgo(s.lastActive)}</p>
                  </div>
                  {s.current ? <Pill tone="success" dot>Cet appareil</Pill> : (
                    <Button variant="outline" size="sm">Révoquer</Button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
