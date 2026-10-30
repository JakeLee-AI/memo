type ChipProps = {
  label: string;
  selected?: boolean;
  // 카드 위에 놓을 때는 page 톤을 쓴다 (카드와 같은 흰색이 되지 않도록).
  tone?: "card" | "page";
  onClick?: () => void;
};

export function Chip({
  label,
  selected = false,
  tone = "card",
  onClick,
}: ChipProps) {
  const idle = tone === "page" ? "bg-surface-page" : "bg-surface-card";
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`chip press [--press-scale:0.92] flex h-9 shrink-0 items-center rounded-full px-space-16 text-label-md whitespace-nowrap ${
        selected ? "bg-primary text-text-on-primary" : `${idle} text-text-secondary`
      }`}
    >
      {label}
    </button>
  );
}
