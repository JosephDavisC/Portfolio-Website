/**
 * Auto-updates "– Present" experience durations in milestones.json and
 * experiences.json based on today's date, LinkedIn-style (inclusive of the
 * start and current month). Idempotent: re-running in the same month changes
 * nothing. Runs as part of `npm run build`, so durations are always current
 * on deploy. Ended roles (fixed end dates) and companies with no current role
 * are left untouched.
 *
 * Usage: node scripts/update-durations.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const NOW = new Date();

// Months from a "Mon YYYY" start to now, inclusive of both endpoints.
function monthsSince(start) {
  const [mon, yr] = start.trim().split(/\s+/);
  return (NOW.getFullYear() - parseInt(yr, 10)) * 12 + (NOW.getMonth() - MONTHS[mon]) + 1;
}

// Format a month count the way LinkedIn does: "2 mos", "1 yr", "1 yr 3 mos".
function fmt(total) {
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts = [];
  if (y > 0) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`);
  if (m > 0) parts.push(`${m} ${m === 1 ? "mo" : "mos"}`);
  return parts.length ? parts.join(" ") : "1 mo";
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const startOf = (dates) => dates.slice(0, dates.indexOf(" – Present")).trim();
const changes = [];

// ---- milestones.json (company `meta` + role `dates`) ----
{
  const p = path.join(__dirname, "..", "src", "data", "milestones.json");
  let raw = fs.readFileSync(p, "utf8");
  const data = JSON.parse(raw);

  for (const co of data.companies) {
    const present = co.roles.filter((r) => r.dates && r.dates.includes(" – Present"));
    if (!present.length) continue;

    // Each current role's own duration.
    for (const r of present) {
      const start = startOf(r.dates);
      const next = `${start} – Present · ${fmt(monthsSince(start))}`;
      if (next !== r.dates) {
        raw = raw.replace(`"${r.dates}"`, () => `"${next}"`);
        changes.push(`  ${co.name} / ${r.title}: "${r.dates}" -> "${next}"`);
      }
    }

    // Company-level meta = earliest role start to now, keeping the type prefix.
    const starts = co.roles.map((r) => (r.dates.match(/^(\w{3} \d{4})/) || [])[1]).filter(Boolean);
    const earliest = starts.reduce((a, b) => (monthsSince(a) >= monthsSince(b) ? a : b));
    const sep = co.meta.indexOf(" · ");
    const type = sep >= 0 ? co.meta.slice(0, sep) : co.meta;
    const nextMeta = `${type} · ${fmt(monthsSince(earliest))}`;
    if (nextMeta !== co.meta) {
      const re = new RegExp(`("name":\\s*"${esc(co.name)}"[\\s\\S]{0,500}?"meta":\\s*")${esc(co.meta)}(")`);
      raw = raw.replace(re, (_m, a, b) => a + nextMeta + b);
      changes.push(`  ${co.name} (meta): "${co.meta}" -> "${nextMeta}"`);
    }
  }
  fs.writeFileSync(p, raw);
}

// ---- experiences.json (`duration`) ----
{
  const p = path.join(__dirname, "..", "src", "data", "experiences.json");
  let raw = fs.readFileSync(p, "utf8");
  const data = JSON.parse(raw);

  for (const key of Object.keys(data)) {
    const e = data[key];
    if (!e.duration || !e.duration.includes(" – Present")) continue;
    const start = startOf(e.duration);
    const next = `${start} – Present · ${fmt(monthsSince(start))}`;
    if (next !== e.duration) {
      raw = raw.replace(`"${e.duration}"`, () => `"${next}"`);
      changes.push(`  experiences/${key}: "${e.duration}" -> "${next}"`);
    }
  }
  fs.writeFileSync(p, raw);
}

if (changes.length) {
  console.log(`[durations] updated ${changes.length} value(s) as of ${NOW.toISOString().slice(0, 7)}:`);
  console.log(changes.join("\n"));
} else {
  console.log(`[durations] already current as of ${NOW.toISOString().slice(0, 7)} — no changes`);
}
