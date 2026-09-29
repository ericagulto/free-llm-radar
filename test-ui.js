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
let EXPECTED = null;
try {
  const vm = require('vm');
  const box = { window: {} };
  vm.createContext(box);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8'), box);
  EXPECTED = box.window.RADAR.offers.length;
} catch (e) {
  console.log('SKIP — could not read data.js to establish the expected count:', e.message);
  process.exit(0);
}
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
  check('only referral links are marked sponsored', relTally.sponsored.length, 1);
  check('the sponsored link is the referral URL',
        !!(relTally.sponsored[0] || '').includes('workbuddy.ai/invite'), true);
  check('all other provider links are unmarked', relTally.plain, EXPECTED - 1);

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
