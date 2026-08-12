"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CaseStudyViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("case_study_view", { case_study: slug });
  }, [slug]);

  return null;
}
