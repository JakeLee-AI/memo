"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonPrimary } from "./button-primary";
import { Chip } from "./chip";
import { IconButton } from "./icon-button";
import { createMemo, memoToText, updateMemo } from "@/lib/memo-store";
import { CATEGORIES, type Memo } from "@/lib/memos";

// initial이 있으면 그 메모를 고치는 수정 화면, 없으면 새 메모 작성 화면.
export function MemoCompose({ initial }: { initial?: Memo }) {
  const router = useRouter();
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial ? memoToText(initial) : "");

  const canSave = title.trim() !== "" && content.trim() !== "";
  const backHref = initial ? `/memos/${initial.id}` : "/";

  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  async function save() {
    if (!canSave || saving) return;
    const input = { category, title, content };
    setSaving(true);
    setFailed(false);
    try {
      // 저장하면 온 곳으로 돌아가므로 화면이 뒤로 밀려 들어온다.
      if (initial) {
        await updateMemo(initial, input);
        router.push(backHref, { transitionTypes: ["nav-back"] });
      } else {
        await createMemo(input);
        router.push("/", { transitionTypes: ["nav-back"] });
      }
    } catch {
      setFailed(true);
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-space-16 px-space-16 py-space-48">
      <nav className="rise flex items-center justify-between">
        <IconButton icon="chevron-left" label="뒤로가기" href={backHref} />
        <p className="text-title-md text-text-primary">
          {initial ? "메모 수정" : "새 메모"}
        </p>
        <span className="size-10" aria-hidden />
      </nav>

      <main className="flex flex-1 flex-col">
        <div
          className="rise flex flex-1 flex-col gap-space-12 rounded-xl bg-surface-card px-space-20 py-space-24"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div className="flex gap-space-8 overflow-x-auto">
            {CATEGORIES.map((name) => (
              <Chip
                key={name}
                label={name}
                tone="page"
                selected={category === name}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="제목"
            aria-label="제목"
            className="peer w-full bg-transparent text-heading-lg text-text-primary outline-none transition-colors duration-300 ease-oneui placeholder:text-text-muted"
          />
          {/* 제목에 커서가 있으면 구분선이 파랗게 번진다 */}
          <hr className="h-px border-0 bg-border-default transition-colors duration-300 ease-oneui peer-focus:bg-primary" />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="내용을 적어 보세요"
            aria-label="내용"
            className="min-h-64 w-full flex-1 resize-none bg-transparent text-body-md text-text-primary outline-none placeholder:text-text-muted"
          />
        </div>
      </main>

      <div
        className="rise sticky bottom-space-48"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {failed && (
          <p role="alert" className="pb-space-8 text-center text-body-sm text-text-secondary">
            저장하지 못했어요. 잠시 뒤 다시 시도해 주세요.
          </p>
        )}
        <ButtonPrimary
          label="저장하기"
          disabled={!canSave || saving}
          onClick={save}
        />
      </div>
    </div>
  );
}
