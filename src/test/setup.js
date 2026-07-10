import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Vitest globals are disabled, so register DOM cleanup explicitly between tests.
afterEach(cleanup);

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
Object.defineProperty(window, "requestAnimationFrame", {
  value: (callback) => window.setTimeout(callback, 0),
  writable: true,
});
