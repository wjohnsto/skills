---
name: yeet
description: Use when the user mentions ‘yeet’
---

# Yeet

1. Run GPT-6 Luna as a subagent with low reasoning in the current checkout.
   Include the requested change scope and these instructions:
   - Inspect Git status and the diff.
   - Stage all files for the requested change. Exclude unrelated changes and secrets.
   - Read the `writing-guide` skill.
   - Write one short, imperative commit subject that follows `writing-guide`. Omit the body and trailers.
   - Commit only the requested change. Leave unrelated changes untouched.
   - Push the current branch without force.
   - If the scope is unclear or a command fails, stop and report it.
