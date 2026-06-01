import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { findGitRepos } from "../src/find-repos";

let tempDir: string;

beforeAll(async () => {
  tempDir = await mkdtemp(join(tmpdir(), "deploy-test-"));

  // repo-a (depth 1)
  await mkdir(join(tempDir, "repo-a", ".git"), { recursive: true });

  // org/repo-b (depth 2)
  await mkdir(join(tempDir, "org", "repo-b", ".git"), { recursive: true });

  // deep/nested/repo-c (depth 3)
  await mkdir(join(tempDir, "deep", "nested", "repo-c", ".git"), {
    recursive: true,
  });

  // too-deep/a/b/c/repo-d (depth 4 — beyond default limit)
  await mkdir(join(tempDir, "too-deep", "a", "b", "c", "repo-d", ".git"), {
    recursive: true,
  });

  // node_modules/repo-skip — should be skipped
  await mkdir(join(tempDir, "node_modules", "repo-skip", ".git"), {
    recursive: true,
  });

  // plain-dir with no .git — not a repo
  await mkdir(join(tempDir, "plain-dir"), { recursive: true });
  await writeFile(join(tempDir, "plain-dir", "file.txt"), "hello");
});

afterAll(async () => {
  await rm(tempDir, { recursive: true, force: true });
});

describe("findGitRepos", () => {
  test("finds repos within default depth (3)", async () => {
    const repos = await findGitRepos(tempDir);
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).toContain("repo-a");
    expect(names).toContain("org/repo-b");
    expect(names).toContain("deep/nested/repo-c");
  });

  test("does not find repos beyond maxDepth", async () => {
    const repos = await findGitRepos(tempDir);
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).not.toContain("too-deep/a/b/c/repo-d");
  });

  test("skips node_modules directories", async () => {
    const repos = await findGitRepos(tempDir);
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).not.toContain("node_modules/repo-skip");
  });

  test("does not include plain directories without .git", async () => {
    const repos = await findGitRepos(tempDir);
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).not.toContain("plain-dir");
  });

  test("returns sorted results", async () => {
    const repos = await findGitRepos(tempDir);
    const sorted = [...repos].sort();
    expect(repos).toEqual(sorted);
  });

  test("respects custom maxDepth", async () => {
    const repos = await findGitRepos(tempDir, { maxDepth: 5 });
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).toContain("too-deep/a/b/c/repo-d");
  });

  test("excludes directories in excludeDirs", async () => {
    const excluded = join(tempDir, "repo-a");
    const repos = await findGitRepos(tempDir, { excludeDirs: [excluded] });
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).not.toContain("repo-a");
    expect(names).toContain("org/repo-b");
  });

  test("does not recurse into sub-repos", async () => {
    // Create a repo with a nested repo inside
    const outerRepo = join(tempDir, "outer");
    await mkdir(join(outerRepo, ".git"), { recursive: true });
    await mkdir(join(outerRepo, "inner", ".git"), { recursive: true });

    const repos = await findGitRepos(tempDir);
    const names = repos.map((r) => r.replace(tempDir + "/", ""));

    expect(names).toContain("outer");
    expect(names).not.toContain("outer/inner");
  });

  test("handles non-existent root gracefully", async () => {
    const repos = await findGitRepos("/tmp/does-not-exist-xyz-123");
    expect(repos).toEqual([]);
  });
});
