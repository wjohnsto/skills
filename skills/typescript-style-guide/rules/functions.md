---
description: >-
  Rules for function declarations, arrow functions, expression bodies, and
  proper use of 'this' in TypeScript.
metadata:
  tags: [functions, arrow functions, declarations, callbacks]
---

# Functions

## Function declarations

Use `function foo() { ... }` to declare named functions. This rule also applies
to functions in nested scopes, for example in another function.

Use function declarations instead of function expressions that you assign to a
local variable (~~`const x = function() {...};`~~). TypeScript already does not
let code rebind functions. So you do not need `const` to prevent overwrites of a
function declaration.

Exception: If the function accesses the `this` of the outer scope, assign an
arrow function to a variable. Do not use a function declaration.

```ts
// Good
function foo() { ... }
```

```ts
// Bad
// With the declaration above, this code does not compile:
foo = () => 3;  // ERROR: Invalid left-hand side of assignment expression.

// So declarations like this are unnecessary.
const foo = function() { ... }
```

You _can_ use top-level arrow functions to explicitly declare that a function
implements an interface.

```ts
// Good
interface SearchFunction {
  (source: string, subString: string): boolean;
}

const fooSearch: SearchFunction = (source, subString) => { ... };
```

## Use arrow functions in expressions

Always use arrow functions instead of pre-ES6 function expressions defined with
the `function` keyword.

```ts
// Good
bar(() => {
    this.doSomething();
});
```

```ts
// Bad
bar(function() { ... })
```

Use function expressions (with the `function` keyword) only if code must
dynamically rebind the `this` pointer. But in general, code _should not_ rebind
the `this` pointer. Code in regular functions (not arrow functions or methods)
_should not_ access `this`.

## Expression bodies and block bodies

Use arrow functions with an expression or a block as their body, as appropriate.

```ts
// Good
function someFunction() {
    // Block bodies for arrow functions (bodies with => { }) are correct:
    const receipts = books.map((b: Book) => {
        const receipt = payMoney(b.price);
        recordTransaction(receipt);
        return receipt;
    });

    // Expression bodies are also correct if the code uses the return value:
    const longThings = myValues
        .filter((v) => v.length > 1000)
        .map((v) => String(v));

    function payMoney(amount: number) {
        // Function declarations are correct, but do not access `this` in them.
    }
}
```

Use an expression body only if the code uses the return value of the function.

```ts
// Bad: if the code does not use the return value of the function, use a block ({ ... }).
myPromise.then((v) => console.log(v));
```

```ts
// Good: the code does not use the return value, so use a block body.
myPromise.then((v) => {
    console.log(v);
});
// Good: code can use blocks to make it easier to read.
const transformed = [1, 2, 3].map((v) => {
    const intermediate = someComplicatedExpr(v);
    const more = acrossManyLines(intermediate);
    return worthWrapping(more);
});
```

## Function expressions and `this`

Function expressions must not use `this` unless they specifically exist to
rebind the `this` pointer. In most cases, use arrow functions or explicit
parameters so that you do not need to rebind `this`.

```ts
// Bad
function clickHandler() {
    // What is `this` in this context?
    this.textContent = 'Hello';
}
// The browser implicitly sets the `this` pointer reference to document.body.
document.body.onclick = clickHandler;
```

```ts
// Good: explicitly reference the object from an arrow function.
document.body.onclick = () => {
    document.body.textContent = 'hello';
};
// Alternatively, take an explicit parameter.
const setTextFn = (e: HTMLElement) => {
    e.textContent = 'hello';
};
document.body.onclick = setTextFn.bind(null, document.body);
```

## Arrow functions as properties

Classes usually _should not_ contain properties initialized to arrow functions.
With arrow function properties, the calling function must know that the `this`
of the callee is already bound. This increases confusion about what `this` is.
Also, call sites and references that use such handlers look incorrect. That is,
the reader needs non-local knowledge to know that they are correct.

Code _should_ always use arrow functions to call instance methods
(`const handler = (x) => { this.listener(x); };`). Code _should not_ get or
pass references to instance methods
(~~`const handler = this.listener; handler(x);`~~).

> Note: In some specific situations, arrow functions as properties are useful
> and make code much easier to read. An example is when you bind functions in a
> template. Use judgement with this rule. Also, refer to the
> [Event handlers](#event-handlers) section below.

```ts
// Bad: the callback does not keep `this`.
class DelayHandler {
    constructor() {
        setTimeout(this.patienceTracker, 5000);
    }
    private patienceTracker() {
        this.waitedPatiently = true;
    }
}
```

```ts
// Bad: arrow functions usually should not be properties.
class DelayHandler {
    constructor() {
        // This code looks like it forgot to bind `this`.
        setTimeout(this.patienceTracker, 5000);
    }
    private patienceTracker = () => {
        this.waitedPatiently = true;
    };
}
```

```ts
// Good: explicitly manage `this` at call time.
class DelayHandler {
    constructor() {
        setTimeout(() => {
            this.patienceTracker();
        }, 5000);
    }
    private patienceTracker() {
        this.waitedPatiently = true;
    }
}
```

## Event handlers

Event handlers _can_ use arrow functions when you do not need to uninstall the
handler. For example, you do not need to uninstall it if the class itself emits
the event. If you must uninstall the handler, use arrow function properties.
They automatically capture `this` and give a stable reference to uninstall.

```ts
// Good: event handlers can be anonymous functions or arrow function properties.
class Component {
    onAttached() {
        // This class emits the event, so you do not need to uninstall the handler.
        this.addEventListener('click', () => {
            this.listener();
        });
        // this.listener is a stable reference, so you can uninstall it later.
        window.addEventListener('onbeforeunload', this.listener);
    }
    onDetached() {
        window.removeEventListener('onbeforeunload', this.listener);
    }
    // An arrow function stored in a property is bound to `this` automatically.
    private listener = () => {
        confirm('Do you want to exit the page?');
    };
}
```

Do not use `bind` in the expression that installs an event handler. The `bind`
call creates a temporary reference that you cannot uninstall.

```ts
// Bad: a bound listener is a temporary reference that you cannot uninstall.
class Component {
    onAttached() {
        window.addEventListener('onbeforeunload', this.listener.bind(this));
    }
    onDetached() {
        // This bind creates a different reference, so this line does nothing.
        window.removeEventListener('onbeforeunload', this.listener.bind(this));
    }
    private listener() {
        confirm('Do you want to exit the page?');
    }
}
```
