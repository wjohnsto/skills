---
name: agent-coding-guide
description: >-
  Use when implementing any feature, bug fix, or refactor — before writing
  implementation code.
license: MIT
metadata:
  author: wjohnsto
  version: "1.1"
  category: discipline
  triggers: code change, new feature, bug fix, refactor, TDD, tests
---

# Agent Coding Guide

## Iron Law

**Every change follows Understand → Quality Gates → Plan → Red/Green TDD → Verify. No exceptions.**

Violating the letter of these rules is violating the spirit of the rules.

Follow this workflow for every coding prompt. Do not skip steps.

## Phase 1: Understand

1. **Read the prompt carefully.** Identify what is being asked — new feature, bug fix, refactor, etc.
2. **Ask clarifying questions** before writing any code if the requirements are ambiguous. Don't guess at business logic.
3. **Search the codebase** for existing patterns, conventions, and related code. Read every file you plan to change _before_ changing it.

## Phase 2: Quality Gates

Before planning implementation work, identify the project's available validation commands from package scripts, task runners, Makefiles, language tooling, or project docs.

Run these checks in order if they exist:

1. **Type check** — Run the project's type checker. If it fails, stop and report the pre-existing errors to the user before making changes.
2. **Lint** — Run the project's linter. If it fails, stop and report the pre-existing errors to the user before making changes.

Do not silently fix pre-existing type or lint failures unless the user asks you to. The starting point must be clean before feature, bug fix, or refactor work begins.

## Phase 3: Plan

Before writing any code, produce a **file-by-file plan** and share it with the user.

The plan should list:

- **Each file** that will be created or modified
- **What changes** will be made in that file and why
- **The order** you will work through the files

Structure the plan like this:

```
Plan:
1. `src/components/users/user.test.ts` — Add failing test for <feature>
2. `src/components/users/controller.ts` — Implement <feature> to make the test pass
3. `src/components/users/router.ts` — Wire up the new endpoint
...
```

Test files always come first in the plan. If the user disagrees with the plan, revise it before proceeding.

## Phase 4: Red/Green TDD

Follow the red/green TDD cycle for every meaningful change:

### Step 1: Run existing tests (baseline)

Run the project's test suite _before_ making any changes. This establishes a green baseline and reveals any pre-existing failures you need to be aware of.

If tests fail before you've changed anything, notify the user and decide how to proceed.

### Step 2: Red — write a failing test

Write a test that describes the desired behavior. Run it and confirm it **fails**. If it passes immediately, the test is not adding value — reconsider what you're testing.

### Step 3: Green — write the minimum code to pass

Implement only enough production code to make the failing test pass. Do not add behavior that is not covered by a test.

### Step 4: Refactor

With tests green, improve the code's structure. Re-run tests after refactoring to confirm nothing broke.

### Step 5: Repeat

Continue the red/green cycle for each piece of behavior in your plan.

## Phase 5: Verify

1. **Run the full test suite** one final time to confirm everything passes.
2. **Run the formatter** if the project has one. Use the project's standard format command.
3. **Run lint** if the project has a linter. Fix any issues caused by your changes.
4. **Run type check** if the project has a type checker. Fix any issues caused by your changes.
5. **Review your own diff** — check for leftover debug code, commented-out lines, and unnecessary changes.
6. **Summarize what you did** to the user, noting any deviations from the plan and which verification commands passed.

## Rules

- **NEVER edit a file you haven't read first.** Always read the current contents before making changes. No exceptions.
- **NEVER skip tests.** If the project has no test infrastructure, set it up before writing feature code. No exceptions.
- **NEVER skip available type checks or lint checks.** Run them before work starts and again after work is complete. No exceptions.
- **ALWAYS run the formatter if one exists.** Formatting is part of verification, not an optional cleanup step.
- **Keep changes minimal.** Only touch files that are necessary for the task. Don't refactor unrelated code unless asked.
- **Follow existing conventions.** Match the naming, formatting, and architectural patterns already in the codebase. If a language-specific style skill exists (e.g. `typescript-style-guide`), follow it.

## Rationalization Table

| Excuse                                                  | Reality                                                                                                                                       |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| "Too simple to test"                                    | Simple code breaks. A test takes 30 seconds to write.                                                                                         |
| "I'll add tests after"                                  | Tests that pass immediately prove nothing about intent. Tests-first define _what should happen_; tests-after confirm _what already happened_. |
| "The task is small, no plan needed"                     | Small tasks still touch multiple files. A one-line plan takes 10 seconds and prevents wasted work.                                            |
| "I already know what to change"                         | Reading the file first catches stale assumptions. ALWAYS read before editing.                                                                 |
| "Type check and lint can wait until the end"            | Pre-existing failures hide regressions. Establish a clean quality baseline before changing code.                                              |
| "Formatting is cosmetic"                                | Consistent formatting keeps diffs reviewable and prevents style churn from leaking into later work.                                           |
| "I'll just refactor this unrelated code while I'm here" | Out-of-scope changes introduce risk. Only touch what the task requires.                                                                       |
| "The user seems in a hurry"                             | Skipping steps costs more time when bugs surface later. The process IS the shortcut.                                                          |

## Red Flags — STOP and Correct Course

If you catch yourself doing any of these, stop immediately:

- Writing implementation code before a failing test exists
- Editing a file you haven't read yet
- Starting to code without sharing a plan
- Thinking "this is different because..."
- Skipping the baseline type check or lint run when those commands exist
- Skipping the baseline test run
- Finishing without running available formatter, lint, type check, and tests

**All of these mean**: go back to the phase you skipped. Do not continue forward.

## Valid Exceptions

1. **The task is purely config/docs** — TDD does not apply. Still read before editing and present a plan.
2. **No test framework exists** — Set up a minimal test runner appropriate for the language before proceeding with TDD. Confirm the choice with the user.

**Everything else**: Follow the full workflow. No exceptions.

## Edge Cases

1. **Existing tests are broken** — Report the failures to the user before making changes. Don't silently fix unrelated tests unless asked.
2. **Large task with many files** — Break the plan into phases. Confirm each phase with the user before moving to the next.

## Project Setup

For base technologies, file structure, and configuration when starting a new app, see [project-setup](references/project-setup.md).
