"use client";

import * as React from "react";
import { Search, Star } from "lucide-react";
import { Logo, Wordmark } from "@/components/shared/Wordmark";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Toggle } from "@/components/ui/Toggle";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Tabs } from "@/components/ui/Tabs";
import { Tooltip } from "@/components/ui/Tooltip";
import { Dialog } from "@/components/ui/Dialog";
import { Drawer } from "@/components/ui/Drawer";
import { KPIStat } from "@/components/ui/KPIStat";

const tones = ["neutral", "primary", "accent", "success", "warning", "danger", "info", "ink"] as const;

export default function PlaygroundPage() {
  const [tab, setTab] = React.useState<"a" | "b" | "c">("a");
  const [tg1, setTg1] = React.useState(true);
  const [tg2, setTg2] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-divider bg-surface">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <Logo />
          <div className="text-caption text-n-500">/playground · primitives showcase</div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-16 px-6 py-12">
        <Section title="Typographie" desc="Instrument Sans (corps) + Instrument Serif (display, italique).">
          <div className="space-y-3">
            <p className="text-display-xl">Vivez la rue d&apos;à côté</p>
            <p className="text-display font-serif italic">de quartier</p>
            <p className="text-h1">Tableau de bord</p>
            <p className="text-h2">Modération</p>
            <p className="text-h3">Section title</p>
            <p className="text-body-lg">Lead body — Pour les introductions de page.</p>
            <p className="text-body">Body — pour le corps de texte standard, lisible à 100% du temps.</p>
            <p className="text-body-sm">Body small — denses tableaux et descriptions tertiaires.</p>
            <p className="text-caption text-n-500">Caption — métadonnées et timestamps.</p>
            <p className="text-label uppercase tracking-[0.14em] text-n-500">Label — eyebrows et entête</p>
          </div>
        </Section>

        <Section title="Palette" desc="Tokens Tailwind extends (bg-primary, bg-accent, bg-n-{50..800}, bg-success, etc.).">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {[
              ["primary", "#C8553D"],
              ["primary-hover", "#B14732"],
              ["accent", "#2F6B5E"],
              ["paper", "#FBF8F4"],
              ["surface", "#FFFFFF"],
              ["ink", "#1F2421"],
              ["n-100", "#ECE6DD"],
              ["n-300", "#C2B7A4"],
              ["n-500", "#76695A"],
              ["n-700", "#3B342C"],
              ["success", "#3F7D5C"],
              ["warning", "#C68A2E"],
              ["danger", "#B23A2A"],
              ["info", "#3A6BA3"],
            ].map(([name, hex]) => (
              <div key={name} className="rounded-md border border-n-100 bg-surface p-3">
                <span
                  className="block h-12 w-full rounded"
                  style={{ background: hex }}
                />
                <p className="mt-2 text-caption text-n-700">{name}</p>
                <p className="text-caption text-n-400 tabular">{hex}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Boutons" desc="Variants × tailles. Tous accessibles via clavier. Focus ring vert sage.">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button>Medium</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button href="/dashboard">As Link</Button>
            </div>
          </div>
        </Section>

        <Section title="Pills" desc="Statut, badge, tonalité.">
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <Pill key={t} tone={t} dot>
                {t}
              </Pill>
            ))}
          </div>
        </Section>

        <Section title="Avatars" desc="Initiales, hash de teinte par seed.">
          <div className="flex items-end gap-3">
            <Avatar initials="ML" seed="u_marie_l" size="xs" />
            <Avatar initials="TR" seed="u_tom_r" size="sm" />
            <Avatar initials="LM" seed="u_lea_m" size="md" />
            <Avatar initials="KB" seed="u_karim_b" size="lg" />
            <Avatar initials="OT" seed="u_olivier_t" size="xl" />
          </div>
        </Section>

        <Section title="Champs de formulaire">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="E-mail" required hint="On ne le partage avec personne.">
              <Input type="email" placeholder="vous@exemple.fr" leadingIcon={<Search className="h-4 w-4" />} />
            </Field>
            <Field label="Quartier">
              <Select defaultValue="vieux-lille">
                <option value="vieux-lille">Vieux-Lille</option>
                <option value="wazemmes">Wazemmes</option>
                <option value="vauban">Vauban</option>
              </Select>
            </Field>
            <Field label="Description">
              <Textarea placeholder="Décrivez votre annonce…" />
            </Field>
            <Field label="Erreur" error="Format d'e-mail invalide.">
              <Input invalid value="ce n'est pas un email" onChange={() => {}} />
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Checkbox label="J'accepte les CGU" defaultChecked />
            <Checkbox label="Newsletter" />
            <Toggle checked={tg1} onChange={setTg1} label="Notifications push" />
            <Toggle checked={tg2} onChange={setTg2} label="Mode sombre" />
          </div>
        </Section>

        <Section title="KPI tiles">
          <div className="grid gap-3 md:grid-cols-3">
            <KPIStat label="Utilisateurs" value="5 184" delta={0.082} hint="Actifs 7j : 1 842" />
            <KPIStat label="GMV" value="42 180 €" delta={0.124} hint="Mois en cours" />
            <KPIStat label="Litiges" value="3" delta={-0.5} hint="Vs. mois dernier" />
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Vélo Peugeot années 80</CardTitle>
                  <CardDescription>Vieux-Lille · 180 m</CardDescription>
                </div>
                <Pill tone="success" dot>
                  Actif
                </Pill>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-n-600">
                  Cadre acier, dérailleur Simplex. Pneus changés cette année. Selle d&apos;origine.
                </p>
              </CardBody>
              <CardFooter>
                <span className="text-caption text-n-500 inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" /> 4,8 (23)
                </span>
                <span className="font-semibold tabular text-primary-ink">120 €</span>
              </CardFooter>
            </Card>
            <Card>
              <CardBody>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-2 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
                <Skeleton className="mt-4 h-24 w-full" />
              </CardBody>
            </Card>
          </div>
        </Section>

        <Section title="Tabs (state-driven)">
          <Tabs
            tabs={[
              { value: "a", label: "Vue d'ensemble" },
              { value: "b", label: "Annonces", count: 14 },
              { value: "c", label: "Activité" },
            ]}
            value={tab}
            onChange={setTab}
          />
          <p className="mt-4 text-body-sm text-n-500">Onglet actif : {tab}</p>
        </Section>

        <Section title="Tooltip">
          <div className="flex gap-3">
            <Tooltip label="Détails du compte">
              <Button variant="outline">Survole-moi</Button>
            </Tooltip>
            <Tooltip label="Ouvrir en nouvel onglet" side="bottom">
              <Button variant="outline">Côté bas</Button>
            </Tooltip>
          </div>
        </Section>

        <Section title="Dialog & Drawer">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDialog(true)}>
              Ouvrir Dialog
            </Button>
            <Button variant="outline" onClick={() => setDrawer(true)}>
              Ouvrir Drawer
            </Button>
            <Dialog
              open={dialog}
              onOpenChange={setDialog}
              title="Confirmer la suppression"
              description="Cette action est irréversible."
              footer={
                <>
                  <Button variant="ghost" onClick={() => setDialog(false)}>Annuler</Button>
                  <Button variant="danger" onClick={() => setDialog(false)}>Supprimer</Button>
                </>
              }
            >
              <p className="text-body text-n-700">
                Voulez-vous vraiment supprimer cet élément ? Aucun retour possible.
              </p>
            </Dialog>
            <Drawer
              open={drawer}
              onOpenChange={setDrawer}
              title="Détails utilisateur"
              description="Vue rapide en latéral."
            >
              <p className="text-body text-n-700">
                Le drawer Vaul s&apos;utilise pour les détails côté droit. Native scroll, sans Lenis.
              </p>
            </Drawer>
          </div>
        </Section>

        <Section title="Empty & Error states">
          <div className="grid gap-3 sm:grid-cols-2">
            <EmptyState
              icon={<Search className="h-5 w-5" />}
              title="Aucun résultat"
              description="Modifiez vos critères de recherche pour voir plus."
              action={<Button variant="outline" size="sm">Effacer les filtres</Button>}
            />
            <ErrorState
              title="Impossible de charger les annonces"
              description="Vérifiez votre connexion ou réessayez dans un instant."
              onRetry={() => {}}
            />
          </div>
        </Section>

        <Section title="Wordmark / Logo">
          <div className="flex items-center gap-6">
            <Logo />
            <Wordmark />
            <Wordmark className="text-display" />
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <p className="text-label uppercase tracking-[0.12em] text-n-500">{title}</p>
        {desc ? <p className="text-body-sm text-n-500">{desc}</p> : null}
      </header>
      {children}
    </section>
  );
}
