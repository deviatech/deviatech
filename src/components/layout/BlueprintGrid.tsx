export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(var(--line-grid) 1px, transparent 1px), linear-gradient(90deg, var(--line-grid) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        opacity: 0.15,
      }}
    />
  );
}
