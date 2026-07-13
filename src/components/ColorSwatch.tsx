export default function ColorSwatch({
  hex,
  name,
  size = "sm",
}: {
  hex: string;
  name: string;
  size?: "sm" | "md";
}) {
  const dimension = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <span
      className={`inline-block rounded-full border border-graphite/15 ${dimension}`}
      style={{ backgroundColor: hex }}
      title={name}
      aria-label={name}
    />
  );
}
