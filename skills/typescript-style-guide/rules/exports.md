---
description: >-
  Rules for named exports, API surface minimization, and module organization
  in TypeScript.
metadata:
  tags: [exports, named exports, API surface, modules]
---

# Exports

## Named exports

Use named exports in all code:

```ts
// Good
export class Foo { ... }
```

Do not use default exports. This makes sure that all imports follow a uniform
pattern.

```ts
// Bad
export default class Foo { ... }
```

> Why? Default exports do not give a canonical name. This makes central
> maintenance difficult, and code owners get relatively little benefit. Default
> exports can also make code less readable:
>
> ```ts
> import Foo from './bar'; // Legal.
> import Bar from './bar'; // Also legal.
> ```
>
> Named exports give an error when an import statement tries to import
> something that is not declared. Also, default exports encourage people to put
> everything into one big object as a namespace. This is unnecessary because
> the file scope already gives a namespace.

## Export visibility

TypeScript cannot restrict the visibility of exported symbols. Export only the
symbols that code outside of the module uses. In general, minimize the exported
API surface of modules.

## Mutable exports

Even where mutable exports are technically possible, they can make code hard to
understand and debug. This is especially true with re-exports across multiple
modules. In other words, `export let` is not allowed.

```ts
// Bad
export let foo = 3;
// In pure ES6, foo is mutable. Importers see the value change after one second.
// In TypeScript, if a second file re-exports foo, importers do not see the value change.
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);
```

If you must support mutable bindings that external code can access, use
explicit getter functions instead.

```ts
// Good
let foo = 3;
window.setTimeout(() => {
    foo = 4;
}, 1000 /* ms */);
// Use an explicit getter to access the mutable export.
export function getFoo() {
    return foo;
}
```

A common pattern is to export one of two values, based on a condition. For this
pattern, do the conditional check first, and then the export. Make sure that
all exports are final after the module body executes.

```ts
// Good
function pickApi() {
    if (useOtherApi()) return OtherApi;
    return RegularApi;
}
export const SomeApi = pickApi();
```

## Container classes

Do not create container classes with static methods or properties only to get
a namespace.

```ts
// Bad
export class Container {
    static FOO = 1;
    static bar() {
        return 1;
    }
}
```

Instead, export individual constants and functions:

```ts
// Good
export const FOO = 1;
export function bar() {
    return 1;
}
```

## Organize by feature

Organize packages by feature, not by type. For example, an online shop _should_
have packages named `products`, `checkout`, and `backend`, not ~~`views`,
`models`, and `controllers`~~.
