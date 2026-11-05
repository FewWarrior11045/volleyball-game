// (HANDOFF §16) 308호 즉사 기믹 진짜 키 테스트 (M → Esc)
const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 864, height: 608 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await sleep(500);
  await pg.evaluate(() => { bossDiff = 1; bossLocalSetup(); [0, 2, 3].forEach((pi, k) => { players[pi].char = [11, 0, 7][k]; players[pi].picked = true; }); startGame(); state = 'play'; fade = 0; bossNextPhase(); bossNextPhase(); state = 'play'; BOSS.orbs = null; BOSS.sh = BOSS.shMax; BOSS.hp = BOSS.hpMax * 0.08; });
  await sleep(800); await pg.screenshot({ path: 'b308_hint.png' });
  console.log('ready?', await pg.evaluate(() => [boss308Ready(), is308(), state].join(',')));
  await pg.keyboard.press('KeyM'); await sleep(3000);
  console.log('after M', await pg.evaluate(() => state)); await pg.screenshot({ path: 'b308_e.png' });
  await sleep(6000); await pg.screenshot({ path: 'b308_e2.png' });
  await pg.keyboard.press('Escape'); await sleep(2500);
  console.log('end', await pg.evaluate(() => [state, BOSS && BOSS.result && BOSS.result.why, BOSS && BOSS.result && BOSS.result.rank].join(',')));
  await pg.screenshot({ path: 'b308_res.png' });
  await sleep(3000); await pg.keyboard.press('KeyZ'); await sleep(800);
  console.log('back', await pg.evaluate(() => [state, bossMode, players.length].join(',')));
  console.log('errs', errs); await b.close();
})();
