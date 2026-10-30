import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  MemoArticleSkeleton,
  MemoDetailContent,
  MemoDetailFrame,
} from "@/components/memo-detail";
import { PageTransition } from "@/components/page-transition";
import { ALL_MEMOS, getMemo } from "@/lib/memos";

export function generateStaticParams() {
  return ALL_MEMOS.map(({ id }) => ({ id }));
}

async function MemoContent({ params }: { params: PageProps<"/memos/[id]">["params"] }) {
  const { id } = await params;
  const base = getMemo(id);
  if (!base && !id.startsWith("u-")) notFound();
  return <MemoDetailContent id={id} base={base} />;
}

export default function MemoPage({ params }: PageProps<"/memos/[id]">) {
  return (
    <PageTransition>
      <MemoDetailFrame>
        <Suspense fallback={<MemoArticleSkeleton />}>
          <MemoContent params={params} />
        </Suspense>
      </MemoDetailFrame>
    </PageTransition>
  );
}
