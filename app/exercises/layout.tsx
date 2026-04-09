import { ProtectedAppLayout } from "@/components/layout/ProtectedAppLayout";

export default function ExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
