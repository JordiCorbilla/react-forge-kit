import { createRootRoute, createRoute } from "@tanstack/react-router";
import { AppShell } from "./app/AppShell";
import { DashboardPage } from "./routes/DashboardPage";
import { ProductDetailPage } from "./routes/ProductDetailPage";
import { ProductsPage } from "./routes/ProductsPage";
import { JobsPage } from "./routes/JobsPage";
import { RealtimePage } from "./routes/RealtimePage";
import { GridPage } from "./routes/GridPage";

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
