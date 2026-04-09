import { redirect } from "next/navigation";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";

export async function requireAdminPageUser() {
  const user = await getPrismaUserFromSupabase();
  if (!user) redirect("/login?callbackUrl=/admin");
  if (user.role !== "ADMIN") redirect("/dashboard");
  return user;
}

export async function assertAdminUser() {
  const user = await getPrismaUserFromSupabase();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return user;
}
