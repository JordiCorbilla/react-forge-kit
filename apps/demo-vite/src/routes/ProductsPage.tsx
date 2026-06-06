import { Link, useNavigate } from "@tanstack/react-router";
import type { ProductStatus } from "@forge/api";
import { notifyError, notifySuccess } from "@forge/notifications";
import { useProductsQuery, useUpdateProductStatusMutation } from "@forge/query";
import { useProductSelectionStore } from "@forge/state";
import { formatCurrency, parseProductFilters, toProductSearchParams } from "@forge/utils";
import { Button, Card, EmptyState, ErrorState, PageHeader, SearchInput, Skeleton, StatusBadge } from "@forge/ui";

export function ProductsPage() {
  const navigate = useNavigate();
  const filters = parseProductFilters(new URLSearchParams(window.location.search));
  const products = useProductsQuery(filters);
  const updateStatus = useUpdateProductStatusMutation();
  const { selectedProductIds, setSelectedProductIds } = useProductSelectionStore();

  const setFilter = (patch: Partial<typeof filters>) => {
    const params = toProductSearchParams({ ...filters, ...patch, page: patch.page ?? 1 });
    void navigate({ to: "/products", search: Object.fromEntries(params) });
  };

  const updateProduct = (productId: string, status: ProductStatus) => {
    updateStatus.mutate(
      { productId, status },
      {
        onSuccess: () => notifySuccess("Product status updated."),
        onError: notifyError
      }
    );
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Products"
        description="Search, filters, pagination, selected rows, optimistic status updates, and direct detail links."
      />

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <SearchInput
            aria-label="Search products"
            placeholder="Search products or SKUs"
            defaultValue={filters.search}
            onChange={(event) => setFilter({ search: event.target.value })}
          />
          <select
            aria-label="Status"
            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm"
            value={filters.status ?? "all"}
            onChange={(event) => setFilter({ status: event.target.value as ProductStatus | "all" })}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {products.isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : products.isError ? (
          <ErrorState title="Products could not be loaded" />
        ) : products.data.items.length === 0 ? (
          <EmptyState title="No products found" description="Adjust the URL filters or clear search." />
        ) : (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="w-10 px-3 py-2" />
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Price</th>
                  <th className="px-3 py-2">Inventory</th>
                  <th className="px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.data.items.map((product) => (
                  <tr key={product.id} className="bg-white">
                    <td className="px-3 py-2">
                      <input
                        aria-label={`Select ${product.name}`}
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={(event) =>
                          setSelectedProductIds(
                            event.target.checked
                              ? [...selectedProductIds, product.id]
                              : selectedProductIds.filter((id) => id !== product.id)
                          )
                        }
                      />
                    </td>
                    <td className="px-3 py-2">
                      <Link to="/products/$productId" params={{ productId: product.id }} className="font-medium text-slate-950 hover:underline">
                        {product.name}
                      </Link>
                      <div className="text-xs text-slate-500">{product.sku}</div>
                    </td>
                    <td className="px-3 py-2"><StatusBadge status={product.status} /></td>
                    <td className="px-3 py-2">{formatCurrency(product.price)}</td>
                    <td className="px-3 py-2">{product.inventory}</td>
                    <td className="px-3 py-2">
                      <Button
                        variant="secondary"
                        disabled={updateStatus.isPending}
                        onClick={() => updateProduct(product.id, product.status === "active" ? "draft" : "active")}
                      >
                        Toggle status
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{products.data?.total ?? 0} products</span>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={(filters.page ?? 1) <= 1} onClick={() => setFilter({ page: (filters.page ?? 1) - 1 })}>
              Previous
            </Button>
            <Button variant="secondary" onClick={() => setFilter({ page: (filters.page ?? 1) + 1 })}>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
