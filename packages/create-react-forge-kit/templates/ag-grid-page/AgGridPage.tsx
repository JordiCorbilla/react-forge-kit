import type { ColDef } from "ag-grid-community";
import { DataGrid } from "@forge/grid";

type Row = {
  id: string;
  name: string;
  status: string;
};

const columns: ColDef<Row>[] = [
  { field: "name" },
  { field: "status" }
];

export function AgGridPage({ rows }: { rows: Row[] }) {
  return <DataGrid rows={rows} columns={columns} />;
}
