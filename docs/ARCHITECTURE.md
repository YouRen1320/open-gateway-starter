# Architecture

## Goal

Keep the public marketing site reusable while making demo and production boundaries obvious. A component should not need to know a product domain, customer name, server path, or provider secret.

## Dependency direction

```text
config/content/data
        ↓
components
        ↓
pages and demo features
        ↓
layouts and route composition
        ↓
main.jsx
```

Lower layers must not import page or layout modules.

## Module responsibilities

### `src/config`

Browser-safe runtime values only. It must never become a secret store. `routes.js` is also imported by the post-build sitemap step, keeping the documented public-route list in one source of truth.

### `src/content`

Shared translated human-facing copy. Feature-specific translations may stay beside the owning page or demo when they are not reused. Product claims belong in a reviewable content or data module only after they are verified and have an owner.

### `src/data`

Data shapes, fictional fixtures, and validation at external boundaries. Local demo data is deliberately obvious and invalid for production use.

### `src/components`

Reusable primitives such as icons, links, metadata, code blocks, and page headers. Components accept data; they do not import product-specific deployment values unless that is their explicit responsibility.

### `src/pages`

Public, crawlable routes. Each route owns metadata and can be shared directly.

### `src/demo`

Local-only interface examples. The demo banner is part of the safety contract and should not be removed while fictional data is presented as a product UI.

### `src/layouts`

Navigation shells. The public layout owns accessible navigation, footer links, language/theme controls, and the skip link. The demo layout owns the persistent demo warning.

## Routing

Public pages use normal History API routes, not hash fragments. Static hosting must serve `index.html` for route requests.

Demo routes are code-split with `React.lazy`. The build emits the dashboard and chat as on-demand chunks, so public pages do not fetch or execute those feature modules on initial load.

## State

Only language and theme persist in local storage. Demo account, keys, messages, and usage are in-memory values and disappear on reload.

When real account state is added, use an authenticated server contract. Do not convert demo state into local-storage account storage.

## Styling

- `tokens.css` defines semantic light/dark values.
- `global.css` defines component and responsive styles.
- Breakpoints cover desktop, tablet, 720px mobile, and 384px narrow devices.
- Interactive targets are at least 44px high.
- `prefers-reduced-motion` removes non-essential motion.

Avoid raw brand colors in component JSX. Add or map semantic tokens instead.

## Adding a production feature

Before implementation, define:

1. The source of truth.
2. Browser/server trust boundary.
3. Loading, empty, invalid, timeout, and retry behavior.
4. Keyboard and screen-reader behavior.
5. Mobile behavior at 375px.
6. Tests that prove the contract.

Do not turn an inert demo button into a production-looking control without implementing its behavior or disabling it with an explanation.
