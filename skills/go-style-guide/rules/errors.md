---
description: >-
  Error-handling guidance from Google's Go style documentation, with a focus on
  readable control flow and actionable diagnostics.
---

# Errors

## Core expectations

- **Canonical**: Make error handling easy to scan and understand.
- Make each error path tell the reader what failed and where the failure
  matters.
- Prefer clear, direct control flow over compact expressions that hide
  important behavior.

## Readability rules

- Keep common `if err != nil` checks straightforward unless you have a strong
  reason to deviate.
- If a subtle error check differs from the common pattern, make that
  difference obvious with structure or a short comment.
- Avoid helpers that hide important failure logic if the caller must see that
  logic to know that the code is correct.

```go
if err := doSomething(); err != nil {
    return fmt.Errorf("do something: %w", err)
}
```

## Diagnostics

- Make error messages and test failures useful to the person who debugs the
  issue.
- Prefer diagnostics that show the failed operation or the meaningful mismatch,
  not generic failure text.
- Keep guidance in the scope of the Google style documentation. Do not add
  extra error-style rules from unrelated conventions.
