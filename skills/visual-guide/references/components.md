---
description: Component style patterns for forms, cards, modals, tooltips, and badges.
metadata:
  tags: [components, forms, inputs, cards, modals, tooltips, badges, ui]
---

# Component patterns

This file gives token-based styles for common UI primitives. All components use the semantic tokens from the main visual guide.

## Text inputs

| State    | Background   | Border     | Text color   | Placeholder  |
| -------- | ------------ | ---------- | ------------ | ------------ |
| Default  | `--bg1`      | `--bg3`    | `--fg1`      | `--fg3`      |
| Hover    | `--bg1`      | `--bg4`    | `--fg1`      | `--fg3`      |
| Focus    | `--bg1`      | `--accent` | `--fg0`      | `--fg3`      |
| Error    | `--bg1`      | `--error`  | `--fg0`      | `--fg3`      |
| Disabled | `--bg2`      | `--bg3`    | `--fg3`      | `--fg3`      |

### Input style

- Font: `--font-sans`, 1rem, weight 400
- Border: 1px solid
- Border radius: `--radius-md` (5px)
- Padding: 0.625rem 0.75rem
- Focus: add `outline: 2px solid var(--accent); outline-offset: 2px`
- Error: add an error message below the input, in the `--error` color at the body `xs` size
- Disabled: `opacity: 0.5; cursor: not-allowed`

## Textarea

A textarea uses the same states and tokens as text inputs. These rules also apply:

- Use a default height of 6rem (about 4 lines).
- Set `resize: vertical` to let the user resize the textarea only vertically.
- Use `--font-prose` for long-form content areas. Use `--font-sans` for short fields.

## Select

Use the native `<select>` element with a custom appearance.

| State    | Background   | Border     | Text color   |
| -------- | ------------ | ---------- | ------------ |
| Default  | `--bg1`      | `--bg3`    | `--fg1`      |
| Hover    | `--bg1`      | `--bg4`    | `--fg1`      |
| Focus    | `--bg1`      | `--accent` | `--fg0`      |
| Disabled | `--bg2`      | `--bg3`    | `--fg3`      |

### Select style

- Use the same padding, font, and border radius as text inputs.
- Use the Iconoir `nav-arrow-down` icon as the dropdown indicator, in the `--fg2` color.
- Hide the native arrow with `appearance: none`.

## Checkbox and radio

| State     | Border     | Fill       | Check color |
| --------- | ---------- | ---------- | ----------- |
| Unchecked | `--bg4`    | `--bg1`    | None        |
| Checked   | `--accent` | `--accent` | `--bg0`     |
| Hover     | `--sel1`   | `--bg1`    | None        |
| Disabled  | `--bg3`    | `--bg2`    | `--fg3`     |

### Checkbox and radio style

- Size: 1.125rem x 1.125rem
- Border: 1.5px solid
- Checkbox border radius: `--radius-sm` (2.5px)
- Radio border radius: `--radius-lg` (10px)
- Label: `--font-sans`, body `sm` size, `--fg1`
- Gap between control and label: 0.5rem
- Checkbox mark: Iconoir `check` icon
- Radio mark: filled circle

## Toggle switch

| State | Track background | Track border | Thumb color |
| ----- | ---------------- | ------------ | ----------- |
| Off   | `--bg2`          | `--bg4`      | `--fg2`     |
| On    | `--accent`       | `--accent`   | `--bg0`     |

### Toggle style

- Track: 2.5rem x 1.375rem, `--radius-lg` (10px)
- Thumb: 1rem x 1rem, `--radius-lg` (10px)
- Transition: `--transition-fast` for the slide movement
- Disabled: same opacity and cursor rules as buttons

## Cards

| Property   | Token          |
| ---------- | -------------- |
| Background | `--bg1`        |
| Border     | `--bg3`        |
| Shadow     | `--shadow-md`  |
| Text       | `--fg1`        |
| Heading    | `--fg0`        |
| Muted text | `--fg2`        |

### Card style

- Border: 1px solid
- Border radius: `--radius-md` (5px)
- Padding: spacing `sm` (1.5rem)
- Text size: heading `sm` for card titles, body `rg` for card content

## Modals and dialogs

| Property   | Token                         |
| ---------- | ----------------------------- |
| Overlay    | `rgba(0, 0, 0, 0.6)`         |
| Background | `--bg1`                       |
| Border     | `--bg3`                       |
| Shadow     | `--shadow-lg`                 |
| Text       | `--fg1`                       |
| Z-index    | `--z-modal` (400)             |

### Modal style

- Maximum width: 32rem (small), 48rem (medium), 64rem (large)
- Border radius: `--radius-lg` (10px)
- Padding: spacing `md` (2.5rem)
- Position: center vertically and horizontally with flexbox or `position: fixed; inset: 0; margin: auto`
- Transition: `--transition-slow` for open and close
- Focus: trap focus in the modal while it is open, and return focus when it closes
- Close: on the `Escape` key and on a click on the overlay

## Tooltips

| Property   | Token                  |
| ---------- | ---------------------- |
| Background | `--bg3`                |
| Text       | `--fg0`                |
| Shadow     | `--shadow-sm`          |
| Z-index    | `--z-popover` (500)    |

### Tooltip style

- Font: `--font-sans`, body `xs` size, weight 500
- Max width: 16rem
- Padding: 0.375rem 0.625rem
- Border radius: `--radius-sm` (2.5px)
- Arrow: 6px CSS triangle with the same background color
- Delay: 200ms before the tooltip appears
- Transition: `--transition-fast` for fade in and fade out

## Badges and tags

| Variant  | Background       | Text color   | Border         |
| -------- | ---------------- | ------------ | -------------- |
| Default  | `--bg2`          | `--fg1`      | `--bg4`        |
| Blue     | `--blue-dim`     | `--bg0`      | `--blue`       |
| Green    | `--green-dim`    | `--bg0`      | `--green`      |
| Red      | `--red-dim`      | `--bg0`      | `--red`        |
| Magenta  | `--magenta-dim`  | `--bg0`      | `--magenta`    |

### Badge style

- Font: `--font-mono`, body `2xs` size (0.625rem), weight 700, uppercase
- Letter spacing: 0.5px
- Padding: 0.125rem 0.5rem
- Border: 1px solid
- Border radius: `--radius-lg` (10px)
