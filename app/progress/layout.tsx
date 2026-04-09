import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function ProgressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
