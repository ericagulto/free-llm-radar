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
     NODE_PATH=<managed-node-workspace>/node_modules node test-ui.js

   Requires playwright-core plus an installed Chromium. Skips
   cleanly (exit 0) if either is missing, so it never blocks a
   data refresh.
   ============================================================ */

const path = require('path');
const fs = require('fs');

let chromium;
try {
  ({ chromium } = require('playwright-core'));
} catch {
  console.log('SKIP — playwright-core not installed. UI test not run.');
  process.exit(0);
}

const CANDIDATES = [
  'C:/Users/Eric/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe',
  'C:/Users/Eric/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'
];
const EXE = CANDIDATES.find(p => fs.existsSync(p));
if (!EXE) {
  console.log('SKIP — no Chromium found under ms-playwright. UI test not run.');
  process.exit(0);
}

const URL = 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/');

// Read the offer count straight out of data.js so this test does not need editing every
// time an offer is added — while still catching a silent data loss via the floor below.
let EXPECTED = null, OFFERS = null;
try {
  const vm = require('vm');
  const box = { window: {} };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), box);
  OFFERS = box.window.RADAR.offers;
  EXPECTED = OFFERS.length;
} catch (e) {
  console.log('SKIP — could not read data.js to establish the expected count:', e.message);
  process.exit(0);
}
// The offer with the largest published allowance — used to check header sorting.
const MAX_BUDGET_ID = OFFERS.filter(o => o.budget > 0)
  .sort((a, b) => b.budget - a.budget)[0].id;
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
  const total = await count();
  check('baseline: rendered count matches data.js', total, EXPECTED);
  check('baseline: dataset has not silently shrunk', total, FLOOR, '>=');

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
  await reset();
  check('rel check runs against the full list', await count(), EXPECTED);
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
  check('all other provider links are unmarked', relTally.plain, EXPECTED - 1);

  // ================= featured block =================
  await reset();
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

  // ---- no runtime errors ----
  check('no page errors', errors.length, 0);

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
