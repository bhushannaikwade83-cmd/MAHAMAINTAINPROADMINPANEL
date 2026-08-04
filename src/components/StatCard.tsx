import type React from "react";
import type { LucideIcon } from "lucide-react";

const tones = {
  primary: "bg-primary/12 text-primary",
  success: "bg-success/12 text-success",
  info: "bg-info/12 text-info",
  warning: "bg-warning/18 text-warning-foreground",
  muted: "bg-muted text-muted-foreground",
} as const;

export type Tone = keyof typeof tones;

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
  dim = false,
  index = 0,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
  dim?: boolean;
  index?: number;
}) {
  return (
    <div
      style={{ "--i": index } as React.CSSProperties}
      className={[
        "surface-card lift sheen icon-pop stagger group p-5",
        dim ? "opacity-70" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-muted-foreground text-[11px] font-bold tracking-[0.12em] uppercase">
          {label}
        </p>
        <span
          className={`flex size-10 items-center justify-center rounded-xl icon-pop-target ${tones[tone]}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
      <p className="font-display mt-3 text-3xl font-bold tracking-tight">{value}</p>
      {hint && <p className="text-muted-foreground mt-1 text-xs">{hint}</p>}
    </div>
  );
}
