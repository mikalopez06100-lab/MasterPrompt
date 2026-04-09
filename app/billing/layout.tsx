import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
