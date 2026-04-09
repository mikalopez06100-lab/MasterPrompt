import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { AccountSettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Mon compte
      </h1>
      <AccountSettingsForm
        initialName={user.name ?? ""}
        email={user.email}
      />
    </div>
  );
}
