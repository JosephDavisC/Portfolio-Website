---
name: ai-grounding-update
description: Write the handover note that tells Ask Joseph (ai.joechamdani.com) what changed on joechamdani.com. Run whenever a change to public site content, pages, routes, or facts would make the bot's grounding stale or wrong. Trigger - "update the AI", "tell Ask Joseph", "summary for my AI", or after adding a page, article, or correcting a fact.
---

# Updating Ask Joseph's grounding

The chat bot on joechamdani.com is a separate codebase with its own copy of the site's
data. It does NOT read this repo live. When the portfolio changes, someone has to tell
it, or it keeps answering from stale facts and linking to pages that moved.

This session does not edit that repo (see `ask-before-outside-edits`). It writes a
handover note; the Ask Joseph session applies it.

## Where the note goes

`../Joechamdani-AI/UPDATE-YYYY-MM-DD-<topic>.md`

One file per batch of changes. The Ask Joseph session deletes it once applied, so an
existing file means the work is still pending. If one is already there for the same
day, append to it instead of creating a second.

## When to write one

- A new page or route (the bot needs it for "take me there" answers)
- A new article, project, credential, or experience entry
- A FACT correction (a name, a date, an authorship, a metric)
- Content moving between pages, so old pointers go stale
- A URL that now 404s, so the bot stops offering it

Skip it for pure styling, layout, or chrome changes. If nothing a visitor could ASK
about changed, there is nothing to sync.

## What the note must contain

1. **Live vs pending.** State plainly which changes are deployed and which are only
   local. The bot must never cite a URL that is not public yet. Portfolio deploys
   first, the backend syncs after.
2. **What changed**, in facts not diffs. The other session cannot see this repo.
3. **The right destination URL** for each topic, especially when a better page now
   exists than the one the bot currently points at.
4. **What is now WRONG** if anything: dead URLs, superseded pointers, corrected facts.
   Say it explicitly so the old value gets removed, not just supplemented.
5. **Actions for that repo**, in order:
   - `npm run sync-data` when `src/data/*.json` changed (that is the sync source)
   - `src/media.ts` when there is a new link, image, or document the bot should be
     able to show. Paste a ready-to-use entry. Hosts must pass `LINK_HOSTS`
     (joechamdani.com/.cloud, medium, github, linkedin, youtube, instagram, devpost,
     x, drive.google, sector.co.id, dragondance.id). Article and experience media
     keys are auto-generated from the JSON, so say when no manual entry is needed.
   - `data/profile.md` for hand-written bio facts, which sync-data does NOT touch
   - rebuild, `npx tsc --noEmit`, then WAIT for Joseph's explicit approval to deploy
6. **A closing line**: no dashes in any copy, delete this file once applied.

## Hard rules

- Never edit the Joechamdani-AI repo from this session. Write the note only.
- Never tell the other session to deploy. Joseph approves every deploy himself.
- Sequence matters: portfolio deploy, then backend sync. Say so when the portfolio
  change is still local.
- No em dashes or en dashes anywhere in the note.
- If article or page TEXT was deliberately preserved through a redesign, say so, so
  nobody re-summarizes or rewrites it in grounding.

## After writing it

Tell Joseph in one line that the note is written and where, plus the single most
important thing the bot will learn from it. He relays it or opens that session.
