import Link from "next/link";
import { ViewTransition } from "react";
import { Icon } from "./icon";
import { LABEL_STYLE } from "./label-style";
import type { Memo } from "@/lib/memos";

type MemoItemProps = Pick<Memo, "id" | "title" | "preview" | "date" | "label"> & {
  // 목록에 떠오르는 순서 (rise 지연)
  index?: number;
};

export function MemoItem({ id, title, preview, date, label, index = 0 }: MemoItemProps) {
  return (
    // 같은 name의 상세 카드로 줄이 이어진다.
    <ViewTransition name={`memo-${id}`} share="morph" default="none">
      <Link
        href={`/memos/${id}`}
        transitionTypes={["nav-forward"]}
        className="rise press [--press-scale:0.97] flex h-18 w-full items-center gap-space-16 rounded-md px-space-20 py-space-12 text-left hover:bg-surface-page active:bg-surface-page"
        style={{ "--i": index } as React.CSSProperties}
      >
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-sm ${LABEL_STYLE[label]}`}
        >
          <Icon name="note" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-space-4">
          <span className="text-title-md text-text-primary">{title}</span>
          <span className="truncate text-body-sm text-text-secondary">{preview}</span>
        </span>
        <span className="shrink-0 text-caption-sm text-text-muted">{date}</span>
      </Link>
    </ViewTransition>
  );
}
