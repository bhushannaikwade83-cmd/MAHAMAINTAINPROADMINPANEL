import { createFileRoute } from "@tanstack/react-router";
import { Quote, ImageIcon } from "lucide-react";
import { complaints, society } from "@/data/society";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Manage society complaints raised by members with status, assignee, photos and resolution notes.",
      },
      { property: "og:title", content: "Complaints — Maha Maintain Pro" },
      { property: "og:description", content: "Track and resolve society member complaints." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComplaintsPage,
});

const statusTone: Record<string, string> = {
  Open: "bg-primary-soft text-primary",
  Resolved: "bg-success/12 text-success",
  Closed: "bg-muted text-muted-foreground",
};

function ComplaintsPage() {
  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Complaints</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {society.name} · <span className="text-success font-bold">Enabled society-wide</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide uppercase">
            Complaints
          </button>
          <button className="text-primary hover:bg-primary-soft rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide uppercase">
            Access
          </button>
        </div>
      </header>

      <section className="surface-card mb-6 flex flex-wrap items-end gap-5 p-6">
        <label className="block min-w-[180px]">
          <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
            Status
          </span>
          <select className="input-base">
            <option>All statuses</option>
            <option>Open</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </label>
        <label className="block min-w-[180px]">
          <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
            Assigned To
          </span>
          <select className="input-base">
            <option>Anyone</option>
            <option>Demo Admin</option>
          </select>
        </label>
        <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110">
          Filter
        </button>
        <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-xl border px-6 py-2.5 text-sm font-bold tracking-wide uppercase">
          Reset
        </button>
        <p className="text-muted-foreground ml-auto text-sm">{complaints.length} complaint(s)</p>
      </section>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-muted/60 text-primary text-left text-xs font-bold tracking-wide uppercase">
              <tr>
                <th className="px-6 py-3.5">Complaint</th>
                <th className="px-6 py-3.5">Raised By</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Assigned To</th>
                <th className="px-6 py-3.5">Photos</th>
                <th className="px-6 py-3.5">Raised</th>
                <th className="px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 align-top">
                  <td className="px-6 py-4">
                    <p className="font-bold">{c.title}</p>
                    <p className="text-muted-foreground text-sm">{c.desc}</p>
                    {c.note && (
                      <p className="text-primary mt-1 flex items-center gap-1 text-sm font-semibold">
                        <Quote className="size-3.5" /> {c.note}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">{c.by}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${statusTone[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4">{c.assigned}</td>
                  <td className="px-6 py-4">
                    {c.photos > 0 ? (
                      <div className="flex gap-2">
                        {Array.from({ length: c.photos }).map((_, i) => (
                          <span
                            key={i}
                            className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-lg"
                          >
                            <ImageIcon className="size-4" />
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 whitespace-nowrap">{c.at}</td>
                  <td className="px-6 py-4">
                    <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-lg border px-4 py-2 text-xs font-bold tracking-wide uppercase">
                      Manage
                    </button>
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
