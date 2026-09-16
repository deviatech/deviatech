import type { ReactNode } from "react";
import LumaSiteShell from "@/features/therapist-demo/components/LumaSiteShell";

export default function TherapistDemoUrLayout({ children }: { children: ReactNode }) {
  return <LumaSiteShell locale="ur">{children}</LumaSiteShell>;
}
