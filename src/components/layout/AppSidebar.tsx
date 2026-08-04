import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  BookOpenText,
  Settings2,
  Megaphone,
  UserCog,
  DoorOpen,
  
  TriangleAlert,
  Landmark,
  PhoneCall,
  History,
  Bell,
  Building2,
  LogOut,
  ChevronDown,
} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { society } from "@/data/society";

const management = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/members", label: "Members", icon: Users },
  { to: "/vouchers", label: "Vouchers", icon: ReceiptText },
  { to: "/ledgers", label: "Ledger Accounts", icon: BookOpenText },
  { to: "/settings", label: "Society Settings", icon: Settings2 },
  { to: "/notify", label: "Send Notification", icon: Megaphone },
  { to: "/staff", label: "Staff", icon: UserCog },
  { to: "/visitors", label: "Visitor Register", icon: DoorOpen },
  { to: "/complaints", label: "Complaints", icon: TriangleAlert },
  { to: "/committee", label: "Managing Committee", icon: Landmark },
  { to: "/emergency", label: "Emergency Contacts", icon: PhoneCall },
] as const;

const account = [
  { to: "/profile", label: "My Profile", icon: UserCog },
  { to: "/login-history", label: "Login History", icon: History },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const item = (to: string, label: string, Icon: typeof Users) => {
    const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
    return (
      <Link
        key={to}
        to={to}
        className={[
          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 hover:translate-x-1",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
            : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        ].join(" ")}
      >
        <span
          className={[
            "absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full transition-all duration-300",
            active ? "h-6 bg-sidebar-primary" : "h-2 bg-transparent group-hover:h-5 group-hover:bg-sidebar-primary/50",
          ].join(" ")}
        />
        <Icon className="size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
        <span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="gradient-sidebar text-sidebar-foreground sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <img
          src={logo.url}
          alt="Maha Maintain Pro logo"
          className="bg-card size-10 shrink-0 rounded-xl object-contain shadow-lg transition-transform duration-500 hover:scale-105 hover:rotate-3"
        />
        <span className="font-display text-lg leading-tight font-bold tracking-tight">
          Maha Maintain Pro
        </span>
      </div>

      <div className="px-4">
        <button className="border-sidebar-border bg-sidebar-accent/70 hover:bg-sidebar-accent flex w-full items-center gap-2 rounded-xl border px-3 py-3 text-left transition-colors">
          <Building2 className="text-sidebar-primary size-4 shrink-0" />
          <span className="truncate text-sm font-semibold">{society.name}</span>
          <ChevronDown className="ml-auto size-4 opacity-60" />
        </button>
      </div>

      <nav className="soft-scroll mt-6 flex-1 overflow-y-auto px-3 pb-4">
        <p className="text-sidebar-foreground/45 px-3 pb-2 text-[11px] font-bold tracking-[0.14em] uppercase">
          Management
        </p>
        <div className="space-y-1">{management.map((m) => item(m.to, m.label, m.icon))}</div>

        <p className="text-sidebar-foreground/45 px-3 pt-6 pb-2 text-[11px] font-bold tracking-[0.14em] uppercase">
          Account
        </p>
        <div className="space-y-1">{account.map((m) => item(m.to, m.label, m.icon))}</div>
      </nav>

      <div className="border-sidebar-border space-y-3 border-t p-4">
        <div className="bg-sidebar-accent/70 flex items-center gap-3 rounded-xl p-3">
          <span className="bg-sidebar-primary/20 text-sidebar-primary flex size-9 items-center justify-center rounded-lg">
            <Bell className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Notifications</p>
            <p className="text-sidebar-foreground/55 truncate text-xs">No new notifications</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-1">
          <span className="bg-sidebar-primary text-sidebar-primary-foreground btn-press flex size-9 shadow-md items-center justify-center rounded-full text-sm font-bold">
            D
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{society.admin}</p>
            <p className="text-sidebar-foreground/55 truncate text-xs">Society Admin</p>
          </div>
          <button
            aria-label="Sign out"
            onClick={() => {
              try {
                window.localStorage.removeItem("mmp-admin");
              } catch {
                /* ignore */
              }
              window.location.href = "/login";
            }}
            className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg p-2 transition-colors"
          >
            <LogOut className="size-4" />
          </button>

        </div>
      </div>
    </aside>
  );
}
