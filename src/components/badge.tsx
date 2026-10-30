import { LABEL_STYLE } from "./label-style";
import type { MemoLabel } from "@/lib/memos";

export function Badge({ label, color }: { label: string; color: MemoLabel }) {
  return (
    <span
      className={`flex h-6.5 items-center rounded-full px-space-8 text-caption-sm whitespace-nowrap ${LABEL_STYLE[color]}`}
    >
      {label}
    </span>
  );
}
