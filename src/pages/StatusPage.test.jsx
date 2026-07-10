import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PreferencesProvider } from "../app/Preferences";
import { StatusPage } from "./StatusPage";

vi.mock("../config/site", () => ({
  siteConfig: {
    name: "OpenGateway Starter",
    siteUrl: "https://starter.example.com",
    statusEndpoint: "https://status.example.com/api",
  },
}));

function renderStatus() {
  return render(
    <MemoryRouter>
      <PreferencesProvider><StatusPage /></PreferencesProvider>
    </MemoryRouter>,
  );
}

describe("StatusPage remote boundary", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("renders a validated remote response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ services: [{ id: "gateway", name: "Gateway", status: "operational", latencyMs: 88 }] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderStatus();

    expect(await screen.findByText("Remote data")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Gateway" })).toBeInTheDocument();
    expect(screen.getByText("88 ms")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("https://status.example.com/api", expect.objectContaining({
      headers: { Accept: "application/json" },
      signal: expect.any(AbortSignal),
    }));
  });

  it("reports an invalid response while preserving the labeled sample view", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ services: [] }) }));

    renderStatus();

    expect(await screen.findByRole("alert")).toHaveTextContent(/between 1 and 100 entries/i);
    expect(screen.getByText("Example data")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Example API gateway" })).toBeInTheDocument();
  });

  it("turns a stalled request into a visible timeout error", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_, { signal }) => new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    })));

    renderStatus();
    await act(async () => vi.advanceTimersByTimeAsync(10_001));

    expect(screen.getByRole("alert")).toHaveTextContent(/timed out after 10 seconds/i);
    expect(screen.getByText("Example data")).toBeInTheDocument();
  });
});
