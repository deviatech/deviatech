import type { InfoCardItem } from "../types";
import styles from "../styles/luma-content.module.css";

export default function InfoCard({ item }: { item: InfoCardItem }) {
  return (
    <div className={styles.infoTile}>
      <p className={styles.infoTileTitle}>{item.title}</p>
      <p className={styles.infoTileDescription}>{item.description}</p>
    </div>
  );
}
