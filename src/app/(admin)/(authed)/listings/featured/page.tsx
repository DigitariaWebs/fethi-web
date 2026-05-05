import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { listings, ListingStatus } from "@/lib/fixtures/listings";
import { getUser } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatDistance, formatEuro } from "@/lib/utils/format";

const statusTone: Record<ListingStatus, "neutral" | "primary" | "accent" | "success" | "warning" | "danger" | "info" | "ink"> = {
  active: "success",
  pending: "warning",
  sold: "neutral",
  rejected: "danger",
  flagged: "warning",
  draft: "neutral",
};

export default function ListingsFeaturedPage() {
  const featured = listings.filter((l) => l.featured === true);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/listings", label: "Annonces" },
          { label: "À la une" },
        ]}
        title="Annonces à la une"
        description={`${featured.length} annonces mises en avant sur la page d'accueil et les recherches géolocalisées.`}
        actions={
          <Button variant="outline" size="sm" href="/listings">
            Gérer les annonces
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((l) => {
          const seller = getUser(l.sellerId);
          return (
            <Link
              key={l.id}
              href={`/listings/${l.id}`}
              className="group overflow-hidden rounded-lg border border-n-100 bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
            >
              <div
                className="relative aspect-[4/3]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,85,61,0.18) 0%, rgba(47,107,94,0.10) 100%)",
                }}
              >
                <div className="absolute top-2 left-2">
                  <Pill tone={statusTone[l.status]} dot>
                    {l.status}
                  </Pill>
                </div>
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-caption font-medium text-warning">
                  <Star className="h-3 w-3 fill-warning" /> À la une
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span className="font-serif text-h2 italic text-primary-ink/40">
                    {l.title.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="space-y-1 px-4 py-3">
                <p className="line-clamp-1 text-body-sm font-medium text-ink">{l.title}</p>
                <div className="flex items-center justify-between text-caption text-n-500">
                  <span>
                    {neighborhoodName(l.neighborhood)} · {formatDistance(l.distanceMeters)}
                  </span>
                  <span className="text-body-sm font-semibold tabular text-primary-ink">
                    {formatEuro(l.price)}
                  </span>
                </div>
                <p className="text-caption text-n-400">{seller?.name ?? "—"}</p>
              </div>
            </Link>
          );
        })}

        <Link
          href="/listings"
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-n-200 bg-paper px-4 py-12 text-center transition-colors hover:border-primary hover:bg-primary-soft/30"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-n-100 text-n-500">
            <Plus className="h-5 w-5" />
          </span>
          <p className="text-body-sm font-medium text-ink">Promouvoir une annonce</p>
          <p className="text-caption text-n-500 max-w-[18ch]">
            Choisissez une annonce active et activez le badge "À la une".
          </p>
        </Link>
      </div>
    </div>
  );
}
