import { Link, useParams } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { notifyError, notifySuccess } from "@forge/notifications";
import { useProductQuery, useUpdateProductStatusMutation } from "@forge/query";
import { useUserPreferencesStore } from "@forge/state";
import { formatCurrency } from "@forge/utils";
import { Button, Card, ErrorState, PageHeader, Skeleton, StatusBadge } from "@forge/ui";

export function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const product = useProductQuery(productId);
  const mutation = useUpdateProductStatusMutation();
  const markProductViewed = useUserPreferencesStore((state) => state.markProductViewed);

  useEffect(() => {
    markProductViewed(productId);
  }, [markProductViewed, productId]);

  if (product.isLoading) {
    return <Skeleton className="h-64" />;
  }

  if (product.isError || !product.data) {
    return <ErrorState title="Product could not be loaded" />;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={product.data.name}
        description="Loaded directly from the route param. This URL can be opened without visiting the product list first."
        actions={<Link to="/products" className="text-sm font-medium text-slate-700">Back to products</Link>}
      />
      <Card className="grid gap-4 md:grid-cols-2">
        <Detail label="SKU" value={product.data.sku} />
        <Detail label="Category" value={product.data.category} />
        <Detail label="Status" value={<StatusBadge status={product.data.status} />} />
        <Detail label="Price" value={formatCurrency(product.data.price)} />
        <Detail label="Inventory" value={product.data.inventory} />
        <Detail label="Rating" value={product.data.rating} />
        <div className="md:col-span-2">
          <Button
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate(
                { productId, status: product.data.status === "active" ? "draft" : "active" },
                { onSuccess: () => notifySuccess("Product updated."), onError: notifyError }
              )
            }
          >
            Toggle status with optimistic update
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase text-slate-500">{label}</div>
      <div className="mt-1 text-sm text-slate-950">{value}</div>
    </div>
  );
}
