# Changelog

Append-only. One entry per refresh. Newest at the top.

Format per entry:

```
## YYYY-MM-DD
- ADDED / CHANGED / EXTENDED / EXPIRED / REMOVED — provider — what changed — source
- Verified: <what was re-checked against a primary source>
- Notes: <anything the next run needs to know>
```

---

## 2026-09-30 (ninth pass — three new offers, two date confirmations)

43 → 46 offers. Three additions, no removals, no deadline corrections.

- **ADDED — Kilo Code (`kilo`)** — open-source coding agent with a free hosted tier
  (`kilo-auto/free`), no credit card and no provider key. Source: `kilo.ai/landing/free-models`
  (live list, free = $0 input and $0 output) and `kilo.ai/docs/getting-started/using-kilo-for-free`.
  Client-bound. Verification level: **official**.
- **ADDED — StepFun Step 5 Preview (`stepfun`)** — 15 free Coding Plan days on registration,
  +15 after a successful call, +45 by invite. Source: `platform.stepfun.com` (confirming the
  OpenAI-compatible `api.stepfun.com/v1` endpoint) plus Chinese launch write-ups dated 20 Sep 2026.
  The day-count mechanics came from secondary sources only — the platform page does not itself
  publish the numbers, so the claim is labelled **third-party** in the offer note.
- **ADDED — OpenCode Zen (`opencodezen`)** — ten models at $0 via a **portable** key, not
  client-bound. Source: `opencode.ai/docs/zen`. Notable trap recorded: billing details are
  collected at signup and auto-reload charges $20 when the balance drops below $5.
  Verification level: **official**.
- **CONFIRMED — Qoder Qwen3.8-Flash extension.** Re-read `docs.qoder.com/events/flashoffer`:
  "The free period, originally set to end on September 30, has been extended. Qwen3.8-Flash remains
  free after September 30." End date to be announced on that page. `added` bumped to 2026-09-30;
  `status` stays `extended` (it is not a new offer).
- **CONFIRMED — GLM night-free runs to 7 October.** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`:
  9 Sep → 7 Oct, 23:00–09:00, GLM-5.3-Flash only, ZCode/AutoClaw only, paid Coding Plan subscribers
  only, and ZCode 3.10+ required. No change to the stored values.
- **RE-VERIFIED, no change** — Groq free plan (30 RPM / 1K RPD / 8K TPM / 200K TPD on gpt-oss-120b,
  gpt-oss-20b, qwen3.8-27b — matches `data.js` exactly), AMD Token Factory (9 free models, roster
  unchanged), OpenRouter free-model limits (20 RPM / 50 RPD, 1,000 RPD after ≥10 credits purchased
  all-time), GMI Hy Image 3.5 free week (Sep 25 → Oct 1), MiniMax Code double check-in (28 Sep → 7 Oct),
  WorkBuddy invite campaign (closes 30 Sep; 2,000 invitee points confirmed on the live page).
- **CHANGED — `oci` and `azure`** gained a `note` recording that the 30-day count starts at
  *activation*, not signup. Wording only; no date moved.
- **RAIL** — new `today` group for 30 Sep, previous group shifted to `yesterday`; `closed` trimmed
  to this week plus the Wenxin/Hy3 client closure.

**Next run needs to know.** (1) Both Wenxin 4.0 and Hunyuan Hy3 close tonight, 30 Sep — they should
move to `closed` and their `status` should change. (2) The WorkBuddy 2,000-point invite bonus also
closes tonight; the ¥0 tier is separately 限时免费 and must be re-checked rather than assumed dead.
(3) ZCode Trust Build, MiniMax Code and GLM night-free all end 7 Oct. (4) Hunyuan Hy4's 14-day clock
runs from first use; the last date to start is 10 Oct. (5) `content.js` gained three entries —
this file is hand-authored and the refresh job must not rewrite the prose.

**Trap re-confirmed.** The igetoken tracker described ZCode Trust Build as "100M tokens **per day**";
Zhipu's own page describes a **single** ~100M allocation with a daily claim cap of 100,000 users.
Vendor wins — the stored figure is unchanged. Also noted: OpenCode Zen's free list overlaps the
skipped "Space Bunny / LongCat" offers seen on trackers; those are Zen gateway models and are now
represented here through the `opencodezen` entry rather than as separate offers.

---



Presentation, content and tooling. No offer data changed, so nothing about the numbers moved.

**Why.** Two complaints, both fair. The dashboard broke on phones — columns and buttons collapsed
into a 22px gutter and overlapped. And the new detail pages were *thinner* than the dashboard row
they were meant to expand: they restated the same facts in a longer layout. A page that says nothing
new is not worth generating.

- **ADDED `content.js`** — a third layer. `data.js` holds volatile facts and is rewritten every run;
  `content.js` holds hand-authored judgement that changes rarely. Keeping them apart means a daily
  refresh cannot paraphrase the prose, and an editorial edit cannot disturb a verified number. This
  is the data/presentation split applied one level down.
- **Every one of the 43 offer pages gained** an explicit "Is it free forever?" verdict, a plain-language
  *What this is*, *What it's good for*, *Caveats and red flags*, and *Reviews and reputation* — with
  the review block stating outright how much independent coverage exists, and an *Our take* box
  labelled `opinion` so commentary is never mistaken for a verified fact.
- **FIXED — mobile.** The offer row now reflows through a `.metarow` wrapper (`display:contents` on
  desktop, a real flex row below 1120px), and the rail drops below the table instead of above it.
  The first offer moved from y=2205 to y=1111 at 390px.
- **CHANGED — referral links are now green** (`--go: #5ec98b`), deliberately brighter than the
  `--green` that already means "ongoing". Applied to the featured ribbon, featured cards and the
  referral CTA. A "Want to support this project?" note sits under every referral link, and says
  plainly that the provider's own signup page works identically.
- **DECIDED — the disclosure stays permanently visible.** An auto-hiding disclosure fails the FTC
  "unavoidable" test; a notice you can dismiss is not a notice.
- **EXTENDED `test-ui.js`** from 61 to 87 assertions. The offer pages had their own stylesheet and
  their own breakpoints and **nothing loaded them** — they could have shipped completely broken
  behind a green suite. Both surfaces are now swept at 360px and 390px.
- **EXTENDED `test-validate.js`** to 16 cases, and added a no-op guard: a mutation that changes
  nothing now reports `[NO-OP]` and fails, instead of silently reporting MISSED. That guard was
  written because the coverage-contradiction case had been passing for the wrong reason — its
  `String.replace` appended a duplicate object key that the entry's own field then overrode.
- **FIXED — `test-ui.js` no longer needs `NODE_PATH`**, resolves Chromium by scanning for the
  highest build instead of hardcoding `chromium-1243`, and refuses to let a skip look like a pass.

## 2026-09-29 (seventh pass — per-offer detail pages)

Presentation layer plus tooling. No offer data changed, so nothing about the numbers moved.

**Why.** The dashboard is one URL showing 43 offers. A search engine sees a single page, so none of
the individual offers can rank for their own query. The fix is real files, not a client-side detail
view — a page that renders from a query string is still one URL.

- **ADDED `build-pages.js`** — a deterministic static generator. Reads the validated `data.js` +
  `referrals.js` and writes `offers/<id>.html` (43), `offers/index.html`, `assets/offer.css`,
  `sitemap.xml` and `robots.txt`. Same input always produces byte-identical output, so git diffs
  show only real changes. It deletes stale pages for offers that no longer exist, and exits
  non-zero if any offer fails to render — a half-built page never ships.
- **Every page carries** a unique `<title>` and meta description, a canonical URL, Open Graph tags,
  `BreadcrumbList` structured data, a facts grid, the mechanics table, numbered setup steps, the
  test command, and derived "Before you commit" warnings. Plus cross-links to same-kind offers.
- **Every derived statement comes from a field in `data.js`.** The generator invents no filler:
  where a value is unknown the page says so. `watchOuts()` produces its bullets from data alone —
  client-bound, card required, deadline ≤14 days, closed, no published figure, credit-converts,
  serves China.
- **ADDED cross-links from the dashboard.** Each row's offer name, and a "Read the full guide" link
  inside the expanded panel, point at that offer's page.
- **ADDED generated-output validation to `validate.js`** — every offer has a page, no orphans, no
  unrendered `${...}` placeholders, one `<h1>` and one facts block each, canonical present, meta
  description within 60–160 chars, breadcrumb data intact, and `rel="sponsored"` only on pages whose
  offer carries a live referral. Plus sitemap/robots agreement. `offers/` missing is a warning (a
  data-only edit can still validate); a *missing page for an existing offer* is a failure.
- **ADDED `test-validate.js`** — a negative test. It breaks the output ten ways and asserts the
  validator rejects each. It asserts a clean copy passes first.
- **ADDED `deploy/sync-site.sh` and `deploy/publish.sh`.** `publish.sh` is now the daily entry point:
  regenerate → validate → push data → push site → verify live.
- **CHANGED the daily procedure.** Regeneration is now part of a refresh, not a separate chore.
  Previously "the site never needs redeploying" was true; it no longer is, because the offer pages
  are static and quote limits and deadlines. Publishing data without regenerating would leave
  indexed pages stating numbers the dashboard no longer shows.

**Three fixes found while verifying the generated output:**

- **The facts grid used `<dt>`/`<dd>` outside a `<dl>`.** Invalid HTML, and it only looked right by
  accident. Now `<dl class="facts">`.
- **21 pages printed a placeholder test command.** The dataset uses a leading `—` to mean "not
  applicable", so client-bound offers rendered a "Test it" block reading `— client-bound.` The
  section is now dropped when the value is a placeholder, on both the offer pages and the dashboard.
- **One page showed escaped markup.** Bedrock's `test` field contained `<b>` tags, which rendered as
  literal `&lt;b&gt;` inside `<pre>`. Tags are now stripped before the value goes into a code block.

**A test that could not fail.** `test-validate.js` first reported "9/9 breakages caught" while doing
nothing at all: the sandbox refuses to spawn `node.exe` (the spawn failed `EBUSY`), so every case
looked like a pass because the child never ran. It now runs `validate.js` in-process with a stubbed
`process.exit`, and asserts the baseline passes before trusting any result. Lesson recorded in
`AGENTS.md`: always check the baseline of a negative test.

- **Verified:** all 43 offers render a page with no unrendered placeholders, no console errors and no
  failed requests, checked in a real Chromium. `test-ui.js` 45/45, `validate.js` exit 0,
  `test-validate.js` 10/10 with a passing baseline.

**Notes for the next run:**
- **Regenerate after every data change.** `offers/` is derived output; hand edits are pointless and
  the validator flags the drift.
- If you add a `kind`, add a `.tag.<kind>` rule to `build-pages.js`'s CSS **and** to `index.html` —
  `validate.js` fails without it.
- `rel="sponsored"` must stay conditional in the generator. The check exists in both the dashboard
  and the generated pages, because getting it wrong once already mislabelled 42 ordinary links.

---

## 2026-09-29 (sixth pass — AGENTS.md runbook)

Documentation only. No data change, so no data publish was needed.

- **ADDED `AGENTS.md`** — the operational runbook for any agent picking this project up cold. It
  answers three questions explicitly: **where to research** (trackers for breadth, vendor pages for
  truth, with a per-provider table), **how to research** (verify deadlines first, label verification
  level, search both locales, and the eight recurring traps), and **how to update the data** (schema,
  idempotency rules, archive-then-write, validate, publish).
- It also records the **corrections already established** — GitHub Models retired, Qoder extended,
  Bailian 70M, AutoClaw 200M, Qoder intl referral dead, the two distinct WorkBuddy campaigns, and
  the `.tag.port` CSS bug — so a future run does not re-introduce any of them.
- **ADDED an explicit "when to stop and ask" section.** The most useful rule in it: if a tracker and
  the vendor disagree, the vendor wins, and you note the discrepancy rather than guessing.
- **CHANGED the scheduled job's prompt to a pointer.** It now says "read `AGENTS.md` first" plus a
  short version of the loop, instead of restating the whole procedure. The runbook can now be
  updated without touching the automation, and there is one place where the procedure lives.
- **ADDED a `validate.js` warning** if `AGENTS.md` is missing, or if it stops mentioning
  `deploy/sync-data.sh`, `validate.js`, `CHANGELOG.md` or `referrals.js` — a light drift check.
  A warning rather than a failure, because a missing doc should not block a data refresh.

**Notes for the next run:**
- Read `AGENTS.md`, not this file, for the procedure. This changelog is history.
- If the procedure changes, update `AGENTS.md` and leave the automation prompt alone.

---

## 2026-09-29 (fifth pass — featured block, multi-column sort, a third bug fixed)

Presentation-layer changes. Hand-edited, deliberately.

- **ADDED — a Featured block** above the table, carrying the offers with an active referral link.
  It is **labelled**, not discreet: a "Featured" ribbon, a "Referral" chip on each card, and copy
  stating the offers appear *because* the operator earns from them, not because they rank better.
  It does not reorder the table and it respects the active filters. See the README for why the
  label is load-bearing rather than decorative.
- **ADDED — multi-column sort on the table headers.** Click to sort, click again to flip,
  **shift-click to append a secondary sort**. Active columns show ▲/▼ and a priority number once
  more than one is live. `aria-sort` tracks state. The dropdown stays as a quick single-key preset
  and reports `Custom (multi-column)` when the stack matches no preset.
- **CHANGED — `disclosureShort` and `disclosureLong` now cover the featured block explicitly.**
  The long form states that the block contains only offers the operator earns from, and that it
  does not change the table order. Without this the block would have been an undisclosed placement.
- **FIXED — a third bug, pre-existing since the first build: the "Portable key" tag has never been
  styled.** The CSS rule was written `.tag.port` while the markup emits `class="tag portable"`, so
  the rule never matched and portables fell back to the unstyled base tag. The other three kinds
  matched correctly, which is why it went unnoticed. Renamed to `.tag.portable`.
  `validate.js` now fails if any `kind` lacks a matching `.tag.<kind>` rule.

**Verified this run:** local validation passes; `test-ui.js` extended to **41 assertions, all
passing** — covering the featured block's label, link and filter behaviour, single and multi-column
sorting, sort-direction flipping, nulls-last in both directions, `aria-sort` state, and the
dropdown's custom state.

**Notes for the next run:**
- The featured block is driven entirely by `referrals.js`. Add a link there and the offer appears
  in the block automatically; remove it and the block hides itself.
- `validate.js` now asserts the featured label exists. Do not remove `fribbon` / `frib` markup.
- The `.tag.portable` bug is a reminder: **a CSS class that never matches fails silently.** When
  adding a kind or status, check the rule actually matches the rendered class name.

---

## 2026-09-29 (fourth pass — referral link wired, published, two bugs fixed)

**Published.** The dashboard now has a public URL and the data lives on a separate free origin:

- Dashboard: https://ericagulto.github.io/free-llm-radar/
- Data: https://ericagulto.github.io/free-llm-radar-data/data.js

- **ADDED — WorkBuddy offer** (id `workbuddy`, kind `client`). It did not exist, so the invite link
  had no row to render into. Free 体验版 tier: **¥0/month, 500 points**, Auto model scheduling across
  all models. Verified from workbuddy.cn/pricing. `budget` is **0** on purpose — points are not
  tokens, and inventing a token number would break the honesty rule.
- **ADDED — the referral link** to `YOUR_LINKS.workbuddy` and mapped `offerRefs.workbuddy`. The
  disclosure banner has switched to its active text and the link carries `rel="noopener sponsored"`.
- **CHANGED — `index.html` now resolves its data source at runtime**, remote first with a local
  fallback, so the daily job can update data without redeploying the site. Overridable via
  `window.RADAR_DATA_URL`; `''` forces local mode.

**Two bugs found by testing against the live deployment — both fixed:**

- **FIXED — `rel="sponsored"` was applied to every offer link, not just the referral one.** The
  template hardcoded `rel="noopener sponsored"` on all 43 anchors, which mislabels 42 ordinary
  provider links as paid placements. Now gated on the referral actually being active.
  `validate.js` fails if the conditional is removed, and `test-ui.js` asserts exactly one sponsored
  link — so this cannot silently return.
- **FIXED — a 404 on every page load** from the missing `/favicon.ico`. Added an inline SVG favicon
  in the theme's colours, so there is no extra request and no console error.

**Also:**
- **ADDED a Hosting section to `README.md`** covering the two origins, why they are split, the
  cross-origin requirement, and the 10-minute Pages cache.
- **CHANGED `test-ui.js`** to derive the expected offer count from `data.js` instead of a hardcoded
  42, with a separate floor check so a silent data loss still trips it. 22 assertions, all passing.
- **CHANGED `validate.js`** to fail if `rel="sponsored"` stops being conditional.

**Notes for the next run:**
- The data repo is a **separate working tree**. Pushing `data.js` there is what makes a refresh
  visible; editing only the local copy changes nothing on the public site.
- Pages caches the data file for 10 minutes. Do not assume a refresh is instantly live.
- `test-ui.js` forces local mode via `addInitScript`. If you want to test the deployed page, use
  the live URL directly — do not repoint `RADAR_DATA_URL` in the repo.
- **The referral link is now public.** WorkBuddy's terms mark public posting as `unclear`, and the
  programme window closes **30 September 2026**. Re-check both.

---

## 2026-09-29 (third pass — multi-select filters)

Hand edit to the **presentation layer** (`index.html`). The daily refresh job must not touch this
file — this change was made deliberately by hand and should be preserved.

- **CHANGED — filters are now multi-select.** They were single-select before: clicking a chip
  replaced the previous one. Now any number can be active at once.
- **Defined the combination semantics**, which is the part that actually matters:
  filters are grouped into dimensions (`kind`, `card`, `time`, `ref`). Within a dimension the
  selected chips **OR**; across dimensions they **AND**. So *Portable key + Keyless* widens the
  result, while *Portable key + No card* narrows it. Without this split, multi-select on a
  mutually-exclusive `kind` field would be meaningless.
- **ADDED a reset affordance.** The first chip reads `All` when nothing is selected and switches to
  `Clear n` with an amber outline once filters are live — previously the way out was not obvious
  once several chips were on.
- **ADDED `aria-pressed`** on every chip, a `role="group"` + `aria-label` on the container, and a
  `:focus-visible` ring. Keyboard and screen-reader users can now tell which filters are active.
- **ADDED an inline hint** under the chips explaining that they combine, with a concrete example.
- **ADDED `test-ui.js`** — a real-browser regression test, 17 assertions, all passing. It verifies
  the semantics in the DOM rather than in the source: OR within a dimension, AND across, the
  complementary `refonly`+`noref` pair, the Clear affordance, `aria-pressed` state, and that search
  composes as an AND. Skips cleanly if Playwright is unavailable.
- **Also in this pass:** verified the WorkBuddy and MiniMax referral terms from primary sources and
  corrected `REFERRALS.md` (see the entry below). Added `validate.js` as a permanent replacement for
  the deleted throwaway `_check.js`, extended to check rail day keys, rail chip values, required
  offer fields, duplicate ids and `end` date format.

**Notes for the next run:**
- `index.html` now carries the multi-select filter logic. Do not regenerate it. If a future run
  needs a filter changed, edit `index.html` by hand and re-run `test-ui.js`.
- `test-ui.js` asserts the baseline of 42 offers. If the offer count changes, update that assertion
  — it is intentionally hardcoded so a silent data loss trips the test.

---

## 2026-09-29 (second pass — referral verification)

Verified the three programs previously recorded as `unknown`. Two of them moved.

- **CHANGED — WorkBuddy — `unknown` → `live`.** Verified from the official event page
  (workbuddy.cn/events/invite). Inviter gets **50 points** on the referred user's first use, **+100**
  if they use it on 3 days within 7 days. Referred user gets **2,000 points**. Both get **+500** on a
  paid upgrade within 30 days. **Pays on free usage** — no purchase required.
  **WINDOW: runs to 30 September 2026.**
- **CHANGED — MiniMax — `unknown` → `paid-only`.** Verified from the official Token Plan FAQ
  (platform.minimax.io/docs/token-plan/faq). Inviter gets credits equal to **10% of the amount
  actually paid**, expiring in 90 days and usable only against MiniMax API fees. Referred user gets
  **10% off** at checkout. Payout requires a paid order.
- **UNCHANGED — B.AI remains `unknown`.** No readable primary terms page. Do not publish.
- **REMOVED a wrong claim from REFERRALS.md** — it said QoderWork CN was "the only program" that
  fits a free-tier audience. WorkBuddy also does. Corrected.
- **ADDED `validate.js`** — a permanent validator replacing the throwaway `_check.js`, which was
  deleted. It now also checks rail day keys, rail chip values, required offer fields, duplicate ids
  and `end` date format. Run it after every edit and as the last step of every refresh.
- **ADDED the archive snapshot** `archive/data-2026-09-29.js` (md5 `9f213767…`, identical to
  `data.js` at time of writing).

**Verified this run:** WorkBuddy event page (workbuddy.cn/events/invite), the older
copilot.tencent.com/fission campaign page (confirmed ENDED — do not cite), MiniMax Token Plan FAQ
(platform.minimax.io/docs/token-plan/faq).

**Notes for the next run:**
- **WorkBuddy's window closes 30 Sep 2026 — check it first.** If it has ended, either mark it
  `dead` or find the successor campaign; Tencent has already run at least two versions of this.
- `copilot.tencent.com/fission/` is a **different, ended** campaign with different numbers
  (100 Credits/invite, 3,000 for the invitee). Search results still surface it. Do not merge the two.
- MiniMax's program is quoted with several conflicting end dates across third-party blogs. The FAQ
  is the only source to trust.
- Both live programs pay in **platform credits, not cash**. Keep that honest in any public copy.

---

## 2026-09-29

Initial build. Data migrated from the exploratory research pass earlier the same day.

- **Added 42 offers** across four categories — 21 portable/keyless, 10 client-bound, 11 cloud credits.
- **Added freshness rail** with three groups (today / yesterday / closed this week).
- **Added referral layer** — programme data for 6 programmes, `YOUR_LINKS` left empty so no link is
  tracked. Disclosure banner adapts to that state and says so plainly.
- **Added `REFERRALS.md`** documenting programme terms, payout conditions and compliance obligations.

**Carried-over corrections from the research pass:**
- Qoder's Qwen3.8-Flash free period was **extended** past 30 September. Confirmed on both
  docs.qoder.com (international) and docs.qoder.cn (CN). My earlier "expires in 2 days" was wrong.
- Alibaba Bailian new-user grant is **70M tokens**, not the ~1M per model first reported.
- Zhipu AutoClaw newcomer gift is now **200M tokens / ¥120** and marked limited-time with a live
  countdown, not the 100M / ¥60 / long-term figure previously reported.
- GitHub Models confirmed **retired 30 July 2026** — still listed as active on several aggregator sites.

**Referral findings — three things that constrain this project:**
- Qoder's **international** referral programme **ended 30 January 2026** per its own terms. Recorded
  as `dead` and flagged in the UI.
- Z.ai's programme is **paid-only** — the referred user must buy a subscription, and 3 paying
  referrals are required before any payout is released. Recorded as `paid-only`.
- Only **QoderWork CN** pays on free-tier activity (200 Credits per referral; referred user must
  consume ≥1 Credit within 14 days). It is the only programme here that fits a free-tier audience.
- WorkBuddy, MiniMax and B.AI programmes are recorded as `unknown` — terms could not be read from a
  primary source. Do not publish those links until verified.

**Verified this run:** Qoder event docs (both locales), Z.ai credit campaign rules, QoderWork CN
referral terms, FTC affiliate disclosure requirements 2026, GitHub Models retirement changelog,
AMD Radeon Cloud portal, InceptionLabs quickstart, Gemini OpenAI-compatibility docs, Groq rate-limit
docs.

**Notes for the next run:**
- Re-verify `end` dates first — extension is the most common change and the easiest to miss.
- GMI Cloud Hy Image 3.5 free week closes **1 Oct**; Wenxin 4.0 and Hunyuan Hy3 close **30 Sep**.
- ZCode Trust Build claim window runs to **7 Oct**, but granted tokens expire the following midnight.
- `referrals.js` is hand-edited and is NOT rewritten by the refresh job. Preserve it.
