"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkCompleteButton({
  moduleId,
  completed,
}: {
  moduleId: string;
  completed: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId, completed: !completed }),
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="btn-primary disabled:opacity-50"
    >
      {completed ? "Marquer comme non terminé" : "Marquer comme terminé"}
    </button>
  );
}
