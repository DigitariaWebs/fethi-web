import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { timeAgo } from "@/lib/utils/format";

export const metadata = { title: "Stripe sync" };

const webhooks = [
  { event: "payment_intent.succeeded", at: "2026-05-04T13:42:00Z", status: "ok" },
  { event: "transfer.created", at: "2026-05-04T13:43:00Z", status: "ok" },
  { event: "charge.dispute.created", at: "2026-05-03T22:14:00Z", status: "ok" },
  { event: "account.updated", at: "2026-05-03T18:30:00Z", status: "ok" },
  { event: "payment_intent.payment_failed", at: "2026-05-02T09:22:00Z", status: "warn" },
  { event: "payout.paid", at: "2026-05-02T08:01:00Z", status: "ok" },
];

export default function StripeSyncPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/finance", label: "Finance" },
          { label: "Stripe sync" },
        ]}
        title="Stripe sync"
        description="État de la synchronisation entre la plateforme et Stripe Connect."
        actions={
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5" />
            Re-synchroniser maintenant
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Status label="Webhooks" value="Sain" tone="success" hint="Dernière réception il y a 12 secondes" />
        <Status label="Compte Connect" value="Activé" tone="success" hint="acct_1NwT…fjQp" />
        <Status label="Mode" value="Production" tone="info" hint="Bascule vers Test" />
      </div>

      <Card>
        <CardBody>
          <h3 className="text-h3 font-medium text-ink">Évènements récents</h3>
          <ul className="mt-3 divide-y divide-n-100">
            {webhooks.map((w, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2">
                  {w.status === "ok" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  <span className="font-mono text-body-sm text-ink">{w.event}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-caption text-n-500">{timeAgo(w.at)}</span>
                  <Pill tone={w.status === "ok" ? "success" : "warning"}>
                    {w.status === "ok" ? "200" : "warn"}
                  </Pill>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

function Status({ label, value, tone, hint }: { label: string; value: string; tone: React.ComponentProps<typeof Pill>["tone"]; hint: string }) {
  return (
    <div className="rounded-lg border border-n-100 bg-surface p-4">
      <p className="text-label text-n-500">{label}</p>
      <p className="mt-1 text-h3 font-medium text-ink">{value}</p>
      <div className="mt-2 flex items-center justify-between">
        <Pill tone={tone} dot>OK</Pill>
        <span className="text-caption text-n-500">{hint}</span>
      </div>
    </div>
  );
}
