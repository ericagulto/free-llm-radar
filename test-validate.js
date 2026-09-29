/* ============================================================
   Free LLM Radar — negative test for validate.js
   ------------------------------------------------------------
       node test-validate.js

   A validator that cannot fail is worthless. This deliberately
   breaks the generated output in nine ways and asserts that
   validate.js rejects every one of them.

   It runs validate.js in-process inside a vm context with a
   stubbed process.exit, rather than as a child process: the
   sandbox refuses to spawn node.exe (EBUSY), and a child that
   never starts reports "caught" for every case, which is worse
   than no test at all.

   All work happens in a throwaway copy — the real project is
   never modified. Exits 1 if any breakage goes undetected.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');

const SRC = __dirname;
const TMP = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'radar-neg-')), 'proj');

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const a = path.join(from, e.name), b = path.join(to, e.name);
    if (e.isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
}

// A full reset, not an overlay: copyDir only adds and overwrites, so without the wipe a
// file added by one case would survive into the next and let later cases pass for the
// wrong reason.
function reset() {
  fs.rmSync(TMP, { recursive: true, force: true });
  copyDir(SRC, TMP);
}

const EXIT = Symbol('process.exit');

function runValidate() {
  const logs = [];
  let code = null;
  const log = (...a) => logs.push(a.join(' '));
  const ctx = {
    require, __dirname: TMP, __filename: path.join(TMP, 'validate.js'),
    console: { log, error: log, warn: log },
    process: { exit: c => { code = c; throw EXIT; }, argv: [], env: process.env },
    Buffer, setTimeout, clearTimeout, setInterval, clearInterval, URL
  };
  ctx.global = ctx;
  ctx.globalThis = ctx;
  try {
    vm.runInNewContext(fs.readFileSync(path.join(TMP, 'validate.js'), 'utf8'), ctx,
      { filename: 'validate.js' });
    if (code === null) code = 0;          // fell off the end without calling exit
  } catch (e) {
    if (e !== EXIT) { code = -2; logs.push('THREW: ' + e.message); }
  }
  return { code, out: logs.join('\n') };
}

// ---- baseline: a clean copy must pass, or the test proves nothing ----
reset();
const base = runValidate();
console.log(`baseline on a clean copy: exit ${base.code} (expect 0)`);
if (base.code !== 0) {
  console.log('--- baseline output ---\n' + base.out);
  console.log('\nBaseline does not pass — the negative test cannot be trusted.');
  fs.rmSync(TMP, { recursive: true, force: true });
  process.exit(1);
}

const CASES = [
  ['a generated page is deleted', () => fs.unlinkSync(path.join(TMP, 'offers', 'groq.html'))],
  ['an orphan page is added', () => fs.writeFileSync(path.join(TMP, 'offers', 'zzz-nope.html'), '<html></html>')],
  ['a page has an unrendered placeholder', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('</main>', '${o.name}</main>'));
  }],
  ['a page loses its canonical', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/<link rel="canonical"[^>]*>\n/, ''));
  }],
  ['an ordinary link is marked sponsored', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('rel="noopener"', 'rel="noopener sponsored"'));
  }],
  ['a referral page loses its sponsored mark', () => {
    const f = path.join(TMP, 'offers', 'workbuddy.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('rel="noopener sponsored"', 'rel="noopener"'));
  }],
  ['the sitemap drops a url', () => {
    const f = path.join(TMP, 'sitemap.xml');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/ *<url><loc>[^<]*groq[^<]*<\/loc>.*?<\/url>\n/, ''));
  }],
  ['the meta description runs too long', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8')
      .replace(/(<meta name="description" content=")[^"]*/, '$1' + 'x'.repeat(200)));
  }],
  ['the breadcrumb structured data is stripped', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/"@type":"BreadcrumbList"/, '"@type":"Thing"'));
  }],
  ['an offer is added to data.js but its page is never generated', () => {
    const f = path.join(TMP, 'data.js');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(
      'window.RADAR = {',
      'window.RADAR = {\n  // injected by the negative test'));
    const d = fs.readFileSync(f, 'utf8');
    const offer = d.match(/  \{\n    "id": "amd",[\s\S]*?\n  \},?\n/)[0]
      .replace('"id": "amd"', '"id": "ghost-offer"');
    fs.writeFileSync(f, d.replace('  offers: [\n', '  offers: [\n' + offer));
  }]
];

let pass = 0;
for (const [label, mutate] of CASES) {
  reset();                                 // full clean copy before each case
  mutate();
  const r = runValidate();
  const caught = r.code !== 0;
  const firstFail = (r.out.match(/^\s+x .*$/m) || ['(no failure line captured)'])[0].trim();
  console.log(`  [${caught ? 'CAUGHT' : 'MISSED'}] ${label}\n           ${firstFail}`);
  if (caught) pass++;
}

console.log(`\n${pass}/${CASES.length} breakages caught`);
fs.rmSync(TMP, { recursive: true, force: true });
process.exit(pass === CASES.length ? 0 : 1);
