import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "../app/App";
import { PreferencesProvider } from "../app/Preferences";

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <PreferencesProvider><App /></PreferencesProvider>
    </MemoryRouter>,
  );
}

describe("starter routes", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders the sample catalog with real anchor destinations", () => {
    const { container } = renderRoute("/models");
    expect(screen.getByRole("heading", { level: 1, name: /replaceable catalog/i })).toBeInTheDocument();
    for (const anchor of container.querySelectorAll("a")) expect(anchor).toHaveAttribute("href");
    expect(screen.getByText("Vision Plus")).toBeInTheDocument();
    expect(screen.getAllByText("Provider C")).toHaveLength(3);
    expect(document.title).toBe("Sample model catalog · OpenGateway Starter");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://starter.example.com/models");
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute("content", "Sample model catalog · OpenGateway Starter");
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index,follow");
  });

  it("labels dashboard data as a local demo", async () => {
    renderRoute("/demo/dashboard");
    expect(await screen.findByText(/local interface demo only/i)).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 1, name: /dashboard overview/i })).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/fa-sk-[A-Za-z0-9]{20,}/);
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  });

  it("localizes demo controls and prompts when Chinese is stored", async () => {
    window.localStorage.setItem("starter.language", "zh");
    renderRoute("/demo/chat");

    expect(await screen.findByRole("heading", { level: 1, name: "聊天界面演示" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "解释公开配置与服务端秘密的边界" })).toBeInTheDocument();
    expect(screen.getByRole("log", { name: "本地演示对话" })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "zh-CN");
  });
});
