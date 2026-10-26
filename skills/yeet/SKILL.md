---
name: yeet
description: Use when the user mentions ‘yeet’
---

# Yeet

1. Start GPT-6 Luna as a subagent in the current checkout. Set the reasoning
   level to low.
2. Give the subagent the scope of the requested change and these instructions:
   - Examine the Git status and the diff.
   - Stage all files for the requested change. Do not stage unrelated changes or secrets.
   - Read the `writing-guide` skill.
   - Write one short commit subject in the imperative form. Obey the `writing-guide` skill. Do not write a body or trailers.
   - Commit only the requested change. Keep unrelated changes as they are.
   - Push the current branch. Do not use force.
   - If the scope is not clear or a command fails, stop and report the problem.
