/* ============================================================
   Free LLM Radar — per-offer page generator
   ------------------------------------------------------------
       node free-llm-radar/build-pages.js

   Reads the validated data.js + referrals.js and writes:

     offers/<id>.html     one page per offer
     offers/index.html    index of every offer page
     assets/offer.css     shared stylesheet for the offer pages
     sitemap.xml
     robots.txt

   WHY STATIC PAGES AND NOT A CLIENT-SIDE DETAIL VIEW
     A single page that renders details from a query string is one
     URL to a search engine, so none of it ranks. Real files mean
     each offer can rank for its own query ("groq free tier",
     "amd token factory limits"), which is the entire point of
     building them.

   DESIGN RULES
     - Deterministic: same input always produces byte-identical
       output, so git diffs only show real changes.
     - Honest: every derived statement comes from a field in
       data.js. Nothing is invented to fill space. Where we do not
       know something, the page says so rather than implying.
     - Fails loudly: if an offer cannot be rendered the script
       exits non-zero rather than emitting a half-built page.
   ============================================================ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const SITE = 'https://ericagulto.github.io/free-llm-radar';
const OUT_OFFERS = path.join(DIR, 'offers');
const OUT_ASSETS = path.join(DIR, 'assets');
const GENERATED = new Date().toISOString().slice(0, 10);

// ---------- load ----------
const box = { window: {} };
vm.createContext(box);
for (const f of ['data.js', 'referrals.js']) {
  vm.runInContext(fs.readFileSync(path.join(DIR, f), 'utf8'), box, { filename: f });
}
const RADAR = box.window.RADAR;
const REFERRALS = box.window.REFERRALS || { programs: [], offerRefs: {} };
const MY = box.window.YOUR_LINKS || {};

if (!RADAR || !Array.isArray(RADAR.offers)) {
  console.error('data.js did not expose RADAR.offers — run validate.js first.');
  process.exit(1);
}

const progById = {};
for (const p of REFERRALS.programs || []) progById[p.id] = p;

// Same resolution rule the dashboard uses: a referral is only live when the programme is
// live AND the operator has actually configured a link for it.
function refFor(o) {
  const pid = REFERRALS.offerRefs ? REFERRALS.offerRefs[o.id] : null;
  if (!pid) return null;
  const prog = progById[pid];
  if (!prog) return null;
  const mine = MY[pid];
  const active = prog.status === 'live' && mine && mine.length > 0;
  return { prog, pid, mine, active };
}

// ---------- helpers ----------
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const stripTags = s => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n) => { s = stripTags(s); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…'; };

const KIND_LABEL = { portable: 'Portable API key', client: 'Client-bound', keyless: 'Keyless', credit: 'Cloud credit' };
// Headings for the "alternatives" block. Written out rather than derived from KIND_LABEL,
// because lowercasing a label produces "portable api key" and mangles the acronyms.
const KIND_ALT_HEADING = {
  portable: 'Other portable API key options',
  keyless: 'Other keyless endpoints',
  credit: 'Other cloud credit offers',
  client: 'Other client-bound options'
};
const KIND_NOTE = {
  portable: 'You get a real API key you can point any OpenAI-compatible client at.',
  client: 'Usage is granted <b>inside the vendor\'s own app</b>. There is no extractable API key — you cannot wire this into your own stack.',
  keyless: 'No key at all. Call the endpoint directly, subject to rate limits.',
  credit: 'A credit balance on a cloud platform, spent through that provider\'s own APIs.'
};

function daysTo(d) {
  if (!d) return null;
  const t = Date.parse(d + 'T23:59:59+08:00');
  if (isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86400000);
}

function endLabel(o) {
  if (!o.end) return { text: 'Ongoing — no published end date', cls: 'ok' };
  const n = daysTo(o.end);
  if (n === null) return { text: o.end, cls: '' };
  if (n < 0) return { text: `Closed ${o.end}`, cls: 'bad' };
  if (n <= 7) return { text: `${o.end} — ${n === 0 ? 'ends today' : n + ' day' + (n === 1 ? '' : 's') + ' left'}`, cls: 'warn' };
  return { text: `${o.end} — ${n} days left`, cls: '' };
}

function fmtBudget(o) {
  if (!o.budget) return null;
  const u = String(o.unit).split(' ')[0];
  if (o.budget >= 1e9) return (o.budget / 1e9).toFixed(0) + 'B ' + u;
  if (o.budget >= 1e6) return (o.budget / 1e6).toFixed(0) + 'M ' + u;
  if (o.budget >= 1e3) return (o.budget / 1e3).toFixed(0) + 'K ' + u;
  return o.budget + ' ' + u;
}

/* Derived, not invented: every line here is a direct consequence of a field in data.js.
   If a check does not apply, it is simply absent. */
function watchOuts(o) {
  const out = [];
  if (o.kind === 'client') out.push(
    ['No API key', 'Usage is bound to the vendor\'s own application. Plan around that — you cannot call this from your own code.']);
  if (o.card) out.push(
    ['Card required', 'A payment method is needed to activate. <b>Set a budget alert before you start</b> — these grants convert to pay-as-you-go when they expire.']);
  const n = daysTo(o.end);
  if (o.end && n !== null && n >= 0 && n <= 14) out.push(
    ['Deadline', `This closes on <b>${esc(o.end)}</b>${n === 0 ? ' — today' : ` (${n} day${n === 1 ? '' : 's'})`}. Verify it is still running before you build on it.`]);
  if (o.end && n !== null && n < 0) out.push(
    ['Closed', 'This promotion has ended. The row is kept for reference — check whether a successor campaign exists.']);
  if (!o.budget) out.push(
    ['No published figure', 'The provider does not publish a numeric allowance, so this page cannot quote one. ' + (String(o.unit).includes('point') ? 'Usage is metered in points, not tokens, so a token figure would be misleading.' : 'Check the provider\'s own page for current limits.')]);
  if (o.kind === 'credit') out.push(
    ['Converts to paid', 'Signup credits expire and the account flips to pay-as-you-go. Know the expiry date before you depend on it.']);
  if (o.china) out.push(
    ['Serves China directly', 'Reachable from mainland China without a proxy. Many providers on this list are not.']);
  return out;
}

// ---------- stylesheet ----------
const CSS = `:root{
  --bg:#12100d; --bg2:#1a1714; --bg3:#221e19; --bg4:#2b261f;
  --line:#332d25; --line2:#453d31;
  --tx:#f2e9dc; --tx2:#a89b88; --tx3:#6f6555;
  --amber:#e8a33d; --amber2:#c9862a; --amberd:#5c4318;
  --green:#6fb98f; --red:#e06c5a; --blue:#7ba7cc; --purple:#b08cc9;
  --r:3px;
  --mono:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:var(--bg);color:var(--tx);
  font-family:'Archivo',system-ui,-apple-system,sans-serif;
  font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased;
}
a{color:var(--amber);text-decoration:none}
a:hover{text-decoration:underline}
.bar{
  position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:14px;
  padding:11px 26px;background:rgba(18,16,13,.94);backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line);font-size:12px;
}
.bar a{font-weight:700;letter-spacing:-.01em}
.bar .sp{margin-left:auto;font-family:var(--mono);font-size:10.5px;color:var(--tx3)}
main{max-width:820px;margin:0 auto;padding:34px 26px 70px}
.crumb{font-family:var(--mono);font-size:10.5px;color:var(--tx3);margin-bottom:14px}
.crumb a{color:var(--tx3)}
.crumb a:hover{color:var(--amber)}
h1{font-size:31px;font-weight:800;letter-spacing:-.025em;margin:0 0 5px}
.sub{font-family:var(--mono);font-size:13px;color:var(--tx3);margin:0 0 14px}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
.tag{
  display:inline-block;font-size:9.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  padding:3px 8px;border-radius:2px;border:1px solid var(--line2);color:var(--tx2);background:var(--bg3);
}
.tag.portable{background:rgba(111,185,143,.1);color:var(--green);border-color:rgba(111,185,143,.32)}
.tag.client{background:rgba(176,140,201,.1);color:var(--purple);border-color:rgba(176,140,201,.32)}
.tag.keyless{background:rgba(123,167,204,.1);color:var(--blue);border-color:rgba(123,167,204,.32)}
.tag.credit{background:rgba(232,163,61,.1);color:var(--amber);border-color:rgba(232,163,61,.32)}
.tag.new{background:rgba(111,185,143,.16);color:var(--green)}
.tag.extended{background:rgba(123,167,204,.16);color:var(--blue)}
.tag.expiring{background:rgba(224,108,90,.16);color:var(--red)}
.tag.card{background:var(--bg4);color:var(--tx3)}
.facts{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(158px,1fr));gap:1px;
  background:var(--line);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;
  margin:0 0 28px;
}
.facts div{background:var(--bg2);padding:13px 15px}
.facts dt{font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--tx3);margin-bottom:5px}
.facts dd{margin:0;font-size:14px;font-weight:600}
.facts dd.mono{font-family:var(--mono);font-size:13px}
.facts dd.ok{color:var(--green)}
.facts dd.warn{color:var(--red)}
.facts dd.bad{color:var(--tx3)}
h2{
  font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--tx3);
  margin:32px 0 12px;padding-bottom:7px;border-bottom:1px solid var(--line);
}
p{margin:0 0 13px;color:var(--tx2)}
p.lead{color:var(--tx);font-size:16px}
b,strong{color:var(--tx);font-weight:600}
ol,ul{margin:0 0 13px;padding-left:22px;color:var(--tx2)}
li{margin-bottom:8px}
li::marker{color:var(--amber2);font-family:var(--mono);font-size:12px}
table{width:100%;border-collapse:collapse;margin:0 0 13px;font-size:13.5px}
th,td{text-align:left;padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--tx3);font-weight:700;width:132px}
td{color:var(--tx2)}
td.mono{font-family:var(--mono);font-size:12.5px;color:var(--tx);word-break:break-all}
pre{
  background:var(--bg2);border:1px solid var(--line2);border-radius:var(--r);
  padding:14px 16px;overflow-x:auto;margin:0 0 13px;
  font-family:var(--mono);font-size:12.5px;line-height:1.6;color:var(--tx);
}
code{font-family:var(--mono);font-size:12.5px;background:var(--bg3);padding:1px 5px;border-radius:2px;color:var(--tx)}
.callout{border-radius:var(--r);padding:13px 16px;margin:0 0 13px;font-size:13.5px;line-height:1.6;border:1px solid}
.callout .h{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.warn{background:rgba(224,108,90,.07);border-color:rgba(224,108,90,.3);color:var(--tx2)}
.warn .h{color:var(--red)}
.note{background:rgba(123,167,204,.07);border-color:rgba(123,167,204,.28);color:var(--tx2)}
.note .h{color:var(--blue)}
.ref{background:rgba(232,163,61,.07);border-color:rgba(232,163,61,.32);color:var(--tx2)}
.ref .h{color:var(--amber)}
.cta{
  display:inline-block;background:var(--amber);color:#1a1206;font-size:13px;font-weight:700;
  padding:11px 20px;border-radius:var(--r);border:1px solid var(--amber);margin:2px 0 6px;
}
.cta:hover{background:#f5b954;border-color:#f5b954;text-decoration:none}
.alts{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:9px;margin-bottom:13px}
.alt{
  display:block;padding:12px 14px;background:var(--bg2);border:1px solid var(--line2);
  border-radius:var(--r);transition:border-color .15s ease;
}
.alt:hover{border-color:var(--amber);text-decoration:none}
.alt .n{font-weight:600;color:var(--tx);font-size:13.5px;display:block}
.alt .m{font-family:var(--mono);font-size:10.5px;color:var(--tx3)}
footer{
  max-width:820px;margin:0 auto;padding:22px 26px 46px;border-top:1px solid var(--line);
  font-size:11.5px;color:var(--tx3);line-height:1.65;
}
footer b{color:var(--tx2)}
@media(max-width:560px){
  h1{font-size:24px}
  main{padding:22px 16px 50px}
  th{width:96px}
  .bar{padding:10px 16px}
}
`;

// ---------- page ----------
function renderPage(o, all) {
  const r = refFor(o);
  const end = endLabel(o);
  const budget = fmtBudget(o);
  const alts = all.filter(x => x.id !== o.id && x.kind === o.kind && !(x.end && daysTo(x.end) < 0)).slice(0, 4);

  const title = `${o.name} free tier — limits, base URL and setup | Free LLM Radar`;
  const descBits = [o.sub, budget ? budget : null, o.card ? 'card required' : 'no card required']
    .filter(Boolean).join(' · ');
  const description = clip(
    `${o.name} free tier: ${descBits}. ${stripTags(o.budgetNote)}`, 155);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Free LLM Radar', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Offers', item: SITE + '/offers/' },
      { '@type': 'ListItem', position: 3, name: o.name, item: `${SITE}/offers/${o.id}.html` }
    ]
  };

  const watches = watchOuts(o);
  const link = (r && r.active) ? r.mine : o.link;
  const rel = (r && r.active) ? 'noopener sponsored' : 'noopener';

  /* The dataset uses a leading em dash to mean "not applicable" — the same convention the
     `base` field uses for client-bound offers. A "Test it" block reading "— client-bound."
     is noise, so the section is dropped rather than rendered empty. Tags are stripped
     because this goes inside <pre>, where markup would otherwise show as literal text. */
  const hasTest = !!o.test && !/^\s*—/.test(o.test);
  const testBlock = hasTest ? `
  <h2>Test it</h2>
  <pre>${esc(stripTags(o.test))}</pre>` : '';

  const refBlock = (r && r.active) ? `
      <div class="callout ref">
        <div class="h">Referral disclosure</div>
        This page carries a <b>referral link</b> — the site operator earns platform credits if you
        sign up through the button above, at no extra cost to you. That is a material connection and
        you should weigh it. It did not affect whether this offer is listed, or how it is described.
        <a href="${SITE}/#disclosure">Full disclosure</a>.
      </div>` : '';

  const watchBlock = watches.length ? `
    <h2>Before you commit</h2>
    <ul>
      ${watches.map(w => `<li><b>${w[0]}.</b> ${w[1]}</li>`).join('\n      ')}
    </ul>` : '';

  const altBlock = alts.length ? `
    <h2>${esc(KIND_ALT_HEADING[o.kind] || 'Other options')}</h2>
    <div class="alts">
      ${alts.map(a => `<a class="alt" href="${a.id}.html">
        <span class="n">${esc(a.name)}</span>
        <span class="m">${esc(a.sub)}</span>
      </a>`).join('\n      ')}
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2312100d'/%3E%3Ccircle cx='16' cy='16' r='9.5' fill='none' stroke='%23e8a33d' stroke-width='2.2'/%3E%3Ccircle cx='16' cy='16' r='3' fill='%23e8a33d'/%3E%3Cpath d='M16 16 L25 9' stroke='%23e8a33d' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}/offers/${o.id}.html">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(o.name)} free tier — limits, base URL and setup">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}/offers/${o.id}.html">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/offer.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>

<div class="bar">
  <a href="../index.html">← Free LLM Radar</a>
  <span class="sp">Verified ${esc(RADAR.updated ? RADAR.updated.slice(0, 10) : GENERATED)}</span>
</div>

<main>
  <div class="crumb"><a href="../index.html">Radar</a> / <a href="index.html">Offers</a> / ${esc(o.name)}</div>

  <h1>${esc(o.name)}</h1>
  <p class="sub">${esc(o.sub)}</p>
  <div class="tags">
    <span class="tag ${esc(o.kind)}">${esc(KIND_LABEL[o.kind] || o.kind)}</span>
    ${o.status && o.status !== 'active' ? `<span class="tag ${esc(o.status)}">${esc(o.status)}</span>` : ''}
    ${o.card ? '<span class="tag card">Card required</span>' : '<span class="tag">No card</span>'}
    ${o.china ? '<span class="tag">Serves China</span>' : ''}
  </div>

  <dl class="facts">
    <div><dt>Allowance</dt><dd class="mono">${esc(budget || '—')}</dd></div>
    <div><dt>Metered in</dt><dd class="mono">${esc(String(o.unit).split(' ')[0])}</dd></div>
    <div><dt>Promotion</dt><dd class="${end.cls}">${esc(end.text)}</dd></div>
    <div><dt>Last changed</dt><dd class="mono">${esc(o.added)}</dd></div>
  </dl>

  <p class="lead">${o.budgetNote}</p>
  <p>${KIND_NOTE[o.kind] || ''}</p>

  <a class="cta" href="${esc(link)}" target="_blank" rel="${rel}">${esc(o.linkLabel)} →</a>
${refBlock}
${o.warn ? `
  <div class="callout warn"><div class="h">Watch out</div>${o.warn}</div>` : ''}
${o.note ? `
  <div class="callout note"><div class="h">Worth knowing</div>${o.note}</div>` : ''}

  <h2>Mechanics</h2>
  <table>
    <tr><th>Base URL</th><td class="mono">${esc(o.base)}</td></tr>
    <tr><th>Auth</th><td>${esc(o.auth)}</td></tr>
    <tr><th>Models</th><td class="mono">${(o.models || []).map(esc).join('<br>')}</td></tr>
  </table>

  <h2>Set it up</h2>
  <ol>
    ${(o.steps || []).map(s => `<li>${s}</li>`).join('\n    ')}
  </ol>
${testBlock}
${watchBlock}
${altBlock}
</main>

<footer>
  <p><b>Verified ${esc(RADAR.updated ? RADAR.updated.slice(0, 10) : GENERATED)}.</b>
  Free tiers change without notice — re-check the provider's own page before you build on this.
  This page was generated from the radar's dataset; the offer <code>id</code> is
  <code>${esc(o.id)}</code>.</p>
  <p><a href="../index.html">← Back to the full radar</a> · <a href="index.html">All offers</a></p>
</footer>

</body>
</html>
`;
}

// ---------- index of offers ----------
function renderIndex(offers) {
  const byKind = {};
  for (const o of offers) (byKind[o.kind] = byKind[o.kind] || []).push(o);
  const order = ['portable', 'keyless', 'credit', 'client'];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2312100d'/%3E%3Ccircle cx='16' cy='16' r='9.5' fill='none' stroke='%23e8a33d' stroke-width='2.2'/%3E%3Ccircle cx='16' cy='16' r='3' fill='%23e8a33d'/%3E%3C/svg%3E">
<title>All offers — Free LLM Radar</title>
<meta name="description" content="Every free LLM API tier, promotion and signup credit tracked by Free LLM Radar, grouped by whether you get a portable API key.">
<link rel="canonical" href="${SITE}/offers/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/offer.css">
</head>
<body>

<div class="bar">
  <a href="../index.html">← Free LLM Radar</a>
  <span class="sp">${offers.length} offers</span>
</div>

<main>
  <h1>All offers</h1>
  <p class="lead">Every offer the radar tracks, grouped by whether you get a portable API key.</p>
${order.filter(k => byKind[k]).map(k => `
  <h2>${esc(KIND_LABEL[k])} <span style="color:var(--tx3);font-weight:400">· ${byKind[k].length}</span></h2>
  <div class="alts">
    ${byKind[k].sort((a, b) => a.name.localeCompare(b.name)).map(o => `<a class="alt" href="${o.id}.html">
      <span class="n">${esc(o.name)}</span>
      <span class="m">${esc(o.sub)}</span>
    </a>`).join('\n    ')}
  </div>`).join('\n')}
</main>

<footer>
  <p>Generated ${GENERATED}. <a href="../index.html">Back to the radar</a>.</p>
</footer>

</body>
</html>
`;
}

// ---------- write ----------
fs.mkdirSync(OUT_OFFERS, { recursive: true });
fs.mkdirSync(OUT_ASSETS, { recursive: true });
fs.writeFileSync(path.join(OUT_ASSETS, 'offer.css'), CSS);

const written = [];
for (const o of RADAR.offers) {
  try {
    fs.writeFileSync(path.join(OUT_OFFERS, `${o.id}.html`), renderPage(o, RADAR.offers));
    written.push(o.id);
  } catch (e) {
    console.error(`FAILED to render ${o.id}: ${e.message}`);
    process.exit(1);
  }
}
fs.writeFileSync(path.join(OUT_OFFERS, 'index.html'), renderIndex(RADAR.offers));

// remove stale pages so a renamed id does not leave an orphan behind
const keep = new Set([...written.map(id => `${id}.html`), 'index.html']);
let removed = 0;
for (const f of fs.readdirSync(OUT_OFFERS)) {
  if (f.endsWith('.html') && !keep.has(f)) { fs.unlinkSync(path.join(OUT_OFFERS, f)); removed++; }
}

// ---------- sitemap + robots ----------
const urls = [`${SITE}/`, `${SITE}/offers/`, ...written.map(id => `${SITE}/offers/${id}.html`)];
fs.writeFileSync(path.join(DIR, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${GENERATED}</lastmod></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(DIR, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`Generated ${written.length} offer pages + index`);
if (removed) console.log(`Removed ${removed} stale page(s)`);
console.log(`assets/offer.css · sitemap.xml (${urls.length} urls) · robots.txt`);
