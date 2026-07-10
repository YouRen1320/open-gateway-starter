import { DEFAULT_SITE } from "./defaults";
import { PUBLIC_ROUTES } from "./routes";

const env = import.meta.env;

const cleanBaseUrl = (value, fallback) => (value?.trim() || fallback).replace(/\/+$/, "");

// Public runtime configuration is intentionally limited to values safe for browser bundles.
export const siteConfig = Object.freeze({
  name: env.VITE_SITE_NAME?.trim() || DEFAULT_SITE.name,
  description: env.VITE_SITE_DESCRIPTION?.trim() || DEFAULT_SITE.description,
  siteUrl: cleanBaseUrl(env.VITE_SITE_URL, DEFAULT_SITE.siteUrl),
  repositoryUrl: cleanBaseUrl(env.VITE_REPOSITORY_URL, DEFAULT_SITE.repositoryUrl),
  statusEndpoint: (env.VITE_STATUS_ENDPOINT || "").trim(),
  demoEnabled: env.VITE_ENABLE_DEMO !== "false",
  publicRoutes: PUBLIC_ROUTES,
});

export const isExternalUrl = (value) => /^(?:https?:)?\/\//i.test(value) || /^(?:mailto|tel):/i.test(value);
