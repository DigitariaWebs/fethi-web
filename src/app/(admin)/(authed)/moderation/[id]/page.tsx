import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  MessageSquare,
  ShieldAlert,
  Star,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { reports, ReportPriority, ReportStatus } from "@/lib/fixtures/reports";
import { getUser } from "@/lib/fixtures/users";
import { getListing } from "@/lib/fixtures/listings";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatDateTime, formatEuro, initials } from "@/lib/utils/format";

const priorityTone: Record<ReportPriority, React.ComponentProps<typeof Pill>["tone"]> = {
  low: "neutral",
  medium: "info",
  high: "warning",
  critical: "danger",
};
const priorityLabel: Record<ReportPriority, string> = {
  low: "Faible",
  medium: "Moyen",
  high: "Élevé",
  critical: "Critique",
};
const statusTone: Record<ReportStatus, React.ComponentProps<typeof Pill>["tone"]> = {
  open: "warning",
  in_review: "info",
  resolved: "success",
  dismissed: "neutral",
};
const statusLabel: Record<ReportStatus, string> = {
  open: "Ouvert",
  in_review: "En cours",
  resolved: "Résolu",
  dismissed: "Rejeté",
};

const targetIcon = {
  listing: <FileText className="h-4 w-4" />,
  user: <UserIcon className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
} as const;

export default async function ModerationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = reports.find((r) => r.id === id);
  if (!report) notFound();

  const reporter = getUser(report.reporterId);
  const targetListing =
    report.targetType === "listing" ? getListing(report.targetId) : undefined;
  const targetUser = report.targetType === "user" ? getUser(report.targetId) : undefined;
  const listingSeller = targetListing ? getUser(targetListing.sellerId) : undefined;

  const timeline: { label: string; at: string; tone: "info" | "warning" | "neutral" | "success" }[] = [
    { label: "Signalement reçu", at: report.createdAt, tone: "info" },
    {
      label: report.assignedTo ? `Assigné à ${report.assignedTo}` : "En attente d'assignation",
      at: report.createdAt,
      tone: report.assignedTo ? "info" : "neutral",
    },
    {
      label: "Auteur prévenu par notification",
      at: report.createdAt,
      tone: "warning",
    },
    {
      label:
        report.status === "resolved"
          ? "Décision appliquée"
          : report.status === "dismissed"
            ? "Signalement rejeté"
            : "Décision en attente",
      at: report.createdAt,
      tone: report.status === "resolved" ? "success" : "neutral",
    },
  ];

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/moderation", label: "Modération" },
          { label: report.targetTitle },
        ]}
        title={report.targetTitle}
        description={`Signalement ${report.id} · motif "${report.reason.replace(/_/g, " ")}"`}
        actions={
          <>
            <Button variant="outline" size="sm" href="/moderation">
              Retour
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-warning-soft text-warning">
                    <ShieldAlert className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-h3 font-medium tracking-tight text-ink">
                      Détail du signalement
                    </p>
                    <p className="text-caption text-n-500">
                      Reçu le {formatDateTime(report.createdAt)}
                    </p>
                  </div>
                </div>
                <Pill tone={priorityTone[report.priority]} dot>
                  {priorityLabel[report.priority]}
                </Pill>
              </div>

              <div className="rounded-md border border-n-100 bg-paper p-4 text-body text-n-700">
                {report.detail}
              </div>

              {reporter ? (
                <div className="flex items-center gap-3 border-t border-n-100 pt-4">
                  <Avatar initials={initials(reporter.name)} seed={reporter.id} size="sm" />
                  <div className="min-w-0">
                    <Link
                      href={`/users/${reporter.id}`}
                      className="text-body-sm font-medium text-ink hover:text-primary"
                    >
                      {reporter.name}
                    </Link>
                    <p className="text-caption text-n-500">
                      Signalant · {neighborhoodName(reporter.neighborhood)} · {reporter.reviews} avis
                    </p>
                  </div>
                </div>
              ) : null}
            </CardBody>
          </Card>

          {targetListing && listingSeller ? (
            <Card>
              <CardBody className="space-y-3">
                <p className="text-label uppercase tracking-wide text-n-500">
                  Annonce signalée
                </p>
                <Link
                  href={`/listings/${targetListing.id}`}
                  className="flex items-center gap-3 rounded-md border border-n-100 bg-paper p-3 hover:bg-n-50"
                >
                  <span
                    className="h-12 w-12 shrink-0 rounded-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(200,85,61,0.20) 0%, rgba(47,107,94,0.10) 100%)",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm font-medium text-ink truncate">
                      {targetListing.title}
                    </p>
                    <p className="text-caption text-n-500 capitalize">
                      {targetListing.category} · {neighborhoodName(targetListing.neighborhood)}
                    </p>
                  </div>
                  <span className="text-body-sm font-semibold tabular text-primary-ink">
                    {formatEuro(targetListing.price)}
                  </span>
                </Link>
                <div className="flex items-center gap-2 text-caption text-n-500">
                  <Avatar
                    initials={initials(listingSeller.name)}
                    seed={listingSeller.id}
                    size="xs"
                  />
                  <Link
                    href={`/users/${listingSeller.id}`}
                    className="text-body-sm text-n-700 hover:text-primary"
                  >
                    {listingSeller.name}
                  </Link>
                </div>
              </CardBody>
            </Card>
          ) : null}

          {targetUser ? (
            <Card>
              <CardBody className="space-y-3">
                <p className="text-label uppercase tracking-wide text-n-500">
                  Utilisateur signalé
                </p>
                <div className="flex items-center gap-4">
                  <Avatar initials={initials(targetUser.name)} seed={targetUser.id} size="lg" />
                  <div className="min-w-0">
                    <Link
                      href={`/users/${targetUser.id}`}
                      className="text-h3 font-medium tracking-tight text-ink hover:text-primary"
                    >
                      {targetUser.name}
                    </Link>
                    <p className="text-caption text-n-500 inline-flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {targetUser.rating.toFixed(1).replace(".", ",")} · {targetUser.reviews} avis
                      · {targetUser.flagged} signalements
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-n-100 pt-3 text-center text-body-sm">
                  <div>
                    <p className="tabular text-ink">{targetUser.listings}</p>
                    <p className="text-caption text-n-500">annonces</p>
                  </div>
                  <div>
                    <p className="tabular text-ink">{targetUser.sales}</p>
                    <p className="text-caption text-n-500">ventes</p>
                  </div>
                  <div>
                    <p className="tabular text-ink">{formatEuro(targetUser.gmv)}</p>
                    <p className="text-caption text-n-500">GMV</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ) : null}

          {report.targetType === "message" ? (
            <Card>
              <CardBody className="space-y-2">
                <p className="text-label uppercase tracking-wide text-n-500">Message signalé</p>
                <p className="text-body text-n-700">{report.targetTitle}</p>
                <p className="text-caption text-n-500">
                  Identifiant interne : {report.targetId}
                </p>
              </CardBody>
            </Card>
          ) : null}

          <Card>
            <CardBody className="space-y-4">
              <div>
                <p className="text-h3 font-medium tracking-tight text-ink">Décision</p>
                <p className="text-body-sm text-n-500">
                  Justifiez votre décision pour l'audit interne. L'auteur du contenu sera notifié.
                </p>
              </div>
              <Textarea
                placeholder="Notes pour l'audit (visible par l'équipe modération uniquement)…"
                rows={4}
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" size="sm">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approuver le contenu
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <XCircle className="h-3.5 w-3.5" />
                  Rejeter
                </Button>
                <Button type="button" variant="danger" size="sm">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Suspendre l'auteur
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-3">
              <p className="text-label uppercase tracking-wide text-n-500">Métadonnées</p>
              <Row label="Priorité">
                <Pill tone={priorityTone[report.priority]} dot>
                  {priorityLabel[report.priority]}
                </Pill>
              </Row>
              <Row label="Statut">
                <Pill tone={statusTone[report.status]} dot>
                  {statusLabel[report.status]}
                </Pill>
              </Row>
              <Row label="Motif">
                <Pill tone="neutral">{report.reason.replace(/_/g, " ")}</Pill>
              </Row>
              <Row label="Cible">
                <span className="inline-flex items-center gap-1.5 text-n-700 capitalize">
                  {targetIcon[report.targetType]}
                  {report.targetType}
                </span>
              </Row>
              <Row label="Assigné à">
                <span className="text-n-700">{report.assignedTo ?? "—"}</span>
              </Row>
              <Row label="Reçu le">
                <span className="text-n-700">{formatDateTime(report.createdAt)}</span>
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-label uppercase tracking-wide text-n-500">Historique</p>
              <ol className="mt-3 space-y-3 border-l border-n-100 pl-4">
                {timeline.map((t, i) => (
                  <li key={i} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1 inline-flex h-2.5 w-2.5 rounded-full ${
                        t.tone === "success"
                          ? "bg-success"
                          : t.tone === "warning"
                            ? "bg-warning"
                            : t.tone === "info"
                              ? "bg-info"
                              : "bg-n-300"
                      }`}
                    />
                    <p className="text-body-sm text-ink">{t.label}</p>
                    <p className="text-caption text-n-500">{formatDateTime(t.at)}</p>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-body-sm">
      <span className="text-n-500">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
