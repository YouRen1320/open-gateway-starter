import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PreferencesProvider } from "./Preferences";
import { usePreferences } from "./PreferencesContext";

function PreferenceProbe() {
  const { language, theme } = usePreferences();
  return <output aria-label="preferences">{language}:{theme}</output>;
}

describe("PreferencesProvider", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it("ignores unsupported stored values", () => {
    window.localStorage.setItem("starter.language", "unsupported");
    window.localStorage.setItem("starter.theme", "neon");

    render(<PreferencesProvider><PreferenceProbe /></PreferencesProvider>);

    expect(screen.getByLabelText("preferences")).toHaveTextContent("en:light");
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("keeps working when browser storage rejects writes", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage disabled", "SecurityError");
    });

    expect(() => render(<PreferencesProvider><PreferenceProbe /></PreferencesProvider>)).not.toThrow();
    expect(screen.getByLabelText("preferences")).toHaveTextContent("en:light");
  });
});
