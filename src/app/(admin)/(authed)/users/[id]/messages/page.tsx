import { notFound } from "next/navigation";
import { getUser, users } from "@/lib/fixtures/users";
import { Avatar } from "@/components/ui/Avatar";
import { Pill } from "@/components/ui/Pill";
import { initials, timeAgo } from "@/lib/utils/format";

const sampleThreads = [
  {
    other: "u_tom_r",
    lastMessage: "Disponible demain matin pour récupérer le vélo ?",
    lastAt: "2026-05-04T11:42:00Z",
    unread: 0,
    listing: "Vélo de ville Peugeot",
  },
  {
    other: "u_lea_m",
    lastMessage: "Je peux passer vers 18h, ça te va ?",
    lastAt: "2026-05-04T09:14:00Z",
    unread: 1,
    listing: "Machine Nespresso",
  },
  {
    other: "u_olivier_t",
    lastMessage: "Oui c'est encore disponible — je peux descendre.",
    lastAt: "2026-05-03T20:00:00Z",
    unread: 0,
    listing: "Canapé 2 places IKEA",
  },
  {
    other: "u_julien_p",
    lastMessage: "(Conversation signalée — modération en cours)",
    lastAt: "2026-05-02T22:18:00Z",
    unread: 0,
    flagged: true,
  },
];

export default async function UserMessagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();

  return (
    <div className="rounded-lg border border-n-100 bg-surface">
      <header className="flex items-center justify-between border-b border-n-100 px-5 py-3">
        <h3 className="text-h3 font-medium text-ink">Conversations</h3>
        <p className="text-caption text-n-500">{sampleThreads.length} conversations</p>
      </header>
      <ul className="divide-y divide-n-100">
        {sampleThreads.map((t, i) => {
          const other = users.find((u) => u.id === t.other);
          return (
            <li key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-n-50">
              <Avatar initials={initials(other?.name ?? "??")} seed={other?.id ?? `${i}`} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-body-sm font-medium text-ink truncate">
                    {other?.name ?? "Utilisateur"}{" "}
                    {t.listing ? <span className="text-n-500"> — {t.listing}</span> : null}
                  </p>
                  <p className="text-caption text-n-400 shrink-0">{timeAgo(t.lastAt)}</p>
                </div>
                <p className="mt-0.5 text-body-sm text-n-600 truncate">{t.lastMessage}</p>
              </div>
              {t.unread ? <Pill tone="primary">{t.unread}</Pill> : null}
              {t.flagged ? <Pill tone="danger">Signalé</Pill> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
