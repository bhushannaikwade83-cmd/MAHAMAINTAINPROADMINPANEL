import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Building2,
  IndianRupee,
  TrendingUp,
  CalendarClock,
  Headset,
  UserRoundCheck,
  BarChart3,
  PieChart as PieIcon,
  CalendarDays,
  Megaphone,
  Plus,
  ImageIcon,
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
import { StatCard } from "@/components/StatCard";
import { FyRangeBar } from "@/components/FyRangeBar";
import { society, collectionSeries, chargeTypes, events, polls, notifications, inr } from "@/data/society";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MAHAMAINTAINPRO" },
      {
        name: "description",
        content:
          "Live overview of collections, dues, events, polls and notifications for Sunrise Residency CHS.",
      },
      { property: "og:title", content: "Dashboard — MAHAMAINTAINPRO" },
      {
        property: "og:description",
        content: "Live overview of collections, dues, events, polls and notifications for Sunrise Residency CHS.",
      },
    ],
  }),
  component: Dashboard,
});

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="gradient-hero border-border shadow-card animate-fade-up relative flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-2xl border p-6 sm:p-8">
        <span
          aria-hidden
          className="bg-primary/25 animate-glow pointer-events-none absolute -top-24 -right-16 size-64 rounded-full blur-3xl"
        />
        <span
          aria-hidden
          className="bg-primary/15 animate-glow pointer-events-none absolute -bottom-28 left-1/3 size-56 rounded-full blur-3xl"
          style={{ animationDelay: "1.6s" }}
        />
        <div className="relative">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Welcome back, Demo{" "}
            <span className="inline-block origin-bottom-right animate-[mmp-pop_1.6s_ease-in-out_infinite]">
              👋
            </span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Here's what's happening in {society.name}
          </p>
        </div>
        <div className="relative">
          <FyRangeBar />
        </div>
      </section>

      <section className="animate-fade-up grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total Members" value="5" hint="Active members" icon={Users} tone="primary" index={1} />
        <StatCard label="Occupied Flats" value="5" hint="Units occupied" icon={Building2} tone="success" index={2} />
        <StatCard label="Collection (FY)" value="₹11,000" hint="Receipts posted" icon={IndianRupee} tone="primary" index={3} />
        <StatCard label="Interest (FY)" value="₹0" hint="Interest ledger" icon={TrendingUp} tone="info" index={4} />
        <StatCard label="Upcoming Dues" value="—" hint="Coming soon" icon={CalendarClock} tone="muted" dim index={5} />
        <StatCard label="Complaints Open" value="—" hint="Coming soon" icon={Headset} tone="muted" dim index={6} />
      </section>

      <section className="surface-card animate-fade-up flex items-center justify-between gap-4 p-6 opacity-80">
        <div>
          <p className="text-muted-foreground text-[11px] font-bold tracking-[0.12em] uppercase">
            Visitors Today
          </p>
          <p className="font-display mt-2 text-3xl font-bold">—</p>
          <p className="text-muted-foreground mt-1 text-xs">Coming soon</p>
        </div>
        <span className="bg-success/12 text-success flex size-11 items-center justify-center rounded-xl">
          <UserRoundCheck className="size-5" />
        </span>
      </section>

      <section className="surface-card animate-fade-up p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <BarChart3 className="text-primary size-5" />
            Collection Overview
          </h2>
          <div className="text-muted-foreground flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-2">
              <span className="bg-chart-1 h-1 w-5 rounded-full" /> Sales (₹)
            </span>
            <span className="flex items-center gap-2">
              <span className="bg-chart-2 h-1 w-5 rounded-full" /> Collection (₹)
            </span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={collectionSeries} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gColl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v: number) => (v >= 1000 ? `₹${v / 1000}K` : `₹${v}`)}
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
                dataKey="sales"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#gSales)"
              />
              <Area
                type="monotone"
                dataKey="collection"
                stroke="var(--color-chart-2)"
                strokeWidth={2.5}
                fill="url(#gColl)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="surface-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <PieIcon className="text-primary size-5" />
              Sales by Charge Type
            </h2>
            <button className="bg-primary-soft text-primary hover:bg-accent rounded-lg px-3 py-1.5 text-xs font-bold transition-colors">
              View Details
            </button>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chargeTypes}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={98}
                  paddingAngle={2}
                  stroke="var(--color-card)"
                  strokeWidth={3}
                >
                  {chargeTypes.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => inr(v)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {chargeTypes.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2 text-sm">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: pieColors[i % pieColors.length] }}
                />
                <span className="text-muted-foreground truncate">{c.name}</span>
                <span className="ml-auto font-semibold">{inr(c.value)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <CalendarDays className="text-primary size-5" />
              Events
              <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs font-bold">
                {events.length}
              </span>
            </h2>
            <button className="text-primary flex items-center gap-1 text-sm font-bold">
              <Plus className="size-4" /> New
            </button>
          </div>
          <div className="space-y-4">
            {events.map((e) => (
              <article
                key={e.id}
                className="border-border border-l-primary bg-muted/40 rounded-xl border border-l-4 p-4"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="bg-info/12 text-info rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider">
                    EVENT
                  </span>
                  <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-[10px] font-bold">
                    {e.tag}
                  </span>
                  <span className="text-muted-foreground ml-auto text-[11px]">
                    {e.recipients} recipients
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="border-border rounded-xl border bg-card px-4 py-2 text-center">
                    <p className="font-display text-xl font-bold">{e.day}</p>
                    <p className="text-muted-foreground text-[10px] font-bold">{e.mon}</p>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    <p className="text-foreground font-semibold">Past Event</p>
                    <p>🕑 {e.time}</p>
                    <p>📍 {e.place}</p>
                  </div>
                </div>
                <h3 className="mt-3 font-bold">{e.title}</h3>
                <p className="text-muted-foreground text-sm">{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <BarChart3 className="text-primary size-5" />
            Polls
            <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs font-bold">
              {polls.length}
            </span>
          </h2>
          <div className="space-y-4">
            {polls.map((p) => {
              const total = p.options.reduce((s, o) => s + o.votes, 0);
              return (
                <article
                  key={p.id}
                  className="border-border border-l-chart-4 bg-muted/40 rounded-xl border border-l-4 p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider">
                      POLL
                    </span>
                    <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-[10px] font-bold">
                      {p.status}
                    </span>
                    <span className="text-muted-foreground ml-auto text-[11px]">
                      {p.recipients} recipients
                    </span>
                  </div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-muted-foreground text-sm">Poll anchor: {p.anchor}</p>
                  <div className="mt-3 space-y-2">
                    {p.options.map((o) => {
                      const pct = total ? Math.round((o.votes / total) * 100) : 0;
                      return (
                        <div
                          key={o.label}
                          className="border-border relative overflow-hidden rounded-lg border bg-card px-3 py-2 text-sm"
                        >
                          <span
                            className="bg-primary/12 absolute inset-y-0 left-0"
                            style={{ width: `${pct}%` }}
                          />
                          <span className="relative flex justify-between">
                            <span>{o.label}</span>
                            <span className="text-muted-foreground font-semibold">
                              {o.votes} ({pct}%)
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <Megaphone className="text-primary size-5" />
            Notifications
            <span className="bg-primary-soft text-primary rounded-full px-2 py-0.5 text-xs font-bold">
              {notifications.length}
            </span>
          </h2>
          <div className="soft-scroll max-h-[560px] space-y-3 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <article
                key={n.id}
                className={[
                  "border-border bg-muted/40 rounded-xl border border-l-4 p-4",
                  n.kind === "EMERGENCY" ? "border-l-destructive" : "border-l-chart-2",
                ].join(" ")}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider",
                      n.kind === "EMERGENCY"
                        ? "bg-destructive/12 text-destructive"
                        : "bg-success/12 text-success",
                    ].join(" ")}
                  >
                    {n.kind}
                  </span>
                  <span className="text-muted-foreground ml-auto text-[11px]">
                    {n.recipients} recipients
                  </span>
                </div>
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-muted-foreground text-sm">{n.body}</p>
                {n.photo && (
                  <button className="border-border text-primary mt-3 inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs font-bold">
                    <ImageIcon className="size-3.5" /> View Photo
                  </button>
                )}
                <p className="text-muted-foreground mt-2 text-[11px]">{n.at}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
