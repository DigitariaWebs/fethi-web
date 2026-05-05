import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { users } from "@/lib/fixtures/users";
import { neighborhoodName } from "@/lib/fixtures/neighborhoods";
import { formatDate, initials } from "@/lib/utils/format";

export const metadata = { title: "KYC vérifiés" };

export default function KycVerifiedPage() {
  const items = users.filter((u) => u.kyc === "verified");
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/kyc", label: "KYC" },
          { label: "Vérifiés" },
        ]}
        title="Comptes vérifiés"
        description={`${items.length} comptes ont passé le KYC complet.`}
      />

      <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
              <th className="px-4 py-2.5 text-left">Utilisateur</th>
              <th className="px-4 py-2.5 text-left">Quartier</th>
              <th className="px-4 py-2.5 text-left">Vérifié le</th>
              <th className="px-4 py-2.5 text-left">Note</th>
              <th className="px-4 py-2.5 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
                <td className="px-4 py-3">
                  <Link href={`/users/${u.id}`} className="flex items-center gap-2.5">
                    <Avatar initials={initials(u.name)} seed={u.id} size="sm" />
                    <span>
                      <span className="block text-body-sm font-medium text-ink hover:text-primary">{u.name}</span>
                      <span className="block text-caption text-n-500">{u.email}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-n-700">{neighborhoodName(u.neighborhood)}</td>
                <td className="px-4 py-3 text-caption text-n-500">{formatDate(u.joinedAt)}</td>
                <td className="px-4 py-3 text-body-sm tabular text-n-700">
                  {u.rating.toFixed(1).replace(".", ",")} <span className="text-n-400">({u.reviews})</span>
                </td>
                <td className="px-4 py-3">
                  <Pill tone="success" dot>
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Vérifié
                  </Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
