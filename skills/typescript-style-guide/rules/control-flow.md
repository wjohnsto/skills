---
description: >-
  Rules for control flow statements, switch cases, equality checks, iteration,
  and spread operators in TypeScript.
metadata:
  tags: [control flow, switch, for-of, equality, iteration]
---

# Control flow

## Control flow statements and blocks

If a control flow statement is on more than one line, always use a block for
the contained code.

```ts
// Good
for (let i = 0; i < x; i++) {
    doSomethingWith(i);
    andSomeMore();
}
if (x) {
    doSomethingWithALongMethodName(x);
}
```

```ts
// Bad
if (x) x.doFoo();
for (let i = 0; i < x; i++) doSomethingWithALongMethodName(i);
```

Exception: if an `if` statement fits on one line, you can omit the block.

```ts
// Good
if (x) x.doFoo();
```

## Switch statements

All `switch` statements must contain a `default` statement group, even if it
contains no code.

```ts
// Good
switch (x) {
    case Y:
        doSomethingElse();
        break;
    default:
    // Do nothing.
}
```

Non-empty statement groups (`case ...`) must not fall through. The compiler
enforces this rule:

```ts
// Bad
switch (x) {
    case X:
        doSomething();
    // fall through (not allowed)
    case Y:
    // ...
}
```

Empty statement groups can fall through:

```ts
// Good
switch (x) {
    case X:
    case Y:
        doSomething();
        break;
    default: // Do nothing.
}
```

## Equality checks

Always use triple equals (`===`) and not equals (`!==`). The double equality
operators cause type coercions that are error-prone and hard to understand.
These coercions are also slower for JavaScript virtual machines (VMs) to
implement. For more information, refer to the
[JavaScript equality table](https://dorey.github.io/JavaScript-Equality-Table/).

```ts
// Bad
if (foo == 'bar' || baz != bam) {
    // Type coercion makes this behaviour hard to understand.
}
```

```ts
// Good
if (foo === 'bar' || baz !== bam) {
    // This comparison is correct.
}
```

**Exception**: Comparisons to the literal `null` value can use the `==` and `!=`
operators. These operators match both `null` and `undefined` values.

```ts
// Good
if (foo == null) {
    // This block runs when foo is null or undefined.
}
```

## Iterate over objects

A `for (... in ...)` loop over an object is error-prone. The loop includes
enumerable properties from the prototype chain.

Do not use unfiltered `for (... in ...)` statements:

```ts
// Bad
for (const x in someObj) {
    // x can come from a parent prototype.
}
```

Filter the values explicitly with an `if` statement, or use
`for (... of Object.keys(...))`.

```ts
// Good
for (const x in someObj) {
    if (!someObj.hasOwnProperty(x)) continue;
    // Now x is defined on someObj.
}
for (const x of Object.keys(someObj)) {
    // Note: this loop uses for _of_.
}
for (const [key, value] of Object.entries(someObj)) {
    // Note: this loop uses for _of_.
}
```

## Iterate over containers

Do not use `for (... in ...)` to iterate over arrays. Unexpectedly, the loop
gives the indices of the array as strings, not the values:

```ts
// Bad
for (const x in someArray) {
    // x is the index.
}
```

To iterate over arrays, use `for (... of someArr)` or standard `for` loops with
indices.

```ts
// Good
for (const x of someArr) {
    // x is a value of someArr.
}

for (let i = 0; i < someArr.length; i++) {
    // If you need the index, count explicitly. Otherwise, use the for/of form.
    const x = someArr[i];
    // ...
}
for (const [i, x] of someArr.entries()) {
    // This is an alternative to the loop above.
}
```

Do not use `Array.prototype.forEach`, `Set.prototype.forEach`, and
`Map.prototype.forEach`. They make code harder to debug. They also stop some
useful compiler checks, for example reachability checks.

```ts
// Bad
someArr.forEach((item, index) => {
    someFn(item, index);
});
```

> Why? Consider this code:
>
> ```ts
> let x: string | null = 'abc';
> myArray.forEach(() => {
>     x.charAt(0);
> });
> ```
>
> You can see that this code is correct. `x` is not null, and it does not
> change before the code accesses it. But the compiler cannot know if this
> `.forEach()` call keeps the closure and calls it later, maybe after `x`
> becomes null. So the compiler flags this code as an error. The equivalent
> for-of loop is correct.

## The spread operator

The spread operator `[...foo]; {...bar}` is a convenient shorthand to copy
arrays and objects. When you use the spread operator on objects, later values
replace earlier values at the same key.

```ts
// Good
const foo = {
    num: 1,
};

const foo2 = {
    ...foo,
    num: 5,
};

const foo3 = {
    num: 5,
    ...foo,
};

foo2.num === 5;
foo3.num === 1;
```

When you use the spread operator, the spread value must match the value that
the code creates. When you create an object, spread only objects. When you
create an array, spread only iterables. Never spread primitives, including
`null` and `undefined`.

```ts
// Bad
const foo = { num: 7 };
const bar = { num: 5, ...(shouldUseFoo && foo) }; // This value can be undefined.

// Creates {0: 'a', 1: 'b', 2: 'c'}, but the result has no length.
const fooStrings = ['a', 'b', 'c'];
const ids = { ...fooStrings };
```

```ts
// Good
const foo = shouldUseFoo ? { num: 7 } : {};
const bar = { num: 5, ...foo };
const fooStrings = ['a', 'b', 'c'];
const ids = [...fooStrings, 'd', 'e'];
```
