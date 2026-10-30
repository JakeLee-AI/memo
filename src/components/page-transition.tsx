import { ViewTransition } from "react";

// Link / router.push 의 transitionTypes 로 앞으로(nav-forward)·뒤로(nav-back)를 알려 주면
// 화면이 그 방향으로 밀려 들어온다. 타입이 없는 이동(브라우저 뒤로가기 등)은 그대로 바뀐다.
const DIRECTION = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={DIRECTION} exit={DIRECTION} default="none">
      {children}
    </ViewTransition>
  );
}
