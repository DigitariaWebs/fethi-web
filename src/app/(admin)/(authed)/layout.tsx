import { AdminSidebar } from "@/components/admin/shell/Sidebar";
import { AdminTopBar } from "@/components/admin/shell/TopBar";
import { CommandPaletteProvider } from "@/components/admin/shell/CommandPalette";

// TODO: gate behind real auth before any production deploy. Routes under
// (authed)/* are currently open. Wire a middleware.ts that checks a session
// cookie and redirects to /login when absent.
export default function AdminAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopBar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </CommandPaletteProvider>
  );
}
