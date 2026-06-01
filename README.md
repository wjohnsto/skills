# Agent Skills

A collection of agent skills for AI coding assistants working on projects. These skills follow the [AgentSkills specification](https://agentskills.io/specification) and provide guidance on visual standards, coding conventions, and recommended technologies.

## What are agent skills?

Agent skills are structured knowledge documents that AI assistants (like Cursor, Claude Code, or similar tools) can reference when working on your projects. Each skill contains instructions, guidelines, and examples that help agents produce consistent, high-quality output aligned with standards.

## Repository structure

```
skills/
├── skills/                      # All skills live here
│   ├── agent-coding-guide/      # Coding workflow and project setup guidance
│   ├── go-style-guide/          # Go style rules
│   ├── typescript-style-guide/  # TypeScript style rules
│   ├── visual-guide/            # UI, theme, and component guidance
│   └── writing-guide/           # Writing and docs guidance
└── scripts/                     # Repository utilities (pnpm project)
    ├── __tests__/               # Skill validation tests
    └── src/                     # Validation logic
```

Each skill directory includes a required `SKILL.md`. Some skills also include supporting `references/`, `rules/`, `assets/`, or `scripts/` directories.

## Using skills

Add skills to your project by copying relevant skill directories into your project's `.agents/skills/` directory.

### With Cursor

Either copy the relevant skill directories into your project's `.cursor/skills/` directory or create a symbolic link to the `.agents/skills/` directory after copying relevant skill directories there:

```bash
ln -s ../.agents/skills .cursor/skills
```

### General usage

Most AI assistants that support the AgentSkills spec will:
1. Load skill metadata (`name` and `description`) at startup
2. Activate relevant skills based on the task context
3. Load full skill instructions when activated
4. Reference additional files (`references/`, `scripts/`, `assets/`) as needed

## Adding a new skill

1. Create a new directory under `skills/` with a lowercase, hyphenated name:
   ```bash
   mkdir skills/my-new-skill
   ```

2. Create a `SKILL.md` file with required frontmatter:
   ```yaml
   ---
   name: my-new-skill
   description: A clear description of what this skill does and when to use it.
   ---
   ```

3. Add your skill instructions in the markdown body below the frontmatter.

4. Optionally add supporting directories:
   - `references/` - Additional docs files
   - `assets/` - Static resources (images, data files, templates)
   - `scripts/` - Executable scripts the agent can run

5. Validate your skill:
   ```bash
   pnpm test
   ```

### Skill naming rules

- Lowercase letters, numbers, and hyphens only
- Must not start or end with a hyphen
- No consecutive hyphens (`--`)
- Maximum 64 characters
- Directory name must match the `name` field in frontmatter

### Best practices

- Keep `SKILL.md` under 500 lines; move detailed content to `references/`
- Write descriptions that help agents identify when to use the skill
- Include examples of inputs and outputs where applicable
- Document edge cases and common pitfalls

## Validation

Skills are validated using Vitest tests that check compliance with the [AgentSkills specification](https://agentskills.io/specification).

```bash
# Install dependencies (first time only)
pnpm install

# Run validation tests
pnpm test
```

The tests validate:
- `SKILL.md` file exists in each skill directory
- Required frontmatter fields (`name`, `description`) are present
- `name` follows naming rules (lowercase, hyphens, no consecutive hyphens, etc.)
- `name` matches the directory name
- `description` is non-empty and within length limits
- Optional fields (`compatibility`, `metadata`) have correct types if present

Note: Directories starting with `_` (like `_template`) are skipped during validation.

## Available skills

| Skill | Category | Use when | Covers |
| --- | --- | --- | --- |
| `agent-coding-guide` | Discipline | Implementing a feature, bug fix, or refactor before writing implementation code | Understand-plan-test-verify workflow, quality gates, TDD, validation, and project setup guidance |
| `go-style-guide` | Discipline | Writing, reviewing, refactoring, or resolving style questions in Go code | Google's Go style guidance for readability, naming, formatting, packages, comments, errors, interfaces, and testing |
| `typescript-style-guide` | Discipline | Writing, reviewing, refactoring, or setting up TypeScript code | Identifier naming, comments, classes, functions, variables, control flow, type safety, imports, exports, and type system rules |
| `visual-guide` | Reference | Building frontend UI components or pages | Brand colors, typography, spacing, buttons, forms, dark theme, layout constraints, component patterns, icons, and design tokens |
| `writing-guide` | Discipline | Writing or reviewing docs, READMEs, tutorials, blog posts, or other content | Voice, concision, active voice, abbreviations, punctuation, sentence case, CTAs, and common writing red flags |

## License

MIT
