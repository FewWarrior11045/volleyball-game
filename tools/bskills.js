// (HANDOFF §16) // 보스전: 모든 캐릭터 모든 스킬을 보스에게 써 보기 (update + draw 같이)
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 864, height: 608 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file:///home/claude/tools/p.html'); await new Promise((r) => setTimeout(r, 500));
  const SETUP = process.argv[2] || '';
  const out = await pg.evaluate((SETUP) => {
    const res = [];
    const ARR = { cmj: CM_SKILLS, history: HEROES, math: MATH_SKILLS, kim: KIM_SKILLS, yean: YA_SKILLS, rina: RN_SKILLS, jmw: JM_SKILLS, gm: GM_SKILLS, jjh: JJ_SKILLS, wh: WH_SKILLS };
    for (let c = 0; c < NCHAR; c++) {
      const sk = CHARACTERS[c].skill, list = ARR[sk] || [null];
      for (const S of list) {
        let err = '';
        try {
          bossDiff = 0; bossLocalSetup(); players[0].ai = true; players[0].aiLevel = 2;
          [0, 2, 3].forEach((pi, k) => { players[pi].char = [c, 4, 2][k]; players[pi].picked = true; });
          startGame(); state = 'play'; fade = 0; players[0].mana = manaMax(players[0]); players[0].ai = false;
          for (let i = 0; i < 30; i++) update();
          if (SETUP) { eval(SETUP); }
          players[0].mana = manaMax(players[0]); state = 'play'; cine = null; pressed.add('ShiftLeft'); update();
          if (cine && S && !SETUP) { if (cine.kind === 'history') cine.hero = S; else cine.sk = S; }
          const cine0 = cine ? bossSkillKey(cine) + (cine.banned ? '(BAN)' : '') : '-';
          const kind = cine && cine.kind, hp0 = BOSS.hp + BOSS.sh;
          let f = 0; while (cine && f < 500) { f++; if (hitStop > 0) hitStop--; else update(); draw(); }
          for (let i = 0; i < 40; i++) { update(); draw(); }
          res.push(`${CHARACTERS[c].name}:${S ? S.key : sk}->${cine0} kind=${kind} frames=${f} dmg=${Math.round((hp0 - BOSS.hp - BOSS.sh) / 1000)}k ${cine ? 'STUCK' : ''}`);
        } catch (e) { res.push(`${CHARACTERS[c].name}:${S ? S.key : sk} ERROR ${e.message} ${(e.stack || '').split('\n')[1]}`); }
      }
    }
    return res;
  }, SETUP);
  console.log(out.join('\n')); console.log('pageerrors', errs.slice(0, 5)); await b.close();
})();
