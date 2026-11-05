// 진짜 키 입력으로 스킬을 써 보고, 게임이 멈추지 않는지 + 에러가 없는지 확인
// 사용법: node tools/test_skill.js <미리보기 html 경로> <왼쪽 캐릭터 index> [오른쪽 캐릭터 index]
// 예: node tools/test_skill.js "Claude outputs/volleyball-preview.html" 13 2
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [file, a = '0', bIdx = '2'] = process.argv.slice(2);
  const br = await chromium.launch(); const p = await br.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n').slice(1, 3).join(' | ')));
  await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(800);
  await p.evaluate(([a, b]) => { players[0].char = a; players[1].char = b; startGame(); }, [+a, +bIdx]);
  await p.waitForTimeout(3500); // 게임 시작 연출 기다리기
  await p.evaluate(() => { players[0].mana = manaMax(players[0]); });
  await p.keyboard.down('ShiftLeft'); await p.waitForTimeout(80); await p.keyboard.up('ShiftLeft'); // 왼쪽 스킬 키
  for (let i = 0; i < 10; i++) {
    await p.waitForTimeout(500);
    console.log(await p.evaluate(() => [state, cine && cine.kind, cine && cine.t, Math.round(ball.x), Math.round(ball.y), players[0].score + ':' + players[1].score].join(', ')));
    if (i === 2) await p.locator('canvas').screenshot({ path: 'test_skill.png' });
  }
  console.log(errs.length ? '에러!\n' + errs.join('\n') : '에러 없음 (cine.t가 계속 올라가면 정상)');
  await br.close();
})();
