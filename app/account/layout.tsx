import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
