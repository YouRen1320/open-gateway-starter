import { describe, expect, it } from "vitest";
import { normalizeServices } from "./statusAdapter";

describe("normalizeServices", () => {
  it("accepts the documented status response shape", () => {
    expect(normalizeServices({ services: [{ id: "api", name: "API", status: "operational", latencyMs: 120 }] }))
      .toEqual([{ id: "api", name: "API", status: "operational", latencyMs: 120, note: "" }]);
  });

  it("rejects missing or unsupported status values", () => {
    expect(() => normalizeServices({ services: [{ id: "api", name: "API", status: "unknown" }] }))
      .toThrow(/valid id, name, or status/);
    expect(() => normalizeServices({})).toThrow(/services array/);
  });

  it("rejects empty, oversized, duplicate, and malformed service data", () => {
    expect(() => normalizeServices({ services: [] })).toThrow(/between 1 and 100/);
    expect(() => normalizeServices({ services: Array.from({ length: 101 }, (_, id) => ({ id: String(id), name: "API", status: "operational" })) }))
      .toThrow(/between 1 and 100/);
    expect(() => normalizeServices({ services: [
      { id: "api", name: "API", status: "operational" },
      { id: "api", name: "Duplicate", status: "operational" },
    ] })).toThrow(/Duplicate service id/);
    expect(() => normalizeServices({ services: [{ id: "api", name: "API", status: "operational", latencyMs: -1 }] }))
      .toThrow(/invalid latencyMs/);
    expect(() => normalizeServices({ services: [{ id: "api", name: "API", status: "operational", note: { unsafe: true } }] }))
      .toThrow(/invalid note/);
  });

  it("trims trusted text fields and preserves a missing latency as null", () => {
    expect(normalizeServices({ services: [{ id: " api ", name: " API gateway ", status: "maintenance", note: " Planned " }] }))
      .toEqual([{ id: "api", name: "API gateway", status: "maintenance", latencyMs: null, note: "Planned" }]);
  });
});
