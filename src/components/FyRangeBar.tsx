import { CalendarDays, Check } from "lucide-react";
import { society } from "@/data/society";

export function FyRangeBar({ label = "Go" }: { label?: string }) {
  return (
    <div className="surface-card flex items-stretch overflow-hidden p-0">
      <div className="border-border border-r px-4 py-2.5">
        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.14em] uppercase">
          From
        </p>
        <p className="text-sm font-semibold">{society.fyFrom}</p>
      </div>
      <div className="border-border border-r px-4 py-2.5">
        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.14em] uppercase">
          To
        </p>
        <p className="text-sm font-semibold">{society.fyTo}</p>
      </div>
      <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 px-5 text-sm font-semibold hover:brightness-110">
        <Check className="size-4" />
        {label}
      </button>
    </div>
  );
}

export function LedgerToolbar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="surface-card mb-5 flex flex-wrap items-center gap-3 p-4">
      <div className="border-border flex items-center gap-3 rounded-xl border px-4 py-2">
        <span className="text-muted-foreground text-[10px] font-bold tracking-[0.14em] uppercase">
          Society FY
        </span>
        <span className="text-sm font-semibold">
          {society.fyFrom} — {society.fyTo}
        </span>
        <CalendarDays className="text-primary size-4" />
      </div>
      {children}
    </div>
  );
}
