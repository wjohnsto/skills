---
name: typescript-style-guide
description: >-
    Use when you write or review TypeScript code.
license: MIT
metadata:
    author: redis
    version: '1.0'
    category: discipline
    triggers: TypeScript, TS, naming, imports, types, style, code review
---

# TypeScript style guide

This guide gives rules and best practices for TypeScript code. Each section
links to a detailed rule file with full code examples.

## When to use this skill

- Write new TypeScript code.
- Review TypeScript pull requests.
- Refactor existing TypeScript code.
- Set up a new TypeScript project.

## Syntax

### [Identifiers](rules/identifiers.md)

| Style            | Category                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `UpperCamelCase` | class / interface / type / enum / decorator / type parameters      |
| `lowerCamelCase` | variable / parameter / function / method / property / module alias |
| `CONSTANT_CASE`  | global constant values, including enum values                      |

Key rules:

- Treat abbreviations as whole words: `loadHttpUrl`, not ~~`loadHTTPURL`~~.
- Do not use `_` as a prefix or suffix.
- Do not use `#private` fields. Use the TypeScript `private` keyword.
- React component names must use `UpperCamelCase`.
- Do not add type information to names. For example, do not use
  `IMyInterface` or an `opt_` prefix.
- Names must be descriptive and clear to new readers.

### [Comments and documentation](rules/comments-and-documentation.md)

- Use `/** JSDoc */` for documentation that the users of the code read.
- Use `// line comments` for implementation notes.
- Document all top-level exports.
- Omit comments that repeat the TypeScript types. For example, do not add
  types to `@param` and do not write `@implements`.
- Do not use `@override`.
- Put JSDoc before decorators, not between a decorator and its declaration.
- Make comments add information. Do not only repeat parameter names.
- Use UTF-8 encoding. Use the actual Unicode character for non-ASCII
  characters.

## Language rules

### [Classes](rules/classes.md)

- Limit symbol visibility as much as possible.
- Never use the `public` modifier, except for non-readonly public parameter properties.
- Always use parentheses in constructor calls: `new Foo()`, not `new Foo`.
- Do not write empty constructors or constructors that only call `super()`.
- Use `readonly` for properties that the code never reassigns outside the constructor.
- Use parameter properties instead of manual assignment.
- When possible, initialize fields where you declare them.
- Use semicolons, not commas, in interface, class, and object type member declarations.

### [Functions](rules/functions.md)

- Use `function foo() {}` declarations for named functions.
- Use arrow functions in expressions, for example in callbacks.
- Use an expression body (`=>` without braces) only when the code uses the return value.
- Do not use `this` in regular functions. Use arrow functions or explicit parameters.
- Prefer arrow functions that wrap instance method calls to arrow function properties.

### [Variables and primitives](rules/variables-and-primitives.md)

- Always use `const` or `let`. Never use `var`.
- Use `const` by default. Use `let` only when you must reassign the variable.
- Always use `new Error()` for exceptions, not `Error()` without `new`.
- Do not instantiate wrapper classes (`new String()`, `new Boolean()`, `new Number()`).
- Do not use the `Array()` constructor. Use bracket notation or `Array.from()`.
- Use `Number()` to parse numbers. Always check for `NaN`.
- Do not use unary `+` or `parseInt`/`parseFloat` (except for numbers that are not base 10).
- Do not rely on automatic semicolon insertion. Always use semicolons.
- Always use `enum`, not `const enum`.
- Do not use `debugger` statements in production code.
- Do not define new decorators. Use only the decorators that a framework provides.

### [Control flow](rules/control-flow.md)

- Control flow statements on more than one line must use blocks (`{ }`).
- All `switch` statements must have a `default` case.
- Always use `===` and `!==`. Exception: you can use `== null` to check for both `null` and `undefined`.
- Use `for...of` or `Object.keys()`/`Object.entries()` instead of `for...in`.
- Do not use `.forEach()`. Use `for...of` loops.
- Spread only matching types (objects into objects, iterables into arrays).

### [Type safety](rules/type-safety.md)

- Do not use `@ts-ignore`.
- Prefer runtime checks (`instanceof`, truthiness) to type assertions.
- If you must use an assertion, use the `as` syntax, not angle brackets.
- Use type annotations (`: Foo`) on object literals, not assertions (`as Foo`).
- Do not mix quoted and dotted property access.

## Source organization

### [Modules and imports](rules/modules-and-imports.md)

- Use relative imports (`./foo`) in the same project.
- Do not use `namespace`. Use ES6 modules.
- Do not use `require()`. Use ES6 `import`.
- Use `import type` and `export type` for type-only imports and exports.

| Import type   | Example                      | Use for                                                |
| ------------- | ---------------------------- | ------------------------------------------------------ |
| module        | `import * as foo from '...'` | Large APIs where a namespace makes code easier to read |
| destructuring | `import { Foo } from '...'`  | Commonly used symbols                                  |
| default       | `import Foo from '...'`      | Only for external code that requires it                |
| side-effect   | `import '...'`               | Libraries loaded for side effects only                 |

### [Exports](rules/exports.md)

- Use named exports. Do not use default exports.
- Minimize the exported API surface.
- Do not use `export let` (mutable exports).
- Do not create container classes with only static members. Export functions and constants directly.
- Organize packages by feature, not by type.

## Type system

### [Type system rules](rules/type-system.md)

- Use inference for types that are easy to infer (`string`, `number`, `boolean`, `new` expressions).
- Add annotations when they make code easier to read or help find bugs after a refactor.
- Return type annotations are optional, but they can improve documentation.
- Use optional fields and parameters (`?`) instead of `| undefined`.
- Do not include `| null` or `| undefined` in type aliases.
- Use `interface` for object shapes. Use `type` for unions, tuples, and primitives.
- Use `T[]` for simple types. Use `Array<T>` for complex types (unions, objects).
- Avoid `any`. Prefer specific types, `unknown`, or a documented suppression.
- Use `Record<K, V>` or `Map`/`Set` instead of plain objects as associative arrays.
- Never use wrapper types (`String`, `Boolean`, `Number`, `Object`).
- Avoid generics that only the return type uses.
- When possible, prefer simple types to complex mapped or conditional types.

## Consistency

If this guide does not answer a style question, follow the conventions in the
file first. Then follow the conventions in the directory, and then in the
project.
