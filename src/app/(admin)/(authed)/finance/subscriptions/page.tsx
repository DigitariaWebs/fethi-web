import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Card, CardBody } from "@/components/ui/Card";
import { formatEuro } from "@/lib/utils/format";

export const metadata = { title: "Abonnements" };

const tiers = [
  {
    name: "Gratuit",
    desc: "Annonces illimitées. Commission 5 % côté vendeur sur les ventes finalisées.",
    price: 0,
    sellers: 5004,
    color: "neutral" as const,
  },
  {
    name: "MyStreet+",
    desc: "Rayon personnalisé, recherches sauvegardées, boosts à −50 %, support 24 h.",
    price: 1.99,
    sellers: 180,
    color: "primary" as const,
  },
];

const boosts = [
  { name: "Boost 24 h", price: 0.99, sold: 248 },
  { name: "Boost 7 j", price: 4.99, sold: 132 },
  { name: "Boost 30 j", price: 14.99, sold: 41 },
];

const recent = [
  { who: "Karim Bensalem", tier: "MyStreet+", at: "2026-05-04T11:00:00Z", action: "Souscrit" },
  { who: "Olivier Thibault", tier: "MyStreet+", at: "2026-05-04T08:42:00Z", action: "Renouvelé" },
  { who: "Marie Lambert", tier: "MyStreet+", at: "2026-05-03T19:14:00Z", action: "Souscrit" },
  { who: "Nora Khaled", tier: "Boost 7 j", at: "2026-05-03T16:08:00Z", action: "Boost acheté" },
  { who: "Pierre Vasseur", tier: "MyStreet+", at: "2026-05-02T14:30:00Z", action: "Annulé" },
];

const mrr = tiers.reduce((acc, t) => acc + t.price * t.sellers, 0);
const boostRevenue = boosts.reduce((acc, b) => acc + b.price * b.sold, 0);

export default function SubscriptionsPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/finance", label: "Finance" },
          { label: "Abonnements" },
        ]}
        title="Abonnements & Boosts"
        description={`MRR estimé : ${formatEuro(mrr)} · Boosts ce mois : ${formatEuro(boostRevenue)} · 180 abonnés MyStreet+`}
      />

      <div className="grid gap-3 md:grid-cols-2">
        {tiers.map((t) => (
          <Card key={t.name}>
            <CardBody>
              <div className="flex items-center justify-between">
                <Pill tone={t.color}>{t.name}</Pill>
                <span className="text-h2 font-medium tabular tracking-tight text-ink">
                  {t.price === 0 ? "Gratuit" : `${formatEuro(t.price, { decimals: 2 })} /mois`}
                </span>
              </div>
              <p className="mt-3 text-body-sm text-n-600">{t.desc}</p>
              <div className="mt-4 flex items-end justify-between border-t border-n-100 pt-3">
                <span className="text-label text-n-500">Utilisateurs</span>
                <span className="text-h3 font-medium tabular text-ink">
                  {t.sellers.toLocaleString("fr-FR")}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <h3 className="text-h3 font-medium text-ink">Boosts à l’unité</h3>
            <span className="text-caption text-n-500">Achats ce mois</span>
          </div>
          <ul className="mt-3 divide-y divide-n-100">
            {boosts.map((b) => (
              <li key={b.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-body-sm font-medium text-ink">{b.name}</p>
                  <p className="text-caption text-n-500 tabular">
                    {formatEuro(b.price, { decimals: 2 })} l’unité
                  </p>
                </div>
                <div className="flex items-center gap-6 text-body-sm tabular">
                  <span className="text-n-500">{b.sold.toLocaleString("fr-FR")} achats</span>
                  <span className="font-medium text-ink">
                    {formatEuro(b.price * b.sold, { decimals: 2 })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-h3 font-medium text-ink">Évènements récents</h3>
          <ul className="mt-3 divide-y divide-n-100">
            {recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-body-sm text-ink">
                    {r.who} <span className="text-n-500">— {r.action.toLowerCase()} {r.tier}</span>
                  </p>
                  <p className="text-caption text-n-400">{new Date(r.at).toLocaleString("fr-FR")}</p>
                </div>
                <Pill tone={r.action === "Annulé" ? "danger" : r.action === "Boost acheté" ? "info" : "success"}>
                  {r.action}
                </Pill>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
