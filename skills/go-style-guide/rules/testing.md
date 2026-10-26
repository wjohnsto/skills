---
description: >-
  Testing guidance from Google's Go style materials. It covers naming,
  diagnostics, examples, and maintainable test structure.
---

# Testing

## Readability goals

- **Canonical**: Write tests that support maintainability and give clear,
  actionable diagnostics when they fail.
- Prefer tests that show the relevant behavior clearly and have little
  boilerplate.
- Use runnable examples or focused test cases when they clarify correct usage.

## Names and package structure

- Use the `_test` package suffix for black-box tests, such as
  `linkedlist_test`.
- Test helper packages can append `test` to the production package name, such
  as `creditcardtest`.
- If multiple test doubles exist, name them for their behavior or target type.
  Then the test is clear to the reader.

## Test code shape

- Prefer a test structure that makes the important differences between cases
  easy to see.
- Table-driven tests are useful when they reduce repetition and do not hide the
  behavior under test.
- Keep helper names, local names, and failure messages consistent with the
  concept under test.

```go
if got, want := spyCC.Charges, charges; !cmp.Equal(got, want) {
    t.Errorf("spyCC.Charges = %v, want %v", got, want)
}
```

## Review heuristics

- Prefer failure messages that show `got` and `want`, or that make the mismatch
  obvious in a different way.
- Keep test abstractions light. Over-engineered helpers can hide the behavior
  that the test documents.
- Limit guidance to practices that appear in Google's Go style materials. Do
  not add unrelated testing rules.
