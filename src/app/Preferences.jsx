import { useEffect, useMemo, useState } from "react";
import { copy } from "../content/copy";
import { PreferencesContext } from "./PreferencesContext";

const supportedLanguages = new Set(Object.keys(copy));
const supportedThemes = new Set(["light", "dark"]);

const readStored = (key, fallback, allowedValues) => {
  try {
    const value = window.localStorage.getItem(key);
    return allowedValues.has(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const writeStored = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be disabled or full; preferences still work for the current page session.
  }
};

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => readStored("starter.language", "en", supportedLanguages));
  const [theme, setTheme] = useState(() => readStored("starter.theme", "light", supportedThemes));

  // Preferences are the only UI state persisted across visits; no account data is stored.
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b1120" : "#f8fafc");
    writeStored("starter.language", language);
    writeStored("starter.theme", theme);
  }, [language, theme]);

  const value = useMemo(
    () => ({ language, setLanguage, theme, setTheme, text: copy[language] || copy.en }),
    [language, theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
