# Agent Skills

Agent skills for AI coding assistants. The skills follow the
[Agent Skills specification](https://agentskills.io/specification).

## Available skills

| Skill | Category | Use when | Covers |
| --- | --- | --- | --- |
| `agent-coding-guide` | Discipline | Implementing a feature, bug fix, or refactor before writing implementation code | Understand-plan-test-verify workflow, quality gates, TDD, validation, and project setup guidance |
| `go-style-guide` | Discipline | Writing, reviewing, refactoring, or resolving style questions in Go code | Google's Go style guidance for readability, naming, formatting, packages, comments, errors, interfaces, and testing |
| `review-loop` | Discipline | The user asks for a "review loop" | Owner and reviewer roles, the review loop until GPT-6.1 Sol approves, owner final say, and scope creep control |
| `typescript-style-guide` | Discipline | Writing, reviewing, refactoring, or setting up TypeScript code | Identifier naming, comments, classes, functions, variables, control flow, type safety, imports, exports, and type system rules |
| `visual-guide` | Reference | Building frontend UI components or pages | Brand colors, typography, spacing, buttons, forms, dark theme, layout constraints, component patterns, icons, and design tokens |
| `writing-guide` | Discipline | Writing or reviewing docs, READMEs, tutorials, code comments, blog posts, or other content | ASD-STE100 (Simplified Technical English) rules for technical content, blog voice, active voice, punctuation, sentence case, CTAs, and common writing red flags |

## Install

Put the skill directories in `~/.agents/skills/`. Pi, OpenCode, and Codex
read user skills from this directory.

The `wjohnsto/dotfiles` repository installs the skills
with Home Manager. The flake input `agent-skills` points to this repository.
To get new skill versions, push to GitHub, then run `make update` in the
dotfiles repository.

## Add a skill

1. Make a directory in `skills/`. Use a lowercase, hyphenated name, for
   example `skills/my-skill/`.
2. Add a `SKILL.md` file. The `name` field must be the same as the directory
   name:

   ```yaml
   ---
   name: my-skill
   description: >-
     Use when ...
   ---
   ```

3. Optional: add `references/`, `rules/`, `assets/`, or `scripts/`
   directories.
4. Validate the skills:

   ```bash
   make check
   ```

   `make check` runs the reference validator,
   [`skills-ref`](https://github.com/agentskills/agentskills/tree/main/skills-ref),
   with `uvx`.

## License

MIT
