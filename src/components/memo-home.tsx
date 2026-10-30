"use client";

import { useState } from "react";
import { ButtonPrimary } from "./button-primary";
import { CardHeader } from "./card-header";
import { Chip } from "./chip";
import { MemoItem } from "./memo-item";
import { useSavedMemos } from "@/lib/memo-store";
import { CATEGORIES, PINNED_MEMOS, RECENT_MEMOS, type Memo } from "@/lib/memos";

const ALL = "전체";
const MEMO_COUNT = 128;

// 위에서부터 차례로 떠오르게 하는 순서
const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function MemoHome() {
  const [category, setCategory] = useState(ALL);
  const saved = useSavedMemos();
  const visible = (memos: Memo[]) =>
    memos.filter((memo) => category === ALL || memo.category === category);

  // 고친 샘플 메모는 제자리에서 저장본으로 바뀌고, 새로 쓴 메모는 최근 메모 맨 위에 붙는다.
  const savedById = new Map(saved.map((memo) => [memo.id, memo]));
  const sampleIds = new Set([...PINNED_MEMOS, ...RECENT_MEMOS].map((m) => m.id));
  const applySaved = (memos: Memo[]) => memos.map((m) => savedById.get(m.id) ?? m);
  const pinned = visible(applySaved(PINNED_MEMOS));
  const recent = visible([
    ...saved.filter((memo) => !sampleIds.has(memo.id)),
    ...applySaved(RECENT_MEMOS),
  ]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 pb-space-34 pt-space-64">
      <main className="flex flex-1 flex-col gap-space-16">
        <header className="flex flex-col gap-space-8 px-space-8">
          <p className="rise text-caption-md text-text-muted" style={order(0)}>
            10월 30일 금요일
          </p>
          <h1 className="rise text-heading-xl text-text-primary" style={order(1)}>
            오늘까지 메모를
            <br />
            <span className="text-primary">
              <span className="sr-only">{MEMO_COUNT}</span>
              <span
                aria-hidden
                className="count-up"
                style={{ "--to": MEMO_COUNT } as React.CSSProperties}
              />
              개
            </span>{" "}
            남겼어요
          </h1>
        </header>

        <div
          className="rise flex gap-space-8 overflow-x-auto px-space-4"
          style={order(2)}
        >
          {[ALL, ...CATEGORIES].map((name) => (
            <Chip
              key={name}
              label={name}
              selected={category === name}
              onClick={() => setCategory(name)}
            />
          ))}
        </div>

        {/* key가 분류라서 칩을 누를 때마다 카드가 새로 떠오른다. */}
        {pinned.length > 0 && (
          <section
            key={`pinned-${category}`}
            className="rise overflow-hidden rounded-xl bg-surface-card py-space-8"
            style={order(3)}
          >
            <CardHeader title="고정한 메모" pin />
            {pinned.map((memo, i) => (
              <MemoItem key={memo.id} index={i + 4} {...memo} />
            ))}
          </section>
        )}

        {recent.length > 0 && (
          <section
            key={`recent-${category}`}
            className="rise overflow-hidden rounded-xl bg-surface-card py-space-8"
            style={order(pinned.length > 0 ? 5 : 3)}
          >
            <CardHeader title="최근 메모" action />
            {recent.map((memo, i) => (
              <MemoItem
                key={memo.id}
                index={i + (pinned.length > 0 ? 6 : 4)}
                {...memo}
              />
            ))}
          </section>
        )}
      </main>

      <div className="rise sticky bottom-space-34" style={order(9)}>
        <ButtonPrimary href="/memos/new" />
      </div>
    </div>
  );
}
