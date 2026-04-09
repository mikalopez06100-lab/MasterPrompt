import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
