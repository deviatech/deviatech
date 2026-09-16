import type { ImageDescriptor, DemoLocale } from "../types";
import styles from "../styles/luma.module.css";

/**
 * TODO(licensed-images): every ImageDescriptor with placeholder:true needs a
 * real licensed photo before this demo is production-complete. See
 * src/features/therapist-demo/content/images.ts for the full list.
 */
export default function PlaceholderImage({
  image,
  locale,
  className,
}: {
  image: ImageDescriptor;
  locale: DemoLocale;
  className?: string;
}) {
  const alt = image.decorative ? "" : image.alt[locale];

  return (
    <div
      className={`${styles.placeholderImage} ${className ?? ""}`}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      role={image.decorative ? "presentation" : "img"}
      aria-label={image.decorative ? undefined : alt}
    >
      {!image.decorative && <span>{alt}</span>}
    </div>
  );
}
