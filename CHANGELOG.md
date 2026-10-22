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

## 2026-10-22

- **NO DEADLINE CHANGES.** Every published `end` date re-read and every one was where the 21 October
  run left it: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止
  31 October, tiers 50 / +100 / +500, rendered in Chromium), `workbuddy.cn/pricing` (体验版 still
  限时免费), `docs.qoder.com/events/flashoffer` **and** `docs.qoder.cn/events/flashoffer`
  (Qwen3.8-Flash still free, end date still to be announced, both locales agreeing),
  `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD),
  `developers.cloudflare.com/workers-ai/platform/pricing/` (10,000 Neurons/day, page updated
  **20 October**), `ai21.com/pricing` (still **7 days** against the docs' three months,
  **twenty-first check, not flipped**), `docs.z.ai/devpack/credit-campaign-rules` (unchanged, last
  updated 15 March 2026), `kilo.ai/landing/free-models` (counter still **6**, and the same six ids),
  `opencode.ai/docs/zen` (**14** free models, membership changed). Hunyuan Hy3 限免 + Hy4 night-free
  still **31 October**, still multi-source only.
- **CHANGED, `opencodezen`: the count held at 14, the membership did not.** `ll-alpha-free` has left
  Zen's pricing table and **`flint-40b-free`** has replaced it. `models` and `note` rewritten, and
  `warn` now states that Flint is **not** zero-retention (prompts may be used for training, retained
  30 days). Fifth consecutive check where the headline number stayed put while the roster moved.
  The endpoint `opencode.ai/zen/v1/models` returns **86** ids and does carry `flint-40b-free`, but
  still omits `exo-free`, `mimo-v2.5-free` and `nemotron-3-ultra-free`, so the docs page stays
  primary.
- **CHANGED, `openrouter`: 20 → 21 ids at $0.** `openrouter.ai/api/v1/models` returns **468** models,
  unchanged for two days, with **21 at $0**. The addition is **`recursive/flint-v1.0:free`**,
  `created` 21 October, the same model Zen added today as Flint 40B Free. Two independent vendor
  catalogues listing it within a day is a stronger signal than either alone. Two of the 21 are Lyria 3
  music models, so the text count is 19. All four ids the row names survived.
- **CHANGED, `cloudflare`: the paid-billing-method list grew from six ids to eight.**
  `@cf/moonshotai/kimi-k2.7-code` and `@cf/zai-org/glm-5.3-flash` now require a paid billing method
  or prepaid AI Gateway credits. `warn` and `note` rewritten to name all eight. `glm-5.3-flash` is
  the trap: the name reads like a free-tier pick and it prompts for a card. Allowance and the row's
  three model ids unchanged.
- **RE-SWEPT, no change:** `nvidia` 83 ids (first quiet sweep in five), `sambanova` 6,
  `indextranslate` 7. `note` on `nvidia` records the quiet sweep rather than leaving it ambiguous.
- **TRACKER CLAIMS REJECTED, vendor wins (three).** Qoder CN "DeepSeek-V4.1-Flash-1017 限免至
  10月24日" (igetoken: 25 October 00:00) and "Qwen3.8-Flash 限免至 10月31日": Qoder publishes
  **neither date** on either locale, its event page states the free offer covers Qwen3.8-Flash only,
  and no DeepSeek event page exists at any URL probed. Kilo "16 free models" (vendor **6**), Zen
  "15 free models" (vendor **14**). None written to `data.js`.
- **NO OFFERS ADDED.** Candidates seen and not shipped: 云知声 U2-Flash (Unisound MaaS, activity-period
  0元 unlimited, third-party only) and Inception Labs Mercury 3 (100M tokens per new account). Both
  are blocked by the same rule as every prior run: a new offer needs a `content.js` entry and a
  refresh must not write that file. WorkBuddy CN × Step 5 Preview (to 25 October) remains
  tracker-and-press only.
- **RAIL:** new `Today · 22 Oct` group (5 items), 21 Oct shifted to `Last run · 21 Oct` (6), 20 Oct to
  `Earlier · 20 Oct` (5), 16 Oct group dropped, `closed` kept (11). The separate AI21 item was folded
  into the no-deadline-changes item rather than repeated as its own line.
- **Referral terms:** `referrals.js` **NOT touched**. Z.ai terms re-read, unchanged. Two known stale
  items stand, **reported not edited**: `workbuddy` note says 30 Sep; `qoderwork_cn` titled
  【7月30日截止】.
- **Notes:** `publish.sh` used again, not `sync-data.sh`, because `offers/` and `history.html` only reach the
  site via the site push, so the automation prompt's "sync-data.sh is the only step needed" remains
  wrong. `content.js`'s `wenxin` entry still says "Both halves close 30 September", **21st run
  flagged**, and it will never self-heal. `oci`/`azure` (29 Oct) and `ai21` dates are
  activation-relative placeholders, never deadlines.

---

## 2026-10-21

- **NO DEADLINE CHANGES.** Every published `end` date re-read and every one was where the 20 October
  run left it: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止
  31 October, tiers 50 / +100 / +500, rendered in Chromium because the page is client-side),
  `workbuddy.cn/pricing` (体验版 still 限时免费 at 500 积分/month), `docs.qoder.com/events/flashoffer`
  **and** `docs.qoder.cn/events/flashoffer` (Qwen3.8-Flash still free, end date still to be announced,
  both locales agreeing), `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD),
  `developers.cloudflare.com/workers-ai/platform/pricing/` (10,000 Neurons/day, page updated
  **20 October**), `ai21.com/pricing` (still **7 days** against the docs' three months, **twentieth
  check, not flipped**), `docs.z.ai/devpack/credit-campaign-rules` (10% of first order, 3-referral
  payout threshold, last updated 15 March 2026), `kilo.ai/landing/free-models` (counter still **6**),
  `opencode.ai/docs/zen` (still **14** free models, still no end dates). Hunyuan Hy3 限免 + Hy4
  night-free still **31 October**, multi-source only: the Tencent billing doc read today covers the
  1M-token API resource pack, not the WorkBuddy night-free window.
- **CHANGED, `nvidia`: 81 → 83 ids.** `integrate.api.nvidia.com/v1/models`, keyless, now returns
  **83**. All four ids on the row (`z-ai/glm-5.3`, `z-ai/glm-5.3-flash`, `moonshotai/kimi-k2.6`,
  `deepseek-ai/deepseek-v4.1-flash`) are still served, so the row and its test command stand. The
  endpoint stamps every entry with the same placeholder `created` value, so the two additions cannot
  be named from the payload: the count is the finding, and the `note` says so rather than guessing.
  Third consecutive sweep to produce a correction here.
- **CHANGED, `indextranslate`: one model id → SEVEN.** The keyless endpoint
  `index-translate.bilibili.com/v1/models` returns **Index-Translate-35B-A3B** plus **-9B**, **-2B**,
  **Index-Nailong-9B**, **Index-Nailong-2B**, **Index-Homura-9B**, **Index-Homura-2B**, all 24,576
  context and all described by the vendor as translation models. The row's `budgetNote`, `models`,
  `warn` and `note` were rewritten. Only 35B-A3B is documented on the public site, so the other six
  are recorded as served-but-undocumented. No rate limit and no end date published anywhere.
- **CHANGED, `cloudflare`: `@cf/qwen/qwen1.5-7b-chat` has left the model directory.** Its model page
  now redirects to the Workers AI directory with an `unavailable` marker and the id is absent from
  the listing, so the row carries **`@cf/qwen/qwen3-30b-a3b-fp8`** in its place. Allowance itself is
  unchanged at 10,000 Neurons/day. The pricing page rewritten on 20 October adds a new trap, now in
  `warn`: **seven models on that page require a paid billing method** (`@cf/moonshotai/kimi-k2.6`,
  `@cf/zai-org/glm-5.2`, `glm-5.3`, `@cf/deepseek-ai/deepseek-v4-flash-0731`,
  `deepseek-v4.1-flash-1017`, `deepseek-v4-pro-0813`), so the free allocation does not reach them.
- **CHANGED, `openrouter`: catalogue 470 → 468, still 20 at $0.** All four ids the row names survived
  the trim. Count steady over a shrinking catalogue is the rotation working underneath a number that
  looks stable, which is the argument the row's `warn` already makes.
- **Endpoints swept:** openrouter 468 / 20 at $0 · nvidia 83 (changed) · sambanova 6 (unchanged) ·
  bilibili 7 (changed) · zen endpoint 86 (still lags the docs page).
- **Tracker claims rejected, vendor wins:** token-fbi's "Qoder CN Qwen3.8-Flash 限免至 10月31日" (the
  vendor page publishes no date and says the end will be announced in advance), "Kilo Code 16 free
  models" (vendor counter reads 6), "OpenCode Zen 15 free models" (vendor docs table reads 14).
  None written to `data.js`.
- **NO OFFERS ADDED, none removed.** `igetoken.com/rss.xml` has nothing newer than 19 October. Two
  new candidates were seen and **left out because neither has a vendor page that was read**: 智谱
  AutoClaw login credits (10/20–10/25, 500 Credits/day, plus a 2亿-token v2.1.0 grant to 10/21) and
  云知声 U2-Flash (free and unlimited during the campaign). Both are third-party only today. A new
  offer also cannot ship without a `content.js` entry, and a refresh must not write that file.
- **Referral terms:** `referrals.js` **NOT touched**. Z.ai terms re-read, unchanged. Two known stale
  items stand, **reported not edited**: the `workbuddy` note says 30 Sep, and `qoderwork_cn` is
  titled 【7月30日截止】.
- **Rail:** new `Today · 21 Oct` group (6 items), previous `Today · 20 Oct` became `Last run · 20 Oct`
  (5), `Last run · 16 Oct` became `Earlier · 16 Oct` (8), the 15 Oct group dropped, `closed`
  unchanged (11). Item counts asserted before writing, and every `ref` carried forward.
- **Notes for next run:** nothing expires within 7 days. Nearest dated rows are **31 October**
  (Hunyuan, WorkBuddy), then **7 November** (`minimaxplat`, still unsourced) and **8 November**
  (`volcano`). `oci` / `azure` (29 October) and `ai21` are activation-relative placeholders, never
  report them as deadlines. `content.js`'s `wenxin` entry still says "Both halves close 30
  September" — **twentieth run flagged**, and a refresh cannot fix it.

---

## 2026-10-20 (08:35 pass)

- **NO DEADLINE CHANGES.** A second pass seven hours after the morning run. Every published `end`
  date re-read and every one was where the morning run left it: `workbuddy.cn/events/invite`
  (即日起至 **2026年10月31日**, invitee 2,000 积分 截止 31 October, tiers 50 / +100 / +500, rendered
  in Chromium), `workbuddy.cn/pricing` (体验版 still 限时免费 at 500 积分/month),
  `docs.qoder.com/events/flashoffer` (Qwen3.8-Flash still free, end date still announced in
  advance), `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD),
  `developers.cloudflare.com/workers-ai/platform/pricing/` (10,000 Neurons/day, page updated
  19 October), `ai21.com/pricing` (still **7 days** against the docs' three months,
  **nineteenth check, not flipped**), `docs.z.ai/devpack/credit-campaign-rules` (10% of first
  order, 3-referral payout threshold, last updated 15 March 2026). Hunyuan Hy3 限免 + Hy4
  night-free still **31 October**, multi-source only.
- **CHANGED, `kilo`: free counter five → SIX.** `kilo.ai/landing/free-models` now reads **6**
  free models after **MiniMax M3.1 Flash** was catalogued on 19 October. Row `models` gained
  **`minimax/minimax-m3.1-flash:free`** (id confirmed from the model page's own markup, not
  guessed), and `warn` plus `note` were rewritten. `added` moved to 2026-10-20 as a material
  change. The count has now gone six, five, four, five, six across five consecutive checks,
  which is the churn this rotating catalog produces in both directions.
- **RE-CHECKED, unchanged:** `opencode.ai/docs/zen` still lists the same **14** free models with
  no published end date; the Zen endpoint still lags at 85 ids; OpenRouter 470 models with
  **20 at $0** and the same ids as the morning run; NVIDIA 81; SambaNova 6; bilibili 1.
  `platform.minimax.io/docs/token-plan/faq` still covers paid plans only, so the `minimaxplat`
  row's 7 November date remains **unsourced** and was left alone.
- **NO OFFERS ADDED.** `igetoken.com/rss.xml` has nothing newer than its 19 October entry.
  WorkBuddy CN × Step 5 Preview (12–25 October) is still tracker-and-press only: the invite and
  pricing pages were both rendered and neither mentions it. A new offer cannot ship without a
  `content.js` entry, and a refresh must not write that file.
- **Referral terms:** `referrals.js` **NOT touched**. Z.ai terms re-read, unchanged. Two known
  stale items stand, **reported not edited**: the `workbuddy` note says 30 Sep, and
  `qoderwork_cn` is titled 【7月30日截止】.
- **Rail:** the existing `Today · 20 Oct` group was updated in place rather than a second group
  with the same label being prepended. `d` still obeys the today/yesterday/week enum.
- **Notes for next run:** nothing expires within 7 days; the next date is **31 October**
  (Hunyuan, WorkBuddy). `content.js`'s `wenxin` entry still says "Both halves close 30
  September" — **nineteenth run flagged**, and a refresh cannot fix it.

---

## 2026-10-20

- **ONE EXPIRY, NO OTHER DEADLINE CHANGES.** The Doubao 30-day Standard grant reached its published
  **17 October** end date and no extension had surfaced by 20 October, so that row now reads
  **CLOSED** rather than late. Verification stays **multi-source**: ByteDance never published a
  readable campaign page, and the 17 October date was always approximate. The row is kept on the
  list as a record, the same convention used for Wenxin and Ling 3.1. Every remaining published
  `end` date re-verified unchanged: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**,
  invitee 2,000 积分 截止 31 October, tiers 50 / +100 / +500), `workbuddy.cn/pricing` (体验版 still
  限时免费 at 500 积分/month), `docs.qoder.com/events/flashoffer` (Qwen3.8-Flash still free, end
  date still "announced on this page in advance"), `console.groq.com/docs/rate-limits` (30 RPM /
  1K RPD / 8K TPM / 200K TPD), `developers.cloudflare.com/workers-ai/platform/pricing/`
  (10,000 Neurons/day, page updated 19 October), `ai21.com/pricing` (still **7 days** against the
  docs' three months, **eighteenth check, not flipped**), `docs.z.ai/devpack/credit-campaign-rules`
  (10% of first order, 3-referral payout threshold, last updated 15 March 2026). Hunyuan Hy3 限免
  + Hy4 night-free still **31 October**, multi-source only.
- **CHANGED, `opencodezen`: 13 → 14 free models.** Read at `opencode.ai/docs/zen`. Four joined:
  **`glm-5.3-flash-free`** (reported 16 October), **`minimax-m3.1-flash-free`** (19 October),
  **`beam-free`** and **`ll-alpha-free`**. Three left: **`cat-jam-free`**,
  **`muse-spark-1.3-contributor-free`** and **`space-bunny-free`**. The last is a rename, not a
  withdrawal: Space Bunny was the anonymous slot, and MiniMax has now formally claimed it as
  M3.1 Flash, which is exactly what the 19 October tracker entry says. The `warn` zero-retention
  list was rewritten to name the four ZDR models (DeepSeek V4.1 Flash Free, GLM-5.3-Flash Free,
  MiniMax M3.1 Flash Free, LongCat 2.5 Preview Free) and to state that Beam Free does not train
  but retains prompts for 30 days and is geo-blocked in mainland China and Hong Kong. The endpoint
  `opencode.ai/zen/v1/models` returns 85 ids and still lags: it omits `exo-free`, `ll-alpha-free`,
  `mimo-v2.5-free` and `nemotron-3-ultra-free`. **Prefer the docs page.**
- **CHANGED, `kilo`: free counter back up to FIVE.** `kilo.ai/landing/free-models` now reads
  **5**, up from four, after **Nemotron 3.5 Super VL** was catalogued on 16 October. First rise
  in this count: it went six, five, four across September and early October. Row `models` gained
  `nvidia/nemotron-3.5-super-vl:free`; the warning and note were both corrected, and the note no
  longer implies the direction is one-way.
- **CHANGED, `openrouter`: 18 → 20 ids at $0.** `openrouter.ai/api/v1/models` returns **470**
  models. New free ids include `google/gemma-4-26b-a4b-it:free`, `google/gemma-4-31b-it:free`,
  `minimax/minimax-m3.1-flash:free`, `liquid/lfm-2.5-2.6b:free`, `poolside/laguna-s-2.1:free`,
  `thinkingmachines/inkling-small:free` and `xingchen-agi/xing4.0-29b-a4b:free`. Two of the
  twenty are Lyria 3 music models, not text, so the text count is 18. `added` NOT bumped.
- **Unchanged after a direct sweep:** `integrate.api.nvidia.com/v1/models` 81 ids,
  `api.sambanova.ai/v1/models` 6, `index-translate.bilibili.com/v1/models` 1.
- **NO OFFERS ADDED.** The only live candidate is **WorkBuddy CN x Step 5 Preview** (12 to 25
  October, 600B MoE), which igetoken reports and no `workbuddy.cn` page documents: the invite and
  pricing pages were both read and neither mentions it. Tracker-only, so not added. Standing
  candidates unchanged: SenseNova, Xiaomi MiMo, Atria Dawn, Verdent AI, AutoClaw, 联通云.
- **Idempotency: eleventh consecutive clean run, no stale `status:'new'`.** Rail rolled to
  **20 Oct today (5) / 16 Oct last run (8) / 15 Oct earlier (6)**, and the 14 Oct group dropped.
  Labels were changed from "Yesterday"/"Earlier this week" to dated labels because the previous run
  was four days ago and calling 16 October "yesterday" would be false. Refs 23 → 20, no dangling
  refs (`validate.js` passed).
- **Referral terms:** `referrals.js` **NOT touched**. WorkBuddy live structure (50/+100/+500,
  2,000 invitee, 31 October) still matches the file, re-read today. Z.ai terms unchanged. Two known
  stale items stand, **reported not edited**: the `workbuddy` row note says 30 September;
  `qoderwork_cn` is titled 【7月30日截止】.
- **Notes for the next run:** the 17 to 19 October runs did not happen, so this entry covers four
  days. `content.js`'s `wenxin` entry still says "Both halves close 30 September" (18th run
  flagged). `minimaxplat`'s `end` still has no vendor source: the Token Plan FAQ documents only
  paid plans. `oci`/`azure`/`ai21` dates remain activation-relative placeholders. The
  `test-validate.js` date-collision defect is still owed. Render `workbuddy.cn/events/invite` in a
  browser; it does not curl.

---

## 2026-10-16

- **NO DEADLINE CHANGES.** Every published `end` date re-verified unchanged. Vendor pages read
  directly: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止
  31 October, tiers 50 / +100 / +500; still client-side, so rendered in Chromium) **and**
  `workbuddy.cn/pricing` (体验版 still 限时免费), `docs.qoder.com/events/flashoffer` **and**
  `docs.qoder.cn/events/flashoffer` (Qwen3.8-Flash still free, end date still "announced on this page
  in advance", both locales agree), `kilo.ai/landing/free-models` (still **FOUR**),
  `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD, read from the rendered
  Free Plan table), `inference-docs.cerebras.ai` ($5 / 30-day trial, card required, no auto-renewing
  free tier), `developers.cloudflare.com/workers-ai/platform/pricing/` (10,000 Neurons/day, page
  updated 15 October), `mistral.ai/pricing` (**still no** API credit figure on the Free plan, so the
  13 October correction holds), `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus a
  3-referral payout threshold, unchanged), `ai21.com/pricing` (readable again after a Cloudflare
  block on 14 October, and still **7 days** against the docs' three months, unresolved, not flipped).
  Doubao (about 17 October) and Hunyuan Hy3 限免 + Hy4 night-free (31 October) re-confirmed
  **multi-source only**.
- **CHANGED, `opencodezen`: free roster back up to 13.** Zen's own docs pricing table at
  `opencode.ai/docs/zen` lists **13 free models**, up from 12. Two joined: **`deepseek-v4.1-flash-free`**
  (1M context, multimodal, and the first Zen free model whose provider the docs describe as running a
  zero-retention policy) and **`nemotron-3.5-super-vl-free`**. One left: **`step-5-preview-free`**, the
  Step 5 Preview slot that arrived with the 8 October rollout. `budgetNote` count corrected 12 to 13,
  `models` updated, and the `warn` zero-retention list now names DeepSeek V4.1 Flash Free instead of
  the departed Step 5 Preview. The endpoint `opencode.ai/zen/v1/models` still **lags**: it carries
  neither new id and still lists `muse-spark-1.2-contributor-free`, which the docs dropped. **Prefer
  the docs page; the endpoint is a fallback only.** `added` NOT bumped (rotating roster, same call as
  runs 7 to 16).
- **CHANGED, `nvidia`: `moonshotai/kimi-k3` has left the catalogue.** Sweeping
  `integrate.api.nvidia.com/v1/models` (no key needed) returns **81 ids**, up from 80, and kimi-k3 is
  no longer among them: **`moonshotai/kimi-k2.6`** is the only Moonshot entry left. The row's `models`
  array carried kimi-k3 and has been corrected to `deepseek-ai/deepseek-v4.1-flash`. New ids on the
  endpoint include `google/diffusiongemma-26b-a4b-it`, `meta/muse-glimmer-30b`,
  `nvidia/nemotron-3-embed-1b`, `nvidia/nemotron-parse-2.0` and
  `nvidia/nemotron-3.5-super-vl-120b-a12b`. `z-ai/glm-5.3` is still served, so the row's `test`
  command remains valid. `added` NOT bumped. **This is the second consecutive correction this one
  endpoint has produced**, which is the argument for sweeping it first every run.
- **CHANGED, `openrouter`: free list back up to 18 models at $0.** Read from the vendor's own API,
  `openrouter.ai/api/v1/models`: 465 models, **18 at $0**, up from 17 on 15 October. Notable free ids
  now present include `cohere/north-mini-code:free`, the `thinkingmachines/inkling` pair,
  `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` and `nvidia/nemotron-3.5-super-vl:free`. The
  `warn` count was corrected from seventeen to eighteen. `added` NOT bumped.
- **CHANGED, `orcarouter`: a fifth free id appeared, and it is a verification model.** The vendor's
  own public endpoint, `GET https://api.orcarouter.ai/api/free-package/public`, now returns
  **`orca/orcaverify-text1.0-free`** (its own 5 rpm / 50 rpd) alongside the four generation ids. It
  shadows a verification model rather than a text generator, so it is recorded in the row's `note`
  rather than added to `models`. The endpoint still reports `claim_end: 0` and `active: true`, and the
  router alias `orcarouter/free` is still documented at `docs.orcarouter.ai/routing/free-models` even
  though the free-package endpoint does not return it. `added` NOT bumped.
- **CHANGED, `doubao`: flagged `expiring`.** Its 30-day Standard-plan window is reported to close
  about **17 October**, tomorrow. `status` moved `active` to `expiring`; the date is still
  multi-source only, since ByteDance's own campaign page was not read directly.
- **RE-CHECKED, nothing changed: `stepfun` and `zcode-weekend`.** `platform.stepfun.com` still
  documents Step Plan as a paid Token Plan only, with four paid tiers (Mini ¥49, Plus ¥99, Pro ¥199,
  Max ¥699) plus top-up packs, **no free tier and no trial** in the docs index, so the row stays
  `active` and flagged. One CN tracker continues to advertise 15 signup days plus a 400M-Credit
  monthly free tier, but the vendor publishes neither, so nothing was changed on it. For
  `zcode-weekend`, `zcode.z.ai/en` publishes **no free-tier figures at all**, so the 300M-per-weekend
  figure could not be re-confirmed; a CN tracker now describes ZCode differently (8M tokens/day plus a
  probabilistic 100M weekend bonus), which does not match this row and has no vendor source either.
  The row is left as-is rather than rewritten on tracker evidence.
- **All five keyless model-list endpoints swept**, all reachable and unauthenticated:
  `openrouter.ai/api/v1/models` (465, **18 at $0**, CHANGED), `integrate.api.nvidia.com/v1/models`
  (81, CHANGED), `api.sambanova.ai/v1/models` (6, unchanged), `index-translate.bilibili.com/v1/models`
  (1, unchanged), `opencode.ai/zen/v1/models` (86, lags the docs page).
- **NO OFFERS ADDED.** No candidate could be confirmed against a vendor page. The trackers' newest
  entries (15 October, `igetoken.com/rss.xml`, 89 items) describe either something already on the
  list or something tracker-only. Considered and rejected this run: **WorkBuddy CN x Step 5 Preview**
  (two trackers agree on a 10/12 to 10/25 free window, but `workbuddy.cn` publishes no page for it and
  the tracker claim is the only source), **智谱 AutoClaw weekly login credits** (daily-resetting,
  tracker-only), **联通云 Coding Plan** (¥0/month Lite and Pro, but 实名认证-gated and tracker-only),
  **MonkeyCode (长亭)**, **天翼云息壤**, **UOS AI**, **Loomy**, **千问办公 QwenWork**. Standing
  candidates unchanged: SenseNova, Xiaomi MiMo, Atria Dawn, Verdent AI, AutoClaw, 联通云.
- **Tracker claims REJECTED, vendor wins.** `token-fbi.com` states Qoder CN Qwen3.8-Flash is 限免至
  10 月 31 日 (Qoder's own page says the end date will be announced there), that Kilo Code has
  **16** free models (the vendor's own counter reads **FOUR**), and that StepFun still grants 15
  signup days (the vendor documents no trial). None of the three was written to `data.js`.
- **Idempotency: tenth consecutive clean run, no stale `status: 'new'`.** Rail rolled: 16 Oct today
  (8 items) / 15 Oct yesterday (6) / 14 Oct week (9); the 13 Oct group dropped. All `ref` fields
  carried forward with their items; 23 of 34 rail items now carry one, up from 21, and `validate.js`
  passed, so there are no dangling refs.
- **Referral terms:** `referrals.js` **NOT touched**. WorkBuddy's live reward structure (50 / +100 /
  +500, invitee 2,000 积分, 截止 2026年10月31日) still matches the file exactly. Two known stale items
  stand, **reported not edited**: the `workbuddy` programme note still says the event runs to
  30 September; the `qoderwork_cn` terms page is still titled 【7月30日截止】.
- **PROMPT ERROR (reported again).** The automation prompt still says "Publish: `bash deploy/sync-data.sh`.
  This is the only step needed." That is wrong: the generated `offers/` pages and `history.html` only
  reach the site via `publish.sh`. This run used `deploy/publish.sh` (data + site). Reported to Eric;
  not edited (automations are his call).
- **Carried forward for the next run:** the `test-validate.js` / `validate.js` date-collision defect is
  still owed (a harness date that collides with a date `history.html` already renders is MISSED).
  `content.js`'s `wenxin` entry still says "Both halves close 30 September" (17th run flagged; a
  refresh cannot write `content.js`). `oci`/`azure`/`ai21` `end` values are activation-relative
  placeholders and must never be reported as deadlines. `minimaxplat` (7 November) still has no vendor
  source. `volcano` (8 November) is a discount, tracker-only. When a model id changes, **check the
  `test` field too**.

---

## 2026-10-15

- **NO DEADLINE CHANGES.** Every published `end` date re-verified unchanged. Vendor pages read
  directly: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止
  31 October, tiers 50 / +100 / +500; still client-side, so rendered in Chromium) **and**
  `workbuddy.cn/pricing` (体验版 still 限时免费 at 500 积分/month), `docs.qoder.com/events/flashoffer`
  **and** `docs.qoder.cn/events/flashoffer` (Qwen3.8-Flash still free, end date still "announced on
  this page in advance", both locales agree), `kilo.ai/landing/free-models` (still **FOUR**),
  `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD), `inference-docs.cerebras.ai`
  ($5 / 30-day trial, card required, no auto-renewing free tier), `developers.cloudflare.com/workers-ai/platform/pricing/`
  (10,000 Neurons/day), `mistral.ai/pricing` (**still no** API credit figure on the Free plan, so the
  13 October correction holds), `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus a
  3-referral payout threshold, unchanged), `ai21.com/pricing` (still **7 days** vs the docs' three
  months, unresolved, not flipped). Doubao (~17 October) and Hunyuan Hy3 限免 + Hy4 night-free
  (31 October) re-confirmed **multi-source only**.
- **CHANGED, `opencodezen`: free roster fell from 14 models to 12.** Zen's own docs pricing table at
  `opencode.ai/docs/zen` loaded this run and lists **12 free models**, down from 14. Both Ling entries
  have dropped off: `ling-3.0-flash-fin-free` and `ling-3.1-flash-free`. The second is the expected
  follow-through from the Ling 3.1 Flash Vercel AI Gateway promo that ended on 13 October; the first
  was never separately announced. `budgetNote` count corrected 14 to 12 and the `models` array
  trimmed. The endpoint `opencode.ai/zen/v1/models` still **lags**: it omits `exo-free`,
  `nemotron-3-ultra-free` and `mimo-v2.5-free`, and still carries `muse-spark-1.2-contributor-free`,
  which the docs dropped. **Prefer the docs page; the endpoint is a fallback only.** `added` NOT
  bumped (rotating roster, same call as runs 7 to 15).
- **CHANGED, `stepfun`: the product line moved under this row, and the free-days grant could not be
  re-confirmed.** StepFun's own docs and landing page, read today, now describe Step Plan as a
  **paid monthly Credit subscription (Token Plan) only**; the historical **Coding Plan is
  已停止新购** (discontinued for new purchase); the Step Plan landing page advertises paid tiers
  (Mini ¥49, Plus ¥99, Pro ¥199, **all shown as 已售罄**) and **no free trial is documented anywhere
  in the docs index** (`platform.stepfun.com/docs/llms.txt`). From **15 October 00:00 Beijing time**,
  Step 5 Preview inside Step Plan also deducts Credits at **2× during weekday peak hours**
  (09:00–12:00 and 14:00–18:00) — `docs/zh/announcements/step-plan-usage-adjustment`. The row is left
  **`active`** with `end: null` rather than closed, because a discontinued product line is **not**
  proof that the signup grant has ended, and the runbook says an offer that looks closed but cannot be
  confirmed stays active and gets flagged. `note` rewritten with what the vendor publishes; `added`
  bumped to 2026-10-15 (material change). **Operator decision wanted:** if the free days are in fact
  gone, this row should be moved to the `closed` rail; a refresh cannot settle it.
- **All five keyless model-list endpoints swept**, all reachable and unauthenticated:
  `openrouter.ai/api/v1/models` (462 models, **17 at $0**, unchanged), `integrate.api.nvidia.com/v1/models`
  (80, unchanged), `api.sambanova.ai/v1/models` (6, unchanged), `index-translate.bilibili.com/v1/models`
  (1, unchanged), `opencode.ai/zen/v1/models` (85, lags the docs page).
- **NO OFFERS ADDED.** The best working tracker (`igetoken.com/rss.xml`, 87 items; `igetoken.com/deals`,
  build `v2026-10-09`) has published **nothing newer than 9 October**. Considered and deliberately not
  added: **Zhipu AutoClaw** — its new-user gift (200M tokens / ¥120, countdown-only, no calendar date)
  is on the vendor's own page in both locales, but the two locales label the grant differently
  (intl says "200M tokens"; the CN page says 2亿 **积分** and the intl floating banner says 2,300
  points), and a countdown-only offer with a contested unit does not belong in a dataset whose whole
  point is honest numbers; **联通云 Coding Plan** (¥0/month Lite and Pro, 18k / 90k calls per month,
  12,000 slots) — tracker-only this run and gated behind 实名认证. Carried forward as standing
  candidates, still unreadable at the vendor: SenseNova, Xiaomi MiMo, Atria Dawn, Verdent AI,
  plus AutoClaw and 联通云.
- **Flagged, not changed:** `minimaxplat` (`end: 2026-11-07`) — MiniMax's own docs publish nothing
  about a free trial or an end date, so the row was left as-is rather than guessed at. `volcano`
  (`end: 2026-11-08`) — a ¥9.9/month **discount**, not a free tier, tracker-only. `zcode-weekend`
  (300M tokens/weekend) — a CN tracker now describes ZCode as **8M tokens/day plus a weekend bonus**,
  which does not match this row; no vendor source could be read, so it was left alone. `oci`/`azure`
  `2026-10-29` remain activation-relative placeholders, never deadlines.
- **Idempotency: ninth consecutive clean run — no stale `status: 'new'`.** Rail rolled: 15 Oct today
  (6 items), 14 Oct → yesterday (9), 13 Oct → week (6); the 12 Oct group dropped. All `ref` fields
  carried forward; `validate.js` fails on a dangling ref and it passed.
- **Referral terms:** `referrals.js` **NOT touched**. Z.ai terms re-read (`docs.z.ai/devpack/credit-campaign-rules`),
  unchanged: paid first order plus a 3-referral payout threshold. The live WorkBuddy reward structure
  (50 / +100 / +500, 2,000 invitee, 31 October) still matches the file exactly. Two known stale items
  stand, **reported not edited**: the `workbuddy` programme note says the event runs to 30 September;
  `qoderwork_cn`'s terms page is still titled 【7月30日截止】.
- **Carried forward:** `content.js`'s `wenxin` entry still says "Both halves close 30 September" —
  **16th run flagged**, and it will never self-heal because a refresh is forbidden from writing
  `content.js`. The `test-validate.js` / `validate.js` date-collision defect is still owed. The
  automation prompt still says `bash deploy/sync-data.sh` is "the only step needed" — still wrong,
  since the generated `offers/` pages and `history.html` only reach the site via `publish.sh`.
- **Next run must handle:** Doubao ~**17 Oct** · Hunyuan Hy3 限免 + Hy4 night-free + WorkBuddy invite
  **31 Oct** · MiniMax Platform **7 Nov** · Volcano Ark **8 Nov**. AI21 contested (**sixteenth check —
  do not flip**). Re-check `platform.stepfun.com` to see whether the free days reappear. OpenCode Zen:
  **prefer the docs page**.

---

## 2026-10-14

- **CHANGED, `ling31`: the Vercel AI Gateway promo closed on schedule, 13 October.** No extension and
  no replacement. Checked today three ways: `vercel.com/ai-gateway/models/ling-3.1-flash-free` now
  returns **404**; `openrouter.ai/api/v1/models` has moved `inclusionai/ling-3.1-flash` to **paid**
  pricing ($0.075/M input, $0.225/M output); and Kilo Code has dropped it from its free catalog.
  The row is kept with a past `end` and a `warn` recording the closure, per the established
  convention (the `status` enum has no `closed` value), and it is now on the `closed` rail.
  The durable lesson is the **two-ID design**: the standard ID began billing the moment the promo
  ended, while the `-free` ID simply stopped serving. Prefer the `-free` ID on any gateway promo,
  so expiry is a failed request rather than a surprise charge.
- **CHANGED, `openrouter`: the free list shrank from 19 models to 17.** Read from the vendor's own
  API, `openrouter.ai/api/v1/models`, which now returns 462 models with **17 at $0**. Two of the four
  IDs this row carried three days ago are gone: `inclusionai/ling-3.1-flash` now bills, and
  `apodex/apodex-1.1-mini:free` has **left the catalogue entirely**. `models` is corrected and the
  `warn` now uses this reversal as its own example, since it is the sharpest illustration of the
  point that warning already made. `added` NOT bumped (rotating roster).
- **CHANGED, `kilo`: free catalog fell from five models to four.** The vendor's own counter at
  `kilo.ai/landing/free-models` now reads **FOUR**, and the page was re-rendered in a browser today
  (`dateModified: 2026-10-14`). `inclusionai/ling-3-1-flash` has dropped off, consistent with its
  gateway promo ending on 13 October. The remaining four are Nemotron 3 Super, Nemotron 3 Ultra,
  Dots3-Note Preview and Laguna S 2.1. The count has now gone **six, five, four** across three
  consecutive checks. `models` corrected, `warn`/`note` re-dated; `added` NOT bumped.
- **CHANGED, `opencodezen`: free roster grew from 13 models to 14.** Zen's own docs pricing table at
  `opencode.ai/docs/zen` **loaded this run** after returning 404 on 13 October, and it lists
  **14 free models**: `cat-jam-free` has joined. `budgetNote` count corrected 13 to 14 and the
  `models` array extended. The endpoint `opencode.ai/zen/v1/models` still **lags** and now omits
  five of the fourteen (`big-pickle`, `exo-free`, `ling-3.0-flash-fin-free`, `nemotron-3-ultra-free`,
  `mimo-v2.5-free`) while still carrying `muse-spark-1.2-contributor-free`, which the docs dropped.
  **Prefer the docs page; the endpoint is a fallback only.** `added` NOT bumped.
- **CORRECTION, `nvidia`: the row's `test` command named a model that had already left.** Sweeping
  `integrate.api.nvidia.com/v1/models` (80 ids, no key) showed the catalogue holds `z-ai/glm-5.3` and
  `z-ai/glm-5.3-flash` and no `glm-5.2`. The 12 October correction fixed this row's `models` array but
  **missed its `test` command**, which still called `z-ai/glm-5.2` and would have failed for anyone
  who copy-pasted it. It now names `z-ai/glm-5.3`. Worth checking the `test` field whenever a model id
  changes, not just `models`.
- **NO DEADLINE CHANGES.** Every published `end` date re-verified unchanged. Vendor pages read
  directly: `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止
  31 October, tiers 50 / +100 / +500; the page is now client-side, so it was rendered in Chromium
  rather than curled), `docs.qoder.com/events/flashoffer` **and** `docs.qoder.cn/events/flashoffer`
  (Qwen3.8-Flash still free, end date still "announced on this page in advance", both locales agree),
  `inference-docs.cerebras.ai/support/rate-limits` ($5 credit, 30 days from grant, card required,
  the 2 October correction holds), `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM /
  200K TPD per model, read from the rendered Free Plan table),
  `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus 3-referral payout threshold,
  unchanged, last updated 15 March 2026), `mistral.ai/pricing` (**the Free plan still carries no API
  credit figure, so the 13 October correction holds**).
- **Keyless endpoints swept first, as the runbook requires.** `openrouter.ai/api/v1/models`
  (462 models, **17** at $0, CHANGED), `integrate.api.nvidia.com/v1/models` (**80**, unchanged),
  `api.sambanova.ai/v1/models` (**6**, unchanged), `index-translate.bilibili.com/v1/models` (**1**,
  unchanged), `opencode.ai/zen/v1/models` (86 total, 10 free, but it lags the docs page).
- **NO OFFERS ADDED.** The best working tracker has published nothing newer than **9 October**
  (`igetoken.com/rss.xml`, 87 items; the `deals` page's newest dated entries are 9 and 10 October),
  and `token-fbi.com`'s newest is 13 October with nothing new in it. Every candidate this run was
  either already represented, gated, a reseller, or unreadable at the vendor. Still standing
  candidates pending a readable vendor page: **SenseNova (商汤 Token Plan)**, **Xiaomi MiMo open
  platform**, **Atria Dawn Preview**, **Verdent AI**. `platform.sensenova.cn`,
  `platform.xiaomimimo.com` and `atria-asi.ai` all still return JS-only shells.
- **Not verifiable this run, left untouched:** `minimaxplat` (`end: 2026-11-07`, "free trial access
  to M3 and M2"). MiniMax's own docs (`platform.minimax.io/docs/token-plan/faq` and
  `/docs/token-plan/intro`) publish nothing about a free trial or an end date today, so the row was
  left exactly as it was rather than guessed at. Flagged for the operator.
- **Referral terms:** `referrals.js` **NOT touched**. `docs.z.ai/devpack/credit-campaign-rules`
  re-read and unchanged. Two known stale items stand, **reported not edited**: the `workbuddy`
  programme note still says the event runs to 30 September, and `qoderwork_cn` is still titled
  【7月30日截止】.
- **Idempotency: eighth consecutive clean run, no stale `status: 'new'`.** Rail rolled: 14 Oct today,
  13 Oct yesterday, 12 Oct week; the 11 Oct group dropped. All `ref` fields carried forward, and
  `validate.js` fails on a dangling `ref` anyway.
- **Tooling:** `deploy/publish.sh` ran escalation-approved; the sandbox bulk-delete guard did not
  fire. **The automation prompt still says `bash deploy/sync-data.sh` is "the only step needed"**,
  which is wrong for this project: the generated `offers/` pages and `history.html` only reach the
  site via `publish.sh`/`sync-site.sh`. Reported to Eric again, not edited (automations are his call).

- **Next run must handle:** Doubao ~**17 Oct** · Hunyuan Hy3 限免 + Hy4 night-free + WorkBuddy invite
  **31 Oct** · MiniMax Platform **7 Nov** · Volcano Ark **8 Nov**. AI21 contested
  (**fourteenth check, do not flip**). `oci` / `azure` / `ai21` dates are activation-relative
  placeholders, never report them as deadlines. `content.js`'s `wenxin` entry still says "Both halves
  close 30 September" (**15th run flagged**; a refresh cannot write `content.js`, so it will never
  self-heal). OpenCode Zen: prefer the docs page. `minimaxplat`'s `end` needs a vendor source.

---

## 2026-10-13

- **CORRECTION (subtractive) — `mistral` — the `$10/month` free-plan figure is gone from the vendor's
  pricing page.** This row has carried `unit: "$10/month"` and the claim "the Free plan includes
  $10/month in API credits, usable across Studio, the API and Vibe" since 7 October 2026, read at
  `mistral.ai/pricing`. Read again today, **twice** (server-rendered HTML via curl, and a Chromium
  render), the Free plan card lists Vibe access, Studio access, limited messages, searches and coding
  sessions, basic image generation and 100+ connectors, and **no API credit amount**. The string
  `$10` does not appear anywhere in the page source. The only "in API credits" figures are
  **`$25.5 /mo`** (Pro) and **`$15 /mo`** (Education), and Mistral's own docs state plainly that
  "paid plans add seats, features, and included monthly usage" while "Free mode is the default state
  for new accounts". `unit` is now `unpublished`, `budgetNote` and `note` are rewritten, `added` moved
  to 2026-10-13.
  **Deliberately framed as a correction, not a closure.** The row now states what the vendor
  publishes today; it does not assert that the credit was withdrawn. The page may simply have been
  restructured (the plan cards and the FAQ were both rewritten). A human may want to re-read it in a
  week and, if `$10/month` has returned, restore it.
  Sources: `mistral.ai/pricing` (read directly, twice), `docs.mistral.ai/admin/billing-usage/subscriptions`.
  Wayback could not settle the history: the archived snapshots for 7 and 12 October are pre-hydration
  JS shells with no pricing text in them.
- **NO DEADLINE CHANGES.** Every published `end` date re-verified unchanged. Vendor pages read
  directly: `vercel.com/ai-gateway/models/ling-3.1-flash-free` (promotional pricing ends
  **13 October**, unchanged), `kilo.ai/landing/free-models` (still **five** free models: Ling 3.1
  Flash, Dots3-Note Preview, Laguna S 2.1, Nemotron 3 Ultra, Nemotron 3 Super),
  `docs.qoder.com/events/flashoffer` **and** `docs.qoder.cn/events/flashoffer` (Qwen3.8-Flash still
  free, end date still "announced on this page in advance" — both locales agree),
  `workbuddy.cn/events/invite` (即日起至 **2026年10月31日**, invitee 2,000 积分 截止 31 October,
  tiers 50 / +100 / +500 — matches `referrals.js` exactly),
  `inference-docs.cerebras.ai/support/rate-limits` ($5 credit, 30 days from grant, card required,
  "no permanently free tier" — the 2 October correction holds),
  `console.groq.com/docs/rate-limits` (30 RPM / 1K RPD / 8K TPM / 200K TPD per model),
  `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus 3-referral payout threshold,
  unchanged).
- **Keyless endpoints swept first, as the runbook now requires.** All five unchanged:
  `openrouter.ai/api/v1/models` (459 models, **19** at $0 — same count and same set),
  `integrate.api.nvidia.com/v1/models` (**80**), `api.sambanova.ai/v1/models` (**6**),
  `index-translate.bilibili.com/v1/models` (**1**), `opencode.ai/zen/v1/models` (83 total, 9 free).
- **`opencode.ai/docs/zen` now returns 404.** The site has shipped "OpenCode v2" and the docs page
  that carried Zen's pricing table is gone from the sitemap; the site's own navigation still links to
  `/docs/zen/#pricing`, so this looks like a mid-migration gap rather than a deliberate removal.
  **The `opencodezen` roster was therefore left untouched** — the endpoint is the only reachable
  vendor source and it is the source the runbook says *lags* the docs page. The endpoint currently
  shows a smaller, different set (it still lists `muse-spark-1.2-contributor-free` and omits
  `exo-free`, `ling-3.0-flash-fin-free`, `nemotron-3-ultra-free` and `mimo-v2.5-free`). Rewriting the
  roster on the lagging source would be a fresh-but-wrong edit. **Next run: retry the docs page
  first.** The row's `link` still points at `/docs/zen`; if the 404 persists, that button is broken
  and needs a decision from the operator.
- **NO OFFERS ADDED.** Every tracker lead this run was gated, a reseller, or unreadable at the
  vendor. Rejected explicitly: **Verdent AI** (GLM-5.3-Flash + DeepSeek V4.1-Flash free in its Free
  mode) — tracker-only, `aipromonow.com` and CSDN, no vendor page read; **BazaarLink** (DeepSeek V4
  Flash, "10 RPM / 150 a day free") — its own page says 按量付费 with no markup, i.e. a reseller
  gateway, not a vendor grant; **Agnes AI**, **腾讯 Marvis**, **美团 catpaw**, **MonkeyCode**,
  **TeleAgent**, **华为云码道**, **LobsterAI**, **点点 AI**, **书生·端砚 墨点计划**, **Google
  Antigravity** — all tracker-only this run. **Carried forward as standing candidates:** SenseNova
  (商汤 Token Plan), 小米 MiMo, Atria Dawn Preview, and now Verdent AI.
- **Tracker claim REJECTED again (third run).** `token-fbi.com` states Qoder CN Qwen3.8-Flash is
  "限免至 10 月 31 日". Qoder's own CN page says only "结束时间将提前在本页公告". Vendor wins;
  `qoder` keeps `end: null`.
- **`content.js`'s `wenxin` entry still needs a human hand edit** — it says "Both halves close
  30 September". **Fourteenth run flagged.** A refresh cannot write `content.js`, so it will never
  self-heal.
- **Referral terms:** `referrals.js` **NOT touched**. WorkBuddy's live reward structure
  (50 / +100 / +500, 2,000 invitee, 31 October) still matches the file exactly. Two known stale items
  stand, **reported not edited**: the `workbuddy` programme note says the event runs to 30 September,
  and `qoderwork_cn`'s terms page is still titled 【7月30日截止】.
- **Notes for the next run:** Ling 3.1 Flash's gateway window closes **today (13 Oct)** and should
  move to the `closed` rail. Doubao ~17 Oct. Hunyuan Hy3 限免 + Hy4 night-free + WorkBuddy invite
  31 Oct. AI21 is contested for a twelfth time (pricing page now Cloudflare-blocked) — **do not flip**.
  `oci` / `azure` / `ai21` dates are activation-relative placeholders — never report as deadlines.
  Run `build-history.js` alongside `build-pages.js`; the rail `ref` field must be carried forward.

---

## 2026-10-12 · site work (no data change)

**NOT a refresh.** No offer was added, removed or edited. All 51 offers and every published `end`
date are exactly as verified at 11:00. `data.js` changed in one way only: rail items gained an
optional `ref` field (below). Nothing else in the dataset moved.

Five changes to the presentation layer, all made by hand with full operator approval:

- **The freshness rail is no longer a dead end.** Rail items now carry an optional `ref` offer id and
  render as links to `offers/<id>.html`. Before this, the rail reported that something changed and
  gave the reader nowhere to go: items were plain `<div class="ev">` with `cursor:default`, no
  handler, and no target field in the schema. 23 of the 32 rail items now link. The 9 that do not are
  the ones that span the whole list ("no deadline changes: every published end date re-verified
  unchanged") or cover several offers at once; linking those to an arbitrary offer would be worse
  than leaving them plain. `validate.js` now fails if a `ref` does not match a real offer id, so a
  typo cannot ship a 404. **The next run must carry `ref` forward when it rolls the rail**, or the
  links silently disappear while the text still reads correctly.
- **A returning-visitor banner.** The dashboard stores the `updated` stamp you last saw and, when the
  published data is newer, says so at the top: how long ago you last looked, how many changes the
  latest run recorded, and a link to the full history. A first-time reader is told nothing, because
  there is nothing to compare against and a guess would be a false claim. Every `localStorage`
  access is wrapped: it throws in Safari private mode and when the quota is full, and the page has to
  work with storage unavailable.
- **`history.html`, generated from this file.** `build-history.js` renders the whole run log as a
  readable page, newest first, with the two most recent runs open and the rest collapsed. This makes
  the track record visible to a reader rather than only to someone with the repository open, and it
  is the thing that justifies trusting the numbers.
- **The obvious source for that page was tested and rejected.** Building it from `archive/*.js`
  looks right and does not work. Measured today: 102 rail items collapse to only **71 distinct
  headlines**, because "no deadline changes" is the same headline eight days running, so headline is
  not a key for "one change". Three snapshots share a `today` label while carrying **different item
  counts** (9 and 10 under `Today · 29 Sep`; 7 and 8 under `Today · 2 Oct`). And the filenames do not
  sort into run order: `data-2026-10-12-midday.js` sorts before `data-2026-10-12.js` but was
  archived **after** it. Reconstructing "what changed when" from that means guessing. This file is
  already authoritative, dated and append-only, so the generator reads it and invents nothing.
- **A test was failing for the wrong reason and is fixed.** `test-ui.js` asserted name-sort order by
  comparing the whole `.nm` cell, which concatenates the offer name with its subtitle. "OpenCode" +
  "New-model previews" then sorts against "OpenCode Zen" + "Free model gateway" as `OpenCodeN…` vs
  `OpenCode Z…`, and the space makes the longer name come first, so the test failed against a table
  that was correctly sorted. It now compares `.nml`, the key the sort actually uses. Confirmed
  identical on the previously published build before calling it pre-existing rather than assuming so.
- **`deploy/verify-live.js` is fixed, and the deploy is verified for the first time.** Runs 16 to 19
  each logged that the live verifier "still needs its China-tab switch before the featured-block
  step" and carried it forward without fixing it. It was worse than a hang: **five checks** were
  asserting the referral layer against the main tab, where it is correctly absent, so the verifier
  had been reporting a false failure on every deploy. The only live referral link is on a cn-only
  offer (`workbuddy`), and both the featured block and that row's green CTA are tab-scoped. The
  referral checks now run on the China-only tab and are asserted in both directions: no sponsored
  link on the main tab, exactly two on the China tab (the featured card plus its table row), and
  every other provider link unmarked. Two further assertions were wrong for the same reason: the
  offers index and the sitemap cover the **whole** dataset, not the main tab, so they are compared
  against `rows + cnRows`. The verifier also now checks `history.html` against the **live**
  `CHANGELOG.md` rather than a hardcoded date, which is what catches a stale history page.
  **Result: 53/53, up from a run that could not complete.**

**Verified:** `validate.js` exit 0 (51 offers, 51 pages, sitemap 54 urls, `history.html` newest entry
2026-10-12) · `test-validate.js` **20/20** (one new case: a changelog entry that `history.html` does
not contain) · `test-ui.js` **106/106** (eight new assertions: rail links resolve to files that
exist, whole-list items stay unlinked, and the banner is absent on a first visit, absent when the
data has not changed, and present with a change count and a history link when it has) ·
`deploy/verify-live.js` **53/53** against the deployed site · live `data.js` serves 23 `ref` fields,
live `history.html` serves 20 runs.

**Next run must handle:** carry `ref` forward on every rail item you keep · run `build-history.js`
alongside `build-pages.js` · Ling 3.1 Flash **13 Oct** · Doubao ~**17 Oct** · Hunyuan + WorkBuddy
**31 Oct** · AI21 contested (**twelfth check, do not flip**).

**Post-publish verification pass.** The five changes above were re-checked against the **deployed**
site rather than the local build. Two tooling defects surfaced and were fixed:

- **`deploy/verify-live.js` could not start without a hand-exported `NODE_PATH`**, and it hardcoded
  `chromium-1243/chrome-win64/chrome.exe`. It now resolves `playwright-core` from the managed Node
  workspace and picks the newest Chromium build itself, the way `test-ui.js` already does. A
  hardcoded build path breaks on the next Playwright install, and this is the script that proves the
  deploy is correct. Re-run with `NODE_PATH` unset: **53/53**.
- **`test-validate.js` now takes about 134 seconds**, because it copies the whole project once per
  case. Under a 120 second foreground budget it dies at case 18 of 20 with a truncated log and exit
  1, which reads like a broken test and is not one: run it in the background. The two cases it was
  dying on were confirmed separately with `deploy/_probe-lastcases.js`. **20/20 in 134s.**
- **The publish path was broken and is fixed.** `sync-site.sh` cleared `offers/` and `assets/` with
  `rm -rf` before copying. A sandbox bulk-delete guard rejects a delete of 50 or more paths, and the
  tree is now 53 files, so the site step aborted **after** the data origin had already been pushed:
  the publish half-completed and exited 1 with the site untouched. It now removes only the files
  genuinely absent from the source, which keeps the no-stale-pages guarantee (tested by planting
  `offers/zzz-orphan-test.html` and confirming it was reported and removed) and touches nothing on a
  normal run. A first attempt used `trap 'rm -rf "$TMP"' EXIT`, which tripped the same guard as
  `SAFE_DELETE_INVALID_PATH` and killed the exit code after an otherwise successful push; the temp
  files are gone and the comparison uses process substitution instead. **`publish.sh` now runs all
  five steps through to exit 0, ending with 53/53 live verification.**

**Live re-check** by cache-busted `curl` against the origin, not the local files: `index.html` 200,
55,909 bytes, carrying `id="since"`, the `a.ev` rules and the `radar.lastSeen` key · `history.html`
200, 112,441 bytes, 20 entries, newest 2026-10-12, oldest 2026-09-29 · `data.js` 200, 93,674 bytes,
23 `ref` fields, `updated: '2026-10-12T11:00:00+08:00'` · `sitemap.xml` 200.

---

## 2026-10-12 · mid-day correction (second refresh, same day)

- **NO DEADLINE CHANGES.** Every published `end` date is exactly as verified at 09:56 this morning.
- **CHANGED: `nvidia`.** Read from the vendor's own keyless endpoint,
  `integrate.api.nvidia.com/v1/models` (**80 model ids**). **`z-ai/glm-5.2`, which this row listed, is
  ABSENT** from the live catalogue and has been replaced by **`z-ai/glm-5.3`**.
  **`moonshotai/kimi-k3`** added. `added` bumped to 2026-10-12 (a listed model left the catalogue).
  A `note` now carries the endpoint URL, so the staleness cannot recur silently.
- **CHANGED: `sambanova`.** Read from `api.sambanova.ai/v1/models` (**6 model ids**, exact casing).
  This row listed **`deepseek-v3-2-preview`** and **`minimax-m2-7`**, **neither of which is live**:
  **`DeepSeek-V3.2`** and **`MiniMax-M3`** replaced them, and **`Meta-Llama-3.3-70B-Instruct`** and
  **`gpt-oss-120b`** joined. All three previous ids were also wrong in case. The row now matches the
  endpoint exactly, `test` command included. `added` bumped to 2026-10-12.
- **Discovery surface fixed (the real point of this run).** The tracker table in `AGENTS.md` was about
  a third dead: `china-ai-arbitrage.xyz` now redirects to an online casino, `aipromonow.com` does not
  resolve, `allagent.wiki` returns 403, and the table **omitted** `igetoken.com/deals` and its working
  RSS feed, which is where the day's two best leads came from. The table has been rewritten, and a new
  "Keyless model-list endpoints" section added at the top of the method. `AGENTS.md` and the
  `free-llm-api-radar` skill are both updated.
- **The two findings above were the immediate yield of that fix**: both stale rosters were found by
  sweeping endpoints that need no API key. That is the cheapest stale-roster detector the project has.
- **Community registries tested and rejected.** `models.dev/api.json` (226 providers) has **zero**
  zero-cost entries. LiteLLM's `model_prices_and_context_window.json` returns 137 "zero-cost" keys,
  but they are mostly `ollama` models and unpriced placeholders where 0 means "unknown", not "free".
  Recorded in both files so a later run does not re-add them.
- **X and Reddit remain unavailable** (tested again: X 404s, Reddit 403s on every path including
  `api.reddit.com` and `search.json`; domain-restricted search returns nothing from either). They are
  not in the source list and are not reachable, so the discovery gain here came from vendor endpoints
  rather than social sources.

---

## 2026-10-12

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 51 offers in,
  51 out (no additions, no removals), 51 pages.
- **CHANGED: `opencodezen`.** Zen's own docs pricing table (`opencode.ai/docs/zen`) **loaded this
  run**, after failing on 9 Oct and forcing the fallback to the models endpoint. It lists
  **13 free models**, unchanged in count, but the set rotated again:
  **`muse-spark-1.2-contributor-free` has dropped off** and **`mimo-v2.5-free` has joined**. The
  `models` array is corrected. `added` NOT bumped (rotating roster, the same call as runs 7-12).
- **CHANGED: `opencodezen` warning.** The zero-retention list on this row had gone stale. Zen's
  docs now mark **Step 5 Preview Free** as a zero-retention provider alongside Space Bunny and
  LongCat 2.5, so "only Space Bunny and LongCat 2.5 are zero-retention" is corrected. Most of the
  other free models still use free-period data to improve the model.
- **Source note for the next run.** The endpoint **`opencode.ai/zen/v1/models` now lags the docs
  page**: it still lists `muse-spark-1.2-contributor-free` and omits `exo-free`,
  `ling-3.0-flash-fin-free`, `nemotron-3-ultra-free` and `mimo-v2.5-free`. Run 11 preferred the
  endpoint because the docs page would not load. **Prefer the docs page and use the endpoint only
  as a fallback.** The `opencode.asia` and `open-code.ai` mirrors remain stale (4 free models).
- **Verified:** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash` (campaign still reads
  2026-09-03 to 2026-10-07, no extension, stays CLOSED) · `docs.qoder.com/events/flashoffer`
  (Qwen3.8-Flash still free, end date still to be announced) · `workbuddy.cn/events/invite`
  (即日起至 2026年10月31日, invitee 2,000 积分 截止 2026年10月31日, tiers 50/+100/+500) ·
  `vercel.com/ai-gateway/models/ling-3.1-flash-free` (promotional pricing ends 13 October) ·
  `kilo.ai/landing/free-models` (still five free models) · `openrouter.ai/api/v1/models` (still
  19 models at $0) · `inference-docs.cerebras.ai/support/rate-limits` ($5 trial, 30 days from the
  grant, card required, no auto-renewing tier; the 2 Oct correction holds) ·
  `console.groq.com/docs/rate-limits` (free plan 30 RPM / 1K RPD / 8K TPM / 200K TPD) ·
  `ai21.com/pricing` (still 7 days; **eleventh** check against `docs.ai21.com`'s three months, NOT
  flipped) · `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus 3-referral payout
  threshold; last updated 2026-03-15, unchanged).
- **Multi-source only, not vendor-read:** Hunyuan Hy3 限免 plus Hy4 preview night-free 23:00-08:00 to
  31 Oct; Doubao Standard plan 30 days to about 17 Oct (Sohu / Sina / Baidu Aiqicha coverage of the
  24 Sep announcement).
- **Considered and NOT added.** **StepFun Step 5 Preview free-week** via OpenCode Zen / Cline /
  Kilo Code / Nous Research from 8 Oct: already represented by the `opencodezen` row's
  `step-5-preview-free` entry (vendor-verified), and the window length is contradictory across
  trackers (one week vs two weeks). **Atria Dawn Preview** (100M tokens): `atria-asi.ai` is a JS-only
  console that returns a title and nothing else, so it is not vendor-verifiable.
  **Xiaomi MiMo open platform**: the vendor publishes no fixed new-user credit amount.
  **DeepSeek 5M new-user tokens**: `api-docs.deepseek.com/quick_start/pricing` still mentions only a
  "granted balance" and no amount.
- **Tracker claim checked and rejected:** `igetoken.com/deals` lists `allam-2-7b` as free on Groq's
  free plan. Groq's own rate-limit page does not list it. Vendor wins; no change.
- **Referral terms:** `referrals.js` **NOT touched**. `docs.z.ai/devpack/credit-campaign-rules`
  re-read (10% base reward, 3-referral payout threshold, 30-invite tier bonus; unchanged). Two known
  stale items stand, **reported not edited**: the `workbuddy` programme note says the event runs to
  30 September; `qoderwork_cn`'s terms page is titled 【7月30日截止】.
- **Next run must handle:** Ling 3.1 Flash **13 Oct** (tomorrow) · Doubao ~**17 Oct** · Hunyuan +
  WorkBuddy **31 Oct**. AI21 contested (**twelfth check, do not flip**). **`content.js`'s `wenxin`
  entry still says "Both halves close 30 September" — 13th run flagged**, will never self-heal
  (a refresh cannot write `content.js`). `oci`/`azure`/`ai21` dates are activation-relative
  placeholders, never report as deadlines. `deploy/verify-live.js` still needs its China-tab switch
  before the featured-block step.

---

## 2026-10-11

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 51 offers in,
  51 out (no additions, no removals), 51 pages, `validate.js` exit 0.
- **CHANGED: `openrouter`.** The illustrative model list on this row had gone stale. Read from the
  vendor's own API (`openrouter.ai/api/v1/models`): **19 models price at $0**, and
  **`inclusionai/ling-3.0-flash-fin`**, which this row listed as free, is **no longer free** (it now
  bills $0.042/M input, $0.123/M output). Two joined the free list: **`inclusionai/ling-3.1-flash`**
  (the same Ling 3.1 Flash that is free on Vercel to 13 Oct) and **`apodex/apodex-1.1-mini:free`**.
  The `models` array is corrected. `added` NOT bumped, the same call as the Kilo and OpenCode Zen
  roster rotations: the offer did not change, only the rotating catalogue it points at.
- **CHANGED: `hunyuan`.** The row's new-user clause read as an upcoming deadline and no longer is.
  The 14-day new-user quota required a first Hy4 conversation by **10 October 23:59**, which has now
  passed, so the clause is reworded to say the window is closed. The `end` (31 October) is unchanged
  and the existing-user night-free window (23:00-08:00) plus the Hy3 限免 are still live to 31 Oct.
- **Verified:** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash` (campaign still reads
  2026-09-03 to 2026-10-07, no extension, stays CLOSED) · `docs.qoder.com/events/flashoffer`
  (Qwen3.8-Flash still free, end date still to be announced) · `workbuddy.cn/events/invite`
  (即日起至 2026年10月31日, invitee 2,000 积分 截止 2026年10月31日, tiers 50/+100/+500) ·
  `vercel.com/ai-gateway/models/ling-3.1-flash-free` (promotional pricing ends 13 October) ·
  `kilo.ai/landing/free-models` (still five free models) · `opencode.ai/zen/v1/models` (still
  thirteen free models) · `inference-docs.cerebras.ai/support/rate-limits` ($5 trial, 30 days from
  the grant, card required, no auto-renewing tier; the 2 Oct correction holds) ·
  `console.groq.com/docs/rate-limits` (free plan 30 RPM / 1K RPD / 8K TPM / 200K TPD) ·
  `ai21.com/pricing` (still 7 days; **tenth** check against `docs.ai21.com`'s three months, NOT
  flipped) · `docs.z.ai/devpack/credit-campaign-rules` (paid-first-order plus 3-referral payout
  threshold).
- **Multi-source only, not vendor-read:** Hunyuan Hy3 限免 plus Hy4 preview night-free 23:00-08:00
  to 31 Oct (Sohu / Sina / Tencent coverage of the 30 Sep announcement); Doubao Standard plan 30 days
  to about 17 Oct.
- **Idempotency:** no stale `status: 'new'` found. Fifth consecutive clean run.
- **Considered, NOT added:** Thinking Machines **Inkling** free models on OpenRouter (already covered
  by the `openrouter` row; it is an aggregator free roster, not a separate vendor grant); Baidu
  Qianfan new-user tokens and Alibaba Tongyi Lingma free personal edition (both long-standing and
  cn-only, so out of scope for a mainly non-Chinese audience).
- **Referral terms:** all three pages re-read; the WorkBuddy structure (50 / +100 / +500, 2,000
  invitee, 31 Oct) still matches the file. `referrals.js` **NOT touched**. Two known stale items
  stand, reported not edited: the `workbuddy` programme note says 30 September; `qoderwork_cn` is
  titled 【7月30日截止】.
- **Notes for the next run:** Ling 3.1 Flash ends **13 Oct** (2 days). Doubao ~**17 Oct**. Hunyuan
  and WorkBuddy **31 Oct**. AI21 still contested (eleventh check, do not flip). `content.js`'s
  `wenxin` entry still says "Both halves close 30 September" (twelfth run flagged; a refresh cannot
  write `content.js`, so it will never self-heal). `oci` / `azure` / `ai21` dates are
  activation-relative placeholders, never report as deadlines. `deploy/verify-live.js` still needs a
  China-tab switch before its featured-block step. **The automation prompt still says
  `bash deploy/sync-data.sh` is "the only step needed"**, which contradicts AGENTS.md rule 7 and
  trap 9; this run used `deploy/publish.sh` (data + site) as AGENTS.md requires.

---

## 2026-10-09

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 51 → **51 offers**
  (no additions, no removals), 51 pages, `validate.js` exit 0.
- **CHANGED — `opencodezen`.** The free roster rotated: still **13 free models**, but two swapped out
  and two in. Gone: **`fledge-alpha-free`** and **`mimo-v2.5-free`**. New:
  **`step-5-preview-free`** and **`muse-spark-1.2-contributor-free`**. The `models` array was
  corrected to Zen's real IDs (`space-bunny-free`, not `stealth/space-bunny-free`). `added` NOT
  bumped — rotating roster, same call as runs 7–9.
- **Source for that change: the vendor's own models endpoint.** `opencode.ai/zen/v1/models` was read
  directly because `opencode.ai/docs/zen` **would not load this run** (empty body, several attempts;
  the `opencode.asia` and `open-code.ai` mirrors are stale — they still show only 4 free models and
  are NOT a usable substitute). The endpoint is vendor-primary and demonstrably current: it already
  lists `step-5-preview-free`, and Step 5 Preview landed on Vercel AI Gateway on 8 Oct.
- **Verified — `verifiedBy` names each page read.** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`
  (campaign still **2026-09-03 至 2026-10-07**, no extension — stays closed),
  `docs.qoder.com/events/flashoffer` **and** `docs.qoder.cn/events/flashoffer` (Qwen3.8-Flash still
  free, end date still to be announced on both locales — unchanged), `workbuddy.cn/events/invite`
  (即日起至 2026年10月31日; invitee 2,000 积分 截止 2026年10月31日 — unchanged),
  `kilo.ai/landing/free-models` (still **five** free models — unchanged),
  `vercel.com/ai-gateway/models/ling-3.1-flash-free` (promotional pricing ends **13 October** —
  unchanged), `docs.z.ai/devpack/credit-campaign-rules` (invite programme still paid-first-order +
  3-referral payout threshold — unchanged).
- **Still contested — `ai21`.** Ninth check: `ai21.com/pricing` says **7 days**, `docs.ai21.com`
  says **three months**. Not flipped. The row's 6 Oct is a placeholder either way.
- **Idempotency:** no stale `status:'new'` found — **fourth consecutive clean run**. Rail rolled
  9 Oct today / 8 Oct yesterday / 7 Oct + 6 Oct week; the 5 Oct group dropped.
- **Considered, NOT added (2).** **Tencent LightVela** (腾讯轻量云) — 1 month free + 4,500 AI 积分,
  but it is a hosted-agent subscription (2 vCPU / 8 GB) gated behind mainland 实名认证, not a free
  LLM API tier. **WorkBuddy international DeepSeek V4.1-Flash** free to 9 Oct — multi-source only and
  region-blocked from here; final day, so no point adding a row that dies on publication.
- **Referral terms:** `referrals.js` **NOT touched**. Re-read `workbuddy.cn/events/invite` (50 / +100
  / +500, 2,000 invitee, 31 Oct — matches the file exactly), `docs.z.ai/devpack/credit-campaign-rules`
  (unchanged) and the `qoderwork_cn` terms page. Two known stale items stand, **reported not edited**:
  the `workbuddy` programme `note` says the event runs to **30 September**; the `qoderwork_cn` terms
  page is still titled **【7月30日截止】** (last updated 2026-08-11, still describing a live programme
  — the reward structure itself matches the file).
- **Next run must handle:** Hunyuan Hy4 new-user first start **10 Oct 23:59** (tomorrow) · Ling 3.1
  Flash **13 Oct** · Doubao ~17 Oct · Hunyuan + WorkBuddy **31 Oct**. AI21 contested (**tenth check —
  do not flip**). **`content.js`'s `wenxin` entry still says "Both halves close 30 September" — 11th
  run flagged**, will never self-heal (a refresh cannot write `content.js`). `oci`/`azure`/`ai21`
  dates are activation-relative placeholders — never report as deadlines. `deploy/verify-live.js`
  still needs its China-tab switch before the featured-block step.

---

## 2026-10-08

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 51 → **51 offers**
  (no additions, no removals), 51 pages, `validate.js` exit 0, `test-validate.js` 19/19.
- **THREE CLOSURES — all ended 7 Oct, all now in the `closed` rail.** `zcode-trust` (ZCode Trust
  Build, claim window 28 Sep – 7 Oct), `minimaxcode` (MiniMax Code double check-in credits,
  28 Sep – 7 Oct) and `glmnight` (Z.AI GLM Coding Plan night-free, 3 Sep – 7 Oct). GLM's own notice
  at `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash` still reads 活动时间 **2026-09-03 至
  2026-10-07** with **no new end date published**, so it is recorded as closed rather than assumed
  extended. Rows kept with a past `end` and a `warn` (the status enum has no `closed` value — same
  convention as `wenxin` and `gmi`).
- **Idempotency:** cleared the stale `status:'new'` on **`indextranslate`** (added 6 Oct, still `new`
  this morning). Checked every run; worth continuing to.
- **Verified — `verifiedBy` names each page read.** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`
  (campaign closed 7 Oct, no extension), `docs.qoder.com/events/flashoffer` (Qwen3.8-Flash still
  free, end date still to be announced — unchanged), `workbuddy.cn/events/invite` (即日起至
  2026年10月31日; invitee 2,000 积分 截止 2026年10月31日 — unchanged), `kilo.ai/landing/free-models`
  (still **five** free models — unchanged), `opencode.ai/docs/zen` (still **thirteen** free models,
  unchanged; re-read the full pricing table), `vercel.com/changelog` (Ling 3.1 Flash free through
  13 October — unchanged).
- **Still contested — `ai21`.** Eighth check: `ai21.com/pricing` says **7 days**, `docs.ai21.com`
  says **three months**. Not flipped. The row's 6 Oct is a placeholder either way.
- **Left in place, flagged:** `dsharness` (reported window closed ~6 Oct; DeepSeek publishes no date
  of its own). `gmi` and `wenxin` stay `expiring` with past `end` dates.
- **Referral terms:** `referrals.js` **NOT touched**. Re-read all three terms pages — `zai`
  (paid-first-order + 3-referral payout threshold), `qoderwork_cn` (200 Credits/referral, trigger =
  ≥1 Credit within 14 days, cap 200/40,000) and the live WorkBuddy reward structure (50 / +100 /
  +500, invitee 2,000, 31 Oct) all **match the recorded findings exactly**. Two known stale items
  stand, **reported not edited**: the `workbuddy` programme note says the event runs to 30 September;
  the `qoderwork_cn` terms page is still titled 【7月30日截止】.
- **Considered, NOT added (5).** **Glyph Cluster** — Vercel AI Gateway stealth reasoning model, free
  during the stealth period, but **gated to Pro/Enterprise teams that have purchased AI Gateway
  credits** (`vercel.com/changelog/glyph-cluster-...`, read directly). A paid-plan gate, not a free
  tier. **AWS new-signup grant** — GitHub/Google signup, $100 + up to $100 for onboarding tasks,
  6 months: already covered by the existing `bedrock` row. **MiMo (Xiaomi) open platform** and
  **Atria Dawn Preview** — both standing candidates, both **JS-only consoles**; `platform.xiaomimimo.com`
  and `atria-asi.ai` could not be read to confirm the grant, so both stay out (AGENTS.md: cannot
  confirm from the vendor → leave it). Also skipped Claude Max/Team monthly API credits and the
  Claude Startups Program (subscriber- and eligibility-gated).
- **Notes:** `kilo` and `opencodezen` notes re-dated to 8 Oct; both rosters confirmed unchanged.
  `deploy/verify-live.js` still needs its China-tab switch before the featured-block step (known
  pre-existing). `content.js`'s `wenxin` entry still says "Both halves close 30 September" —
  **tenth run flagged**, will never self-heal.

---

## 2026-10-07

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 51 → **51 offers**
  (no additions, no removals), 51 pages, `validate.js` exit 0, `test-validate.js` 19/19.
- **CHANGED — `mistral`.** The row read "Mistral stopped publishing free-tier numbers". That is no
  longer true: `mistral.ai/pricing`, read directly today, states the **Free plan includes $10/month
  in API credits**, shared across Studio, the API and Vibe. `unit` changed `unpublished` →
  `$10/month`; `budgetNote` and `note` rewritten; `added` bumped to 2026-10-07 (material change).
  Email + phone verification, no card; Free-plan traffic is **not** opt-out of training.
- **CHANGED — `opencodezen`.** Roster grew **12 → 13 free models**. New: **Exo Free** (`exo-free`), a
  stealth listing that appeared 6 October — free for a limited time, and its data **may be used to
  improve the model**. Still **no published end date** on any free model. `budgetNote` count
  corrected; `note` re-dated. `added` **not** bumped — rotating roster, same call as 5–6 Oct.
- **Verified — `verifiedBy` names each page read.** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`
  (night-free **2026-09-03 → 2026-10-07**, unchanged), `docs.qoder.com/events/flashoffer` (still
  free, end date still to be announced — unchanged), `workbuddy.cn/events/invite` (即日起至
  2026年10月31日; invitee 2,000 积分 截止 2026年10月31日 — unchanged), `vercel.com/changelog`
  (Ling 3.1 Flash free through 13 October — unchanged), `kilo.ai/landing/free-models` (still
  **five** free models, all already in the row — unchanged), `opencode.ai/docs/zen` (13 free models).
- **Still contested — `ai21`.** Seventh check: `ai21.com/pricing` says **7 days**, `docs.ai21.com`
  says **three months**. Not flipped. The row's 6 Oct is a placeholder either way — the clock runs
  from the reader's own signup.
- **Left in place, flagged:** `dsharness` — the reported window closed ~6 Oct; DeepSeek publishes no
  date of its own, so the row is flagged rather than moved to `closed` on assumption. `gmi` and
  `wenxin` rows stay `expiring` with past `end` dates (the status enum has no `closed` value).
- **Referral terms:** `referrals.js` **NOT touched**. Re-read the live WorkBuddy reward structure
  (50 / +100 / +500, invitee 2,000, 31 Oct) — still matches the file. Two known stale items stand,
  **reported not edited**: `workbuddy` programme note says the event runs to 30 September;
  `qoderwork_cn` terms page still titled 【7月30日截止】.
- **Considered, NOT added:** Poolside Laguna S 2.1 free on OpenRouter/Vercel (already carried in the
  Kilo and OpenCode Zen rosters; no per-user allocation claim), Cline free Solar Mini 4 (tracker-only
  — Cline's own provider doc 404s, so unverified), Claude Startups Program (eligibility-gated). MiMo
  (Xiaomi), Atria Dawn Preview and SenseNova remain standing candidates pending a vendor read.
- **Tooling:** `deploy/publish.sh` step 4 (`sync-site.sh`) was **blocked by the bulk-delete guard** on
  its `rm -rf` of the generated tree (53 files > 50 threshold). The data push (step 3) succeeded
  first. No offers were added or removed this run, so the generated and deployed file sets are
  identical and the site was completed with an equivalent overwrite copy rather than a delete+copy.
  **Next run: expect the same block if the file count stays over 50** — either raise the guard
  threshold or split the copy.

**Next run must handle:** ZCode Trust Build / MiniMax Code / GLM night-free ended **7 Oct** (expect
closed) · Hunyuan Hy4 new-user first start **10 Oct 23:59** · Ling 3.1 Flash **13 Oct** · Doubao
~17 Oct · Hunyuan + WorkBuddy **31 Oct** · AI21 contested (eighth check — do not flip).
**`content.js`'s `wenxin` entry still says "Both halves close 30 September" — 9th run flagged**, will
never self-heal (a refresh cannot write `content.js`). `oci`/`azure`/`ai21` dates are
activation-relative placeholders — never report as deadlines. `deploy/verify-live.js` still needs a
tab switch before its featured-block step.

## 2026-10-06

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 50 → **51 offers**,
  51 pages, `validate.js` exit 0, `test-validate.js` 19/19.
- **ADDED — `indextranslate` (Bilibili Index-Translate).** A free public translation API with **no key
  and no signup**, OpenAI-compatible at `https://index-translate.bilibili.com/v1`, serving one model,
  `Index-Translate-35B-A3B`. Opened **4 October 2026**. Verification level: **official** — read from
  the vendor's own README (`github.com/bilibili/Index-Translate`) and `index-translate.bilibili.com`,
  which state 官方免费 API 现已开放, 无需本地显卡环境, 直接免费调用. The vendor publishes **no rate limit
  and no end date**; both are recorded as unpublished rather than guessed. `kind: 'keyless'`,
  `reach: 'cn-direct'` (Chinese vendor, no account or KYC needed). New `content.js` entry added — a
  *new* offer may have one written; existing prose is never rewritten.
- **CHANGED — `kilo`.** The vendor page's free-model counter fell **six → five** (Ling 3.1 Flash,
  Dots3-Note Preview, Laguna S 2.1, Nemotron 3 Ultra, Nemotron 3 Super). All five were already in the
  row's `models` array, so no roster edit was needed; `warn`/`note` re-worded to say five and re-dated
  6 Oct. `added` **not** bumped — this is the rotating roster, not a change in terms, the same call as
  5 Oct.
- **Verified — `verifiedBy` names each page read.** `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash`
  (night-free 23:00–09:00, GLM-5.3-Flash only, 0 consumption in ZCode/AutoClaw, 2× elsewhere,
  5-hour/week cap — **2026-09-03 → 2026-10-07, unchanged**), `docs.qoder.com/events/flashoffer` (still
  free past 30 Sep, end date still to be announced — **unchanged**), `workbuddy.cn/events/invite`
  (即日起至2026年10月31日; invitee 2,000 积分 截止 2026年10月31日 — **unchanged**),
  `vercel.com/changelog/…ling-3-1-flash…` (free through **13 October** — **unchanged**),
  `inference-docs.cerebras.ai/support/rate-limits` (**still** a $5 trial credit expiring 30 days after
  the grant, card required, "no permanently free tier" — the 2 Oct correction holds),
  `opencode.ai/docs/zen` (still 12 free models, no published end date on any).
- **Still contested — `ai21`.** Sixth check: `ai21.com/pricing` says **7 days**, `docs.ai21.com/docs/usage-cost`
  says **three months**. Not flipped. The row's 6 Oct is a placeholder either way — the clock runs from
  the reader's own signup.
- **Considered, NOT added.** MiMo (Xiaomi) signup credit, Atria Dawn Preview (100M tokens), SenseNova
  (1.2M credits/week), DTMaaS (1,000 Credits), Cline free Space Bunny Alpha, GitHub Copilot Pro for
  teachers/OSS maintainers (eligibility-gated), Cursor $35 event credits, ChatGPT Plus 3-month
  half-price (a discount, not a free tier). All were tracker-only this run, gated, or discounts rather
  than free tiers. **Carry forward:** SenseNova, MiMo and Atria Dawn as standing candidates pending a
  vendor read.
- **Tracker note.** `china-ai-arbitrage.xyz/free-tokens` — listed in `AGENTS.md` as the best English
  tracker — now **redirects to a casino site**. The domain has been lost or hijacked; do not treat it
  as a source. `AGENTS.md` should be updated by hand (a refresh must not rewrite the runbook).
- **Idempotency:** **no stale `status: 'new'` found — second consecutive clean run.** Rail rolled:
  6 Oct `today`, 5 Oct `yesterday`, 4 Oct `week`, 3 Oct `week`, `closed` retained; the oldest 2 Oct
  group dropped.
- **Referral terms:** `referrals.js` **NOT touched**. WorkBuddy reward structure (50 / +100 / +500,
  2,000 invitee, 31 Oct) still matches the file exactly. Two known stale items stand, **reported not
  edited**: the `workbuddy` programme note says the event runs to 30 September; the `qoderwork_cn`
  terms page is still titled 【7月30日截止】.
- **Next run must handle:** DeepSeek Harness ~6 Oct (expect **closed** — last day today) · AI21 6 Oct
  (contested — do not flip) · ZCode Trust Build / MiniMax Code / GLM night-free **7 Oct** · Hunyuan Hy4
  new-user first start **10 Oct** · Ling 3.1 Flash **13 Oct** · Doubao ~17 Oct · Hunyuan + WorkBuddy
  **31 Oct**. **`content.js`'s `wenxin` entry still says "Both halves close 30 September" — eighth run
  flagged**; a refresh cannot write `content.js`, so it will never self-heal. `oci`/`azure`/`ai21`
  dates are activation-relative placeholders — never report as deadlines. `deploy/verify-live.js`
  still needs a tab switch before its featured-block step.

---

## 2026-10-05

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 50 → **50 offers**
  (no additions, no removals), 50 pages, `validate.js` exit 0, `test-validate.js` 19/19.
- **Verified — `verifiedBy` names each page read.** Vendor primary sources read directly this run:
  `docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash` (night-free 23:00–09:00,
  GLM-5.3-Flash only, 0 consumption in ZCode/AutoClaw, 2× in other plan agents, 5-hour/week cap —
  campaign 3 Sep → 7 Oct, **unchanged**, and the page still records the earlier 20 Sep → 7 Oct
  extension), `docs.qoder.com` **and** `docs.qoder.cn` `/events/flashoffer` (both still say the free
  period runs past 30 Sep with the end date to be announced on the page — **unchanged**, both
  locales now agree), `workbuddy.cn/events/invite` (即日起至2026年10月31日; invitee 2,000 积分
  截止日期 2026年10月31日 — **unchanged**), `vercel.com/changelog/…ling-3-1-flash…` (free through
  13 Oct — **unchanged**).
- **CHANGED — `kilo`.** Space Bunny Alpha **retired 5 October exactly as scheduled**; it has left the
  live free catalog. The vendor page still lists **six** free models at $0 in and out, so the slot
  was backfilled by the rotating catalog rather than lost. `warn` rewritten from "retires 5 Oct" to
  "retired", roster re-read 5 Oct.
- **CHANGED — `opencodezen`.** Roster grew **10 → 12 free models**; `fledge-alpha-free` and
  `nemotron-3.5-lightning-free` added, `ling-3.1-flash-free` now present. Still **no published end
  date on any model** — the vendor's own page omits firm deadlines deliberately even where trackers
  report one (LongCat 2.5 preview, ~10 Oct). `budgetNote` count corrected to 12.
- **Rejected — tracker claim.** A CN tracker states Kilo's free tier is "12 models, ~200 req/hour,
  no signup". The vendor page requires an account and publishes **no** free-tier rate limit, so no
  rate-limit figure was added. Same class as the rejected Qoder-31-Oct (3 Oct) and OpenCode-Zen
  (2 Oct) claims.
- **Idempotency:** cleared a stale `status: 'new'` on **`orcarouter`** (first appeared 4 Oct; still
  carried `new` this morning — check this every run). Rail rolled: 5 Oct `today`, 4 Oct `yesterday`,
  3 Oct `week`, 2 Oct `week`, `closed` retained; the oldest 1 Oct group dropped. Space Bunny's
  retirement recorded under `closed`.
- **Referral terms:** `referrals.js` **NOT touched**. Live WorkBuddy reward structure
  (50 / +100 / +500, 2,000 invitee, 31 Oct) still matches the file exactly. Two known stale items
  stand and are **reported, not edited**: the `workbuddy` programme `note` says the event runs to
  30 September; `qoderwork_cn`'s terms page is still titled 【7月30日截止】.
- **Notes for next run:** Space Bunny window gone · DeepSeek Harness ~6 Oct 21:00 · AI21 6 Oct
  (**length still contested — do not flip**, fifth check) · ZCode Trust Build / MiniMax Code /
  GLM night-free **7 Oct** · Hunyuan Hy4 new-user first start **10 Oct** · Ling 3.1 Flash 13 Oct ·
  Doubao ~17 Oct · Hunyuan + WorkBuddy 31 Oct. **`content.js`'s `wenxin` entry still needs a human
  hand edit** — it still says "Both halves close 30 September"; **seventh run running** and it will
  never self-heal, because a refresh is forbidden from writing `content.js`.
  `oci`/`azure`/`ai21` dates remain activation-relative placeholders — never report them as
  deadlines. `deploy/verify-live.js` still needs its tab-switch fix before the featured-block step.

---

## 2026-10-04

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 49 → **50 offers**,
  50 pages, `validate.js` exit 0, `test-validate.js` 19/19.
- **ADDED — `orcarouter` (OrcaRouter, free-model gateway, `portable`, `reach: global`).** Verified
  directly against the vendor, not a tracker: `docs.orcarouter.ai/routing/free-models`,
  `orcarouter.ai/offers`, and the vendor's own public API `api.orcarouter.ai/api/free-package/public`
  (read this run — free ids live today are `deepseek/deepseek-v4-flash-free`,
  `z-ai/glm-5.3-flash-free`, `tencent/hy3-free`, `tencent/hy4-preview-free`, plus a built-in
  `orcarouter/free` difficulty router). Free ids are $0/token with **no expiry**; unpaid-tier limits
  **10 rpm / 50 rpd** rising to 20/800 after $20 lifetime spend. Gated on an **established GitHub
  account**; an unpublished per-request prompt cap returns **400, not 429**. New `content.js` entry
  added (the refresh may add a `content.js` entry for a *new* offer; it never rewrites existing prose).
- **CHANGED — `kilo`.** The vendor's free-model page (`kilo.ai/landing/free-models`) now lists
  **Space Bunny Alpha as retiring 5 October** and **Ling 3.1 Flash as added 2 October**. The row's
  illustrative `models` array was corrected (Space Bunny out, Ling 3.1 Flash / Nemotron 3 Ultra /
  Dots3-Note in) and the `warn`/`note` updated. `added` deliberately **not** bumped: the offer's terms
  did not change, only the rotating roster the row already describes as rotating.
- **CHANGED — `opencodezen`.** Added a sentence to the existing `note` recording that **Space Bunny's
  free window is reported to close 5 October** and **LongCat 2.5 preview around 10 October**. Zen's own
  docs publish neither date, so both are marked approximate. `end` left `null` — no offer-level end.
- Verified (vendor primary, read directly):
  - `glmnight` — docs.bigmodel.cn **and** docs.z.ai: campaign 3 Sep → **7 Oct**, 23:00–09:00,
    GLM-5.3-Flash only, free in ZCode/AutoClaw, 2× in other plan agents, 5-hour/week cap. Unchanged.
    (Separate fact, not new: an all-day off-peak rate also runs 25 Sep → 7 Oct.)
  - `workbuddy` — workbuddy.cn/events/invite: 即日起至2026年10月31日, invitee 2,000 积分 截止
    2026年10月31日. Unchanged.
  - `qoder` — docs.qoder.com/events/flashoffer: still free past 30 Sep, **end date still TBA**. Unchanged.
  - `ling31` — vercel.com/changelog: free to **13 Oct**. Unchanged.
  - `ai21` — **still contested, NOT flipped.** docs.ai21.com/docs/usage-cost still says the $10 trial is
    good for **three months**; ai21.com/pricing still says **7 days**. Third run carrying this open.
  - `kilo` — roster as above.
  - api-docs.deepseek.com/quick_start/pricing — **no new-user grant amount published**; the "5M free
    tokens" claim circulating on CN trackers stays **tracker-only** and was **not** added (same call as
    run 4). The vendor page mentions only a "granted balance" in its deduction rules.
- Verified (multi-source, not vendor-read): `hunyuan` Hy3 限免 + Hy4 preview night-free 23:00–08:00 to
  **31 Oct**, Hy4 new-user 14-day first start by **10 Oct 23:59** (Tencent 30 Sep announcement via
  Tencent News / Sohu / MSN) — unchanged. `dsharness` ¥6 credit usable to **6 Oct 21:00**
  (Sohu / 17173 / AI Promo Now). `minimaxcode` double check-in **28 Sep → 7 Oct**. `zcode-trust`
  claim window **28 Sep → 7 Oct**, ~100M tokens, ~100k daily allocations. `doubao` 30-day Standard to
  **17 Oct** (ByteDance 24 Sep announcement).
- **REJECTED — tracker claims.** (1) "Vercel Ling 3.0 Flash Sante free ends 4 Oct" — that is **Ling 3.0**,
  a different model from the `ling31` row (Ling **3.1** Flash, free to 13 Oct); no edit made.
  (2) "Kilo Code free models, 200 req/hr per IP, no signup" — the vendor's own page requires a Kilo Cloud
  account and publishes **no** free-tier rate limit. Vendor wins; nothing recorded.
- **CONSIDERED, NOT ADDED (2):** **SenseNova (商汤日日新) Token Plan** — 1.2M credits/week free during
  public beta, CN-gated; live since May 2026, not new this week, and not vendor-verified this run.
  **B.AI** and **TokenRouter** — both flagged 随时可能下线 by the tracker that lists them and neither is
  vendor-documented. Carry SenseNova forward as a standing candidate.
- Idempotency: **no stale `status: 'new'` found this run** (first clean run since the drift started).
  `orcarouter` correctly carries `status: 'new'` — the run it first appears. Rail rolled: 4 Oct today,
  3 Oct yesterday, 2 Oct and 1 Oct week; the 30 Sep group was dropped as out of window.
- Referral terms: `referrals.js` **untouched**. Live WorkBuddy reward structure (50 / +100 / +500) still
  matches the file exactly. Known stale items stand, **sixth run**: the `workbuddy` programme `note`
  still says the event runs to 30 September; `qoderwork_cn` terms page still titled 【7月30日截止】.
  Both **reported, not edited**.
- **Next run must handle:** Space Bunny window ends 5 Oct · DeepSeek Harness ~6 Oct 21:00 · AI21 6 Oct
  (contested — do not flip) · ZCode Trust Build / MiniMax Code / GLM night-free / OpenCode LongCat 2.5
  preview **7 Oct** · Hunyuan Hy4 new-user first start **10 Oct** · Ling 3.1 Flash 13 Oct · Doubao ~17 Oct ·
  Hunyuan + WorkBuddy 31 Oct. **`content.js`'s `wenxin` entry still needs a human hand edit** — says
  "Both halves close 30 September"; **sixth run running**, and a refresh is forbidden from rewriting
  existing `content.js` prose, so it will never self-heal. `oci`/`azure`/`ai21` dates are
  activation-relative placeholders — never report as deadlines.

---

## 2026-10-03

- **NO DEADLINE CHANGES.** Every published `end` date re-verified and unchanged. 49 offers, 49 pages,
  `validate.js` exit 0. No offers added or removed.
- Verified (vendor primary, read directly):
  - `glmnight` — docs.bigmodel.cn/cn/coding-plan/notice/event-glm-5.3-flash: event 3 Sep → **7 Oct**,
    23:00–09:00, GLM-5.3-Flash only, free in ZCode/AutoClaw, 2× quota in other plan agents,
    5-hour/week cap. Unchanged.
  - `workbuddy` — workbuddy.cn/events/invite: 即日起至2026年10月31日, invitee 2,000 积分 截止
    2026年10月31日. Unchanged.
  - `qoder` — docs.qoder.com/events/flashoffer **and** docs.qoder.cn/events/flashoffer: still free past
    30 Sep, **end date still TBA on the page**. Unchanged.
  - `ling31` — vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway: free to **13 Oct**.
    Unchanged.
  - `workbuddy.ai/pricing` (intl) — Free $0/mo, 100 credits/month + 30/day.
- **REJECTED — tracker claim.** Two CN trackers now assert Qoder CN's Qwen3.8-Flash free window runs
  to **31 October**. Qoder's own CN page says only that the period was extended past 30 September and
  the end date will be announced there. **Vendor wins.** `qoder` keeps `end: null`. Same failure class
  as the OpenCode Zen tracker claims (run of 2026-10-02).
- **CONSIDERED, NOT ADDED (2):**
  - WorkBuddy **international** DeepSeek-V4.1-Flash free to **9 Oct** — real, but **multi-source only**
    (Tencent/MSN/CSDN, 26 Sep). `workbuddy.ai` returns a region block from here and the offer is not
    documented on the pricing page. Left out per "vendor page unreachable → leave it and say so."
  - **Laya** (`convaiinnovations/laya`) — vercel.com/changelog confirms free to **31 Oct**. Re-confirmed
    **out of scope**: it is an evaluation/decision classifier returning structured yes/no answers, not
    text generation. Same call as run 4.
- Verified (multi-source, not vendor-read): `hunyuan` Hy3 限免 + Hy4 night-free 23:00–08:00 extended to
  **31 Oct**, Hy4 new-user 14-day first conversation by **10 Oct 23:59** (Tencent 30 Sep announcement,
  via Sina/Tencent News) — unchanged. `dsharness` ¥6 credit to **~6 Oct 21:00** (Sohu/17173). `minimaxcode`
  double check-in to **7 Oct**. `zcode-trust` claim window **28 Sep → 7 Oct**.
- Idempotency: cleared stale `status: 'new'` on `ling31` and `dsharness` (the fifth run this has drifted —
  **check every run**). Rail rolled: 3 Oct → today, 2 Oct → yesterday, 1 Oct and 30 Sep → week.
- Referral terms: `referrals.js` untouched. Live WorkBuddy reward structure (50 / +100 / +500) still
  matches the file. Known stale items stand: the `workbuddy` programme `note` still says the event runs
  to 30 September; `qoderwork_cn` terms page still titled 【7月30日截止】. Both **reported, not edited**.
- **Next run must handle:** DeepSeek Harness ~6 Oct · AI21 6 Oct (length still contested) · ZCode Trust
  Build / MiniMax Code / GLM night-free / OpenCode LongCat 2.5 preview **7 Oct** · WorkBuddy intl
  DeepSeek V4.1-Flash 9 Oct · Hunyuan Hy4 new-user first start **10 Oct** · Ling 3.1 Flash 13 Oct ·
  Doubao ~17 Oct · Hunyuan + WorkBuddy 31 Oct · Laya 31 Oct. **`content.js`'s `wenxin` entry still needs a
  human hand edit** — says "Both halves close 30 September"; **fifth run running**, and a refresh is
  forbidden from writing `content.js`, so it will never self-heal. `oci`/`azure`/`ai21` dates are
  activation-relative placeholders — never report as deadlines.

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
