---
description: >-
  Guidance for comments and documentation in Go code, based on Google's style
  rules for readability.
---

# Comments and documentation

## Comment intent

- **Canonical**: In most cases, use comments to explain why the code exists or
  why it has an unexpected shape.
- Do not repeat what the code already says when names and structure make that
  clear.
- If a reader can easily miss a language nuance, business rule, performance
  constraint, or API contract, add a comment.

## Documentation quality

- Write documentation that future maintainers and users can understand without
  other sources.
- If an abstraction puts more cognitive load on the reader, make its
  documentation more explicit.
- Keep examples short and specific to their purpose. Then they teach the
  important behavior without unnecessary detail.

## When to comment

- Comment code paths that have edge cases that are not obvious.
- Comment behavior that future changes can easily break.
- Comment unusual control flow, hidden invariants, or deliberate complexity.
- Do not write comments that only describe the mechanics line by line.

```go
// Good: the comment explains the reason, not the syntax.
// Gregorian leap years are not just divisible by 4.
```

## Practical review rule

- Prefer clearer names and smaller functions before you add more comments.
- If a comment is necessary, keep it consistent with the current code. Then
  the comment does not become incorrect over time.
