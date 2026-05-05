import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatEuro } from "@/lib/utils/format";

export const metadata = { title: "TVA" };

export default function TaxPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/finance", label: "Finance" },
          { label: "TVA" },
        ]}
        title="TVA"
        description="Déclaration trimestrielle CA3 — taux normal 20 %."
        actions={<Button>Préparer la CA3 T2 2026</Button>}
      />

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <h3 className="text-h3 font-medium text-ink">T2 2026 (avril – juin)</h3>
            <Pill tone="warning" dot>En cours</Pill>
          </div>
          <ul className="mt-4 space-y-2 text-body-sm">
            <Row label="CA HT déclaré" value={formatEuro(1687.2 + 692.6 + 494.0)} />
            <Row label="TVA collectée (20 %)" value={formatEuro(574.76)} />
            <Row label="TVA déductible (achats)" value={formatEuro(78.32)} />
            <Row label="TVA à reverser" value={formatEuro(496.44)} bold />
            <Row label="Date limite de dépôt" value="20 juillet 2026" />
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-h3 font-medium text-ink">Trimestres précédents</h3>
          <table className="mt-3 w-full text-body-sm">
            <thead>
              <tr className="border-b border-n-100 text-label uppercase tracking-wide text-n-500">
                <th className="py-2 text-left">Période</th>
                <th className="py-2 text-right">CA HT</th>
                <th className="py-2 text-right">TVA</th>
                <th className="py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              <Tr p="T1 2026" ht={2104} tva={420.8} s="Déclarée" />
              <Tr p="T4 2025" ht={1842} tva={368.4} s="Déclarée" />
              <Tr p="T3 2025" ht={1218} tva={243.6} s="Déclarée" />
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="text-body-sm text-n-700 space-y-2">
          <h3 className="text-h3 font-medium text-ink">Notes fiscales</h3>
          <p>
            MyStreet est assujettie au régime réel simplifié de la TVA. Les ventes
            entre particuliers (C2C) ne donnent pas lieu à TVA collectée par les
            vendeurs ; seule la commission MyStreet et les abonnements Boost/Pro
            sont taxables au taux normal de 20 %.
          </p>
          <p>
            La déclaration CA3 est préparée automatiquement à partir des factures
            émises et synchronisée avec votre cabinet comptable Pennylane.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <li className={`flex justify-between border-b border-n-100 pb-1.5 ${bold ? "font-medium text-ink" : ""}`}>
      <span className="text-n-500">{label}</span>
      <span className="tabular">{value}</span>
    </li>
  );
}

function Tr({ p, ht, tva, s }: { p: string; ht: number; tva: number; s: string }) {
  return (
    <tr className="border-b border-n-100 last:border-0">
      <td className="py-2 text-ink">{p}</td>
      <td className="py-2 text-right tabular text-n-700">{formatEuro(ht)}</td>
      <td className="py-2 text-right tabular text-n-700">{formatEuro(tva)}</td>
      <td className="py-2"><Pill tone="success">{s}</Pill></td>
    </tr>
  );
}
