// (HANDOFF §17) // 보스전 인증서: 터치로 저장(다운로드) + 시간 제한 없음 + 세로 화면 버튼
const { chromium, devices } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch();
  const ctxm = await b.newContext({ ...devices['iPhone 13 landscape'], acceptDownloads: true });
  const pg = await ctxm.newPage();
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(500);
  await pg.evaluate(() => { localStorage.setItem('volley_mobile', 'A'); }); await pg.reload(); await sleep(600);
  console.log('저장된 배치', await pg.evaluate(() => MOBILE.on + MOBILE.layout));
  const box = await pg.locator('#c').boundingBox();
  const tapW = async (x, y) => { await pg.touchscreen.tap(box.x + x / 432 * box.width, box.y + y / 304 * box.height); await sleep(350); };
  await tapW(216, 114 + 2 * 26 - 6); await tapW(160, 100 - 5); console.log('보스메뉴→', await pg.evaluate(() => state));
  await tapW(160, 108 + 30 - 5); console.log('난이도', await pg.evaluate(() => state + ' ' + bossDiff));
  await pg.evaluate(() => { [0, 2, 3].forEach((i, k) => { players[i].char = [10, 4, 2][k]; players[i].picked = true; }); });
  await sleep(4500);
  await pg.evaluate(() => { BOSS.hp = 1; bossDamage(10, { tru: true, src: 0 }); }); await sleep(800);
  await pg.evaluate(() => { bossNextPhase(); bossNextPhase(); state = 'play'; BOSS.orbs = null; BOSS.hp = 1; bossDamage(10, { tru: true, src: 0 }); }); await sleep(6500);
  console.log('결과', await pg.evaluate(() => [state, BOSS.result && BOSS.result.rank].join()));
  await sleep(9000); console.log('10초 뒤에도', await pg.evaluate(() => state)); // 원래는 8초 지나면 자동으로 넘어갔음
  await pg.screenshot({ path: 'm_cert.png' });
  const [sx, sy] = await pg.evaluate(() => CERT_BTN[0].slice(0, 2));
  const dl = pg.waitForEvent('download');
  await tapW(sx + 30, sy + 8); const d = await dl; await d.saveAs('/home/claude/tools/cert.png'); console.log('다운로드', d.suggestedFilename());
  const [nx, ny] = await pg.evaluate(() => CERT_BTN[1].slice(0, 2)); await tapW(nx + 30, ny + 8); await sleep(400);
  console.log('계속 →', await pg.evaluate(() => [state, bossMode].join()));
  // 세로 화면
  const p2 = await (await b.newContext({ ...devices['iPhone 13'] })).newPage(); await p2.goto('file:///home/claude/tools/p.html'); await sleep(400);
  await p2.evaluate(() => { localStorage.setItem('volley_mobile', 'B'); }); await p2.reload(); await sleep(500);
  await p2.evaluate(() => { solo = true; humanSide = 0; players.forEach((p) => { p.ai = p.side === 1; p.picked = true; }); startGame(); state = 'play'; }); await sleep(800);
  await p2.screenshot({ path: 'm_portrait.png' });
  console.log('errs', errs); await b.close();
})();
