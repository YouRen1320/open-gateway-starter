import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { DEFAULT_SITE } from "./src/config/defaults.js";

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
})[character]);

function metadataPlugin(metadata) {
  return {
    name: "starter-static-metadata",
    transformIndexHtml(html) {
      return html
        .replaceAll("__STARTER_SITE_NAME__", escapeHtml(metadata.name))
        .replaceAll("__STARTER_SITE_DESCRIPTION__", escapeHtml(metadata.description))
        .replaceAll("__STARTER_SITE_URL__", escapeHtml(`${metadata.siteUrl.replace(/\/+$/, "")}/`));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const metadata = {
    name: env.VITE_SITE_NAME?.trim() || DEFAULT_SITE.name,
    description: env.VITE_SITE_DESCRIPTION?.trim() || DEFAULT_SITE.description,
    siteUrl: env.VITE_SITE_URL?.trim() || DEFAULT_SITE.siteUrl,
  };

  return {
    plugins: [react(), metadataPlugin(metadata)],
    build: {
      // Publish full bundled-dependency license texts alongside every production build.
      license: { fileName: "third-party-licenses.md" },
      sourcemap: true,
      rollupOptions: {
        output: {
          // Vendor code is stable; React.lazy is left to create true on-demand demo chunks.
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
            return undefined;
          },
        },
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
      css: true,
    },
  };
});
