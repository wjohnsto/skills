import { readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "vendor",
  "dist",
  "build",
  ".cache",
  "__pycache__",
  ".next",
  ".nuxt",
  "target",
  "venv",
  ".venv",
  ".agents",
  ".cursor",
  ".opencode",
  ".claude"
]);

export interface FindGitReposOptions {
  maxDepth?: number;
  excludeDirs?: string[];
}

export async function findGitRepos(
  root: string,
  options: FindGitReposOptions = {},
): Promise<string[]> {
  const { maxDepth = 3, excludeDirs = [] } = options;
  const resolvedExcludes = new Set(excludeDirs.map((d) => resolve(d)));
  const repos: string[] = [];
  await walk(resolve(root), 0, maxDepth, resolvedExcludes, repos);
  repos.sort();
  return repos;
}

async function walk(
  dir: string,
  depth: number,
  maxDepth: number,
  excludeDirs: Set<string>,
  repos: string[],
): Promise<void> {
  if (depth > maxDepth) return;
  if (excludeDirs.has(dir)) return;

  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const hasGitDir = entries.some(
    (e) => e.isDirectory() && e.name === ".git",
  );

  if (hasGitDir) {
    repos.push(dir);
    return;
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
    await walk(join(dir, entry.name), depth + 1, maxDepth, excludeDirs, repos);
  }
}
