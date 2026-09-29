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
