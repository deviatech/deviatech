"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SheetFrame from "@/components/ui/SheetFrame";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { stack } from "@/content/stack";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiShopify,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "Node.js": SiNodedotjs,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  AWS: FaAws,
  Shopify: SiShopify,
};

export default function TechStack() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 16,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: gridRef, dependencies: [] }
  );

  return (
    <SheetFrame number="05" label="STACK" id="stack">
      <div ref={gridRef} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
        {stack.map((tech) => {
          const Icon = iconMap[tech];
          return (
            <div key={tech} className="flex flex-col items-center gap-2 text-ink-soft">
              {Icon && <Icon className="h-8 w-8" />}
              <span className="font-mono text-xs">{tech}</span>
            </div>
          );
        })}
      </div>
    </SheetFrame>
  );
}
