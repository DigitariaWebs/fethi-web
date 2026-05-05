import Link from "next/link";
import {
  Baby,
  Bike,
  BookOpen,
  Cpu,
  KeyRound,
  Shirt,
  Sofa,
  Tent,
  Trees,
  Wrench,
} from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { listings, ListingCategory } from "@/lib/fixtures/listings";
import { formatEuro, formatNumber } from "@/lib/utils/format";

type CategoryMeta = {
  id: ListingCategory;
  label: string;
  icon: React.ReactNode;
  description: string;
};

const categories: CategoryMeta[] = [
  { id: "vélo", label: "Vélo", icon: <Bike className="h-4 w-4" />, description: "Vélos, accessoires, pièces" },
  { id: "mode", label: "Mode", icon: <Shirt className="h-4 w-4" />, description: "Vêtements, chaussures, accessoires" },
  { id: "maison", label: "Maison", icon: <Sofa className="h-4 w-4" />, description: "Mobilier et déco" },
  { id: "high-tech", label: "High-tech", icon: <Cpu className="h-4 w-4" />, description: "Téléphones, consoles, ordinateurs" },
  { id: "jardinage", label: "Jardinage", icon: <Trees className="h-4 w-4" />, description: "Outils, plantes, extérieur" },
  { id: "loisirs", label: "Loisirs", icon: <Tent className="h-4 w-4" />, description: "Sport, camping, jeux" },
  { id: "livres", label: "Livres", icon: <BookOpen className="h-4 w-4" />, description: "Romans, BD, manuels" },
  { id: "enfant", label: "Enfant", icon: <Baby className="h-4 w-4" />, description: "Vêtements, jouets, puériculture" },
  { id: "services", label: "Services", icon: <Wrench className="h-4 w-4" />, description: "Petits travaux, garde, cours" },
  { id: "location", label: "Location", icon: <KeyRound className="h-4 w-4" />, description: "Outils et matériel à louer" },
];

export default function ListingsCategoriesPage() {
  const rows = categories.map((c) => {
    const all = listings.filter((l) => l.category === c.id);
    const active = all.filter((l) => l.status === "active");
    const views = all.reduce((sum, l) => sum + l.views, 0);
    const gmv = all.reduce((sum, l) => sum + l.price, 0) * 0.7;
    return { ...c, total: all.length, active: active.length, views, gmv };
  });

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/listings", label: "Annonces" },
          { label: "Catégories" },
        ]}
        title="Catégories"
        description={`${categories.length} catégories couvrant l'ensemble du marché MyStreet.`}
      />

      <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-n-100 bg-paper">
              <th className="px-4 py-3 text-left text-label uppercase tracking-wide font-medium text-n-500">
                Catégorie
              </th>
              <th className="px-4 py-3 text-right text-label uppercase tracking-wide font-medium text-n-500">
                Annonces totales
              </th>
              <th className="px-4 py-3 text-right text-label uppercase tracking-wide font-medium text-n-500">
                Annonces actives
              </th>
              <th className="px-4 py-3 text-right text-label uppercase tracking-wide font-medium text-n-500">
                Vues
              </th>
              <th className="px-4 py-3 text-right text-label uppercase tracking-wide font-medium text-n-500">
                GMV approx
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-n-100 last:border-0 hover:bg-n-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/listings?category=${encodeURIComponent(r.id)}`}
                    className="flex items-center gap-3"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary-ink">
                      {r.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-body-sm font-medium text-ink capitalize">
                        {r.label}
                      </span>
                      <span className="block text-caption text-n-500">{r.description}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-body-sm tabular text-ink">
                  {formatNumber(r.total)}
                </td>
                <td className="px-4 py-3 text-right text-body-sm tabular text-success">
                  {formatNumber(r.active)}
                </td>
                <td className="px-4 py-3 text-right text-body-sm tabular text-n-700">
                  {formatNumber(r.views)}
                </td>
                <td className="px-4 py-3 text-right text-body-sm tabular text-ink">
                  {formatEuro(Math.round(r.gmv))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
