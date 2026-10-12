# AGENTS.md — Free LLM Radar operations runbook

**Read this first.** It tells you where to research, how to research, and how to update the data.

This file is the operational contract for any agent touching this project — a scheduled refresh, a
manual update, or a one-off fix. `README.md` explains the design; this file tells you what to do.

---

## The 60-second version

```bash
# 1. Re-verify deadlines BEFORE anything else (extensions are the most common change)
# 2. Research new offers          → see "Where to research"
# 3. Archive then rewrite ONLY free-llm-radar/data.js   → see "How to update the data"
#    If you ADDED an offer, also add its content.js entry → see "The editorial layer".
#    Do NOT rewrite content.js for offers that already have one.
# 4. Regenerate the offer pages and the change history
node free-llm-radar/build-pages.js
node free-llm-radar/build-history.js
# 5. Validate — must exit 0
node free-llm-radar/validate.js
# 6. Publish data + site + verify — one command
bash deploy/publish.sh
# 7. Log it
#    prepend a dated entry to free-llm-radar/CHANGELOG.md
```

If validation fails, **restore `data.js` from `free-llm-radar/archive/` and report the failure.**
Never leave broken data in place.

Step 4 is not optional. The offer pages quote limits and deadlines; publishing new data without
regenerating them leaves indexed pages stating numbers the dashboard no longer shows. The same
applies to `history.html`, which is generated from `CHANGELOG.md`: prepend an entry and skip
`build-history.js` and the published page quietly omits the newest run. `validate.js` fails on that
drift, so it will not go unnoticed.

Step 5 will fail if you added an offer without a `content.js` entry. That is intentional — it stops
a blank page from shipping. Add the entry rather than deleting the offer.

---

## Absolute paths

| | |
|---|---|
| Workspace root | `C:\Users\Eric\WorkBuddy AI\2026-09-28-23-26-01` |
| Project | `<root>\free-llm-radar` |
| Data (the file you rewrite) | `<root>\free-llm-radar\data.js` |
| Generated offer pages | `<root>\free-llm-radar\offers\` — output, never hand-edit |
| Page generator | `<root>\free-llm-radar\build-pages.js` |
| Change-history page | `<root>\free-llm-radar\history.html` (generated output, never hand-edit) |
| History generator | `<root>\free-llm-radar\build-history.js` (renders `CHANGELOG.md`) |
| Local data repo clone | `<root>\deploy\data-repo` |
| Local site repo clone | `<root>\deploy\site-repo` |
| Live dashboard | https://ericagulto.github.io/free-llm-radar/ |
| Live change history | https://ericagulto.github.io/free-llm-radar/history.html |
| Live offer index | https://ericagulto.github.io/free-llm-radar/offers/ |
| Live data | https://ericagulto.github.io/free-llm-radar-data/data.js |

---

## Golden rules

1. **Rewrite only `data.js`.** Never regenerate `index.html`. Never edit `content.js`,
   `referrals.js`, `REFERRALS.md`, `validate.js` or `test-ui.js` on an automated run.
   `content.js` is hand-authored editorial prose and is **not** a refresh target — see
   "The editorial layer" below.
2. **Offer `id` values are permanent.** Never rename one — the referral layer keys off them, and
   the generated page filename is derived from it.
3. **Never delete an offer silently.** Record removals in `RADAR.rail` under the `closed` group
   with chip `dead`, and update the offer's own `status`.
4. **Vendor primary docs beat aggregators.** Always. See the core principle below.
5. **A stale-but-correct file beats a fresh-but-wrong one.** If you cannot verify a change, leave
   the existing data alone and say so.
6. **Report corrections first.** If a previously published deadline moved, lead with that.
7. **Regenerate after every data change.** `offers/` is derived output. Editing it by hand is
   pointless — the next run overwrites it, and the validator will flag the drift.

---

## Where to research

Search **in parallel**, and mix English and Chinese queries. A large share of free-tier promotions
originate from Chinese providers and are documented in Chinese first, often days before any English
write-up exists.

### Trackers — for breadth (which providers to check)

| Source | Use it for | Caveat |
|---|---|---|
| `igetoken.com/deals` | **The best working tracker.** Per-entry CN summaries, every entry dated, claims official-source traceability, keeps expired entries archived | Community-sourced; treat as leads |
| `igetoken.com/rss.xml` | The same content as a feed. The single cheapest update check in this list | — |
| `token-fbi.com` | Additional CN tracker | Fresh as of 2026-10-11 |
| `apirank.vip` | Additional CN tracker | Fresh as of 2026-10-10 |
| `freetokens.custats.info` | Per-offer detail pages with verification status | — |
| `aifuli.dev` | Official-source-verified offers, startup credits, student benefits | Small site, thin coverage |
| `yangmao.ai` | Free-tier comparison tables, CN and EN | Marketing page; the freshness markers in the HTML are unreliable |
| `github.com/open-free-llm-api/awesome-freellm-apis` | Broad provider list | Frequently stale on retirements |
| `github.com/0xzr/freellmpool` | Provider catalogue with access signals | — |
| `aipromonow.com` | *(recorded for the archive only — does not resolve as of 2026-10-12)* | — |
| `allagent.wiki` | *(recorded for the archive only — returns 403 as of 2026-10-12)* | Calendar page stopped updating 12 Sep 2026 |
| `china-ai-arbitrage.xyz/free-tokens` | **DEAD. The domain now redirects to an online casino.** Do not fetch, do not treat any cached copy as current. Removed from the source list 2026-10-12. | — |

### Vendor primary sources — for truth (verify every number here)

| Provider | Where |
|---|---|
| Google / Gemini | `ai.google.dev/gemini-api/docs/pricing`, `/rate-limits` |
| Groq | `console.groq.com/docs/rate-limits` |
| OpenRouter | `openrouter.ai/docs/api-reference/limits` |
| Cerebras | `inference-docs.cerebras.ai/support/rate-limits` |
| Cloudflare | `developers.cloudflare.com/workers-ai/platform/pricing/` |
| GitHub | `github.blog/changelog` — check here for retirements |
| AMD | `developer.amd.com.cn/radeon/tokenfactory` (CN), `developer.amd.com/ai-developer-program/` (EN) |
| WorkBuddy | `workbuddy.cn/pricing/`, `workbuddy.cn/events/invite/` |
| MiniMax | `platform.minimax.io/docs/token-plan/faq` |
| Qoder | `docs.qoder.com` (intl), `docs.qoder.cn` (CN) — check both, they diverge |
| Z.ai / GLM | `docs.z.ai/devpack/credit-campaign-rules` |

### Keyless model-list endpoints — the cheapest discovery primitive

These need **no API key**, are **vendor-primary**, and answer "what does this vendor serve right
now". That is the single most useful question for catching rotating free rosters, which is the
project's most common change class. Sweep them **before** the trackers.

| Endpoint | What it gives you |
|---|---|
| `https://openrouter.ai/api/v1/models` | ~458 models; `pricing.prompt` / `pricing.completion` of `"0"` marks the free ones |
| `https://opencode.ai/zen/v1/models` | Zen's live list. Now **lags** the docs page, so cross-check against `opencode.ai/docs/zen` |
| `https://integrate.api.nvidia.com/v1/models` | 80 model ids, no key |
| `https://api.sambanova.ai/v1/models` | 6 model ids, no key, exact casing included |
| `https://index-translate.bilibili.com/v1/models` | 1 model id, no key |

All five verified reachable and unauthenticated on 2026-10-12. These all **require** a key and cannot
be swept blind: `api.groq.com`, `api.mistral.ai`, `api.together.xyz`, `api.cerebras.ai`,
`api.deepseek.com`, `api.siliconflow.cn`, `api.stepfun.com`, `developer.amd.com.cn`.

**Community registries were tested and are not worth adding.** `models.dev/api.json` covers 226
providers but contains **zero** zero-cost entries. LiteLLM's
`model_prices_and_context_window.json` returns 137 "zero-cost" keys, but those are mostly `ollama`
models (local, not an API tier) and unpriced placeholders where 0 means "unknown", not "free".
Neither models free tiers, which is exactly what this list is about. Do not re-add them.

### Research method

1. **Re-verify `end` dates FIRST.** Silent extension is the most common change and the easiest to
   miss. Check every offer that has a date before looking for anything new.
2. **Sweep the keyless model-list endpoints**, then the trackers, for offers that are not yet in
   `data.js`. The endpoints are vendor-primary and free, so they catch a stale roster immediately;
   the trackers tell you which vendor to check next.
3. **Confirm each candidate against the vendor's own page** before adding it. If only a tracker
   reports a number, mark it as unverified in the offer's `warn` field and say so in the changelog.
4. **Label the verification level** of every new claim:
   - *Official* — read from the vendor's docs or pricing page
   - *Multi-source* — 3+ independent write-ups plus the vendor portal
   - *Third-party* — deal-tracking sites only; unconfirmed
5. **Search both locales** for CN providers. `docs.qoder.cn` and `docs.qoder.com` have disagreed
   before; so have WorkBuddy's CN and international pages.

### Traps — check every offer against these

1. **Client-bound vs portable key.** The single most important distinction. ZCode, Cline, Qoder and
   MiniMax Code grant usage *inside their own client* — no extractable API key. Only real API
   providers give a portable key. Always set `kind` correctly.
2. **Request caps vs token caps.** Vendors advertise requests/day because it flatters them. Groq's
   free plan is 1,000 req/day but only 200K tokens/day. Report tokens.
3. **Training-data terms.** Gemini's free tier trains on your content; the paid tier does not. Say
   so where it matters.
4. **Card-backed grants that silently convert.** Vertex, Bedrock, Azure, OCI flip to
   pay-as-you-go on expiry. Flag it.
5. **Free vs Dedicated blocks.** AMD's portal lists the same models under both. Free is free;
   Dedicated burns credits.
6. **Countdown-only offers.** No calendar date = treat as expiring imminently.
7. **Short usable windows.** ZCode's Trust Build grants tokens that land late and expire the next
   midnight. Report the *usable* window, not the claim window.
8. **Points are not tokens.** WorkBuddy and MiniMax meter in points/credits. Use `budget: 0` and say
   so in `unit`. Inventing a token figure breaks the dataset's honesty.
9. **Derived output goes stale silently.** The offer pages quote limits and deadlines. Refresh
   `data.js` without regenerating and the indexed pages keep stating the old numbers, with nothing
   on screen to suggest they are out of date. Regenerating is part of the refresh, not a separate
   chore.

### Corrections already established — do not re-introduce these

- **GitHub Models was retired 30 July 2026.** Aggregators still list it. It is the canonical example
  of why tracker lists cannot be trusted on retirements.
- **Qoder's Qwen3.8-Flash free period was extended** past 30 September. Confirmed on both locales.
- **Alibaba Bailian's new-user grant is 70M tokens**, not ~1M per model.
- **Zhipu AutoClaw's newcomer gift is 200M tokens / ¥120**, limited-time with a countdown.
- **Qoder's international referral programme ended 30 January 2026.** Blogs still list it as live.
- **`copilot.tencent.com/fission` is a different, ENDED WorkBuddy campaign** (100 Credits/invite,
  3,000 for the invitee, closed 30 April). The live one is `workbuddy.cn/events/invite`. Do not
  merge their numbers.
- **The `.tag.port` CSS bug** — see `CHANGELOG.md`. Lesson: a CSS class that never matches fails
  silently.
- **`verify-live.js` must measure the referral layer on the China-only tab.** The only live referral
  link is on a cn-only offer (`workbuddy`), and the featured block and that row's green CTA are both
  scoped to the active tab. Five checks asserted them against the main tab, where the referral layer
  is correctly absent, so the verifier reported a false failure on every deploy for four runs while
  the "needs its China-tab switch" note was carried forward unfixed. Two more assertions had the same
  root cause: the offers index and `sitemap.xml` cover the **whole** dataset, not the main tab, so
  they compare against `rows + cnRows`. When a check fails on a tab-scoped surface, ask which tab it
  belongs on before assuming the page is wrong.
- **A note carried forward is not a fix.** "Flagged as outstanding on runs 16 to 19" appeared in four
  consecutive changelog entries. The cost was not the missing switch, it was that the deploy was
  unverified for four days while looking as if it had been checked.
- **A test that cannot fail proves nothing.** `test-validate.js` first "caught" 9/9 breakages while
  the child process was never starting at all (the sandbox refuses to spawn `node.exe`; the spawn
  failed `EBUSY` and every case looked like a pass). It now runs `validate.js` in-process with a
  stubbed `process.exit`, and asserts a **clean copy passes first**. Always check the baseline.
- **A test that fails for the wrong reason is nearly as bad.** `test-ui.js` asserted name-sort order
  by comparing the whole `.nm` cell, which concatenates the offer name with its subtitle. "OpenCode"
  + "New-model previews" then sorts against "OpenCode Zen" + "Free model gateway" as
  `OpenCodeN…` vs `OpenCode Z…`, and the space makes the *longer* name come first, so the test
  reported a failure against a table that was sorted correctly. It now compares `.nml`, which is the
  key the sort actually uses. The failure was confirmed identical on the previously published build
  before being called pre-existing, rather than assumed to be pre-existing.

---

## How to update the data

### The schema

`data.js` sets `window.RADAR = { updated, verifiedBy, offers: [...], rail: [...] }`.
The full field list is in the header comment of the file itself — read it. The non-obvious fields:

| Field | Notes |
|---|---|
| `id` | Permanent slug. Never rename. |
| `kind` | `portable` \| `client` \| `keyless` \| `credit` |
| `reach` | `global` \| `cn-direct` \| `cn-only` — **set this on every new offer.** Answers "can a reader outside mainland China actually sign up?" `cn-only` = mainland account / phone / real-name ID required. `cn-direct` = Chinese vendor, reachable from outside. Not the same as `china` — see below. |
| `budget` | **Number** for sorting. `0` if unmetered, unpublished, or measured in points. |
| `unit` | How to read `budget`, e.g. `tokens/day`, `tokens one-time`, `$300`, `points · not tokens` |
| `end` | `YYYY-MM-DD` or `null` for ongoing |
| `added` | ISO date it surfaced or **last materially changed** — not today's date every run |
| `status` | `new` \| `extended` \| `expiring` \| `active` |
| `link` | Direct key-creation URL, **not** the marketing homepage |
| `test` | A command that actually runs, not a placeholder |

Rail groups: `{ d: 'today'|'yesterday'|'week'|'closed', label, items: [{ c, n, t, ref? }] }`
where `c` is one of `new` \| `ext` \| `exp` \| `dead`.

**`ref` is optional and you should carry it forward.** It holds an offer `id`, and the dashboard
turns the rail item into a link to `offers/<id>.html`. Without it the rail is a dead end: it reports
that something changed and gives the reader nowhere to go.

- Set `ref` when the item concerns **exactly one** offer.
- Omit it when the item spans the list ("no deadline changes: every published end date re-verified
  unchanged") or covers several offers at once. A link to an arbitrary one of them is worse than no
  link.
- `validate.js` fails if a `ref` does not match a real offer `id`, so a typo cannot ship a 404.
- When you roll the rail forward, **copy `ref` along with the item.** Dropping it is silent: the
  text still reads correctly and only the link disappears.

### Idempotency rules

- `status: 'new'` applies **only** on the run where an offer first appears.
- Update `added` **only** on a material change — not every run.
- Prepend a rail group for today; shift the previous groups down; keep `closed` for this week.
- Never delete an offer silently.

### Reach — do not skip this on a new offer

`reach` is the field that tells a non-Chinese reader whether an offer is even claimable. The
audience for this list is not primarily Chinese, and roughly two-thirds of the promotional churn
comes from mainland providers, so a new offer added without a correct `reach` value is worse than
useless — it wastes the reader's time on a signup they cannot complete.

- **`cn-only`** — a mainland account, phone number or real-name verification (实名认证) is required.
  Baidu, Tencent/WorkBuddy, ByteDance/Doubao, Volcengine, Alibaba Cloud mainland, WeChat developer
  programmes, and anything on a `.cn` account system. **ModelScope and SiliconFlow both require
  real-name verification** despite looking open — do not assume an English-language UI means global.
- **`cn-direct`** — a Chinese vendor whose product *is* reachable from outside. Z.ai/GLM (region-aware
  routing, no KYC), MiniMax's `.io` platform, Qoder's international programme, AMD's EN portal.
  **A gateway promotion also counts**: Ling 3.1 Flash is classed `cn-direct` because the free access
  runs through Vercel AI Gateway, a US platform, even though the vendor is Ant.
- **`global`** — everything else. Western providers, keyless endpoints, cloud grants.

Two guard rails enforce this, so a mistake fails the build rather than shipping:

- `validate.js` **fails if `reach` is missing or not one of the three values**, and fails if a
  `cn-only` offer carries `china: false` (the two fields contradicting each other).
- `test-ui.js` asserts that the **main tab excludes every cn-only offer**, that the **china-only tab
  shows exactly those and nothing else**, that the two tabs partition the dataset, and that the
  metric strip and tab labels follow the active tab. If you add a `reach` value, extend those
  assertions.

### Reach drives a tab, not a chip

`cn-only` offers render on a separate **"China-only" tab**, and the dashboard **opens on the main tab
with those hidden**. That is deliberate: the offers require a mainland account, phone number or
real-name ID, so for most readers they are unclaimable noise — and because the dated rows skew
Chinese, they used to dominate the expiry rail too.

Consequences to keep in mind when editing `index.html`:

- **The main tab is the default, so "the full list" in a test means `EXPECTED_MAIN`**, i.e. the
  dataset minus the cn-only rows — *not* `RADAR.offers.length`. Three assertions broke on this
  distinction when the tab was introduced. The UI test exposes both as
  `EXPECTED_MAIN` and `EXPECTED`.
- **The largest-grant row is cn-only** (WeChat). A sort assertion that uses the raw maximum will
  fail on the main tab; scope it to the tab being tested.
- **The one live referral link is on a cn-only offer** (`workbuddy`). So the featured block renders
  on the **China-only tab**, not the main one. Any test that looks for `.fcard`, `.ftxt` or `.go.ref`
  must switch tabs first, or it will either time out or pass vacuously with zero cards.
- Pressing the China tab **clears the `global` chip** — a filter that would empty the other tab is
  dropped rather than silently producing a blank list.

`china` is the **legacy boolean** and is kept only for compatibility. Do not delete it, do not add
new logic that reads it — `reach` supersedes it. When they disagree, `reach` is right.

### Steps

1. Copy the current `data.js` to `free-llm-radar/archive/data-<YYYY-MM-DD>.js` **before** writing.
2. Rewrite `free-llm-radar/data.js` with the changes.
3. Set `RADAR.updated` to the current ISO 8601 timestamp with `+08:00`.
4. Set `RADAR.verifiedBy` to a short description of what you actually checked.
5. Prepend a dated entry to `free-llm-radar/CHANGELOG.md` — what changed, what was verified against
   a primary source, what the next run needs to know.
6. Regenerate the offer pages (`node free-llm-radar/build-pages.js`) so the published detail pages
   match the data you just wrote.

### When to stop and ask instead

Leave the data untouched and report, rather than guessing, if:

- You cannot reach the vendor's own page to confirm a number.
- A tracker reports a change that the vendor's page contradicts. **The vendor wins.** Note the
  discrepancy.
- An offer looks closed but you cannot confirm it. Leave it `active` and flag it.
- A referral programme's terms changed. **Do not edit `referrals.js`** — report it. That file is
  hand-edited and carries legal weight.

---

## The editorial layer — `content.js`

`content.js` holds the prose a reader actually came for: what an offer is, whether it is free
forever, what it is good for, what will bite you, and how much independent review exists.

**You do not write to this file on a refresh.** It is not a data target. It exists precisely so a
daily job cannot paraphrase a sentence, soften a caveat, or lose an edit while rewriting numbers
that changed. Facts and judgement age at different rates; interleaving them makes every refresh a
chance to corrupt the prose.

### If you ADD an offer

An offer with no `content.js` entry **fails validation** — deliberately, so a new offer cannot ship
as a blank page. Add an entry with every field:

| field | meaning |
|---|---|
| `what` | 2–3 sentences. Use only facts already verified in `data.js`. No new claims. |
| `forever` | `standing` / `limited` / `recurring` / `one-off` / `unclear` — the direct answer |
| `foreverNote` | one sentence of nuance on the above |
| `uses` | 3–4 practical uses, derived from the limits — advice, not a vendor claim |
| `redFlags` | 2–4 things that will actually bite the reader |
| `reviews.coverage` | `none` / `thin` / `some` / `good` — say "none" when it is none |
| `reviews.documented` | `{ t, src, url? }` per verifiable fact. **Never invent a URL.** |
| `reviews.ourTake` | opinion — the page labels it `opinion` so it is never read as fact |

### If you REMOVE an offer

Leave its `content.js` entry alone for one cycle, then delete it. The validator fails on an orphan
entry, so a stale one will be caught rather than lingering silently.

### The two rules that matter most

1. **Never invent a URL.** If a source exists but has no page, name it as plain text. The renderer
   handles this; a fabricated link does not.
2. **Say "no coverage" when there is no coverage.** An empty review section is honest. A fabricated
   one is not. The validator cross-checks this: it fails if an entry claims `coverage: 'none'` while
   citing a third-party review.

---

## The generated offer pages

`offers/` holds one static HTML page per offer, plus an index. They are **generated output** —
`build-pages.js` writes them from `data.js` + `referrals.js`, and `validate.js` checks them.

`history.html` is generated the same way, by `build-history.js`, from `CHANGELOG.md`. It renders the
whole run log as a readable page, newest first, so the site's track record is visible to a reader
rather than only to someone with the repository open. It reads the changelog and invents nothing.

**Why not build it from `archive/`.** A dated snapshot per run looks like the obvious source, and it
does not work. Measured 2026-10-12: rail headlines repeat across runs (102 rail items, only 71
distinct headlines, because "no deadline changes" is the same headline eight days running), three
snapshots share a `today` label while carrying different item counts, and the filenames do not sort
into run order (`data-2026-10-12-midday.js` sorts before `data-2026-10-12.js` but was archived
after it). Reconstructing "what changed when" from that means guessing, and a history page that
guesses is worse than none. `CHANGELOG.md` is already authoritative and append-only.

**Why static files rather than a client-side detail view.** A single page that renders details from
a query string is one URL to a search engine, so none of it ranks. Real files mean each offer can
rank for its own query ("groq free tier", "amd token factory limits").

Rules:

- **Never hand-edit `offers/` or `assets/offer.css`.** Change `data.js`, `content.js` or
  `build-pages.js` and regenerate. The generator deletes any page whose offer no longer exists.
- **A page draws on two sources.** Every *fact* comes from a field in `data.js`; every *judgement*
  comes from `content.js`. The generator invents neither. If a page looks thin, the fix is a better
  `content.js` entry — the generator will not manufacture filler.
- **The generator exits non-zero if any offer fails to render**, so a half-built page never ships.
- The `rel="sponsored"` rule applies here too: it appears **only** on pages whose offer carries a
  live referral link. `validate.js` fails the build if an ordinary provider page is marked
  sponsored, or if a referral page is not.

To check a change before publishing:

```bash
node free-llm-radar/build-pages.js     # regenerate the offer pages
node free-llm-radar/build-history.js   # regenerate history.html from CHANGELOG.md
node free-llm-radar/validate.js        # schema + generated-output checks
node free-llm-radar/test-validate.js   # proves the validator actually fails on breakage
```

---

## Validate, then publish

```bash
# Schema, cross-file integrity, generated output, compliance hooks. Must exit 0.
node free-llm-radar/validate.js

# After changing index.html, build-pages.js or content.js. No NODE_PATH needed —
# Playwright and Chromium are resolved automatically. RADAR_REQUIRE_UI=1 makes a
# skip (missing browser) a hard failure instead of a quiet exit 0.
node free-llm-radar/test-ui.js

# The daily entry point: regenerates pages, validates, pushes data + site, verifies live.
bash deploy/publish.sh
```

`deploy/publish.sh` is the normal path and is safe to re-run. The narrower scripts exist for
specific jobs:

| Script | Does | Use when |
|---|---|---|
| `deploy/publish.sh` | regenerate → validate → push data → push site → verify | **Normal refresh. Use this.** |
| `deploy/sync-data.sh` | pushes `data.js` to the data origin only | emergency data-only fix, site already current |
| `deploy/sync-site.sh` | regenerate → validate → push the site only | you changed `index.html` or a doc |

Two origins are in play, and that is deliberate:

- **The site** (`free-llm-radar`) serves the dashboard and the offer pages.
- **The data** (`free-llm-radar-data`) serves `data.js` cross-origin, so the dashboard can be
  refreshed without redeploying the site. A GitHub *gist* would not work — it returns
  `text/plain`, and Pages returns `application/javascript` with `access-control-allow-origin: *`.

Two things to remember:

- **GitHub Pages caches the data file for 10 minutes** (`cache-control: max-age=600`). A successful
  push is not instantly visible. Do not report it as live immediately.
- **Verify the deployed artifact, not the local file.** `deploy/verify-live.js` does this. A local
  suite once passed 17/17 while the live page was mislabelling every link as sponsored. Pages also
  takes 30–60s to build after a push, and CDN propagation can add another minute — a 404 on a file
  the API reports as present is usually propagation, not a failed deploy.

---

## Referral layer — do not touch on an automated run

`referrals.js` holds the operator's own referral links and the disclosure text. It is hand-edited
and it carries legal weight.

- **Never add, remove or replace a referral link** on a refresh run.
- **Never weaken the disclosure.** `validate.js` fails if the disclosure is missing or too short,
  and if the featured block loses its label.
- If a programme's terms changed, report it and note it in `CHANGELOG.md`. The operator decides.

The featured block is driven entirely by `referrals.js`: add a link there and the offer appears in
the block automatically; remove it and the block hides itself. There is no separate list to update.

Compliance constraints that shaped the design — read `REFERRALS.md` before proposing changes:

- Referral rewards are a material connection **even when non-monetary** (platform credits count).
- FTC penalties run to **$51,744 per violation**; CA/NY/IL stack their own enforcement.
- An undisclosed promoted placement is the pattern the FTC has prosecuted.
- Footer-only disclosure is non-compliant. The banner must stay above the results.

---

## Reporting back

- **Lead with corrections.** If a previously stated deadline moved, that is the most valuable line
  in the report.
- State the verification level of each new claim.
- Name which offers expire within 7 days.
- Say plainly whether the publish step succeeded, and note the 10-minute cache.
- **If nothing changed, say so.** Do not invent changes to look busy.
- Report the offer count and the generated page count (`validate.js` prints both) so a silent data
  loss or a partial generation is visible in the report.
- Keep it under ~250 words unless the user asks for detail.
