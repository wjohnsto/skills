---
description: >-
  Error-handling guidance from Google's Go style docs, focused on readable
  control flow and actionable diagnostics.
---

# Errors

## Core expectations

- **Canonical**: Error handling should be easy to scan and understand.
- Error paths should tell the reader what failed and where the failure matters.
- Prefer clear, direct control flow over compact expressions that hide important
  behavior.

## Readability rules

- Keep common `if err != nil` checks straightforward unless there is a strong
  reason to deviate.
- If a subtle error check differs from the common pattern, make that difference
  obvious with structure or a short comment.
- Avoid hiding important failure logic inside helpers when the caller needs to
  see it to reason about correctness.

```go
if err := doSomething(); err != nil {
    return fmt.Errorf("do something: %w", err)
}
```

## Diagnostics

- Error messages and test failures should be useful to the person debugging the
  issue.
- Prefer diagnostics that show the failing operation or meaningful mismatch
  rather than generic failure text.
- Keep guidance scoped to what the Google style docs cover. Do not import extra
  error-style dogma from unrelated conventions.
