import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { getOrder } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatEuro, formatDateTime, initials } from "@/lib/utils/format";

const statusFlow = [
  { id: "created", label: "Commande créée" },
  { id: "paid", label: "Paiement validé" },
  { id: "shipped_or_pickup", label: "Expédiée ou remise" },
  { id: "completed", label: "Finalisée par l'acheteur" },
  { id: "payout", label: "Versement vendeur" },
];

function statusIndex(status: string) {
  switch (status) {
    case "pending_payment":
      return 0;
    case "shipped":
    case "in_transit":
      return 2;
    case "completed":
      return 4;
    case "disputed":
    case "refunded":
    case "cancelled":
      return 1;
    default:
      return 0;
  }
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();
  const buyer = getUser(order.buyerId);
  const seller = getUser(order.sellerId);
  const listing = getListing(order.listingId);
  const idx = statusIndex(order.status);

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/orders", label: "Commandes" },
          { label: order.ref },
        ]}
        title={order.ref}
        description={`Transaction ${listing?.title ?? order.listingId}`}
        actions={
          <>
            <Button variant="outline" size="sm">Voir Stripe</Button>
            <Button variant="outline" size="sm">Rembourser</Button>
            {order.status !== "disputed" ? (
              <Button size="sm">Notes admin</Button>
            ) : (
              <Button href={`/disputes/${order.id}`} size="sm">Ouvrir le litige</Button>
            )}
          </>
        }
      />

      {/* progress */}
      <Card>
        <CardBody>
          <div className="flex items-center gap-3 overflow-x-auto">
            {statusFlow.map((s, i) => {
              const done = i <= idx;
              return (
                <div key={s.id} className="flex shrink-0 items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                      done
                        ? "border-success bg-success-soft text-success"
                        : "border-n-200 bg-paper text-n-400"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                  </span>
                  <span className={`text-body-sm ${done ? "text-ink" : "text-n-500"}`}>
                    {s.label}
                  </span>
                  {i < statusFlow.length - 1 ? (
                    <ArrowRight className={`h-3 w-3 ${done ? "text-success" : "text-n-300"}`} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Annonce</h3>
              {listing ? (
                <div className="mt-3 flex items-start gap-3">
                  <span
                    className="h-14 w-14 shrink-0 rounded-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(200,85,61,0.18) 0%, rgba(47,107,94,0.10) 100%)",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="text-body font-medium text-ink hover:text-primary"
                    >
                      {listing.title}
                    </Link>
                    <p className="text-caption text-n-500 capitalize">
                      {listing.category} · {listing.type}
                    </p>
                  </div>
                  <span className="text-body-sm tabular text-ink">{formatEuro(listing.price)}</span>
                </div>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Détails financiers</h3>
              <ul className="mt-3 space-y-2 text-body-sm">
                <li className="flex justify-between"><span className="text-n-500">Montant brut</span><span className="tabular text-ink">{formatEuro(order.amount)}</span></li>
                <li className="flex justify-between"><span className="text-n-500">Commission MyStreet (5 %)</span><span className="tabular text-n-700">−{formatEuro(order.fee, { decimals: 2 })}</span></li>
                <li className="flex justify-between border-t border-n-100 pt-2"><span className="text-n-700 font-medium">Net vendeur</span><span className="tabular text-ink font-medium">{formatEuro(order.net)}</span></li>
                <li className="flex justify-between"><span className="text-n-500">Mode d&apos;envoi</span><span className="text-ink capitalize">{order.shippingMethod.replace("_", " ")}</span></li>
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Chronologie</h3>
              <ol className="mt-3 space-y-3 border-l border-n-100 pl-4">
                <Step done label="Commande créée" at={order.createdAt} />
                {order.paidAt ? <Step done label="Paiement reçu (Stripe)" at={order.paidAt} /> : null}
                {order.completedAt ? <Step done label="Finalisée par l'acheteur" at={order.completedAt} /> : null}
                {order.payoutAt ? <Step done label="Virement vendeur" at={order.payoutAt} /> : null}
              </ol>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div>
                <p className="text-label uppercase tracking-wide text-n-500">Statut</p>
                <Pill tone={order.status === "completed" ? "success" : order.status === "disputed" || order.status === "refunded" ? "danger" : "info"} dot>
                  {order.status}
                </Pill>
              </div>
              <PartyCard label="Acheteur" user={buyer} />
              <PartyCard label="Vendeur" user={seller} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Step({ label, at, done }: { label: string; at: string; done?: boolean }) {
  return (
    <li className="relative">
      <span
        className={`absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-paper ${
          done ? "bg-success" : "bg-n-300"
        }`}
      />
      <p className="text-body-sm text-ink">{label}</p>
      <p className="text-caption text-n-500">{formatDateTime(at)}</p>
    </li>
  );
}

function PartyCard({ label, user }: { label: string; user: ReturnType<typeof getUser> }) {
  if (!user) return null;
  return (
    <div className="border-t border-n-100 pt-4">
      <p className="text-label uppercase tracking-wide text-n-500">{label}</p>
      <Link href={`/users/${user.id}`} className="mt-2 flex items-center gap-2.5">
        <Avatar initials={initials(user.name)} seed={user.id} size="sm" />
        <span className="min-w-0">
          <span className="block text-body-sm font-medium text-ink truncate hover:text-primary">{user.name}</span>
          <span className="block text-caption text-n-500 truncate">{user.email}</span>
        </span>
      </Link>
    </div>
  );
}
