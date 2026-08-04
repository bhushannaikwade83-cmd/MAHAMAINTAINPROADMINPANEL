import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Share2,
  FileDown,
  ExternalLink,
  Filter,
  ShieldCheck,
  IndianRupee,
  Wallet,
  FileText,
  CalendarCheck,
  CalendarClock,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LedgerToolbar } from "@/components/FyRangeBar";
import { ledgerAccounts, paymentTrend, inr } from "@/data/society";

export const Route = createFileRoute("/ledgers")({
  head: () => ({
    meta: [
      { title: "Ledger Accounts — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Browse society ledger accounts with balances, payment trend, dues overview and statements.",
      },
      { property: "og:title", content: "Ledger Accounts — Maha Maintain Pro" },
      {
        property: "og:description",
        content: "Society ledger accounts with balances and statements.",
      },
    ],
  }),
  component: LedgersPage,
});

const zeroAgeing = [
  { label: "0-30 Days", amount: 0 },
  { label: "31-60 Days", amount: 0 },
  { label: "61-90 Days", amount: 0 },
  { label: "90+ Days", amount: 0 },
];

function LedgersPage() {
  const [selected, setSelected] = useState<string>(ledgerAccounts[0]!.id);
  const [query, setQuery] = useState("");
  const list = ledgerAccounts.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()));
  const acc = ledgerAccounts.find((l) => l.id === selected) ?? ledgerAccounts[0]!;
  const flat = paymentTrend.map((p) => ({ ...p, v: 0 }));

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="surface-card flex h-fit flex-col p-5">
        <h2 className="mb-4 text-lg font-bold">
          Ledger Accounts{" "}
          <span className="text-muted-foreground font-normal">({ledgerAccounts.length})</span>
        </h2>
        <div className="mb-3 flex gap-2">
          <div className="border-input focus-within:ring-ring/40 flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
            <Search className="text-muted-foreground size-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-xl px-3">
            <Search className="size-4" />
          </button>
        </div>
        <select className="border-input mb-3 rounded-xl border px-3 py-2 text-sm font-medium">
          <option>Sort: Name</option>
          <option>Sort: Balance</option>
        </select>
        <div className="text-muted-foreground mb-3 flex items-center justify-between text-xs">
          <span>Filters active</span>
          <button className="text-destructive flex items-center gap-1 font-bold">
            <X className="size-3.5" /> Clear
          </button>
        </div>
        <ul className="soft-scroll max-h-[560px] space-y-1 overflow-y-auto">
          {list.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => setSelected(l.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  l.id === selected ? "bg-primary-soft" : "hover:bg-muted",
                ].join(" ")}
              >
                <span className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                  {l.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{l.name}</span>
                  <span className="text-muted-foreground block text-xs italic">No flat</span>
                </span>
                <span
                  className={[
                    "rounded-md px-2 py-1 text-[11px] font-bold whitespace-nowrap",
                    l.side === "Cr"
                      ? "bg-success/12 text-success"
                      : l.side === "Dr"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {l.side === "Nil" ? "Nil" : `${inr(l.balance)} ${l.side}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground border-border mt-3 border-t pt-3 text-xs">
          {list.length} of {ledgerAccounts.length} accounts
        </p>
      </aside>

      <section>
        <LedgerToolbar>
          <button className="border-primary/30 text-primary hover:bg-primary-soft btn-press flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
            <Filter className="text-primary size-4" /> Apply
          </button>
          <button className="border-success/40 text-success hover:bg-success/10 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
            <ShieldCheck className="size-4" /> Enable Access
          </button>
        </LedgerToolbar>

        <div className="mb-5 flex flex-wrap gap-3">
          <button className="bg-success text-success-foreground flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:brightness-110">
            <Share2 className="size-4" /> Share Statement
          </button>
          <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:brightness-110">
            <FileDown className="size-4" /> Download PDF
          </button>
          <button className="border-primary/30 text-primary hover:bg-primary-soft btn-press flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold">
            <ExternalLink className="size-4" /> Full Statement
          </button>
        </div>

        <div className="surface-card mb-5 flex flex-wrap items-center gap-5 p-6">
          <span className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen font-display flex size-16 items-center justify-center rounded-2xl text-2xl font-bold">
            {acc.initials}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{acc.name}</h2>
              <span
                className={[
                  "rounded-md px-2 py-0.5 text-xs font-bold",
                  acc.inactive
                    ? "bg-muted text-muted-foreground"
                    : "bg-success/12 text-success",
                ].join(" ")}
              >
                {acc.inactive ? "Inactive" : "Active"}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Ledger group: Society Accounts</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-muted-foreground text-xs font-semibold">Outstanding Balance</p>
            <p className="font-display text-3xl font-bold">{inr(acc.balance)}</p>
            <span className="bg-success/12 text-success mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-bold">
              {acc.side === "Nil" ? "Credit" : acc.side === "Cr" ? "Credit" : "Debit"}
            </span>
          </div>
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Mini icon={IndianRupee} label="Total Due" value="₹0.00" tone="primary" />
          <Mini icon={Wallet} label="Paid (This FY)" value="₹0.00" tone="success" />
          <Mini icon={FileText} label="Total Receipts" value="0" tone="info" />
          <Mini icon={CalendarCheck} label="Last Receipt" value="--" tone="warning" />
          <Mini icon={CalendarClock} label="Next Due" value="--" tone="muted" />
        </div>

        <div className="mb-5 grid gap-5 xl:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="mb-4 font-bold">
              Payment Trend{" "}
              <span className="text-muted-foreground text-sm font-normal">
                (Society Receipts, This FY)
              </span>
            </h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={flat} margin={{ left: 0, right: 8, top: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="m"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2.5}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-4 font-bold">
              Dues Overview{" "}
              <span className="text-muted-foreground text-sm font-normal">by Print Due Date</span>
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ name: "none", value: 1 }]}
                      dataKey="value"
                      innerRadius={62}
                      outerRadius={92}
                      stroke="var(--color-card)"
                      strokeWidth={3}
                    >
                      <Cell fill="var(--color-chart-2)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display text-lg font-bold">₹0.00</p>
                  <p className="text-muted-foreground text-xs">Total Due</p>
                </div>
              </div>
              <ul className="min-w-[190px] flex-1 space-y-2">
                {zeroAgeing.map((a) => (
                  <li key={a.label} className="flex items-center gap-2 text-sm">
                    <span className="bg-muted-foreground/40 size-2.5 rounded-full" />
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="ml-auto font-semibold">₹0.00</span>
                    <span className="text-muted-foreground text-xs">(0%)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="font-bold">
              Transaction History{" "}
              <span className="text-muted-foreground text-sm font-normal">(0 entries)</span>
            </h3>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/60 text-muted-foreground text-left text-xs font-bold tracking-wide uppercase">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Voucher No.</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Narration</th>
                  <th className="px-6 py-3 text-right">Debit</th>
                  <th className="px-6 py-3 text-right">Credit</th>
                </tr>
              </thead>
            </table>
          </div>
          <p className="text-muted-foreground py-12 text-center text-sm">
            No transactions in this period
          </p>
        </div>
      </section>
    </div>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  tone: "primary" | "success" | "info" | "warning" | "muted";
}) {
  const tones = {
    primary: "bg-primary/12 text-primary",
    success: "bg-success/12 text-success",
    info: "bg-info/12 text-info",
    warning: "bg-warning/18 text-warning-foreground",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <div className="surface-card p-5">
      <span className={`flex size-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="size-5" />
      </span>
      <p className="text-muted-foreground mt-3 text-[11px] font-bold tracking-[0.12em] uppercase">
        {label}
      </p>
      <p className="font-display mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
