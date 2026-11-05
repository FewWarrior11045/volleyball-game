// (HANDOFF §16) // 온라인 보스전: 사람 N명 (+AI) → 랜덤 키 → 해시 비교 → 한 명 나갔다 다시 들어오기
const { chromium } = require('playwright');
const OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const N = +(process.argv[2] || 2);
async function open(b) {
  const pg = await b.newPage({ viewport: { width: 864, height: 608 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(400);
  await pg.evaluate((o) => { NET.peerOpts = o; window.__H = {}; window.__PH = 1;
    NET.hook = (f) => { if (f % 25 === 0) __H[f] = netHash(); if (state === 'select') players.forEach((p) => { if (!p.ai && !p.picked) { p.char = (players.indexOf(p) * 4 + 1) % NCHAR; p.picked = true; } });
      if (state === 'play' && f % 150 === 0) [0, 2, 3].forEach((i) => (players[i].mana = manaMax(players[i])));
      if (state === 'play' && f % 250 === 0 && BOSS && BOSS.phase < 3 && window.__PH) { if (BOSS.orbs) BOSS.orbs = null; bossDamage(BOSS.hpMax * 2, { tru: true, fixed: true }); } };
  }, OPTS);
  return { pg, errs };
}
async function keys(P, ms) { const KA = ['KeyD', 'KeyG', 'KeyR', 'KeyZ', 'ShiftLeft', 'ArrowLeft', 'ArrowUp', 'Enter']; const t0 = Date.now();
  while (Date.now() - t0 < ms) { const live = P.filter((x) => x && !x.closed); const ks = live.map(() => KA[Math.floor(Math.random() * KA.length)]);
    await Promise.all(live.map((x, i) => x.pg.keyboard.down(ks[i]).catch(() => {}))); await sleep(80 + Math.random() * 120); await Promise.all(live.map((x, i) => x.pg.keyboard.up(ks[i]).catch(() => {}))); } }
async function status(P, tag) {
  console.log(tag, (await Promise.all(P.map((x) => (x && !x.closed ? x.pg.evaluate(() => [NET.on, NET.side, NET.sim, state, JSON.stringify(NET.ai), bossMode, BOSS ? 'P' + BOSS.phase + ' ' + Math.round(BOSS.hp / 1000) + 'k/' + Math.round(BOSS.sh / 1000) + 'k hp' + BOSS.partyHp : '-', NET.desyncs].join(' ')) : 'closed')))).join(' || '));
}
(async () => {
  const b = await chromium.launch(); const P = [];
  for (let i = 0; i < N; i++) P.push(await open(b));
  await P[0].pg.evaluate(() => netOpenLobby()); await P[0].pg.click('#netMB'); await P[0].pg.click('#netHost'); await sleep(1200);
  const code = (await P[0].pg.textContent('#netMsg')).match(/\d{4}/)[0];
  await P[0].pg.click('.netLv[data-lv="1"]');
  for (let i = 1; i < N; i++) { await P[i].pg.evaluate(() => netOpenLobby()); await P[i].pg.click('#netMB'); await P[i].pg.fill('#netCode', code); await P[i].pg.click('#netJoin'); await sleep(1300); }
  console.log('lobby', JSON.stringify(await P[0].pg.textContent('#netMsg')), '| btn', await P[0].pg.textContent('#netAiGo'), '| joiner', JSON.stringify(await P[N - 1].pg.textContent('#netMsg')));
  if (N < 3) await P[0].pg.click('#netAiGo');
  await sleep(1500); await status(P, 'start');
  await keys(P, 20000); await status(P, 'played'); await P[0].pg.screenshot({ path: 'bo_host.png' }); await P[N - 1].pg.screenshot({ path: 'bo_last.png' });
  console.log('== P' + N + ' 닫음'); await P[N - 1].pg.close(); P[N - 1].closed = true;
  await keys(P, 5000); await status(P, 'left');
  const R = await open(b); await R.pg.evaluate(() => netOpenLobby()); await R.pg.click('#netMB'); await R.pg.fill('#netCode', code); await R.pg.click('#netJoin'); P[N - 1] = R;
  await keys(P, 12000); await status(P, 'rejoined');
  const H = await Promise.all(P.map((x) => x.pg.evaluate(() => __H)));
  for (let i = 1; i < P.length; i++) { let same = 0, diff = 0; for (const f in H[i]) if (H[0][f] !== undefined) H[0][f] === H[i][f] ? same++ : diff++; console.log('hash P' + (i + 1), same, diff); }
  P.forEach((x, i) => x.errs.length && console.log('ERR', i, x.errs.slice(0, 4)));
  await b.close();
})();
