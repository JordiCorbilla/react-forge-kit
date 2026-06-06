import { beforeEach, describe, expect, it } from "vitest";
import { useProductSelectionStore, useUserPreferencesStore } from "../src";

describe("zustand stores", () => {
  beforeEach(() => {
    useProductSelectionStore.getState().clearSelection();
  });

  it("tracks selected product ids", () => {
    useProductSelectionStore.getState().setSelectedProductIds(["product-1"]);
    expect(useProductSelectionStore.getState().selectedProductIds).toEqual(["product-1"]);
  });

  it("keeps recently viewed ids unique and recent", () => {
    useUserPreferencesStore.getState().markProductViewed("product-1");
    useUserPreferencesStore.getState().markProductViewed("product-2");
    useUserPreferencesStore.getState().markProductViewed("product-1");
    expect(useUserPreferencesStore.getState().recentlyViewedProductIds.slice(0, 2)).toEqual([
      "product-1",
      "product-2"
    ]);
  });
});
