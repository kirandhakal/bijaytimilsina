import { test, expect } from "@playwright/test";
const endpoint = "**/v1/forms/*/submissions";
test("home, route navigation, filters, and live Three.js canvas", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "creative orbit",
  );
  await expect(page.locator(".orbital-canvas canvas")).toBeVisible();
  await page.screenshot({ path: "/tmp/bijay-desktop.png" });
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await expect(
    page.getByRole("button", { name: "Play 3D animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Play 3D animation" }).click();
  await page.getByRole("link", { name: "Explore my world" }).click();
  await expect(page).toHaveURL(/\/projects\//);
  await page.getByRole("button", { name: "Creative", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Beyond the screen" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Development", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  for (const route of ["about", "services", "skills", "contact"]) {
    const response = await page.goto(`/${route}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
test("mobile navigation and layout stay within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.screenshot({ path: "/tmp/bijay-mobile.png" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/\/contact\//);
  await expect(page.getByRole("navigation")).toBeHidden();
  for (const path of [
    "/",
    "/about/",
    "/services/",
    "/skills/",
    "/projects/",
    "/contact/",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("form submits its existing API contract and recovers from errors", async ({
  page,
}) => {
  await page.goto("/contact/");
  let payload: unknown;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.getByLabel("Your name").fill("  Test Person  ");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What are you thinking?").fill("  A test message.  ");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("has been sent");
  expect(payload).toEqual({
    name: "Test Person",
    email: "test@example.com",
    message: "A test message.",
  });
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await page.unroute(endpoint);
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 429, body: "{}" }),
  );
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What are you thinking?").fill("Retry message");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Too many messages",
  );
  await expect(page.getByLabel("What are you thinking?")).toHaveValue(
    "Retry message",
  );
  await expect(
    page.getByRole("button", { name: "Send message" }),
  ).toBeEnabled();
  await page.unroute(endpoint);
  await page.route(endpoint, (route) => route.abort());
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Unable to connect",
  );
});
test("reduced motion and WebGL failure keep the portfolio usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Play 3D animation" }),
  ).toBeVisible();
  await expect(page.locator(".hero")).toBeVisible();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.call(this, type as "2d", ...args);
    } as typeof original;
  });
  await page.reload();
  await expect(page.locator(".orbital-fallback")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my world" }),
  ).toBeVisible();
});
