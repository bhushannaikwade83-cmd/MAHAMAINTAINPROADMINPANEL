import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, Search, KeyRound, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/AppShell";
import { staff } from "@/data/society";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Management — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Manage society staff accounts, roles, assigned gates and app access for guards and housekeeping.",
      },
      { property: "og:title", content: "Staff Management — Maha Maintain Pro" },
      { property: "og:description", content: "Manage staff accounts, roles and gate assignments." },
    ],
  }),
  component: StaffPage,
});

function StaffPage() {
  return (
    <div>
      <PageHeader
        title="Staff Management"
        subtitle="Create app logins for guards, housekeeping and other society staff."
        actions={
          <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold hover:brightness-110">
            <UserPlus className="size-4" /> Add Staff
          </button>
        }
      />

      <div className="surface-card overflow-hidden">
        <div className="border-border flex flex-wrap items-center gap-3 border-b p-5">
          <div className="border-input focus-within:ring-ring/40 flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
            <Search className="text-muted-foreground size-4" />
            <input
              placeholder="Search staff by name or email..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <select className="border-input rounded-xl border px-3 py-2 text-sm font-medium">
            <option>All Roles</option>
            <option>Security Guard</option>
            <option>Housekeeping</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-muted/60 text-muted-foreground text-left text-xs font-bold tracking-wide uppercase">
              <tr>
                <th className="px-6 py-3">Staff</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Gate</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {staff.map((s) => (
                <tr key={s.email} className="hover:bg-muted/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex size-10 items-center justify-center rounded-xl text-sm font-bold">
                        {s.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-muted-foreground text-xs">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-info/12 text-info rounded-md px-2.5 py-1 text-xs font-bold">
                      {s.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{s.gate}</td>
                  <td className="px-6 py-4">
                    <span className="bg-success/12 text-success rounded-md px-2.5 py-1 text-xs font-bold">
                      {s.status}
                    </span>
                    {s.note && (
                      <p className="text-muted-foreground mt-1 text-xs italic">{s.note}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <IconBtn label="Reset password" icon={KeyRound} />
                      <IconBtn label="Edit staff" icon={Pencil} />
                      <IconBtn label="Remove staff" icon={Trash2} danger />
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

function IconBtn({
  label,
  icon: Icon,
  danger,
}: {
  label: string;
  icon: typeof Pencil;
  danger?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={[
        "border-input rounded-lg border p-2 transition-colors",
        danger ? "hover:bg-destructive/10 hover:text-destructive" : "hover:bg-accent",
      ].join(" ")}
    >
      <Icon className="size-4" />
    </button>
  );
}
