import { expect, test } from "@playwright/test";

test("dashboard loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Product Operations Demo" })).toBeVisible();
});

test("product list loads", async ({ page }) => {
  await page.goto("/products?status=active&page=1");
  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  await expect(page.getByText("Demo Product").first()).toBeVisible();
});

test("product detail deep link works", async ({ page }) => {
  await page.goto("/products/product-3");
  await expect(page.getByRole("heading", { name: "Demo Product 3" })).toBeVisible();
});

test("background job can be started", async ({ page }) => {
  await page.goto("/jobs");
  await page.getByRole("button", { name: /Generate product report/ }).click();
  await expect(page.getByText("product-report").first()).toBeVisible();
});

test("grid page loads", async ({ page }) => {
  await page.goto("/grid");
  await expect(page.getByRole("heading", { name: "AG Grid Showcase" })).toBeVisible();
  await expect(page.getByLabel("Quick filter")).toBeVisible();
});
