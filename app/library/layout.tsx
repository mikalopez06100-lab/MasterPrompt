import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
