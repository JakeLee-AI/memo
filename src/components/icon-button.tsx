import Link from "next/link";
import { Icon, type IconName } from "./icon";

type IconButtonProps = {
  icon: IconName;
  label: string;
  href?: string;
  onClick?: () => void;
};

const STYLE =
  "press [--press-scale:0.86] flex size-10 items-center justify-center rounded-sm text-text-primary hover:bg-border-default active:bg-border-default";

export function IconButton({ icon, label, href, onClick }: IconButtonProps) {
  // 링크로 쓰는 아이콘 버튼은 뒤로가기뿐이라 화면이 뒤로 밀려 들어온다.
  if (href) {
    return (
      <Link
        href={href}
        transitionTypes={["nav-back"]}
        aria-label={label}
        className={STYLE}
      >
        <Icon name={icon} />
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={STYLE}>
      <Icon name={icon} />
    </button>
  );
}
