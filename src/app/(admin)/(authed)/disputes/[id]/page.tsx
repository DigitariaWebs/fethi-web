import { notFound } from "next/navigation";
import Link from "next/link";
import { Scale } from "lucide-react";
import { getOrder } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Field } from "@/components/ui/Field";
import { formatEuro, formatDateTime, initials } from "@/lib/utils/format";

const messages = [
  {
    sender: "buyer",
    text:
      "Le vélo est arrivé avec un dérailleur cassé. Je l'ai testé en sortant et il a coincé en troisième vitesse. J'ai des photos.",
    at: "2026-05-01T19:50:00Z",
  },
  {
    sender: "seller",
    text:
      "Le vélo a été testé devant vous. Il fonctionnait parfaitement. Je pense que ça a été abimé pendant le transport ?",
    at: "2026-05-02T08:14:00Z",
  },
  {
    sender: "buyer",
    text:
      "Il a été remis en main propre, pas de transport. Voici la photo du dérailleur — c'est cassé.",
    at: "2026-05-02T09:00:00Z",
  },
  {
    sender: "system",
    text: "Litige escaladé à l'équipe de modération.",
    at: "2026-05-02T09:42:00Z",
  },
];

export default async function DisputeDetailPage({
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

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/disputes", label: "Litiges" },
          { label: order.ref },
        ]}
        title={`Litige sur ${order.ref}`}
        description={listing?.title ?? "—"}
        actions={
          <>
            <Button variant="outline" size="sm">Demander un avis</Button>
            <Button variant="outline" size="sm">Suspendre les fonds</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Échanges</h3>
              <ul className="mt-3 space-y-3">
                {messages.map((m, i) => {
                  const isBuyer = m.sender === "buyer";
                  const isSystem = m.sender === "system";
                  return (
                    <li
                      key={i}
                      className={`flex ${isBuyer ? "justify-start" : isSystem ? "justify-center" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg border px-3 py-2 text-body-sm ${
                          isSystem
                            ? "border-n-100 bg-paper text-n-500 text-caption"
                            : isBuyer
                              ? "border-n-100 bg-paper text-ink"
                              : "border-primary/20 bg-primary-soft text-primary-ink"
                        }`}
                      >
                        <p>{m.text}</p>
                        <p className="mt-1 text-caption text-n-400">{formatDateTime(m.at)}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Décision</h3>
              <p className="mt-1 text-body-sm text-n-500">
                Tranchez en faveur de l&apos;une des parties ou ouvrez un partage à
                proportions ajustables.
              </p>
              <Field label="Notes internes" className="mt-4">
                <Textarea placeholder="Justification de la décision (visible uniquement par les admins)" />
              </Field>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Rembourser l&apos;acheteur</Button>
                <Button variant="outline" size="sm">Verser au vendeur</Button>
                <Button variant="outline" size="sm">Partage 50/50</Button>
                <Button size="sm">Confirmer la décision</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-danger" />
                <Pill tone="danger" dot>Ouvert</Pill>
              </div>
              <div>
                <p className="text-label uppercase tracking-wide text-n-500">Montant en jeu</p>
                <p className="mt-1 text-h2 font-medium tabular tracking-tight text-ink">{formatEuro(order.amount)}</p>
              </div>
              <Party label="Plaignant (Acheteur)" user={buyer} />
              <Party label="Mis en cause (Vendeur)" user={seller} />
              {listing ? (
                <div>
                  <p className="text-label uppercase tracking-wide text-n-500">Annonce</p>
                  <Link href={`/listings/${listing.id}`} className="mt-1 block text-body-sm font-medium text-ink hover:text-primary">
                    {listing.title}
                  </Link>
                </div>
              ) : null}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Party({ label, user }: { label: string; user: ReturnType<typeof getUser> }) {
  if (!user) return null;
  return (
    <div className="border-t border-n-100 pt-4">
      <p className="text-label uppercase tracking-wide text-n-500">{label}</p>
      <Link href={`/users/${user.id}`} className="mt-2 flex items-center gap-2.5">
        <Avatar initials={initials(user.name)} seed={user.id} size="sm" />
        <span>
          <span className="block text-body-sm font-medium text-ink hover:text-primary">{user.name}</span>
          <span className="block text-caption text-n-500">★ {user.rating.toFixed(1).replace(".", ",")} · {user.reviews} avis</span>
        </span>
      </Link>
    </div>
  );
}
