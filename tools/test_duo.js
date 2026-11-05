// 2대2 온라인 테스트: 로컬 PeerJS 서버(127.0.0.1:9000) + 브라우저 4개, 사용법: node tools/test_duo.js "[[0,1,2,3]]" 초 [사람 수 2~4] [AI 난이도 0~2] (HANDOFF §14)
const { chromium } = require('playwright');
const OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PICKS = JSON.parse(process.argv[2]), SECS = +(process.argv[3] || 120), HUMANS = +(process.argv[4] || 4), LV = +(process.argv[5] || 1);
async function open(b) {
  const pg = await b.newPage({ viewport: { width: 900, height: 650 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(500);
  await pg.evaluate(([o, PICKS]) => { NET.peerOpts = o; window.__H = {}; window.__M = 0; window.__P = 0; window.__log = [];
    NET.hook = (f) => {
      if (f % 25 === 0) __H[f] = netHash();
      if (state === 'select' && __M < PICKS.length) PICKS[__M].forEach((c, i) => { if (players[i] && !players[i].picked) players[i].char = c; });
      if (state === 'startMsg' && timer === 0) { __log.push(f + ' match ' + __M + ': ' + players.map((p) => (p.ai ? 'AI:' : '') + CHARACTERS[p.char].name).join(' / ')); __M++; __P = 0; }
      if (state === 'play') { __P++; if (players[0].score + players[1].score > (window.__S || 0)) { window.__S = players[0].score + players[1].score; } const k = Math.floor(__P / 90) % 4; if (__P % 90 === 1) players[k].mana = manaMax(players[k]); if (__P === 1500) { players[0].score = 14; players[1].score = 14; } }
      if (cine && cine.t === 1) __log.push(f + '  cine ' + cine.kind + ' by ' + players.indexOf(cine.caster) + ' -> ' + players.indexOf(cine.target));
    }; }, [OPTS, PICKS]);
  return { pg, errs };
}
(async () => {
  const b = await chromium.launch();
  const P = [];
  for (let i = 0; i < HUMANS; i++) P.push(await open(b));
  await P[0].pg.evaluate(() => netOpenLobby()); await P[0].pg.click('#netM4'); await P[0].pg.click('#netHost'); await sleep(1500);
  const code = (await P[0].pg.textContent('#netMsg')).match(/\d{4}/)[0];
  for (let i = 1; i < HUMANS; i++) {
    await P[i].pg.evaluate(() => netOpenLobby()); await P[i].pg.keyboard.press('Digit2'); await P[i].pg.fill('#netCode', code); await P[i].pg.click('#netJoin'); await sleep(1500);
    console.log('host:', JSON.stringify(await P[0].pg.textContent('#netMsg')), '| joiner', i, JSON.stringify(await P[i].pg.textContent('#netMsg')));
  }
  if (HUMANS < 4) { await P[0].pg.click(`.netLv[data-lv="${LV}"]`); console.log('button:', await P[0].pg.textContent('#netAiGo')); await P[0].pg.click('#netAiGo'); }
  await sleep(1500);
  console.log('on:', await Promise.all(P.map((x) => x.pg.evaluate(() => [NET.on, NET.side, players.length, state].join(',')))));
  await P[0].pg.screenshot({ path: 'duo_select.png' });
  const KA = ['KeyD', 'KeyG', 'KeyR', 'KeyF', 'KeyZ', 'ShiftLeft', 'KeyZ', 'ArrowLeft', 'ArrowUp', 'Enter', 'Semicolon'];
  const t0 = Date.now(); let shot = 0;
  while (Date.now() - t0 < SECS * 1000) {
    const ks = P.map(() => KA[Math.floor(Math.random() * KA.length)]);
    await Promise.all(P.map((x, i) => x.pg.keyboard.down(ks[i]))); await sleep(50 + Math.random() * 150);
    await Promise.all(P.map((x, i) => x.pg.keyboard.up(ks[i])));
    const st = await P[0].pg.evaluate(() => [state, __M, !!cine]);
    if (st[0] === 'play' && !st[2] && shot < 2 && Date.now() - t0 > 15000 * (shot + 1)) { await P[0].pg.screenshot({ path: `duo_play${shot}.png` }); await P[HUMANS - 1].pg.screenshot({ path: `duo_play${shot}_last.png` }); shot++; }
    if (st[1] >= PICKS.length && st[0] === 'select') break;
  }
  const H = await Promise.all(P.map((x) => x.pg.evaluate(() => __H)));
  for (let i = 1; i < HUMANS; i++) { let same = 0, diff = 0; for (const f in H[0]) if (H[i][f] !== undefined) H[0][f] === H[i][f] ? same++ : diff++; console.log('P' + (i + 1) + ' vs host: same', same, 'diff', diff); }
  console.log((await P[0].pg.evaluate(() => __log)).join('\n'));
  console.log('score', await P[0].pg.evaluate(() => players[0].score + ':' + players[1].score + ' rallies ' + (window.__S||0)));
  console.log('desyncs', await Promise.all(P.map((x) => x.pg.evaluate(() => NET.desyncs))), 'sim', await Promise.all(P.map((x) => x.pg.evaluate(() => NET.sim))));
  P.forEach((x, i) => x.errs.length && console.log('ERR', i, x.errs.slice(0, 5)));
  await b.close();
})();
