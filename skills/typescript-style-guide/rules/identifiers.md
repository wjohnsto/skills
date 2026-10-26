---
description: >-
  Naming rules for TypeScript identifiers, including classes, variables,
  functions, and constants.
metadata:
  tags: [naming, identifiers, camelCase, conventions]
---

# Identifiers

Identifiers must use only ASCII letters, digits, underscores (for constants and
structured test method names), and the `$` sign. Thus the regular expression
`[$\w]+` matches each valid identifier name.

| Style            | Category                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `UpperCamelCase` | class / interface / type / enum / decorator / type parameters      |
| `lowerCamelCase` | variable / parameter / function / method / property / module alias |
| `CONSTANT_CASE`  | global constant values, including enum values                      |
| `#ident`         | private identifiers (never use)                                    |

- **Abbreviations**: In names, treat abbreviations such as acronyms as whole
  words. For example, use `loadHttpUrl`, not ~~`loadHTTPURL`~~. The exception
  is a platform name that requires a different form (for example
  `XMLHttpRequest`).

- **Dollar sign**: Identifiers _should not_ usually use `$`. The exception is
  when you align with the naming conventions of third-party frameworks. Refer
  to [naming style](#naming-style) for more about `$` with `Observable` values.

- **Type parameters**: Type parameters, as in `Array<T>`, can use a single
  uppercase character (`T`) or `UpperCamelCase`.

- **Test names**: Test method names in xUnit-style test frameworks can use `_`
  separators to show structure, for example `testX_whenY_doesZ()`.

- **`_` prefix/suffix**: Identifiers must not use `_` as a prefix or suffix.

    Thus, do not use `_` as an identifier by itself (for example, to show that
    a parameter is unused).

> Tip: If you need only some of the elements from an array (or TypeScript
> tuple), you can add extra commas in a destructuring statement. The extra
> commas skip the elements between them:
>
> ```ts
> const [a, , b] = [1, 5, 10]; // a <- 1, b <- 10
> ```

- **Imports**: Module namespace imports use `lowerCamelCase`, but files use
  `snake_case`. Thus, correct imports do not match the case style of the file
  name. For example:

    ```ts
    import * as fooBar from './foo_bar';
    ```

- **Constants**: `CONSTANT_CASE` shows that the value is _intended_ not to
  change. You can use it for values that code can technically change (that
  is, values that are not deeply frozen). It tells users that they must not
  change the value.

    ```ts
    const UNIT_SUFFIXES = {
        milliseconds: 'ms',
        seconds: 's',
    };
    ```

    A constant can also be a `static readonly` property of a class.

    ```ts
    class Foo {
        private static readonly MY_SPECIAL_NUMBER = 5;

        bar() {
            return 2 * Foo.MY_SPECIAL_NUMBER;
        }
    }
    ```

    If the program can create a value more than one time during its lifetime,
    the value must use `lowerCamelCase`. If users change the value in any way,
    the value must also use `lowerCamelCase`.

    If a value is an arrow function that implements an interface, you can
    declare it in `lowerCamelCase`.

- **React components**: If JSX requires it, components must use
  `UpperCamelCase`. This rule applies to all forms of component (for example a
  function, an ES6 class, or `React.createClass`).

    ```ts
    // Good
    function GoLink(props: GoLinkProps) {
      return <a href={...}>...</a>;
    }

    class MyDialog extends React.Component<MyDialogProps, MyDialogState> {
      ...
    }
    ```

    ```ts
    // Bad: You cannot use lowercase functions as JSX elements. The
    // transpiler cannot tell them apart from HTML tags.
    function goLink(props: GoLinkProps) {
      return <a href={...}>...</a>;
    }
    ```

## Aliases

When you make a local-scope alias of an existing symbol, use the format of the
existing identifier. The local alias must match the naming and format of the
source. For variables, use `const` for your local aliases. For class fields,
use the `readonly` attribute.

```ts
const { Foo } = SomeType;
const CAPACITY = 5;

class Teapot {
    readonly BrewStateEnum = BrewStateEnum;
    readonly CAPACITY = CAPACITY;
}
```

## Naming style

TypeScript shows information in types. Thus, names _should not_ repeat
information that the type already gives.

Some specific examples of this rule:

- Do not use trailing or leading underscores for private properties or methods.
- Do not use the `opt_` prefix for optional parameters.
- Do not give interfaces a special mark (~~`IMyInterface`~~ or
  ~~`MyFooInterface`~~), unless it is the usual style in its environment. When
  you add an interface for a class, give it a name that tells why the interface
  exists. For example, use `class TodoItem` and `interface TodoItemStorage` if
  the interface gives the format for storage or serialization in JSON.
- A `$` suffix on `Observable`s is a common external convention. It can help
  show the difference between observable values and concrete values. Each team
  decides if this convention is useful, but it _should_ be consistent in each
  project.

## Descriptive names

Names _must_ be descriptive and clear to a new reader. Do not use abbreviations
that are ambiguous or unfamiliar to readers outside your project. Do not
remove letters from a word to abbreviate it.

- **Exception**: Variables that are in scope for 10 lines or fewer _can_ use
  short (for example, single-letter) names. This includes arguments that are
  _not_ part of an exported API.
