import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "@/components/layout/AppShell";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-primary text-7xl font-bold">404</h1>
        <h2 className="text-foreground mt-4 text-xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-foreground text-xl font-semibold tracking-tight">
          This page didn't load
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="gradient-saffron text-primary-foreground btn-press shadow-glow sheen inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Try again
          </button>
          <a
            href="/"
            className="border-input bg-background text-foreground hover:bg-accent inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dashboard — MAHAMAINTAINPRO" },
      {
        name: "description",
        content: "Live overview of collections, dues, events, polls and notifications for Sunrise Residency CHS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Dashboard — MAHAMAINTAINPRO" },
      { name: "twitter:title", content: "Dashboard — MAHAMAINTAINPRO" },
      { property: "og:description", content: "Live overview of collections, dues, events, polls and notifications for Sunrise Residency CHS." },
      { name: "twitter:description", content: "Live overview of collections, dues, events, polls and notifications for Sunrise Residency CHS." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7725f9de-bde9-4f4d-8e29-03405bc05030" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7725f9de-bde9-4f4d-8e29-03405bc05030" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLogin = pathname === "/login";
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const authed = typeof window !== "undefined" && !!window.localStorage.getItem("mmp-admin");
    if (!authed && !isLogin) {
      void router.navigate({ to: "/login" });
      return;
    }
    if (authed && isLogin) {
      void router.navigate({ to: "/" });
      return;
    }
    setChecked(true);
  }, [isLogin, pathname, router]);

  if (isLogin) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    );
  }

  if (!checked) {
    return <div className="bg-background min-h-screen" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </AppShell>
      <Toaster />
    </QueryClientProvider>
  );
}
