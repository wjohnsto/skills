import { describe, test, expect, beforeAll } from "vitest";
import { join, basename, dirname } from "node:path";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  discoverSkills,
  validateDescriptionFormat,
  validateMetadataTriggers,
  validateMetadataCategory,
  validateLineCount,
  validateNoDuplicateFrontmatter,
  validateNoForceLoading,
  validateSupportingFiles,
  type SupportingFileResult,
} from "../src/validator";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, "../../../skills");

interface ParsedSkill {
  name: string;
  path: string;
  data: Record<string, unknown>;
  content: string;
}

describe("Writing Skills Compliance", () => {
  let skills: ParsedSkill[];

  beforeAll(async () => {
    const skillPaths = await discoverSkills(SKILLS_DIR);
    skills = [];

    for (const skillPath of skillPaths) {
      const skillMdPath = join(skillPath, "SKILL.md");
      const fileContent = await readFile(skillMdPath, "utf-8");
      const parsed = matter(fileContent);
      skills.push({
        name: basename(skillPath),
        path: skillPath,
        data: parsed.data as Record<string, unknown>,
        content: parsed.content,
      });
    }
  });

  test("all skills should have descriptions starting with 'Use when'", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateDescriptionFormat(skill.data.description);
      const startError = errors.find((e) => e.message.includes("start with"));
      if (startError) {
        failures.push(`${skill.name}: ${startError.message}`);
      }
    }

    expect(failures, `Description format failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all skill descriptions should be under 500 characters", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateDescriptionFormat(skill.data.description);
      const lengthError = errors.find((e) => e.message.includes("CSO compliance"));
      if (lengthError) {
        failures.push(`${skill.name}: ${lengthError.message}`);
      }
    }

    expect(failures, `Description length failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all skill descriptions should use third person voice", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateDescriptionFormat(skill.data.description);
      const voiceError = errors.find((e) => e.message.includes("third person"));
      if (voiceError) {
        failures.push(`${skill.name}: ${voiceError.message}`);
      }
    }

    expect(failures, `Third person voice failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all skills should have metadata.triggers with 3+ keywords", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateMetadataTriggers(skill.data.metadata);
      if (errors.length > 0) {
        failures.push(`${skill.name}: ${errors.map((e) => e.message).join(", ")}`);
      }
    }

    expect(failures, `Metadata triggers failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all skills should have a valid metadata.category", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateMetadataCategory(skill.data.metadata);
      if (errors.length > 0) {
        failures.push(`${skill.name}: ${errors.map((e) => e.message).join(", ")}`);
      }
    }

    expect(failures, `Metadata category failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all SKILL.md files should be under 500 lines", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateLineCount(skill.content);
      if (errors.length > 0) {
        failures.push(`${skill.name}: ${errors.map((e) => e.message).join(", ")}`);
      }
    }

    expect(failures, `Line count failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("no skills should use @ force-loading in cross-references", () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const errors = validateNoForceLoading(skill.content);
      if (errors.length > 0) {
        failures.push(`${skill.name}: ${errors.map((e) => e.message).join(", ")}`);
      }
    }

    expect(failures, `Force-loading failures:\n${failures.join("\n")}`).toHaveLength(0);
  });

  test("all supporting .md files should have frontmatter with description", async () => {
    const failures: string[] = [];

    for (const skill of skills) {
      const results: SupportingFileResult[] = await validateSupportingFiles(skill.path);
      for (const result of results) {
        if (result.errors.length > 0) {
          failures.push(
            `${skill.name}: ${result.errors.map((e) => e.message).join(", ")}`
          );
        }
      }
    }

    expect(failures, `Supporting file failures:\n${failures.join("\n")}`).toHaveLength(0);
  });
});

describe("Writing Skills Validator Unit Tests", () => {
  describe("validateDescriptionFormat", () => {
    test("accepts descriptions starting with 'Use when'", () => {
      expect(validateDescriptionFormat("Use when building frontend apps.")).toHaveLength(0);
      expect(validateDescriptionFormat("Use when writing TypeScript code.")).toHaveLength(0);
    });

    test("accepts case-insensitive 'use when'", () => {
      expect(validateDescriptionFormat("use when debugging errors.")).toHaveLength(0);
    });

    test("rejects descriptions not starting with 'Use when'", () => {
      const errors = validateDescriptionFormat("Analyzes code and finds bugs.");
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.message.includes("start with"))).toBe(true);
    });

    test("rejects descriptions over 500 characters", () => {
      const long = "Use when " + "a".repeat(500);
      const errors = validateDescriptionFormat(long);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.message.includes("CSO compliance"))).toBe(true);
    });

    test("accepts descriptions under 500 characters", () => {
      const errors = validateDescriptionFormat("Use when writing docs.");
      expect(errors.filter((e) => e.message.includes("CSO compliance"))).toHaveLength(0);
    });

    test("rejects first-person descriptions starting with 'I'", () => {
      const errors = validateDescriptionFormat("I can help you with tests.");
      expect(errors.some((e) => e.message.includes("third person"))).toBe(true);
    });

    test("rejects second-person descriptions starting with 'You'", () => {
      const errors = validateDescriptionFormat("You can use this for testing.");
      expect(errors.some((e) => e.message.includes("third person"))).toBe(true);
    });

    test("skips validation for non-string descriptions", () => {
      expect(validateDescriptionFormat(undefined)).toHaveLength(0);
      expect(validateDescriptionFormat("")).toHaveLength(0);
    });
  });

  describe("validateMetadataTriggers", () => {
    test("accepts triggers with 3+ keywords", () => {
      expect(
        validateMetadataTriggers({ triggers: "code, tests, refactor" })
      ).toHaveLength(0);
      expect(
        validateMetadataTriggers({ triggers: "frontend, UI, colors, brand" })
      ).toHaveLength(0);
    });

    test("rejects missing metadata", () => {
      const errors = validateMetadataTriggers(undefined);
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects metadata without triggers", () => {
      const errors = validateMetadataTriggers({ category: "technique" });
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects triggers with fewer than 3 keywords", () => {
      const errors = validateMetadataTriggers({ triggers: "code, tests" });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("at least 3");
    });

    test("rejects empty triggers string", () => {
      const errors = validateMetadataTriggers({ triggers: "" });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe("validateMetadataCategory", () => {
    test("accepts valid categories", () => {
      expect(validateMetadataCategory({ category: "technique" })).toHaveLength(0);
      expect(validateMetadataCategory({ category: "reference" })).toHaveLength(0);
      expect(validateMetadataCategory({ category: "discipline" })).toHaveLength(0);
      expect(validateMetadataCategory({ category: "pattern" })).toHaveLength(0);
    });

    test("rejects invalid categories", () => {
      const errors = validateMetadataCategory({ category: "tutorial" });
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("must be one of");
    });

    test("rejects missing metadata", () => {
      const errors = validateMetadataCategory(undefined);
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects metadata without category", () => {
      const errors = validateMetadataCategory({ triggers: "a, b, c" });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe("validateLineCount", () => {
    test("accepts content under 500 lines", () => {
      const content = Array(499).fill("line").join("\n");
      expect(validateLineCount(content)).toHaveLength(0);
    });

    test("rejects content over 500 lines", () => {
      const content = Array(501).fill("line").join("\n");
      const errors = validateLineCount(content);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("under 500 lines");
    });
  });

  describe("validateNoForceLoading", () => {
    test("accepts content without @ references", () => {
      const content = "See [my reference](references/foo.md) for details.";
      expect(validateNoForceLoading(content)).toHaveLength(0);
    });

    test("rejects @ force-load references", () => {
      const content = "Load @skills/testing/SKILL.md for context.";
      const errors = validateNoForceLoading(content);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("force-load");
    });

    test("allows @ references inside code blocks", () => {
      const content = "Some text\n```\n@skills/testing/SKILL.md\n```\nMore text";
      expect(validateNoForceLoading(content)).toHaveLength(0);
    });

    test("accepts plain email-like @ signs", () => {
      const content = "Contact user@example.com for help.";
      expect(validateNoForceLoading(content)).toHaveLength(0);
    });
  });

  describe("validateNoDuplicateFrontmatter", () => {
    test("accepts a file with a single frontmatter block", () => {
      const content = [
        "---",
        "description: A valid file.",
        "---",
        "",
        "# Heading",
        "",
        "Body text.",
      ].join("\n");
      expect(validateNoDuplicateFrontmatter(content)).toHaveLength(0);
    });

    test("accepts a file with no frontmatter", () => {
      const content = "# Heading\n\nBody text.\n";
      expect(validateNoDuplicateFrontmatter(content)).toHaveLength(0);
    });

    test("rejects a file with two stacked frontmatter blocks", () => {
      const content = [
        "---",
        "description: First block.",
        "---",
        "",
        "---",
        "",
        "description: Second block.",
        "",
        "---",
        "",
        "# Heading",
      ].join("\n");
      const errors = validateNoDuplicateFrontmatter(content);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("duplicate frontmatter");
    });

    test("rejects a file with two stacked frontmatter blocks and no blank line between", () => {
      const content = [
        "---",
        "description: First block.",
        "---",
        "---",
        "description: Second block.",
        "---",
        "",
        "# Heading",
      ].join("\n");
      const errors = validateNoDuplicateFrontmatter(content);
      expect(errors.length).toBeGreaterThan(0);
    });

    test("accepts a horizontal rule `---` later in the body", () => {
      const content = [
        "---",
        "description: Valid.",
        "---",
        "",
        "# Heading",
        "",
        "Some intro text.",
        "",
        "---",
        "",
        "More text after a horizontal rule.",
      ].join("\n");
      expect(validateNoDuplicateFrontmatter(content)).toHaveLength(0);
    });
  });

  describe("validateSupportingFiles", () => {
    async function withTempSkill(
      files: Record<string, string>,
      fn: (dir: string) => Promise<void>
    ) {
      const dir = await mkdtemp(join(tmpdir(), "skill-test-"));
      try {
        for (const [filePath, content] of Object.entries(files)) {
          const fullPath = join(dir, filePath);
          await mkdir(join(fullPath, ".."), { recursive: true });
          await writeFile(fullPath, content);
        }
        await fn(dir);
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    }

    test("accepts supporting files with valid frontmatter", async () => {
      await withTempSkill(
        {
          "SKILL.md": "---\nname: test\n---\n# Test",
          "references/README.md":
            "---\ndescription: A supporting file.\nmetadata:\n  tags: [test]\n---\n# Ref",
        },
        async (dir) => {
          const results = await validateSupportingFiles(dir);
          const errors = results.flatMap((r) => r.errors);
          expect(errors).toHaveLength(0);
        }
      );
    });

    test("rejects supporting files without frontmatter", async () => {
      await withTempSkill(
        {
          "SKILL.md": "---\nname: test\n---\n# Test",
          "references/README.md": "# No frontmatter here",
        },
        async (dir) => {
          const results = await validateSupportingFiles(dir);
          const errors = results.flatMap((r) => r.errors);
          expect(errors.length).toBeGreaterThan(0);
        }
      );
    });

    test("rejects supporting files with frontmatter but no description", async () => {
      await withTempSkill(
        {
          "SKILL.md": "---\nname: test\n---\n# Test",
          "references/README.md":
            "---\nmetadata:\n  tags: [test]\n---\n# Missing description",
        },
        async (dir) => {
          const results = await validateSupportingFiles(dir);
          const errors = results.flatMap((r) => r.errors);
          expect(errors.length).toBeGreaterThan(0);
          expect(errors[0].message).toContain("description");
        }
      );
    });

    test("skips SKILL.md itself", async () => {
      await withTempSkill(
        {
          "SKILL.md": "# No frontmatter in SKILL.md is checked elsewhere",
        },
        async (dir) => {
          const results = await validateSupportingFiles(dir);
          expect(results).toHaveLength(0);
        }
      );
    });
  });
});
