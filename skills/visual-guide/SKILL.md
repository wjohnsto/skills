---
name: visual-guide
description: >-
    Use when building frontend UI components or pages. Covers brand colors,
    typography scales, spacing tokens, button styles, form inputs, dark theme,
    layout constraints, and component patterns.
license: MIT
metadata:
    author: wjohnsto
    version: '3.0'
    category: reference
    triggers: frontend, UI, colors, typography, brand, theme, dark, icons, buttons, forms, inputs, cards, modals, shadows, breakpoints
---

# Visual Guide

## When to Use

- Choosing colors, fonts, or spacing for UI components
- Creating new pages or layouts
- Styling buttons, links, form inputs, or text
- Implementing the dark theme
- Checking brand-correct color values or CSS variable names
- Looking up shadow, radius, z-index, or breakpoint tokens
- Building cards, modals, tooltips, or badges

## Typography

This project uses three font families, assigned to CSS custom properties.

### Font Families

| Variable        | Type       | Stack                      | Weights              | Usage                                |
| --------------- | ---------- | -------------------------- | -------------------- | ------------------------------------ |
| `--font-sans`   | Sans-serif | `system-ui, sans-serif`    | 400, 500, 700        | Headings, body text, buttons, UI     |
| `--font-prose`  | Sans-serif | `'Lexend', sans-serif`     | 300, 400, 500, 700   | Long-form prose, editorial content   |
| `--font-mono`   | Monospace  | `monospace`                | 400, 700             | Code, eyebrow labels, technical text |

Default font family: `var(--font-sans)`.

### Lexend Font

`--font-prose` uses [Lexend](https://www.lexend.com/), a variable sans-serif typeface designed for improved reading comfort and comprehension. It is licensed under the SIL Open Font License (OFL).

#### Font Files

Font files are located at:

```
assets/fonts/lexend/
```

| File                              | Type     | Axis   | Use When                              |
| --------------------------------- | -------- | ------ | ------------------------------------- |
| `Lexend-VariableFont_wght.ttf`    | Variable | `wght` | Preferred — single file, all weights  |
| `static/Lexend-{Weight}.ttf`      | Static   | —      | Fallback when variable fonts are unsupported |

Available static weights: Thin (100), ExtraLight (200), Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800), Black (900).

#### @font-face Example

```css
@font-face {
  font-family: 'Lexend';
  src: url('assets/fonts/lexend/Lexend-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}
```

### Heading Scale

Headings use the sans font at most sizes, transitioning to the monospace font at the `xs` size for eyebrow labels.

| Size Token | Font          | Desktop Size | Mobile Size | Line Height | Notes                           |
| ---------- | ------------- | ------------ | ----------- | ----------- | ------------------------------- |
| `3xl`      | `--font-sans` | 11.25rem     | 5.25rem     | 90%         | letter-spacing: -0.01em         |
| `2xl`      | `--font-sans` | 6.25rem      | 5rem        | 85%         | uppercase, letter-spacing: -1px |
| `xl`       | `--font-sans` | 7.5rem       | 5rem        | 82%         | letter-spacing: -0.01em         |
| `lg`       | `--font-sans` | 4rem         | 2.5rem      | 105%        |                                 |
| `md`       | `--font-sans` | 3.125rem     | 1.875rem    | 110%        | letter-spacing: -0.02em         |
| `rg`       | `--font-sans` | 2.5rem       | 1.875rem    | 105%        |                                 |
| `sm`       | `--font-sans` | 1.625rem     | 1.375rem    | 1.9375rem   |                                 |
| `xs`       | `--font-mono` | 0.875rem     | 0.75rem     | 1.05rem     | letter-spacing: 1px             |

### Body Text Scale

Body text always uses `--font-sans`. Where mobile size is not listed, it matches the desktop value. Where line height is not listed, use `normal`.

| Size Token | Desktop Size | Mobile Size | Line Height |
| ---------- | ------------ | ----------- | ----------- |
| `3xl`      | 2rem         | 1.5rem      | 120%        |
| `2xl`      | 1.5rem       | 1.5rem      | 120%        |
| `xl`       | 1.375rem     | 1.375rem    | normal      |
| `lg`       | 1.25rem      | 1.25rem     | 145%        |
| `md`       | 1.125rem     | 1.125rem    | 150%        |
| `sm`       | 1rem         | 0.875rem    | 160%        |
| `rg`       | 0.875rem     | 0.75rem     | 150%        |
| `xs`       | 0.75rem      | 0.75rem     | 150%        |
| `2xs`      | 0.625rem     | 0.625rem    | 150%        |

### Font Weights

| Token      | Weight |
| ---------- | ------ |
| `regular`  | 400    |
| `medium`   | 500    |
| `semibold` | 600    |
| `bold`     | 700    |

## Colors

Color palette is sourced from the [Nightfox](https://github.com/EdenEast/nightfox.nvim) theme family, specifically **CarbonFox**.

Accent color variables follow the pattern `--{color}`, `--{color}-dim`, and `--{color}-bright`.

### Palette (CarbonFox)

#### Backgrounds

Layered surface colors, from deepest to highest elevation.

| Name | Variable | Hex       | Usage                |
| ---- | -------- | --------- | -------------------- |
| bg0  | `--bg0`  | `#0c0c0c` | Base/root background |
| bg1  | `--bg1`  | `#161616` | Primary surface      |
| bg2  | `--bg2`  | `#252525` | Elevated surface     |
| bg3  | `--bg3`  | `#353535` | Active/hover surface |
| bg4  | `--bg4`  | `#535353` | Highest elevation    |

#### Foregrounds

Text colors, from brightest to most muted.

| Name | Variable | Hex       | Usage                     |
| ---- | -------- | --------- | ------------------------- |
| fg0  | `--fg0`  | `#f9fbff` | Primary/heading text      |
| fg1  | `--fg1`  | `#f2f4f8` | Body text                 |
| fg2  | `--fg2`  | `#b6b8bb` | Muted/secondary text      |
| fg3  | `--fg3`  | `#7b7c7e` | Disabled/placeholder text |

#### Selection

| Name | Variable | Hex       | Usage                |
| ---- | -------- | --------- | -------------------- |
| sel0 | `--sel0` | `#2a2a2a` | Selection background |
| sel1 | `--sel1` | `#525253` | Active selection     |

#### Comment

| Variable    | Hex       |
| ----------- | --------- |
| `--comment` | `#6e6f70` |

#### Accent Colors

| Color   | Dim       | Base      | Bright    | Usage                                   |
| ------- | --------- | --------- | --------- | --------------------------------------- |
| Blue    | `#6690d9` | `#78a9ff` | `#8cb6ff` | Primary accent, links, focus rings      |
| Cyan    | `#2b96d9` | `#33b1ff` | `#52bdff` | Info, highlights, secondary interactive |
| Green   | `#1fa25a` | `#25be6a` | `#46c880` | Success states, confirmations           |
| Red     | `#ca4780` | `#ee5396` | `#f16da6` | Errors, destructive actions             |
| Pink    | `#d96b9b` | `#ff7eb6` | `#ff91c1` | Decorative accents, badges              |
| Magenta | `#a27fd9` | `#be95ff` | `#c8a5ff` | Warnings, emphasis, tags                |
| Teal    | `#07a19e` | `#08bdba` | `#2dc7c4` | Tertiary accent, types                  |

## Theming

`color-scheme: dark`

| Semantic Token     | Maps To  | Resolved Value |
| ------------------ | -------- | -------------- |
| `--bg-default`     | `--bg0`  | `#0c0c0c`      |
| `--bg-surface`     | `--bg1`  | `#161616`      |
| `--bg-elevated`    | `--bg2`  | `#252525`      |
| `--fg-default`     | `--fg0`  | `#f9fbff`      |
| `--fg-body`        | `--fg1`  | `#f2f4f8`      |
| `--fg-muted`       | `--fg2`  | `#b6b8bb`      |
| `--fg-disabled`    | `--fg3`  | `#7b7c7e`      |
| `--border`         | `--bg3`  | `#353535`      |
| `--stroke-divider` | `--bg4`  | `#535353`      |

### Semantic Colors

| Token       | Maps To      | Resolved Value | Usage                    |
| ----------- | ------------ | -------------- | ------------------------ |
| `--accent`  | `--blue`     | `#78a9ff`      | Primary interactive      |
| `--error`   | `--red`      | `#ee5396`      | Errors, destructive      |
| `--warning` | `--magenta`  | `#be95ff`      | Warnings, cautions       |
| `--success` | `--green`    | `#25be6a`      | Confirmations, positive  |
| `--info`    | `--cyan`     | `#33b1ff`      | Informational highlights |

### CSS Custom Properties Scaffold

For a ready-to-paste `:root` block that wires up all tokens, see [references/theme-setup.md](references/theme-setup.md).

## Buttons

### Primary Button

| State    | Background       | Border           | Text Color |
| -------- | ---------------- | ---------------- | ---------- |
| Default  | `--blue`         | `--blue-bright`  | `--bg0`    |
| Hover    | `--blue-bright`  | `--blue-bright`  | `--bg0`    |
| Active   | `--blue-dim`     | `--blue`         | `--bg0`    |
| Disabled | `--bg2`          | `--bg3`          | `--fg3`    |

### Secondary Button

| State    | Background | Border   | Text Color |
| -------- | ---------- | -------- | ---------- |
| Default  | `--bg2`    | `--bg4`  | `--fg0`    |
| Hover    | `--bg3`    | `--sel1` | `--fg0`    |
| Active   | `--bg3`    | `--sel1` | `--fg0`    |
| Disabled | `--bg1`    | `--bg3`  | `--fg3`    |

### Button Styling

- Font: `--font-sans`, 0.875rem, weight 500
- Border: 1px solid
- Border radius: 5px (`--radius-md`) — all buttons use the same radius
- Size tokens: `xs` (0.25rem 0.5rem), `sm` (0.5rem 0.75rem), `md` (0.625rem 1.5rem), `lg` (0.9375rem 2.25rem)
- Disabled: `opacity: 0.5; cursor: not-allowed; pointer-events: none`

### Focus States

All interactive elements use the same focus ring:

- `outline: 2px solid var(--accent)`
- `outline-offset: 2px`
- Apply on `:focus-visible` only (not `:focus`) to avoid showing rings on mouse clicks

## Links

| State          | Color            | Decoration    |
| -------------- | ---------------- | ------------- |
| Default        | `--accent`       | none          |
| Hover          | `--blue-bright`  | underline     |
| Active         | `--blue-dim`     | underline     |
| Visited        | `--magenta`      | none          |
| Focus-visible  | `--accent`       | focus ring    |

Focus ring matches the button focus style: `outline: 2px solid var(--accent); outline-offset: 2px`.

## Spacing Tokens

| Token | Desktop  | Mobile   |
| ----- | -------- | -------- |
| `xs`  | 1rem     | 1rem     |
| `sm`  | 1.5rem   | 1.5rem   |
| `md`  | 2.5rem   | 2rem     |
| `rg`  | 3rem     | 2.625rem |
| `lg`  | 4.5rem   | 3.875rem |
| `xl`  | 6rem     | 3.75rem  |

## Shadows

Use shadows sparingly. On dark backgrounds, shadows are less visible — rely on background elevation changes for primary hierarchy and use shadows as supplemental depth cues.

| Token | Value                                            | Usage                   |
| ----- | ------------------------------------------------ | ----------------------- |
| `sm`  | `0 1px 2px rgba(0, 0, 0, 0.15)`                 | Subtle lift (tooltips)  |
| `md`  | `0 4px 12px rgba(0, 0, 0, 0.2)`                 | Cards, dropdowns        |
| `lg`  | `0 8px 30px rgba(0, 0, 0, 0.3)`                 | Modals, dialogs         |

## Border Radius

Only three border-radius values are allowed. Never use any other value (no `0`, no pill `9999px`, no arbitrary radii).

| Token | Value  | Usage                                        |
| ----- | ------ | -------------------------------------------- |
| `sm`  | 2.5px  | Tight controls: checkboxes, tooltips, badges |
| `md`  | 5px    | Default UI: buttons, inputs, cards, selects  |
| `lg`  | 10px   | Large surfaces: modals, dialogs, panels      |

## Z-Index

Layered from lowest to highest. Never use arbitrary z-index values outside this scale.

| Token      | Value | Usage                        |
| ---------- | ----- | ---------------------------- |
| `base`     | 0     | Default stacking context     |
| `dropdown` | 100   | Dropdowns, select menus      |
| `sticky`   | 200   | Sticky headers, navbars      |
| `overlay`  | 300   | Backdrop overlays            |
| `modal`    | 400   | Modals, dialogs              |
| `popover`  | 500   | Popovers, floating elements  |
| `toast`    | 600   | Toast notifications, alerts  |

## Breakpoints

Mobile-first: base styles target the smallest viewport, then layer on overrides at each breakpoint using `min-width`.

| Token | Width   | Usage                              |
| ----- | ------- | ---------------------------------- |
| `sm`  | 640px   | Large phones, landscape            |
| `md`  | 768px   | Tablets                            |
| `lg`  | 1024px  | Small desktops, landscape tablets  |
| `xl`  | 1260px  | Desktop — wider container padding  |
| `2xl` | 1600px  | Large desktop — max container      |

## Transitions

| Token    | Duration | Usage                                 |
| -------- | -------- | ------------------------------------- |
| `fast`   | 100ms    | Micro-interactions (hover highlights) |
| `normal` | 200ms    | Standard UI (buttons, links, inputs)  |
| `slow`   | 350ms    | Emphasis (modals, panels, overlays)   |

Default easing: `ease-in-out`. Always respect the user's motion preference:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
}
```

## Layout

- Max container width: 1390px (1280px below `2xl` breakpoint)
- Container padding: 24px (80px between `xl` and `2xl` breakpoints)
- Base font size: 16px
- Text rendering: `optimizeLegibility` with `-webkit-font-smoothing: antialiased`
- Color scheme: `dark`
- Approach: mobile-first — write base styles for small screens, then use `@media (min-width)` to add overrides at each breakpoint (see Breakpoints above)

## Icons

This project uses [Iconoir](https://iconoir.com/), an open-source SVG icon library (MIT licensed).

### Variants

| Variant   | Style   | Count | Use For                                    |
| --------- | ------- | ----- | ------------------------------------------ |
| `regular` | Outline | 1383  | UI chrome, navigation, default icon style  |
| `solid`   | Filled  | 288   | Emphasis, active/selected states, badges   |

All 288 solid icons also exist in the regular set. Default to `regular`; use `solid` for visual emphasis or toggled-on states.

### File Paths

Icons are located at:

```
assets/icons/{variant}/{icon-name}.svg
```

Examples: `assets/icons/regular/arrow-right.svg`, `assets/icons/solid/star.svg`

### SVG Specifications

| Property       | Regular (Outline)    | Solid (Filled)                   |
| -------------- | -------------------- | -------------------------------- |
| Size           | 24 x 24             | 24 x 24                         |
| `stroke-width` | 1.5                  | 1.5                              |
| `stroke`       | `currentColor`       | `currentColor`                   |
| `fill`         | `none`               | `currentColor`                   |

### Styling

- Icons inherit text color via `currentColor` — set `color` on the parent or the SVG element to recolor.
- Resize with `width` and `height` attributes or CSS; the 24x24 viewBox scales proportionally.
- Adjust stroke weight on regular icons with the `stroke-width` attribute.
- Icon names use kebab-case (e.g., `arrow-right`, `warning-circle`, `send-mail`).

For categorized icon listings and usage examples, see [references/icons.md](references/icons.md).

For component-level styling (forms, cards, modals, tooltips, badges), see [references/components.md](references/components.md).
