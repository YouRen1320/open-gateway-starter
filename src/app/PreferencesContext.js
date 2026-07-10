import { createContext, useContext } from "react";

// Kept separate from the provider component so Fast Refresh can preserve UI state.
export const PreferencesContext = createContext(null);

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
