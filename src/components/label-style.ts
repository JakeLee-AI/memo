import type { MemoLabel } from "@/lib/memos";

// 메모의 색 라벨 → 배경(soft) + 글자색 토큰. 아이콘은 이 글자색을 따른다.
export const LABEL_STYLE: Record<MemoLabel, string> = {
  blue: "bg-label-blue-soft text-label-blue",
  green: "bg-label-green-soft text-label-green",
  orange: "bg-label-orange-soft text-label-orange",
  pink: "bg-label-pink-soft text-label-pink",
};
