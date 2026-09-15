import type { ArticleSection } from "../types";
import styles from "../styles/luma-content.module.css";

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className={styles.articleBody}>
      {sections.map((section, index) => {
        if (section.type === "heading") {
          const Tag = section.level === 3 ? "h3" : "h2";
          return <Tag key={index}>{section.text}</Tag>;
        }
        if (section.type === "paragraph") {
          return <p key={index}>{section.text}</p>;
        }
        if (section.type === "list") {
          return (
            <ul key={index}>
              {section.items?.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
            </ul>
          );
        }
        if (section.type === "quote") {
          return <blockquote key={index}>{section.text}</blockquote>;
        }
        return null;
      })}
    </div>
  );
}
