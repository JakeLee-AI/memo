import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MemoEdit } from "@/components/memo-edit";
import { PageTransition } from "@/components/page-transition";
import { ALL_MEMOS, getMemo } from "@/lib/memos";

export function generateStaticParams() {
  return ALL_MEMOS.map(({ id }) => ({ id }));
}

async function EditContent({
  params,
}: {
  params: PageProps<"/memos/[id]/edit">["params"];
}) {
  const { id } = await params;
  const base = getMemo(id);
  if (!base && !id.startsWith("u-")) notFound();
  return <MemoEdit id={id} base={base} />;
}

export default function EditMemoPage({ params }: PageProps<"/memos/[id]/edit">) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-dvh" />}>
        <EditContent params={params} />
      </Suspense>
    </PageTransition>
  );
}
