# Agent skills

This repository contains agent skills for AI coding assistants. The skills
obey the [Agent Skills specification](https://agentskills.io/specification).

## Available skills

| Skill | Category | Use when | Covers |
| --- | --- | --- | --- |
| `agent-coding-guide` | Discipline | You implement a feature, bug fix, or refactor, before you write implementation code | Understand-plan-test-verify workflow, quality gates, test-driven development (TDD), validation, and project setup |
| `go-style-guide` | Discipline | You write, review, or refactor Go code, or you have a question about Go style | Google's Go style guidance for readability, naming, formatting, packages, comments, errors, interfaces, and testing |
| `review-loop` | Discipline | The user asks for a "review loop" | Owner and reviewer roles, the review loop until GPT-6.1 Sol approves, the final decision of the owner, and scope control |
| `typescript-style-guide` | Discipline | You write, review, refactor, or set up TypeScript code | Identifier names, comments, classes, functions, variables, control flow, type safety, imports, exports, and type system rules |
| `visual-guide` | Reference | You build frontend UI components or pages | Brand colors, typography, spacing, buttons, forms, dark theme, layout constraints, component patterns, icons, and design tokens |
| `writing-guide` | Discipline | You write or review documentation, READMEs, tutorials, code comments, blog posts, or other content | ASD-STE100 (Simplified Technical English) rules for technical content, blog voice, active voice, punctuation, sentence case, calls to action (CTAs), and common warning signs |
| `yeet` | Discipline | The user mentions ‘yeet’ | Delegate scoped staging, a minimal commit, and a push to GPT-6 Luna with low reasoning |

## Install

Put the skill directories in `~/.agents/skills/`. Pi, OpenCode, and Codex
read user skills from this directory.

The `wjohnsto/dotfiles` repository installs the skills with Home Manager. The
flake input `agent-skills` points to this repository. To get new skill
versions, do these steps:

1. Push to GitHub.
2. In the dotfiles repository, run `make update`.

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

3. If necessary, add `references/`, `rules/`, `assets/`, or `scripts/`
   directories.
4. Validate the skills:

   ```bash
   make check
   ```

   `make check` uses `uvx` to run the reference validator,
   [`skills-ref`](https://github.com/agentskills/agentskills/tree/main/skills-ref).

## License

MIT
