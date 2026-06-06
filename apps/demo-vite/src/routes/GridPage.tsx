import type { ColDef } from "ag-grid-community";
import { useMemo, useState } from "react";
import type { Product } from "@forge/api";
import { DataGrid, GridToolbar, actionCellRenderer, statusCellRenderer } from "@forge/grid";
import { useProductsQuery } from "@forge/query";
import { useUserPreferencesStore } from "@forge/state";
import { Card, PageHeader, Tabs } from "@forge/ui";

export function GridPage() {
  const [quickFilter, setQuickFilter] = useState("");
  const products = useProductsQuery({ page: 1, pageSize: 30 });
  const density = useUserPreferencesStore((state) => state.density);
  const setDensity = useUserPreferencesStore((state) => state.setDensity);

  const columns = useMemo<ColDef<Product>[]>(
    () => [
      { field: "sku", headerName: "SKU" },
      { field: "name", headerName: "Name", minWidth: 220 },
      { field: "category", headerName: "Category" },
      { field: "status", headerName: "Status", cellRenderer: statusCellRenderer },
      { field: "inventory", headerName: "Inventory" },
      { headerName: "Action", cellRenderer: actionCellRenderer, sortable: false, filter: false }
    ],
    []
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="AG Grid Showcase"
        description="Community-only grid wrapper with quick filter, row actions, state preferences, loading and empty overlays."
      />
      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <GridToolbar quickFilter={quickFilter} onQuickFilterChange={setQuickFilter} />
          <Tabs
            value={density}
            onChange={(value) => setDensity(value as "compact" | "comfortable")}
            tabs={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" }
            ]}
          />
        </div>
        <div className={density === "compact" ? "text-xs" : "text-sm"}>
          <DataGrid
            rows={products.data?.items ?? []}
            columns={columns}
            loading={products.isLoading}
            quickFilter={quickFilter}
          />
        </div>
      </Card>
    </div>
  );
}
