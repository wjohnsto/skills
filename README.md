# Agent Skills

A collection of agent skills for AI coding assistants working on projects. These skills follow the [AgentSkills specification](https://agentskills.io/specification) and provide guidance on visual standards, coding conventions, and recommended technologies.

## What Are Agent Skills?

Agent skills are structured knowledge documents that AI assistants (like Cursor, Claude Code, or similar tools) can reference when working on your projects. Each skill contains instructions, guidelines, and examples that help agents produce consistent, high-quality output aligned with standards.

## Repository Structure

```
internal-agent-skills/
├── skills/                      # All skills live here
│   ├── visual-guide/            # Example: Visual guidelines skill
│   │   ├── SKILL.md             # Main skill file (required)
│   │   ├── references/          # Additional documentation
│   │   ├── assets/              # Static resources (images, templates)
│   │   └── scripts/             # Executable scripts
│   └── ...
└── scripts/                     # Repository utilities (Bun project)
    ├── __tests__/               # Skill validation tests
    └── src/                     # Validation logic
```

## Using Skills

Add skills to your project by copying relevant skill directories into your project's `.agents/skills/` directory.

### With Cursor

Either copy the relevant skill directories into your project's `.cursor/skills/` directory or create a symbolic link to the `.agents/skills/` directory after copying relevant skill directories there:

```bash
ln -s ../.agents/skills .cursor/skills
```

### General Usage

Most AI assistants that support the AgentSkills spec will:
1. Load skill metadata (`name` and `description`) at startup
2. Activate relevant skills based on the task context
3. Load full skill instructions when activated
4. Reference additional files (`references/`, `scripts/`, `assets/`) as needed

## Adding a New Skill

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
   - `references/` - Additional documentation files
   - `assets/` - Static resources (images, data files, templates)
   - `scripts/` - Executable scripts the agent can run

5. Validate your skill:
   ```bash
   bun test
   ```

### Skill Naming Rules

- Lowercase letters, numbers, and hyphens only
- Must not start or end with a hyphen
- No consecutive hyphens (`--`)
- Maximum 64 characters
- Directory name must match the `name` field in frontmatter

### Best Practices

- Keep `SKILL.md` under 500 lines; move detailed content to `references/`
- Write descriptions that help agents identify when to use the skill
- Include examples of inputs and outputs where applicable
- Document edge cases and common pitfalls

## Validation

Skills are validated using Bun tests that check compliance with the [AgentSkills specification](https://agentskills.io/specification).

```bash
# Install dependencies (first time only)
bun install

# Run validation tests
bun test
```

The tests validate:
- `SKILL.md` file exists in each skill directory
- Required frontmatter fields (`name`, `description`) are present
- `name` follows naming rules (lowercase, hyphens, no consecutive hyphens, etc.)
- `name` matches the directory name
- `description` is non-empty and within length limits
- Optional fields (`compatibility`, `metadata`) have correct types if present

Note: Directories starting with `_` (like `_template`) are skipped during validation.

## Available Skills

| Skill                    | Description                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent-coding-guide`     | Use when implementing any feature, bug fix, or refactor — before writing implementation code.                                                                 |
| `visual-guide`           | Use when building frontend UI components or pages. Covers brand colors, typography scales, spacing tokens, button styles, dark theme, and layout constraints. |
| `typescript-style-guide` | Use when writing or reviewing TypeScript code.                                                                                                                |

## License

MIT
