import { resolve } from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { loadEnv } from "vite";
import { DEFAULT_SITE } from "../src/config/defaults.js";

const root = resolve(import.meta.dirname, "..");
const env = loadEnv("production", root, "");
const failures = [];

const isPlaceholder = (value = "") => /(?:example\.(?:com|org|net)|\.(?:example|test|invalid|localhost)(?:\/|$)|your[-_.])/i.test(value);

function requirePublicHttps(label, value) {
  if (!value) {
    failures.push(`${label} is required.`);
    return null;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") failures.push(`${label} must use HTTPS.`);
    if (url.username || url.password) failures.push(`${label} must not embed credentials.`);
    if (isPlaceholder(value)) failures.push(`${label} still contains a placeholder.`);
    return url;
  } catch {
    failures.push(`${label} must be an absolute URL.`);
    return null;
  }
}

if (!env.VITE_SITE_NAME || env.VITE_SITE_NAME === DEFAULT_SITE.name || /^your product$/i.test(env.VITE_SITE_NAME)) {
  failures.push("VITE_SITE_NAME must be replaced with the production name.");
}
if (!env.VITE_SITE_DESCRIPTION || env.VITE_SITE_DESCRIPTION === DEFAULT_SITE.description) {
  failures.push("VITE_SITE_DESCRIPTION must be replaced with a production description.");
}

const siteUrl = requirePublicHttps("VITE_SITE_URL", env.VITE_SITE_URL);
if (siteUrl && (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash)) {
  failures.push("VITE_SITE_URL must be an origin without a path, query, or fragment.");
}
const repositoryUrl = requirePublicHttps("VITE_REPOSITORY_URL", env.VITE_REPOSITORY_URL);
if (repositoryUrl && repositoryUrl.hostname !== "github.com") {
  failures.push("VITE_REPOSITORY_URL must point to the public GitHub repository.");
}
if (repositoryUrl && repositoryUrl.pathname.split("/").filter(Boolean).length !== 2) {
  failures.push("VITE_REPOSITORY_URL must include exactly one GitHub owner and repository.");
}

if (!new Set(["true", "false"]).has(env.VITE_ENABLE_DEMO)) {
  failures.push("VITE_ENABLE_DEMO must be explicitly set to true or false for production.");
}

if (env.VITE_STATUS_ENDPOINT) requirePublicHttps("VITE_STATUS_ENDPOINT", env.VITE_STATUS_ENDPOINT);

if (failures.length) {
  process.stderr.write(`Release configuration is not ready:\n${failures.map((failure) => `- ${failure}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Release configuration passed placeholder and HTTPS checks.\n");
}
