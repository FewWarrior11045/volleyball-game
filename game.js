// ===== 설정 (여기만 바꾸면 돼요) =====
const CONFIG = {
  WIN_SCORE: 15,          // 몇 점 내면 이기는지
  FLIP_P2_IMAGE: true,    // 오른쪽 선수 그림을 좌우 반전할지 (오른쪽을 보는 그림 1장을 둘 다 쓸 때 true)
  IMAGES: {               // 이 파일이 없으면 기본 그림으로 그려져요
    background: 'assets/background.png',
    player1: 'assets/player1.png',
    player2: 'assets/player2.png',
    ball: 'assets/ball.png',
    face1: 'assets/face1.png',   // 왼쪽 선수 얼굴 (동그랗게 자른 사진)
    face2: 'assets/face2.png',   // 오른쪽 선수 얼굴
  },
};

// ===== 기본 값 =====
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
const W = 960, H = 540, GROUND = 480;
const NET_X = 480, NET_TOP = 320, NET_HW = 6;
const G_PLAYER = 0.9, G_BALL = 0.38;
const P_SPEED = 6.5, JUMP_V = -17, P_W = 80, P_H = 110, P_R = 48;
const BALL_R = 26;

// ===== 이미지 불러오기 =====
const imgs = {};
for (const [k, src] of Object.entries(CONFIG.IMAGES)) {
  const im = new Image();
  im.onload = () => (imgs[k] = im);
  im.src = src;
}

// ===== 키 입력 =====
const down = new Set(), pressed = new Set();
const GAME_KEYS = ['KeyD','KeyR','KeyG','KeyF','KeyZ','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter','NumpadEnter','Space','Backspace'];
let bsTimes = [], restartReq = false; // 백스페이스 3번 → 재시작
const norm = (e) => (e.code === 'NumpadEnter' ? 'Enter' : e.code);
addEventListener('keydown', (e) => {
  if (GAME_KEYS.includes(e.code)) e.preventDefault();
  const c = norm(e);
  if (!down.has(c)) pressed.add(c);
  if (c === 'Backspace' && !e.repeat) {
    const now = performance.now();
    bsTimes = bsTimes.filter((t) => now - t < 1000);
    bsTimes.push(now);
    if (bsTimes.length >= 3) { bsTimes = []; restartReq = true; }
  }
  down.add(c);
});
addEventListener('keyup', (e) => down.delete(norm(e)));
addEventListener('blur', () => down.clear());

// ===== 선수 =====
function makePlayer(side) {
  return {
    side, dir: side === 0 ? 1 : -1,
    keys: side === 0
      ? { l: 'KeyD', r: 'KeyG', u: 'KeyR', d: 'KeyF', a: 'KeyZ' }
      : { l: 'ArrowLeft', r: 'ArrowRight', u: 'ArrowUp', d: 'ArrowDown', a: 'Enter' },
    x: 0, y: GROUND, vx: 0, vy: 0,
    attack: 0, dive: 0, diveDir: 0, hitCd: 0, score: 0,
    color: side === 0 ? '#2f7cf6' : '#f2463c',
  };
}
const players = [makePlayer(0), makePlayer(1)];
const ball = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, power: false, trail: [] };
const effects = [];
let state = 'title', timer = 0, lastScorer = 0, winner = -1;

function bounds(p) {
  return p.side === 0
    ? [P_W / 2, NET_X - NET_HW - P_W / 2]
    : [NET_X + NET_HW + P_W / 2, W - P_W / 2];
}

function serve(s) {
  players[0].x = 160; players[1].x = W - 160;
  for (const p of players) Object.assign(p, { y: GROUND, vx: 0, vy: 0, attack: 0, dive: 0, hitCd: 0 });
  Object.assign(ball, { x: s === 0 ? 160 : W - 160, y: 140, vx: 0, vy: 0, power: false, trail: [] });
  state = 'play';
}

function newGame() {
  players[0].score = players[1].score = 0;
  winner = -1;
  serve(0);
}

function updatePlayer(p) {
  const k = p.keys;
  const L = down.has(k.l), R = down.has(k.r), U = down.has(k.u);
  const onGround = p.y >= GROUND;

  if (p.dive > 0) {
    // 다이빙(몸 날리기) 중에는 조작 불가
    p.dive--;
    p.x += p.diveDir * 9 * (0.3 + p.dive / 16);
  } else {
    p.vx = (R - L) * P_SPEED;
    p.x += p.vx;
    if (onGround && U) p.vy = JUMP_V;
    if (pressed.has(k.a)) {
      if (onGround && (L || R)) { p.dive = 16; p.diveDir = R ? 1 : -1; p.vy = -4; }
      else if (!onGround && p.attack === 0) p.attack = 14;
    }
  }
  p.vy += G_PLAYER;
  p.y += p.vy;
  if (p.y >= GROUND) { p.y = GROUND; p.vy = 0; }
  const [mn, mx] = bounds(p);
  p.x = Math.max(mn, Math.min(mx, p.x));
  if (p.attack > 0) p.attack--;
  if (p.hitCd > 0) p.hitCd--;
}

function hitBall(p, nx, ny, cx, cy, rr) {
  const k = p.keys;
  const fwd = down.has(p.dir > 0 ? k.r : k.l);
  const back = down.has(p.dir > 0 ? k.l : k.r);
  const U = down.has(k.u), D = down.has(k.d);

  if (p.attack > 0 && p.y < GROUND) {
    // 스파이크: 누르는 방향에 따라 공 방향·세기가 달라짐
    let vx, vy;
    if (D && fwd)      { vx = 17; vy = 12; }  // 앞+아래: 대각선 강스파이크
    else if (D)        { vx = 9;  vy = 17; }  // 아래: 바로 꽂기
    else if (U && fwd) { vx = 17; vy = -8; }  // 앞+위: 빠르고 높게
    else if (U)        { vx = 7;  vy = -14; } // 위: 높은 로브
    else if (fwd)      { vx = 23; vy = 3; }   // 앞: 일직선 초고속
    else if (back)     { vx = 6;  vy = -5; }  // 뒤: 살짝 넘기기(페인트)
    else               { vx = 15; vy = 7; }   // 방향키 없음: 기본 스파이크
    ball.vx = vx * p.dir;
    ball.vy = vy;
    ball.power = true;
    p.attack = 0;
    effects.push({ x: ball.x, y: ball.y, t: 18 });
  } else {
    // 그냥 몸에 맞으면 튕겨 나감
    const speed = Math.max(14, Math.hypot(ball.vx, ball.vy) * 0.8);
    ball.vx = Math.max(-12, Math.min(12, nx * speed + p.vx * 0.3));
    ball.vy = Math.max(-18, Math.min(-13, ny * speed));
    ball.power = false;
  }
  ball.x = cx + nx * rr;
  ball.y = Math.min(cy + ny * rr, GROUND - BALL_R - 1);
}

function updateBall() {
  const prevY = ball.y;
  ball.vy += G_BALL;
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.rot += ball.vx * 0.03;

  // 벽, 천장
  if (ball.x < BALL_R) { ball.x = BALL_R; ball.vx = Math.abs(ball.vx); }
  if (ball.x > W - BALL_R) { ball.x = W - BALL_R; ball.vx = -Math.abs(ball.vx); }
  if (ball.y < BALL_R) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy); }

  // 네트
  if (Math.abs(ball.x - NET_X) < NET_HW + BALL_R && ball.y + BALL_R > NET_TOP) {
    if (prevY + BALL_R <= NET_TOP + 2 && ball.vy > 0) {
      ball.y = NET_TOP - BALL_R;
      ball.vy = -Math.abs(ball.vy) * 0.7;
    } else {
      ball.x = ball.x < NET_X ? NET_X - NET_HW - BALL_R : NET_X + NET_HW + BALL_R;
      ball.vx = -ball.vx * 0.9;
    }
  }

  // 선수와 충돌
  for (const p of players) {
    if (p.hitCd > 0) continue;
    const cx = p.x, cy = p.dive ? p.y - 30 : p.y - 66;
    const rr = (p.dive ? 56 : P_R + 6) + BALL_R;
    const dx = ball.x - cx, dy = ball.y - cy;
    const d = Math.hypot(dx, dy);
    if (d < rr) {
      const len = d || 1;
      hitBall(p, dx / len, dy / len, cx, cy, rr);
      p.hitCd = 10;
    }
  }

  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 6) ball.trail.shift();

  // 바닥에 떨어짐 → 점수
  if (ball.y >= GROUND - BALL_R) {
    ball.y = GROUND - BALL_R;
    const landedSide = ball.x < NET_X ? 0 : 1;
    lastScorer = 1 - landedSide;
    players[lastScorer].score++;
    effects.push({ x: ball.x, y: ball.y, t: 24, big: true });
    state = 'point';
    timer = 80;
  }
}

function update() {
  if (restartReq) { restartReq = false; effects.length = 0; newGame(); pressed.clear(); return; }
  if (state === 'title' || state === 'over') {
    if (pressed.has('KeyZ') || pressed.has('Enter')) newGame();
  } else if (state === 'play') {
    players.forEach(updatePlayer);
    updateBall();
  } else if (state === 'point') {
    players.forEach(updatePlayer);
    if (--timer <= 0) {
      const s = players[lastScorer].score;
      if (s >= CONFIG.WIN_SCORE) { winner = lastScorer; state = 'over'; }
      else serve(lastScorer);
    }
  }
  for (const e of effects) e.t--;
  while (effects.length && effects[0].t <= 0) effects.shift();
  pressed.clear();
}

// ===== 그리기 =====
function drawBackground() {
  if (imgs.background) { ctx.drawImage(imgs.background, 0, 0, W, H); return; }
  const g = ctx.createLinearGradient(0, 0, 0, GROUND);
  g.addColorStop(0, '#5fb8ff'); g.addColorStop(1, '#cdeaff');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, GROUND);
  ctx.fillStyle = 'rgba(255,255,255,.85)';
  for (const [x, y, s] of [[150, 90, 1], [520, 60, 1.3], [800, 120, .9]]) {
    ctx.beginPath();
    ctx.ellipse(x, y, 60 * s, 22 * s, 0, 0, 7);
    ctx.ellipse(x + 40 * s, y - 12 * s, 40 * s, 20 * s, 0, 0, 7);
    ctx.fill();
  }
  ctx.fillStyle = '#e9c97a'; ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.fillStyle = '#d9b35f'; ctx.fillRect(0, GROUND, W, 6);
}

function drawNet() {
  ctx.fillStyle = '#555';
  ctx.fillRect(NET_X - NET_HW, NET_TOP, NET_HW * 2, GROUND - NET_TOP);
  ctx.fillStyle = '#fff';
  ctx.fillRect(NET_X - NET_HW - 2, NET_TOP - 4, NET_HW * 2 + 4, 10);
}

function shadow(x, w) {
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  ctx.beginPath(); ctx.ellipse(x, GROUND + 6, w, 7, 0, 0, 7); ctx.fill();
}

function drawPerson(p) {
  // 이미지가 없을 때 쓰는 기본 사람 그림 (오른쪽을 바라봄)
  const swing = p.attack > 0;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#333'; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.moveTo(-10, -40); ctx.lineTo(-14, 0); ctx.moveTo(10, -40); ctx.lineTo(14, 0); ctx.stroke();
  ctx.fillStyle = p.color;
  ctx.beginPath(); ctx.roundRect(-22, -85, 44, 50, 12); ctx.fill();
  ctx.strokeStyle = '#f2c9a0'; ctx.lineWidth = 9;
  ctx.beginPath();
  if (swing) { ctx.moveTo(14, -78); ctx.lineTo(34, -112); }
  else { ctx.moveTo(18, -78); ctx.lineTo(28, -50); }
  ctx.moveTo(-18, -78); ctx.lineTo(-28, -52);
  ctx.stroke();
  const faceImg = imgs[p.side === 0 ? 'face1' : 'face2'];
  if (faceImg) {
    // 사진 얼굴을 큰 머리로 (좌우 반전 안 되게 다시 뒤집어서 그림)
    const R = 36;
    ctx.save();
    ctx.translate(0, -112);
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    ctx.drawImage(faceImg, -R, -R, R * 2, R * 2);
    ctx.strokeStyle = p.color; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
    ctx.restore();
    return;
  }
  ctx.fillStyle = '#f2c9a0';
  ctx.beginPath(); ctx.arc(0, -100, 18, 0, 7); ctx.fill();
  ctx.fillStyle = p.color; ctx.fillRect(-18, -110, 36, 6);
  ctx.fillStyle = '#222';
  ctx.beginPath(); ctx.arc(8, -100, 2.5, 0, 7); ctx.fill();
}

function drawPlayer(p) {
  shadow(p.x, p.dive ? 50 : 34);
  ctx.save();
  ctx.translate(p.x, p.y);
  const face = p.side === 0 ? 1 : -1;
  if (p.dive) { ctx.translate(0, -8); ctx.rotate(p.diveDir * Math.PI / 2); }
  else if (p.attack > 0) ctx.rotate(face * 0.18);
  const im = imgs[p.side === 0 ? 'player1' : 'player2'];
  if (im) {
    const h = 130, w = h * im.width / im.height;
    if (p.side === 1 && CONFIG.FLIP_P2_IMAGE) ctx.scale(-1, 1);
    ctx.drawImage(im, -w / 2, -h, w, h);
  } else {
    ctx.scale(face, 1);
    drawPerson(p);
  }
  ctx.restore();
}

function drawBall() {
  shadow(ball.x, 22 * Math.max(.4, ball.y / GROUND));
  if (ball.power) {
    ball.trail.forEach((t, i) => {
      ctx.fillStyle = `rgba(255,120,40,${(i + 1) / 14})`;
      ctx.beginPath(); ctx.arc(t.x, t.y, BALL_R * (0.5 + i / 12), 0, 7); ctx.fill();
    });
  }
  ctx.save();
  ctx.translate(ball.x, ball.y); ctx.rotate(ball.rot);
  if (imgs.ball) ctx.drawImage(imgs.ball, -BALL_R, -BALL_R, BALL_R * 2, BALL_R * 2);
  else {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2b4c9a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 0, BALL_R, 0, 7); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#f2b705';
    ctx.beginPath(); ctx.arc(-BALL_R, 0, BALL_R, -1, 1); ctx.stroke();
    ctx.beginPath(); ctx.arc(BALL_R, 0, BALL_R, 2.1, 4.2); ctx.stroke();
  }
  ctx.restore();
}

function drawEffects() {
  for (const e of effects) {
    const r = (e.big ? 70 : 50) * (1 - e.t / 24) + 10;
    ctx.strokeStyle = `rgba(255,255,255,${e.t / 24})`; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 7); ctx.stroke();
  }
}

function text(str, x, y, size, color = '#fff') {
  ctx.font = `bold ${size}px "Malgun Gothic", sans-serif`;
  ctx.textAlign = 'center';
  ctx.lineWidth = size / 6; ctx.strokeStyle = 'rgba(0,0,0,.6)';
  ctx.strokeText(str, x, y);
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}

function draw() {
  drawBackground();
  drawNet();
  players.forEach(drawPlayer);
  if (state !== 'title') drawBall();
  drawEffects();

  text(players[0].score, 80, 70, 56, '#cfe3ff');
  text(players[1].score, W - 80, 70, 56, '#ffd6d3');

  if (state === 'title') {
    text('배구 대전', W / 2, 170, 72);
    text('왼쪽: D R G F 이동·점프 / Z 공격', W / 2, 240, 24);
    text('오른쪽: 방향키 / Enter 공격', W / 2, 276, 24);
    text('공중에서 공격 + 방향키 = 스파이크 방향 조절', W / 2, 312, 20, '#ffe08a');
    text('땅에서 공격 + 좌우 = 다이빙', W / 2, 340, 20, '#ffe08a');
    text('Z 또는 Enter를 눌러 시작', W / 2, 400, 28, '#fff3a0');
    text('게임 중 Backspace 3번 = 처음부터 다시', W / 2, 440, 18);
  } else if (state === 'point') {
    text(lastScorer === 0 ? '왼쪽 득점!' : '오른쪽 득점!', W / 2, 160, 48);
  } else if (state === 'over') {
    text(winner === 0 ? '왼쪽 승리!' : '오른쪽 승리!', W / 2, 190, 72, '#fff3a0');
    text('Z 또는 Enter로 다시 시작', W / 2, 260, 28);
  }
}

// ===== 게임 루프 (1초에 60번 계산) =====
let last = performance.now(), acc = 0;
const STEP = 1000 / 60;
function loop(now) {
  acc += Math.min(100, now - last);
  last = now;
  while (acc >= STEP) { update(); acc -= STEP; }
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
