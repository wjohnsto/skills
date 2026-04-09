---
description: >-
  Guidance for comments and documentation in Go code based on Google's
  readability-focused style rules.
---

# Comments and documentation

## Comment intent

- **Canonical**: Comments should usually explain why the code exists or why it
  takes a surprising shape.
- Do not restate what the code already says when names and structure already
  make that clear.
- Add commentary when a language nuance, business rule, performance constraint,
  or API contract would otherwise be easy to miss.

## Documentation quality

- Documentation should stand on its own for future maintainers and users.
- The more cognitive load an abstraction carries, the more explicit its docs
  should be.
- Keep examples short and purpose-built so they teach the important behavior
  without extra noise.

## When to comment

- Comment code paths with non-obvious edge cases.
- Comment behavior that future changes could easily break.
- Comment unusual control flow, hidden invariants, or deliberate complexity.
- Skip comments whose only job is to narrate line-by-line mechanics.

```go
// Good: explains the reason, not the syntax.
// Gregorian leap years are not just divisible by 4.
```

## Practical review rule

- Prefer clearer names and smaller functions before adding more comments.
- If a comment is necessary, keep it aligned with the current code so it does
  not drift into misinformation.
