import { notFound } from "next/navigation";
import { getUser } from "@/lib/fixtures/users";
import { activity } from "@/lib/fixtures/activity";
import { formatDateTime } from "@/lib/utils/format";

export default async function UserActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();

  const events = activity.filter((a) => a.actor === user.name || a.target === user.name);

  return (
    <ol className="relative space-y-3 border-l border-n-100 pl-5">
      {events.length === 0 ? (
        <li className="text-body-sm text-n-500">Aucune activité enregistrée.</li>
      ) : (
        events.map((e) => (
          <li key={e.id} className="relative">
            <span className="absolute -left-[26px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-paper" />
            <p className="text-body-sm text-ink">{e.type.replace(/_/g, " ")}</p>
            <p className="text-caption text-n-500">{formatDateTime(e.at)}</p>
            {e.target ? <p className="text-caption text-n-700">{e.target}</p> : null}
          </li>
        ))
      )}
    </ol>
  );
}
