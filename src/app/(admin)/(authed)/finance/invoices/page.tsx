import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { formatEuro } from "@/lib/utils/format";

export const metadata = { title: "Factures" };

const invoices = [
  { id: "INV-2026-04-001", customer: "MyStreet — Frais marketplace", period: "Avril 2026", total: 1687.2, vat: 337.44, status: "paid" },
  { id: "INV-2026-04-002", customer: "Boost subscriptions — Avril", period: "Avril 2026", total: 692.6, vat: 138.52, status: "paid" },
  { id: "INV-2026-04-003", customer: "Pro subscriptions — Avril", period: "Avril 2026", total: 494.0, vat: 98.8, status: "paid" },
  { id: "INV-2026-03-001", customer: "MyStreet — Frais marketplace", period: "Mars 2026", total: 1502.4, vat: 300.48, status: "paid" },
  { id: "INV-2026-03-002", customer: "Boost subscriptions — Mars", period: "Mars 2026", total: 624.8, vat: 124.96, status: "paid" },
  { id: "INV-2026-05-001", customer: "MyStreet — Frais marketplace (en cours)", period: "Mai 2026", total: 320.2, vat: 64.04, status: "draft" },
];

export default function InvoicesPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/finance", label: "Finance" },
          { label: "Factures" },
        ]}
        title="Factures"
        description="Émises automatiquement chaque début de mois."
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Tout télécharger
          </Button>
        }
      />

      <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
              <th className="px-4 py-2.5 text-left">N°</th>
              <th className="px-4 py-2.5 text-left">Émis pour</th>
              <th className="px-4 py-2.5 text-left">Période</th>
              <th className="px-4 py-2.5 text-right">HT</th>
              <th className="px-4 py-2.5 text-right">TVA</th>
              <th className="px-4 py-2.5 text-right">TTC</th>
              <th className="px-4 py-2.5 text-left">Statut</th>
              <th className="px-4 py-2.5 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 font-medium text-ink">
                    <FileText className="h-3.5 w-3.5 text-n-400" />
                    <span className="tabular">{inv.id}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-n-700">{inv.customer}</td>
                <td className="px-4 py-3 text-n-700">{inv.period}</td>
                <td className="px-4 py-3 text-right tabular text-ink">{formatEuro(inv.total - inv.vat)}</td>
                <td className="px-4 py-3 text-right tabular text-n-500">{formatEuro(inv.vat)}</td>
                <td className="px-4 py-3 text-right tabular text-ink font-medium">{formatEuro(inv.total)}</td>
                <td className="px-4 py-3">
                  <Pill tone={inv.status === "paid" ? "success" : "warning"} dot>
                    {inv.status === "paid" ? "Payée" : "Brouillon"}
                  </Pill>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">
                    PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
