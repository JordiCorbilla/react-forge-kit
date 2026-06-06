import { describe, expect, it } from "vitest";
import { parseProductFilters, toProductSearchParams } from "../src";

describe("product URL helpers", () => {
  it("parses search params into filters", () => {
    const filters = parseProductFilters(new URLSearchParams("search=demo&status=active&page=2"));
    expect(filters).toMatchObject({ search: "demo", status: "active", page: 2 });
  });

  it("omits default params when serializing", () => {
    expect(toProductSearchParams({ status: "all", page: 1 }).toString()).toBe("");
  });
});
