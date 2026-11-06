// ===== 피직스 축구 (v0.2) — 원작 Soccer Physics 방식: 버튼 하나, 강체 막대 인형 물리 =====
// 배구 게임(game.js)과 완전히 따로 돌아감. 캐릭터 사진(assets/)만 같이 씀.
// - 선수 = 강체(몸통+다리). 땅에 닿는 점(발 2·머리·엉덩이·어깨)마다 충돌·마찰 → 진짜로 기울고 넘어지고 굴러감
// - 버튼: 발이 땅에 닿아 있으면 '몸이 기울어진 방향'으로 점프 (기울어 있으면 대각선으로 날아감) + 차는 다리 휘두르기
//         다리를 휘두르는 반동으로 몸이 뒤로 돌아감 → 공중제비·오버헤드 킥이 저절로 나옴
// - 같은 편·상대 편 모두 몸끼리 부딪히고, 높이 뛰어 서로 넘어 다님. 골대 크로스바 위에 올라설 수도 있음
// - 몸 = 사진을 그대로 눌러 넣은 상자, 다리 = 사진 아랫부분을 잘라 붙임. 히트박스는 모두 같음
'use strict';

// ----- 설정 -----
const GW = 432, GH = 304, SCALE = 2, FPS = 60, SUB = 2; // 한 프레임에 물리 2번
const GROUND = 272;
const GOAL_D = 38, GOAL_TOP = 170;      // 골대 깊이 / 크로스바 높이
const WIN = 5;
const TORSO_W = 26, TORSO_H = 44, LEG_L = 26, LEG_W = 9; // 히트박스 (모든 캐릭터 같음)
const BALL_R = 10;
const G_P = 0.36 / SUB, G_B = 0.26 / SUB; // 중력 (선수 / 공)
const P = { mass: 1, inertia: 520, jump: 9.2, kickT: 22, kickAng: 2.3, recoil: 0.05, balance: 0.12, balDamp: 0.86, flop: 6.5, flopSpin: 0.22, fric: 0.9, rest: 0.05 };
// jump 점프 세기, recoil 다리 반동(공중제비), balance 서 있을 때 똑바로 서려는 힘, flop 누워 있을 때 누르면 버둥 점프
const BALL = { mass: 0.22, rest: 0.72, fric: 0.985 };
const VERSION = '축구 v0.2.2';

const CHARS = [
  ['김두현', 'kdh'], ['장민욱', 'minwook'], ['키다리', 'tall'], ['김지연', 'swim'], ['문경목', 'hair'], ['김민주', 'democracy'],
  ['원더재원', 'wonder_body'], ['이동우', 'dongwoo_body'], ['박준형', 'math'], ['주지혁', 'jjh'], ['차명준', 'cmj'], ['김예안', 'yean'],
  ['송리나', 'rina'], ['김우현', 'woohyun'], ['이준혁', 'ljh'], ['지혜&하은', 'tag'], ['강병국', 'kbg'], ['주민하', 'jmh'], ['손하윤', 'shy'],
].map(([name, f]) => ({ name, src: 'assets/' + f + '.png' }));

const cv = document.getElementById('c'), ctx = cv.getContext('2d');

// ----- 사진 → 몸·다리 -----
// 몸: 사진 전체를 TORSO_W×TORSO_H 상자에 꾹 눌러 넣음 / 다리: 사진 아래 22%를 잘라 왼쪽 반·오른쪽 반 → 다리 두 개 (+ 잘린 부분 평균 색)
const SPR = [];
function buildSprite(i, im) {
  const R = 4;
  const body = document.createElement('canvas'); body.width = TORSO_W * R; body.height = TORSO_H * R;
  body.getContext('2d').drawImage(im, 0, 0, body.width, body.height);
  const cut = Math.max(1, Math.round(im.height * 0.22)), sy = im.height - cut, half = Math.floor(im.width / 2);
  const mk = (sx, sw) => { const c = document.createElement('canvas'); c.width = LEG_W * R; c.height = LEG_L * R; c.getContext('2d').drawImage(im, sx, sy, sw, cut, 0, 0, c.width, c.height); return c; };
  let col = '#555';
  try { const t = document.createElement('canvas'); t.width = 16; t.height = 8; const x = t.getContext('2d'); x.drawImage(im, 0, sy, im.width, cut, 0, 0, 16, 8);
    const d = x.getImageData(0, 0, 16, 8).data; let r = 0, g = 0, b = 0, n = 0; for (let k = 0; k < d.length; k += 4) if (d[k + 3] > 128) { r += d[k]; g += d[k + 1]; b += d[k + 2]; n++; }
    if (n) col = `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`; } catch (e) {}
  SPR[i] = { body, legL: mk(0, half), legR: mk(half, im.width - half), col };
}
CHARS.forEach((c, i) => { const im = new Image(); im.onload = () => buildSprite(i, im); im.src = c.src; });

// ----- 입력 -----
const keys = new Set(), pressed = new Set();
addEventListener('keydown', (e) => { if (!keys.has(e.code)) pressed.add(e.code); keys.add(e.code); if (['ArrowUp', 'Space', 'ArrowDown'].includes(e.code)) e.preventDefault(); });
addEventListener('keyup', (e) => keys.delete(e.code));
cv.addEventListener('pointerdown', (e) => { const r = cv.getBoundingClientRect(); onTap(((e.clientX - r.left) / r.width) * GW, ((e.clientY - r.top) / r.height) * GH); });

// ----- 소리 -----
const AC = (() => { try { return new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } })();
function sfx(f = 300, d = 0.08, type = 'square', v = 0.07) { if (!AC) return; try { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.value = v; g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + d); o.connect(g).connect(AC.destination); o.start(); o.stop(AC.currentTime + d); } catch (e) {} }

// ----- 상태 -----
let state = 'menu', score = [0, 0], timer = 0, msg = '', cpu = true, shake = 0, lastScorer = 0;
const pick = [[0, 4], [13, 14]];
const ball = { x: GW / 2, y: 60, vx: 0, vy: 0, rot: 0 };
let players = [];

// 강체: (x, y) = 무게중심, a = 기울기(시계 방향 +). 몸 기준 좌표 → 세상 좌표
// 몸 기준: 엉덩이 (0, HIP_Y), 몸통 꼭대기 (0, HIP_Y - TORSO_H), 다리 = 엉덩이에서 LEG_L
const HIP_Y = 14;
const W = (p, lx, ly) => ({ x: p.x + lx * Math.cos(p.a) - ly * Math.sin(p.a), y: p.y + lx * Math.sin(p.a) + ly * Math.cos(p.a) });
function legAngles(p) { // [서 있는 다리, 차는 다리] 몸 기준 각도 (아래 = 0)
  const k = p.kickT > 0 ? Math.sin(((P.kickT - p.kickT) / P.kickT) * Math.PI) : 0;
  return [p.dir * 0.12, -p.dir * (0.1 + k * P.kickAng)];
}
function legFoot(p, ang) { const h = W(p, 0, HIP_Y), aa = p.a + ang; return { x: h.x - Math.sin(aa) * LEG_L, y: h.y + Math.cos(aa) * LEG_L }; }
function pointsOf(p) { const [s, k] = legAngles(p); return { hip: W(p, 0, HIP_Y), top: W(p, 0, HIP_Y - TORSO_H), shoulderF: W(p, p.dir * TORSO_W / 2, HIP_Y - TORSO_H + 6), shoulderB: W(p, -p.dir * TORSO_W / 2, HIP_Y - TORSO_H + 6), footS: legFoot(p, s), footK: legFoot(p, k) }; }

function makePlayer(team, slot) {
  const dir = team === 0 ? 1 : -1, x = team === 0 ? (slot === 0 ? 62 : 158) : (slot === 0 ? GW - 62 : GW - 158);
  return { team, slot, dir, ch: pick[team][slot], x, y: GROUND - LEG_L - HIP_Y, vx: 0, vy: 0, a: 0, w: 0, kickT: 0, grounded: false, footKPrev: null };
}
function kickoff(toward) {
  players = [makePlayer(0, 0), makePlayer(0, 1), makePlayer(1, 0), makePlayer(1, 1)];
  Object.assign(ball, { x: GW / 2, y: 70, vx: (toward ?? (Math.random() < 0.5 ? -1 : 1)) * (0.5 + Math.random() * 0.8), vy: 0, rot: 0 });
}
function startMatch() { score = [0, 0]; kickoff(); state = 'play'; timer = 0; if (AC && AC.state === 'suspended') AC.resume(); }

// ----- 버튼 하나 -----
function press(team) {
  for (const p of players) if (p.team === team) {
    if (p.grounded) { const ux = Math.sin(p.a), uy = -Math.cos(p.a); p.vx += ux * P.jump; p.vy = Math.min(p.vy, 0) + uy * P.jump; } // 몸이 기울어진 쪽으로 점프
    else if (p.touch) { p.vy = Math.min(p.vy, 0) - P.flop; p.w += -Math.sign(p.a || 1) * P.flopSpin; } // 누워 있으면 버둥 → 일어나며 튀어 오름
    p.kickT = P.kickT;
  }
  sfx(team === 0 ? 200 : 240, 0.07, 'square', 0.05);
}

// ----- 강체 충격량 -----
function applyImpulse(p, px, py, jx, jy) { p.vx += jx / P.mass; p.vy += jy / P.mass; p.w += ((px - p.x) * jy - (py - p.y) * jx) / P.inertia; }
function pointVel(p, px, py) { return { x: p.vx - p.w * (py - p.y), y: p.vy + p.w * (px - p.x) }; }
function contactStatic(p, pt, nx, ny, depth, e, mu) { // 고정된 면(땅·벽·크로스바)과 부딪힘
  const rx = pt.x - p.x, ry = pt.y - p.y, v = pointVel(p, pt.x, pt.y), vn = v.x * nx + v.y * ny;
  p.x += nx * depth * 0.8; p.y += ny * depth * 0.8;
  if (vn >= 0) return;
  const rn = rx * ny - ry * nx, k = 1 / P.mass + (rn * rn) / P.inertia, j = -(1 + e) * vn / k;
  applyImpulse(p, pt.x, pt.y, nx * j, ny * j);
  const tx = -ny, ty = nx, v2 = pointVel(p, pt.x, pt.y), vt = v2.x * tx + v2.y * ty, rt = rx * ty - ry * tx, kt = 1 / P.mass + (rt * rt) / P.inertia;
  const jt = Math.max(-mu * j, Math.min(mu * j, -vt / kt)); applyImpulse(p, pt.x, pt.y, tx * jt, ty * jt);
}

function stepPlayer(p) {
  p.vy += G_P; p.x += p.vx / SUB; p.y += p.vy / SUB; p.a += p.w / SUB;
  p.vx *= 0.999; p.w *= 0.998;
  // 다리 휘두르는 반동: 차는 다리가 앞으로 → 몸은 뒤로 회전 (땅에선 약하게, 공중에선 세게 → 공중제비)
  if (p.kickT > 0) { const before = legAngles(p)[1]; p.kickT = Math.max(0, p.kickT - 1 / SUB); const after = legAngles(p)[1]; p.w -= (after - before) * P.recoil * (p.grounded ? 0.4 : 1); }
  const pts = pointsOf(p);
  p.grounded = false; p.touch = false;
  for (const key of ['footS', 'footK', 'top', 'hip', 'shoulderF', 'shoulderB']) {
    const pt = pts[key], foot = key.startsWith('foot'), d = pt.y - GROUND;
    if (d > 0) { contactStatic(p, pt, 0, -1, d, P.rest, foot ? P.fric : 0.6); p.touch = true; if (foot) p.grounded = true; }
    if (pt.x < 2) contactStatic(p, pt, 1, 0, 2 - pt.x, 0.3, 0.3);
    if (pt.x > GW - 2) contactStatic(p, pt, -1, 0, pt.x - (GW - 2), 0.3, 0.3);
    if (pt.y < 2) contactStatic(p, pt, 0, 1, 2 - pt.y, 0.3, 0.3);
    for (const [x0, x1] of [[0, GOAL_D], [GW - GOAL_D, GW]]) if (pt.x > x0 && pt.x < x1 && Math.abs(pt.y - GOAL_TOP) < 4) { // 크로스바 (올라설 수도 있음)
      const up = pt.y < GOAL_TOP || p.vy > 0; contactStatic(p, pt, 0, up ? -1 : 1, 4 - Math.abs(pt.y - GOAL_TOP), 0.2, 0.8); if (up && foot) p.grounded = true; }
  }
  if (p.grounded && Math.abs(p.a) < 1.0) { p.w -= Math.sin(p.a) * P.balance / SUB; p.w *= Math.pow(P.balDamp, 1 / SUB); } // 발로 서 있을 때 똑바로 서려는 힘 (휘청휘청)
  if (p.a > Math.PI) p.a -= Math.PI * 2; else if (p.a < -Math.PI) p.a += Math.PI * 2; // 공중제비 각도 정리
}

function segClosest(px, py, a, b) { const dx = b.x - a.x, dy = b.y - a.y, L = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((px - a.x) * dx + (py - a.y) * dy) / L)); return { x: a.x + dx * t, y: a.y + dy * t }; }
function ballVsPlayer(p) {
  const pts = pointsOf(p);
  const caps = [[pts.hip, pts.top, TORSO_W / 2, false], [pts.hip, pts.footS, LEG_W / 2, false], [pts.hip, pts.footK, LEG_W / 2, true]];
  for (const [a, b, r, kick] of caps) {
    const c = segClosest(ball.x, ball.y, a, b), dx = ball.x - c.x, dy = ball.y - c.y, d = Math.hypot(dx, dy), min = r + BALL_R;
    if (d >= min || d < 0.001) continue;
    const nx = dx / d, ny = dy / d, pen = min - d;
    ball.x += nx * pen * 0.85; ball.y += ny * pen * 0.85; p.x -= nx * pen * 0.15; p.y -= ny * pen * 0.15;
    const pv = pointVel(p, c.x, c.y); let kvx = 0, kvy = 0;
    if (kick && p.kickT > 0 && p.footKPrev) { const f = pts.footK, t = Math.hypot(c.x - pts.hip.x, c.y - pts.hip.y) / LEG_L; kvx = (f.x - p.footKPrev.x) * SUB * t; kvy = (f.y - p.footKPrev.y) * SUB * t; } // 휘두르는 다리 속도
    const rvx = ball.vx - pv.x - kvx, rvy = ball.vy - pv.y - kvy, vn = rvx * nx + rvy * ny;
    if (vn >= 0) continue;
    const rx = c.x - p.x, ry = c.y - p.y, rn = rx * ny - ry * nx, k = 1 / BALL.mass + 1 / P.mass + (rn * rn) / P.inertia, j = -(1 + BALL.rest) * vn / k;
    ball.vx += (nx * j) / BALL.mass; ball.vy += (ny * j) / BALL.mass; applyImpulse(p, c.x, c.y, -nx * j, -ny * j);
    if (j > 0.4) { sfx(kick ? 520 : 360, 0.05, 'triangle', Math.min(0.12, j * 0.05)); if (kick && j > 1.2) shake = Math.max(shake, 3); }
  }
  const sp = Math.hypot(ball.vx, ball.vy); if (sp > 22) { ball.vx *= 22 / sp; ball.vy *= 22 / sp; }
}
function playerVsPlayer(A, B) { // 몸끼리 부딪힘 (원 몇 개로 근사) — 같은 편·상대 편 모두
  const ca = pointsOf(A), cb = pointsOf(B);
  const sa = [[ca.top, 12], [W(A, 0, HIP_Y - TORSO_H / 2), 13], [ca.hip, 10], [ca.footS, 5], [ca.footK, 5]], sb = [[cb.top, 12], [W(B, 0, HIP_Y - TORSO_H / 2), 13], [cb.hip, 10], [cb.footS, 5], [cb.footK, 5]];
  for (const [pa, ra] of sa) for (const [pb, rb] of sb) {
    const dx = pb.x - pa.x, dy = pb.y - pa.y, d = Math.hypot(dx, dy), min = ra + rb;
    if (d >= min || d < 0.001) continue;
    const nx = dx / d, ny = dy / d, pen = (min - d) / 2;
    A.x -= nx * pen * 0.5; A.y -= ny * pen * 0.5; B.x += nx * pen * 0.5; B.y += ny * pen * 0.5;
    const va = pointVel(A, pa.x, pa.y), vb = pointVel(B, pb.x, pb.y), vn = (vb.x - va.x) * nx + (vb.y - va.y) * ny;
    if (vn >= 0) continue;
    const j = -1.3 * vn / 2.6; applyImpulse(A, pa.x, pa.y, -nx * j, -ny * j); applyImpulse(B, pb.x, pb.y, nx * j, ny * j);
  }
}
function stepBall() {
  ball.vy += G_B; ball.x += ball.vx / SUB; ball.y += ball.vy / SUB; ball.rot += ball.vx * 0.04 / SUB;
  if (ball.y > GROUND - BALL_R) { ball.y = GROUND - BALL_R; if (ball.vy > 0) ball.vy *= -BALL.rest; ball.vx *= BALL.fric; }
  if (ball.y < BALL_R) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy) * 0.8; }
  if (ball.x < BALL_R) { ball.x = BALL_R; ball.vx = Math.abs(ball.vx) * 0.6; }
  if (ball.x > GW - BALL_R) { ball.x = GW - BALL_R; ball.vx = -Math.abs(ball.vx) * 0.6; }
  for (const [x0, x1] of [[0, GOAL_D], [GW - GOAL_D, GW]]) { // 크로스바
    const c = segClosest(ball.x, ball.y, { x: x0, y: GOAL_TOP }, { x: x1, y: GOAL_TOP }), dx = ball.x - c.x, dy = ball.y - c.y, d = Math.hypot(dx, dy);
    if (d < BALL_R + 2 && d > 0.001) { const nx = dx / d, ny = dy / d; ball.x = c.x + nx * (BALL_R + 2); ball.y = c.y + ny * (BALL_R + 2); const vn = ball.vx * nx + ball.vy * ny; if (vn < 0) { ball.vx -= 1.6 * vn * nx; ball.vy -= 1.6 * vn * ny; if (Math.abs(vn) > 2) sfx(760, 0.06, 'square', 0.05); } }
  }
}
function checkGoal() {
  if (ball.y > GOAL_TOP + BALL_R * 0.5) { if (ball.x < GOAL_D - BALL_R) return 1; if (ball.x > GW - GOAL_D + BALL_R) return 0; }
  return -1;
}
function physics() {
  for (let s = 0; s < SUB; s++) {
    for (const p of players) { p.footKPrev = pointsOf(p).footK; stepPlayer(p); }
    for (let i = 0; i < players.length; i++) for (let j = i + 1; j < players.length; j++) playerVsPlayer(players[i], players[j]);
    stepBall(); for (const p of players) ballVsPlayer(p);
  }
}

// ----- 컴퓨터 -----
let cpuCD = 0;
function cpuThink(team) {
  if (--cpuCD > 0) return;
  const mine = players.filter((p) => p.team === team), dir = team === 0 ? 1 : -1;
  const close = mine.some((p) => Math.hypot(ball.x - p.x, ball.y - p.y) < 60 && (ball.x - p.x) * dir > -20);
  const lying = mine.some((p) => p.touch && Math.abs(p.a) > 1.2);
  const danger = team === 1 ? ball.x > GW - 120 : ball.x < 120;
  if ((close && Math.random() < 0.6) || (lying && Math.random() < 0.08) || (danger && Math.random() < 0.06) || Math.random() < 0.012) { press(team); cpuCD = 16 + Math.floor(Math.random() * 16); }
}

// ----- 메뉴 -----
function slotRects() { const out = []; for (let t = 0; t < 2; t++) for (let s = 0; s < 2; s++) out.push({ team: t, slot: s, x: (t === 0 ? 40 : GW - 40 - 150) + s * 80, y: 92, w: 70, h: 110 }); return out; }
function onTap(x, y) {
  if (state === 'menu') {
    for (const s of slotRects()) if (x >= s.x && x <= s.x + s.w && y >= s.y && y <= s.y + s.h) { pick[s.team][s.slot] = (pick[s.team][s.slot] + 1) % CHARS.length; sfx(500, 0.04); return; }
    if (y > 250 && x > GW / 2 - 80 && x < GW / 2 + 80) startMatch(); else if (y > 222 && y < 246) cpu = !cpu;
  } else if (state === 'play') press(x < GW / 2 ? 0 : 1);
  else if (state === 'over') state = 'menu';
}

// ----- 업데이트 -----
function update() {
  if (state === 'menu') {
    const cyc = (t, s) => { pick[t][s] = (pick[t][s] + 1) % CHARS.length; sfx(500, 0.04); };
    if (pressed.has('Digit1')) cyc(0, 0); if (pressed.has('Digit2')) cyc(0, 1); if (pressed.has('Digit9')) cyc(1, 0); if (pressed.has('Digit0')) cyc(1, 1);
    if (pressed.has('KeyR')) { for (let t = 0; t < 2; t++) for (let s = 0; s < 2; s++) pick[t][s] = Math.floor(Math.random() * CHARS.length); sfx(600, 0.06); }
    if (pressed.has('KeyC')) cpu = !cpu;
    if (pressed.has('Enter') || pressed.has('Space')) startMatch();
    if ((pressed.has('KeyB') || pressed.has('Escape')) && document.querySelector('script[src="soccer.js"]')) location.href = 'index.html'; // 배구로 돌아가기
  } else if (state === 'play' || state === 'goal') {
    if (state === 'play') {
      if (pressed.has('KeyW')) press(0);
      if (pressed.has('ArrowUp') && !cpu) press(1);
      if (cpu) cpuThink(1);
      if (pressed.has('Escape')) state = 'menu';
    }
    physics();
    if (state === 'play') { const g = checkGoal(); if (g >= 0) { score[g]++; lastScorer = g; state = 'goal'; timer = 0; msg = (g === 0 ? '빨강' : '파랑') + ' GOAL!'; shake = 10; sfx(880, 0.2); setTimeout(() => sfx(1180, 0.25), 120); } }
    else if (++timer > 100) { if (score[0] >= WIN || score[1] >= WIN) { state = 'over'; timer = 0; } else { kickoff(lastScorer === 0 ? 1 : -1); state = 'play'; } }
  } else if (state === 'over') { if (++timer > 40 && (pressed.has('Enter') || pressed.has('Space') || pressed.has('KeyW') || pressed.has('ArrowUp'))) state = 'menu'; }
  if (shake > 0) shake *= 0.85;
  pressed.clear();
}

// ----- 그리기 -----
function text(s, x, y, size, col, align = 'center') { ctx.font = `bold ${size}px "Malgun Gothic", sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.lineWidth = Math.max(2, size / 6); ctx.strokeStyle = 'rgba(0,0,0,.75)'; ctx.strokeText(s, x, y); ctx.fillStyle = col; ctx.fillText(s, x, y); }
function drawField() {
  const g = ctx.createLinearGradient(0, 0, 0, GROUND); g.addColorStop(0, '#6ccff5'); g.addColorStop(1, '#c9efff'); ctx.fillStyle = g; ctx.fillRect(0, 0, GW, GROUND);
  ctx.fillStyle = 'rgba(255,255,255,.9)'; for (const [x, y, w] of [[80, 40, 56], [250, 28, 76], [370, 64, 44]]) { ctx.fillRect(x - w / 2, y - 6, w, 12); ctx.fillRect(x - w / 3, y - 11, w * 0.6, 6); }
  for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? '#56c23f' : '#64cf4b'; ctx.fillRect(i * 36, GROUND, 36, GH - GROUND); }
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fillRect(GW / 2 - 1, GROUND, 2, GH - GROUND); ctx.fillRect(0, GROUND, GW, 1.5);
}
function drawGoal(left) {
  const x0 = left ? 0 : GW - GOAL_D;
  ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 0.7;
  for (let i = 0; i <= GOAL_D; i += 5) { ctx.beginPath(); ctx.moveTo(x0 + i, GOAL_TOP); ctx.lineTo(x0 + i, GROUND); ctx.stroke(); }
  for (let y = GOAL_TOP; y <= GROUND; y += 5) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + GOAL_D, y); ctx.stroke(); }
  ctx.fillStyle = '#fff'; ctx.fillRect(x0, GOAL_TOP - 2, GOAL_D, 4); ctx.fillRect(left ? GOAL_D - 2 : GW - GOAL_D - 1, GOAL_TOP - 2, 3, GROUND - GOAL_TOP + 2);
}
function drawPlayer(p) {
  const S = SPR[p.ch], col = p.team === 0 ? '#ff4a4a' : '#3a8cff', [sa, ka] = legAngles(p), hip = W(p, 0, HIP_Y);
  for (const [im, ang] of [[S && S.legL, sa], [S && S.legR, ka]]) { // 다리 (사진 아랫부분)
    ctx.save(); ctx.translate(hip.x, hip.y); ctx.rotate(p.a + ang);
    if (im) ctx.drawImage(im, -LEG_W / 2, -2, LEG_W, LEG_L + 2); else { ctx.fillStyle = (S && S.col) || '#555'; ctx.fillRect(-LEG_W / 2, 0, LEG_W, LEG_L); }
    ctx.fillStyle = col; ctx.fillRect(p.dir > 0 ? -LEG_W / 2 : -LEG_W / 2 - 4, LEG_L - 3, LEG_W + 4, 4); // 축구화 = 팀 색 (빨강/파랑 구분)
    ctx.restore();
  }
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); // 몸 (사진을 눌러 넣은 것)
  if (S) ctx.drawImage(S.body, -TORSO_W / 2, HIP_Y - TORSO_H, TORSO_W, TORSO_H); else { ctx.fillStyle = '#999'; ctx.fillRect(-TORSO_W / 2, HIP_Y - TORSO_H, TORSO_W, TORSO_H); }
  ctx.restore();
}
function drawBall() {
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(ball.x, GROUND + 2, BALL_R * (1 - Math.min(0.6, (GROUND - ball.y) / 300)), 2.5, 0, 0, 7); ctx.fill();
  ctx.save(); ctx.translate(ball.x, ball.y); ctx.rotate(ball.rot);
  ['#ffdd33', '#ffffff', '#ff5a5a', '#ffffff', '#3aa0ff', '#ffffff'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, BALL_R, i * 1.0472, (i + 1) * 1.0472); ctx.closePath(); ctx.fill(); }); // 비치볼
  ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, BALL_R, 0, 7); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 2, 0, 7); ctx.fill();
  ctx.restore();
}
function drawMenu() {
  drawField(); drawGoal(true); drawGoal(false); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, 0, GW, GH);
  text('피직스 축구', GW / 2, 36, 26, '#fff'); text('버튼 하나 · 몸이 기운 쪽으로 점프 + 킥 · 5골 먼저 승리', GW / 2, 62, 9, '#ffe9a0');
  text('빨강 팀 (W)', 115, 82, 11, '#ff7a7a'); text('파랑 팀 (' + (cpu ? '컴퓨터' : '↑') + ')', GW - 115, 82, 11, '#7ab8ff');
  for (const s of slotRects()) { const i = pick[s.team][s.slot], S = SPR[i];
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(s.x, s.y, s.w, s.h); ctx.strokeStyle = s.team === 0 ? '#ff4a4a' : '#3a8cff'; ctx.lineWidth = 2; ctx.strokeRect(s.x, s.y, s.w, s.h);
    if (S) { ctx.drawImage(S.legL, s.x + s.w / 2 - 10, s.y + 60, 9, 26); ctx.drawImage(S.legR, s.x + s.w / 2 + 1, s.y + 60, 9, 26); ctx.drawImage(S.body, s.x + s.w / 2 - 19, s.y + 6, 38, 56); }
    text(CHARS[i].name, s.x + s.w / 2, s.y + s.h - 8, 9, '#fff'); text(['1', '2', '9', '0'][s.team * 2 + s.slot] + ' 키 / 클릭 = 바꾸기', s.x + s.w / 2, s.y + s.h + 9, 6, '#ccc'); }
  text('R = 랜덤 팀 · C = 컴퓨터 ' + (cpu ? '켜짐 → 끄기 (2인용)' : '꺼짐 → 켜기 (1인용)') + ' · B/Esc = 배구로', GW / 2, 234, 9, '#ddd');
  ctx.fillStyle = '#ffd23f'; ctx.fillRect(GW / 2 - 80, 252, 160, 26); text('Enter / 터치 = 시작', GW / 2, 265, 12, '#3a2a00');
}
function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  if (state === 'menu') { drawMenu(); text(VERSION, GW - 4, GH - 6, 7, '#fff', 'right'); return; }
  ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  drawField(); drawGoal(true); drawGoal(false);
  for (const p of players) drawPlayer(p);
  drawBall();
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.fillStyle = '#ff4a4a'; ctx.fillRect(GW / 2 - 34, 8, 22, 22); ctx.fillStyle = '#3a8cff'; ctx.fillRect(GW / 2 + 12, 8, 22, 22);
  text(score[0], GW / 2 - 23, 19, 16, '#fff'); text('-', GW / 2, 19, 14, '#fff'); text(score[1], GW / 2 + 23, 19, 16, '#fff');
  text('W', 12, 14, 10, '#ffb0b0', 'left'); text(cpu ? 'CPU' : '↑', GW - 12, 14, 10, '#b0d0ff', 'right');
  if (state === 'goal') { const q = Math.min(1, timer / 10); ctx.save(); ctx.translate(GW / 2, 110); ctx.scale(0.5 + q * 0.5, 0.5 + q * 0.5); text(msg, 0, 0, 34, msg.startsWith('빨강') ? '#ff7a7a' : '#7ab8ff'); ctx.restore(); }
  if (state === 'over') { ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillRect(0, 0, GW, GH); const w = score[0] > score[1] ? 0 : 1; text((w === 0 ? '빨강' : '파랑') + ' 팀 승리!', GW / 2, 120, 30, w === 0 ? '#ff7a7a' : '#7ab8ff'); text(score[0] + ' - ' + score[1], GW / 2, 156, 18, '#fff'); if (timer > 40) text('Enter / 터치 = 메뉴로', GW / 2, 196, 10, '#ddd'); }
  text(VERSION, GW - 4, GH - 6, 7, '#fff', 'right');
}

let acc = 0, last = performance.now();
function loop(now) { acc += Math.min(200, now - last); last = now; while (acc >= 1000 / FPS) { update(); acc -= 1000 / FPS; } draw(); requestAnimationFrame(loop); }
kickoff(); requestAnimationFrame(loop);
