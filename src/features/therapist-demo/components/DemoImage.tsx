import Image from "next/image";
import type { ImageDescriptor, DemoLocale } from "../types";

export default function DemoImage({
  image,
  locale,
  className,
  sizes = "100vw",
  priority = false,
}: {
  image: ImageDescriptor;
  locale: DemoLocale;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const alt = image.decorative ? "" : image.alt[locale];

  if (image.placeholder) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          aspectRatio: `${image.width} / ${image.height}`,
          background: "var(--luma-surface-muted, #f3f1eb)",
          border: "1px dashed var(--luma-border, #e5e5e5)",
        }}
        role={image.decorative ? "presentation" : "img"}
        aria-label={image.decorative ? undefined : alt}
      />
    );
  }

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition: image.focalPoint ?? "center" }}
      />
    </div>
  );
}
