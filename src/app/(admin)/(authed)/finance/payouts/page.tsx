import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { orders } from "@/lib/fixtures/orders";
import { getUser } from "@/lib/fixtures/users";
import { formatEuro, formatDate } from "@/lib/utils/format";

const upcomingPayouts = orders
  .filter((o) => o.status === "completed" && !o.payoutAt)
  .map((o) => ({ id: o.id, ref: o.ref, sellerId: o.sellerId, amount: o.net, scheduled: o.completedAt }));

const sentPayouts = orders
  .filter((o) => o.payoutAt)
  .map((o) => ({ id: o.id, ref: o.ref, sellerId: o.sellerId, amount: o.net, sentAt: o.payoutAt }));

export const metadata = { title: "Versements" };

export default function PayoutsPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/finance", label: "Finance" },
          { label: "Versements" },
        ]}
        title="Versements"
        description="Cycle automatique J+2 après finalisation de la transaction."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <KPI label="À verser cette semaine" value={formatEuro(upcomingPayouts.reduce((a, p) => a + p.amount, 0))} />
        <KPI label="Versés ce mois" value={formatEuro(sentPayouts.reduce((a, p) => a + p.amount, 0))} />
        <KPI label="Vendeurs uniques" value="186" />
      </div>

      <section>
        <h3 className="mb-3 text-h3 font-medium text-ink">Prochains versements</h3>
        <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
          <Table headers={["Référence", "Vendeur", "Montant net", "Programmé pour", "Statut"]}>
            {upcomingPayouts.map((p) => (
              <tr key={p.id} className="border-b border-n-100 last:border-0">
                <td className="px-4 py-3 font-medium tabular text-ink">{p.ref}</td>
                <td className="px-4 py-3 text-n-700">{getUser(p.sellerId)?.name ?? "—"}</td>
                <td className="px-4 py-3 tabular text-ink">{formatEuro(p.amount)}</td>
                <td className="px-4 py-3 text-caption text-n-500">{p.scheduled ? formatDate(p.scheduled) : "—"}</td>
                <td className="px-4 py-3"><Pill tone="warning" dot>En attente</Pill></td>
              </tr>
            ))}
          </Table>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-h3 font-medium text-ink">Versements effectués</h3>
        <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
          <Table headers={["Référence", "Vendeur", "Montant", "Versé le", "Statut"]}>
            {sentPayouts.map((p) => (
              <tr key={p.id} className="border-b border-n-100 last:border-0">
                <td className="px-4 py-3 font-medium tabular text-ink">{p.ref}</td>
                <td className="px-4 py-3 text-n-700">{getUser(p.sellerId)?.name ?? "—"}</td>
                <td className="px-4 py-3 tabular text-ink">{formatEuro(p.amount)}</td>
                <td className="px-4 py-3 text-caption text-n-500">{p.sentAt ? formatDate(p.sentAt) : "—"}</td>
                <td className="px-4 py-3"><Pill tone="success" dot>Versé</Pill></td>
              </tr>
            ))}
          </Table>
        </div>
      </section>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-n-100 bg-surface p-4">
      <p className="text-label text-n-500">{label}</p>
      <p className="mt-1 text-h2 font-medium tabular text-ink">{value}</p>
    </div>
  );
}

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full text-body-sm">
      <thead>
        <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
          {headers.map((h) => (
            <th key={h} className="px-4 py-2.5 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
