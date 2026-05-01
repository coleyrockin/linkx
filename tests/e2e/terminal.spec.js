import { test, expect } from "@playwright/test";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

async function triggerKonami(page) {
  for (const key of KONAMI) {
    await page.keyboard.press(key);
  }
}

test.describe("Konami-code terminal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
    await page.waitForSelector("#main", { state: "visible" });
  });

  test("opens on the konami sequence", async ({ page }) => {
    await triggerKonami(page);
    await expect(page.getByRole("dialog", { name: /terminal/i })).toBeVisible();
    await expect(page.getByLabel(/terminal input/i)).toBeFocused();
  });

  test("help lists commands", async ({ page }) => {
    await triggerKonami(page);
    const input = page.getByLabel(/terminal input/i);
    await input.fill("help");
    await input.press("Enter");
    const terminal = page.getByRole("dialog", { name: /terminal/i });
    await expect(terminal.getByText("whoami")).toBeVisible();
    await expect(terminal.getByText(/things i've shipped/i)).toBeVisible();
  });

  test("opens via the visible panel button (touch-friendly)", async ({ page }) => {
    await page.getByRole("button", { name: /open terminal/i }).click();
    await expect(page.getByRole("dialog", { name: /terminal/i })).toBeVisible();
  });

  test("closes on Escape", async ({ page }) => {
    await triggerKonami(page);
    await expect(page.getByRole("dialog", { name: /terminal/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /terminal/i })).not.toBeVisible();
  });
});
