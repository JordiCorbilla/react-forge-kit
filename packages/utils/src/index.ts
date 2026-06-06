import type { ProductFilters, ProductStatus } from "@forge/api";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(value);
}

export function parseProductFilters(searchParams: URLSearchParams): ProductFilters {
  const page = Number(searchParams.get("page") ?? "1");
  const status = searchParams.get("status");
  return {
    search: searchParams.get("search") ?? undefined,
    status: isProductStatus(status) || status === "all" ? status : "all",
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: 10
  };
}

export function toProductSearchParams(filters: ProductFilters) {
  const params = new URLSearchParams();
  if (filters.search) {
    params.set("search", filters.search);
  }
  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.page && filters.page > 1) {
    params.set("page", String(filters.page));
  }
  return params;
}

function isProductStatus(value: string | null): value is ProductStatus {
  return value === "active" || value === "draft" || value === "archived";
}
