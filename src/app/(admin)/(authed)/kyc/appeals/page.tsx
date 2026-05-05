import Link from "next/link";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { users } from "@/lib/fixtures/users";
import { initials, formatDate } from "@/lib/utils/format";

export const metadata = { title: "Recours KYC" };

const appeals = [
  {
    userId: "u_julien_p",
    submittedAt: "2026-04-22T14:00:00Z",
    reason: "Justificatif d'identité refusé",
    detail:
      "L'IBAN fourni ne correspond pas à mon nom car je viens de me marier. Je joins l'attestation INSEE.",
    status: "open",
  },
  {
    userId: "u_hugo_f",
    submittedAt: "2026-04-29T10:14:00Z",
    reason: "Adresse non vérifiable",
    detail:
      "Je viens de déménager. La nouvelle facture arrive en mai, je peux fournir un bail.",
    status: "in_review",
  },
];

export default function KycAppealsPage() {
  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/kyc", label: "KYC" },
          { label: "Recours" },
        ]}
        title="Recours"
        description="Demandes de revue après refus initial. Examiner sous 5 jours ouvrés."
      />
      {appeals.length === 0 ? (
        <EmptyState
          icon={<Scale className="h-5 w-5" />}
          title="Aucun recours"
          description="Aucune demande de revue n'est en attente."
        />
      ) : (
        <ul className="space-y-3">
          {appeals.map((a, i) => {
            const u = users.find((x) => x.id === a.userId);
            if (!u) return null;
            return (
              <li
                key={i}
                className="flex items-start gap-4 rounded-lg border border-n-100 bg-surface p-4"
              >
                <Avatar initials={initials(u.name)} seed={u.id} size="md" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/users/${u.id}`}
                      className="text-body font-medium text-ink hover:text-primary"
                    >
                      {u.name}
                    </Link>
                    <Pill tone={a.status === "open" ? "warning" : "info"} dot>
                      {a.status === "open" ? "À examiner" : "En cours"}
                    </Pill>
                  </div>
                  <p className="text-body-sm text-n-700">{a.reason}</p>
                  <p className="text-body-sm text-n-500">{a.detail}</p>
                  <p className="text-caption text-n-400">
                    Soumis le {formatDate(a.submittedAt)}
                  </p>
                </div>
                <Link
                  href={`/kyc/${u.id}`}
                  className="text-body-sm font-medium text-primary hover:text-primary-hover"
                >
                  Ouvrir →
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
