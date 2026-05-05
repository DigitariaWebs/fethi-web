import Link from "next/link";
import { FileText, MessageSquare, User as UserIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { reports, ReportStatus } from "@/lib/fixtures/reports";
import { formatDateTime } from "@/lib/utils/format";

const decisionTone: Record<"resolved" | "dismissed", React.ComponentProps<typeof Pill>["tone"]> = {
  resolved: "success",
  dismissed: "neutral",
};
const decisionLabel: Record<"resolved" | "dismissed", string> = {
  resolved: "Résolu",
  dismissed: "Rejeté",
};

const targetIcon = {
  listing: <FileText className="h-3.5 w-3.5" />,
  user: <UserIcon className="h-3.5 w-3.5" />,
  message: <MessageSquare className="h-3.5 w-3.5" />,
} as const;

function targetHref(r: (typeof reports)[number]): string {
  if (r.targetType === "listing") return `/listings/${r.targetId}`;
  if (r.targetType === "user") return `/users/${r.targetId}`;
  return `/moderation/${r.id}`;
}

function truncate(s: string, n = 80) {
  return s.length > n ? s.slice(0, n).trimEnd() + "…" : s;
}

export default function ModerationAuditPage() {
  const closed = reports
    .filter(
      (r): r is typeof r & { status: "resolved" | "dismissed" } =>
        r.status === "resolved" || r.status === "dismissed",
    )
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="container-admin py-8 space-y-6">
      <PageHeader
        crumbs={[
          { href: "/dashboard", label: "Tableau de bord" },
          { href: "/moderation", label: "Modération" },
          { label: "Audit" },
        ]}
        title="Audit des décisions"
        description="Toutes les décisions de modération avec auteur et horodatage."
      />

      <Card className="overflow-hidden">
        <div className="overflow-auto">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-n-100 bg-paper">
                <Th>Horodatage</Th>
                <Th>Décision</Th>
                <Th>Cible</Th>
                <Th>Motif</Th>
                <Th>Admin</Th>
                <Th>Justification</Th>
                <Th> </Th>
              </tr>
            </thead>
            <tbody>
              {closed.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-n-500">
                    Aucune décision archivée.
                  </td>
                </tr>
              ) : (
                closed.map((r) => {
                  const status = r.status as ReportStatus & ("resolved" | "dismissed");
                  return (
                    <tr key={r.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
                      <td className="px-4 py-3 text-caption text-n-500 tabular">
                        {formatDateTime(r.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Pill tone={decisionTone[status as "resolved" | "dismissed"]} dot>
                          {decisionLabel[status as "resolved" | "dismissed"]}
                        </Pill>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={targetHref(r)}
                          className="inline-flex items-center gap-2 text-body-sm text-n-700 hover:text-primary"
                        >
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-n-100 text-n-700">
                            {targetIcon[r.targetType]}
                          </span>
                          <span className="max-w-[28ch] truncate">{r.targetTitle}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-body-sm text-n-700 capitalize">
                        {r.reason.replace(/_/g, " ")}
                      </td>
                      <td className="px-4 py-3 text-body-sm text-n-700">
                        {r.assignedTo ?? "admin"}
                      </td>
                      <td className="px-4 py-3 text-body-sm text-n-500 max-w-[36ch]">
                        {truncate(r.detail)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/moderation/${r.id}`}
                          className="text-body-sm font-medium text-primary hover:underline"
                        >
                          Détail →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-label uppercase tracking-wide font-medium text-n-500">
      {children}
    </th>
  );
}
