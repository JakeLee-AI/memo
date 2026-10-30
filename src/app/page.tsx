import { MemoHome } from "@/components/memo-home";
import { PageTransition } from "@/components/page-transition";

export default function Home() {
  return (
    <PageTransition>
      <MemoHome />
    </PageTransition>
  );
}
