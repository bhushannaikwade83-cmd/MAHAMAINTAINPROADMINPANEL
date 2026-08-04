import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  CalendarDays,
  Megaphone,
  TriangleAlert,
  ListChecks,
  Send,
  Users,
  Home,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/AppShell";

export const Route = createFileRoute("/notify")({
  head: () => ({
    meta: [
      { title: "Send Notification — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Broadcast general updates, events, emergencies and polls to all members, a wing or a single flat.",
      },
      { property: "og:title", content: "Send Notification — Maha Maintain Pro" },
      {
        property: "og:description",
        content: "Broadcast messages to society members by wing or flat.",
      },
    ],
  }),
  component: NotifyPage,
});

const types = [
  { id: "General", icon: MessageCircle, cls: "border-success/50 text-success bg-success/8" },
  { id: "Event", icon: CalendarDays, cls: "border-info/50 text-info bg-info/8" },
  { id: "Update", icon: Megaphone, cls: "border-warning/60 text-warning-foreground bg-warning/15" },
  { id: "Emergency", icon: TriangleAlert, cls: "border-destructive/50 text-destructive bg-destructive/8" },
  { id: "Poll", icon: ListChecks, cls: "border-primary/50 text-primary bg-primary-soft" },
];

const audiences = [
  { id: "all", icon: Users, title: "All Members", desc: "Every active member in this society" },
  { id: "wing", icon: Home, title: "Specific Wing", desc: "All members in a selected wing" },
  { id: "flat", icon: Building2, title: "Specific Flat", desc: "Only one particular flat" },
];

function NotifyPage() {
  const [type, setType] = useState("General");
  const [audience, setAudience] = useState("all");
  const [message, setMessage] = useState("");

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Send Notification" subtitle="Broadcast a message to society members" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(`${type} notification sent`);
        }}
        className="surface-card space-y-7 p-6 sm:p-8"
      >
        <div>
          <p className="mb-3 text-sm font-bold">Notification Type</p>
          <div className="flex flex-wrap gap-3">
            {types.map((t) => {
              const active = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={[
                    "flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all",
                    active ? t.cls : "border-border text-muted-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  <t.icon className="size-4" />
                  {t.id}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="title">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            id="title"
            required
            placeholder="e.g. Water Supply Disruption, AGM on Sunday"
            className="border-input focus:ring-ring/40 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="msg">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="msg"
            required
            rows={4}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write the full notification message here..."
            className="border-input focus:ring-ring/40 w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          />
          <p className="text-muted-foreground mt-1 text-right text-xs">{message.length} / 500</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="photo">
            Attach Photo <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="border-input file:bg-primary-soft file:text-primary w-full rounded-xl border px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-bold"
          />
          <p className="text-muted-foreground mt-1 text-xs">
            JPEG/PNG/GIF/WEBP · Max 5 MB · Members see a "View Photo" button
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold" htmlFor="link">
            Attach Link <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            id="link"
            type="url"
            placeholder="https://..."
            className="border-input focus:ring-ring/40 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-bold">Send To</p>
          <div className="space-y-3">
            {audiences.map((a) => {
              const active = audience === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAudience(a.id)}
                  className={[
                    "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors",
                    active ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex size-5 items-center justify-center rounded-full border-2",
                      active ? "border-primary" : "border-muted-foreground/40",
                    ].join(" ")}
                  >
                    {active && <span className="bg-primary size-2.5 rounded-full" />}
                  </span>
                  <span className="bg-card flex size-10 items-center justify-center rounded-xl">
                    <a.icon className="text-primary size-5" />
                  </span>
                  <span>
                    <span className="block font-bold">{a.title}</span>
                    <span className="text-muted-foreground block text-sm">{a.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold hover:brightness-110"
        >
          <Send className="size-5" /> Send Notification
        </button>
      </form>
    </div>
  );
}
