import Link from "next/link";
import { ArrowUpRight, Banknote, FileText, KeyRound, Receipt } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { summary, dailyGmv } from "@/lib/fixtures/metrics";
import { formatEuro, formatNumber } from "@/lib/utils/format";

export const metadata = { title: "Finance" };

const last7 = dailyGmv.slice(-7).reduce((acc, d) => acc + d.value, 0);
const prev7 = dailyGmv.slice(-14, -7).reduce((acc, d) => acc + d.value, 0);
const wow = (last7 - prev7) / prev7;

const subModules = [
  { href: "/finance/payouts", label: "Versements", desc: "Cycles vers vendeurs", icon: Banknote, count: "14 580 €" },
  { href: "/finance/subscriptions", label: "Abonnements", desc: "Boost & Pro tiers", icon: Receipt, count: "168" },
  { href: "/finance/invoices", label: "Factures", desc: "Émises B2B", icon: FileText, count: "12 ce mois" },
  { href: "/finance/tax", label: "TVA", desc: "Déclaration trimestre", icon: Receipt, count: "T2 ouverte" },
  { href: "/finance/stripe-sync", label: "Stripe sync", desc: "Webhooks & événements", icon: KeyRound, count: "Sain" },
];

export default function FinancePage() {
  return (
    <div className="container-admin py-8 space-y-8">
      <PageHeader
        crumbs={[{ href: "/dashboard", label: "Tableau de bord" }, { label: "Finance" }]}
        title="Finance"
        description="Vue d'ensemble du chiffre, des frais, des remboursements et des virements."
        actions={
          <Button href="/finance/invoices" size="sm">
            Exporter le mois
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat label="GMV — mois" value={formatEuro(summary.gmvMonth)} delta={summary.gmvDelta} hint="Volume des transactions" />
        <KPIStat label="Revenu net" value={formatEuro(summary.revenueMonth)} delta={summary.revenueDelta} hint="Commission 5 % + abonnements" />
        <KPIStat label="Versements en attente" value={formatEuro(summary.pendingPayouts)} hint={`Cycle ${summary.payoutCycleDays} j`} />
        <KPIStat label="GMV — 7 derniers jours" value={formatEuro(last7)} delta={wow} hint="vs. semaine précédente" />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {subModules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group rounded-lg border border-n-100 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-paper text-n-700">
                <m.icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-n-300 transition-all group-hover:text-n-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-6 text-body font-medium text-ink">{m.label}</p>
            <p className="mt-0.5 text-body-sm text-n-500">{m.desc}</p>
            <p className="mt-4 text-h3 font-medium tabular text-ink">{m.count}</p>
          </Link>
        ))}
      </div>

      <Card>
        <CardBody>
          <h3 className="text-h3 font-medium text-ink">Provisions Stripe</h3>
          <p className="mt-1 text-body-sm text-n-500">
            État du compte Stripe Connect en temps réel.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="rounded-md border border-n-100 bg-paper p-4">
              <p className="text-label text-n-500">Solde disponible</p>
              <p className="mt-1 text-h2 font-medium tabular text-ink">{formatEuro(28420)}</p>
              <Pill tone="success" dot>Synchronisé</Pill>
            </li>
            <li className="rounded-md border border-n-100 bg-paper p-4">
              <p className="text-label text-n-500">Solde en attente</p>
              <p className="mt-1 text-h2 font-medium tabular text-ink">{formatEuro(14580)}</p>
              <Pill tone="warning" dot>D+2</Pill>
            </li>
            <li className="rounded-md border border-n-100 bg-paper p-4">
              <p className="text-label text-n-500">Disputes Stripe</p>
              <p className="mt-1 text-h2 font-medium tabular text-ink">0</p>
              <Pill tone="success" dot>RAS</Pill>
            </li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-h3 font-medium text-ink">Rapport rapide</h3>
          <ul className="mt-3 space-y-2 text-body-sm">
            <li className="flex justify-between"><span className="text-n-500">Utilisateurs payants ce mois</span><span className="tabular text-ink">168</span></li>
            <li className="flex justify-between"><span className="text-n-500">Commission effective</span><span className="tabular text-ink">5,0 %</span></li>
            <li className="flex justify-between"><span className="text-n-500">Remboursements</span><span className="tabular text-ink">{formatNumber(8)} (0,4 % GMV)</span></li>
            <li className="flex justify-between"><span className="text-n-500">Coût Stripe (estimé)</span><span className="tabular text-ink">{formatEuro(642)}</span></li>
            <li className="flex justify-between"><span className="text-n-500">Marge brute après Stripe</span><span className="tabular text-success">{formatEuro(1045)}</span></li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
