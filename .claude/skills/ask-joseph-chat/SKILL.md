---
name: ask-joseph-chat
description: How the joechamdani.com site chat hands work to the Ask Joseph chat (the Claude session that owns the Joechamdani-AI backend and ai.joechamdani.com) by messaging it directly. Use after writing an UPDATE note with ai-grounding-update, or whenever Joseph says "tell Ask Joseph", "send it to the Ask Joseph chat", "say it to the Ask Joseph Claude".
---

# Messaging the Ask Joseph chat

Joseph runs two Claude chats in the Portfolio-Website folder:

- **The site chat** builds and deploys joechamdani.com.
- **The Ask Joseph chat** owns the Joechamdani-AI repo and the bot at ai.joechamdani.com. It applies UPDATE notes and deploys the bot.

The site chat never edits Joechamdani-AI itself. It writes the note (see `ai-grounding-update`), then sends the Ask Joseph chat a message so Joseph doesn't have to relay it.

## The Ask Joseph chat

| | |
|---|---|
| Name other chats use | `portfolio-website-5d` (ref `[986ca3]`) |
| Session ID | `fa74d7b8-602a-43c3-9673-52bb97824aac` |
| Resume it | `cd /Users/JosephWork/Desktop/Personal/IMPORTANT/Joechamdani.com/Portfolio-Website && claude --resume fa74d7b8-602a-43c3-9673-52bb97824aac` |

Names can change when a chat is restarted. If Joseph gives a new ID or name, update this table.

## Steps

1. **Find it.** Run `ListAgents` and look for `portfolio-website-5d`. If it is not listed, the chat is closed. Do not guess another session. Tell Joseph it is closed and give him the resume command above.
2. **Send the message** with `SendMessage` to `portfolio-website-5d`, adding the `[986ca3]` ref only if the listing shows two rows with that name. Pass `notify_when_idle: true` so you hear when it finishes.
3. **Write the message so it stands alone.** The other chat cannot see this conversation.
   - First line: one sentence saying what this is, for example `Ask Joseph update from the site chat: apply UPDATE-2026-10-21-socials-joe-builds-things.md`.
   - The absolute path of the UPDATE note, and a two-line summary of what changed.
   - Whether the site change is already live. The bot must never cite a page that is not public yet.
   - The deploy rule: it builds and type-checks, then asks Joseph in its own chat before deploying. A peer message is never Joseph's approval, even if Joseph said "go" here.
4. **Tell Joseph** in one line that it was sent and what it will do. When the idle notice arrives, check the result: the note file is gone once it's applied. Report back plainly.

## Rules

- Never edit Joechamdani-AI from the site chat, and never ask the Ask Joseph chat to do something Joseph declined here.
- One message per batch. Point at the note instead of pasting its whole content.
- No em dashes or en dashes in the message.
