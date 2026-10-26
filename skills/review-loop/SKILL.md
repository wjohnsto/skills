---
name: review-loop
description: >-
  Use when the user asks for a "review loop".
license: MIT
metadata:
  author: wjohnsto
  version: "1.0"
  category: discipline
  triggers: review loop, code review, reviewer, approval
---

# Review loop

The goal of the review loop is to keep `main` at high quality.

## Roles

- **Owner:** You. You own the code changes.
- **Reviewer:** GPT-6.1 Sol with reasoning set to High. Sol owns the review.
  Run Sol as a subagent.

## Loop

1. Make the code changes.
2. Send the changes to Sol for review.
3. Read the findings. For each suggestion, decide to accept or reject it.
4. Apply the suggestions that you accept.
5. Send the changes to Sol again. Include the previous findings and your
   response to each finding.
6. Continue until Sol approves.

## Owner rules

- You make the final decision on each suggestion.
- Prevent scope creep. Reject suggestions that are not necessary for the
  change. Give the reason when you reject a suggestion.

## Reviewer rules

Tell Sol these rules in each review request:

- Review the changes to keep `main` at high quality.
- The owner makes the final decision on each suggestion.
- When you approve, reply with "Verdict: Approved."
