import { notFound } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/fixtures/users";
import { reports } from "@/lib/fixtures/reports";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { ShieldAlert } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

const priorityTone: Record<string, React.ComponentProps<typeof Pill>["tone"]> = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "neutral",
};

export default async function UserReportsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();

  const items = reports.filter(
    (r) =>
      r.reporterId === user.id ||
      (r.targetType === "user" && r.targetId === user.id),
  );

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShieldAlert className="h-5 w-5" />}
        title="Aucun signalement"
        description="Ni signalements émis, ni signalements reçus pour ce compte."
      />
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((r) => (
        <li
          key={r.id}
          className="flex items-start gap-3 rounded-lg border border-n-100 bg-surface p-4"
        >
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warning-soft text-warning">
            <ShieldAlert className="h-4 w-4" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-body-sm font-medium text-ink">
                {r.reporterId === user.id ? "Émis par" : "Cible : "} {r.targetTitle}
              </p>
              <Pill tone={priorityTone[r.priority]}>{r.priority}</Pill>
              <Pill>{r.status}</Pill>
            </div>
            <p className="mt-1 text-body-sm text-n-600">{r.detail}</p>
            <p className="mt-1 text-caption text-n-400">
              {r.reason.replace(/_/g, " ")} · {formatDate(r.createdAt)}
            </p>
          </div>
          <Link
            href={`/moderation/${r.id}`}
            className="text-body-sm font-medium text-primary hover:text-primary-hover"
          >
            Ouvrir →
          </Link>
        </li>
      ))}
    </ul>
  );
}
