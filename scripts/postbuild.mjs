import { appendFile, copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnv } from "vite";
import { DEFAULT_SITE } from "../src/config/defaults.js";
import { PUBLIC_ROUTES } from "../src/config/routes.js";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const env = loadEnv("production", root, "");
const siteUrl = (env.VITE_SITE_URL?.trim() || DEFAULT_SITE.siteUrl).replace(/\/+$/, "");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}
</urlset>
`;

await writeFile(resolve(dist, "sitemap.xml"), sitemap);
await writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

// Vite extracts JavaScript licenses; append the self-hosted font license that enters through CSS.
const fontRoot = resolve(root, "node_modules/@fontsource-variable/inter");
const fontPackage = JSON.parse(await readFile(resolve(fontRoot, "package.json"), "utf8"));
const fontLicense = await readFile(resolve(fontRoot, "LICENSE"), "utf8");
await appendFile(
  resolve(dist, "third-party-licenses.md"),
  `\n## ${fontPackage.name} - ${fontPackage.version} (${fontPackage.license})\n\n${fontLicense.trim()}\n`,
);

const indexPath = resolve(dist, "index.html");
const indexHtml = await readFile(indexPath, "utf8");
if (/rel="modulepreload"[^>]+Demo(?:Dashboard|Chat)/i.test(indexHtml)) {
  throw new Error("Demo feature chunks must not be preloaded by the public application shell.");
}

// A copied SPA shell provides a useful fallback on hosts that honor a root 404.html.
await copyFile(indexPath, resolve(dist, "404.html"));
