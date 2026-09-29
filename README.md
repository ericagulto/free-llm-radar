# Free LLM Radar

A self-refreshing dashboard of free LLM API tiers, time-limited promotions and signup credit
grants. Refreshed daily by a scheduled task.

**Open `index.html`** — it runs from the filesystem with no server and no build step.

> **If you are an agent picking this up, read [`AGENTS.md`](AGENTS.md) first.** It is the operational
> runbook: where to research, how to research, and exactly how to update and publish the data.
> This README explains the design; `AGENTS.md` tells you what to do.

---

## Layout

```
free-llm-radar/
├── AGENTS.md       Operational runbook. Sources, research method, update procedure.
├── index.html      Presentation layer. Stable — the daily job does not touch this.
├── data.js         Offer data. THE ONLY FILE THE DAILY JOB REWRITES.
├── content.js      Editorial layer. Hand-authored prose. Also never touched by the daily job.
├── referrals.js    Referral programme data + your own links. Edited by hand.
├── build-pages.js  Static generator. Writes offers/, assets/offer.css, sitemap.xml, robots.txt.
├── offers/         GENERATED. One standalone page per offer, plus an index. Do not hand-edit.
├── assets/         GENERATED. offer.css, shared by the offer pages.
├── validate.js     Schema, generated-output + compliance validator. Run after every edit.
├── test-ui.js      Browser test — dashboard and offer pages, desktop + mobile. 87 assertions.
├── test-validate.js Negative test — 16 deliberate breakages, each of which validate.js must catch.
├── REFERRALS.md    Programme terms, payout conditions, compliance notes. Read before publishing.
├── CHANGELOG.md    Append-only log of every refresh.
└── archive/        Dated snapshots of data.js, one per refresh.
```

The split exists so the daily job has the smallest possible blast radius. It rewrites `data.js`,
regenerates `offers/`, and appends to `CHANGELOG.md`. It never regenerates `index.html` — a quoting
error in a regenerated page produces a blank screen, whereas a malformed `data.js` fails loudly and
is trivially reverted from `archive/`.

### Three layers, not two

`content.js` is the third. It holds the prose a reader actually came for — what an offer is, whether
it is free forever, what it is good for, what will bite you, and how much independent review exists.
The daily job **never writes to it.**

The reasoning is the same as the data/presentation split, one level down. A number and a judgement
age at completely different rates. Limits and deadlines change weekly; an assessment of a provider's
reputation changes yearly. Interleaving them means every refresh is an opportunity to paraphrase a
sentence, quietly soften a caveat, or lose an edit. Separated, a refresh physically cannot touch the
prose — and the validator enforces that every offer has an entry, so a newly added offer cannot ship
with a blank page.

`content.js` also carries six honesty rules in its header, and they are load-bearing:

1. `what` uses only facts already verified in `data.js` — no new claims.
2. `uses` is advice derived from the limits, not a vendor claim.
3. `redFlags` is allowed to be unflattering, and should be.
4. `documented` cites a source per fact; **a URL is never invented.** Where no page exists, the
   source is named as plain text rather than linked.
5. `ourTake` is opinion, and the page labels it `opinion` so it is never read as verified fact.
6. `coverage` states outright how much independent material exists — *including* when the answer is
   "none". An empty review section is honest; a fabricated one is not.

---

## Two layers: dashboard and offer pages

| | Dashboard | Offer pages |
|---|---|---|
| File | `index.html` | `offers/<id>.html` |
| Built by | hand | `build-pages.js` |
| Rendering | client-side JS | static HTML |
| Reads data at | runtime, from the data origin | generation time |
| Purpose | compare everything at once | rank for one provider's search query |

Both are needed, and neither replaces the other. The dashboard is one URL that shows 43 offers, so a
search engine sees one page and none of the offers rank. The offer pages are real files, so each can
rank for its own query — "groq free tier", "amd token factory limits" — which is the entire reason
for generating them.

Because the offer pages are generated at build time, **a data refresh must regenerate them.**
Publishing new data without regenerating leaves indexed pages stating limits the dashboard no longer
shows. `deploy/publish.sh` does both in the right order.

The two layers cross-link: every dashboard row's name, and a "Read the full guide" link inside the
expanded panel, point at that offer's page. `test-ui.js` asserts both, and that the target file
actually exists.

---

## Features

- **Freshness rail** (sidebar) — dated timeline of what changed, newest first, with
  NEW / EXTENDED / EXPIRING / CLOSED chips
- **Metric strip** — offers tracked, portable key count, expiring within 7 days, largest grant.
  Computed from the data at load, never hardcoded.
- **Featured block** — a labelled promotional placement above the table, carrying only offers with
  an active referral link. See the honesty note below.
- **Multi-column sort** — click a column header to sort by it, click again to flip the direction,
  **shift-click to add a secondary sort**. Active columns show ▲/▼ and, once more than one is
  active, a priority number. The dropdown remains as a quick single-key preset and reports
  "Custom (multi-column)" when the stack does not match one.
- **Multi-select filters** — Portable key, Client-bound, Keyless, Cloud credit, No card,
  Expiring ≤7d, Referral-linked, No referral. Combine any number of them.
- **Search** — provider, sub-label, model IDs, base URL and allowance text
- **Expandable rows** — mechanics, referral programme block, numbered steps, copy-paste test
- **Standalone offer pages** — one crawlable page per offer with its own title, meta description,
  canonical and breadcrumb data, linked from each row. Generated, not hand-written.

### How the filters combine

Filters are grouped into **dimensions**. Within a dimension the selected chips **OR** together;
across dimensions they **AND** together.

| Dimension | Chips | Behaviour |
|---|---|---|
| `kind` | Portable key, Client-bound, Keyless, Cloud credit | OR — an offer has one kind, so selecting two widens |
| `card` | No card | AND |
| `time` | Expiring ≤7d | AND |
| `ref` | Referral-linked, No referral | OR — they are complements, so both selected = everything |

So **Portable key + Keyless** shows both kinds (wider), while **Portable key + No card** shows only
portables that need no card (narrower). Three dimensions at once is fine.

The first chip doubles as the reset control. With no filters it reads **All**; once any filter is
live it switches to **Clear n** and turns amber-outlined, so the way out is always visible. Search
composes with filters as an additional AND.

### How sorting resolves

`sortStack` is an ordered list of `{key, dir}`. Earlier entries win; later entries break ties. The
final tiebreak is always name, so the order never flickers between renders.

**Nulls sort last in both directions.** An ongoing promotion has no `end` date, so without this
rule "promotion ends soonest" would float every open-ended offer to the top of the table — the
opposite of what the reader asked for. `test-ui.js` asserts this in both directions.

Columns: Offer (`name`), Allowance (`budget`), Promotion period (`end`), Type (`kind`). Freshness
(`added`) has no column but is available from the dropdown and is the default sort.

### The featured block, and why it is labelled

The featured block promotes the offers that carry a referral link. It is deliberately **not**
discreet: the ribbon says "Featured", each card says "Referral", and the copy states plainly that
those offers appear because the operator earns from them, not because they rank better.

That is not decoration. An undisclosed promoted placement is the exact pattern the FTC has
prosecuted, and the specific obligation to disclose when compensation may influence placement
applies to a directory like this. A reader who notices an undisclosed ad stops trusting the whole
table — so the label protects the rankings as much as it protects you legally.

Three rules the code enforces, and `validate.js` fails if any is removed:

1. The block is labelled (`class="fribbon"` / `class="frib"` must exist).
2. It does **not** reorder the table. The table still lists every offer on equal terms; only the
   sort control changes its order.
3. It respects the active filters — filter referral offers out and the block empties rather than
   leaving a stale card behind.

Referral-linked links carry `rel="noopener sponsored"`; every other link carries plain
`rel="noopener"`. `test-ui.js` asserts exactly two sponsored anchors — the featured card and its
row in the table — and that both point at the referral URL.

### Reading the data honestly

`kind` separates **portable API keys** (usable anywhere) from **client-bound** offers (usage only
inside the vendor's own app). This is the single most consequential distinction in the dataset —
most "free model" promotions are client-bound and cannot be wired into anything.

`budget` is a number for sorting; `unit` says how to read it. A 200K/day cap renews daily, a 100M
one-time grant does not. Sorting by raw number across mixed units is misleading, so the unit is
shown in every row and the footer says so.

---

## Hosting

Two free GitHub Pages origins, deliberately separate:

| | URL | Repo |
|---|---|---|
| **Dashboard** | https://ericagulto.github.io/free-llm-radar/ | `ericagulto/free-llm-radar` |
| **Offer pages** | https://ericagulto.github.io/free-llm-radar/offers/ | `ericagulto/free-llm-radar` |
| **Sitemap** | https://ericagulto.github.io/free-llm-radar/sitemap.xml | `ericagulto/free-llm-radar` |
| **Data** | https://ericagulto.github.io/free-llm-radar-data/data.js | `ericagulto/free-llm-radar-data` |

**Why split them.** The daily job only needs to change data. If the data lived with the page, every
refresh would mean redeploying the site and waiting on a build. Split, the job pushes one file to
the data repo and the site picks it up on the next load.

Note the asymmetry: the dashboard picks up new data without a redeploy, but the **offer pages are
static**, so they only change when the site is redeployed. That is why the publish command does both.

**How the page finds its data.** `index.html` tries the remote URL first and falls back to the
local `data.js` next to it. So the same file works published, offline, and straight off the
filesystem. The source is one constant:

```html
<script>
window.RADAR_DATA_URL = window.RADAR_DATA_URL !== undefined
  ? window.RADAR_DATA_URL
  : 'https://ericagulto.github.io/free-llm-radar-data/data.js';
</script>
```

Set it to `''` to force local mode. The tests use that to stay deterministic and offline.

**Why this works cross-origin.** GitHub Pages serves `.js` as
`application/javascript; charset=utf-8` with `access-control-allow-origin: *`, which is what a
cross-origin `<script>` needs. A gist would not do — its raw URLs come back as `text/plain`.

**Caching.** Pages sets `cache-control: max-age=600` on the data file, so a refresh can take up to
10 minutes to appear. That is fine for a daily job and keeps the site fast. If you need it
immediate, the loader can be changed to append a cache-busting query string.

### Publishing

From the workspace root, after editing `data.js`:

```bash
bash deploy/publish.sh
```

That is the normal path. It regenerates the offer pages, validates, pushes the data, pushes the
site, and verifies the deployed artifact — in that order, so a broken generation never goes live.
Every step is idempotent and exits without committing when nothing changed.

The narrower scripts, when you want one half only:

| Script | Does | Use when |
|---|---|---|
| `deploy/publish.sh` | regenerate → validate → push data → push site → verify | **normal refresh** |
| `deploy/sync-data.sh` | pushes `data.js` to the data origin only | emergency data-only fix |
| `deploy/sync-site.sh` | regenerate → validate → push the site only | you changed `index.html` or a doc |

`sync-site.sh` replaces generated trees wholesale rather than merging them, so a page for an offer
that was removed cannot linger on the live site.

Credentials: `gh auth setup-git` has been run, so plain `git push` works in these clones. A
`.nojekyll` file is present so Jekyll does not process the output.

---

## Daily refresh

A scheduled task runs the research and updates `data.js`. It:

1. Re-checks every source listed in the `free-llm-api-radar` skill
2. Re-verifies `end` dates (promotions get extended silently — this is the most common change)
3. Adds new offers, marks expired ones, updates the rail
4. Archives the previous `data.js` to `archive/data-YYYY-MM-DD.js`
5. Regenerates the offer pages so the published pages match the new data
6. Appends a dated entry to `CHANGELOG.md`
7. Validates before finishing — a run that fails validation leaves the previous `data.js` intact

The daily prompt is a **pointer** to `AGENTS.md`, not a copy of the procedure. Keeping the procedure
in one place means it cannot drift between the two.

**Idempotency rules the job follows:**
- Offer `id` values are permanent. Never rename an existing id.
- `status: 'new'` applies only on the run where an offer first appears.
- `added` changes only when an offer materially changes, not every run.
- An offer is never deleted silently — removals are recorded in the rail under `closed`.

---

## Referral layer

Optional and off by default. `referrals.js → YOUR_LINKS` is empty, so every signup link is a plain
untracked URL and the disclosure banner states that fact.

To enable: paste your own referral URLs into `YOUR_LINKS`, generate them from each provider's
console. The dashboard then marks those links, adds `rel="sponsored"`, and switches the disclosure
banner to the full FTC-compliant text.

**Read `REFERRALS.md` first.** It documents which programmes are live, which only pay on *paid*
conversions (most of them), and the disclosure obligations. Three things matter:

1. Most LLM referral programmes pay only when the referred user **buys a subscription**. A free-tier
   audience rarely does. QoderWork CN is the exception — it pays on free usage.
2. Qoder's international referral programme **ended 30 January 2026**. Many blogs still list it.
3. Disclosure is legally required, and the specific obligation to disclose when compensation may
   influence **rankings** applies to a directory like this. Footer-only disclosure is not compliant.

Never paste someone else's referral link into your own project.

---

## Validation

Run after any hand edit, and as the final step of every refresh:

```bash
node free-llm-radar/validate.js
```

Exits non-zero on failure. It loads `data.js` and `referrals.js` in a sandbox, so a syntax error is
reported here instead of as a blank page in the browser. It checks that every required offer field
is present, that offer ids are unique and unrenamed, that `kind` / `status` / rail chip values are
known, that `end` dates are `YYYY-MM-DD` or null, that every `offerRefs` entry resolves to both a
real offer and a real programme, that the disclosure exists and contains the words the FTC test
requires, and that `index.html` still carries `rel="noopener sponsored"` plus the missing-data guard.

It also validates the **generated output**, because a stale or partial generation is invisible in
the browser until a reader clicks a link and gets a 404:

- every offer has a page, and every page maps to a real offer (no orphans)
- no page contains an unrendered `${...}` placeholder — the signature of a generator that failed
  silently on that offer
- exactly one `<h1>` and one facts block per page, with the offer name in the `<h1>`
- a canonical URL and a unique `<title>` per page
- meta descriptions between 60 and 160 characters — longer ones get truncated by search engines
- `BreadcrumbList` structured data survives the templating
- `rel="sponsored"` appears **only** on pages whose offer carries a live referral
- `sitemap.xml` and `robots.txt` agree with what was actually generated

**A refresh that fails validation must not overwrite `data.js`.** The previous file stays in place
and the page keeps working.

### UI test

Needed after editing `index.html`, `build-pages.js` or `content.js`:

```bash
node free-llm-radar/test-ui.js
```

Loads real pages in a real Chromium and asserts behaviour in the DOM rather than in the source. It
covers **both surfaces** — the dashboard and the generated offer pages — because they have separate
stylesheets and separate breakpoints, and for a long time only the dashboard was tested. 87
assertions:

- **Dashboard** — filter semantics (OR within a dimension, AND across, the complementary pair,
  Clear, `aria-pressed`, search composing as an AND), the featured block and its label, multi-column
  sorting including nulls-last in both directions, `aria-sort`, and that every row cross-links to a
  detail page that exists on disk.
- **Referral styling** — asserted by *computed colour*, not class name, so a palette change cannot
  silently turn the referral link back to amber. Plus that the support note appears on referral
  pages and only there.
- **Offer pages** — the verdict block and all five editorial sections actually render, the referral
  CTA carries `rel="sponsored"`, and at 360px and 390px there is no horizontal scroll, no element
  wider than the viewport, and the CTA stays inside it as a comfortable tap target.
- **Mobile** — the rail sits below the table and the first offer is within 1.5 screens.

Playwright and Chromium are resolved automatically, including from the managed Node workspace, so no
`NODE_PATH` is needed. If either is genuinely missing the test skips — but loudly, with a banner
saying the assertions were never evaluated, because a quiet one-line "SKIP" is easily mistaken for a
pass. Set `RADAR_REQUIRE_UI=1` (or pass `--require`) to turn a skip into a failure.

> One subtlety worth keeping: the offer pages' `<h2>` elements are `text-transform: uppercase`, so
> `innerText` returns `"WHAT THIS IS"` while the source says `"What this is"`. The section check has
> to compare case-insensitively, or every section looks missing. `innerText` reflects rendered text;
> `textContent` reflects source text. Pick deliberately.

### Negative test

```bash
node free-llm-radar/test-validate.js
```

A validator that cannot fail is worthless. This breaks the generated output 16 different ways —
deletes a page, adds an orphan, injects a placeholder, strips a canonical, mislabels an ordinary
link as sponsored, drops a referral's sponsored mark, removes a sitemap URL, overruns a meta
description, strips the structured data, adds an offer without generating its page, removes an
offer's editorial content, sets an invalid `forever` value, claims "no coverage" while citing a
third-party review, and strips the reviews section, the opinion label and the free-forever verdict —
then asserts `validate.js` rejects every one. It asserts a clean copy passes first, because a test
whose baseline already fails proves nothing. Runs in a throwaway copy; the project is never modified.

**Every mutation is checked against a content hash of the whole tree.** If a mutation changes
nothing, the case reports `[NO-OP]` and counts as a failure rather than as coverage. This exists
because the coverage-contradiction case had been reporting MISSED while looking correct: its
`String.replace` appended a duplicate `documented` key that the entry's own field then overrode, so
the contradiction it meant to create never existed. A `String.replace` whose pattern stops matching
writes the file back untouched and fails silently — the hash makes that impossible to miss.

Note it runs `validate.js` **in-process** with a stubbed `process.exit` rather than as a child
process: the sandbox refuses to spawn `node.exe` (it fails `EBUSY`), and a child that never starts
reports "caught" for every case — which is how this test first appeared to pass 9/9 while doing
nothing at all.

---

## Adding an offer by hand

Append to `RADAR.offers` in `data.js`. Required fields are documented in the header comment of that
file. The non-obvious ones:

- `budget` — number for sorting, `0` if unmetered or unpublished
- `unit` — how to read it: `'tokens/day'`, `'tokens one-time'`, `'$300'`, `'points · not tokens'`
- `end` — `'YYYY-MM-DD'` or `null` for ongoing
- `link` — the direct key-creation URL, not the marketing homepage
- `test` — a command that actually runs. A leading `—` means "not applicable", and the generator
  drops the whole "Test it" section rather than printing the placeholder

Then add a rail entry, regenerate the offer pages, and re-run `validate.js`:

```bash
node free-llm-radar/build-pages.js
node free-llm-radar/validate.js
```
