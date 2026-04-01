---
description: Ready-to-paste CSS custom properties for dark theme scaffolding.
metadata:
  tags: [theme, css, custom-properties, dark, scaffold]
---

# Theme Setup

Set `color-scheme: dark` on `:root` and define all tokens in one place.

```css
:root {
  color-scheme: dark;

  --font-sans: system-ui, sans-serif;
  --font-prose: 'Lexend', sans-serif;
  --font-mono: monospace;

  --bg-default: #0c0c0c;
  --bg-surface: #161616;
  --bg-elevated: #252525;
  --fg-default: #f9fbff;
  --fg-body: #f2f4f8;
  --fg-muted: #b6b8bb;
  --fg-disabled: #7b7c7e;
  --border: #353535;
  --stroke-divider: #535353;

  --accent: #78a9ff;
  --error: #ee5396;
  --warning: #be95ff;
  --success: #25be6a;
  --info: #33b1ff;

  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-toast: 600;

  --transition-fast: 100ms ease-in-out;
  --transition-normal: 200ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.15);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.3);
}
```
