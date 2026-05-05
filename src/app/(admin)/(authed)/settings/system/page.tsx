"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

export default function SettingsSystemPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [saved] = useState<string | null>("Modifié il y a 12 minutes");

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Système" },
        ]}
        title="Réglages système"
        description="Configuration globale de la marketplace."
      />

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <p className="text-h3 font-medium text-ink">Général</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Nom de la marketplace">
            <Input defaultValue="MyStreet" />
          </Field>
          <Field label="URL publique">
            <Input defaultValue="https://mystreet.fr" />
          </Field>
          <Field label="Take rate (%)" hint="Frais prélevés sur chaque vente">
            <Input type="number" defaultValue="4" step="0.1" />
          </Field>
          <Field label="Cycle de versement (jours)" hint="Délai après confirmation de réception">
            <Input type="number" defaultValue="2" />
          </Field>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <p className="text-h3 font-medium text-ink">Recherche & expédition</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Rayon par défaut (m)" hint="Distance maximale d'affichage des annonces">
            <Input type="number" defaultValue="1500" />
          </Field>
          <Field label="Mode d'expédition par défaut">
            <Select defaultValue="remise_main">
              <option value="remise_main">Remise en main propre</option>
              <option>Mondial Relay</option>
              <option>Colissimo</option>
            </Select>
          </Field>
          <Field label="Tarif minimum d&apos;expédition (€)">
            <Input type="number" defaultValue="3.50" step="0.10" />
          </Field>
          <Field label="Devise">
            <Select defaultValue="EUR">
              <option>EUR</option>
            </Select>
          </Field>
        </div>
      </section>

      <section className="rounded-lg border border-n-100 bg-surface p-5">
        <p className="text-h3 font-medium text-ink">Mode maintenance</p>
        <p className="mt-1 text-body-sm text-n-500">
          Quand activé, la marketplace est en lecture seule pour tous les utilisateurs.
        </p>
        <div className="mt-4">
          <Toggle
            checked={maintenance}
            onChange={setMaintenance}
            label="Activer le mode maintenance"
          />
        </div>
      </section>

      <div className="flex items-center justify-between rounded-lg border border-n-100 bg-paper px-5 py-3">
        <p className="text-caption text-n-500 inline-flex items-center gap-2">
          {saved ? <><Check className="h-3.5 w-3.5 text-success" /> {saved}</> : "Aucune modification"}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline">Annuler</Button>
          <Button variant="primary">Enregistrer</Button>
        </div>
      </div>
    </div>
  );
}
