// 온라인 대전 테스트: 로컬 PeerJS 서버(127.0.0.1:9000) + 브라우저 2개, 사용법: node tools/test_online.js "[[0,1],[2,3]]" (HANDOFF §14)
const { chromium } = require('playwright');
const OPTS = { host: '127.0.0.1', port: 9000, path: '/', secure: false, config: { iceServers: [] } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PAIRS = JSON.parse(process.argv[2]);
async function open() {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 900, height: 650 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(600);
  await pg.evaluate(([o, PAIRS]) => { NET.peerOpts = o; window.__H = {}; window.__M = 0; window.__P = 0; window.__log = [];
    NET.hook = (f) => {
      if (f % 25 === 0) __H[f] = netHash(); (window.__F = window.__F || [])[f] = [state, timer, NET.rng, cine && cine.kind, cine && cine.t, cine && cine.sk && (cine.sk.key||cine.sk.k), cine && cine.h, Math.round(ball.x*100), Math.round(ball.y*100), players[0].mana, players[1].mana].join(',');
      if (state === 'select' && !players[0].picked && !players[1].picked && __M < PAIRS.length) { players[0].char = PAIRS[__M][0]; players[1].char = PAIRS[__M][1]; }
      if (state === 'startMsg' && timer === 0) { __log.push(f + ' match ' + __M + ': ' + players.map((p) => CHARACTERS[p.char].name).join(' vs ')); __M++; __P = 0; }
      if (state === 'play') { __P++; if (__P % 110 === 1) { players[0].mana = manaMax(players[0]); } if (__P % 110 === 55) players[1].mana = manaMax(players[1]); if (__P === 650) { players[0].score = 14; players[1].score = 14; } }
      if (cine && cine.t === 1) __log.push(f + '  cine ' + cine.kind + (cine.sk ? ':' + (cine.sk.key || cine.sk.k || '') : '') + (cine.h ? ':' + cine.h : ''));
    }; }, [OPTS, PAIRS]);
  return { b, pg, errs };
}
(async () => {
  const A = await open(), B = await open();
  await A.pg.evaluate(() => netOpenLobby()); await A.pg.click('#netM2'); await A.pg.click('#netHost'); await sleep(1500);
  const code = (await A.pg.textContent('#netMsg')).match(/\d{4}/)[0];
  await B.pg.evaluate(() => netOpenLobby()); await B.pg.click('#netM2'); await B.pg.fill('#netCode', code); await B.pg.click('#netJoin'); await sleep(2500);
  const keysA = ['KeyD', 'KeyG', 'KeyR', 'KeyF', 'KeyZ', 'ShiftLeft', 'KeyZ'];
  const keysB = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Semicolon', 'Enter'];
  const t0 = Date.now();
  while (Date.now() - t0 < 480000) {
    const ka = keysA[Math.floor(Math.random() * keysA.length)], kb = keysB[Math.floor(Math.random() * keysB.length)];
    await Promise.all([A.pg.keyboard.down(ka), B.pg.keyboard.down(kb)]); await sleep(50 + Math.random() * 150);
    await Promise.all([A.pg.keyboard.up(ka), B.pg.keyboard.up(kb)]);
    const m = await A.pg.evaluate(() => __M);
    if (m >= PAIRS.length && await A.pg.evaluate(() => state === 'select')) break;
  }
  const ha = await A.pg.evaluate(() => __H), hb = await B.pg.evaluate(() => __H);
  let same = 0, diff = [];
  for (const f in ha) if (hb[f] !== undefined) { if (ha[f] === hb[f]) same++; else diff.push(+f); }
  console.log((await A.pg.evaluate(() => __log)).join('\n'));
  const fa = await A.pg.evaluate(() => __F), fb = await B.pg.evaluate(() => __F);
  for (let f = 0; f < Math.min(fa.length, fb.length); f++) if (fa[f] !== fb[f]) { console.log('FIRST DIFF', f, '\nA', fa[f-2], '\n ', fa[f-1], '\n ', fa[f], '\nB', fb[f-2], '\n ', fb[f-1], '\n ', fb[f]); break; }
  console.log('compared', same + diff.length, 'same', same, 'diff', diff.slice(0, 20));
  console.log('A', await A.pg.evaluate(() => [NET.on, NET.sim, NET.desyncs, state]), 'B', await B.pg.evaluate(() => [NET.on, NET.sim, NET.desyncs, state]));
  console.log('errs', A.errs.slice(0, 5), B.errs.slice(0, 5));
  await A.b.close(); await B.b.close();
})();
