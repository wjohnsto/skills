---
name: visual-guide
description: >-
    Use when building frontend UI components or pages. Covers brand colors,
    typography scales, spacing tokens, button styles, dark theme, and layout
    constraints.
license: MIT
metadata:
    author: wjohnsto
    version: '1.0'
    category: reference
    triggers: frontend, UI, colors, typography, brand, theme, icons, buttons
---

# Visual Guide

## When to Use

- Choosing colors, fonts, or spacing for UI components
- Creating new pages or layouts
- Styling buttons, headings, or body text
- Implementing dark theme
- Checking brand-correct color values or CSS variable names

## Typography

This project uses two font families, assigned to CSS custom properties.

### Font Families

| Variable           | Type       | Weights       | Usage                                |
| ------------------ | ---------- | ------------- | ------------------------------------ |
| `--primary-font`   | Sans-serif | 400, 500, 700 | Headings, body text, buttons, UI     |
| `--secondary-font` | Monospace  | 400, 700      | Code, eyebrow labels, technical text |

**Font stacks:**

- `--primary-font`: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`
- `--secondary-font`: `'SF Mono', 'Fira Code', 'Cascadia Code', monospace`

Always include a `sans-serif` fallback for the primary font, and `monospace` for the secondary font.

### Heading Scale

Headings use the primary font at most sizes, transitioning to the secondary (monospace) font at the `xs` size for eyebrow labels.

| Size Token | Font               | Desktop Size | Mobile Size | Line Height | Notes                           |
| ---------- | ------------------ | ------------ | ----------- | ----------- | ------------------------------- |
| `3xl`      | `--primary-font`   | 180px        | 84px        | 90%         | letter-spacing: -0.01em         |
| `2xl`      | `--primary-font`   | 100px        | 80px        | 85%         | uppercase, letter-spacing: -1px |
| `xl`       | `--primary-font`   | 120px        | 80px        | 82%         | letter-spacing: -0.01em         |
| `lg`       | `--primary-font`   | 64px         | 40px        | 105%        |                                 |
| `md`       | `--primary-font`   | 50px         | 30px        | 110%        | letter-spacing: -0.02em         |
| `rg`       | `--primary-font`   | 40px         | 30px        | 105%        |                                 |
| `sm`       | `--primary-font`   | 26px         | 22px        | 31px        |                                 |
| `xs`       | `--secondary-font` | 14px         | 12px        | 16.8px      | letter-spacing: 1px             |

### Body Text Scale

Body text always uses `--primary-font`.

| Size Token | Desktop Size | Mobile Size | Line Height |
| ---------- | ------------ | ----------- | ----------- |
| `3xl`      | 32px         | 24px        | 120%        |
| `2xl`      | 24px         | —           | 120%        |
| `xl`       | 22px         | —           | —           |
| `lg`       | 20px         | —           | 145%        |
| `md`       | 18px         | —           | 150%        |
| `sm`       | 16px         | 14px        | 160%        |
| `rg`       | 14px         | 12px        | 150%        |
| `xs`       | 12px         | —           | 150%        |
| `2xs`      | 10px         | —           | 150%        |

### Font Weights

| Token      | Weight |
| ---------- | ------ |
| `regular`  | 400    |
| `medium`   | 500    |
| `semibold` | 600    |
| `bold`     | 700    |

## Colors

### Brand Core

| Name          | Variable          | Hex       | Usage                          |
| ------------- | ----------------- | --------- | ------------------------------ |
| Primary Color | `--primary-color` | `#FF4438` | Primary brand color            |
| Midnight      | `--midnight`      | `#091A23` | Dark backgrounds, primary text |
| Yellow (Volt) | `--yellow`        | `#DCFF1E` | Accent on dark, highlights     |
| White         | `--base-white`    | `#FFFFFF` | Light backgrounds              |
| Black         | `--base-black`    | `#000000` | —                              |

### Red / Hyper Scale

The primary action color scale, used for buttons, links, and interactive elements.

| Name     | Variable     | Hex       | Usage                           |
| -------- | ------------ | --------- | ------------------------------- |
| Hyper 04 | `--hyper-04` | `#FD736A` | Light red, hover accents        |
| Hyper 05 | `--hyper-05` | `#FF4438` | Same as Primary Color           |
| Hyper 06 | `--hyper-06` | `#EB352A` | Slightly darker red             |
| Hyper 07 | `--hyper-07` | `#E4291E` | Primary button bg, links        |
| Hyper 08 | `--hyper-08` | `#D1281E` | Button hover bg                 |
| Hyper 09 | `--hyper-09` | `#8A221C` | Deep red, active states         |
| Hyper 10 | `--hyper-10` | `#351D22` | Darkest red, dark theme buttons |

### Neutrals (Black Scale)

| Name     | Variable     | Hex       |
| -------- | ------------ | --------- |
| Black 90 | `--black-90` | `#191919` |
| Black 70 | `--black-70` | `#4C4C4C` |
| Black 60 | `--black-60` | `#6D6E71` |
| Black 50 | `--black-50` | `#808080` |
| Black 30 | `--black-30` | `#B2B2B2` |
| Black 10 | `--black-10` | `#E5E5E5` |

### Neutrals (Grey Scale)

| Name       | Variable       | Hex       |
| ---------- | -------------- | --------- |
| Grey 50    | `--grey-50`    | `#F9FAFB` |
| Grey 20    | `--grey-20`    | `#E9E9E9` |
| Grey 10    | `--grey-10`    | `#FCFCFC` |
| Light Gray | `--light-gray` | `#F8F8F8` |

### Dusk Scale (Blue-Grey)

Used for dark themes, muted text, borders, and subtle backgrounds.

| Name    | Variable    | Hex       | Usage                            |
| ------- | ----------- | --------- | -------------------------------- |
| Dusk    | `--dusk`    | `#163341` | Dark UI surfaces                 |
| Dusk 01 | `--dusk-01` | `#F3F3F3` | Light primary button bg          |
| Dusk 09 | `--dusk-09` | `#0D212C` | Deepest dark surface             |
| Dusk 10 | `--dusk-10` | `#D9D9D9` | Borders, body text (dark theme)  |
| Dusk 30 | `--dusk-30` | `#B9C2C6` | Borders, muted text (dark theme) |
| Dusk 50 | `--dusk-50` | `#8A99A0` | Placeholder text, dividers       |
| Dusk 90 | `--dusk-90` | `#2D4754` | Dark surface variant             |

### Yellow / Volt Scale

Used as an accent color, especially on dark backgrounds.

| Name      | Variable      | Hex       |
| --------- | ------------- | --------- |
| Yellow    | `--yellow`    | `#DCFF1E` |
| Yellow 06 | `--yellow-06` | `#D0F41D` |
| Yellow 07 | `--yellow-07` | `#BFE112` |
| Yellow 08 | `--yellow-08` | `#A9CA03` |
| Yellow 09 | `--yellow-09` | `#8CAA00` |
| Yellow 10 | `--yellow-10` | `#FBFFE8` |
| Yellow 11 | `--yellow-11` | `#4E5F02` |
| Yellow 50 | `--yellow-50` | `#F1FFA5` |

### Purple Scale

| Name      | Variable      | Hex       |
| --------- | ------------- | --------- |
| Purple 05 | `--purple-05` | `#B76BE2` |
| Purple 07 | `--purple-07` | `#8F2EC4` |
| Violet    | `--violet`    | `#C795E3` |
| Violet 09 | `--violet-09` | `#592479` |
| Violet 10 | `--violet-10` | `#F9F4FC` |
| Violet 50 | `--violet-50` | `#E3CAF1` |
| Violet 90 | `--violet-90` | `#5925E8` |

### Sky Blue Scale

| Name        | Variable        | Hex       |
| ----------- | --------------- | --------- |
| Sky Blue    | `--sky-blue`    | `#80DBFF` |
| Sky Blue 09 | `--sky-blue-09` | `#0477A5` |
| Sky Blue 10 | `--sky-blue-10` | `#F2FBFF` |
| Sky Blue 50 | `--sky-blue-50` | `#BFEDFF` |
| Light Blue  | `--light-blue`  | `#F9FDFF` |

## Theming

This project uses a dark theme.

### Dark Theme

| Semantic Token     | Maps To        | Resolved Value |
| ------------------ | -------------- | -------------- |
| `--bg-default`     | `--midnight`   | `#091A23`      |
| `--fg-default`     | `--base-white` | `#FFFFFF`      |
| `--fg-body`        | `--dusk-10`    | `#D9D9D9`      |
| `--fg-muted`       | `--dusk-30`    | `#B9C2C6`      |
| `--fg-brand`       | `--yellow`     | `#DCFF1E`      |
| `--border`         | `--dusk`       | `#163341`      |
| `--stroke-divider` | `--dusk-50`    | `#8A99A0`      |

## Buttons

### Primary Button (Dark Theme)

| State   | Background   | Border       | Text Color     |
| ------- | ------------ | ------------ | -------------- |
| Default | `--hyper-10` | `--hyper-05` | `--base-white` |
| Hover   | `--hyper-09` | `--hyper-06` | `--base-white` |
| Active  | `--hyper-09` | `--hyper-06` | `--base-white` |

### Secondary Button (Dark Theme)

| State   | Background  | Border      | Text Color     |
| ------- | ----------- | ----------- | -------------- |
| Default | `--dusk`    | `--dusk-90` | `--base-white` |
| Hover   | `--dusk-90` | `--dusk-70` | `--base-white` |
| Active  | `--dusk-90` | `--dusk-70` | `--base-white` |

### Button Styling

- Font: `--primary-font`, 14px, weight 500
- Border: 1px solid
- Variants: `pill` (border-radius: 200px), `rounded` (border-radius: 5px), `square` (border-radius: 0)
- Size tokens: `xs` (4px 8px), `sm` (8px 12px), `md` (10px 24px), `lg` (15px 36px)

## Spacing Tokens

| Token | Desktop | Mobile |
| ----- | ------- | ------ |
| `xs`  | 16px    | 16px   |
| `sm`  | 24px    | 24px   |
| `md`  | 40px    | 32px   |
| `rg`  | 48px    | 42px   |
| `lg`  | 72px    | 62px   |
| `xl`  | 96px    | 60px   |

## Layout

- Max container width: 1390px (1280px below 1600px viewport)
- Container padding: 24px (80px between 1260px–1600px viewport)
- Base font size: 16px
- Text rendering: `optimizeLegibility` with `-webkit-font-smoothing: antialiased`

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
