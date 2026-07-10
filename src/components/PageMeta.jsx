import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";

function upsertMeta(attribute, key, content) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.append(meta);
  }
  meta.setAttribute("content", content);
}

export function PageMeta({ title, description, noIndex = false }) {
  const location = useLocation();

  // Metadata follows the route so every public URL has a distinct shareable identity.
  useEffect(() => {
    const pageTitle = `${title} · ${siteConfig.name}`;
    const canonicalUrl = `${siteConfig.siteUrl}${location.pathname}`;
    document.title = pageTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex,nofollow" : "index,follow");
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.append(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, location.pathname, noIndex, title]);

  return null;
}
