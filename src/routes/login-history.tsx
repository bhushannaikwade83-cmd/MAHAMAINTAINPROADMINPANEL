import { createFileRoute } from "@tanstack/react-router";
import { loginHistory } from "@/data/society";

export const Route = createFileRoute("/login-history")({
  head: () => ({
    meta: [
      { title: "My Login History — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Audit trail of your account logins and logouts with IP address, browser, device and timestamp.",
      },
      { property: "og:title", content: "My Login History — Maha Maintain Pro" },
      { property: "og:description", content: "Login and logout audit trail for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginHistoryPage,
});

function LoginHistoryPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">My Login History</h1>
        <p className="text-muted-foreground mt-1 text-sm">50 records · Your account only</p>
      </header>

      <section className="surface-card mb-6 flex flex-wrap items-end gap-5 p-6">
        <label className="block min-w-[220px] flex-1">
          <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
            Event
          </span>
          <select className="input-base">
            <option>All Events</option>
            <option>Login</option>
            <option>Logout</option>
          </select>
        </label>
        <label className="block min-w-[180px]">
          <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
            From
          </span>
          <input type="date" className="input-base" />
        </label>
        <label className="block min-w-[180px]">
          <span className="text-primary mb-2 block text-[11px] font-bold tracking-[0.12em] uppercase">
            To
          </span>
          <input type="date" className="input-base" />
        </label>
        <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-xl px-6 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110">
          Filter
        </button>
        <button className="border-primary/30 text-primary hover:bg-primary-soft hover:border-primary/60 btn-press rounded-xl border px-6 py-2.5 text-sm font-bold tracking-wide uppercase">
          Reset
        </button>
      </section>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-muted/60 text-primary text-left text-xs font-bold tracking-wide uppercase">
              <tr>
                <th className="px-6 py-3.5">#</th>
                <th className="px-6 py-3.5">Event</th>
                <th className="px-6 py-3.5">IP Address</th>
                <th className="px-6 py-3.5">Browser / Device</th>
                <th className="px-6 py-3.5">Note</th>
                <th className="px-6 py-3.5">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {loginHistory.map((l, i) => (
                <tr key={i} className="hover:bg-muted/40">
                  <td className="text-muted-foreground px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">
                    <span
                      className={[
                        "rounded-md px-2.5 py-1 text-xs font-bold",
                        l.event === "Login"
                          ? "bg-success/12 text-success"
                          : "bg-primary-soft text-primary",
                      ].join(" ")}
                    >
                      {l.event}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{l.ip}</td>
                  <td className="text-muted-foreground max-w-[420px] truncate px-6 py-4">
                    {l.device}
                  </td>
                  <td className="text-muted-foreground px-6 py-4">{l.note}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{l.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
