import { describe, expect, it } from "vitest";
import { isExternalUrl, siteConfig } from "./site";

describe("public starter configuration", () => {
  it("uses crawlable public routes instead of hash fragments", () => {
    expect(siteConfig.publicRoutes).toEqual(["/", "/models", "/pricing", "/docs", "/status"]);
    expect(siteConfig.publicRoutes.every((route) => !route.includes("#"))).toBe(true);
  });

  it("contains neutral defaults and no production credential", () => {
    const serialized = JSON.stringify(siteConfig);
    expect(serialized).toContain("OpenGateway Starter");
    expect(serialized).toContain("example.com");
    expect(serialized).not.toMatch(/fa-sk-[A-Za-z0-9]{20,}/);
  });

  it("distinguishes browser destinations from application routes", () => {
    expect(isExternalUrl("https://example.com")).toBe(true);
    expect(isExternalUrl("//cdn.example.com/file")).toBe(true);
    expect(isExternalUrl("mailto:team@example.com")).toBe(true);
    expect(isExternalUrl("tel:+10000000000")).toBe(true);
    expect(isExternalUrl("/docs")).toBe(false);
  });
});
