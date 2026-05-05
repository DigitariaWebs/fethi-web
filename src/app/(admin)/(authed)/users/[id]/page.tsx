import { notFound } from "next/navigation";
import { getUser } from "@/lib/fixtures/users";
import { listings } from "@/lib/fixtures/listings";
import { orders } from "@/lib/fixtures/orders";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { formatEuro, formatDate } from "@/lib/utils/format";

export default async function UserOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();

  const userListings = listings.filter((l) => l.sellerId === user.id);
  const userOrders = orders.filter((o) => o.buyerId === user.id || o.sellerId === user.id);

  const stats = [
    { label: "Ventes réalisées", value: user.sales },
    { label: "Achats réalisés", value: user.purchases },
    { label: "GMV total", value: formatEuro(user.gmv) },
    { label: "Annonces actives", value: userListings.filter((l) => l.status === "active").length },
    { label: "Annonces totales", value: user.listings },
    { label: "Signalements", value: user.flagged },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card>
          <CardBody>
            <h3 className="text-h3 font-medium text-ink">Bio</h3>
            <p className="mt-2 text-body text-n-700">
              {user.bio ?? "Aucune biographie renseignée."}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h3 className="text-h3 font-medium text-ink">Indicateurs</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-md bg-paper p-3">
                  <p className="text-caption text-n-500">{s.label}</p>
                  <p className="mt-1 text-h3 font-medium tabular text-ink">{s.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <h3 className="text-h3 font-medium text-ink">Dernières transactions</h3>
              <a
                href={`/users/${user.id}/transactions`}
                className="text-body-sm font-medium text-primary hover:text-primary-hover"
              >
                Tout voir →
              </a>
            </div>
            {userOrders.length === 0 ? (
              <p className="mt-3 text-body-sm text-n-500">Aucune transaction.</p>
            ) : (
              <ul className="mt-3 divide-y divide-n-100">
                {userOrders.slice(0, 5).map((o) => (
                  <li key={o.id} className="flex items-center justify-between py-2.5">
                    <div className="min-w-0">
                      <p className="text-body-sm text-ink">{o.ref}</p>
                      <p className="text-caption text-n-500">
                        {o.buyerId === user.id ? "Acheteur" : "Vendeur"} ·{" "}
                        {formatDate(o.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-body-sm tabular text-ink">{formatEuro(o.amount)}</span>
                      <Pill
                        tone={
                          o.status === "completed"
                            ? "success"
                            : o.status === "disputed" || o.status === "refunded"
                              ? "danger"
                              : o.status === "pending_payment"
                                ? "warning"
                                : "info"
                        }
                      >
                        {o.status}
                      </Pill>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardBody className="space-y-3">
            <h3 className="text-h3 font-medium text-ink">Confiance</h3>
            <ul className="space-y-2 text-body-sm">
              <li className="flex justify-between">
                <span className="text-n-500">Compte</span>
                <span className="text-ink capitalize">{user.status}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-n-500">KYC</span>
                <span className="text-ink capitalize">{user.kyc}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-n-500">Note</span>
                <span className="text-ink tabular">
                  {user.rating.toFixed(1).replace(".", ",")} ({user.reviews} avis)
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-n-500">Signalements</span>
                <span className={`tabular ${user.flagged > 0 ? "text-danger" : "text-ink"}`}>
                  {user.flagged}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-n-500">Dernière activité</span>
                <span className="text-ink">{formatDate(user.lastActiveAt, "d MMM, HH:mm")}</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <h3 className="text-h3 font-medium text-ink">Actions admin</h3>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-n-200 bg-surface px-3 py-1.5 text-body-sm font-medium text-n-700 hover:bg-n-50">
                Suspendre
              </button>
              <button className="rounded-md border border-n-200 bg-surface px-3 py-1.5 text-body-sm font-medium text-n-700 hover:bg-n-50">
                Demander un re-KYC
              </button>
              <button className="rounded-md border border-n-200 bg-surface px-3 py-1.5 text-body-sm font-medium text-n-700 hover:bg-n-50">
                Bannir
              </button>
              <button className="rounded-md border border-n-200 bg-surface px-3 py-1.5 text-body-sm font-medium text-n-700 hover:bg-n-50">
                Réinitialiser MDP
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
