import Image from "next/image";
import styles from "./templates.module.css";

export default function TemplatePreview({ image, name, mobile, priority = false }: { image: string; name: string; mobile: boolean; priority?: boolean }) {
  return <div className={`${styles.preview} ${mobile ? styles.mobilePreview : styles.desktopPreview}`}>
    <div className={styles.screen}>
      <Image src={image} alt={`${name} website preview`} fill sizes={mobile ? "(max-width: 640px) 70vw, 300px" : "(max-width: 768px) 90vw, 600px"} priority={priority} />
    </div>
  </div>;
}
