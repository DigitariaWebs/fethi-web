"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, ListIcon, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { listings, ListingStatus } from "@/lib/fixtures/listings";
import { getUser } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatDistance, formatEuro } from "@/lib/utils/format";

const statusTone: Record<ListingStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  active: "success",
  pending: "warning",
  sold: "neutral",
  rejected: "danger",
  flagged: "warning",
  draft: "neutral",
};

export default function ListingsGridPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/listings", label: "Annonces" },
          { label: "Grille" },
        ]}
        title="Annonces — vue grille"
        description="Survol photographique des annonces. Idéal pour repérer les visuels suspects."
        actions={
          <div className="ml-auto inline-flex items-center gap-1 rounded-md border border-n-200 bg-surface p-0.5">
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-caption font-medium text-n-500"
            >
              <ListIcon className="h-3.5 w-3.5" /> Liste
            </Link>
            <button className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-caption font-medium bg-paper text-ink">
              <LayoutGrid className="h-3.5 w-3.5" /> Grille
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((l) => {
          const seller = getUser(l.sellerId);
          return (
            <Link
              key={l.id}
              href={`/listings/${l.id}`}
              className="group overflow-hidden rounded-lg border border-n-100 bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-n-100">
                {l.photo ? (
                  <Image
                    src={l.photo}
                    alt={l.title}
                    fill
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}
                <div className="absolute top-2 left-2">
                  <Pill tone={statusTone[l.status]} dot>{l.status}</Pill>
                </div>
                {l.featured ? (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-caption font-medium text-warning">
                    <Star className="h-3 w-3 fill-warning" /> À la une
                  </span>
                ) : null}
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
      </div>
    </div>
  );
}
