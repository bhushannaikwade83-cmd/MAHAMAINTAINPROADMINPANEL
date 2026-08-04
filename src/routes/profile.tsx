import { createFileRoute } from "@tanstack/react-router";
import { Camera, Pencil, Lock } from "lucide-react";
import { toast } from "sonner";
import { society } from "@/data/society";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Maha Maintain Pro" },
      {
        name: "description",
        content:
          "Update your society admin display name, mobile number, bio and account password.",
      },
      { property: "og:title", content: "My Profile — Maha Maintain Pro" },
      { property: "og:description", content: "Manage your society admin profile and password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="surface-card h-fit overflow-hidden">
        <div className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen flex flex-col items-center px-6 py-10">
          <div className="relative">
            <span className="bg-card/25 font-display flex size-28 items-center justify-center rounded-full text-5xl font-bold">
              D
            </span>
            <button
              aria-label="Change photo"
              className="bg-card text-primary absolute right-1 bottom-1 rounded-full p-2 shadow"
            >
              <Camera className="size-4" />
            </button>
          </div>
          <h1 className="font-display mt-5 text-2xl font-bold">{society.admin}</h1>
          <p className="text-primary-foreground/80 text-sm">Society Admin</p>
        </div>
        <p className="text-muted-foreground py-6 text-center text-sm">Complete your profile below</p>
      </aside>

      <div className="space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }}
          className="surface-card overflow-hidden"
        >
          <header className="border-border flex items-center gap-2 border-b px-6 py-4">
            <Pencil className="text-primary size-5" />
            <h2 className="font-bold">Edit Profile</h2>
          </header>
          <div className="space-y-5 p-6">
            <Field label="Display Name">
              <input defaultValue={society.admin} className="input-base" />
            </Field>
            <Field label="Mobile Number">
              <input placeholder="Your mobile number" className="input-base" />
            </Field>
            <Field label="Bio">
              <textarea rows={4} placeholder="A short bio about yourself" className="input-base" />
            </Field>
            <button className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen rounded-full px-8 py-3 text-sm font-bold tracking-wide uppercase hover:brightness-110">
              Save Changes
            </button>
          </div>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Password updated");
          }}
          className="surface-card overflow-hidden"
        >
          <header className="border-border flex items-center gap-2 border-b px-6 py-4">
            <Lock className="text-primary size-5" />
            <h2 className="font-bold">Change Password</h2>
          </header>
          <div className="p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="New Password">
                <input type="password" placeholder="Min 8 characters" className="input-base" />
              </Field>
              <Field label="Confirm Password">
                <input type="password" placeholder="Repeat new password" className="input-base" />
              </Field>
            </div>
            <button className="bg-foreground text-background mt-6 rounded-full px-8 py-3 text-sm font-bold tracking-wide uppercase hover:brightness-110">
              Update Password
            </button>
          </div>
        </form>
      </div>
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
