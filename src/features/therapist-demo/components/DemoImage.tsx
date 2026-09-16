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
