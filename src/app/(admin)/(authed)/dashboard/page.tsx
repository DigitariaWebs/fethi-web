import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ShoppingBag,
  Users as UsersIcon,
  Tag,
  ShieldAlert,
  Banknote,
  IdCard,
  Scale,
} from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { KPIStat } from "@/components/ui/KPIStat";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Sparkline } from "@/components/admin/charts/Chart";
import { DashboardGmvChart } from "@/components/admin/charts/DashboardGmvChart";
import { dailyGmv, newSignups, summary, categoryMix } from "@/lib/fixtures/metrics";
import { activity } from "@/lib/fixtures/activity";
import { listings } from "@/lib/fixtures/listings";
import { reports } from "@/lib/fixtures/reports";
import { getUser } from "@/lib/fixtures/users";
import { formatEuro, formatNumber, timeAgo, formatDate } from "@/lib/utils/format";
import { colors } from "@/lib/tokens";

export const metadata = { title: "Tableau de bord" };

const trendData = dailyGmv.slice(-14);

const activityIcon: Record<string, React.ReactNode> = {
  listing_sold: <ShoppingBag className="h-3.5 w-3.5" />,
  user_signup: <UsersIcon className="h-3.5 w-3.5" />,
  report_filed: <ShieldAlert className="h-3.5 w-3.5" />,
  kyc_verified: <IdCard className="h-3.5 w-3.5" />,
  kyc_submitted: <IdCard className="h-3.5 w-3.5" />,
  listing_published: <Tag className="h-3.5 w-3.5" />,
  listing_rejected: <Tag className="h-3.5 w-3.5" />,
  payout_completed: <Banknote className="h-3.5 w-3.5" />,
  user_suspended: <ShieldAlert className="h-3.5 w-3.5" />,
  dispute_opened: <Scale className="h-3.5 w-3.5" />,
};

const activityLabel: Record<string, string> = {
  listing_sold: "Vente",
  user_signup: "Nouveau compte",
  report_filed: "Signalement",
  kyc_verified: "KYC validé",
  kyc_submitted: "KYC soumis",
  listing_published: "Annonce publiée",
  listing_rejected: "Annonce rejetée",
  payout_completed: "Virement effectué",
  user_suspended: "Compte suspendu",
  dispute_opened: "Litige ouvert",
};

export default function AdminDashboardPage() {
  const queue = [
    {
      label: "Modération",
      value: summary.pendingReviews,
      href: "/moderation",
      tone: "warning" as const,
      hint: "À traiter",
    },
    {
      label: "Litiges",
      value: summary.openDisputes,
      href: "/disputes",
      tone: "danger" as const,
      hint: "Ouvert",
    },
    {
      label: "KYC en attente",
      value: summary.pendingKyc,
      href: "/kyc",
      tone: "info" as const,
      hint: "Demandes",
    },
    {
      label: "Versements",
      value: formatEuro(summary.pendingPayouts),
      href: "/finance/payouts",
      tone: "primary" as const,
      hint: `cycle ${summary.payoutCycleDays} j`,
    },
  ];

  const liveListings = listings
    .filter((l) => l.status === "active")
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="container-admin py-8 space-y-8">
      <PageHeader
        title="Tableau de bord"
        description={`Aperçu de l'activité au ${formatDate(new Date(), "d MMMM yyyy")} — Lille intra-muros.`}
        actions={
          <>
            <Button href="/communications/announcements" variant="outline" size="sm">
              Annonce
            </Button>
            <Button href="/activity" size="sm">
              Voir toute l&apos;activité
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KPIStat
          label="Utilisateurs"
          value={formatNumber(summary.users)}
          delta={summary.usersDelta}
          hint={`Actifs 7j : ${formatNumber(summary.activeUsers7d)}`}
          trend={
            <Sparkline
              data={newSignups.slice(-14)}
              dataKey="value"
              color={colors.primary}
            />
          }
        />
        <KPIStat
          label="GMV — mois en cours"
          value={formatEuro(summary.gmvMonth)}
          delta={summary.gmvDelta}
          hint="Net hors frais d'expédition"
          trend={<Sparkline data={trendData} color={colors.accent} />}
        />
        <KPIStat
          label="Annonces actives"
          value={formatNumber(summary.liveListings)}
          delta={summary.listingsDelta}
          hint={`${formatNumber(summary.listings)} totales`}
        />
        <KPIStat
          label="Revenu — mois"
          value={formatEuro(summary.revenueMonth)}
          delta={summary.revenueDelta}
          hint="Commission 5 % + MyStreet+"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* GMV chart */}
        <section className="rounded-lg border border-n-100 bg-surface p-5">
          <header className="flex items-end justify-between gap-4 pb-4">
            <div>
              <p className="text-label uppercase tracking-wide text-n-500">
                Volume de transactions — 30 jours
              </p>
              <p className="mt-1 text-h2 font-medium tabular tracking-tight text-ink">
                {formatEuro(dailyGmv.reduce((acc, d) => acc + d.value, 0))}
              </p>
            </div>
            <div className="flex items-center gap-3 text-caption text-n-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" /> GMV (€)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" /> Inscriptions
              </span>
            </div>
          </header>
          <DashboardGmvChart />
        </section>

        {/* Queue */}
        <section className="rounded-lg border border-n-100 bg-surface p-5">
          <header className="pb-4">
            <p className="text-label uppercase tracking-wide text-n-500">
              File d&apos;attente
            </p>
            <p className="mt-1 text-body-sm text-n-500">
              Tâches qui requièrent une décision humaine.
            </p>
          </header>
          <ul className="divide-y divide-n-100">
            {queue.map((q) => (
              <li key={q.label}>
                <Link
                  href={q.href}
                  className="flex items-center justify-between gap-3 py-3 group"
                >
                  <div className="flex items-center gap-3">
                    <Pill tone={q.tone} dot>
                      {q.hint}
                    </Pill>
                    <span className="text-body text-ink">{q.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-h3 font-medium tabular text-ink">
                      {q.value}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-n-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Activity feed */}
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="flex items-center justify-between border-b border-n-100 px-5 py-4">
            <div>
              <p className="text-h3 font-medium text-ink">Activité récente</p>
              <p className="text-body-sm text-n-500">
                Évènements live à travers la marketplace.
              </p>
            </div>
            <Link
              href="/activity"
              className="text-body-sm font-medium text-primary hover:text-primary-hover"
            >
              Tout voir →
            </Link>
          </header>
          <ul className="divide-y divide-n-100">
            {activity.slice(0, 7).map((e) => (
              <li key={e.id} className="flex items-start gap-3 px-5 py-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-n-100 text-n-600">
                  {activityIcon[e.type] ?? <Tag className="h-3.5 w-3.5" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-body-sm text-ink">
                    <span className="font-medium">{e.actor}</span>
                    <span className="text-n-500"> · {activityLabel[e.type]}</span>
                    {e.target ? (
                      <>
                        {" "}— <span className="text-n-700">{e.target}</span>
                      </>
                    ) : null}
                    {typeof e.amount === "number" ? (
                      <>
                        {" "}<span className="text-n-700">· {formatEuro(e.amount)}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="text-caption text-n-400">{timeAgo(e.at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Top listings */}
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="flex items-center justify-between border-b border-n-100 px-5 py-4">
            <div>
              <p className="text-h3 font-medium text-ink">Annonces les plus vues</p>
              <p className="text-body-sm text-n-500">7 derniers jours</p>
            </div>
            <Link
              href="/listings"
              className="text-body-sm font-medium text-primary hover:text-primary-hover"
            >
              Tout voir →
            </Link>
          </header>
          <ul className="divide-y divide-n-100">
            {liveListings.map((l) => {
              const seller = getUser(l.sellerId);
              return (
                <li key={l.id}>
                  <Link
                    href={`/listings/${l.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-n-50"
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-n-100">
                      {l.photo ? (
                        <Image src={l.photo} alt="" fill sizes="40px" className="object-cover" />
                      ) : null}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 text-body-sm font-medium text-ink">
                        {l.title}
                      </p>
                      <p className="text-caption text-n-500">
                        {seller?.name ?? "—"} · {formatEuro(l.price)} · {l.views} vues
                      </p>
                    </div>
                    {l.featured ? (
                      <Pill tone="primary">À la une</Pill>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Category mix */}
        <section className="rounded-lg border border-n-100 bg-surface p-5">
          <header className="pb-4">
            <p className="text-label uppercase tracking-wide text-n-500">
              Mix par catégorie
            </p>
            <p className="mt-1 text-body-sm text-n-500">
              Part du GMV ce mois
            </p>
          </header>
          <ul className="space-y-2.5">
            {categoryMix.map((c) => (
              <li key={c.name}>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-n-700">{c.name}</span>
                  <span className="tabular text-n-500">{c.value}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-n-100">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${c.value * 3}%`, maxWidth: "100%" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Reports preview */}
        <section className="rounded-lg border border-n-100 bg-surface">
          <header className="flex items-center justify-between border-b border-n-100 px-5 py-4">
            <div>
              <p className="text-h3 font-medium text-ink">Signalements ouverts</p>
              <p className="text-body-sm text-n-500">À examiner</p>
            </div>
            <Link
              href="/moderation"
              className="text-body-sm font-medium text-primary hover:text-primary-hover"
            >
              Tout voir →
            </Link>
          </header>
          <ul className="divide-y divide-n-100">
            {reports
              .filter((r) => r.status === "open" || r.status === "in_review")
              .slice(0, 5)
              .map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/moderation/${r.id}`}
                    className="flex items-start gap-3 px-5 py-3 hover:bg-n-50"
                  >
                    <Avatar initials={r.reason.slice(0, 2).toUpperCase()} seed={r.id} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 text-body-sm font-medium text-ink">
                        {r.targetTitle}
                      </p>
                      <p className="text-caption text-n-500">
                        {r.reason.replace(/_/g, " ")} · {timeAgo(r.createdAt)}
                      </p>
                    </div>
                    <Pill
                      tone={
                        r.priority === "critical"
                          ? "danger"
                          : r.priority === "high"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {r.priority}
                    </Pill>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
