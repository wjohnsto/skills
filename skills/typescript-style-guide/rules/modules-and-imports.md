---
description: >-
  Rules for ES6 module imports, import paths, namespaces, and import type
  declarations in TypeScript.
metadata:
  tags: [modules, imports, namespaces, import type, ES6]
---

# Modules and imports

## Import paths

TypeScript code must use paths to import other TypeScript code. Paths can be
relative. A relative path starts with `.` or `..`. Paths can also start at the
base directory, for example `root/path/to/file`.

Code _should_ use relative imports (`./foo`), not absolute imports
`path/to/foo`, for files in the same (logical) project.

Think about a limit on the number of parent steps (`../../../`). Many parent
steps can make module and path structures hard to understand.

```ts
// Good
import { Symbol1 } from 'path/from/root';
import { Symbol2 } from '../parent/file';
import { Symbol3 } from './sibling';
```

## Namespaces versus modules

TypeScript has two methods to organize code: _namespaces_ and _modules_. Do not
use namespaces. Code must use TypeScript _modules_ (which are
[ECMAScript 6 modules](http://exploringjs.com/es6/ch_modules.html)). Thus, your
code _must_ use imports and exports to refer to code in other files, in the
form `import {foo} from 'bar';`

Your code must not use the `namespace Foo { ... }` construct. Use `namespace`s
only when external, third-party code requires them. To put your code into
separate namespaces, use separate files.

Code must not use `require` (as in `import x = require('...');`) for imports.
Use ES6 module syntax.

```ts
// Bad: Do not use namespaces.
namespace Rocket {
  function launch() { ... }
}

// Bad: Do not use <reference>.
/// <reference path="..."/>

// Bad: Do not use require().
import x = require('mydep');
```

## Import variants

ES6 and TypeScript have four variants of import statements:

| Import type   | Example                         | Use for                                                                           |
| ------------- | ------------------------------- | --------------------------------------------------------------------------------- |
| module        | `import * as foo from '...'`    | TypeScript imports                                                                |
| destructuring | `import { SomeThing } from ...` | TypeScript imports                                                                |
| default       | `import SomeThing from '...'`   | Only for other external code that requires them                                   |
| side-effect   | `import '...';`                 | Only to import libraries for their side effects on load (such as custom elements) |

```ts
// Good: Choose the applicable option of these two (see below).
import * as ng from '@angular/core';
import { Foo } from './foo';

// Use default imports only when necessary.
import Button from 'Button';

// Some libraries need an import for their side effects.
import 'jasmine';
```

## Module versus destructuring imports

Module imports and destructuring imports each have advantages. The better
choice depends on the situation.

Module imports give a name to the full module. Each symbol reference includes
the module name. This can make code easier to read, and it gives autocompletion
for all symbols in a module. Module imports also need fewer changes to the
import list, because all symbols are available. They cause fewer name
collisions, and they let the imported module use shorter names. Module imports
are very useful when you use many different symbols from large APIs.

Destructuring imports give local names for each imported symbol. They let you
write shorter code when you use the imported symbol. This is very useful for
symbols that you use frequently, such as the Jasmine `describe` and `it`.

```ts
// Bad: The import statement is too long, and the names repeat a namespace.
import {TableViewItem, TableViewHeader, TableViewRow, TableViewModel,
  TableViewRenderer} from './tableview';
let item: TableViewItem = ...;
```

```ts
// Good: Use the module as the namespace.
import * as tableview from './tableview';
let item: tableview.Item = ...;
```

```ts
// Good: Give local names to these common functions.
import {describe, it, expect} from './testing';

describe('foo', () => {
  it('bar', () => {
    expect(...);
    expect(...);
  });
});
```

## Rename imports

Code _should_ use a module import, or rename the exports, to fix name
collisions. Code _can_ rename imports
(`import {SomeThing as SomeOtherThing}`) if necessary.

Three examples where a new name can help:

1. If it is necessary to prevent collisions with other imported symbols.
2. If a tool generates the name of the imported symbol.
3. If the names of the imported symbols are not clear by themselves, a new name
   can make the code clearer. For example, with RxJS, `observableFrom` can be
   easier to read than the `from` function.

## `import type` / `export type`

Use `import type` and `export type` when you import or export only types. This
makes the intent explicit. It also agrees with the TypeScript
`verbatimModuleSyntax` compiler option, which requires type-only imports for
types.

```ts
// Good
import type { Foo } from './foo';
export type { Bar } from './bar';
```

Note: This rule does not apply to exported type definitions, such as
`export type Foo = ...;`.

TypeScript tools automatically find the difference between symbols that you use
as types and symbols that you use as values. They generate runtime loads only
for values.
