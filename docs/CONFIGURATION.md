# Configuration

Configuration has three explicit layers. Keep them separate so new projects can replace one concern without rewriting the application.

## 1. Public environment values

`src/config/site.js` reads the following variables:

| Variable | Required | Default | Purpose |
|---|---:|---|---|
| `VITE_SITE_NAME` | No | `OpenGateway Starter` | Public product name. |
| `VITE_SITE_DESCRIPTION` | For deployment | Generic starter description | Static HTML and social-preview description. |
| `VITE_SITE_URL` | For deployment | `https://starter.example.com` | Canonical origin and sitemap origin. |
| `VITE_REPOSITORY_URL` | For derivatives | Source repository URL | Footer and documentation links; replace it in generated projects. |
| `VITE_STATUS_ENDPOINT` | No | Empty | Optional JSON status endpoint. |
| `VITE_ENABLE_DEMO` | No | `true` | Hides and blocks `/demo/*` when set to `false`. |

Every `VITE_` variable is visible to users. Do not store secrets in this layer.

## 2. Product copy

Shared English and Chinese navigation, landing, and footer copy lives in `src/content/copy.js`. Feature-specific labels live beside the page or demo that owns them. Add a language by:

1. Adding a complete sibling object with the same keys.
2. Extending the language selector in `src/layouts/PublicLayout.jsx`.
3. Mapping the correct HTML `lang` code in `src/app/Preferences.jsx`.
4. Translating feature-specific dictionaries and conditional labels in `src/pages` and `src/demo`.
5. Adding tests for the new language.

Do not mix operational metrics or policy promises into generic component files. Product claims should have a named, reviewable source.

## 3. Catalog and demo data

- `src/data/catalog.js` owns fictional public catalog and pricing examples.
- `src/data/demo.js` owns fictional dashboard values, invalid display tokens, and sample calls.
- `src/data/statusAdapter.js` validates remote status data at the network boundary.

For production, replace local catalog data with one explicit source of truth. If using an API, add loading, empty, invalid-response, and retry states rather than falling back to stale claims silently.

## Status contract

The endpoint must support CORS for the deployed origin and return JSON:

```json
{
  "services": [
    {
      "id": "gateway",
      "name": "API gateway",
      "status": "operational",
      "latencyMs": 184,
      "note": "All regions healthy"
    }
  ]
}
```

Allowed statuses:

- `operational`
- `degraded`
- `maintenance`
- `outage`

The response must contain 1–100 services. IDs and names must be non-empty strings, IDs must be unique, `latencyMs` must be null or a non-negative finite number, and `note` must be a string when present.

An HTTP error, ten-second timeout, invalid JSON, empty service list, duplicate ID, malformed field, or invalid status value is reported as an error while the last valid view remains visible. The UI does not equate network reachability with service health.

## Disabling demos

Set:

```dotenv
VITE_ENABLE_DEMO=false
```

This removes demo links from navigation and redirects direct `/demo/*` visits to `/`. The source remains in the repository as an example and builds into separate lazy-loaded chunks. If you do not want to distribute it, delete `src/demo`, `src/layouts/DemoLayout.jsx`, the demo routes, and the related tests.
