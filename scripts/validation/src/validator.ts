import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename, relative } from "node:path";
import matter from "gray-matter";

export interface SkillFrontmatter {
  name: string;
  description: string;
  license?: string;
  compatibility?: string;
  metadata?: Record<string, string>;
  "allowed-tools"?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SkillValidationResult {
  skillPath: string;
  skillName: string;
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

const NAME_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_NAME_LENGTH = 64;
const MAX_DESCRIPTION_LENGTH = 1024;
const MAX_COMPATIBILITY_LENGTH = 500;
const MAX_DESCRIPTION_CSO_LENGTH = 500;
const MAX_SKILL_LINES = 500;
const VALID_CATEGORIES = ["technique", "reference", "discipline", "pattern"];
const FORCE_LOAD_PATTERN = /@(?:skills\/|\.\/|\.\.\/|\w+\/)\S+\.md/;

export function validateName(
  name: unknown,
  directoryName: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof name !== "string" || name.length === 0) {
    errors.push({ field: "name", message: "name is required and must be a non-empty string" });
    return errors;
  }

  if (name.length > MAX_NAME_LENGTH) {
    errors.push({ field: "name", message: `name must be at most ${MAX_NAME_LENGTH} characters` });
  }

  if (!NAME_REGEX.test(name)) {
    errors.push({
      field: "name",
      message: "name must contain only lowercase letters, numbers, and single hyphens (not at start/end)",
    });
  }

  if (name.includes("--")) {
    errors.push({ field: "name", message: "name must not contain consecutive hyphens" });
  }

  if (name !== directoryName) {
    errors.push({
      field: "name",
      message: `name "${name}" must match directory name "${directoryName}"`,
    });
  }

  return errors;
}

export function validateDescription(description: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof description !== "string" || description.length === 0) {
    errors.push({
      field: "description",
      message: "description is required and must be a non-empty string",
    });
    return errors;
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push({
      field: "description",
      message: `description must be at most ${MAX_DESCRIPTION_LENGTH} characters`,
    });
  }

  return errors;
}

export function validateCompatibility(compatibility: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (compatibility === undefined) {
    return errors;
  }

  if (typeof compatibility !== "string") {
    errors.push({
      field: "compatibility",
      message: "compatibility must be a string if provided",
    });
    return errors;
  }

  if (compatibility.length > MAX_COMPATIBILITY_LENGTH) {
    errors.push({
      field: "compatibility",
      message: `compatibility must be at most ${MAX_COMPATIBILITY_LENGTH} characters`,
    });
  }

  return errors;
}

export function validateMetadata(metadata: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (metadata === undefined) {
    return errors;
  }

  if (typeof metadata !== "object" || metadata === null || Array.isArray(metadata)) {
    errors.push({
      field: "metadata",
      message: "metadata must be an object if provided",
    });
    return errors;
  }

  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value !== "string") {
      errors.push({
        field: `metadata.${key}`,
        message: `metadata values must be strings, got ${typeof value}`,
      });
    }
  }

  return errors;
}

export function validateFrontmatter(
  data: Record<string, unknown>,
  directoryName: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  errors.push(...validateName(data.name, directoryName));
  errors.push(...validateDescription(data.description));
  errors.push(...validateCompatibility(data.compatibility));
  errors.push(...validateMetadata(data.metadata));

  return errors;
}

// --- Writing-skills compliance validators ---

export function validateDescriptionFormat(description: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (typeof description !== "string" || description.length === 0) {
    return errors;
  }

  const trimmed = description.trim();

  if (!trimmed.toLowerCase().startsWith("use when")) {
    errors.push({
      field: "description",
      message: `description must start with "Use when" (got: "${trimmed.slice(0, 40)}...")`,
    });
  }

  if (trimmed.length > MAX_DESCRIPTION_CSO_LENGTH) {
    errors.push({
      field: "description",
      message: `description must be at most ${MAX_DESCRIPTION_CSO_LENGTH} characters for CSO compliance (got ${trimmed.length})`,
    });
  }

  if (/^(I |I ')/.test(trimmed)) {
    errors.push({
      field: "description",
      message: "description must use third person voice (must not start with \"I\")",
    });
  }

  if (/^(You |You')/.test(trimmed)) {
    errors.push({
      field: "description",
      message: "description must use third person voice (must not start with \"You\")",
    });
  }

  return errors;
}

export function validateMetadataTriggers(
  metadata: unknown
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (metadata === undefined || metadata === null || typeof metadata !== "object") {
    errors.push({
      field: "metadata.triggers",
      message: "metadata.triggers is required (must have 3+ keywords)",
    });
    return errors;
  }

  const meta = metadata as Record<string, unknown>;

  if (!("triggers" in meta) || typeof meta.triggers !== "string" || meta.triggers.trim().length === 0) {
    errors.push({
      field: "metadata.triggers",
      message: "metadata.triggers is required and must be a non-empty string",
    });
    return errors;
  }

  const keywords = meta.triggers
    .split(",")
    .map((k: string) => k.trim())
    .filter((k: string) => k.length > 0);

  if (keywords.length < 3) {
    errors.push({
      field: "metadata.triggers",
      message: `metadata.triggers must have at least 3 keywords (got ${keywords.length})`,
    });
  }

  return errors;
}

export function validateMetadataCategory(
  metadata: unknown
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (metadata === undefined || metadata === null || typeof metadata !== "object") {
    errors.push({
      field: "metadata.category",
      message: "metadata.category is required",
    });
    return errors;
  }

  const meta = metadata as Record<string, unknown>;

  if (!("category" in meta) || typeof meta.category !== "string" || meta.category.trim().length === 0) {
    errors.push({
      field: "metadata.category",
      message: "metadata.category is required and must be a non-empty string",
    });
    return errors;
  }

  if (!VALID_CATEGORIES.includes(meta.category)) {
    errors.push({
      field: "metadata.category",
      message: `metadata.category must be one of: ${VALID_CATEGORIES.join(", ")} (got "${meta.category}")`,
    });
  }

  return errors;
}

export function validateLineCount(content: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lineCount = content.split("\n").length;

  if (lineCount > MAX_SKILL_LINES) {
    errors.push({
      field: "lineCount",
      message: `SKILL.md must be under ${MAX_SKILL_LINES} lines (got ${lineCount}); move content to references/`,
    });
  }

  return errors;
}

export function validateNoForceLoading(content: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    if (FORCE_LOAD_PATTERN.test(lines[i])) {
      const inCodeBlock = isInsideCodeBlock(lines, i);
      if (!inCodeBlock) {
        errors.push({
          field: "forceLoading",
          message: `SKILL.md line ${i + 1} contains an @ force-load reference; use plain links instead`,
        });
      }
    }
  }

  return errors;
}

function isInsideCodeBlock(lines: string[], targetLine: number): boolean {
  let insideCode = false;
  for (let i = 0; i < targetLine; i++) {
    if (lines[i].trimStart().startsWith("```")) {
      insideCode = !insideCode;
    }
  }
  return insideCode;
}

export interface SupportingFileResult {
  filePath: string;
  errors: ValidationError[];
}

export async function validateSupportingFiles(
  skillPath: string
): Promise<SupportingFileResult[]> {
  const results: SupportingFileResult[] = [];
  const mdFiles = await findMarkdownFiles(skillPath);

  for (const filePath of mdFiles) {
    const fileName = basename(filePath);
    if (fileName === "SKILL.md") continue;

    const fileErrors: ValidationError[] = [];
    const content = await readFile(filePath, "utf-8");
    const relPath = relative(skillPath, filePath);

    let parsed: matter.GrayMatterFile<string>;
    try {
      parsed = matter(content);
    } catch {
      fileErrors.push({
        field: `supportingFile:${relPath}`,
        message: `Failed to parse frontmatter in ${relPath}`,
      });
      results.push({ filePath, errors: fileErrors });
      continue;
    }

    if (!parsed.data || Object.keys(parsed.data).length === 0) {
      fileErrors.push({
        field: `supportingFile:${relPath}`,
        message: `${relPath} must have YAML frontmatter`,
      });
    } else if (
      typeof parsed.data.description !== "string" ||
      parsed.data.description.trim().length === 0
    ) {
      fileErrors.push({
        field: `supportingFile:${relPath}`,
        message: `${relPath} must have a non-empty "description" field in frontmatter`,
      });
    }

    results.push({ filePath, errors: fileErrors });
  }

  return results;
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "assets" && entry.name !== "node_modules") {
      results.push(...(await findMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }

  return results;
}

export function checkBodyWarnings(content: string): string[] {
  const warnings: string[] = [];
  const lines = content.split("\n");

  if (lines.length > 500) {
    warnings.push(
      `SKILL.md body has ${lines.length} lines; consider moving content to references/ (recommended max: 500 lines)`
    );
  }

  return warnings;
}

export async function validateSkill(skillPath: string): Promise<SkillValidationResult> {
  const skillName = basename(skillPath);
  const result: SkillValidationResult = {
    skillPath,
    skillName,
    valid: true,
    errors: [],
    warnings: [],
  };

  const skillMdPath = join(skillPath, "SKILL.md");

  try {
    await stat(skillMdPath);
  } catch {
    result.valid = false;
    result.errors.push({
      field: "SKILL.md",
      message: "SKILL.md file is required but not found",
    });
    return result;
  }

  const fileContent = await readFile(skillMdPath, "utf-8");

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(fileContent);
  } catch (e) {
    result.valid = false;
    result.errors.push({
      field: "frontmatter",
      message: `Failed to parse YAML frontmatter: ${e instanceof Error ? e.message : String(e)}`,
    });
    return result;
  }

  if (!parsed.data || Object.keys(parsed.data).length === 0) {
    result.valid = false;
    result.errors.push({
      field: "frontmatter",
      message: "SKILL.md must contain YAML frontmatter",
    });
    return result;
  }

  const frontmatterErrors = validateFrontmatter(parsed.data, skillName);
  result.errors.push(...frontmatterErrors);

  result.warnings.push(...checkBodyWarnings(parsed.content));

  result.valid = result.errors.length === 0;

  return result;
}

export async function discoverSkills(skillsDir: string): Promise<string[]> {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith("_")) {
      skills.push(join(skillsDir, entry.name));
    }
  }

  return skills;
}

export async function validateAllSkills(skillsDir: string): Promise<SkillValidationResult[]> {
  const skillPaths = await discoverSkills(skillsDir);
  const results: SkillValidationResult[] = [];

  for (const skillPath of skillPaths) {
    const result = await validateSkill(skillPath);
    results.push(result);
  }

  return results;
}
