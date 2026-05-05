import { notFound } from "next/navigation";
import { getUser } from "@/lib/fixtures/users";
import { PageHeader } from "@/components/admin/shell/PageHeader";
import { UserHeader } from "@/components/admin/UserHeader";

export default async function UserDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
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
          { href: "/users", label: "Utilisateurs" },
          { label: user.name },
        ]}
        title={<span className="sr-only">{user.name}</span>}
      />
      <UserHeader user={user} />
      {children}
    </div>
  );
}
