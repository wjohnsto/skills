---
description: Component-level styling patterns for forms, cards, modals, tooltips, and badges.
metadata:
  tags: [components, forms, inputs, cards, modals, tooltips, badges, ui]
---

# Component Patterns

Token-based styling for common UI primitives. All components use semantic tokens from the main visual guide.

## Text Inputs

| State    | Background   | Border     | Text Color   | Placeholder  |
| -------- | ------------ | ---------- | ------------ | ------------ |
| Default  | `--bg1`      | `--bg3`    | `--fg1`      | `--fg3`      |
| Hover    | `--bg1`      | `--bg4`    | `--fg1`      | `--fg3`      |
| Focus    | `--bg1`      | `--accent` | `--fg0`      | `--fg3`      |
| Error    | `--bg1`      | `--error`  | `--fg0`      | `--fg3`      |
| Disabled | `--bg2`      | `--bg3`    | `--fg3`      | `--fg3`      |

### Input Styling

- Font: `--font-sans`, 1rem, weight 400
- Border: 1px solid
- Border radius: `--radius-md` (5px)
- Padding: 0.625rem 0.75rem
- Focus: adds `outline: 2px solid var(--accent); outline-offset: 2px`
- Error: add error message below in `--error` color at body `xs` size
- Disabled: `opacity: 0.5; cursor: not-allowed`

## Textarea

Follows the same state/token pattern as text inputs. Additional rules:

- Default height: 6rem (roughly 4 lines)
- `resize: vertical` — allow vertical resize only
- Use `--font-prose` for long-form content areas, `--font-sans` for short fields

## Select

Native `<select>` styling with custom appearance.

| State    | Background   | Border     | Text Color   |
| -------- | ------------ | ---------- | ------------ |
| Default  | `--bg1`      | `--bg3`    | `--fg1`      |
| Hover    | `--bg1`      | `--bg4`    | `--fg1`      |
| Focus    | `--bg1`      | `--accent` | `--fg0`      |
| Disabled | `--bg2`      | `--bg3`    | `--fg3`      |

### Select Styling

- Same padding, font, and border radius as text inputs
- Use a `nav-arrow-down` icon (from Iconoir) as the dropdown indicator, colored `--fg2`
- Hide native arrow with `appearance: none`

## Checkbox & Radio

| State     | Border     | Fill       | Check Color |
| --------- | ---------- | ---------- | ----------- |
| Unchecked | `--bg4`    | `--bg1`    | —           |
| Checked   | `--accent` | `--accent` | `--bg0`     |
| Hover     | `--sel1`   | `--bg1`    | —           |
| Disabled  | `--bg3`    | `--bg2`    | `--fg3`     |

### Checkbox/Radio Styling

- Size: 1.125rem x 1.125rem
- Border: 1.5px solid
- Checkbox border radius: `--radius-sm` (2.5px); radio: `--radius-lg` (10px)
- Label: `--font-sans`, body `sm` size, `--fg1`
- Gap between control and label: 0.5rem
- Use `check` icon (Iconoir) for checkbox mark; filled circle for radio

## Toggle / Switch

| State | Track Background | Track Border | Thumb Color |
| ----- | ---------------- | ------------ | ----------- |
| Off   | `--bg2`          | `--bg4`      | `--fg2`     |
| On    | `--accent`       | `--accent`   | `--bg0`     |

### Toggle Styling

- Track: 2.5rem x 1.375rem, `--radius-lg` (10px)
- Thumb: 1rem x 1rem, `--radius-lg` (10px)
- Transition: `--transition-fast` for slide
- Disabled: same opacity/cursor rule as buttons

## Cards

| Property   | Token          |
| ---------- | -------------- |
| Background | `--bg1`        |
| Border     | `--bg3`        |
| Shadow     | `--shadow-md`  |
| Text       | `--fg1`        |
| Heading    | `--fg0`        |
| Muted text | `--fg2`        |

### Card Styling

- Border: 1px solid
- Border radius: `--radius-md` (5px)
- Padding: spacing `sm` (1.5rem)
- Use heading `sm` for card titles, body `rg` for card content

## Modals / Dialogs

| Property   | Token                         |
| ---------- | ----------------------------- |
| Overlay    | `rgba(0, 0, 0, 0.6)`         |
| Background | `--bg1`                       |
| Border     | `--bg3`                       |
| Shadow     | `--shadow-lg`                 |
| Text       | `--fg1`                       |
| Z-index    | `--z-modal` (400)             |

### Modal Styling

- Max width: 32rem (small), 48rem (medium), 64rem (large)
- Border radius: `--radius-lg` (10px)
- Padding: spacing `md` (2.5rem)
- Center vertically and horizontally with flexbox or `position: fixed; inset: 0; margin: auto`
- Transition: `--transition-slow` for open/close
- Trap focus within the modal while open; return focus on close
- Close on `Escape` key and overlay click

## Tooltips

| Property   | Token                  |
| ---------- | ---------------------- |
| Background | `--bg3`                |
| Text       | `--fg0`                |
| Shadow     | `--shadow-sm`          |
| Z-index    | `--z-popover` (500)    |

### Tooltip Styling

- Font: `--font-sans`, body `xs` size, weight 500
- Max width: 16rem
- Padding: 0.375rem 0.625rem
- Border radius: `--radius-sm` (2.5px)
- Arrow: 6px CSS triangle using the same background color
- Delay: 200ms before showing
- Transition: `--transition-fast` for fade in/out

## Badges / Tags

| Variant  | Background       | Text Color   | Border         |
| -------- | ---------------- | ------------ | -------------- |
| Default  | `--bg2`          | `--fg1`      | `--bg4`        |
| Blue     | `--blue-dim`     | `--bg0`      | `--blue`       |
| Green    | `--green-dim`    | `--bg0`      | `--green`      |
| Red      | `--red-dim`      | `--bg0`      | `--red`        |
| Magenta  | `--magenta-dim`  | `--bg0`      | `--magenta`    |

### Badge Styling

- Font: `--font-mono`, body `2xs` size (0.625rem), weight 700, uppercase
- Letter spacing: 0.5px
- Padding: 0.125rem 0.5rem
- Border: 1px solid
- Border radius: `--radius-lg` (10px)
