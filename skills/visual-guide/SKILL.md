---
name: visual-guide
description: >-
    Use when building frontend UI components or pages. Covers brand colors,
    typography scales, spacing tokens, button styles, dark/light themes, and
    layout constraints.
license: MIT
metadata:
    author: wjohnsto
    version: '2.0'
    category: reference
    triggers: frontend, UI, colors, typography, brand, theme, light, dark, icons, buttons
---

# Visual Guide

## When to Use

- Choosing colors, fonts, or spacing for UI components
- Creating new pages or layouts
- Styling buttons, headings, or body text
- Implementing dark or light theme
- Checking brand-correct color values or CSS variable names

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

Body text always uses `--font-sans`.

| Size Token | Desktop Size | Mobile Size | Line Height |
| ---------- | ------------ | ----------- | ----------- |
| `3xl`      | 2rem         | 1.5rem      | 120%        |
| `2xl`      | 1.5rem       | —           | 120%        |
| `xl`       | 1.375rem     | —           | —           |
| `lg`       | 1.25rem      | —           | 145%        |
| `md`       | 1.125rem     | —           | 150%        |
| `sm`       | 1rem         | 0.875rem    | 160%        |
| `rg`       | 0.875rem     | 0.75rem     | 150%        |
| `xs`       | 0.75rem      | —           | 150%        |
| `2xs`      | 0.625rem     | —           | 150%        |

### Font Weights

| Token      | Weight |
| ---------- | ------ |
| `regular`  | 400    |
| `medium`   | 500    |
| `semibold` | 600    |
| `bold`     | 700    |

## Colors

Color palettes are sourced from the [Nightfox](https://github.com/EdenEast/nightfox.nvim) theme family. The dark theme uses **CarbonFox** and the light theme uses **DayFox**.

Accent color variables follow the pattern `--{color}`, `--{color}-dim`, and `--{color}-bright`.

### Dark Palette (CarbonFox)

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

### Light Palette (DayFox)

#### Backgrounds

Layered surface colors. In light theme, the base is lightest and elevation increases toward darker values.

| Name | Variable | Hex       | Usage                |
| ---- | -------- | --------- | -------------------- |
| bg0  | `--bg0`  | `#e4dcd4` | Recessed surface     |
| bg1  | `--bg1`  | `#f6f2ee` | Base/root background |
| bg2  | `--bg2`  | `#dbd1dd` | Elevated surface     |
| bg3  | `--bg3`  | `#d3c7bb` | Active/hover surface |
| bg4  | `--bg4`  | `#aab0ad` | Highest elevation    |

#### Foregrounds

Text colors, from darkest to most muted.

| Name | Variable | Hex       | Usage                     |
| ---- | -------- | --------- | ------------------------- |
| fg0  | `--fg0`  | `#302b5d` | Primary/heading text      |
| fg1  | `--fg1`  | `#3d2b5a` | Body text                 |
| fg2  | `--fg2`  | `#643f61` | Muted/secondary text      |
| fg3  | `--fg3`  | `#824d5b` | Disabled/placeholder text |

#### Selection

| Name | Variable | Hex       | Usage                |
| ---- | -------- | --------- | -------------------- |
| sel0 | `--sel0` | `#e7d2be` | Selection background |
| sel1 | `--sel1` | `#a4c1c2` | Active selection     |

#### Comment

| Variable    | Hex       |
| ----------- | --------- |
| `--comment` | `#837a72` |

#### Accent Colors

| Color   | Dim       | Base      | Bright    | Usage                                   |
| ------- | --------- | --------- | --------- | --------------------------------------- |
| Blue    | `#223d90` | `#2848a9` | `#4863b6` | Primary accent, links, focus rings      |
| Cyan    | `#22676d` | `#287980` | `#488d93` | Info, highlights, secondary interactive |
| Green   | `#30583c` | `#396847` | `#577f63` | Success states, confirmations           |
| Red     | `#8c1d28` | `#a5222f` | `#b3434e` | Errors, destructive actions             |
| Pink    | `#8b369a` | `#a440b5` | `#b25dc0` | Decorative accents, badges              |
| Magenta | `#5e2baf` | `#6e33ce` | `#8452d5` | Warnings, emphasis, tags                |
| Yellow  | `#924702` | `#ac5402` | `#b86e28` | Cautions, attention indicators          |

## Theming

This project supports dark and light themes via `color-scheme`.

### Dark Theme

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

### Light Theme

`color-scheme: light`

| Semantic Token     | Maps To  | Resolved Value |
| ------------------ | -------- | -------------- |
| `--bg-default`     | `--bg1`  | `#f6f2ee`      |
| `--bg-surface`     | `--bg0`  | `#e4dcd4`      |
| `--bg-elevated`    | `--bg2`  | `#dbd1dd`      |
| `--fg-default`     | `--fg0`  | `#302b5d`      |
| `--fg-body`        | `--fg1`  | `#3d2b5a`      |
| `--fg-muted`       | `--fg2`  | `#643f61`      |
| `--fg-disabled`    | `--fg3`  | `#824d5b`      |
| `--border`         | `--bg3`  | `#d3c7bb`      |
| `--stroke-divider` | `--bg4`  | `#aab0ad`      |

### Semantic Colors

#### Dark

| Token       | Maps To      | Resolved Value | Usage                    |
| ----------- | ------------ | -------------- | ------------------------ |
| `--accent`  | `--blue`     | `#78a9ff`      | Primary interactive      |
| `--error`   | `--red`      | `#ee5396`      | Errors, destructive      |
| `--warning` | `--magenta`  | `#be95ff`      | Warnings, cautions       |
| `--success` | `--green`    | `#25be6a`      | Confirmations, positive  |
| `--info`    | `--cyan`     | `#33b1ff`      | Informational highlights |

#### Light

| Token       | Maps To      | Resolved Value | Usage                    |
| ----------- | ------------ | -------------- | ------------------------ |
| `--accent`  | `--blue`     | `#2848a9`      | Primary interactive      |
| `--error`   | `--red`      | `#a5222f`      | Errors, destructive      |
| `--warning` | `--yellow`   | `#ac5402`      | Warnings, cautions       |
| `--success` | `--green`    | `#396847`      | Confirmations, positive  |
| `--info`    | `--cyan`     | `#287980`      | Informational highlights |

## Buttons

### Primary Button (Dark Theme)

| State   | Background       | Border           | Text Color |
| ------- | ---------------- | ---------------- | ---------- |
| Default | `--blue`         | `--blue-bright`  | `--bg0`    |
| Hover   | `--blue-bright`  | `--blue-bright`  | `--bg0`    |
| Active  | `--blue-dim`     | `--blue`         | `--bg0`    |

### Secondary Button (Dark Theme)

| State   | Background | Border   | Text Color |
| ------- | ---------- | -------- | ---------- |
| Default | `--bg2`    | `--bg4`  | `--fg0`    |
| Hover   | `--bg3`    | `--sel1` | `--fg0`    |
| Active  | `--bg3`    | `--sel1` | `--fg0`    |

### Primary Button (Light Theme)

| State   | Background       | Border           | Text Color |
| ------- | ---------------- | ---------------- | ---------- |
| Default | `--blue`         | `--blue-dim`     | `--bg1`    |
| Hover   | `--blue-dim`     | `--blue-dim`     | `--bg1`    |
| Active  | `--blue`         | `--blue`         | `--bg1`    |

### Secondary Button (Light Theme)

| State   | Background | Border   | Text Color |
| ------- | ---------- | -------- | ---------- |
| Default | `--bg0`    | `--bg4`  | `--fg0`    |
| Hover   | `--bg3`    | `--sel1` | `--fg0`    |
| Active  | `--bg3`    | `--sel1` | `--fg0`    |

### Button Styling

- Font: `--font-sans`, 0.875rem, weight 500
- Border: 1px solid
- Variants: `pill` (border-radius: 200px), `rounded` (border-radius: 5px), `square` (border-radius: 0)
- Size tokens: `xs` (0.25rem 0.5rem), `sm` (0.5rem 0.75rem), `md` (0.625rem 1.5rem), `lg` (0.9375rem 2.25rem)

## Spacing Tokens

| Token | Desktop  | Mobile   |
| ----- | -------- | -------- |
| `xs`  | 1rem     | 1rem     |
| `sm`  | 1.5rem   | 1.5rem   |
| `md`  | 2.5rem   | 2rem     |
| `rg`  | 3rem     | 2.625rem |
| `lg`  | 4.5rem   | 3.875rem |
| `xl`  | 6rem     | 3.75rem  |

## Layout

- Max container width: 1390px (1280px below 1600px viewport)
- Container padding: 24px (80px between 1260px–1600px viewport)
- Base font size: 16px
- Text rendering: `optimizeLegibility` with `-webkit-font-smoothing: antialiased`
- Color scheme: `dark` (default), `light`

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
