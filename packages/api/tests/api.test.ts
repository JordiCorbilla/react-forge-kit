import { describe, expect, it } from "vitest";
import { createMockApiClient, normalizeError } from "../src";

describe("mock api client", () => {
  it("filters and pages products", async () => {
    const api = createMockApiClient();
    const page = await api.getProducts({ status: "active", page: 1, pageSize: 5 });
    expect(page.items).toHaveLength(5);
    expect(page.items.every((product) => product.status === "active")).toBe(true);
  });

  it("updates product status", async () => {
    const api = createMockApiClient();
    const updated = await api.updateProductStatus("product-1", "active");
    expect(updated.status).toBe("active");
  });

  it("normalizes unknown errors", () => {
    expect(normalizeError(new Error("network")).userMessage).toBe("Something went wrong. Try again.");
  });
});
