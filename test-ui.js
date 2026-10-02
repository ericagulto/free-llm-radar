/* ============================================================
   Free LLM Radar — UI regression test for the filter chips
   ------------------------------------------------------------
   Loads index.html in a real Chromium and clicks the chips.
   Verifies the multi-select semantics actually hold in the DOM,
   not just in the source:

     OR within a dimension   — portable + keyless shows both kinds
     AND across dimensions   — adding "No card" narrows the result
     complementary pair      — refonly + noref shows everything
     Clear                   — resets to the full list

   Run:
     node test-ui.js

   Requires playwright-core plus an installed Chromium. Both are
   resolved automatically — including from the managed Node
   workspace, so no NODE_PATH is needed.

   If either is genuinely unavailable the test SKIPS rather than
   blocking a data refresh — but the skip is loud, and setting
   RADAR_REQUIRE_UI=1 (or passing --require) turns it into a hard
   failure. Use that in any context where a silent skip would be
   mistaken for a pass.
   ============================================================ */

const path = require('path');
const fs = require('fs');

const REQUIRED = process.env.RADAR_REQUIRE_UI === '1' || process.argv.includes('--require');

// A skip must never be mistakable for a pass. Without this, an agent that forgets
// NODE_PATH sees a tidy one-line "SKIP" and moves on believing the UI was tested.
function skip(reason) {
  console.log('');
  console.log('  ' + '!'.repeat(58));
  console.log('  !!  UI TEST DID NOT RUN — ' + reason);
  console.log('  !!  This is NOT a pass. 61 assertions were never evaluated.');
  console.log('  ' + '!'.repeat(58));
  console.log('');
  if (REQUIRED) {
    console.log('  RADAR_REQUIRE_UI is set, so this is a failure.');
    process.exit(1);
  }
  console.log('  Set RADAR_REQUIRE_UI=1 to make this fatal.');
  process.exit(0);
}

// Resolve playwright-core wherever it lives: project-local first, then the managed
// Node workspace, then plain resolution. Keeps the caller from having to know.
let chromium;
const MODULE_ROOTS = [
  path.join(__dirname, 'node_modules'),
  'C:/Users/Eric/.workbuddy-ai/binaries/node/workspace/node_modules'
];
try {
  ({ chromium } = require('playwright-core'));
} catch {
  let loaded = false;
  for (const root of MODULE_ROOTS) {
    if (!fs.existsSync(path.join(root, 'playwright-core'))) continue;
    try {
      ({ chromium } = require(path.join(root, 'playwright-core')));
      loaded = true;
      break;
    } catch { /* try the next root */ }
  }
  if (!loaded) skip('playwright-core not found');
}

// Discover the Chromium build instead of hardcoding version numbers. Playwright
// bumps the directory name (chromium-1243 -> chromium-1300) on every install, and a
// stale hardcoded list would silently degrade this test to a permanent skip.
function findChromium() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    path.join(process.env.LOCALAPPDATA || '', 'ms-playwright'),
    'C:/Users/Eric/AppData/Local/ms-playwright'
  ].filter(Boolean);

  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    // Highest build number first, so an upgrade is picked up automatically.
    const builds = fs.readdirSync(root)
      .filter(d => /^chromium(_headless_shell)?-\d+$/.test(d))
      .sort((a, b) => (+b.match(/(\d+)$/)[1]) - (+a.match(/(\d+)$/)[1]));
    for (const b of builds) {
      for (const rel of ['chrome-win64/chrome.exe', 'chrome-win/chrome.exe',
                         'chrome-linux/chrome', 'chrome-headless-shell-win64/chrome-headless-shell.exe']) {
        const p = path.join(root, b, rel);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null;
}

const EXE = findChromium();
if (!EXE) skip('no Chromium build found under ms-playwright');

const URL = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

// Read the offer count straight out of data.js so this test does not need editing every
// time an offer is added — while still catching a silent data loss via the floor below.
let EXPECTED = null, EXPECTED_MAIN = null, OFFERS = null;
try {
  const vm = require('vm');
  const box = { window: {} };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), box);
  OFFERS = box.window.RADAR.offers;
  EXPECTED = OFFERS.length;
  // The dashboard opens on the main tab, which excludes cn-only offers. "Everything"
  // for the assertions below means what the default view renders, not the raw data.
  EXPECTED_MAIN = OFFERS.filter(o => o.reach !== 'cn-only').length;
} catch (e) {
  skip('could not read data.js to establish the expected count — ' + e.message);
}
// The offer with the largest published allowance — used to check header sorting.
// Scoped to the main tab: the overall largest grant (wechat) is cn-only and so is
// not rendered on the tab the dashboard opens on.
const MAX_BUDGET_ID = OFFERS.filter(o => o.budget > 0 && o.reach !== 'cn-only')
  .sort((a, b) => b.budget - a.budget)[0].id;
// Reach counts, derived from the same data file. "Sign up anywhere" must hide every
// cn-only offer; "China-only" must show exactly those and nothing else.
const CN_ONLY = OFFERS.filter(o => o.reach === 'cn-only').map(o => o.id);
const REACHABLE = OFFERS.filter(o => o.reach !== 'cn-only').length;
// A floor, not an equality: offers legitimately come and go. A drop below this means
// something deleted a large slice of the dataset without anyone noticing.
const FLOOR = 35;

const results = [];
const check = (label, actual, expected, cmp = '==') => {
  const ok = cmp === '==' ? actual === expected
           : cmp === '>=' ? actual >= expected
           : actual <= expected;
  results.push({ label, actual, expected, cmp, ok });
};

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage();

  // Force local mode so this test stays deterministic and offline — it must exercise the
  // local fallback path, not whatever the remote data origin happens to be serving today.
  await page.addInitScript(() => { window.RADAR_DATA_URL = ''; });

  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto(URL);
  await page.waitForSelector('.row', { timeout: 10000 });

  const count = async () => {
    const t = await page.textContent('#count');
    return parseInt(t.match(/^(\d+)/)[1], 10);
  };
  const click = async f => {
    await page.click(`.chipbtn[data-f="${f}"]`);
    await page.waitForTimeout(40);
  };
  const reset = async () => { await click('all'); };

  // ---- baseline ----
  // The dashboard opens on the main tab, which hides cn-only offers.
  const total = await count();
  check('baseline: rendered count matches the main tab of data.js', total, EXPECTED_MAIN);
  check('baseline: dataset has not silently shrunk', total + CN_ONLY.length, FLOOR, '>=');

  // ---- measure each chip on its own ----
  const single = {};
  for (const f of ['portable', 'client', 'keyless', 'credit', 'nocard', 'expiring', 'refonly', 'noref']) {
    await reset();
    await click(f);
    single[f] = await count();
  }

  // ---- OR within the kind dimension ----
  await reset(); await click('portable'); await click('keyless');
  check('kind OR: portable + keyless = sum of both',
        await count(), single.portable + single.keyless);

  await reset(); await click('portable'); await click('client');
  check('kind OR: portable + client = sum of both',
        await count(), single.portable + single.client);

  // ---- AND across dimensions ----
  await reset(); await click('portable'); await click('nocard');
  const pn = await count();
  check('AND across: portable + nocard <= portable', pn, single.portable, '<=');
  check('AND across: portable + nocard <= nocard', pn, single.nocard, '<=');

  await reset(); await click('portable'); await click('keyless'); await click('nocard');
  const pkn = await count();
  check('AND across: (portable|keyless) + nocard <= union', pkn, pn, '>=');

  // ---- complementary pair ----
  await reset(); await click('refonly'); await click('noref');
  check('complementary: refonly + noref = everything', await count(), total);

  // ---- reach: a tab, not a filter ----
  // China-only offers live on their own tab. The main tab must exclude every one of
  // them, and the count in the tab label must agree with what is rendered.
  const tabIds = async () => page.evaluate(() =>
    [...document.querySelectorAll('#list .row')].map(r => r.dataset.id));
  const switchTab = async t => {
    await page.click(`.tab[data-tab="${t}"]`);
    await page.waitForTimeout(60);
  };
  const tabLabel = async t =>
    (await page.textContent(`.tab[data-tab="${t}"] .tct`)).trim();

  await switchTab('main');
  const mainTotal = await count();
  check('reach tab: main excludes every cn-only offer', mainTotal, EXPECTED - CN_ONLY.length);
  check('reach tab: main tab label matches the rendered count', await tabLabel('main'), String(mainTotal));
  const leakedMain = (await tabIds()).filter(id => CN_ONLY.includes(id));
  check('reach tab: no cn-only offer appears on the main tab', leakedMain.length, 0);

  await switchTab('cn');
  const cnTotal = await count();
  check('reach tab: china-only tab shows exactly the cn-only offers', cnTotal, CN_ONLY.length);
  check('reach tab: china tab label matches the rendered count', await tabLabel('cn'), String(cnTotal));
  const notCn = (await tabIds()).filter(id => !CN_ONLY.includes(id));
  check('reach tab: the china tab contains nothing else', notCn.length, 0);

  // The two tabs must partition the dataset — no offer lost, none duplicated.
  check('reach tab: the two tabs partition the dataset', mainTotal + cnTotal, EXPECTED);

  // Metrics must follow the tab, or the strip contradicts the table.
  await switchTab('main');
  const mainStrip = await page.textContent('#strip');
  await switchTab('cn');
  const cnStrip = await page.textContent('#strip');
  check('reach tab: the metric strip changes with the tab', mainStrip === cnStrip, false);

  // The main tab must say plainly what it is hiding.
  await switchTab('main');
  const note = (await page.textContent('#tabnote')).trim();
  check('reach tab: the main tab explains the hidden count',
        note.includes(String(CN_ONLY.length)), true);

  // A referral card for a cn-only offer must not sit on the main tab, where the
  // reader cannot claim it. workbuddy is both cn-only and the live referral.
  const cnRefOnMain = await page.evaluate(cnOnlyIds =>
    [...document.querySelectorAll('#feat .fcard')].length > 0 &&
    [...document.querySelectorAll('#list .row')].some(r => cnOnlyIds.includes(r.dataset.id)),
    CN_ONLY);
  check('reach tab: no cn-only referral block on the main tab', cnRefOnMain, false);

  await switchTab('main');

  // ---- three dimensions at once ----
  await reset(); await click('portable'); await click('nocard'); await click('noref');
  const three = await count();
  check('three dimensions: result <= each single dimension',
        three, Math.min(single.portable, single.nocard, single.noref), '<=');

  // ---- the Clear affordance ----
  await reset(); await click('portable'); await click('nocard');
  const clearLabel = await page.textContent('.chipbtn[data-f="all"]');
  check('Clear chip counts active filters', clearLabel.trim(), 'Clear 2');

  const armed = await page.getAttribute('.chipbtn[data-f="all"]', 'class');
  check('Clear chip is armed while filters are live', /armed/.test(armed), true);

  await reset();
  check('Clear resets to the full list', await count(), total);
  check('Clear chip returns to "All"',
        (await page.textContent('.chipbtn[data-f="all"]')).trim(), 'All');

  // ---- aria-pressed tracks state ----
  await reset(); await click('expiring');
  const pressed = await page.getAttribute('.chipbtn[data-f="expiring"]', 'aria-pressed');
  check('aria-pressed reflects selection', pressed, 'true');
  await reset();
  check('aria-pressed resets',
        await page.getAttribute('.chipbtn[data-f="expiring"]', 'aria-pressed'), 'false');

  // ---- search composes with filters (AND) ----
  await reset(); await click('portable');
  const pOnly = await count();
  await page.fill('#q', 'zzzz-no-such-provider');
  await page.waitForTimeout(40);
  check('search ANDs with filters', await count(), 0);
  await page.fill('#q', '');
  await page.waitForTimeout(40);
  check('clearing search restores filtered set', await count(), pOnly);

  // ---- rel="sponsored" must be limited to links that actually carry a referral ----
  // Reset first: a filter left active would hide most rows and make this vacuously pass.
  // Switch to the china-only tab first — the live referral (workbuddy) is cn-only, so
  // the referral links only exist on that tab. Asserting on the main tab would silently
  // pass with zero sponsored links and prove nothing.
  await reset();
  await page.click('.tab[data-tab="cn"]');
  await page.waitForTimeout(60);
  check('rel check runs against the full list', await count(), CN_ONLY.length);
  const relTally = await page.$$eval('a[rel]', as => {
    const t = { sponsored: [], plain: 0 };
    for (const a of as) {
      const parts = (a.getAttribute('rel') || '').split(/\s+/);
      if (parts.includes('sponsored')) t.sponsored.push(a.href);
      else if (parts.includes('noopener')) t.plain++;
    }
    return t;
  });
  // Two anchors carry the referral: the featured card and its row in the table.
  check('only referral links are marked sponsored', relTally.sponsored.length, 2);
  check('every sponsored link points at the referral URL',
        relTally.sponsored.every(h => h.includes('workbuddy.ai/invite')), true);
  check('all other provider links are unmarked', relTally.plain, CN_ONLY.length - 1);
  // Back to the main tab for the remaining assertions.
  await page.click('.tab[data-tab="main"]');
  await page.waitForTimeout(60);

  // ================= featured block =================
  // The live referral (workbuddy) is cn-only, so the featured block only exists on
  // the china-only tab. On the main tab it must be absent — a referral card the
  // reader cannot act on is worse than no card.
  await reset();
  check('featured block is hidden on the main tab when the referral is cn-only',
        await page.getAttribute('#feat', 'hidden'), '');

  await page.click('.tab[data-tab="cn"]');
  await page.waitForTimeout(60);
  const featHidden = await page.getAttribute('#feat', 'hidden');
  check('featured block is visible when a referral link is active', featHidden, null);

  const fcards = await page.$$eval('.fcard', as => as.map(a => ({
    href: a.href, rel: a.getAttribute('rel'), label: a.textContent
  })));
  check('featured holds exactly the referral offer', fcards.length, 1);
  check('featured card links to the referral URL',
        (fcards[0] || {}).href, 'https://workbuddy.ai/invite?code=VHQSZ8N6');
  check('featured card carries rel="noopener sponsored"',
        (fcards[0] || {}).rel, 'noopener sponsored');
  check('featured card is visibly labelled as a referral',
        /referral/i.test((fcards[0] || {}).label || ''), true);

  const featCopy = await page.textContent('.ftxt');
  check('featured copy says it is not a ranking',
        /not because they rank better/i.test(featCopy), true);

  // a filter that excludes the referral offer must empty the block, not leave a stale card
  await reset(); await click('noref');
  check('featured empties when referral offers are filtered out',
        await page.getAttribute('#feat', 'hidden'), '');
  await reset();
  await page.click('.tab[data-tab="main"]');
  await page.waitForTimeout(60);

  // ================= header multi-sort =================
  const firstId = () => page.$eval('.row', e => e.dataset.id);

  // single sort by allowance, defaulting to descending
  await page.click('.sh[data-key="budget"]');
  await page.waitForTimeout(60);
  check('header click sorts by allowance (desc first)', await firstId(), MAX_BUDGET_ID);

  // clicking the same header again flips the direction
  await page.click('.sh[data-key="budget"]');
  await page.waitForTimeout(60);
  const ascFirst = await firstId();
  check('clicking the same header flips direction', ascFirst !== MAX_BUDGET_ID, true);

  // shift-click appends a secondary sort, and the header shows its priority
  await reset();
  await page.click('.sh[data-key="kind"]');
  await page.waitForTimeout(60);
  await page.keyboard.down('Shift');
  await page.click('.sh[data-key="name"]');
  await page.keyboard.up('Shift');
  await page.waitForTimeout(60);
  const prText = await page.$$eval('.sh .pr', els => els.map(e => e.textContent).join(''));
  check('shift-click produces a 2-key sort with priority badges', /12|21/.test(prText), true);
  check('dropdown reports a custom multi-column sort',
        await page.inputValue('#sort'), 'custom');

  // the two-key sort must be internally consistent: primary key never decreases
  // Select on the real kind values. Using a wrong class here silently returns '' for every
  // row and makes the monotonicity check meaningless — which is how the .tag.port CSS bug
  // hid for so long.
  const kindSeq = await page.$$eval('.row', rows => rows.map(r => {
    const t = r.querySelector('.tag.portable,.tag.client,.tag.keyless,.tag.credit');
    return t ? t.className.split(' ').pop() : '';
  }));
  check('every row exposes a recognised kind tag', kindSeq.every(k => k !== ''), true);
  let mono = true;
  for (let i = 1; i < kindSeq.length; i++) if (kindSeq[i] < kindSeq[i - 1]) { mono = false; break; }
  check('primary sort key is monotonic down the table', mono, true);

  // the quick-sort dropdown still resets to a single sort
  await page.selectOption('#sort', 'name');
  await page.waitForTimeout(60);
  check('dropdown resets the stack to one key',
        (await page.$$eval('.sh .pr', els => els.map(e => e.textContent).join(''))), '');
  const names = await page.$$eval('.row .nm', els => els.map(e => e.textContent.trim()));
  check('dropdown name sort is alphabetical',
        names.join('|') === names.slice().sort((a, b) => a.localeCompare(b)).join('|'), true);

  // nulls must stay last in BOTH directions — an ongoing offer has no end date
  await page.click('.sh[data-key="end"]');
  await page.waitForTimeout(60);
  const ends = await page.$$eval('.row', rows => rows.map(r =>
    (r.querySelector('.until') || {}).textContent || ''));
  const firstNull = ends.findIndex(t => /ongoing/.test(t));
  const lastReal = ends.map((t, i) => /ongoing/.test(t) ? -1 : i).filter(i => i >= 0).pop();
  check('ongoing offers sort after dated ones (asc)',
        firstNull === -1 || firstNull > lastReal, true);
  await page.click('.sh[data-key="end"]');
  await page.waitForTimeout(60);
  const ends2 = await page.$$eval('.row', rows => rows.map(r =>
    (r.querySelector('.until') || {}).textContent || ''));
  const firstNull2 = ends2.findIndex(t => /ongoing/.test(t));
  const lastReal2 = ends2.map((t, i) => /ongoing/.test(t) ? -1 : i).filter(i => i >= 0).pop();
  check('ongoing offers still sort last when reversed',
        firstNull2 === -1 || firstNull2 > lastReal2, true);

  // aria-sort must reflect the active column
  await reset();
  await page.click('.sh[data-key="name"]');
  await page.waitForTimeout(60);
  check('aria-sort is set on the active column',
        await page.getAttribute('.sh[data-key="name"]', 'aria-sort'), 'ascending');
  check('aria-sort is cleared on inactive columns',
        await page.getAttribute('.sh[data-key="budget"]', 'aria-sort'), 'none');

  // ---- dashboard -> detail page cross-links ----
  // Every row must point at its own generated page, from both the name and the panel link,
  // and that page must actually exist on disk. A link to a file that was never generated
  // is a 404 that only shows up when a reader clicks it.
  await reset();
  const links = await page.$$eval('.row', rows => rows.map(r => {
    const name = r.querySelector('.nm a.nml');
    const full = r.querySelector('.detbar .full');
    return {
      id: r.dataset.id,
      name: name ? name.getAttribute('href') : null,
      full: full ? full.getAttribute('href') : null
    };
  }));
  check('every row has a name link to its detail page',
        links.every(l => l.name === `offers/${l.id}.html`), true);
  check('every row has a full-guide link in its panel',
        links.every(l => l.full === `offers/${l.id}.html`), true);
  check('cross-links cover every rendered row', links.length, EXPECTED_MAIN);
  const missing = links.filter(l => !fs.existsSync(path.join(__dirname, 'offers', l.id + '.html')));
  check('every linked detail page exists on disk', missing.length, 0);

  // ---- referral styling and support note ----
  // The referral CTA must be the green one, and the support note must exist whenever a
  // referral is live — it is the only place the reader is told they can help.
  // The live referral is cn-only, so this has to run on the china-only tab.
  await page.click('.tab[data-tab="cn"]');
  await page.waitForTimeout(60);
  const refStyle = await page.evaluate(() => {
    const ref = document.querySelector('.go.ref');
    const plain = document.querySelector('.go:not(.ref)');
    const rgb = el => el ? getComputedStyle(el).backgroundColor : null;
    return {
      hasRef: !!ref,
      hasPlain: !!plain,
      refBg: rgb(ref),
      plainBg: rgb(plain),
      support: document.querySelectorAll('.support').length,
      ribbon: document.querySelector('.fribbon') ? getComputedStyle(document.querySelector('.fribbon')).backgroundColor : null
    };
  });
  check('a referral CTA exists', refStyle.hasRef, true);
  check('an ordinary provider CTA also exists', refStyle.hasPlain, true);
  check('the referral CTA is styled differently from ordinary CTAs',
        refStyle.refBg !== refStyle.plainBg, true);
  // Green means the green channel dominates and red is low. Asserted numerically rather than
  // by class name, so a palette change cannot silently turn the referral link back to amber.
  const isGreen = c => {
    const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || '');
    return m ? (+m[2] > +m[1] + 30 && +m[2] > +m[3] + 20) : false;
  };
  check('the referral CTA is actually green', isGreen(refStyle.refBg), true);
  check('the featured ribbon is actually green', isGreen(refStyle.ribbon), true);
  check('a support note is shown near the referral links', refStyle.support >= 1, true);
  await page.click('.tab[data-tab="main"]');
  await page.waitForTimeout(60);

  // ---- mobile layout ----
  // The bugs this guards: the summary grid once forced the allowance and type tag into a 22px
  // column so the button overlapped them, and the rail stacked above the table pushing the
  // first offer two and a half screens down.
  for (const w of [360, 390]) {
    const mp = await browser.newPage({ viewport: { width: w, height: 844 } });
    await mp.addInitScript(() => { window.RADAR_DATA_URL = ''; });
    await mp.goto(URL);
    await mp.waitForSelector('.row', { timeout: 10000 });
    await mp.waitForTimeout(150);

    const m = await mp.evaluate(() => {
      const doc = document.documentElement;
      const rows = [...document.querySelectorAll('.row')].slice(0, 12);
      let overlap = 0, squeezed = 0;
      for (const r of rows) {
        const a = r.querySelector('.act')?.getBoundingClientRect();
        const k = r.querySelector('.kd')?.getBoundingClientRect();
        const n = r.querySelector('.nm')?.getBoundingClientRect();
        if (a && k && !(a.right < k.left || a.left > k.right || a.bottom < k.top || a.top > k.bottom)) overlap++;
        if (n && n.width < 120) squeezed++;
      }
      return {
        hScroll: doc.scrollWidth > doc.clientWidth + 2,
        overlap, squeezed,
        listTop: Math.round(document.querySelector('#list').getBoundingClientRect().top + window.scrollY),
        railBelow: (() => {
          const rail = document.querySelector('.rail'), list = document.querySelector('#list');
          return rail && list ? rail.getBoundingClientRect().top > list.getBoundingClientRect().top : false;
        })()
      };
    });
    check(`mobile ${w}px: no horizontal scroll`, m.hScroll, false);
    check(`mobile ${w}px: no button/tag overlap in the first 12 rows`, m.overlap, 0);
    check(`mobile ${w}px: offer names are not squeezed`, m.squeezed, 0);
    check(`mobile ${w}px: the rail sits below the table`, m.railBelow, true);
    check(`mobile ${w}px: the first offer is within 1.5 screens`, m.listTop <= w * 3.2, true);
    await mp.close();
  }

  // ---- per-offer detail pages ----
  // These pages carry their own stylesheet (assets/offer.css) and their own breakpoints, and
  // nothing loaded them before this block existed. A broken offer page would have shipped
  // behind a fully green suite. The user's original complaint ("the page breaks on mobile")
  // covered both surfaces, not just the dashboard.
  const OFFER = id => 'file:///' + path.resolve(__dirname, 'offers', id + '.html').replace(/\\/g, '/');
  const WANT_SECTIONS = ['Is it free forever?', 'What this is', "What it's good for",
                         'Caveats and red flags', 'Reviews and reputation'];
  // The referral page and an ordinary one, so both branches of the CTA styling are exercised.
  const OFFER_CASES = [['workbuddy', true], ['groq', false]];

  const dp = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const offerErrs = [];
  dp.on('pageerror', e => offerErrs.push('desktop: ' + e));

  for (const [id, isRef] of OFFER_CASES) {
    await dp.goto(OFFER(id));
    await dp.waitForSelector('.cta', { timeout: 10000 });
    const o = await dp.evaluate(({ want }) => {
      const cta = document.querySelector('.cta');
      // innerText, not textContent: it reflects what a reader actually sees. Note it returns
      // RENDERED text, and the headings are `text-transform: uppercase` in CSS — so the
      // comparison has to be case-insensitive or every section looks missing.
      const txt = document.body.innerText.toLowerCase();
      return {
        bg: cta ? getComputedStyle(cta).backgroundColor : null,
        sponsored: cta ? (cta.getAttribute('rel') || '').includes('sponsored') : false,
        support: document.querySelectorAll('.support').length,
        verdict: !!document.querySelector('.verdict'),
        missing: want.filter(h => !txt.includes(h.toLowerCase()))
      };
    }, { want: WANT_SECTIONS });

    check(`offer ${id}: has the free-forever verdict`, o.verdict, true);
    check(`offer ${id}: carries all five editorial sections`, o.missing.length, 0);
    // The whole point of the page is to say more than the dashboard row did. If a section
    // silently empties, the page regresses to a restatement of the table.
    check(`offer ${id}: referral CTA is marked sponsored`, o.sponsored, isRef);
    check(`offer ${id}: referral CTA is green`, isGreen(o.bg), isRef);
    check(`offer ${id}: support note only on the referral page`, o.support > 0, isRef);
  }
  await dp.close();

  // Mobile: the offer pages have their own breakpoints, so they need their own sweep.
  for (const w of [360, 390]) {
    const op = await browser.newPage({ viewport: { width: w, height: 844 } });
    op.on('pageerror', e => offerErrs.push(`mobile ${w}: ` + e));
    for (const [id] of OFFER_CASES) {
      await op.goto(OFFER(id));
      await op.waitForSelector('.cta', { timeout: 10000 });
      const m = await op.evaluate(() => {
        const doc = document.documentElement;
        const cta = document.querySelector('.cta');
        const r = cta.getBoundingClientRect();
        // Anything sticking out past the viewport is the classic mobile break: a fixed-width
        // table, a long unbroken URL, or a chip row that refuses to wrap.
        const wide = [...document.querySelectorAll('body *')].filter(el => {
          const b = el.getBoundingClientRect();
          return b.width > doc.clientWidth + 2 && b.height > 0;
        }).map(el => el.tagName + '.' + (el.className || '').toString().split(' ')[0]);
        return {
          hScroll: doc.scrollWidth > doc.clientWidth + 2,
          ctaRight: Math.round(r.right), ctaLeft: Math.round(r.left),
          ctaH: Math.round(r.height),
          wide: [...new Set(wide)].slice(0, 4)
        };
      });
      check(`offer ${id} @${w}px: no horizontal scroll`, m.hScroll, false);
      check(`offer ${id} @${w}px: no element overflows the viewport`, m.wide.length, 0);
      check(`offer ${id} @${w}px: the CTA stays inside the viewport`,
            m.ctaLeft >= 0 && m.ctaRight <= w, true);
      // Below ~40px the button is awkward to hit on a phone.
      check(`offer ${id} @${w}px: the CTA is a comfortable tap target`, m.ctaH >= 40, true);
    }
    await op.close();
  }

  // ---- no runtime errors ----
  check('no page errors', errors.length + offerErrs.length, 0);
  for (const e of offerErrs) errors.push(e);

  await browser.close();

  // ---- report ----
  console.log('\nMulti-select filter tests\n' + '-'.repeat(58));
  for (const r of results) {
    const mark = r.ok ? 'PASS' : 'FAIL';
    console.log(`  [${mark}] ${r.label}`);
    if (!r.ok) console.log(`         got ${r.actual}, expected ${r.cmp} ${r.expected}`);
  }
  const failed = results.filter(r => !r.ok);
  console.log('-'.repeat(58));
  console.log(`  ${results.length - failed.length}/${results.length} passed`);
  if (errors.length) {
    console.log('\n  Page errors:');
    for (const e of errors) console.log('    ' + e);
  }
  process.exit(failed.length ? 1 : 0);
})().catch(e => {
  console.error('UI test crashed:', e.message);
  process.exit(1);
});
