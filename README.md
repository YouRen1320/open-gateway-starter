# OpenGateway Starter

[简体中文](./README.zh-CN.md)

An accessible, neutral React starter for AI gateway marketing sites and clearly labeled product demos.

The repository is designed for two jobs:

1. Start a new project without carrying over another product's brand, domains, claims, credentials, or deployment details.
2. Give a new maintainer enough documentation to run, configure, test, and deploy the project without private context.

The bundled model names, prices, usage metrics, keys, status values, and chat responses are fictional examples. They do not represent a production service.

## What is included

- Five crawlable public routes: `/`, `/models`, `/pricing`, `/docs`, and `/status`.
- A lazy-loaded dashboard and local chat simulation under `/demo/*`.
- Central public configuration in `src/config/site.js`.
- Shared translated content, localized feature controls, and fictional catalog/demo data.
- Light and dark themes using semantic design tokens.
- Keyboard navigation, visible focus, skip links, reduced motion, and mobile layouts.
- Linting, unit/integration tests, production builds, CI, and Dependabot configuration.
- Apache-2.0 licensing, a security policy, contribution guide, and brand boundary.

## What is intentionally not included

- Authentication, account storage, billing, or payment processing.
- A model-provider proxy or any server-side API implementation.
- Production credentials or a frontend mechanism for storing them.
- Claims about uptime, compliance, pricing accuracy, customers, or service levels.
- Permission to use another product's name, logo, domain, or commercial identity.

## Quickstart

Requirements: a supported Node.js 22 or 24 LTS release and npm. Node.js 20 is intentionally unsupported because it is end-of-life.

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

Before committing or deploying, run the full check:

```bash
npm run check
```

This runs ESLint, the public-file safety scan, Vitest, and the production build.

`package.json` uses `"private": true` intentionally: this repository is a project template, not an npm package. The setting prevents accidental publication to the npm registry without limiting GitHub releases or deployments.

## Create a project from the starter

When this repository is hosted on GitHub, mark it as a **Template repository** and use **Use this template** instead of forking. A generated project receives its own history.

After creating a project:

1. Copy `.env.example` to `.env.local`.
2. Replace `VITE_SITE_NAME`, `VITE_SITE_DESCRIPTION`, `VITE_SITE_URL`, and `VITE_REPOSITORY_URL`.
3. Replace `src/content/copy.js` with your product copy.
4. Replace `src/data/catalog.js` and `src/data/demo.js` with verified data or an API adapter.
5. Replace the `O` brand mark and update `TRADEMARKS.md`.
6. Decide whether to keep the demos. Set `VITE_ENABLE_DEMO=false` to hide and block them.
7. Replace the repository URL and review every legal/footer link.
8. Run `npm run check` and perform a secret scan before publishing.

## Configuration

All `VITE_` values are public. Vite compiles them into the browser bundle.

```dotenv
VITE_SITE_NAME=Your Product
VITE_SITE_DESCRIPTION=A concise, verified description of your product.
VITE_SITE_URL=https://product.example
VITE_REPOSITORY_URL=https://github.com/your-name/your-project
VITE_STATUS_ENDPOINT=
VITE_ENABLE_DEMO=true
```

Never put an upstream model key, payment key, session secret, or private token in these variables. Those values belong in a server-side service.

See [Configuration](./docs/CONFIGURATION.md) for the complete contract.

## Status endpoint contract

Without `VITE_STATUS_ENDPOINT`, the status page explicitly renders sample data. When configured, the endpoint must return JSON:

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

Allowed status values are `operational`, `degraded`, `maintenance`, and `outage`. Invalid responses and ten-second timeouts show an error, preserve the last valid view, and never silently become “healthy.”

## Project structure

```text
src/
├── app/          Routing effects and persisted UI preferences
├── components/   Reusable visual and behavioral primitives
├── config/       Browser-safe site configuration
├── content/      Translated product copy
├── data/         Fictional catalog/demo data and API boundary validation
├── demo/         Lazy-loaded local-only product demos
├── layouts/      Public and demo navigation shells
├── pages/        Crawlable public screens
├── styles/       Semantic tokens and responsive component styles
└── test/         Shared test setup
```

See [Architecture](./docs/ARCHITECTURE.md) for module boundaries and extension rules.

## Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the app and generate the SPA fallback, crawl files, and bundled dependency licenses. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run test` | Run all tests once. |
| `npm run test:watch` | Run tests in watch mode. |
| `npm run scan:public` | Scan repository text for high-confidence secrets, personal emails, and user-home paths. |
| `npm run check` | Run lint, the public-file scan, tests, and a production build. |
| `npm run verify:release` | Reject missing, insecure, or placeholder production configuration. |
| `npm run release:check` | Verify production configuration, then run the complete check. |

## Deployment

The output is in `dist/`. Your host must serve `index.html` as the fallback for application routes such as `/models` and `/docs`.

Set the production `VITE_SITE_URL` before building so generated canonical URLs, `robots.txt`, and `sitemap.xml` use the correct origin.

After creating `.env.production`, run `npm run release:check`. Unlike the normal starter check, this command intentionally fails while the default name, example domains, repository placeholder, or an implicit demo decision remains.

See [Deployment](./docs/DEPLOYMENT.md) for host requirements and a release checklist.

## Security model

This is a frontend starter, not a security boundary for provider credentials. Browsers cannot keep embedded secrets private.

- Keep model-provider and payment credentials on a server.
- Treat all demo tokens as invalid display strings.
- Enable GitHub secret scanning and push protection.
- Review dependency updates and run `npm audit` in CI.
- Follow [SECURITY.md](./SECURITY.md) when reporting vulnerabilities.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SUPPORT.md](./SUPPORT.md) before opening a pull request or support request. Contributions must not add real credentials, personal information, unverified commercial claims, or product-specific deployment infrastructure.

## License and brand

Source code is licensed under [Apache License 2.0](./LICENSE). The license does not grant permission to use a contributor's trade names, trademarks, service marks, or product names except as needed to describe the origin of the work.

This starter intentionally uses a placeholder identity. Replace it before production use and read [TRADEMARKS.md](./TRADEMARKS.md).

Third-party dependencies retain their own licenses. Every production build generates `dist/third-party-licenses.md` with the complete bundled license texts. See [NOTICE](./NOTICE).
