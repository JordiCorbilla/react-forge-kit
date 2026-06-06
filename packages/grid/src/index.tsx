import { AllCommunityModule, ModuleRegistry, type ColDef, type GridOptions } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { Button, SearchInput, StatusBadge, Toolbar } from "@forge/ui";

ModuleRegistry.registerModules([AllCommunityModule]);

export function createDefaultGridOptions<TData>(): GridOptions<TData> {
  return {
    animateRows: true,
    rowSelection: "multiple",
    suppressCellFocus: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 120
    }
  };
}

export function statusCellRenderer(params: { value?: string }) {
  return params.value ? <StatusBadge status={params.value} /> : null;
}

export function actionCellRenderer<TData>({
  data,
  onOpen
}: {
  data: TData;
  onOpen?: (row: TData) => void;
}) {
  return (
    <Button variant="ghost" className="h-7 px-2" onClick={() => onOpen?.(data)}>
      Open
    </Button>
  );
}

export function useGridSelection<TData extends { id: string }>() {
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);
  return { selectedRows, selectedIds: selectedRows.map((row) => row.id), setSelectedRows };
}

export function GridToolbar({
  quickFilter,
  onQuickFilterChange,
  actions
}: {
  quickFilter: string;
  onQuickFilterChange: (value: string) => void;
  actions?: React.ReactNode;
}) {
  return (
    <Toolbar>
      <SearchInput
        aria-label="Quick filter"
        placeholder="Quick filter"
        value={quickFilter}
        onChange={(event) => onQuickFilterChange(event.target.value)}
      />
      {actions}
    </Toolbar>
  );
}

export function DataGrid<TData extends { id: string }>({
  rows,
  columns,
  loading,
  quickFilter,
  onRowOpen
}: {
  rows: TData[];
  columns: ColDef<TData>[];
  loading?: boolean;
  quickFilter?: string;
  onRowOpen?: (row: TData) => void;
}) {
  const gridOptions = useMemo(() => createDefaultGridOptions<TData>(), []);

  return (
    <div className="ag-theme-quartz h-[520px] w-full">
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        gridOptions={gridOptions}
        loading={loading}
        quickFilterText={quickFilter}
        getRowId={(params) => params.data.id}
        onRowClicked={(event) => event.data && onRowOpen?.(event.data)}
        overlayNoRowsTemplate="<span>No rows found.</span>"
      />
    </div>
  );
}
