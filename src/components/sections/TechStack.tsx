import SheetFrame from "@/components/ui/SheetFrame";
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
  return (
    <SheetFrame number="05" label="STACK" id="stack">
      <div className="flex flex-wrap gap-x-10 gap-y-8">
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
