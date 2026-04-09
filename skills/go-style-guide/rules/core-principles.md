---
description: >-
  Core readability principles and source-precedence rules for applying Google's
  Go style guidance.
---

# Core principles

## Precedence

- **Canonical**: `guide` is the base rule set and wins on conflicts.
- **Normative**: `decisions` clarifies specific points that reviewers commonly
  raise.
- **Best practice**: `best-practices` gives preferred patterns for recurring
  situations and tradeoffs.

## Readability priorities

- **Clarity**: Make the purpose and rationale obvious to the next reader.
- **Simplicity**: Use the simplest approach that gets the job done.
- **Concision**: Keep signal high and avoid repetition or ceremony.
- **Maintainability**: Make future changes safer and easier to reason about.
- **Consistency**: Match established Go patterns unless a stronger rule applies.

## Canonical rules

- Run `gofmt` on all Go source files.
- Use `MixedCaps` or `mixedCaps` for multi-word identifiers rather than snake
  case.
- Do not impose a fixed line-length limit. If a line feels too long, refactor
  first instead of wrapping mechanically.
- Treat local consistency as a tie-breaker only when the style docs do not give
  direction.

## Practical guidance

- Prefer names, structure, and comments that help a reader answer both "what is
  this doing?" and "why is it doing it?"
- Use familiar language constructs and standard-library tools before adding new
  machinery or abstractions.
- Keep important behavior visible. Avoid helpers or terse expressions that hide
  the detail a maintainer must notice.

```go
// Good: the important steps stay visible.
u, err := db.UserByID(userID)
if err != nil {
    return fmt.Errorf("lookup user: %w", err)
}
user = u
```
