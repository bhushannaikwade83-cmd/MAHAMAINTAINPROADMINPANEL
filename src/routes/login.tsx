import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn, Lock, Mail, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

const DEMO_EMAIL = "demo@test.com";
const DEMO_PASSWORD = "Demo@133";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Maha Maintain Pro Admin Panel" },
      {
        name: "description",
        content:
          "Sign in to the Maha Maintain Pro admin panel to manage your housing society members, dues and notices.",
      },
      { property: "og:title", content: "Login — Maha Maintain Pro Admin Panel" },
      {
        property: "og:description",
        content: "Secure admin sign-in for the Maha Maintain Pro housing society management panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Invalid email or password. Try the demo credentials below.");
      return;
    }
    setBusy(true);
    try {
      window.localStorage.setItem("mmp-admin", email.trim().toLowerCase());
    } catch {
      /* ignore */
    }
    void router.navigate({ to: "/" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="animate-glow bg-primary/20 pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="animate-glow bg-[#FF8534]/25 pointer-events-none absolute -right-24 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

      <div className="animate-fade-up relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border/60 bg-card shadow-glow lg:grid-cols-2">
        {/* Brand panel */}
        <div className="gradient-sidebar text-sidebar-foreground relative hidden flex-col justify-between p-10 lg:flex">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white p-1.5">
              <img src={logo.url} alt="Maha Maintain Pro logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-lg leading-tight font-bold">Maha Maintain Pro</p>
              <p className="text-xs opacity-80">Admin Panel</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl leading-tight font-bold">
              Society management,
              <br /> simplified.
            </h2>
            <p className="mt-3 max-w-xs text-sm opacity-85">
              Maintenance, members, vouchers, complaints aur notices — sab kuch ek hi dashboard se.
            </p>
          </div>
          <ul className="space-y-2 text-sm opacity-90">
            {["Real-time collection tracking", "Digital ledgers & vouchers", "Instant member notifications"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Form panel */}
        <div className="p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--saffron-50)] p-2">
              <img src={logo.url} alt="Maha Maintain Pro logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <h1 className="from-foreground to-primary bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            Maha Maintain Pro Admin Panel
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Login to continue managing your society.</p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@test.com"
                  className="input-base w-full pl-9"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base w-full pr-10 pl-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="text-muted-foreground flex items-center gap-2">
                <input type="checkbox" className="accent-primary h-4 w-4 rounded" defaultChecked />
                Remember me
              </label>
              <button type="button" className="text-primary font-semibold hover:underline">
                Forgot password?
              </button>
            </div>

            {error && (
              <p className="bg-destructive/10 text-destructive rounded-xl px-3 py-2 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="gradient-saffron btn-press sheen shadow-glow flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white disabled:opacity-70"
            >
              <LogIn className="h-4 w-4" />
              {busy ? "Signing in…" : "Login"}
            </button>
          </form>

          <div className="bg-[var(--saffron-50)] border-primary/20 mt-6 rounded-xl border p-4 text-sm">
            <p className="text-primary font-semibold">Demo credentials</p>
            <p className="text-muted-foreground mt-1">
              Email: <span className="text-foreground font-semibold">{DEMO_EMAIL}</span>
              <br />
              Password: <span className="text-foreground font-semibold">{DEMO_PASSWORD}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_EMAIL);
                setPassword(DEMO_PASSWORD);
              }}
              className="text-primary mt-2 text-xs font-bold hover:underline"
            >
              Fill demo credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
