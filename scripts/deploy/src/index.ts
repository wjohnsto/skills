import { readFile, writeFile, appendFile, access } from "node:fs/promises";
import { resolve, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkbox, input, confirm } from "@inquirer/prompts";
import { findGitRepos } from "./find-repos";
import {
  discoverSkills,
  skillExistsInRepo,
  copySkillToRepo,
} from "./copy-skills";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(dirname(__dirname), "..", "..");
const SKILLS_DIR = resolve(PROJECT_ROOT, "skills");
const ENV_FILE = resolve(PROJECT_ROOT, ".env");

async function loadEnv(): Promise<Record<string, string>> {
  const env: Record<string, string> = {};
  try {
    const contents = await readFile(ENV_FILE, "utf-8");
    for (const line of contents.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      env[key] = value;
    }
  } catch {
    // .env doesn't exist yet
  }
  return env;
}

async function saveSkillsRoot(root: string): Promise<void> {
  try {
    await access(ENV_FILE);
    const contents = await readFile(ENV_FILE, "utf-8");
    if (contents.includes("SKILLS_ROOT=")) {
      const updated = contents.replace(/^SKILLS_ROOT=.*$/m, `SKILLS_ROOT=${root}`);
      await writeFile(ENV_FILE, updated);
    } else {
      await appendFile(ENV_FILE, `\nSKILLS_ROOT=${root}\n`);
    }
  } catch {
    await writeFile(ENV_FILE, `SKILLS_ROOT=${root}\n`);
  }
}

async function main() {
  console.log("\n🔧 Skills Deploy CLI\n");

  const env = await loadEnv();
  let skillsRoot = env.SKILLS_ROOT;

  if (!skillsRoot) {
    skillsRoot = await input({
      message: "Enter the root folder to search for git repositories:",
      validate: (val) => (val.trim().length > 0 ? true : "Path is required"),
    });
    skillsRoot = resolve(skillsRoot.replace(/^~/, process.env.HOME || "~"));
    await saveSkillsRoot(skillsRoot);
    console.log(`  Saved SKILLS_ROOT=${skillsRoot} to .env\n`);
  } else {
    skillsRoot = resolve(skillsRoot.replace(/^~/, process.env.HOME || "~"));
    console.log(`  Using SKILLS_ROOT=${skillsRoot} (from .env)\n`);
  }

  // Discover skills
  const skills = await discoverSkills(SKILLS_DIR);
  if (skills.length === 0) {
    console.log("No skills found in skills/ directory.");
    process.exit(1);
  }

  const selectedSkills = await checkbox({
    message: "Select skills to deploy:",
    choices: skills.map((s) => ({ name: s.name, value: s, checked: true })),
  });

  if (selectedSkills.length === 0) {
    console.log("No skills selected. Exiting.");
    process.exit(0);
  }

  // Discover repos
  console.log(`\n  Searching for git repos under ${skillsRoot} ...`);
  const repos = await findGitRepos(skillsRoot, { excludeDirs: [PROJECT_ROOT] });
  if (repos.length === 0) {
    console.log("No git repositories found. Exiting.");
    process.exit(1);
  }
  console.log(`  Found ${repos.length} repositories.\n`);

  const selectedRepos = await checkbox({
    message: "Select target repositories:",
    choices: repos.map((r) => ({
      name: relative(skillsRoot!, r) || r,
      value: r,
    })),
  });

  if (selectedRepos.length === 0) {
    console.log("No repositories selected. Exiting.");
    process.exit(0);
  }

  // Dry run: show what will happen
  console.log("\n── Deploy Plan ──────────────────────────────────────\n");

  interface Action {
    repo: string;
    skill: string;
    skillPath: string;
    overwrites: boolean;
  }

  const actions: Action[] = [];

  for (const repo of selectedRepos) {
    const repoLabel = relative(skillsRoot, repo) || repo;
    console.log(`  ${repoLabel}/`);

    for (const skill of selectedSkills) {
      const exists = await skillExistsInRepo(skill.name, repo);
      const tag = exists ? " (overwrite)" : " (new)";
      console.log(`    └─ .agents/skills/${skill.name}/${tag}`);
      actions.push({
        repo,
        skill: skill.name,
        skillPath: skill.path,
        overwrites: exists,
      });
    }
    console.log();
  }

  const overwriteCount = actions.filter((a) => a.overwrites).length;
  const newCount = actions.length - overwriteCount;
  console.log(
    `  Total: ${actions.length} skill(s) → ${selectedRepos.length} repo(s)  |  ${newCount} new, ${overwriteCount} overwrite(s)`,
  );
  console.log("─────────────────────────────────────────────────────\n");

  const proceed = await confirm({
    message: "Proceed with deployment?",
    default: true,
  });

  if (!proceed) {
    console.log("Aborted.");
    process.exit(0);
  }

  // Copy skills
  console.log();
  for (const action of actions) {
    const repoLabel = relative(skillsRoot, action.repo) || action.repo;
    process.stdout.write(`  Copying ${action.skill} → ${repoLabel} ...`);
    await copySkillToRepo(action.skillPath, action.repo);
    console.log(" done");
  }

  console.log(`\n  Deployed ${actions.length} skill(s) successfully.\n`);
}

main().catch((err) => {
  if (err.name === "ExitPromptError") {
    console.log("\nAborted.");
    process.exit(0);
  }
  console.error(err);
  process.exit(1);
});
