import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { notifyInfo, notifySuccess } from "@forge/notifications";
import { useStartBackgroundJobMutation } from "@forge/query";
import { Button, Card, LoadingButton, PageHeader, StatusBadge } from "@forge/ui";

export function DashboardPage() {
  const startJob = useStartBackgroundJobMutation();

  const generateReport = () => {
    startJob.mutate("product-report", {
      onSuccess: () => notifySuccess("Product report started."),
      onError: (error) => notifyInfo(String(error))
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Operations Demo"
        description="Reusable React patterns for product detail links, background jobs, grid state, realtime updates, notifications, and query invalidation."
        actions={
          <LoadingButton loading={startJob.isPending} onClick={generateReport}>
            <Play className="h-4 w-4" />
            Generate product report
          </LoadingButton>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Server state", "TanStack Query owns API data, retries, cache updates, and invalidation."],
          ["UI state", "Zustand owns density, selection, shell preferences, and recent products."],
          ["URL state", "Search, status, page, and product ids stay shareable through the address bar."]
        ].map(([title, body]) => (
          <Card key={title}>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{body}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">Copyable examples</h2>
            <p className="mt-1 text-sm text-slate-600">
              The demo is organized around recipes that can be moved into a Vite or Next.js project.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="active" />
            <StatusBadge status="running" />
            <StatusBadge status="completed" />
          </div>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["/products", "Open products with URL filters"],
          ["/products/product-3", "Open a product detail deep link"],
          ["/jobs", "Watch a background job progress"],
          ["/grid", "Explore AG Grid state and row actions"]
        ].map(([to, label]) => (
          <Button key={to} variant="secondary" className="justify-between" type="button">
            <Link to={to} className="flex w-full items-center justify-between">
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
