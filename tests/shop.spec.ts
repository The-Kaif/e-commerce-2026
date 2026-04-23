import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(
    page.locator(".logo")
  ).toBeVisible();
});

test("can add item to cart", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.locator(".primary-btn").first().click();

  await expect(
    page.locator(".cart-badge")
  ).toBeVisible();
});

test("cart page works", async ({ page }) => {
  await page.goto("http://localhost:5173/cart");

  await expect(
    page.getByRole("heading", {
      name: "Your Cart",
      exact: true,
    })
  ).toBeVisible();
});