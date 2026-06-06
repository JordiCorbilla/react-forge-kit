import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it } from "vitest";
import { createMockApiClient } from "@forge/api";
import {
  createForgeQueryClient,
  QueryProvider,
  setApiClient,
  useProductsQuery,
  useUpdateProductStatusMutation
} from "../src";

describe("query hooks", () => {
  it("loads products", async () => {
    setApiClient(createMockApiClient());
    const client = createForgeQueryClient();
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryProvider client={client}>{children}</QueryProvider>
    );
    const { result } = renderHook(() => useProductsQuery({ page: 1, pageSize: 3 }), { wrapper });

    await waitFor(() => expect(result.current.data?.items).toHaveLength(3));
  });

  it("supports product status mutation", async () => {
    setApiClient(createMockApiClient());
    const client = createForgeQueryClient();
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryProvider client={client}>{children}</QueryProvider>
    );
    const { result } = renderHook(() => useUpdateProductStatusMutation(), { wrapper });

    result.current.mutate({ productId: "product-1", status: "active" });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
