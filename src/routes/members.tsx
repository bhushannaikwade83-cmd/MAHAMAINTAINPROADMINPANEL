import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Share2,
  BellRing,
  FileDown,
  ExternalLink,
  Filter,
  ShieldOff,
  IndianRupee,
  Wallet,
  FileText,
  CalendarCheck,
  CalendarClock,
  Phone,
  ChevronLeft,
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
import { members, paymentTrend, ageing, transactions, inr } from "@/data/society";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members & Dues — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Member ledger with outstanding balance, payment trend, dues ageing and full transaction history.",
      },
      { property: "og:title", content: "Members & Dues — Maha Maintain Pro" },
      {
        property: "og:description",
        content: "Member ledger with outstanding balance, ageing and transaction history.",
      },
    ],
  }),
  component: MembersPage,
});

const ageColors = ["var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-1)", "var(--color-chart-4)"];

function MembersPage() {
  const [selected, setSelected] = useState<string>(members[0]!.id);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"Active" | "Inactive" | "All">("Active");

  const list = members.filter((m) => {
    const matchesTab = tab === "All" ? true : tab === "Active" ? m.active : !m.active;
    return matchesTab && m.name.toLowerCase().includes(query.toLowerCase());
  });
  const member = members.find((m) => m.id === selected) ?? members[0]!;
  const totalDue = ageing.reduce((s, a) => s + a.amount, 0);

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="surface-card flex h-fit flex-col p-5">
        <h2 className="mb-4 text-lg font-bold">
          Members <span className="text-muted-foreground font-normal">({members.length})</span>
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
        <div className="mb-3 flex gap-2">
          {(["Active", "Inactive", "All"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                tab === t
                  ? "gradient-saffron text-primary-foreground btn-press shadow-glow sheen"
                  : "border-border text-muted-foreground hover:bg-accent border",
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>
        <ul className="soft-scroll max-h-[560px] space-y-1 overflow-y-auto">
          {list.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => setSelected(m.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  m.id === selected ? "bg-primary-soft" : "hover:bg-muted",
                ].join(" ")}
              >
                <span className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                  {m.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{m.name}</span>
                  <span className="text-muted-foreground block text-xs">{m.flat}</span>
                </span>
                <span className="bg-destructive/10 text-destructive rounded-md px-2 py-1 text-[11px] font-bold">
                  {inr(m.balance)} Dr
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground border-border mt-3 border-t pt-3 text-xs">
          {list.length} of {members.length} members
        </p>
      </aside>

      <section>
        <LedgerToolbar>
          <button className="border-primary/30 text-primary hover:bg-primary-soft btn-press flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
            <Filter className="text-primary size-4" /> Apply
          </button>
          <button className="border-destructive/40 text-destructive hover:bg-destructive/10 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold">
            <ShieldOff className="size-4" /> Disable Access
          </button>
        </LedgerToolbar>

        <div className="mb-5 flex flex-wrap gap-3">
          <button className="bg-success text-success-foreground flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:brightness-110">
            <Share2 className="size-4" /> Share Statement
          </button>
          <button className="bg-destructive text-destructive-foreground flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:brightness-110">
            <BellRing className="size-4" /> Send Reminder
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
            {member.initials}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">{member.name}</h2>
              <span className="bg-primary-soft text-primary rounded-md px-2 py-0.5 text-xs font-bold">
                {member.flat}
              </span>
              <span className="bg-success/12 text-success rounded-md px-2 py-0.5 text-xs font-bold">
                {member.active ? "Active Member" : "Inactive"}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Phone className="size-3.5" /> {member.phone}
              </span>
              <span>{member.email}</span>
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-muted-foreground text-xs font-semibold">Outstanding Balance</p>
            <p className="font-display text-destructive text-3xl font-bold">{inr(member.balance)}</p>
            <span className="bg-destructive/10 text-destructive mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-bold">
              Due
            </span>
          </div>
        </div>

        <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MiniStat icon={IndianRupee} label="Total Due" value={inr(member.balance)} tone="primary" />
          <MiniStat icon={Wallet} label="Paid (This FY)" value="₹5,000.00" tone="success" />
          <MiniStat icon={FileText} label="Total Receipts" value="2" tone="info" />
          <MiniStat icon={CalendarCheck} label="Last Receipt" value="₹2,500.00" sub="08 May 2026" tone="warning" />
          <MiniStat icon={CalendarClock} label="Next Due" value="--" tone="muted" />
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
                <AreaChart data={paymentTrend} margin={{ left: 0, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                    width={58}
                    tickFormatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => inr(v)}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2.5}
                    fill="url(#gTrend)"
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
                      data={ageing}
                      dataKey="amount"
                      nameKey="label"
                      innerRadius={62}
                      outerRadius={92}
                      paddingAngle={2}
                      stroke="var(--color-card)"
                      strokeWidth={3}
                    >
                      {ageing.map((_, i) => (
                        <Cell key={i} fill={ageColors[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="font-display text-lg font-bold">{inr(totalDue)}</p>
                  <p className="text-muted-foreground text-xs">Total Due</p>
                </div>
              </div>
              <ul className="min-w-[190px] flex-1 space-y-2">
                {ageing.map((a, i) => (
                  <li key={a.label} className="flex items-center gap-2 text-sm">
                    <span className="size-2.5 rounded-full" style={{ background: ageColors[i] }} />
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="ml-auto font-semibold">{inr(a.amount)}</span>
                    <span className="text-muted-foreground text-xs">({a.pct}%)</span>
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
              <span className="text-muted-foreground text-sm font-normal">
                ({transactions.length} entries)
              </span>
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
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.voucher} className="border-border hover:bg-muted/40 border-t">
                    <td className="px-6 py-3.5 whitespace-nowrap">{t.date}</td>
                    <td className="text-primary px-6 py-3.5 font-semibold whitespace-nowrap">
                      {t.voucher}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={[
                          "rounded-md px-2 py-0.5 text-[11px] font-bold",
                          t.type === "Receipt"
                            ? "bg-success/12 text-success"
                            : "bg-primary-soft text-primary",
                        ].join(" ")}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-6 py-3.5">{t.narration}</td>
                    <td className="px-6 py-3.5 text-right font-semibold">
                      {t.debit ? inr(t.debit) : "—"}
                    </td>
                    <td className="text-success px-6 py-3.5 text-right font-semibold">
                      {t.credit ? inr(t.credit) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-muted-foreground border-border flex items-center gap-2 border-t px-6 py-3 text-xs">
            <ChevronLeft className="size-3.5" /> Showing latest {transactions.length} entries
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof IndianRupee;
  label: string;
  value: string;
  sub?: string;
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
      {sub && <p className="text-muted-foreground text-xs">{sub}</p>}
    </div>
  );
}
