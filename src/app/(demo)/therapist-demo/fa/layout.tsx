import type { ReactNode } from "react";
import LumaSiteShell from "@/features/therapist-demo/components/LumaSiteShell";

export default function TherapistDemoFaLayout({ children }: { children: ReactNode }) {
  return <LumaSiteShell locale="fa">{children}</LumaSiteShell>;
}
