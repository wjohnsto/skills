---
description: >-
  Rules for type inference, annotations, interfaces versus type aliases,
  generics, and how to avoid any in TypeScript.
metadata:
  tags: [type system, inference, interfaces, generics, any, unknown]
---

# Type system

## Type inference

Code can use the type inference of the TypeScript compiler for all type
expressions, such as variables, fields, and return types.

```ts
// Good
const x = 15; // The compiler infers the type.
```

Do not write type annotations for types that are easy to infer. These include
variables or parameters that you initialize to a `string`, `number`, `boolean`,
`RegExp` literal, or `new` expression.

```ts
// Bad
const x: boolean = true; // 'boolean' here does not aid readability
```

```ts
// Bad
const x: Set<string> = new Set(); // 'Set' is trivially inferred from the initialization
```

```ts
// Good
const x = new Set<string>();
```

For more complex expressions, type annotations can make the program easier to
read. The code reviewer decides if an annotation is necessary.

### Return types

The code author decides if functions and methods have return type annotations.
Reviewers _can_ ask for annotations that make complex return types clear.
Projects _can_ have a local policy that always requires return types. But this
is not a general TypeScript style requirement.

Explicit types for the implicit return values of functions and methods have two
benefits:

- More precise documentation for readers of the code
- Faster discovery of possible type errors if a later code change changes the
  return type of the function

## Null versus undefined

TypeScript supports `null` and `undefined` types. You can make a nullable type
as a union type (`string|null`). The same is true for `undefined`. There is no
special syntax for unions of `null` and `undefined`.

TypeScript code can use `undefined` or `null` to show that a value is absent.
There is no general rule to prefer one over the other. Many JavaScript APIs use
`undefined` (for example `Map.get`). Many DOM APIs use `null` (for example
`Element.getAttribute`). Thus, the correct absent value depends on the context.

### Nullable/undefined type aliases

Type aliases _must not_ include `|null` or `|undefined` in a union type.
Nullable aliases usually show that the application passes null values through
too many layers. This makes it hard to find the source of the original problem
that caused the `null`. Nullable aliases also make it unclear when specific
values on a class or interface can be absent.

Instead, code _must_ add `|null` or `|undefined` only where it uses the alias.
Code _should_ handle null values near the location where they occur.

```ts
// Bad
type CoffeeResponse = Latte|Americano|undefined;

class CoffeeService {
  getLatte(): CoffeeResponse { ... };
}
```

```ts
// Better
type CoffeeResponse = Latte|Americano;

class CoffeeService {
  getLatte(): CoffeeResponse|undefined { ... };
}
```

```ts
// Best
type CoffeeResponse = Latte | Americano;

class CoffeeService {
    getLatte(): CoffeeResponse {
        return assert(fetchResponse(), 'Coffee maker is broken, file a ticket');
    }
}
```

### Optionals versus `|undefined` type

TypeScript has a special construct for optional parameters and fields. The
construct uses `?`:

```ts
interface CoffeeOrder {
  sugarCubes: number;
  milk?: Whole|LowFat|HalfHalf;
}

function pourCoffee(volume?: Milliliter) { ... }
```

Optional parameters implicitly include `|undefined` in their type. But they
are different, because you can leave them out when you construct a value or
call a method. For example, `{sugarCubes: 1}` is a valid `CoffeeOrder` because
`milk` is optional.

Use optional fields (on interfaces or classes) and parameters, not a
`|undefined` type.

For classes, if possible, avoid this pattern fully. Initialize as many fields as
possible.

```ts
// Good
class MyClass {
    field = '';
}
```

## Structural types versus nominal types

The TypeScript type system is structural, not nominal. That is, a value matches
a type if the value has at least all the properties that the type requires. The
types of the properties must also match, recursively.

Use structural typing where applicable in your code. Outside of test code, use
interfaces, not classes, to define structural types. In test code, it can be
useful for mock implementations to match the code under test structurally.
Then you do not need to add an extra interface.

When you supply a structural implementation, include the type explicitly at the
declaration of the symbol. This gives more precise type checking and error
reports.

```ts
// Good
const foo: Foo = {
    a: 123,
    b: 'abc',
};
```

```ts
// Bad
const badFoo = {
    a: 123,
    b: 'abc',
};
```

> Why? The "badFoo" object above uses type inference. You can add more fields
> to "badFoo", and the compiler infers the type from the object itself. If you
> pass a "badFoo" to a function that takes a "Foo", the error will be at the
> function call site. The error will not be at the object declaration site.

## Interfaces versus type aliases

TypeScript supports
[type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)
to give a name to a type expression. You can use them to name primitives,
unions, tuples, and all other types.

But when you declare types for objects, use interfaces, not a type alias for
the object literal expression.

```ts
// Good
interface User {
    firstName: string;
    lastName: string;
}
```

```ts
// Bad
type User = {
    firstName: string;
    lastName: string;
};
```

> Why? These two forms are almost equivalent. The guide chooses one of the two
> forms to prevent variation. Also, there are
> [interesting technical reasons to prefer interface](https://ncjamieson.com/prefer-interfaces/).

## `Array<T>` type

Simple types contain only alphanumeric characters and dots. For these types,
use the short array syntax, `T[]`, not the longer form `Array<T>`.

For all more complex types, use the longer form `Array<T>`.

This rule also applies to `readonly T[]` versus `ReadonlyArray<T>`.

```ts
// Good
const a: string[];
const b: readonly string[];
const c: ns.MyObj[];
const d: Array<string | number>;
const e: ReadonlyArray<string | number>;
```

```ts
// Bad
const f: Array<string>; // the syntax sugar is shorter
const g: ReadonlyArray<string>;
const h: { n: number; s: string }[]; // the braces/parens make it harder to read
const i: (string | number)[];
const j: readonly (string | number)[];
```

## Indexable (`{[key: string]: number}`) type

In JavaScript, it is common to use an object as an associative array (also
known as a "map", "hash", or "dict"):

```ts
const fileSizes: { [fileName: string]: number } = {};
fileSizes['readme.txt'] = 541;
```

In TypeScript, give a meaningful label for the key. The label is only for
documentation. TypeScript does not use it for other purposes.

```ts
// Bad
const users: {[key: string]: number} = ...;
```

```ts
// Good
const users: {[userName: string]: number} = ...;
```

> Instead of these indexable types, think about the ES6 `Map` and `Set` types.
> JavaScript objects have
> [surprising undesirable behaviors](http://2ality.com/2012/01/objects-as-maps.html),
> and the ES6 types show your intent more explicitly. Also, `Map`s can use
> keys of types other than `string`. `Set`s can contain types other than
> `string`.

The built-in TypeScript `Record<Keys, ValueType>` type lets you construct types
with a defined set of keys. This is different from associative arrays, because
the keys are known statically.

## Mapped and conditional types

TypeScript
[mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)
and
[conditional types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types)
let you specify new types that are based on other types. The TypeScript
standard library includes some type operators that are based on these
(`Record`, `Partial`, `Readonly`, and others).

These type system features let you specify types in a short form. They also let
you construct powerful abstractions that are type safe. But they have some
disadvantages:

- Explicit properties and type relations (for example interfaces and
  extension) are easier to read. With type operators, the reader must evaluate
  the type expression mentally. This can make programs much harder to read.
- The evaluation model of mapped and conditional types is underspecified. This
  is especially true together with type inference. The model is not always well
  understood, and it frequently changes between TypeScript compiler versions.
- Some language tools do not work well with these type system features. For
  example, the "find references" function of your integrated development
  environment (IDE) will not find properties in a `Pick<T, Keys>` type. Thus,
  the "rename property" refactoring function will not find them either.

The style recommendation is:

- Always use the simplest type construct that can express your code.
- A small quantity of repetition or long code frequently costs much less than
  complex type expressions cost in the long term.
- You can use mapped and conditional types, but think about these points.

For example, the built-in TypeScript `Pick<T, Keys>` type lets you create a new
type from a subset of another type `T`. But a simple interface extension can
frequently be easier to understand.

```ts
interface User {
    shoeSize: number;
    favoriteIcecream: string;
    favoriteChocolate: string;
}

// FoodPreferences has favoriteIcecream and favoriteChocolate, but not shoeSize.
type FoodPreferences = Pick<User, 'favoriteIcecream' | 'favoriteChocolate'>;
```

This is equivalent to a `FoodPreferences` interface that writes out the
properties:

```ts
interface FoodPreferences {
    favoriteIcecream: string;
    favoriteChocolate: string;
}
```

To decrease duplication, `User` can extend `FoodPreferences`. Another option,
which is possibly better, is a nested field for food preferences:

```ts
// Good
interface FoodPreferences {
    /* as above */
}
interface User extends FoodPreferences {
    shoeSize: number;
}
```

## `any` type

The TypeScript `any` type is a supertype and a subtype of all other types. It
lets you dereference all properties. Thus, `any` is dangerous. It can hide
serious programming errors. Its use also decreases the value of static types.

**Think about alternatives to `any`.** If you want to use `any`, think about
one of these options:

- [Give a more specific type](#give-a-more-specific-type)
- [Use `unknown`](#use-unknown-instead-of-any)
- [Suppress the lint warning and document why](#suppress-any-lint-warnings)

### Give a more specific type

Use interfaces, an inline object type, or a type alias:

```ts
// Good
// Use declared interfaces to represent server-side JSON.
declare interface MyUserJson {
    name: string;
    email: string;
}

// Use type aliases for types that are repetitive to write.
type MyType = number | string;

// Or use inline object types for complex return values.
function getTwoThings(): { something: number; other: string } {
    // ...
    return { something, other };
}

// Use a generic type where a library would otherwise use `any` to show that
// the type of the user data is not important. But read "Return type only
// generics" below.
function nicestElement<T>(items: T[]): T {
    // Find the nicest element in items.
}
```

### Use `unknown` instead of `any`

The `any` type lets you assign it to all other types. It also lets you
dereference all properties on it. Frequently, this behavior is not necessary or
wanted, and the code must only show that a type is unknown. In this situation,
use the built-in type `unknown`. It expresses the concept, and it is much safer
because it does not let you dereference arbitrary properties.

```ts
// Good
// You can assign all values (including null or undefined) to this variable.
// You cannot use it before you narrow or cast the type.
const val: unknown = value;
```

```ts
// Bad
const danger: any = value; /* result of an arbitrary expression */
danger.whoops(); // This access is completely unchecked.
```

To use `unknown` values safely, narrow the type with a
[type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types).

### Suppress `any` lint warnings

Sometimes the use of `any` is legitimate, for example to construct a mock
object in tests. In these cases, add a comment that suppresses the lint warning.
Also document why the use is legitimate.

```ts
// Good
// This test needs only a partial implementation of BookService. If we forgot
// something, the test will fail in an obvious way.
// This is an intentionally unsafe partial mock.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockBookService = {
    get() {
        return mockBook;
    },
} as any as BookService;
// This test does not use the shopping cart.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const component = new MyComponent(
    mockBookService,
    /* unused ShoppingCart */ null as any,
);
```

## Tuple types

If you want to create a Pair type, use a tuple type instead:

```ts
// Bad
interface Pair {
  first: string;
  second: string;
}
function splitInHalf(input: string): Pair {
  ...
  return {first: x, second: y};
}
```

```ts
// Good
function splitInHalf(input: string): [string, string] {
  ...
  return [x, y];
}

// Use it as follows:
const [leftHalf, rightHalf] = splitInHalf('my string');
```

But meaningful names for the properties are frequently clearer.

If an `interface` declaration is too much, you can use an inline object literal
type:

```ts
// Good
function splitHostPort(address: string): {host: string; port: number} {
  ...
}

// Use it as follows:
const address = splitHostPort(userAddress);
use(address.port);

// You can also use destructuring to get tuple-like behavior:
const {host, port} = splitHostPort(userAddress);
```

## Wrapper types

Never use these types that are related to JavaScript primitives:

- `String`, `Boolean`, and `Number` have a slightly different meaning from the
  related primitive types `string`, `boolean`, and `number`. Always use the
  lowercase version.
- `Object` is similar to both `{}` and `object`, but it is slightly less
  strict. Use `{}` for a type that includes all values except `null` and
  `undefined`. Use lowercase `object` to also exclude the other primitive
  types (the three types above, and `symbol` and `bigint`).

Also, never call the wrapper types as constructors (with `new`).

## Return type only generics

Avoid the creation of APIs that have return type only generics. When you use
existing APIs that have return type only generics, always specify the generics
explicitly.
