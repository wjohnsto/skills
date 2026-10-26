---
description: >-
  Rules for type assertions, ts-ignore, runtime checks, and safe type
  narrowing in TypeScript.
metadata:
  tags: [type safety, assertions, ts-ignore, type narrowing, instanceof]
---

# Type safety

## `@ts-ignore`

Do not use `@ts-ignore`. It can look like an easy way to "fix" a compiler
error. But a specific compiler error frequently comes from a larger problem,
and you can usually fix that problem more directly.

For example, if you use `@ts-ignore` to suppress a type error, it is hard to know
which types the surrounding code will get. For many type errors, the advice in
[how to best use `any`](type-system.md#any-type) is useful.

## Type and non-nullability assertions

Type assertions (`x as SomeType`) and non-nullability assertions (`y!`) are
not safe. Both only stop the TypeScript compiler errors. They do not add
runtime checks that match these assertions. Thus, they can cause your program
to crash at runtime.

For this reason, you _should not_ use type and non-nullability assertions
without an obvious or explicit reason.

Do not write this:

```ts
// Bad
(x as Foo).foo();

y!.bar();
```

If you want to assert a type or non-nullability, the best answer is an explicit
runtime check.

```ts
// Good
// This example assumes that Foo is a class.
if (x instanceof Foo) {
    x.foo();
}

if (y) {
    y.bar();
}
```

Sometimes a local property of your code makes sure that the assertion is safe.
In this situation, you _should_ add a comment that tells why the unsafe
behavior is acceptable:

```ts
// Good: The comments give the reason.
// x is a Foo, because ...
(x as Foo).foo();

// y cannot be null, because ...
y!.bar();
```

If the reason for a type or non-nullability assertion is obvious, the comments
are possibly not necessary. For example, generated proto code is always
nullable. But in the context of the code, it can be well known that the backend
always supplies some fields. Use your judgement.

## Type assertion syntax

Type assertions must use the `as` syntax, not the angle bracket syntax. The
`as` syntax requires parentheses around the assertion when you access a member.

```ts
// Bad
const x = (<Foo>z).length;
const y = <Foo>z.length;
```

```ts
// Good
const x = (z as Foo).length;
```

## Type assertions and object literals

Use type annotations (`: Foo`), not type assertions (`as Foo`), to specify the
type of an object literal. Then the compiler can find refactoring bugs when the
fields of an interface change.

```ts
// Bad
interface Foo {
    bar: number;
    baz?: string; // The old name was "bam". A later change renamed it to "baz".
}

const foo = {
    bar: 123,
    bam: 'abc', // No error.
} as Foo;

function func() {
    return {
        bar: 123,
        bam: 'abc', // No error.
    } as Foo;
}
```

```ts
// Good
interface Foo {
    bar: number;
    baz?: string;
}

const foo: Foo = {
    bar: 123,
    bam: 'abc', // The compiler reports that Foo does not define "bam".
};

function func(): Foo {
    return {
        bar: 123,
        bam: 'abc', // The compiler reports that Foo does not define "bam".
    };
}
```

## Property access consistency

Code must not mix quoted property access with dotted property access:

```ts
// Bad: For each property, use only non-quoted access or only quoted access
// in the full application.
console.log(x['someField']);
console.log(x.someField);
```

```ts
// Good: Declare an interface.
declare interface ServerInfoJson {
    appVersion: string;
    user: UserJson;
}
const data = JSON.parse(serverResponse) as ServerInfoJson;
console.log(data.appVersion); // This access is type safe and safe to rename.
```

## Module object imports

When you import a module object, access properties on the module object
directly. Do not pass the module object to other code. Then tools can analyze
and optimize the modules. You can use module imports as namespaces.

```ts
// Good
import { method1, method2 } from 'utils';
class A {
    readonly utils = { method1, method2 };
}
```

```ts
// Bad
import * as utils from 'utils';
class A {
    readonly utils = utils;
}
```
