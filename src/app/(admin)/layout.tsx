// Admin route group — NO Lenis. Native scroll only so tables, drawers, command
// palettes don't fight with smooth-scroll wheel hijacking.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-paper text-ink">{children}</div>;
}
