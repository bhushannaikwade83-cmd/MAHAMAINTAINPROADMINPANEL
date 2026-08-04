import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="bg-background flex min-h-screen">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main key={pathname} className="animate-fade-up min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {breadcrumb && (
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide">
            {breadcrumb.join("  ›  ")}
          </p>
        )}
        <h1 className="from-foreground to-primary bg-gradient-to-br bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions}
    </header>
  );
}
