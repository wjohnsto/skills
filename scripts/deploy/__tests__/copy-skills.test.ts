import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import {
  mkdtemp,
  mkdir,
  rm,
  writeFile,
  readFile,
  readdir,
  stat,
} from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  discoverSkills,
  skillExistsInRepo,
  copySkillToRepo,
} from "../src/copy-skills";

let tempDir: string;
let skillsDir: string;
let repoDir: string;

beforeAll(async () => {
  tempDir = await mkdtemp(join(tmpdir(), "deploy-copy-test-"));
  skillsDir = join(tempDir, "skills");
  repoDir = join(tempDir, "my-repo");

  // Create mock skills directory structure
  await mkdir(join(skillsDir, "alpha"), { recursive: true });
  await writeFile(join(skillsDir, "alpha", "SKILL.md"), "# Alpha skill");
  await writeFile(join(skillsDir, "alpha", "extra.txt"), "extra content");

  await mkdir(join(skillsDir, "beta", "rules"), { recursive: true });
  await writeFile(join(skillsDir, "beta", "SKILL.md"), "# Beta skill");
  await writeFile(
    join(skillsDir, "beta", "rules", "rule1.md"),
    "# Rule 1",
  );

  // _template should be excluded
  await mkdir(join(skillsDir, "_template"), { recursive: true });
  await writeFile(
    join(skillsDir, "_template", "SKILL.md"),
    "# Template",
  );

  // A file at the skills level (not a directory) should be ignored
  await writeFile(join(skillsDir, "README.md"), "# Skills");

  // Create mock repo
  await mkdir(join(repoDir, ".git"), { recursive: true });
});

afterAll(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

describe("discoverSkills", () => {
  test("finds skill directories", async () => {
    const skills = await discoverSkills(skillsDir);
    const names = skills.map((s) => s.name);

    expect(names).toContain("alpha");
    expect(names).toContain("beta");
  });

  test("excludes directories starting with underscore", async () => {
    const skills = await discoverSkills(skillsDir);
    const names = skills.map((s) => s.name);

    expect(names).not.toContain("_template");
  });

  test("excludes non-directory entries", async () => {
    const skills = await discoverSkills(skillsDir);
    const names = skills.map((s) => s.name);

    expect(names).not.toContain("README.md");
  });

  test("returns sorted results", async () => {
    const skills = await discoverSkills(skillsDir);
    const names = skills.map((s) => s.name);

    expect(names).toEqual([...names].sort());
  });

  test("includes correct paths", async () => {
    const skills = await discoverSkills(skillsDir);
    const alpha = skills.find((s) => s.name === "alpha");

    expect(alpha).toBeDefined();
    expect(alpha!.path).toBe(join(skillsDir, "alpha"));
  });
});

describe("skillExistsInRepo", () => {
  test("returns false when skill does not exist", async () => {
    const exists = await skillExistsInRepo("alpha", repoDir);
    expect(exists).toBe(false);
  });

  test("returns true when skill directory exists", async () => {
    await mkdir(join(repoDir, ".agents", "skills", "existing-skill"), {
      recursive: true,
    });

    const exists = await skillExistsInRepo("existing-skill", repoDir);
    expect(exists).toBe(true);
  });

  test("returns false for non-existent repo path", async () => {
    const exists = await skillExistsInRepo("alpha", "/tmp/no-such-repo");
    expect(exists).toBe(false);
  });
});

describe("copySkillToRepo", () => {
  test("copies a flat skill directory", async () => {
    const targetRepo = join(tempDir, "target-flat");
    await mkdir(join(targetRepo, ".git"), { recursive: true });

    await copySkillToRepo(join(skillsDir, "alpha"), targetRepo);

    const skillMd = await readFile(
      join(targetRepo, ".agents", "skills", "alpha", "SKILL.md"),
      "utf-8",
    );
    expect(skillMd).toBe("# Alpha skill");

    const extra = await readFile(
      join(targetRepo, ".agents", "skills", "alpha", "extra.txt"),
      "utf-8",
    );
    expect(extra).toBe("extra content");
  });

  test("copies a nested skill directory", async () => {
    const targetRepo = join(tempDir, "target-nested");
    await mkdir(join(targetRepo, ".git"), { recursive: true });

    await copySkillToRepo(join(skillsDir, "beta"), targetRepo);

    const skillMd = await readFile(
      join(targetRepo, ".agents", "skills", "beta", "SKILL.md"),
      "utf-8",
    );
    expect(skillMd).toBe("# Beta skill");

    const rule = await readFile(
      join(targetRepo, ".agents", "skills", "beta", "rules", "rule1.md"),
      "utf-8",
    );
    expect(rule).toBe("# Rule 1");
  });

  test("overwrites existing skill files", async () => {
    const targetRepo = join(tempDir, "target-overwrite");
    await mkdir(
      join(targetRepo, ".agents", "skills", "alpha"),
      { recursive: true },
    );
    await writeFile(
      join(targetRepo, ".agents", "skills", "alpha", "SKILL.md"),
      "# Old content",
    );

    await copySkillToRepo(join(skillsDir, "alpha"), targetRepo);

    const content = await readFile(
      join(targetRepo, ".agents", "skills", "alpha", "SKILL.md"),
      "utf-8",
    );
    expect(content).toBe("# Alpha skill");
  });

  test("creates .agents/skills/ directory if it does not exist", async () => {
    const targetRepo = join(tempDir, "target-create-dir");
    await mkdir(targetRepo, { recursive: true });

    await copySkillToRepo(join(skillsDir, "alpha"), targetRepo);

    const s = await stat(join(targetRepo, ".agents", "skills", "alpha"));
    expect(s.isDirectory()).toBe(true);
  });
});
