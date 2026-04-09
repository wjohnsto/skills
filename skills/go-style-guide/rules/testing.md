---
description: >-
  Testing guidance from Google's Go style materials, including naming,
  diagnostics, examples, and maintainable test structure.
---

# Testing

## Readability goals

- **Canonical**: Tests should support maintainability and give clear,
  actionable diagnostics when they fail.
- Prefer tests that surface the relevant behavior with high signal and low
  ceremony.
- Use runnable examples or focused test cases when they clarify correct usage.

## Naming and package structure

- Black-box tests should use the `_test` package suffix, such as
  `linkedlist_test`.
- Test helper packages can append `test` to the production package name, such as
  `creditcardtest`.
- When multiple doubles exist, name them for behavior or target type so the test
  reads clearly.

## Test code shape

- Favor test structure that makes the important differences between cases easy to
  spot.
- Table-driven tests are useful when they reduce repetition without hiding the
  behavior under test.
- Keep helper names, local names, and failure messages aligned with the concept
  under test.

```go
if got, want := spyCC.Charges, charges; !cmp.Equal(got, want) {
    t.Errorf("spyCC.Charges = %v, want %v", got, want)
}
```

## Review heuristics

- Prefer failure messages that show `got` and `want` or otherwise make the
  mismatch obvious.
- Keep test abstractions light. Over-engineered helpers can hide the behavior
  the test is supposed to document.
- Limit guidance to practices that appear in Google's Go style materials rather
  than importing unrelated testing rules.
