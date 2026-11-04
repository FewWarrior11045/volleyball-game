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
  { name: '장민욱', grade: 'COMMON', type: 'sprite', img: 'assets/minwook.png', w: 58, h: 58, skill: 'meteor',
    skillName: '메테오 서브', desc: ['거대 운석 + 벽 3번 튕겨 꽂기!', '상대 납작·느림, 공 빨라짐'] },
  { name: '키다리', grade: 'EPIC', type: 'sprite', img: 'assets/tall.png', w: 30, h: 70, skill: 'giant',
    skillName: '거인화', desc: ['5초 동안 키가 3배!', '높은 공도 다 막는다'] },
  { name: '김지연', grade: 'RARE', type: 'sprite', img: 'assets/swim.png', w: 40, h: 68, skill: 'whirl',
    skillName: '회전 회오리', desc: ['3초 동안 2배로 커져서 회전!', '닿는 공을 엄청 세게 날림'] },
  { name: '문경목', grade: 'LEGENDARY', type: 'sprite', img: 'assets/hair.png', w: 62, h: 54, skill: 'hairbeam',
    skillName: '탈모빔', desc: ['하늘에서 거대한 빔 발사!', '라운드 끝까지 상대 쪼그라듦'] },
  { name: '김민주', grade: 'LEGENDARY', type: 'sprite', img: 'assets/democracy.png', w: 34, h: 66, skill: 'democracy',
    eyes: [[0.385, 0.249], [0.581, 0.249]], // 사진 속 눈 위치 (가로, 세로 비율)
    skillName: '민주주의 제1장', desc: ['영역전개! 9명으로 분신했다가', '거대 지팡이로 공을 꽂아 넣음'] },
  { name: '파티왕', grade: 'EPIC', type: 'face', img: 'assets/wonder.png', skill: 'party',
    skillName: '미러볼 파티', desc: ['미러볼 + 팬 10명 등장!', '6초 동안 팬들이 공을 대신 침'] },
  { name: '역사왕', grade: 'EPIC', type: 'face', img: 'assets/dongwoo.png', skill: 'history',
    skillName: '위인 강림', desc: ['랜덤 위인 빙의! (3종)', '명량해전·신의 한 서브·해례본'] },
];
// 등급 색깔
const GRADE_COLOR = { COMMON: '#3ccf5a', RARE: '#3d8bff', EPIC: '#a64dff', MYTHIC: '#ff3b3b', LEGENDARY: '#ffd23f' };

// 스킬 시간 (25프레임 = 1초)
const SKILL_FRAMES = { giant: 125, whirl: 75, hairbeam: 125, democracy: 8, meteor: 8, party: 150, history: 8 };
const PARTY_INTRO = 62; // 파티 시작 연출 (2.5초, 경기 멈춤)
// 위인 강림 (랜덤 3종)
const HIST_REVEAL = 30, HIST_FIRE = 74, HIST_END = 80;
const HEROES = [
  { key: 'ship', title: '충무공의 궤적: 명량해전', who: '이순신 장군', color: '#ff4a3a',
    line: '죽고자 하는 자는 살고, 살고자 하는 자는 죽는다! 울돌목의 파도를 받아라!' },
  { key: 'arrow', title: '태조의 정벌: 신의 한 서브', who: '이성계', color: '#ff7a2a',
    line: '백발백중의 활시위다. 내 궁시(弓矢)는 한 치의 오차도 없다!' },
  { key: 'hangul', title: '훈민의 통찰: 해례본', who: '세종대왕', color: '#ffd84d',
    line: '너희의 동선은 이미 훈민정음처럼 명백하게 풀어냈다.' },
];
const JAMO = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ';
const glyphs = []; // 코트 바닥에 흩뿌려진 한글
let party = null;       // { side, girls, cd } 파티 중인 쪽
const DEMO_FRAMES = 80;    // 민주주의 영역전개 연출 길이 (3.2초, 모든 게 슬로우)
const DEMO_HIT = 74;       // 지팡이가 공을 치는 순간
const DICTATOR_CHANCE = 0.15; // 민주주의를 '독재'로 막을 확률 (15%)
let dictTest = false;        // 테스트: 타이틀에서 0 누르면 독재 100%
const DICT_SLOW = 0.05;
// 메테오 서브
const METEOR_APPEAR = 34, METEOR_IMPACT = 66, METEOR_END = 104; // 약 4초
let ballBoost = 1; // 메테오 맞은 라운드엔 공이 빨라짐
const FLAT_HIT = 0.75; // 납작해진 상대의 가로 판정 (원래의 75%)
const METEOR_LINES = [
  '뭘 봐 ㅆ바라, 뚝배기 깨지기 싫으면 피해라.',
  '뭘 봐 ㅆ바라, 하늘에서 떨어지는 건 못 받아.',
  '뭘 봐 ㅆ바라, 받아봐야 아웃이야.',
  '뭘 봐 ㅆ바라, 멸망이다.',
];
const craters = [];   // 운석 구덩이 (라운드 끝나면 사라짐)
const smokes = [];    // 연기
let shake = 0;        // 화면 흔들림      // 독재 슈퍼 슬로우 (공이 원래 속도의 5%로 움직임)
const DICT_RECV = 30;        // 리시브하는 순간
const DICT_END = 44;         // 독재 연출 끝
const SHRINK = 0.4;        // 탈모빔 맞은 상대 크기
const BEAM_FRAMES = 45;    // 탈모빔 연출 길이 (슈퍼 슬로모션)
const BEAM_HIT = 14;       // 빔이 땅에 닿는 순간
const INTRO_FRAMES = 50;   // 빔 쏘기 전 컷인 애니메이션 (2초, 경기 멈춤)
// 스킬 중 크기 배율 [가로, 세로] (히트박스도 같이 커짐)
const SKILL_SIZE = { giant: [1, 3], whirl: [2, 2] };

// ===== 게임 속도 (원작과 같은 3단계) =====
const SPEEDS = [{ name: '느림', fps: 20 }, { name: '보통', fps: 25 }, { name: '빠름', fps: 30 }];
let speedIdx = 1;
try { const v = localStorage.getItem('volley_speed'); if (v !== null && SPEEDS[Number(v)]) speedIdx = Number(v); } catch (e) {}
CONFIG.FPS = SPEEDS[speedIdx].fps;

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
    mana: 0, skillT: 0, skillMax: 1, hm: 1, hw: 1, shrinkT: 0,
    frozen: false, forceBump: false, redT: 0, // 독재: 멈춰서 받기만
    flat: false, // 메테오 맞으면 납작 + 느려짐          // 마나, 스킬 남은 시간, 키 배율
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
    // 원작처럼 둘 다 누르면 왼쪽·위가 우선
    x: down.has(k.l) ? -1 : down.has(k.r) ? 1 : 0,
    y: down.has(k.u) ? -1 : down.has(k.d) ? 1 : 0, // 위 -1, 아래 +1
    power: pressed.has(k.a),
    skill: pressed.has(k.s),
  };
}

function resetRound(server) {
  players[0].x = 36; players[1].x = 396;
  for (const p of players) {
    Object.assign(p, { y: P_GROUND_Y, vy: 0, state: NORMAL, powerT: 0, lyingT: 0, collided: false });
    // 탈모빔은 라운드 끝나면 사라짐 (시간 상관없이)
    p.shrinkT = 0; p.frozen = false; p.forceBump = false; p.redT = 0; p.flat = false;
    if (CHARACTERS[p.char].skill === 'hairbeam') p.skillT = 0;
    if (CHARACTERS[p.char].skill === 'democracy') p.skillT = 0; // 민주주의도 라운드 끝나면 해제
  }
  cine = null; // 남아 있는 연출(영역전개·빔)도 정리
  if (party) party.girls.forEach((g) => (g.jumpT = 0));
  Object.assign(ball, { x: server === 0 ? LEFT_SERVE_X : RIGHT_SERVE_X, y: 0, vx: 0, vy: 1, power: false, unblockable: false, trail: [] });
  effects.length = 0;
  craters.length = 0; smokes.length = 0; shake = 0; ball.meteor = false; ballBoost = 1; glyphs.length = 0; ball.hero = null; ball.path = null; ball.pathFrom = null;
  state = 'ready';
  timer = 0; // "Ready?" 30프레임(1.2초) 깜빡이며 화면 밝아짐
}

function newGame() {
  for (const p of players) Object.assign(p, { score: 0, mana: 0, skillT: 0, hm: 1, hw: 1, shrinkT: 0 });
  party = null;
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
  if (inp.skill && ch.skill && !cine && p.mana >= CONFIG.MANA_MAX && p.skillT === 0 && p.state !== WIN && p.state !== LOSE) {
    p.mana = 0;
    p.skillT = p.skillMax = SKILL_FRAMES[ch.skill];
    if (ch.skill === 'hairbeam') cine = { kind: 'hairbeam', intro: 0, t: 0, caster: p, target: players[1 - p.side] };
    if (ch.skill === 'democracy') {
      const candles = [];
      for (let i = 0; i < 70; i++) candles.push({ x: Math.random() * GW, y: 20 + Math.random() * 270, d: Math.random() * 14, s: 0.6 + Math.random() * 0.8, f: Math.random() * 6 });
      cine = { kind: 'democracy', t: 0, caster: p, target: players[1 - p.side], candles, counter: Math.random() < (dictTest ? 1 : DICTATOR_CHANCE) };
    }
    if (ch.skill === 'history') {
      const hero = HEROES[Math.floor(Math.random() * HEROES.length)];
      cine = { kind: 'history', t: 0, caster: p, target: players[1 - p.side], hero, jamo: [] };
      sfx('whoosh');
    } else if (ch.skill === 'party') {
      const girls = [];
      const hues = [330, 280, 200, 50, 0, 160, 300, 20, 240, 100];
      for (let i = 0; i < 10; i++) {
        const hx = p.side === 0 ? 14 + i * 19 : GW - 14 - i * 19;
        girls.push({ x: hx, home: hx, hue: hues[i], hair: ['#2b1b10', '#f2d06b', '#ff8fc8', '#6b3b12', '#111'][i % 5], ph: Math.random() * 6, jumpT: 0, jx: 0, jy: 0 });
      }
      party = { side: p.side, caster: p, girls, cd: 0 };
      cine = { kind: 'party', t: 0, caster: p };
      sfx('whoosh');
    } else if (ch.skill === 'meteor') {
      const lines = METEOR_LINES;
      const cracks = [];
      for (let n = 0; n < 7; n++) {
        let x = GW / 2, y = GH / 2; const pts = [{ x, y }]; const a = (n / 7) * Math.PI * 2 + Math.random() * 0.5;
        for (let i = 0; i < 9; i++) { x += Math.cos(a + (Math.random() - 0.5)) * 26; y += Math.sin(a + (Math.random() - 0.5)) * 18; pts.push({ x, y }); }
        cracks.push(pts);
      }
      const T = players[1 - p.side];
      cine = { kind: 'meteor', t: 0, caster: p, target: T, cracks, debris: [],
        portalX: T.x + (p.side === 0 ? -40 : 40), line: lines[Math.floor(Math.random() * lines.length)] };
      sfx('whoosh');
    } else popups.push({ text: ch.skillName + '!', x: p.x, y: 120, t: 30, color: p.color });
  }
  if (p.skillT > 0) p.skillT--;
  let [tw, th] = p.skillT > 0 && SKILL_SIZE[ch.skill] ? SKILL_SIZE[ch.skill] : [1, 1];
  if (p.shrinkT > 0) { p.shrinkT--; tw *= SHRINK; th *= SHRINK; }
  if (p.flat) { tw *= 1.5; th *= 0.4; } // 납작
  p.hm += (th - p.hm) * 0.35;
  if (Math.abs(th - p.hm) < 0.01) p.hm = th;
  p.hw += (tw - p.hw) * 0.35;
  if (Math.abs(tw - p.hw) < 0.01) p.hw = tw;
  if (p.redT > 0) p.redT--;
  if (p.frozen) return; // 독재: 공을 받을 때까지 그 자리에 멈춤

  if (p.state === WIN || p.state === LOSE) return;
  if (p.state === LYING) { if (--p.lyingT <= 0) p.state = NORMAL; return; }

  // 좌우 이동
  const slow = p.flat ? 0.5 : 1; // 납작하면 이속 절반
  if (p.state === DIVE) p.x += p.diveDir * 8 * slow;
  else p.x += inp.x * 6 * slow;
  const [mn, mx] = p.side === 0 ? [32, 184] : [248, 400];
  p.x = Math.max(mn, Math.min(mx, p.x));

  // 점프 (원작: y가 정확히 땅(244)이고 다이빙·누움 상태가 아닐 때)
  if (p.state < DIVE && inp.y === -1 && p.y === P_GROUND_Y) { p.state = JUMP; p.vy = -16; }

  // 중력 (원작 순서: 위치 먼저 → 공중이면 속도 +1 → 땅보다 아래로 가면 착지)
  p.y += p.vy;
  if (p.y < P_GROUND_Y) p.vy += 1;
  else if (p.y > P_GROUND_Y) {
    p.y = P_GROUND_Y; p.vy = 0;
    if (p.state === DIVE) { p.state = LYING; p.lyingT = 5; }
    else p.state = NORMAL;
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
  if (ball.path) return followPath();
  const m = ballBoost; // 메테오 맞은 라운드엔 시간이 빨리 흐르는 것처럼 (같은 궤적, 더 빠름)
  ball.rot += ball.vx * 0.06 * m;
  const fx = ball.x + ball.vx * m;
  if (fx < BALL_R || fx > GW) ball.vx = -ball.vx;
  if (ball.y + ball.vy * m < 0) ball.vy = 1;
  if (Math.abs(ball.x - NET_X) < NET_HW && ball.y > NET_TOP) {
    if (ball.y <= NET_PILLAR_TOP) { if (ball.vy > 0) ball.vy = -ball.vy; }
    else ball.vx = ball.x < NET_X ? -Math.abs(ball.vx) : Math.abs(ball.vx);
  }
  if (ball.y + ball.vy * m > BALL_GROUND_Y) {
    ball.y = BALL_GROUND_Y;
    ball.vy = -ball.vy;
    ball.power = false;
    ball.unblockable = false;
    players.forEach((pl) => { pl.frozen = false; pl.forceBump = false; });
    effects.push({ x: ball.x, y: BALL_GROUND_Y + 20, t: 8 });
    if (ball.meteor) meteorImpact(ball.x);
    if (ball.hero === 'ship') { shake = 10; sfx('explode'); for (let i = 0; i < 3; i++) effects.push({ x: ball.x, y: 270, t: 8 - i }); }
    ball.hero = null;
    return true;
  }
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > (ball.meteor ? 12 : 2)) ball.trail.shift();
  ball.x += ball.vx * m;
  ball.y += ball.vy * m;
  ball.vy += 1 * m;
  return false;
}

// 정해진 길(벽 3번)을 따라 빠르게 움직이는 공
const PATH_SEG = 4; // 한 구간에 걸리는 프레임
function followPath() {
  const from = ball.pathFrom || (ball.pathFrom = { x: ball.x, y: ball.y });
  const to = ball.path[0];
  ball.pathT++;
  const k = ball.pathT / PATH_SEG;
  const px = ball.x, py = ball.y;
  ball.x = from.x + (to.x - from.x) * k;
  ball.y = from.y + (to.y - from.y) * k;
  ball.vx = ball.x - px; ball.vy = ball.y - py; // 회전·꼬리용
  ball.rot += ball.vx * 0.06;
  for (let i = 0; i < 4; i++) ball.trail.push({ x: px + (ball.x - px) * i / 4, y: py + (ball.y - py) * i / 4 });
  while (ball.trail.length > 24) ball.trail.shift();
  if (ball.pathT >= PATH_SEG) {
    ball.path.shift(); ball.pathT = 0; ball.pathFrom = { x: to.x, y: to.y };
    if (ball.path.length) {
      // 벽에 쾅!
      shake = Math.max(shake, 6);
      effects.push({ x: to.x, y: to.y, t: 8 });
      sfx('thud');
    } else {
      // 바닥에 꽂힘 → 점수
      ball.path = null; ball.pathFrom = null;
      ball.y = BALL_GROUND_Y; ball.vx = 0; ball.vy = -10;
      ball.power = false; ball.unblockable = false;
      effects.push({ x: ball.x, y: BALL_GROUND_Y + 20, t: 8 });
      if (ball.meteor) meteorImpact(ball.x);
      return true;
    }
  }
  return false;
}

// ----- 선수가 공에 맞았을 때 -----
function hitBall(p, inp) {
  if (ball.meteor) { ball.meteor = false; shake = Math.max(shake, 4); sfx('thud'); } // 메테오를 받아냄!
  ball.hero = null;
  // 독재로 막는 중이면 그냥 받기만 (스파이크·스킬 없음)
  const bumpOnly = p.forceBump;
  if (bumpOnly) { p.forceBump = false; p.frozen = false; p.redT = 20; effects.push({ x: ball.x, y: ball.y, t: 8 }); }
  // 회전 회오리 중: 닿는 공을 상대 쪽으로 세게 날림
  if (!bumpOnly && p.skillT > 0 && CHARACTERS[p.char].skill === 'whirl') {
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

  if (!bumpOnly && p.state === POWER) {
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
    // 메테오 맞아 납작해지면 판정이 보이는 것보다 작아짐 (받기 어려움)
    // 납작: 가로 판정은 원래의 75%, 세로는 몸 위쪽 40까지만 (원래 64)
    const hx = p.flat ? P_HALF * FLAT_HIT : P_HALF * p.hw;
    const top = p.flat ? p.y + P_HALF - 40 : hitTop(p);
    const touching = Math.abs(ball.x - p.x) <= hx && ball.y >= top && ball.y <= p.y + P_HALF;
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
  partyAuto();
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
  ball.power = true;
  const tx = s > 0 ? 290 + Math.random() * 100 : 42 + Math.random() * 100;
  ball.vx = (tx - ball.x) / 5;
  ball.vy = (BALL_GROUND_Y - ball.y) / 5 - 2;
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

// ----- 위인 강림 (이동우) -----
function updateHistory() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, h = c.hero.key;
  c.t++;
  players.forEach((p) => p.anim++);
  if (c.t === HIST_REVEAL) { sfx(h === 'arrow' ? 'twang' : h === 'hangul' ? 'chime' : 'boom'); shake = 5; }
  if (h === 'hangul' && c.t > HIST_REVEAL && c.t % 2 === 0 && c.jamo.length < 40) {
    c.jamo.push({ ch: JAMO[Math.floor(Math.random() * JAMO.length)], x: P.x, y: P.y - 20,
      tx: 20 + Math.random() * (GW - 40), ty: 262 + Math.random() * 30, k: 0 });
  }
  for (const j of c.jamo) j.k = Math.min(1, j.k + 0.06);
  if (c.t === HIST_FIRE) {
    ball.trail = []; ball.unblockable = false; ball.meteor = false; ball.hero = h;
    if (h === 'ship') {
      // 명량해전: 거센 물살과 함께 강하게 내리꽂는 강타
      const tx = s > 0 ? 300 + Math.random() * 80 : 52 + Math.random() * 80;
      ball.x = P.x + s * 20; ball.y = 90;
      ball.vx = Math.round((tx - ball.x) / 5); ball.vy = Math.round((BALL_GROUND_Y - ball.y) / 5 - 2.5);
      ball.power = true; shake = 10; sfx('explode');
    } else if (h === 'arrow') {
      // 신의 한 서브: 화살처럼 일직선으로 빈 구석에 꽂힘 (백발백중, 못 막음)
      const tx = s > 0 ? GW - 22 : 22; // 엔드라인 구석
      ball.x = P.x + s * 16; ball.y = 60;
      ball.vx = (tx - ball.x) / 4; ball.vy = (BALL_GROUND_Y - ball.y) / 4 - 1.5;
      ball.power = true; ball.unblockable = true; sfx('twang');
    } else {
      // 해례본: 상대가 얼어붙은 사이 빈 곳으로 스르륵 떨어지는 페인트
      // 상대가 네트에서 멀면 네트 바로 너머로, 가까우면 뒤쪽 구석으로
      const tx = Math.abs(T.x - NET_X) > 80 ? NET_X + s * 48 : (s > 0 ? GW - 26 : 26);
      ball.x = NET_X - s * 28; ball.y = 130;
      const vy = -8, Tf = (0.5 - vy) + Math.sqrt((vy - 0.5) * (vy - 0.5) + 2 * (BALL_GROUND_Y - ball.y));
      ball.vy = vy; ball.vx = (tx - ball.x) / Tf;
      ball.power = false;
      T.frozen = true; T.redT = 0;
      popups.push({ text: '?!', x: T.x, y: T.y - 40, t: 40, color: '#ffd84d' });
      for (const j of c.jamo) glyphs.push({ ch: j.ch, x: j.tx, y: j.ty, t: 120 });
    }
    P.collided = true;
    effects.push({ x: ball.x, y: ball.y, t: 8 });
  }
  if (c.t >= HIST_END) cine = null;
}

function drawWaves(t, k) {
  for (let L = 0; L < 3; L++) {
    const base = 300 - Math.min(1, k) * (60 + L * 26);
    ctx.fillStyle = ['rgba(40,90,160,.75)', 'rgba(70,140,210,.6)', 'rgba(200,235,255,.5)'][L];
    ctx.beginPath(); ctx.moveTo(0, GH);
    for (let x = 0; x <= GW; x += 8) ctx.lineTo(x, base + Math.sin(x / 26 + t * (0.3 + L * 0.1)) * (8 + L * 3));
    ctx.lineTo(GW, GH); ctx.fill();
  }
  // 물보라
  ctx.fillStyle = 'rgba(255,255,255,.8)';
  for (let i = 0; i < 18; i++) {
    const x = (i * 47 + t * 4) % GW, y = 300 - k * 120 + Math.sin(t * 0.4 + i) * 10;
    ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, 7); ctx.fill();
  }
}

function drawGiantSword(x, y, t, k, s) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(-s * 0.25);
  ctx.globalAlpha = 0.85 * k;
  ctx.shadowColor = '#ff2a2a'; ctx.shadowBlur = 18;
  const L = 190 * k;
  const g = ctx.createLinearGradient(0, 0, 0, -L);
  g.addColorStop(0, '#ff3a2a'); g.addColorStop(1, '#ffd0c0');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-7, 0); ctx.lineTo(-5, -L + 16); ctx.lineTo(0, -L); ctx.lineTo(5, -L + 16); ctx.lineTo(7, 0); ctx.fill();
  ctx.fillStyle = '#7a1a10'; ctx.fillRect(-20, 0, 40, 6); ctx.fillRect(-4, 6, 8, 26);
  ctx.restore();
}

function drawBow(x, y, t, k, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, 1);
  ctx.globalAlpha = k; ctx.shadowColor = '#ff6a2a'; ctx.shadowBlur = 12;
  ctx.strokeStyle = '#8a3a10'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(-10, 0, 60, -1.1, 1.1); ctx.stroke();
  const pull = Math.min(1, (t - HIST_REVEAL) / 30) * 34;
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
  const ex = -10 + Math.cos(1.1) * 60, ey = Math.sin(1.1) * 60;
  ctx.beginPath(); ctx.moveTo(ex, -ey); ctx.lineTo(-pull, 0); ctx.lineTo(ex, ey); ctx.stroke();
  // 화살
  ctx.strokeStyle = '#ffcf9a'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-pull, 0); ctx.lineTo(80 - pull, 0); ctx.stroke();
  ctx.fillStyle = '#ff3a2a';
  ctx.beginPath(); ctx.moveTo(96 - pull, 0); ctx.lineTo(78 - pull, -9); ctx.lineTo(78 - pull, 9); ctx.fill();
  ctx.restore();
}

function drawHistory() {
  const c = cine, t = c.t, P = c.caster, T = c.target, hero = c.hero, s = P.side === 0 ? 1 : -1;
  const k = t > HIST_END - 6 ? (HIST_END - t) / 6 : Math.min(1, t / 6);
  // 먹빛 배경 + 금색 테두리
  const bg = ctx.createLinearGradient(0, 0, 0, GH);
  bg.addColorStop(0, `rgba(10,14,30,${0.85 * k})`); bg.addColorStop(1, `rgba(30,20,10,${0.85 * k})`);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, GW, GH);
  ctx.strokeStyle = `rgba(212,175,55,${0.8 * k})`; ctx.lineWidth = 3; ctx.strokeRect(8, 8, GW - 16, GH - 16);
  ctx.lineWidth = 1; ctx.strokeRect(13, 13, GW - 26, GH - 26);
  if (t >= HIST_REVEAL) {
    const kk = Math.min(1, (t - HIST_REVEAL) / 14);
    if (hero.key === 'ship') { drawWaves(t, kk); drawGiantSword(P.x - s * 14, P.y + 10, t, kk, s); }
    if (hero.key === 'arrow') drawBow(P.x + s * 10, P.y - 20, t, kk, s);
    if (hero.key === 'hangul') {
      ctx.font = 'bold 14px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center';
      for (const j of c.jamo) {
        const e = 1 - (1 - j.k) * (1 - j.k);
        const x = j.x + (j.tx - j.x) * e, y = j.y + (j.ty - j.y) * e - Math.sin(e * Math.PI) * 60;
        ctx.fillStyle = `rgba(255,216,77,${0.5 + 0.5 * j.k})`;
        ctx.fillText(j.ch, x, y);
      }
    }
  }
  // 시전자 (세종대왕이면 눈빛이 번뜩)
  const glow = ctx.createRadialGradient(P.x, P.y - 16, 3, P.x, P.y - 16, 50);
  glow.addColorStop(0, `rgba(255,230,150,${t >= HIST_REVEAL && Math.floor(t / 2) % 2 ? 0.95 : 0.5})`); glow.addColorStop(1, 'rgba(255,200,80,0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(P.x, P.y - 16, 50, 0, 7); ctx.fill();
  drawPlayer(P);
  if (t >= HIST_REVEAL) drawPlayer(T);
  // 글자
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const intro = '오늘 내게 오신 위인은...!';
  text(intro.slice(0, Math.min(intro.length, Math.floor(t / 1.2) + 1)), GW / 2, 50, 16, '#f5e6c0');
  if (t >= 8 && t < HIST_REVEAL) {
    // 슬롯머신처럼 위인 이름이 빙글빙글
    const sp = Math.max(1, Math.floor((t - 8) / 6));
    const show = HEROES[Math.floor(t / sp) % HEROES.length];
    text(show.who, GW / 2, 100, 28, '#bfa76a');
  }
  if (t >= HIST_REVEAL) {
    const sc = Math.min(1, (t - HIST_REVEAL + 1) / 5);
    text(hero.who, GW / 2, 92, 30 * Math.max(sc, 0.3), hero.color);
    text(hero.title, GW / 2, 118, 15, '#ffffff');
    if (t < HIST_REVEAL + 3) { ctx.fillStyle = `rgba(255,240,200,${0.7 - (t - HIST_REVEAL) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
    // 대사 말풍선 (두 줄까지)
    const n = Math.min(hero.line.length, Math.floor((t - HIST_REVEAL - 2) / 0.7));
    if (n > 0) {
      ctx.font = 'bold 10px "Malgun Gothic", sans-serif';
      const str = hero.line.slice(0, n);
      const half = hero.line.length > 28 ? hero.line.lastIndexOf(' ', 28) : -1;
      const l1 = half > 0 ? str.slice(0, half) : str, l2 = half > 0 && n > half ? str.slice(half + 1) : '';
      const w = Math.min(GW - 20, ctx.measureText(half > 0 ? hero.line.slice(0, half) : hero.line).width + 16);
      const bx = Math.max(10, Math.min(GW - w - 10, P.x - w / 2)), by = 140;
      ctx.fillStyle = 'rgba(245,235,210,.95)';
      ctx.beginPath(); ctx.roundRect(bx, by, w, half > 0 ? 32 : 20, 5); ctx.fill();
      ctx.fillStyle = '#3a2410'; ctx.textAlign = 'left';
      ctx.fillText(l1, bx + 8, by + 14);
      if (l2) ctx.fillText(l2, bx + 8, by + 27);
    }
  }
  ctx.restore();
  if (t >= HIST_FIRE) drawBall();
}

function drawGlyphs() {
  if (!glyphs.length) return;
  ctx.font = 'bold 13px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center';
  for (const g of glyphs) {
    g.t--;
    ctx.fillStyle = `rgba(255,216,77,${Math.min(0.8, g.t / 60)})`;
    ctx.fillText(g.ch, g.x, g.y);
  }
  while (glyphs.length && glyphs[0].t <= 0) glyphs.shift();
}

// ----- 미러볼 파티 -----
function partyActive() { return party && party.caster.skillT > 0; }

// 팬들이 공을 대신 침: 공이 우리 코트로 내려오면 제일 가까운 팬이 점프해서 상대 쪽으로
function partyAuto() {
  if (!party) return;
  for (const g of party.girls) if (g.jumpT > 0) g.jumpT--;
  if (!partyActive()) { if (party.girls.every((g) => g.jumpT === 0)) party = null; return; }
  if (party.cd > 0) { party.cd--; return; }
  const mine = party.side === 0 ? ball.x < NET_X - 10 : ball.x > NET_X + 10;
  if (!mine || ball.vy <= 0 || ball.y < 165 || ball.unblockable) return;
  let best = party.girls[0];
  for (const g of party.girls) if (Math.abs(g.home - ball.x) < Math.abs(best.home - ball.x)) best = g;
  best.jumpT = 10; best.jx = ball.x; best.jy = ball.y + 14;
  const toward = party.side === 0 ? 1 : -1;
  if (Math.random() < 0.5) { ball.vx = toward * 16; ball.vy = -9; }   // 높게 넘기기
  else { ball.vx = toward * 20; ball.vy = -6; }                       // 빠르게 넘기기
  ball.power = true; ball.meteor = false;
  players.forEach((p) => (p.collided = true));
  party.cd = 8;
  effects.push({ x: ball.x, y: ball.y, t: 8 });
  for (let i = 0; i < 4; i++) popups.push({ text: '♥', x: ball.x + (Math.random() - 0.5) * 40, y: ball.y + 10, t: 20, color: '#ff5fa8' });
  sfx('pop');
}

function drawHeart(x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.5, y - s, x, y - s * 0.45);
  ctx.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.4, x, y + s * 0.35);
  ctx.fill();
}

// 팬 한 명 (발 위치 x,y)
function drawFan(g, x, y, t, sc = 1) {
  const bob = Math.sin(t * 0.5 + g.ph) * 2;
  ctx.save(); ctx.translate(x, y + bob); ctx.scale(sc, sc);
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#f2c9a0'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(-3, -10); ctx.lineTo(-4, 0); ctx.moveTo(3, -10); ctx.lineTo(4, 0); ctx.stroke();
  ctx.fillStyle = `hsl(${g.hue},80%,60%)`;
  ctx.beginPath(); ctx.moveTo(-8, -10); ctx.lineTo(8, -10); ctx.lineTo(4, -24); ctx.lineTo(-4, -24); ctx.fill();
  const wave = Math.sin(t * 0.6 + g.ph) * 0.6;
  ctx.strokeStyle = '#f2c9a0'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(-4, -22); ctx.lineTo(-10, -32 + wave * 6); ctx.moveTo(4, -22); ctx.lineTo(10, -32 - wave * 6); ctx.stroke();
  ctx.fillStyle = g.hair;
  ctx.beginPath(); ctx.arc(0, -31, 8, Math.PI, 0); ctx.lineTo(8, -24); ctx.lineTo(-8, -24); ctx.fill();
  ctx.fillStyle = '#f7d6b5';
  ctx.beginPath(); ctx.arc(0, -30, 6, 0, 7); ctx.fill();
  drawHeart(-2.4, -30.5, 2, '#ff2d6f'); drawHeart(2.4, -30.5, 2, '#ff2d6f'); // 눈에 하트
  ctx.strokeStyle = '#c0306a'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(0, -27.5, 1.6, 0.2, Math.PI - 0.2); ctx.stroke();
  ctx.restore();
}

function drawMirrorBall(x, y, r, t) {
  ctx.strokeStyle = '#999'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y - r); ctx.stroke();
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
  ctx.fillStyle = '#8a8fa0'; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  const n = 8;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = Math.sin(i * 1.7 + j * 2.3 + t * 0.4);
    ctx.fillStyle = v > 0.6 ? '#ffffff' : v > 0 ? '#c9cfe0' : '#6d7385';
    const w = (r * 2) / n;
    ctx.fillRect(x - r + i * w + ((t * 0.5) % w), y - r + j * w, w - 0.6, w - 0.6);
  }
  ctx.restore();
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r * 1.6);
  g.addColorStop(0, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, 7); ctx.fill();
}

function drawPartyLights(x, y, t, alpha) {
  const cols = ['255,80,180', '80,220,255', '255,230,80', '170,90,255', '80,255,150'];
  for (let i = 0; i < 5; i++) {
    const a = t * 0.06 + i * 1.256;
    const ex = x + Math.cos(a) * 520, ey = y + Math.abs(Math.sin(a)) * 420 + 60;
    const g = ctx.createLinearGradient(x, y, ex, ey);
    g.addColorStop(0, `rgba(${cols[i]},${0.5 * alpha})`); g.addColorStop(1, `rgba(${cols[i]},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.lineTo(ex - 40, ey); ctx.lineTo(ex + 40, ey); ctx.fill();
  }
  // 반짝이 점
  for (let i = 0; i < 30; i++) {
    const sx = (i * 71 + t * 3) % GW, sy = (i * 43 + Math.sin(t * 0.1 + i) * 30 + 300) % 260;
    ctx.fillStyle = `rgba(255,255,255,${(0.3 + 0.5 * Math.abs(Math.sin(t * 0.3 + i))) * alpha})`;
    ctx.fillRect(sx, sy, 1.6, 1.6);
  }
}

// 파티 중 (연출 끝난 뒤 6초): 경기 화면 위에 그림
function drawPartyField() {
  if (!party || (cine && cine.kind === 'party')) return;
  const t = performance.now() / 40;
  const on = partyActive();
  const a = on ? 1 : 0.4;
  if (on) {
    ctx.fillStyle = 'rgba(30,0,60,.35)'; ctx.fillRect(0, 0, GW, GH);
    drawPartyLights(GW / 2, 26, t, 0.6);
    drawMirrorBall(GW / 2, 26, 10, t);
  }
  ctx.save(); ctx.globalAlpha = a;
  for (const g of party.girls) {
    if (g.jumpT > 0) {
      const k = g.jumpT / 10;
      drawFan(g, g.jx, g.jy + 30 * (1 - k), t);
      drawHeart(g.jx, g.jy - 46 - (10 - g.jumpT) * 2, 5, `rgba(255,60,140,${k})`);
    } else drawFan(g, g.home, 278, t, 0.9);
  }
  ctx.restore();
  if (on) {
    const P = party.caster;
    text('PARTY TIME ♪', GW / 2, 64, 12, '#ff9ad5');
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(GW / 2 - 40, 70, 80, 3);
    ctx.fillStyle = '#ff5fa8'; ctx.fillRect(GW / 2 - 40, 70, 80 * P.skillT / P.skillMax, 3);
  }
}

// 파티 시작 연출 (2.5초)
function drawPartyIntro() {
  const c = cine, t = c.t, P = c.caster;
  const k = Math.min(1, t / 8);
  ctx.fillStyle = `rgba(10,0,25,${0.82 * k})`; ctx.fillRect(0, 0, GW, GH);
  // 미러볼이 내려옴
  const by = Math.min(60, -20 + t * 6);
  if (t > 6) drawPartyLights(GW / 2, by, t * 2, Math.min(1, (t - 6) / 8));
  drawMirrorBall(GW / 2, by, 22, t * 2);
  // 무대 바닥 불빛
  for (let i = 0; i < 12; i++) {
    const on = (Math.floor(t / 3) + i) % 3 === 0;
    ctx.fillStyle = on ? `hsla(${(i * 40 + t * 8) % 360},90%,60%,.55)` : 'rgba(255,255,255,.06)';
    ctx.fillRect(i * 36, 276, 34, 28);
  }
  drawPlayer(P);
  // 팬 10명이 양쪽에서 뛰어 들어옴
  party.girls.forEach((g, i) => {
    const start = 14 + i * 3;
    if (t < start) return;
    const kk = Math.min(1, (t - start) / 10);
    const from = i % 2 ? -30 : GW + 30;
    const x = from + (g.home - from) * (1 - (1 - kk) * (1 - kk));
    const jump = kk < 1 ? Math.abs(Math.sin(kk * Math.PI * 3)) * 12 : Math.abs(Math.sin(t * 0.4 + g.ph)) * 6;
    drawFan(g, x, 274 - jump, t, 1.3);
  });
  // 하트가 둥둥
  for (let i = 0; i < 14; i++) {
    const hy = 280 - ((t * 3 + i * 23) % 260), hx = (i * 61 + Math.sin(t * 0.2 + i) * 14) % GW;
    if (t > 20) drawHeart(hx, hy, 4 + (i % 3), `rgba(255,${60 + i * 10},160,.8)`);
  }
  // 글자
  const sc = Math.min(1, t / 6);
  text('PARTY TIME!!', GW / 2, 118 + Math.sin(t * 0.5) * 3, 34 * sc, '#ff7ac8');
  if (t > 10) text(CHARACTERS[P.char].skillName, GW / 2, 142, 14, '#ffe066');
  if (t > 24) text('♥ 팬들이 6초 동안 공을 대신 쳐 줍니다 ♥', GW / 2, 162, 10, '#ffffff');
  if (t >= PARTY_INTRO - 3) { ctx.fillStyle = `rgba(255,255,255,${(t - (PARTY_INTRO - 3)) / 4})`; ctx.fillRect(0, 0, GW, GH); }
}

// ----- 메테오 서브 (궤도 파괴) -----
function updateMeteor() {
  const c = cine, T = c.target;
  c.t++;
  players.forEach((p) => p.anim++);
  // 운석 충돌!
  if (c.t === METEOR_IMPACT) {
    T.flat = true;                       // 납작 + 느려짐 (라운드 끝까지)
    ballBoost = 1.35;                    // 공 빨라짐 (라운드 끝까지)
    craters.push({ x: T.x, seed: Math.random() * 1000, big: true });
    shake = 16;
    for (let i = 0; i < 22; i++) {
      smokes.push({ x: T.x + (Math.random() - 0.5) * 90, y: 268 - Math.random() * 16,
        vx: (Math.random() - 0.5) * 2.4, vy: -0.3 - Math.random() * 1.2, r: 6 + Math.random() * 9, t: 30 + Math.random() * 30 });
    }
    for (let i = 0; i < 36; i++) {
      const a = -Math.PI * Math.random(), sp = 3 + Math.random() * 7;
      c.debris.push({ x: T.x, y: 262, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, r: 1.5 + Math.random() * 3 });
    }
    sfx('explode'); sfx('boom');
  }
  if (c.t === 4) sfx('rumble');
  for (const d of c.debris) { d.x += d.vx; d.y += d.vy; d.vy += 0.35; }
  // 모든 게 슈퍼 슬로우 (12프레임에 1번만 움직임)
  if (c.t % 12 === 0) { step(true); if (!cine) return; }
  if (c.t >= METEOR_END) {
    // 연출 끝 → 공을 불타는 혜성처럼 상대 코트로 자동 발사 (막을 수는 있음)
    // 벽에 3번 빠르게 튕긴 뒤 상대 코트에 무조건 꽂힘 (못 막음)
    const P = c.caster, s = P.side === 0 ? 1 : -1;
    const far = s > 0 ? GW : BALL_R, near = s > 0 ? BALL_R : GW; // 상대 쪽 벽 / 우리 쪽 벽
    const tx = s > 0 ? 270 + Math.random() * 120 : 42 + Math.random() * 120;
    ball.x = P.x + s * 20; ball.y = 60;
    ball.path = [
      { x: far, y: 95 + Math.random() * 30 },   // 1번째 벽
      { x: near, y: 50 + Math.random() * 30 },  // 2번째 벽
      { x: far, y: 120 + Math.random() * 30 },  // 3번째 벽
      { x: tx, y: BALL_GROUND_Y },               // 상대 코트 바닥
    ];
    ball.pathT = 0;
    ball.vx = 0; ball.vy = 0;
    ball.power = true; ball.meteor = true; ball.unblockable = true; ball.trail = [];
    P.collided = true;
    shake = 8;
    effects.push({ x: ball.x, y: ball.y, t: 8 }, { x: ball.x, y: ball.y, t: 6 });
    sfx('boom');
    cine = null;
  }
}

function meteorImpact(x) {
  ball.meteor = false;
  craters.push({ x, seed: Math.random() * 1000 });
  shake = 12;
  for (let i = 0; i < 18; i++) {
    smokes.push({ x: x + (Math.random() - 0.5) * 30, y: 268 - Math.random() * 10,
      vx: (Math.random() - 0.5) * 2.4, vy: -0.4 - Math.random() * 1.2, r: 6 + Math.random() * 8, t: 40 + Math.random() * 30 });
  }
  sfx('explode');
}

function drawCraters() {
  for (const cr of craters) {
    ctx.save();
    if (cr.big) {
      ctx.translate(cr.x, 274); ctx.scale(2.4, 1.6); ctx.translate(-cr.x, -274);
      // 아직 뜨거운 바닥
      const hg = ctx.createRadialGradient(cr.x, 274, 1, cr.x, 274, 16);
      hg.addColorStop(0, `rgba(255,${90 + Math.sin(performance.now() / 150) * 40},20,.8)`); hg.addColorStop(1, 'rgba(255,40,0,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.ellipse(cr.x, 275, 16, 3.5, 0, 0, 7); ctx.fill();
    }
    ctx.fillStyle = 'rgba(60,35,20,.75)';
    ctx.beginPath(); ctx.ellipse(cr.x, 274, 30, 6, 0, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(30,15,8,.8)';
    ctx.beginPath(); ctx.ellipse(cr.x, 275, 18, 3.5, 0, 0, 7); ctx.fill();
    // 금 간 자국
    ctx.strokeStyle = 'rgba(40,20,10,.8)'; ctx.lineWidth = 1.2;
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2 + cr.seed;
      let x = cr.x, y = 274;
      ctx.beginPath(); ctx.moveTo(x, y);
      for (let j = 0; j < 3; j++) { x += Math.cos(a + Math.sin(cr.seed + i * j)) * 9; y += Math.sin(a) * 2.2; ctx.lineTo(x, y); }
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawSmokes() {
  for (const sm of smokes) {
    ctx.fillStyle = `rgba(90,85,80,${Math.min(0.35, sm.t / 90)})`;
    ctx.beginPath(); ctx.arc(sm.x, sm.y, sm.r, 0, 7); ctx.fill();
  }
}

function meteorPos(c) {
  // 포털(하늘)에서 상대 머리 위로: 처음엔 천천히, 마지막엔 확 빨라짐
  const T = c.target, k = Math.max(0, Math.min(1, (c.t - METEOR_APPEAR) / (METEOR_IMPACT - METEOR_APPEAR)));
  const e = k * k * k;
  return { x: c.portalX + (T.x - c.portalX) * e, y: 18 + (240 - 18) * e, k };
}

function drawMeteorRock(x, y, r, t) {
  // 불꽃 꼬리 (위쪽으로)
  for (let i = 0; i < 9; i++) {
    const w = r * (0.9 - i * 0.07), ox = Math.sin(t * 0.7 + i) * r * 0.25;
    const g = ctx.createLinearGradient(x, y, x + ox, y - r * (2.6 + i * 0.25));
    g.addColorStop(0, 'rgba(255,220,140,.85)'); g.addColorStop(0.35, 'rgba(255,80,20,.7)'); g.addColorStop(1, 'rgba(120,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - w, y);
    ctx.quadraticCurveTo(x + ox - w * 0.6, y - r * 1.6, x + ox, y - r * (2.6 + i * 0.25));
    ctx.quadraticCurveTo(x + ox + w * 0.6, y - r * 1.6, x + w, y);
    ctx.fill();
  }
  // 바깥 불빛
  const cg = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.7);
  cg.addColorStop(0, 'rgba(255,90,20,.9)'); cg.addColorStop(1, 'rgba(255,0,0,0)');
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, r * 1.7, 0, 7); ctx.fill();
  // 돌덩이
  const rg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
  rg.addColorStop(0, '#5a2a1a'); rg.addColorStop(1, '#1a0805');
  ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  // 빛나는 균열
  ctx.strokeStyle = 'rgba(255,140,40,.95)'; ctx.lineWidth = 2; ctx.shadowColor = '#ff4a00'; ctx.shadowBlur = 8;
  for (let i = 0; i < 6; i++) {
    const a = i * 1.05 + 0.3;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 0.15, y + Math.sin(a) * r * 0.15);
    ctx.lineTo(x + Math.cos(a + 0.3) * r * 0.55, y + Math.sin(a + 0.3) * r * 0.55);
    ctx.lineTo(x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92); ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

function drawRedPortal(x, y, t, k) {
  ctx.save();
  ctx.translate(x, y); ctx.scale(1, 0.38);
  const grow = Math.min(1, (t - 10) / 16) * k;
  const rings = [
    { r: 110, c: '#ff2a2a', w: 4, sp: 0.05, d: [18, 8] },
    { r: 88, c: '#ff8a3a', w: 2, sp: -0.08, d: [5, 6] },
    { r: 66, c: '#ff2a2a', w: 5, sp: 0.11, d: [30, 10] },
    { r: 42, c: '#ffd0a0', w: 2, sp: -0.15, d: [] },
  ];
  for (const rg of rings) {
    ctx.save(); ctx.rotate(t * rg.sp);
    ctx.strokeStyle = rg.c; ctx.lineWidth = rg.w; ctx.setLineDash(rg.d);
    ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(0, 0, rg.r * grow, 0, 7); ctx.stroke();
    ctx.restore();
  }
  ctx.setLineDash([]);
  // 포털 안쪽 (검붉은 구멍)
  const hg = ctx.createRadialGradient(0, 0, 2, 0, 0, 60 * grow);
  hg.addColorStop(0, 'rgba(0,0,0,.95)'); hg.addColorStop(0.7, 'rgba(120,0,0,.8)'); hg.addColorStop(1, 'rgba(255,40,0,0)');
  ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(0, 0, 60 * grow, 0, 7); ctx.fill();
  ctx.restore();
  // 빨간 번개
  if (grow > 0.5 && Math.random() < 0.6) {
    ctx.strokeStyle = 'rgba(255,90,90,.9)'; ctx.lineWidth = 1.6;
    for (let n = 0; n < 2; n++) {
      let lx = x + (Math.random() - 0.5) * 160, ly = y;
      ctx.beginPath(); ctx.moveTo(lx, ly);
      for (let i = 0; i < 6; i++) { lx += (Math.random() - 0.5) * 30; ly += 10 + Math.random() * 18; ctx.lineTo(lx, ly); }
      ctx.stroke();
    }
  }
}

function drawMeteor() {
  const c = cine, t = c.t, P = c.caster, T = c.target;
  const k = t > METEOR_END - 12 ? (METEOR_END - t) / 12 : Math.min(1, t / 5);
  // 1. 붉은 어둠
  const bg = ctx.createRadialGradient(GW / 2, GH / 2, 30, GW / 2, GH / 2, 320);
  bg.addColorStop(0, `rgba(70,0,0,${0.7 * k})`); bg.addColorStop(1, `rgba(5,0,0,${0.92 * k})`);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, GW, GH);
  if (t < 3) { ctx.fillStyle = `rgba(255,40,40,${0.7 - t * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
  // 화면 금 (처음 0.5초 동안 퍼짐)
  ctx.save(); ctx.globalAlpha = 0.8 * k;
  ctx.strokeStyle = '#ff3b3b'; ctx.lineWidth = 1.5; ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 6;
  for (const cr of c.cracks) {
    const n = Math.min(cr.length, Math.floor(t / 1.2) + 1);
    ctx.beginPath(); ctx.moveTo(cr[0].x, cr[0].y);
    for (let i = 1; i < n; i++) ctx.lineTo(cr[i].x, cr[i].y);
    ctx.stroke();
  }
  ctx.restore();
  // 불씨
  for (let i = 0; i < 26; i++) {
    const ex = (i * 53 + t * (1 + (i % 3))) % GW, ey = GH - ((i * 37 + t * (2 + (i % 4))) % GH);
    ctx.fillStyle = i % 2 ? 'rgba(255,120,40,.8)' : 'rgba(255,60,40,.7)';
    ctx.beginPath(); ctx.arc(ex, ey, 1.2 + (i % 3) * 0.6, 0, 7); ctx.fill();
  }
  // 2. 하늘이 찢어지며 포털
  if (t >= 10) drawRedPortal(c.portalX, 34, t, k);
  // 시전자: 빨갛게 빛남
  ctx.save();
  const on = Math.floor(t / 2) % 2 === 0;
  const ag = ctx.createRadialGradient(P.x, P.y, 4, P.x, P.y, 70);
  ag.addColorStop(0, on ? 'rgba(255,60,30,.9)' : 'rgba(255,0,0,.5)'); ag.addColorStop(1, 'rgba(255,0,0,0)');
  ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(P.x, P.y, 70, 0, 7); ctx.fill();
  ctx.restore();
  drawPlayer(P);
  drawPlayer(T);
  // 3. 거대 운석 낙하
  if (t >= METEOR_APPEAR && t < METEOR_IMPACT) {
    const m = meteorPos(c);
    const r = 34 + 30 * Math.min(1, (t - METEOR_APPEAR) / 10);
    // 땅에 드리운 그림자
    ctx.fillStyle = `rgba(0,0,0,${0.25 + m.k * 0.4})`;
    ctx.beginPath(); ctx.ellipse(T.x, 274, 20 + m.k * 50, 4 + m.k * 6, 0, 0, 7); ctx.fill();
    drawMeteorRock(m.x, m.y, r, t);
    if (t > METEOR_IMPACT - 10) shake = Math.max(shake, 4);
  }
  // 4. 충돌
  if (t >= METEOR_IMPACT) {
    const q = t - METEOR_IMPACT;
    if (q < 4) { ctx.fillStyle = q < 2 ? `rgba(255,255,240,${0.9 - q * 0.3})` : `rgba(255,60,30,${0.6 - (q - 2) * 0.25})`; ctx.fillRect(0, 0, GW, GH); }
    for (let i = 0; i < 3; i++) {
      const rr = (q - i * 4) * 9;
      if (rr <= 0) continue;
      ctx.strokeStyle = `rgba(255,${120 + i * 50},80,${Math.max(0, 1 - rr / 260)})`; ctx.lineWidth = 5 - i;
      ctx.beginPath(); ctx.ellipse(T.x, 270, rr, rr * 0.22, 0, 0, 7); ctx.stroke();
    }
    ctx.fillStyle = '#3a1a0e';
    for (const d of c.debris) { ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill(); }
    // 낙인처럼 찍히는 天空破碎
    const st = Math.max(1, 2.2 - q * 0.25);
    ctx.save(); ctx.globalAlpha = Math.max(0, k);
    text('天空破碎', GW / 2, 120, 50 * st, '#ff2a2a');
    ctx.restore();
  }
  drawSmokes();
  drawBall();
  // 글자
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  if (t >= 4 && t < METEOR_IMPACT) {
    const sc = Math.min(1, (t - 3) / 6);
    text('天空破碎', GW / 2, 116, 44 * sc, '#ff3b3b');
    text('[천공파쇄]', GW / 2, 136, 12, '#ffc0a0');
  }
  if (t >= 20) {
    text('궤도 파괴: 메테오 서브', GW / 2, 262, 20, '#ff6a2a');
    text('Orbital Destroyer: Meteor Serve', GW / 2, 280, 9, '#ffd2b0');
  }
  // 대사 말풍선
  if (t >= 8) {
    const n = Math.min(c.line.length, Math.floor((t - 8) / 0.9));
    ctx.font = 'bold 11px "Malgun Gothic", sans-serif';
    const w = ctx.measureText(c.line).width + 14;
    const bx = Math.max(6, Math.min(GW - w - 6, P.x - w / 2)), by = P.y - 74;
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.beginPath(); ctx.roundRect(bx, by, w, 20, 6); ctx.fill();
    ctx.beginPath(); ctx.moveTo(P.x - 5, by + 20); ctx.lineTo(P.x + 5, by + 20); ctx.lineTo(P.x, by + 27); ctx.fill();
    ctx.fillStyle = '#b00000'; ctx.textAlign = 'left';
    ctx.fillText(c.line.slice(0, n), bx + 7, by + 14);
  }
  ctx.restore();
}

// ----- 효과음 (간단한 소리, 파일 없이 만듦) -----
let audioCtx = null;
function sfx(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx, now = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.connect(g); g.connect(a.destination);
    const set = {
      boom: ['sine', 90, 35, 0.6, 0.5],     // 쿵-
      explode: ['sawtooth', 70, 20, 0.5, 0.8],
      thud: ['square', 160, 60, 0.25, 0.2],
      whoosh: ['triangle', 300, 900, 0.12, 0.5],
      rumble: ['sine', 55, 28, 0.45, 2.4],
      beat: ['sine', 120, 50, 0.3, 0.12],
      pop: ['triangle', 600, 1200, 0.12, 0.12],
      twang: ['triangle', 900, 200, 0.25, 0.35],
      chime: ['sine', 880, 1320, 0.2, 0.5],
    }[type];
    if (!set) return;
    const [wave, f0, f1, vol, dur] = set;
    o.type = wave;
    o.frequency.setValueAtTime(f0, now);
    o.frequency.exponentialRampToValueAtTime(f1, now + dur);
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    o.start(now); o.stop(now + dur);
  } catch (e) {}
}

// ----- 독재 (민주주의 카운터, 20%) -----
// 1~2프레임: 원래 속도 (슬로우 풀린 느낌) → 독재 발동, 슈퍼 슬로우
// → 상대가 공 밑으로 슉 대시 → 리시브 → 원래대로
function updateDictator() {
  const c = cine;
  c.t++;
  players.forEach((p) => p.anim++);
  if (c.t <= 2) {
    step(true);                       // 공이 원래 속도로 떨어지는 중
    if (!cine) return;                // 그 사이에 바닥에 닿았으면 끝
    if (c.t === 2) startDictator(c);
    return;
  }
  const T = c.target;
  // 공은 슈퍼 슬로우로 움직임
  if (c.t <= DICT_RECV || c.t > DICT_RECV) {
    ball.x += ball.vx * DICT_SLOW;
    ball.y += ball.vy * DICT_SLOW;
    ball.vy += DICT_SLOW;
    ball.rot += ball.vx * 0.06 * DICT_SLOW;
  }
  // 슉! 공 밑으로 대시 (6~14프레임)
  if (c.t >= 6 && c.t <= 14) {
    const k = (c.t - 6) / 8, e = 1 - (1 - k) * (1 - k);
    c.trail.push({ x: T.x, y: T.y });
    if (c.trail.length > 6) c.trail.shift();
    T.x = c.from.x + (c.dest.x - c.from.x) * e;
    T.y = c.from.y + (c.dest.y - c.from.y) * e;
  } else if (c.trail.length && c.t % 2 === 0) c.trail.shift();
  // 리시브!
  if (c.t === DICT_RECV) {
    T.x = c.dest.x; T.y = c.dest.y;
    // 길게 받기: 네트 넘어 상대 코트 가운데쯤으로 높이 넘김 (약 40프레임 비행)
    const enemyCenter = (T.side === 0 ? 324 : 108) + (Math.random() - 0.5) * 80;
    ball.vy = -19;
    ball.vx = Math.round((enemyCenter - ball.x) / 40);
    if (Math.abs(ball.vx) < 3) ball.vx = T.side === 0 ? 3 : -3;
    ball.power = false;
    ball.unblockable = false;
    T.collided = true;                // 바로 또 맞지 않게
    T.state = T.y < P_GROUND_Y ? JUMP : NORMAL;
    T.vy = 0;
    T.redT = 25;
    effects.push({ x: ball.x, y: ball.y, t: 8 }, { x: ball.x, y: ball.y, t: 6 });
    popups.push({ text: '리시브!!', x: T.x, y: 150, t: 30, color: '#ff6b6b' });
  }
  if (c.t >= DICT_END) { ball.vy = Math.round(ball.vy); cine = null; } // 원작처럼 정수 속도로
}

function startDictator(c) {
  const T = c.target;
  ball.unblockable = false;
  T.redT = 999;
  T.state = NORMAL; T.vy = 0; T.lyingT = 0;
  // 슈퍼 슬로우로 움직였을 때 리시브 순간 공 위치 미리 계산
  let bx = ball.x, by = ball.y, vx = ball.vx, vy = ball.vy;
  for (let i = 3; i <= DICT_RECV; i++) { bx += vx * DICT_SLOW; by += vy * DICT_SLOW; vy += DICT_SLOW; }
  const [mn, mx] = T.side === 0 ? [32, 184] : [248, 400];
  c.from = { x: T.x, y: T.y };
  c.dest = { x: Math.max(mn, Math.min(mx, bx)), y: Math.min(P_GROUND_Y, by + 40) };
}

function drawDictator() {
  const c = cine, t = c.t, T = c.target;
  if (t < 2) return;
  const k = t > DICT_END - 6 ? (DICT_END - t) / 6 : Math.min(1, (t - 1) / 3);
  // 빨간 화면
  ctx.fillStyle = `rgba(90,0,0,${0.45 * k})`;
  ctx.fillRect(0, 0, GW, GH);
  if (t < 5) { ctx.fillStyle = `rgba(255,30,30,${0.6 - (t - 2) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  // 잔상
  c.trail.forEach((tr, i) => {
    ctx.save();
    ctx.globalAlpha = 0.15 + i * 0.08;
    const ghost = { ...T, x: tr.x, y: tr.y, redT: 1, skillT: 0 };
    drawPlayer(ghost);
    ctx.restore();
  });
  // 대시 선
  if (t >= 6 && t <= 16) {
    ctx.strokeStyle = 'rgba(255,200,200,.8)'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const y = T.y - 30 + i * 14;
      ctx.beginPath(); ctx.moveTo(c.from.x, y); ctx.lineTo(T.x, y); ctx.stroke();
    }
  }
  drawPlayer(T);
  drawBall();
  // 리시브 순간 하얀 번쩍
  if (t >= DICT_RECV && t < DICT_RECV + 3) { ctx.fillStyle = `rgba(255,255,255,${0.7 - (t - DICT_RECV) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
  // 글자
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const sx = (Math.random() - 0.5) * 3;
  text('독재', GW / 2 + sx, 70, 46 * Math.min(1, (t - 1) / 4), '#ff3b3b');
  text('— DICTATORSHIP —', GW / 2, 92, 11, '#ffb3b3');
  // 대사: 한 글자씩
  const line = '"민주주의에 대항한다."';
  const n = Math.max(0, Math.min(line.length, Math.floor((t - 4) / 1.2)));
  if (n > 0) text(line.slice(0, n), GW / 2, 114, 14, '#ffffff');
  ctx.restore();
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
  if (cine.kind === 'dictator') { drawDictator(); return; }
  if (cine.kind === 'meteor') { drawMeteor(); return; }
  if (cine.kind === 'party') { drawPartyIntro(); return; }
  if (cine.kind === 'history') { drawHistory(); return; }
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
  if (restartReq) {
    // 백스페이스 3번 → 맨 처음 타이틀 화면으로
    restartReq = false; fade = 0; cine = null;
    newGame();
    players[0].x = 36; players[1].x = 396;
    players.forEach((p) => { p.state = NORMAL; p.picked = false; });
    state = 'title'; timer = 0;
    pressed.clear(); return;
  }
  if (state === 'title') {
    players.forEach((p) => p.anim++);
    if (pressed.has('Digit0') || pressed.has('Numpad0')) dictTest = !dictTest; // 테스트 모드
    // 속도 바꾸기 (원작: 느림 20 / 보통 25 / 빠름 30)
    const up = pressed.has('KeyR') || pressed.has('ArrowUp'), dn = pressed.has('KeyF') || pressed.has('ArrowDown');
    if (up || dn) {
      speedIdx = (speedIdx + (dn ? 1 : SPEEDS.length - 1)) % SPEEDS.length;
      CONFIG.FPS = SPEEDS[speedIdx].fps;
      try { localStorage.setItem('volley_speed', String(speedIdx)); } catch (e) {}
    }
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
    if (cine && cine.kind === 'history') {
      updateHistory();
    } else if (cine && cine.kind === 'party') {
      cine.t++; players.forEach((p) => p.anim++);
      if (cine.t % 6 === 0) sfx('beat');
      if (cine.t >= PARTY_INTRO) cine = null;
    } else if (cine && cine.kind === 'meteor') {
      updateMeteor();
    } else if (cine && cine.kind === 'dictator') {
      updateDictator();
    } else if (cine && cine.kind === 'democracy') {
      // 영역전개: 모든 게 슬로우 (10프레임에 1번만 움직임)
      cine.t++;
      players.forEach((p) => p.anim++);
      if (cine.t === DEMO_HIT) democracyHit(cine.caster);
      if (cine.t % 10 === 0) step(true);
      if (cine && cine.t >= DEMO_FRAMES) {
        // 슬로우 풀림 → 20% 확률로 독재 발동 준비
        cine = cine.counter ? { kind: 'dictator', t: 0, caster: cine.caster, target: cine.target, trail: [] } : null;
      }
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
  if (shake > 0) shake = Math.max(0, shake - 0.8);
  for (const sm of smokes) { sm.t--; sm.x += sm.vx; sm.y += sm.vy; sm.r += 0.25; }
  while (smokes.length && smokes[0].t <= 0) smokes.shift();
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
  if (p.redT > 0) {
    // 독재: 빨갛게 번쩍
    const on = Math.floor(p.anim / 2) % 2 === 0;
    const rg = ctx.createRadialGradient(0, 0, 4, 0, 0, 64);
    rg.addColorStop(0, on ? 'rgba(255,60,40,.95)' : 'rgba(255,0,0,.55)');
    rg.addColorStop(1, 'rgba(255,0,0,0)');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(0, 0, 64, 0, 7); ctx.fill();
  }
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
  if (ball.hero === 'arrow') {
    // 거대한 화살촉 모양 붉은 오라
    const ang = Math.atan2(ball.vy, ball.vx);
    ctx.save(); ctx.translate(ball.x, ball.y); ctx.rotate(ang);
    ctx.shadowColor = '#ff3a00'; ctx.shadowBlur = 16;
    ctx.fillStyle = 'rgba(255,70,30,.75)';
    ctx.beginPath(); ctx.moveTo(48, 0); ctx.lineTo(4, -30); ctx.lineTo(12, 0); ctx.lineTo(4, 30); ctx.fill();
    ctx.fillStyle = 'rgba(255,140,60,.45)'; ctx.fillRect(-120, -4, 124, 8);
    ctx.restore();
  }
  if (ball.hero === 'ship' && ball.trail.length) {
    ball.trail.forEach((tr, i) => {
      ctx.fillStyle = `rgba(150,210,255,${0.25 + i * 0.2})`;
      ctx.beginPath(); ctx.arc(tr.x, tr.y, BALL_R * (0.8 + i * 0.2), 0, 7); ctx.fill();
    });
  }
  if (ball.meteor) {
    // 붉은 혜성 꼬리
    ball.trail.forEach((t, i) => {
      const k = (i + 1) / ball.trail.length;
      const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, BALL_R * (0.6 + k));
      g.addColorStop(0, `rgba(255,240,180,${0.6 * k})`);
      g.addColorStop(0.4, `rgba(255,90,20,${0.55 * k})`);
      g.addColorStop(1, 'rgba(160,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(t.x, t.y, BALL_R * (0.6 + k), 0, 7); ctx.fill();
    });
    const g = ctx.createRadialGradient(ball.x, ball.y, 10, ball.x, ball.y, 36);
    g.addColorStop(0, 'rgba(255,120,30,.8)'); g.addColorStop(1, 'rgba(255,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ball.x, ball.y, 36, 0, 7); ctx.fill();
  }
  if (ball.power && !ball.meteor) ball.trail.forEach((t, i) => drawBallAt(t.x, t.y, 0.25 + i * 0.2));
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
  const n = CHARACTERS.length, gap = 6, cw = Math.min(54, (GW - 16 - gap * (n - 1)) / n); // 캐릭터 많으면 카드 작게
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
    c.desc.forEach((d, i) => {
      // 칸을 넘으면 글자를 작게
      let fs = 9; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`;
      while (ctx.measureText(d).width > cx + 92 - tx && fs > 6) { fs -= 0.5; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`; }
      text(d, tx, 188 + i * 15, fs, '#fff', 'left');
    });
    const keys = p.side === 0 ? 'D/G 고르기 · Z 선택' : '←/→ 고르기 · Enter 선택';
    text(p.picked ? '준비 완료!' : keys, cx, 284, 10, p.picked ? '#7dff9a' : '#ddd');
  });
}

function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  drawBackground();
  drawCraters();
  drawGlyphs();
  drawNet();
  if (state !== 'select') players.forEach(drawPlayer);
  if (state !== 'select' && state !== 'title') drawPartyField();
  if (state !== 'title' && state !== 'startFadeOut' && state !== 'select') drawBall();
  drawBeam();
  drawEffects();
  drawSmokes();

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
    text(`속도: ◀ ${SPEEDS[speedIdx].name} ▶   (↑↓ 또는 R/F)`, GW / 2, 186, 11, '#bfe6ff');
    text('Z 또는 Enter를 눌러 시작', GW / 2, 206, 15, '#fff3a0');
    if (dictTest) text('🧪 테스트 모드: 독재 100% (0으로 끄기)', GW / 2, 240, 10, '#ff8080');
    text('Backspace 3번 = 언제든 처음 화면으로', GW / 2, 222, 10);
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
