import styles from "../styles/luma-form.module.css";

export default function ChoiceGroup({
  name,
  options,
  defaultValue,
  legend,
}: {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  legend: string;
}) {
  return (
    <fieldset className={styles.choiceGroup} style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
        {legend}
      </legend>
      {options.map((option, index) => {
        const id = `${name}-${option.value}`;
        return (
          <span key={option.value} className={styles.choiceOption}>
            <input
              type="radio"
              id={id}
              name={name}
              value={option.value}
              defaultChecked={defaultValue ? defaultValue === option.value : index === 0}
              className={styles.choiceInput}
            />
            <label htmlFor={id} className={styles.choiceLabel}>
              {option.label}
            </label>
          </span>
        );
      })}
    </fieldset>
  );
}
