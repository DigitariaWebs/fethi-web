"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Toggle } from "@/components/ui/Toggle";
import { Pill } from "@/components/ui/Pill";
import { timeAgo } from "@/lib/utils/format";

type Flag = {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  state: "on" | "off" | "beta";
  rollout?: number;
  toggledAt: string;
};

const initial: Flag[] = [
  {
    key: "stripe-checkout-v2",
    name: "Stripe Checkout v2",
    description: "Nouvelle interface de paiement Stripe avec Apple Pay natif.",
    enabled: true,
    state: "on",
    toggledAt: "2026-04-12T10:00:00Z",
  },
  {
    key: "ai-listing-suggestions",
    name: "Suggestions IA d'annonces",
    description: "Génération automatique de titre & description à partir d'une photo.",
    enabled: true,
    state: "beta",
    rollout: 20,
    toggledAt: "2026-04-28T15:30:00Z",
  },
  {
    key: "renter-tier",
    name: "Niveau locataire",
    description: "Profil acheteur dédié pour la location courte durée.",
    enabled: false,
    state: "off",
    toggledAt: "2026-03-08T09:00:00Z",
  },
  {
    key: "in-app-call",
    name: "Appel in-app",
    description: "Appel audio entre acheteur et vendeur, sans partage de numéro.",
    enabled: false,
    state: "off",
    toggledAt: "2026-02-22T11:00:00Z",
  },
  {
    key: "video-listings",
    name: "Annonces vidéo",
    description: "Permettre l'ajout d'une vidéo de 30 s aux annonces.",
    enabled: true,
    state: "beta",
    rollout: 5,
    toggledAt: "2026-05-02T14:42:00Z",
  },
  {
    key: "weekend-payouts",
    name: "Versements le week-end",
    description: "Déclencher les virements vendeurs le samedi & dimanche.",
    enabled: true,
    state: "on",
    toggledAt: "2026-04-05T08:00:00Z",
  },
];

export default function SettingsFeatureFlagsPage() {
  const [flags, setFlags] = useState(initial);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Feature flags" },
        ]}
        title="Feature flags"
        description="Activation progressive des fonctionnalités."
      />

      <section className="rounded-lg border border-n-100 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Flag</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">État</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Rollout</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Dernière modification</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Actif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {flags.map((f) => (
                <tr key={f.key} className="hover:bg-n-50">
                  <td className="px-5 py-3">
                    <p className="text-ink">{f.name}</p>
                    <p className="text-caption text-n-500 font-mono">{f.key}</p>
                    <p className="mt-0.5 text-caption text-n-500">{f.description}</p>
                  </td>
                  <td className="px-5 py-3">
                    {f.state === "on" ? (
                      <Pill tone="success" dot>On</Pill>
                    ) : f.state === "beta" ? (
                      <Pill tone="warning" dot>Bêta</Pill>
                    ) : (
                      <Pill tone="neutral">Off</Pill>
                    )}
                  </td>
                  <td className="px-5 py-3 tabular text-n-700">
                    {typeof f.rollout === "number" ? `${f.rollout}%` : f.enabled ? "100%" : "0%"}
                  </td>
                  <td className="px-5 py-3 text-n-500">{timeAgo(f.toggledAt)}</td>
                  <td className="px-5 py-3">
                    <Toggle
                      checked={f.enabled}
                      onChange={(next) =>
                        setFlags((s) =>
                          s.map((x) => (x.key === f.key ? { ...x, enabled: next } : x)),
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
