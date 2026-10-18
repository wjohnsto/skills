---
name: writing-guide
description: >-
  Use when writing or reviewing content, including docs, READMEs,
  tutorials, code comments, and blog posts.
license: See LICENSE in repository root
metadata:
  author: Will Johnston
  version: "2.0"
  category: discipline
  triggers: docs, README, tutorial, blog, writing, documentation, content, ASD-STE100, Simplified Technical English, code comments
---

# Writing guide

## When to use

- Write docs, READMEs, tutorials, code comments, or blog posts.
- Review content for tone, style, or format.
- Write user-facing text or technical content.

## Choose the rule set

Find the content type first. Then apply the correct rules.

| Content type | Rules |
|--------------|-------|
| Docs, READMEs, tutorials, API references, code comments, commit messages, error messages, UI text | ASD-STE100 (Simplified Technical English) + shared house style |
| Blog posts and marketing copy | Blog voice + shared house style |

If you are not sure, use ASD-STE100.

## Technical content: ASD-STE100

Use ASD-STE100 rules for all technical content. If a house style rule conflicts
with an STE rule, use the STE rule.

For the full rules, examples, and a self-check, see [asd-ste100](references/asd-ste100.md).

### Core rules

- **Words**: Use simple, approved words. Use one word for one meaning. Use the
  same technical name for the same thing every time.
- **No slang**: Do not use idioms, analogies, metaphors, or contractions.
- **No unnecessary abbreviations**: Write "documentation", not "docs". Define
  each acronym at its first use, for example "time to live (TTL)".
- **Noun clusters**: Do not use more than three nouns in a cluster.
- **Verbs**: Use the simple present, simple past, or simple future tense. Do not
  use "-ing" forms, except in technical names.
- **Voice**: Use the active voice in procedures. Use the active voice in
  descriptions as much as possible.
- **Sentence length**: Use a maximum of 20 words in procedural sentences. Use a
  maximum of 25 words in descriptive sentences.
- **One topic**: Write about one topic in each sentence. Use a maximum of six
  sentences in each paragraph.
- **Procedures**: Write instructions in the imperative form. Write one
  instruction in each step. Put the condition first ("If X, do Y").
- **Warnings**: Start with a clear command. Then tell the reader the risk.
- **Punctuation**: Do not use semicolons or em-dashes. Use a colon only before a
  list or an example.

### Examples

| Do not use | Use |
|------------|-----|
| Once you've spun up the cluster, you'll want to configure the docs site. | Start the cluster. Then configure the documentation site. |
| The config file is being read by the loader. | The loader reads the configuration file. |
| Utilize the CLI to ensure that the TTL is set. | Use the CLI to make sure that the time to live (TTL) is set. |
| Run the migration—it's quick—and you're done! | Run the migration. The migration takes about one minute. |
| You may want to restart the server if the cache isn't updating. | If the cache does not update, restart the server. |

## Blog posts: blog voice

Blog posts can use a more personal voice. Use STE sentence rules as a target,
but you can use the rules in this section.

### Keep things concise

Remove all unnecessary words and phrases. You can abbreviate common jargon, for
example docs, devs, apps, GenAI, and UX.

### Talk dev

Write like a developer for developers. Show that you know the problems and
stress that developers have. Do not write down to the reader.

### Make it about the reader

Tell the reader the emotional or functional benefit.

### Analogies and asides

You can use analogies to make an idea easy to relate to. You can use an em-dash
(—) without spaces for an aside or for emphasis.

_Example: The new release lets you ship more powerful, resilient products—fast._

## Shared house style

These rules apply to all content.

### Active voice

In the active voice, the subject of the sentence does the action.

_Active_: Adam drove the car.
_Passive_: The car was driven by Adam.

The words "was" and "by" frequently show the passive voice. Find them and
change the sentence.

### Ampersands

Do not use ampersands. You can use an ampersand only to save space in a
headline or subhead.

### Bulleted lists

- Use bulleted lists to break up long text and to group information.
- Start each bullet with a capital letter.
- Use a period at the end of a bullet that is a complete sentence. Do not use a
  period at the end of a sentence fragment.

### Calls to action (CTAs)

Each call to action (CTA) must tell the reader to do a specific action. Do not
use creative words or jargon.

_Use_: "Install the client library."
_Do not use_: "Click here" or "Learn more"

### Capitalization

Always use sentence case for headlines and subheads. Never Use Title Case Like This.

### Commas

Use the Oxford comma in a series.

_Example: The library supports caching, search, and session management._

### Hyphens

Use a hyphen (-) without spaces to join words into one modifier or to show a
range.

_first-time user_
_Monday-Friday_

### Dates and times

- Put a comma after the day of the week: _Friday, December 25_.
- Write am and pm in lowercase without periods. Put a space after the hour:
  _9 pm_.
- For times on the hour, do not write the minutes: _7 pm_, not _7:00 pm_.

### Headlines and subheads

Use sentence case without periods.

### Punctuation

Never use exclamation marks.

## Red flags: stop and fix

All content:

- Passive voice ("was created by", "is used by")
- Title Case In Headlines
- Exclamation marks
- No Oxford comma in a list
- Generic CTAs ("Click here", "Learn more")
- Times written as "A.M." or "PM" instead of lowercase "am" or "pm"

Technical content:

- Sentences with more than 20 words (procedures) or 25 words (descriptions)
- Abbreviations such as "docs", "devs", "apps", or "config"
- Contractions, idioms, analogies, or slang
- Progressive or perfect tenses ("is running", "has been deleted")
- "-ing" words that are not technical names
- Complex words ("utilize", "ensure", "prior to", "in order to")
- Semicolons or em-dashes
- Procedure steps with more than one instruction
- Different names for the same thing

**If you find one of these**: write the content again before you continue.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Use the blog voice in technical docs | Use ASD-STE100 for all technical content. |
| Abbreviate words in technical content | Write the full word. Define acronyms at first use. |
| Use different terms for the same thing "for variety" | Use one term for one thing every time. |
| Use the passive voice "for variety" | Use the active voice. |
| Put two or more instructions in one step | Write one instruction in each step. |
| Put the condition after the instruction | Put the condition first: "If X, do Y." |
| Write long sentences | Make two sentences. Obey the 20-word and 25-word limits. |
| Use Title Case in headlines | Use sentence case. |
| Use exclamation marks for emphasis | Use a short sentence. |
| Use ampersands in body text | Write "and". |
