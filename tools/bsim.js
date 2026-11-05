// (HANDOFF §16) // 보스전 빠른 시뮬: 파티 3명 전부 AI로 페이즈 1
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 900, height: 650 } });
  const errs = []; pg.on('pageerror', (e) => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await pg.goto('file:///home/claude/tools/p.html'); await new Promise((r) => setTimeout(r, 500));
  const diffs = JSON.parse(process.argv[2] || '[0]'), parties = JSON.parse(process.argv[3] || '[[10,6,3]]'), shots = process.argv[4] === 'shots';
  for (const d of diffs) for (const party of parties) {
    await pg.evaluate((v) => (window.__PL = v), +(process.argv[5] ?? 2));
    const r = await pg.evaluate(([d, party]) => {
      bossDiff = d; bossLocal = 1; bossLocalSetup();
      players[0].ai = true; [0, 2, 3].forEach((i) => (players[i].aiLevel = +(window.__PL ?? 2)));
      [0, 2, 3].forEach((pi, k) => { players[pi].char = party[k]; players[pi].picked = true; });
      startGame(); state = 'play'; fade = 0;
      let f = 0, log = [], skills = 0, gz = 0, desk = 0, groggy = 0, fus = {};
      const by = {}; const dmg0 = bossDamage; bossDamage = function (a, o = {}) { const fn = (new Error().stack.split('\n')[2] || '').trim().split(' ')[1]; const g = BOSS.groggyT > 0 ? 'G' : ''; const r = dmg0(a, o); by[fn + g] = (by[fn + g] || 0) + Math.round(r / 1000); return r; };
      const mech = {}; const W = (n) => { const o = window[n]; window[n] = function () { const k = n + (arguments[0] && typeof arguments[0] === 'string' ? ':' + arguments[0] : ''); mech[k] = (mech[k] || 0) + 1; return o.apply(this, arguments); }; return o; };
      const saved = ['bossCast', 'bossCastDone', 'bossMobs', 'bossOrbHit', 'bossNextPhase'].map((n) => [n, W(n)]);
      const c0 = bossSkillHit; bossSkillHit = function (c) { skills++; return c0(c); };
      let lastPhase = '';
      let ph = 1, phT = [];
      while (f < 25 * 960 && state !== 'over') {
        f++;
        if (hitStop > 0) { hitStop--; continue; }
        if (BOSS && BOSS.phase !== ph) { phT.push(Math.round(f / 25)); ph = BOSS.phase; }
        const g0 = BOSS && BOSS.groggyT, gzz = BOSS && BOSS.gaze; update();
        if (BOSS && BOSS.groggyT > 0 && !g0) groggy++;
        if (BOSS && BOSS.gaze && !gzz) gz++;
        if (BOSS && BOSS.fusion && BOSS.fusion.t === 46) fus[BOSS.fusion.k] = (fus[BOSS.fusion.k] || 0) + 1;
        if (f % (25 * 30) === 0 && BOSS) log.push(`${f / 25}s P${BOSS.phase} hp${Math.round(BOSS.hp / 1000)}k sh${Math.round(BOSS.sh / 1000)}k pts${BOSS.pts}:${BOSS.bpts} php${BOSS.partyHp}`);
      }
      bossSkillHit = c0; bossDamage = dmg0; saved.forEach(([n, o]) => (window[n] = o));
      const B = BOSS;
      return { f: (f / 25).toFixed(0) + 's', res: B && B.result && [B.result.win, B.result.why, B.result.rank, B.result.score].join(','), pts: B && B.pts + ':' + B.bpts, maxRally: B && B.maxRally, perfect: B && B.stats.perfect, skills, gz, groggy, fus: JSON.stringify(fus), log: log.join(' | '), phT: phT.join('/'), mech: JSON.stringify(mech), why: B && B.result && B.result.why, by: JSON.stringify(by) };
    }, [d, party]);
    console.log('diff', d, 'party', party.join(','), JSON.stringify(r));
  }
  console.log('errs', errs.slice(0, 5)); await b.close();
})();
