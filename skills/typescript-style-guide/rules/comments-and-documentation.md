---
description: >-
  Rules for JSDoc comments, line comments, and documentation practices in
  TypeScript code.
metadata:
  tags: [comments, documentation, JSDoc, encoding]
---

# Comments and documentation

## File encoding: UTF-8

For non-ASCII characters, use the actual Unicode character (for example, `∞`).
For non-printable characters, you can use the equivalent hex or Unicode escapes
(for example, `\u221e`) with a comment that explains them.

```ts
// Good: the code is clear, even without a comment.
const units = 'μs';

// Good: use escapes for non-printable characters.
const output = '\ufeff' + content; // byte order mark
```

```ts
// Bad: the code is hard to read and easy to get wrong, even with the comment.
const units = '\u03bcs'; // Greek letter mu, 's'

// Bad: the reader does not know what this is.
const output = '\ufeff' + content;
```

## Source code formatting

A tool can format all source code automatically. Do not spend time in code
reviews on arguments about comma placement. Use the formatter of your project,
for example Prettier or dprint. If the formatter gives incorrect output in a
rare situation, disable it for that section with an inline directive.

## JSDoc and ordinary comments

There are two types of comments: JSDoc comments (`/** ... */`) and ordinary
comments (`// ...` or `/* ... */`).

- Use `/** JSDoc */` comments for documentation. These are comments for the
  users of the code.
- Use `// line comments` for implementation comments. These comments are only
  about the implementation of the code.

Tools such as editors and documentation generators understand JSDoc comments.
Ordinary comments are only for human readers.

## Document all top-level exports of modules

Use `/** JSDoc */` comments to give information to the users of your code.
Avoid comments that only repeat the property or parameter name. You _should_
also document all properties and methods whose purpose is not clear from their
name. This applies whether or not they are exported or public. Your reviewer
decides if the purpose is clear.

## Omit comments that are redundant with TypeScript

For example, do not declare types in `@param` or `@return` blocks. Do not write
`@implements`, `@enum`, `@private`, or similar tags on code that uses the
`implements`, `enum`, `private`, or similar keywords.

## Do not use `@override`

Do not use `@override` in TypeScript source code.

The compiler does not enforce `@override`. This is surprising, and the
annotations and the implementation can then go out of sync. If you add
`@override` only for documentation, it causes confusion.

## Make comments that actually add information

For non-exported symbols, sometimes the name and type of the function or
parameter are enough. But code _usually_ benefits from more documentation than
only variable names.

- Avoid comments that only repeat the parameter name and type. For example:

    ```ts
    // Bad
    /** @param fooBarService The Bar service for the Foo application. */
    ```

- Because of this rule, `@param` and `@return` lines are required only when
  they add information. Otherwise, you can omit them.

    ```ts
    // Good
    /**
     * POSTs the request to brew coffee.
     * @param amountLitres The amount to brew. Must fit the pot size.
     */
    brew(amountLitres: number, logger: Logger) {
      // ...
    }
    ```

## Parameter property comments

With a parameter property, a class declares a field and a constructor
parameter in one declaration. To do this, the class marks a parameter in the
constructor. For example, `constructor(private readonly foo: Foo)` declares
that the class has a `foo` field.

To document these fields, use the JSDoc `@param` annotation. Editors show the
description on constructor calls and property accesses.

```ts
/** This class shows how to document parameter properties. */
class ParamProps {
    /**
     * @param percolator The percolator that brews the coffee.
     * @param beans The beans to brew.
     */
    constructor(
        private readonly percolator: Percolator,
        private readonly beans: CoffeeBean[],
    ) {}
}
```

```ts
/** This class shows how to document ordinary fields. */
class OrdinaryClass {
    /** The bean for the next call to brew(). */
    nextBean: CoffeeBean;

    constructor(initialBean: CoffeeBean) {
        this.nextBean = initialBean;
    }
}
```

## Comments in function calls

If necessary, use inline block comments to document parameters at call sites.
Also consider named parameters with object literals and destructuring.

```ts
// Use inline block comments for parameters that are hard to understand:
new Percolator().brew(/* amountLitres= */ 5);
// Also consider named arguments and parameter destructuring (in the declaration of brew):
new Percolator().brew({ amountLitres: 5 });
```

```ts
/** An ancient {@link CoffeeBrewer} */
export class Percolator implements CoffeeBrewer {
    /**
     * Brews coffee.
     * @param amountLitres The amount to brew. Must fit the pot size.
     */
    brew(amountLitres: number) {
        // This implementation makes bad coffee.
        // TODO(b/12345): Improve percolator brewing.
    }
}
```

## Put documentation before decorators

If a class, method, or property has a decorator such as `@Component` and also
JSDoc, write the JSDoc before the decorator.

```ts
// Bad: do not write JSDoc between the decorator and the decorated statement.
@Component({
    selector: 'foo',
    template: 'bar',
})
/** Component that prints "bar". */
export class FooComponent {}
```

```ts
// Good: write the JSDoc block before the decorator.
/** Component that prints "bar". */
@Component({
    selector: 'foo',
    template: 'bar',
})
export class FooComponent {}
```
