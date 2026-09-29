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

for (const f of ['data.js', 'referrals.js']) {
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
const REFERRALS = sandbox.window.REFERRALS;
const YOUR_LINKS = sandbox.window.YOUR_LINKS;

// ---------- 2. RADAR shape ----------
if (!RADAR) fail('data.js did not set window.RADAR');
if (!Array.isArray(RADAR.offers) || RADAR.offers.length === 0) fail('RADAR.offers is missing or empty');
if (!Array.isArray(RADAR.rail)) fail('RADAR.rail is missing');
if (!RADAR.updated) warn('RADAR.updated is missing — the header will show a stale date');

const REQUIRED = ['id', 'name', 'sub', 'kind', 'budget', 'unit', 'end', 'added', 'status',
                  'card', 'china', 'link', 'linkLabel', 'budgetNote', 'models', 'base',
                  'auth', 'steps', 'test'];

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
  for (const ref of ['deploy/sync-data.sh', 'validate.js', 'CHANGELOG.md', 'referrals.js']) {
    if (!agents.includes(ref)) warn(`AGENTS.md no longer mentions ${ref} — has it drifted?`);
  }
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
