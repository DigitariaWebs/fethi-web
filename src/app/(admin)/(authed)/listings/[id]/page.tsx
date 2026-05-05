import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, MessageCircle, Heart, MapPin, Star } from "lucide-react";
import { ListingActions } from "@/components/admin/ListingActions";
import { getListing } from "@/lib/fixtures/listings";
import { getUser } from "@/lib/fixtures/users";
import { reports } from "@/lib/fixtures/reports";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatDate, formatDistance, formatEuro, initials, timeAgo } from "@/lib/utils/format";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();
  const seller = getUser(listing.sellerId);
  const listingReports = reports.filter(
    (r) => r.targetType === "listing" && r.targetId === listing.id,
  );

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/listings", label: "Annonces" },
          { label: listing.title },
        ]}
        title={listing.title}
        description={`${listing.category} · ${listing.type} · ${neighborhoodName(listing.neighborhood)} · ${formatDistance(listing.distanceMeters)}`}
        actions={<ListingActions listing={listing} />}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-n-100 bg-n-100">
            {listing.photo ? (
              <Image
                src={listing.photo}
                alt={listing.title}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,85,61,0.20) 0%, rgba(47,107,94,0.10) 100%)",
                }}
              />
            )}
          </div>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Description</h3>
              <p className="mt-2 text-body text-n-700 whitespace-pre-line">
                {listing.description}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <h3 className="text-h3 font-medium text-ink">Signalements</h3>
                <span className="text-caption text-n-500">{listingReports.length} entrées</span>
              </div>
              {listingReports.length === 0 ? (
                <p className="mt-3 text-body-sm text-n-500">
                  Aucun signalement sur cette annonce.
                </p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {listingReports.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-start gap-3 rounded-md border border-n-100 bg-paper p-3"
                    >
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning-soft text-warning">
                        ⚠
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm text-ink">{r.detail}</p>
                        <p className="text-caption text-n-500">
                          {r.reason.replace(/_/g, " ")} · {formatDate(r.createdAt)}
                        </p>
                      </div>
                      <Pill tone={r.priority === "critical" ? "danger" : r.priority === "high" ? "warning" : "neutral"}>
                        {r.priority}
                      </Pill>
                      <Link
                        href={`/moderation/${r.id}`}
                        className="text-body-sm font-medium text-primary"
                      >
                        Ouvrir →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <p className="text-label uppercase tracking-wide text-n-500">Prix</p>
                <p className="mt-1 text-display tracking-tight text-primary tabular">
                  {formatEuro(listing.price)}
                  {listing.priceUnit ? <span className="text-h3 text-n-500">/{listing.priceUnit}</span> : null}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat icon={<Eye className="h-3.5 w-3.5" />} value={listing.views} label="vues" />
                <Stat icon={<Heart className="h-3.5 w-3.5" />} value={listing.saves} label="sauvegardes" />
                <Stat icon={<MessageCircle className="h-3.5 w-3.5" />} value={listing.messages} label="messages" />
              </div>
              <div className="space-y-1.5 border-t border-n-100 pt-4 text-body-sm">
                <Row label="Statut">
                  <Pill tone={listing.status === "active" ? "success" : listing.status === "rejected" ? "danger" : "warning"} dot>
                    {listing.status}
                  </Pill>
                </Row>
                <Row label="Catégorie"><span className="capitalize text-n-700">{listing.category}</span></Row>
                <Row label="Type"><span className="capitalize text-n-700">{listing.type}</span></Row>
                <Row label="Quartier">
                  <span className="inline-flex items-center gap-1 text-n-700">
                    <MapPin className="h-3 w-3" /> {neighborhoodName(listing.neighborhood)}
                  </span>
                </Row>
                <Row label="Publiée le"><span className="text-n-700">{formatDate(listing.createdAt)}</span></Row>
                <Row label="Mise à jour"><span className="text-n-700">{timeAgo(listing.createdAt)}</span></Row>
              </div>
            </CardBody>
          </Card>

          {seller ? (
            <Card>
              <CardBody>
                <p className="text-label uppercase tracking-wide text-n-500">Vendeur</p>
                <Link href={`/users/${seller.id}`} className="mt-3 flex items-center gap-3">
                  <Avatar initials={initials(seller.name)} seed={seller.id} size="md" />
                  <div>
                    <p className="text-body font-medium text-ink hover:text-primary">{seller.name}</p>
                    <p className="text-caption text-n-500 inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {seller.rating.toFixed(1).replace(".", ",")} · {seller.reviews} avis
                    </p>
                  </div>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" href={`/users/${seller.id}`}>Profil</Button>
                  <Button variant="outline" size="sm" href={`/users/${seller.id}/messages`}>Messages</Button>
                </div>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-md bg-paper p-2.5">
      <p className="inline-flex items-center justify-center gap-1 text-body-sm font-medium tabular text-ink">
        {icon}
        {value}
      </p>
      <p className="text-caption text-n-500">{label}</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-n-500">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
