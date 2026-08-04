import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { emergencyContacts, society } from "@/data/society";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Contacts — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Add hospital, police, plumber and electrician contacts so residents can dial them from the mobile app.",
      },
      { property: "og:title", content: "Emergency Contacts — Maha Maintain Pro" },
      { property: "og:description", content: "Society emergency and utility contact numbers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Emergency Contacts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {society.name} · hospital, police, plumber, electrician &amp; more
          </p>
        </div>
        <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide uppercase hover:brightness-110">
          <Plus className="size-4" /> Add Contact
        </button>
      </header>

      {emergencyContacts.length === 0 ? (
        <div className="surface-card text-muted-foreground px-8 py-16 text-center text-lg">
          No emergency contacts yet. Add the society's hospital, police station, plumber,
          electrician and so on — residents will see them in the mobile app.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {emergencyContacts.map((c) => (
            <a
              key={c.label}
              href={`tel:${c.value.replace(/\s/g, "")}`}
              className="surface-card hover:border-primary/40 flex items-center gap-4 p-5"
            >
              <div className="min-w-0">
                <p className="truncate font-bold">{c.label}</p>
                <p className="text-muted-foreground text-sm">{c.type}</p>
              </div>
              <p className="font-display ml-auto text-lg font-bold">{c.value}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
