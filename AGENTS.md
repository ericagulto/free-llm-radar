# AGENTS.md — Free LLM Radar operations runbook

**Read this first.** It tells you where to research, how to research, and how to update the data.

This file is the operational contract for any agent touching this project — a scheduled refresh, a
manual update, or a one-off fix. `README.md` explains the design; this file tells you what to do.

---

## The 60-second version

```bash
# 1. Re-verify deadlines BEFORE anything else (extensions are the most common change)
# 2. Research new offers          → see "Where to research"
# 3. Rewrite ONLY free-llm-radar/data.js   → see "How to update the data"
# 4. Validate — must exit 0
node free-llm-radar/validate.js
# 5. Publish the data (site never needs redeploying)
bash deploy/sync-data.sh
# 6. Log it
#    prepend a dated entry to free-llm-radar/CHANGELOG.md
```

If validation fails, **restore `data.js` from `free-llm-radar/archive/` and report the failure.**
Never leave broken data in place.

---

## Absolute paths

| | |
|---|---|
| Workspace root | `C:\Users\Eric\WorkBuddy AI\2026-09-28-23-26-01` |
| Project | `<root>\free-llm-radar` |
| Data (the file you rewrite) | `<root>\free-llm-radar\data.js` |
| Local data repo clone | `<root>\deploy\data-repo` |
| Local site repo clone | `<root>\deploy\site-repo` |
| Live dashboard | https://ericagulto.github.io/free-llm-radar/ |
| Live data | https://ericagulto.github.io/free-llm-radar-data/data.js |

---

## Golden rules

1. **Rewrite only `data.js`.** Never regenerate `index.html`. Never edit `referrals.js`,
   `REFERRALS.md`, `validate.js` or `test-ui.js` on an automated run.
2. **Offer `id` values are permanent.** Never rename one — the referral layer keys off them.
3. **Never delete an offer silently.** Record removals in `RADAR.rail` under the `closed` group
   with chip `dead`, and update the offer's own `status`.
4. **Vendor primary docs beat aggregators.** Always. See the core principle below.
5. **A stale-but-correct file beats a fresh-but-wrong one.** If you cannot verify a change, leave
   the existing data alone and say so.
6. **Report corrections first.** If a previously published deadline moved, lead with that.

---

## Where to research

Search **in parallel**, and mix English and Chinese queries. A large share of free-tier promotions
originate from Chinese providers and are documented in Chinese first, often days before any English
write-up exists.

### Trackers — for breadth (which providers to check)

| Source | Use it for | Caveat |
|---|---|---|
| `china-ai-arbitrage.xyz/free-tokens` | Best English tracker, well-sourced, per-offer detail | Still check the date on each entry |
| `aipromonow.com` | Promo tracker with community validation counts and expiry dates | Community-sourced |
| `aifuli.dev` | Official-source-verified offers, startup credits, student benefits | — |
| `freetokens.custats.info` | Per-offer detail pages with verification status | — |
| `allagent.wiki` | Daily briefings (CN) | Calendar page stopped updating 12 Sep 2026 — daily posts only |
| `github.com/open-free-llm-api/awesome-freellm-apis` | Broad provider list | Frequently stale on retirements |
| `github.com/0xzr/freellmpool` | Provider catalogue with access signals | — |
| `token-fbi.com`, `yangmao.ai`, `apirank.vip` | Additional CN trackers | — |

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

### Research method

1. **Re-verify `end` dates FIRST.** Silent extension is the most common change and the easiest to
   miss. Check every offer that has a date before looking for anything new.
2. **Sweep the trackers** for offers that are not yet in `data.js`.
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

---

## How to update the data

### The schema

`data.js` sets `window.RADAR = { updated, verifiedBy, offers: [...], rail: [...] }`.
The full field list is in the header comment of the file itself — read it. The non-obvious fields:

| Field | Notes |
|---|---|
| `id` | Permanent slug. Never rename. |
| `kind` | `portable` \| `client` \| `keyless` \| `credit` |
| `budget` | **Number** for sorting. `0` if unmetered, unpublished, or measured in points. |
| `unit` | How to read `budget`, e.g. `tokens/day`, `tokens one-time`, `$300`, `points · not tokens` |
| `end` | `YYYY-MM-DD` or `null` for ongoing |
| `added` | ISO date it surfaced or **last materially changed** — not today's date every run |
| `status` | `new` \| `extended` \| `expiring` \| `active` |
| `link` | Direct key-creation URL, **not** the marketing homepage |
| `test` | A command that actually runs, not a placeholder |

Rail groups: `{ d: 'today'|'yesterday'|'week'|'closed', label, items: [{ c, n, t }] }`
where `c` is one of `new` \| `ext` \| `exp` \| `dead`.

### Idempotency rules

- `status: 'new'` applies **only** on the run where an offer first appears.
- Update `added` **only** on a material change — not every run.
- Prepend a rail group for today; shift the previous groups down; keep `closed` for this week.
- Never delete an offer silently.

### Steps

1. Copy the current `data.js` to `free-llm-radar/archive/data-<YYYY-MM-DD>.js` **before** writing.
2. Rewrite `free-llm-radar/data.js` with the changes.
3. Set `RADAR.updated` to the current ISO 8601 timestamp with `+08:00`.
4. Set `RADAR.verifiedBy` to a short description of what you actually checked.
5. Prepend a dated entry to `free-llm-radar/CHANGELOG.md` — what changed, what was verified against
   a primary source, what the next run needs to know.

### When to stop and ask instead

Leave the data untouched and report, rather than guessing, if:

- You cannot reach the vendor's own page to confirm a number.
- A tracker reports a change that the vendor's page contradicts. **The vendor wins.** Note the
  discrepancy.
- An offer looks closed but you cannot confirm it. Leave it `active` and flag it.
- A referral programme's terms changed. **Do not edit `referrals.js`** — report it. That file is
  hand-edited and carries legal weight.

---

## Validate, then publish

```bash
# Schema, cross-file integrity, and compliance hooks. Must exit 0.
node free-llm-radar/validate.js

# Only if you changed index.html:
NODE_PATH="C:/Users/Eric/.workbuddy-ai/binaries/node/workspace/node_modules" \
  node free-llm-radar/test-ui.js

# Publish the data. Idempotent — exits without committing if nothing changed.
bash deploy/sync-data.sh
```

**Publishing is only the data push.** The dashboard reads
`https://ericagulto.github.io/free-llm-radar-data/data.js` at load time, so a refresh never requires
redeploying the site.

Two things to remember:

- **GitHub Pages caches the data file for 10 minutes** (`cache-control: max-age=600`). A successful
  push is not instantly visible. Do not report it as live immediately.
- **After any deploy to the site**, verify the deployed artifact, not the local file:
  `node deploy/verify-live.js`. A local suite once passed 17/17 while the live page was
  mislabelling every link.

Only touch `deploy/site-repo` when `index.html`, `referrals.js` or a doc changed. Push it with:

```bash
cp free-llm-radar/{index.html,referrals.js,README.md,REFERRALS.md,CHANGELOG.md,validate.js,test-ui.js} deploy/site-repo/
cp -r free-llm-radar/archive/. deploy/site-repo/archive/
git -C deploy/site-repo add -A
git -C deploy/site-repo commit -m "<what changed>"
git -C deploy/site-repo push
```

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
- Keep it under ~250 words unless the user asks for detail.
