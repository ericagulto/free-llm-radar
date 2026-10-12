/* ============================================================
   Free LLM Radar: change-history page generator
   ------------------------------------------------------------
       node free-llm-radar/build-history.js

   Reads CHANGELOG.md and writes history.html.

   WHY THE CHANGELOG AND NOT THE ARCHIVE FOLDER
     The obvious source is archive/*.js: a dated snapshot per
     run, each carrying its own rail. That was tried and it does
     not work. Measured on 2026-10-12:

       - Rail headlines repeat. "No deadline changes: every
         published end date re-verified unchanged" is the same
         headline in eight consecutive runs. 102 rail items
         collapse to only 71 distinct headlines, so headline is
         not a key for "one change".
       - Three snapshots share a `today` label, and the ones that
         do carry different item counts (9 and 10 under
         "Today · 29 Sep"; 7 and 8 under "Today · 2 Oct").
       - The filenames do not sort into run order:
         data-2026-10-12-midday.js sorts before
         data-2026-10-12.js, but was archived after it.

     Reconstructing "what changed when" from that would mean
     guessing, and a history page that guesses is worse than no
     history page. CHANGELOG.md is already the authoritative
     record: one entry per run, written at the time, newest
     first, append-only. This script renders it and invents
     nothing.

   DESIGN RULES
     - Deterministic. No build timestamp, so rebuilding an
       unchanged changelog produces a byte-identical file and
       git diffs only ever show real changes.
     - Fails loudly. Zero parsed entries exits non-zero rather
       than emitting an empty page.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const SRC = path.join(DIR, 'CHANGELOG.md');
const OUT = path.join(DIR, 'history.html');
const SITE = 'https://ericagulto.github.io/free-llm-radar';

const md = fs.readFileSync(SRC, 'utf8');

// ---------- inline markdown ----------
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Code spans are pulled out before bold is applied, so a `**` inside a code span is not
   turned into a tag. Placeholders use \u0000, which cannot occur in the source. */
function inline(s) {
  const codes = [];
  let t = esc(s).replace(/`([^`]+)`/g, (m, c) => {
    codes.push(c);
    return '\u0000' + (codes.length - 1) + '\u0000';
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  t = t.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + codes[+i] + '</code>');
  return t;
}

// ---------- parse ----------
const lines = md.split('\n');
const entries = [];
let intro = [];
let cur = null;
let inFence = false;

for (const raw of lines) {
  const line = raw.replace(/\s+$/, '');
  if (/^```/.test(line)) { inFence = !inFence; continue; }
  if (inFence) continue;                       // the format template is a fence, not an entry

  const h = /^##\s+(.*)$/.exec(line);
  if (h) {
    const m = /^(\d{4}-\d{2}-\d{2})\s*(?:[·—–-]\s*)?(.*)$/.exec(h[1].trim());
    cur = { date: m ? m[1] : h[1].trim(), title: m ? m[2].trim() : '', lines: [] };
    entries.push(cur);
    continue;
  }
  if (/^#\s+/.test(line)) continue;            // the changelog's own title
  if (/^-{3,}$/.test(line)) continue;          // entry separator
  if (cur) cur.lines.push(line);
  else intro.push(line);
}

if (!entries.length) {
  console.error('build-history: no entries parsed from CHANGELOG.md, refusing to write an empty page.');
  process.exit(1);
}

// ---------- group an entry's lines into bullets ----------
/* Shape of the source: top-level bullets at column 0, sub-bullets at 2 spaces, and wrapped
   continuation lines indented under whichever bullet they belong to. */
function toBullets(body) {
  const out = [];
  let curTop = null;
  for (const line of body) {
    if (!line.trim()) continue;
    const sub = /^\s{2,}-\s+(.*)$/.exec(line);
    const top = /^-\s+(.*)$/.exec(line);
    if (top && !sub) {
      curTop = { text: top[1], subs: [] };
      out.push(curTop);
    } else if (sub && curTop) {
      curTop.subs.push(sub[1]);
    } else if (curTop && curTop.subs.length) {
      curTop.subs[curTop.subs.length - 1] += ' ' + line.trim();
    } else if (curTop) {
      curTop.text += ' ' + line.trim();
    }
  }
  return out;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'entry';
}

const seen = new Set();
for (const e of entries) {
  let id = slug(e.date + '-' + e.title);
  let n = 2;
  while (seen.has(id)) id = slug(e.date + '-' + e.title) + '-' + n++;
  seen.add(id);
  e.id = id;
  e.bullets = toBullets(e.lines);
}

// ---------- facts, derived rather than asserted ----------
const newest = entries[0], oldest = entries[entries.length - 1];
const dates = entries.map(e => e.date).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d));
const monthName = iso => {
  const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return M[+iso.slice(5, 7) - 1];
};
const range = dates.length
  ? `${+oldest.date.slice(8, 10)} ${monthName(oldest.date)} to ${+newest.date.slice(8, 10)} ${monthName(newest.date)} ${newest.date.slice(0, 4)}`
  : '';

// ---------- render ----------
const bulletHTML = b => {
  const cls = /^\*{0,2}(Verified|Rejected|Not added|Notes)/i.test(b.text) ? ' class="vf"' : '';
  const subs = b.subs.length ? '<ul class="sub">' + b.subs.map(s => `<li>${inline(s)}</li>`).join('') + '</ul>' : '';
  return `<li${cls}>${inline(b.text)}${subs}</li>`;
};

const entryHTML = (e, i) => {
  const inner =
    `<div class="ehead"><time datetime="${e.date}">${e.date}</time>` +
    (e.title ? `<h2>${inline(e.title)}</h2>` : '') +
    `<span class="n">run ${entries.length - i}</span></div>` +
    `<ul class="bl">${e.bullets.map(bulletHTML).join('')}</ul>`;
  // The two newest runs stay open. Older ones collapse, so the page opens on what is current
  // instead of on a wall of history.
  return i < 2
    ? `<article class="entry open" id="${e.id}">${inner}</article>`
    : `<details class="entry" id="${e.id}"><summary>${e.date}${e.title ? ' · ' + inline(e.title) : ''}</summary>${inner}</details>`;
};

const navHTML = entries.map(e =>
  `<a href="#${e.id}"><time>${e.date}</time>${e.title ? `<span>${inline(e.title)}</span>` : ''}</a>`
).join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2312100d'/%3E%3Ccircle cx='16' cy='16' r='9.5' fill='none' stroke='%23e8a33d' stroke-width='2.2'/%3E%3Ccircle cx='16' cy='16' r='3' fill='%23e8a33d'/%3E%3Cpath d='M16 16 L25 9' stroke='%23e8a33d' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<title>Change history · Free LLM Radar</title>
<meta name="description" content="Every refresh of the Free LLM Radar, newest first: what changed, what it was checked against, and what could not be confirmed. ${entries.length} runs, ${range}.">
<link rel="canonical" href="${SITE}/history.html">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#12100d; --bg2:#1a1714; --bg3:#221e19; --bg4:#2b261f;
  --line:#332d25; --line2:#453d31;
  --tx:#f2e9dc; --tx2:#a89b88; --tx3:#6f6555;
  --amber:#e8a33d; --amberd:#5c4318;
  --green:#6fb98f; --red:#e06c5a; --blue:#7ba7cc;
  --mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--bg);color:var(--tx);font-family:'Archivo',-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:880px;margin:0 auto;padding:26px 22px 70px}
.back{display:inline-block;font-family:var(--mono);font-size:11.5px;color:var(--tx3);text-decoration:none;margin-bottom:18px}
.back:hover{color:var(--amber)}
h1{margin:0;font-size:28px;font-weight:800;letter-spacing:-.025em;line-height:1.15}
h1 em{font-style:normal;color:var(--amber)}
.lede{color:var(--tx2);font-size:13.5px;margin:9px 0 0;max-width:66ch}
.lede b{color:var(--tx)}
.stats{font-family:var(--mono);font-size:11px;color:var(--tx3);margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.note{margin-top:20px;padding:13px 15px;border-left:2px solid var(--blue);background:rgba(123,167,204,.05);
  border-radius:0 3px 3px 0;font-size:12.5px;color:var(--tx2)}
.note b{color:var(--blue)}
nav.jump{margin:26px 0 30px;padding:15px 17px;background:var(--bg2);border:1px solid var(--line);border-radius:3px}
nav.jump .lbl{font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3);font-weight:700;margin-bottom:9px}
nav.jump a{display:flex;gap:11px;align-items:baseline;padding:4px 0;text-decoration:none;color:var(--tx2);font-size:12.5px}
nav.jump a:hover{color:var(--amber)}
nav.jump time{font-family:var(--mono);font-size:11px;color:var(--tx3);flex-shrink:0;width:76px}
nav.jump a:hover time{color:var(--amber)}
.entry{border-top:1px solid var(--line);padding:22px 0 4px;scroll-margin-top:16px}
details.entry summary{cursor:pointer;font-family:var(--mono);font-size:12px;color:var(--tx2);
  padding:14px 0;list-style:none;border-top:1px solid var(--line)}
details.entry summary::-webkit-details-marker{display:none}
details.entry summary::before{content:'▸ ';color:var(--tx3)}
details.entry[open] summary::before{content:'▾ ';color:var(--amber)}
details.entry summary:hover{color:var(--amber)}
details.entry[open] summary{border-bottom:1px solid var(--line);margin-bottom:4px}
.ehead{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap;margin-bottom:12px}
.ehead time{font-family:var(--mono);font-size:12.5px;font-weight:600;color:var(--amber);flex-shrink:0}
.ehead h2{margin:0;font-size:15px;font-weight:700;letter-spacing:-.01em;color:var(--tx)}
.ehead .n{margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--tx3)}
ul.bl{margin:0;padding-left:0;list-style:none}
ul.bl>li{position:relative;padding-left:17px;margin-bottom:9px;font-size:13px;color:var(--tx2);line-height:1.6}
ul.bl>li::before{content:'';position:absolute;left:2px;top:9px;width:4px;height:4px;border-radius:50%;background:var(--line2)}
ul.bl>li.vf::before{background:var(--blue)}
ul.bl>li b{color:var(--tx);font-weight:600}
ul.bl>li.vf b:first-child{color:var(--blue)}
code{font-family:var(--mono);font-size:11.5px;background:var(--bg4);border:1px solid var(--line2);
  border-radius:2px;padding:1px 5px;color:var(--tx)}
ul.sub{margin:7px 0 0;padding-left:0;list-style:none}
ul.sub li{position:relative;padding-left:15px;margin-bottom:5px;font-size:12.5px;color:var(--tx3);line-height:1.55}
ul.sub li::before{content:'';position:absolute;left:3px;top:8px;width:3px;height:3px;border-radius:50%;background:var(--line2)}
ul.sub li b{color:var(--tx2)}
footer{margin-top:34px;padding-top:20px;border-top:1px solid var(--line);color:var(--tx3);font-size:11.5px;line-height:1.75}
footer a{color:var(--amber);text-decoration:none}
footer a:hover{text-decoration:underline}
footer b{color:var(--tx2)}
@media(max-width:620px){
  .wrap{padding:20px 15px 54px}
  h1{font-size:23px}
  .ehead .n{display:none}
  nav.jump a{flex-direction:column;gap:1px}
  nav.jump time{width:auto}
}
</style>
</head>
<body>
<div class="wrap">

  <a class="back" href="./">← Free LLM Radar</a>

  <h1>Change <em>history</em></h1>
  <p class="lede">Every refresh of the radar, newest first. Each entry records what changed, what it was
  checked against, and what could not be confirmed. This is the raw run log rather than a summary:
  where a number could not be read from the vendor's own page, the entry says so instead of
  smoothing it over.</p>

  <div class="stats">${entries.length} runs · ${range} · append-only · newest first</div>

  <div class="note"><b>Why this page exists.</b> A list of free tiers is only as good as its last
  check. Most offers on the radar are promotions with countdowns rather than published dates, and
  they change quietly. This log is the evidence that each one was re-read, and the record of what
  moved when it did.</div>

  <nav class="jump" aria-label="Jump to a run">
    <div class="lbl">All runs</div>
    ${navHTML}
  </nav>

  <main>
    ${entries.map(entryHTML).join('\n    ')}
  </main>

  <footer>
    <b>Sources.</b> Entries name the page each figure was read from. Vendor primary documentation
    always beats a tracker; where the two disagreed, the entry records the discrepancy rather than
    picking one.<br><br>
    <a href="./">← Back to the dashboard</a> &nbsp;·&nbsp;
    <a href="offers/">All offer pages</a> &nbsp;·&nbsp;
    <a href="CHANGELOG.md">CHANGELOG.md</a>
  </footer>

</div>
</body>
</html>
`;

fs.writeFileSync(OUT, html);
console.log(`history.html: OK · ${entries.length} runs, ${range}, ${(html.length / 1024).toFixed(1)} KB`);
