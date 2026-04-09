import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
