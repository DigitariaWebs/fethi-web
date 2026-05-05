import { MapPin } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils/format";

export const metadata = { title: "Villes" };

const cities = [
  {
    name: "Lille",
    status: "active" as const,
    statusLabel: "Active",
    launch: "Lancement octobre 2025",
    neighborhoods: 8,
    users: 5184,
  },
  {
    name: "Hellemmes",
    status: "scheduled" as const,
    statusLabel: "Été 2026",
    launch: "Ouverture juin 2026",
    neighborhoods: 4,
    users: 0,
  },
  {
    name: "Lomme",
    status: "scheduled" as const,
    statusLabel: "Été 2026",
    launch: "Ouverture juillet 2026",
    neighborhoods: 5,
    users: 0,
  },
  {
    name: "Roubaix",
    status: "planned" as const,
    statusLabel: "Automne 2026",
    launch: "Ouverture octobre 2026",
    neighborhoods: 9,
    users: 0,
  },
  {
    name: "Tourcoing",
    status: "planned" as const,
    statusLabel: "Automne 2026",
    launch: "Ouverture novembre 2026",
    neighborhoods: 7,
    users: 0,
  },
];

const tones: Record<string, "success" | "info" | "neutral"> = {
  active: "success",
  scheduled: "info",
  planned: "neutral",
};

export default function SettingsCitiesPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Villes" },
        ]}
        title="Villes"
        description="Lille intra-muros aujourd'hui — l'expansion suit le rythme de la communauté."
        actions={<Button variant="outline">Demander une ville</Button>}
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <div key={c.name} className="rounded-lg border border-n-100 bg-surface p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-paper text-n-700">
                <MapPin className="h-4 w-4" />
              </span>
              <Pill tone={tones[c.status]} dot>{c.statusLabel}</Pill>
            </div>
            <p className="mt-4 text-h3 font-medium text-ink">{c.name}</p>
            <p className="mt-0.5 text-body-sm text-n-500">{c.launch}</p>
            <ul className="mt-4 space-y-1.5 text-body-sm">
              <li className="flex justify-between"><span className="text-n-500">Quartiers</span><span className="tabular text-ink">{c.neighborhoods}</span></li>
              <li className="flex justify-between"><span className="text-n-500">Utilisateurs</span><span className="tabular text-ink">{formatNumber(c.users)}</span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
