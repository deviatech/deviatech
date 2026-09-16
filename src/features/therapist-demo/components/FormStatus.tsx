import styles from "../styles/luma-form.module.css";

export default function FormStatus({
  status,
  successTitle,
  successBody,
  errorTitle,
  errorBody,
}: {
  status: "success" | "error";
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
}) {
  return (
    <div
      className={`${styles.statusRegion} ${status === "success" ? styles.statusSuccess : styles.statusError}`}
      role="status"
      aria-live="polite"
    >
      <p style={{ fontWeight: 600, margin: "0 0 4px" }}>{status === "success" ? successTitle : errorTitle}</p>
      <p style={{ margin: 0 }}>{status === "success" ? successBody : errorBody}</p>
    </div>
  );
}
