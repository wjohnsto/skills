---
name: go-style-guide
description: >-
  Use when writing or reviewing Go code. Applies Google's Go style guidance for
  readability, naming, formatting, packages, comments, errors, interfaces, and
  testing.
metadata:
  category: discipline
  triggers: Go, golang, Go style, style guide, readability, idiomatic Go, code review
---

# Go Style Guide

Use this skill when Go code should follow Google's Go style documents. Treat the
core guide as canonical, use style decisions for specific settled points, and
use best practices for common patterns and tradeoffs. The overview also assumes
familiarity with Effective Go, but this skill stays scoped to Google's style
docs.

## When to apply

- Writing new Go code
- Reviewing Go changes
- Refactoring existing Go packages
- Resolving style or readability questions in Go

## Source precedence

- Follow `guide` first because it is canonical.
- Use `decisions` for specific settled points and review terminology.
- Use `best-practices` for common patterns, tradeoffs, and maintenance advice.
- When the docs are silent, prefer local consistency within the file or package.

## Rule index

- [Core principles](rules/core-principles.md)
- [Naming](rules/naming.md)
- [Comments and documentation](rules/comments-and-documentation.md)
- [Packages and imports](rules/packages-and-imports.md)
- [Errors](rules/errors.md)
- [Interfaces](rules/interfaces.md)
- [Testing](rules/testing.md)

Paraphrase the guidance instead of copying large source passages. When no
explicit rule applies, keep recommendations consistent with nearby Go code and
package-level conventions.
