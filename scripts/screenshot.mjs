import { chromium } from "playwright";

const URL = process.env.LINKX_URL || "http://127.0.0.1:4188/linkx/";
const OUT = process.argv[2] || "src/assets/imgs/LinkxRefactor.jpg";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: OUT, fullPage: false });
await browser.close();

console.log(`Saved ${OUT}`);
