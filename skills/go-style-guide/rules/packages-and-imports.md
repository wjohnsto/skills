---
description: >-
  Package and import guidance from Google's Go style documentation. It covers
  naming, structure, dependency choices, and local consistency.
---

# Packages and imports

## Package design

- Choose focused package boundaries that make dependencies and behavior easy to
  understand.
- Avoid unnecessary abstraction layers and too many "utility packages".
- Prefer concrete packages that match a specific problem over packages that
  hold unrelated code.
- Keep dependencies minimal so that behavior is easier to trace and maintain.

## Package naming

- Use concise, lowercase package names that are easy to say at the call site.
- Do not add underscores to normal package names.
- If the original import name of a third-party or generated package does not
  fit Go naming rules, rename it locally.

```go
import foopb "example.com/project/foo_go_proto"
```

## Imports and mechanisms

- **Canonical**: Prefer the simplest standard mechanism that solves the
  problem.
- Start with core language constructs. Then use the standard library. Then use
  a shared internal library, but only if it is clearly justified.
- Do not add a dependency or custom abstraction only to make the code look more
  generic.

## Consistency

- Package-level consistency is important because readers build expectations in
  a file and package.
- Consistency does not override stronger guidance from the canonical style
  guide.
- If multiple local files rename the same import, keep the local alias
  consistent. A file can differ only for a strong reason.
