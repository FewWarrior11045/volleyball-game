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
  { name: '무표정맨', grade: 'COMMON', type: 'face', img: 'assets/face1.png', skill: null,
    skillName: '???', desc: ['특수능력 준비 중'] },
  { name: '스마일맨', grade: 'COMMON', type: 'face', img: 'assets/face2.png', skill: null,
    skillName: '???', desc: ['특수능력 준비 중'] },
  { name: '키다리', grade: 'EPIC', type: 'sprite', img: 'assets/tall.png', w: 30, h: 70, skill: 'giant',
    skillName: '거인화', desc: ['5초 동안 키가 3배!', '높은 공도 다 막는다'] },
  { name: '허우적맨', grade: 'RARE', type: 'sprite', img: 'assets/swim.png', w: 40, h: 68, skill: 'whirl',
    skillName: '회전 회오리', desc: ['3초 동안 2배로 커져서 회전!', '닿는 공을 엄청 세게 날림'] },
  { name: '문경목', grade: 'LEGENDARY', type: 'sprite', img: 'assets/hair.png', w: 62, h: 54, skill: 'hairbeam',
    skillName: '탈모빔', desc: ['하늘에서 거대한 빔 발사!', '라운드 끝까지 상대 쪼그라듦'] },
  { name: '촛불 마스터', grade: 'LEGENDARY', type: 'sprite', img: 'assets/democracy.png', w: 34, h: 66, skill: 'democracy',
    eyes: [[0.385, 0.249], [0.581, 0.249]], // 사진 속 눈 위치 (가로, 세로 비율)
    skillName: '민주주의 제1장', desc: ['영역전개! 9명으로 분신했다가', '거대 지팡이로 공을 꽂아 넣음'] },
];
// 등급 색깔
const GRADE_COLOR = { COMMON: '#3ccf5a', RARE: '#3d8bff', EPIC: '#a64dff', MYTHIC: '#ff3b3b', LEGENDARY: '#ffd23f' };

// 스킬 시간 (25프레임 = 1초)
const SKILL_FRAMES = { giant: 125, whirl: 75, hairbeam: 125, democracy: 8 };
const DEMO_FRAMES = 80;    // 민주주의 영역전개 연출 길이 (3.2초, 모든 게 슬로우)
const DEMO_HIT = 74;       // 지팡이가 공을 치는 순간
const SHRINK = 0.4;        // 탈모빔 맞은 상대 크기
const BEAM_FRAMES = 45;    // 탈모빔 연출 길이 (슈퍼 슬로모션)
const BEAM_HIT = 14;       // 빔이 땅에 닿는 순간
const INTRO_FRAMES = 50;   // 빔 쏘기 전 컷인 애니메이션 (2초, 경기 멈춤)
// 스킬 중 크기 배율 [가로, 세로] (히트박스도 같이 커짐)
const SKILL_SIZE = { giant: [1, 3], whirl: [2, 2] };

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
    mana: 0, skillT: 0, skillMax: 1, hm: 1, hw: 1, shrinkT: 0,          // 마나, 스킬 남은 시간, 키 배율
    color: SIDE_COLOR[side],
  };
}
const players = [makePlayer(0), makePlayer(1)];
const ball = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, power: false, trail: [] };
const effects = [], popups = [];
let state = 'title', timer = 0, lastScorer = 0, winner = -1;
let fade = 0, slowTick = 0;
let cine = null; // 탈모빔 연출 { t, caster, target } // fade: 0 = 밝음, 1 = 완전 검정

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
  for (const p of players) {
    Object.assign(p, { y: P_GROUND_Y, vy: 0, state: NORMAL, powerT: 0, lyingT: 0, collided: false });
    // 탈모빔은 라운드 끝나면 사라짐 (시간 상관없이)
    p.shrinkT = 0;
    if (CHARACTERS[p.char].skill === 'hairbeam') p.skillT = 0;
    if (CHARACTERS[p.char].skill === 'democracy') p.skillT = 0; // 민주주의도 라운드 끝나면 해제
  }
  cine = null; // 남아 있는 연출(영역전개·빔)도 정리
  Object.assign(ball, { x: server === 0 ? LEFT_SERVE_X : RIGHT_SERVE_X, y: 0, vx: 0, vy: 1, power: false, unblockable: false, trail: [] });
  effects.length = 0;
  state = 'ready';
  timer = 0; // "Ready?" 30프레임(1.2초) 깜빡이며 화면 밝아짐
}

function newGame() {
  for (const p of players) Object.assign(p, { score: 0, mana: 0, skillT: 0, hm: 1, hw: 1, shrinkT: 0 });
  cine = null;
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
    if (ch.skill === 'hairbeam') cine = { kind: 'hairbeam', intro: 0, t: 0, caster: p, target: players[1 - p.side] };
    if (ch.skill === 'democracy') {
      const candles = [];
      for (let i = 0; i < 70; i++) candles.push({ x: Math.random() * GW, y: 20 + Math.random() * 270, d: Math.random() * 14, s: 0.6 + Math.random() * 0.8, f: Math.random() * 6 });
      cine = { kind: 'democracy', t: 0, caster: p, target: players[1 - p.side], candles };
    }
    popups.push({ text: ch.skillName + '!', x: p.x, y: 120, t: 30, color: p.color });
  }
  if (p.skillT > 0) p.skillT--;
  let [tw, th] = p.skillT > 0 && SKILL_SIZE[ch.skill] ? SKILL_SIZE[ch.skill] : [1, 1];
  if (p.shrinkT > 0) { p.shrinkT--; tw *= SHRINK; th *= SHRINK; }
  p.hm += (th - p.hm) * 0.35;
  if (Math.abs(th - p.hm) < 0.01) p.hm = th;
  p.hw += (tw - p.hw) * 0.35;
  if (Math.abs(tw - p.hw) < 0.01) p.hw = tw;

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
    ball.unblockable = false;
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
    ball.vx = (ball.x < NET_X ? 1 : -1) * 37; // 22 x 1.7
    ball.vy = -24;                             // -14 x 1.7
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
  if (ball.unblockable) return; // 지팡이로 꽂은 공은 못 막음
  for (const p of players) {
    const touching = Math.abs(ball.x - p.x) <= P_HALF * p.hw && ball.y >= hitTop(p) && ball.y <= p.y + P_HALF;
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
    cine = null;
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

// ----- 민주주의 제1장 (영역전개) -----
const STAFF_LEN = 210, STAFF_END = 0.5; // 지팡이 길이, 칠 때 각도

function staffPivot(c) { return { x: c.x, y: c.y + 20 }; }

function democracyHit(c) {
  const s = c.side === 0 ? 1 : -1, pv = staffPivot(c);
  // 지팡이 끝에서 공을 쳐서 상대 코트로 꽂아 넣음
  ball.x = pv.x + s * Math.sin(STAFF_END) * STAFF_LEN;
  ball.y = pv.y - Math.cos(STAFF_END) * STAFF_LEN;
  const tx = s > 0 ? 290 + Math.random() * 100 : 42 + Math.random() * 100;
  ball.vx = (tx - ball.x) / 5;
  ball.vy = (BALL_GROUND_Y - ball.y) / 5 - 2;
  ball.power = true;
  ball.unblockable = true;
  ball.trail = [];
  effects.push({ x: ball.x, y: ball.y, t: 8 });
}

function drawCandle(x, y, sc, t, f) {
  ctx.fillStyle = '#f3ead2';
  ctx.fillRect(x - 2.5 * sc, y, 5 * sc, 12 * sc);
  const fl = 1 + Math.sin(t * 1.3 + f) * 0.2;
  const g = ctx.createRadialGradient(x, y - 4 * sc, 0, x, y - 4 * sc, 12 * sc);
  g.addColorStop(0, 'rgba(255,220,120,.55)'); g.addColorStop(1, 'rgba(255,200,80,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 4 * sc, 12 * sc, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffb02e';
  ctx.beginPath(); ctx.ellipse(x, y - 4 * sc * fl, 2.2 * sc, 4.5 * sc * fl, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff6c8';
  ctx.beginPath(); ctx.ellipse(x, y - 3 * sc * fl, 1 * sc, 2.4 * sc * fl, 0, 0, 7); ctx.fill();
}

// 보라·노랑 원들이 빙글빙글 도는 영역
function drawDomainCircles(cx, cy, t, k) {
  ctx.save();
  ctx.globalAlpha = k;
  const grow = Math.min(1, (t - 10) / 12);
  const rings = [
    { r: 150, c: '#9b4dff', w: 3, sp: 0.04, dash: [14, 8] },
    { r: 122, c: '#ffd84d', w: 2, sp: -0.06, dash: [4, 6] },
    { r: 96, c: '#c58bff', w: 4, sp: 0.08, dash: [30, 10] },
    { r: 70, c: '#ffd84d', w: 2, sp: -0.1, dash: [] },
    { r: 46, c: '#9b4dff', w: 3, sp: 0.14, dash: [8, 5] },
  ];
  for (const rg of rings) {
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(t * rg.sp);
    ctx.strokeStyle = rg.c; ctx.lineWidth = rg.w; ctx.setLineDash(rg.dash);
    ctx.shadowColor = rg.c; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(0, 0, rg.r * grow, 0, 7); ctx.stroke();
    ctx.restore();
  }
  ctx.setLineDash([]);
  // 바큇살 + 점
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.03);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.strokeStyle = i % 2 ? 'rgba(255,216,77,.6)' : 'rgba(155,77,255,.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(Math.cos(a) * 46 * grow, Math.sin(a) * 46 * grow); ctx.lineTo(Math.cos(a) * 150 * grow, Math.sin(a) * 150 * grow); ctx.stroke();
    ctx.fillStyle = '#ffd84d';
    ctx.beginPath(); ctx.arc(Math.cos(a) * 122 * grow, Math.sin(a) * 122 * grow, 3, 0, 7); ctx.fill();
  }
  ctx.restore();
  ctx.restore();
}

// 보라색 눈 불꽃
function drawEyeFire(x, y, t, size) {
  for (let i = 0; i < 5; i++) {
    const h = size * (1.6 + Math.sin(t * 2 + i) * 0.4) * (1 - i * 0.12);
    const ox = Math.sin(t * 3 + i * 1.7) * size * 0.25;
    const g = ctx.createLinearGradient(x, y, x, y - h);
    g.addColorStop(0, 'rgba(240,220,255,.95)');
    g.addColorStop(0.4, 'rgba(170,80,255,.85)');
    g.addColorStop(1, 'rgba(90,0,180,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.45, y);
    ctx.quadraticCurveTo(x + ox - size * 0.3, y - h * 0.5, x + ox, y - h);
    ctx.quadraticCurveTo(x + ox + size * 0.3, y - h * 0.5, x + size * 0.45, y);
    ctx.fill();
  }
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(x, y, size * 0.22, 0, 7); ctx.fill();
}

function drawStaff(c, t) {
  const s = c.side === 0 ? 1 : -1, pv = staffPivot(c);
  // DEMO_HIT 직전 8프레임 동안 뒤에서 앞으로 휘두름
  const p = Math.min(1, Math.max(0, (t - (DEMO_HIT - 8)) / 8));
  const ease = p * p;
  const ang = s * (STAFF_END - 2.6 * (1 - ease));
  const tipX = pv.x + Math.sin(ang) * STAFF_LEN, tipY = pv.y - Math.cos(ang) * STAFF_LEN;
  // 휘두른 자국
  if (p > 0 && p < 1 || (t >= DEMO_HIT && t < DEMO_HIT + 4)) {
    ctx.strokeStyle = 'rgba(200,140,255,.45)'; ctx.lineWidth = 14;
    ctx.beginPath();
    const a0 = -Math.PI / 2 + s * (STAFF_END - 2.6), a1 = -Math.PI / 2 + ang;
    ctx.arc(pv.x, pv.y, STAFF_LEN - 6, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke();
  }
  // 막대
  ctx.save();
  ctx.shadowColor = '#c58bff'; ctx.shadowBlur = 10;
  ctx.strokeStyle = '#6b3b12'; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(pv.x, pv.y); ctx.lineTo(tipX, tipY); ctx.stroke();
  ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(pv.x, pv.y); ctx.lineTo(tipX, tipY); ctx.stroke();
  // 끝에 보라 구슬
  const og = ctx.createRadialGradient(tipX, tipY, 2, tipX, tipY, 22);
  og.addColorStop(0, '#ffffff'); og.addColorStop(0.35, '#c58bff'); og.addColorStop(1, 'rgba(110,30,200,0)');
  ctx.fillStyle = og; ctx.beginPath(); ctx.arc(tipX, tipY, 22, 0, 7); ctx.fill();
  ctx.restore();
}

function drawDomain() {
  const t = cine.t, c = cine.caster, im = imgs['char' + c.char], ch = CHARACTERS[c.char];
  const k = Math.min(1, t / 8) * (t > DEMO_FRAMES - 6 ? (DEMO_FRAMES - t) / 6 : 1);
  const CX = GW / 2, CY = 150;
  // 보라빛 어둠
  const bg = ctx.createRadialGradient(CX, CY, 20, CX, CY, 300);
  bg.addColorStop(0, `rgba(60,10,90,${0.75 * k})`); bg.addColorStop(1, `rgba(8,0,18,${0.88 * k})`);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, GW, GH);
  // 영역 원
  if (t >= 10) drawDomainCircles(CX, CY, t, k);
  // 촛불이 화면을 뒤덮음
  ctx.save(); ctx.globalAlpha = k;
  for (const cd of cine.candles) if (t >= cd.d) drawCandle(cd.x, cd.y, cd.s * Math.min(1, (t - cd.d) / 4), t, cd.f);
  ctx.restore();
  // 글자
  if (t < 30) {
    const sc = Math.min(1, (t + 1) / 6);
    text('영역전개', CX, 70, 40 * sc, '#ffd84d');
  }
  if (t >= 14 && t < 50) {
    text(ch.skillName, CX, 262, 20, '#e7c8ff');
    text('— DEMOCRACY —', CX, 282, 11, '#ffd84d');
  }
  // 분신 9명이 빙글빙글 → 합쳐짐
  if (im && t >= 30 && t < 56) {
    const merge = t < 50 ? 1 : 1 - (t - 50) / 6;
    const rad = 100 * merge;
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + (t - 30) * 0.3;
      const x = CX + Math.cos(a) * rad, y = CY + Math.sin(a) * rad * 0.5;
      const h = 70, w = h * im.width / im.height;
      ctx.globalAlpha = 0.85 * k;
      ctx.drawImage(im, x - w / 2, y - h / 2, w, h);
    }
    ctx.globalAlpha = 1;
  }
  // 합쳐진 큰 모습 + 눈에서 보라 불꽃
  if (im && t >= 54 && t < 72) {
    const grow = Math.min(1, (t - 54) / 4);
    const h = 170 * grow, w = h * im.width / im.height;
    const x0 = CX - w / 2, y0 = CY + 85 - h;
    ctx.save();
    if (Math.floor(t / 2) % 2) ctx.filter = 'brightness(1.3) saturate(1.3)';
    ctx.drawImage(im, x0, y0, w, h);
    ctx.restore();
    if (t >= 58 && ch.eyes) for (const [ex, ey] of ch.eyes) drawEyeFire(x0 + ex * w, y0 + ey * h, t, 9);
  }
  if (t >= 54 && t < 57) { ctx.fillStyle = `rgba(230,200,255,${0.8 - (t - 54) * 0.25})`; ctx.fillRect(0, 0, GW, GH); }
  // 거대 지팡이 등장 → 공을 쳐서 꽂음
  if (t >= 66) drawStaff(c, t);
  if (t >= DEMO_HIT && t < DEMO_HIT + 3) { ctx.fillStyle = `rgba(255,255,255,${0.7 - (t - DEMO_HIT) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  // 이 연출 중엔 공을 맨 위에 다시 그림
  if (t >= DEMO_HIT) drawBall();
}

// ----- 탈모빔 컷인 (빔 쏘기 전 2초) -----
function drawCutIn() {
  const t = cine.intro, c = cine.caster;
  const dir = c.side === 0 ? 1 : -1; // 시전자 쪽에서 들어옴
  // 화면 어둡게
  ctx.fillStyle = `rgba(5,0,20,${Math.min(0.75, t / 6)})`;
  ctx.fillRect(0, 0, GW, GH);
  // 시전자 쪽으로 빛이 모임
  for (let i = 0; i < 10; i++) {
    const a = i * 0.63 + t * 0.2, r = 70 - ((t * 4 + i * 13) % 70);
    ctx.fillStyle = 'rgba(255,250,200,.9)';
    ctx.beginPath(); ctx.arc(c.x + Math.cos(a) * r, c.y - 10 + Math.sin(a) * r, 1.8, 0, 7); ctx.fill();
  }
  // 띠가 옆에서 쓱 들어옴 (8프레임) → 머무름 → 나감 (마지막 6프레임)
  let slide = 0;
  if (t < 8) slide = (1 - t / 8) * GW * 1.2;
  else if (t > INTRO_FRAMES - 6) slide = -((t - (INTRO_FRAMES - 6)) / 6) * GW * 1.2;
  ctx.save();
  ctx.translate(-dir * slide, 0);
  ctx.beginPath();
  ctx.moveTo(-20, 96); ctx.lineTo(GW + 20, 70); ctx.lineTo(GW + 20, 196); ctx.lineTo(-20, 222); ctx.closePath();
  const g = ctx.createLinearGradient(0, 70, 0, 222);
  g.addColorStop(0, '#ff9d00'); g.addColorStop(0.5, '#ffe14d'); g.addColorStop(1, '#ff6a00');
  ctx.fillStyle = g; ctx.fill();
  ctx.save(); ctx.clip();
  // 집중선 (빠르게 지나감)
  ctx.strokeStyle = 'rgba(255,255,255,.75)';
  for (let i = 0; i < 26; i++) {
    const y = 70 + ((i * 37) % 152), len = 40 + ((i * 53) % 80);
    const x = ((i * 97 - t * 38 * dir) % (GW + 200) + GW + 200) % (GW + 200) - 100;
    ctx.lineWidth = 1 + (i % 3);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y - len * 0.07); ctx.stroke();
  }
  // 캐릭터 크게 (천천히 줌인, 번쩍번쩍)
  const im = imgs['char' + c.char];
  if (im) {
    const h = 112 + t * 0.35, w = h * im.width / im.height; // 천천히 줌인
    const px = c.side === 0 ? 20 : GW - 20 - w;
    const top = 240 - h;
    if (Math.floor(t / 2) % 2 === 0) ctx.filter = 'brightness(1.5)';
    ctx.drawImage(im, px, top, w, h);
    ctx.filter = 'none';
    // 이마가 빛남
    if (t > 18) {
      const fx = px + w * 0.55, fy = top + h * 0.2;
      const r = 10 + (t - 18) * 1.4;
      const fg = ctx.createRadialGradient(fx, fy, 1, fx, fy, r);
      fg.addColorStop(0, 'rgba(255,255,255,1)'); fg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, r, 0, 7); ctx.fill();
    }
  }
  ctx.restore();
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-20, 96); ctx.lineTo(GW + 20, 70); ctx.moveTo(-20, 222); ctx.lineTo(GW + 20, 196); ctx.stroke();
  // 글자
  const tx = c.side === 0 ? GW - 120 : 120;
  text(CHARACTERS[c.char].name + '의 필살기', tx, 112, 12, '#fff');
  const word = '탈모빔!!';
  const n = t < 14 ? 0 : Math.min(word.length, Math.floor((t - 14) / 4) + 1);
  if (n > 0) {
    const shake = t > 30 ? (Math.random() - 0.5) * 3 : 0;
    text(word.slice(0, n), tx + shake, 168 + shake, 40, '#ffffff');
  }
  ctx.restore();
  // 마지막 번쩍
  if (t >= INTRO_FRAMES - 4) {
    ctx.fillStyle = `rgba(255,255,255,${(t - (INTRO_FRAMES - 4)) / 4})`;
    ctx.fillRect(0, 0, GW, GH);
  }
}

// ----- 탈모빔 연출 -----
function drawBeam() {
  if (!cine) return;
  if (cine.kind === 'democracy') { drawDomain(); return; }
  if (cine.intro < INTRO_FRAMES) { drawCutIn(); return; }
  const t = cine.t, tx = cine.target.x;
  // 화면 어둡게
  const dim = t < 6 ? t / 6 : t > BEAM_FRAMES - 8 ? (BEAM_FRAMES - t) / 8 : 1;
  ctx.fillStyle = `rgba(10,0,30,${0.45 * dim})`;
  ctx.fillRect(0, 0, GW, GH);
  // 빔: 위에서 내려와서 땅에 꽂힘
  const bottom = t < BEAM_HIT ? 276 * (t / BEAM_HIT) : 276;
  let wid = t < BEAM_HIT ? 26 : 70 + Math.sin(t * 1.7) * 10;
  if (t > BEAM_FRAMES - 10) wid *= (BEAM_FRAMES - t) / 10;
  if (wid > 0) {
    const g = ctx.createLinearGradient(tx - wid, 0, tx + wid, 0);
    g.addColorStop(0, 'rgba(120,200,255,0)');
    g.addColorStop(0.25, 'rgba(120,200,255,.7)');
    g.addColorStop(0.42, 'rgba(230,250,255,.95)');
    g.addColorStop(0.5, '#ffffff');
    g.addColorStop(0.58, 'rgba(230,250,255,.95)');
    g.addColorStop(0.75, 'rgba(120,200,255,.7)');
    g.addColorStop(1, 'rgba(120,200,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(tx - wid, 0, wid * 2, bottom);
    // 지지직 번개
    ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      let x = tx + (Math.random() - 0.5) * wid;
      ctx.moveTo(x, 0);
      for (let y = 0; y < bottom; y += 20) { x += (Math.random() - 0.5) * 14; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  }
  // 땅에 닿은 충격파
  if (t >= BEAM_HIT) {
    const k = t - BEAM_HIT;
    ctx.strokeStyle = `rgba(200,240,255,${Math.max(0, 1 - k / 20)})`; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(tx, 274, 20 + k * 6, 4 + k * 1.2, 0, 0, 7); ctx.stroke();
    if (k < 3) { ctx.fillStyle = `rgba(255,255,255,${0.7 - k * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  }
  // 글자 (덜덜 흔들림)
  const sx = (Math.random() - 0.5) * 4, sy = (Math.random() - 0.5) * 4;
  const sc = Math.min(1, (t + 1) / 6);
  text('탈모빔!!!', GW / 2 + sx, 64 + sy, 42 * sc, '#fff6a0');
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
      players.forEach((p) => { p.picked = false; p.state = NORMAL; p.hm = 1; p.hw = 1; p.skillT = 0; p.shrinkT = 0; });
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
    if (cine && cine.kind === 'democracy') {
      // 영역전개: 모든 게 슬로우 (10프레임에 1번만 움직임)
      cine.t++;
      players.forEach((p) => p.anim++);
      if (cine.t === DEMO_HIT) democracyHit(cine.caster);
      if (cine.t % 10 === 0) step(true);
      if (cine && cine.t >= DEMO_FRAMES) cine = null;
    } else if (cine && cine.intro < INTRO_FRAMES) {
      cine.intro++; // 컷인 애니메이션 중엔 경기 완전히 멈춤
      players.forEach((p) => p.anim++);
    } else if (cine) {
      // 탈모빔: 경기가 슈퍼 슬로모션 (8프레임에 1번만 움직임)
      cine.t++;
      if (cine.t === BEAM_HIT) { cine.target.shrinkT = 999999; /* 라운드 끝날 때까지 */ effects.push({ x: cine.target.x, y: 270, t: 8 }); }
      if (cine.t % 8 === 0) step(true);
      if (cine && cine.t >= BEAM_FRAMES) cine = null;
    } else step(true);
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
  if (p.hm !== 1 || p.hw !== 1) { ctx.translate(0, 32); ctx.scale(p.hw, p.hm); ctx.translate(0, -32); }
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
  const h = ch.h * p.hm, w = ch.w * p.hw;
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
    ctx.scale(Math.cos(p.anim * 2.1) || 0.05, 1); // 회전 속도 1.5배
  }
  ctx.scale(face, 1);
  const glow = p.skillT > 0 && CHARACTERS[p.char].skill === 'hairbeam';
  if (glow) {
    // 번쩍번쩍 빛나기
    const on = Math.floor((cine ? cine.t : p.anim) / 2) % 2 === 0;
    const g = ctx.createRadialGradient(0, 0, 4, 0, 0, 60);
    g.addColorStop(0, on ? 'rgba(255,255,220,.95)' : 'rgba(255,240,150,.6)');
    g.addColorStop(1, 'rgba(255,240,150,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 60, 0, 7); ctx.fill();
    if (on) ctx.filter = 'brightness(1.8)';
  }
  drawFigure(p);
  ctx.filter = 'none';
  ctx.restore();
  if (whirl) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const a = p.anim * 1.35 + i * 2.1, yy = p.y + 18 - i * 18 * p.hm;
      ctx.beginPath(); ctx.ellipse(p.x, yy, (30 - i * 4) * p.hw, 6 * p.hw, 0, a, a + 3.6); ctx.stroke();
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
    text(e.text, Math.max(70, Math.min(GW - 70, e.x)), e.y - (30 - e.t) * 0.6, 18, e.color);
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
    const gc = GRADE_COLOR[c.grade] || '#fff';
    ctx.fillStyle = 'rgba(255,255,255,.15)';
    ctx.beginPath(); ctx.roundRect(x, y, cw, 70, 6); ctx.fill();
    // 고른 카드는 배경을 1P 파랑 / 2P 빨강으로 칠함 (둘 다 고르면 반반)
    const on = players.filter((p) => p.char === i);
    if (on.length) {
      ctx.save();
      ctx.beginPath(); ctx.roundRect(x, y, cw, 70, 6); ctx.clip();
      on.forEach((p) => {
        const half = on.length === 2;
        const blink = p.picked && Math.floor(p.anim / 2) % 2;
        ctx.fillStyle = p.side === 0
          ? (blink ? 'rgba(120,180,255,.85)' : 'rgba(47,124,246,.6)')
          : (blink ? 'rgba(255,140,130,.85)' : 'rgba(242,70,60,.6)');
        ctx.fillRect(half && p.side === 1 ? x + cw / 2 : x, y, half ? cw / 2 : cw, 70);
      });
      ctx.restore();
    }
    ctx.strokeStyle = gc; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(x + 1, y + 1, cw - 2, 68, 5); ctx.stroke();
    const im = imgs['char' + i];
    if (im && c.type === 'sprite') {
      let h = 62, w = h * im.width / im.height;
      if (w > cw - 6) { h *= (cw - 6) / w; w = cw - 6; } // 카드 안에 맞추기
      ctx.drawImage(im, x + cw / 2 - w / 2, y + 62 - h + 4, w, h);
    } else if (im) {
      ctx.save(); ctx.beginPath(); ctx.arc(x + cw / 2, y + 30, 20, 0, 7); ctx.clip();
      ctx.drawImage(im, x + cw / 2 - 20, y + 10, 40, 40); ctx.restore();
    }
    text(c.name, x + cw / 2, y + 66, 8);
    text(c.grade, x + cw / 2, y + 9, 6, gc);
    players.forEach((p) => {
      if (p.char !== i) return;
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
    const fake = { ...p, state: NORMAL, hm: 1, hw: 1, skillT: 0 };
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    drawFigure(fake);
    ctx.restore();
    const tx = cx - 10;
    text(c.name, tx, 148, 15, p.color, 'left');
    text(c.grade, tx, 132, 9, GRADE_COLOR[c.grade], 'left');
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
  drawBeam();
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
