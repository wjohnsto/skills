---
name: go-style-guide
description: >-
  Use when you write or review Go code. Applies Google's Go style guidance for
  readability, naming, formatting, packages, comments, errors, interfaces, and
  testing.
metadata:
  category: discipline
  triggers: Go, golang, Go style, style guide, readability, idiomatic Go, code review
---

# Go style guide

Use this skill to make Go code follow Google's Go style documents. Treat the
core guide as canonical. Use style decisions for specific settled points. Use
best practices for common patterns and tradeoffs. The overview also expects
that the reader knows Effective Go. But this skill covers only Google's style
documentation.

## When to apply

- Write new Go code.
- Review Go changes.
- Refactor Go packages that already exist.
- Answer style or readability questions in Go.

## Source precedence

- Follow `guide` first because it is canonical.
- Use `decisions` for specific settled points and review terminology.
- Use `best-practices` for common patterns, tradeoffs, and maintenance advice.
- If the documentation does not give a rule, prefer local consistency in the
  file or package.

## Rule index

- [Core principles](rules/core-principles.md)
- [Naming](rules/naming.md)
- [Comments and documentation](rules/comments-and-documentation.md)
- [Packages and imports](rules/packages-and-imports.md)
- [Errors](rules/errors.md)
- [Interfaces](rules/interfaces.md)
- [Testing](rules/testing.md)

Paraphrase the guidance. Do not copy large passages from the source. If no
explicit rule applies, keep recommendations consistent with nearby Go code and
package-level conventions.
