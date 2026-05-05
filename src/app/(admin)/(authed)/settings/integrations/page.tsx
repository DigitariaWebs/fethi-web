import { Plug } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export const metadata = { title: "Intégrations" };

const integrations = [
  { name: "Stripe", desc: "Paiements & versements (Stripe Connect)", connected: true, label: "Connecté" },
  { name: "Sumsub", desc: "Vérification d'identité (KYC)", connected: true, label: "Connecté" },
  { name: "SendGrid", desc: "E-mails transactionnels", connected: true, label: "Connecté" },
  { name: "Plausible", desc: "Analytique web sans cookies", connected: true, label: "Connecté" },
  { name: "Cloudinary", desc: "Stockage & transformation images", connected: true, label: "Connecté" },
  { name: "Customer.io", desc: "Marketing automation", connected: false, label: "Non connecté" },
];

export default function SettingsIntegrationsPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/settings/system", label: "Réglages" },
          { label: "Intégrations" },
        ]}
        title="Intégrations"
        description="Services tiers connectés à MyStreet."
      />

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-lg border border-n-100 bg-surface p-5 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-paper text-n-700">
                <Plug className="h-4 w-4" />
              </span>
              {i.connected ? (
                <Pill tone="success" dot>{i.label}</Pill>
              ) : (
                <Pill tone="neutral">{i.label}</Pill>
              )}
            </div>
            <p className="mt-4 text-h3 font-medium text-ink">{i.name}</p>
            <p className="mt-0.5 text-body-sm text-n-500">{i.desc}</p>
            <div className="mt-5">
              {i.connected ? (
                <Button variant="outline" size="sm">Gérer</Button>
              ) : (
                <Button variant="primary" size="sm">Connecter</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
