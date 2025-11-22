import { requireAuth } from "@/lib/auth-utils";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-accent/20">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
