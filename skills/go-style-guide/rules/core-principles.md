---
description: >-
  Core readability principles and source-precedence rules for when you apply
  Google's Go style guidance.
---

# Core principles

## Precedence

- **Canonical**: `guide` is the base rule set. It has priority when rules
  conflict.
- **Normative**: `decisions` clarifies specific points that reviewers frequently
  raise.
- **Best practice**: `best-practices` gives preferred patterns for repeated
  situations and tradeoffs.

## Readability priorities

- **Clarity**: Make the purpose and rationale obvious to the next reader.
- **Simplicity**: Use the simplest approach that does the task.
- **Concision**: Show the important information clearly. Avoid repetition and
  unnecessary boilerplate.
- **Maintainability**: Make future changes safer and easier to understand.
- **Consistency**: Match established Go patterns unless a stronger rule applies.

## Canonical rules

- Run `gofmt` on all Go source files.
- Use `MixedCaps` or `mixedCaps` for multi-word identifiers, not snake case.
- Do not set a fixed line-length limit. If a line seems too long, refactor the
  code first. Do not only wrap the line mechanically.
- Use local consistency as a tie-breaker only when the style documentation does
  not give direction.

## Practical guidance

- Prefer names, structure, and comments that help a reader answer two
  questions: "what does this do?" and "why does it do it?"
- Use familiar language constructs and standard-library tools before you add
  new mechanisms or abstractions.
- Keep important behavior visible. Avoid helpers or terse expressions that hide
  the detail that a maintainer must notice.

```go
// Good: the important steps stay visible.
u, err := db.UserByID(userID)
if err != nil {
    return fmt.Errorf("lookup user: %w", err)
}
user = u
```
