import Link from "next/link";
import { Icon } from "./icon";

type ButtonPrimaryProps = {
  label?: string;
  icon?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const BASE =
  "press flex h-14 w-full items-center justify-center gap-space-8 rounded-md px-space-24 text-button-md";

export function ButtonPrimary({
  label = "새 메모 쓰기",
  icon = false,
  href,
  disabled = false,
  onClick,
}: ButtonPrimaryProps) {
  const content = (
    <>
      {icon && <Icon name="plus" />}
      {label}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        transitionTypes={["nav-forward"]}
        className={`${BASE} bg-primary text-text-on-primary`}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} pop-enabled ${
        disabled
          ? "bg-border-default text-text-muted"
          : "bg-primary text-text-on-primary"
      }`}
    >
      {content}
    </button>
  );
}
