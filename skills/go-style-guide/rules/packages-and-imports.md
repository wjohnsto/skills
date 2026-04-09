---
description: >-
  Package and import guidance from Google's Go style docs, including naming,
  structure, dependency choices, and local consistency.
---

# Packages and imports

## Package design

- Choose focused package boundaries that make dependencies and behavior easy to
  understand.
- Avoid needless abstraction layers and "utility package" sprawl.
- Prefer concrete, problem-shaped packages over catch-all buckets.
- Keep dependencies minimal so behavior stays easier to trace and maintain.

## Package naming

- Package names should be concise, lowercase, and easy to say at the call site.
- Do not insert underscores into normal package names.
- Rename third-party or generated packages locally if their original import name
  does not fit Go naming rules.

```go
import foopb "example.com/project/foo_go_proto"
```

## Imports and mechanisms

- **Canonical**: Prefer the simplest standard mechanism that solves the problem.
- Start with core language constructs, then the standard library, then any
  shared internal library that is clearly justified.
- Do not add a dependency or custom abstraction just to appear more generic.

## Consistency

- Package-level consistency matters because readers build expectations within a
  file and package.
- Consistency does not override stronger guidance from the canonical style
  guide.
- When multiple local files rename the same import, keep the local alias
  consistent unless a file has a strong reason to differ.
