# Deployment

## Build contract

```bash
npm ci
npm run release:check
```

`npm run release:check` first rejects placeholder or insecure production configuration, then runs linting, the public-file safety scan, tests, and the production build. The deployable output is `dist/`.

The post-build step adds:

- `robots.txt`
- `sitemap.xml` containing only public routes and no fragments
- `404.html` as a copy of the SPA shell for compatible static hosts
- `third-party-licenses.md` containing complete license texts for bundled dependencies

## Required environment values

Set at build time:

```dotenv
VITE_SITE_NAME=Your Product
VITE_SITE_DESCRIPTION=A concise, verified production description.
VITE_SITE_URL=https://your-production-origin.example
VITE_REPOSITORY_URL=https://github.com/your-org/your-repository
VITE_ENABLE_DEMO=false
```

If the production status endpoint is ready, also set `VITE_STATUS_ENDPOINT`.

## Host requirements

The host must:

1. Serve the files in `dist/`.
2. Redirect unknown application routes to `index.html`.
3. Preserve actual files such as `/assets/*`, `/robots.txt`, `/sitemap.xml`, and `/third-party-licenses.md`.
4. Serve HTTPS.
5. Apply an appropriate Content Security Policy after all required origins are known.

Example rewrite behavior:

```text
/assets/*     → serve the asset
/robots.txt   → serve the file
/sitemap.xml  → serve the file
/*            → /index.html
```

Consult the documentation for your selected host for the exact syntax. Do not copy a production SSH alias or destructive `rsync --delete` command into the public starter.

## Release checklist

- [ ] `npm ci` succeeds from a clean clone.
- [ ] `npm run verify:release` accepts the explicit production configuration.
- [ ] `npm run check` passes.
- [ ] `npm audit --audit-level=high` passes or every exception is documented.
- [ ] `VITE_SITE_URL` and repository links are not placeholders.
- [ ] No `example.com`, `your-name`, or placeholder product copy remains unintentionally.
- [ ] Secret scanning reports no real or full-format production token.
- [ ] Model, pricing, status, legal, and support claims have an owner and evidence.
- [ ] Terms, privacy, security, and trademark links resolve.
- [ ] `/`, `/models`, `/pricing`, `/docs`, `/status`, and the 404 route work on the host.
- [ ] A 375px viewport has no clipped controls or horizontal page overflow.
- [ ] Keyboard navigation and visible focus work.
- [ ] The demo is disabled or still clearly labeled.
- [ ] Rollback points to the previous immutable deployment artifact.

## Rollback

Keep each successful `dist/` artifact or deployment revision immutable. Roll back by restoring the previous known-good artifact, not by editing files on the production server.
