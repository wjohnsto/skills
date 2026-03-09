import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { join, basename, resolve } from "node:path";

export interface SkillInfo {
  name: string;
  path: string;
}

export async function discoverSkills(skillsDir: string): Promise<SkillInfo[]> {
  const entries = await readdir(resolve(skillsDir), { withFileTypes: true });
  const skills: SkillInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
    skills.push({ name: entry.name, path: resolve(skillsDir, entry.name) });
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

export async function skillExistsInRepo(
  skillName: string,
  repoDir: string,
): Promise<boolean> {
  try {
    const s = await stat(resolve(repoDir, ".agents", "skills", skillName));
    return s.isDirectory();
  } catch {
    return false;
  }
}

export async function copySkillToRepo(
  skillDir: string,
  repoDir: string,
): Promise<void> {
  const skillName = basename(resolve(skillDir));
  const targetDir = resolve(repoDir, ".agents", "skills", skillName);
  await copyDirRecursive(skillDir, targetDir);
}

async function copyDirRecursive(src: string, dest: string): Promise<void> {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirRecursive(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}
