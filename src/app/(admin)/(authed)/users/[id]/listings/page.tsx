import { notFound } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/fixtures/users";
import { listings } from "@/lib/fixtures/listings";
import { Pill } from "@/components/ui/Pill";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "lucide-react";
import { formatEuro, formatDate } from "@/lib/utils/format";

const statusTone: Record<string, React.ComponentProps<typeof Pill>["tone"]> = {
  active: "success",
  pending: "warning",
  sold: "neutral",
  rejected: "danger",
  flagged: "warning",
  draft: "neutral",
};

export default async function UserListingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();
  const items = listings.filter((l) => l.sellerId === user.id);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Tag className="h-5 w-5" />}
        title="Aucune annonce publiée"
        description="Cet utilisateur n'a encore rien mis en vente."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
            <th className="px-4 py-2.5 text-left">Annonce</th>
            <th className="px-4 py-2.5 text-left">Catégorie</th>
            <th className="px-4 py-2.5 text-left">Prix</th>
            <th className="px-4 py-2.5 text-left">Statut</th>
            <th className="px-4 py-2.5 text-left">Vues</th>
            <th className="px-4 py-2.5 text-left">Publiée</th>
          </tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={l.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
              <td className="px-4 py-3">
                <Link href={`/listings/${l.id}`} className="font-medium text-ink hover:text-primary">
                  {l.title}
                </Link>
              </td>
              <td className="px-4 py-3 capitalize text-n-700">{l.category}</td>
              <td className="px-4 py-3 tabular text-ink">{formatEuro(l.price)}</td>
              <td className="px-4 py-3">
                <Pill tone={statusTone[l.status] ?? "neutral"} dot>{l.status}</Pill>
              </td>
              <td className="px-4 py-3 tabular text-n-700">{l.views}</td>
              <td className="px-4 py-3 text-caption text-n-500">{formatDate(l.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
