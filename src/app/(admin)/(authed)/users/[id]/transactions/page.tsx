import { notFound } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/lib/fixtures/users";
import { orders } from "@/lib/fixtures/orders";
import { listings } from "@/lib/fixtures/listings";
import { Pill } from "@/components/ui/Pill";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShoppingBag } from "lucide-react";
import { formatEuro, formatDate } from "@/lib/utils/format";

const tone: Record<string, React.ComponentProps<typeof Pill>["tone"]> = {
  completed: "success",
  shipped: "info",
  in_transit: "info",
  pending_payment: "warning",
  disputed: "danger",
  refunded: "danger",
  cancelled: "neutral",
};

export default async function UserTransactionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = getUser(id);
  if (!user) notFound();
  const items = orders.filter((o) => o.buyerId === user.id || o.sellerId === user.id);
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-5 w-5" />}
        title="Aucune transaction"
        description="Cet utilisateur n'a pas encore acheté ni vendu sur la plateforme."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-n-100 bg-surface">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-n-100 bg-paper text-label uppercase tracking-wide text-n-500">
            <th className="px-4 py-2.5 text-left">Référence</th>
            <th className="px-4 py-2.5 text-left">Rôle</th>
            <th className="px-4 py-2.5 text-left">Annonce</th>
            <th className="px-4 py-2.5 text-left">Montant</th>
            <th className="px-4 py-2.5 text-left">Frais</th>
            <th className="px-4 py-2.5 text-left">Statut</th>
            <th className="px-4 py-2.5 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((o) => {
            const role = o.buyerId === user.id ? "Acheteur" : "Vendeur";
            const listing = listings.find((l) => l.id === o.listingId);
            return (
              <tr key={o.id} className="border-b border-n-100 last:border-0 hover:bg-n-50">
                <td className="px-4 py-3 tabular">
                  <Link href={`/orders/${o.id}`} className="font-medium text-ink hover:text-primary">
                    {o.ref}
                  </Link>
                </td>
                <td className="px-4 py-3 text-n-700">{role}</td>
                <td className="px-4 py-3 text-n-700 truncate max-w-[260px]">
                  {listing?.title ?? o.listingId}
                </td>
                <td className="px-4 py-3 tabular text-ink">{formatEuro(o.amount)}</td>
                <td className="px-4 py-3 tabular text-n-500">{formatEuro(o.fee)}</td>
                <td className="px-4 py-3">
                  <Pill tone={tone[o.status]} dot>{o.status}</Pill>
                </td>
                <td className="px-4 py-3 text-caption text-n-500">{formatDate(o.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
