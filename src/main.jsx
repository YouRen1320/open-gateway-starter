import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";
import { PreferencesProvider } from "./app/Preferences";
import "./styles/tokens.css";
import "./styles/global.css";

// BrowserRouter owns shareable URLs; the provider owns persisted language and theme preferences.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
