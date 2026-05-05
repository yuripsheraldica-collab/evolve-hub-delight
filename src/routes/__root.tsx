import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Instituto Evolução — Área do Paciente" },
      { name: "description", content: "Acompanhe sua evolução clínica, documentos e receitas no Instituto Evolução." },
      { name: "theme-color", content: "#0f1c2e" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Evolução" },
      { name: "mobile-web-app-capable", content: "yes" },
      { property: "og:title", content: "Instituto Evolução — Área do Paciente" },
      { property: "og:description", content: "Acompanhe sua evolução clínica, documentos e receitas no Instituto Evolução." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Instituto Evolução — Área do Paciente" },
      { name: "twitter:description", content: "Acompanhe sua evolução clínica, documentos e receitas no Instituto Evolução." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/caf50140-05ea-4984-874d-858dba3eebaa/id-preview-1e7a1281--3c63ca1e-a67e-42a3-b677-0464dc28c911.lovable.app-1777944916850.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/caf50140-05ea-4984-874d-858dba3eebaa/id-preview-1e7a1281--3c63ca1e-a67e-42a3-b677-0464dc28c911.lovable.app-1777944916850.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", href: "/icon-192.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
  return <Outlet />;
}
