---
description: >-
    ASD-STE100 Simplified Technical English rules, adapted for software docs,
    READMEs, tutorials, and code comments.
metadata:
    tags: [ste, asd-ste100, simplified-technical-english, docs, technical-writing]
---

# ASD-STE100 rules for technical content

ASD-STE100 (Simplified Technical English, or STE) is a controlled language. It
has writing rules and a dictionary of approved words. Use these rules for all
technical content.

This file is a summary. It does not replace the official specification. For the
full dictionary, get the specification from the ASD-STE100 website
(https://www.asd-ste100.org).

## 1. Words

### Use approved words with one meaning

- Use one word for one meaning. Use one meaning for one word.
- Use the approved part of speech. For example, "test" is a noun in STE. Write
  "do a test of the connection", not "test the connection", unless "test" is a
  technical verb in your domain.
- Use the simplest common word.

| Do not use | Use |
|------------|-----|
| utilize, leverage | use |
| commence, initiate | start |
| terminate | stop |
| ensure, verify | make sure |
| assist, facilitate | help |
| allow, enable | let |
| prior to | before |
| subsequent to | after |
| in order to | to |
| approximately | about |
| sufficient | enough |
| numerous | many |
| obtain, retrieve (in prose) | get |
| may (for possibility) | can |
| please | (delete) |

### Technical names and technical verbs

- You can use technical names. Technical names include product names, API
  names, file names, commands, UI labels, and code identifiers.
- You can use technical verbs for computer processes. Examples: install,
  configure, deploy, compile, cache, query, index.
- Use the same technical name for the same thing every time. Do not change
  "cluster" to "deployment" to "instance" for variety.
- Do not use a technical name as a verb. Write "add an index", not "index the
  field", unless "index" is a technical verb in your domain.

### Do not use

- Slang, idioms, or figurative language ("out of the box", "under the hood",
  "a breeze", "spin up").
- Analogies and metaphors.
- Contractions ("don't", "it's", "you'll"). Write "do not", "it is", "you will".
- Unnecessary abbreviations ("docs", "devs", "apps", "config"). Write the full
  word.
- Acronyms that you do not define. Define each acronym at its first use, for
  example "time to live (TTL)". You can use well-known acronyms, such as API,
  URL, and JSON, without a definition.

## 2. Noun clusters

- Do not use more than three nouns in a cluster.
- Break long clusters with a preposition or a relative clause.

| Do not use | Use |
|------------|-----|
| cache key expiration policy configuration | the configuration for the expiration policy of cache keys |
| user session token refresh endpoint | the endpoint that refreshes the session token |

## 3. Verbs

- Use only these tenses:
    - Simple present: "The server stores the data."
    - Simple past: "The server stored the data."
    - Simple future: "The server will store the data."
- Do not use progressive tenses ("is running", "was storing").
- Do not use perfect tenses ("has stored", "had stored").
- Use the past participle only as an adjective ("the stored data") or in the
  passive voice in descriptive text.
- Do not use the "-ing" form, except in a technical name ("load balancing",
  "connection pooling").
- Use the active voice in procedures. Use the active voice in descriptive text
  as much as possible.

| Do not use | Use |
|------------|-----|
| The data is being written to disk. | The server writes the data to disk. |
| The key has been deleted. | The key is deleted. / The command deleted the key. |
| Running the script creates a file. | When you run the script, it creates a file. |
| The file is read by the parser. | The parser reads the file. |

## 4. Sentences

- Write about one topic in each sentence.
- Use a maximum of 20 words in a procedural sentence.
- Use a maximum of 25 words in a descriptive sentence.
- Do not delete words to make sentences shorter. Keep articles ("a", "an",
  "the") and other small words.
- Use a vertical list to make complex text easier to read.
- Use connection words to join sentences ("then", "but", "because", "if").

## 5. Procedures

- Write instructions in the imperative (command) form. "Run the command." Not
  "You should run the command."
- Write one instruction in each sentence. You can write two actions in one
  sentence only if the reader must do them at the same time.
- Put the condition first. "If the build fails, examine the log." Not "Examine
  the log if the build fails."
- Use numbered steps for sequences.
- Use notes only to give information. Do not put instructions in notes.

## 6. Descriptive writing

- Put the most important information first in each paragraph.
- Write about one topic in each paragraph.
- Use a maximum of six sentences in each paragraph.
- Use headings and lists to show the structure of the text.

## 7. Warnings and cautions

- Start a warning or caution with a short, clear command.
- Then tell the reader the risk.
- Give specific information. Do not use general words such as "be careful".

_Example:_

> **Warning:** Do not run `FLUSHALL` on a production database. This command
> deletes all keys in all databases. You cannot recover the data.

## 8. Punctuation

- Do not use semicolons. Write two sentences.
- Use a colon only to introduce a vertical list or an example.
- Do not use em-dashes for asides or emphasis. Write a separate sentence.
- Use parentheses only to:
    - Define an acronym.
    - Refer to a section, figure, or table.
    - Show a value or a unit, for example "(default: 30 seconds)".
- Use hyphens to join words in a compound modifier ("read-only replica").
- Do not use exclamation marks.

## 9. Code comments

Code comments are technical content. Apply all STE rules.

- Write comments as short, complete sentences.
- Use the present tense to tell what the code does: "Returns the cached value."
- Use the imperative form for instructions: "Call `close()` before you exit."
- Tell why the code does something when the reason is not clear.

| Do not use | Use |
|------------|-----|
| `// Basically we're gonna grab the user here` | `// Get the user from the cache.` |
| `// This is utilized to ensure the lock is released` | `// Make sure that the lock is released.` |

## Quick self-check

Before you finish technical content, do these checks:

1. Find each sentence with more than 20 words (procedures) or 25 words
   (descriptions). Make it shorter or make two sentences.
2. Find "-ing" words. Change them, unless they are part of a technical name.
3. Find "has", "have", "had", "is being", and "was being". Change them to a
   simple tense.
4. Find contractions, slang, idioms, and unnecessary abbreviations. Replace them.
5. Find semicolons and em-dashes. Make separate sentences.
6. Make sure that each procedure step has one instruction in the imperative form.
7. Make sure that each term has the same name every time.
