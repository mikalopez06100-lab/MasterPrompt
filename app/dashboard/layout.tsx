import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader user={{ email: user.email, name: user.name }} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
