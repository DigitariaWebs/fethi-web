import { notFound } from "next/navigation";
import { CheckCircle2, FileBadge, Image as ImageIcon, Shield } from "lucide-react";
import { getUser } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { formatDate, initials } from "@/lib/utils/format";

export default async function KycDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/kyc", label: "KYC" },
          { label: user.name },
        ]}
        title={user.name}
        description="Vérification d'identité — comparez les pièces fournies aux infos déclarées."
        actions={
          <>
            <Button variant="outline" size="sm">Demander une preuve complémentaire</Button>
            <Button variant="outline" size="sm">Refuser</Button>
            <Button size="sm">Approuver</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Pièces fournies</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <DocumentTile label="Carte nationale d'identité" subtitle="Recto + verso" />
                <DocumentTile label="Justificatif de domicile" subtitle="Facture EDF — Avril 2026" />
                <DocumentTile label="Selfie" subtitle="Liveness vérifié" verified />
                <DocumentTile label="IBAN — Crédit du Nord" subtitle="FR76 ... 4521" verified />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Infos déclarées</h3>
              <ul className="mt-3 space-y-2 text-body-sm">
                <Row label="Nom complet" value={user.name} />
                <Row label="Date de naissance" value="14 mars 1992" />
                <Row label="Adresse" value={`${neighborhoodName(user.neighborhood)} — Lille`} />
                <Row label="Téléphone" value={user.phone} />
                <Row label="E-mail" value={user.email} />
                <Row label="Inscrit le" value={formatDate(user.joinedAt)} />
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Note de décision</h3>
              <Field className="mt-3" label="Justification (visible uniquement par les admins)">
                <Textarea placeholder="Pourquoi vous validez ou refusez cette demande" />
              </Field>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar initials={initials(user.name)} seed={user.id} size="lg" />
                <div>
                  <p className="text-body font-medium text-ink">{user.name}</p>
                  <p className="text-caption text-n-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-1.5 border-t border-n-100 pt-4 text-body-sm">
                <Row label="Statut KYC" value={<Pill tone="warning">À examiner</Pill>} />
                <Row label="Score risque" value="Faible" />
                <Row label="Vérification e-mail" value={<CheckOk />} />
                <Row label="Vérification téléphone" value={<CheckOk />} />
                <Row label="Vérification adresse" value={<Pill tone="warning">En cours</Pill>} />
                <Row label="Liveness selfie" value={<CheckOk />} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="text-h3 font-medium text-ink">Vérifications externes</h3>
              <ul className="mt-3 space-y-2 text-body-sm">
                <li className="flex items-center justify-between">
                  <span className="text-n-500">Sumsub — ID</span>
                  <Pill tone="success" dot>200</Pill>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-n-500">Sumsub — Liveness</span>
                  <Pill tone="success" dot>OK</Pill>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-n-500">Sanctions list</span>
                  <Pill tone="success" dot>Aucun match</Pill>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-n-500">PEP</span>
                  <Pill tone="success" dot>Aucun match</Pill>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckOk() {
  return (
    <span className="inline-flex items-center gap-1 text-success">
      <CheckCircle2 className="h-3.5 w-3.5" /> Validé
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-n-500">{label}</span>
      <span className="text-right">{value}</span>
    </li>
  );
}

function DocumentTile({ label, subtitle, verified }: { label: string; subtitle: string; verified?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md border border-n-100 bg-paper">
      <div
        className="aspect-[4/3] flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(31,36,33,0.06) 0%, rgba(31,36,33,0.02) 100%)",
        }}
      >
        <span className="inline-flex items-center gap-2 text-n-500">
          <ImageIcon className="h-5 w-5" />
          Aperçu protégé
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="min-w-0">
          <p className="text-body-sm font-medium text-ink truncate">{label}</p>
          <p className="text-caption text-n-500 truncate">{subtitle}</p>
        </div>
        {verified ? (
          <Pill tone="success" dot>OK</Pill>
        ) : (
          <Shield className="h-4 w-4 text-n-400" />
        )}
      </div>
    </div>
  );
}
