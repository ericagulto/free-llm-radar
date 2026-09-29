# Free LLM Radar

A self-refreshing dashboard of free LLM API tiers, time-limited promotions and signup credit
grants. Refreshed daily by a scheduled task.

**Open `index.html`** — it runs from the filesystem with no server and no build step.

---

## Layout

```
free-llm-radar/
├── index.html      Presentation layer. Stable — the daily job does not touch this.
├── data.js         Offer data. THE ONLY FILE THE DAILY JOB REWRITES.
├── referrals.js    Referral programme data + your own links. Edited by hand.
├── validate.js     Schema + compliance validator. Run after every edit and every refresh.
├── test-ui.js      Browser test for the filter chips. Run after touching index.html.
├── REFERRALS.md    Programme terms, payout conditions, compliance notes. Read before publishing.
├── CHANGELOG.md    Append-only log of every refresh.
└── archive/        Dated snapshots of data.js, one per refresh.
```

The split exists so the daily job has the smallest possible blast radius. It rewrites `data.js`
and appends to `CHANGELOG.md`. It never regenerates the HTML — a quoting error in a regenerated
page produces a blank screen, whereas a malformed `data.js` fails loudly and is trivially reverted
from `archive/`.

---

## Features

- **Freshness rail** (sidebar) — dated timeline of what changed, newest first, with
  NEW / EXTENDED / EXPIRING / CLOSED chips
- **Metric strip** — offers tracked, portable key count, expiring within 7 days, largest grant.
  Computed from the data at load, never hardcoded.
- **Sort** — freshest / token allowance ↓ / token allowance ↑ / promotion ends soonest / name
- **Multi-select filters** — Portable key, Client-bound, Keyless, Cloud credit, No card,
  Expiring ≤7d, Referral-linked, No referral. Combine any number of them.
- **Search** — provider, sub-label, model IDs, base URL and allowance text
- **Expandable rows** — mechanics, referral programme block, numbered steps, copy-paste test

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

### Reading the data honestly

`kind` separates **portable API keys** (usable anywhere) from **client-bound** offers (usage only
inside the vendor's own app). This is the single most consequential distinction in the dataset —
most "free model" promotions are client-bound and cannot be wired into anything.

`budget` is a number for sorting; `unit` says how to read it. A 200K/day cap renews daily, a 100M
one-time grant does not. Sorting by raw number across mixed units is misleading, so the unit is
shown in every row and the footer says so.

---

## Daily refresh

A scheduled task runs the research and updates `data.js`. It:

1. Re-checks every source listed in the `free-llm-api-radar` skill
2. Re-verifies `end` dates (promotions get extended silently — this is the most common change)
3. Adds new offers, marks expired ones, updates the rail
4. Archives the previous `data.js` to `archive/data-YYYY-MM-DD.js`
5. Appends a dated entry to `CHANGELOG.md`
6. Validates before finishing — a run that fails validation leaves the previous `data.js` intact

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

**A refresh that fails validation must not overwrite `data.js`.** The previous file stays in place
and the page keeps working.

### UI test

Only needed after editing `index.html`:

```bash
NODE_PATH="<managed-node-workspace>/node_modules" node free-llm-radar/test-ui.js
```

Loads the page in a real Chromium and clicks the chips, asserting the filter semantics in the DOM
rather than in the source — OR within a dimension, AND across, the complementary pair, the Clear
affordance, `aria-pressed` state, and that search composes as an AND. 17 assertions. It skips with
exit 0 if Playwright or Chromium is missing, so it never blocks a data refresh.

---

## Adding an offer by hand

Append to `RADAR.offers` in `data.js`. Required fields are documented in the header comment of that
file. The non-obvious ones:

- `budget` — number for sorting, `0` if unmetered or unpublished
- `unit` — how to read it: `'tokens/day'`, `'tokens one-time'`, `'$300'`
- `end` — `'YYYY-MM-DD'` or `null` for ongoing
- `link` — the direct key-creation URL, not the marketing homepage
- `test` — a command that actually runs, not a placeholder

Then add a rail entry and re-run `_check.js`.
