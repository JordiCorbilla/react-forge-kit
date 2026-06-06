import { Link, Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { Database, Grid2X2, Home, Radio, Rows3 } from "lucide-react";
import { DashboardPage } from "./routes/DashboardPage";
import { ProductDetailPage } from "./routes/ProductDetailPage";
import { ProductsPage } from "./routes/ProductsPage";
import { JobsPage } from "./routes/JobsPage";
import { RealtimePage } from "./routes/RealtimePage";
import { GridPage } from "./routes/GridPage";

function AppShell() {
  const nav = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/products", label: "Products", icon: Database },
    { to: "/jobs", label: "Jobs", icon: Rows3 },
    { to: "/realtime", label: "Realtime", icon: Radio },
    { to: "/grid", label: "Grid", icon: Grid2X2 }
  ];

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-slate-200 bg-white p-4 md:block">
        <div className="text-lg font-semibold tracking-normal">react-forge-kit</div>
        <nav className="mt-6 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              activeProps={{ className: "bg-slate-950 text-white hover:bg-slate-950" }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="mx-auto max-w-6xl px-4 py-6 md:ml-60 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}

const rootRoute = createRootRoute({ component: AppShell });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: DashboardPage });
const productsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/products", component: ProductsPage });
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetailPage
});
const jobsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/jobs", component: JobsPage });
const realtimeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/realtime", component: RealtimePage });
const gridRoute = createRoute({ getParentRoute: () => rootRoute, path: "/grid", component: GridPage });

export const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  jobsRoute,
  realtimeRoute,
  gridRoute
]);
