import { Icon } from "./icon";

type CardHeaderProps = {
  title: string;
  pin?: boolean;
  action?: boolean;
};

export function CardHeader({ title, pin = false, action = false }: CardHeaderProps) {
  return (
    <div className="flex h-10 items-center gap-space-4 pb-space-4 pl-space-20 pr-space-16 pt-space-12">
      {pin && (
        <span className="text-primary">
          <Icon name="pin" />
        </span>
      )}
      <h2 className="flex-1 text-label-md text-text-primary">{title}</h2>
      {action && (
        <button
          type="button"
          className="press [--press-scale:0.92] flex items-center gap-space-4 text-caption-md text-text-muted"
        >
          전체 보기
          <Icon name="chevron-right" />
        </button>
      )}
    </div>
  );
}
