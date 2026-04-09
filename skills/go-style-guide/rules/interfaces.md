---
description: >-
  Interface design guidance from Google's Go best practices, including
  ownership, size, documentation, and return-type choices.
---

# Interfaces

## When to introduce one

- **Best practice**: Avoid creating an interface before a real need exists.
- Reuse an existing interface when one already models the needed behavior.
- Do not add a test-only interface or exported test double unless there is a
  material need for substitution.

## Ownership and visibility

- **Best practice**: The consumer usually defines the interface because it knows
  the minimal behavior it needs.
- Keep internal-only interfaces unexported.
- Producer-owned interfaces make sense when the interface itself is the product,
  the boundary is shared broadly, or a standalone contract package is justified.

## Size and documentation

- Keep interfaces small and composable.
- Treat interface documentation as a user manual for the abstraction.
- Single-method interfaces still need their contract documented.
- Multi-method interfaces need method-level documentation.

## Accept vs return

- **Best practice**: Accept interfaces and return concrete types.
- Returning a concrete type keeps the full API available to the caller.
- Returning an interface is reasonable for cases such as encapsulation or when
  the interface itself is the stable boundary, as with `error`.

## Review heuristics

- Ask whether the interface removes more information than it saves.
- Watch for interface bloat caused by mirroring large concrete APIs.
- Treat interfaces added only to make tests easier as a design smell until a
  real substitution need is clear.
