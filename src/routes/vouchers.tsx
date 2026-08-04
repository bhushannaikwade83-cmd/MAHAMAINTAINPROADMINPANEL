import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  Wallet,
  IndianRupee,
  Building2,
  Search,
  ArrowDownWideNarrow,
  RefreshCcw,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { PageHeader } from "@/components/layout/AppShell";
import { FyRangeBar } from "@/components/FyRangeBar";
import { voucherRows, inr } from "@/data/society";

export const Route = createFileRoute("/vouchers")({
  head: () => ({
    meta: [
      { title: "Voucher Statistics — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Register of society bills, receipts and payments with financial overview for the selected period.",
      },
      { property: "og:title", content: "Voucher Statistics — Maha Maintain Pro" },
      {
        property: "og:description",
        content: "Society bill register, receipts and payments overview.",
      },
    ],
  }),
  component: VouchersPage,
});

const donut = [
  { name: "Receipts", value: 11000 },
  { name: "Payments", value: 0.0001 },
];

function VouchersPage() {
  const [filter, setFilter] = useState<"All" | "Receipt" | "Society Bill">("All");
  const rows = voucherRows.filter((r) =>
    filter === "All" ? true : r.type === filter.toUpperCase(),
  );

  return (
    <div>
      <PageHeader
        breadcrumb={["Dashboard", "Vouchers"]}
        title="Voucher Statistics"
        subtitle="Overview and register of all vouchers for the selected period"
        actions={<FyRangeBar label="Apply" />}
      />

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BigStat icon={ClipboardList} label="Total Vouchers" value="12" tone="primary" />
        <BigStat icon={Wallet} label="Payments" value="0" sub="₹0" tone="warning" />
        <BigStat icon={IndianRupee} label="Receipts" value="4" sub="₹11,000" tone="success" />
        <BigStat icon={Building2} label="Society Bills" value="8" sub="₹22,500" tone="info" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="surface-card overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-bold">Society Bill Register</h2>
            <p className="text-muted-foreground text-sm">
              Browse through voucher categories for the selected period
            </p>
          </div>
          <div className="flex flex-wrap gap-3 px-6 pb-4">
            <div className="border-input focus-within:ring-ring/40 flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
              <Search className="text-muted-foreground size-4" />
              <input
                placeholder="Search by voucher no., particulars..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <select className="border-input rounded-xl border px-3 py-2 text-sm font-medium">
              <option>All Types</option>
              <option>Receipt</option>
              <option>Society Bill</option>
            </select>
            <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold">
              <ArrowDownWideNarrow className="size-4" /> Latest First
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/60 text-muted-foreground text-left text-xs font-bold tracking-wide uppercase">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Voucher No.</th>
                  <th className="px-6 py-3">Particulars</th>
                  <th className="px-6 py-3 text-right">Debit (₹)</th>
                  <th className="px-6 py-3 text-right">Credit (₹)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.no} className="border-border hover:bg-muted/40 border-t">
                    <td className="px-6 py-3.5 whitespace-nowrap">{r.date}</td>
                    <td className="text-primary px-6 py-3.5 font-semibold whitespace-nowrap">
                      {r.no}
                    </td>
                    <td className="px-6 py-3.5">
                      <p className="font-semibold">{r.party}</p>
                      <span
                        className={[
                          "mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider",
                          r.type === "RECEIPT"
                            ? "bg-success/12 text-success"
                            : "bg-primary-soft text-primary",
                        ].join(" ")}
                      >
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right font-semibold">
                      {r.debit ? inr(r.debit) : "—"}
                    </td>
                    <td className="text-success px-6 py-3.5 text-right font-semibold">
                      {r.credit ? inr(r.credit) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Financial Overview</h3>
              <span className="text-primary text-xs font-bold">This Period</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative size-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donut}
                      dataKey="value"
                      innerRadius={50}
                      outerRadius={72}
                      stroke="var(--color-card)"
                      strokeWidth={3}
                    >
                      <Cell fill="var(--color-chart-2)" />
                      <Cell fill="var(--color-chart-1)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display text-base font-bold">₹11,000</p>
                  <p className="text-muted-foreground text-[11px]">Total Amount</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                <li>
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="bg-chart-2 size-2.5 rounded-full" /> Total Receipts
                  </p>
                  <p className="text-muted-foreground pl-4.5">₹11,000 (100%)</p>
                </li>
                <li>
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="bg-chart-1 size-2.5 rounded-full" /> Total Payments
                  </p>
                  <p className="text-muted-foreground pl-4.5">₹0 (0%)</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Voucher Type Distribution</h3>
              <span className="text-primary text-xs font-bold">This Period</span>
            </div>
            <Bar label="Society Bill" count="8 (67%)" pct={67} color="var(--color-chart-1)" />
            <Bar label="Receipt" count="4 (33%)" pct={33} color="var(--color-chart-2)" />
          </div>

          <div className="surface-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold">
              <RefreshCcw className="text-primary size-4" /> Quick Filter
            </h3>
            <div className="flex flex-wrap gap-2">
              {(["All", "Receipt", "Society Bill"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                    filter === f
                      ? "gradient-saffron text-primary-foreground btn-press shadow-glow sheen"
                      : "border-border text-muted-foreground hover:bg-accent border",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Bar({ label, count, pct, color }: { label: string; count: string; pct: number; color: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{count}</span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function BigStat({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  sub?: string;
  tone: "primary" | "success" | "info" | "warning";
}) {
  const tones = {
    primary: "bg-primary/12 text-primary",
    success: "bg-success/12 text-success",
    info: "bg-info/12 text-info",
    warning: "bg-warning/18 text-warning-foreground",
  };
  return (
    <div className="surface-card hover:shadow-lift p-6 transition-shadow">
      <div className="flex items-start justify-between">
        <p className="text-muted-foreground text-[11px] font-bold tracking-[0.12em] uppercase">
          {label}
        </p>
        <span className={`flex size-10 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="size-5" />
        </span>
      </div>
      <p className="font-display mt-4 text-4xl font-bold">{value}</p>
      {sub && <p className="text-muted-foreground mt-1 text-sm font-semibold">{sub}</p>}
    </div>
  );
}
