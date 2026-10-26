---
description: >-
  Naming rules from Google's Go style guide for packages, identifiers,
  receivers, constants, and test doubles.
---

# Naming

## Baseline

- **Canonical**: Use `MixedCaps` or `mixedCaps` for multi-word names.
- **Normative**: Avoid underscores in Go identifiers, except in documented cases
  for tests, generated code, or low-level interoperability.
- Prefer names that read well at the call site, not names that repeat the
  nearby context.

## Packages

- Use short, lowercase, unbroken package names: `tabwriter`, not `tab_writer`
  or `tabWriter`.
- Avoid vague names such as `util`, `common`, `helper`, or `model`.
- Avoid package names that common local variables are likely to shadow.
- If a third-party or generated import name is awkward, rename it to a normal
  Go identifier at import time.

## Functions and methods

- Avoid repetition of the package name in exported function names.
- Avoid repetition of the receiver type in method names.
- Avoid `Get` or `get` prefixes unless the domain term is literally "get", such
  as HTTP GET.
- Noun-like names are good for accessors that return data. Verb-like names are
  good for actions.
- If two functions are different only by type, add the type suffix where
  necessary, such as `ParseInt64`.

```go
// Good
func Parse(input string) (*Config, error)

// Good
func (c *Config) WriteTo(w io.Writer) (int64, error)
```

## Receivers, variables, and constants

- Use receiver names that are short, derived from the type, and consistent
  across methods.
- Make the length of a variable name scale with its scope. Short names are
  acceptable in small scopes when the meaning is obvious.
- Avoid type-decorated names such as `userSlice`, `nameString`, or `numUsers`.
  Use them only if two representations are in scope and you must tell them
  apart.
- Constant names follow normal Go casing. Name them for their role, not their
  literal value.

## Initialisms and repetition

- **Normative**: Keep the expected casing for common initialisms such as `ID`,
  `URL`, and `DB`.
- Avoid repetitive names across package, type, method, and local context.
- Prefer `widget.New` over `widget.NewWidget` when the package already gives
  the context.

## Test names

- Test, benchmark, and example function names in `*_test.go` can use
  underscores.
- For black-box tests, use the `_test` package suffix and keep the original
  package name, such as `linkedlist_test`.
- Test helper packages often append `test`, such as `creditcardtest`.
- If behavior is the clearest way to identify a test double, name the double
  for its behavior, such as `AlwaysDeclines`. When multiple behaviors exist, do
  not use a generic `Stub`.
