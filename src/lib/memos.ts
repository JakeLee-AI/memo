export type MemoLabel = "blue" | "green" | "orange" | "pink";

export type TextPart = { text: string; bold?: boolean };

export type MemoBlock =
  | { type: "heading"; level: 1 | 2; text: string }
  | { type: "paragraph"; parts: TextPart[] }
  | { type: "list"; items: string[] };

export type Memo = {
  id: string;
  category: string;
  title: string;
  preview: string;
  date: string;
  fullDate: string;
  label: MemoLabel;
  body: MemoBlock[];
};

export const CATEGORIES = ["업무", "개인", "아이디어"];

// 새 메모의 색 라벨은 분류를 따른다.
export const CATEGORY_LABEL: Record<string, MemoLabel> = {
  업무: "blue",
  개인: "green",
  아이디어: "pink",
};

const plain = (text: string): MemoBlock[] => [
  { type: "paragraph", parts: [{ text }] },
];

export const PINNED_MEMOS: Memo[] = [
  { id: "design-system", category: "업무", title: "디자인 시스템 정리", preview: "색 변수·스타일 이름 통일", date: "오늘", fullDate: "10월 30일", label: "blue", body: plain("색 변수·스타일 이름 통일") },
  { id: "weekly-meeting", category: "업무", title: "주간 회의 안건", preview: "신규 온보딩 플로우 일정 공유하기", date: "어제", fullDate: "10월 29일", label: "orange", body: plain("신규 온보딩 플로우 일정 공유하기") },
];

export const RECENT_MEMOS: Memo[] = [
  { id: "groceries", category: "개인", title: "장보기 목록", preview: "우유, 달걀, 방울토마토, 식빵", date: "오늘", fullDate: "10월 30일", label: "green", body: plain("우유, 달걀, 방울토마토, 식빵") },
  { id: "weekend-trip", category: "아이디어", title: "주말 여행 아이디어", preview: "가을 단풍 보러 강원도 드라이브", date: "어제", fullDate: "10월 29일", label: "pink", body: plain("가을 단풍 보러 강원도 드라이브") },
  { id: "reading", category: "개인", title: "독서 메모", preview: "1장 요약과 기억할 문장", date: "10월 27일", fullDate: "10월 27일", label: "blue", body: plain("1장 요약과 기억할 문장") },
];

// Figma 상세 시안의 메모. 홈 목록에는 없고 /memos/design-review 로 열린다.
const DESIGN_REVIEW: Memo = {
  id: "design-review",
  category: "업무",
  title: "디자인 리뷰 회의록",
  preview: "검수 기준을 팀 규칙으로 정리했다.",
  date: "오늘",
  fullDate: "10월 30일 오전 9:12",
  label: "blue",
  body: [
    { type: "heading", level: 1, text: "회의 요약" },
    {
      type: "paragraph",
      parts: [
        { text: "검수 기준을 팀 규칙으로 정리했다. 핵심은 " },
        { text: "토큰과 컴포넌트 우선", bold: true },
        { text: "이다." },
      ],
    },
    { type: "heading", level: 2, text: "결정한 것" },
    {
      type: "list",
      items: [
        "색·간격은 변수에 연결",
        "반복되는 UI는 컴포넌트로",
        "한글은 Noto Sans KR 사용",
      ],
    },
    { type: "heading", level: 2, text: "다음 할 일" },
    {
      type: "paragraph",
      parts: [
        { text: "금요일까지 각자 맡은 화면을 채점한다. " },
        { text: "점수보다 이유", bold: true },
        { text: "를 먼저 본다." },
      ],
    },
    { type: "heading", level: 2, text: "남은 질문" },
    {
      type: "paragraph",
      parts: [{ text: "다크 모드 색은 다음 회의에서 정한다." }],
    },
  ],
};

export const ALL_MEMOS: Memo[] = [
  ...PINNED_MEMOS,
  ...RECENT_MEMOS,
  DESIGN_REVIEW,
];

export function getMemo(id: string): Memo | undefined {
  return ALL_MEMOS.find((memo) => memo.id === id);
}
