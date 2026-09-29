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
const crypto = require('crypto');

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

// Content hash of the whole throwaway project. Used to prove a mutation actually
// changed something: a `String.replace` whose pattern no longer matches writes the
// file back untouched, and the case then reports MISSED while appearing to exercise
// the validator. That is how the coverage-contradiction case silently broke.
function digest(dir) {
  const h = crypto.createHash('sha1');
  const walk = d => {
    for (const e of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : 1)) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) { h.update('D' + e.name); walk(p); }
      else h.update('F' + e.name + fs.readFileSync(p));
    }
  };
  walk(dir);
  return h.digest('hex');
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
    const d = fs.readFileSync(f, 'utf8');
    const offer = d.match(/  \{\n    "id": "amd",[\s\S]*?\n  \},?\n/)[0]
      .replace('"id": "amd"', '"id": "ghost-offer"');
    fs.writeFileSync(f, d.replace('  offers: [\n', '  offers: [\n' + offer));
  }],
  ['an offer has no editorial content', () => {
    const f = path.join(TMP, 'content.js');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('\n  groq: {', '\n  groqMISSING: {'));
  }],
  ['content has an invalid "free forever" value', () => {
    const f = path.join(TMP, 'content.js');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace("forever: 'standing'", "forever: 'eternal'"));
  }],
  // Rewrites an existing citation rather than appending a second `documented` key.
  // Appending would be silently discarded: the entry already has its own `documented`
  // later in the object literal, so the injected array is overridden and no
  // contradiction exists for validate.js to find. (That bug made this case report
  // MISSED while appearing to test the right thing.)
  ['content claims no independent coverage while citing a third-party review', () => {
    const f = path.join(TMP, 'content.js');
    const src = "{ t: 'The API key is optional; anonymous requests are accepted.', src: 'LLM7 documentation', url: 'https://api.llm7.io/' }";
    const dst = "{ t: 'The API key is optional; anonymous requests are accepted.', src: 'LLM7 documentation', url: 'https://reddit.com/r/LocalLLaMA/comments/x' }";
    const d = fs.readFileSync(f, 'utf8');
    if (!d.includes(src)) throw new Error('mutation target not found — the llm7 citation changed shape');
    fs.writeFileSync(f, d.replace(src, dst));
  }],
  ['a page loses its reviews section', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('<h2>Reviews and reputation</h2>', '<h2>Gone</h2>'));
  }],
  ['the "Our take" box loses its opinion label', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('Our take <em>opinion</em>', 'Our take'));
  }],
  ['a page loses its free-forever verdict', () => {
    const f = path.join(TMP, 'offers', 'groq.html');
    fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace('Is it free forever?', 'Something else'));
  }]
];

let pass = 0;
for (const [label, mutate] of CASES) {
  reset();                                 // full clean copy before each case
  const before = digest(TMP);
  let threw = null;
  try { mutate(); } catch (e) { threw = e.message; }
  const after = digest(TMP);

  if (threw || before === after) {
    // A no-op mutation is a broken test, not a passing one. Report it as loudly as a
    // MISSED case so it cannot masquerade as coverage.
    console.log(`  [NO-OP] ${label}\n           ${threw || 'the mutation changed nothing — this case tests nothing'}`);
    continue;
  }

  const r = runValidate();
  const caught = r.code !== 0;
  const firstFail = (r.out.match(/^\s+x .*$/m) || ['(no failure line captured)'])[0].trim();
  console.log(`  [${caught ? 'CAUGHT' : 'MISSED'}] ${label}\n           ${firstFail}`);
  if (caught) pass++;
}

console.log(`\n${pass}/${CASES.length} breakages caught`);
fs.rmSync(TMP, { recursive: true, force: true });
process.exit(pass === CASES.length ? 0 : 1);
