---
description: >-
  Interface design guidance from Google's Go best practices. It covers
  ownership, size, documentation, and return-type choices.
---

# Interfaces

## When to introduce one

- **Best practice**: Avoid new interfaces until a real need exists.
- If an interface already models the needed behavior, reuse it.
- Do not add a test-only interface or exported test double unless a real need
  for substitution exists.

## Ownership and visibility

- **Best practice**: The consumer usually defines the interface because it
  knows the minimal behavior it needs.
- Keep internal-only interfaces unexported.
- Producer-owned interfaces are acceptable in three cases: the interface itself
  is the product, many packages share the boundary, or a standalone contract
  package is justified.

## Size and documentation

- Keep interfaces small and composable.
- Treat interface documentation as a user manual for the abstraction.
- Single-method interfaces also need documentation for their contract.
- Multi-method interfaces need method-level documentation.

## Accept versus return

- **Best practice**: Accept interfaces and return concrete types.
- A concrete return type keeps the full API available to the caller.
- An interface return type is reasonable in some cases, for example
  encapsulation. It is also reasonable when the interface itself is the stable
  boundary, as with `error`.

## Review heuristics

- Ask if the interface removes more information than it saves.
- Look for interfaces that become too large because they copy large concrete
  APIs.
- If you add an interface only to make tests easier, treat it as a possible
  design problem. Keep this view until a real need for substitution is clear.
