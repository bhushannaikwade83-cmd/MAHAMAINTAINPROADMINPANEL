import { createFileRoute } from "@tanstack/react-router";
import { Plus, CalendarRange } from "lucide-react";
import { committee, committeeTerm, society } from "@/data/society";

export const Route = createFileRoute("/committee")({
  head: () => ({
    meta: [
      { title: "Managing Committee — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Society office bearers by term — president, committee members, their flats, phones and emails.",
      },
      { property: "og:title", content: "Managing Committee — Maha Maintain Pro" },
      { property: "og:description", content: "Society managing committee office bearers by term." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommitteePage,
});

function CommitteePage() {
  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Managing Committee</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {society.name} · office bearers by term
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110">
            <Plus className="size-4" /> Add Member
          </button>
          <button className="text-primary hover:bg-primary-soft rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide uppercase">
            + New Term
          </button>
        </div>
      </header>

      <section className="surface-card mb-6 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-primary text-[11px] font-bold tracking-[0.12em] uppercase">
            Term
          </span>
          <span className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
            <CalendarRange className="size-4" />
            {committeeTerm.from} – {committeeTerm.to}
            {committeeTerm.current && (
              <span className="bg-card/25 rounded-md px-2 py-0.5 text-[11px]">Current</span>
            )}
          </span>
        </div>
        <div className="border-border mt-5 flex flex-wrap items-center gap-3 border-t pt-5">
          <p className="text-muted-foreground text-sm">
            {committeeTerm.from} → {committeeTerm.to} · {committee.length} member(s)
          </p>
          <div className="ml-auto flex gap-3">
            <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-xl border px-5 py-2 text-xs font-bold tracking-wide uppercase">
              Edit Term
            </button>
            <button className="border-destructive/40 text-destructive hover:bg-destructive/10 rounded-xl border px-5 py-2 text-xs font-bold tracking-wide uppercase">
              Delete Term
            </button>
          </div>
        </div>
      </section>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-muted/60 text-primary text-left text-xs font-bold tracking-wide uppercase">
              <tr>
                <th className="px-6 py-3.5">#</th>
                <th className="px-6 py-3.5">Photo</th>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Designation</th>
                <th className="px-6 py-3.5">Wing / Flat</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {committee.map((m, i) => (
                <tr key={m.name} className="hover:bg-muted/40">
                  <td className="text-muted-foreground px-6 py-4">{i}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-soft text-primary flex size-10 items-center justify-center rounded-full text-sm font-bold">
                      {m.name[0]}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">{m.name}</td>
                  <td className="px-6 py-4">{m.post}</td>
                  <td className="px-6 py-4">{m.flat}</td>
                  <td className="px-6 py-4">{m.phone}</td>
                  <td className="px-6 py-4">{m.email}</td>
                  <td className="px-6 py-4">
                    <span className="bg-success/12 text-success rounded-md px-2.5 py-1 text-xs font-bold">
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-lg border px-4 py-2 text-xs font-bold tracking-wide uppercase">
                        Edit
                      </button>
                      <button className="border-destructive/40 text-destructive hover:bg-destructive/10 rounded-lg border px-4 py-2 text-xs font-bold tracking-wide uppercase">
                        Remove
                      </button>
                    </div>
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
