---
description: >-
  Rules for variable declarations, const/let, error handling, enums,
  and primitive types in TypeScript.
metadata:
  tags: [variables, const, let, enums, primitives, errors]
---

# Variables and primitives

## Variables

Always use `const` or `let` to declare variables. Use `const` by default, unless
you must assign a new value to the variable. Never use `var`.

```ts
// Good
const foo = otherValue; // Use if "foo" never changes.
let bar = someValue; // Use if code assigns a new value to "bar" later.
```

`const` and `let` are block scoped, as are variables in most other languages.
`var` in JavaScript is function scoped. This can cause bugs that are difficult
to understand. Do not use it.

```ts
// Bad
var foo = someValue; // Do not use. The scope rules of var are complex and cause bugs.
```

Do not use variables before their declaration.

## Exceptions

Always use `new Error()` to create exceptions. Do not call `Error()` without `new`. Both
forms create a new `Error` instance, but `new` is more consistent with how code
creates other objects.

```ts
// Good
throw new Error('Foo is not a valid bar.');
```

```ts
// Bad
throw Error('Foo is not a valid bar.');
```

## Primitive types and wrapper classes

TypeScript code must not create instances of the wrapper classes for the
primitive types `String`, `Boolean`, and `Number`. Wrapper classes have
surprising behavior. For example, `new Boolean(false)` evaluates to `true`.

```ts
// Bad
const s = new String('hello');
const b = new Boolean(false);
const n = new Number(5);
```

```ts
// Good
const s = 'hello';
const b = false;
const n = 5;
```

## Array constructor

TypeScript code must not use the `Array()` constructor, with or without `new`.
Its usage is confusing and contradictory:

```ts
// Bad
const a = new Array(2); // [undefined, undefined]
const b = new Array(2, 3); // [2, 3];
```

Instead, always use bracket notation to initialize arrays. Or use `from` to
initialize an `Array` with a specified size:

```ts
// Good
const a = [2];
const b = [2, 3];

// This is equivalent to Array(2).
const c = [];
c.length = 2;

// [0, 0, 0, 0, 0]
Array.from<number>({ length: 5 }).fill(0);
```

## Type coercion

To coerce types, TypeScript code can use the `String()` and `Boolean()`
functions (note: without `new`), string template literals, or `!!`.

```ts
// Good
const bool = Boolean(false);
const str = String(aNumber);
const bool2 = !!str;
const str2 = `result: ${bool2}`;
```

Avoid string concatenation to cast to a string. Our checks require that the
operands of the plus operator have matching types.

Code must use `Number()` to parse numeric values. Code _must_ explicitly
examine the return value for `NaN`, unless the context makes a parse failure
impossible.

Note: `Number('')`, `Number(' ')`, and `Number('\t')` return `0`, not `NaN`.
`Number('Infinity')` and `Number('-Infinity')` return `Infinity` and
`-Infinity`. These cases can need special code.

```ts
// Good
const aNumber = Number('123');
if (isNaN(aNumber)) throw new Error(...);  // Handle NaN if the string possibly does not contain a number.
assertFinite(aNumber, ...);                // Optional: Use if NaN cannot occur because of an earlier validation.
```

Code must not use unary plus (`+`) to coerce strings to numbers. A number parse
can fail and has surprising corner cases. It can also show a design problem,
for example a parse at the wrong layer. For these reasons, a unary plus is too
easy to miss in code reviews.

```ts
// Bad
const x = +y;
```

Code must also not use `parseInt` or `parseFloat` to parse numbers, except for
strings that are not base 10 (see below). Both of these functions ignore
trailing characters in the string. This can hide error conditions. For example,
they parse `12 dwarves` as `12`.

```ts
// Bad
const n = parseInt(someString, 10); // Error prone,
const f = parseFloat(someString); // with or without a radix.
```

If code must parse with a radix, it _must_ make sure that the input is a number
before it calls `parseInt`:

```ts
// Good
if (!/^[a-fA-F0-9]+$/.test(someString)) throw new Error(...);
// This is necessary to parse hexadecimal.
const n = parseInt(someString, 16);  // Use only for radix != 10.
```

To parse integer numbers, use `Number()`, then `Math.floor` or `Math.trunc`
(where available):

```ts
// Good
let f = Number(someString);
if (isNaN(f)) handleError();
f = Math.floor(f);
```

Do not use explicit boolean coercions in conditional clauses that have implicit
boolean coercion. These are the conditions in `if`, `for`, and `while`
statements.

```ts
// Bad
const foo: MyInterface|null = ...;
if (!!foo) {...}
while (!!foo) {...}
```

```ts
// Good
const foo: MyInterface|null = ...;
if (foo) {...}
while (foo) {...}
```

Code can use explicit comparisons:

```ts
// Good
// An explicit comparison with > 0 is OK.
if (arr.length > 0) {...}
// Implicit boolean coercion is also OK.
if (arr.length) {...}
```

## Automatic semicolon insertion

Do not rely on automatic semicolon insertion (ASI). End all statements
explicitly with a semicolon. This prevents bugs from incorrect semicolon
insertions. It also makes sure that tools with limited ASI support can use the
code.

## Debugger statements

Do not include debugger statements in production code.

```ts
// Bad
function debugMe() {
    debugger;
}
```

## Enums

Always use `enum`, not `const enum`. You cannot change TypeScript enums. A
`const enum` is a separate language feature for optimization. It makes the enum
invisible to JavaScript users of the module.

## Decorators

Decorators are syntax with an `@` prefix, such as `@MyDecorator`.

Do not define new decorators. Use only the decorators that frameworks define
(for example Angular, NestJS, and TypeORM).

When you use decorators, put the decorator immediately before the symbol that
it decorates. Do not put empty lines between them:

```ts
/** JSDoc comments go before decorators. */
@Component({...})  // Note: There is no empty line after the decorator.
class MyComp {
  @Input() myField: string;  // Decorators on fields can be on the same line...

  @Input()
  myOtherField: string;  // ... or on the next line.
}
```
