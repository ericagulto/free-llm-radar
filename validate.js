/* ============================================================
   Free LLM Radar — validator
   ------------------------------------------------------------
   Run after ANY hand edit, and as the last step of every refresh:

       node free-llm-radar/validate.js

   Exits 0 on success, 1 on failure. The refresh job must NOT
   overwrite data.js if this fails — a failing run should leave
   the previous data.js intact so the page keeps working.

   It loads data.js and referrals.js in a sandbox, so a syntax
   error in either file is reported here rather than as a blank
   page in the browser.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const read = f => fs.readFileSync(path.join(DIR, f), 'utf8');

const fails = [];
const warns = [];
const fail = m => fails.push(m);
const warn = m => warns.push(m);

const OFFER_KINDS = ['portable', 'client', 'keyless', 'credit'];
const OFFER_STATUS = ['new', 'extended', 'expiring', 'active'];
const PROG_STATUS = ['live', 'paid-only', 'dead', 'unknown'];
const RAIL_KINDS = ['new', 'ext', 'exp', 'dead'];

// ---------- 1. parse the three files ----------
const sandbox = { window: {} };
vm.createContext(sandbox);

for (const f of ['data.js', 'content.js', 'referrals.js']) {
  try {
    vm.runInContext(read(f), sandbox, { filename: f });
    console.log(`${f}: OK`);
  } catch (e) {
    fail(`${f} does not parse — ${e.message}`);
  }
}
if (fails.length) {
  report();
}

const RADAR = sandbox.window.RADAR;
const CONTENT = sandbox.window.CONTENT;
const REFERRALS = sandbox.window.REFERRALS;
const YOUR_LINKS = sandbox.window.YOUR_LINKS;

// ---------- 2. RADAR shape ----------
if (!RADAR) fail('data.js did not set window.RADAR');
if (!Array.isArray(RADAR.offers) || RADAR.offers.length === 0) fail('RADAR.offers is missing or empty');
if (!Array.isArray(RADAR.rail)) fail('RADAR.rail is missing');
if (!RADAR.updated) warn('RADAR.updated is missing — the header will show a stale date');

const REQUIRED = ['id', 'name', 'sub', 'kind', 'budget', 'unit', 'end', 'added', 'status',
                  'card', 'china', 'reach', 'link', 'linkLabel', 'budgetNote', 'models', 'base',
                  'auth', 'steps', 'test'];

// Reach answers "can a reader outside mainland China actually sign up?"
// cn-only is NOT the same as china:true — a Chinese vendor can be globally reachable.
const OFFER_REACH = ['global', 'cn-direct', 'cn-only'];

const ids = new Set();
for (const o of RADAR.offers || []) {
  for (const k of REQUIRED) {
    if (o[k] === undefined || o[k] === null && k !== 'end') {
      fail(`offer "${o.id || '(no id)'}" is missing required field "${k}"`);
    }
  }
  if (ids.has(o.id)) fail(`duplicate offer id "${o.id}" — ids must be permanent and unique`);
  ids.add(o.id);

  if (!OFFER_KINDS.includes(o.kind)) fail(`offer "${o.id}" has unknown kind "${o.kind}"`);
  if (!OFFER_STATUS.includes(o.status)) fail(`offer "${o.id}" has unknown status "${o.status}"`);
  if (!OFFER_REACH.includes(o.reach)) {
    fail(`offer "${o.id}" has unknown reach "${o.reach}" — must be one of ${OFFER_REACH.join(', ')}`);
  }
  // `china` is the legacy boolean. Guard the two against drifting apart in the
  // direction that matters: a cn-only offer can never be china:false.
  if (o.reach === 'cn-only' && o.china !== true) {
    fail(`offer "${o.id}" is reach 'cn-only' but china is not true — these contradict`);
  }
  if (typeof o.budget !== 'number') fail(`offer "${o.id}" budget must be a number, got ${typeof o.budget}`);
  if (o.end !== null && !/^\d{4}-\d{2}-\d{2}$/.test(o.end)) {
    fail(`offer "${o.id}" end must be 'YYYY-MM-DD' or null, got "${o.end}"`);
  }
  if (o.link && !/^https:\/\//.test(o.link)) fail(`offer "${o.id}" link is not https: ${o.link}`);
  if (!Array.isArray(o.steps) || o.steps.length === 0) fail(`offer "${o.id}" has no setup steps`);
  if (!Array.isArray(o.models) || o.models.length === 0) warn(`offer "${o.id}" lists no model IDs`);
}

// rail groups: { d: 'today', label, items: [{ c, n, t }] }
// c = chip class (new | ext | exp | closed)
const RAIL_DAYS = ['today', 'yesterday', 'week', 'closed'];
for (const g of RADAR.rail || []) {
  if (!RAIL_DAYS.includes(g.d)) fail(`rail group has unknown day key "${g.d}"`);
  if (!g.label) fail(`rail group "${g.d}" has no label`);
  if (!Array.isArray(g.items)) { fail(`rail group "${g.d}" has no items array`); continue; }
  for (const it of g.items) {
    if (!RAIL_KINDS.includes(it.c)) fail(`rail item "${it.n || '(no name)'}" has unknown chip "${it.c}"`);
    if (!it.n || !it.t) fail(`rail item under "${g.d}" is missing a name or text`);
  }
}

// ---------- 3. referrals shape ----------
if (!REFERRALS) fail('referrals.js did not set window.REFERRALS');
if (!YOUR_LINKS) fail('referrals.js did not set window.YOUR_LINKS');

const progIds = new Set();
for (const p of REFERRALS.programs || []) {
  for (const k of ['id', 'provider', 'status', 'reward', 'trigger', 'note']) {
    if (!p[k]) fail(`program "${p.id || '(no id)'}" is missing field "${k}"`);
  }
  if (progIds.has(p.id)) fail(`duplicate program id "${p.id}"`);
  progIds.add(p.id);

  if (!PROG_STATUS.includes(p.status)) fail(`program "${p.id}" has unknown status "${p.status}"`);
  if (p.status === 'live' && p.paidRequired !== false) {
    warn(`program "${p.id}" is 'live' but paidRequired is not false — is the free-tier fit real?`);
  }
  if (p.termsUrl && !/^https:\/\//.test(p.termsUrl)) fail(`program "${p.id}" termsUrl is not https:`);
}

// ---------- 4. offerRefs must resolve both ways ----------
const refs = REFERRALS.offerRefs || {};
for (const [offerId, progId] of Object.entries(refs)) {
  if (!ids.has(offerId)) fail(`offerRefs maps "${offerId}" but no such offer exists in data.js`);
  if (!progIds.has(progId)) fail(`offerRefs maps "${offerId}" -> "${progId}" but no such program exists`);
}

// ---------- 5. disclosure ----------
const short = REFERRALS.disclosureShort || '';
const long = REFERRALS.disclosureLong || '';
if (short.length < 40) fail('disclosureShort is missing or too short to be meaningful');
if (long.length < 200) fail('disclosureLong is missing or too short to satisfy the prominence test');
for (const phrase of ['referral', 'material']) {
  if (!long.toLowerCase().includes(phrase)) {
    fail(`disclosureLong does not mention "${phrase}" — required for an FTC-compliant disclosure`);
  }
}

// ---------- 6. presentation layer must still carry the compliance hooks ----------
const html = read('index.html');
if (!/noopener sponsored/.test(html)) fail('index.html: referral links lost rel="sponsored"');
// rel="sponsored" declares a paid placement. If it is not gated on the referral actually
// being active, every ordinary provider link gets mislabelled as sponsored.
if (!/isRef\s*\?\s*'noopener sponsored'\s*:\s*'noopener'/.test(html)) {
  fail('index.html: rel="sponsored" is not conditional on the referral being active — ' +
       'ordinary provider links would be mislabelled as sponsored');
}
if (!/id="disclosure"/.test(html) && !/class="disc"/.test(html)) fail('index.html: no disclosure element found');
// Every kind must have a matching .tag rule. The markup emits class="tag <kind>", so a rule
// written as ".tag.port" silently renders the tag unstyled — which is exactly what happened.
for (const k of OFFER_KINDS) {
  if (!new RegExp('\\.tag\\.' + k + '\\s*[,{]').test(html)) {
    fail(`index.html: no CSS rule for .tag.${k} — that kind's tag renders unstyled`);
  }
}
// The featured block must stay labelled; an unlabelled promoted block is the thing we must not ship.
if (!/class="fribbon"/.test(html) || !/class="frib"/.test(html)) {
  fail('index.html: the featured block lost its label — an unlabelled promoted placement is not shippable');
}
if (!/referrals\.js/.test(html)) fail('index.html: no longer loads referrals.js');
if (!/data\.js/.test(html)) fail('index.html: no longer loads data.js');
if (!/typeof RADAR === 'undefined'/.test(html)) warn('index.html: the missing-data guard looks gone');

// ---------- 7. the runbook must be present ----------
// The scheduled refresh reads AGENTS.md for its sources and procedure. A warning rather than a
// failure: a missing doc should not block a data refresh, but it should be loud.
if (!fs.existsSync(path.join(DIR, 'AGENTS.md'))) {
  warn('AGENTS.md is missing — an agent picking this up cold would have no runbook');
} else {
  const agents = read('AGENTS.md');
  for (const ref of ['deploy/sync-data.sh', 'validate.js', 'CHANGELOG.md', 'referrals.js', 'build-pages.js']) {
    if (!agents.includes(ref)) warn(`AGENTS.md no longer mentions ${ref} — has it drifted?`);
  }
}

// ---------- 8. editorial content ----------
// content.js is hand-authored and carries the claims that make a page worth reading. An offer
// without an entry renders a thin page; a wrong `forever` value misleads a reader about whether
// the thing will still exist next month. Both are failures, not warnings.
const FOREVER = ['standing', 'limited', 'recurring', 'one-off', 'unclear'];
const COVERAGE = ['none', 'thin', 'some', 'good'];
// Venues that would count as independent coverage. Used only to catch a contradiction between
// the `coverage` claim and the citations — not as a judgement about quality.
const THIRD_PARTY = /(reddit\.com|news\.ycombinator|medium\.com|substack\.com|techcrunch|theverge|venturebeat|arstechnica|theregister|hackernews|github\.com\/[^/]+\/[^/]+\/(issues|discussions))/i;

if (!CONTENT) {
  fail('content.js did not set window.CONTENT — every offer page would render without its sections');
} else {
  const cIds = Object.keys(CONTENT);
  for (const id of ids) {
    if (!CONTENT[id]) fail(`no editorial content for offer "${id}" — its page would be a stub`);
  }
  for (const id of cIds) {
    if (!ids.has(id)) fail(`content.js has an entry for "${id}" but no such offer exists — orphan`);
  }

  for (const [id, c] of Object.entries(CONTENT)) {
    for (const k of ['what', 'forever', 'foreverNote', 'uses', 'redFlags', 'reviews']) {
      if (c[k] === undefined || c[k] === null) fail(`content "${id}" is missing "${k}"`);
    }
    if (!FOREVER.includes(c.forever)) {
      fail(`content "${id}" has unknown forever value "${c.forever}" — must be one of ${FOREVER.join(', ')}`);
    }
    if (typeof c.what !== 'string' || c.what.length < 60) {
      fail(`content "${id}" what is too short to be worth a section (${String(c.what).length} chars)`);
    }
    if (!Array.isArray(c.uses) || c.uses.length < 2) fail(`content "${id}" needs at least 2 uses`);
    if (!Array.isArray(c.redFlags) || c.redFlags.length < 1) {
      fail(`content "${id}" has no redFlags — every offer has at least one caveat`);
    }
    // A red flag that is actually a compliment is worse than none: it trains readers to skip them.
    for (const f of (c.redFlags || [])) {
      if (/^serves china|^cheap|^fast|^great/i.test(String(f).trim())) {
        warn(`content "${id}" lists what looks like a positive as a red flag: "${String(f).slice(0, 50)}…"`);
      }
    }

    const r = c.reviews || {};
    if (!COVERAGE.includes(r.coverage)) {
      fail(`content "${id}" has unknown reviews.coverage "${r.coverage}"`);
    }
    if (!r.coverageNote) fail(`content "${id}" is missing reviews.coverageNote`);
    else if (r.coverageNote.length < 40) fail(`content "${id}" reviews.coverageNote is too short to say anything`);
    if (!r.ourTake) fail(`content "${id}" is missing reviews.ourTake`);
    if (!Array.isArray(r.documented) || r.documented.length === 0) {
      fail(`content "${id}" has no reviews.documented entries`);
    }
    for (const d of (r.documented || [])) {
      if (!d.t || !d.src) fail(`content "${id}" has a documented entry missing "t" or "src"`);
      // An invented URL is the worst failure mode here — it looks sourced and is not.
      if (d.url && !/^https:\/\//.test(d.url)) {
        fail(`content "${id}" documented url is not https: ${d.url}`);
      }
    }
    // Claiming "no independent reviews found" while citing one is a contradiction a reader
    // would catch. Matched against known third-party venues rather than by trying to exclude
    // vendor domains, which produced false positives on the vendors' own API docs.
    if (r.coverage === 'none') {
      const thirdParty = (r.documented || []).find(d => d.url && THIRD_PARTY.test(d.url));
      if (thirdParty) {
        fail(`content "${id}" claims no independent coverage but cites ${thirdParty.url}`);
      }
    }
  }

  const cov = {}, fv = {};
  for (const c of Object.values(CONTENT)) {
    cov[c.reviews.coverage] = (cov[c.reviews.coverage] || 0) + 1;
    fv[c.forever] = (fv[c.forever] || 0) + 1;
  }
  console.log(`content.js: OK — ${cIds.length} entries`);
  console.log('  free-forever: ' + Object.entries(fv).map(([k, v]) => `${k} ${v}`).join(' | '));
  console.log('  review coverage: ' + Object.entries(cov).map(([k, v]) => `${k} ${v}`).join(' | '));
}

// ---------- 9. generated offer pages ----------
// build-pages.js writes one static page per offer. A stale or partial generation is
// invisible in the browser until a reader clicks a link and gets a 404, so the output is
// checked here rather than trusted. If offers/ is absent the run has simply not generated
// yet — that is a warning, not a failure, so a data-only edit can still be validated.
const SITE = 'https://ericagulto.github.io/free-llm-radar';
const OFFERS_DIR = path.join(DIR, 'offers');

function refFor(o) {
  const pid = refs[o.id];
  if (!pid) return null;
  const prog = (REFERRALS.programs || []).find(p => p.id === pid);
  if (!prog) return null;
  const mine = (YOUR_LINKS || {})[pid];
  return { prog, pid, mine, active: prog.status === 'live' && !!mine && mine.length > 0 };
}

const escHtml = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let pageCount = 0;
if (!fs.existsSync(OFFERS_DIR)) {
  warn('offers/ does not exist — run build-pages.js to generate the detail pages');
} else {
  const files = fs.readdirSync(OFFERS_DIR).filter(f => f.endsWith('.html'));
  const have = new Set(files);
  const expected = new Set(['index.html', ...[...ids].map(id => id + '.html')]);

  for (const id of ids) {
    if (!have.has(id + '.html')) fail(`offers/${id}.html was not generated — run build-pages.js`);
  }
  for (const f of files) {
    if (!expected.has(f)) fail(`offers/${f} is orphaned — no offer in data.js has that id`);
  }
  if (!have.has('index.html')) fail('offers/index.html was not generated');

  let sponsored = 0;
  for (const o of RADAR.offers || []) {
    const p = path.join(OFFERS_DIR, o.id + '.html');
    if (!fs.existsSync(p)) continue;
    pageCount++;
    const h = fs.readFileSync(p, 'utf8');
    const at = `offers/${o.id}.html`;

    // An unrendered template literal means the generator silently failed on this offer.
    if (/\$\{/.test(h)) fail(`${at} contains an unrendered \${...} placeholder`);
    if ((h.match(/<h1>/g) || []).length !== 1) fail(`${at} must have exactly one <h1>`);
    if (!h.includes(`<h1>${escHtml(o.name)}</h1>`)) fail(`${at} does not carry the offer name in its <h1>`);
    if ((h.match(/<dl class="facts">/g) || []).length !== 1) fail(`${at} must have exactly one facts block`);
    if (!h.includes(`<link rel="canonical" href="${SITE}/offers/${o.id}.html">`)) {
      fail(`${at} is missing its canonical URL`);
    }
    if (!h.includes(`<title>${escHtml(o.name)} free tier`)) fail(`${at} has a non-unique or malformed <title>`);

    // Search engines truncate around 155–160 characters; a longer one is silently cut off.
    const md = h.match(/<meta name="description" content="([^"]*)"/);
    if (!md) fail(`${at} has no meta description`);
    else if (md[1].length < 60) fail(`${at} meta description is too short to be useful (${md[1].length})`);
    else if (md[1].length > 160) fail(`${at} meta description is ${md[1].length} chars — search engines will truncate it`);

    // Structured data must survive the templating.
    if (!/"@type":"BreadcrumbList"/.test(h)) fail(`${at} lost its BreadcrumbList structured data`);

    // The editorial sections are the whole reason these pages exist beyond the dashboard.
    for (const [marker, label] of [
      ['Is it free forever?', 'the free-forever verdict'],
      ['<h2>What this is</h2>', 'the "What this is" section'],
      ["<h2>What it's good for</h2>", 'the "What it\'s good for" section'],
      ['<h2>Caveats and red flags</h2>', 'the red-flags section'],
      ['<h2>Reviews and reputation</h2>', 'the reviews section']
    ]) {
      if (!h.includes(marker)) fail(`${at} is missing ${label} — the page would be thinner than the dashboard`);
    }
    // The opinion box must stay labelled, or it reads as verified fact.
    if (!/Our take\s*<em>opinion<\/em>/.test(h)) {
      fail(`${at} does not label its "Our take" box as opinion`);
    }

    // rel="sponsored" may appear only on pages that genuinely carry a referral link.
    const isRef = !!(refFor(o) || {}).active;
    const hasSponsored = /noopener sponsored/.test(h);
    if (isRef && !hasSponsored) fail(`${at} carries a live referral but its link is not marked rel="sponsored"`);
    if (!isRef && hasSponsored) fail(`${at} marks an ordinary provider link as rel="sponsored"`);
    if (hasSponsored) sponsored++;
  }
  console.log(`offers/: ${pageCount} pages checked · ${sponsored} carrying a sponsored referral link`);
}

// sitemap and robots must agree with what was actually generated
if (fs.existsSync(path.join(DIR, 'sitemap.xml'))) {
  const sm = read('sitemap.xml');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const wantUrls = new Set([`${SITE}/`, `${SITE}/offers/`, ...[...ids].map(id => `${SITE}/offers/${id}.html`)]);
  for (const u of wantUrls) {
    if (!locs.includes(u)) fail(`sitemap.xml is missing ${u}`);
  }
  for (const u of locs) {
    if (!wantUrls.has(u)) fail(`sitemap.xml lists ${u}, which is not a generated page`);
  }
  if (locs.length !== wantUrls.size) {
    fail(`sitemap.xml has ${locs.length} urls but ${wantUrls.size} pages were generated`);
  }
  console.log(`sitemap.xml: ${locs.length} urls`);
} else {
  warn('sitemap.xml is missing — run build-pages.js');
}

if (fs.existsSync(path.join(DIR, 'robots.txt'))) {
  if (!/Sitemap:\s*https:\/\//.test(read('robots.txt'))) {
    fail('robots.txt does not point at a sitemap — the offer pages will not be discovered');
  }
} else {
  warn('robots.txt is missing — run build-pages.js');
}

if (!fs.existsSync(path.join(DIR, 'assets', 'offer.css'))) {
  warn('assets/offer.css is missing — the detail pages will render unstyled');
}

// ---------- report ----------
console.log(`data.js: OK — offers ${(RADAR.offers || []).length} | rail groups ${(RADAR.rail || []).length}`);
console.log(`referrals.js: OK — programs ${(REFERRALS.programs || []).length}`);

const configured = Object.entries(YOUR_LINKS || {}).filter(([, v]) => v && v.length);
console.log(`  YOUR_LINKS keys: ${Object.keys(YOUR_LINKS || {}).join(', ')}`);
console.log(`  referral links configured: ${configured.length}`);

let shown = 0;
for (const [offerId, progId] of Object.entries(refs)) {
  const prog = (REFERRALS.programs || []).find(p => p.id === progId);
  const mine = (YOUR_LINKS || {})[progId] || '';
  const live = prog && prog.status === 'live' && mine.length > 0;
  if (shown === 0) console.log('offers showing a referral block:');
  shown++;
  console.log(`  ${offerId} -> ${prog ? prog.provider : progId} [${prog ? prog.status : '?'}]` +
              `${prog && prog.paidRequired ? ' PAID-ONLY' : ''}` +
              `${live ? ' LINK ACTIVE' : ' no link'}`);
}
console.log(`  total: ${shown}`);

const byStatus = {};
for (const p of REFERRALS.programs || []) byStatus[p.status] = (byStatus[p.status] || 0) + 1;
console.log('programs: ' + Object.entries(byStatus).map(([k, v]) => `${k} ${v}`).join(' | '));

report();

function report() {
  if (warns.length) {
    console.log('\nWARNINGS');
    for (const w of warns) console.log('  ! ' + w);
  }
  if (fails.length) {
    console.log('\nFAILURES');
    for (const f of fails) console.log('  x ' + f);
    console.log(`\n${fails.length} FAILURE(S) — do not publish data.js in this state`);
    process.exit(1);
  }
  console.log('\nALL CHECKS PASSED');
  process.exit(0);
}
