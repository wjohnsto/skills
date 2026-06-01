import { describe, test, expect, beforeAll } from "vitest";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  validateAllSkills,
  validateSkill,
  discoverSkills,
  validateName,
  validateDescription,
  type SkillValidationResult,
} from "../src/validator";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = join(__dirname, "../../../skills");

describe("Agent Skills Validation", () => {
  let skillPaths: string[];
  let validationResults: Map<string, SkillValidationResult>;

  beforeAll(async () => {
    skillPaths = await discoverSkills(SKILLS_DIR);
    validationResults = new Map();

    for (const skillPath of skillPaths) {
      const result = await validateSkill(skillPath);
      validationResults.set(result.skillName, result);
    }
  });

  test("skills directory should exist and be scannable", () => {
    expect(skillPaths).toBeDefined();
    expect(Array.isArray(skillPaths)).toBe(true);
    if (skillPaths.length === 0) {
      console.log("Note: No skills found (directories starting with _ are skipped as templates)");
    }
  });

  test("all skills should have a SKILL.md file", () => {
    for (const [skillName, result] of validationResults) {
      const skillMdError = result.errors.find((e) => e.field === "SKILL.md");
      expect(skillMdError, `${skillName}: missing SKILL.md`).toBeUndefined();
    }
  });

  test("all skills should have valid frontmatter", () => {
    for (const [skillName, result] of validationResults) {
      const frontmatterError = result.errors.find((e) => e.field === "frontmatter");
      expect(
        frontmatterError,
        `${skillName}: ${frontmatterError?.message}`
      ).toBeUndefined();
    }
  });

  test("all skills should have a valid name field", () => {
    for (const [skillName, result] of validationResults) {
      const nameErrors = result.errors.filter((e) => e.field === "name");
      expect(
        nameErrors,
        `${skillName}: ${nameErrors.map((e) => e.message).join(", ")}`
      ).toHaveLength(0);
    }
  });

  test("all skills should have a valid description field", () => {
    for (const [skillName, result] of validationResults) {
      const descErrors = result.errors.filter((e) => e.field === "description");
      expect(
        descErrors,
        `${skillName}: ${descErrors.map((e) => e.message).join(", ")}`
      ).toHaveLength(0);
    }
  });

  test("all skills should pass full validation", () => {
    const failures: string[] = [];

    for (const [skillName, result] of validationResults) {
      if (!result.valid) {
        const errorMessages = result.errors
          .map((e) => `  - ${e.field}: ${e.message}`)
          .join("\n");
        failures.push(`${skillName}:\n${errorMessages}`);
      }
    }

    expect(failures, `Validation failures:\n${failures.join("\n\n")}`).toHaveLength(0);
  });
});

describe("Validator Unit Tests", () => {
  describe("validateName", () => {
    test("valid names pass", () => {
      expect(validateName("redis-brand", "redis-brand")).toHaveLength(0);
      expect(validateName("coding-standards", "coding-standards")).toHaveLength(0);
      expect(validateName("demo123", "demo123")).toHaveLength(0);
      expect(validateName("a", "a")).toHaveLength(0);
    });

    test("rejects uppercase", () => {
      const errors = validateName("Redis-Brand", "Redis-Brand");
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("lowercase");
    });

    test("rejects consecutive hyphens", () => {
      const errors = validateName("redis--brand", "redis--brand");
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e: { message: string }) => e.message.includes("consecutive"))).toBe(true);
    });

    test("rejects leading hyphen", () => {
      const errors = validateName("-redis", "-redis");
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects trailing hyphen", () => {
      const errors = validateName("redis-", "redis-");
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects name not matching directory", () => {
      const errors = validateName("redis-brand", "different-name");
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e: { message: string }) => e.message.includes("match directory"))).toBe(true);
    });

    test("rejects names over 64 characters", () => {
      const longName = "a".repeat(65);
      const errors = validateName(longName, longName);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e: { message: string }) => e.message.includes("64 characters"))).toBe(true);
    });
  });

  describe("validateDescription", () => {
    test("valid descriptions pass", () => {
      expect(validateDescription("A valid description")).toHaveLength(0);
      expect(validateDescription("Short")).toHaveLength(0);
    });

    test("rejects empty description", () => {
      const errors = validateDescription("");
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects missing description", () => {
      const errors = validateDescription(undefined);
      expect(errors.length).toBeGreaterThan(0);
    });

    test("rejects descriptions over 1024 characters", () => {
      const longDesc = "a".repeat(1025);
      const errors = validateDescription(longDesc);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain("1024 characters");
    });
  });
});
