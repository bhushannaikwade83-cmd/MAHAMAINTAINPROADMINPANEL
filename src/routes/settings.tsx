import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert, BellRing, Check, RefreshCw, Plus, X, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Society Settings — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Configure member complaints, automated payment reminders, wings & flats sync and entry gates.",
      },
      { property: "og:title", content: "Society Settings — Maha Maintain Pro" },
      {
        property: "og:description",
        content: "Configure complaints, reminders, wings & flats and gates for your society.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [complaints, setComplaints] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [gates, setGates] = useState(["Gate1", "Gate2"]);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Society Settings"
        subtitle="Configure automated payment reminders and management access permissions."
      />

      <section className="surface-card mb-6 overflow-hidden">
        <header className="border-border flex items-center gap-2 border-b px-6 py-4">
          <TriangleAlert className="text-primary size-5" />
          <h2 className="font-bold">Member Complaints</h2>
        </header>
        <div className="flex flex-wrap items-start gap-6 p-6">
          <div className="min-w-[260px] flex-1">
            <h3 className="font-bold">Enable Member Complaints</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Let members, staff and cleaners raise complaints from the mobile app. Off by default.
              This is the society-wide setting — you can still allow or block one specific person
              from the Complaints screen, and that overrides this switch for them. Turning it off
              does not hide existing complaints from you: admins can always manage what has already
              been raised.
            </p>
          </div>
          <Toggle on={complaints} onChange={setComplaints} label="Enable member complaints" />
        </div>
      </section>

      <section className="surface-card mb-6 overflow-hidden">
        <header className="border-border flex items-center gap-2 border-b px-6 py-4">
          <BellRing className="text-primary size-5" />
          <h2 className="font-bold">Auto Payment Reminder</h2>
        </header>
        <div className="flex flex-wrap items-start gap-6 p-6">
          <div className="min-w-[260px] flex-1">
            <h3 className="font-bold">Enable Auto Reminders</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Automatically send system payment alerts and notifications to society members
              regarding outstanding invoices.
            </p>
          </div>
          <Toggle on={reminders} onChange={setReminders} label="Enable auto reminders" />
        </div>
      </section>

      <button
        onClick={() => toast.success("Settings saved")}
        className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen mb-8 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold tracking-wide uppercase hover:brightness-110"
      >
        <Check className="size-4" /> Save Settings
      </button>

      <section className="surface-card mb-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-bold">Wings &amp; Flats</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Cached wing/flat list used by the member, visitor and notification forms. It is pulled
              from your live ledger. Syncing <strong>replaces</strong> the cached list — a renamed or
              removed wing drops out.
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Cached: <strong>2</strong> wing(s), <strong>5</strong> flat(s) · Last synced: 2026-07-23
              14:33:12
            </p>
          </div>
          <button
            onClick={() => toast.success("Wings & flats synced")}
            className="border-primary/40 text-primary hover:bg-primary-soft flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold tracking-wide uppercase"
          >
            <RefreshCw className="size-4" /> Sync Wings &amp; Flats
          </button>
        </div>
      </section>

      <section className="surface-card p-6">
        <h2 className="flex items-center gap-2 font-bold">
          <Settings2 className="text-primary size-5" /> Gates
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Name each entry gate of your society (e.g. Main Gate, Gate 2). A guard can be assigned a
          gate, which is then pre-selected when they check a visitor in.{" "}
          <strong>Leave this empty if you don't track gates</strong> — the gate option is hidden
          everywhere and check-in keeps working exactly as before.
        </p>
        <div className="mt-5 space-y-3">
          {gates.map((g, i) => (
            <div key={i} className="flex gap-3">
              <input
                value={g}
                onChange={(e) =>
                  setGates((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))
                }
                className="border-input focus:ring-ring/40 flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2"
              />
              <button
                onClick={() => setGates((prev) => prev.filter((_, j) => j !== i))}
                aria-label={`Remove ${g}`}
                className="border-input hover:bg-destructive/10 hover:text-destructive rounded-xl border px-3"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setGates((p) => [...p, `Gate${p.length + 1}`])}
            className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold tracking-wide uppercase"
          >
            <Plus className="size-4" /> Add Gate
          </button>
          <button
            onClick={() => toast.success("Gates saved")}
            className="border-primary/40 text-primary hover:bg-primary-soft flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold tracking-wide uppercase"
          >
            <Check className="size-4" /> Save Gates
          </button>
        </div>
      </section>
    </div>
  );
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={[
        "relative h-8 w-15 shrink-0 rounded-full transition-colors",
        on ? "gradient-saffron" : "bg-muted",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 size-6 rounded-full bg-card shadow transition-all",
          on ? "left-8" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}
