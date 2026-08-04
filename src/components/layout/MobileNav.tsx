import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { society } from "@/data/society";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/members", label: "Members" },
  { to: "/vouchers", label: "Vouchers" },
  { to: "/ledgers", label: "Ledger Accounts" },
  { to: "/settings", label: "Society Settings" },
  { to: "/notify", label: "Send Notification" },
  { to: "/staff", label: "Staff" },
  { to: "/visitors", label: "Visitor Register" },
  { to: "/complaints", label: "Complaints" },
  { to: "/committee", label: "Managing Committee" },
  { to: "/emergency", label: "Emergency Contacts" },
  { to: "/profile", label: "My Profile" },
  { to: "/login-history", label: "Login History" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="gradient-sidebar text-sidebar-foreground sticky top-0 z-40 lg:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={logo.url}
          alt="Maha Maintain Pro logo"
          className="bg-card size-9 shrink-0 rounded-lg object-contain"
        />
        <div className="min-w-0">
          <p className="font-display text-base leading-tight font-bold">Maha Maintain Pro</p>
          <p className="text-sidebar-foreground/60 truncate text-xs">{society.name}</p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="hover:bg-sidebar-accent ml-auto rounded-lg p-2"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-sidebar-border grid max-h-[70vh] gap-1 overflow-y-auto border-t px-3 py-3">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-lg px-3 py-2 text-sm",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/75",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
