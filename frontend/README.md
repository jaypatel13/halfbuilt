# frontend

Vite + React + TypeScript app for [halfbuilt.me](https://halfbuilt.me).

See the [repo README](../README.md) for install/dev commands.

## Design system

Tokens live in [src/index.css](src/index.css) as CSS custom properties on `:root`. Reach for the *role* variables (`--color-*`) in components; the raw brand colors exist so the roles have something to point at.

### Palette

| Token | Value | Role |
|---|---|---|
| `--cream` | `#F7F3E8` | base for `--color-background` |
| `--forest` | `#243C32` | base for `--color-text` / `--color-accent-contrast` |
| `--mustard` | `#E9B949` | base for `--color-accent` |
| `--sage` | `#B6C7AA` | base for `--color-border` |
| `--charcoal` | `#292825` | neutral alternative, unassigned |
| `--taupe` | `#A99F90` | neutral alternative, unassigned |

| Role token | Value | Used for |
|---|---|---|
| `--color-background` | `var(--cream)` | page background |
| `--color-text` | `var(--forest)` | body text, links |
| `--color-accent` | `var(--mustard)` | primary buttons, `::selection` |
| `--color-border` | `var(--sage)` | dividers, outlines |
| `--color-surface` | `#E8EDDF` | cards / raised surfaces |
| `--color-text-muted` | `#526257` | secondary text |

Focus rings (`:focus-visible`) and text selection (`::selection`) use `--forest` / `--mustard` directly, so they stay visible even before a component reaches for a role token.

### Type

Loaded from Google Fonts in [src/index.css](src/index.css):

- **`--font-heading`** — [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (weights 400/500/600/700). Used for `h1`–`h4` and `.wordmark`.
- **`--font-body`** — [DM Sans](https://fonts.google.com/specimen/DM+Sans) (weights 400/500/600). Used for body copy and `.button-primary`.

Base body copy is `18px` / `1.7` line-height. Headings tighten tracking (`letter-spacing: -0.03em`, `-0.04em` for `.wordmark`) and use `font-weight: 600`/`700`.

### Utility classes

- `.wordmark` — the site name/logotype treatment (heading font, weight 700, tighter tracking).
- `.button-primary` — solid mustard button with forest text.

There's no component library yet — these are the only two utility classes defined so far. Extend `index.css` (or introduce a `styles/` split) as the design grows past a single global stylesheet.
