---
name: agent-coding-guide
description: >-
  Use before you write implementation code for a feature, bug fix, or
  refactor.
license: MIT
metadata:
  author: wjohnsto
  version: "1.1"
  category: discipline
  triggers: code change, new feature, bug fix, refactor, TDD, tests
---

# Agent coding guide

## Core rule

**Each change goes through these phases: Understand → Quality gates → Plan → Red/green test-driven development (TDD) → Verify. There are no exceptions.**

If you obey the words of a rule but not its purpose, you break the rule.

Use this workflow for each prompt that changes code. Do not skip steps.

## Phase 1: Understand

1. **Read the prompt carefully.** Find what the prompt asks for. For example, a new feature, a bug fix, or a refactor.
2. **If the requirements are not clear, ask questions.** Ask them before you write code. Do not guess the business logic.
3. **Search the codebase.** Find existing patterns, conventions, and related code. Read each file that you plan to change _before_ you change it.

## Phase 2: Quality gates

Before you plan the implementation, find the validation commands of the project. Examine these sources in this order:

- **Makefile**: If the `Makefile` has targets for the quality gates, use this file.
- **package.json**: If the `Makefile` has no quality gates and `package.json` has quality gate scripts, use this file.
- **scripts/**: If there is no `Makefile` or `package.json` and `scripts/` has quality gate scripts, use `scripts/`.
- **Project documentation**: If none of the sources above exist, read the project documentation to find the quality gates.
- **Language tools**: If the documentation does not give quality gates, examine the language of the project. Find the quality gates that you can use for that language.

If these checks exist, run them in this order:

1. **Check**: Run the checker of the project (for example `make check`, `make typecheck`, or `pnpm check`). If the checker fails, stop. Report the existing errors to the user before you make changes.
2. **Lint**: Run the linter of the project. If the linter fails, stop. Report the existing errors to the user before you make changes.

Do not fix existing type or lint failures unless the user tells you to fix them. The starting point must be clean before you start a feature, bug fix, or refactor.

If you find other quality gates, run them before you start. Make sure that the starting point is clean.

## Phase 3: Plan

Before you write code, make a **file-by-file plan**. Show the plan to the user.

Put these items in the plan:

- **Each file** that you will create or change
- **The changes** that you will make in each file, and the reason for each change
- **The order** in which you will change the files

Use this structure for the plan:

```
Plan:
1. `src/components/users/user.test.ts`: Add a failing test for <feature>.
2. `src/components/users/controller.ts`: Implement <feature> to make the test pass.
3. `src/components/users/router.ts`: Connect the new endpoint.
...
```

Put the test files first in the plan. If the user does not agree with the plan, change the plan before you continue.

## Phase 4: Red/green TDD

Use the red/green TDD cycle for each meaningful change:

### Step 1: Run the existing tests (baseline)

Run the test suite of the project _before_ you make changes. This gives a green baseline. It also shows the existing failures that you must know about.

If tests fail before you change the code, tell the user. Then decide how to continue.

### Step 2: Red: write a failing test

Write a test for the necessary behavior. Run the test. Make sure that the test **fails**. If the test passes immediately, the test does not add value. Think again about what the test examines.

### Step 3: Green: write the minimum code to pass

Write only the production code that is necessary to make the failing test pass. Do not add behavior that no test covers.

### Step 4: Refactor

When the tests pass, improve the structure of the code. Then run the tests again to make sure that nothing broke.

### Step 5: Repeat

Do the red/green cycle for each behavior in your plan.

## Phase 5: Verify

1. **Run the full test suite** one last time. Make sure that all tests pass.
2. **Run the formatter.** If the project has a formatter, use the standard format command of the project.
3. **Run the linter.** If the project has a linter, run it. Fix the problems that your changes caused.
4. **Run the type checker.** If the project has a type checker, run it. Fix the problems that your changes caused.
5. **Review your diff.** Look for debug code, commented-out lines, and unnecessary changes.
6. **Give the user a summary of your work.** Tell the user about each difference from the plan. Tell the user which verification commands passed.

## Rules

- **NEVER edit a file that you did not read first.** Always read the current contents before you make changes. There are no exceptions.
- **NEVER skip tests.** If the project has no test infrastructure, set it up before you write feature code. There are no exceptions.
- **NEVER skip the available type checks or lint checks.** Run them before you start the work. Run them again after you complete the work. There are no exceptions.
- **If a formatter exists, ALWAYS run it.** The format step is part of verification. It is not an optional cleanup step.
- **Keep changes minimal.** Change only the files that the task needs. Do not refactor unrelated code unless the user asks you to.
- **Obey existing conventions.** Use the same names, format, and architecture patterns as the codebase. If a language-specific style skill exists (for example `typescript-style-guide`), obey it.

## Excuses and facts

| Excuse                                                  | Fact                                                                                                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Too simple to test"                                    | Simple code also breaks. A test takes about 30 seconds to write.                                                                                              |
| "I'll add tests after"                                  | A test that passes immediately proves nothing about the intent. A test that you write first defines _what must occur_. A test that you write after the code only shows _what already occurred_. |
| "The task is small, no plan needed"                     | Small tasks frequently change more than one file. A one-line plan takes about 10 seconds. It prevents wasted work.                                            |
| "I already know what to change"                         | If you read the file first, you find out-of-date assumptions. ALWAYS read a file before you edit it.                                                         |
| "Type check and lint can wait until the end"            | Existing failures hide regressions. Get a clean quality baseline before you change code.                                                                      |
| "Formatting is cosmetic"                                | A consistent format keeps diffs easy to review. It also keeps unrelated style changes out of later work.                                                      |
| "I'll just refactor this unrelated code while I'm here" | Changes outside the scope add risk. Change only what the task needs.                                                                                          |
| "The user seems in a hurry"                             | If you skip steps, bugs appear later and cost more time. The full process IS the fastest method.                                                              |

## Warning signs: stop and go back

If you do one of these things, stop immediately:

- You write implementation code before a failing test exists.
- You edit a file that you did not read.
- You start to write code before you show a plan.
- You think "this is different because..."
- You skip the baseline type check or lint run, and those commands exist.
- You skip the baseline test run.
- You finish, but you did not run the available formatter, linter, type checker, and tests.

**For each of these signs**: Go back to the phase that you skipped. Do not continue.

## Valid exceptions

1. **The task changes only configuration or documentation**: TDD does not apply. You must still read each file before you edit it. You must also show a plan.
2. **No test framework exists**: Before you continue with TDD, set up a minimal test runner for the language. Confirm the choice with the user.

**All other tasks**: Obey the full workflow. There are no exceptions.

## Special cases

1. **Existing tests fail**: Report the failures to the user before you make changes. Do not fix unrelated tests unless the user asks you to.
2. **A large task changes many files**: Divide the plan into phases. When you complete a phase, confirm it with the user. Then start the next phase.

## Project setup

For the base technologies, file structure, and configuration of a new application, see [project-setup](references/project-setup.md).
