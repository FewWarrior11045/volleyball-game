// (HANDOFF §15-2) // 나간 자리 AI 이어받기 + 다시 들어오기 테스트 (브라우저 4개로 시작 → 3P 탭 닫기 → 새 브라우저가 3P 자리로 → 4P 탭 숨김 → 돌아옴)
const { chromium } = require('playwright');
const OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const N = +(process.argv[2] || 4);
async function open(b) {
  const pg = await b.newPage({ viewport: { width: 900, height: 650 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(400);
  pg.on('console', (m) => { if (m.text().startsWith('DBG')) console.log(m.text()); });
  await pg.evaluate((o) => { NET.peerOpts = o; window.__H = {}; window.__vis = 'visible';
    Object.defineProperty(document, 'visibilityState', { get: () => window.__vis, configurable: true });
    const orig = netLoop; netLoop = function (now) { if (window.__vis === 'hidden') return; return orig(now); };
    NET.hook = (f) => { if (f % 25 === 0) __H[f] = netHash(); if (state === 'select' && !players.every((p) => p.picked)) players.forEach((p) => { if (!p.ai) p.picked = true; }); if (state === 'play') { players.forEach((p) => { if (p.mana < manaMax(p) && f % 200 === 0) p.mana = manaMax(p); }); } };
  }, OPTS);
  return { pg, errs };
}
async function keys(P, ms) { const KA = ['KeyD', 'KeyG', 'KeyR', 'KeyZ', 'ShiftLeft', 'ArrowLeft', 'ArrowUp', 'Enter']; const t0 = Date.now();
  while (Date.now() - t0 < ms) { const live = P.filter((x) => x && !x.closed); const ks = live.map(() => KA[Math.floor(Math.random() * KA.length)]);
    await Promise.all(live.map((x, i) => x.pg.keyboard.down(ks[i]).catch(() => {}))); await sleep(80 + Math.random() * 120); await Promise.all(live.map((x, i) => x.pg.keyboard.up(ks[i]).catch(() => {}))); } }
async function status(P, tag) {
  const st = await Promise.all(P.map((x) => (x && !x.closed ? x.pg.evaluate(() => [NET.on, NET.side, NET.sim, state, JSON.stringify(NET.ai), players.map((p) => (p.ai ? 'A' : 'H')).join(''), NET.desyncs].join(' ')) : 'closed')));
  console.log(tag, st);
}
function cmp(P, tag) { return Promise.all(P.map((x) => (x && !x.closed ? x.pg.evaluate(() => __H) : null))).then((H) => {
  for (let i = 1; i < P.length; i++) { if (!H[i]) continue; let same = 0, diff = 0; for (const f in H[i]) if (H[0][f] !== undefined) H[0][f] === H[i][f] ? same++ : diff++; console.log(tag, 'P' + (i + 1), 'same', same, 'diff', diff); } }); }
(async () => {
  const b = await chromium.launch(); const P = [];
  for (let i = 0; i < N; i++) P.push(await open(b));
  const mode = N === 2 ? '#netM2' : '#netM4';
  await P[0].pg.evaluate(() => netOpenLobby()); await P[0].pg.click(mode); await P[0].pg.click('#netHost'); await sleep(1200);
  const code = (await P[0].pg.textContent('#netMsg')).match(/\d{4}/)[0];
  for (let i = 1; i < N; i++) { await P[i].pg.evaluate(() => netOpenLobby()); await P[i].pg.click(mode); await P[i].pg.fill('#netCode', code); await P[i].pg.click('#netJoin'); await sleep(1200); }
  await sleep(1500); await status(P, 'start');
  await keys(P, 12000); await status(P, 'played');
  const L = N - 2 >= 1 ? N - 2 : 1; // 나갈 사람
  console.log('== P' + (L + 1) + ' 탭 닫음'); await P[L].pg.close(); P[L].closed = true;
  await keys(P, 6000); await status(P, 'after leave');
  console.log('== 새 브라우저가 같은 코드로 들어옴');
  const R = await open(b); await R.pg.evaluate(() => netOpenLobby()); await R.pg.click(mode); await R.pg.fill('#netCode', code); await R.pg.click('#netJoin'); P[L] = R;
  await keys(P, 8000); await status(P, 'after rejoin'); console.log('R msg', JSON.stringify(await R.pg.textContent('#netMsg')), await P[0].pg.evaluate(() => JSON.stringify({q: NET.rejoinQ.length, conns: NET.conns.map((e) => [e.slot, e.open, e.pending]), block: NET.blockIn, st: state, cine: !!cine})));
  const Hd = N - 1;
  if (Hd !== L) {
    console.log('== P' + (Hd + 1) + ' 탭 숨김 6초'); await P[Hd].pg.evaluate(() => { window.__vis = 'hidden'; document.dispatchEvent(new Event('visibilitychange')); });
    await keys(P.filter((_, i) => i !== Hd), 6000); await status(P, 'hidden');
    await P[Hd].pg.evaluate(() => { window.__vis = 'visible'; document.dispatchEvent(new Event('visibilitychange')); });
    await keys(P, 9000); await status(P, 'back');
  }
  await keys(P, 5000); await status(P, 'end'); await cmp(P, 'hash');
  P.forEach((x, i) => x.errs && x.errs.length && console.log('ERR', i, x.errs.slice(0, 4)));
  await b.close();
})();
