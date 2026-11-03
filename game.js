// ===== 설정 (여기만 바꾸면 돼요) =====
const CONFIG = {
  WIN_SCORE: 15,          // 몇 점 내면 이기는지
  FPS: 25,                // 1초에 몇 번 움직이는지 (원작 보통 속도 25)
  MANA_MAX: 5,            // 스파이크가 공에 몇 번 맞으면 스킬을 쓸 수 있는지
  IMAGES: {               // 이 파일이 없으면 기본 그림으로 그려져요
    background: 'assets/background.png',
    ball: 'assets/ball.png',
  },
};

// ===== 캐릭터 목록 =====
// type 'face'  : 동그란 얼굴 사진 + 코드로 그린 몸
// type 'sprite': 몸 전체 사진 (배경 지운 PNG)
// skill: 'giant' = 키 2배 / null = 아직 없음
const CHARACTERS = [
  { name: '무표정맨', type: 'face', img: 'assets/face1.png', skill: null,
    skillName: '???', desc: ['특수능력 준비 중'] },
  { name: '스마일맨', type: 'face', img: 'assets/face2.png', skill: null,
    skillName: '???', desc: ['특수능력 준비 중'] },
  { name: '키다리', type: 'sprite', img: 'assets/tall.png', w: 30, h: 70, skill: 'giant',
    skillName: '거인화', desc: ['5초 동안 키가 2배!', '높은 공도 다 막는다'] },
  { name: '허우적맨', type: 'sprite', img: 'assets/swim.png', w: 40, h: 68, skill: 'whirl',
    skillName: '회전 회오리', desc: ['3초 동안 팽이처럼 회전!', '닿는 공을 세게 날려버림'] },
];
// 스킬 시간 (25프레임 = 1초)
const SKILL_FRAMES = { giant: 125, whirl: 75 };

// ===== 기본 값 (원작과 같은 432 x 304 크기로 계산, 화면엔 2배로 그림) =====
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const SCALE = 2, GW = 432, GH = 304;
const NET_X = 216, NET_HW = 25, NET_TOP = 176, NET_PILLAR_TOP = 192;
const BALL_R = 20, BALL_GROUND_Y = 252;
const P_GROUND_Y = 244, P_HALF = 32;
const LEFT_SERVE_X = 56, RIGHT_SERVE_X = 376;
const SIDE_COLOR = ['#2f7cf6', '#f2463c'];

// 선수 상태
const NORMAL = 0, JUMP = 1, POWER = 2, DIVE = 3, LYING = 4, WIN = 5, LOSE = 6;

// ===== 이미지 불러오기 =====
const imgs = {};
function loadImg(key, src) {
  const im = new Image();
  im.onload = () => (imgs[key] = im);
  im.src = src;
}
for (const [k, src] of Object.entries(CONFIG.IMAGES)) loadImg(k, src);
CHARACTERS.forEach((c, i) => loadImg('char' + i, c.img));

// ===== 키 입력 =====
const down = new Set(), pressed = new Set();
const GAME_KEYS = ['KeyD','KeyR','KeyG','KeyF','KeyZ','ShiftLeft','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
  'Enter','NumpadEnter','Numpad5','Semicolon','Space','Backspace'];
let bsTimes = [], restartReq = false; // 백스페이스 3번 → 재시작
const norm = (e) => (e.code === 'NumpadEnter' ? 'Enter' : e.code === 'Semicolon' ? 'Numpad5' : e.code);
addEventListener('keydown', (e) => {
  if (GAME_KEYS.includes(e.code)) e.preventDefault();
  const c = norm(e);
  if (!down.has(c)) pressed.add(c);
  down.add(c);
  if (c === 'Backspace' && !e.repeat) {
    const now = performance.now();
    bsTimes = bsTimes.filter((t) => now - t < 1000);
    bsTimes.push(now);
    if (bsTimes.length >= 3) { bsTimes = []; restartReq = true; }
  }
});
addEventListener('keyup', (e) => down.delete(norm(e)));
addEventListener('blur', () => down.clear());

// ===== 선수 · 공 =====
function makePlayer(side) {
  return {
    side,
    keys: side === 0
      ? { l: 'KeyD', r: 'KeyG', u: 'KeyR', d: 'KeyF', a: 'KeyZ', s: 'ShiftLeft' }
      : { l: 'ArrowLeft', r: 'ArrowRight', u: 'ArrowUp', d: 'ArrowDown', a: 'Enter', s: 'Numpad5' },
    x: 0, y: P_GROUND_Y, vy: 0, state: NORMAL,
    powerT: 0, diveDir: 0, lyingT: 0, collided: false, score: 0, anim: 0,
    char: side, picked: false,          // 고른 캐릭터
    mana: 0, skillT: 0, skillMax: 1, hm: 1,          // 마나, 스킬 남은 시간, 키 배율
    color: SIDE_COLOR[side],
  };
}
const players = [makePlayer(0), makePlayer(1)];
const ball = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, power: false, trail: [] };
const effects = [], popups = [];
let state = 'title', timer = 0, lastScorer = 0, winner = -1;
let fade = 0, slowTick = 0; // fade: 0 = 밝음, 1 = 완전 검정

function readInput(p) {
  const k = p.keys;
  return {
    x: (down.has(k.r) ? 1 : 0) - (down.has(k.l) ? 1 : 0),
    y: (down.has(k.d) ? 1 : 0) - (down.has(k.u) ? 1 : 0), // 위 -1, 아래 +1
    power: pressed.has(k.a),
    skill: pressed.has(k.s),
  };
}

function resetRound(server) {
  players[0].x = 36; players[1].x = 396;
  for (const p of players) Object.assign(p, { y: P_GROUND_Y, vy: 0, state: NORMAL, powerT: 0, lyingT: 0, collided: false });
  Object.assign(ball, { x: server === 0 ? LEFT_SERVE_X : RIGHT_SERVE_X, y: 0, vx: 0, vy: 1, power: false, trail: [] });
  effects.length = 0;
  state = 'ready';
  timer = 0; // "Ready?" 30프레임(1.2초) 깜빡이며 화면 밝아짐
}

function newGame() {
  for (const p of players) Object.assign(p, { score: 0, mana: 0, skillT: 0, hm: 1 });
  winner = -1;
  popups.length = 0;
  resetRound(0);
}

function startGame() {
  newGame();
  state = 'startMsg';
  timer = 0;
}

// ----- 선수 움직임 -----
function updatePlayer(p, inp) {
  p.anim++;
  // 스킬 (거인화)
  const ch = CHARACTERS[p.char];
  if (inp.skill && ch.skill && p.mana >= CONFIG.MANA_MAX && p.skillT === 0 && p.state !== WIN && p.state !== LOSE) {
    p.mana = 0;
    p.skillT = p.skillMax = SKILL_FRAMES[ch.skill];
    popups.push({ text: ch.skillName + '!', x: p.x, y: 120, t: 30, color: p.color });
  }
  if (p.skillT > 0) p.skillT--;
  const target = p.skillT > 0 && ch.skill === 'giant' ? 2 : 1;
  p.hm += (target - p.hm) * 0.35;
  if (Math.abs(target - p.hm) < 0.01) p.hm = target;

  if (p.state === WIN || p.state === LOSE) return;
  if (p.state === LYING) { if (--p.lyingT <= 0) p.state = NORMAL; return; }

  // 좌우 이동
  if (p.state === DIVE) p.x += p.diveDir * 8;
  else p.x += inp.x * 6;
  const [mn, mx] = p.side === 0 ? [32, 184] : [248, 400];
  p.x = Math.max(mn, Math.min(mx, p.x));

  // 점프 (땅에서만)
  if (p.state === NORMAL && inp.y === -1) { p.state = JUMP; p.vy = -16; }

  // 중력
  if (p.y < P_GROUND_Y || p.vy < 0) {
    p.y += p.vy;
    p.vy += 1;
    if (p.y >= P_GROUND_Y) {
      p.y = P_GROUND_Y; p.vy = 0;
      if (p.state === DIVE) { p.state = LYING; p.lyingT = 5; }
      else p.state = NORMAL;
    }
  }

  // 공격 키
  if (inp.power) {
    if (p.state === JUMP) { p.state = POWER; p.powerT = 10; }
    else if (p.state === NORMAL && inp.x !== 0) { p.state = DIVE; p.diveDir = inp.x; p.vy = -5; }
  }
  if (p.state === POWER && --p.powerT <= 0) p.state = JUMP;
}

// ----- 공 움직임 (땅에 닿으면 true) -----
function updateBall() {
  ball.rot += ball.vx * 0.06;
  const fx = ball.x + ball.vx;
  if (fx < BALL_R || fx > GW) ball.vx = -ball.vx;
  if (ball.y + ball.vy < 0) ball.vy = 1;
  if (Math.abs(ball.x - NET_X) < NET_HW && ball.y > NET_TOP) {
    if (ball.y <= NET_PILLAR_TOP) { if (ball.vy > 0) ball.vy = -ball.vy; }
    else ball.vx = ball.x < NET_X ? -Math.abs(ball.vx) : Math.abs(ball.vx);
  }
  if (ball.y + ball.vy > BALL_GROUND_Y) {
    ball.y = BALL_GROUND_Y;
    ball.vy = -ball.vy;
    ball.power = false;
    effects.push({ x: ball.x, y: BALL_GROUND_Y + 20, t: 8 });
    return true;
  }
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 2) ball.trail.shift();
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy += 1;
  return false;
}

// ----- 선수가 공에 맞았을 때 -----
function hitBall(p, inp) {
  // 회전 회오리 중: 닿는 공을 상대 쪽으로 세게 날림
  if (p.skillT > 0 && CHARACTERS[p.char].skill === 'whirl') {
    ball.vx = (ball.x < NET_X ? 1 : -1) * 22;
    ball.vy = -14;
    ball.power = true;
    effects.push({ x: ball.x, y: ball.y, t: 8 });
    return;
  }
  const dx = ball.x - p.x;
  let vx = Math.floor(Math.abs(dx) / 3);
  if (dx < 0) vx = -vx;
  if (vx === 0) vx = Math.floor(Math.random() * 3) - 1;
  ball.vx = vx;
  ball.vy = -Math.abs(ball.vy);
  if (ball.vy > -15) ball.vy = -15;
  ball.power = false;

  if (p.state === POWER) {
    const toward = ball.x < NET_X ? 1 : -1;
    ball.vx = toward * (inp.x !== 0 ? 20 : 10);
    ball.vy = Math.abs(ball.vy) * inp.y * 2;
    ball.power = true;
    effects.push({ x: ball.x, y: ball.y, t: 8 });
    // 스파이크가 공에 맞으면 마나 1칸 (스킬 쓰는 중엔 안 참)
    if (p.skillT === 0 && p.mana < CONFIG.MANA_MAX) p.mana++;
  }
}

// 히트박스: 가로 64, 세로 64 (거인화 땐 위로 2배)
function hitTop(p) { return p.y - P_HALF - (p.hm - 1) * P_HALF * 2; }

function checkCollisions(inputs) {
  for (const p of players) {
    const touching = Math.abs(ball.x - p.x) <= P_HALF && ball.y >= hitTop(p) && ball.y <= p.y + P_HALF;
    if (touching) {
      if (!p.collided) { hitBall(p, inputs[p.side]); p.collided = true; }
    } else p.collided = false;
  }
}

// ----- 한 프레임 -----
function step(scoring) {
  const inputs = players.map(readInput);
  const touched = updateBall();
  players.forEach((p, i) => updatePlayer(p, inputs[i]));
  checkCollisions(inputs);
  if (touched && scoring) {
    lastScorer = ball.x < NET_X ? 1 : 0;
    players[lastScorer].score++;
    if (players[lastScorer].score >= CONFIG.WIN_SCORE) {
      winner = lastScorer;
      players[winner].state = WIN;
      players[1 - winner].state = LOSE;
      players.forEach((p) => { p.y = P_GROUND_Y; p.vy = 0; p.skillT = 0; });
      state = 'over';
      timer = 0;
    } else {
      state = 'slow';
      timer = 0; slowTick = 0;
    }
  }
}

// ----- 캐릭터 선택 -----
function updateSelect() {
  for (const p of players) {
    p.anim++;
    if (p.picked) continue;
    const k = p.keys, n = CHARACTERS.length;
    if (pressed.has(k.l)) p.char = (p.char + n - 1) % n;
    if (pressed.has(k.r)) p.char = (p.char + 1) % n;
    if (pressed.has(k.a)) { p.picked = true; popups.push({ text: '선택!', x: p.side === 0 ? 108 : 324, y: 200, t: 20, color: p.color }); }
  }
  if (players[0].picked && players[1].picked) {
    if (++timer >= 20) { state = 'startFadeOut'; timer = 0; }
  }
}

const powerPressed = () => pressed.has('KeyZ') || pressed.has('Enter');

function update() {
  if (restartReq) { restartReq = false; fade = 0; newGame(); pressed.clear(); return; }
  if (state === 'title') {
    players.forEach((p) => p.anim++);
    if (powerPressed()) {
      players.forEach((p) => { p.picked = false; p.state = NORMAL; p.hm = 1; p.skillT = 0; });
      state = 'select'; timer = 0;
    }
  } else if (state === 'select') {
    updateSelect();
  } else if (state === 'startFadeOut') {
    fade = Math.min(1, fade + 1 / 15);
    if (++timer >= 30) startGame();
  } else if (state === 'startMsg') {
    fade = Math.max(0, fade - 1 / 17);
    if (++timer >= 71) { fade = 0; state = 'play'; }
  } else if (state === 'play') {
    step(true);
  } else if (state === 'slow') {
    if (++slowTick % 5 === 0) {
      step(false);
      if (++timer >= 6) state = 'fadeOut';
    }
  } else if (state === 'fadeOut') {
    fade = Math.min(1, fade + 1 / 16);
    if (fade >= 1) resetRound(lastScorer);
  } else if (state === 'ready') {
    fade = Math.max(0, fade - 1 / 16);
    players.forEach((p) => p.anim++);
    if (++timer >= 30) { fade = 0; state = 'play'; }
  } else if (state === 'over') {
    step(false);
    timer++;
    if ((timer > 70 && powerPressed()) || timer >= 211) {
      players.forEach((p) => (p.state = NORMAL));
      state = 'title';
    }
  }
  for (const e of effects) e.t--;
  while (effects.length && effects[0].t <= 0) effects.shift();
  for (const e of popups) e.t--;
  while (popups.length && popups[0].t <= 0) popups.shift();
  pressed.clear();
}

// ===== 그리기 (좌표는 원작 크기, 화면엔 2배) =====
function drawBackground() {
  if (imgs.background) { ctx.drawImage(imgs.background, 0, 0, GW, GH); return; }
  const g = ctx.createLinearGradient(0, 0, 0, 270);
  g.addColorStop(0, '#5fb8ff'); g.addColorStop(1, '#d4eeff');
  ctx.fillStyle = g; ctx.fillRect(0, 0, GW, 270);
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  for (const [x, y, s] of [[70, 45, 1], [250, 30, 1.3], [370, 60, .9]]) {
    ctx.beginPath();
    ctx.ellipse(x, y, 28 * s, 10 * s, 0, 0, 7);
    ctx.ellipse(x + 18 * s, y - 6 * s, 18 * s, 9 * s, 0, 0, 7);
    ctx.fill();
  }
  ctx.fillStyle = '#7cc47a';
  ctx.beginPath(); ctx.moveTo(0, 270);
  for (let x = 0; x <= GW; x += 36) ctx.lineTo(x, 240 + 12 * Math.sin(x / 50));
  ctx.lineTo(GW, 270); ctx.fill();
  ctx.fillStyle = '#e9c97a'; ctx.fillRect(0, 270, GW, GH - 270);
  ctx.fillStyle = '#d9b35f'; ctx.fillRect(0, 270, GW, 3);
}

function drawNet() {
  ctx.fillStyle = '#555';
  ctx.fillRect(NET_X - 3, NET_TOP, 6, GH - NET_TOP);
  ctx.fillStyle = '#fff';
  ctx.fillRect(NET_X - 5, NET_TOP - 2, 10, 6);
}

function shadow(x, w) {
  ctx.fillStyle = 'rgba(0,0,0,.2)';
  ctx.beginPath(); ctx.ellipse(x, 275, w, 3.5, 0, 0, 7); ctx.fill();
}

// 얼굴 캐릭터 (중심 0,0 / 발 +32 / 오른쪽 바라봄)
function drawFaceChar(p, faceImg) {
  const st = p.state;
  const armUp = st === POWER || st === WIN || st === JUMP;
  const bob = st === NORMAL ? Math.sin(p.anim * 0.5) * 1.2 : st === WIN ? -Math.abs(Math.sin(p.anim * 0.4)) * 6 : 0;
  ctx.translate(0, bob);
  // 거인화: 발 기준으로 위로 늘림
  if (p.hm !== 1) { ctx.translate(0, 32); ctx.scale(1, p.hm); ctx.translate(0, -32); }
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#333'; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-5, 14); ctx.lineTo(-7, 31);
  ctx.moveTo(5, 14); ctx.lineTo(7, 31);
  ctx.stroke();
  ctx.fillStyle = p.color;
  ctx.beginPath(); ctx.roundRect(-12, -3, 24, 20, 6); ctx.fill();
  ctx.strokeStyle = '#f2c9a0'; ctx.lineWidth = 5;
  ctx.beginPath();
  if (st === POWER) { ctx.moveTo(8, 0); ctx.lineTo(20, -18); }
  else if (armUp) { ctx.moveTo(8, 0); ctx.lineTo(14, -14); }
  else { ctx.moveTo(9, 1); ctx.lineTo(15, 14); }
  if (st === WIN) { ctx.moveTo(-8, 0); ctx.lineTo(-14, -14); }
  else { ctx.moveTo(-9, 1); ctx.lineTo(-15, 14); }
  ctx.stroke();
  const R = 17;
  ctx.save();
  ctx.translate(0, -16);
  if (st === LOSE) ctx.rotate(0.35);
  if (faceImg) {
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    ctx.drawImage(faceImg, -R, -R, R * 2, R * 2);
    ctx.strokeStyle = p.color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
  } else {
    ctx.fillStyle = '#f2c9a0';
    ctx.beginPath(); ctx.arc(0, 0, R - 4, 0, 7); ctx.fill();
  }
  ctx.restore();
}

// 몸 전체 사진 캐릭터: 히트박스(64x64)에 맞게 눌러서 그림, 거인화면 위로 2배
function drawSpriteChar(p, im, ch) {
  const st = p.state;
  const bob = st === WIN ? -Math.abs(Math.sin(p.anim * 0.4)) * 6 : st === NORMAL ? Math.sin(p.anim * 0.5) * 0.8 : 0;
  const h = ch.h * p.hm, w = ch.w;
  ctx.translate(0, bob);
  if (st === LOSE) { ctx.translate(0, 32); ctx.rotate(0.2); ctx.translate(0, -32); }
  if (im) {
    ctx.scale(p.side === 0 ? 1 : -1, 1); // 사진은 반전 안 되게
    ctx.drawImage(im, -w / 2, 32 - h, w, h);
  } else {
    ctx.fillStyle = p.color;
    ctx.fillRect(-w / 2, 32 - h, w, h);
  }
}

function drawFigure(p) {
  const ch = CHARACTERS[p.char];
  const im = imgs['char' + p.char];
  if (ch.type === 'sprite') drawSpriteChar(p, im, ch);
  else drawFaceChar(p, im);
}

function drawPlayer(p) {
  const lying = p.state === DIVE || p.state === LYING;
  shadow(p.x, lying ? 26 : 18);
  ctx.save();
  ctx.translate(p.x, p.y);
  const face = p.side === 0 ? 1 : -1;
  if (lying) {
    ctx.translate(0, 18);
    ctx.rotate((p.diveDir || face) * Math.PI / 2);
  } else if (p.state === POWER) ctx.rotate(face * 0.15);
  const whirl = p.skillT > 0 && CHARACTERS[p.char].skill === 'whirl';
  if (whirl) {
    // 팽이처럼 빙글빙글 (세로축 회전)
    ctx.scale(Math.cos(p.anim * 1.4) || 0.05, 1);
  }
  ctx.scale(face, 1);
  drawFigure(p);
  ctx.restore();
  if (whirl) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const a = p.anim * 0.9 + i * 2.1, yy = p.y + 18 - i * 18;
      ctx.beginPath(); ctx.ellipse(p.x, yy, 30 - i * 4, 6, 0, a, a + 3.6); ctx.stroke();
    }
    ctx.restore();
  }
  // 거인화 중 남은 시간 막대
  if (p.skillT > 0) {
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(p.x - 16, hitTop(p) - 10, 32, 3);
    ctx.fillStyle = '#ffd23f'; ctx.fillRect(p.x - 16, hitTop(p) - 10, 32 * p.skillT / p.skillMax, 3);
  }
}

function drawBallAt(x, y, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y); ctx.rotate(ball.rot);
  if (imgs.ball) ctx.drawImage(imgs.ball, -BALL_R, -BALL_R, BALL_R * 2, BALL_R * 2);
  else {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2b4c9a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, BALL_R, 0, 7); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#f2b705';
    ctx.beginPath(); ctx.arc(-BALL_R, 0, BALL_R, -1, 1); ctx.stroke();
    ctx.beginPath(); ctx.arc(BALL_R, 0, BALL_R, 2.1, 4.2); ctx.stroke();
  }
  ctx.restore();
}

function drawBall() {
  shadow(ball.x, 16);
  if (ball.power) ball.trail.forEach((t, i) => drawBallAt(t.x, t.y, 0.25 + i * 0.2));
  drawBallAt(ball.x, ball.y, 1);
}

function drawEffects() {
  for (const e of effects) {
    const r = 10 + (8 - e.t) * 4;
    ctx.strokeStyle = `rgba(255,240,120,${e.t / 8})`; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 7); ctx.stroke();
  }
}

function text(str, x, y, size, color = '#fff', align = 'center') {
  ctx.font = `bold ${size}px "Malgun Gothic", sans-serif`;
  ctx.textAlign = align;
  ctx.lineWidth = size / 5; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(0,0,0,.6)';
  ctx.strokeText(str, x, y);
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

// 마나 5칸
function drawMana(p) {
  const ch = CHARACTERS[p.char];
  const full = p.mana >= CONFIG.MANA_MAX;
  for (let i = 0; i < CONFIG.MANA_MAX; i++) {
    const x = p.side === 0 ? 14 + i * 11 : GW - 14 - (CONFIG.MANA_MAX - 1 - i) * 11;
    ctx.beginPath(); ctx.arc(x, 52, 4, 0, 7);
    ctx.fillStyle = i < p.mana ? (full && Math.floor(p.anim / 3) % 2 ? '#fff6a0' : '#ffd23f') : 'rgba(0,0,0,.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.stroke();
  }
  if (full && ch.skill && p.skillT === 0) {
    const key = p.side === 0 ? 'Shift' : '5 / ;';
    text(`${key} → ${ch.skillName}!`, p.side === 0 ? 10 : GW - 10, 70, 9, '#fff3a0', p.side === 0 ? 'left' : 'right');
  }
}

function drawPopups() {
  for (const e of popups) {
    ctx.globalAlpha = Math.min(1, e.t / 8);
    text(e.text, e.x, e.y - (30 - e.t) * 0.6, 18, e.color);
    ctx.globalAlpha = 1;
  }
}

// 캐릭터 선택 화면
function drawSelect() {
  ctx.fillStyle = 'rgba(10,20,40,.55)'; ctx.fillRect(0, 0, GW, GH);
  text('캐릭터 선택', GW / 2, 30, 22, '#fff3a0');
  const n = CHARACTERS.length, cw = 54, gap = 10;
  const x0 = GW / 2 - (n * cw + (n - 1) * gap) / 2;
  CHARACTERS.forEach((c, i) => {
    const x = x0 + i * (cw + gap), y = 42;
    ctx.fillStyle = 'rgba(255,255,255,.15)';
    ctx.beginPath(); ctx.roundRect(x, y, cw, 70, 6); ctx.fill();
    const im = imgs['char' + i];
    if (im && c.type === 'sprite') {
      const h = 62, w = h * im.width / im.height;
      ctx.drawImage(im, x + cw / 2 - w / 2, y + 4, w, h);
    } else if (im) {
      ctx.save(); ctx.beginPath(); ctx.arc(x + cw / 2, y + 30, 20, 0, 7); ctx.clip();
      ctx.drawImage(im, x + cw / 2 - 20, y + 10, 40, 40); ctx.restore();
    }
    text(c.name, x + cw / 2, y + 66, 8);
    players.forEach((p) => {
      if (p.char !== i) return;
      const inset = p.side === 0 ? 0 : 3;
      ctx.strokeStyle = p.color; ctx.lineWidth = 2.5;
      if (p.picked && Math.floor(p.anim / 2) % 2) ctx.strokeStyle = '#fff';
      ctx.beginPath(); ctx.roundRect(x - 2 + inset, y - 2 + inset, cw + 4 - inset * 2, 74 - inset * 2, 7); ctx.stroke();
      text(p.side === 0 ? '1P' : '2P', p.side === 0 ? x + 2 : x + cw - 2, y - 4, 9, p.color, p.side === 0 ? 'left' : 'right');
    });
  });
  // 양쪽 설명 + 큰 미리보기
  players.forEach((p) => {
    const c = CHARACTERS[p.char];
    const cx = p.side === 0 ? 108 : 324;
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.roundRect(cx - 98, 122, 196, 172, 8); ctx.fill();
    ctx.save();
    ctx.translate(cx - 50, 222);
    ctx.scale(1.3, 1.3);
    const fake = { ...p, state: NORMAL, hm: 1 };
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    drawFigure(fake);
    ctx.restore();
    const tx = cx - 10;
    text(c.name, tx, 148, 15, p.color, 'left');
    text('특수: ' + c.skillName, tx, 170, 11, '#fff3a0', 'left');
    c.desc.forEach((d, i) => text(d, tx, 188 + i * 15, 9, '#fff', 'left'));
    const keys = p.side === 0 ? 'D/G 고르기 · Z 선택' : '←/→ 고르기 · Enter 선택';
    text(p.picked ? '준비 완료!' : keys, cx, 284, 10, p.picked ? '#7dff9a' : '#ddd');
  });
}

function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  drawBackground();
  drawNet();
  if (state !== 'select') players.forEach(drawPlayer);
  if (state !== 'title' && state !== 'startFadeOut' && state !== 'select') drawBall();
  drawEffects();

  if (state === 'select') { drawSelect(); drawPopups(); return; }

  text(players[0].score, 30, 36, 30, '#cfe3ff');
  text(players[1].score, GW - 30, 36, 30, '#ffd6d3');
  if (state !== 'title' && state !== 'startFadeOut') players.forEach(drawMana);
  drawPopups();

  if (state === 'title' || state === 'startFadeOut') {
    text('배구 대전', GW / 2, 78, 36);
    text('왼쪽: D G 이동 · R 점프 · Z 공격 · Shift 스킬', GW / 2, 112, 12);
    text('오른쪽: ← → 이동 · ↑ 점프 · Enter 공격 · 5 또는 ; 스킬', GW / 2, 130, 12);
    text('점프 중 공격 + 방향키 = 스파이크 방향', GW / 2, 152, 11, '#ffe08a');
    text('스파이크를 5번 맞히면 스킬 사용 가능', GW / 2, 168, 11, '#ffe08a');
    text('Z 또는 Enter를 눌러 시작', GW / 2, 200, 15, '#fff3a0');
    text('게임 중 Backspace 3번 = 처음부터 다시', GW / 2, 222, 10);
  }

  if (fade > 0) {
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, GW, GH);
  }

  if (state === 'ready') {
    if (Math.floor(timer / 5) % 2 === 0) text('Ready?', GW / 2, 110, 30, '#fff3a0');
  } else if (state === 'startMsg') {
    const s = Math.min(1, (timer + 1) / 12);
    text('게임 시작!', GW / 2, 120, 40 * s, '#fff3a0');
  } else if (state === 'over') {
    const s = Math.min(1, (timer + 1) / 15);
    text('GAME END', GW / 2, 100, 44 * s, '#fff3a0');
    if (timer > 15) text(winner === 0 ? '왼쪽 승리!' : '오른쪽 승리!', GW / 2, 132, 18);
    if (timer > 70) text('Z 또는 Enter로 타이틀로', GW / 2, 156, 12);
  }
}

// ===== 게임 루프 (원작처럼 1초에 25번 계산) =====
let last = performance.now(), acc = 0;
function loop(now) {
  const STEP = 1000 / CONFIG.FPS;
  acc += Math.min(200, now - last);
  last = now;
  while (acc >= STEP) { update(); acc -= STEP; }
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
