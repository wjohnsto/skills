---
description: >-
  Naming rules from Google's Go style guide for packages, identifiers,
  receivers, constants, and test doubles.
---

# Naming

## Baseline

- **Canonical**: Use `MixedCaps` or `mixedCaps` for multi-word names.
- **Normative**: Avoid underscores in Go identifiers except for documented
  testing, generated-code, or low-level interop cases.
- Prefer names that read well at the call site instead of names that repeat
  surrounding context.

## Packages

- Package names should be short, lowercase, and unbroken: `tabwriter`, not
  `tab_writer` or `tabWriter`.
- Avoid vague names such as `util`, `common`, `helper`, or `model`.
- Avoid package names that are likely to be shadowed by common locals.
- If a third-party or generated import name is awkward, rename it to a normal
  Go identifier at import time.

## Functions and methods

- Avoid repeating the package name in exported function names.
- Avoid repeating the receiver type in method names.
- Avoid `Get` or `get` prefixes unless the domain term is literally "get", such
  as HTTP GET.
- Noun-like names fit accessors that return data; verb-like names fit actions.
- When two functions differ only by type, add the type suffix where needed, such
  as `ParseInt64`.

```go
// Good
func Parse(input string) (*Config, error)

// Good
func (c *Config) WriteTo(w io.Writer) (int64, error)
```

## Receivers, variables, and constants

- Receiver names should be short, derived from the type, and consistent across
  methods.
- Variable-name length should scale with scope. Short names are fine in tight
  scopes when the meaning is obvious.
- Avoid type-decorated names like `userSlice`, `nameString`, or `numUsers`
  unless two representations are in scope and need distinction.
- Constant names follow normal Go casing. Name them for their role, not their
  literal value.

## Initialisms and repetition

- **Normative**: Preserve expected casing for common initialisms such as `ID`,
  `URL`, and `DB`.
- Avoid repetitive names across package, type, method, and local context.
- Prefer `widget.New` over `widget.NewWidget` when the package already supplies
  the context.

## Testing names

- Test, benchmark, and example function names in `*_test.go` may use
  underscores.
- Black-box tests should use the `_test` package suffix without breaking the
  original package name, such as `linkedlist_test`.
- Test helper packages often append `test`, such as `creditcardtest`.
- Name doubles for behavior when that is the clearest signal, such as
  `AlwaysDeclines`, not a generic `Stub` once multiple behaviors exist.
