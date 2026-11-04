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
// type 'face'  : 동그란 얼굴 사진 + 코드로 그린 몸 (이제 안 씀: 모든 캐릭터는 원본 사진을 잘라서 씀)
// type 'sprite': 몸 전체 사진 (배경 지운 PNG)
// skill: 'giant' = 키 2배 / null = 아직 없음
const CHARACTERS = [
  { name: '무표정맨', grade: 'POOP', type: 'sprite', img: 'assets/face1_body.png', w: 70, h: 54, skill: 'sock',
    skillName: '숙성 양말 서브', desc: ['냄새가 경기장 전체에 진동...', '방독면 심판 레드카드 -1점 (트롤)'] },
  { name: '장민욱', grade: 'MYTHIC', type: 'sprite', img: 'assets/minwook.png', w: 58, h: 58, skill: 'jmw',
    skillName: '분노 폭주', desc: ['랜덤 3초 시네마틱 3종!', '운석·핀볼·욕설 음파 (삐-)'] },
  { name: '키다리', grade: 'EPIC', type: 'sprite', img: 'assets/tall.png', w: 30, h: 70, skill: 'giant', mana: 3,
    skillName: '거인화', desc: ['5초 동안 키가 3배!', '마나 3칸 · 높은 공도 다 막는다'] },
  { name: '김지연', grade: 'RARE', type: 'sprite', img: 'assets/swim.png', w: 40, h: 68, skill: 'whirl', mana: 3,
    skillName: '회전 회오리', desc: ['10초 동안 2배로 커져서 회전!', '마나 3칸 · 닿는 공을 세게 날림'] },
  { name: '문경목', grade: 'MYTHIC', type: 'sprite', img: 'assets/hair.png', w: 62, h: 54, skill: 'gm',
    skillName: '탈모 & 한국사', desc: ['랜덤 3초 시네마틱 3종!', '눈뽕 빔·3등급 드롭·낙엽 페인트'] },
  { name: '김민주', grade: 'LEGENDARY', type: 'sprite', img: 'assets/democracy.png', w: 34, h: 66, skill: 'kim',
    eyes: [[0.385, 0.249], [0.581, 0.249]], // 사진 속 눈 위치 (가로, 세로 비율)
    skillName: '민주주의 5장', desc: ['랜덤 시네마틱 5종!', '의회·자유·삼권분립·문법·링컨'] },
  { name: '원더재원', grade: 'EPIC', type: 'sprite', img: 'assets/wonder_body.png', w: 56, h: 62, skill: 'party',
    skillName: '미러볼 파티', desc: ['9초 팬 10명이 빈 곳으로 꽂음!', '나는 이속 UP · 상대는 감속'] },
  { name: '역사왕', grade: 'LEGENDARY', type: 'sprite', img: 'assets/dongwoo_body.png', w: 62, h: 56, skill: 'history',
    skillName: '위인 강림', desc: ['랜덤 위인 빙의! (5종)', '거북선·편전·뇌전·해례본·결사대'] },
  { name: '박준형', grade: 'LEGENDARY', type: 'sprite', img: 'assets/math.png', w: 36, h: 68, skill: 'math',
    skillName: '수학 강림', desc: ['랜덤 수학 필살기 (5종)', '코트를 복소평면으로 바꿔 폭파'] },
];
// 등급 색깔
const GRADE_COLOR = { POOP: '#9a6233', COMMON: '#3ccf5a', RARE: '#3d8bff', EPIC: '#a64dff', MYTHIC: '#ff3b3b', LEGENDARY: '#ffd23f' };

// 스킬 시간 (25프레임 = 1초)
const SKILL_FRAMES = { giant: 125, whirl: 250, hairbeam: 125, democracy: 8, meteor: 8, party: 225, history: 8, sock: 8, math: 8, kim: 8, gm: 8, jmw: 8 };
const SOCK_REF = 26, SOCK_CARD = 42, SOCK_SPRAY = 54, SOCK_MINUS = 74, SOCK_END = 92; // 숙성 양말 서브: 심판 등장 / 레드카드 / 소독 / -1점 / 끝
const PARTY_INTRO = 62; // 파티 시작 연출 (2.5초, 경기 멈춤)
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
let oTimes = [];                        // 테스트: O 3번 → 양쪽 마나 가득
const norm = (e) => (e.code === 'NumpadEnter' ? 'Enter' : e.code === 'Semicolon' ? 'Numpad5' : e.code);
addEventListener('keydown', (e) => {
  if (GAME_KEYS.includes(e.code)) e.preventDefault();
  const c = norm(e);
  if (!down.has(c)) pressed.add(c);
  down.add(c);
  if (c === 'KeyO' && !e.repeat) {
    const now = performance.now();
    oTimes = oTimes.filter((t) => now - t < 1000);
    oTimes.push(now);
    if (oTimes.length >= 3) {
      oTimes = [];
      players.forEach((p) => (p.mana = manaMax(p)));
      popups.push({ text: '🧪 마나 MAX', x: GW / 2, y: 90, t: 30, color: '#7dff9a' });
    }
  }
  if (c === 'Backspace' && !e.repeat) {
    const now = performance.now();
    bsTimes = bsTimes.filter((t) => now - t < 1000);
    bsTimes.push(now);
    if (bsTimes.length >= 3) { bsTimes = []; restartReq = true; }
  }
});
addEventListener('keyup', (e) => down.delete(norm(e)));
addEventListener('blur', () => down.clear());

// ===== AI (혼자 플레이) =====
function aiInput(p) {
  const lv = p.aiLevel ?? aiLevel, L = AI_LEVELS[lv], s = p.side === 0 ? 1 : -1;
  const ai = p.aiS || (p.aiS = { t: 0, tx: p.x, phase: '', attack: false, hit: null });
  const inp = { x: 0, y: 0, power: false, skill: false };
  if (state !== 'play' || cine) return inp;
  const mySide = (x) => (x < NET_X) === (p.side === 0);
  const m = ballBoost * (ball.miniT > 0 ? 1.25 : 1);
  const sim = (n) => { // 공의 n프레임 뒤 위치들
    const out = []; let x = ball.x, y = ball.y, vx = ball.vx, vy = ball.vy;
    for (let i = 0; i < n; i++) { if (x + vx * m < BALL_R || x + vx * m > GW) vx = -vx; if (y + vy * m < 0) vy = 1; x += vx * m; y += vy * m; vy += m; out.push({ x, y }); if (y > BALL_GROUND_Y) break; }
    return out;
  };
  const serving = Math.abs(ball.vx) < 0.5 && Math.abs(ball.x - (p.side === 0 ? 36 : 396)) < 30 && mySide(ball.x);
  // 공 상황: 넘어오는 센 공(in) / 내가 받아 올린 공(own) / 상대 쪽(away)
  if (!mySide(ball.x) && !(ball.vx * s < 0)) ai.phase = 'away';
  if (p.collided && mySide(ball.x) && ai.phase !== 'own') { ai.phase = 'own'; ai.attack = Math.random() < L.spike; ai.hit = null; }
  else if (ai.phase !== 'own' && ai.phase !== 'in' && (mySide(ball.x) || ball.vx * s < 0)) {
    ai.phase = 'in';
    const fast = Math.abs(ball.vx) >= 9 || ball.vy > 9;
    ai.attack = !fast && Math.random() < L.spike; // 느린 공은 바로 때림, 센 공은 일단 리시브
  }
  // 1) 예측 (난이도만큼 늦게 · 틀리게, 눈부시면 더 엉망)
  if (--ai.t <= 0) {
    ai.t = L.react + (p.blindT > 0 ? 12 : 0);
    const path = sim(140), last = path[path.length - 1] || ball;
    const err = (L.err + (p.blindT > 0 ? 100 : 0)) * (Math.random() - 0.5) * 2;
    ai.land = last.x + err;
    // 점프해서 만날 수 있는 지점 (점프 k프레임 뒤 내 높이 = 244 - 16k + k(k-1)/2)
    ai.hit = null;
    if (ai.attack && p.y === P_GROUND_Y) for (let k = 6; k < Math.min(26, path.length); k++) {
      const py = P_GROUND_Y - 16 * k + (k * (k - 1)) / 2, b = path[k - 1];
      if (mySide(b.x) && Math.abs(b.y - (py - 34)) < 22 && Math.abs(b.x - p.x) <= 6 * k + 12) { ai.hit = { x: b.x + err * 0.3, k }; break; }
    }
  }
  const [mn, mx] = p.side === 0 ? [32, 184] : [248, 400];
  let tx;
  if (serving) tx = ball.x - s * 6;
  else if (!mySide(ai.land ?? ball.x)) tx = (p.side === 0 ? 100 : 332);          // 수비 위치로
  else if (ai.attack && ai.hit) tx = ai.hit.x - s * 10;                               // 스파이크 자리
  else if (ai.phase === 'in') tx = ai.land - s * (Math.abs(ball.vx) >= 9 ? 5 : 8);   // 센 공: 살짝 띄워서 받기 (내 쪽으로 올림)
  else tx = ai.land - s * Math.min(26, 10 + Math.abs(ai.land - NET_X) / 9);          // 그냥 넘기기
  tx = Math.max(mn, Math.min(mx, tx));
  if (Math.abs(tx - p.x) > 3 && Math.random() < L.speed) inp.x = tx < p.x ? -1 : 1;
  // 2) 점프: 서브 / 스파이크 타이밍
  const dx = ball.x - p.x;
  if (p.state === NORMAL && p.y === P_GROUND_Y) {
    if (serving && ball.vy > 0 && ball.y > 40 && ball.y < 150 && Math.abs(dx) < 36) inp.y = -1;
    else if (ai.attack && ai.hit && ai.hit.k <= 17 && Math.abs(ai.hit.x - s * 10 - p.x) < 6 * ai.hit.k + 8) inp.y = -1;
  }
  // 3) 공중에서 때리기
  if ((p.state === JUMP || p.state === POWER) && Math.abs(dx) < 46 && ball.y > p.y - 72 && ball.y < p.y + 14) {
    if (p.state === JUMP) inp.power = true;
    const T = players[1 - p.side];
    inp.x = s;
    if (serving || ai.serve != null) { ai.serve = ai.serve ?? Math.floor(Math.random() * 3); inp.y = ai.serve === 2 ? -1 : 0; return inp; }
    if (lv === 2 || (lv === 1 && Math.random() < 0.5)) {
      // 머릿속으로 6가지 스파이크를 다 쳐 보고, 상대한테서 제일 먼 곳에 떨어지는 걸 고름
      let best = null;
      for (const ix of [s, 0]) for (const iy of [-1, 0, 1]) {
        let x = ball.x, y = ball.y, vx = s * (ix !== 0 ? 20 : 10), vy = Math.abs(ball.vy) * iy * 2, ok = true;
        for (let i = 0; i < 90 && y < BALL_GROUND_Y; i++) { if (x + vx < BALL_R || x + vx > GW) vx = -vx; if (y + vy < 0) vy = 1; if (Math.abs(x - NET_X) < NET_HW + 2 && y > NET_TOP - 2) { ok = false; break; } x += vx; y += vy; vy += 1; }
        if (!ok || mySide(x)) continue;
        const score = Math.abs(x - T.x) + (iy === 1 ? 25 : 0) + (ix !== 0 ? 10 : 0); // 내리꽂기·강타 우대
        if (!best || score > best.score) best = { score, ix, iy };
      }
      if (best) { inp.x = best.ix; inp.y = best.iy; } else inp.y = 0;
    } else {
      const near = Math.abs(p.x - NET_X) < 80;
      inp.y = near ? (Math.random() < 0.6 ? 1 : 0) : (Math.random() < 0.3 ? -1 : 0);
    }
  } else if (p.state === NORMAL) ai.serve = null;
  // 4) 공중에선 공 쪽으로 몸 맞추기
  if (p.state === JUMP && !serving) { const want = ball.x - s * 12; if (Math.abs(want - p.x) > 3) inp.x = want < p.x ? -1 : 1; }
  // 5) 스킬
  if (p.mana >= manaMax(p) && p.skillT === 0) {
    if (lv === 2 ? !mySide(ball.x) && Math.random() < L.skill : Math.random() < L.skill) inp.skill = true;
  }
  return inp;
}

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
    mana: 0, skillT: 0, skillMax: 1, hm: 1, hw: 1, shrinkT: 0, guardT: 0, stunned: false,
    frozen: false, forceBump: false, redT: 0, // 독재: 멈춰서 받기만
    flat: false, // 메테오 맞으면 납작 + 느려짐          // 마나, 스킬 남은 시간, 키 배율
    color: SIDE_COLOR[side],
  };
}
const players = [makePlayer(0), makePlayer(1)];
const ball = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, power: false, trail: [] };
const effects = [], popups = [];
let state = 'title', timer = 0, lastScorer = 0, winner = -1;
const MENU = ['혼자 플레이', '같이 플레이', '조작 방법'];
// 혼자 플레이 (AI전)
const AI_LEVELS = [
  { name: '쉬움', react: 14, err: 44, spike: 0.15, skill: 0.01, speed: 0.7, col: '#7dff9a' },
  { name: '보통', react: 5, err: 12, spike: 0.75, skill: 0.04, speed: 1, col: '#ffd84d' },
  { name: '어려움', react: 2, err: 3, spike: 1, skill: 0.08, speed: 1, col: '#ff6a5a' },
];
let solo = false, aiLevel = 1, humanSide = 0;
const isMenu = () => ['title', 'howto', 'startFadeOut', 'side', 'diff'].includes(state);
let menuIdx = 0;
let fade = 0, slowTick = 0;
let cine = null; // 탈모빔 연출 { t, caster, target } // fade: 0 = 밝음, 1 = 완전 검정

function readInput(p) {
  if (p.ai) return aiInput(p);
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
    p.shrinkT = 0; p.shrinkK = 0; p.confRev = false; p.frozen = false; p.forceBump = false; p.redT = 0; p.flat = false; p.guardT = 0; p.stunned = false; p.blindT = 0; p.confuseT = 0; p.freezeT = 0; p.flatT = 0; p.fastT = 0; p.weakT = 0; p.nojumpT = 0; p.pullT = 0; p.sightT = 0; p.slowT = 0; p.ampT = 0; p.lagT = 0; p.lagQ = []; p.matrixGuard = false; p.courtGuard = false; p.jumpT = 0; p.manaLockT = 0; p.whirlT = 0;
    if (CHARACTERS[p.char].skill === 'hairbeam') p.skillT = 0;
    if (CHARACTERS[p.char].skill === 'democracy') p.skillT = 0; // 민주주의도 라운드 끝나면 해제
  }
  cine = null; // 남아 있는 연출(영역전개·빔)도 정리
  if (party) party.girls.forEach((g) => (g.jumpT = 0));
  Object.assign(ball, { x: server === 0 ? LEFT_SERVE_X : RIGHT_SERVE_X, y: 0, vx: 0, vy: 1, power: false, unblockable: false, trail: [] });
  effects.length = 0;
  craters.length = 0; smokes.length = 0; shake = 0; guardRings.length = 0; ball.meteor = false; ballBoost = 1; glyphs.length = 0; ball.hero = null; ball.flight = null; ball.fx = null; ball.ribbon = []; ball.squashT = 0; ball.wobbleT = 0; ball.waveT = 0; ball.miniT = 0; pinT = 0; fakes.length = 0; matrixHits.length = 0; strikes.length = 0; stamps.length = 0; ball.arrowT = 0;
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
  crowd = null; // 다음에 메뉴로 오면 새 멤버 랜덤
  newGame();
  state = 'startMsg';
  timer = 0;
}

// ----- 선수 움직임 -----
function updatePlayer(p, inp) {
  p.anim++;
  // 스킬 (거인화)
  const ch = CHARACTERS[p.char];
  if (inp.skill && ch.skill && !cine && p.mana >= manaMax(p) && p.skillT === 0 && p.state !== WIN && p.state !== LOSE) {
    p.mana = 0;
    p.skillT = p.skillMax = SKILL_FRAMES[ch.skill];
    if (ch.skill === 'hairbeam') cine = { kind: 'hairbeam', intro: 0, t: 0, caster: p, target: players[1 - p.side] };
    if (ch.skill === 'democracy') {
      const candles = [];
      for (let i = 0; i < 70; i++) candles.push({ x: Math.random() * GW, y: 20 + Math.random() * 270, d: Math.random() * 14, s: 0.6 + Math.random() * 0.8, f: Math.random() * 6 });
      cine = { kind: 'democracy', t: 0, caster: p, target: players[1 - p.side], candles, counter: Math.random() < (dictTest ? 1 : DICTATOR_CHANCE) };
    }
    if (ch.skill === 'jmw') {
      cine = { kind: 'jmw', t: 0, caster: p, target: players[1 - p.side], sk: JM_SKILLS[Math.floor(Math.random() * JM_SKILLS.length)] };
    }
    if (ch.skill === 'gm') {
      cine = { kind: 'gm', t: 0, caster: p, target: players[1 - p.side], sk: GM_SKILLS[Math.floor(Math.random() * GM_SKILLS.length)] };
    }
    if (ch.skill === 'kim') {
      const sk = KIM_SKILLS[Math.floor(Math.random() * KIM_SKILLS.length)];
      cine = { kind: 'kim', t: 0, caster: p, target: players[1 - p.side], sk, counter: sk.key === 'vote' && Math.random() < (dictTest ? 1 : DICTATOR_CHANCE) };
      sfx('whoosh');
    }
    if (ch.skill === 'math') {
      const sk = MATH_SKILLS[Math.floor(Math.random() * MATH_SKILLS.length)];
      const T = players[1 - p.side];
      const [mn, mx] = T.side === 0 ? [40, 180] : [252, 392];
      cine = { kind: 'math', t: 0, caster: p, target: T, sk, tx: Math.max(mn, Math.min(mx, T.x)), sym: [] };
      sfx('whoosh');
    } else if (ch.skill === 'sock') {
      cine = { kind: 'sock', t: 0, caster: p, target: players[1 - p.side], px: p.x, py: p.y, mist: [],
        refX: (c) => { const s2 = c.caster.side === 0 ? 1 : -1, start = s2 > 0 ? -30 : GW + 30, stop = c.px - s2 * 34;
          return start + (stop - start) * Math.min(1, Math.max(0, (c.t - SOCK_REF) / (SOCK_CARD - 2 - SOCK_REF))); } };
      sfx('whoosh');
    } else if (ch.skill === 'history') {
      const hero = HEROES[Math.floor(Math.random() * HEROES.length)];
      cine = { kind: 'history', t: 0, caster: p, target: players[1 - p.side], hero };
      sfx('whoosh');
    } else if (ch.skill === 'party') {
      const girls = [];
      const hues = [330, 280, 200, 50, 0, 160, 300, 20, 240, 100];
      for (let i = 0; i < 10; i++) {
        const hx = p.side === 0 ? 14 + i * 19 : GW - 14 - i * 19;
        girls.push({ x: hx, home: hx, hue: hues[i], hair: ['#2b1b10', '#f2d06b', '#ff8fc8', '#6b3b12', '#111'][i % 5], ph: Math.random() * 6, jumpT: 0, jx: 0, jy: 0 });
      }
      party = { side: p.side, caster: p, girls, cd: 0 };
      p.fastT = SKILL_FRAMES.party; players[1 - p.side].slowT = 100; // 팬 응원: 나는 빨라지고, 상대는 조명에 눈부셔 느려짐
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
    } else if (ch.skill === 'giant' || ch.skill === 'whirl') {
      cine = { kind: 'lite', t: 0, caster: p, target: players[1 - p.side], key: ch.skill };
    } else popups.push({ text: ch.skillName + '!', x: p.x, y: 120, t: 30, color: p.color });
  }
  if (p.skillT > 0) p.skillT--;
  let [tw, th] = p.skillT > 0 && SKILL_SIZE[ch.skill] ? SKILL_SIZE[ch.skill] : [1, 1];
  if (p.whirlT > 0) { p.whirlT--; [tw, th] = SKILL_SIZE.whirl; } // 계백 보너스 회오리
  if (p.shrinkT > 0) { p.shrinkT--; const k = p.shrinkK || SHRINK; tw *= k; th *= k; if (p.shrinkT === 0) p.shrinkK = 0; }
  if (p.flat) { tw *= 1.5; th *= 0.4; } // 납작
  p.hm += (th - p.hm) * 0.35;
  if (Math.abs(th - p.hm) < 0.01) p.hm = th;
  p.hw += (tw - p.hw) * 0.35;
  if (Math.abs(tw - p.hw) < 0.01) p.hw = tw;
  if (p.redT > 0) p.redT--;
  if (p.guardT > 0) p.guardT--;
  if (p.frozen) return; // 독재: 공을 받을 때까지 그 자리에 멈춤
  if (p.blindT > 0) p.blindT--;
  for (const f of ['fastT', 'weakT', 'nojumpT', 'pullT', 'sightT', 'slowT', 'ampT', 'manaLockT', 'jumpT']) if (p[f] > 0) p[f]--;
  if (p.guardT === 0) { p.matrixGuard = false; p.courtGuard = false; }
  if (p.flatT > 0 && --p.flatT === 0) p.flat = false;
  if (p.confuseT > 0) { // 음파: 조작 방향이 수시로 뒤집힘
    p.confuseT--;
    if (--p.confNext <= 0) { p.confRev = !p.confRev; p.confNext = 10 + Math.floor(Math.random() * 22); if (p.confRev) sfx('beep', 0.25); }
    if (p.confRev) inp = { ...inp, x: -inp.x };
  }
  if (p.lagT > 0) { p.lagT--; p.lagQ.push(inp); inp = p.lagQ.length > 7 ? p.lagQ.shift() : { x: 0, y: 0, power: false, skill: false }; } // 위상차: 조작이 0.3초 늦게 들어감
  if (p.freezeT > 0) { p.freezeT--; inp = { x: 0, y: 0, power: false, skill: false }; } // 멈칫

  if (p.state === WIN || p.state === LOSE) return;
  if (p.state === LYING) { if (--p.lyingT <= 0) p.state = NORMAL; return; }

  // 좌우 이동
  const slow = (p.flat ? 0.5 : 1) * (p.fastT > 0 ? 1.5 : 1) * (p.slowT > 0 ? 0.55 : 1); // 납작하면 이속 절반, 자유 버프면 1.5배
  if (p.pullT > 0) p.x += Math.sign(p.pullX - p.x) * Math.min(4.6, Math.abs(p.pullX - p.x)); // 특이점으로 끌려감
  if (p.state === DIVE) p.x += p.diveDir * 8 * slow;
  else p.x += inp.x * 6 * slow;
  const [mn, mx] = p.side === 0 ? [32, 184] : [248, 400];
  p.x = Math.max(mn, Math.min(mx, p.x));

  // 점프 (원작: y가 정확히 땅(244)이고 다이빙·누움 상태가 아닐 때)
  if (p.state < DIVE && inp.y === -1 && p.y === P_GROUND_Y && !(p.nojumpT > 0)) { p.state = JUMP; p.vy = p.jumpT > 0 ? -19 : -16; }

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
  if (ball.flight) return advanceFlight();
  if (ball.squashT > 0) ball.squashT--;
  if (ball.miniT > 0) ball.miniT--;
  const m = ballBoost * (ball.miniT > 0 ? 1.25 : 1); // 핀볼 작은 공은 1.25배 빠름 / 메테오 맞은 라운드엔 시간이 빨리 흐르는 것처럼 (같은 궤적, 더 빠름)
  ball.rot += ball.vx * 0.06 * m;
  const fx = ball.x + ball.vx * m;
  if (pinT > 0) pinT--;
  if (ball.arrowT > 0) ball.arrowT--;
  updateFakes(); updateStrikes();
  if (ball.waveT > 0) { ball.waveT--; ball.vy += Math.sin(ball.waveT * 0.8) * 2.2; } // 파동: 위아래로 출렁
  if (ball.wobbleT > 0) { // 3등급: 휘청휘청 → 뚝
    ball.wobbleT--; ball.vx += Math.sin(ball.wobbleT * 0.9) * 1.3;
    if (ball.wobbleT === 12) { ball.vy += 7; sfx('snap'); popups.push({ text: '뚝!', x: ball.x, y: ball.y - 20, t: 20, color: '#00f0ff' }); }
  }
  if (fx < BALL_R || fx > GW) { ball.vx = -ball.vx; pinBounce(); }
  if (ball.y + ball.vy * m < 0) { ball.vy = 1; pinBounce(); }
  if (Math.abs(ball.x - NET_X) < NET_HW && ball.y > NET_TOP) {
    if (ball.y <= NET_PILLAR_TOP) { if (ball.vy > 0) ball.vy = -ball.vy; }
    else ball.vx = ball.x < NET_X ? -Math.abs(ball.vx) : Math.abs(ball.vx);
  }
  if (ball.y + ball.vy * m > BALL_GROUND_Y) {
    const guard = players[ball.x < NET_X ? 0 : 1];
    ball.squashT = 6;
    if (guard.guardT > 0 && !ball.unblockable) { gyebaekSave(guard); return false; }
    ball.y = BALL_GROUND_Y;
    ball.vy = -ball.vy;
    ball.power = false;
    ball.unblockable = false;
    players.forEach((pl) => { pl.frozen = false; pl.forceBump = false; pl.stunned = false; });
    effects.push({ x: ball.x, y: BALL_GROUND_Y + 20, t: 8 });
    if (ball.meteor) meteorImpact(ball.x);
    if (ball.arrowT > 0) { ball.arrowT = 0; craters.push({ x: ball.x, seed: Math.random(), type: 'tear', dir: ball.vx > 0 ? 1 : -1 }); shake = 8; sfx('twang'); }
    if (ball.hero === 'ship') { shake = 10; sfx('explode'); for (let i = 0; i < 3; i++) effects.push({ x: ball.x, y: 270, t: 8 - i }); }
    ball.hero = null;
    return true;
  }
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > (ball.meteor ? 12 : 2)) ball.trail.shift();
  if (Math.hypot(ball.vx, ball.vy) > 17) pushRibbon(ball.x - ball.vx, ball.y - ball.vy); else if (ball.ribbon && ball.ribbon.length) ball.ribbon.splice(0, 3);
  ball.x += ball.vx * m;
  ball.y += ball.vy * m;
  ball.vy += 1 * m;
  return false;
}


// ===== 히어로 볼 (스킬 공 비행) =====
// 이징: 처음엔 공중에 잠깐 머물며 버티다가 → 확 가속해서 꽂힘
const EASE = {
  heavy: (k) => (k < 0.22 ? 0.05 * (k / 0.22) : 0.05 + 0.95 * Math.pow((k - 0.22) / 0.78, 2.3)),
  arrow: (k) => (k < 0.14 ? 0.015 * (k / 0.14) : 0.015 + 0.985 * Math.pow((k - 0.14) / 0.86, 1.5)),
  lob: (k) => k * k * (3 - 2 * k),
  wall: (k) => Math.pow(k, 1.6),
};
// 여러 점을 잇는 경로 위의 위치 (arc: 위로 휘는 높이)
function flightPos(pts, e, arc = 0) {
  let total = 0; const L = [];
  for (let i = 0; i < pts.length - 1; i++) { const d = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y); L.push(d); total += d; }
  let need = e * total, i = 0;
  while (i < L.length - 1 && need > L[i]) { need -= L[i]; i++; }
  const q = L[i] ? Math.min(1, need / L[i]) : 1;
  return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * q, y: pts[i].y + (pts[i + 1].y - pts[i].y) * q - arc * Math.sin(Math.PI * e), seg: i };
}
// 공을 경로 위로 옮기고 속도·회전·리본 꼬리 갱신
function moveHeroBall(pts, e, arc, col) {
  const p = flightPos(pts, e, arc), px = ball.x, py = ball.y;
  ball.x = p.x; ball.y = p.y; ball.vx = ball.x - px; ball.vy = ball.y - py;
  ball.rot += 0.15 + Math.hypot(ball.vx, ball.vy) * 0.04;
  ball.fx = col;
  pushRibbon(px, py);
  return p;
}
function pushRibbon(px, py) {
  if (!ball.ribbon) ball.ribbon = [];
  for (let i = 1; i <= 3; i++) ball.ribbon.push({ x: px + (ball.x - px) * i / 3, y: py + (ball.y - py) * i / 3 });
  while (ball.ribbon.length > 30) ball.ribbon.shift();
}
// 경기 중 비행 (메테오 벽 튕기기 · 민주주의 지팡이 샷): updateBall에서 매 프레임 진행
function startFlight(pts, dur, ease, col, arc = 0) {
  ball.trail = [];
  ball.flight = { pts, dur, ease, arc, t: 0, seg: 0 };
  ball.fx = col; ball.ribbon = []; ball.unblockable = true; ball.power = true;
  sfx('flight', 1, dur / 25);
}
function advanceFlight() {
  const F = ball.flight; F.t++;
  const k = Math.min(1, F.t / F.dur);
  const p = moveHeroBall(F.pts, EASE[F.ease](k), F.arc, ball.fx);
  if (p.seg !== F.seg && k < 1) { // 벽에 쾅!
    F.seg = p.seg; const w = F.pts[p.seg];
    heavy(w.x, w.y, 1.2); sfx('thud');
  }
  if (k >= 1) { // 바닥에 꽂힘 → 점수
    ball.flight = null;
    ball.y = BALL_GROUND_Y; ball.vx = 0; ball.vy = -10; ball.squashT = 7;
    ball.power = false; ball.unblockable = false; ball.fx = null;
    effects.push({ x: ball.x, y: BALL_GROUND_Y + 20, t: 8 });
    if (ball.meteor) meteorImpact(ball.x);
    return true;
  }
  return false;
}

// ----- 선수가 공에 맞았을 때 -----
function hitBall(p, inp) {
  ball.fx = null;
  if (ball.power && !p.collided && (ball.vx > 0) === (p.side === 1)) mathTaunt('block', p); // 상대 강타를 받아냄
  if (ball.meteor) { ball.meteor = false; shake = Math.max(shake, 4); sfx('thud'); } // 메테오를 받아냄!
  ball.hero = null;
  // 독재로 막는 중이면 그냥 받기만 (스파이크·스킬 없음)
  const bumpOnly = p.forceBump;
  if (bumpOnly) { p.forceBump = false; p.frozen = false; p.redT = 20; effects.push({ x: ball.x, y: ball.y, t: 8 }); }
  // 회전 회오리 중: 닿는 공을 상대 쪽으로 세게 날림
  if (!bumpOnly && isWhirl(p)) {
    heavy(ball.x, ball.y, 1.6); splash(ball.x, ball.y, 18, 5); sfx('spray');
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
    if (p.ampT > 0) { ball.vx = Math.sign(ball.vx) * Math.min(30, Math.abs(ball.vx) * 1.4); ball.vy *= 1.4; heavy(ball.x, ball.y, 1.4); popups.push({ text: '공명 증폭!', x: p.x, y: p.y - 50, t: 20, color: '#5aa8ff' }); }
    if (p.weakT > 0) { ball.vx *= 0.45; ball.vy *= 0.45; ball.power = false; popups.push({ text: '위헌!', x: p.x, y: p.y - 50, t: 20, color: '#ffffff' }); }
    effects.push({ x: ball.x, y: ball.y, t: 8 });
    // 스파이크가 공에 맞으면 마나 1칸 (스킬 쓰는 중엔 안 참)
    if (p.skillT === 0 && p.mana < manaMax(p) && !(p.manaLockT > 0)) p.mana++;
    heavy(ball.x, ball.y, inp.x !== 0 ? 1.1 : 0.8); // 스파이크 타격감
  }
}

// 히트박스: 가로 64, 세로 64 (거인화 땐 위로 2배)
// 캐릭터마다 마나 칸 수 (기본 5, 키다리·김지연은 3)
// 회전 회오리 중인지 (김지연 스킬 또는 계백 보너스)
function isWhirl(p) { return (p.skillT > 0 && CHARACTERS[p.char].skill === 'whirl') || p.whirlT > 0; }
function manaMax(p) { return CHARACTERS[p.char].mana || CONFIG.MANA_MAX; }
function hitTop(p) { return p.y - P_HALF - (p.hm - 1) * P_HALF * 2; }

function checkCollisions(inputs) {
  if (ball.unblockable) return; // 지팡이로 꽂은 공은 못 막음
  for (const p of players) {
    // 메테오 맞아 납작해지면 판정이 보이는 것보다 작아짐 (받기 어려움)
    // 납작: 가로 판정은 원래의 75%, 세로는 몸 위쪽 40까지만 (원래 64)
    const hx = p.flat ? P_HALF * FLAT_HIT : P_HALF * p.hw;
    const top = p.flat ? p.y + P_HALF - 40 : hitTop(p);
    const sm = ball.miniT > 0 ? 3 : 0; // 작아진 공은 판정도 빡빡
    const touching = Math.abs(ball.x - p.x) <= hx - sm && ball.y >= top + sm && ball.y <= p.y + P_HALF;
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
    heavy(ball.x, 272, 1.4);
    lastScorer = ball.x < NET_X ? 1 : 0;
    players[lastScorer].score++;
    if (players[lastScorer].score < CONFIG.WIN_SCORE) { if (Math.random() < 0.5) mathTaunt('error', players[lastScorer]); } else mathTaunt('win', players[lastScorer]);
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
  heavy(ball.x, ball.y, 2.6);
  ball.power = true;
  const tx = s > 0 ? 290 + Math.random() * 100 : 42 + Math.random() * 100;
  if (cine && !cine.counter) {
    // 히어로 볼: 지팡이 끝에서 잠깐 버티다가 보라색 혜성처럼 확 꽂힘
    startFlight([{ x: ball.x, y: ball.y }, { x: tx, y: BALL_GROUND_Y }], 26, 'heavy', '200,140,255', 24);
    return;
  }
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
  if (t > DEMO_HIT - 12 && t < DEMO_HIT) { const pv = staffPivot(c), s2 = c.side === 0 ? 1 : -1; chargeFX(pv.x + s2 * Math.sin(STAFF_END) * STAFF_LEN, pv.y - Math.cos(STAFF_END) * STAFF_LEN, (t - (DEMO_HIT - 12)) / 12, '200,140,255'); }
  // 거대 지팡이 등장 → 공을 쳐서 꽂음
  if (t >= 66) drawStaff(c, t);
  if (t >= DEMO_HIT && t < DEMO_HIT + 3) { ctx.fillStyle = `rgba(255,255,255,${0.7 - (t - DEMO_HIT) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  // 이 연출 중엔 공을 맨 위에 다시 그림
  if (t >= DEMO_HIT) drawBall();
}

// ===== 시네마틱 공통 도구 (카메라 · 화면 효과) =====
const ease = (k) => (k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k));
function camLerp(a, b, k) {
  const e = ease(k);
  return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, z: a.z + (b.z - a.z) * e, r: (a.r || 0) + ((b.r || 0) - (a.r || 0)) * e };
}
// 키프레임 [[프레임, {x,y,z,r}], ...] 사이를 부드럽게
function camKeys(t, keys) {
  if (t <= keys[0][0]) return { ...keys[0][1] };
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i], [t1, b] = keys[i + 1];
    if (t <= t1) return camLerp(a, b, (t - t0) / (t1 - t0));
  }
  return { ...keys[keys.length - 1][1] };
}
const CAM_HOME = { x: 216, y: 152, z: 1, r: 0 };

function cineCam() {
  if (!cine) return null;
  if (cine.kind === 'math') return withFollow(cine, mathCam(cine), MATH_FIRE, MATH_HIT);
  if (cine.kind === 'kim') return withFollow(cine, kimCam(cine), KIM_FIRE, KIM_HIT);
  if (cine.kind === 'gm') return gmCam(cine);
  if (cine.kind === 'jmw') return jmCam(cine);
  if (cine.kind === 'lite') return liteCam(cine);
  if (cine.kind === 'history') return cine.hero && cine.hero.key === 'gyebaek' ? histCam(cine) : withFollow(cine, histCam(cine), HIST_FIRE, HIST_HIT);
  return null;
}
// 공 비행 중엔 카메라가 공을 따라감 (줌인 + 살짝 기울임), 앞뒤는 부드럽게 이어 붙임
function withFollow(c, base, FIRE, HIT) {
  if (!c.init || c.t <= FIRE) return base;
  const s = c.caster.side === 0 ? 1 : -1;
  const follow = (k) => ({ x: ball.x * 0.55 + c.tx * 0.45, y: ball.y * 0.55 + 250 * 0.45, z: 1.7 - 0.3 * k, r: s * 0.05 * (1 - k) });
  if (c.t <= HIT) {
    const k = (c.t - FIRE) / (HIT - FIRE), f = follow(k);
    const out = camLerp(base, f, Math.min(1, k / 0.18));
    out.space = base.space; return out;
  }
  const out = camLerp({ ...follow(1), x: c.tx, y: 240 }, base, Math.min(1, (c.t - HIT) / 6));
  out.space = base.space; return out;
}

function drawCineUI() {
  drawStatusFX();
  if (!cine) return;
  if (cine.kind === 'math') drawMathUI(cine);
  if (cine.kind === 'kim') drawKimUI(cine);
  if (cine.kind === 'gm') drawGmUI(cine);
  if (cine.kind === 'jmw') drawJmUI(cine);
  if (cine.kind === 'lite') drawLiteUI(cine);
  if (cine.kind === 'history') drawHistUI(cine);
}

// 줌아웃했을 때 보이는 우주 공간
const STARS = Array.from({ length: 260 }, (_, i) => ({ x: -700 + ((i * 7919) % 1850), y: -620 + ((i * 6271) % 1500), r: 0.4 + (i % 4) * 0.35 }));
function drawSpace(cam) {
  ctx.fillStyle = '#07021a'; ctx.fillRect(-900, -900, 2300, 2100);
  for (const st of STARS) { ctx.fillStyle = `rgba(255,240,220,${0.4 + (st.r / 2)})`; ctx.fillRect(st.x, st.y, st.r * 2, st.r * 2); }
  const g = ctx.createRadialGradient(216, 152, 100, 216, 152, 700);
  g.addColorStop(0, 'rgba(120,60,200,.0)'); g.addColorStop(1, 'rgba(120,60,200,.25)');
  ctx.fillStyle = g; ctx.fillRect(-900, -900, 2300, 2100);
}

// 영화 레터박스 바
function cinemaBars(h, color = '#000', edge = null) {
  ctx.fillStyle = color; ctx.fillRect(0, 0, GW, h); ctx.fillRect(0, GH - h, GW, h);
  if (edge) { ctx.fillStyle = edge; ctx.fillRect(0, h - 1.5, GW, 1.5); ctx.fillRect(0, GH - h, GW, 1.5); }
}
// 비네팅
function vignette(rgb, a) {
  const g = ctx.createRadialGradient(GW / 2, GH / 2, GH * 0.35, GW / 2, GH / 2, GW * 0.62);
  g.addColorStop(0, `rgba(${rgb},0)`); g.addColorStop(1, `rgba(${rgb},${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, GW, GH);
}
// 색 반전 (한 프레임 번쩍)
function invertFlash() {
  ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, GW, GH); ctx.restore();
}
// 흑백으로
function desaturate(a = 1) {
  ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.globalAlpha = a; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, GW, GH); ctx.restore();
}
// 글리치: 화면을 가로 띠로 잘라서 좌우로 어긋나게 + 색 분리
function glitch(power) {
  for (let i = 0; i < 9; i++) {
    const y = Math.random() * GH, h = 4 + Math.random() * 18, dx = (Math.random() - 0.5) * power;
    ctx.drawImage(cv, 0, y * SCALE, cv.width, h * SCALE, dx, y, GW, h);
  }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#ff0040'; ctx.fillRect((Math.random() - 0.5) * 6, 0, GW, GH);
  ctx.restore();
}
// 렌즈 왜곡: 화면이 가운데로 빨려 들어가는 느낌 (줌 블러)
function zoomBlur(n, step) {
  for (let i = 1; i <= n; i++) {
    const z = 1 + i * step;
    ctx.globalAlpha = 0.22;
    ctx.drawImage(cv, 0, 0, cv.width, cv.height, GW / 2 - (GW * z) / 2, GH / 2 - (GH * z) / 2, GW * z, GH * z);
  }
  ctx.globalAlpha = 1;
}
// 주사선
function scanlines(a) {
  ctx.fillStyle = `rgba(0,0,0,${a})`;
  for (let y = 0; y < GH; y += 2) ctx.fillRect(0, y, GW, 0.6);
}
// 한지 질감
let hanjiCanvas = null;
function hanji(a) {
  if (!hanjiCanvas) {
    const c = document.createElement('canvas'); c.width = 216; c.height = 152;
    const g = c.getContext('2d');
    g.fillStyle = '#efe2c4'; g.fillRect(0, 0, 216, 152);
    for (let i = 0; i < 2600; i++) { const v = 190 + Math.random() * 50; g.fillStyle = `rgba(${v},${v - 18},${v - 50},.35)`; g.fillRect(Math.random() * 216, Math.random() * 152, 1, 1); }
    g.strokeStyle = 'rgba(150,120,80,.25)';
    for (let i = 0; i < 90; i++) { g.beginPath(); const x = Math.random() * 216, y = Math.random() * 152; g.moveTo(x, y); g.quadraticCurveTo(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10, x + Math.random() * 30 - 15, y + Math.random() * 30 - 15); g.stroke(); }
    hanjiCanvas = c;
  }
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a;
  ctx.drawImage(hanjiCanvas, 0, 0, GW, GH); ctx.restore();
}
// 먹물 번짐
function inkBlot(x, y, r, a, seed = 0) {
  ctx.fillStyle = `rgba(12,10,8,${a})`;
  for (let i = 0; i < 6; i++) {
    const ang = seed + i * 1.1, rr = r * (0.55 + ((Math.sin(seed * 9 + i * 3.1) + 1) / 2) * 0.5);
    ctx.beginPath(); ctx.arc(x + Math.cos(ang) * r * 0.35, y + Math.sin(ang) * r * 0.3, rr, 0, 7); ctx.fill();
  }
}
// 붓 터치 (점들을 따라 굵기가 변하는 획)
function brushStroke(pts, w, color, prog = 1) {
  const n = Math.max(2, Math.floor(pts.length * prog));
  ctx.fillStyle = color;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    for (let k = 0; k < 4; k++) {
      const q = k / 4, x = a.x + (b.x - a.x) * q, y = a.y + (b.y - a.y) * q;
      const ww = w * (0.45 + Math.sin(((i + q) / pts.length) * Math.PI) * 0.6);
      ctx.beginPath(); ctx.ellipse(x, y, ww, ww * 0.6, Math.atan2(b.y - a.y, b.x - a.x), 0, 7); ctx.fill();
    }
  }
}
// 붓글씨 (궁서체)
function brushText(str, x, y, size, color, vertical = false) {
  ctx.save();
  ctx.font = `bold ${size}px "Gungsuh", "GungSeo", "궁서", "Batang", "바탕", serif`;
  ctx.textAlign = 'center'; ctx.fillStyle = color;
  ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 3;
  if (vertical) [...str].forEach((ch, i) => ctx.fillText(ch, x, y + i * size * 1.05));
  else ctx.fillText(str, x, y);
  ctx.restore();
}
// 붉은 낙관(도장)
function seal(x, y, str) {
  ctx.save(); ctx.fillStyle = '#b3121b'; ctx.fillRect(x - 11, y - 11, 22, 22);
  ctx.font = 'bold 9px "Gungsuh","Batang",serif'; ctx.fillStyle = '#f6e7d0'; ctx.textAlign = 'center';
  ctx.fillText(str.slice(0, 2), x, y - 1); ctx.fillText(str.slice(2, 4), x, y + 9); ctx.restore();
}
// 스틱맨 (영혼·튕겨 나가는 연출)
function stickman(x, y, sc, rot, color, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.globalAlpha = a; ctx.strokeStyle = color; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, -26, 5, 0, 7); ctx.moveTo(0, -21); ctx.lineTo(0, -6);
  ctx.moveTo(0, -17); ctx.lineTo(-8, -10); ctx.moveTo(0, -17); ctx.lineTo(8, -12);
  ctx.moveTo(0, -6); ctx.lineTo(-6, 4); ctx.moveTo(0, -6); ctx.lineTo(6, 4); ctx.stroke();
  ctx.restore();
}
// 와이어프레임 큐브
function wireCube(x, y, s, rot, color, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a;
  ctx.strokeStyle = color; ctx.lineWidth = 1.2; ctx.shadowColor = color; ctx.shadowBlur = 6;
  const o = s * 0.45;
  ctx.strokeRect(-s / 2, -s / 2, s, s); ctx.strokeRect(-s / 2 + o, -s / 2 - o, s, s);
  ctx.beginPath();
  for (const [px, py] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { ctx.moveTo(px * s / 2, py * s / 2); ctx.lineTo(px * s / 2 + o, py * s / 2 - o); }
  ctx.stroke(); ctx.restore();
}
// 바닥에 원근으로 눕힌 글자
function floorText(str, x, y, size, color, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.32); ctx.globalAlpha = a;
  ctx.font = `bold ${size}px "Cambria Math", serif`; ctx.textAlign = 'center';
  ctx.shadowColor = color; ctx.shadowBlur = 14; ctx.fillStyle = color; ctx.fillText(str, 0, 0); ctx.restore();
}

// ----- 레어·에픽 짧은 컷인 (김지연 회오리 1초 / 키다리 거인화 1.5초) -----
const LITE_FRAMES = { whirl: 25, giant: 38 };
const GIANT_BASE_CM = 185;
const liteParts = []; // 물방울·물보라 (스킬 지속 중에도 씀)
function splash(x, y, n, sp = 4) {
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 1 + Math.random() * sp; liteParts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, t: 18 + Math.random() * 12, r: 1 + Math.random() * 1.6 }); }
}
function tickLite() {
  for (const p of liteParts) { p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.t--; }
  for (let i = liteParts.length - 1; i >= 0; i--) if (liteParts[i].t <= 0 || liteParts[i].y > 276) liteParts.splice(i, 1);
  for (const p of players) {
    const sk = CHARACTERS[p.char].skill;
    if (p.whirlT > 0 && p.anim % 2 === 0) { const a = p.anim * 0.9; liteParts.push({ x: p.x + Math.cos(a) * 30 * p.hw, y: p.y - 10 + Math.sin(a * 1.7) * 20, vx: Math.cos(a + 1.57) * 3, vy: -1.5, t: 14, r: 1.2 }); }
    if (p.skillT <= 0) { p.lastX = p.x; continue; }
    if (sk === 'whirl' && p.anim % 2 === 0) { const a = p.anim * 0.9; liteParts.push({ x: p.x + Math.cos(a) * 30 * p.hw, y: p.y - 10 + Math.sin(a * 1.7) * 20, vx: Math.cos(a + 1.57) * 3, vy: -1.5, t: 14, r: 1.2 }); }
    if (sk === 'giant' && p.y >= P_GROUND_Y && Math.abs(p.x - (p.lastX ?? p.x)) > 0.5 && p.anim % 5 === 0) {
      for (let i = 0; i < 3; i++) smokes.push({ x: p.x + (Math.random() - 0.5) * 24, y: 272, vx: (Math.random() - 0.5) * 2, vy: -0.4 - Math.random() * 0.6, r: 3 + Math.random() * 3, t: 16 + Math.random() * 10 });
    }
    p.lastX = p.x;
  }
}
function drawLiteParts() {
  for (const p of liteParts) { ctx.fillStyle = `rgba(150,220,255,${Math.min(1, p.t / 10)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill(); }
}

function updateLite() {
  const c = cine, P = c.caster, ch = CHARACTERS[P.char];
  c.t++;
  players.forEach((p) => p.anim++);
  tickLite();
  if (c.t === 1 && c.key === 'giant') { P.hm = 1; P.hw = 1; }
  if (c.key === 'whirl' && c.t <= 6) { const q = c.t / 6; P.hm = P.hw = 1 + q; }
  if (c.key === 'whirl') {
    if (c.t === 1) sfx('whoosh');
    if (c.t === 10) sfx('spray');
    if (c.t % 3 === 0) splash(P.x + (Math.random() - 0.5) * 40, 268, 2, 3);
    if (c.t === LITE_FRAMES.whirl - 1) { splash(P.x, 250, 24, 6); shake = Math.max(shake, 4); }
  } else {
    const [, H3] = SKILL_SIZE.giant;
    for (const [f, step] of [[8, 1], [18, 2], [28, 3]]) if (c.t === f) {
      const h = 1 + (H3 - 1) * step / 3; P.hm = h; P.hw = 1;
      heavy(P.x, 270, 0.6 + step * 0.35); sfx('thud');
      c.cm = Math.round(GIANT_BASE_CM * h); c.pop = c.t;
    }
  }
  if (c.t >= LITE_FRAMES[c.key]) cine = null;
}

function liteCam(c) {
  const cam = liteCamRaw(c), hw = GW / 2 / cam.z, hh = GH / 2 / cam.z;   // 경기장 밖(검은 곳)이 안 보이게
  cam.x = Math.max(hw, Math.min(GW - hw, cam.x)); cam.y = Math.max(hh - 40, Math.min(GH - hh, cam.y));
  return cam;
}
function liteCamRaw(c) {
  const P = c.caster, H = CAM_HOME, t = c.t;
  if (c.key === 'whirl') return camKeys(t, [[0, H], [5, { x: P.x, y: P.y - 6, z: 2.3, r: 0.06 }], [18, { x: P.x, y: P.y - 6, z: 2.0, r: -0.05 }], [LITE_FRAMES.whirl, H]]);
  const top = hitTop(P);
  return camKeys(t, [[0, H], [4, { x: P.x, y: 258, z: 2.6 }], [30, { x: P.x, y: Math.max(40, top + 30), z: 1.7 }], [LITE_FRAMES.giant, H]]);
}

function drawLiteWorld() {
  const c = cine, P = c.caster, t = c.t;
  if (c.key === 'whirl') {
    // 발밑 물 소용돌이 고리
    const k = Math.min(1, t / 8);
    ctx.save(); ctx.translate(P.x, 274);
    for (let i = 0; i < 4; i++) {
      const r = (16 + i * 11) * k, a0 = t * (0.35 + i * 0.05) + i;
      ctx.strokeStyle = `rgba(${120 + i * 30},${200 + i * 10},255,${0.85 - i * 0.15})`; ctx.lineWidth = 2.5 - i * 0.4;
      ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.28, 0, a0, a0 + 4.2); ctx.stroke();
    }
    ctx.restore();
    // 몸을 감는 바람 줄기
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) { const a = t * 0.8 + i * 2.1, yy = P.y + 10 - i * 18; ctx.beginPath(); ctx.ellipse(P.x, yy, 26 * k, 6 * k, 0, a, a + 2.4); ctx.stroke(); }
  } else {
    // 줄자
    const x = P.x + (P.side === 0 ? 30 : -30), base = 276, top = hitTop(P) - 4;
    ctx.save();
    ctx.fillStyle = 'rgba(255,214,60,.92)'; ctx.fillRect(x - 4, top, 8, base - top);
    ctx.strokeStyle = '#3a2a00'; ctx.lineWidth = 0.8;
    for (let y = base; y > top; y -= 6) { ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + ((base - y) % 30 === 0 ? 4 : 0), y); ctx.stroke(); }
    ctx.restore();
    if (c.cm) {
      const q = Math.min(1, (t - c.pop) / 4), sc = 1 + (1 - q) * 0.8;
      ctx.save(); ctx.translate(x + (P.side === 0 ? 30 : -30), top + 8); ctx.scale(sc, sc);
      ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(-26, -10, 52, 16);
      text(c.cm + 'cm', 0, 3, 11, '#ffd63c'); ctx.restore();
    }
  }
}

function drawLiteUI(c) {
  const ch = CHARACTERS[c.caster.char], t = c.t, F = LITE_FRAMES[c.key];
  const k = t > F - 5 ? (F - t) / 5 : Math.min(1, t / 4);
  const col = GRADE_COLOR[ch.grade] || '#fff';
  const x = GW / 2 + (1 - Math.min(1, t / 5)) * (c.caster.side === 0 ? -120 : 120);
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 12, GW, 26);
  ctx.fillStyle = col; ctx.fillRect(0, 12, GW, 1.5); ctx.fillRect(0, 36.5, GW, 1.5);
  text(ch.skillName + '!', x, 31, 16, col);
  ctx.restore();
}

// ----- 스킬 공을 '진짜 공'으로 발사 (받을 수 있음) -----
let pinT = 0; // 핀볼 버프: 벽·천장에 튕길 때마다 빨라짐
function releaseBall(tx, minN = 12) {
  let best = null;
  for (let N = minN; N <= 50 && !best; N++) {
    const vx = (tx - ball.x) / N, vy = (BALL_GROUND_Y - ball.y - (N * (N - 1)) / 2) / N;
    let x = ball.x, y = ball.y, v = vy, ok = true;
    for (let i = 0; i < N; i++) { x += vx; y += v; v += 1; if (y < 0 || (Math.abs(x - NET_X) < NET_HW + 2 && y > NET_TOP - 2)) { ok = false; break; } }
    if (ok) best = { vx, vy };
  }
  if (!best) best = { vx: (tx - ball.x) / 30, vy: -12 };
  ball.vx = best.vx; ball.vy = best.vy;
  ball.flight = null; ball.unblockable = false; ball.power = true; ball.fx = null; ball.ribbon = []; ball.trail = [];
}
// 레전더리 스킬(확정 득점 아닌 것): 연출 끝 → 진짜 공 + 효과
const SKILL_FX = {
  // 김민주: 정치·법·언어 테마로 버프·디버프·방어 섞어서
  vote:    (P, T) => { T.mana = 0; T.manaLockT = 250; P.mana = Math.min(manaMax(P) - 1, P.mana + 2);
    return ['탄핵 소추! 상대 마나 0 + 10초 마나 봉인 · 내 마나 +2', '#ffd84d', 'far', 14]; },
  liberty: (P, T) => { P.fastT = 175; P.jumpT = 175; T.slowT = 75;
    return ['자유! 7초 내 이동속도·점프 UP + 상대 3초 감속', '#78dcc8', 'far', 16]; },
  court:   (P, T) => { T.weakT = 175; P.guardT = 150; P.courtGuard = true;
    return ['위헌! 상대 스파이크 7초 약화 + 6초 헌법재판소 방어', '#ffffff', 'mid', 14]; },
  grammar: (P, T) => { T.nojumpT = 100; T.freezeT = 10; T.lagT = 75; T.lagQ = []; T.shrinkT = 100; T.shrinkK = 0.8;
    return ['F! 4초 점프 금지 + 조작 지연 + 축소', '#ff4040', 'far', 14]; },
  // 박준형: 공격 + 디버프 + 버프 + 방어까지 (시네마틱만큼 세게)
  rail:    (P, T) => { T.pullT = 14; T.pullX = T.side === 0 ? 32 : 400; T.slowT = 100; T.mana = Math.max(0, T.mana - 2); P.mana = Math.min(manaMax(P) - 1, P.mana + 1);
    return ['레일건! 넉백 + 4초 감속 + 마나 강탈', '#3cf0ff', 'at', 10]; },
  blade:   (P, T) => { T.flatT = 100; T.flat = true; P.guardT = 150; P.matrixGuard = true;
    return ['det = 0! 상대 납작 + 6초 행렬 방패', '#c896ff', 'near', 20]; },
  wave:    (P, T) => { ball.waveT = 40; T.lagT = 100; T.lagQ = []; P.ampT = 175;
    return ['위상차! 상대 조작 지연 + 7초 스파이크 증폭', '#5aa8ff', 'far', 18]; },
  fractal: (P, T) => { T.pullT = 100; T.pullX = T.side === 0 ? 176 : 256; T.slowT = 100;
    return ['특이점! 빨려감 + 분신 공 3개', '#ff5ad1', 'back', 26]; },
  // 역사왕: 위인마다 다른 맛 (저격·연쇄 함정·지혜 버프)
  arrow:   (P, T) => { T.slowT = 125; T.nojumpT = 60; P.ampT = 150;
    for (let i = 0; i < 2; i++) fakes.push({ x: ball.x, y: ball.y, vx: 0, vy: 0, rot: 0, arrowDelay: 4 + i * 4 }); // 3연발 (2발은 허상)
    return ['편전 3연발! 발목 저격: 5초 감속·점프 봉인 + 내 스파이크 강화', '#5a96ff', 'far', 11]; },
  thunder: (P, T) => { T.freezeT = 14; T.stunned = true;
    for (let i = 0; i < 4; i++) strikes.push({ side: T.side, t: 30 + i * 22, x: null });   // 4번 연쇄 낙뢰 (예고 원 → 쾅)
    return ['귀주대첩! 감전 + 연쇄 낙뢰 4번', '#b98cff', 'side', 12]; },
  hangul:  (P, T) => { P.sightT = 250; P.fastT = 125; P.mana = Math.min(manaMax(P) - 1, P.mana + 2); T.confuseT = 50; T.confRev = true; T.confNext = 50;
    return ['훈민정음! 10초 낙하지점 보임 + 이속 UP + 마나 +2 · 상대 2초 혼란', '#d9a520', 'far', 18]; },
};
// ----- 박준형 행렬 방패: 바닥 행렬 격자 + 수식 돔 -----
const MATRIX_GLYPHS = ['det A', 'Aᵀ', 'A⁻¹', 'λ₁', 'λ₂', 'eig(A)', '⊗', '‖v‖', 'rank 2', 'Ax = b', 'I₂', 'tr A', '[1 0]', '[0 1]', 'v→−v'];
const matrixHits = [];
function drawCourtField(p) {
  const T = p.guardT, age = 150 - T, a = Math.min(1, T / 15) * Math.min(1, age / 10);
  const x0 = p.side === 0 ? 10 : NET_X + 10, x1 = p.side === 0 ? NET_X - 10 : GW - 10, w = x1 - x0, cx = (x0 + x1) / 2;
  ctx.save(); ctx.globalAlpha = a;
  // 대리석 바닥 빛 + 기둥 5개가 솟아오름
  const fg = ctx.createLinearGradient(0, 258, 0, 290); fg.addColorStop(0, 'rgba(255,240,200,0)'); fg.addColorStop(1, 'rgba(255,240,200,.35)');
  ctx.fillStyle = fg; ctx.fillRect(x0, 258, w, 32);
  const rise = EASE.heavy(Math.min(1, age / 16));
  for (let i = 0; i < 5; i++) drawColumn(x0 + 12 + (i * (w - 24)) / 4, 276, 120 * rise, 12, '#f4f0e6', 0.55);
  // 페디먼트 + 정의의 저울
  ctx.strokeStyle = 'rgba(255,240,200,.85)'; ctx.lineWidth = 1.5; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 8;
  const topY = 276 - 120 * rise - 8;
  ctx.beginPath(); ctx.moveTo(x0, topY); ctx.lineTo(cx, topY - 26); ctx.lineTo(x1, topY); ctx.closePath(); ctx.stroke();
  ctx.restore();
  if (rise > 0.9) drawScales(cx, topY - 48, 0.6, Math.sin(age * 0.12) * 0.15, a * 0.9);
  ctx.save(); ctx.globalAlpha = a; text('SUPREME COURT', cx, topY - 6, 7, '#fff3c8'); ctx.restore();
}
// ----- 계백 결사진: 불타는 황산벌 + 결사대 창벽 + 군기 + 決死 -----
function drawGyebaekField(p) {
  const T = p.guardT, age = GUARD_FRAMES - T, a = Math.min(1, T / 20) * Math.min(1, age / 8);
  const x0 = p.side === 0 ? 2 : NET_X + 2, x1 = p.side === 0 ? NET_X - 2 : GW - 2, w = x1 - x0, cx = (x0 + x1) / 2, s = p.side === 0 ? 1 : -1;
  const back = p.side === 0 ? x0 + 6 : x1 - 6;
  ctx.save(); ctx.globalAlpha = a;
  // 1) 붉은 하늘 기운 + 바닥 불길 빛
  const sky = ctx.createLinearGradient(0, 60, 0, 276); sky.addColorStop(0, 'rgba(120,10,0,0)'); sky.addColorStop(1, 'rgba(255,70,10,.32)');
  ctx.fillStyle = sky; ctx.fillRect(x0, 60, w, 216);
  // 2) 결사대 창벽 (뒤쪽 줄: 실루엣 병사 + 창)
  for (let i = 0; i < 9; i++) {
    const sx = x0 + 8 + (i * (w - 16)) / 8, bob = Math.sin(age * 0.15 + i) * 1.5, rise = Math.min(1, (age - i * 2) / 10);
    if (rise <= 0) continue;
    const by = 276 - 46 * rise;
    ctx.fillStyle = 'rgba(40,6,4,.75)';
    ctx.beginPath(); ctx.arc(sx, by + bob, 5, 0, 7); ctx.fill();                 // 투구
    ctx.fillRect(sx - 6, by + 5 + bob, 12, 30);                                    // 몸
    ctx.fillStyle = 'rgba(160,30,20,.85)'; ctx.fillRect(sx - 7, by + 12 + bob, 9, 18); // 방패
    ctx.strokeStyle = 'rgba(60,20,10,.9)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx + 4, by + 34 + bob); ctx.lineTo(sx + 4 + s * 4, by - 34 + bob); ctx.stroke(); // 창대
    ctx.fillStyle = '#ffd2a0'; ctx.shadowColor = '#ff6a20'; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(sx + 4 + s * 4, by - 42 + bob); ctx.lineTo(sx + 1 + s * 4, by - 33 + bob); ctx.lineTo(sx + 7 + s * 4, by - 33 + bob); ctx.fill(); ctx.shadowBlur = 0; // 창날
  }
  // 3) 군기 2개 (펄럭)
  for (const [fx, txt] of [[back, '決死'], [p.side === 0 ? x1 - 14 : x0 + 14, '百濟']]) {
    const top = 70, wave = (yy) => Math.sin(age * 0.25 + yy * 0.12) * 4;
    ctx.strokeStyle = '#2a1a10'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(fx, 276); ctx.lineTo(fx, top - 6); ctx.stroke();
    ctx.fillStyle = '#c4161c'; ctx.beginPath(); ctx.moveTo(fx, top);
    for (let yy = 0; yy <= 52; yy += 4) ctx.lineTo(fx + s * 26 + wave(yy), top + yy);
    ctx.lineTo(fx, top + 52); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#ffd36b'; ctx.lineWidth = 1; ctx.stroke();
    brushText(txt[0], fx + s * 13 + wave(14), top + 22, 15, '#fff1d6'); brushText(txt[1], fx + s * 13 + wave(36), top + 44, 15, '#fff1d6');
  }
  // 4) 바닥 불길 (혀처럼 일렁)
  for (let i = 0; i < 26; i++) {
    const fx = x0 + (i * w) / 25, hgt = 10 + (Math.sin(age * 0.4 + i * 1.7) + 1) * 8 + (i % 3) * 3;
    const g = ctx.createLinearGradient(0, 276 - hgt, 0, 278); g.addColorStop(0, 'rgba(255,230,120,0)'); g.addColorStop(0.4, 'rgba(255,140,30,.75)'); g.addColorStop(1, 'rgba(200,30,0,.9)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(fx - 7, 278); ctx.quadraticCurveTo(fx - 4 + Math.sin(age * 0.3 + i) * 3, 276 - hgt * 0.6, fx + Math.sin(age * 0.5 + i) * 3, 276 - hgt); ctx.quadraticCurveTo(fx + 4, 276 - hgt * 0.5, fx + 7, 278); ctx.fill();
  }
  // 5) 바닥에 누운 거대 決死
  floorText('決 死', cx, 292, 46, `rgba(255,${80 + Math.sin(age * 0.2) * 40},40,1)`, 0.85);
  // 6) 불티
  for (let i = 0; i < 22; i++) {
    const ey = 276 - ((age * (1.2 + (i % 4) * 0.4) + i * 37) % 200), ex = x0 + ((i * 53 + Math.sin(age * 0.05 + i) * 20) % w + w) % w;
    ctx.fillStyle = `rgba(255,${150 + (i % 3) * 40},60,${Math.max(0, 1 - (276 - ey) / 200)})`; ctx.fillRect(ex, ey, 2, 2);
  }
  ctx.restore();
}
function drawMatrixField(p) {
  if (p.guardT > 0 && !p.courtGuard && !p.matrixGuard) return drawGyebaekField(p);
  if (p.courtGuard && p.guardT > 0) return drawCourtField(p);
  if (!(p.matrixGuard && p.guardT > 0)) return;
  const T = p.guardT, age = 150 - T, a = Math.min(1, T / 15) * Math.min(1, age / 10);
  const x0 = p.side === 0 ? 4 : NET_X + 4, x1 = p.side === 0 ? NET_X - 4 : GW - 4, cx = (x0 + x1) / 2, w = x1 - x0;
  const pulse = 0.75 + Math.sin(age * 0.25) * 0.25;
  ctx.save(); ctx.globalAlpha = a;
  // 1) 돔 (반투명 + 위도선)
  const rise = Math.min(1, age / 14), H = 210 * rise;
  const dg = ctx.createLinearGradient(0, 272 - H, 0, 272);
  dg.addColorStop(0, 'rgba(180,120,255,.02)'); dg.addColorStop(1, `rgba(170,110,255,${0.16 * pulse})`);
  ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(cx, 272, w / 2, H, 0, Math.PI, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = `rgba(210,170,255,${0.75 * pulse})`; ctx.lineWidth = 1.5; ctx.shadowColor = '#b07cff'; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.ellipse(cx, 272, w / 2, H, 0, Math.PI, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 0.7; ctx.shadowBlur = 0;
  for (let i = 1; i <= 4; i++) { const yy = 272 - H * (i / 5), rr = (w / 2) * Math.sqrt(1 - (i / 5) ** 2); ctx.strokeStyle = `rgba(200,160,255,${0.35 * pulse})`; ctx.beginPath(); ctx.ellipse(cx, yy, rr, rr * 0.12, 0, 0, Math.PI * 2); ctx.stroke(); }
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(cx, 272, Math.abs(i) * w / 10 + 0.1, H, 0, Math.PI, Math.PI * 2); ctx.stroke(); }
  // 2) 바닥 원근 격자
  ctx.strokeStyle = `rgba(190,140,255,${0.8 * pulse})`; ctx.lineWidth = 1;
  for (let k = 0; k <= 5; k++) { const yy = 262 + k * k * 1.2 + k * 1.5; ctx.beginPath(); ctx.moveTo(x0, yy); ctx.lineTo(x1, yy); ctx.stroke(); }
  for (let k = 0; k <= 12; k++) { const fx = x0 + (w * k) / 12; ctx.beginPath(); ctx.moveTo(cx + (fx - cx) * 0.7, 262); ctx.lineTo(cx + (fx - cx) * 1.15, 300); ctx.stroke(); }
  // 3) 바닥에 눕힌 거대 행렬 [[cos θ, −sin θ],[sin θ, cos θ]] — 값이 돌아감
  const th = age * 0.05, M = [[Math.cos(th), -Math.sin(th)], [Math.sin(th), Math.cos(th)]];
  ctx.save(); ctx.translate(cx, 279); ctx.scale(1, 0.34);
  ctx.strokeStyle = '#e6d2ff'; ctx.fillStyle = '#e6d2ff'; ctx.lineWidth = 3; ctx.shadowColor = '#b07cff'; ctx.shadowBlur = 14;
  const bw = 92, bh = 46;
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * bw + -sx * 10, -bh); ctx.lineTo(sx * bw, -bh); ctx.lineTo(sx * bw, bh); ctx.lineTo(sx * bw - sx * 10, bh); ctx.stroke(); }
  ctx.font = 'bold 30px "Cambria Math", serif'; ctx.textAlign = 'center';
  for (let r = 0; r < 2; r++) for (let q = 0; q < 2; q++) ctx.fillText(M[r][q].toFixed(2), (q - 0.5) * 92, (r - 0.5) * 46 + 11);
  ctx.restore();
  ctx.font = 'italic 9px "Cambria Math", serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(230,210,255,.9)';
  ctx.fillText('R(θ) · v  ∈  span{e₁, e₂}', cx, 300);
  // 4) 위로 떠오르는 수식들
  ctx.font = '8px "Cambria Math", serif';
  for (let i = 0; i < 12; i++) {
    const yy = 268 - ((age * 1.4 + i * 41) % (H * 0.9 + 1)), xx = x0 + 12 + ((i * 61) % (w - 24));
    const ga = Math.max(0, Math.min(1, (yy - (272 - H)) / 40)) * 0.85;
    ctx.fillStyle = `rgba(225,200,255,${ga})`; ctx.fillText(MATRIX_GLYPHS[i % MATRIX_GLYPHS.length], xx, yy);
  }
  ctx.restore();
}
function drawMatrixHits() {
  for (let i = matrixHits.length - 1; i >= 0; i--) {
    const h = matrixHits[i], q = Math.max(0, 1 - h.t / (h.gye ? 30 : 26)); h.t--;
    if (h.t <= 0) { matrixHits.splice(i, 1); continue; }
    if (h.gye) { // 결사대: 창 수십 자루가 위로 찌름 + 붉은 충격파 + 막아라!
      const s2 = h.side === 0 ? 1 : -1;
      ctx.save(); ctx.globalAlpha = 1 - q;
      for (let k = 0; k < 9; k++) {
        const sx = h.x + (k - 4) * 12, len = 40 + (1 - Math.abs(k - 4) / 5) * 70 * Math.min(1, q * 6);
        ctx.strokeStyle = '#3a1a10'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, 290); ctx.lineTo(sx + s2 * 6, 290 - len); ctx.stroke();
        ctx.fillStyle = '#ffe0b0'; ctx.shadowColor = '#ff5010'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(sx + s2 * 6, 282 - len - 10); ctx.lineTo(sx + s2 * 6 - 3, 290 - len); ctx.lineTo(sx + s2 * 6 + 3, 290 - len); ctx.fill(); ctx.shadowBlur = 0;
      }
      for (let r = 0; r < 3; r++) { ctx.strokeStyle = `rgba(255,${90 + r * 50},40,.9)`; ctx.lineWidth = 4 - r; ctx.beginPath(); ctx.ellipse(h.x, 272, 20 + q * (90 + r * 30), 6 + q * (22 + r * 6), 0, 0, 7); ctx.stroke(); }
      ctx.restore();
      ctx.save(); ctx.globalAlpha = 1 - q; text('막아라!!', h.x, 196 - q * 24, 20, '#ffdd88'); ctx.restore();
      continue;
    }
    if (h.court) { // 헌법재판소: 법봉 쾅 + 기각!
      ctx.save(); ctx.globalAlpha = 1 - q;
      drawGavel(h.x + 18, 236 + Math.min(1, q * 5) * 18, 1.4, -0.9 + Math.min(1, q * 5) * 0.9, '255,214,80', 1);
      ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(h.x, 270, 20 + q * 70, 5 + q * 16, 0, 0, 7); ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.globalAlpha = 1 - q; text('기각!', h.x, 206 - q * 20, 18, '#ffd84d'); text('OBJECTION SUSTAINED', h.x, 220 - q * 20, 8, '#ffffff'); ctx.restore();
      continue;
    }
    ctx.save(); ctx.globalAlpha = 1 - q;
    // 반사면 (가로 빛 막) + 반사 행렬
    const g = ctx.createLinearGradient(h.x - 80, 0, h.x + 80, 0); g.addColorStop(0, 'rgba(200,150,255,0)'); g.addColorStop(0.5, 'rgba(240,225,255,.95)'); g.addColorStop(1, 'rgba(200,150,255,0)');
    ctx.fillStyle = g; ctx.fillRect(h.x - 80, 266 - q * 4, 160, 4);
    ctx.strokeStyle = '#d9bfff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(h.x, 270, 20 + q * 70, 5 + q * 16, 0, 0, 7); ctx.stroke();
    ctx.translate(h.x, 226 - q * 24); ctx.scale(1 + (1 - Math.min(1, q * 4)) * 0.8, 1 + (1 - Math.min(1, q * 4)) * 0.8);
    ctx.font = 'bold 13px "Cambria Math", serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.shadowColor = '#b07cff'; ctx.shadowBlur = 12;
    ctx.fillText('⎡1   0⎤', 0, -8); ctx.fillText('⎣0  −1⎦ · v', 8, 8);
    ctx.font = 'bold 10px sans-serif'; ctx.fillStyle = '#e6d2ff'; ctx.fillText('REFLECTED', 0, 24);
    ctx.restore();
  }
}

// 강감찬 연쇄 낙뢰: 상대 위치에 예고 원 → 0.6초 뒤 벼락
const strikes = [];
function updateStrikes() {
  for (let i = strikes.length - 1; i >= 0; i--) {
    const st = strikes[i], T = players[st.side];
    st.t--;
    if (st.t === 15) { st.x = T.x; sfx('buzz', 0.4); }                 // 예고: 지금 서 있는 곳
    if (st.t === 0) {
      shake = Math.max(shake, 7); sfx('zap'); sfx('boom', 0.5); effects.push({ x: st.x, y: 268, t: 8 });
      craters.push({ x: st.x, seed: Math.random() * 99, type: 'bolt' });
      if (Math.abs(T.x - st.x) < 34) { T.freezeT = Math.max(T.freezeT || 0, 12); popups.push({ text: '감전!', x: T.x, y: T.y - 50, t: 20, color: '#d6b8ff' }); }
      st.flash = 6;
    }
    if (st.t < 0 && --st.flash <= 0) strikes.splice(i, 1);
  }
}
function boltPath(x0, y0, x1, y1, jag, seed) {
  const pts = [[x0, y0]], n = 10;
  for (let k = 1; k < n; k++) { const q = k / n; pts.push([x0 + (x1 - x0) * q + Math.sin(seed * 13 + k * 7.3) * jag * (1 - q * 0.5), y0 + (y1 - y0) * q]); }
  pts.push([x1, y1]); return pts;
}
function strokeBolt(pts, w, col) {
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => ctx[i ? 'lineTo' : 'moveTo'](x, y)); ctx.stroke();
}
function drawStrikes() {
  if (strikes.length) { // 먹구름
    const g = ctx.createLinearGradient(0, -40, 0, 70); g.addColorStop(0, 'rgba(25,10,45,.85)'); g.addColorStop(1, 'rgba(25,10,45,0)');
    ctx.fillStyle = g; ctx.fillRect(-100, -60, 700, 140);
    for (let i = 0; i < 9; i++) { ctx.fillStyle = 'rgba(45,25,70,.6)'; ctx.beginPath(); ctx.ellipse(20 + i * 50 + Math.sin(i + performance.now() / 900) * 8, 6 + (i % 2) * 8, 40, 14, 0, 0, 7); ctx.fill(); }
  }
  for (const st of strikes) {
    if (st.x === null) continue;
    if (st.t > 0) { // 예고: 회전하는 진 + 龜 + 작은 전기
      const k = 1 - st.t / 15;
      ctx.save(); ctx.translate(st.x, 272); ctx.scale(1, 0.25); ctx.rotate(performance.now() / 200);
      ctx.strokeStyle = `rgba(210,170,255,${0.5 + k * 0.5})`; ctx.lineWidth = 3; ctx.shadowColor = '#b98cff'; ctx.shadowBlur = 12;
      for (const r of [34, 26]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); }
      for (let i = 0; i < 6; i++) { const an = (i / 6) * 6.28; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 26, Math.sin(an) * 26); ctx.lineTo(Math.cos(an + 1.05) * 26, Math.sin(an + 1.05) * 26); ctx.stroke(); }
      ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.4 + k * 0.6; brushText('龜', st.x, 262, 14, '#e6d2ff'); ctx.restore();
      if (Math.random() < 0.5) { ctx.save(); ctx.shadowColor = '#b98cff'; ctx.shadowBlur = 8; strokeBolt(boltPath(st.x + (Math.random() - 0.5) * 50, 0, st.x + (Math.random() - 0.5) * 30, 40 + Math.random() * 40, 10, Math.random() * 9), 1, 'rgba(220,200,255,.6)'); ctx.restore(); }
    } else { // 낙뢰: 굵은 본줄기 + 가지 3개 + 바닥 방전
      const seed = st.x * 0.37, f = st.flash / 6;
      ctx.save(); ctx.shadowColor = '#b98cff'; ctx.shadowBlur = 24;
      const main = boltPath(st.x + Math.sin(seed) * 20, -20, st.x, 272, 22, seed);
      strokeBolt(main, 10 * f + 2, 'rgba(185,140,255,.55)'); strokeBolt(main, 4 * f + 1.5, '#ffffff');
      for (let b = 0; b < 3; b++) { const [bx, by] = main[3 + b * 2]; strokeBolt(boltPath(bx, by, bx + Math.sin(seed + b * 2) * 60, by + 50 + b * 10, 10, seed + b), 1.5 * f + 0.5, 'rgba(235,220,255,.9)'); }
      for (let b = 0; b < 6; b++) { const an = Math.PI + (b / 5) * Math.PI; strokeBolt(boltPath(st.x, 272, st.x + Math.cos(an) * 40, 272 + Math.sin(an) * 12 - 4, 5, seed + b * 3), 1.2, 'rgba(230,210,255,.85)'); }
      ctx.restore();
      ctx.fillStyle = `rgba(230,210,255,${f * 0.55})`; ctx.fillRect(-100, -100, 700, 500);
      ctx.save(); ctx.globalAlpha = f; ctx.strokeStyle = '#d9c2ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(st.x, 272, 30 + (1 - f) * 60, 7 + (1 - f) * 14, 0, 0, 7); ctx.stroke(); ctx.restore();
    }
  }
}

// 프랙탈 분신 공 (진짜처럼 보이지만 아무것도 안 함)
const fakes = [];
function updateFakes() {
  for (const f of fakes) { if (f.arrowDelay > 0) { f.arrowDelay--; continue; } if (f.x + f.vx < BALL_R || f.x + f.vx > GW) f.vx = -f.vx; f.x += f.vx; f.y += f.vy; f.vy += 1; f.rot += f.vx * 0.06; }
  for (let i = fakes.length - 1; i >= 0; i--) if (fakes[i].y > BALL_GROUND_Y) { effects.push({ x: fakes[i].x, y: 270, t: 4 }); fakes.splice(i, 1); }
}
function drawArrowStreak(x, y, vx, vy) {
  const sp = Math.hypot(vx, vy) || 1, ux = vx / sp, uy = vy / sp, L = 70;
  ctx.save();
  const g = ctx.createLinearGradient(x - ux * L, y - uy * L, x, y); g.addColorStop(0, 'rgba(90,150,255,0)'); g.addColorStop(1, 'rgba(200,225,255,.95)');
  ctx.strokeStyle = g; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.shadowColor = '#5a96ff'; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.moveTo(x - ux * L, y - uy * L); ctx.lineTo(x, y); ctx.stroke();
  ctx.fillStyle = '#eaf2ff'; ctx.beginPath(); ctx.moveTo(x + ux * 30, y + uy * 30); ctx.lineTo(x + ux * 16 - uy * 9, y + uy * 16 + ux * 9); ctx.lineTo(x + ux * 16 + uy * 9, y + uy * 16 - ux * 9); ctx.fill(); // 화살촉
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5; ctx.shadowBlur = 0;
  for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x - ux * L * 0.8, y - uy * L * 0.8); ctx.lineTo(x - ux * (L * 0.8 + 10) + sgn * uy * 8, y - uy * (L * 0.8 + 10) - sgn * ux * 8); ctx.stroke(); } // 깃털
  ctx.restore();
}
function drawFakes() {
  for (const f of fakes) { if (f.arrow && !(f.arrowDelay > 0)) drawArrowStreak(f.x, f.y, f.vx, f.vy); const r = ball.rot; ball.rot = f.rot; drawBallAt(f.x, f.y, 1); ball.rot = r; }
  if (ball.arrowT > 0) drawArrowStreak(ball.x, ball.y, ball.vx, ball.vy);
}
function skillRelease(c, src, key) {
  const P = c.caster, T = c.target;
  const [msg, col, aim, N] = SKILL_FX[key](P, T);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  const tx = { far: T.x - mn > mx - T.x ? mn : mx, mid: (mn + mx) / 2, at: T.x, near: T.x + (Math.random() - 0.5) * 70,
    back: T.side === 0 ? mn : mx, side: T.x + (Math.random() < 0.5 ? -1 : 1) * 60 }[aim];
  ball.x = Math.max(BALL_R, Math.min(GW - BALL_R, src.x)); ball.y = Math.max(12, src.y);
  P.state = JUMP; P.vy = 0;
  releaseBall(Math.max(mn, Math.min(mx, tx)), N);
  for (const f of fakes) if (f.arrowDelay) { f.x = ball.x; f.y = ball.y; const spread = (f.arrowDelay - 6) * 0.9; f.vx = ball.vx * (1 + spread * 0.08); f.vy = ball.vy + spread; }
  if (key === 'arrow') { heroStamp('百發百中', '#2a56c6'); ball.arrowT = 40; fakes.forEach((f) => (f.arrow = true)); }
  if (key === 'thunder') heroStamp('龜州大捷', '#7b4dd6');
  if (key === 'hangul') heroStamp('訓民正音', '#b8860b');
  if (key === 'fractal') for (const f of [0.55, 0.8, 1.3]) fakes.push({ x: ball.x, y: ball.y, vx: ball.vx * f, vy: ball.vy * (2 - f) * 0.9, rot: 0 }); // 진짜랑 똑같이 생긴 분신 공
  popups.push({ text: msg, x: GW / 2, y: 168, t: 50, color: col });
  cine = null;
}
function pinBounce() {
  if (pinT <= 0) return;
  ball.vx = Math.sign(ball.vx) * Math.min(34, Math.abs(ball.vx) * 1.22); ball.vy *= 1.1;
  heavy(ball.x, ball.y, 0.8); sfx('snap');
  popups.push({ text: 'BOUNCE!', x: ball.x, y: ball.y - 20, t: 20, color: '#ff3048' });
}
// 위인 스킬 순간: 화면 가운데 거대 붓글씨 + 먹 튐 + 낙관
const stamps = [];
function heroStamp(str, col) { stamps.length = 0; stamps.push({ str, col, t: 30, seed: Math.random() * 9 }); }
function drawStamps() {
  for (let i = stamps.length - 1; i >= 0; i--) {
    const st = stamps[i]; st.t--;
    if (st.t <= 0) { stamps.splice(i, 1); continue; }
    const age = 30 - st.t, k = Math.min(1, age / 4), sc = 1 + (1 - k) * 1.6, a = Math.min(1, st.t / 10) * 0.85;
    ctx.save(); ctx.globalAlpha = a;
    const bg = ctx.createRadialGradient(GW / 2, GH / 2 - 26, 10, GW / 2, GH / 2 - 26, 120); bg.addColorStop(0, 'rgba(245,232,205,.75)'); bg.addColorStop(1, 'rgba(245,232,205,0)');
    ctx.fillStyle = bg; ctx.fillRect(GW / 2 - 130, GH / 2 - 100, 260, 150); // 한지 빛
    ctx.translate(GW / 2, GH / 2 - 40); ctx.scale(sc, sc); ctx.rotate(-0.05);
    brushText(st.str, 0, 12, st.str.length > 2 ? 30 : 44, st.col);
    ctx.restore();
    if (age > 5) { ctx.save(); ctx.globalAlpha = a; seal(GW / 2 + (st.str.length > 2 ? 80 : 62), GH / 2 - 28, '歷史王者'); ctx.restore(); }
  }
}
function drawStatusFX() {
  drawStamps();
  for (const p of players) if (p.blindT > 0) { // 눈부심: 그 사람 쪽 화면이 하얗게
    const a = Math.min(1, p.blindT / 12) * 0.94; // 거의 차단 (아주 살짝 비침)
    const x0 = p.side === 0 ? 0 : GW / 2;
    const g = ctx.createRadialGradient(x0 + GW / 4, GH / 2, 20, x0 + GW / 4, GH / 2, GW / 2);
    g.addColorStop(0, `rgba(255,254,246,${a})`); g.addColorStop(1, `rgba(255,246,215,${a})`);
    ctx.fillStyle = g; ctx.fillRect(x0, 0, GW / 2, GH);
    text('FLASHBANG: BLIND', x0 + GW / 4, 60, 10, '#b08000');
  }
  if (pinT > 0) { const a = Math.min(1, pinT / 15) * (0.5 + Math.sin(pinT * 0.6) * 0.2); ctx.strokeStyle = `rgba(255,40,60,${a})`; ctx.lineWidth = 3; ctx.strokeRect(1.5, 1.5, GW - 3, GH - 3); text('PINBALL MODE', GW / 2, GH - 8, 9, `rgba(255,80,90,${a})`); }
}
function drawStatusIcons(p) {
  const y = hitTop(p) - 18;
  if (p.confuseT > 0) text(p.confRev ? '⇄ 반대!' : '→ 정상', p.x, y, p.confRev ? 9 : 8, p.confRev ? '#ff5060' : '#bbbbbb');
  else if (p.freezeT > 0) text('?!', p.x, y, 12, '#ffffff');
  else if (p.flatT > 0) text('납작', p.x, p.y + 10, 8, '#ffb070');
  else if (p.blindT > 0) text('★ 눈부심', p.x, y, 8, '#ffd84d');
  else if (p.nojumpT > 0) text('F 점프 금지', p.x, y, 8, '#ff4040');
  else if (p.weakT > 0) text('⚖ 위헌', p.x, y, 8, '#ffffff');
  else if (p.pullT > 20) text('◎ 특이점', p.x, y, 8, '#ff5ad1');
  else if (p.fastT > 0) text('자유 ▶▶', p.x, y, 8, '#78dcc8');
  else if (p.lagT > 0) text('∿ 조작 지연', p.x, y, 8, '#5aa8ff');
  else if (p.manaLockT > 0) text('🔒 탄핵: 마나 봉인', p.x, y, 8, '#ffd84d');
  else if (p.slowT > 0) text('🐢 감속', p.x, y, 8, '#3cf0ff');
  if (p.ampT > 0) text('♒ 증폭', p.x, y - 10, 8, '#5aa8ff');
  if (p.matrixGuard && p.guardT > 0) text('[ 행렬 방패 ]', p.x, y - 10, 8, '#c896ff');
  if (p.jumpT > 0) text('자유 점프 ▲', p.x, y - 20, 8, '#78dcc8');
  if (p.sightT > 0) for (let i = 0; i < 5; i++) { const an = performance.now() / 600 + (i / 5) * 6.28; ctx.save(); ctx.globalAlpha = 0.85; brushText(JAMO[(i * 5 + 3) % JAMO.length], p.x + Math.cos(an) * 26, p.y - 10 + Math.sin(an) * 18, 10, '#d9a520'); ctx.restore(); } // 자모 오라
  if (p.sightT > 0 && !cine) {
    // 해례본: 공이 떨어질 곳 미리 보기
    let x = ball.x, yy = ball.y, vx = ball.vx, vy = ball.vy;
    for (let i = 0; i < 80 && yy < BALL_GROUND_Y; i++) { if (x + vx < BALL_R || x + vx > GW) vx = -vx; x += vx; yy += vy; vy += 1; }
    if ((x < NET_X) === (p.side === 0)) {
      const tt = performance.now() / 400;
      ctx.save();
      const pg = ctx.createLinearGradient(0, 120, 0, 276); pg.addColorStop(0, 'rgba(255,215,90,0)'); pg.addColorStop(1, 'rgba(255,215,90,.45)');
      ctx.fillStyle = pg; ctx.fillRect(x - 10, 120, 20, 156); // 빛기둥
      ctx.translate(x, 274); ctx.scale(1, 0.28); ctx.rotate(tt);
      ctx.strokeStyle = 'rgba(255,210,90,.95)'; ctx.lineWidth = 3; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 10;
      for (const r of [26, 18]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); }
      ctx.restore();
      for (let i = 0; i < 6; i++) { const an = tt * 1.4 + (i / 6) * 6.28; brushText(JAMO[(i * 4) % JAMO.length], x + Math.cos(an) * 30, 270 + Math.sin(an) * 8, 9, '#ffe08a'); }
      text('여기!', x, 236 + Math.sin(tt * 3) * 2, 9, '#ffe08a');
    }
  }
}

// ----- 장민욱 (신화) 3초 시네마틱 3종 -----
const JM_C1 = 20, JM_END = 75;
const JM_SKILLS = [
  { key: 'meteor', title: '운석 강타: 썅 운석 낙하', en: 'Meteor Foul Smash', col: '255,90,30', fire: 50, hit: 62,
    line: '"이 개★들아! 운석이나 처맞고 찌그러져라!!"' },
  { key: 'pinball', title: '10단 반사: 초고속 핀볼 스파이크', en: 'Ten-Bounce Pinball', col: '255,40,60', fire: 20, hit: 58,
    line: '"어디로 튈지 감도 못 잡지? ★신들아!"' },
  { key: 'sonic', title: '음파 폭격: 욕설 파동 페인트', en: 'Acoustic Rage Drop', col: '255,214,40', fire: 52, hit: 68,
    line: '"똑바로 안 막냐, 똑바로!! 으아아악!"' },
];
const JM_TAUNT = {
  block: '그따위 스파이크 치우라고 몇 번을 말하냐?!',
  error: '눈은 뒀다 어디 쓰냐? 발로 차도 그거보단 낫겠다!',
  win: '실력도 없으면서 까불고 있어, 다음 판 가져와!',
};
const CENSOR = '!@#$%^&*';
const jmMouth = (P) => ({ x: P.x + (P.side === 0 ? -6 : 6), y: P.y - 10 });

function jmSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1;
  return { x: P.x + s * 26, y: P.y - 34 };
}
// 핀볼 경로: 내 쪽 벽 → 천장 → 상대 쪽 벽 → 상대 코트 구석
// 핀볼 경로: 벽·천장을 미친 듯이 여러 번 (연출용) → 마지막은 내 쪽 천장 근처
const PIN_SEG = 3; // 한 번 튕기는 데 걸리는 프레임
function jmPinPts(c) {
  if (c.pins) return c.pins;
  const P = c.caster, s = P.side === 0 ? 1 : -1, pts = [c.src];
  const L = BALL_R, R = GW - BALL_R, TOP = BALL_R;
  let last = '';
  for (let i = 0; i < 10; i++) {
    const opts = ['L', 'R', 'T'].filter((o) => o !== last);
    const o = opts[Math.floor(Math.random() * opts.length)]; last = o;
    pts.push(o === 'L' ? { x: L, y: 30 + Math.random() * 170 } : o === 'R' ? { x: R, y: 30 + Math.random() * 170 } : { x: 40 + Math.random() * 352, y: TOP });
  }
  pts.push({ x: NET_X - s * (60 + Math.random() * 80), y: TOP }); // 마지막: 내 쪽 천장 → 여기서 진짜 공으로
  return (c.pins = pts);
}
// 상대 쪽 뒷벽을 맞고 꺾여서 상대 코트에 떨어지는 빠른 공 찾기
function pinRelease(c) {
  const T = c.target, s = c.caster.side === 0 ? 1 : -1;
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  const want = mn + Math.random() * (mx - mn);
  let best = null;
  const m = 1.25;
  for (let vx = 20; vx <= 30; vx++) for (let vy = -2; vy <= 10; vy += 0.5) {
    let x = ball.x, y = ball.y, ux = s * vx, uy = vy, ok = true, hitWall = false;
    for (let i = 0; i < 80 && y < BALL_GROUND_Y; i++) {
      if (x + ux * m < BALL_R || x + ux * m > GW) { ux = -ux; ux = Math.sign(ux) * Math.min(34, Math.abs(ux) * 1.22); uy *= 1.1; hitWall = true; }
      if (y + uy * m < 0) { ok = false; break; }
      if (Math.abs(x - NET_X) < NET_HW + 2 && y > NET_TOP - 2) { ok = false; break; }
      x += ux * m; y += uy * m; uy += m;
    }
    if (!ok || !hitWall || (x < NET_X) !== (T.side === 0)) continue;
    const d = Math.abs(x - want);
    if (!best || d < best.d) best = { d, vx: s * vx, vy };
  }
  if (best) { ball.vx = best.vx; ball.vy = best.vy; ball.flight = null; ball.unblockable = false; ball.power = true; ball.fx = null; ball.ribbon = []; ball.trail = []; }
  else releaseBall(c.tx, 8);
}

function updateJm() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, FIRE = c.sk.fire, HIT = c.sk.hit;
  c.t++;
  const t = c.t;
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.sparks = []; c.waves = []; c.bounces = [];
    c.lift = { meteor: 90, pinball: 70, sonic: 80 }[k]; c.y0 = P.y;
    c.tx = k === 'sonic' ? NET_X + s * 50 : k === 'pinball' ? (T.side === 0 ? 40 : GW - 40) : Math.max(T.side === 0 ? 50 : 262, Math.min(T.side === 0 ? 170 : 382, T.x));
    c.src = jmSource(c);
  }
  const ly = P_GROUND_Y - c.lift;
  if (t <= 14) { const q = t / 14; P.y = c.y0 + (ly - c.y0) * (1 - (1 - q) * (1 - q)); } else P.y = ly + Math.sin(t * 0.9) * (t > JM_C1 && t < FIRE ? 0.8 : 0);
  P.state = JUMP; P.vy = 0;
  if (t === 1) sfx(k === 'meteor' ? 'rumble' : k === 'pinball' ? 'zap' : 'whoosh');
  // 삐-!
  if (k !== 'pinball' && t === JM_C1 + 4) { sfx('beep', 0.6, 0.6); shake = Math.max(shake, 6); }
  if (k === 'pinball' && t === 8) { sfx('beep', 0.5, 0.5); }
  // 음파 링
  if (k === 'sonic' && t > JM_C1 && t < 50 && t % 5 === 0) { c.waves.push({ r: 6, t: 0 }); shake = Math.max(shake, 5); }
  for (const w of c.waves) { w.t++; w.r += 6; }
  c.waves = c.waves.filter((w) => w.t < 40);
  for (const p of c.sparks) { p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.t--; }
  c.sparks = c.sparks.filter((p) => p.t > 0);
  // 응축 (핀볼은 처음부터 바로 침)
  if (k !== 'pinball') { if (t === FIRE - 12) sfx('charge'); if (t === FIRE - 1) { hitStop = 3; sfx('suck'); } }
  else if (t === FIRE - 1) { hitStop = 3; sfx('suck'); }
  const src = c.src;
  if (t < FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.3; }
  if (t === FIRE && k !== 'pinball') {
    heavy(src.x, src.y, k === 'sonic' ? 0.9 : 2.4); sfx('flight', 1, 0.6);
    P.state = JUMP; P.vy = 0; ball.x = src.x; ball.y = src.y;
    if (k === 'meteor') { sfx('explode'); T.flatT = 75; T.flat = true; const [mn, mx] = T.side === 0 ? [50, 170] : [262, 382]; releaseBall(Math.max(mn, Math.min(mx, T.x + (Math.random() - 0.5) * 80)), 14); }
    else { T.confuseT = 100; T.confRev = true; T.confNext = 18; T.freezeT = 8; T.shrinkT = 100; T.shrinkK = 0.65; releaseBall(c.tx, 16); } // 4초 좌우 반대 + 움찔
    cine = null; return;
  }
  if (t === FIRE) { heavy(src.x, src.y, 2.0); sfx('flight', 1, 1.2); if (k === 'pinball') { ball.miniT = 100; sfx('zap'); } }
  if (k === 'pinball' && t > FIRE && ball.miniT > 0) ball.miniT--;
  if (k === 'pinball' && t > FIRE) {
    // 연출: 벽·천장을 미친 듯이 튕김 → 마지막에 상대 뒷벽 맞고 꺾이는 진짜 공 (+7초 핀볼 버프)
    const pts = jmPinPts(c), nSeg = pts.length - 1, i = Math.min(nSeg - 1, Math.floor((t - FIRE - 1e-6) / PIN_SEG)), qq = Math.min(1, ((t - FIRE) - i * PIN_SEG) / PIN_SEG);
    const a = pts[i], b = pts[i + 1], px = ball.x, py = ball.y;
    ball.x = a.x + (b.x - a.x) * qq; ball.y = a.y + (b.y - a.y) * qq; ball.vx = ball.x - px; ball.vy = ball.y - py; ball.rot += 0.9;
    ball.fx = c.sk.col; pushRibbon(px, py);
    if (qq >= 1 && !c.bounces.some((bb) => bb.n === i + 1)) {
      c.bounces.push({ x: b.x, y: b.y, n: i + 1, t });
      shake = Math.max(shake, 5); sfx('snap', 0.6); effects.push({ x: b.x, y: b.y, t: 6 });
      for (let j = 0; j < 10; j++) { const an = Math.random() * 6.28, sp = 2 + Math.random() * 5; c.sparks.push({ x: b.x, y: b.y, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp, t: 14 }); }
      if (i === nSeg - 1) { heavy(b.x, b.y, 1.6); pinT = 175; T.shrinkT = 175; T.shrinkK = 0.94; P.state = JUMP; P.vy = 0; pinRelease(c); cine = null; }
    }
  }
}

function jmCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME, FIRE = c.sk.fire;
  if (!c.init) return H;
  const ly = P_GROUND_Y - c.lift, m = { x: P.x + (P.side === 0 ? -11 : 11), y: ly - 8 };
  let keys;
  if (k === 'meteor') keys = [[0, { x: P.x, y: 230, z: 1.5, r: s * 0.06 }], [JM_C1, { x: P.x - s * 30, y: 90, z: 1.3, r: -s * 0.05 }], // 밑에서 위로 솟구침
    [JM_C1 + 4, { x: m.x, y: m.y - 4, z: 4.2 }], [FIRE - 2, { x: m.x, y: m.y - 4, z: 4.6, r: s * 0.03 }], [FIRE + 2, H]];
  else if (k === 'pinball') keys = [[0, H], [6, { x: P.x + s * 10, y: ly - 20, z: 2.4, r: s * 0.05 }], [FIRE, { x: P.x + s * 20, y: ly - 20, z: 2.0 }],
    [FIRE + 4, { x: 216, y: 140, z: 0.92 }], [c.sk.hit - 4, { x: 216, y: 140, z: 0.95 }], [c.sk.hit + 2, { x: c.tx, y: 220, z: 1.6 }], [JM_END, H]];
  else keys = [[0, H], [JM_C1, { x: P.x, y: ly - 10, z: 1.6 }],                                                // 정면 풀샷
    [JM_C1 + 4, { x: m.x, y: m.y, z: 3.6 }], [FIRE - 2, { x: m.x, y: m.y, z: 4.0 }], [FIRE + 2, H]];
  keys.push([JM_END, H]);
  const cam = camKeys(t, keys);
  if (k === 'pinball') return cam;
  return withFollow(c, cam, FIRE, c.sk.hit);
}

function drawMeteorRock(x, y, r, t, a = 1) {
  ctx.save(); ctx.globalAlpha = a;
  // 불꼬리
  for (let i = 6; i > 0; i--) { ctx.fillStyle = `rgba(255,${80 + i * 20},20,${0.12 * (7 - i) / 6 + 0.05})`; ctx.beginPath(); ctx.arc(x - i * r * 0.35, y - i * r * 0.5, r * (1 + i * 0.12), 0, 7); ctx.fill(); }
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
  g.addColorStop(0, '#ffe08a'); g.addColorStop(0.35, '#ff7a1a'); g.addColorStop(0.7, '#7a1a08'); g.addColorStop(1, '#2a0804');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,200,80,.85)'; ctx.lineWidth = 1.5;                       // 용암 금
  for (let i = 0; i < 5; i++) { const an = i * 1.3 + t * 0.02; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r * 0.2, y + Math.sin(an) * r * 0.2); ctx.lineTo(x + Math.cos(an + 0.4) * r * 0.75, y + Math.sin(an + 0.4) * r * 0.75); ctx.stroke(); }
  ctx.restore();
}
function drawCensor(x, y, w, t, str = '@#$%!') {
  ctx.save(); ctx.translate(x + (Math.random() - 0.5) * 1.5, y);
  ctx.fillStyle = '#d0101a'; ctx.fillRect(-w / 2, -w * 0.22, w, w * 0.44);
  ctx.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 4; i++) ctx.fillRect(-w / 2 + (i * w) / 4, -w * 0.22, w / 8, w * 0.44); // 모자이크 느낌
  ctx.font = `bold ${w * 0.3}px monospace`; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.fillText(str, 0, w * 0.1);
  ctx.restore();
}
function drawVeins(x, y, sc, a) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a; ctx.strokeStyle = '#e0101a'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(-1, -1); ctx.moveTo(4, -4); ctx.lineTo(1, -1); ctx.moveTo(-4, 4); ctx.lineTo(-1, 1); ctx.moveTo(4, 4); ctx.lineTo(1, 1); ctx.stroke(); // 💢
  ctx.restore();
}

function drawJmWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key, FIRE = sk.fire, HIT = sk.hit;
  if (!c.init) return;
  const k = t > JM_END - 6 ? (JM_END - t) / 6 : Math.min(1, t / 6);
  if (key === 'meteor') {
    const g = ctx.createLinearGradient(0, -200, 0, 300); g.addColorStop(0, `rgba(60,0,6,${0.85 * k})`); g.addColorStop(1, `rgba(140,30,0,${0.6 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    // 거대 운석: 컷1 강림 → 공과 함께 내리꽂힘
    if (t < HIT) {
      let mx, my, r = 46;
      if (t < FIRE) { const q = Math.min(1, t / JM_C1); mx = P.x - s * 70 + (1 - q) * -s * 120; my = -40 - (1 - q) * 160; }
      else { const q = EASE.heavy((t - FIRE) / (HIT - FIRE)); mx = (P.x - s * 70) + (c.tx - (P.x - s * 70)) * q; my = -40 + (230 - -40) * q; }
      drawMeteorRock(mx, my, r, t);
    }
  }
  if (key === 'pinball') {
    ctx.fillStyle = `rgba(14,0,4,${0.82 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    // 붉은 레이저 격자 벽/천장
    const gk = Math.min(1, t / 10);
    ctx.save(); ctx.globalAlpha = gk * k; ctx.strokeStyle = 'rgba(255,40,60,.55)'; ctx.lineWidth = 0.8; ctx.shadowColor = '#ff2840'; ctx.shadowBlur = 6;
    for (let x = 0; x <= GW; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 8); ctx.stroke(); }
    for (let y = 0; y <= 272; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(8, y); ctx.moveTo(GW, y); ctx.lineTo(GW - 8, y); ctx.stroke(); }
    ctx.lineWidth = 2; ctx.strokeStyle = '#ff2840'; ctx.strokeRect(1, 1, GW - 2, 272);
    for (let x = 24; x < GW; x += 48) { ctx.globalAlpha = gk * k * 0.25; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 272); ctx.stroke(); }
    ctx.restore();
    // 예측선 (지그재그 잔상)
    if (t >= FIRE) { const pts = jmPinPts(c).slice(0, Math.floor((t - FIRE) / PIN_SEG) + 2); ctx.save(); ctx.strokeStyle = 'rgba(255,60,80,.45)'; ctx.shadowColor = '#ff2840'; ctx.shadowBlur = 6; ctx.lineWidth = 1.5; ctx.beginPath(); pts.slice(0, -1).forEach((p, i) => ctx[i ? 'lineTo' : 'moveTo'](p.x, p.y)); ctx.lineTo(ball.x, ball.y); ctx.stroke(); ctx.restore(); } // 지그재그 잔상
    for (const b of c.bounces) { const a = Math.max(0, 1 - (t - b.t) / 10); if (a <= 0) continue; ctx.fillStyle = `rgba(255,255,255,${a * 0.6})`; ctx.beginPath(); ctx.arc(b.x, b.y, 14 + (t - b.t) * 2, 0, 7); ctx.fill(); text('BOUNCE ' + b.n, b.x + (b.x < 100 ? 34 : b.x > 330 ? -34 : 0), b.y + (b.y < 30 ? 26 : 0) - (t - b.t) * 0.6, 11, '#ff3048'); }
  }
  if (key === 'sonic') {
    const g = ctx.createRadialGradient(P.x, P.y - 10, 10, P.x, P.y - 10, 300); g.addColorStop(0, `rgba(70,20,90,${0.6 * k})`); g.addColorStop(1, `rgba(20,0,30,${0.88 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    const m = jmMouth(P);
    for (const w of c.waves) {
      ctx.save(); ctx.strokeStyle = `rgba(255,40,60,${Math.max(0, 0.8 - w.t / 40)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(m.x, m.y, w.r, 0, 7); ctx.stroke();
      ctx.font = 'bold 9px monospace'; ctx.fillStyle = `rgba(255,214,40,${Math.max(0, 1 - w.t / 40)})`; ctx.textAlign = 'center';
      for (let i = 0; i < 8; i++) { const an = (i / 8) * 6.28 + w.r * 0.01; ctx.fillText(CENSOR[i], m.x + Math.cos(an) * w.r, m.y + Math.sin(an) * w.r); }
      ctx.restore();
    }
  }
  // 응축
  if (key !== 'pinball' && t > FIRE - 12 && t < FIRE) chargeFX(c.src.x, c.src.y, (t - (FIRE - 12)) / 12, sk.col);
  // 분노 오라 + 인물
  const gl = ctx.createRadialGradient(P.x, P.y - 6, 4, P.x, P.y - 6, 54); gl.addColorStop(0, `rgba(220,20,20,.55)`); gl.addColorStop(1, 'rgba(120,0,0,0)');
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 6, 54 + Math.sin(t * 0.7) * 3, 0, 7); ctx.fill();
  ctx.save(); if (t > JM_C1 && t < FIRE) ctx.translate((Math.random() - 0.5) * 1.2, 0); drawPlayer(P); ctx.restore();
  if (t > 8 && t < JM_END - 4) { drawVeins(P.x + (P.side === 0 ? 9 : -9), P.y - 19, 0.55 + Math.sin(t * 0.8) * 0.06, Math.min(1, (t - 8) / 6)); }
  if (t >= JM_C1 && t < Math.min(FIRE + 10, JM_END - 2) && key !== 'pinball' || (key === 'pinball' && t >= 6 && t < 30)) { const m = jmMouth(P); drawCensor(m.x, m.y, 18, t); }
  // 상대
  if (c.flat && t > c.flat) { // 종이처럼 납작
    const q = Math.min(1, (t - c.flat) / 4);
    ctx.save(); ctx.translate(T.x, P_GROUND_Y + 32); ctx.scale(1 + 0.6 * q, 1 - 0.8 * q); ctx.translate(-T.x, -(P_GROUND_Y + 32)); drawPlayer(T); ctx.restore();
    stickman(T.x, 274, 1.6 * q, Math.PI / 2, '#222', 0.5 * q);
  } else if (c.spin && t > c.spin) { // 팽이처럼 빙글
    ctx.save(); ctx.translate(T.x, T.y); ctx.scale(Math.cos((t - c.spin) * 0.7), 1); ctx.translate(-T.x, -T.y); drawPlayer(T); ctx.restore();
    text('@  @', T.x, T.y - 8, 12, '#ffe066');
  } else if (key === 'pinball' && t > FIRE && t < HIT) { // 공 따라 고개 팽팽
    ctx.save(); ctx.translate(T.x, T.y); ctx.scale(ball.x > T.x ? 1 : -1, 1); ctx.translate(-T.x, -T.y); drawPlayer(T); ctx.restore();
  } else if (key === 'sonic' && t >= 30) { ctx.save(); ctx.translate((Math.random() - 0.5) * 2, 0); drawPlayer(T); ctx.restore(); }
  else drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  if (key === 'sonic' && t >= 30 && Math.floor(t / 3) % 2 === 0) { ctx.fillStyle = 'rgba(80,0,0,.85)'; ctx.fillRect(T.x - 58, T.y - 78, 116, 15); text('CONFUSED: 삐- 소리 환청', T.x, T.y - 67, 8, '#ff5060'); }
  for (const p of c.sparks) { ctx.fillStyle = `rgba(255,${200 + (p.t % 3) * 20},200,${p.t / 26 + 0.2})`; ctx.fillRect(p.x, p.y, 2, 2); }
  drawBall();
}

function drawJmUI(c) {
  const t = c.t, sk = c.sk, key = sk.key, FIRE = sk.fire, HIT = sk.hit;
  if (!c.init) return;
  const k = t > JM_END - 6 ? (JM_END - t) / 6 : Math.min(1, t / 6);
  if (key === 'meteor' && t >= FIRE - 4 && t < HIT + 2 && Math.floor(t / 3) % 2 === 0) {
    ctx.fillStyle = 'rgba(120,0,0,.7)'; ctx.fillRect(GW / 2 - 120, GH / 2 - 22, 240, 32); ctx.strokeStyle = '#ff2030'; ctx.lineWidth = 2; ctx.strokeRect(GW / 2 - 120, GH / 2 - 22, 240, 32);
    neon('WARNING: METEOR IMPACT', GW / 2, GH / 2, 15, '#ff3040');
  }
  if (key === 'meteor' && t >= HIT && t < HIT + 3) { ctx.fillStyle = `rgba(255,180,80,${0.7 - (t - HIT) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
  if (key === 'pinball' && t > FIRE && t < HIT) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgba(255,30,50,.06)'; for (let y = (t * 7) % 12; y < GH; y += 12) ctx.fillRect(0, y, GW, 2); ctx.restore(); }
  if (key === 'sonic' && t > JM_C1 && t < 50 && t % 4 < 2) { ctx.fillStyle = 'rgba(255,214,40,.08)'; ctx.fillRect(0, 0, GW, GH); }
  // 삐- 자막
  const beepOn = key === 'pinball' ? t >= 8 && t < 22 : t >= JM_C1 + 4 && t < JM_C1 + 18;
  if (beepOn) { ctx.save(); ctx.translate(GW - 70, 70); ctx.rotate(0.12); ctx.fillStyle = '#d0101a'; ctx.fillRect(-36, -14, 72, 24); text('BEEP-!', 0, 4, 14, '#fff'); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  text(sk.title, GW / 2, 22, 12, `rgb(${sk.col})`);
  text(sk.en, GW / 2, 34, 8, '#fff');
  const st = key === 'pinball' ? 4 : 6;
  if (t >= st) {
    const n = Math.max(0, Math.min(sk.line.length, Math.floor((t - st) * 1.5)));
    ctx.font = 'bold 11px "Malgun Gothic", sans-serif';
    const w = ctx.measureText(sk.line).width + 16;
    ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(GW / 2 - w / 2, 262, w, 17);
    text(sk.line.slice(0, n), GW / 2, 274, 11, '#fff');
  }
  ctx.restore();
}

// ----- 문경목 (신화) 3초 시네마틱 3종 -----
// 0~20 컷1 · 20~50 컷2 · 50~75 컷3 (발사 50)
const GM_C1 = 20, GM_FIRE = 50, GM_END = 75;
let FEINT_N = 16, FEINT_DX = 46, FEINT_FREEZE = 12; // 낙엽 페인트(헤어핀) 난이도
const GM_SKILLS = [
  { key: 'flash', title: '두피 반사: 태양의 탈모 빔', en: 'Solar Scalp Flash', col: '255,236,160', hit: 62,
    line: '"빛이여... 저들의 모근을 위협하라!"' },
  { key: 'grade3', title: '3등급의 기상: 애매한 연도 판정', en: 'Grade 3 History Drop', col: '255,214,60', hit: 70,
    line: '"살수대첩이 612년... 맞나? 몰라, 3등급이면 선방했어!"' },
  { key: 'feint', title: '모근 탈출: 비가의 낙엽 페인트', en: 'Hair Root Escape', col: '255,140,60', hit: 68,
    line: '"모근이 빠져나가는 그 짧은 찰나... 득점이다."' },
];
const GM_TAUNT = {
  block: '내 머리 스타일만큼이나 단정하고 깔끔한 차단이다.',
  error: '한국사 4등급 이하 근접 금지.',
  win: '샴푸값 아꼈으니 득점으로 보상받는다.',
};

function gmSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  if (k === 'flash') return { x: P.x + s * 8, y: P.y - 58 };
  if (k === 'grade3') return { x: P.x + s * 24, y: P.y - 30 };
  return { x: NET_X - s * 10, y: P.y - 50 }; // 페인트: 네트 바로 위
}

function updateGm() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  c.t++;
  const t = c.t;
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.parts = []; c.pix = [];
    c.lift = { flash: 0, grade3: 60, feint: 125 }[k];
    c.y0 = P.y; c.x0 = P.x;
    c.edge = T.side === 0 ? 34 : GW - 34;                 // 상대 코트 엔드라인 구석
    c.tx = k === 'feint' ? NET_X + s * 50 : c.edge;
    if (k === 'grade3') c.tx = T.side === 0 ? 40 : GW - 40;
  }
  // 몸 위치
  const ly = P_GROUND_Y - c.lift;
  if (t <= GM_C1) { const q = t / GM_C1, e = 1 - (1 - q) * (1 - q); P.y = c.y0 + (ly - c.y0) * e; if (k === 'feint') P.x = c.x0 + (NET_X - s * 40 - c.x0) * e; } // 페인트: 네트 앞으로 도약
  else P.y = ly + (k === 'feint' ? Math.sin(t * 0.08) * 1.5 : 0);
  P.state = c.lift ? JUMP : NORMAL; P.vy = 0;
  if (t === 1) sfx(k === 'flash' ? 'chime' : k === 'grade3' ? 'zap' : 'whoosh');
  if (t === GM_C1) sfx(k === 'flash' ? 'charge' : k === 'grade3' ? 'snap' : 'chime');
  // 파티클
  if (k === 'feint' && t > GM_C1 - 4) for (let i = 0; i < 2; i++) c.parts.push({ x: P.x + (Math.random() - 0.5) * 30, y: P.y - 20 + (Math.random() - 0.5) * 20,
    vx: -s * (1.5 + Math.random() * 2.5), vy: -0.6 + Math.random() * 1.2, t: 40, rot: Math.random() * 6, leaf: Math.random() < 0.45 });
  if (k === 'grade3' && t > 8 && t < GM_C1 + 10) for (let i = 0; i < 3; i++) c.pix.push({ x: P.x - s * 26 + (Math.random() - 0.5) * 40, y: P.y - 40 - Math.random() * 70, vx: (Math.random() - 0.5) * 2, vy: -1 - Math.random() * 2, t: 24 });
  for (const p of c.parts) { p.x += p.vx; p.y += p.vy + Math.sin((p.t + p.rot) * 0.3) * 0.4; p.rot += 0.15; p.t--; }
  for (const p of c.pix) { p.x += p.vx; p.y += p.vy; p.t--; }
  c.parts = c.parts.filter((p) => p.t > 0); c.pix = c.pix.filter((p) => p.t > 0);
  // 그래머처럼: 컷2 중간 스탬프
  if (k === 'grade3' && t === 38) { shake = 7; sfx('thud'); }
  // 상대 디버프
  // 응축 → 발사 (신화라 짧게)
  if (t === GM_FIRE - 12) sfx('charge');
  if (t === GM_FIRE - 1) { hitStop = 3; sfx('suck'); }
  const src = gmSource(c), HIT = c.sk.hit;
  if (t < GM_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.25; }
  if (t === GM_FIRE) {
    heavy(src.x, src.y, k === 'feint' ? 0.9 : 1.8); sfx('flight', 1, 0.6);
    P.state = JUMP; P.vy = 0; ball.x = src.x; ball.y = src.y;
    if (k === 'flash') { sfx('zap'); T.blindT = 75; releaseBall(c.edge, 18); }                       // 3초 눈뽕
    else if (k === 'grade3') { sfx('snap'); ball.wobbleT = 40; releaseBall(T.side === 0 ? 80 : GW - 80, 9); } // 휘청 + 뚝 떨어짐
    else { // 헤어핀: 네트 바로 위로 살짝 넘겨서 네트 앞에 뚝
      T.freezeT = FEINT_FREEZE;
      releaseBall(NET_X + s * FEINT_DX, FEINT_N);
    }                                                  // 0.7초 멈칫
    cine = null;
  }
}

function gmCam(c) {
  const t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  if (!c.init) return H;
  const ly = P_GROUND_Y - c.lift;
  const scalp = { x: P.x, y: ly - 18, z: 4.2, r: 0 };
  let keys;
  if (k === 'flash') keys = [[0, H], [8, scalp], [GM_C1, { ...scalp, z: 4.6 }],                                      // 정수리 익스트림 클로즈업
    [GM_C1 + 6, { x: P.x + s * 20, y: ly - 30, z: 1.9 }], [GM_FIRE - 2, { x: P.x + s * 20, y: ly - 30, z: 2.2 }],      // 렌즈 플레어
    [GM_FIRE + 2, { x: T.x - s * 30, y: 210, z: 1.6, r: s * 0.03 }], [GM_END - 6, { x: (T.x + c.tx) / 2, y: 220, z: 1.5 }], [GM_END, H]]; // 수비수 POV
  else if (k === 'grade3') keys = [[0, H], [10, { x: P.x - s * 14, y: ly - 40, z: 2.3 }], [GM_C1, { x: P.x - s * 14, y: ly - 50, z: 2.5 }],
    [GM_C1 + 6, { x: P.x + s * 60, y: 110, z: 1.7 }], [GM_FIRE - 2, { x: P.x + s * 60, y: 110, z: 1.8, r: s * 0.02 }], [GM_FIRE, H], [GM_END, H]];
  else keys = [[0, H], [GM_C1, { x: P.x, y: ly - 4, z: 2.1, r: s * 0.05 }],                                          // 측면 슬로우
    [GM_C1 + 6, { x: P.x + s * 10, y: ly - 10, z: 2.6, r: s * 0.03 }], [GM_FIRE - 2, { x: P.x + s * 14, y: ly - 10, z: 2.8 }], [GM_FIRE, H], [GM_END, H]];
  const cam = camKeys(t, keys);
  if (k === 'flash') return cam;
  return withFollow(c, cam, GM_FIRE, c.sk.hit);
}

function drawGmWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  const k = t > GM_END - 6 ? (GM_END - t) / 6 : Math.min(1, t / 6);
  const hx = P.x, hy = P.y - 18;                       // 정수리
  if (key === 'flash') {
    ctx.fillStyle = `rgba(10,8,4,${0.78 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    // 경기장 조명이 정수리로 모임
    if (t < GM_C1 + 6) for (const lx of [40, 160, 272, 392]) { const a = Math.min(1, t / 12) * 0.35; const g = ctx.createLinearGradient(lx, -20, hx, hy); g.addColorStop(0, `rgba(255,250,220,${a})`); g.addColorStop(1, 'rgba(255,240,180,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lx - 10, -20); ctx.lineTo(lx + 10, -20); ctx.lineTo(hx + 3, hy); ctx.lineTo(hx - 3, hy); ctx.fill(); }
    // 16방향 선버스트
    const sb = Math.min(1, Math.max(0, (t - 10) / 14));
    if (sb > 0 && t < GM_END) {
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(t * 0.03); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 16; i++) { const an = (i / 16) * Math.PI * 2, L = (60 + (i % 2) * 40) * sb * (1 + Math.sin(t * 0.5 + i) * 0.08);
        const g = ctx.createLinearGradient(0, 0, Math.cos(an) * L, Math.sin(an) * L); g.addColorStop(0, 'rgba(255,250,220,.9)'); g.addColorStop(1, 'rgba(255,200,80,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an - 0.05) * L, Math.sin(an - 0.05) * L); ctx.lineTo(Math.cos(an + 0.05) * L, Math.sin(an + 0.05) * L); ctx.fill(); }
      const core = ctx.createRadialGradient(0, 0, 1, 0, 0, 26 * sb); core.addColorStop(0, '#fff'); core.addColorStop(1, 'rgba(255,220,120,0)');
      ctx.fillStyle = core; ctx.beginPath(); ctx.arc(0, 0, 26 * sb, 0, 7); ctx.fill();
      ctx.restore();
    }
  }
  if (key === 'grade3') {
    ctx.fillStyle = `rgba(6,14,24,${0.62 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    // 위인 수묵 환영 — 솟다가 렉 걸려 반쯤 지워짐
    if (t < GM_FIRE) {
      const rise = Math.min(1, t / 14), gx = P.x - s * 26, gy = P.y + 30 - rise * 30;
      ctx.save(); ctx.beginPath(); const cut = t > 12 ? 0.45 + Math.sin(t * 2.3) * 0.08 : 1; ctx.rect(gx - 60, gy - 150, 120, 150 * cut); ctx.clip();
      inkBlot(gx, gy - 70, 34, 0.55 * Math.max(0, 1 - Math.max(0, t - 30) / 20), 3);
      stickman(gx, gy - 6, 3.2, 0, 'rgba(20,16,12,.85)', Math.max(0, 1 - Math.max(0, t - 30) / 20));
      ctx.restore();
      if (t > 12 && t < 30 && t % 3 === 0) { ctx.fillStyle = 'rgba(0,240,255,.5)'; ctx.fillRect(gx - 50, gy - 150 + Math.random() * 140, 100, 2); }
    }
    for (const p of c.pix) { ctx.fillStyle = `rgba(${p.t % 2 ? '0,240,255' : '20,16,12'},${p.t / 24})`; ctx.fillRect(p.x, p.y, 3, 3); }
    // 홀로그램 성적표
    if (t >= GM_C1 - 2 && t < GM_END - 4) {
      const hk = Math.min(1, (t - GM_C1 + 2) / 8), cx = P.x + s * 60, cy = 104 + Math.sin(t * 0.15) * 3, jx = t % 7 === 0 ? (Math.random() - 0.5) * 8 : 0;
      ctx.save(); ctx.translate(cx + jx, cy); ctx.scale(hk, 1); ctx.globalAlpha = 0.9 * (t > GM_FIRE + 6 ? Math.max(0, 1 - (t - GM_FIRE - 6) / 10) : 1);
      ctx.fillStyle = 'rgba(0,60,80,.55)'; ctx.fillRect(-46, -32, 92, 64);
      ctx.strokeStyle = '#00f0ff'; ctx.lineWidth = 1.2; ctx.shadowColor = '#00f0ff'; ctx.shadowBlur = 8; ctx.strokeRect(-46, -32, 92, 64);
      ctx.shadowBlur = 0; ctx.textAlign = 'center'; ctx.fillStyle = '#bff8ff';
      ctx.font = 'bold 8px "Malgun Gothic", sans-serif'; ctx.fillText('한국사 영역 성적표', 0, -20);
      ctx.font = 'bold 18px "Malgun Gothic", sans-serif'; ctx.fillStyle = '#ffd63c'; ctx.fillText('3등급', 0, 2);
      ctx.font = 'bold 10px "Malgun Gothic", sans-serif'; ctx.fillStyle = '#bff8ff'; ctx.fillText('31점 / 50', 0, 20);
      ctx.fillStyle = 'rgba(0,240,255,.18)'; for (let y = -30; y < 32; y += 3) ctx.fillRect(-46, y, 92, 1);
      ctx.restore();
    }
    if (c.touch && t < c.touch.t + 12) text('TOUCH OUT!', c.touch.x, c.touch.y - 18 - (t - c.touch.t), 11, '#00f0ff');
  }
  if (key === 'feint') {
    const g = ctx.createLinearGradient(0, -100, 0, 300);
    g.addColorStop(0, `rgba(120,20,40,${0.7 * k})`); g.addColorStop(0.6, `rgba(220,90,40,${0.55 * k})`); g.addColorStop(1, `rgba(60,20,10,${0.7 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    // 석양
    const sun = ctx.createRadialGradient(P.x - s * 80, 200, 4, P.x - s * 80, 200, 90); sun.addColorStop(0, `rgba(255,200,120,${0.8 * k})`); sun.addColorStop(1, 'rgba(255,120,60,0)');
    ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(P.x - s * 80, 200, 90, 0, 7); ctx.fill();
    // 모근 + 낙엽
    for (const p of c.parts) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.min(1, p.t / 12);
      if (p.leaf) { ctx.fillStyle = p.t % 3 ? '#e8742a' : '#b8321e'; ctx.beginPath(); ctx.ellipse(0, 0, 4, 2, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#5a2010'; ctx.fillRect(-4, -0.3, 8, 0.6); }
      else { ctx.strokeStyle = '#141010'; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.quadraticCurveTo(0, -4, 5, 1); ctx.stroke(); ctx.fillStyle = '#f2e6d8'; ctx.beginPath(); ctx.arc(-5, 0, 0.9, 0, 7); ctx.fill(); }
      ctx.restore();
    }
    // 잔물결
    if (c.ripple) for (let i = 0; i < 3; i++) { const r = (t - c.ripple) * 3 - i * 10; if (r <= 0) continue; ctx.strokeStyle = `rgba(255,220,180,${Math.max(0, 0.7 - r / 70)})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.ellipse(c.tx, 272, r, r * 0.25, 0, 0, 7); ctx.stroke(); }
  }
  // 응축
  if (t > GM_FIRE - 12 && t < GM_FIRE) { const sp = gmSource(c); chargeFX(sp.x, sp.y, (t - (GM_FIRE - 12)) / 12, sk.col); }
  // 인물
  const gl = ctx.createRadialGradient(P.x, P.y - 10, 4, P.x, P.y - 10, 50); gl.addColorStop(0, `rgba(${sk.col},.45)`); gl.addColorStop(1, `rgba(${sk.col},0)`);
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 10, 50, 0, 7); ctx.fill();
  if (key === 'grade3' && t >= GM_FIRE - 6 && t < GM_FIRE + 10) { // 고개 갸웃
    ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(-s * 0.22 * Math.sin(Math.min(1, (t - GM_FIRE + 6) / 6) * Math.PI / 2)); ctx.translate(-P.x, -P.y); drawPlayer(P); ctx.restore();
  } else drawPlayer(P);
  if (key === 'feint' && T.frozen && t > GM_FIRE) { ctx.save(); ctx.translate(T.x + Math.sin(t * 1.3) * 1.2, 0); ctx.translate(-T.x, 0); drawPlayer(T); ctx.restore(); text('?!', T.x, T.y - 44, 12, '#fff'); }
  else drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  if (key === 'flash' && t >= GM_FIRE - 4) { // 디버프 아이콘
    if (Math.floor(t / 3) % 2 === 0) { ctx.fillStyle = 'rgba(60,40,0,.85)'; ctx.fillRect(T.x - 52, T.y - 76, 104, 15); ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 1; ctx.strokeRect(T.x - 52, T.y - 76, 104, 15); }
    text('FLASHBANG: BLIND 1.0s', T.x, T.y - 65, 8, '#ffd84d');
  }
  drawBall();
}

function drawGmUI(c) {
  const t = c.t, sk = c.sk, key = sk.key, s = c.caster.side === 0 ? 1 : -1;
  if (!c.init) return;
  const k = t > GM_END - 6 ? (GM_END - t) / 6 : Math.min(1, t / 6);
  if (key === 'flash') {
    // 렌즈 플레어 (화면 기준)
    if (t > GM_C1 && t < GM_FIRE + 4) {
      const fk = Math.min(1, (t - GM_C1) / 10), cx = GW / 2 - s * 40, cy = GH / 2 - 10;
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const st = ctx.createLinearGradient(0, cy, GW, cy); st.addColorStop(0, 'rgba(255,220,140,0)'); st.addColorStop(0.5, `rgba(255,250,230,${0.8 * fk})`); st.addColorStop(1, 'rgba(255,220,140,0)');
      ctx.fillStyle = st; ctx.fillRect(0, cy - 2, GW, 4);
      [[0.3, 10, '120,200,255'], [0.55, 18, '255,200,120'], [0.8, 7, '200,255,180'], [1.15, 26, '255,160,220']].forEach(([d, r, col]) => {
        const x = cx + (GW / 2 - cx) * d * 2, y = cy + (GH / 2 - cy) * d * 2 + 30 * d;
        ctx.fillStyle = `rgba(${col},${0.22 * fk})`; ctx.beginPath();
        for (let i = 0; i < 6; i++) { const an = (i / 6) * Math.PI * 2; ctx[i ? 'lineTo' : 'moveTo'](x + Math.cos(an) * r, y + Math.sin(an) * r); } ctx.fill();
      });
      ctx.restore();
    }
    // 수비수 시점 블라인드 (하얗게)
    if (t >= GM_FIRE - 2) { const w = t < GM_FIRE + 4 ? 1 : Math.max(0, 0.88 - (t - GM_FIRE - 4) / 24); ctx.fillStyle = `rgba(255,252,240,${w})`; ctx.fillRect(0, 0, GW, GH); }
  }
  if (key === 'grade3') {
    if (t >= 38 && t < GM_FIRE + 8) { // GRADE 3 스탬프
      const q = Math.min(1, (t - 38) / 4), sc = 1 + (1 - q) * 1.6;
      ctx.save(); ctx.translate(GW / 2, GH / 2 - 10); ctx.scale(sc, sc); ctx.rotate(-0.08); ctx.globalAlpha = q;
      ctx.strokeStyle = '#ffd63c'; ctx.lineWidth = 4; ctx.strokeRect(-92, -24, 184, 40);
      ctx.font = 'bold 26px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd63c'; ctx.fillText('GRADE 3: 31/50', 0, 6);
      ctx.restore();
    }
    if (t > GM_C1 && t < GM_FIRE + 6 && t % 5 < 2) glitch(10);
  }
  if (key === 'feint') {
    if (t >= GM_C1 && t < GM_END - 4) desaturate(0.35);
    if (t >= GM_C1 + 4) { ctx.save(); ctx.globalAlpha = Math.min(1, (t - GM_C1 - 4) / 8) * Math.max(0, k); text('HAIR LOSS... AGAIN', GW / 2, 244, 12, '#d8d8d8'); ctx.restore(); }
    cinemaBars(16 * Math.min(1, t / 6) * Math.max(0, k), '#000');
  }
  // 제목 + 대사
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  text(sk.title, GW / 2, 22, 12, key === 'flash' && t >= GM_FIRE - 2 && t < GM_FIRE + 16 ? '#7a5a00' : `rgb(${sk.col})`);
  text(sk.en, GW / 2, 34, 8, key === 'flash' && t >= GM_FIRE - 2 && t < GM_FIRE + 16 ? '#444' : '#fff');
  if (t >= 6) {
    const n = Math.max(0, Math.min(sk.line.length, Math.floor((t - 6) * 1.4)));
    ctx.font = 'bold 11px "Malgun Gothic", sans-serif';
    const w = ctx.measureText(sk.line).width + 16;
    ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(GW / 2 - w / 2, 262, w, 17);
    text(sk.line.slice(0, n), GW / 2, 274, 11, '#fff');
  }
  ctx.restore();
}

// ----- 김민주 (영어선생님) 시네마틱 5종 -----
// 실제 프레임 기준 (25프레임 = 1초): 0~25 영역 전환 · 25~62 컷1 · 62~100 컷2 · 100~125 클로즈업+대사(응축) · 125~150 공 비행 · 150 임팩트 · ~172 끝
const KIM_A = 25, KIM_B = 62, KIM_C = 100, KIM_FIRE = 125, KIM_HIT = 150, KIM_END = 172;
const KIM_SKILLS = [
  { key: 'vote', title: '의회 민주주의: 데모크러시 스파이크', en: 'Democratical Majority Rule', col: '255,214,80',
    lines: ['"Government of the ball, by the ball, for the point!"', '다수결에 의한 표결 완료... 압도적 찬성표로 이 자리에 내리꽂는다!'] },
  { key: 'liberty', title: '독립선언서: 자유의 의지', en: 'Declaration of Liberty', col: '120,220,200',
    lines: ['"We hold these truths to be self-evident!"', '너희의 억압적인 블로킹은... 이 자유로운 득점의 의지를 막을 수 없다!'] },
  { key: 'court', title: '삼권분립: 헌법재판소 블록', en: 'Checks and Balances', col: '230,230,240',
    lines: ['"Power corruption detected!"', '삼권분립의 원칙에 따라... 너의 독재적 스파이크를 위헌으로 판결한다!'] },
  { key: 'grammar', title: '언어의 집행: 그래머 에러 패널티', en: 'Grammar Error Strike', col: '255,60,60',
    lines: ['"Wrong syntax!" (문법 오류!)', '수비 폼부터 기본 규칙까지 전부 낙제다. 기초부터 다시 풀도록.'] },
  { key: 'lincoln', title: '영역 전개: 링컨의 기둥 - 민주주의 성지', en: 'Gettysburg Sanctuary', col: '255,220,140',
    lines: ['"Shall not perish from the earth!"', '이 승리의 자유와 정의는... 이 코트 위에서 결코 사멸하지 않으리라!'] },
];
const GETTYSBURG = ['Four score and seven years ago', 'our fathers brought forth on this continent', 'a new nation, conceived in Liberty,', 'that government of the people,', 'by the people, for the people,', 'shall not perish from the earth.'];

function kimSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  if (k === 'vote') return { x: P.x + s * 30, y: 40 };          // 하늘의 의장봉
  if (k === 'liberty') return { x: P.x + s * 24, y: P.y - 50 };
  if (k === 'court') return { x: NET_X + s * 30, y: 70 };        // 네트 위 법봉
  if (k === 'grammar') return { x: P.x + s * 30, y: P.y - 60 };  // 만년필 끝
  return { x: c.tx, y: -50 };                                      // 하늘 마법진
}

function updateKim() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  c.t++;
  const t = c.t;
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.parts = []; c.letters = []; c.fw = [];
    const [mn, mx] = T.side === 0 ? [40, 180] : [252, 392];
    c.tx = k === 'court' ? NET_X + s * 46 : Math.max(mn, Math.min(mx, T.x));
    c.ballots = 0;
  }
  // 공중으로 떠오름
  if (t <= 20) { P.y = P_GROUND_Y - Math.sin((t / 20) * Math.PI / 2) * 80; P.state = JUMP; P.vy = 0; }
  if (t === KIM_A) sfx(k === 'lincoln' ? 'bell' : 'chime');
  if (t === KIM_B) sfx('chime');
  // 파티클
  if (k === 'vote' && t > KIM_A && t < KIM_B + 10 && t % 2 === 0) { c.parts.push({ x: c.tx + (Math.random() - 0.5) * 80, y: 30, vx: 0, vy: 3 + Math.random() * 2, t: 30, rot: Math.random() * 3 }); c.ballots++; }
  if (k === 'liberty' && t > KIM_A && t < KIM_FIRE) { const w = 'LIBERTY·EQUALITY·FRATERNITY'; if (t % 2 === 0) c.letters.push({ ch: w[Math.floor(Math.random() * w.length)], a: Math.random() * 6.28, r: 70 + Math.random() * 40, t: 0 }); }
  for (const p of c.parts) { p.x += p.vx; p.y += p.vy; p.vy += p.g || 0; p.t--; }
  c.parts = c.parts.filter((p) => p.t > 0);
  for (const l of c.letters) { l.t++; l.a += 0.12; l.r = Math.max(14, l.r - 0.5); }
  for (const f of c.fw) { f.x += f.vx; f.y += f.vy; f.vy += 0.12; f.t--; }
  c.fw = c.fw.filter((f) => f.t > 0);
  // 응축 → 정적 → 발사
  if (t === KIM_FIRE - 22) sfx('charge');
  if (t === KIM_FIRE - 1) { hitStop = 5; sfx('suck'); }
  const src = kimSource(c), dst = { x: c.tx, y: BALL_GROUND_Y - 6 };
  if (t < KIM_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.2; }
  if (t === KIM_FIRE) { heavy(src.x, Math.max(0, src.y), 2.2); sfx('flight', 1, 1); if (k === 'court' || k === 'vote') sfx('boom'); }
  if (t === KIM_FIRE && k !== 'lincoln' && !(k === 'vote' && c.counter)) { skillRelease(c, src, k); return; }
  if (t > KIM_FIRE && t <= KIM_HIT) {
    const q = (t - KIM_FIRE) / (KIM_HIT - KIM_FIRE);
    if (k === 'liberty') { // 억압의 벽을 우회하는 빛의 나선 궤적
      const e = EASE.heavy(q), px = ball.x, py = ball.y;
      const bx = src.x + (dst.x - src.x) * e, by = src.y + (dst.y - src.y) * e - Math.sin(Math.PI * e) * 50;
      const ang = Math.atan2(dst.y - src.y, dst.x - src.x) + Math.PI / 2, off = Math.sin(e * Math.PI * 5) * 26 * (1 - e);
      ball.x = bx + Math.cos(ang) * off; ball.y = by + Math.sin(ang) * off; ball.vx = ball.x - px; ball.vy = ball.y - py;
      ball.rot += 0.4; ball.fx = c.sk.col; pushRibbon(px, py);
    } else {
      moveHeroBall([src, dst], k === 'court' ? EASE.arrow(q) : EASE.heavy(q), k === 'grammar' ? 20 : 0, c.sk.col);
    }
  }
  if (t === KIM_HIT) {
    heavy(c.tx, 262, 3.2); ball.squashT = 8; ball.fx = null;
    if (k === 'vote' || k === 'grammar') c.knock = true;
    if (k === 'grammar' || k === 'lincoln') { T.frozen = true; T.stunned = true; }
    if (k === 'liberty') for (let i = 0; i < 60; i++) { const a = Math.random() * 6.28, sp = 2 + Math.random() * 5; c.fw.push({ x: c.tx, y: 230, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, t: 40, col: ['255,215,90', '255,255,255', '120,220,200'][i % 3] }); }
  }
  if (c.knock && t > KIM_HIT && t < KIM_HIT + 12) { T.x += s * 5; T.x = T.side === 0 ? Math.max(32, T.x) : Math.min(400, T.x); }
  if (t >= KIM_END) {
    P.state = JUMP; P.vy = 0;
    if (k === 'vote' && c.counter) {
      // 15% 독재: 공이 상대 쪽으로 떨어지는 중 → 독재 발동
      ball.x = c.tx; ball.y = 120; ball.vx = -s * 2; ball.vy = 4; ball.unblockable = false; ball.power = true;
      T.frozen = false; T.stunned = false;
      cine = { kind: 'dictator', t: 0, caster: P, target: T, trail: [] };
      return;
    }
    ball.x = c.tx; ball.y = BALL_GROUND_Y - 4; ball.vx = 0; ball.vy = 8; ball.unblockable = true; ball.power = false;
    cine = null;
  }
}

// ----- 카메라 -----
function kimCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  if (!c.init) return H;
  const top = { x: P.x, y: P_GROUND_Y - 80 - 24 };
  const close = { x: top.x + s * 4, y: top.y + 6, z: 3.4, r: 0 };
  let keys;
  if (k === 'vote') keys = [[0, H], [KIM_A, { x: 216, y: 140, z: 1.05 }], [KIM_B, { x: c.tx, y: 130, z: 1.3 }],           // 패닝: 투표장
    [KIM_B + 14, { x: top.x + s * 20, y: top.y + 20, z: 2.0 }], [KIM_C, { x: top.x + s * 10, y: top.y + 14, z: 2.3 }],     // 바스트 샷
    [KIM_C + 10, close], [KIM_FIRE, { ...close, z: 3.8 }]];
  else if (k === 'liberty') keys = [[0, H], [KIM_A, { x: P.x - s * 10, y: 120, z: 1.25, r: -s * 0.04 }], [KIM_B, { x: (P.x + c.tx) / 2, y: 150, z: 1.4, r: s * 0.03 }], // 트래킹
    [KIM_B + 12, { x: top.x, y: top.y + 60, z: 1.9, r: -s * 0.08 }], [KIM_C, { x: top.x, y: top.y + 40, z: 2.2, r: -s * 0.06 }],                                  // 로우 앵글
    [KIM_C + 10, close], [KIM_FIRE, { ...close, z: 3.6 }]];
  else if (k === 'court') keys = [[0, H], [KIM_A, { x: NET_X, y: 140, z: 1.1 }], [KIM_B, { x: 216, y: 120, z: 0.82 }],   // 파노라마
    [KIM_B + 12, { x: NET_X + s * 40, y: 110, z: 1.35 }], [KIM_C, { x: NET_X + s * 40, y: 110, z: 1.4 }],
    [KIM_C + 10, close], [KIM_FIRE, { ...close, z: 3.6 }]];
  else if (k === 'grammar') keys = [[0, H], [KIM_A, { x: P.x + s * 40, y: 130, z: 1.3 }], [KIM_B, { x: c.tx, y: 210, z: 1.8, r: s * 0.04 }], // POV 스캔
    [KIM_B + 12, { x: 216, y: 120, z: 1.25 }], [KIM_C, { x: 216, y: 120, z: 1.3 }],
    [KIM_C + 14, close], [KIM_FIRE, { ...close, z: 4 }]];
  else keys = [[0, H], [KIM_A, { x: 216, y: 110, z: 0.7 }], [KIM_B, { x: 216, y: 90, z: 0.78 }],                        // 풀 시네마틱
    [KIM_B + 14, { x: top.x, y: top.y - 10, z: 1.5 }], [KIM_C, { x: top.x, y: top.y - 10, z: 1.6 }],                     // 오버헤드 부유
    [KIM_C + 10, { x: top.x, y: top.y + 30, z: 2.6, r: -s * 0.05 }], [KIM_FIRE, { x: top.x, y: top.y + 30, z: 2.9, r: -s * 0.05 }]]; // 신성한 로우 앵글
  keys.push([KIM_FIRE + 1, H], [KIM_END, H]);
  const cam = camKeys(t, keys);
  if (k === 'lincoln') cam.space = false;
  return cam;
}

// ----- 그리기 도구 -----
function drawGavel(x, y, sc, rot, col, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = a;
  ctx.shadowColor = `rgb(${col})`; ctx.shadowBlur = 16;
  ctx.fillStyle = `rgba(${col},.95)`;
  ctx.fillRect(-2, 0, 4, 34);                                // 손잡이
  ctx.beginPath(); ctx.roundRect(-14, -8, 28, 12, 3); ctx.fill(); // 머리
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-14, -4, 28, 2);
  ctx.restore();
}
function drawColumn(x, y, h, w, col, a) {
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.fillStyle = 'rgba(235,235,240,.12)';
  ctx.fillRect(x - w / 2, y - h, w, h); ctx.strokeRect(x - w / 2, y - h, w, h);
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + (w / 4) * i, y - h); ctx.lineTo(x - w / 2 + (w / 4) * i, y); ctx.stroke(); }
  ctx.strokeRect(x - w / 2 - 4, y - h - 6, w + 8, 6); ctx.strokeRect(x - w / 2 - 4, y, w + 8, 5);
  ctx.restore();
}
function drawLibertyStatue(x, y, sc, a, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
  const g = ctx.createLinearGradient(0, -170, 0, 0); g.addColorStop(0, 'rgba(160,230,210,.9)'); g.addColorStop(1, 'rgba(70,150,130,.9)');
  ctx.fillStyle = g;
  ctx.fillRect(-30, -10, 60, 10);                                                         // 받침
  ctx.beginPath(); ctx.moveTo(-26, -10); ctx.lineTo(-14, -110); ctx.lineTo(14, -110); ctx.lineTo(26, -10); ctx.fill(); // 옷자락
  ctx.beginPath(); ctx.arc(0, -120, 10, 0, 7); ctx.fill();                               // 머리
  for (let i = 0; i < 7; i++) { const an = -Math.PI / 2 + (i - 3) * 0.32; ctx.beginPath(); ctx.moveTo(Math.cos(an) * 9, -120 + Math.sin(an) * 9); ctx.lineTo(Math.cos(an) * 20, -120 + Math.sin(an) * 20); ctx.lineWidth = 2.5; ctx.strokeStyle = 'rgba(160,230,210,.9)'; ctx.stroke(); } // 왕관
  ctx.fillRect(10, -170, 5, 62);                                                          // 든 팔
  ctx.fillRect(-16, -96, 12, 20);                                                         // 책
  const fl = 1 + Math.sin(t * 0.6) * 0.15;                                                // 횃불
  const fg = ctx.createRadialGradient(12, -178, 1, 12, -178, 14 * fl); fg.addColorStop(0, 'rgba(255,255,220,1)'); fg.addColorStop(1, 'rgba(255,170,40,0)');
  ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(12, -178, 14 * fl, 0, 7); ctx.fill();
  ctx.restore();
}
function drawScales(x, y, sc, tilt, a) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
  ctx.strokeStyle = '#ffe9a0'; ctx.fillStyle = '#ffe9a0'; ctx.lineWidth = 2; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 30); ctx.stroke(); ctx.fillRect(-12, 30, 24, 4);
  ctx.save(); ctx.translate(0, -24); ctx.rotate(tilt);
  ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(34, 0); ctx.stroke();
  for (const sx of [-30, 30]) { ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx - 9, 22); ctx.moveTo(sx, 0); ctx.lineTo(sx + 9, 22); ctx.stroke(); ctx.beginPath(); ctx.ellipse(sx, 22, 11, 3.5, 0, 0, Math.PI); ctx.fill(); }
  ctx.restore(); ctx.restore();
}
function drawSeatedColossus(x, y, sc, a) {
  // 대리석 거대 좌상 (실루엣)
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
  const g = ctx.createLinearGradient(0, -200, 0, 0); g.addColorStop(0, '#f4f1ea'); g.addColorStop(1, '#bdb6a8');
  ctx.fillStyle = g;
  ctx.fillRect(-70, -120, 140, 120);                                     // 의자
  ctx.fillStyle = '#d8d2c6'; ctx.fillRect(-56, -170, 112, 60);          // 상체
  ctx.beginPath(); ctx.arc(0, -186, 18, 0, 7); ctx.fill();              // 머리
  ctx.fillRect(-46, -110, 30, 70); ctx.fillRect(16, -110, 30, 70);      // 다리
  ctx.fillRect(-64, -120, 18, 10); ctx.fillRect(46, -120, 18, 10);      // 팔걸이 위 손
  ctx.strokeStyle = 'rgba(120,110,95,.5)'; ctx.lineWidth = 2; ctx.strokeRect(-70, -120, 140, 120);
  ctx.restore();
}

// ----- 월드 (카메라 안) -----
function drawKimWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  const k = t > KIM_END - 8 ? (KIM_END - t) / 8 : Math.min(1, t / 8);
  const a1 = Math.min(1, Math.max(0, (t - 8) / 20));   // 영역 전환 진행
  // 배경
  const bg = { vote: '6,10,30', liberty: '8,28,30', court: '20,20,26', grammar: '250,250,245', lincoln: '236,232,222' }[key];
  ctx.fillStyle = `rgba(${bg},${(key === 'grammar' || key === 'lincoln' ? 0.94 : 0.9) * k})`; ctx.fillRect(-600, -600, 1650, 1500);

  if (key === 'vote') {
    // 네온 투표장: 상대 코트 격자 + Zone A/B/C
    const x0 = T.side === 0 ? 20 : NET_X + 10, x1 = T.side === 0 ? NET_X - 10 : GW - 20;
    ctx.strokeStyle = `rgba(80,180,255,${0.5 * a1})`; ctx.lineWidth = 1;
    for (let y = 200; y <= 290; y += 12) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
    if (t >= KIM_A) ['A', 'B', 'C'].forEach((z, i) => {
      const zx = x0 + ((x1 - x0) / 3) * (i + 0.5), zk = Math.min(1, (t - KIM_A - i * 6) / 8);
      if (zk <= 0) return;
      ctx.save(); ctx.globalAlpha = zk; ctx.strokeStyle = '#3cf0ff'; ctx.shadowColor = '#3cf0ff'; ctx.shadowBlur = 10; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(zx, 150); ctx.lineTo(zx, 290); ctx.stroke(); ctx.restore();
      neon('ZONE ' + z, zx, 146, 9, '#3cf0ff');
    });
    // 투표함 홀로그램 + 쏟아지는 표
    const bx = c.tx, by = 96;
    ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = '#ffd84d'; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 10; ctx.lineWidth = 1.5;
    ctx.strokeRect(bx - 26, by - 16, 52, 34); ctx.beginPath(); ctx.moveTo(bx - 26, by - 16); ctx.lineTo(bx - 14, by - 26); ctx.lineTo(bx + 38, by - 26); ctx.lineTo(bx + 26, by - 16); ctx.moveTo(bx + 38, by - 26); ctx.lineTo(bx + 38, by + 8); ctx.lineTo(bx + 26, by + 18); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillRect(bx - 10, by - 21, 20, 2); ctx.restore();
    neon('BALLOT', bx, by + 5, 9, '#ffd84d');
    for (const p of c.parts) { if (p.y > by - 20) continue; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot + p.t * 0.2); ctx.fillStyle = '#fffbe8'; ctx.fillRect(-4, -3, 8, 6); ctx.fillStyle = '#c33'; ctx.fillRect(-2, -1, 3, 2); ctx.restore(); }
    // 손끝 황금 의장봉 오라 (바스트 샷)
    if (t >= KIM_B) { const ak = Math.min(1, (t - KIM_B) / 15); drawGavel(P.x + s * 20, P.y - 46, 0.9 + ak * 0.4, s * -0.6, '255,214,80', ak); }
    // 하늘에서 내려찍는 거대 의장봉
    if (t >= KIM_FIRE - 6 && t <= KIM_HIT + 6) { const q = Math.min(1, Math.max(0, (t - (KIM_FIRE - 6)) / (KIM_HIT - KIM_FIRE + 6))); drawGavel(c.tx - s * 20, 20 + q * 150, 3.2, s * (-1.4 + EASE.heavy(q) * 1.9), '255,214,80', 0.9); }
    if (t >= KIM_HIT) floorText('APPROVED 100%', c.tx, 266, 34 * Math.max(1, 2 - (t - KIM_HIT) * 0.2), '#ffd84d');
  }

  if (key === 'liberty') {
    // 독립선언서 스크롤
    const sw = 120 * a1;
    ctx.save(); ctx.globalAlpha = 0.9 * a1; ctx.translate(P.x - s * 50, P.y - 110); ctx.rotate(Math.sin(t * 0.05) * 0.06);
    ctx.fillStyle = '#efe1bc'; ctx.fillRect(-sw / 2, -50, sw, 100);
    ctx.fillStyle = '#8a6a3a'; ctx.fillRect(-sw / 2 - 5, -54, 6, 108); ctx.fillRect(sw / 2 - 1, -54, 6, 108);
    ctx.font = 'italic 8px "Times New Roman", serif'; ctx.fillStyle = '#4a3418'; ctx.textAlign = 'center';
    if (sw > 80) ['In Congress, July 4', 'The unanimous Declaration', 'We hold these truths', 'to be self-evident,', 'that all men are created equal'].forEach((l, i) => ctx.fillText(l, 0, -34 + i * 15));
    ctx.restore();
    // 시간 정지된 블로커 (회색 + 시계 문양)
    if (t >= KIM_A) { ctx.save(); ctx.strokeStyle = 'rgba(200,255,240,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(T.x, T.y - 20, 34, 0, 7); ctx.stroke();
      const ha = t * 0.02; ctx.beginPath(); ctx.moveTo(T.x, T.y - 20); ctx.lineTo(T.x + Math.cos(ha) * 22, T.y - 20 + Math.sin(ha) * 22); ctx.stroke(); ctx.restore(); }
    // 자유의 여신상 솟아오름
    if (t >= KIM_A) drawLibertyStatue(P.x - s * 70, 290 + (1 - Math.min(1, (t - KIM_A) / 30)) * 200, 1.1, 0.85, t);
    // 공 주위 알파벳 태풍
    for (const l of c.letters) if (t < KIM_FIRE + 6) neon(l.ch, ball.x + Math.cos(l.a) * l.r, ball.y + Math.sin(l.a) * l.r * 0.6, 9, '#bff6e8');
    // 손에 쥔 자유의 횃불 오라
    if (t >= KIM_B) { const fk = Math.min(1, (t - KIM_B) / 12), fx = P.x + s * 16, fy = P.y - 50; const fg = ctx.createRadialGradient(fx, fy, 1, fx, fy, 22 * fk); fg.addColorStop(0, 'rgba(255,255,220,1)'); fg.addColorStop(0.4, 'rgba(255,190,60,.8)'); fg.addColorStop(1, 'rgba(255,120,0,0)'); ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, 22 * fk, 0, 7); ctx.fill(); }
    for (const f of c.fw) { ctx.fillStyle = `rgba(${f.col},${f.t / 40})`; ctx.fillRect(f.x, f.y, 2.2, 2.2); }
  }

  if (key === 'court') {
    // 네트 앞 대법원 기둥 와이어프레임
    const ck = Math.min(1, t / 20);
    for (let i = -1; i <= 1; i++) drawColumn(NET_X + i * 18, 276, 120 * ck, 12, '#e8e8f0', 0.9 * ck);
    ctx.save(); ctx.globalAlpha = ck; ctx.strokeStyle = '#e8e8f0'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(NET_X - 34, 150 + (1 - ck) * 120); ctx.lineTo(NET_X, 128 + (1 - ck) * 120); ctx.lineTo(NET_X + 34, 150 + (1 - ck) * 120); ctx.closePath(); ctx.stroke(); ctx.restore();
    // 입법·행정·사법 거대 석조 기둥이 차례로 강림
    if (t >= KIM_A) ['LEGISLATIVE', 'EXECUTIVE', 'JUDICIAL'].forEach((n, i) => {
      const dk = Math.min(1, (t - KIM_A - i * 10) / 10); if (dk <= 0) return;
      const x = (T.side === 0 ? 40 : NET_X + 50) + i * 60, y = 276 - (1 - EASE.heavy(dk)) * 260;
      drawColumn(x, y, 170, 30, '#f2f2f6', 0.95);
      neon(n, x, y - 178, 8, '#ffffff');
      if (dk >= 1 && t < KIM_A + i * 10 + 13) { shake = Math.max(shake, 4); }
    });
    // 정의의 저울
    if (t >= KIM_B) drawScales(NET_X - s * 10, 60, 1.2, Math.sin(t * 0.15) * 0.25 * (t < KIM_FIRE ? 1 : 0), Math.min(1, (t - KIM_B) / 10));
  }

  if (key === 'grammar') {
    // 코트가 시험지로 반전: 줄 + 빨간 여백선
    ctx.save(); ctx.globalAlpha = 0.9 * a1 * k;
    ctx.strokeStyle = 'rgba(120,160,220,.5)'; ctx.lineWidth = 0.8;
    for (let y = 40; y < 300; y += 14) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(640, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(230,60,60,.7)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(30, -100); ctx.lineTo(30, 400); ctx.stroke();
    ctx.font = 'bold 9px serif'; ctx.fillStyle = '#334'; ctx.fillText('Q1. Defend the court. (100 pts)', 40, 30);
    ctx.restore();
    // 붉은 교정용 만년필 레이저
    const pk = Math.min(1, t / 20);
    ctx.save(); ctx.translate(P.x + s * 10, P.y - 40); ctx.rotate(s * -0.9); ctx.globalAlpha = pk;
    ctx.fillStyle = '#1a1a2a'; ctx.fillRect(-4, 0, 8, 36); ctx.fillStyle = '#c9a54a'; ctx.fillRect(-4, 0, 8, 3);
    ctx.fillStyle = '#d42020'; ctx.shadowColor = '#ff2020'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(0, -16); ctx.lineTo(4, 0); ctx.fill();
    ctx.fillRect(-1.5, -16 - 70 * pk, 3, 70 * pk); ctx.restore();
    // 스캔 레이저가 상대를 훑음 + 오류 문구
    if (t >= KIM_A && t < KIM_B + 10) {
      const sy = 120 + ((t - KIM_A) * 5) % 170;
      ctx.fillStyle = 'rgba(255,40,40,.35)'; ctx.fillRect(T.side === 0 ? 0 : NET_X, sy, NET_X, 3);
      ['SUBJECT-VERB DISAGREEMENT', 'SYNTAX ERROR', 'MISSING ARTICLE'].forEach((e, i) => { if (t > KIM_A + 8 + i * 8) text(e, T.x, T.y - 70 - i * 13, 8, '#ff2a2a'); });
    }
    // 허공에 [F] 도장 + 빨간 밑줄
    if (t >= KIM_B) {
      const fk = Math.min(1, (t - KIM_B) / 6), sc = 1 + (1 - fk) * 1.5;
      ctx.save(); ctx.translate(c.tx, 110); ctx.scale(sc, sc); ctx.rotate(-0.15); ctx.globalAlpha = fk;
      ctx.strokeStyle = '#d42020'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.stroke();
      ctx.font = 'bold 44px "Times New Roman", serif'; ctx.fillStyle = '#d42020'; ctx.textAlign = 'center'; ctx.fillText('F', 0, 16);
      ctx.restore();
      if (t === KIM_B) { shake = 8; sfx('thud'); }
      const ul = Math.min(1, (t - KIM_B - 6) / 10); if (ul > 0) { ctx.strokeStyle = '#d42020'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(c.tx - 70, 150); ctx.lineTo(c.tx - 70 + 140 * ul, 152); ctx.stroke(); }
    }
    // 임팩트: 만년필 날검 충격파 + 붉은 X
    if (t >= KIM_HIT) {
      const q = Math.min(1, (t - KIM_HIT) / 4);
      ctx.strokeStyle = '#d42020'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(c.tx - 120, 160); ctx.lineTo(c.tx - 120 + 240 * q, 280); ctx.stroke();
      if (t > KIM_HIT + 3) { ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(T.x - 22, T.y - 50); ctx.lineTo(T.x + 22, T.y + 10); ctx.moveTo(T.x + 22, T.y - 50); ctx.lineTo(T.x - 22, T.y + 10); ctx.stroke(); }
    }
  }

  if (key === 'lincoln') {
    // 대리석 신전: 기둥 열 + 계단 + 페디먼트
    ctx.save(); ctx.globalAlpha = a1;
    for (let i = 0; i < 12; i++) drawColumn(-80 + i * 54, 250, 210, 22, '#c9c2b2', 0.9);
    ctx.fillStyle = '#e6e0d2'; ctx.fillRect(-120, 30, 680, 14); ctx.fillStyle = '#d6cfbf'; ctx.fillRect(-120, 20, 680, 10);
    for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(200,192,176,${1 - i * 0.15})`; ctx.fillRect(-120, 250 + i * 8, 680, 8); }
    ctx.restore();
    // 거대 좌상이 솟아오름
    if (t >= KIM_A) { const rk = Math.min(1, (t - KIM_A) / 24); drawSeatedColossus(216, 250 + (1 - rk) * 220, 1.05, 0.9); }
    // 게티즈버그 연설문 황금 문장
    if (t >= KIM_A + 10) GETTYSBURG.forEach((ln, i) => { const lk = Math.min(1, (t - KIM_A - 10 - i * 5) / 8); if (lk > 0) { ctx.save(); ctx.globalAlpha = lk * 0.9; ctx.font = 'italic bold 10px "Times New Roman", serif'; ctx.fillStyle = '#b8860b'; ctx.textAlign = 'center'; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 8; ctx.fillText(ln, i % 2 ? 320 : 112, 70 + i * 22); ctx.restore(); } });
    // 대리석 왕좌 + 헌법 스크롤 + 빛의 구체
    if (t >= KIM_B) {
      const wk = Math.min(1, (t - KIM_B) / 12);
      ctx.save(); ctx.globalAlpha = wk; ctx.fillStyle = '#f2ede2'; ctx.strokeStyle = '#c9a54a'; ctx.lineWidth = 1.5;
      ctx.fillRect(P.x - 22, P.y + 26, 44, 7); ctx.fillRect(P.x - 22, P.y - 40, 7, 70); ctx.fillRect(P.x + 15, P.y - 40, 7, 70); ctx.strokeRect(P.x - 22, P.y - 40, 44, 73);
      ctx.fillStyle = '#efe1bc'; ctx.fillRect(P.x - s * 36 - 10, P.y - 30, 20, 26);
      const og = ctx.createRadialGradient(P.x + s * 30, P.y - 30, 1, P.x + s * 30, P.y - 30, 16); og.addColorStop(0, '#fff'); og.addColorStop(1, 'rgba(255,220,140,0)');
      ctx.fillStyle = og; ctx.beginPath(); ctx.arc(P.x + s * 30, P.y - 30, 16, 0, 7); ctx.fill(); ctx.restore();
    }
    // 하늘 마법진 + 황금 신벌 기둥
    if (t >= KIM_C) { ctx.save(); ctx.translate(c.tx, -20); ctx.scale(1, 0.32); ctx.rotate(t * 0.04); ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 3; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 14; for (const r of [80, 64]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); } ctx.restore(); }
    if (t >= KIM_FIRE) { const w = Math.min(44, (t - KIM_FIRE) * 4) * (t > KIM_END - 8 ? (KIM_END - t) / 8 : 1); const g = ctx.createLinearGradient(c.tx - w, 0, c.tx + w, 0); g.addColorStop(0, 'rgba(255,216,77,0)'); g.addColorStop(0.5, 'rgba(255,252,230,.95)'); g.addColorStop(1, 'rgba(255,216,77,0)'); ctx.fillStyle = g; ctx.fillRect(c.tx - w, -300, w * 2, 576); }
    if (t >= KIM_HIT) floorText('DEMOCRACY PREVAILS', c.tx, 268, 28 * Math.max(1, 2 - (t - KIM_HIT) * 0.2), '#c9a54a');
  }
  // 응축
  if (t > KIM_FIRE - 22 && t < KIM_FIRE) { const sp = kimSource(c); chargeFX(sp.x, Math.max(10, sp.y), (t - (KIM_FIRE - 22)) / 22, sk.col); }
  // 시전자 + 상대
  const g = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 58);
  g.addColorStop(0, `rgba(${sk.col},.55)`); g.addColorStop(1, `rgba(${sk.col},0)`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 58, 0, 7); ctx.fill();
  drawPlayer(P);
  if (c.knock && t > KIM_HIT) { ctx.save(); ctx.translate(T.x, T.y); ctx.rotate(s * (t - KIM_HIT) * 0.3); ctx.translate(-T.x, -T.y); drawPlayer(T); ctx.restore(); }
  else drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  if (t >= KIM_FIRE - 1 || key === 'liberty') drawBall();
}

// ----- 화면 UI -----
function drawKimUI(c) {
  const t = c.t, sk = c.sk, key = sk.key;
  if (!c.init) return;
  const k = t > KIM_END - 8 ? (KIM_END - t) / 8 : Math.min(1, t / 8);
  if (key === 'vote' && t >= KIM_A && t < KIM_FIRE + 10) { // 전광판 0% → 100% 기하급수
    const pct = Math.min(100, Math.round(Math.pow(Math.min(1, (t - KIM_A) / (KIM_B - KIM_A + 10)), 3) * 100));
    ctx.fillStyle = 'rgba(0,0,0,.75)'; ctx.fillRect(GW - 118, 58, 104, 40); ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 1; ctx.strokeRect(GW - 118, 58, 104, 40);
    neon('찬성 ' + pct + '%', GW - 66, 80, 15, pct >= 100 ? '#7dff9a' : '#ffd84d');
    ctx.fillStyle = '#ffd84d'; ctx.fillRect(GW - 112, 88, 92 * pct / 100, 4);
  }
  if (key === 'court' && t >= KIM_B && t < KIM_FIRE) { // 위헌 경고창 점멸 + 스파이크 파워 스캔
    if (Math.floor(t / 4) % 2 === 0) { ctx.fillStyle = 'rgba(160,0,0,.85)'; ctx.fillRect(GW / 2 - 130, 120, 260, 30); ctx.strokeStyle = '#ff4040'; ctx.lineWidth = 2; ctx.strokeRect(GW / 2 - 130, 120, 260, 30); text('⚠ UNCONSTITUTIONAL ATTEMPT DETECTED', GW / 2, 140, 11, '#ffffff'); }
    const pw = Math.max(0, 98 - Math.max(0, t - KIM_C) * 4);
    text(`SPIKE POWER: ${pw}%`, GW / 2, 166, 10, pw > 0 ? '#ffb0b0' : '#7dff9a');
  }
  if (key === 'lincoln') { const h = 22 * Math.min(1, t / 10) * Math.max(0, k); cinemaBars(h, '#1a160e', '#c9a54a'); }
  if (key === 'grammar' && t >= KIM_HIT && t < KIM_HIT + 10) { ctx.strokeStyle = 'rgba(212,32,32,.8)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(30, 30); ctx.lineTo(GW - 30, GH - 30); ctx.moveTo(GW - 30, 30); ctx.lineTo(30, GH - 30); ctx.stroke(); }
  // 제목
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const dark = key === 'grammar' || key === 'lincoln';
  const ty = key === 'lincoln' ? 40 : 22;
  text(sk.title, GW / 2, ty, 13, dark ? '#7a1010' : `rgb(${sk.col})`);
  text(sk.en, GW / 2, ty + 13, 9, dark ? '#333' : '#ffffff');
  // 클로즈업 대사 (4초~)
  if (t >= KIM_C - 4 && t < KIM_HIT + 10) {
    sk.lines.forEach((ln, i) => {
      const st = KIM_C - 4 + i * 12, n = Math.max(0, Math.min(ln.length, Math.floor((t - st) * 1.6)));
      if (n <= 0) return;
      const y = (key === 'lincoln' ? 246 : 262) + i * 17;
      ctx.font = `bold ${i ? 10 : 11}px "Malgun Gothic", sans-serif`;
      const w = ctx.measureText(ln).width + 16;
      ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(GW / 2 - w / 2, y - 12, w, 16);
      text(ln.slice(0, n), GW / 2, y, i ? 10 : 11, i ? '#ffffff' : `rgb(${sk.col})`);
    });
  }
  ctx.restore();
  if (t >= KIM_HIT && t < KIM_HIT + 3) { ctx.fillStyle = `rgba(255,255,255,${0.7 - (t - KIM_HIT) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
}

// ----- 수학 강림 (박준형 쌤, 랜덤 5종) -----
const MATH_FIRE = 62, MATH_HIT = 74, MATH_END = 90; // 연출 시간 기준: 0~25 수식 조립, 25~62 슬로우 컷씬+대사, 62 발사, 68 임팩트
const MATH_REAL_FIRE = 125, MATH_REAL_HIT = 153, MATH_REAL_END = 178; // 실제 프레임: 발사 5초 → 공 비행 1.1초 → 임팩트 후 1초 (25프레임 = 1초)
const MATH_SKILLS = [
  { key: 'rail', title: '미적분학: 궤도 조준형 미적분 레일건', en: 'Calculus Railgun', color: '#3cf0ff',
    lines: ['미분으로 공간을 쪼개고, 적분으로 파멸을 집속한다.', '함수의 극한값은... 너희의 소멸이다.'] },
  { key: 'blade', title: '선형대수학: 차원 절단기 - 행렬 대검', en: 'Matrix Dimension Blade', color: '#b07cff',
    lines: ['너희가 서 있는 3차원 공간의 행렬식(det)을 0으로 변환한다.', '차원축 축소 완료. 2D 프레임으로 찌그러져라.'] },
  { key: 'wave', title: '삼각함수: 파동 위상 입자 가속 프리즘', en: 'Wave Phase Accelerator', color: '#5aa8ff',
    lines: ['진폭은 극대화, 위상은 일치한다.', '공명 주파수에 도달한 순간... 너희의 방어선은 붕괴한다.'] },
  { key: 'fractal', title: '무한수열 & 프랙탈: 만델브로트 싱귤래리티', en: 'Fractal Blackhole', color: '#ff5ad1',
    lines: ['끝없이 반복되는 무한의 프랙탈 구조...', '너희는 이 수렴의 특이점(Singularity)에서 영원히 벗어날 수 없다.'] },
  { key: 'euler', title: '영역 전개: 오일러 복소평면 대성당', en: 'Complex Plane Cathedral', color: '#ffd84d',
    lines: ['가장 아름다운 수식이 완성되었다.', "허수와 실수가 교차하는 영역... 존재를 '0'으로 환원하노라."] },
];
const MATH_TAUNT = {
  block: '네 공의 궤적은 일차함수 수준이다. 다 보인다.',
  error: '계산 착오다. 기초부터 다시 풀고 오도록.',
  win: 'Q.E.D. (증명 완료).',
};
const SYMBOLS = ['∫', '∑', 'π', '∞', 'lim', 'dx', 'Δ', '√', 'θ', 'det', 'i', 'e', 'f(x)', '∂', 'sin', 'cos'];
const speech = []; // 캐릭터 말풍선 (도발 멘트)

function say(p, str) { speech.push({ p, str, t: 70 }); }

// 수학쌤 도발: 블로킹 성공 / 상대 실책 / 승리
function mathTaunt(kind, p) {
  const sk = CHARACTERS[p.char].skill;
  if (sk === 'math') say(p, MATH_TAUNT[kind]);
  if (sk === 'jmw') say(p, JM_TAUNT[kind]);
  if (sk === 'gm') say(p, kind === 'error' && Math.random() < 0.5 ? GM_TAUNT.win : GM_TAUNT[kind]);
}

let mandelCanvas = null;
function getMandel() {
  if (mandelCanvas) return mandelCanvas;
  const c = document.createElement('canvas'); c.width = 160; c.height = 120;
  const g = c.getContext('2d'), img = g.createImageData(160, 120);
  for (let y = 0; y < 120; y++) for (let x = 0; x < 160; x++) {
    const cr = -2.2 + (x / 160) * 3, ci = -1.1 + (y / 120) * 2.2;
    let zr = 0, zi = 0, n = 0;
    while (n < 40 && zr * zr + zi * zi < 4) { const t = zr * zr - zi * zi + cr; zi = 2 * zr * zi + ci; zr = t; n++; }
    const i = (y * 160 + x) * 4;
    if (n === 40) { img.data[i + 3] = 255; continue; }
    const v = n / 40;
    img.data[i] = 255 * Math.min(1, v * 3); img.data[i + 1] = 60 * v; img.data[i + 2] = 255 * Math.min(1, 0.4 + v);
    img.data[i + 3] = 200 * Math.min(1, v * 4);
  }
  g.putImageData(img, 0, 0);
  return (mandelCanvas = c);
}

function neon(str, x, y, size, color, align = 'center') {
  ctx.save();
  ctx.font = `bold ${size}px "Malgun Gothic", "Cambria Math", serif`;
  ctx.textAlign = align; ctx.shadowColor = color; ctx.shadowBlur = 10;
  ctx.fillStyle = color; ctx.fillText(str, x, y);
  ctx.restore();
}

function updateMath() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  // 실제 프레임(c.f) → 연출 시간(c.t): 조립·대사 구간을 길게, 임팩트는 슬로모션
  c.f = (c.f || 0) + 1;
  const prev = c.t;
  c.t = c.f <= MATH_REAL_FIRE ? c.f * (MATH_FIRE / MATH_REAL_FIRE)
    : c.f <= MATH_REAL_HIT ? MATH_FIRE + (c.f - MATH_REAL_FIRE) * ((MATH_HIT - MATH_FIRE) / (MATH_REAL_HIT - MATH_REAL_FIRE))
    : MATH_HIT + (c.f - MATH_REAL_HIT) * ((MATH_END - MATH_HIT) / (MATH_REAL_END - MATH_REAL_HIT));
  const at = (x) => prev < x && c.t >= x; // 그 순간을 막 지났는지
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.cubes = []; c.rings = [];
    c.shards = Array.from({ length: 46 }, (_, i) => ({ a: Math.random() * 6.28, d: 10 + Math.random() * 40, r: Math.random() * 6, sz: 4 + Math.random() * 7, slot: i }));
    c.inf = Array.from({ length: 70 }, () => ({ a: Math.random() * 6.28, d: 20 + Math.random() * 160, sp: 0.02 + Math.random() * 0.05 }));
    c.code = Array.from({ length: 34 }, (_, i) => ({ x: i * 13, y: Math.random() * GH, v: 4 + Math.random() * 6 }));
  }
  if (c.t < MATH_FIRE && c.f % 2 === 0) c.sym.push({ ch: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], x: P.x + (Math.random() - 0.5) * 60, y: P.y - 40, vx: (Math.random() - 0.5) * 6, vy: -1 - Math.random() * 3, t: 40 });
  for (const m of c.sym) { m.x += m.vx; m.y += m.vy; m.vx *= 0.95; m.t--; }
  for (const q of c.cubes) { q.x += q.vx; q.y += q.vy; q.vy += 0.15; q.rot += q.vr; q.t--; }
  for (const cd of c.code) { cd.y += cd.v; if (cd.y > GH) cd.y = -20; }
  // 점프해서 공중에 부유
  if (c.t <= 20) { P.y = P_GROUND_Y - Math.sin((c.t / 20) * Math.PI / 2) * 90; P.state = JUMP; P.vy = 0; }
  if (at(22)) sfx(k === 'euler' ? 'bell' : 'chime');
  if (at(MATH_FIRE - 14)) sfx('charge');
  if (at(MATH_FIRE - 0.7)) { hitStop = 5; sfx('suck'); }   // 터지기 직전 숨 멈춤
  if (at(MATH_FIRE)) { sfx('flight', 1, 1.1); sfx(k === 'fractal' ? 'snap' : 'zap'); const sp = mathSource(c); heavy(sp.x, sp.y, 2.2); if (k === 'euler') sfx('bell'); }
  if (at(MATH_FIRE) && k !== 'euler') { skillRelease(c, mathSource(c), k); return; }
  const src = mathSource(c), dst = { x: c.tx, y: BALL_GROUND_Y - 6 };
  if (c.t < MATH_FIRE) {
    if (k === 'wave' && c.t > 20) { const a = c.t * 0.45; ball.x = P.x - s * 20 + Math.cos(a) * 64; ball.y = P.y - 60 + Math.sin(a) * 20; }
    else { ball.x = src.x; ball.y = src.y; }
    ball.vx = 0; ball.vy = 0; ball.rot += 0.25;
  } else if (c.t <= MATH_HIT) {
    // 히어로 볼: 잠깐 버티다가 확 가속해서 꽂힘
    const q = (c.t - MATH_FIRE) / (MATH_HIT - MATH_FIRE);
    const pts = k === 'wave' ? [src, { x: NET_X, y: 112 }, dst] : [src, dst];
    moveHeroBall(pts, EASE.heavy(q), { rail: 18, blade: 0, wave: 0, fractal: 46, euler: 0 }[k], { rail: '60,240,255', blade: '200,150,255', wave: '255,255,255', fractal: '255,190,60', euler: '255,225,120' }[k]);
    if (k === 'rail') for (let i = 0; i < 3; i++) c.cubes.push({ x: ball.x + (Math.random() - 0.5) * 20, y: ball.y + (Math.random() - 0.5) * 20, vx: (Math.random() - 0.5) * 3, vy: -Math.random() * 2, rot: Math.random() * 3, vr: (Math.random() - 0.5) * 0.3, s: 6 + Math.random() * 10, t: 30 });
  }
  if (at(MATH_HIT)) {
    heavy(c.tx, 262, 3.2); ball.squashT = 8; ball.fx = null;
    shake = 16; sfx('explode');
    effects.push({ x: dst.x, y: 260, t: 8 }, { x: dst.x, y: 260, t: 6 });
    if (k === 'blade') T.flat = true;
    if (k === 'rail' || k === 'wave' || k === 'fractal') c.knock = true;
    if (k === 'euler') c.soul = { x: T.x, y: T.y - 10 };
    if (k === 'rail') for (let i = 0; i < 24; i++) c.cubes.push({ x: dst.x, y: 250, vx: (Math.random() - 0.5) * 9, vy: -2 - Math.random() * 6, rot: 0, vr: (Math.random() - 0.5) * 0.4, s: 8 + Math.random() * 14, t: 40 });
  }
  if (c.knock && c.t > MATH_HIT && c.t < MATH_HIT + 12) { T.x += s * 6; T.x = T.side === 0 ? Math.max(32, T.x) : Math.min(400, T.x); }
  if (c.t >= MATH_END) {
    P.state = JUMP; P.vy = 0;
    ball.x = dst.x; ball.y = BALL_GROUND_Y - 4; ball.vx = 0; ball.vy = 8;
    ball.unblockable = true; ball.power = false;
    cine = null;
  }
}

function mathSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  if (k === 'rail') return { x: P.x + s * 150, y: P.y - 58 };
  if (k === 'blade') return { x: P.x + s * 70, y: 50 };
  if (k === 'wave') return { x: P.x - s * 20 + 64, y: P.y - 60 };
  if (k === 'fractal') return { x: P.x + s * 30, y: 80 };
  return { x: c.tx, y: -40 };
}

// ----- 카메라 -----
function mathCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  const head = { x: P.x, y: P_GROUND_Y - 90 - 20 };
  if (k === 'rail') return camKeys(t, [
    [0, H], [16, { x: P.x + s * 20, y: P.y - 40, z: 1.7, r: -s * 0.09 }],          // 발밑에서 치솟는 로우 앵글
    [24, { x: head.x, y: head.y, z: 1.9, r: -s * 0.05 }], [36, { x: head.x + s * 3, y: head.y + 2, z: 5.2, r: 0 }], // 안경 렌즈로 초근접
    [50, { x: head.x + s * 3, y: head.y + 2, z: 5.6, r: 0 }], [58, H], [84, H]]);
  if (k === 'blade') return camKeys(t, [
    [0, { x: 216, y: 152, z: 0.72, r: s * 0.55 }], [26, { x: 216, y: 140, z: 0.8, r: s * 0.12 }], // 위에서 내려다보다가 스위핑 회전
    [44, { x: P.x + s * 60, y: 120, z: 1.25, r: 0 }], [60, H], [84, H]]);
  if (k === 'wave') return camKeys(t, [
    [0, { x: P.x - s * 50, y: 150, z: 1.55, r: 0 }], [26, { x: P.x - s * 30, y: 140, z: 1.45, r: 0 }], // 뒤에서
    [60, { x: (P.x + c.tx) / 2, y: 140, z: 1.15, r: 0 }], [70, { x: c.tx, y: 170, z: 1.35, r: 0 }], [84, H]]); // 상대 쪽으로 패닝
  if (k === 'fractal') {
    const bx = mathSource(c).x, by = mathSource(c).y;
    if (t < MATH_FIRE) return { x: bx, y: by + 20, z: 1.2 + Math.min(1, t / 20) * 0.6, r: t * 0.07 }; // 공 중심 360도 궤도
    return camKeys(t, [[MATH_FIRE, { x: bx, y: by + 20, z: 1.8, r: MATH_FIRE * 0.07 }], [MATH_HIT + 4, { ...H, r: Math.PI * 2 * Math.round(MATH_FIRE * 0.07 / (Math.PI * 2)) }], [84, H]]);
  }
  // euler: 초고속 줌아웃 → 우주 → 신의 시선 → 복귀
  const cm = camKeys(t, [[0, H], [14, { x: 216, y: 120, z: 0.32, r: 0 }], [40, { x: 216, y: 90, z: 0.42, r: -0.05 }], [58, { x: 216, y: 140, z: 1, r: 0 }], [84, H]]);
  cm.space = true;
  return cm;
}

// ----- 월드 (카메라 안) -----
function mathBG(c, k) {
  const key = c.sk.key, t = c.t;
  const pal = { rail: ['2,26,31', '60,240,255'], blade: ['10,10,10', '200,200,200'], wave: ['4,8,30', '90,168,255'], fractal: ['0,0,0', '255,200,80'], euler: ['18,5,31', '255,216,77'] }[key];
  if (key !== 'euler') { ctx.fillStyle = `rgba(${pal[0]},${0.9 * k})`; ctx.fillRect(-500, -500, 1450, 1300); }
  else { ctx.fillStyle = `rgba(${pal[0]},${0.55 * k})`; ctx.fillRect(-900, -900, 2300, 2100); }
  if (key === 'fractal') return;
  // 복소평면 격자
  ctx.strokeStyle = `rgba(${pal[1]},${0.3 * k})`; ctx.lineWidth = 0.8;
  for (let i = 0; i <= 14; i++) { const y = 170 + i * i * 0.9; ctx.beginPath(); ctx.moveTo(-500, y); ctx.lineTo(950, y); ctx.stroke(); }
  for (let i = -20; i <= 20; i++) { ctx.beginPath(); ctx.moveTo(216 + i * 10, 170); ctx.lineTo(216 + i * 70, 420); ctx.stroke(); }
  ctx.strokeStyle = `rgba(${pal[1]},${0.85 * k})`; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(-500, 236); ctx.lineTo(950, 236); ctx.moveTo(216, 170); ctx.lineTo(216, 420); ctx.stroke();
  neon('Re', 420, 230, 10, `rgb(${pal[1]})`); neon('Im', 230, 180, 10, `rgb(${pal[1]})`);
}

function drawMathWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  const k = t > MATH_END - 8 ? (MATH_END - t) / 8 : Math.min(1, t / 5);
  mathBG(c, k);
  const asm = Math.min(1, t / 26);
  for (const m of c.sym) neon(m.ch, m.x, m.y, 10, `rgba(${key === 'euler' ? '255,216,77' : '120,240,255'},${Math.max(0, m.t / 40)})`);

  if (key === 'rail') {
    // lim 기호가 기어처럼 돌며 조립되는 홀로그램 포신 + ∫ 자기장 코일
    const L = 220 * asm, ox = P.x + s * 4, oy = P.y - 28, ang = s > 0 ? -0.2 : Math.PI + 0.2;
    ctx.save(); ctx.translate(ox, oy); ctx.rotate(ang);
    ctx.shadowBlur = 16;
    for (let x = 0; x < L; x += 11) { // 기어처럼 회전하는 lim 링
      const sp = t * 0.6 + x * 0.2;
      ctx.save(); ctx.translate(x, 0); ctx.scale(0.35, 1); ctx.rotate(sp);
      ctx.strokeStyle = x % 22 ? '#2a5cff' : '#ff2bd6'; ctx.shadowColor = ctx.strokeStyle; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(0, 0, 13, 0, 5.5); ctx.stroke(); ctx.restore();
    }
    ctx.strokeStyle = 'rgba(60,240,255,.95)'; ctx.shadowColor = '#3cf0ff'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(L, -9); ctx.moveTo(0, 9); ctx.lineTo(L, 9); ctx.stroke();
    for (let x = 14; x < L; x += 24) {
      neon('∫ₐᵇdx', x, -16 + Math.sin(t * 0.7 + x) * 3, 7, '#ff2bd6');
      for (let p = 0; p < 2; p++) { ctx.fillStyle = '#ffd0ff'; ctx.fillRect(x + (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 26, 1.5, 1.5); }
    }
    ctx.restore();
    if (t < 26) for (let i = 0; i < 10; i++) neon('lim', ox + s * Math.random() * L, oy - 20 - Math.random() * 30, 7 + Math.random() * 4, i % 2 ? '#2a5cff' : '#3cf0ff');
    if (t >= MATH_FIRE && t < MATH_HIT + 5) { // 음속 미적분 에너지 포
      ctx.save(); ctx.strokeStyle = 'rgba(220,255,255,.95)'; ctx.lineWidth = Math.max(1, 12 - (t - MATH_FIRE) * 1.5); ctx.shadowColor = '#ff2bd6'; ctx.shadowBlur = 24;
      const src = mathSource(c); ctx.beginPath(); ctx.moveTo(src.x, src.y); ctx.lineTo(ball.x, ball.y); ctx.stroke(); ctx.restore();
      for (let i = 0; i < 4; i++) { ctx.strokeStyle = `rgba(60,240,255,${0.6 - i * 0.12})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(mathSource(c).x, mathSource(c).y, 8 + (t - MATH_FIRE) * 6 + i * 6, 0, 7); ctx.stroke(); }
    }
    for (const q of c.cubes) if (q.t > 0) wireCube(q.x, q.y, q.s, q.rot, q.t % 2 ? '#3cf0ff' : '#ff2bd6', Math.min(1, q.t / 20));
  }

  if (key === 'blade') {
    // [A] 괄호 → 유리 조각으로 분열 → 수직 정렬 → 투명 행렬 대검
    const bx = P.x + s * 70, by = 120;
    if (t < 16) {
      ctx.save(); ctx.globalAlpha = Math.min(1, t / 6);
      neon('[', bx - 44, by + 16, 70, '#a855ff'); neon(']', bx + 44, by + 16, 70, '#a855ff');
      neon('A', bx, by + 10, 34, '#ffffff'); neon('N×N', bx, by + 34, 9, '#d8b4ff');
      ctx.restore();
    }
    const swing = t < MATH_FIRE ? -1.25 : Math.min(1.05, -1.25 + (t - MATH_FIRE) * 0.7);
    const bladeLen = 250;
    c.shards.forEach((sh, i) => {
      let x, y, rot = sh.r + t * 0.2;
      const ex = bx + Math.cos(sh.a) * (sh.d + Math.max(0, t - 12) * 5), ey = by + Math.sin(sh.a) * (sh.d + Math.max(0, t - 12) * 4);
      if (t < 12) { x = bx + Math.cos(sh.a) * sh.d * 0.5; y = by + Math.sin(sh.a) * sh.d * 0.5; }
      else if (t < 24) { x = ex; y = ey; }
      else {
        const u = ease((t - 24) / 14), along = (i / c.shards.length) * bladeLen;
        const a = s * swing, px = P.x + Math.sin(a) * along, py = P.y - 20 - Math.cos(a) * along;
        x = ex + (px - ex) * u; y = ey + (py - ey) * u; rot = rot * (1 - u) + a * u;
      }
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.fillStyle = 'rgba(220,210,255,.35)'; ctx.strokeStyle = 'rgba(200,170,255,.9)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(0, -sh.sz); ctx.lineTo(sh.sz * 0.6, sh.sz * 0.5); ctx.lineTo(-sh.sz * 0.6, sh.sz * 0.4); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    if (t >= 34) { // 완성된 대검: UV 절단선
      ctx.save(); ctx.translate(P.x, P.y - 20); ctx.rotate(s * swing);
      ctx.shadowColor = '#a855ff'; ctx.shadowBlur = 22;
      ctx.strokeStyle = '#d6b3ff'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -bladeLen - 14); ctx.stroke();
      ctx.fillStyle = 'rgba(168,85,255,.22)'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-7, -bladeLen); ctx.lineTo(0, -bladeLen - 20); ctx.lineTo(7, -bladeLen); ctx.lineTo(9, 0); ctx.fill();
      ctx.restore();
    }
    // 상대 코트 X·Y·Z 축 (Z는 내리치는 순간 지워짐)
    if (t >= 30 && t < MATH_HIT + 14) {
      const ax = c.tx, ay = 250;
      ctx.save(); ctx.lineWidth = 1.6; ctx.font = 'bold 9px serif';
      [['X', 50, 0, '#ff5a5a'], ['Y', -30, -14, '#5aff8a'], ['Z', 0, -60, '#5ab0ff']].forEach(([n, dx, dy, col]) => {
        if (n === 'Z' && t >= MATH_HIT) return;
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + dx, ay + dy); ctx.stroke(); ctx.fillText(n, ax + dx + 3, ay + dy);
      });
      ctx.restore();
    }
    if (t >= MATH_HIT) { // 상대 코트가 종이처럼 가로로 찢어짐
      const q = Math.min(1, (t - MATH_HIT) / 4), x0 = c.tx - 150, x1 = c.tx + 150;
      ctx.fillStyle = 'rgba(245,245,245,.95)';
      ctx.beginPath(); ctx.moveTo(x0, 214);
      for (let x = x0; x <= x1; x += 12) ctx.lineTo(x, 214 - ((x * 7) % 9) * q);
      for (let x = x1; x >= x0; x -= 12) ctx.lineTo(x, 220 + ((x * 5) % 11) * q);
      ctx.closePath(); ctx.fill();
    }
  }

  if (key === 'wave') {
    const cx = P.x - s * 20, cy = P.y - 60;
    ctx.save(); ctx.globalAlpha = asm;
    // 단위원 S¹ 마법진
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.4; ctx.shadowColor = '#9ad0ff'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(cx, cy, 78 * asm, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, 70 * asm, 0, 7); ctx.stroke();
    for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12 + t * 0.015; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 70 * asm, cy + Math.sin(a) * 70 * asm); ctx.lineTo(cx + Math.cos(a) * 78 * asm, cy + Math.sin(a) * 78 * asm); ctx.stroke(); }
    neon('S¹', cx, cy - 84, 11, '#ffffff');
    // sin(파랑)·cos(빨강) DNA 이중나선 가속기 링
    for (const [col, ph] of [['#3c8cff', 0], ['#ff3b4a', Math.PI]]) {
      ctx.strokeStyle = col; ctx.shadowColor = col; ctx.lineWidth = 3; ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.06) { const r = 64 + Math.sin(a * 8 + t * 0.35 + ph) * 9; ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.32); }
      ctx.stroke();
    }
    // 네트 위 거대 유리 프리즘
    const pr = Math.min(1, Math.max(0, (t - 14) / 12));
    ctx.fillStyle = 'rgba(200,230,255,.28)'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(NET_X, 110 - 46 * pr); ctx.lineTo(NET_X - 24 * pr, 150); ctx.lineTo(NET_X + 24 * pr, 150); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    if (t >= MATH_FIRE) {
      const cols = ['#ff3b3b', '#ff9a3b', '#ffe03b', '#5aff5a', '#3bd0ff', '#3b6bff', '#9a5aff', '#ff5ad1'];
      for (let i = 0; i < 8; i++) {
        ctx.save(); ctx.strokeStyle = cols[i]; ctx.lineWidth = 3; ctx.shadowColor = cols[i]; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.moveTo(NET_X, 125); ctx.quadraticCurveTo((NET_X + c.tx) / 2, 60 + i * 22, c.tx, 248); ctx.stroke(); ctx.restore();
      }
    }
    if (t >= MATH_HIT) { // 공명 대폭발 + 천장까지 솟는 빛의 기둥
      const q = t - MATH_HIT, w = Math.max(0, 36 - q * 1.5);
      const g = ctx.createLinearGradient(c.tx - w, 0, c.tx + w, 0);
      g.addColorStop(0, 'rgba(120,180,255,0)'); g.addColorStop(0.5, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,120,140,0)');
      ctx.fillStyle = g; ctx.fillRect(c.tx - w, -400, w * 2, 660);
      for (let i = 0; i < 4; i++) {
        const r = (q - i * 2.5) * 11; if (r <= 0) continue;
        ctx.strokeStyle = i % 2 ? `rgba(255,90,110,${Math.max(0, 1 - r / 240)})` : `rgba(90,160,255,${Math.max(0, 1 - r / 240)})`; ctx.lineWidth = 3; ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.06) { const rr = r + Math.sin(a * 12 + q) * 7; ctx.lineTo(c.tx + Math.cos(a) * rr, 250 + Math.sin(a) * rr * 0.45); }
        ctx.stroke();
      }
    }
  }

  if (key === 'fractal') {
    const m = getMandel(), bx = ball.x, by = ball.y;
    // 체육관이 만화경 프랙탈로 빨려 들어감
    if (t >= 6 && t < MATH_FIRE) {
      const sz = Math.min(1.6, (t - 6) / 14);
      ctx.save(); ctx.translate(bx, by); ctx.globalAlpha = 0.85;
      for (let i = 0; i < 6; i++) { ctx.rotate(Math.PI / 3); ctx.save(); ctx.scale(i % 2 ? -1 : 1, 1); ctx.drawImage(m, 0, -60 * sz, 160 * sz, 120 * sz); ctx.restore(); }
      ctx.restore();
      const g = ctx.createRadialGradient(bx, by, 3, bx, by, 70 * Math.min(1, sz));
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.65, 'rgba(0,0,0,.92)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, 70, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,200,80,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(bx, by, 26 + Math.sin(t) * 2, 0, 7); ctx.stroke();
    }
    // 세포 분열하는 황금 ∞
    const n = Math.min(c.inf.length, t * 3);
    for (let i = 0; i < n; i++) { const f = c.inf[i]; const a = f.a + t * f.sp * (t < MATH_FIRE ? 1 : -3), d = t < MATH_FIRE ? f.d * (1 - Math.min(0.7, t / 90)) : f.d + (t - MATH_FIRE) * 14; neon('∞', bx + Math.cos(a) * d, by + Math.sin(a) * d * 0.7, 7 + (i % 4) * 2, '#ffc94d'); }
    if (t >= 12 && t < MATH_FIRE) neon('∑ aₙ  (n = 1 → ∞)', bx, by - 84, 12, '#fff3c0');
    if (t >= MATH_HIT) { // 나이테처럼 겹겹이 퍼지는 프랙탈 충격파
      for (let i = 0; i < 6; i++) {
        const r = (t - MATH_HIT - i * 1.5) * 16; if (r <= 0) continue;
        ctx.save(); ctx.globalAlpha = Math.max(0, 0.9 - r / 420);
        ctx.beginPath(); ctx.arc(c.tx, 250, r, 0, 7); ctx.arc(c.tx, 250, Math.max(0, r - 10), 0, 7, true); ctx.clip();
        ctx.drawImage(m, c.tx - r, 250 - r, r * 2, r * 2); ctx.restore();
        ctx.strokeStyle = `rgba(255,200,80,${Math.max(0, 0.9 - r / 420)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(c.tx, 250, r, 0, 7); ctx.stroke();
      }
    }
  }

  if (key === 'euler') {
    // 복소평면 바닥 위 e·i·π·1·0 탑 → 황금 고딕 대성당
    const ch = ['e', 'i', 'π', '1', '0'], cx = 216, base = 236;
    ctx.save(); ctx.globalAlpha = Math.max(0, k);
    for (let col = 0; col < 9; col++) {
      const x = cx - 240 + col * 60, hgt = Math.min(12, Math.floor(t / 2.2) - Math.abs(col - 4));
      for (let r = 0; r < hgt; r++) neon(ch[(col + r) % 5], x, base - r * 16, 13, r % 3 ? '#ffd84d' : '#fff8e0');
      if (hgt >= 10) { // 첨탑
        ctx.strokeStyle = 'rgba(255,216,77,.9)'; ctx.lineWidth = 1.4; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(x - 8, base - 160); ctx.lineTo(x, base - 200); ctx.lineTo(x + 8, base - 160); ctx.stroke();
        if (col < 8) { ctx.beginPath(); ctx.moveTo(x, base - 120); ctx.quadraticCurveTo(x + 30, base - 175, x + 60, base - 120); ctx.stroke(); }
      }
    }
    if (t >= 18) { // 장미창
      ctx.strokeStyle = 'rgba(255,240,200,.85)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(cx, base - 230, 34, 0, 7); ctx.stroke();
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * 0.02; ctx.beginPath(); ctx.moveTo(cx, base - 230); ctx.lineTo(cx + Math.cos(a) * 34, base - 230 + Math.sin(a) * 34); ctx.stroke(); }
    }
    ctx.restore();
    // 천장 위 입체 회전 오일러 마법진
    if (t >= 12) {
      ctx.save(); ctx.translate(cx, -70); ctx.scale(1, 0.32 + Math.sin(t * 0.05) * 0.06); ctx.rotate(t * 0.025);
      ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 3; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 16;
      for (const r of [140, 118, 96]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); }
      ctx.font = 'bold 14px serif'; ctx.fillStyle = '#fff6d0';
      const ring = ' e^(iπ) + 1 = 0  ·';
      for (let i = 0; i < 36; i++) { ctx.save(); ctx.rotate(i * Math.PI / 18); ctx.fillText(ring[i % ring.length], 0, -126); ctx.restore(); }
      ctx.restore();
      neon('e^(iπ) + 1 = 0', cx, -64, 18, '#fff6d0');
    }
    // 황금 왕좌 (공중 부유)
    ctx.fillStyle = 'rgba(255,205,70,.9)'; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 10;
    ctx.fillRect(P.x - 20, P.y + 30, 40, 5); ctx.fillRect(P.x - 20, P.y - 40, 5, 70); ctx.fillRect(P.x + 15, P.y - 40, 5, 70);
    ctx.beginPath(); ctx.moveTo(P.x - 20, P.y - 40); ctx.lineTo(P.x, P.y - 62); ctx.lineTo(P.x + 20, P.y - 40); ctx.fill(); ctx.shadowBlur = 0;
    if (t >= MATH_FIRE) { // 황금빛 신벌의 입자 기둥
      const w = Math.min(46, (t - MATH_FIRE) * 12) * (t > MATH_END - 8 ? (MATH_END - t) / 8 : 1);
      const g = ctx.createLinearGradient(c.tx - w, 0, c.tx + w, 0);
      g.addColorStop(0, 'rgba(255,216,77,0)'); g.addColorStop(0.5, 'rgba(255,252,230,.97)'); g.addColorStop(1, 'rgba(255,216,77,0)');
      ctx.fillStyle = g; ctx.fillRect(c.tx - w, -500, w * 2, 776);
      for (let i = 0; i < 20; i++) { ctx.fillStyle = 'rgba(255,240,180,.9)'; ctx.fillRect(c.tx + (Math.random() - 0.5) * w * 2, -100 + Math.random() * 370, 1.5, 4); }
    }
    if (t >= MATH_HIT) floorText('= 0', c.tx, 262, 70 * Math.max(1, 2 - (t - MATH_HIT) * 0.25), '#ffd84d');
    if (c.soul) { const q = t - MATH_HIT; stickman(c.soul.x, c.soul.y - q * 4, 1.3, Math.sin(q * 0.3) * 0.2, '#ffffff', Math.max(0, 0.9 - q / 18)); }
  }

  // 응축
  if (t > MATH_FIRE - 14 && t < MATH_FIRE) { const sp = mathSource(c); chargeFX(sp.x, sp.y, (t - (MATH_FIRE - 14)) / 14, { rail: '60,240,255', blade: '200,160,255', wave: '150,200,255', fractal: '255,200,80', euler: '255,216,77' }[key]); }
  // 시전자 오라 + 캐릭터
  const auraCol = { rail: '60,240,255', blade: '168,85,255', wave: '120,180,255', fractal: '255,200,80', euler: '255,216,77' }[key];
  const gl = ctx.createRadialGradient(P.x, P.y - 10, 4, P.x, P.y - 10, 60);
  gl.addColorStop(0, `rgba(${auraCol},.6)`); gl.addColorStop(1, `rgba(${auraCol},0)`);
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 10, 60, 0, 7); ctx.fill();
  drawPlayer(P);
  // 상대: 튕겨 나갈 땐 스틱맨처럼 꺾이며 회전
  if (c.knock && t > MATH_HIT) {
    ctx.save(); ctx.translate(T.x, T.y); ctx.rotate(s * (t - MATH_HIT) * 0.35); ctx.translate(-T.x, -T.y); drawPlayer(T); ctx.restore();
    stickman(T.x - s * 10, T.y - 20, 1.2, s * (t - MATH_HIT) * 0.5, key === 'fractal' ? '#ffc94d' : '#3cf0ff', 0.8);
  } else drawPlayer(T);
  drawBall();
}

// ----- 화면 UI (카메라 밖) -----
function drawMathUI(c) {
  const t = c.t, sk = c.sk, key = sk.key, P = c.caster;
  if (!c.init) return;
  const k = t > MATH_END - 8 ? (MATH_END - t) / 8 : Math.min(1, t / 5);
  if (key === 'rail') {
    if (t >= 30 && t < 52) { // 안경 렌즈 위로 흐르는 녹색 연산 코드
      ctx.save(); ctx.globalAlpha = 0.55; ctx.font = 'bold 9px monospace'; ctx.fillStyle = '#3cff7a';
      for (const cd of c.code) for (let j = 0; j < 6; j++) ctx.fillText(String.fromCharCode(0x30 + ((cd.x + j * 7 + t) % 42)), cd.x, cd.y - j * 10);
      ctx.restore();
      ctx.save(); ctx.strokeStyle = 'rgba(200,255,255,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(GW / 2, GH / 2, 190, 120, 0, 0, 7); ctx.stroke(); ctx.restore();
      vignette('0,0,0', 0.85);
    }
    if (t >= 52 && t < MATH_HIT + 2) { // 조준 HUD
      const tx = c.tx, ty = 250, r = 40 - Math.min(1, (t - 52) / 8) * 26;
      ctx.save(); ctx.strokeStyle = '#ff2a3a'; ctx.shadowColor = '#ff2a3a'; ctx.shadowBlur = 10; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(tx, ty, r, 0, 7); ctx.moveTo(tx - r - 8, ty); ctx.lineTo(tx + r + 8, ty); ctx.moveTo(tx, ty - r - 8); ctx.lineTo(tx, ty + r + 8); ctx.stroke();
      const src = mathSource(c); ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(src.x, src.y); ctx.lineTo(tx, ty); ctx.stroke(); ctx.restore();
      neon('[TARGET LOCKED: LIM H→0]', GW / 2, 60, 12, '#ff3a4a');
    }
    if (t >= MATH_FIRE && t < MATH_FIRE + 4) glitch(26);
    if (Math.floor(t) === MATH_FIRE || Math.floor(t) === MATH_HIT) invertFlash();
    scanlines(0.12 * k);
  }
  if (key === 'blade') {
    desaturate(Math.min(1, t / 8) * k);  // 모노크롬
    if (t >= MATH_HIT && t < MATH_HIT + 4) { const fl = Math.floor((t - MATH_HIT) * 2) % 2; ctx.fillStyle = fl ? '#000' : '#fff'; ctx.fillRect(0, 0, GW, GH); ctx.fillStyle = fl ? '#fff' : '#000'; ctx.fillRect(0, 150, GW, 5); }
  }
  if (key === 'wave') { // 좌우 오실로스코프
    for (const side of [0, 1]) {
      const x0 = side ? GW - 92 : 12, y0 = 70;
      ctx.fillStyle = 'rgba(0,20,10,.75)'; ctx.fillRect(x0, y0, 80, 50);
      ctx.strokeStyle = 'rgba(60,255,120,.25)'; ctx.lineWidth = 0.5;
      for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + i * 12.5); ctx.lineTo(x0 + 80, y0 + i * 12.5); ctx.stroke(); }
      const amp = Math.min(1, t / 50) * 20, ph = t < MATH_FIRE - 10 ? (side ? Math.PI : 0) : 0;
      for (const [col, off] of [['#3c8cff', 0], ['#ff3b4a', Math.PI / 2 * Math.max(0, 1 - Math.max(0, t - 45) / 15)]]) {
        ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.beginPath();
        for (let x = 0; x <= 80; x += 2) ctx.lineTo(x0 + x, y0 + 25 + Math.sin(x * 0.25 + t * (0.9 + side * 0.3) + off + ph) * amp * (0.6 + Math.random() * 0.4 * (t < 45)));
        ctx.stroke();
      }
      neon(side ? 'cos' : 'sin', x0 + 40, y0 + 62, 8, '#9affc0');
    }
  }
  if (key === 'fractal') {
    if (t >= 8 && t < MATH_FIRE) zoomBlur(3, 0.035 + Math.min(1, t / 40) * 0.03); // 렌즈 왜곡
    vignette('0,0,0', 0.9 * k);
    if (t >= MATH_FIRE - 3 && t < MATH_FIRE + 6) text('딱!', GW / 2, 150, 46, '#ffffff');
  }
  if (key === 'euler') {
    const h = 30 * Math.min(1, t / 8) * Math.max(0, k);
    cinemaBars(h, '#0b0414', '#ffd84d');
    if (h > 10) {
      ctx.save(); ctx.font = 'italic bold 10px "Times New Roman", serif'; ctx.fillStyle = '#ffd84d'; ctx.textAlign = 'center';
      ctx.fillText('· AEQUATIO PULCHERRIMA · e^(iπ) + 1 = 0 · ARS MAGNA ·', GW / 2 + ((t * 2) % 40) - 20, h - 10);
      ctx.font = 'bold 11px "Batang",serif'; ctx.fillText('數 理 歸 一  ·  虛 實 交 會  ·  存 在 歸 零', GW / 2, GH - h + 18);
      ctx.restore();
    }
  }
  // 제목 + 대사 (공통)
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const ty = key === 'euler' ? 48 : 22;
  neon(sk.title, GW / 2, ty, 13, sk.color);
  neon(sk.en, GW / 2, ty + 13, 9, '#ffffff');
  if (t >= 24 && t < MATH_FIRE + 12) {
    sk.lines.forEach((ln, i) => {
      const st = 26 + i * 16, n = Math.max(0, Math.min(ln.length, Math.floor((t - st) / 0.5)));
      if (n > 0) text(ln.slice(0, n), GW / 2, (key === 'euler' ? 236 : 262) + i * 16, 10, '#f0fbff');
    });
  }
  ctx.restore();
  if (t >= MATH_HIT && t < MATH_HIT + 3 && key !== 'blade') { ctx.fillStyle = `rgba(255,255,255,${0.7 - (t - MATH_HIT) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
}

function drawSpeech() {
  for (const b of speech) {
    b.t--;
    ctx.save(); ctx.globalAlpha = Math.min(1, b.t / 10);
    ctx.font = 'bold 9px "Malgun Gothic", sans-serif';
    const w = ctx.measureText(b.str).width + 12, x = Math.max(4, Math.min(GW - w - 4, b.p.x - w / 2)), y = b.p.y - 84;
    ctx.fillStyle = 'rgba(10,20,40,.85)'; ctx.beginPath(); ctx.roundRect(x, y, w, 17, 5); ctx.fill();
    ctx.strokeStyle = '#3cf0ff'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#e8fbff'; ctx.textAlign = 'left'; ctx.fillText(b.str, x + 6, y + 12);
    ctx.restore();
  }
  while (speech.length && speech[0].t <= 0) speech.shift();
}

// ----- 숙성 양말 서브 (트롤 스킬, POOP 등급) -----
// 힘없는 서브 + 냄새 진동 → 방독면 심판 등장 → 레드카드 "위생 불량" → 소독약 → 점수가 녹아내리며 -1점
function updateSock() {
  const c = cine, P = c.caster, s = P.side === 0 ? 1 : -1;
  c.t++;
  players.forEach((p) => p.anim++);
  if (c.t <= 40) {
    const k = c.t / 40;
    ball.x = c.px + s * 10 + (NET_X - s * 40 - c.px) * k;
    ball.y = c.py - 50 - Math.sin(k * Math.PI) * 60;
    ball.vx = 0; ball.vy = 0; ball.rot += 0.05;
  }
  if (c.t === 6) sfx('buzz');
  if (c.t === SOCK_REF || c.t === SOCK_REF + 4) sfx('whistle');
  if (c.t === SOCK_CARD) { heavy(GW / 2, 120, 1.2); }
  if (c.t >= SOCK_SPRAY && c.t < SOCK_SPRAY + 20) {
    for (let i = 0; i < 3; i++) c.mist.push({ x: c.refX(c) + s * 14, y: P.y - 30, vx: s * (2 + Math.random() * 4), vy: (Math.random() - 0.6) * 2, t: 30 });
    if (c.t % 5 === 0) sfx('spray');
  }
  for (const m of c.mist) { m.x += m.vx; m.y += m.vy; m.vx *= 0.96; m.t--; }
  if (c.t === SOCK_MINUS) {
    P.score = Math.max(0, P.score - 1); // 위생 불량 패널티 -1점
    sfx('fail');
  }
  if (c.t >= SOCK_END) {
    cine = null;
    lastScorer = 1 - P.side;   // 상대가 서브
    state = 'fadeOut';
  }
}

// 방독면 심판
function drawReferee(x, y, t, dir, running, cardUp) {
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
  const leg = running ? Math.sin(t * 1.2) * 6 : 0;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-3, -14); ctx.lineTo(-4 - leg, 0); ctx.moveTo(3, -14); ctx.lineTo(4 + leg, 0); ctx.stroke();
  // 줄무늬 심판복
  ctx.save(); ctx.beginPath(); ctx.roundRect(-9, -34, 18, 21, 4); ctx.clip();
  for (let n = 0; n < 5; n++) { ctx.fillStyle = n % 2 ? '#111' : '#fff'; ctx.fillRect(-9 + n * 4, -34, 4, 21); }
  ctx.restore();
  // 팔 (카드 든 팔)
  ctx.strokeStyle = '#f2c9a0'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(-7, -30); ctx.lineTo(-12, -20 + (running ? -leg : 0));
  if (cardUp) { ctx.moveTo(7, -31); ctx.lineTo(12, -50); } else { ctx.moveTo(7, -30); ctx.lineTo(12, -20); }
  ctx.stroke();
  if (cardUp) { ctx.fillStyle = '#e8141e'; ctx.fillRect(9, -64, 11, 15); }
  // 방독면 머리
  ctx.fillStyle = '#3a3a3a'; ctx.beginPath(); ctx.arc(0, -43, 9, 0, 7); ctx.fill();
  ctx.fillStyle = '#9ad7ff';
  ctx.beginPath(); ctx.arc(-3.5, -45, 3, 0, 7); ctx.arc(3.5, -45, 3, 0, 7); ctx.fill();
  ctx.fillStyle = '#666'; ctx.beginPath(); ctx.ellipse(4, -38, 4, 3.5, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#222'; ctx.fillRect(6, -40, 4, 4);
  ctx.restore();
}

function drawSock() {
  const c = cine, t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1;
  const k = t > SOCK_END - 6 ? (SOCK_END - t) / 6 : Math.min(1, t / 5);
  // 냄새 진동 (소독약 뿌리면 점점 사라짐)
  const clean = t < SOCK_SPRAY ? 1 : Math.max(0.15, 1 - (t - SOCK_SPRAY) / 25);
  ctx.fillStyle = `rgba(90,140,20,${(0.25 + Math.sin(t * 0.5) * 0.08) * k * clean})`; ctx.fillRect(0, 0, GW, GH);
  ctx.strokeStyle = `rgba(120,200,40,${0.8 * k * clean})`; ctx.lineWidth = 2.5;
  for (let i = 0; i < 14; i++) {
    const bx = (i * 37 + 10) % GW, by = 290 - ((t * 3 + i * 41) % 260);
    ctx.beginPath();
    for (let j = 0; j <= 6; j++) ctx.lineTo(bx + Math.sin(j * 1.2 + t * 0.3 + i) * 6, by - j * 6);
    ctx.stroke();
  }
  for (let i = 0; i < 6 * clean; i++) {
    const fx = ball.x + Math.cos(t * 0.6 + i * 1.1) * (18 + i * 3), fy = ball.y + Math.sin(t * 0.8 + i * 2) * 14;
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(fx, fy, 1.6, 0, 7); ctx.fill();
  }
  // 둥둥 떠다니는 양말
  ctx.save(); ctx.translate(ball.x - 26, ball.y - 18); ctx.rotate(Math.sin(t * 0.3) * 0.4);
  ctx.fillStyle = '#d8d0b0'; ctx.beginPath(); ctx.roundRect(-4, -12, 8, 16, 2); ctx.fill();
  ctx.beginPath(); ctx.roundRect(-4, 0, 13, 6, 3); ctx.fill();
  ctx.fillStyle = '#7a6a3a'; ctx.fillRect(-4, -12, 8, 3);
  ctx.restore();
  drawPlayer(c.target);
  drawPlayer(P);
  drawBall();
  // 심판 등장
  if (t >= SOCK_REF) {
    const rx = c.refX(c);
    drawReferee(rx, 276, t, s, t < SOCK_CARD - 2, t >= SOCK_CARD);
    if (t < SOCK_CARD + 4) text('삐익—!', rx, 214, 12, '#ffffff');
  }
  // 소독약 안개
  for (const m of c.mist) { ctx.fillStyle = `rgba(230,250,255,${Math.max(0, m.t / 40)})`; ctx.beginPath(); ctx.arc(m.x, m.y, 5 + (30 - m.t) * 0.4, 0, 7); ctx.fill(); }
  // 레드카드 크게
  if (t >= SOCK_CARD && t < SOCK_SPRAY + 6) {
    const z = Math.min(1, (t - SOCK_CARD + 1) / 4);
    ctx.save(); ctx.translate(GW / 2, 120); ctx.rotate(-0.12); ctx.scale(z, z);
    ctx.fillStyle = '#e8141e'; ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.roundRect(-46, -60, 92, 120, 8); ctx.fill();
    ctx.shadowBlur = 0;
    text('RED CARD', 0, -28, 14, '#ffffff');
    text('위생', 0, 6, 22, '#ffffff');
    text('불량', 0, 34, 22, '#ffffff');
    ctx.restore();
  }
  // 점수판 숫자가 냄새에 녹아내림
  if (t >= SOCK_SPRAY + 4) {
    const sx = P.side === 0 ? 30 : GW - 30, q = t - SOCK_SPRAY - 4;
    const col = P.side === 0 ? '207,227,255' : '255,214,211';
    for (let i = 0; i < 5; i++) {
      const dx = sx - 10 + i * 5, len = Math.min(40, q * (1.5 + (i % 3) * 0.7));
      ctx.fillStyle = `rgba(${col},.9)`;
      ctx.fillRect(dx - 1.5, 30, 3, len);
      ctx.beginPath(); ctx.arc(dx, 30 + len, 2.6, 0, 7); ctx.fill();
    }
  }
  // 글자
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  text('숙성 양말 서브', GW / 2, 46, 20 * Math.min(1, t / 5), '#b6ff5a');
  text('[트롤링 서브]', GW / 2, 62, 10, '#e8ffd0');
  const line = '이거 받아보면... 어? 심판이 왜 방독면을...';
  const n = Math.min(line.length, Math.floor((t - 4) / 1.1));
  if (n > 0 && t < SOCK_CARD) {
    ctx.font = 'bold 10px "Malgun Gothic", sans-serif';
    const w = ctx.measureText(line).width + 14;
    const bx = Math.max(6, Math.min(GW - w - 6, c.px - w / 2)), by = 150;
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.roundRect(bx, by, w, 20, 6); ctx.fill();
    ctx.fillStyle = '#333'; ctx.textAlign = 'left'; ctx.fillText(line.slice(0, n), bx + 7, by + 14);
  }
  if (t >= SOCK_MINUS) {
    const sc = Math.max(1, 2 - (t - SOCK_MINUS) * 0.2);
    text('위생 불량 패널티!', GW / 2, 116, 24 * sc, '#ff4040');
    text('-1점', GW / 2, 144, 22, '#ffffff');
  }
  ctx.restore();
}

// ----- 위인 강림 (역사왕, 랜덤 5종 · 수묵화 연출) -----
const HIST_REVEAL = 30, HIST_FIRE = 74, HIST_HIT = 86, HIST_END = 98;
const HIST_REAL_FIRE = 125, HIST_REAL_HIT = 153, HIST_REAL_END = 178; // 실제 프레임: 발사 5초 → 공 비행 1.1초 → 임팩트 후 1초
const HEROES = [
  { key: 'ship', title: '충무공의 궤적: 울돌목 거북선 포격', who: '이순신 장군', color: '#c8102e',
    line: '죽고자 하는 자는 살고, 살고자 하는 자는 죽는다! 울돌목의 파도를 받아라!', callig: ['必死則生', '必生則死'] },
  { key: 'arrow', title: '태조의 신궁: 이성계의 편전 궤적', who: '이성계', color: '#2a56c6',
    line: '백발백중의 활시위다. 내 궁시(弓矢)는 한 치의 오차도 없다!', callig: ['百發百中'] },
  { key: 'thunder', title: '귀주대첩: 강감찬의 뇌전 강림', who: '강감찬 장군', color: '#b98cff',
    line: '하늘이 노하면 벼락이 내리친다. 귀주의 뇌전을 받아라!', callig: ['龜州大捷'] },
  { key: 'hangul', title: '훈민정음: 세종의 해례본 통찰', who: '세종대왕', color: '#d9a520',
    line: '너희의 동선은 이미 훈민정음처럼 명백하게 풀어냈다.', callig: ['訓民正音'] },
  { key: 'gyebaek', title: '황산벌의 맹세: 계백의 결사 방어', who: '계백 장군', color: '#d2551e',
    line: '살아서 욕되느니 죽어서 이름을 남기리라! 결사대여, 이 코트를 지켜라!', callig: ['決死'] },
];
const JAMO = 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㆍ';
const SCROLL_TEXT = ['나랏말ᄊᆞ미 듕귁에 달아', '문ᄍᆞᆼ와로 서르 ᄉᆞᄆᆞᆺ디 아니ᄒᆞᆯᄊᆡ', '이런 젼ᄎᆞ로 어린 ᄇᆡᆨ셩이', '니르고져 홀 배 이셔도'];
const glyphs = [];      // 코트에 흩어진 한글
const GUARD_FRAMES = 250; // 계백 결사 방어 (10초)

function updateHistory() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, h = c.hero.key;
  // 실제 프레임(c.f) → 연출 시간(c.t): 조립·대사 구간을 길게, 임팩트는 슬로모션
  c.f = (c.f || 0) + 1;
  const prev = c.t;
  c.t = c.f <= HIST_REAL_FIRE ? c.f * (HIST_FIRE / HIST_REAL_FIRE)
    : c.f <= HIST_REAL_HIT ? HIST_FIRE + (c.f - HIST_REAL_FIRE) * ((HIST_HIT - HIST_FIRE) / (HIST_REAL_HIT - HIST_REAL_FIRE))
    : HIST_HIT + (c.f - HIST_REAL_HIT) * ((HIST_END - HIST_HIT) / (HIST_REAL_END - HIST_REAL_HIT));
  const at = (x) => prev < x && c.t >= x;
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.parts = []; c.bolts = [];
    const [mn, mx] = T.side === 0 ? [40, 180] : [252, 392];
    c.tx = h === 'arrow' ? (s > 0 ? GW - 24 : 24) : Math.max(mn, Math.min(mx, T.x));
  }
  for (const q of c.parts) { q.x += q.vx; q.y += q.vy; q.vy += q.g || 0; q.t--; }
  c.parts = c.parts.filter((q) => q.t > 0);
  if (at(HIST_REVEAL)) { sfx({ arrow: 'twang', hangul: 'chime', thunder: 'zap', gyebaek: 'rumble', ship: 'boom' }[h]); shake = 6; }
  // 종류별 파티클
  if (c.t > HIST_REVEAL && c.t < HIST_FIRE) {
    if (h === 'hangul') c.parts.push({ ch: JAMO[Math.floor(Math.random() * JAMO.length)], x: P.x, y: P.y - 30, vx: (Math.random() - 0.5) * 9, vy: -2 - Math.random() * 3, g: 0.12, t: 50 });
    if (h === 'gyebaek') for (let i = 0; i < 2; i++) c.parts.push({ ember: true, x: Math.random() * GW, y: 280, vx: (Math.random() - 0.5) * 1.5, vy: -1 - Math.random() * 2.5, t: 60 });
    if (h === 'thunder' && c.f % 9 === 0) { c.bolts.push({ x: 40 + Math.random() * 350, t: 4 }); sfx('zap'); }
  }
  for (const b of c.bolts) b.t--;
  c.bolts = c.bolts.filter((b) => b.t > 0);
  // 발사 → 타격
  const src = histSource(c), dst = { x: c.tx, y: BALL_GROUND_Y - 6 };
  if (c.t < HIST_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.2; }
  else if (c.t <= HIST_HIT && h !== 'gyebaek') {
    // 히어로 볼: 종류마다 궤적이 다름 (포탄 포물선 · 화살 일직선 · 낙뢰 · 페인트 로브)
    const q = (c.t - HIST_FIRE) / (HIST_HIT - HIST_FIRE);
    const e = h === 'arrow' ? EASE.arrow(q) : h === 'hangul' ? EASE.lob(q) : EASE.heavy(q);
    moveHeroBall([src, dst], e, { ship: 70, arrow: 0, thunder: 0, hangul: 64 }[h], { ship: '230,40,50', arrow: '90,150,255', thunder: '220,200,255', hangul: '255,210,90' }[h]);
  }
  if (at(HIST_FIRE - 14)) sfx('charge');
  if (at(HIST_FIRE - 0.7)) { hitStop = 5; sfx('suck'); }
  if (at(HIST_FIRE)) { if (h !== 'gyebaek') sfx('flight', 1, 1.1); const sp = histSource(c); heavy(sp.x, Math.max(-20, sp.y), 2.2); sfx(h === 'arrow' ? 'twang' : h === 'hangul' ? 'chime' : 'explode'); if (h === 'thunder') sfx('zap'); }
  if (at(HIST_FIRE) && h !== 'ship' && h !== 'gyebaek') { skillRelease(c, histSource(c), h); return; }
  if (at(HIST_HIT) && h !== 'gyebaek') {
    heavy(c.tx, 262, h === 'hangul' ? 1.6 : 3.2); ball.squashT = 8; ball.fx = null;
    shake = 14; sfx('explode');
    if (h === 'arrow') craters.push({ x: dst.x, seed: Math.random(), type: 'tear', dir: s });
    if (h === 'thunder') { craters.push({ x: dst.x, seed: Math.random() * 99, type: 'bolt' }); T.frozen = true; T.stunned = true; }
    if (h === 'hangul') for (let i = 0; i < 30; i++) c.parts.push({ butterfly: true, ch: JAMO[i % JAMO.length], x: dst.x, y: 250, vx: (Math.random() - 0.5) * 7, vy: -1 - Math.random() * 5, g: 0.05, t: 50 });
    if (h === 'ship') for (let i = 0; i < 40; i++) c.parts.push({ ink: true, x: dst.x + (Math.random() - 0.5) * 30, y: 260, vx: (Math.random() - 0.5) * 8, vy: -3 - Math.random() * 8, g: 0.3, t: 40 });
  }
  if (h === 'gyebaek' && at(HIST_FIRE)) { P.guardT = GUARD_FRAMES; P.whirlT = 125; heroStamp('決死', '#c4161c'); shake = 10; sfx('rumble'); popups.push({ text: '결사 방어! + 5초 회전 회오리', x: P.x, y: P.y - 60, t: 40, color: '#ff7a3a' }); }
  if (c.t >= HIST_END) {
    if (h !== 'gyebaek') { ball.x = dst.x; ball.y = BALL_GROUND_Y - 4; ball.vx = 0; ball.vy = 8; ball.unblockable = true; ball.power = false; ball.hero = h; }
    else { ball.x = P.x; ball.y = 60; ball.vx = 0; ball.vy = 1; ball.power = false; }
    for (const q of c.parts) if (q.butterfly || q.ch) glyphs.push({ ch: q.ch, x: q.x, y: Math.min(290, q.y), t: 90 });
    P.state = JUMP; P.vy = 0;
    cine = null;
  }
}

function histSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1, h = c.hero.key;
  if (h === 'ship') return { x: P.x - s * 30, y: 200 };   // 거북선 용머리 포통
  if (h === 'arrow') return { x: P.x + s * 40, y: P.y - 40 };
  if (h === 'thunder') return { x: c.tx, y: -60 };
  if (h === 'hangul') return { x: NET_X - s * 26, y: 120 };
  return { x: P.x, y: P.y - 50 };
}

// 계백 결사 방어: 우리 코트에 공이 떨어지려 하면 붉은 충격파로 되받아침
function gyebaekSave(p) {
  heavy(ball.x, 270, 1.6);
  const toward = p.side === 0 ? 1 : -1;
  ball.y = BALL_GROUND_Y - 2; ball.vy = -17; ball.vx = toward * (6 + Math.random() * 4);
  ball.power = true; ball.trail = [];
  effects.push({ x: ball.x, y: 270, t: 8 }, { x: ball.x, y: 270, t: 6 });
  if (p.matrixGuard) { matrixHits.push({ x: ball.x, t: 26, side: p.side }); sfx('zap'); sfx('chime'); }
  else if (p.courtGuard) { matrixHits.push({ x: ball.x, t: 26, side: p.side, court: true }); sfx('thud'); sfx('bell'); }
  else { guardRings.push({ x: ball.x, r: 0 }); matrixHits.push({ x: ball.x, t: 30, side: p.side, gye: true }); heroStamp('決死', '#c4161c'); sfx('explode', 0.6); }
  shake = Math.max(shake, 8); sfx('boom');
}
const guardRings = [];

// ----- 카메라 -----
function histCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, h = c.hero.key, H = CAM_HOME;
  if (!c.init) return H;
  const intro = [[0, H], [12, { x: P.x + s * 30, y: 150, z: 1.25, r: 0 }], [HIST_REVEAL, { x: P.x + s * 30, y: 140, z: 1.3, r: 0 }]];
  if (h === 'ship') return camKeys(t, [...intro, [40, { x: P.x, y: P.y - 60, z: 1.6, r: 0 }], [52, { x: P.x - s * 20, y: 70, z: 2.4, r: 0 }], [66, { x: P.x - s * 20, y: 80, z: 2.2, r: 0 }], [HIST_FIRE, H], [HIST_HIT + 2, { x: c.tx, y: 190, z: 1.3, r: 0 }], [HIST_END, H]]);
  if (h === 'arrow') return camKeys(t, [...intro, [44, { x: P.x - s * 10, y: P.y - 40, z: 1.9, r: s * 0.05 }], [64, { x: (P.x + c.tx) / 2, y: 190, z: 1.35, r: s * 0.03 }], [HIST_FIRE, { x: (P.x + c.tx) / 2, y: 190, z: 1.35, r: 0 }], [HIST_HIT, { x: c.tx - s * 40, y: 220, z: 1.6, r: 0 }], [HIST_END, H]]);
  if (h === 'thunder') return camKeys(t, [...intro, [42, { x: 216, y: 60, z: 1.25, r: -0.04 }], [66, { x: 216, y: 40, z: 1.35, r: 0.03 }], [HIST_FIRE, { x: c.tx, y: 150, z: 1.2, r: 0 }], [HIST_HIT + 2, { x: c.tx, y: 220, z: 1.5, r: 0 }], [HIST_END, H]]);
  if (h === 'hangul') return camKeys(t, [...intro, [50, { x: P.x + s * 60, y: 160, z: 1.3, r: s * 0.04 }], [HIST_FIRE, { x: 216, y: 160, z: 1.15, r: -s * 0.03 }], [HIST_HIT + 4, { x: c.tx, y: 220, z: 1.4, r: 0 }], [HIST_END, H]]);
  return camKeys(t, [...intro, [44, { x: P.x, y: P.y - 30, z: 2.1, r: 0 }], [62, { x: P.x, y: P.y - 30, z: 2.3, r: 0 }], [HIST_FIRE, { x: 216, y: 180, z: 0.95, r: 0 }], [HIST_END, H]]);
}

// ----- 그리기 도구 -----
function inkWaves(t, k, top) {
  for (let L = 0; L < 4; L++) {
    const base = 320 - k * (top - L * 20);
    ctx.fillStyle = ['rgba(20,18,16,.85)', 'rgba(50,46,40,.75)', 'rgba(90,84,74,.6)', 'rgba(140,132,118,.45)'][L];
    ctx.beginPath(); ctx.moveTo(-300, 500);
    for (let x = -300; x <= 750; x += 10) ctx.lineTo(x, base + Math.sin(x / (30 + L * 6) + t * (0.25 + L * 0.06)) * (10 + L * 3) + Math.sin(x / 9 + t) * 2);
    ctx.lineTo(750, 500); ctx.fill();
    ctx.strokeStyle = 'rgba(245,240,230,.75)'; ctx.lineWidth = 1.4; ctx.beginPath(); // 거품 붓터치
    for (let x = -300; x <= 750; x += 10) ctx.lineTo(x, base - 2 + Math.sin(x / (30 + L * 6) + t * (0.25 + L * 0.06)) * (10 + L * 3));
    ctx.stroke();
  }
}

function inkGeneral(x, y, sc, a, swordUp) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
  // 몸 (먹물 번짐으로 쌓은 갑옷 실루엣)
  inkBlot(0, -20, 26, 0.85, 1); inkBlot(0, 10, 32, 0.8, 2); inkBlot(-18, 34, 18, 0.7, 3); inkBlot(18, 34, 18, 0.7, 4);
  inkBlot(0, -52, 14, 0.9, 5);                     // 머리
  ctx.fillStyle = 'rgba(12,10,8,.9)'; ctx.beginPath(); ctx.moveTo(-16, -60); ctx.lineTo(0, -84); ctx.lineTo(16, -60); ctx.fill(); // 투구
  ctx.fillStyle = '#c8102e'; ctx.fillRect(-2, -92, 4, 10); // 투구 술
  // 붉은 장검
  ctx.save(); ctx.translate(26, -10); ctx.rotate(swordUp);
  ctx.shadowColor = '#ff2a2a'; ctx.shadowBlur = 16; ctx.fillStyle = '#d4142b';
  ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-2, -110); ctx.lineTo(0, -122); ctx.lineTo(2, -110); ctx.lineTo(3, 0); ctx.fill();
  ctx.fillStyle = '#3a0a0a'; ctx.fillRect(-9, 0, 18, 3); ctx.fillRect(-2, 3, 4, 14);
  ctx.restore(); ctx.restore();
}

function turtleShip(x, y, sc, dir, t, fire) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * dir, sc);
  ctx.fillStyle = 'rgba(18,16,14,.95)';
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(0, 16, 62, 0); ctx.lineTo(54, -8); ctx.lineTo(-54, -8); ctx.fill(); // 선체
  ctx.beginPath(); ctx.ellipse(0, -10, 50, 18, 0, Math.PI, 0); ctx.fill();                                                       // 거북 등
  ctx.strokeStyle = 'rgba(200,190,170,.7)'; ctx.lineWidth = 1;
  for (let i = -40; i <= 40; i += 10) { ctx.beginPath(); ctx.moveTo(i, -10); ctx.lineTo(i * 0.8, -24); ctx.stroke(); }           // 철갑
  ctx.fillStyle = '#ddd'; for (let i = -44; i <= 44; i += 8) { ctx.beginPath(); ctx.moveTo(i, -24 + Math.abs(i) * 0.25); ctx.lineTo(i + 2, -30 + Math.abs(i) * 0.25); ctx.lineTo(i + 4, -24 + Math.abs(i) * 0.25); ctx.fill(); } // 송곳
  ctx.fillStyle = 'rgba(18,16,14,.95)'; ctx.beginPath(); ctx.moveTo(52, -10); ctx.lineTo(74, -20); ctx.lineTo(80, -14); ctx.lineTo(60, -4); ctx.fill(); // 용머리
  ctx.fillStyle = '#ff1a2e'; ctx.shadowColor = '#ff0020'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(72, -17, 2.2, 0, 7); ctx.fill(); // 핏빛 눈
  if (fire) { ctx.fillStyle = 'rgba(30,25,20,.9)'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(84 + i * 6, -14 + Math.sin(i + t) * 3, 6 - i * 0.6, 0, 7); ctx.fill(); } }
  ctx.restore();
}

function lightning(x0, y0, x1, y1, w, col) {
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.shadowColor = '#c8a0ff'; ctx.shadowBlur = 14; ctx.beginPath(); ctx.moveTo(x0, y0);
  const n = 9; for (let i = 1; i < n; i++) { const q = i / n; ctx.lineTo(x0 + (x1 - x0) * q + (Math.random() - 0.5) * 30, y0 + (y1 - y0) * q); }
  ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
}

function soldierRow(y, sc, n, a, t, col) {
  for (let i = 0; i < n; i++) {
    const x = -260 + i * (1000 / n) + ((i * 37) % 7), bob = Math.sin(t * 0.3 + i) * 1.2;
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(sc, sc); ctx.globalAlpha = a;
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(0, -22, 3.2, 0, 7); ctx.fill(); ctx.fillRect(-3, -19, 6, 12); ctx.fillRect(-3, -7, 2, 7); ctx.fillRect(1, -7, 2, 7);
    ctx.fillRect(4, -36, 1, 30); ctx.beginPath(); ctx.moveTo(3, -36); ctx.lineTo(4.5, -42); ctx.lineTo(6, -36); ctx.fill(); // 창
    ctx.restore();
  }
}

// ----- 월드 (카메라 안) -----
function drawHistWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, hero = c.hero, s = P.side === 0 ? 1 : -1, h = hero.key;
  if (!c.init) return;
  const k = t > HIST_END - 8 ? (HIST_END - t) / 8 : Math.min(1, t / 6);
  const rv = Math.min(1, Math.max(0, (t - HIST_REVEAL) / 12));
  // 먹빛 배경
  const bgc = { ship: '28,26,24', arrow: '16,24,52', thunder: '14,10,24', hangul: '40,32,18', gyebaek: '46,16,8' }[h];
  ctx.fillStyle = `rgba(${t < HIST_REVEAL ? '24,22,20' : bgc},${0.88 * k})`; ctx.fillRect(-500, -500, 1450, 1300);
  // 먹 번짐 텍스처
  for (let i = 0; i < 10; i++) inkBlot(-40 + i * 55, 20 + ((i * 53) % 90), 30 + (i % 3) * 12, 0.12 * k, i);

  if (t >= HIST_REVEAL) {
    if (h === 'ship') {
      inkWaves(t, rv, 110);
      inkGeneral(P.x - s * 18, P.y - 70, 1.5 * rv, 0.85 * rv, s * (t < HIST_FIRE ? -0.5 : 0.9));
      turtleShip(P.x - s * 40, 236, 0.9 * rv, s, t, t >= HIST_FIRE && t < HIST_FIRE + 8);
      if (t >= HIST_FIRE) { // 울돌목 소용돌이를 끌고 날아가는 먹물 포탄
        ctx.strokeStyle = 'rgba(20,18,16,.7)'; ctx.lineWidth = 3;
        for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let a = 0; a < 12; a += 0.4) ctx.lineTo(ball.x - s * a * 3 + Math.cos(a * 2 + t + i) * a, ball.y + Math.sin(a * 2 + t + i) * a); ctx.stroke(); }
      }
      if (t >= HIST_HIT) { // 먹물 용오름 해일
        const q = t - HIST_HIT;
        for (let i = 0; i < 14; i++) inkBlot(c.tx + Math.sin(i * 1.3 + q * 0.4) * (10 + i * 2), 260 - i * 14 * Math.min(1, q / 6), 14 - i * 0.5, 0.75, i + q);
        ctx.fillStyle = 'rgba(20,18,16,.7)'; ctx.beginPath(); ctx.moveTo(c.tx - s * 200, 290);
        ctx.quadraticCurveTo(c.tx, 290 - Math.min(80, q * 10), c.tx + s * 200, 290); ctx.fill();
      }
      for (const q of c.parts) if (q.ink) inkBlot(q.x, q.y, 4, 0.8, q.t);
    }
    if (h === 'arrow') {
      // 한양도성 지도 + 황룡 문양 (수묵 궤적)
      ctx.save(); ctx.globalAlpha = 0.5 * rv; ctx.strokeStyle = '#d9c8a0'; ctx.lineWidth = 1.2;
      ctx.beginPath(); const mx = 216, my = 90;
      for (let a = 0; a <= 6.3; a += 0.3) { const r = 120 + Math.sin(a * 5) * 18 + Math.cos(a * 3) * 10; ctx.lineTo(mx + Math.cos(a) * r, my + Math.sin(a) * r * 0.5); }
      ctx.stroke(); ctx.font = '9px "Batang",serif'; ctx.fillStyle = '#d9c8a0'; ctx.fillText('漢陽都城', mx - 18, my);
      ctx.restore();
      ctx.save(); ctx.strokeStyle = `rgba(230,180,40,${0.8 * rv})`; ctx.lineWidth = 3; ctx.shadowColor = '#ffcc33'; ctx.shadowBlur = 8; ctx.beginPath();
      for (let x = 0; x < 260 * rv; x += 4) ctx.lineTo(80 + x, 60 + Math.sin(x / 22 + t * 0.2) * 22); ctx.stroke(); ctx.restore();
      // 과녁 (百發百中) 조준 링이 좁혀짐
      const rr = 60 - Math.min(1, Math.max(0, (t - 44) / 26)) * 44;
      ctx.save(); ctx.translate(c.tx, 262); ctx.scale(1, 0.35); ctx.strokeStyle = '#ff5a2a'; ctx.lineWidth = 3;
      for (const m of [1, 0.66, 0.33]) { ctx.beginPath(); ctx.arc(0, 0, rr * m, 0, 7); ctx.stroke(); }
      ctx.restore();
      brushText('百發百中', c.tx, 238, 14, '#ff5a2a');
      // 활 + 청색 화살 오라
      ctx.save(); ctx.translate(P.x + s * 10, P.y - 36); ctx.scale(s, 1); ctx.globalAlpha = rv;
      ctx.strokeStyle = '#5a2a10'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-10, 0, 62, -1.1, 1.1); ctx.stroke();
      const pull = Math.min(1, Math.max(0, (t - HIST_REVEAL) / 30)) * 36 * (t < HIST_FIRE ? 1 : 0);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; const ex = -10 + Math.cos(1.1) * 62, ey = Math.sin(1.1) * 62;
      ctx.beginPath(); ctx.moveTo(ex, -ey); ctx.lineTo(-pull, 0); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.restore();
      if (t >= HIST_FIRE && t < HIST_HIT + 4) { // 음속 폭음
        for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(150,200,255,${0.7 - i * 0.2})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(histSource(c).x, histSource(c).y, 8 + (t - HIST_FIRE) * 7 + i * 6, 14 + (t - HIST_FIRE) * 9 + i * 8, 0, 0, 7); ctx.stroke(); }
      }
    }
    if (h === 'thunder') {
      // 천장을 뒤덮는 수묵 먹구름
      for (let i = 0; i < 18; i++) inkBlot(-100 + i * 40, -10 + Math.sin(i + t * 0.05) * 12, 40 + (i % 4) * 10, 0.55 * rv, i + Math.floor(t / 8));
      for (const b of c.bolts) lightning(b.x, 0, b.x + (Math.random() - 0.5) * 60, 120 + Math.random() * 80, 2, '#f4ecff');
      // 뇌전 장검
      ctx.save(); ctx.translate(P.x + s * 14, P.y - 40); ctx.rotate(s * (t < HIST_FIRE ? -0.3 : 1)); ctx.globalAlpha = rv;
      ctx.shadowColor = '#c8a0ff'; ctx.shadowBlur = 18; ctx.fillStyle = '#efe6ff';
      ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-2, -100); ctx.lineTo(0, -112); ctx.lineTo(2, -100); ctx.lineTo(3, 0); ctx.fill(); ctx.restore();
      // 번개 구체가 된 공
      if (t > 40) { for (let i = 0; i < 4; i++) lightning(ball.x, ball.y, ball.x + (Math.random() - 0.5) * 60, ball.y + (Math.random() - 0.5) * 60, 1.2, '#e8d8ff');
        const g = ctx.createRadialGradient(ball.x, ball.y, 4, ball.x, ball.y, 40); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(160,100,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ball.x, ball.y, 40, 0, 7); ctx.fill(); }
      if (t >= HIST_FIRE && t < HIST_HIT + 4) lightning(c.tx, -200, c.tx, 262, 6, '#ffffff'); // 수직 낙뢰
      if (T.stunned) for (let i = 0; i < 3; i++) { const a = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(a) * 16, T.y - 46 + Math.sin(a) * 4, 9, '#ffe066'); }
    }
    if (h === 'hangul') {
      // 상대 발밑 자모 정밀 격자
      ctx.save(); ctx.strokeStyle = `rgba(230,180,40,${0.6 * rv})`; ctx.lineWidth = 0.8;
      for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(T.x + i * 14, 258); ctx.lineTo(T.x + i * 20, 290); ctx.stroke(); }
      for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(T.x - 80, 260 + j * 8); ctx.lineTo(T.x + 80, 260 + j * 8); ctx.stroke(); }
      ctx.restore();
      // 3D 매트릭스처럼 퍼지는 황금 한글 입자
      ctx.save(); ctx.shadowColor = '#ffcc33'; ctx.shadowBlur = 8;
      for (const q of c.parts) if (q.ch) { ctx.font = `bold ${q.butterfly ? 12 : 10 + (q.t % 6)}px "Malgun Gothic",sans-serif`; ctx.fillStyle = `rgba(255,${q.butterfly ? 230 : 210},${q.butterfly ? 120 : 90},${Math.min(1, q.t / 25)})`; ctx.textAlign = 'center';
        if (q.butterfly) { ctx.save(); ctx.translate(q.x, q.y); ctx.scale(Math.abs(Math.sin(q.t * 0.6)) + 0.2, 1); ctx.fillText(q.ch, 0, 0); ctx.restore(); } else ctx.fillText(q.ch, q.x, q.y); }
      ctx.restore();
    }
    if (h === 'gyebaek') {
      // 백제 결사대 5000 붉은 수묵 실루엣
      soldierRow(236, 1.0, 70, 0.55 * rv, t, '#5a120a');
      soldierRow(250, 1.2, 55, 0.7 * rv, t + 3, '#7a1a0c');
      soldierRow(268, 1.45, 40, 0.85 * rv, t + 7, '#9a2410');
      // 들불
      for (let i = 0; i < 26; i++) {
        const x = -80 + i * 24, hgt = 14 + Math.sin(t * 0.6 + i * 1.7) * 8;
        const g = ctx.createLinearGradient(x, 290, x, 290 - hgt * 2);
        g.addColorStop(0, `rgba(255,120,30,${0.8 * rv})`); g.addColorStop(1, 'rgba(255,40,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 10, 292); ctx.quadraticCurveTo(x, 290 - hgt * 2.2, x + 10, 292); ctx.fill();
      }
      for (const q of c.parts) if (q.ember) { ctx.fillStyle = `rgba(255,${120 + (q.t % 80)},40,${q.t / 60})`; ctx.fillRect(q.x, q.y, 1.6, 1.6); }
      ctx.fillStyle = `rgba(160,120,70,${0.18 * rv})`; ctx.fillRect(-500, 200, 1450, 120); // 흙먼지
      if (t >= HIST_FIRE) { const r = (t - HIST_FIRE) * 14; ctx.strokeStyle = `rgba(255,70,20,${Math.max(0, 1 - r / 300)})`; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(P.x, 274, r, r * 0.25, 0, 0, 7); ctx.stroke(); }
    }
  }
  // 응축
  if (t > HIST_FIRE - 14 && t < HIST_FIRE) { const sp = histSource(c); chargeFX(sp.x, Math.max(10, sp.y), (t - (HIST_FIRE - 14)) / 14, { ship: '255,60,60', arrow: '120,170,255', thunder: '210,180,255', hangul: '255,210,90', gyebaek: '255,110,40' }[h]); }
  // 시전자 (붉은 오라) + 상대
  const g = ctx.createRadialGradient(P.x, P.y - 16, 3, P.x, P.y - 16, 56);
  g.addColorStop(0, t >= HIST_REVEAL && Math.floor(t / 2) % 2 ? 'rgba(255,90,60,.8)' : 'rgba(255,200,120,.45)'); g.addColorStop(1, 'rgba(255,60,30,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.x, P.y - 16, 56, 0, 7); ctx.fill();
  drawPlayer(P);
  drawPlayer(T);
  if (t >= HIST_FIRE - 1 || (h === 'thunder' && t > 40)) drawBall();
}

// ----- 화면 UI (카메라 밖) -----
function drawHistUI(c) {
  const t = c.t, hero = c.hero, h = hero.key, P = c.caster;
  if (!c.init) return;
  const k = t > HIST_END - 8 ? (HIST_END - t) / 8 : Math.min(1, t / 6);
  hanji(0.55 * k);  // 한지 질감 필터
  if (h === 'thunder' && t > HIST_REVEAL && t < HIST_FIRE && c.bolts.length && c.bolts[0].t >= 3) invertFlash(); // 번개마다 실루엣 반전
  if (h === 'thunder' && t >= HIST_FIRE && t < HIST_FIRE + 3) invertFlash();
  if (h === 'gyebaek' && t >= HIST_REVEAL) { vignette('140,0,0', 0.85 * k); shake = Math.max(shake, 1.5); }
  if (h === 'hangul' && t >= 40 && t < HIST_FIRE + 6) { // 해례본 황금 스크롤
    const u = Math.min(1, (t - 40) / 10);
    ctx.save(); ctx.globalAlpha = 0.85 * k;
    ctx.fillStyle = 'rgba(250,236,190,.82)'; ctx.fillRect(GW / 2 - 150 * u, 168, 300 * u, 70);
    ctx.fillStyle = '#7a5a10'; ctx.fillRect(GW / 2 - 156 * u, 164, 8, 78); ctx.fillRect(GW / 2 + 148 * u, 164, 8, 78);
    ctx.font = 'bold 11px "Batang","바탕",serif'; ctx.fillStyle = '#5a3a08'; ctx.textAlign = 'center';
    SCROLL_TEXT.forEach((ln, i) => { const n = Math.max(0, Math.min(ln.length, Math.floor((t - 44 - i * 6) / 0.6))); if (n > 0 && u === 1) ctx.fillText(ln.slice(0, n), GW / 2, 184 + i * 15); });
    ctx.restore();
  }
  cinemaBars(18 * k, '#0c0a08');
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const intro = '오늘 내게 오신 위인은...!';
  brushText(intro.slice(0, Math.min(intro.length, Math.floor(t / 1.2) + 1)), GW / 2, 42, 15, '#f2e6c8');
  if (t >= 8 && t < HIST_REVEAL) { const sp = Math.max(1, Math.floor((t - 8) / 6)); brushText(HEROES[Math.floor(t / sp) % HEROES.length].who, GW / 2, 92, 26, '#bfa76a'); }
  if (t >= HIST_REVEAL) {
    const sc = Math.min(1, (t - HIST_REVEAL + 1) / 5);
    brushText(hero.who, GW / 2, 84, 30 * Math.max(sc, 0.3), hero.color);
    brushText(hero.title, GW / 2, 106, 13, '#f6ecd6');
    seal(GW / 2 + 120, 82, hero.who.replace(' 장군', '').slice(0, 4));
    // 세로 캘리그라피
    hero.callig.forEach((cl, i) => brushText(cl, GW - 24 - i * 26, 128, 22, h === 'ship' ? '#141210' : '#f2e6c8', true));
    if (t < HIST_REVEAL + 3) { ctx.fillStyle = `rgba(250,240,210,${0.7 - (t - HIST_REVEAL) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
    const n = Math.min(hero.line.length, Math.floor((t - HIST_REVEAL - 2) / 0.7));
    if (n > 0) {
      const str = hero.line.slice(0, n), cut = hero.line.length > 26 ? hero.line.lastIndexOf(' ', 26) : -1;
      const l1 = cut > 0 ? str.slice(0, cut) : str, l2 = cut > 0 && n > cut ? str.slice(cut + 1) : '';
      ctx.fillStyle = 'rgba(245,235,210,.92)'; ctx.fillRect(24, GH - 62, GW - 110, cut > 0 ? 34 : 20);
      ctx.font = 'bold 11px "Gungsuh","Batang",serif'; ctx.fillStyle = '#2a1a08'; ctx.textAlign = 'left';
      ctx.fillText(l1, 32, GH - 48); if (l2) ctx.fillText(l2, 32, GH - 33);
    }
  }
  ctx.restore();
  if (t >= HIST_HIT && t < HIST_HIT + 3 && h !== 'gyebaek') { ctx.fillStyle = `rgba(255,250,235,${0.6 - (t - HIST_HIT) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
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
  const toward = party.side === 0 ? 1 : -1, T = players[1 - party.side];
  // 팬들이 상대 위치를 보고 제일 먼 빈 곳으로 (높은 로브 · 빠른 직선 · 강스파이크 중 고름)
  let pick = null;
  for (const [vx, vy] of [[14, -12], [16, -9], [20, -6], [24, -3], [26, -1]]) {
    let x = ball.x, y = ball.y, ux = toward * vx, uy = vy, ok = true;
    for (let i = 0; i < 90 && y < BALL_GROUND_Y; i++) { if (x + ux < BALL_R || x + ux > GW) ux = -ux; if (y + uy < 0) uy = 1; if (Math.abs(x - NET_X) < NET_HW + 2 && y > NET_TOP - 2) { ok = false; break; } x += ux; y += uy; uy += 1; }
    if (!ok || (x < NET_X) !== (T.side === 0)) continue;
    const d = Math.abs(x - T.x) + (vx >= 24 ? 20 : 0);
    if (!pick || d > pick.d) pick = { d, vx, vy };
  }
  if (!pick) pick = { vx: 16, vy: -9 };
  ball.vx = toward * pick.vx; ball.vy = pick.vy;
  if (pick.vx >= 24) { heavy(ball.x, ball.y, 1.2); popups.push({ text: '팬 스파이크!', x: ball.x, y: ball.y - 30, t: 20, color: '#ff5fa8' }); }
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
  if (c.t === METEOR_IMPACT - 16) sfx('charge');
  if (c.t === METEOR_IMPACT - 1) { hitStop = 5; sfx('suck'); }
  if (c.t === METEOR_IMPACT) {
    heavy(c.target.x, 262, 3.5);
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
    startFlight([
      { x: ball.x, y: ball.y },
      { x: far, y: 95 + Math.random() * 30 },   // 1번째 벽
      { x: near, y: 50 + Math.random() * 30 },  // 2번째 벽
      { x: far, y: 120 + Math.random() * 30 },  // 3번째 벽
      { x: tx, y: BALL_GROUND_Y },               // 상대 코트 바닥
    ], 34, 'wall', '255,90,30');
    ball.meteor = true; ball.trail = [];
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
  for (let i = guardRings.length - 1; i >= 0; i--) {
    const g = guardRings[i]; g.r += 9;
    ctx.strokeStyle = `rgba(255,80,20,${Math.max(0, 1 - g.r / 220)})`; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.ellipse(g.x, 274, g.r, g.r * 0.22, 0, 0, 7); ctx.stroke();
    if (g.r > 220) guardRings.splice(i, 1);
  }
  for (const cr of craters) {
    if (cr.type === 'tear') { // 삼선 찢어짐 + 꽂힌 화살
      ctx.strokeStyle = 'rgba(40,20,10,.85)'; ctx.lineWidth = 2.4;
      for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(cr.x, 274 + i * 3); ctx.lineTo(cr.x - cr.dir * 120, 278 + i * 6); ctx.stroke(); }
      ctx.strokeStyle = '#ffcf9a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cr.x, 272); ctx.lineTo(cr.x - cr.dir * 16, 254); ctx.stroke();
      ctx.fillStyle = '#c8102e'; ctx.fillRect(cr.x - cr.dir * 18 - 2, 250, 4, 6);
      continue;
    }
    if (cr.type === 'bolt') { // 번개 흉터
      ctx.strokeStyle = 'rgba(30,10,50,.9)'; ctx.lineWidth = 3;
      for (let n = 0; n < 5; n++) { let x = cr.x, y = 274; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 5; j++) { x += Math.cos(n * 1.3 + cr.seed + j) * 12; y += Math.sin(n * 0.7 + j) * 2.5; ctx.lineTo(x, y); } ctx.stroke(); }
      ctx.strokeStyle = `rgba(200,160,255,${0.5 + Math.sin(performance.now() / 90) * 0.3})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cr.x, 274, 22, 4, 0, 0, 7); ctx.stroke();
      continue;
    }
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
  if (t > METEOR_IMPACT - 16 && t < METEOR_IMPACT) chargeFX(T.x, 250, (t - (METEOR_IMPACT - 16)) / 16, '255,90,30');
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
let noiseBuf = null;
function sfx(type, vol = 1) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx, now = a.currentTime;
    if (type === 'flight') { // 공 비행: 휘이이익 (가까워질수록 높고 커짐)
      const d = arguments[2] || 1;
      if (!noiseBuf) { noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate); const dd = noiseBuf.getChannelData(0); for (let i = 0; i < dd.length; i++) dd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / dd.length, 2); }
      const n = a.createBufferSource(); n.buffer = noiseBuf; n.loop = true;
      const f = a.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 3;
      f.frequency.setValueAtTime(250, now); f.frequency.exponentialRampToValueAtTime(2600, now + d);
      const g = a.createGain(); g.gain.setValueAtTime(0.02, now); g.gain.exponentialRampToValueAtTime(0.55 * vol, now + d * 0.95); g.gain.linearRampToValueAtTime(0, now + d + 0.03);
      n.connect(f); f.connect(g); g.connect(a.destination); n.start(now); n.stop(now + d + 0.05);
      return;
    }
    if (type === 'charge') { // 응축: 점점 높고 커지는 소리
      const o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter();
      o.type = 'sawtooth'; o2.type = 'sine'; f.type = 'lowpass'; f.frequency.setValueAtTime(400, now); f.frequency.exponentialRampToValueAtTime(4000, now + 1.4);
      o.frequency.setValueAtTime(110, now); o.frequency.exponentialRampToValueAtTime(880, now + 1.4);
      o2.frequency.setValueAtTime(55, now); o2.frequency.exponentialRampToValueAtTime(220, now + 1.4);
      g.gain.setValueAtTime(0.01, now); g.gain.exponentialRampToValueAtTime(0.22 * vol, now + 1.35); g.gain.linearRampToValueAtTime(0, now + 1.42);
      o.connect(f); o2.connect(f); f.connect(g); g.connect(a.destination); o.start(now); o2.start(now); o.stop(now + 1.45); o2.stop(now + 1.45);
      return;
    }
    if (type === 'suck') { // 터지기 직전 빨아들이는 소리 (거꾸로 커지는 노이즈)
      if (!noiseBuf) { noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); }
      const n = a.createBufferSource(); n.buffer = noiseBuf; n.playbackRate.value = 0.6;
      const f = a.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 800;
      const g = a.createGain(); g.gain.setValueAtTime(0.001, now); g.gain.exponentialRampToValueAtTime(0.5 * vol, now + 0.18); g.gain.linearRampToValueAtTime(0, now + 0.2);
      n.connect(f); f.connect(g); g.connect(a.destination); n.start(now); n.stop(now + 0.22);
      return;
    }
    if (type === 'heavy' || type === 'crack') {
      // 묵직한 타격음: 서브 베이스 '쿵' + 저역 노이즈 '퍽'
      if (!noiseBuf) { noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); }
      const n = a.createBufferSource(); n.buffer = noiseBuf;
      const f = a.createBiquadFilter(); f.type = type === 'heavy' ? 'lowpass' : 'bandpass'; f.frequency.value = type === 'heavy' ? 420 : 1800;
      const ng = a.createGain(); ng.gain.setValueAtTime(0.9 * vol, now); ng.gain.exponentialRampToValueAtTime(0.001, now + (type === 'heavy' ? 0.35 : 0.12));
      n.connect(f); f.connect(ng); ng.connect(a.destination); n.start(now); n.stop(now + 0.5);
      if (type === 'heavy') {
        const o = a.createOscillator(), g = a.createGain(); o.type = 'sine';
        o.frequency.setValueAtTime(110, now); o.frequency.exponentialRampToValueAtTime(38, now + 0.4);
        g.gain.setValueAtTime(0.9 * vol, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        o.connect(g); g.connect(a.destination); o.start(now); o.stop(now + 0.5);
      }
      return;
    }
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
      buzz: ['sawtooth', 140, 120, 0.08, 0.6],
      fail: ['square', 300, 90, 0.25, 0.7],
      whistle: ['square', 2600, 2400, 0.12, 0.35],
      spray: ['sawtooth', 3000, 2000, 0.04, 0.15],
      zap: ['sawtooth', 1800, 80, 0.3, 0.6],
      bell: ['sine', 330, 320, 0.45, 2.2],
      snap: ['square', 2200, 600, 0.3, 0.08],
      beep: ['sine', 1000, 1000, 0.22, 0.55],
    }[type];
    if (!set) return;
    const [wave, f0, f1, v0, dur] = set;
    o.type = wave;
    o.frequency.setValueAtTime(f0, now);
    o.frequency.exponentialRampToValueAtTime(f1, now + dur);
    g.gain.setValueAtTime(v0 * vol, now);
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
    heavy(ball.x, ball.y, 2);
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
  if (cine.kind === 'history') { drawHistWorld(); return; }
  if (cine.kind === 'sock') { drawSock(); return; }
  if (cine.kind === 'math') { drawMathWorld(); return; }
  if (cine.kind === 'kim') { drawKimWorld(); return; }
  if (cine.kind === 'gm') { drawGmWorld(); return; }
  if (cine.kind === 'jmw') { drawJmWorld(); return; }
  if (cine.kind === 'lite') { drawLiteWorld(); return; }
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
  if (t < BEAM_HIT) chargeFX(tx, cine.target.y - 20, t / BEAM_HIT, '180,230,255');
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
  if (solo) {
    const H = players[humanSide], A = players[1 - humanSide], k = H.keys, n = CHARACTERS.length;
    players.forEach((p) => p.anim++);
    if (!H.picked) {
      if (pressed.has(k.l)) H.char = (H.char + n - 1) % n;
      if (pressed.has(k.r)) H.char = (H.char + 1) % n;
      if (pressed.has(k.a)) { H.picked = true; popups.push({ text: '선택!', x: H.side === 0 ? 108 : 324, y: 200, t: 20, color: H.color }); }
      return;
    }
    if (!A.picked) { // 이제 내 키로 AI 캐릭터 고르기 (-1 = 랜덤)
      if (pressed.has(k.l)) A.char = A.char <= -1 ? n - 1 : A.char - 1;
      if (pressed.has(k.r)) A.char = A.char >= n - 1 ? -1 : A.char + 1;
      if (pressed.has(k.a)) {
        if (A.char < 0) A.char = Math.floor(Math.random() * n);
        A.picked = true; popups.push({ text: 'AI: ' + CHARACTERS[A.char].name, x: A.side === 0 ? 108 : 324, y: 200, t: 30, color: A.color });
      }
      return;
    }
    if (++timer >= 25) { state = 'startFadeOut'; timer = 0; }
    return;
  }
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
    players.forEach((p) => { if (p.char < 0) p.char = p.side; p.ai = false; }); solo = false;
    newGame();
    players[0].x = 36; players[1].x = 396;
    players.forEach((p) => { p.state = NORMAL; p.picked = false; });
    state = 'title'; timer = 0;
    pressed.clear(); return;
  }
  if (isMenu()) updateCrowd();
  if (state === 'title') {
    players.forEach((p) => p.anim++);
    if (pressed.has('Digit0') || pressed.has('Numpad0')) dictTest = !dictTest; // 테스트 모드
    // 메뉴: ↑↓(R/F)로 고르기
    const up = pressed.has('KeyR') || pressed.has('ArrowUp'), dn = pressed.has('KeyF') || pressed.has('ArrowDown');
    if (up || dn) { menuIdx = (menuIdx + (dn ? 1 : MENU.length - 1)) % MENU.length; sfx('pop'); }
    if (powerPressed()) {
      if (MENU[menuIdx] === '조작 방법') { state = 'howto'; timer = 0; }
      else if (MENU[menuIdx] === '혼자 플레이') { state = 'side'; timer = 0; sfx('pop'); pressed.clear(); }
      else {
        solo = false; players.forEach((p) => { p.ai = false; });
        players.forEach((p) => { p.picked = false; p.state = NORMAL; p.hm = 1; p.hw = 1; p.skillT = 0; p.shrinkT = 0; });
        state = 'select'; timer = 0;
      }
    }
  } else if (state === 'side') { // 혼자 플레이: Z = 왼쪽, Enter = 오른쪽
    players.forEach((p) => p.anim++);
    if (pressed.has('Escape')) state = 'title';
    else if (pressed.has('KeyZ') || pressed.has('Enter')) { humanSide = pressed.has('KeyZ') ? 0 : 1; state = 'diff'; sfx('pop'); pressed.clear(); }
  } else if (state === 'diff') { // 난이도
    players.forEach((p) => p.anim++);
    const k = players[humanSide].keys;
    if (pressed.has(k.u)) { aiLevel = (aiLevel + 2) % 3; sfx('pop'); }
    if (pressed.has(k.d)) { aiLevel = (aiLevel + 1) % 3; sfx('pop'); }
    if (pressed.has('Escape')) state = 'side';
    else if (pressed.has(k.a)) {
      solo = true;
      players.forEach((p) => { p.ai = p.side !== humanSide; p.aiS = null; p.picked = false; p.state = NORMAL; p.hm = 1; p.hw = 1; p.skillT = 0; p.shrinkT = 0; });
      players[1 - humanSide].char = -1; // AI 캐릭터: 안 고르면 랜덤
      state = 'select'; timer = 0; pressed.clear(); sfx('pop');
    }
  } else if (state === 'howto') {
    players.forEach((p) => p.anim++);
    if (powerPressed() || pressed.has('Escape')) state = 'title';
  } else if (state === 'select') {
    updateSelect();
  } else if (state === 'startFadeOut') {
    fade = Math.min(1, fade + 1 / 15);
    if (++timer >= 30) startGame();
  } else if (state === 'startMsg') {
    fade = Math.max(0, fade - 1 / 17);
    if (++timer >= 71) { fade = 0; state = 'play'; }
  } else if (state === 'play') {
    if (cine && cine.kind === 'lite') {
      updateLite();
    } else if (cine && cine.kind === 'jmw') {
      updateJm();
    } else if (cine && cine.kind === 'gm') {
      updateGm();
    } else if (cine && cine.kind === 'kim') {
      updateKim();
    } else if (cine && cine.kind === 'math') {
      updateMath();
    } else if (cine && cine.kind === 'sock') {
      updateSock();
    } else if (cine && cine.kind === 'history') {
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
      if (cine.t === DEMO_HIT - 12) sfx('charge');
      if (cine.t === DEMO_HIT - 1) { hitStop = 5; sfx('suck'); }
      if (cine.t === DEMO_HIT) democracyHit(cine.caster);
      if (cine.t % 10 === 0 || ball.flight) step(true); // 공이 날아가는 동안은 제 속도로
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
      if (cine.t === 2) sfx('charge');
      if (cine.t === BEAM_HIT - 1) { hitStop = 5; sfx('suck'); }
      if (cine.t === BEAM_HIT) { heavy(cine.target.x, 262, 2.8); cine.target.shrinkT = 999999; /* 라운드 끝날 때까지 */ effects.push({ x: cine.target.x, y: 270, t: 8 }); }
      if (cine.t % 8 === 0) step(true);
      if (cine && cine.t >= BEAM_FRAMES) cine = null;
    } else { tickLite(); step(true); }
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
  if (shake > 0) shake = Math.max(0, shake * 0.86 - 0.3);
  punch *= 0.8;
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

// ----- 메뉴 화면: 랜덤 캐릭터 몇 명이 제멋대로 뛰어다님 (계속 교대해서 모두 한 번씩 나옴) -----
let crowd = null, crowdBag = [];
function nextCrowdChar() { // 가방에서 하나씩 꺼내기: 다 꺼내면 다시 섞음 → 모든 캐릭터가 골고루 나옴
  const inUse = new Set((crowd || []).map((c) => c.char));
  for (let tries = 0; tries < 30; tries++) {
    if (!crowdBag.length) { crowdBag = CHARACTERS.map((_, i) => i); for (let i = crowdBag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [crowdBag[i], crowdBag[j]] = [crowdBag[j], crowdBag[i]]; } }
    const c = crowdBag.pop(); if (!inUse.has(c)) return c;
  }
  return Math.floor(Math.random() * CHARACTERS.length);
}
function newRunner(enter) {
  const fromLeft = Math.random() < 0.5;
  return { char: nextCrowdChar(), x: enter ? (fromLeft ? -30 : GW + 30) : 30 + Math.random() * 372, y: P_GROUND_Y, vx: enter ? (fromLeft ? 1 : -1) * (2.5 + Math.random() * 3) : 0, vy: 0,
    state: NORMAL, anim: Math.random() * 50, side: fromLeft ? 0 : 1, hm: 1, hw: 1, act: enter ? 30 : 0, spin: 0, life: 100 + Math.random() * 175, leaving: false }; // 4~11초 놀다가 퇴장
}
function makeCrowd() { crowd = []; const n = 2 + Math.floor(Math.random() * 2); for (let i = 0; i < n; i++) crowd.push(newRunner(false)); } // 2~3명
function updateCrowd() {
  if (!crowd) makeCrowd();
  for (let k = crowd.length - 1; k >= 0; k--) {
    const c = crowd[k];
    c.anim++;
    if (--c.life <= 0 && !c.leaving && c.y === P_GROUND_Y) { c.leaving = true; c.vx = (c.x < GW / 2 ? -1 : 1) * 5; } // 퇴장: 가까운 쪽으로 달려 나감
    if (c.leaving) { c.x += c.vx; c.side = c.vx > 0 ? 0 : 1; if (c.x < -40 || c.x > GW + 40) { crowd.splice(k, 1); const want = 2 + Math.floor(Math.random() * 2); while (crowd.length < want) crowd.push(newRunner(true)); } continue; } // 나가면 새 사람이 들어옴 (항상 2~3명)
    if (--c.act <= 0) { // 다음 행동 랜덤: 달리기 · 잠깐 멈춤 · 점프 · 빙글 · 점프 스파이크
      const r = Math.random();
      if (r < 0.5) { c.vx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 4.5); c.act = 20 + Math.random() * 50; }
      else if (r < 0.62) { c.vx = 0; c.act = 10 + Math.random() * 20; }
      else if (r < 0.82 && c.y === P_GROUND_Y) { c.vy = -10 - Math.random() * 6; c.state = JUMP; c.act = 10 + Math.random() * 25; }
      else if (r < 0.91) { c.spin = 30; c.act = 30; }
      else if (c.y === P_GROUND_Y) { c.vy = -16; c.state = JUMP; c.power = 18; c.act = 34; }
    }
    c.x += c.vx;
    if ((c.x < 24 && c.vx < 0) || (c.x > GW - 24 && c.vx > 0)) c.vx = -c.vx;
    if (c.vx) c.side = c.vx > 0 ? 0 : 1;
    if (c.y < P_GROUND_Y || c.vy < 0) { c.y += c.vy; c.vy += 1; if (c.y >= P_GROUND_Y) { c.y = P_GROUND_Y; c.vy = 0; c.state = NORMAL; } }
    if (c.power > 0) { c.power--; if (c.vy > -6 && c.vy < 4) c.state = POWER; else if (c.y < P_GROUND_Y) c.state = JUMP; }
    if (c.spin > 0) c.spin--;
  }
}
function drawCrowd() {
  if (!crowd) makeCrowd();
  for (const c of [...crowd].sort((a, b) => a.char - b.char)) {
    shadow(c.x, 18 - Math.min(10, (P_GROUND_Y - c.y) / 10));
    ctx.save(); ctx.translate(c.x, c.y);
    if (c.spin > 0) ctx.scale(Math.cos(c.spin * 0.6) || 0.05, 1);
    if (c.state === POWER) ctx.rotate((c.side === 0 ? 1 : -1) * 0.18);
    drawFigure(c);
    ctx.restore();
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
  const whirl = isWhirl(p);
  if (whirl) {
    // 팽이처럼 빙글빙글 (세로축 회전)
    ctx.scale(Math.cos(p.anim * 2.1) || 0.05, 1); // 회전 속도 1.5배
  }
  ctx.scale(face, 1);
  if (p.state === POWER) miniCharge(face * 16, -16, Math.min(1, (10 - p.powerT) / 4)); // 스파이크 준비: 손에 힘이 모임
  if (p.guardT > 0 && !p.matrixGuard && !p.courtGuard) {
    // 계백 결사 방어: 붉은 오라
    const gg = ctx.createRadialGradient(0, 0, 10, 0, 0, 58);
    gg.addColorStop(0, 'rgba(255,90,30,0)'); gg.addColorStop(0.75, `rgba(255,70,20,${0.25 + Math.sin(p.anim * 0.4) * 0.1})`); gg.addColorStop(1, 'rgba(255,60,0,0)');
    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, 58, 0, 7); ctx.fill();
  }
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
  drawStatusIcons(p);
}

function drawBallAt(x, y, alpha, stretch = 0, ang = 0, squash = 0) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  if (ball.miniT > 0) { const k = 0.5 + 0.5 * Math.max(0, 1 - Math.min(ball.miniT, 8) / 8); ctx.scale(k, k); } // 핀볼: 공이 작아짐
  // 빠르면 진행 방향으로 길쭉하게(stretch), 바닥에 꽂히면 납작하게(squash)
  if (squash > 0) { ctx.translate(0, BALL_R * squash * 0.45); ctx.scale(1 + squash * 0.55, 1 - squash * 0.45); }
  else if (stretch > 0) { ctx.rotate(ang); ctx.scale(1 + stretch, 1 / (1 + stretch * 0.7)); ctx.rotate(-ang); }
  ctx.rotate(ball.rot);
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
  // 땅 그림자: 공이 낮을수록 진하고 크게
  const hgt = Math.max(0, Math.min(1, (BALL_GROUND_Y - ball.y) / 250));
  ctx.fillStyle = `rgba(0,0,0,${0.32 - hgt * 0.2})`;
  ctx.beginPath(); ctx.ellipse(ball.x, 275, 22 - hgt * 12, 4.5 - hgt * 2, 0, 0, 7); ctx.fill();
  const spd = Math.hypot(ball.vx, ball.vy), ang = Math.atan2(ball.vy, ball.vx);
  const fast = ball.fx || spd > 17;
  if (fast && ball.ribbon && ball.ribbon.length > 2) {
    // 리본 꼬리: 뒤로 갈수록 가늘고 투명하게
    const col = ball.fx || '255,255,255', R = ball.ribbon, n = R.length;
    ctx.lineCap = 'round';
    for (let i = 1; i < n; i++) {
      const q = i / n;
      ctx.strokeStyle = `rgba(${col},${q * 0.75})`; ctx.lineWidth = BALL_R * 1.7 * q;
      ctx.beginPath(); ctx.moveTo(R[i - 1].x, R[i - 1].y); ctx.lineTo(R[i].x, R[i].y); ctx.stroke();
    }
    ctx.strokeStyle = `rgba(255,255,255,.85)`;
    for (let i = Math.floor(n * 0.5); i < n; i++) { const q = i / n; ctx.lineWidth = BALL_R * 0.5 * q; ctx.beginPath(); ctx.moveTo(R[i - 1].x, R[i - 1].y); ctx.lineTo(R[i].x, R[i].y); ctx.stroke(); }
    // 속도선
    if (spd > 10) {
      ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.8, spd / 40)})`; ctx.lineWidth = 1.2;
      for (let i = 0; i < 7; i++) {
        const off = (i - 3) * 9 + Math.sin(performance.now() / 60 + i) * 3, len = 30 + spd * 2 + (i % 3) * 14;
        const ox = -Math.sin(ang) * off, oy = Math.cos(ang) * off, back = BALL_R + 6 + (i % 2) * 10;
        ctx.beginPath(); ctx.moveTo(ball.x + ox - Math.cos(ang) * back, ball.y + oy - Math.sin(ang) * back);
        ctx.lineTo(ball.x + ox - Math.cos(ang) * (back + len), ball.y + oy - Math.sin(ang) * (back + len)); ctx.stroke();
      }
    }
    // 진행 방향 앞쪽 충격파 (음속 원뿔)
    if (spd > 18) {
      ctx.strokeStyle = `rgba(${col},.55)`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ball.x, ball.y, BALL_R + 7, ang - 1.1, ang + 1.1); ctx.stroke();
      ctx.beginPath(); ctx.arc(ball.x - Math.cos(ang) * 10, ball.y - Math.sin(ang) * 10, BALL_R + 16, ang - 0.9, ang + 0.9); ctx.stroke();
    }
    // 빛 오라
    const g = ctx.createRadialGradient(ball.x, ball.y, BALL_R * 0.6, ball.x, ball.y, BALL_R * 2.4);
    g.addColorStop(0, `rgba(${col},.55)`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ball.x, ball.y, BALL_R * 2.4, 0, 7); ctx.fill();
  }
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
  if (ball.power && !ball.meteor && !ball.fx) ball.trail.forEach((t, i) => drawBallAt(t.x, t.y, 0.25 + i * 0.2));
  const st = Math.min(0.55, Math.max(0, spd - 12) / 40);
  drawBallAt(ball.x, ball.y, 1, st, ang, ball.squashT > 0 ? ball.squashT / 8 : 0);
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

// 마나 칸 (캐릭터마다 다름)
function drawMana(p) {
  const ch = CHARACTERS[p.char];
  const full = p.mana >= manaMax(p);
  for (let i = 0; i < manaMax(p); i++) {
    const x = p.side === 0 ? 14 + i * 11 : GW - 14 - (manaMax(p) - 1 - i) * 11;
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
    const sz = Math.min(18, (GW - 24) / (e.text.length * 0.8)), half = e.text.length * sz * 0.4; // 긴 글은 화면에 맞게 작게
    text(e.text, Math.max(half + 8, Math.min(GW - half - 8, e.x)), e.y - (30 - e.t) * 0.6, sz, e.color);
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
      text(p.ai ? 'AI' : p.side === 0 ? '1P' : '2P', p.side === 0 ? x + 2 : x + cw - 2, y - 4, 9, p.color, p.side === 0 ? 'left' : 'right');
    });
  });
  // 양쪽 설명 + 큰 미리보기
  players.forEach((p) => {
    const cx = p.side === 0 ? 108 : 324;
    if (p.char < 0) { // AI 랜덤
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(cx - 98, 122, 196, 172, 8); ctx.fill();
      text('?', cx, 210, 60 + Math.sin(p.anim * 0.2) * 3, p.color);
      text('🎲 AI 캐릭터: 랜덤', cx, 150, 13, '#fff3a0');
      const H = players[humanSide];
      text(H.picked ? (H.side === 0 ? 'D/G로 골라 주기 · Z 확정' : '←/→로 골라 주기 · Enter 확정') : '안 고르면 랜덤!', cx, 266, 9, '#ddd');
      text(H.picked ? '(랜덤 그대로 확정해도 돼)' : '내 캐릭터 먼저 고르기', cx, 282, 9, '#aaa');
      return;
    }
    const c = CHARACTERS[p.char];
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
    const H = players[humanSide];
    let keys = p.side === 0 ? 'D/G 고르기 · Z 선택' : '←/→ 고르기 · Enter 선택';
    if (solo && p.ai) keys = H.picked ? (H.side === 0 ? 'D/G로 골라 주기 · Z 확정' : '←/→로 골라 주기 · Enter 확정') : 'AI (내 캐릭터 먼저)';
    text(p.picked ? (p.ai ? 'AI 준비 완료!' : '준비 완료!') : keys, cx, 284, 10, p.picked ? '#7dff9a' : '#ddd');
  });
}

function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, GW, GH);
  // 시네마틱 카메라 (줌·이동·회전)
  const cam = cineCam();
  if (cam) {
    ctx.translate(GW / 2, GH / 2); ctx.rotate(cam.r || 0); ctx.scale(cam.z, cam.z); ctx.translate(-cam.x, -cam.y);
    if (cam.space) drawSpace(cam);
  }
  if (punch > 0.002) { ctx.translate(punchX, punchY); ctx.scale(1 + punch, 1 + punch); ctx.translate(-punchX, -punchY); } // 카메라 펀치
  if (shake > 0) { const a = Math.random() * 6.28; ctx.translate(Math.cos(a) * shake * 0.6, Math.sin(a) * shake * 0.6); }
  drawBackground();
  drawCraters();
  drawGlyphs();
  drawNet();
  if (isMenu()) drawCrowd();
  else if (state !== 'select') { players.forEach(drawMatrixField); players.forEach(drawPlayer); drawMatrixHits(); }
  if (state !== 'select' && state !== 'title') drawPartyField();
  if (!isMenu() && state !== 'select' && !(cine && cine.kind === 'history' && cine.t < HIST_FIRE) && !(cine && (cine.kind === 'kim' || cine.kind === 'gm' || cine.kind === 'jmw'))) drawBall();
  drawLiteParts();
  drawFakes(); drawStrikes();
  drawBeam();
  drawEffects();
  drawImpactRings();
  drawBursts();
  drawSmokes();
  if (state !== 'select' && state !== 'title') drawSpeech();
  // 여기부터 화면 고정 (UI·화면 효과)
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  drawCineUI();

  if (state === 'select') { drawSelect(); drawPopups(); return; }

  if (!isMenu()) {
    text(players[0].score, 30, 36, 30, '#cfe3ff');
    text(players[1].score, GW - 30, 36, 30, '#ffd6d3');
  }
  if (!isMenu()) players.forEach(drawMana);
  drawPopups();

  if (state === 'title' || state === 'startFadeOut') {
    text('동성 배구 대전', GW / 2, 82, 36);
    // 메뉴
    MENU.forEach((m, i) => {
      const y = 132 + i * 34, on = i === menuIdx;
      ctx.fillStyle = on ? 'rgba(255,240,150,.95)' : 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.roundRect(GW / 2 - 70, y - 19, 140, 26, 8); ctx.fill();
      text(m, GW / 2, y, 16, on ? '#3a2a00' : '#ffffff');
      if (on) text('▶', GW / 2 - 58 + Math.sin(performance.now() / 150) * 2, y, 12, '#3a2a00');
    });
    text('↑↓(R/F) 고르기 · Z/Enter 선택', GW / 2, 238, 11, '#ffffff');
    if (dictTest) { ctx.fillStyle = '#ff5050'; ctx.fillRect(GW - 4, GH - 4, 2, 2); } // 개발자용: 독재 100% 켜짐 표시 (오른쪽 아래 작은 점)
  }
  if (state === 'howto') drawHowto();
  if (state === 'side' || state === 'diff') drawSoloSetup();

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

// ===== 조작 방법 화면 =====
function drawSoloSetup() {
  ctx.fillStyle = 'rgba(8,14,30,.72)'; ctx.fillRect(0, 0, GW, GH);
  text('혼자 플레이', GW / 2, 48, 24, '#fff3a0');
  if (state === 'side') {
    text('어느 쪽에서 할래?', GW / 2, 86, 14, '#ffffff');
    [[0, 'Z', '왼쪽', 'D/G/R/F · Z · 왼쪽 Shift'], [1, 'Enter', '오른쪽', '방향키 · Enter · 숫자패드 5 또는 ;']].forEach(([side, key, name, keys]) => {
      const cx = side === 0 ? GW / 2 - 92 : GW / 2 + 92, col = SIDE_COLOR[side];
      ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.roundRect(cx - 80, 110, 160, 120, 10); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - 80, 110, 160, 120, 10); ctx.stroke();
      text(key, cx, 152, 26 + Math.sin(performance.now() / 200 + side) * 1.5, col);
      text(name + '에서 플레이', cx, 182, 13, '#ffffff');
      text(keys, cx, 206, 8, '#cfd8ea');
    });
    text('반대쪽은 AI가 해 · Esc = 뒤로', GW / 2, 262, 10, '#aab4c8');
  } else {
    text('AI 난이도', GW / 2, 86, 14, '#ffffff');
    AI_LEVELS.forEach((L, i) => {
      const y = 124 + i * 36, on = i === aiLevel;
      ctx.fillStyle = on ? 'rgba(255,240,150,.95)' : 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.roundRect(GW / 2 - 80, y - 19, 160, 28, 8); ctx.fill();
      text(L.name, GW / 2, y, 16, on ? '#3a2a00' : L.col);
      if (on) text('▶', GW / 2 - 66 + Math.sin(performance.now() / 150) * 2, y, 12, '#3a2a00');
    });
    const desc = ['느리고 실수 많음 · 스파이크 거의 안 함', '사람 정도 · 가끔 스파이크 · 스킬 씀', '빠르고 정확 · 빈 곳 노림 · 스킬 타이밍까지'][aiLevel];
    text(desc, GW / 2, 240, 10, '#dfe6f5');
    text(humanSide === 0 ? 'R/F 고르기 · Z 결정 · Esc 뒤로' : '↑/↓ 고르기 · Enter 결정 · Esc 뒤로', GW / 2, 266, 10, '#aab4c8');
  }
}

function drawHowto() {
  ctx.fillStyle = 'rgba(10,20,40,.82)'; ctx.fillRect(0, 0, GW, GH);
  text('조작 방법', GW / 2, 30, 22, '#fff3a0');
  // 키 표
  const rows = [
    ['', '왼쪽 (1P)', '오른쪽 (2P)'],
    ['이동', 'D / G', '← / →'],
    ['점프', 'R', '↑'],
    ['아래', 'F', '↓'],
    ['공격', 'Z', 'Enter'],
    ['스킬', 'Shift', '숫자패드 5 또는 ;'],
  ];
  const x0 = 70, colW = [70, 120, 130];
  rows.forEach((r, i) => {
    const y = 58 + i * 17;
    if (i % 2) { ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(x0 - 6, y - 12, colW[0] + colW[1] + colW[2], 16); }
    let x = x0;
    r.forEach((cell, j) => { text(cell, x + (j ? colW[j] / 2 : 4), y, i === 0 ? 10 : 11, i === 0 ? '#9fd4ff' : j === 0 ? '#ffe08a' : '#ffffff', j ? 'center' : 'left'); x += colW[j]; });
  });
  // 플레이 방법
  const tips = [
    ['스파이크', '점프 중 공격 + 방향키 (앞: 빠르게 · 위: 높게 · 아래: 내리꽂기)'],
    ['다이빙', '땅에서 공격 + 좌우'],
    ['스킬', '스파이크를 공에 5번 맞히면 마나가 차서 스킬 사용'],
    ['승리', '15점 먼저 내면 승리'],
  ];
  tips.forEach(([a, b], i) => { const y = 176 + i * 16; text(a, 54, y, 10, '#ffe08a', 'left'); text(b, 112, y, 10, '#ffffff', 'left'); });
  // 단축키
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(40, 248, GW - 80, 24);
  text('Backspace 3번 = 언제든 처음 화면으로', GW / 2, 264, 10, '#ffffff');
  // (개발자 전용 단축키 O 3번 · 0 은 화면에 안 보이게 숨김 — HANDOFF.md 참고)
  text('Z 또는 Enter = 돌아가기', GW / 2, 298, 10, '#bfe6ff');
}

// ===== 응축 → 정적 → 폭발 =====
const bursts = [];
function burst(x, y, p) { bursts.push({ x, y, t: 0, p, seed: Math.random() * 6 }); }
function drawBursts() {
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i]; b.t++;
    const life = 9 + b.p * 2, q = b.t / life, a = Math.max(0, 1 - q);
    // 바깥으로 뻗는 집중선
    ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineCap = 'round';
    const n = 14 + Math.round(b.p * 6);
    for (let j = 0; j < n; j++) {
      const ang = b.seed + (j / n) * Math.PI * 2 + (j % 2) * 0.1;
      const r0 = 6 + b.t * 7 * b.p, r1 = r0 + (18 + 22 * b.p) * a * (0.6 + (j % 3) * 0.3);
      ctx.lineWidth = (1 + b.p * 0.8) * a;
      ctx.beginPath(); ctx.moveTo(b.x + Math.cos(ang) * r0, b.y + Math.sin(ang) * r0); ctx.lineTo(b.x + Math.cos(ang) * r1, b.y + Math.sin(ang) * r1); ctx.stroke();
    }
    // 색이 갈라지는 충격파 링
    if (b.p >= 1.5) [['255,60,60', -2], ['60,255,120', 0], ['80,140,255', 2]].forEach(([col, off]) => {
      ctx.strokeStyle = `rgba(${col},${a * 0.8})`; ctx.lineWidth = 2.5 * a + 0.5;
      ctx.beginPath(); ctx.arc(b.x + off, b.y, b.t * 10 * b.p, 0, 7); ctx.stroke();
    });
    if (q >= 1) bursts.splice(i, 1);
  }
}
// 응축: 에너지가 한 점으로 빨려 들어감 (k: 0 → 1 점점 강하게)
function chargeFX(x, y, k, col = '255,255,255') {
  k = Math.max(0, Math.min(1, k));
  const T = performance.now() / 1000;
  // 화면 가장자리부터 어둠이 조여 옴
  const g = ctx.createRadialGradient(x, y, 30 + (1 - k) * 220, x, y, 420);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${0.7 * k})`);
  ctx.fillStyle = g; ctx.fillRect(x - 600, y - 600, 1200, 1200);
  // 빨려 드는 줄
  ctx.lineCap = 'round';
  for (let i = 0; i < 30; i++) {
    const a = i * 2.39996, ph = (T * (1.2 + k * 2.5) + i * 0.137) % 1;
    const r = 8 + 170 * (1 - ph) * (1 - k * 0.35), len = 8 + 26 * k;
    ctx.strokeStyle = `rgba(${col},${ph * (0.3 + 0.7 * k)})`; ctx.lineWidth = 1 + k * 1.5;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (r + len), y + Math.sin(a) * (r + len)); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke();
  }
  // 안쪽으로 줄어드는 링
  for (let j = 0; j < 3; j++) {
    const rr = 150 * (1 - ((T * (0.8 + k * 2) + j / 3) % 1));
    ctx.strokeStyle = `rgba(${col},${0.5 * k * (1 - rr / 150)})`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.stroke();
  }
  // 점점 빨리 맥동하는 빛의 핵
  const pulse = 1 + Math.sin(T * (8 + 34 * k)) * 0.22, cr = (4 + 18 * k) * pulse;
  const cg = ctx.createRadialGradient(x, y, 0, x, y, cr * 2.4);
  cg.addColorStop(0, 'rgba(255,255,255,1)'); cg.addColorStop(0.35, `rgba(${col},.9)`); cg.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, cr * 2.4, 0, 7); ctx.fill();
}
// 작은 응축 (스파이크 준비)
function miniCharge(x, y, k) {
  const T = performance.now() / 1000;
  for (let i = 0; i < 8; i++) {
    const a = i * 0.785 + T * 3, ph = (T * 3 + i * 0.125) % 1, r = 4 + 22 * (1 - ph);
    ctx.strokeStyle = `rgba(255,240,180,${ph * k})`; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6)); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.stroke();
  }
  const g = ctx.createRadialGradient(x, y, 0, x, y, 9 * k + 2);
  g.addColorStop(0, `rgba(255,255,230,${0.9 * k})`); g.addColorStop(1, 'rgba(255,220,120,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 9 * k + 2, 0, 7); ctx.fill();
}

// ===== 묵직한 타격감 =====
// power: 0.6(가벼움) ~ 3.5(스킬 임팩트)
let hitStop = 0, punch = 0, punchX = 216, punchY = 152;
function heavy(x, y, power) {
  hitStop = Math.max(hitStop, Math.round(1 + power * 1.6));   // 잠깐 멈칫
  punch = Math.max(punch, 0.018 * power);                      // 화면이 확 당겨짐
  punchX = x; punchY = y;
  shake = Math.max(shake, 3 + power * 3.2);
  sfx('heavy', Math.min(1, 0.35 + power * 0.2));
  if (power >= 1.2) sfx('crack', Math.min(1, 0.2 + power * 0.15));
  // 충격파 링 + 바깥으로 터지는 집중선
  effects.push({ x, y, t: 8 });
  if (power >= 0.8) burst(x, y, power);
  if (power >= 1.4) impactRings.push({ x, y: Math.min(y, 272), r: 6, max: 40 + power * 30, w: 2 + power });
  // 흙먼지 (바닥 근처일 때)
  if (y > 230) {
    const n = Math.round(power * 6);
    for (let i = 0; i < n; i++) smokes.push({ x: x + (Math.random() - 0.5) * 20 * power, y: 270 - Math.random() * 6,
      vx: (Math.random() - 0.5) * 3 * power, vy: -0.4 - Math.random() * 1.3, r: 3 + Math.random() * 3 * power, t: 18 + Math.random() * 20 });
  }
}
const impactRings = [];
function drawImpactRings() {
  for (let i = impactRings.length - 1; i >= 0; i--) {
    const g = impactRings[i]; g.r += (g.max - g.r) * 0.25 + 1;
    const a = Math.max(0, 1 - g.r / g.max);
    ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = g.w * a + 0.5;
    ctx.beginPath(); ctx.ellipse(g.x, g.y, g.r, g.r * (g.y > 230 ? 0.28 : 1), 0, 0, 7); ctx.stroke();
    if (a <= 0.02) impactRings.splice(i, 1);
  }
}

// ===== 게임 루프 (원작처럼 1초에 25번 계산) =====
let last = performance.now(), acc = 0;
function loop(now) {
  const STEP = 1000 / CONFIG.FPS;
  acc += Math.min(200, now - last);
  last = now;
  while (acc >= STEP) {
    if (hitStop > 0) { hitStop--; punch *= 0.9; } // 히트스톱: 잠깐 멈칫
    else update();
    acc -= STEP;
  }
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
