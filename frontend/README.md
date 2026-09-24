# frontend

Vite + React + TypeScript app for [halfbuilt.me](https://halfbuilt.me).

See the [repo README](../README.md) for install/dev commands.

## Design system

The design system is Tailwind v4 theme tokens in the `@theme` block of [src/index.css](src/index.css). There is no `tailwind.config.js`: v4 is configured in CSS. The block starts with `--color-*: initial;` and `--font-*: initial;`, so Tailwind's default palette (`slate`, `gray`, `blue`, ...) and default font stacks are not generated. Only the tokens below exist. Need something new? Add a token to `@theme` rather than an arbitrary value like `bg-[#abc123]`.

### Palette

Four scales, each 50 (lightest) to 900 (darkest). Use them as `bg-forest-50`, `text-forest-800`, `border-sage-300`, and so on. The original brand hex values are exact steps in the scales; the other steps were generated in OKLCH so hue stays constant and lightness is evenly spaced.

| Scale | Anchor (exact brand value) | Character |
|---|---|---|
| `neutral` | `50` cream `#F7F3E8`, `400` taupe `#A99F90`, `900` charcoal `#292825` | warm stone, for backgrounds, text and borders |
| `forest` | `800` `#243C32` | brand green |
| `mustard` | `300` `#E9B949` | brand accent |
| `sage` | `300` `#B6C7AA` | soft green for borders and surfaces |

Also available: `white`, `transparent` and `current`. There is no pure black; use `neutral-900` or `forest-900`.

**Roles.** In components, prefer the role tokens over raw steps so a re-theme only has to change this table:

| Utility | Points at | Used for |
|---|---|---|
| `bg-background` | `neutral-50` | page background |
| `bg-surface` | `sage-100` | cards / raised surfaces |
| `text-text` | `forest-800` | body text |
| `text-text-muted` | `forest-700` | secondary text |
| `bg-accent` | `mustard-300` | primary buttons, highlights |
| `text-accent-contrast` | `forest-900` | text on top of `accent` |
| `border-border` | `sage-300` | dividers, outlines |

**Contrast (WCAG AA needs 4.5:1 for body text):** `forest-800` on `neutral-50` is 10.7:1, `forest-700` on `neutral-50` is 5.8:1, `forest-900` on `mustard-300` is 7.9:1, and `neutral-600` on `neutral-50` is 4.7:1. Anything lighter than `neutral-600` or `forest-600` is for large text, icons or decoration only.

### Type

One display face and one text face, loaded from Google Fonts in [src/index.css](src/index.css):

- **`font-display`**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (weights 400/500/600/700). Applied to `h1`–`h4` in the base layer; use it for the wordmark and other headline text.
- **`font-sans`**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (weights 400/500/600). Applied to `body`.

Each falls back to the system UI font. There is no `font-mono` token yet. Add one when the site shows code.

Base body copy is `18px` / `1.7` line-height, set in the base layer.

### Spacing

`--spacing: 0.25rem` (4px) in the `@theme` block of [src/index.css](src/index.css). Every spacing utility (`p-*`, `m-*`, `gap-*`, `space-*`, `w-*`, `h-*`, ...) is that unit times the number, so `p-4` is 16px and `gap-6` is 24px.

Why 4px:

- **It divides evenly.** 4px is small enough for tight control (icon gaps, borders, `p-1`/`p-2`) and still doubles cleanly into the 8px grid most layouts and design tools use.
- **It fits the type.** Body copy is 18px with a 1.7 line height (about 30px). Sections built from 8px multiples (`p-4`, `p-6`, `p-8`, `p-12`) sit comfortably next to text at that size, while 4px steps handle the in-between cases.
- **It's in `rem`, not `px`,** so spacing scales when a user changes their browser font size.
- **It keeps the numbers predictable.** Utility number × 4 = pixels, so nobody has to look anything up.

Rhythm rules of thumb:

- Prefer even steps (`2`, `4`, `6`, `8`, `12`, `16`, `24`) so everything lands on the 8px grid. Use odd steps (`1`, `3`, `5`) only for fine adjustments.
- Space within a component with `2`–`4`, between components with `6`–`8`, and between page sections with `12`–`24`.
- Don't use arbitrary values such as `p-[13px]`. If the scale is missing something you need, add a token to `@theme` instead.

### Border radius

`--radius-*` tokens in the `@theme` block of [src/index.css](src/index.css). The block starts with `--radius-*: initial;`, so only these steps exist and Tailwind's defaults (`rounded-xs`, `rounded-3xl`, ...) are not generated.

| Utility | Value | Use for |
|---|---|---|
| `rounded-sm` | 4px | chips, tags, inputs |
| `rounded-md` | 8px | buttons, form controls |
| `rounded-lg` | 12px | cards |
| `rounded-xl` | 16px | large cards, modals |
| `rounded-2xl` | 24px | hero images, feature panels |
| `rounded-full` | 9999px | pills, avatars |

Every step is a multiple of the 4px spacing unit, so corners line up with the rest of the layout. Steps grow with the size of the element: small elements get small radii, big surfaces get big ones. Use one radius per element type across the site, and don't use arbitrary values such as `rounded-[10px]`. `rounded-none` (0) is always available.
