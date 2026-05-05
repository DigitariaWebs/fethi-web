"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { listings } from "@/lib/fixtures/listings";

const cats = [
  { name: "Vélo", slug: "velo" },
  { name: "Mode", slug: "mode" },
  { name: "Maison", slug: "maison" },
  { name: "High-tech", slug: "high-tech" },
  { name: "Jardinage", slug: "jardinage" },
  { name: "Loisirs", slug: "loisirs" },
  { name: "Livres", slug: "livres" },
  { name: "Enfant", slug: "enfant" },
  { name: "Services", slug: "services" },
  { name: "Location", slug: "location" },
];

const slugMap: Record<string, string> = {
  velo: "vélo",
  mode: "mode",
  maison: "maison",
  "high-tech": "high-tech",
  jardinage: "jardinage",
  loisirs: "loisirs",
  livres: "livres",
  enfant: "enfant",
  services: "services",
  location: "location",
};

export default function SettingsCategoriesPage() {
  const [active, setActive] = useState<Record<string, boolean>>(
    Object.fromEntries(cats.map((c) => [c.slug, true])),
  );

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Catégories" },
        ]}
        title="Catégories"
        description="10 catégories actives — couvre l'essentiel d'un quartier."
        actions={<Button variant="primary"><Plus className="h-3.5 w-3.5" /> Ajouter</Button>}
      />

      <section className="rounded-lg border border-n-100 bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-body-sm">
            <thead className="bg-paper text-left">
              <tr>
                <th className="px-5 py-3 text-label font-medium text-n-500">Nom</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Slug</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Annonces</th>
                <th className="px-5 py-3 text-label font-medium text-n-500">Active</th>
                <th className="px-5 py-3 text-label font-medium text-n-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-n-100">
              {cats.map((c) => {
                const count = listings.filter((l) => l.category === slugMap[c.slug]).length;
                return (
                  <tr key={c.slug} className="hover:bg-n-50">
                    <td className="px-5 py-3 text-ink">{c.name}</td>
                    <td className="px-5 py-3 font-mono text-caption text-n-500">{c.slug}</td>
                    <td className="px-5 py-3 tabular text-n-700">{count}</td>
                    <td className="px-5 py-3">
                      <Toggle
                        checked={active[c.slug] ?? true}
                        onChange={(next) => setActive((s) => ({ ...s, [c.slug]: next }))}
                      />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="sm"><Pencil className="h-3.5 w-3.5" /> Modifier</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
