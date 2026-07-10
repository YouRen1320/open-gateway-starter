# OpenGateway Starter Design System

## Product direction

- Product type: developer-tool and AI gateway starter.
- Style: high-integrity exaggerated minimalism with restrained data surfaces.
- Priority: clarity and reuse over product-specific decoration.
- Modes: full light and dark support.

## Foundations

- Type: Inter Variable for Latin UI; system fallbacks cover CJK and platform text.
- Layout: 4/8px spacing rhythm, 76rem maximum content width, readable text measure.
- Surfaces: canvas, raised, subtle, and strong semantic layers.
- Accent: green for primary positive action; warning and danger remain semantic.
- Icons: one inline SVG stroke family; no emoji as structural icons.

## Interaction rules

- Interactive targets are at least 44×44px.
- Every icon-only control has an accessible label.
- Primary actions, secondary actions, links, and disabled controls have distinct states.
- Keyboard focus uses a visible 3px ring.
- Navigation uses real links and deep routes.
- No control is presented as functional without an implemented behavior.

## Responsive rules

- Desktop navigation collapses below 912px.
- Complex grids reduce to two columns, then one column below 720px.
- The design must work at 375px without clipped buttons or body overflow.
- Tables may scroll inside a labeled container; the document itself must not scroll horizontally.
- Demo navigation becomes a compact top rail on tablet and mobile.

## Motion rules

- Micro-interactions use 160–240ms transitions.
- Motion uses opacity and transform rather than layout properties.
- `prefers-reduced-motion` disables non-essential animation and smooth scrolling.

## Content rules

- Demo, sample, synthetic, and remote data sources are labeled in the UI.
- Marketing claims are not inherited as component defaults.
- Status reachability is not treated as service health.
- Credentials are never used as decorative sample data.

## Pre-release checks

- Light and dark contrast are reviewed independently.
- Keyboard focus order follows visual order.
- Public pages have one H1 and meaningful metadata.
- Charts have text summaries or table alternatives.
- Empty, loading, error, and retry states are visible where network data exists.
- Mobile is tested at 375×812 and in a tablet landscape viewport.
