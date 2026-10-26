---
description: >-
  Rules for TypeScript class declarations, including visibility, constructors,
  properties, and member order.
metadata:
  tags: [classes, visibility, constructors, properties, readonly]
---

# Classes

## Visibility

Restricted visibility of properties, methods, and entire types helps to keep
code decoupled.

- Limit symbol visibility as much as possible.
- Consider whether you can change private methods to non-exported functions
  in the same file, outside of all classes. Also consider whether you can move
  private properties into a separate, non-exported class.
- TypeScript symbols are public by default. Never use the `public` modifier,
  except to declare non-readonly public parameter properties in constructors.

```ts
// Bad
class Foo {
    public bar = new Bar(); // The public modifier is not necessary.

    constructor(public readonly baz: Baz) {} // readonly makes it a property, and properties are public by default.
}
```

```ts
// Good
class Foo {
    bar = new Bar();

    constructor(public baz: Baz) {} // You can use the public modifier for non-readonly properties.
}
```

## Constructors

Constructor calls must use parentheses, even when the call has no arguments:

```ts
// Bad
const x = new Foo();
```

```ts
// Good
const x = new Foo();
```

You do not need an empty constructor or a constructor that only calls its
parent class. If a class has no constructor, ES2015 gives it a default class
constructor. But do not omit constructors that have parameter properties,
modifiers, or parameter decorators, even if the constructor body is empty.

```ts
// Bad
class UnnecessaryConstructor {
    constructor() {}
}
```

```ts
// Bad
class UnnecessaryConstructorOverride extends Base {
    constructor(value: number) {
        super(value);
    }
}
```

```ts
// Good
class DefaultConstructor {}

class ParameterProperties {
    constructor(private myService) {}
}

class ParameterDecorators {
    constructor(@SideEffectDecorator myService) {}
}

class NoInstantiation {
    private constructor() {}
}
```

## No `#private` fields

Do not use private fields (also known as private identifiers):

```ts
// Bad
class Clazz {
    #ident = 1;
}
```

Instead, use TypeScript's visibility annotations:

```ts
// Good
class Clazz {
    private ident = 1;
}
```

> Why? When TypeScript down-levels private identifiers, the emitted code
> becomes much larger and slower. Versions before ES2015 do not support private
> identifiers. They do not give substantial benefits when static type checking
> enforces visibility.

## Use `readonly`

If the code never reassigns a property outside of the constructor, mark the
property with the `readonly` modifier. These properties do not need to be
deeply immutable.

## Parameter properties

Do not manually assign an obvious initializer to a class member. Use a
TypeScript
[parameter property](https://www.typescriptlang.org/docs/handbook/classes.html#parameter-properties).

```ts
// Bad
class Foo {
    private readonly barService: BarService;

    constructor(barService: BarService) {
        this.barService = barService;
    }
}
```

```ts
// Good
class Foo {
    constructor(private readonly barService: BarService) {}
}
```

If the parameter property needs documentation,
[use an `@param` JSDoc tag](comments-and-documentation.md#parameter-property-comments).

## Field initializers

If a class member is not a parameter, initialize it where you declare it. Then
you can sometimes remove the constructor completely.

```ts
// Bad
class Foo {
    private readonly userList: string[];
    constructor() {
        this.userList = [];
    }
}
```

```ts
// Good
class Foo {
    private readonly userList: string[] = [];
}
```

## Properties used outside of class lexical scope

Sometimes code outside the lexical scope of a class uses the properties of that
class. For example, an Angular template uses the properties of its controller.
These properties must not use `private` visibility.

Use the `public` or `protected` visibility that is correct for your framework.

## Getters and setters (accessors)

You can use getters and setters for class members. The getter method must be a
[pure function](https://en.wikipedia.org/wiki/Pure_function). That is, its
result is consistent and it has no side effects. Accessors are also useful to
restrict the visibility of internal or verbose implementation details.

```ts
// Good
class Foo {
    constructor(private readonly someService: SomeService) {}

    get someMember(): string {
        return this.someService.someVariable;
    }

    set someMember(newValue: string) {
        this.someService.someVariable = newValue;
    }
}
```

If an accessor hides a class property, you can add any whole word as a prefix
or suffix to the name of the hidden property. For example, use `internal` or
`wrapped`. When you use these private properties, access the value through the
accessor whenever possible.

At least one accessor for a property must be non-trivial. Do not define
"pass-through" accessors only to hide a property. Instead, make the property
public. Or consider whether to make it `readonly`, instead of a getter with no
setter.

```ts
// Good: the accessors contain non-trivial logic.
class Foo {
    private wrappedBar = '';
    get bar() {
        return this.wrappedBar || 'bar';
    }

    set bar(wrapped: string) {
        this.wrappedBar = wrapped.trim();
    }
}
```

```ts
// Bad: neither accessor has logic. Make bar public instead.
class Bar {
    private barInternal = '';
    get bar() {
        return this.barInternal;
    }

    set bar(value: string) {
        this.barInternal = value;
    }
}
```

## Member property declarations

Interface and class declarations must use the `;` character to separate
individual member declarations:

```ts
// Good
interface Foo {
    memberA: string;
    memberB: number;
}
```

Interfaces must not use the `,` character to separate fields. This keeps them
symmetrical with class declarations:

```ts
// Bad
interface Foo {
    memberA: string;
    memberB: number;
}
```

Inline object type declarations must use the comma as a separator:

```ts
// Good
type SomeTypeAlias = {
    memberA: string;
    memberB: number;
};

let someProperty: { memberC: string; memberD: number };
```
