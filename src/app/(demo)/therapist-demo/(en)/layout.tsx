import type { ReactNode } from "react";
import LumaSiteShell from "@/features/therapist-demo/components/LumaSiteShell";

export default function TherapistDemoEnLayout({ children }: { children: ReactNode }) {
  return <LumaSiteShell locale="en">{children}</LumaSiteShell>;
}
