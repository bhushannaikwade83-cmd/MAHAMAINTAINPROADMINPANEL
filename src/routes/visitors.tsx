import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { visitors } from "@/data/society";
import { society } from "@/data/society";

export const Route = createFileRoute("/visitors")({
  head: () => ({
    meta: [
      { title: "Visitor Register — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Gate-wise visitor check-in and check-out register with live inside count, filters and photos.",
      },
      { property: "og:title", content: "Visitor Register — Maha Maintain Pro" },
      { property: "og:description", content: "Gate-wise visitor check-in and check-out log." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VisitorsPage,
});

const typeTone: Record<string, string> = {
  "Visitor Pass": "bg-success/12 text-success",
  Helper: "bg-primary-soft text-primary",
  "Walk-in": "bg-info/12 text-info",
};

function VisitorsPage() {
  const inside = visitors.filter((v) => v.status === "Inside").length;

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Visitor Register</h1>
          <p className="text-muted-foreground mt-1 text-sm">{society.name}</p>
        </div>
        <div className="flex gap-3">
          <Counter value={inside} label="Inside Now" tone="bg-primary-soft text-primary" />
          <Counter value={0} label="Today" tone="bg-success/12 text-success" />
        </div>
      </header>

      <section className="surface-card mb-6 p-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Field label="Status">
            <select className="input-base">
              <option>All visitors</option>
              <option>Inside</option>
              <option>Left</option>
            </select>
          </Field>
          <Field label="From">
            <input type="date" className="input-base" />
          </Field>
          <Field label="To">
            <input type="date" className="input-base" />
          </Field>
          <Field label="Type">
            <select className="input-base">
              <option>All types</option>
              <option>Visitor Pass</option>
              <option>Helper</option>
              <option>Walk-in</option>
            </select>
          </Field>
          <Field label="Gate">
            <select className="input-base">
              <option>All gates</option>
              <option>Gate1</option>
              <option>Gate2</option>
            </select>
          </Field>
          <Field label="Search">
            <input placeholder="Name / phone / flat" className="input-base" />
          </Field>
          <div className="flex items-end gap-3">
            <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110">
              Filter
            </button>
            <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-xl border px-6 py-2.5 text-sm font-bold tracking-wide uppercase">
              Reset
            </button>
          </div>
        </div>
      </section>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-muted/60 text-primary text-left text-xs font-bold tracking-wide uppercase">
              <tr>
                <th className="px-5 py-3.5">Visitor</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Phone</th>
                <th className="px-5 py-3.5">Purpose</th>
                <th className="px-5 py-3.5">Flat</th>
                <th className="px-5 py-3.5">Gate</th>
                <th className="px-5 py-3.5">Check-in</th>
                <th className="px-5 py-3.5">Check-out</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Photo</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {visitors.map((v, i) => (
                <tr key={i} className="hover:bg-muted/40">
                  <td className="px-5 py-4 font-bold">{v.name}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-bold ${typeTone[v.type] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {v.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">{v.phone}</td>
                  <td className="px-5 py-4">{v.purpose}</td>
                  <td className="px-5 py-4">{v.flat}</td>
                  <td className="text-muted-foreground px-5 py-4">{v.gate}</td>
                  <td className="px-5 py-4">{v.inAt}</td>
                  <td className="text-muted-foreground px-5 py-4">{v.outAt}</td>
                  <td className="px-5 py-4">
                    <span
                      className={[
                        "rounded-md px-2.5 py-1 text-xs font-bold",
                        v.status === "Inside"
                          ? "bg-primary-soft text-primary"
                          : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {v.photo ? (
                      <span className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-lg">
                        <ImageIcon className="size-4" />
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Counter({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <div className={`rounded-2xl px-7 py-3 text-center ${tone}`}>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-[10px] font-bold tracking-[0.14em] uppercase">{label}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
