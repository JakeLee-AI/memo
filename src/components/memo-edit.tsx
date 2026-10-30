"use client";

import { MemoCompose } from "./memo-compose";
import { useHydrated, useSavedMemos } from "@/lib/memo-store";
import type { Memo } from "@/lib/memos";

// 저장본(수정한 적 있는 메모)을 읽은 뒤에 입력칸을 채우려고 첫 렌더를 기다린다.
export function MemoEdit({ id, base }: { id: string; base?: Memo }) {
  const hydrated = useHydrated();
  const saved = useSavedMemos().find((memo) => memo.id === id);
  const memo = saved ?? base;

  if (!hydrated) return <div className="min-h-dvh" />;
  if (!memo) {
    return (
      <p className="p-space-24 text-body-md text-text-secondary">
        메모를 찾을 수 없어요.
      </p>
    );
  }
  return <MemoCompose initial={memo} />;
}
