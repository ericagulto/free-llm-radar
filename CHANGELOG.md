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

## 2026-10-02 (d) — second refresh of the day; no new offers, one flagged discrepancy

**Offer count unchanged at 49.** No offer added, removed, extended or closed. This is the 08:00
scheduled run; the 01:35 run earlier today was (b). All existing `end` dates were re-checked before
looking for anything new.

**FLAGGED — `ai21` trial length is contested by AI21's own pages.** `ai21.com/pricing` says the $10
free trial is good for **7 days**; `docs.ai21.com/docs/usage-cost` says new accounts get a $10 credit
**good for three months**. Both read directly on 2 Oct. The two have not been reconciled, so the
published 7-day figure is left **unchanged** rather than flipped on one page — flipping it would turn
a row that reads "expiring" into one that does not, on evidence that contradicts itself. A `note` was
added recording both readings and stating what is certain: the clock runs from the reader's own
signup, so the row's `2026-10-06` is a **placeholder, not a deadline**. `added` bumped to 2026-10-02.
**Operator decision wanted:** `oci`, `azure` and `ai21` all now carry a placeholder date plus a note
saying so. That is three rows where `end` looks like a deadline and is not. Either the convention
needs a real `end: null` treatment or the rail needs to suppress placeholder dates — a refresh job
should not keep making that call per-row.

**Verified, no change.** `workbuddy.cn/events/invite` — still 即日起至2026年10月31日, and the invitee
bonus still reads 截止日期：2026年10月31日 (read directly). `docs.qoder.com/events/flashoffer` — still
free, end date still TBA. `vercel.com/changelog/…ling-3-1-flash…` — free to 13 Oct, unchanged.
`inference-docs.cerebras.ai/support/change-log` — the $5/30-day trial correction of this morning
still holds. Tracker-corroborated only (vendor pages not re-read this run): ZCode Trust Build,
MiniMax Code and GLM night-free all still to 7 Oct; Hunyuan Hy3 限免 + Hy4 night-free to 31 Oct with
night hours 23:00–08:00 and a 10 Oct last-start date.

**Tracker claim rejected — vendor wins.** Two CN trackers publish end dates for OpenCode Zen's free
models (Space Bunny "to 5 Oct", LongCat 2.5 "to ~10 Oct"). `opencode.ai/docs/zen` states only
"limited time" for all ten free models and gives **no** end date. The data is left as-is.

**Considered and deliberately NOT added (4).** (1) **apmix `gpt-6-luna-free`** — a 10B-token *shared*
pool opening 2 Oct 17:00 UTC, from a reseller. No per-user allocation, and nothing outside the
reseller's own blog corroborates it. (2) **Laya** (`convaiinnovations/laya`) — genuinely free on
Vercel AI Gateway to 31 Oct, verified on Vercel's own model page, but it is a structured-decision /
evaluation model that returns typed answers and does not generate text — outside a free-*LLM* list.
(3) **xAI Grok $25 signup credit** — reported by trackers, but `docs.x.ai` shows no free credit and
the secondary sources disagree with each other ($25 signup vs $150–175/month data-sharing). Not
verifiable from a primary source. (4) **DeepSeek 5M new-user tokens** — `api-docs.deepseek.com`
pricing mentions a "granted balance" but publishes **no** amount; the 5M figure appears only on
third-party pages. Also not added: Kuaishou StreamLake KAT-Coder-Air (its free-API claim cites a
model version the vendor marks 已下线; no free pricing on the vendor's own docs).

**Referral terms re-checked — `referrals.js` NOT touched.** `zai` unchanged (10% / 72h / 3-referral
payout threshold, terms last updated 15 Mar 2026). `qoderwork_cn` unchanged and still titled
【7月30日截止】 on a docs site the vendor itself flags as outdated. `workbuddy` — the reward structure
on the live event page matches `referrals.js` exactly (50 + 100 + 500), so nothing to correct; but the
programme `note` still says "the event runs to 30 September 2026" and that is now **stale by a
month**. Third run running that this has been flagged. It is a hand-edit, so it is reported, not made.

**Tooling anomaly — the publisher's own log line lied, in the reassuring direction.** `publish.sh`
step 3 printed `No data change — nothing to push.` on this run **while the same run created and pushed
data commit `d63dfa6`**. Cause: Windows `core.autocrlf` — `git diff` is blind to line-ending-only
differences that `git add`/`commit` still record, so `sync-data.sh`'s idempotency check can report a
no-op that did not happen. The dangerous direction is exactly this one: a future run reads "nothing to
push", concludes the refresh never landed, and either re-does it or reports a failure that did not
occur. **Verify publishes from the remote, not from the script's output:**

```bash
git -C deploy/data-repo log --oneline -1 origin/main     # is the new commit there?
git -C deploy/data-repo log --oneline origin/main..HEAD  # empty = fully pushed
curl -s "https://ericagulto.github.io/free-llm-radar-data/data.js?cb=$(date +%s)" \
  | grep -o "updated: '[^']*'"                           # the deployed value, not the local one
```

Also noted: `sync-data.sh`'s header comment still says a data push means "the site never has to be
redeployed". That was true before the per-offer pages existed and is **not** true now — AGENTS.md
corrects it, the script comment was never updated. Left alone rather than edited on a refresh run.

**Next run must handle:** AI21 (see above) · DeepSeek Harness ~6 Oct · ZCode Trust Build / MiniMax
Code / GLM night-free 7 Oct · Ling 3.1 Flash 13 Oct · Hunyuan Hy4 last start 10 Oct · Doubao ~17 Oct ·
Hunyuan + WorkBuddy 31 Oct · Laya promo 31 Oct. **`content.js`'s `wenxin` entry still needs a human
hand edit** — it says "Both halves close 30 September". Fourth run running. A refresh is forbidden
from writing `content.js`, so it will never self-heal.

---

**Not a refresh — a presentation change.** Offer count unchanged at 49.

**Why.** The `reach` work earlier today made the China-only offers *filterable*, but they still
rendered in the main list by default. For this audience that is still wrong: 11 of 49 offers need a
mainland account, phone number or real-name verification, so they cannot be claimed at all — and
because the dated rows skew Chinese, they were dragging the expiry rail down with them. Operator's
call: put them on a separate tab and open on the main one.

**What changed.**

- **Tab bar above the controls**: `Offers (38)` / `China-only (11)`. The dashboard **opens on
  `Offers`**, so the cn-only rows are hidden by default. Tab scoping is applied *before* the filters,
  so the metric strip, the count and the chips all agree with the tab you are looking at.
- **The `China-only` filter chip is gone** — the tab supersedes it. The `Sign up anywhere` chip
  remains, and now only ever has work to do when you are on the China tab.
- **The main tab states what it is hiding** (`Main list hides 11 offers that need a mainland Chinese
  account`) so the gap between the tab label and the rail is never unexplained.
- Switching to the China tab **clears the `global` chip**, which would otherwise silently blank the
  list.
- The tab hides itself entirely if no cn-only offers exist, rather than showing an empty one.

**Two bugs found and fixed while doing this**, both worth recording:

1. **Temporal dead zone.** `scoped` was declared *after* the metrics block that calls it, so the page
   threw `ReferenceError: Cannot access 'scoped' before initialization` and rendered an empty
   dashboard. Moved the tab state above the metrics block. Caught by loading the page in a browser —
   it would not have been caught by reading the diff.
2. **The featured referral block followed the wrong tab.** It rendered on the **China-only** tab
   (where the reader cannot use it) and vanished from the **main** tab (where they can). Fixed by
   scoping it to the active tab like the table is. This exposed a **product conflict rather than a
   bug**: the only active referral link belongs to `workbuddy`, which is `cn-only`, so hiding
   cn-only by default also hides the site's only monetised placement. **Reported to the operator —
   the resolution is a referral-programme decision, not a code change.** `referrals.js` NOT touched.

**Test fallout, all resolved.** Three assertions had assumed the full dataset was rendered, and one
referral-block assertion timed out waiting for markup that no longer exists on the default tab:

- `EXPECTED` now means "what the default tab renders"; the raw count is `EXPECTED` and the tab count
  is `EXPECTED_MAIN`. Both are exposed so the distinction is visible to the next editor.
- The largest-grant sort assertion was scoped to the main tab (the overall max, WeChat, is cn-only).
- The `rel="sponsored"` and featured-block assertions now switch to the China tab first — on the main
  tab they would otherwise have found zero sponsored links and **passed vacuously**.
- 7 new assertions cover the tab split: main excludes every cn-only offer, china shows exactly those,
  the two partition the dataset, labels match counts, the strip changes with the tab, the main tab
  explains the hidden count, and no cn-only referral block sits on the main tab.

`validate.js` exit 0 · `test-validate.js` **19/19** · `test-ui.js` **97/98** (sole failure remains the
pre-existing `dropdown name sort is alphabetical` harness bug) · mobile fold still passes at 360px
and 390px.

**Rollback:** restore `index.html` from git (`3160e20` or earlier) and the previous `data.js` from
`archive/data-2026-10-02.js`. The tab change is entirely in `index.html`; `data.js` is unaffected.

---


**Not a refresh — a schema and UI change**, made deliberately rather than by the daily job. The
offer count is unchanged at 49.

**Why.** The audience for this list is not primarily Chinese, but 21 of 49 offers (43%) were
mainland-oriented, and 14 of the 28 client-bound/credit rows were China-gated. Worse, the dated rows
skewed that way: 13 of 21 CN rows carried an `end` date against 7 of 28 international ones — so the
expiry rail, which is the first thing a reader sees, was disproportionately full of promotions they
could not claim. The only signal was a passive "CN direct" tag, and nothing in the sort or filter
could act on it.

**The change.**

- **`reach` added to every offer** — `global` (28) | `cn-direct` (10) | `cn-only` (11). `cn-only`
  means a mainland account, phone number or real-name verification is required, so the offer is
  effectively unclaimable from outside. The old `china` boolean is **kept for compatibility** but no
  longer drives anything. Documented in the `data.js` schema header and in `AGENTS.md`.
- **Two new filter chips** on the dashboard: **"Sign up anywhere"** and **"China-only"**. They form a
  `reach` dimension that ORs internally and ANDs with everything else, like every other dimension.
  *Default behaviour is unchanged* — nothing is hidden unless the reader asks for it.
- **The row badge is now honest.** Previously `china: true` rendered "CN direct" even for
  mainland-gated rows, so Baidu Wenxin and Doubao were labelled as though reachable. Now `cn-only`
  rows carry a red **"CN only"** badge with a tooltip, and `cn-direct` rows keep the neutral one.
- **Offer pages state reach as a fact** ("China-only — mainland account required").
- **`validate.js`** requires `reach` on every offer, rejects unknown values, and fails if a `cn-only`
  offer carries `china: false`.
- **`test-ui.js`** gained 7 assertions covering the new dimension, including the one that matters:
  *no cn-only offer survives the "sign up anywhere" filter*. 93/94 now (the one failure is the
  pre-existing `dropdown name sort is alphabetical` harness bug — unchanged from before this work).
- **`test-validate.js`** gained 3 breakage cases: unknown `reach`, missing `reach`, and the
  `cn-only` + `china:false` contradiction. **16/16 → 19/19 caught.**

**Classification notes, for the next person setting `reach` by hand.** Z.ai/GLM is `cn-direct`
(region-aware routing, no KYC — verified). ModelScope and SiliconFlow are `cn-only` despite having
English UIs: both require **real-name verification (实名认证)**. Ling 3.1 Flash is `cn-direct` even
though Ant is the vendor, because the free access runs through **Vercel AI Gateway**, a US platform.

**One regression introduced and fixed during this work.** The two extra chips cost a wrapped row on
narrow screens, pushing the first offer from ~1119px to 1173px and tripping
`mobile 360px: the first offer is within 1.5 screens` (threshold 1152px). Fixed by hiding the
`.chiphint` line below the mobile breakpoint, which is explanatory text rather than a control —
measured back down to 1119px. Caught by the test, not by review.

**Not changed:** `index.html`'s default sort and default filter state. The CN rows still appear on
load; the reader opts out rather than in. If the operator wants global-first by default, that is a
one-line change to `PRESETS.fresh` or the initial `activeFilters` — but it is a product decision and
was left alone.

---


47 → 49 offers. 49 pages generated. `validate.js` exit 0, `test-validate.js` 16/16.

- **CORRECTION — Cerebras was never a recurring 1M-tokens/day free tier.** This is the important
  line. The row has carried `budget: 1000000 / unit: tokens/day` and a placeholder `end: 2026-10-29`
  since the first pass, sourced from third-party trackers. Cerebras' own documentation says
  otherwise: the open rate-limited free tier was **replaced by a $5 trial credit that expires 30 days
  after the grant**, requires a **verified payment method** before Playground or API access
  activates, and the vendor states outright that it *"doesn't currently offer a no-cost tier that
  renews automatically or a per-model always-free allowance."* Sources: `inference-docs.cerebras.ai/support/rate-limits`
  (read directly) and the change-log entry dated **2026-07-16**. The change was live for two and a
  half months before this run — a reminder that the tracker lists this project uses for breadth are
  unreliable on exactly the retirements they should catch (cf. GitHub Models, retired 30 July 2026,
  still listed). `budget` → `0`, `unit` → `$5 one-time`, `end` → `null` (the 30-day clock starts at
  the *grant*, so a calendar date is meaningless), `status` → `expiring`, `added` → `2026-10-02`,
  and the model roster trimmed to the two models the vendor's free-trial table actually lists.
  `content.js`'s `cerebras` entry rewritten to match — its `documented` citations had been asserting
  the retired allowance as fact.
- **ADDED — Ling 3.1 Flash (`ling31`).** Ant InclusionAI's new coding/agent model (~560B total, ~25B
  active), released 30 September 2026, free at $0.00 in and out through **Vercel AI Gateway** and
  **Command Code** to **13 October 2026**. Verification level: **official** for the gateway promo —
  read from Vercel's own changelog, which also states the two-ID behaviour (standard ID begins
  billing at the end; `-free` ID stops serving). Command Code's model page confirms $0.00 pricing and
  a ~300 req/day/account cap. Note this is a *gateway* promotion of a vendor model, not an Ant
  first-party free tier — Ant has published no free allowance of its own. New `content.js` entry added.
- **ADDED — DeepSeek Harness (`dsharness`).** ¥6 credit on login to DeepSeek's own desktop harness,
  released 29 September 2026, Windows and macOS only. Window reported to about 6 October.
  Verification level: **multi-source** — the 29 Sep launch announcement as carried by Sina Tech,
  Sohu and Chinese tech press; **not** documented on DeepSeek's own pricing page. New `content.js`
  entry added, flagged as thin coverage.
- **Idempotency:** `doubao` cleared from `status: 'new'` to `active` — it was added on the tenth pass,
  so `new` no longer applies. Rail's `today` group replaced with 2 Oct and the previous groups
  shifted down; the 1 Oct entries were consolidated into the `yesterday` group.
- **Re-verified, unchanged:** `glmnight` night-free still confirmed **23:00–09:00 to 7 Oct** on
  `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash` (read directly). `qoder` still free
  with no published end date on `docs.qoder.com/events/flashoffer`. `workbuddy` invite page still
  reads 即日起至2026年10月31日 and the ¥0 体验版 is still 限时免费 on `/pricing/`. `minimaxcode`
  double check-in still 28 Sep–7 Oct. `ai21` $10/7-day trial unchanged. `zcode-trust` claim window
  still 28 Sep–7 Oct.
- **Referral terms:** no changes to report. `referrals.js` **not** touched. The two previously
  reported issues stand: the `workbuddy` note in `referrals.js` still says the event runs to 30 Sep
  (now stale — vendor says 31 Oct), and `qoderwork_cn`'s terms page is still titled 【7月30日截止】
  and points at a moved docs site. Both are operator decisions.
- **Not added, deliberately:** Baidu Qianfan's National Day Token Plan packages (¥49.9/¥99.9 to
  7 Oct) — a paid discount, not a free tier, and this dataset does not track those. ChatGPT Pro 200
  compensation credits (to 31 Dec) — subscriber-gated, no free route in. MiniMax M Plan half-price
  first month (to 14 Oct) — again a paid discount.
- **Next run must handle:** AI21 $10 closes 6 Oct; DeepSeek Harness ~6 Oct; ZCode Trust Build,
  MiniMax Code and GLM night-free all close 7 Oct; Ling 3.1 Flash closes 13 Oct; Hunyuan Hy4 last
  start date 10 Oct; Doubao ~17 Oct; Hunyuan night-free and WorkBuddy invite 31 Oct.
  **`content.js`'s `wenxin` entry still needs a hand edit** — it says "Both halves close 30 September",
  which stopped being true on 30 Sep. Carrier from earlier: the `oci`/`azure` `end: 2026-10-29` dates
  are activation-relative placeholders, not per-user deadlines — do not report them as deadlines.

---


46 → 47 offers. **Two previously published deadlines were wrong as of this morning** — both moved
in the vendors' favour, which is the direction that gets missed.

- **CORRECTION — WorkBuddy invite bonus extended, 30 Sep → 31 Oct.** The ninth pass recorded the
  2,000-point new-user bonus as closing 30 September and left `workbuddy` at `status: expiring`.
  The vendor's own invite page now reads 即日起至 2026年10月31日, and the bonus itself carries a
  31 October deadline. Source: `workbuddy.cn/events/invite` (read directly). `end` → `2026-10-31`,
  `status` → `extended`, `added` → `2026-10-01`. The ¥0 体验版 tier is still marked 限时免费 on
  `workbuddy.cn/pricing/` — re-checked, not assumed dead.
- **CORRECTION — Hunyuan Hy3 限免 and Hy4 preview night-free extended, 30 Sep → 31 Oct.** The ninth
  pass recorded "both Wenxin 4.0 and Hunyuan Hy3 close tonight, 30 Sep". They did not both close.
  A joint WorkBuddy/Hunyuan announcement on 30 September pushed the Hy3 限免 window and the Hy4
  preview night-free window to **31 October**. `hunyuan` `end` → `2026-10-31`, `added` → `2026-10-01`.
  The 10 October last-start date for the new-user 14-day quota is unchanged, and the night window is
  still 23:00–08:00. Verification level: **multi-source** — the announcement as carried by Tencent
  News (`news.qq.com/rain/a/20260930A0B2GF00`), inews.qq.com, MSN China and Sohu. The vendor's own
  event page was not reachable directly, so this rests on reporting of the announcement.
- **EXPIRED — Baidu Wenxin 4.0 (`wenxin`).** The free window on the Wenxin 4.0 line ran through
  30 September and reverted to paid on 1 October. Source: Chinese-language round-ups of the 30 Sep
  expiry wave, plus the September free-quota calendars. The offer row is **kept**, not deleted —
  `warn` and `budgetNote` now state the closure plainly and point the Hunyuan Hy3 half at the
  `hunyuan` row, where it is still live. Recorded in the rail `closed` group as `dead`.
- **ADDED — Doubao (`doubao`)** — 30 free days of the Standard plan for every user, free and paying
  alike, claimed by downloading or upgrading the desktop client. Campaign reported to run to
  17 October 2026. Client-bound consumer app; **no API key**. Verification level: **multi-source**
  (ByteDance's 24 September announcement as carried by Tencent News, Sohu, Chinaz and others). The
  vendor's own campaign page was not read directly, and the `warn` field says so. New `content.js`
  entry added.
- **CHANGED — `glmnight`** gained the precise window and the eligibility rule that was previously
  only in the rail: **23:00–09:00 Beijing time, paid Coding Plan subscribers only, ZCode 3.10+ or
  AutoClaw, 5-hour/week cap**. Source: `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`.
  This matters — the row read as though any user could use it. No date moved (7 Oct confirmed).
- **RE-VERIFIED, no change** — Qoder Qwen3.8-Flash (still free, still no announced end date,
  `docs.qoder.com/events/flashoffer`); GMI Hy Image 3.5 free week (25 Sep → 1 Oct, closing today,
  `gmicloud.ai/hy-week`); ZCode Trust Build (28 Sep → 7 Oct); MiniMax Code (to 7 Oct); AI21 (to 6 Oct).
- **FIXED — eight stale `status: 'new'` flags.** `kilo`, `stepfun`, `opencodezen` (all added 30 Sep)
  and `zcode-trust`, `minimaxcode`, `inkstone`, `manus`, `bailian` (all added 29 Sep) were still
  carrying `new` into today's run. The idempotency rule says `status: 'new'` applies **only** on the
  run where an offer first appears, so all eight are now `active`; `doubao` is the only `new` offer
  today. This also removes a badge the generated pages were still rendering for those eight.
- **RAIL** — new `today` group for 1 Oct; 30 Sep shifted to `yesterday`; 29 Sep shifted to `week`.
  Two items were dropped from the shifted 30 Sep group because their claim ("both close tonight")
  is now known to be false — the corrected outcomes are in today's group.

**Known failing test — NOT caused by this run, NOT fixable from data.** `test-ui.js` reports
**86/87**; the failure is `dropdown name sort is alphabetical`. It is a harness bug, and it was
already present in the previously published data — `git show cfc777d:data.js` fails the same
assertion at the same pair. Cause: the assertion reads `.row .nm`, whose `textContent` is
`name + sub + status tag`, while the dashboard sorts on `name` alone. `OpenCode` is a strict prefix
of `OpenCode Zen`, and ICU collation orders the space in `"OpenCode Zen"` *before* the letter in
`"OpenCodeNew-model…"`, so the two orderings disagree. The pair was created on 30 September when
`opencodezen` was added alongside `opencode`. The fix belongs in `test-ui.js` — compare against
`.nml` (the anchor that holds the name alone) rather than `.nm` — and `test-ui.js` is off-limits on
an automated run. Left for the operator; the publish path is unaffected because `publish.sh` does
not run `test-ui.js`.

**Next run needs to know.** (1) `wenxin` is closed but **kept in `offers[]`** because the status
enum has no `closed` value; it carries `status: 'expiring'` with a past `end`. If a cleaner
convention is wanted, that is an operator decision, not a refresh decision. (2) **`content.js`'s
`wenxin` entry needs a hand edit** — its `foreverNote` still says "Both halves close 30 September"
and its `what` still describes Hy3 as an overflow option. The refresh job does not rewrite prose, so
this was left alone deliberately. (3) GMI closes today; ZCode Trust Build, MiniMax Code and GLM
night-free all end 7 Oct; AI21 ends 6 Oct; Hunyuan's last-start date is 10 Oct. (4) Not added, on
purpose: Anthropic's Claude Code cloud-session credits (Pro $100 / Max $250, claim by 7 Oct, balance
expires 4 Nov) — real and well-sourced, but **restricted to Pro/Max subscribers who already held a
subscription on 23 September**, so a free-tier reader cannot act on it. Operator's call whether the
directory should carry paid-subscriber-gated offers.

**Trap re-confirmed.** Three independent trackers (igetoken, freetokens.custats.info, the Zhihu
round-up) now describe ZCode Trust Build as "100M tokens **per day**". Zhipu's own page describes a
**single** ~100M allocation with a daily claim cap of 100,000 users. Vendor wins; the stored figure
is unchanged for the third run running.

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
