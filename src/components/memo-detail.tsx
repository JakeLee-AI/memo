"use client";

import { ViewTransition } from "react";
import { Badge } from "./badge";
import { ButtonPrimary } from "./button-primary";
import { IconButton } from "./icon-button";
import { useSavedMemos } from "@/lib/memo-store";
import type { Memo, MemoBlock } from "@/lib/memos";

// 위에서부터 차례로 떠오르게 하는 순서
const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Block({ block }: { block: MemoBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3
          className={
            block.level === 1
              ? "text-title-lg text-text-primary"
              : "text-title-md text-text-primary"
          }
        >
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p className="whitespace-pre-line text-body-md text-text-secondary">
          {block.parts.map((part, i) =>
            part.bold ? (
              <strong key={i} className="font-bold">
                {part.text}
              </strong>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-space-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-space-8 text-body-md text-text-secondary"
            >
              <span aria-hidden>•</span>
              <span className="min-w-0 flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

// 메모와 무관한 부분(내비게이션). 메모 내용과 수정하기 버튼은 children 자리에 들어온다.
export function MemoDetailFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 py-space-48">
      <nav className="rise flex items-center justify-between">
        <IconButton icon="chevron-left" label="뒤로가기" href="/" />
        <div className="flex">
          <IconButton icon="pin-lg" label="고정" />
          <IconButton icon="share" label="공유" />
          <IconButton icon="more" label="더보기" />
        </div>
      </nav>

      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}

// 저장본(새로 쓰거나 고친 메모)이 있으면 그것을, 없으면 서버가 준 base를 보여 준다.
// 새로 쓴 메모(u-…)는 서버에 없어서 base가 없다.
export function MemoDetailContent({ id, base }: { id: string; base?: Memo }) {
  const saved = useSavedMemos().find((item) => item.id === id);
  const memo = saved ?? base;
  if (!memo) return <MemoArticleSkeleton />;
  return (
    <>
      <MemoArticle memo={memo} />
      <div className="rise sticky bottom-space-48 mt-auto pt-space-16" style={order(8)}>
        <ButtonPrimary label="수정하기" href={`/memos/${id}/edit`} />
      </div>
    </>
  );
}

export function MemoArticleSkeleton() {
  return <div className="h-48 animate-pulse rounded-xl bg-surface-card" />;
}

export function MemoArticle({ memo }: { memo: Memo }) {
  return (
    // 홈의 같은 메모 줄에서 이 카드로 이어진다. 이어질 상대가 없으면 아래에서 떠오른다.
    <ViewTransition
      name={`memo-${memo.id}`}
      share="morph"
      enter="slide-up"
      default="none"
    >
      <article className="flex flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24">
        <div className="rise flex items-center gap-space-8" style={order(1)}>
          <Badge label={memo.category} color={memo.label} />
          <span className="text-caption-sm text-text-muted">{memo.fullDate}</span>
        </div>
        <h1 className="rise text-heading-lg text-text-primary" style={order(2)}>
          {memo.title}
        </h1>
        <hr className="h-px border-0 bg-border-default" />
        <div className="flex flex-col gap-space-12">
          {memo.body.map((block, i) => (
            <div key={i} className="rise" style={order(i + 3)}>
              <Block block={block} />
            </div>
          ))}
        </div>
      </article>
    </ViewTransition>
  );
}
