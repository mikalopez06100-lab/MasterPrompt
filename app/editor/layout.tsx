import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
