import type { ReactNode } from "react";
import styles from "../styles/luma-form.module.css";

export default function FormField({
  id,
  label,
  optionalLabel,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {!required && optionalLabel && <span className={styles.optional}> ({optionalLabel})</span>}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
