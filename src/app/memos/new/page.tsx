import { MemoCompose } from "@/components/memo-compose";
import { PageTransition } from "@/components/page-transition";

export default function NewMemoPage() {
  return (
    <PageTransition>
      <MemoCompose />
    </PageTransition>
  );
}
