const ICON_SIZE = {
  plus: 20,
  note: 22,
  pin: 16,
  "chevron-right": 16,
  "chevron-left": 24,
  "pin-lg": 24,
  share: 24,
  more: 24,
} as const;

export type IconName = keyof typeof ICON_SIZE;

// 아이콘 색은 글자색을 따른다 — 쓰는 곳에서 text-* 토큰만 지정한다.
export function Icon({ name }: { name: IconName }) {
  const size = ICON_SIZE[name];
  const mask = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{
        width: size,
        height: size,
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
