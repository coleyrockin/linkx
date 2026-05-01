import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import linksData from "../../src/data/links.json" with { type: "json" };

test.describe("LinkX smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForSelector("#main", { state: "visible" });
  });

  test("renders identity + all outbound links with correct attributes", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /boyd roberts/i })).toBeVisible();

    for (const link of linksData) {
      const locator = page.locator(`[data-link-id="${link.id}"]`);
      await expect(locator).toHaveAttribute("href", link.href);
      await expect(locator).toHaveAttribute("target", "_blank");
      await expect(locator).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("skip link becomes visible on focus", async ({ page }) => {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
  });

  test("has no serious or critical a11y violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical"
    );
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
});
