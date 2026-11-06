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
  { name: '김두현', gender: 'm', grade: 'POOP', type: 'sprite', img: 'assets/kdh.png', w: 54, h: 57, skill: 'sock',
    skillName: '숙성 양말 서브', desc: ['냄새가 경기장 전체에 진동...', '방독면 심판 레드카드 -1점 (트롤)'] },
  { name: '장민욱', gender: 'm', grade: 'MYTHIC', type: 'sprite', img: 'assets/minwook.png', w: 58, h: 58, skill: 'jmw',
    skillName: '분노 폭주', desc: ['랜덤 3초 시네마틱 3종!', '운석·핀볼·욕설 음파 (삐-)'] },
  { name: '키다리', gender: 'f', grade: 'EPIC', type: 'sprite', img: 'assets/tall.png', w: 30, h: 70, skill: 'giant', mana: 3,
    skillName: '거인화', desc: ['5초 동안 키가 3배!', '마나 3칸 · 높은 공도 다 막는다'] },
  { name: '김지연', gender: 'm', grade: 'RARE', type: 'sprite', img: 'assets/swim.png', w: 40, h: 68, skill: 'whirl', mana: 3,
    skillName: '회전 회오리', desc: ['10초 동안 2배로 커져서 회전!', '마나 3칸 · 닿는 공을 세게 날림'] },
  { name: '문경목', gender: 'm', grade: 'MYTHIC', type: 'sprite', img: 'assets/hair.png', w: 62, h: 54, skill: 'gm',
    skillName: '탈모 & 한국사', desc: ['랜덤 3초 시네마틱 3종!', '눈뽕 빔·3등급 드롭·낙엽 페인트'] },
  { name: '김민주', gender: 'f', grade: 'LEGENDARY', type: 'sprite', img: 'assets/democracy.png', w: 34, h: 66, skill: 'kim',
    eyes: [[0.385, 0.249], [0.581, 0.249]], // 사진 속 눈 위치 (가로, 세로 비율)
    skillName: '민주주의 5장', desc: ['랜덤 시네마틱 5종!', '의회·자유·삼권분립·문법·링컨'] },
  { name: '원더재원', gender: 'm', grade: 'EPIC', type: 'sprite', img: 'assets/wonder_body.png', w: 56, h: 62, skill: 'party',
    skillName: '미러볼 파티', desc: ['9초 팬 10명이 빈 곳으로 꽂음!', '나는 이속 UP · 상대는 감속'] },
  { name: '이동우', gender: 'm', grade: 'LEGENDARY', type: 'sprite', img: 'assets/dongwoo_body.png', w: 62, h: 56, skill: 'history',
    skillName: '위인 강림', desc: ['랜덤 위인 빙의! (5종)', '거북선·편전·뇌전·해례본·결사대'] },
  { name: '박준형', gender: 'm', grade: 'LEGENDARY', type: 'sprite', img: 'assets/math.png', w: 36, h: 68, skill: 'math',
    skillName: '수학 강림', desc: ['랜덤 수학 필살기 (5종)', '코트를 복소평면으로 바꿔 폭파'] },
  { name: '주지혁', gender: 'm', grade: 'MYTHIC', type: 'sprite', img: 'assets/jjh.png', w: 30, h: 66, skill: 'jjh',
    skillName: '선택적 기사도', desc: ['상대 성별 따라 인격 180° 변신!', '여자: 솜사탕 ♥ · 남자: 뚝배기 ☠'] },
  { name: '차명준', gender: 'm', grade: 'ULTRA', type: 'sprite', img: 'assets/cmj.png', w: 56, h: 60, skill: 'cmj', mana: 6,
    skillName: '시공간 커널 해킹', desc: ['랜덤 6초 시네마틱 7종! (마나 6칸)', '양자·E=mc²·404·AI·시간·BSOD·빅뱅'] },
  { name: '김예안', gender: 'm', grade: 'LEGENDARY', type: 'sprite', img: 'assets/yean.png', w: 62, h: 46, skill: 'yean',
    skillName: '기숙사 퇴사하기', desc: ['랜덤 6초 시네마틱 3종!', '욕설 폭격·벌점 25점 퇴사·160dB 샤우팅'] },
  { name: '송리나', gender: 'f', grade: 'MYSTIC', type: 'sprite', img: 'assets/rina.png', w: 74, h: 66, faceNet: true, skill: 'rina',
    skillName: '국영수사과 만점', desc: ['과목별 4초 시네마틱 5종!', '패시브: 상대 스파이크 25% 오답 처리'] },
  { name: '김우현', gender: 'm', grade: 'MYTHIC', type: 'sprite', img: 'assets/woohyun.png', w: 34, h: 46, skill: 'wh',
    skillName: '한번 더! 더블 하이파이브', desc: ['랜덤 4초 시네마틱 3종! (키 135cm)', '내리꽂기 + 생방송 딜레이·벌점 봉인·증폭'] },
];
const NCHAR = CHARACTERS.length; // 고를 수 있는 캐릭터 수 (보스전 보스는 이 뒤에 붙음)
// 등급 색깔
const GRADE_COLOR = { POOP: '#9a6233', COMMON: '#3ccf5a', RARE: '#3d8bff', EPIC: '#a64dff', MYTHIC: '#ff3b3b', LEGENDARY: '#ffd23f', MYSTIC: '#d35bff', ULTRA: '#00ffd0' };

// 스킬 시간 (25프레임 = 1초)
const SKILL_FRAMES = { giant: 125, whirl: 250, hairbeam: 125, democracy: 8, meteor: 8, party: 225, history: 8, sock: 8, math: 8, kim: 8, gm: 8, jmw: 8, jjh: 8, cmj: 8, yean: 8, rina: 8, wh: 8 };
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
const NET_X = 216, NET_HW = 25;
let NET_TOP = 176, NET_PILLAR_TOP = 192; // 2대2에선 네트가 낮아짐 (setDuo)
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
CHARACTERS.forEach((c, i) => { if (c.img) loadImg('char' + i, c.img); });
/* 308호 엔딩 컷씬 전용 사진 (게임 캐릭터 사진과 따로) */
loadImg('cineKdh', 'assets/cine_kdh.png'); loadImg('cineYean', 'assets/cine_yean.png'); loadImg('cineYeanFace', 'assets/cine_yean_face.png');

// ===== 키 입력 =====
const down = new Set(), pressed = new Set();
const GAME_KEYS = ['KeyD','KeyR','KeyG','KeyF','KeyZ','ShiftLeft','ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
  'Enter','NumpadEnter','Numpad5','Semicolon','Space','Backspace'];
let bsTimes = [], restartReq = false; // 백스페이스 3번 → 재시작
let oTimes = [];                        // 테스트: O 3번 → 양쪽 마나 가득
const norm = (e) => (e.code === 'NumpadEnter' ? 'Enter' : e.code === 'Semicolon' ? 'Numpad5' : e.code);
addEventListener('keydown', (e) => {
  if (typeof NET !== 'undefined' && (NET.on || NET.lobby)) { netKey(e, true); return; } // 온라인 대전 중엔 온라인 전용 처리
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
addEventListener('keyup', (e) => { if (typeof NET !== 'undefined' && (NET.on || NET.lobby)) { netKey(e, false); return; } down.delete(norm(e)); });
addEventListener('blur', () => down.clear());

// ===== AI (혼자 플레이) — 원작 물리를 그대로 머릿속에서 굴려 보고 움직임 =====
// 공 물리 시뮬레이션 (updateBall과 똑같은 순서: 벽 → 천장 → 네트 → 바닥 → 이동 → 중력)
function aiSim(b, n) {
  const m = ballBoost * (ball.miniT > 0 ? 1.25 : 1), out = [];
  let x = b.x, y = b.y, vx = b.vx, vy = b.vy;
  for (let i = 0; i < n; i++) {
    const fx = x + vx * m;
    if (fx < BALL_R || fx > GW) vx = -vx;
    if (y + vy * m < 0) vy = 1;
    if (Math.abs(x - NET_X) < NET_HW && y > NET_TOP) { if (y <= NET_PILLAR_TOP) { if (vy > 0) vy = -vy; } else vx = x < NET_X ? -Math.abs(vx) : Math.abs(vx); }
    if (y + vy * m > BALL_GROUND_Y) { out.push({ x, y: BALL_GROUND_Y, vx, vy, ground: true }); break; }
    x += vx * m; y += vy * m; vy += m;
    out.push({ x, y, vx, vy });
  }
  return out;
}
const aiLand = (path) => path[path.length - 1] || ball;
function aiInput(p) {
  const lv = p.aiLevel ?? aiLevel, L = AI_LEVELS[lv], s = p.side === 0 ? 1 : -1, T = players[1 - p.side];
  const ai = p.aiS || (p.aiS = { t: 0, tx: p.x, plan: null, err: 0 });
  const inp = { x: 0, y: 0, power: false, skill: false };
  if (state !== 'play' || cine) return inp;
  const mySide = (x) => (x < NET_X) === (p.side === 0);
  let [mn, mx] = p.side === 0 ? [32, 184] : [248, 400];
  let homeX = p.side === 0 ? 100 : 332;
  if (duo) { // 2대2: 1·2P(뒤) = 뒤쪽 담당, 3·4P(앞) = 네트 쪽 담당 (가운데는 조금 겹침)
    const back = !p.mate;
    [mn, mx] = p.side === 0 ? (back ? [32, 122] : [94, 184]) : (back ? [310, 400] : [248, 338]);
    homeX = p.side === 0 ? (back ? 66 : 150) : (back ? 366 : 282);
  }
  if (bossMode && p.side === 0) { const z = p === players[0] ? 0 : p === players[2] ? 1 : 2;
    [mn, mx] = [[32, 104], [70, 150], [118, 184]][z]; homeX = [60, 108, 160][z]; }
  const far = (x) => Math.min(...players.filter((o) => o.side !== p.side).map((o) => Math.abs(x - o.x))); // 상대 중 제일 가까운 사람과의 거리 (빈 곳 찾기)
  const spd = 6 * (L.move || 1);
  const serving = Math.abs(ball.vx) < 0.5 && Math.abs(ball.x - (p.side === 0 ? 36 : 396)) < 30 && mySide(ball.x) && ball.y < 200;
  const path = aiSim(ball, 160);
  // 판단은 난이도만큼 늦게 (어려움은 매 프레임)
  if (--ai.t <= 0) {
    ai.t = L.react + (p.blindT > 0 ? 12 : 0);
    ai.err = (L.err + (p.blindT > 0 ? 100 : 0)) * (Math.random() - 0.5) * 2;
    ai.plan = null;
    // ① 공격(점프 스파이크): k프레임 뒤 내 높이 = 244 - 16k + k(k-1)/2 에서 공을 만날 수 있나
    const fastIn = !p.collided && (Math.abs(ball.vx) >= 12 || ball.vy > 12) && !mySide(ball.x);
    if (!fastIn && Math.random() < L.spike && !(p.nojumpT > 0)) for (let k = 5; k <= 22 && k <= path.length; k++) {
      const b = path[k - 1], py = P_GROUND_Y - 16 * k + (k * (k - 1)) / 2;
      if (!mySide(b.x) || b.ground || Math.abs(b.x - NET_X) < NET_HW + 4) continue;
      if (b.y < py - 42 || b.y > py - 2) continue;
      if (path.slice(k - 1, k + 6).some((q) => !mySide(q.x))) continue; // 곧 넘어가 버릴 공은 쫓지 않음
      const want = Math.max(mn, Math.min(mx, b.x - s * 10));
      if (Math.abs(want - p.x) > spd * k + 4) continue;
      ai.plan = { kind: 'spike', x: want, k };
      break;
    }
    // ② 리시브: 공이 내 몸 높이(208)에 내려오는 순간의 위치에서, 맞는 자리(오프셋)를 골라 네트 너머 빈 곳으로
    if (!ai.plan) {
      const ci = path.findIndex((b) => mySide(b.x) && b.y >= P_GROUND_Y - P_HALF + 1); // 몸에 닿는 높이(212) 이상일 때부터 판정됨
      if (ci >= 0) {
        const cb = path[ci]; let best = null;
        for (let off = -24; off <= 24; off += 2) {
          const px = cb.x - off; if (px < mn || px > mx) continue;
          const reach = Math.abs(px - p.x) <= spd * (ci + 1) + 2;
          const vx = Math.sign(off) * Math.floor(Math.abs(off) / 3), vy = -Math.abs(cb.vy);
          const after = aiSim({ x: cb.x, y: cb.y, vx, vy }, 160), land = aiLand(after);
          const over = !mySide(land.x);
          const apex = Math.min(...after.map((q) => q.y));
          let score = over ? 200 + far(land.x) : (lv === 2 && apex < 150 && Math.abs(land.x - NET_X) < 120 ? 120 - Math.abs(land.x - (NET_X - s * 50)) : 0); // 못 넘기면 네트 앞으로 띄워 놓고 스파이크 각
          if (!reach) score -= 1000 + Math.abs(px - p.x);
          if (!best || score > best.score) best = { score, x: px };
        }
        if (best) ai.plan = { kind: 'recv', x: best.x };
      } else { const ld = aiLand(path); ai.plan = { kind: 'home', x: mySide(ld.x) ? ld.x - s * 12 : homeX }; }
    }
  }
  // 이동
  let tx = serving ? ball.x - s * 6 : ai.plan ? ai.plan.x + ai.err * (ai.plan.kind === 'home' ? 1 : 0.4) : p.x;
  tx = Math.max(mn, Math.min(mx, tx));
  if (Math.abs(tx - p.x) > 2 && Math.random() < L.speed) inp.x = tx < p.x ? -1 : 1;
  // 점프
  const dx = ball.x - p.x;
  if (p.state === NORMAL && p.y === P_GROUND_Y) {
    if (serving && ball.vy > 0 && ball.y > 40 && ball.y < 150 && Math.abs(dx) < 36) inp.y = -1;
    else if (ai.plan && ai.plan.kind === 'spike' && Math.abs(ai.plan.x - p.x) <= spd * 1.5 + 6) {
      // 지금 뛰면 정확히 만나는지 다시 확인
      for (let k = 5; k <= 22 && k <= path.length; k++) { const b = path[k - 1], py = P_GROUND_Y - 16 * k + (k * (k - 1)) / 2; if (mySide(b.x) && !b.ground && b.y >= py - 42 && b.y <= py - 2 && Math.abs(b.x - s * 10 - p.x) <= spd * k + 4 && !path.slice(k - 1, k + 6).some((q) => !mySide(q.x))) { inp.y = -1; break; } }
    }
  }
  // 공중: 공 쪽으로 몸 맞추고, 닿을 거리면 스파이크 (머릿속으로 쳐 보고 빈 곳 고르기)
  if (p.state === JUMP || p.state === POWER) {
    // 공중: 몇 프레임 뒤 공이 올 자리로 몸을 맞춤
    let meet = -1;
    for (let i = 0; i < 12 && i < path.length; i++) { const b = path[i], py = p.y + (p.vy + 1) * (i + 1) + (i * (i + 1)) / 2; if (mySide(b.x) && Math.abs(b.x - p.x) <= 32 + spd * (i + 1) && b.y >= py - 34 && b.y <= py + 30) { meet = i; break; } }
    const aim = meet >= 0 ? path[meet].x - s * 10 : mySide(ball.x) ? ball.x - s * 10 : homeX;
    if (Math.abs(aim - p.x) > 2) inp.x = aim < p.x ? -1 : 1;
    if (mySide(ball.x) && meet >= 0 && meet <= 3) { // 닿기 직전에만 스파이크 버튼 (너무 일찍 누르면 헛스윙)
      if (p.state === JUMP) inp.power = true;
      if (serving || ai.serve != null) { ai.serve = ai.serve ?? Math.floor(Math.random() * 3); if (meet <= 1) { inp.x = s; inp.y = ai.serve === 2 ? -1 : 0; } return inp; }
      let best = null;
      const opts = lv >= 1 ? [[s, -1], [s, 0], [s, 1], [0, -1], [0, 0], [0, 1]] : [[s, 0], [s, 1]];
      for (const [ix, iy] of opts) {
        if (iy === 1 && Math.abs(ball.x - NET_X) > 70) continue; // 뒤에서 내리꽂으면 우리 코트에 박힘
        let ok = true, after = null, land = null;
        for (const c0 of [path[0] || ball, path[1] || ball, path[2] || ball]) { // 맞는 프레임이 조금 달라도 넘어가는지 확인
          const tw = c0.x < NET_X ? 1 : -1, a2 = aiSim({ x: c0.x, y: c0.y, vx: tw * (ix !== 0 ? 20 : 10), vy: Math.abs(c0.vy) * iy * 2 }, 160), l2 = aiLand(a2);
          if (mySide(l2.x)) { ok = false; break; } if (!after) { after = a2; land = l2; }
        }
        if (!ok) continue;
        const score = far(land.x) + (iy === 1 ? 20 : 0) + (ix !== 0 ? 10 : 0) - after.length * (lv === 2 ? 1.2 : 0); // 어려움: 빨리 떨어지는 공 우대
        if (!best || score > best.score) best = { score, ix, iy };
      }
      if (meet <= 1) { if (best && (lv > 0 || Math.random() < 0.7)) { inp.x = best.ix; inp.y = best.iy; } else { inp.x = s; inp.y = -1; } } // 방향키는 닿는 순간에만 (그 전엔 계속 공 쪽으로 이동)
    }
  } else if (p.state === NORMAL) ai.serve = null;
  // 스킬
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
// ===== 2대2 (온라인 전용) =====
// players = [왼쪽1, 오른쪽1, 왼쪽2, 오른쪽2] → side = 번호 % 2. 팀 점수는 players[0]/[1]의 score를 씀
const DUO_BODY = 0.72;                 // 2대2에선 캐릭터가 72% 크기
const DUO_NET_TOP = 192, DUO_PILLAR_TOP = 208; // 네트도 16 낮춤 (원래 176 / 192)
const DUO_COLOR = ['#22b8d8', '#f2973c'];      // 팀원 색 (왼쪽 하늘색 / 오른쪽 주황)
let duo = false, BODY = 1;
function makeMate(i) { // 3P(왼쪽2), 4P(오른쪽2): 키보드에 없는 가상 키 이름 (온라인 입력만 들어옴)
  const p = makePlayer(i % 2), t = 'P' + i;
  p.keys = { l: t + 'l', r: t + 'r', u: t + 'u', d: t + 'd', a: t + 'a', s: t + 's' };
  p.char = i; p.color = DUO_COLOR[i % 2]; p.mate = true;
  return p;
}
function setDuo(on) {
  duo = on; BODY = on ? DUO_BODY : 1;
  NET_TOP = on ? DUO_NET_TOP : 176; NET_PILLAR_TOP = on ? DUO_PILLAR_TOP : 192;
  if (on) { while (players.length < 4) players.push(makeMate(players.length)); }
  else players.length = 2;
}
// 스킬 대상: 1대1이면 상대, 2대2면 공에 더 가까운 상대
function foe(p) {
  let best = null;
  for (const o of players) if (o.side !== p.side && (!best || Math.abs(o.x - ball.x) < Math.abs(best.x - ball.x))) best = o;
  return best;
}
const foes = (p) => players.filter((o) => o.side !== p.side);
const ball = { x: 0, y: 0, vx: 0, vy: 0, rot: 0, power: false, trail: [] };
const effects = [], popups = [];
let state = 'title', timer = 0, lastScorer = 0, winner = -1;
const MENU = ['혼자 플레이', '같이 플레이', '보스전', '온라인 대전', '조작 방법', '모바일 플레이 (베타)'];
// 혼자 플레이 (AI전)
const AI_LEVELS = [
  { name: '쉬움', react: 14, err: 40, spike: 0.15, skill: 0.01, speed: 0.75, move: 1, col: '#7dff9a' },
  { name: '보통', react: 5, err: 10, spike: 0.7, skill: 0.04, speed: 1, move: 1.1, col: '#ffd84d' },
  { name: '어려움', react: 1, err: 0, spike: 1, skill: 0.08, speed: 1, move: 1.35, col: '#ff6a5a' },
];
let solo = false, aiLevel = 1, humanSide = 0;
const isMenu = () => ['title', 'howto', 'startFadeOut', 'side', 'diff', 'bossMenu', 'bossDiff', 'mobileSetup'].includes(state);
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
  if (players[2] && bossMode) { players[2].x = 106; players[3].x = 166; } // 보스전: 3명 다 왼쪽
  else if (players[2]) { players[2].x = 150; players[3].x = 282; } // 2대2: 팀원은 앞쪽
  for (const p of players) {
    Object.assign(p, { y: P_GROUND_Y, vy: 0, state: NORMAL, powerT: 0, lyingT: 0, collided: false });
    // 탈모빔은 라운드 끝나면 사라짐 (시간 상관없이)
    p.shrinkT = 0; p.shrinkK = 0; p.confRev = false; p.frozen = false; p.forceBump = false; p.redT = 0; p.flat = false; p.guardT = 0; p.stunned = false; p.blindT = 0; p.confuseT = 0; p.freezeT = 0; p.flatT = 0; p.fastT = 0; p.weakT = 0; p.nojumpT = 0; p.pullT = 0; p.sightT = 0; p.slowT = 0; p.ampT = 0; p.lagT = 0; p.lagQ = []; p.matrixGuard = false; p.courtGuard = false; p.jumpT = 0; p.manaLockT = 0; p.whirlT = 0; p.blockT = 0; p.silenceT = 0; p.vflipT = 0; p.fwT = 0; p.slowK = 0;
    if (CHARACTERS[p.char].skill === 'hairbeam') p.skillT = 0;
    if (CHARACTERS[p.char].skill === 'democracy') p.skillT = 0; // 민주주의도 라운드 끝나면 해제
  }
  cine = null; // 남아 있는 연출(영역전개·빔)도 정리
  if (party) party.girls.forEach((g) => (g.jumpT = 0));
  Object.assign(ball, { x: server === 0 ? LEFT_SERVE_X : RIGHT_SERVE_X, y: 0, vx: 0, vy: 1, power: false, unblockable: false, trail: [] });
  effects.length = 0;
  craters.length = 0; smokes.length = 0; shake = 0; guardRings.length = 0; ball.meteor = false; ballBoost = 1; glyphs.length = 0; ball.hero = null; ball.flight = null; ball.fx = null; ball.ribbon = []; ball.squashT = 0; ball.wobbleT = 0; ball.waveT = 0; ball.miniT = 0; pinT = 0; fakes.length = 0; matrixHits.length = 0; strikes.length = 0; stamps.length = 0; ball.arrowT = 0; ball.pierce = 0;
  state = 'ready';
  timer = 0; // "Ready?" 30프레임(1.2초) 깜빡이며 화면 밝아짐
  if (state !== 'title' && Math.random() < 0.35) mathTaunt('serve', players[server]); // 서브 직전 대사
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
  players.forEach((p) => mathTaunt('start', p)); // 경기 진입 대사
  state = 'startMsg';
  timer = 0;
}

// ----- 선수 움직임 -----
function updatePlayer(p, inp) {
  p.anim++;
  // 스킬 (거인화)
  const ch = CHARACTERS[p.char];
  if (inp.skill && ch.skill && !cine && !(p.silenceT > 0) && p.mana >= manaMax(p) && p.skillT === 0 && p.state !== WIN && p.state !== LOSE) {
    p.mana = 0;
    p.skillT = p.skillMax = SKILL_FRAMES[ch.skill];
    if (ch.skill === 'hairbeam') cine = { kind: 'hairbeam', intro: 0, t: 0, caster: p, target: foe(p) };
    if (ch.skill === 'democracy') {
      const candles = [];
      for (let i = 0; i < 70; i++) candles.push({ x: Math.random() * GW, y: 20 + Math.random() * 270, d: Math.random() * 14, s: 0.6 + Math.random() * 0.8, f: Math.random() * 6 });
      cine = { kind: 'democracy', t: 0, caster: p, target: foe(p), candles, counter: Math.random() < (dictTest ? 1 : DICTATOR_CHANCE) };
    }
    if (ch.skill === 'wh') {
      cine = { kind: 'wh', t: 0, caster: p, target: foe(p), sk: WH_SKILLS[Math.floor(Math.random() * WH_SKILLS.length)] };
      sfx('whoosh');
    }
    if (ch.skill === 'rina') {
      cine = { kind: 'rina', t: 0, caster: p, target: foe(p), sk: RN_SKILLS[Math.floor(Math.random() * RN_SKILLS.length)] };
      sfx('whoosh');
    }
    if (ch.skill === 'yean') {
      cine = { kind: 'yean', t: 0, caster: p, target: foe(p), sk: YA_SKILLS[Math.floor(Math.random() * YA_SKILLS.length)] };
      sfx('whoosh');
    }
    if (ch.skill === 'cmj') {
      cine = { kind: 'cmj', t: 0, caster: p, target: foe(p), sk: CM_SKILLS[Math.floor(Math.random() * CM_SKILLS.length)] };
      sfx('whoosh');
    }
    if (ch.skill === 'jjh') {
      cine = { kind: 'jjh', t: 0, caster: p, target: foe(p), sk: JJ_SKILLS[Math.floor(Math.random() * JJ_SKILLS.length)] };
    }
    if (ch.skill === 'jmw') {
      cine = { kind: 'jmw', t: 0, caster: p, target: foe(p), sk: JM_SKILLS[Math.floor(Math.random() * JM_SKILLS.length)] };
    }
    if (ch.skill === 'gm') {
      cine = { kind: 'gm', t: 0, caster: p, target: foe(p), sk: GM_SKILLS[Math.floor(Math.random() * GM_SKILLS.length)] };
    }
    if (ch.skill === 'kim') {
      const sk = KIM_SKILLS[Math.floor(Math.random() * KIM_SKILLS.length)];
      cine = { kind: 'kim', t: 0, caster: p, target: foe(p), sk, counter: sk.key === 'vote' && Math.random() < (dictTest ? 1 : DICTATOR_CHANCE) };
      sfx('whoosh');
    }
    if (ch.skill === 'math') {
      const sk = MATH_SKILLS[Math.floor(Math.random() * MATH_SKILLS.length)];
      const T = foe(p);
      const [mn, mx] = T.side === 0 ? [40, 180] : [252, 392];
      cine = { kind: 'math', t: 0, caster: p, target: T, sk, tx: Math.max(mn, Math.min(mx, T.x)), sym: [] };
      sfx('whoosh');
    } else if (ch.skill === 'sock') {
      cine = { kind: 'sock', t: 0, caster: p, target: foe(p), px: p.x, py: p.y, mist: [],
        refX: (c) => { const s2 = c.caster.side === 0 ? 1 : -1, start = s2 > 0 ? -30 : GW + 30, stop = c.px - s2 * 34;
          return start + (stop - start) * Math.min(1, Math.max(0, (c.t - SOCK_REF) / (SOCK_CARD - 2 - SOCK_REF))); } };
      sfx('whoosh');
    } else if (ch.skill === 'history') {
      const hero = HEROES[Math.floor(Math.random() * HEROES.length)];
      cine = { kind: 'history', t: 0, caster: p, target: foe(p), hero };
      sfx('whoosh');
    } else if (ch.skill === 'party') {
      const girls = [];
      const hues = [330, 280, 200, 50, 0, 160, 300, 20, 240, 100];
      for (let i = 0; i < 10; i++) {
        const hx = p.side === 0 ? 14 + i * 19 : GW - 14 - i * 19;
        girls.push({ x: hx, home: hx, hue: hues[i], hair: ['#2b1b10', '#f2d06b', '#ff8fc8', '#6b3b12', '#111'][i % 5], ph: Math.random() * 6, jumpT: 0, jx: 0, jy: 0 });
      }
      party = { side: p.side, caster: p, girls, cd: 0 };
      p.fastT = SKILL_FRAMES.party; foes(p).forEach((o) => (o.slowT = 100)); // 팬 응원: 나는 빨라지고, 상대는 조명에 눈부셔 느려짐
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
      const T = foe(p);
      cine = { kind: 'meteor', t: 0, caster: p, target: T, cracks, debris: [],
        portalX: T.x + (p.side === 0 ? -40 : 40), line: lines[Math.floor(Math.random() * lines.length)] };
      sfx('whoosh');
    } else if (ch.skill === 'giant' || ch.skill === 'whirl') {
      cine = { kind: 'lite', t: 0, caster: p, target: foe(p), key: ch.skill };
    } else popups.push({ text: ch.skillName + '!', x: p.x, y: 120, t: 30, color: p.color });
    if (bossMode) bossOnSkill(p);
  }
  if (p.skillT > 0) p.skillT--;
  let [tw, th] = p.skillT > 0 && SKILL_SIZE[ch.skill] ? SKILL_SIZE[ch.skill] : [1, 1];
  if (p.whirlT > 0) { p.whirlT--; [tw, th] = SKILL_SIZE.whirl; } // 계백 보너스 회오리
  if (p.boss) { tw *= BOSS_SCALE[0]; th *= BOSS_SCALE[1]; } else { tw *= BODY; th *= BODY; } // 2대2·보스전: 작은 캐릭터 / 보스: 거대
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
  for (const f of ['fastT', 'weakT', 'nojumpT', 'pullT', 'sightT', 'slowT', 'ampT', 'manaLockT', 'jumpT', 'blockT', 'silenceT', 'fwT']) if (p[f] > 0) p[f]--;
  if (!(p.slowT > 0)) p.slowK = 0;
  if (p.guardT === 0) { p.matrixGuard = false; p.courtGuard = false; }
  if (p.flatT > 0 && --p.flatT === 0) p.flat = false;
  if (p.vflipT > 0) { p.vflipT--; inp = { ...inp, y: inp.y === -1 ? 1 : inp.y === 1 ? -1 : 0 }; }
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
  const slow = (p.flat ? 0.5 : 1) * (p.fastT > 0 ? 1.5 : 1) * (p.slowT > 0 ? (p.slowK || 0.55) : 1); // 납작하면 이속 절반, 자유 버프면 1.5배
  if (p.pullT > 0) p.x += Math.sign(p.pullX - p.x) * Math.min(4.6, Math.abs(p.pullX - p.x)); // 특이점으로 끌려감
  if (p.state === DIVE) p.x += p.diveDir * 8 * slow;
  else p.x += inp.x * 6 * slow * (p.ai ? AI_LEVELS[p.aiLevel ?? aiLevel].move || 1 : 1); // AI 난이도별 이동속도
  const [mn, mx] = p.boss ? [266, 398] : p.side === 0 ? [32, 184] : [248, 400];
  if (bossMode) bossBlockMove(p); // 책상 장해물
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
  if (ball.pierce > 0) ball.pierce--;
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
    const gs = ball.x < NET_X ? 0 : 1, guard = players.find((o) => o.side === gs && o.guardT > 0) || players[gs];
    ball.squashT = 6;
    if (guard.guardT > 0 && !ball.unblockable && !(ball.pierce > 0)) { gyebaekSave(guard); return false; }
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
  const prevX = ball.x;
  ball.x += ball.vx * m;
  ball.y += ball.vy * m;
  ball.vy += 1 * m;
  jjhBlockCheck(prevX);
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
    { const o = players[1 - p.side]; if (CHARACTERS[o.char].skill === 'cmj' && Math.random() < 0.3) cmjReact('spike', o, p);
      if (CHARACTERS[o.char].skill === 'rina' && Math.random() < 0.25) p.rinaNerf = true; } // 송리나 패시브: 출제 의도 파악
    const toward = ball.x < NET_X ? 1 : -1;
    ball.vx = toward * (inp.x !== 0 ? 20 : 10);
    ball.vy = Math.abs(ball.vy) * inp.y * 2;
    ball.power = true;
    if (CHARACTERS[p.char].skill === 'jjh') { // 선택적 기사도: 여자 상대면 솜사탕, 남자 상대면 뚝배기
      if (isFem(players[1 - p.side])) { ball.vx *= 0.5; ball.vy *= 0.5; ball.power = false; popups.push({ text: '♥', x: ball.x, y: ball.y - 16, t: 16, color: '#ff8fc8' }); }
      else { ball.vx = Math.sign(ball.vx) * Math.min(30, Math.abs(ball.vx) * 1.2); ball.vy *= 1.2; heavy(ball.x, ball.y, 1.2); popups.push({ text: '☠', x: ball.x, y: ball.y - 16, t: 16, color: '#ff3040' }); }
    }
    if (p.rinaNerf) { p.rinaNerf = false; ball.vx *= 0.6; ball.vy *= 0.6; ball.power = false; popups.push({ text: '[출제 의도 파악 완료]', x: ball.x, y: ball.y - 20, t: 24, color: '#d080ff' }); }
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
      if (!p.collided) { hitBall(p, inputs[players.indexOf(p)]); p.collided = true; }
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
  if (touched && scoring && bossMode) bossOnPoint();
  else if (touched && scoring) {
    cine = null;
    heavy(ball.x, 272, 1.4);
    lastScorer = ball.x < NET_X ? 1 : 0;
    players[lastScorer].score++;
    if (players[lastScorer].score < CONFIG.WIN_SCORE) { if (Math.random() < 0.5) mathTaunt('error', players[lastScorer]); if (Math.random() < 0.35) mathTaunt('miss', players[1 - lastScorer]); }
    else { mathTaunt('win', players[lastScorer]); mathTaunt('lose', players[1 - lastScorer]); }
    if (players[lastScorer].score >= CONFIG.WIN_SCORE) {
      winner = lastScorer;
      players.forEach((p) => (p.state = p.side === winner ? WIN : LOSE));
      players.forEach((p) => { p.y = P_GROUND_Y; p.vy = 0; p.skillT = 0; });
      state = 'over';
      timer = 0;
      if (is308()) { state = 'e308'; e3Start(); } /* 김예안 vs 김두현: 308호 엔딩 */
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
  if (cine.kind === 'jjh') return jjCam(cine);
  if (cine.kind === 'cmj') return cmCam(cine);
  if (cine.kind === 'yean') return yaCam(cine);
  if (cine.kind === 'rina') return rnCam(cine);
  if (cine.kind === 'wh') return whCam(cine);
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
  if (cine.kind === 'jjh') drawJjhUI(cine);
  if (cine.kind === 'cmj') drawCmjUI(cine);
  if (cine.kind === 'yean') drawYeanUI(cine);
  if (cine.kind === 'rina') drawRinaUI(cine);
  if (cine.kind === 'wh') drawWhUI(cine);
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
  // 이동우: 위인마다 다른 맛 (저격·연쇄 함정·지혜 버프)
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
  if (p.fwT > 0) drawFirewall(p);
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
    if (h.jj) { // 주지혁 블로킹: 솜이불 쿠션 / 철퇴 파리채 짝!
      ctx.save(); ctx.globalAlpha = 1 - q;
      if (h.jj === 'grammar') { ctx.strokeStyle = '#ff2020'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(h.x - 60, 150); ctx.lineTo(h.x - 60 + 120 * Math.min(1, q * 4), 146); ctx.stroke(); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(h.x, 270, 20 + q * 70, 5 + q * 16, 0, 0, 7); ctx.stroke(); }
      else if (h.jj === 'soft') { drawWings(h.x, 150, 1.6, 1, 26 - h.t); for (let k = 0; k < 8; k++) drawHeart(h.x + Math.cos(k * 0.8) * 40 * q, 150 + Math.sin(k * 0.8) * 30 * q, 5, '#ff6fa8'); ctx.fillStyle = 'rgba(255,240,250,.85)'; ctx.beginPath(); ctx.ellipse(h.x, 160, 34, 14, 0, 0, 7); ctx.fill(); }
      else { drawSwatter(h.x, 210, 2.2, (h.side === 0 ? 1 : -1) * (-1.2 + Math.min(1, q * 5) * 1.6), 1); ctx.strokeStyle = '#ff3040'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(h.x, 270, 20 + q * 80, 5 + q * 18, 0, 0, 7); ctx.stroke(); }
      ctx.restore();
      ctx.save(); ctx.globalAlpha = 1 - q; text(h.jj === 'grammar' ? 'SYNTAX ERROR!' : h.jj === 'soft' ? '포근~♥' : '짝-!!', h.x, 120 - q * 20, 18, h.jj === 'soft' ? '#ff8fc8' : h.jj === 'grammar' ? '#ff4dff' : '#ff3040'); ctx.restore();
      continue;
    }
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
  for (const f of fakes) { if (f.arrow && !(f.arrowDelay > 0)) drawArrowStreak(f.x, f.y, f.vx, f.vy); const r = ball.rot; ball.rot = f.rot; const gx = f.glitch && Math.random() < 0.3 ? (Math.random() - 0.5) * 10 : 0; drawBallAt(f.x + gx, f.y, f.glitch ? 0.85 : 1); if (f.glitch && Math.random() < 0.4) { ctx.fillStyle = 'rgba(255,0,85,.5)'; ctx.fillRect(f.x - 20 + gx, f.y - 3 + (Math.random() - 0.5) * 20, 40, 3); } ball.rot = r; }
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
  else if (p.vflipT > 0) text('404 ↕↔ 반전', p.x, y, 8, '#ff5a8a');
  else if (p.manaLockT > 0) text('🔒 탄핵: 마나 봉인', p.x, y, 8, '#ffd84d');
  else if (p.slowT > 0) text('🐢 감속', p.x, y, 8, '#3cf0ff');
  if (p.ampT > 0) text('♒ 증폭', p.x, y - 10, 8, '#5aa8ff');
  if (p.matrixGuard && p.guardT > 0) text('[ 행렬 방패 ]', p.x, y - 10, 8, '#c896ff');
  if (p.jumpT > 0) text('자유 점프 ▲', p.x, y - 20, 8, '#78dcc8');
  if (p.silenceT > 0) text('■ BSOD 스킬 봉인', p.x, y - 40, 8, '#6f9bff');
  if (p.blockT > 0) { if (p.blockMode === 'soft') drawWings(p.x, p.y - 14, 0.7, 0.8, p.anim); else drawSwatter(p.x + (p.side === 0 ? 14 : -14), p.y - 10, 0.6, 0, 0.85); text(p.blockMode === 'grammar' ? '✎ 문법 교정 대기' : p.blockMode === 'soft' ? '♥ 쿠션 대기' : '☠ 파리채 대기', p.x, y - 30, 8, p.blockMode === 'soft' ? '#ff8fc8' : '#ff3040'); }
  if (CHARACTERS[p.char].skill === 'jjh' && (state === 'play' || state === 'ready')) { // 패시브: 선택적 기사도 오라
    const fem = isFem(players[1 - p.side]);
    for (let i = 0; i < 4; i++) { const an = p.anim * 0.08 + i * 1.57, ax = p.x + Math.cos(an) * 22, ay = p.y - 6 + Math.sin(an) * 14;
      if (fem) drawHeart(ax, ay, 2.6, 'rgba(255,110,170,.8)'); else { ctx.fillStyle = 'rgba(200,20,20,.7)'; ctx.fillRect(ax - 1.5, ay - 1.5, 3, 3); } }
  }
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

// ----- 주지혁 (신화): 상대 성별에 따라 인격이 180° 바뀜 -----
const isFem = (p) => CHARACTERS[p.char].gender === 'f';
const JJ_C1 = 20, JJ_FIRE = 50, JJ_END = 75;
const JJ_SKILLS = [
  { key: 'chivalry', title: ['선택적 기사도: 솜사탕 패스', '선택적 기사도: 뚝배기 파쇄'], en: 'Selective Chivalry',
    line: ['"레이디가 다치면 안 되니까... 살포시 전해드릴게요~"', '"아 진짜 냄새나니까 한 번에 좀 꺼져라!!"'] },
  { key: 'letter', title: ['동기부여의 차이: 러브레터 서브', '동기부여의 차이: 오물 강탄'], en: 'Motivation Difference',
    line: ['"제 마음이 담긴 작은 선물입니다~ 받아주세요!"', '"아... 귀찮게 남자들끼리 배구를 왜 하냐고..."'] },
  { key: 'block', title: ['차별적 블로킹: 푹신한 쿠션', '차별적 블로킹: 철퇴 파리채'], en: 'Discriminatory Block',
    line: ['"손목 아프실라, 제가 살살 받아낼게요!"', '"어디서 드러운 게 감히 넘어오려고!"'] },
];
const JJ_TAUNT = {
  f: {
    start: ['오늘 경기장이 아니라 인연의 장소였군요... 살살 다뤄드릴게요!', '공에 손목 다치실까 봐 걱정되는데... 경기 끝나고 커피 한잔 어떠세요?',
      '저를 때리셔도 좋습니다! 제 마음은 이미 그쪽으로 넘어갔으니까요.', '하... 심장이 너무 뛰어서 리시브를 제대로 못 하겠네...', '공격하지 마시고 제 마음이나 받아주시죠!'],
    win: ['제가 이기긴 했지만... 오늘 진짜 우승자는 당신입니다!', '이긴 기념으로 번호 하나만 주시는 건... 혹시 반칙인가요?',
      '아쉽게 패배하셨지만 제 마음속엔 이미 당신이 챔피언입니다.', '손목은 괜찮으세요? 경기 내내 마음이 조마조마했어요.'],
    lose: ['승리는 양보해 드렸습니다! 대신 제 마음만은 받아주세요!', '당신의 스파이크에 제 코트도, 제 마음도 뚫려버렸네요...',
      '지면 좀 어때요? 그쪽 웃는 모습 봤으니까 제가 이긴 겁니다~', '다음엔 경기장 말고 디저트 카페에서 다시 만나요!'],
    block: '휴~ 다치실까 봐 푹신하게 막아드렸습니다!', miss: '앗, 죄송해요! 눈이 부셔서 그만...',
    serve: '제 마음이 담긴 솜사탕 서브입니다~', error: '마음 상하지 않으셨으면 좋겠네요...',
  },
  m: {
    start: ['아... 군대 다시 입대한 기분이네. 땀 냄새나니까 멀찍이 떨어져라.', '남고 배구부냐? 진심 칙칙해서 눈 뜨고 못 봐주겠네.',
      '빠르게 후려치고 샤워나 하러 간다.', '어이 허접들아, 득점 꿈도 꾸지 마라.', '체육관 환기 안 시키냐?! 땀 냄새 때문에 킹받아 죽겠네!'],
    win: ['아 이겨도 기분 묘하게 더럽네. 땀구멍 터지기 전에 얼른 꺼져라.', '너네 실력은 진짜 동네 약수터 배구 수준이다.',
      '코트에 땀 흘리지 말고 얼른 나가! 냄새 배니까!', '이기긴 했는데 눈 오염돼서 빡치니까 안구 정화비나 내놓고 가라.'],
    lose: ['아... 저런 애들한테 지니까 수치스러워서 잠을 못 자겠네!!!', '운 좋게 이겼다고 신나지 마라!',
      '아 방해돼서 집중이 안 됐잖아! 니들 인상이 반칙이라고!', '체육관 바닥 땀이나 다 닦고 가라...'],
    block: '어디서 머리통을 밀어 넣어?! 뚝배기 깨버린다!', miss: '아 빡치네, 쟤네 얼굴 보다가 순간 뇌정지 왔잖아!',
    serve: '그냥 이거 맞고 기절해라.', error: '맞았으면 그냥 조용히 있어라!',
  },
};
function jjSource(c) { const P = c.caster, s = P.side === 0 ? 1 : -1; return { x: P.x + s * 24, y: P.y - 40 }; }

function updateJjh() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  c.t++;
  const t = c.t;
  players.forEach((p) => p.anim++);
  if (!c.init) {
    c.init = true; c.fem = isFem(T); c.parts = []; c.y0 = P.y; c.x0 = P.x;
    c.lift = k === 'letter' ? (c.fem ? 30 : 110) : 90; // 오물 강탄: 높이서 낮고 빠르게 깔아 침
    if (k === 'block') c.nx = NET_X - s * 40; // 네트 앞으로
  }
  const ly = P_GROUND_Y - c.lift;
  if (t <= JJ_C1) { const q = t / JJ_C1, e = 1 - (1 - q) * (1 - q); P.y = c.y0 + (ly - c.y0) * e; if (k === 'block') P.x = c.x0 + (c.nx - c.x0) * e; }
  P.state = JUMP; P.vy = 0;
  if (t === 1) sfx('zap', 0.4);
  if (t === JJ_C1) { if (c.fem) { sfx('chime'); sfx('bell', 0.4); } else { sfx('rumble'); shake = 8; } }
  // 파티클: 여 → 장미 꽃잎·하트·반짝이 / 남 → 해골·불티
  if (t > JJ_C1 - 4) for (let i = 0; i < 2; i++) c.parts.push(c.fem
    ? { x: P.x + (Math.random() - 0.5) * 120, y: P.y - 80 + (Math.random() - 0.5) * 60, vx: (Math.random() - 0.5) * 1.2, vy: 0.6 + Math.random(), t: 50, rot: Math.random() * 6, kind: ['petal', 'heart', 'spark'][Math.floor(Math.random() * 3)] }
    : { x: P.x + (Math.random() - 0.5) * 80, y: P.y + 10, vx: (Math.random() - 0.5) * 2, vy: -1.5 - Math.random() * 2, t: 40, rot: 0, kind: Math.random() < 0.35 ? 'skull' : 'ember' });
  for (const q of c.parts) { q.x += q.vx + (q.kind === 'petal' ? Math.sin(q.t * 0.2) * 0.6 : 0); q.y += q.vy; q.rot += 0.08; q.t--; }
  c.parts = c.parts.filter((q) => q.t > 0);
  if (t === JJ_FIRE - 12) sfx('charge');
  if (t === JJ_FIRE - 1) { hitStop = 3; sfx('suck'); }
  const src = jjSource(c);
  if (k !== 'block' && t < JJ_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += c.fem ? 0.05 : 0.4; }
  if (t === JJ_FIRE) {
    P.state = JUMP; P.vy = 0;
    const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
    if (k === 'block') { P.blockT = 150; P.blockMode = c.fem ? 'soft' : 'swat'; if (c.fem) sfx('chime'); else { heavy(P.x, P.y - 40, 1.4); sfx('snap'); } popups.push({ text: c.fem ? '천사 쿠션 6초!' : '철퇴 파리채 6초!', x: GW / 2, y: 168, t: 45, color: c.fem ? '#ff8fc8' : '#ff3040' }); cine = null; return; }
    ball.x = src.x; ball.y = src.y;
    if (k === 'chivalry') {
      if (c.fem) { releaseBall(Math.max(mn, Math.min(mx, T.x)), 40); ball.power = false; sfx('pop'); popups.push({ text: '살포시~♥', x: GW / 2, y: 168, t: 45, color: '#ff8fc8' }); }
      else { heavy(src.x, src.y, 2.6); sfx('explode'); releaseBall(Math.max(mn, Math.min(mx, T.x)), 9); T.freezeT = 14; T.stunned = true; popups.push({ text: '뚝배기 파쇄!!', x: GW / 2, y: 168, t: 45, color: '#ff3040' }); }
    } else { // letter
      if (c.fem) { releaseBall(T.side === 0 ? NET_X - 50 : NET_X + 50, 36); ball.power = false; sfx('pop'); popups.push({ text: '러브레터 배달~♥', x: GW / 2, y: 168, t: 45, color: '#ff8fc8' }); }
      else { heavy(src.x, src.y, 2.0); sfx('thud'); releaseBall(T.side === 0 ? mn : mx, 12); /* 엔드라인 코너로 낮고 빠르게 */ popups.push({ text: '무회전 오물 강탄!', x: GW / 2, y: 168, t: 45, color: '#b0b0b0' }); }
    }
    cine = null;
  }
}

function jjCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, H = CAM_HOME;
  if (!c.init) return H;
  const ly = P_GROUND_Y - c.lift, face = { x: (c.sk.key === 'block' ? c.nx : P.x), y: ly - 12 };
  return camKeys(t, [[0, H], [8, { x: face.x, y: face.y, z: 3.8 }], [JJ_C1, { x: face.x, y: face.y, z: 4.2 }], // 얼굴 스캔
    [JJ_C1 + 6, { x: face.x + s * 30, y: face.y + 10, z: 1.9, r: c.fem ? -s * 0.04 : s * 0.06 }], [JJ_FIRE - 2, { x: face.x + s * 34, y: face.y + 10, z: 2.2, r: c.fem ? -s * 0.03 : s * 0.08 }],
    [JJ_FIRE + 1, H], [JJ_END, H]]);
}

function drawWings(x, y, sc, a, t) {
  ctx.save(); ctx.translate(x, y); ctx.globalAlpha = a;
  for (const sg of [-1, 1]) {
    ctx.save(); ctx.scale(sg * sc, sc); ctx.rotate(Math.sin(t * 0.25) * 0.12);
    const g = ctx.createLinearGradient(0, 0, 50, -20); g.addColorStop(0, 'rgba(255,240,250,.95)'); g.addColorStop(1, 'rgba(255,150,200,.7)');
    ctx.fillStyle = g; ctx.shadowColor = '#ff9ad0'; ctx.shadowBlur = 12;
    for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(14 + i * 9, -14 + i * 5, 22 - i * 3, 7, -0.5 + i * 0.25, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  ctx.restore();
}
function drawSwatter(x, y, sc, rot, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = a;
  ctx.strokeStyle = '#ff2a3a'; ctx.shadowColor = '#ff2a3a'; ctx.shadowBlur = 14; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -40); ctx.stroke();              // 손잡이
  ctx.lineWidth = 2; ctx.strokeRect(-16, -78, 32, 38);                              // 판
  ctx.lineWidth = 0.8; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-16, -78 + i * 6.3); ctx.lineTo(16, -78 + i * 6.3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-16 + i * 5.3, -78); ctx.lineTo(-16 + i * 5.3, -40); ctx.stroke(); }
  ctx.fillStyle = '#5a5a66'; for (const [px, py] of [[-16, -78], [16, -78], [-16, -40], [16, -40]]) { ctx.beginPath(); ctx.arc(px, py, 3, 0, 7); ctx.fill(); } // 철퇴 징
  ctx.restore();
}
function drawHeart(x, y, r, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y + r * 0.9);
  ctx.bezierCurveTo(x - r * 1.4, y - r * 0.2, x - r * 0.6, y - r * 1.2, x, y - r * 0.4);
  ctx.bezierCurveTo(x + r * 0.6, y - r * 1.2, x + r * 1.4, y - r * 0.2, x, y + r * 0.9); ctx.fill();
}

function drawJjhWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, key = c.sk.key;
  if (!c.init) return;
  const k = Math.min(1, t / 6), fem = c.fem && t >= JJ_C1 - 2, male = !c.fem && t >= JJ_C1 - 2;
  // 컷1: 차갑게 스캔 (어두운 청색) → 컷2부터 분기
  ctx.fillStyle = `rgba(6,10,24,${t < JJ_C1 - 2 ? 0.7 * k : 0})`; ctx.fillRect(-600, -600, 1650, 1500);
  if (fem) { // 순정만화: 핑크 그라데이션 + 반짝이 + 장미빛
    const g = ctx.createRadialGradient(P.x, P.y - 20, 10, P.x, P.y - 20, 320); g.addColorStop(0, 'rgba(255,220,240,.85)'); g.addColorStop(1, 'rgba(255,150,200,.75)');
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    for (let i = 0; i < 18; i++) { const sx = (i * 73 + t * 0.7) % 520 - 40, sy = (i * 41) % 300, tw = (Math.sin(t * 0.3 + i) + 1) / 2; ctx.fillStyle = `rgba(255,255,255,${tw})`; ctx.beginPath(); ctx.moveTo(sx, sy - 5); ctx.lineTo(sx + 1.2, sy); ctx.lineTo(sx, sy + 5); ctx.lineTo(sx - 1.2, sy); ctx.fill(); ctx.beginPath(); ctx.moveTo(sx - 5, sy); ctx.lineTo(sx, sy + 1.2); ctx.lineTo(sx + 5, sy); ctx.lineTo(sx, sy - 1.2); ctx.fill(); }
  }
  if (male) { // 폭주: 검붉은 오라 + 금 간 화면
    const g = ctx.createRadialGradient(P.x, P.y - 20, 10, P.x, P.y - 20, 320); g.addColorStop(0, 'rgba(90,0,0,.7)'); g.addColorStop(1, 'rgba(15,0,0,.92)');
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    ctx.strokeStyle = 'rgba(255,40,40,.35)'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) { ctx.beginPath(); let x = P.x, y = P.y - 20; ctx.moveTo(x, y); for (let j = 0; j < 5; j++) { const an = i * 1.05 + Math.sin(i * 7 + j) * 0.5; x += Math.cos(an) * 28; y += Math.sin(an) * 28; ctx.lineTo(x, y); } ctx.stroke(); }
  }
  // 파티클
  for (const q of c.parts) {
    ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.globalAlpha = Math.min(1, q.t / 12);
    if (q.kind === 'petal') { ctx.fillStyle = '#ff6fa8'; ctx.beginPath(); ctx.ellipse(0, 0, 4, 2.2, 0, 0, 7); ctx.fill(); }
    else if (q.kind === 'heart') drawHeart(0, 0, 4, '#ff4f9a');
    else if (q.kind === 'spark') { ctx.fillStyle = '#fff'; ctx.fillRect(-1, -1, 2, 2); }
    else if (q.kind === 'skull') { ctx.rotate(-q.rot); text('☠', 0, 4, 11, '#ffdddd'); }
    else { ctx.fillStyle = '#ff5020'; ctx.fillRect(-1, -1, 2.4, 2.4); }
    ctx.restore();
  }
  // 스킬별 소품
  if (key === 'block' && t >= JJ_C1) { const a = Math.min(1, (t - JJ_C1) / 8); if (c.fem) drawWings(P.x, P.y - 20, 1.3, a, t); else drawSwatter(P.x + s * 6, P.y - 30, 1.5 + a * 0.4, -s * 0.2, a); }
  if (key === 'letter' && t >= JJ_C1) {
    const a = Math.min(1, (t - JJ_C1) / 8), b = jjSource(c);
    if (c.fem) { // 러브레터 홀로그램
      ctx.save(); ctx.translate(b.x, b.y - 38 + Math.sin(t * 0.2) * 3); ctx.globalAlpha = a; ctx.rotate(-0.1);
      ctx.fillStyle = 'rgba(255,240,248,.95)'; ctx.strokeStyle = '#ff6fa8'; ctx.lineWidth = 1.5; ctx.fillRect(-22, -14, 44, 28); ctx.strokeRect(-22, -14, 44, 28);
      ctx.beginPath(); ctx.moveTo(-22, -14); ctx.lineTo(0, 4); ctx.lineTo(22, -14); ctx.stroke(); drawHeart(0, 3, 5, '#ff3f8a'); ctx.restore();
    } else for (let i = 0; i < 5; i++) { const sx = b.x + Math.sin(t * 0.1 + i) * 14, sy = b.y - 10 - ((t * 1.2 + i * 12) % 50); ctx.fillStyle = `rgba(130,130,130,${0.5 * a})`; ctx.beginPath(); ctx.arc(sx, sy, 6 + i, 0, 7); ctx.fill(); } // 칙칙한 연기
  }
  if (key === 'chivalry' && t >= JJ_C1) { const b = jjSource(c), a = Math.min(1, (t - JJ_C1) / 10);
    const g = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 34 * a); g.addColorStop(0, c.fem ? 'rgba(255,230,245,1)' : 'rgba(255,120,40,1)'); g.addColorStop(1, c.fem ? 'rgba(255,150,210,0)' : 'rgba(120,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, 34 * a, 0, 7); ctx.fill(); }
  if (key !== 'block' && t > JJ_FIRE - 12 && t < JJ_FIRE) { const b = jjSource(c); chargeFX(b.x, b.y, (t - (JJ_FIRE - 12)) / 12, c.fem ? '255,150,210' : '255,40,40'); }
  // 인물 + 표정 (하트 눈 / 핏줄)
  drawPlayer(P);
  if (fem) for (const dx of [-6, 6]) drawHeart(P.x + dx + (P.side === 0 ? -3 : 3), P.y - 16, 3.2 + Math.sin(t * 0.5) * 0.6, '#ff2f7a');
  if (male) drawVeins(P.x + (P.side === 0 ? 8 : -8), P.y - 20, 0.6 + Math.sin(t * 0.8) * 0.06, 1);
  drawPlayer(T);
  if (key !== 'block' && t >= JJ_C1) drawBall();
}

function drawJjhUI(c) {
  const t = c.t, sk = c.sk;
  if (!c.init) return;
  const g = c.fem ? 0 : 1, k = Math.min(1, t / 6);
  if (t < JJ_C1 + 4) { // 컷1: 성별 스캔 UI
    ctx.save(); ctx.globalAlpha = k;
    ctx.strokeStyle = '#3cf0ff'; ctx.lineWidth = 1.5; const sy = 60 + ((t * 9) % 160);
    ctx.fillStyle = 'rgba(60,240,255,.25)'; ctx.fillRect(0, sy, GW, 3);
    for (const [x, y] of [[GW / 2 - 70, 70], [GW / 2 + 70, 70], [GW / 2 - 70, 220], [GW / 2 + 70, 220]]) { ctx.beginPath(); ctx.moveTo(x, y + (y < 100 ? 14 : -14)); ctx.lineTo(x, y); ctx.lineTo(x + (x < GW / 2 ? 14 : -14), y); ctx.stroke(); }
    ctx.fillStyle = 'rgba(0,10,20,.75)'; ctx.fillRect(GW / 2 - 90, 244, 180, 22);
    text(t < JJ_C1 - 6 ? 'SCANNING TARGET...' : c.fem ? 'RESULT: FEMALE ♥' : 'RESULT: MALE ☠', GW / 2, 259, 11, t < JJ_C1 - 6 ? '#3cf0ff' : c.fem ? '#ff8fc8' : '#ff3040');
    ctx.restore();
  }
  if (!c.fem && t >= JJ_C1 && t < JJ_C1 + 4) { ctx.fillStyle = `rgba(255,0,0,${0.4 - (t - JJ_C1) * 0.1})`; ctx.fillRect(0, 0, GW, GH); }
  if (c.fem && t >= JJ_C1) { ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#fff'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(GW / 2 + Math.cos(t * 0.05 + i) * 160, GH / 2 + Math.sin(t * 0.07 + i * 2) * 100, 30, 0, 7); ctx.fill(); } ctx.restore(); } // 순정만화 렌즈 빛망울
  ctx.save(); ctx.globalAlpha = k;
  if (t >= JJ_C1 - 2) { text(sk.title[g], GW / 2, 22, 12, c.fem ? '#d81b60' : '#ff3040'); text(sk.en, GW / 2, 34, 8, c.fem ? '#7a2050' : '#fff'); }
  if (t >= JJ_C1) {
    const ln = sk.line[g], n = Math.max(0, Math.min(ln.length, Math.floor((t - JJ_C1) * 1.6)));
    ctx.font = 'bold 11px "Malgun Gothic", sans-serif'; const w = ctx.measureText(ln).width + 16;
    ctx.fillStyle = c.fem ? 'rgba(194,24,91,.85)' : 'rgba(0,0,0,.7)'; ctx.fillRect(GW / 2 - w / 2, 262, w, 17);
    text(ln.slice(0, n), GW / 2, 274, 11, '#fff');
  }
  ctx.restore();
}

// 차별적 블로킹 발동: 상대 공이 네트를 넘어오는 순간
function jjhBlockCheck(prevX) {
  for (const q of players) {
    if (!(q.blockT > 0) && !(q.fwT > 0)) continue;
    const s = q.side === 0 ? 1 : -1, was = (prevX < NET_X) === (q.side === 0), now = (ball.x < NET_X) === (q.side === 0);
    if (was || !now || ball.y > NET_TOP + 20 || ball.pierce > 0) continue;
    if (q.fwT > 0) {
      ball.x = NET_X + s * 30; ball.vx = s * 0.5; ball.vy = 22; ball.power = true; heavy(ball.x, ball.y, 1.8); sfx('fail'); sfx('boom');
      matrixHits.push({ x: ball.x, t: 26, side: q.side, jj: 'swat', fw: true }); popups.push({ text: 'REQUEST DENIED', x: ball.x, y: 110, t: 24, color: '#8cb4ff' }); mathTaunt('block', q);
      continue;
    }
    if (q.blockMode === 'soft') { ball.x = NET_X + s * 26; ball.vx = s * 2; ball.vy = -5; ball.power = false; sfx('pop'); sfx('chime'); }
    else { ball.x = NET_X + s * 30; ball.vx = s * 0.5; ball.vy = 24; ball.power = true; heavy(ball.x, ball.y, 2.2); sfx('snap'); sfx('boom'); }
    // s = 블로커가 공격하는 방향 → 공을 공격자 쪽 코트로 돌려보냄
    matrixHits.push({ x: ball.x, t: 26, side: q.side, jj: q.blockMode });
    mathTaunt('block', q);
    q.blockT = 0;
  }
}

// ===== 차명준 (ULTRA 울트라 레전드): 시공간·시스템을 코딩하는 물리학자 해커 — 6초 시네마틱 7종 =====
const CM_A = 25, CM_B = 62, CM_C = 100, CM_FIRE = 125, CM_HIT = 150, CM_END = 172;
const CM_SKILLS = [
  { key: 'swap', title: '양자 얽힘: 슈뢰딩거의 흑선 좌표 교환', en: "Schrödinger's Black Flash Swap", col: '255,0,51',
    lines: ['"위치와 운동량은 동시에 존재할 수 없다..."', '"공간 좌표 얽힘... 흑선(黑閃) 교환."'] },
  { key: 'emc2', title: '질량-에너지 등가: E=mc² 히노카미 멸살', en: 'Mass-Energy Sun Breath Spike', col: '255,69,0',
    lines: ['"질량 1g은 곧 9×10¹³J의 멸살 에너지다."', '"너희의 유한한 방어막으로... 이 태양의 가속도를 막을 수 있겠나?"'] },
  { key: 'rootkit', title: '시스템 오버라이드: 무량공처 404 차원참', en: 'Unlimited Void 404: Dimensional Cut', col: '255,0,127',
    lines: ['"HTTP 404 ERROR: 무량공처."', '"너희 신경계 버퍼에... 무한의 데이터 오버로드를 주입한다."'] },
  { key: 'ai', title: '머신러닝 벡터: AI 벽력일섬 8련 궤적', en: 'AI Thunder Breathing Speeding Flash', col: '255,215,0',
    lines: ['"머신러닝 학습 완료: 벽력(霹靂)."', '"어느 좌표로 몸을 날리든... 수학적 리시브 확률은 0%다."'] },
  { key: 'time', title: '상대성 중력장: 시간 팽창 수경 잔월', en: 'Relativistic Water Breathing Dead Calm', col: '0,229,255',
    lines: ['"시간 팽창 완료... 잔월(靜月)."', '"이 중력 수경 속에서... 너희의 시간은 더 이상 흐르지 않는다."'] },
  { key: 'bsod', title: '커널 패닉: BSOD 복마어주자 방화벽', en: 'Kernel Panic Malevolent Shrine', col: '60,120,255',
    lines: ['"치명적인 예외가 발생했습니다: 복마(伏魔)."', '"너희 시스템의 스킬 실행 커널을 강제 종료(Shut Down)합니다."'] },
  { key: 'bigbang', title: '영역 전개: 빅뱅 - 양자 무량 특이점', en: 'Domain Expansion: Quantum Singularity Core', col: '255,215,0',
    lines: ['"영역 전개... 무량 특이점. 우주의 시작은 빅뱅이었고..."', '"이 연산의 끝은 너희 존재의 완전한 멸망이다!"'] },
];
const CM_TAUNT = {
  start: ['입자 가속기 가동. 이 경기는 이미 내 알고리즘 안에서 1만 번 완승을 거두었다.', '엔트로피가 극대화되기 전에 빠르게 경기장의 시스템을 셧다운시키지.',
    '초기 상태 벡터 설정 완료. 너희의 동선은 내 3D 격자판 위의 데이터에 불과해.', '물리 법칙 오버라이드 개시. 오늘 이 코트의 공기 저항 계수는 내가 결정한다.',
    '서버 접속 완료. 0과 1의 세계보다 배구 코트의 변수가 훨씬 단조롭군요.', '양자 컴퓨터 연산 개시. 너희가 패배할 확률은 정확히 99.999%다.',
    '내 연산 오차 범위는 0.0001% 이내다. 시작하지.', '결계를 전개한다. 내 연산 오차 범위는 0.0001% 이내다.', '너희의 경기 데이터는 이미 내 백도어로 전부 분석되었다.'],
  error: ['운동량 보존 법칙에 따른 필연적인 결말이다.', '너희 수비진의 반응 속도는 0.45s 지연되었다. 터무니없이 느리군.',
    '수식 입력 완료. 바닥 파쇄 좌표 오차 범위 0.00001mm.', '구심력 연산이 완벽했어. 리시브 각도를 낼 수 없을 거다.',
    '벡터 가속도 극대화. 물리적으로 막는 게 불가능한 타구다.', '공기 저항 계수를 계산한 핑거 스핀 서브. 받아낼 리가 없지.',
    '터치다운. 서브 한 번에 상대 방어 코드가 붕괴되었군.', '중력과 마찰력 기초 공식도 이해 못 하면서 배구를 하겠다고?',
    '너희 뇌의 처리 속도는 90년대 3G 네트워크보다 느리군요.', '수학 공부부터 다시 하고 오세요.', '시스템 재부팅을 추천합니다.', '운동 법칙부터 다시 공부하고 오세요.', '물리학과 영역의 메커니즘도 모르면서 배구를 하겠다고?'],
  block: ['네 스파이크 각도는 1차 방정식 수준으로 단순하군.', '포텐셜 에너지를 100% 정반사했다.', '방화벽 차단 완료. 거부된 요청(Request Denied)이다.',
    '내 블로킹 좌표는 미적분학으로 정밀 계산되어 있다.', '입사각과 반사각의 법칙. 부드럽게 전달 완료.', '타구 충격량 소진 완료. 완벽한 물리적 댐핑이다.',
    '볼 궤적 파악 완료. 내 시뮬레이션 레이더를 벗어날 순 없다.', '내 물리적 계산 범위를 벗어난 적은 없다.', '내 영역(Domain) 안에서 너희의 참격은 닿지 않는다.'],
  miss: ['치명적인 렌더링 버그인가...? 공기 저항 수치 오차 점검 개시.', 'NullPointer Exception! 내 연산에 예외 변수가 발생하다니...!',
    '하... 순간적인 프레임 드랍이었어. 수식 재설정이 필요하다.', '입자 마찰력 계산 미스... 체육관 습도를 재측정해야겠군.'],
  serve: ['이 궤적의 굴절률을 예측해 봐라.', '네 시야 밖에서 떨어질 무회전 마구다.'],
  win: ['수학적으로 완벽한 승리. 시뮬레이션 오차 0.0001% 이내다.', '너희가 패배한 이유는 실력이 아니라... 변수 통제에 실패했기 때문이다.',
    '너희의 경기 데이터는 모두 내 로그 파일에 보관하지.', '연산 완료. 다음 상대 데이터베이스를 서버에서 불러와라.', '이것이 과학과 데이터가 증명한 절대적 격차다.', '주술이든 과학이든... 데이터 전면 완승이다. 서버 점검이나 끝내지.'],
  lose: ['말도 안 돼... 내 양자 확률 방정식이 붕괴했다고...?!', '양자 불확정성 때문인가...? 이 계산 오차를 인정할 수 없다!',
    '코딩 알고리즘 재작성 요청... 전면 시스템 디버깅을 실행한다!', '시스템 재부팅을 요청한다. 다시 연산하면 내 결과가 맞아!'],
};
// 다른 캐릭터와 붙었을 때 특수 대사 (상대 스킬 이름으로 찾음)
const CM_VS = {
  jmw: { spike: '음파의 데시벨(dB)만 높인다고 타구 파워가 세지진 않습니다, 민욱 씨.', block: '욕설 파동으로 시야를 가려봤자, 내 수식 레이더를 뚫을 순 없죠.', win: '분노는 뇌의 연산 속도를 떨어뜨리는 최악의 악성 코드입니다.' },
  jjh: { start: '상대의 성별에 따라 공의 물리량을 다르게 적용하다니... 비과학적인 매너리즘이군.', block: '감정에 휘둘리는 타구는 가장 읽기 쉬운 2차원 벡터입니다, 지혁 씨.', win: '이중인격 메커니즘도 결국 단 두 개의 커널 패턴에 불과합니다.' },
  gm: { beam: '정수리 반사 광량(Lux) 측정 완료. 편광 안경 착용으로 플래시 무력화.', spike: '역사는 흘러가도... 내 물리 법칙의 정답은 변하지 않습니다.' },
};
function cmjReact(kind, cm, other) {
  const v = CM_VS[CHARACTERS[other.char].skill];
  if (v && v[kind]) say(cm, v[kind]);
}
const BINARY = '01';

function cmSource(c) {
  const P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key;
  if (k === 'bigbang') return { x: c.tx, y: -40 };
  if (k === 'time' || k === 'bsod') return { x: NET_X - s * 20, y: 110 };
  return { x: P.x + s * 26, y: P.y - 40 };
}

function updateCmj() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, t = ++c.t;
  players.forEach((p) => p.anim++);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  if (!c.init) {
    c.init = true; c.parts = [];
    c.oldX = T.x; c.swapX = Math.max(mn, Math.min(mx, mn + mx - T.x)); if (Math.abs(c.swapX - T.x) < 50) c.swapX = T.x - mn > mx - T.x ? mn : mx;
    c.tx = k === 'bigbang' ? (mn + mx) / 2 : Math.max(mn, Math.min(mx, T.x));
    c.ty0 = T.y;
    if (k === 'time' || k === 'bsod') { c.x0 = P.x; } // 네트 앞으로 점프
  }
  // 시전자 부유
  if (t <= 20) { const q = t / 20, e = 1 - (1 - q) * (1 - q); P.y = P_GROUND_Y - e * (k === 'bigbang' ? 110 : 90); if (c.x0 !== undefined) P.x = c.x0 + (NET_X - s * 40 - c.x0) * e; }
  P.state = JUMP; P.vy = 0;
  if (t === 1) { sfx('zap', 0.5); if (k === 'bigbang') { sfx('explode'); shake = 12; } }
  if (t === CM_A) sfx(k === 'time' ? 'bell' : k === 'bsod' ? 'fail' : 'chime');
  if (t === CM_B) sfx(k === 'rootkit' ? 'buzz' : 'chime');
  // 빅뱅: 상대를 특이점으로 끌어올림
  if (k === 'bigbang' && t > CM_B && t < CM_HIT) { const q = Math.min(1, (t - CM_B) / 40); T.x += (c.tx - T.x) * 0.06; T.y = c.ty0 - Math.sin(q * Math.PI / 2) * 70 + Math.sin(t * 0.3) * 2; T.state = JUMP; }
  // 파티클 (플라즈마·데이터 조각)
  if (t > CM_A && t < CM_FIRE && t % 2 === 0) { const b = cmSource(c); c.parts.push({ x: b.x + (Math.random() - 0.5) * 140, y: b.y + (Math.random() - 0.5) * 100, tx: b.x, ty: b.y, t: 26 }); }
  for (const q of c.parts) { q.x += (q.tx - q.x) * 0.12; q.y += (q.ty - q.y) * 0.12; q.t--; }
  c.parts = c.parts.filter((q) => q.t > 0);
  if (t === CM_FIRE - 22) sfx('charge');
  if (t === CM_FIRE - 1) { hitStop = 5; sfx('suck'); }
  const src = cmSource(c);
  if (t < CM_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.3; }
  if (t === CM_FIRE) {
    heavy(src.x, Math.max(0, src.y), 2.6); sfx('flight', 1, 1);
    if (k !== 'bigbang' && k !== 'ai') {
      ball.x = src.x; ball.y = Math.max(12, src.y); P.state = JUMP; P.vy = 0;
      let msg = '', col = `rgb(${c.sk.col})`;
      if (k === 'swap') { T.x = c.swapX; T.freezeT = 38; T.stunned = true; effects.push({ x: c.oldX, y: 240, t: 8 }, { x: c.swapX, y: 240, t: 8 }); releaseBall(Math.max(mn, Math.min(mx, c.oldX)), 10); msg = '양자 위치 교환! 상대 1.5초 스턴'; sfx('zap'); }
      if (k === 'emc2') { releaseBall(Math.max(mn, Math.min(mx, T.x + (Math.random() - 0.5) * 60)), 8); ball.pierce = 60; c.inv = 4; msg = 'E=mc² 오버드라이브! 방어막 관통 초광속탄'; sfx('explode'); }
      if (k === 'rootkit') { T.confuseT = 100; T.confRev = true; T.confNext = 999; T.vflipT = 100; releaseBall(NET_X + s * 48, 22);
        for (const f of [0.6, 1.4, 1.9]) fakes.push({ x: ball.x, y: ball.y, vx: ball.vx * f, vy: ball.vy * (1.3 - f * 0.2), rot: 0, glitch: true });
        msg = 'ERROR 404! 4초 조작 상하좌우 반전 + 공 분신'; sfx('buzz'); }
      if (k === 'time') { T.slowT = 75; T.slowK = 0.15; P.mana = Math.min(manaMax(P) - 1, P.mana + Math.ceil(manaMax(P) / 2)); releaseBall(Math.max(mn, Math.min(mx, T.x + (T.x - mn > mx - T.x ? -60 : 60))), 9); msg = '시간 팽창! 상대 3초 90% 감속 + 내 마나 절반 회복'; sfx('bell'); }
      if (k === 'bsod') { T.silenceT = 250; P.fwT = 125; releaseBall(Math.max(mn, Math.min(mx, NET_X + s * 40)), 9); msg = 'BSOD! 상대 10초 스킬 봉인 + 5초 방화벽'; sfx('fail'); }
      popups.push({ text: msg, x: GW / 2, y: 168, t: 55, color: col });
      cine = null; return;
    }
    if (k === 'ai') { c.path = aiPath(c); c.seg = 0; } // 벽력일섬 8련: 8번 직각 굴절
  }
  if (k === 'ai' && t > CM_FIRE && c.path) {
    const SEG = 3, last = c.path.length - 2, i = Math.min(last, Math.floor((t - CM_FIRE - 1) / SEG)), q = Math.min(1, ((t - CM_FIRE) - i * SEG) / SEG);
    const a = c.path[i], b = c.path[i + 1], px = ball.x, py = ball.y;
    ball.x = a.x + (b.x - a.x) * q; ball.y = a.y + (b.y - a.y) * q; ball.vx = ball.x - px; ball.vy = ball.y - py; ball.rot += 0.5; ball.fx = c.sk.col; pushRibbon(px, py);
    if (q >= 1 && i < last && c.seg !== i + 1) { c.seg = i + 1; shake = Math.max(shake, 6); sfx('zap', 0.5); effects.push({ x: b.x, y: b.y, t: 6 }); impactRings.push({ x: b.x, y: b.y, r: 4, max: 50, w: 2 }); }
    if (q >= 1 && i === last) { // 마지막: 사각지대로 뚝 (진짜 공)
      ball.vx = s * 1.5; ball.vy = 6; ball.flight = null; ball.unblockable = false; ball.power = true; ball.fx = null; ball.ribbon = [];
      heavy(ball.x, ball.y, 1.6); popups.push({ text: '벽력일섬 8련! 직각 8회 굴절 → 사각지대', x: GW / 2, y: 168, t: 55, color: `rgb(${c.sk.col})` });
      P.state = JUMP; P.vy = 0; cine = null; return;
    }
  }
  if (k === 'bigbang') {
    if (t > CM_FIRE && t <= CM_HIT) { const q = (t - CM_FIRE) / (CM_HIT - CM_FIRE); moveHeroBall([src, { x: c.tx, y: BALL_GROUND_Y - 6 }], EASE.heavy(q), 0, '255,215,0'); }
    if (t === CM_HIT) { heavy(c.tx, 262, 4); ball.squashT = 8; ball.fx = null; sfx('explode'); sfx('boom'); T.frozen = true; T.stunned = true; T.y = P_GROUND_Y; T.state = LOSE; c.nova = t; }
    if (t >= CM_END) {
      P.state = JUMP; P.vy = 0; T.state = NORMAL;
      ball.x = c.tx; ball.y = BALL_GROUND_Y - 4; ball.vx = 0; ball.vy = 8; ball.unblockable = true; ball.power = false;
      cine = null;
    }
  }
}

function cmCam(c) {
  const t = c.t, P = c.caster, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME, T = c.target;
  if (!c.init) return H;
  const top = { x: P.x, y: P_GROUND_Y - 90 - 20 }, close = { x: top.x + s * 4, y: top.y + 6, z: 3.4, r: 0 };
  let keys;
  if (k === 'swap') keys = [[0, H], [CM_A, { x: 216, y: 150, z: 1.0 }], [CM_B, { x: 216, y: 140, z: 0.9, r: s * Math.PI * 2 }],             // 탑뷰처럼 전체
    [CM_B + 12, { x: T.x, y: T.y - 20, z: 1.8, r: s * Math.PI * 2 }], [CM_C, { x: (T.x + c.swapX) / 2, y: T.y - 10, z: 1.5, r: s * Math.PI * 2 }], [CM_C + 10, { ...close, r: s * Math.PI * 2 }], [CM_FIRE, { ...close, z: 3.8, r: s * Math.PI * 2 }]];
  else if (k === 'emc2') keys = [[0, H], [CM_A, { x: P.x, y: 250, z: 1.8, r: -s * 0.08 }], [CM_B, { x: P.x + s * 20, y: 120, z: 1.6, r: s * 0.05 }], // 로우 앵글
    [CM_B + 12, { x: P.x + s * 26, y: P.y - 40, z: 2.6 }], [CM_C, { x: P.x + s * 26, y: P.y - 40, z: 2.9 }], [CM_C + 10, close], [CM_FIRE, { ...close, z: 4 }]];
  else if (k === 'rootkit') keys = [[0, H], [CM_A, { x: P.x + s * 10, y: P.y - 20, z: 2.2 }], [CM_B, { x: T.x - s * 30, y: T.y - 30, z: 2.0, r: s * 0.04 }], // POV
    [CM_B + 12, { x: 216, y: 140, z: 1.2 }], [CM_C, { x: 216, y: 140, z: 1.25 }], [CM_C + 10, close], [CM_FIRE, { ...close, z: 3.8 }]];
  else if (k === 'ai') keys = [[0, H], [CM_A, { x: 216, y: 130, z: 0.95 }], [CM_B, { x: (P.x + T.x) / 2, y: 120, z: 1.3, r: s * 0.03 }],
    [CM_B + 12, { x: P.x + s * 30, y: P.y - 30, z: 2.0 }], [CM_C, { x: P.x + s * 30, y: P.y - 30, z: 2.2 }], [CM_C + 10, close], [CM_FIRE, { ...close, z: 3.6 }], [CM_FIRE + 2, H]];
  else if (k === 'time') keys = [[0, H], [CM_A, { x: P.x, y: P.y - 20, z: 1.8, r: 0 }], [CM_B, { x: P.x, y: P.y - 20, z: 1.9, r: s * 0.6 }], // 불릿타임 회전
    [CM_C, { x: P.x, y: P.y - 20, z: 2.1, r: s * 1.2 }], [CM_C + 10, { ...close, r: Math.PI * 2 * 0 }], [CM_FIRE, { ...close, z: 3.6 }]];
  else if (k === 'bsod') keys = [[0, H], [CM_A, { x: NET_X, y: 140, z: 1.3 }], [CM_B, { x: NET_X, y: 120, z: 1.7 }],
    [CM_B + 12, { x: 216, y: 152, z: 1.05 }], [CM_C, { x: 216, y: 152, z: 1.05 }], [CM_C + 10, close], [CM_FIRE, { ...close, z: 3.6 }]];
  else keys = [[0, H], [CM_A, { x: 216, y: 120, z: 0.45 }], [CM_B, { x: 216, y: 90, z: 0.38, r: -0.05 }],   // 은하 줌아웃
    [CM_B + 14, { x: P.x, y: P.y - 30, z: 1.4 }], [CM_C, { x: (P.x + c.tx) / 2, y: 120, z: 1.0 }], [CM_C + 10, { x: P.x, y: P.y - 10, z: 2.6, r: -s * 0.04 }], [CM_FIRE, { x: P.x, y: P.y - 10, z: 2.9 }]];
  keys.push([CM_FIRE + 1, H], [CM_END, H]);
  const cam = camKeys(t, keys);
  if (k === 'bigbang') { cam.space = t < CM_END - 6; return withFollow(c, cam, CM_FIRE, CM_HIT); }
  return cam;
}

// ----- 그리기 -----
function persGrid(col, a, y0 = 200) { // 원근 3D 격자 바닥
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.shadowColor = col; ctx.shadowBlur = 6;
  for (let k = 0; k <= 9; k++) { const y = y0 + (k * k) * 1.1; ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(640, y); ctx.stroke(); }
  for (let k = -12; k <= 12; k++) { ctx.beginPath(); ctx.moveTo(216 + k * 18, y0); ctx.lineTo(216 + k * 60, y0 + 100); ctx.stroke(); }
  ctx.restore();
}
function holoKeyboard(x, y, t, col) {
  ctx.save(); ctx.translate(x, y); ctx.transform(1, 0, -0.4, 0.5, 0, 0); ctx.globalAlpha = 0.85;
  ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.shadowColor = col; ctx.shadowBlur = 8; ctx.strokeRect(-40, -14, 80, 28);
  for (let r = 0; r < 3; r++) for (let q = 0; q < 10; q++) { const lit = (Math.floor(t * 3) + r * 7 + q * 3) % 11 === 0; ctx.fillStyle = lit ? '#ffffff' : 'rgba(255,255,255,.15)'; ctx.fillRect(-37 + q * 7.6, -11 + r * 8.5, 6, 6.5); }
  ctx.restore();
}
function terminal(x, y, w, lines, t, col = '#3cff8a') {
  ctx.save(); ctx.fillStyle = 'rgba(0,12,6,.86)'; ctx.fillRect(x, y, w, 14 + lines.length * 11); ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, 14 + lines.length * 11);
  ctx.fillStyle = col; ctx.fillRect(x, y, w, 9); ctx.font = 'bold 7px monospace'; ctx.fillStyle = '#001a0a'; ctx.textAlign = 'left'; ctx.fillText('root@cmj-kernel: ~', x + 4, y + 7);
  ctx.font = '8px monospace'; ctx.fillStyle = col;
  lines.forEach((l, i) => { const n = Math.max(0, Math.min(l.length, Math.floor(t * 1.5) - i * 12)); ctx.fillText(l.slice(0, n) + (n < l.length && n > 0 && Math.floor(t / 4) % 2 ? '█' : ''), x + 5, y + 20 + i * 11); });
  ctx.restore();
}
function blackHole(x, y, r, t, a) {
  ctx.save(); ctx.globalAlpha = a;
  ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.28); ctx.rotate(t * 0.05);
  for (let i = 0; i < 5; i++) { const g = ctx.createRadialGradient(0, 0, r * 0.9, 0, 0, r * (2.6 - i * 0.2)); g.addColorStop(0, 'rgba(255,240,160,.95)'); g.addColorStop(0.4, 'rgba(255,170,40,.6)'); g.addColorStop(1, 'rgba(255,80,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * (2.6 - i * 0.2), 0, 7); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = '#000'; ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,230,150,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r * 1.08, 0, 7); ctx.stroke();
  ctx.restore();
}

// ----- 차명준 v2.0 초월 연출 도구 -----
function inkSlash(x0, y0, x1, y1, w, col, prog = 1, seed = 0) { // 수묵화 먹선 참격 (굵기 변하는 붓 획 + 튀는 먹방울)
  const pts = []; for (let i = 0; i <= 14; i++) { const q = i / 14; pts.push({ x: x0 + (x1 - x0) * q + Math.sin(seed + q * 9) * 3, y: y0 + (y1 - y0) * q + Math.cos(seed + q * 7) * 3 }); }
  brushStroke(pts, w, col, prog);
  if (prog >= 1) for (let i = 0; i < 6; i++) { const q = (Math.sin(seed * 3 + i * 2.3) + 1) / 2; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x0 + (x1 - x0) * q + Math.sin(i * 5 + seed) * 10, y0 + (y1 - y0) * q + Math.cos(i * 4 + seed) * 10, 1 + (i % 3), 0, 7); ctx.fill(); }
}
function blackFlash(x0, y0, x1, y1, t, f = 1) { // 흑선: 검은 본체 + 핏빛 테두리 번개
  const seed = Math.floor(t / 2) * 1.7;
  ctx.save(); ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 22 * f;
  const main = boltPath(x0, y0, x1, y1, 26, seed);
  strokeBolt(main, 13 * f + 2, 'rgba(255,0,51,.85)'); strokeBolt(main, 6 * f + 1, '#120006');
  for (let b = 0; b < 4; b++) { const [bx, by] = main[2 + b * 2]; strokeBolt(boltPath(bx, by, bx + Math.sin(seed + b) * 50, by + Math.cos(seed * 2 + b) * 40, 12, seed + b), 2.5 * f, 'rgba(255,40,60,.9)'); }
  ctx.restore();
}
function fireDragon(cx, cy, scale, t, a) { // 화염 흑룡: 몸통(원 이어붙임) + 머리 + 수염 불꽃
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter';
  const N = 46, body = [];
  for (let i = 0; i < N; i++) { const q = i / N, an = q * Math.PI * 3.2 + t * 0.06; body.push({ x: cx + Math.cos(an) * (60 + q * 120) * scale, y: cy + Math.sin(an * 1.3) * (40 + q * 60) * scale - q * 20, r: (26 - q * 20) * scale }); }
  for (let i = N - 1; i >= 0; i--) { const b = body[i], g = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r * 1.6); g.addColorStop(0, 'rgba(255,240,180,.9)'); g.addColorStop(0.45, 'rgba(255,90,10,.75)'); g.addColorStop(1, 'rgba(120,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 1.6, 0, 7); ctx.fill(); }
  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < N; i += 3) { const b = body[i]; ctx.fillStyle = 'rgba(20,4,0,.55)'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.45, 0, 7); ctx.fill(); } // 흑룡 비늘(검은 심)
  const h = body[0], h2 = body[2], ang = Math.atan2(h.y - h2.y, h.x - h2.x);
  ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(ang); ctx.scale(scale, scale);
  ctx.fillStyle = '#1a0500'; ctx.beginPath(); ctx.moveTo(-10, -20); ctx.lineTo(46, -8 + Math.sin(t * 0.5) * 4); ctx.lineTo(30, 0); ctx.lineTo(46, 10 - Math.sin(t * 0.5) * 4); ctx.lineTo(-10, 20); ctx.closePath(); ctx.fill(); // 벌린 턱
  ctx.strokeStyle = '#ff7a1a'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#ffee88'; ctx.shadowColor = '#ff4500'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.ellipse(12, -8, 6, 3, 0.2, 0, 7); ctx.fill(); // 눈
  ctx.strokeStyle = 'rgba(255,140,40,.9)'; ctx.lineWidth = 2; for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(4, sg * 14); ctx.quadraticCurveTo(-30, sg * (40 + Math.sin(t * 0.3) * 10), -70, sg * 30); ctx.stroke(); } // 수염
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-6, -18); ctx.lineTo(-30 - i * 10, -46 - i * 6); ctx.stroke(); } // 뿔
  ctx.restore(); ctx.restore();
}
function shrineGate(x, base, h, a, t) { // 복마 귀신문 (네온 파랑 디지털 도리이)
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#3c78ff'; ctx.shadowColor = '#0044ff'; ctx.shadowBlur = 18; ctx.lineWidth = 3;
  const w = 120, top = base - h;
  ctx.fillStyle = 'rgba(0,40,140,.28)';
  for (const sx of [-1, 1]) { ctx.fillRect(x + sx * w / 2 - 7, top + 26, 14, h - 26); ctx.strokeRect(x + sx * w / 2 - 7, top + 26, 14, h - 26); }
  ctx.beginPath(); ctx.moveTo(x - w / 2 - 34, top + 8); ctx.quadraticCurveTo(x, top - 14, x + w / 2 + 34, top + 8); ctx.lineTo(x + w / 2 + 30, top + 18); ctx.quadraticCurveTo(x, top - 2, x - w / 2 - 30, top + 18); ctx.closePath(); ctx.fill(); ctx.stroke(); // 갓기와
  ctx.fillRect(x - w / 2 - 16, top + 36, w + 32, 9); ctx.strokeRect(x - w / 2 - 16, top + 36, w + 32, 9); // 가로대
  ctx.fillStyle = 'rgba(0,10,40,.9)'; ctx.fillRect(x - 16, top + 12, 32, 30); ctx.strokeRect(x - 16, top + 12, 32, 30);
  brushText('伏', x, top + 26, 13, '#bcd2ff'); brushText('魔', x, top + 40, 13, '#bcd2ff');
  ctx.font = 'bold 6px monospace'; ctx.fillStyle = 'rgba(160,200,255,.7)'; ctx.textAlign = 'center'; // 기둥 데이터
  for (const sx of [-1, 1]) for (let y = top + 50; y < base; y += 8) ctx.fillText(((y * 7 + t) % 256).toString(16).padStart(2, '0'), x + sx * w / 2, y);
  ctx.restore();
}
function chromaShift(px) { // 크로마틱 애버레이션: 화면을 빨강/청록으로 어긋나게 겹침
  ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.55;
  ctx.drawImage(cv, 0, 0, cv.width, cv.height, -px, 0, GW, GH); ctx.fillStyle = 'rgba(255,0,0,.25)'; ctx.fillRect(0, 0, GW, GH);
  ctx.drawImage(cv, 0, 0, cv.width, cv.height, px, 0, GW, GH); ctx.restore();
}
function galaxyEye(x, y, r, t, a) { // 은하가 비친 거대한 눈동자
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(230,240,255,.85)'; ctx.beginPath(); ctx.ellipse(x, y, r * 1.9, r * 0.9, 0, 0, 7); ctx.fill();
  const g = ctx.createRadialGradient(x, y, 2, x, y, r); g.addColorStop(0, '#000'); g.addColorStop(0.25, '#1a0a50'); g.addColorStop(0.6, '#3a7dff'); g.addColorStop(1, '#a8e6ff');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.03); for (let i = 0; i < 60; i++) { const an = i * 0.5, rr = (i / 60) * r * 0.9; ctx.fillStyle = `rgba(255,255,255,${0.8 - i / 80})`; ctx.fillRect(Math.cos(an) * rr, Math.sin(an) * rr, 1.5, 1.5); } ctx.restore(); // 은하 소용돌이
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.15, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(20,20,40,.9)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, r * 1.9, r * 0.9, 0, 0, 7); ctx.stroke();
  ctx.restore();
}

function drawCmjWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  const k = t > CM_END - 8 ? (CM_END - t) / 8 : Math.min(1, t / 8), a1 = Math.min(1, Math.max(0, (t - 6) / 18));
  const src = cmSource(c);
  if (key === 'swap') { // 흑선 좌표 교환: 초거대 네온 격자 + 흑선 번개 + 먹선 참격
    ctx.fillStyle = `rgba(0,4,2,${0.95 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    persGrid('#00ff66', a1 * 0.9, 150); persGrid('#00ff66', a1 * 0.35, 60);
    if (t >= CM_A) {
      const ghostX = c.swapX, lk = Math.min(1, (t - CM_A) / 10);
      for (const [x, lab] of [[T.x, 'Ψ(x,t)'], [ghostX, 'Ψ(x′,t)']]) {
        ctx.save(); ctx.translate(x, T.y - 10); ctx.rotate(t * 0.08); ctx.strokeStyle = `rgba(255,0,40,${lk})`; ctx.lineWidth = 3; ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(0, 0, 40, 0, 5.6); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 28, 1, 6); ctx.stroke();
        for (let i = 0; i < 4; i++) { ctx.rotate(1.57); ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(52, 0); ctx.stroke(); } ctx.restore();
        ctx.save(); ctx.globalAlpha = lk; ctx.font = 'italic bold 30px "Cambria Math", serif'; ctx.fillStyle = '#7dfcff'; ctx.textAlign = 'center'; ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 14; ctx.fillText(lab, x, T.y - 70 + Math.sin(t * 0.1) * 3); ctx.restore();
      }
      ctx.save(); ctx.globalAlpha = 0.4 + Math.sin(t * 0.4) * 0.15; ctx.translate(ghostX - T.x, 0); drawPlayer(T); ctx.restore();
      if (t >= CM_B) { // 흑선 뇌전 + 먹선 참격이 공간을 벰
        blackFlash(T.x, T.y - 20, ghostX, T.y - 20, t, 1);
        for (let i = 0; i < 3; i++) { const st = CM_B + 6 + i * 9, pr = Math.min(1, (t - st) / 5); if (pr > 0) inkSlash(T.x - 80 + i * 40, 60 + i * 30, ghostX + 80 - i * 30, 240 - i * 20, 5, 'rgba(10,0,4,.85)', pr, i * 3); }
      }
    }
    if (t >= CM_A) holoKeyboard(P.x + s * 14, P.y + 8, t * 2, '#00ff66');
  }
  if (key === 'emc2') { // 히노카미 멸살: 화면을 삼키는 화염 흑룡
    const g = ctx.createLinearGradient(0, -100, 0, 300); g.addColorStop(0, `rgba(20,2,0,${0.95 * k})`); g.addColorStop(1, `rgba(110,24,0,${0.92 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= CM_A) {
      const pk = Math.min(1, (t - CM_A) / 30);
      fireDragon(src.x, src.y, 0.6 + pk * 0.9, t, pk);
      for (let i = 0; i < 18; i++) { const fx = src.x + Math.sin(i * 2.7 + t * 0.05) * 140, fy = src.y + 80 - ((t * 2 + i * 23) % 200); inkSlash(fx, fy, fx + 6, fy - 16, 2.5, `rgba(255,${90 + (i % 3) * 40},20,.8)`, 1, i); } // 수묵 불꽃
      const cg = ctx.createRadialGradient(src.x, src.y, 2, src.x, src.y, 50 * pk); cg.addColorStop(0, 'rgba(255,255,230,1)'); cg.addColorStop(1, 'rgba(255,69,0,0)'); ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(src.x, src.y, 50 * pk, 0, 7); ctx.fill();
      for (let i = 0; i < 6; i++) { ctx.strokeStyle = `rgba(255,200,120,${0.14 * pk})`; ctx.lineWidth = 2; ctx.beginPath(); for (let x = -40; x < 480; x += 12) ctx.lineTo(x, 50 + i * 34 + Math.sin(x * 0.05 + t * 0.3 + i) * 5); ctx.stroke(); } // 아지랑이
      floorText('E = mc²', P.x + s * 60, 278, 46, '#ffb000', a1);
    }
  }
  if (key === 'rootkit') { // 무량공처 404 차원참
    ctx.fillStyle = `rgba(0,0,0,${0.96 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
    for (let col = 0; col < 44; col++) { const x = -30 + col * 11, sp = 4 + (col * 7) % 6; for (let r = 0; r < 16; r++) { const y = ((t * sp + col * 37 + r * 12) % 360) - 30; ctx.fillStyle = r === 0 ? `rgba(220,255,220,${a1})` : `rgba(0,255,0,${(1 - r / 16) * 0.85 * a1})`; ctx.fillText(BINARY[(col + r + Math.floor(t / 3)) % 2], x, y); } }
    if (t >= CM_A && t < CM_B + 10) terminal(P.x + s * 30 - (s < 0 ? 170 : 0), 40, 170, ['$ sudo su', '# inject --infinite /dev/brain', '# sudo rm -rf /receiver/vision', '> 無量空處: OVERLOAD'], t - CM_A, '#00ff00');
  }
  if (key === 'ai') { // 벽력일섬 8련: 황금 CAD + 번개 띠
    ctx.fillStyle = `rgba(4,6,14,${0.92 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    persGrid('#ffd700', a1 * 0.55, 210);
    ctx.save(); ctx.globalAlpha = a1 * 0.25; ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 0.5; for (let x = 0; x <= GW; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 280); ctx.stroke(); } for (let y = 0; y <= 280; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(GW, y); ctx.stroke(); } ctx.restore();
    if (t >= CM_A && t < CM_FIRE) for (let i = 0; i < 30; i++) { const ang = -1 + i * 0.07, len = 120 + (i * 37) % 160; ctx.strokeStyle = `rgba(255,215,0,${0.15 + ((i + Math.floor(t / 2)) % 6 === 0 ? 0.55 : 0)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(src.x, src.y); ctx.lineTo(src.x + s * Math.cos(ang) * len * 1.6, src.y + Math.sin(ang) * len); ctx.stroke(); }
    const path = c.path || aiPath(c);
    if (t >= CM_B) { // 성공률 100% 번개 띠 8개
      const shown = Math.min(path.length - 1, Math.floor((t - CM_B) / 4) + 1);
      for (let i = 0; i < shown; i++) { const a = path[i], b = path[i + 1]; ctx.save(); ctx.shadowColor = '#ffff00'; ctx.shadowBlur = 14; strokeBolt(boltPath(a.x, a.y, b.x, b.y, 5, i * 3 + Math.floor(t / 3)), 3, 'rgba(255,240,80,.9)'); strokeBolt(boltPath(a.x, a.y, b.x, b.y, 2, i), 1, '#fff'); ctx.restore(); if (i > 0) text('90°', a.x + 10, a.y - 6, 7, '#ffe066'); }
      text('P(receive) = 0.000%', path[path.length - 1].x, 238, 9, '#ffd000');
    }
    if (t >= CM_A) for (let i = 0; i < 8; i++) { const an = Math.random() * 6.28, r = 16 + Math.random() * 26; ctx.strokeStyle = 'rgba(255,255,0,.85)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(P.x + Math.cos(an) * r, P.y - 10 + Math.sin(an) * r); ctx.lineTo(P.x + Math.cos(an + 0.3) * (r + 8), P.y - 10 + Math.sin(an + 0.3) * (r + 8)); ctx.stroke(); } // 몸의 뇌전 스파크
  }
  if (key === 'time') { // 수경 잔월: 흑백 수묵 호수
    ctx.fillStyle = `rgba(232,232,226,${0.9 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    ctx.save(); ctx.globalAlpha = 0.5 * a1; for (let i = 0; i < 5; i++) inkBlot(60 + i * 90, 40 + (i % 2) * 30, 30 + i * 4, 0.12, i); ctx.restore(); // 먼 산 먹번짐
    for (let i = 0; i < 7; i++) { const r = ((t * 1.6 + i * 34) % 240); ctx.strokeStyle = `rgba(20,20,20,${Math.max(0, 0.5 - r / 480) * a1})`; ctx.lineWidth = 2.2 - r / 200; ctx.beginPath(); ctx.ellipse(P.x, 274, r * 1.3, r * 0.28, 0, 0, 7); ctx.stroke(); } // 잔물결 수경
    if (t >= CM_B) { // 수묵 달 + 시계
      ctx.save(); ctx.globalAlpha = 0.85 * Math.min(1, (t - CM_B) / 10); ctx.fillStyle = '#fdfdf6'; ctx.strokeStyle = '#222'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(NET_X, 80, 42, 0, 7); ctx.fill(); ctx.stroke();
      ctx.translate(NET_X, 80); for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(34, 0); ctx.lineTo(40, 0); ctx.stroke(); } ctx.rotate(-(t - CM_B) * 0.004); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -30); ctx.stroke(); ctx.restore();
      brushText('靜', NET_X - 70, 120, 26, '#111'); brushText('月', NET_X + 70, 120, 26, '#111');
      neon('Δt′ = Δt / √(1 − 2GM/rc²)', NET_X, 186, 9, '#0090a0');
    }
    // 시전자만 컬러: 시안 펄 물결 오라
    const og = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 70); og.addColorStop(0, 'rgba(0,229,255,.6)'); og.addColorStop(1, 'rgba(0,229,255,0)'); ctx.fillStyle = og; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 70, 0, 7); ctx.fill();
    for (let i = 0; i < 3; i++) { ctx.strokeStyle = `rgba(0,229,255,${0.7 - i * 0.2})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 30 + i * 12 + Math.sin(t * 0.2 + i) * 3, 0, 7); ctx.stroke(); }
  }
  if (key === 'bsod') { // 복마어주자: 15m 귀신문 방화벽
    ctx.fillStyle = `rgba(0,0,30,${0.7 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= CM_A) shrineGate(NET_X, 278, Math.min(1, (t - CM_A) / 14) * 250, 1, t);
    if (t >= CM_C) for (let i = 0; i < 6; i++) { const pr = Math.min(1, (t - CM_C - i * 3) / 4); if (pr > 0) inkSlash(T.x - 60 + i * 14, T.y - 70 + (i % 2) * 20, T.x + 60 - i * 10, T.y + 20 - (i % 3) * 10, 3, 'rgba(160,200,255,.9)', pr, i); } // 참격
  }
  if (key === 'bigbang') {
    if (t < 10) { ctx.fillStyle = `rgba(255,255,255,${1 - t / 10})`; ctx.fillRect(-600, -600, 1650, 1500); }
    { const sa = Math.min(1, t / 14) * (t > CM_END - 10 ? (CM_END - t) / 10 : 1); ctx.fillStyle = `rgba(7,2,26,${0.97 * sa})`; ctx.fillRect(-900, -900, 2300, 2100);
      for (const st of STARS) { ctx.fillStyle = `rgba(255,240,220,${(0.4 + st.r / 2) * sa})`; ctx.fillRect(st.x, st.y, st.r * 2, st.r * 2); } }
    if (t < CM_A + 14) for (let i = 0; i < 26; i++) { const q = t / (CM_A + 14), x = (i * 61) % 432 + Math.cos(i) * q * 260, y = (i * 47) % 260 - q * 180 + Math.sin(i) * q * 90; ctx.fillStyle = `rgba(160,210,255,${0.7 * (1 - q)})`; ctx.strokeStyle = `rgba(255,255,255,${0.8 * (1 - q)})`; ctx.save(); ctx.translate(x, y); ctx.rotate(i + q * 5); ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(18, 12); ctx.lineTo(-12, 14); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } // 유리처럼 깨지는 체육관
    const neb = ctx.createRadialGradient(216, 80, 20, 216, 80, 420); neb.addColorStop(0, `rgba(160,40,200,${0.55 * a1})`); neb.addColorStop(0.5, `rgba(60,20,140,${0.3 * a1})`); neb.addColorStop(1, 'rgba(20,0,40,0)'); ctx.fillStyle = neb; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= CM_A) { const bx = P.x - s * 70, by = P.y - 90, ba = Math.min(1, (t - CM_A) / 12) * (t > CM_HIT ? Math.max(0, 1 - (t - CM_HIT) / 10) : 1);
      blackHole(bx, by, 26 + Math.min(1, (t - CM_A) / 30) * 22, t, ba);
      for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = ba * 0.8; ctx.translate(bx, by); ctx.rotate(t * 0.08 + i * 2.1); ctx.strokeStyle = 'rgba(255,0,51,.8)'; ctx.lineWidth = 2; ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(0, 0, 70 + i * 16, 0, 1.6); ctx.stroke(); ctx.restore(); } // 검붉은 흑선 파동
      if (t >= CM_B && t < CM_HIT) for (let i = 0; i < 20; i++) { const q = ((t * 0.03 + i * 0.05) % 1), an = i * 0.9 + t * 0.02; ctx.fillStyle = `rgba(255,220,150,${q})`; ctx.fillRect(bx + Math.cos(an) * 200 * (1 - q), by + Math.sin(an) * 140 * (1 - q), 2, 2); } } // 빨려드는 물질
    if (t >= CM_B && t < CM_FIRE) { const b = src, qg = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 60); qg.addColorStop(0, 'rgba(255,255,255,1)'); qg.addColorStop(0.3, 'rgba(255,215,0,.75)'); qg.addColorStop(1, 'rgba(255,100,0,0)'); ctx.fillStyle = qg; ctx.beginPath(); ctx.arc(b.x, b.y, 60, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,240,200,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(b.x, b.y - 140); ctx.lineTo(b.x, b.y + 140); ctx.stroke(); }
    if (c.nova) { const q = Math.min(1, (t - c.nova) / 16); for (let i = 0; i < 4; i++) { ctx.strokeStyle = `rgba(255,${220 - i * 50},${120 - i * 30},${1 - q})`; ctx.lineWidth = 9 - i * 2; ctx.beginPath(); ctx.ellipse(c.tx, 262, 30 + q * (300 + i * 60), 10 + q * (70 + i * 14), 0, 0, 7); ctx.stroke(); }
      const ng = ctx.createRadialGradient(c.tx, 250, 4, c.tx, 250, 200 * q + 20); ng.addColorStop(0, `rgba(255,255,255,${1 - q})`); ng.addColorStop(1, 'rgba(255,200,80,0)'); ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(c.tx, 250, 200 * q + 20, 0, 7); ctx.fill();
      floorText('SUPERNOVA', c.tx, 270, 34 * Math.max(1, 2 - (t - c.nova) * 0.2), '#ffd700'); }
  }
  for (const q of c.parts) { ctx.fillStyle = `rgba(${sk.col},${q.t / 26})`; ctx.fillRect(q.x, q.y, 2, 2); }
  if (t > CM_FIRE - 22 && t < CM_FIRE) chargeFX(src.x, Math.max(10, src.y), (t - (CM_FIRE - 22)) / 22, sk.col);
  const g = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 62); g.addColorStop(0, `rgba(${sk.col},.6)`); g.addColorStop(1, `rgba(${sk.col},0)`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 62, 0, 7); ctx.fill();
  drawPlayer(P);
  if (key === 'bsod' && t >= CM_C) { ctx.save(); ctx.globalAlpha = 0.85; ctx.filter = 'grayscale(1) brightness(1.4)'; drawPlayer(T); ctx.filter = 'none'; ctx.restore();
    ctx.strokeStyle = '#3c78ff'; ctx.lineWidth = 1; ctx.strokeRect(T.x - 22, T.y - 40, 44, 72); ctx.beginPath(); ctx.moveTo(T.x - 22, T.y - 40); ctx.lineTo(T.x + 22, T.y + 32); ctx.moveTo(T.x + 22, T.y - 40); ctx.lineTo(T.x - 22, T.y + 32); ctx.stroke(); }
  else if (key === 'time' && t >= CM_A && t < CM_FIRE) { ctx.save(); ctx.filter = 'grayscale(1) contrast(1.3)'; drawPlayer(T); ctx.filter = 'none'; ctx.restore(); }
  else drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  if (t >= CM_B || key === 'emc2') drawBall();
}
// 벽력일섬 8련 경로: 가로·세로 번갈아 8번 직각으로 꺾이며 사각지대로
function aiPath(c) {
  const P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, src = cmSource(c);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388], blind = T.x - mn > mx - T.x ? mn + 6 : mx - 6;
  const pts = [{ x: src.x, y: src.y }], xs = [0.25, 0.5, 0.75, 1].map((q) => src.x + (blind - src.x) * q), ys = [50, 140, 60, 214];
  xs.forEach((x, i) => { pts.push({ x, y: pts[pts.length - 1].y }); pts.push({ x, y: ys[i] }); });
  return pts;
}

function drawCmjUI(c) {
  const t = c.t, sk = c.sk, key = sk.key;
  if (!c.init) return;
  const k = t > CM_END - 8 ? (CM_END - t) / 8 : Math.min(1, t / 8);
  if (key === 'swap' && t >= CM_FIRE - 2 && t < CM_FIRE + 4) { chromaShift(6); glitch(20); }
  if (key === 'swap' && t >= CM_B && t < CM_FIRE && t % 7 < 2) chromaShift(3);
  if (key === 'emc2' && t >= CM_A && t < CM_FIRE) { // 화면 가장자리 불길 + SOLAR FLARE 경고
    const e = Math.min(1, (t - CM_A) / 20); vignette('255,69,0', 0.75 * e);
    for (let i = 0; i < 30; i++) { const x = (i * 29) % GW, hh = 20 + (Math.sin(t * 0.4 + i) + 1) * 14; const g = ctx.createLinearGradient(0, GH, 0, GH - hh); g.addColorStop(0, `rgba(255,90,0,${0.8 * e})`); g.addColorStop(1, 'rgba(255,200,60,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 10, GH); ctx.quadraticCurveTo(x, GH - hh * 1.4, x + 10, GH); ctx.fill(); }
    if (Math.floor(t / 4) % 2 === 0) { ctx.fillStyle = 'rgba(80,40,0,.85)'; ctx.fillRect(GW / 2 - 170, 58, 340, 30); ctx.strokeStyle = '#ffd000'; ctx.lineWidth = 2; ctx.strokeRect(GW / 2 - 170, 58, 340, 30); neon('MASS AMPLIFICATION: E=mc² SOLAR FLARE', GW / 2, 79, 13, '#ffd000'); }
  }
  if (key === 'emc2' && t >= CM_FIRE - 1 && t < CM_FIRE + 8) { invertFlash(); desaturate(1); }
  if (key === 'rootkit' && t >= CM_B && t < CM_FIRE) { // 무량공처: 은하 눈동자 + 네온 핑크 차원 참격
    const q = Math.min(1, (t - CM_B) / 12);
    ctx.fillStyle = `rgba(8,0,30,${0.55 * q})`; ctx.fillRect(0, 0, GW, GH);
    galaxyEye(GW / 2, GH / 2 - 10, 46 * q + 10, t, 0.85 * q);
    ctx.save(); ctx.shadowColor = '#ff007f'; ctx.shadowBlur = 16; ctx.strokeStyle = '#ff2a9a'; ctx.lineWidth = 3;
    const cuts = [[0, 60, GW, 90], [0, 220, GW, 180], [80, 0, 140, GH], [GW - 60, 0, GW - 140, GH], [0, 0, GW, GH], [GW, 0, 0, GH]];
    cuts.forEach(([x0, y0, x1, y1], i) => { const pr = Math.min(1, Math.max(0, (t - CM_B - 8 - i * 4) / 4)); if (pr > 0) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0) * pr, y0 + (y1 - y0) * pr); ctx.stroke(); } });
    ctx.restore();
    if (t % 5 < 2) glitch(14); scanlines(0.25);
  }
  if (key === 'rootkit' && t >= CM_C + 6 && t < CM_FIRE + 6) { ctx.fillStyle = 'rgba(40,0,10,.92)'; ctx.fillRect(GW / 2 - 140, 100, 280, 46); ctx.strokeStyle = '#ff0040'; ctx.lineWidth = 3; ctx.strokeRect(GW / 2 - 140, 100, 280, 46); neon('⚠ ERROR 404: BRAIN SYSTEM CRASH', GW / 2, 129, 15, '#ff5a8a'); }
  if (key === 'ai' && t >= CM_A && t < CM_FIRE) { ctx.fillStyle = 'rgba(255,215,0,.05)'; ctx.fillRect(0, 0, GW, GH); if (t % 9 === 0) { ctx.fillStyle = 'rgba(255,255,180,.35)'; ctx.fillRect(0, 0, GW, GH); } }
  if (key === 'time' && t >= CM_A && t < CM_FIRE) { text('0.01×', GW - 40, 70, 16, '#007a8a'); }
  if (key === 'time' && t >= CM_FIRE - 2 && t < CM_FIRE + 6) { ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(GW / 2, GH / 2); ctx.lineTo(GW / 2 + Math.cos(i * 0.8) * 400, GH / 2 + Math.sin(i * 0.8) * 400); ctx.stroke(); } } // 수경이 깨짐
  if (key === 'bsod' && t >= CM_B + 10 && t < CM_C + 8) { // 블루스크린 + 참격으로 쪼개짐
    ctx.fillStyle = '#0000aa'; ctx.fillRect(0, 0, GW, GH); ctx.textAlign = 'left'; ctx.font = 'bold 30px sans-serif'; ctx.fillStyle = '#fff'; ctx.fillText(':(', 30, 70);
    ctx.font = '10px monospace'; ['A fatal exception 伏魔 has occurred at 0028:C0011E36.', 'The current skill kernel will be terminated.', '', '*  OPPONENT_SKILL_EXECUTION = DISABLED', '*  STOP: 0x0000007B (MALEVOLENT_SHRINE)'].forEach((l, i) => ctx.fillText(l, 30, 100 + i * 14));
    ctx.font = '8px monospace'; ctx.fillStyle = 'rgba(255,255,255,.55)'; for (let i = 0; i < 6; i++) { let h = ''; for (let j = 0; j < 16; j++) h += ((i * 31 + j * 17 + t) % 256).toString(16).padStart(2, '0') + ' '; ctx.fillText(h, 30, 190 + i * 11); }
    brushText('伏魔', GW - 70, 150, 40, 'rgba(255,255,255,.85)');
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.shadowColor = '#9cc4ff'; ctx.shadowBlur = 10;
    for (let i = 0; i < 7; i++) { const pr = Math.min(1, Math.max(0, (t - CM_B - 14 - i * 3) / 3)); if (pr > 0) { const y0 = 20 + i * 40, y1 = y0 + 60 - (i % 2) * 120; ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(GW * pr, y0 + (y1 - y0) * pr); ctx.stroke(); } }
    ctx.shadowBlur = 0;
  }
  if (key === 'bigbang') {
    cinemaBars(22 * Math.min(1, t / 10) * Math.max(0, k), '#000', '#ffd700');
    if (t >= 4 && t < CM_A + 6) { // 영역 전개 타이틀 카드 + 결인
      const q = Math.min(1, (t - 4) / 6), fo = t > CM_A ? 1 - (t - CM_A) / 6 : 1;
      ctx.save(); ctx.globalAlpha = q * fo; ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, GH / 2 - 44, GW, 88);
      brushText('領域展開', GW / 2, GH / 2 + 14, 40 + (1 - q) * 30, '#ffffff'); text('DOMAIN EXPANSION', GW / 2, GH / 2 + 34, 9, '#ffd700');
      ctx.translate(GW / 2 - 150, GH / 2); ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-6, 20); ctx.lineTo(-2, -24); ctx.moveTo(6, 20); ctx.lineTo(0, -24); ctx.moveTo(-10, 4); ctx.lineTo(10, 4); ctx.stroke(); // 꼰 손가락 결인
      ctx.restore();
    }
    if (c.nova && t < c.nova + 4) { ctx.fillStyle = `rgba(255,255,255,${0.9 - (t - c.nova) * 0.22})`; ctx.fillRect(0, 0, GW, GH); }
  }
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  const ty = key === 'bigbang' ? 40 : 22, dark = key === 'time';
  text(sk.title, GW / 2, ty, 12, dark ? '#004a55' : `rgb(${sk.col})`); text(sk.en, GW / 2, ty + 12, 8, dark ? '#222' : '#ffffff');
  text('ULTRA LEGEND', GW / 2, ty + 24, 7, dark ? '#007a6a' : '#7dffe8');
  if (t >= CM_C - 4 && t < CM_FIRE + 20) sk.lines.forEach((ln, i) => {
    const st = CM_C - 4 + i * 12, n = Math.max(0, Math.min(ln.length, Math.floor((t - st) * 1.6))); if (n <= 0) return;
    const y = (key === 'bigbang' ? 246 : 262) + i * 17; ctx.font = `bold ${i ? 10 : 11}px "Malgun Gothic", sans-serif`;
    const w = ctx.measureText(ln).width + 16; ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(GW / 2 - w / 2, y - 12, w, 16);
    text(ln.slice(0, n), GW / 2, y, i ? 10 : 11, i ? '#ffffff' : `rgb(${sk.col})`);
  });
  ctx.restore();
}

// 방화벽 (BSOD 후 5초): 우리 코트로 넘어오는 공을 전부 상대 코트로 내리꽂음 → jjhBlockCheck에서 같이 처리
function drawFirewall(p) {
  const s = p.side === 0 ? 1 : -1, x = NET_X - 9, a = Math.min(1, p.fwT / 15);
  ctx.save(); ctx.globalAlpha = a;
  const g = ctx.createLinearGradient(x, 0, x + 18, 0); g.addColorStop(0, 'rgba(60,120,255,.1)'); g.addColorStop(0.5, 'rgba(140,190,255,.5)'); g.addColorStop(1, 'rgba(60,120,255,.1)');
  ctx.fillStyle = g; ctx.fillRect(x, 0, 18, 276);
  ctx.strokeStyle = 'rgba(170,210,255,.7)'; ctx.lineWidth = 1; for (let y = 276 - ((p.anim * 2) % 10); y > 0; y -= 10) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 18, y); ctx.stroke(); }
  text('FIREWALL', x + 9, 40, 7, '#dfe9ff');
  ctx.restore();
}

// ===== 김예안 (LEGENDARY): 기숙사 생존 광기 — 6초 시네마틱 3종 =====
const YA_A = 25, YA_B = 62, YA_C = 100, YA_FIRE = 125, YA_HIT = 150, YA_END = 172;
const YA_SKILLS = [
  { key: 'rage', title: '자치고 멸망: 야식 라면 & 찰진 욕설 폭격', en: 'Targeted Rage BEEP-Smash', col: '255,50,40',
    lines: ['"밤마다 라면 처먹고 뒷담이나 까는 위선자 개★야!"', '"공이나 처맞아라!!" (BEEP-!)'] },
  { key: 'evict', title: '자유의 의지: 벌점 25점 퇴사 통지서 스파이크', en: '25-Point Dorm Eviction Spike', col: '230,20,60',
    lines: ['"벌점 25점 채웠다!!"', '"나 오늘부로 동성고 기숙사 퇴사다 이 빡통들아!!"'] },
  { key: 'scream', title: '광란의 포효: 160dB 순수 샤우팅', en: '160dB Pure Acoustic Scream Drop', col: '255,230,60',
    lines: ['"으아아아아아아아아아아악-!!!!!"', ''] },
  { key: 'push', title: '신라천정(神羅天征): 공간 붕괴형 척력 폭발', en: 'Almighty Repulsion — Spatial Collapse', col: '170,90,255',
    lines: ['"고통도, 벌점도, 이 기숙사도... 전부 밀어내 주마."', '"신라천정(神羅天征)-!!"'] },
  { key: 'pull', title: '만상천인(萬象天引): 칠흑 인력 포획 처형 스파이크', en: 'Universal Pull — Black Gravity Execution', col: '220,30,50',
    lines: ['"어디로 도망쳐도 소용없다... 인력은 거역 못 해."', '"만상천인(萬象天引)-!!"'] },
];
const YA_TAUNT = {
  start: ['오늘도 점호 걸리면 진짜 기숙사 엎어버린다.', '밤에 몰래 라면이나 처먹는 놈이 자치고라고 단속질이야?!', '오늘 니가 내 기숙사 퇴사원 싸인받는 날이다!'],
  win: ['퇴사다! 건드리지 마라! 오늘부터 기숙사 안 들어간다!', '봤냐?! 벌점 25점 때리더니 꼴좋다! 나 짐 싸서 집 간다!'],
  lose: ['노사한테 일러서 기숙사 통금이나 싹 다 바꿔버려야지...', '아 씨... 벌점 25점 채워서 퇴사당하는 게 차라리 낫겠다...'],
  block: '어디서 벌점 수첩을 밀어 넣어?! 라면 국물이나 닦아라!',
  error: '벌점 25점 처먹고 퇴사 처리나 해라!!',
  miss: '아 빡치네! 기숙사에 끓여놓은 내 라면 불어터질까 봐 집중 깨졌잖아!',
  serve: '이거 맞고 노사한테 가서 징징대봐라.',
};
function yaSource(c) { const P = c.caster, s = P.side === 0 ? 1 : -1; return c.sk.key === 'scream' ? { x: NET_X - s * 14, y: P.y - 30 } : { x: P.x + s * 26, y: P.y - 40 }; }

function updateYean() {
  if (cine.sk.key === 'push' || cine.sk.key === 'pull') { updateYaPP(); return; }
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, t = ++c.t;
  players.forEach((p) => p.anim++);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  if (!c.init) { c.init = true; c.parts = []; c.x0 = P.x; c.tx = k === 'evict' ? (mn + mx) / 2 : Math.max(mn, Math.min(mx, T.x)); }
  if (t <= 20) { const q = t / 20, e = 1 - (1 - q) * (1 - q); P.y = P_GROUND_Y - e * 90; if (k === 'scream') P.x = c.x0 + (NET_X - s * 40 - c.x0) * e; }
  P.state = JUMP; P.vy = 0;
  if (t === 1) sfx('whoosh');
  if (k === 'rage' && t === YA_B + 4) { sfx('beep', 0.6); shake = 8; }
  if (k === 'evict' && t === YA_A) sfx('spray');
  if (k === 'evict' && t === YA_C) { sfx('thud'); shake = 6; }
  if (k === 'scream' && t >= YA_B && t < YA_FIRE) { if (t % 4 === 0) shake = Math.max(shake, 7); if (t === YA_B) { sfx('buzz', 0.8); sfx('fail'); } }
  // 파티클: 라면 면발 / 종이 칼날 / 음파
  if (t > YA_A && t < YA_FIRE + 10) {
    const b = yaSource(c);
    if (k === 'rage' && t % 2 === 0) c.parts.push({ kind: 'ramen', x: P.x - s * 20 + (Math.random() - 0.5) * 40, y: P.y + 10, vx: (Math.random() - 0.5) * 1.5, vy: -1.5 - Math.random() * 2, t: 40, rot: Math.random() * 6 });
    if (k === 'evict') for (let i = 0; i < 2; i++) { const an = Math.random() * 6.28, r = 40 + Math.random() * 60; c.parts.push({ kind: 'paper', a: an, r, cx: b.x, cy: b.y, t: 50, rot: Math.random() * 6 }); }
    if (k === 'scream' && t > YA_B && t % 5 === 0) c.parts.push({ kind: 'wave', x: P.x, y: P.y - 20, r: 8, t: 36 });
  }
  for (const q of c.parts) {
    q.t--; q.rot = (q.rot || 0) + 0.15;
    if (q.kind === 'ramen') { q.x += q.vx; q.y += q.vy; }
    if (q.kind === 'paper') { q.a += 0.18; q.r = Math.max(14, q.r - 0.8); q.cx = yaSource(c).x; q.cy = yaSource(c).y; }
    if (q.kind === 'wave') q.r += 7;
  }
  c.parts = c.parts.filter((q) => q.t > 0);
  if (t === YA_FIRE - 22) sfx('charge');
  if (t === YA_FIRE - 1) { hitStop = 5; sfx('suck'); }
  const src = yaSource(c);
  if (t < YA_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.3; }
  if (t === YA_FIRE) {
    heavy(src.x, src.y, k === 'scream' ? 1.0 : 2.6); sfx('flight', 1, 0.8);
    if (k !== 'evict') {
      ball.x = src.x; ball.y = src.y; P.state = JUMP; P.vy = 0;
      if (k === 'rage') { releaseBall(Math.max(mn, Math.min(mx, T.x)), 8); T.freezeT = 16; T.lagT = 50; T.lagQ = []; T.confuseT = 50; T.confRev = true; T.confNext = 999; sfx('explode');
        popups.push({ text: 'MENTAL BREAKDOWN! 2초 멘탈 붕괴', x: GW / 2, y: 168, t: 55, color: '#ff5040' }); }
      else { T.slowT = 100; T.slowK = 0.1; T.freezeT = 8; ball.x = NET_X - s * 10; ball.y = Math.min(ball.y, 120); releaseBall(NET_X + s * 46, 16);
        popups.push({ text: 'DEAFENED! 4초 반응속도 90% 둔화', x: GW / 2, y: 168, t: 55, color: '#ffe63c' }); }
      cine = null; return;
    }
    T.mana = 0;
  }
  if (k === 'evict') {
    if (t > YA_FIRE && t <= YA_HIT) moveHeroBall([src, { x: c.tx, y: BALL_GROUND_Y - 6 }], EASE.heavy((t - YA_FIRE) / (YA_HIT - YA_FIRE)), 30, '255,255,255');
    if (t === YA_HIT) { heavy(c.tx, 262, 3.4); ball.squashT = 8; ball.fx = null; sfx('explode'); c.stamp = t; T.frozen = true; T.stunned = true; for (let i = 0; i < 40; i++) c.parts.push({ kind: 'shred', x: c.tx, y: 250, vx: (Math.random() - 0.5) * 10, vy: -2 - Math.random() * 7, t: 40, rot: Math.random() * 6 }); }
    for (const q of c.parts) if (q.kind === 'shred') { q.x += q.vx; q.y += q.vy; q.vy += 0.25; }
    if (t >= YA_END) { P.state = JUMP; P.vy = 0; ball.x = c.tx; ball.y = BALL_GROUND_Y - 4; ball.vx = 0; ball.vy = 8; ball.unblockable = true; ball.power = false; cine = null; }
  }
}

function yaCam(c) {
  if (c.sk.key === 'push' || c.sk.key === 'pull') return yaPPCam(c);
  const t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  if (!c.init) return H;
  const face = { x: P.x, y: P_GROUND_Y - 90 + 14 }, close = { x: face.x, y: face.y, z: 3.6, r: 0 };
  let keys;
  if (k === 'rage') keys = [[0, H], [YA_A, { x: P.x + s * 30, y: 140, z: 1.3 }], [YA_B, { ...close, z: 4 }], [YA_B + 10, { x: T.x, y: T.y - 6, z: 3.6, r: s * 0.05 }], // 예안 → 상대로 초고속 패닝
    [YA_C, { x: T.x, y: T.y - 6, z: 3.8, r: s * 0.05 }], [YA_C + 8, close], [YA_FIRE, { ...close, z: 4.2 }]];
  else if (k === 'evict') keys = [[0, H], [YA_A, { x: P.x + s * 40, y: 120, z: 1.6, r: -s * 0.05 }], [YA_B, { x: (P.x + c.tx) / 2, y: 120, z: 1.3, r: s * 0.04 }], // 트래킹
    [YA_C, { x: P.x + s * 26, y: P.y - 40, z: 2.4 }], [YA_C + 8, close], [YA_FIRE, { ...close, z: 3.9 }]];
  else keys = [[0, H], [YA_A, { x: P.x, y: P.y - 10, z: 2.0, r: 0 }], [YA_B, { x: P.x, y: P.y - 10, z: 2.2, r: s * 0.8 }], // 360도 회전
    [YA_C, { x: P.x, y: P.y - 10, z: 2.6, r: s * Math.PI * 2 }], [YA_C + 8, { ...close, r: s * Math.PI * 2 }], [YA_FIRE, { ...close, z: 4, r: s * Math.PI * 2 }]];
  keys.push([YA_FIRE + 1, H], [YA_END, H]);
  const cam = camKeys(t, keys);
  if (k === 'evict') return withFollow(c, cam, YA_FIRE, YA_HIT);
  return cam;
}

function drawRamen(x, y, sc, rot, a) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = a;
  ctx.fillStyle = '#d23a2a'; ctx.beginPath(); ctx.moveTo(-8, -2); ctx.lineTo(8, -2); ctx.lineTo(6, 6); ctx.lineTo(-6, 6); ctx.closePath(); ctx.fill(); // 컵
  ctx.strokeStyle = '#ffd77a'; ctx.lineWidth = 1.2; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 4, -2); ctx.quadraticCurveTo(i * 4 + 3, -7, i * 4, -11); ctx.stroke(); } // 면발
  ctx.restore();
}
function drawYeanWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  if (key === 'push' || key === 'pull') { drawYaPPWorld(); return; }
  const k = t > YA_END - 8 ? (YA_END - t) / 8 : Math.min(1, t / 8), a1 = Math.min(1, Math.max(0, (t - 6) / 18)), src = yaSource(c);
  if (key === 'rage') {
    const g = ctx.createRadialGradient(P.x, P.y - 20, 10, P.x, P.y - 20, 340); g.addColorStop(0, `rgba(120,0,0,${0.75 * k})`); g.addColorStop(1, `rgba(20,0,0,${0.92 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= YA_A) { // 락온 링
      const lk = Math.min(1, (t - YA_A) / 10); ctx.save(); ctx.translate(T.x, T.y - 10); ctx.rotate(t * 0.1); ctx.strokeStyle = `rgba(255,40,40,${lk})`; ctx.lineWidth = 2.5; ctx.shadowColor = '#ff2020'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(0, 0, 34 - lk * 6, 0, 5.6); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.rotate(1.57); ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(40, 0); ctx.stroke(); } ctx.restore();
      text('TARGET LOCKED', T.x, T.y - 56, 9, '#ff5050');
      ctx.font = 'bold 12px monospace'; ctx.fillStyle = `rgba(255,60,60,${0.7 * lk})`; ctx.textAlign = 'center'; for (let i = 0; i < 8; i++) ctx.fillText('!@#$%^&*'[i], P.x - s * 30 + Math.cos(i * 0.8 + t * 0.05) * 40, P.y - 50 + Math.sin(i * 0.8 + t * 0.05) * 30);
      if (t >= YA_B) { const sy = T.y - 30; for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(140,200,255,.8)'; ctx.beginPath(); ctx.ellipse(T.x + 14 - i * 3, sy + ((t * 2 + i * 9) % 30), 1.5, 3, 0, 0, 7); ctx.fill(); } } // 식은땀
    }
    for (const q of c.parts) if (q.kind === 'ramen') drawRamen(q.x, q.y, 1.2, q.rot, Math.min(1, q.t / 12));
    if (t >= YA_B && t < YA_B + 30) for (let i = 0; i < 3; i++) { const r = ((t - YA_B) * 8 + i * 30) % 220; ctx.strokeStyle = `rgba(255,40,40,${Math.max(0, 0.8 - r / 260)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(P.x, P.y - 10, r, 0, 7); ctx.stroke(); } // BEEP 음파
  }
  if (key === 'evict') {
    const g = ctx.createLinearGradient(0, -100, 0, 300); g.addColorStop(0, `rgba(250,246,236,${0.9 * k})`); g.addColorStop(1, `rgba(225,215,195,${0.9 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    ctx.save(); ctx.globalAlpha = 0.18 * a1; ctx.strokeStyle = '#7a6a50'; ctx.lineWidth = 0.6; for (let y = -40; y < 300; y += 12) { ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(640, y); ctx.stroke(); } ctx.restore(); // 공문서 줄
    if (t >= YA_A && t < YA_C + 10) { // 퇴사 통지서
      const q = Math.min(1, (t - YA_A) / 14);
      ctx.save(); ctx.translate(P.x + s * 50, P.y - 70 - q * 20); ctx.rotate(-0.08 + Math.sin(t * 0.1) * 0.05); ctx.globalAlpha = q;
      ctx.fillStyle = '#fffdf6'; ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.fillRect(-44, -56, 88, 112); ctx.strokeRect(-44, -56, 88, 112);
      ctx.fillStyle = '#222'; ctx.textAlign = 'center'; ctx.font = 'bold 9px "Malgun Gothic", sans-serif'; ctx.fillText('기숙사 퇴사 통지서', 0, -38);
      ctx.font = '7px "Malgun Gothic", sans-serif'; ['성명: 김예안', '누적 벌점: 25점', '사유: 점호 불참 외 다수', '처분: 강제 퇴사'].forEach((l, i) => ctx.fillText(l, 0, -18 + i * 12));
      if (t >= YA_C) { const sq = Math.min(1, (t - YA_C) / 4), sc = 1 + (1 - sq) * 1.5; ctx.save(); ctx.translate(18, 34); ctx.scale(sc, sc); ctx.rotate(-0.25); ctx.globalAlpha = sq; ctx.strokeStyle = '#d40f3c'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.stroke(); ctx.fillStyle = '#d40f3c'; ctx.font = 'bold 10px serif'; ctx.fillText('退舍', 0, 4); ctx.restore(); }
      ctx.restore();
    }
    for (const q of c.parts) { // 종이 칼날 소용돌이 / 파쇄 조각
      const x = q.kind === 'paper' ? q.cx + Math.cos(q.a) * q.r : q.x, y = q.kind === 'paper' ? q.cy + Math.sin(q.a) * q.r * 0.6 : q.y;
      ctx.save(); ctx.translate(x, y); ctx.rotate(q.rot); ctx.globalAlpha = Math.min(1, q.t / 10); ctx.fillStyle = '#ffffff'; ctx.strokeStyle = 'rgba(80,80,80,.5)'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(-6, -2); ctx.lineTo(6, -1); ctx.lineTo(5, 2); ctx.lineTo(-6, 2); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    if (c.stamp) { const q = Math.min(1, (t - c.stamp) / 5), sc = 1 + (1 - q) * 1.4;
      ctx.save(); ctx.translate(c.tx, 270); ctx.scale(sc, sc * 0.34); ctx.strokeStyle = '#e0103c'; ctx.lineWidth = 5; ctx.shadowColor = '#ff2050'; ctx.shadowBlur = 12; ctx.strokeRect(-110, -40, 220, 80);
      ctx.fillStyle = '#e0103c'; ctx.font = 'bold 34px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('벌점 25점 강제 퇴사', 0, 12); ctx.restore(); }
  }
  if (key === 'scream') {
    const g = ctx.createRadialGradient(P.x, P.y - 20, 10, P.x, P.y - 20, 340); g.addColorStop(0, `rgba(80,60,0,${0.6 * k})`); g.addColorStop(1, `rgba(10,8,0,${0.9 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    if (t < YA_B) { const q = Math.min(1, t / YA_B); for (let i = 0; i < 16; i++) { const an = i * 0.39, r = 140 * (1 - ((t * 0.04 + i * 0.13) % 1)); ctx.strokeStyle = `rgba(255,255,220,${0.35 * q})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(P.x + Math.cos(an) * r, P.y - 20 + Math.sin(an) * r); ctx.lineTo(P.x + Math.cos(an) * (r + 20), P.y - 20 + Math.sin(an) * (r + 20)); ctx.stroke(); } } // 공기 흡입
    for (const q of c.parts) if (q.kind === 'wave') { ctx.strokeStyle = `rgba(255,230,60,${q.t / 36})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 7); ctx.stroke(); ctx.strokeStyle = `rgba(255,255,255,${q.t / 60})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q.x, q.y, q.r - 6, 0, 7); ctx.stroke(); }
    if (t >= YA_B) { ctx.save(); ctx.globalAlpha = 0.9; floorText('160 dB', P.x + s * 70, 276, 34, '#ffe63c'); ctx.restore(); }
  }
  if (t > YA_FIRE - 22 && t < YA_FIRE) chargeFX(src.x, src.y, (t - (YA_FIRE - 22)) / 22, sk.col);
  const gl = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 58); gl.addColorStop(0, `rgba(${sk.col},.5)`); gl.addColorStop(1, `rgba(${sk.col},0)`);
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 58, 0, 7); ctx.fill();
  ctx.save(); if (key === 'scream' && t >= YA_B && t < YA_FIRE) ctx.translate((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3); drawPlayer(P); ctx.restore();
  if (key === 'rage' && t >= YA_B && t < YA_FIRE + 10) drawCensor(P.x + (P.side === 0 ? -6 : 6), P.y + 18, 30, t, '#$%@!');
  if (key === 'scream' && t >= YA_B && t < YA_FIRE) { // 귀 막는 상대
    ctx.save(); ctx.translate((Math.random() - 0.5) * 2, 0); drawPlayer(T); ctx.restore(); text('DEAFENED', T.x, T.y - 56, 9, '#ffe63c'); }
  else drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  if (t >= YA_A) drawBall();
}

function drawYeanUI(c) {
  const t = c.t, sk = c.sk, key = sk.key;
  if (!c.init) return;
  const k = t > YA_END - 8 ? (YA_END - t) / 8 : Math.min(1, t / 8), dark = key === 'evict';
  if (key === 'rage' && t >= YA_B + 4 && t < YA_B + 20) { ctx.save(); ctx.translate(GW - 70, 70); ctx.rotate(0.12); ctx.fillStyle = '#d0101a'; ctx.fillRect(-36, -14, 72, 24); text('BEEP-!', 0, 4, 14, '#fff'); ctx.restore(); }
  if (key === 'scream' && t >= YA_B && t < YA_FIRE) { // 화면이 가로로 금 가며 쪼개짐
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) { const y = 70 + i * 50; ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= GW; x += 24) ctx.lineTo(x, y + Math.sin(x * 0.3 + i * 5) * 5); ctx.stroke(); }
    if (t % 6 < 3) glitch(16);
  }
  if (key === 'evict' && c.stamp && t < c.stamp + 4) { ctx.fillStyle = `rgba(255,255,255,${0.8 - (t - c.stamp) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  if (key === 'push' || key === 'pull') drawYaPPUI(c);
  ctx.save(); ctx.globalAlpha = Math.max(0, k);
  text(sk.title, GW / 2, 22, 12, dark ? '#b00d33' : `rgb(${sk.col})`); text(sk.en, GW / 2, 34, 8, dark ? '#333' : '#fff');
  if (t >= YA_C - 4 && t < YA_FIRE + 20) sk.lines.forEach((ln, i) => {
    if (!ln) return;
    const st = YA_C - 4 + i * 12, n = Math.max(0, Math.min(ln.length, Math.floor((t - st) * 1.6))); if (n <= 0) return;
    const y = 262 + i * 17, big = key === 'scream'; ctx.font = `bold ${big ? 14 : i ? 10 : 11}px "Malgun Gothic", sans-serif`;
    const w = ctx.measureText(ln).width + 16; ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(GW / 2 - w / 2, y - 13, w, big ? 20 : 16);
    if (key === 'push' || key === 'pull') for (let e = 1; e <= 2; e++) { ctx.save(); ctx.globalAlpha *= 0.28 / e; text(ln.slice(0, n), GW / 2 + e * 2.5, y + e * 2, i ? 10 : 11, `rgb(${sk.col})`); ctx.restore(); } // 멀티 에코
    text(ln.slice(0, n), GW / 2, y + (big ? 2 : 0), big ? 14 : i ? 10 : 11, i ? '#ffffff' : `rgb(${sk.col})`);
  });
  ctx.restore();
}

// ----- 김예안 신규 스킬 (v7.4): 신라천정(척력) / 만상천인(인력) — 6초 틀(YA_*) 그대로 -----
function yaPPSrc(c) { const P = c.caster, s = P.side === 0 ? 1 : -1; return c.sk.key === 'push' ? { x: P.x + s * 22, y: P.y + 4 } : { x: P.x, y: P.y - 66 }; }
function yaHead(T) { return { x: T.x, y: T.y - CHARACTERS[T.char].h * 0.3 }; } // 상대 머리 위치
const YA_PP = { pushN: 18, pushF: 4, pullN: 15, pullF: 8 }; // 밸런스: 공 속도 N(작을수록 빠름) / 상대 멈칫 프레임
function yaHash(i) { const v = Math.sin(i * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); } // 그리기용 고정 랜덤 (게임 상태 안 건드림)
function updateYaPP() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, t = ++c.t;
  players.forEach((p) => p.anim++);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  const wall = T.side === 0 ? mn : mx, front = T.side === 0 ? mx : mn; // 상대 코트 맨 뒤 벽 / 네트 쪽
  if (!c.init) { c.init = true; c.parts = []; c.x0 = P.x; c.y0 = P.y; c.tx0 = T.x; }
  P.state = JUMP; P.vy = 0;
  if (k === 'push') {
    const hx = NET_X - s * 34, hy = 112;
    if (t <= 25) { const q = t / 25, e = 1 - (1 - q) * (1 - q); P.x = c.x0 + (hx - c.x0) * e; P.y = c.y0 + (hy - c.y0) * e; }
    else if (t < YA_C) { P.x = hx; P.y = hy + Math.sin(t * 0.12) * 2; }
    else { P.x = hx; P.y = Math.min(hy + 10, P.y + 3); } // 양손 내리치며 살짝 내려옴
    if (t === 1) { if (bossMode) bossSfx('duck'); }
    if (t === 8) { sfx('thud', 0.8); c.neg = t; }
    if (t === YA_A) sfx('whoosh');
    if (t >= YA_A && t < YA_C) {
      if (t % 2 === 0) c.parts.push({ kind: 'tile', x: 110 + Math.random() * 212, y: 262 + Math.random() * 8, vx: 0, vy: -0.35 - Math.random() * 0.6, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.08, t: 999, sz: 3 + Math.random() * 4, col: Math.random() < 0.5 ? '#e8cf8a' : Math.random() < 0.5 ? '#c9a95e' : '#5aa04a' });
      if (t % 9 === 0) c.parts.push({ kind: 'ring', x: P.x, y: P.y - 10, r: 6, t: 32 });
    }
    if (t === YA_C - 22) sfx('charge');
    if (t === YA_C) { c.boom = t; sfx('explode'); sfx('thud'); shake = 22; hitStop = 4; heavy(P.x, P.y, 2.8);
      for (const q of c.parts) if (q.kind === 'tile') { q.vx = s * (7 + Math.random() * 7); q.vy = (Math.random() - 0.6) * 4; q.vr = s * 0.4; q.t = 30; }
      for (let i = 0; i < 30; i++) c.parts.push({ kind: 'shard', x: P.x, y: P.y, vx: s * (4 + Math.random() * 10), vy: (Math.random() - 0.5) * 9, t: 34, rot: Math.random() * 6 }); }
    if (t > YA_C && t < YA_FIRE) { T.x += (wall - T.x) * 0.35; if (t % 3 === 0) shake = Math.max(shake, 10); }
  } else { // pull
    const hx = NET_X - s * 28;
    if (t <= 18) { const q = t / 18, e = 1 - (1 - q) * (1 - q); P.x = c.x0 + (hx - c.x0) * e; P.y = c.y0 + (P_GROUND_Y - c.y0) * e; } // 네트 앞으로 슬라이딩
    else if (t < YA_C) { P.x = hx; P.y = P_GROUND_Y; }
    else { const q = Math.min(1, (t - YA_C) / 14), e = 1 - (1 - q) * (1 - q); P.x = hx; P.y = P_GROUND_Y - e * 120; } // 무중력 도약
    if (t === 1) sfx('whoosh');
    if (t === 18) { sfx('suck'); c.core = t; }
    if (t > 18 && t < YA_B && t % 4 === 0) c.parts.push({ kind: 'in', a: Math.random() * 6.28, r: 120 + Math.random() * 60, t: 40 });
    if (t >= YA_A + 8 && t <= YA_B) { const q = (t - (YA_A + 8)) / (YA_B - YA_A - 8); T.x = c.tx0 + (NET_X + s * 40 - c.tx0) * (q * q); if (t % 4 === 0) shake = Math.max(shake, 4); } // 사슬로 강제 당김
    if (t === YA_A + 8) sfx('charge');
    if (t === YA_B) { c.lock = t; hitStop = 10; sfx('thud'); shake = 12; } // 0.4초 초대형 히트스톱 + 머리 락온
    if (t === YA_FIRE - 16) sfx('charge');
  }
  for (const q of c.parts) {
    q.t--;
    if (q.kind === 'tile') { q.x += q.vx; q.y += q.vy; q.rot += q.vr; if (q.vx) q.vy += 0.15; }
    if (q.kind === 'shard') { q.x += q.vx; q.y += q.vy; q.vx *= 0.96; q.rot += 0.3; }
    if (q.kind === 'ring') q.r += 6;
    if (q.kind === 'in') q.r = Math.max(4, q.r * 0.9);
  }
  c.parts = c.parts.filter((q) => q.t > 0 && q.x > -200 && q.x < 640);
  // 공 위치
  const src = yaPPSrc(c);
  if (k === 'pull' && t < YA_B) { const q = Math.max(0, Math.min(1, (t - (YA_A + 20)) / (YA_B - YA_A - 20))); if (q > 0) { ball.x += (src.x - ball.x) * q; ball.y += (src.y - ball.y) * q; } ball.vx = 0; ball.vy = 0; ball.rot += 0.5; }
  else if (t < YA_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.3; }
  if (t === YA_FIRE - 1) { hitStop = 5; }
  if (t === YA_FIRE) {
    sfx('flight', 1, 0.8); ball.x = src.x; ball.y = src.y; P.state = JUMP; P.vy = 0;
    if (k === 'push') { // 척력: 상대 벽에 박힘 + 방어막 초토화 + 공은 네트 앞으로
      heavy(wall, T.y - 20, 2.6); T.x = wall; T.freezeT = Math.max(T.freezeT || 0, YA_PP.pushF);
      for (const f of ['guardT', 'blockT', 'fwT']) T[f] = 0; T.matrixGuard = false; T.courtGuard = false;
      if (!bossMode) { fakes.length = 0; strikes.length = 0; }
      ball.x = NET_X + s * 34; ball.y = 118; // 척력에 밀려 네트를 넘어간 자리에서 출발 (내 몸에 다시 안 맞게)
      releaseBall(front + s * 26, YA_PP.pushN);
      popups.push({ text: '神羅天征! 상대 벽 꽂힘 + 방어막 초토화', x: GW / 2, y: 168, t: 60, color: '#c89bff' });
    } else { // 인력: 머리 처형 스파이크 + 버프 해제 + 인력 붕괴
      heavy(T.x, yaHead(T).y, 2.8); sfx('explode'); T.freezeT = Math.max(T.freezeT || 0, YA_PP.pullF);
      for (const f of ['fastT', 'jumpT', 'ampT', 'whirlT', 'sightT']) T[f] = 0;
      T.weakT = Math.max(T.weakT || 0, 125); P.ampT = Math.max(P.ampT || 0, 125);
      ball.x = NET_X + s * 30; ball.y = 96; // 머리에 맞고 튕긴 공 (내 몸에 다시 안 맞게 상대 코트 위에서 출발)
      releaseBall(Math.max(mn, Math.min(mx, T.x + s * 64)), YA_PP.pullN);
      popups.push({ text: '萬象天引! 상대 버프 해제 + 5초 스파이크 약화 · 나 5초 증폭', x: GW / 2, y: 168, t: 60, color: '#ff6a6a' });
    }
    cine = null;
  }
}
function yaPPCam(c) {
  const t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, H = CAM_HOME;
  if (!c.init) return H;
  let keys;
  if (c.sk.key === 'push') keys = [[0, H], [8, { x: P.x, y: P.y - 18, z: 3.4, r: 0 }], [22, { x: P.x, y: P.y - 16, z: 3.6, r: 0 }], [YA_A + 12, { x: NET_X, y: 180, z: 1.3, r: 0 }], [YA_B + 10, { x: NET_X - s * 10, y: 170, z: 1.5, r: -s * 0.03 }],
    [YA_C - 8, { x: P.x, y: P.y, z: 2.4, r: s * 0.04 }], [YA_C + 2, { x: NET_X + s * 50, y: 160, z: 1.05, r: 0 }], [YA_FIRE, { x: NET_X + s * 60, y: 160, z: 1.15, r: 0 }]];
  else keys = [[0, H], [18, { x: P.x + s * 30, y: 210, z: 2.2, r: 0 }], [YA_A + 8, { x: (P.x + T.x) / 2, y: 200, z: 1.4, r: 0 }], [YA_B, { x: NET_X + s * 20, y: 200, z: 2.0, r: 0 }],
    [YA_B + 6, { x: T.x, y: T.y - 30, z: 3.6, r: s * 0.04 }], [YA_C, { x: T.x, y: T.y - 30, z: 3.8, r: s * 0.04 }], [YA_C + 12, { x: NET_X, y: 190, z: 1.6, r: 0 }], [YA_FIRE, { x: NET_X + s * 24, y: 196, z: 1.9, r: 0 }]];
  keys.push([YA_FIRE + 1, H], [YA_END, H]);
  return camKeys(t, keys);
}
function drawYaPPWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  const k = Math.min(1, t / 8), src = yaPPSrc(c), ch = CHARACTERS[P.char], eye = { x: P.x + s * 6, y: P.y - ch.h * 0.55 };
  if (key === 'push') {
    const g = ctx.createRadialGradient(P.x, P.y, 10, P.x, P.y, 360); g.addColorStop(0, `rgba(70,20,120,${0.75 * k})`); g.addColorStop(1, `rgba(8,0,20,${0.93 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    // 중력 파동 링
    for (const q of c.parts) if (q.kind === 'ring') { ctx.strokeStyle = `rgba(190,130,255,${q.t / 40})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(q.x, q.y, q.r, q.r * 0.8, 0, 0, 7); ctx.stroke(); }
    // 떠오르는 코트 타일 조각
    for (const q of c.parts) if (q.kind === 'tile') { ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.globalAlpha = Math.min(1, q.t / 10); ctx.fillStyle = q.col; ctx.fillRect(-q.sz / 2, -q.sz / 2, q.sz, q.sz); ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 0.6; ctx.strokeRect(-q.sz / 2, -q.sz / 2, q.sz, q.sz); ctx.restore(); }
    if (c.boom) { // 백색 광륜 구체 + 척력 쓸림선
      const q = (t - c.boom) / (YA_FIRE - c.boom), r = 20 + q * 420;
      const cg = ctx.createRadialGradient(P.x, P.y, 0, P.x, P.y, r); cg.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - q)})`); cg.addColorStop(0.6, `rgba(220,190,255,${0.5 * (1 - q)})`); cg.addColorStop(1, 'rgba(160,80,255,0)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(P.x, P.y, r, 0, 7); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.9 * (1 - q)})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(P.x, P.y, r * 0.7, 0, 7); ctx.stroke();
      for (let i = 0; i < 18; i++) { const y = 40 + yaHash(i) * 230, x0 = P.x + s * ((t * 18 + yaHash(i + 50) * 300) % 360); ctx.strokeStyle = `rgba(230,210,255,${0.6 * (1 - q)})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + s * 40, y); ctx.stroke(); }
      ctx.save(); ctx.globalAlpha = 1 - q; floorText('神羅天征', NET_X + s * 80, 276, 34, '#e6d2ff'); ctx.restore();
    }
    for (const q of c.parts) if (q.kind === 'shard') { ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.globalAlpha = q.t / 34; ctx.fillStyle = '#fff'; ctx.fillRect(-3, -1, 6, 2); ctx.restore(); }
  } else {
    const g = ctx.createRadialGradient(src.x, P.y - 30, 10, src.x, P.y - 30, 360); g.addColorStop(0, `rgba(90,0,10,${0.75 * k})`); g.addColorStop(1, `rgba(5,0,0,${0.94 * k})`);
    ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    const core = { x: P.x + s * 22, y: P.y - 30 };
    if (c.core && t < YA_C + 6) {
      const q = Math.min(1, (t - c.core) / 12), R = 4 + q * 9;
      for (let i = 0; i < 6; i++) { const rr = ((t * 2.5 + i * 22) % 130); ctx.strokeStyle = `rgba(200,20,40,${0.5 * (rr / 130)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(core.x, core.y, 130 - rr, (130 - rr) * 0.7, t * 0.02, 0, 7); ctx.stroke(); } // 렌즈 왜곡 (빨려 드는 원)
      for (const p of c.parts) if (p.kind === 'in') { ctx.strokeStyle = `rgba(255,80,90,${Math.min(1, p.t / 20)})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(core.x + Math.cos(p.a) * p.r, core.y + Math.sin(p.a) * p.r); ctx.lineTo(core.x + Math.cos(p.a) * (p.r + 14), core.y + Math.sin(p.a) * (p.r + 14)); ctx.stroke(); }
      ctx.save(); ctx.translate(core.x, core.y); ctx.rotate(t * 0.2); ctx.strokeStyle = 'rgba(255,40,60,.9)'; ctx.lineWidth = 2; ctx.shadowColor = '#ff1030'; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.ellipse(0, 0, R * 2.2, R * 0.7, 0, 0, 7); ctx.stroke(); ctx.restore();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(core.x, core.y, R, 0, 7); ctx.fill(); ctx.strokeStyle = '#ff2040'; ctx.lineWidth = 1.5; ctx.stroke();
      if (t >= YA_A && t < YA_FIRE) { // 암적색 중력 사슬
        const tx = T.x, ty = T.y - 24, n = 14;
        for (let i = 0; i <= n; i++) { const u = i / n, x = core.x + (tx - core.x) * u, y = core.y + (ty - core.y) * u + Math.sin(u * 9 + t * 0.4) * 2; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.atan2(ty - core.y, tx - core.x) + (i % 2 ? 0 : 1.57));
          ctx.strokeStyle = '#a0101c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, 4, 2, 0, 0, 7); ctx.stroke(); ctx.restore(); }
      }
    }
    if (c.lock) { // 머리 락온 조준점
      const q = Math.min(1, (t - c.lock) / 6), { x: hx, y: hy } = yaHead(T);
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(t * 0.08); ctx.strokeStyle = `rgba(255,30,40,${q})`; ctx.lineWidth = 2; ctx.shadowColor = '#ff0020'; ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(0, 0, 20 - q * 6, 0, 7); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.rotate(1.57); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(22, 0); ctx.stroke(); } ctx.restore();
      if (t < YA_FIRE) text('HEAD LOCK-ON', hx, hy - 26, 8, '#ff4050');
    }
    if (t >= YA_FIRE - 10) { // 붉은 레이저 궤적
      const { x: hx, y: hy } = yaHead(T); ctx.save(); ctx.strokeStyle = 'rgba(255,40,60,.9)'; ctx.lineWidth = 3 + Math.sin(t) * 1.5; ctx.shadowColor = '#ff0020'; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.moveTo(src.x, src.y); ctx.lineTo(hx, hy); ctx.stroke(); ctx.restore(); }
    if (t >= YA_B) { ctx.save(); ctx.globalAlpha = Math.min(1, (t - YA_B) / 8); floorText('萬象天引', NET_X - s * 70, 276, 34, '#ff5060'); ctx.restore(); }
  }
  if (t > YA_FIRE - 22 && t < YA_FIRE) chargeFX(src.x, src.y, (t - (YA_FIRE - 22)) / 22, sk.col);
  const gl = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 60); gl.addColorStop(0, `rgba(${sk.col},.5)`); gl.addColorStop(1, `rgba(${sk.col},0)`);
  ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 60, 0, 7); ctx.fill();
  drawPlayer(P);
  if (key === 'push' && t >= 6 && t < YA_C + 10) { // 보라색 눈 번뜩임 궤적
    const q = Math.min(1, (t - 6) / 4); ctx.save(); ctx.shadowColor = '#b060ff'; ctx.shadowBlur = 10; ctx.strokeStyle = `rgba(200,140,255,${q})`; ctx.lineWidth = 1.6;
    for (const dx of [-5, 5]) { ctx.beginPath(); ctx.moveTo(eye.x + dx, eye.y); ctx.lineTo(eye.x + dx - s * (8 + Math.sin(t * 0.3) * 4), eye.y - 1); ctx.stroke(); ctx.fillStyle = '#e0c0ff'; ctx.beginPath(); ctx.arc(eye.x + dx, eye.y, 1.6, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  ctx.save(); if ((key === 'push' && c.boom) || (key === 'pull' && c.lock && t < YA_C)) ctx.translate(Math.sin(t * 2.3) * 1.5, 0); drawPlayer(T); ctx.restore();
  if (key === 'pull' ? t >= YA_A - 5 : !!c.boom) drawBall();
}
function drawYaPPUI(c) {
  const t = c.t, key = c.sk.key;
  if (key === 'push') {
    if (c.neg && t >= c.neg && t < YA_A) { // 흑백 네거티브 반전 + 도트 픽셀
      ctx.save(); ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, GW, GH);
      ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, GW, GH); ctx.restore();
      const q = 1 - (t - c.neg) / (YA_A - c.neg), px = 8;
      for (let y = 0; y < GH; y += px) for (let x = 0; x < GW; x += px) { const h = yaHash(x * 7 + y * 13 + t); if (h < 0.25 * q) { ctx.fillStyle = h < 0.12 * q ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.35)'; ctx.fillRect(x, y, px, px); } }
    }
    if (c.boom && t < c.boom + 4) { ctx.fillStyle = `rgba(255,255,255,${0.9 - (t - c.boom) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  } else {
    if (c.lock && t < c.lock + 14) { ctx.fillStyle = `rgba(255,0,20,${0.35 - (t - c.lock) * 0.025})`; ctx.fillRect(0, 0, GW, GH); }
    if (c.lock && t >= c.lock && t < YA_C) { ctx.save(); ctx.globalAlpha = 0.85; text('[ HITSTOP · TARGET HEAD ]', GW / 2, 60, 10, '#ff4050'); ctx.restore(); }
  }
}

// ===== 김우현 (MYTHIC): 135cm 방송부 부장 — 4초 "한번 더!" 더블 하이파이브 3종 =====
const WH_B = 25, WH_HIT1 = 52, WH_FIRE = 75, WH_END = 100;
const RAINBOW = ['255,40,40', '255,140,0', '255,230,0', '40,220,80', '40,140,255', '80,60,220', '180,60,255'];
const WH_SKILLS = [
  { key: 'broadcast', title: '방송부 특보: 7색 스펙트럼 더블 하이파이브', en: 'Rainbow Double High-Five Broadcast Slam', col: '255,60,60',
    lines: ['"135cm라고 놀린 놈들 전부 똑똑히 봐라!!"', '"한번 더--!! 레인보우 더블 하이파이브 쾅-!!!"'] },
  { key: 'evict', title: '자치위원회 집행: 벌점 25점 연속 뚝배기', en: 'Governance Committee: 25-Point Double Eviction', col: '230,20,60',
    lines: ['"벌점 25점 누적이다!! 어디서 점호를 빼먹어?!"', '"한번 더--!! 오늘 아주 짐 싸서 꺼져라-!!"'] },
  { key: 'clap', title: 'ON-AIR 메가폰: 콤보 레인보우 더블 클랩', en: 'Combo Rainbow Double High-Five Soundwave', col: '255,200,0',
    lines: ['"키 135cm의 스피드를 감당할 수 있겠냐?!"', '"한번 더--!! 전 방송망 생중계 더블 하이파이브 쾅-!!!!"'] },
];
const WH_TAUNT = {
  start: ['카메라 온 서킷 체크 완료! 135cm의 매운맛을 전교에 생중계한다!', '너 방금 내 키 보고 초등학생이냐고 웃었냐...? 뚝배기 2번 깨질 준비 해라.',
    '기숙사 자치위원 김우현이다. 키 작다고 단속 못 할 줄 알고?!', '키가 작아서 안 보인다고? 눈 깜빡이면 이미 내 2연타에 맞아 있을 거다!'],
  error: ['위에서 올려다보니까 어때?! 키 135cm라고 놀리던 입 싹 다 물어!', '키만 180cm 넘으면 뭐 하냐? 135cm인 나보다 반응 속도가 느린데!'],
  block: '내 점프력 봤냐?! 135cm 키 무시하고 내 머리 위로 공 넘길 생각 꿈도 꾸지 마라!',
  serve: '레인보우 스펙트럼 락온... 키 135cm라고 방심한 놈들 뚝배기 깨러 간다!',
  miss: '아 씨... 키 135cm냐고 물어본 놈 생각하다 타점 꼬였잖아! 방송부 카메라 다 꺼!',
  win: "오늘 경기 헤드라인 뉴스! '135cm의 거인 김우현, 코트 완파!' 방송부 송출 끝!",
  lose: '말도 안 돼... 내 키가 10cm만 더 컸어도 이 더블 타구는 무조건 들어갔다고...!',
};
// 김우현 ↔ 김예안 라이벌 대사 (둘 다 게임 캐릭터일 때만)
const WH_VS_YEAN = { start: '야 김예안! 벌점 25점 다 채웠으면 얌전히 퇴사나 하지, 어디서 코트에 얼굴을 밀어 넣어?!', error: '봤냐 김예안?! 135cm의 더블 하이파이브 맛이 어떠냐! 한번 더 맞아라!',
  block: '어디서 사직서니 퇴사원이니 징징대?! 점호나 제대로 받아라!', win: '봤냐 김예안? 덤비지 마라! 사감실 가서 보고서 제출하러 간다!' };
const YEAN_VS_WH = { start: '어이 자치고 김우현! 오늘 니가 내 기숙사 퇴사원 싸인받는 날이다!', error: '벌점 25점 처먹고 퇴사 처리나 해라!!',
  block: '어디서 자치고 벌점 수첩을 밀어 넣어?! 라면 국물이나 닦아라!', win: '봤냐 김우현?! 꼴에 자치고라고 벌점 25점 때리더니 꼴좋다! 나 짐 싸서 집 간다!',
  lose: '아 씨... 김우현한테 지다니... 벌점 25점 채워서 퇴사당하는 게 차라리 낫겠다...' };

function rainbowPalm(x, y, sc, rot, a, flip = 1) { // 7색 거대 손바닥 (줄무늬)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc * flip, sc); ctx.globalAlpha = a;
  ctx.beginPath(); // 손바닥 + 손가락 5개 모양 경로
  ctx.ellipse(0, 10, 26, 30, 0, 0, 7);
  for (const [fx, fy, l, an] of [[-20, -10, 26, -0.35], [-8, -18, 32, -0.12], [5, -19, 34, 0.05], [17, -14, 30, 0.22], [27, 8, 22, 0.95]]) { ctx.moveTo(fx, fy); ctx.ellipse(fx + Math.sin(an) * l / 2, fy - Math.cos(an) * l / 2, 6.5, l / 2 + 4, an, 0, 7); }
  ctx.save(); ctx.clip();
  RAINBOW.forEach((c, i) => { ctx.fillStyle = `rgb(${c})`; ctx.fillRect(-60, -60 + i * 18, 120, 18); });
  ctx.restore();
  ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2.5 / sc; ctx.shadowColor = '#fff'; ctx.shadowBlur = 14; ctx.stroke();
  ctx.restore();
}
function onAirSign(x, y, a, t) {
  ctx.save(); ctx.globalAlpha = a; const on = Math.floor(t / 6) % 2 === 0;
  ctx.fillStyle = on ? 'rgba(220,0,0,.95)' : 'rgba(120,0,0,.9)'; ctx.fillRect(x - 34, y - 11, 68, 22); ctx.strokeStyle = '#ffdddd'; ctx.lineWidth = 1.5; ctx.strokeRect(x - 34, y - 11, 68, 22);
  ctx.shadowColor = '#ff2020'; ctx.shadowBlur = on ? 18 : 4; ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('● ON AIR', x, y + 4); ctx.restore();
}

function whSource(c) { const P = c.caster, s = P.side === 0 ? 1 : -1; return { x: P.x + s * 30, y: P.y - 46 }; }
function updateWh() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, t = ++c.t;
  players.forEach((p) => p.anim++);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  if (!c.init) { c.init = true; c.parts = []; c.isYean = CHARACTERS[T.char].skill === 'yean'; }
  if (t <= 12) { const q = t / 12; P.y = P_GROUND_Y - (1 - (1 - q) * (1 - q)) * 100; } // 135cm 광속 도약
  P.state = JUMP; P.vy = 0;
  if (t === 1) { sfx('zap'); shake = 5; }
  if (t > 2 && t < WH_FIRE && t % 2 === 0) for (let i = 0; i < 2; i++) c.parts.push({ x: P.x + (Math.random() - 0.5) * 200, y: P.y - 40 + (Math.random() - 0.5) * 160, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, t: 24, col: RAINBOW[Math.floor(Math.random() * 7)] });
  for (const q of c.parts) { q.x += q.vx; q.y += q.vy; q.t--; }
  c.parts = c.parts.filter((q) => q.t > 0);
  const src = whSource(c);
  if (t < WH_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.3; }
  if (t === WH_HIT1) { heavy(src.x, src.y, 1.8); sfx('snap'); sfx('thud'); } // 1차 하이파이브 짝!
  if (t === WH_HIT1 + 6) sfx('charge');
  if (t === WH_FIRE - 1) { hitStop = 4; sfx('suck'); }
  if (t === WH_FIRE) { // 2차 "한번 더!" 쾅
    heavy(src.x, src.y, 2.6); sfx('explode'); sfx('flight', 1, 0.7); ball.x = src.x; ball.y = src.y; P.state = JUMP; P.vy = 0;
    let msg;
    if (k === 'broadcast') { releaseBall(Math.max(mn, Math.min(mx, T.x + (Math.random() - 0.5) * 80)), 9); T.freezeT = 20; T.stunned = true; T.lagT = 75; T.lagQ = []; P.fastT = 150; P.jumpT = 150; msg = '방송 특보! 상대 3초 생방송 딜레이 + 나 6초 이속·점프 UP'; }
    else if (k === 'evict') { releaseBall(Math.max(mn, Math.min(mx, T.x)), 9); T.freezeT = c.isYean ? 40 : 25; T.stunned = true; T.mana = Math.max(0, T.mana - 2); T.manaLockT = 200; T.slowT = 100; T.slowK = 0.5; msg = c.isYean ? '김예안 락온! 1.6초 스턴 + 8초 마나 봉인 + 감속' : '벌점 25점 집행! 1초 스턴 + 8초 마나 봉인 + 4초 감속'; }
    else { T.mana = 0; for (const f of ['guardT', 'blockT', 'fwT']) T[f] = 0; T.matrixGuard = false; T.courtGuard = false; releaseBall(Math.max(mn, Math.min(mx, (mn + mx) / 2)), 9); ball.pierce = 40; P.ampT = 175; P.mana = Math.min(manaMax(P) - 1, P.mana + 2); T.shrinkT = 125; T.shrinkK = 0.75; msg = '더블 클랩! 방어막 소멸 + 상대 축소 + 나 7초 스파이크 증폭·마나 +2'; }
    popups.push({ text: msg, x: GW / 2, y: 168, t: 55, color: `rgb(${c.sk.col})` });
    cine = null;
  }
}
function whCam(c) {
  const t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  if (!c.init) return H;
  const ly = P_GROUND_Y - 100, close = { x: P.x, y: ly + 4, z: 2.6 }, src = whSource(c);
  let keys;
  if (k === 'evict') keys = [[0, H], [12, { x: P.x, y: ly + 40, z: 1.8, r: -s * 0.08 }], [WH_B, close], [WH_B + 14, { x: T.x, y: T.y - 10, z: 2.4, r: s * 0.04 }], [WH_HIT1 + 4, { x: src.x, y: src.y, z: 2.2 }], [WH_FIRE - 4, { x: src.x, y: src.y - 20, z: 1.5 }], [WH_FIRE + 1, H]];
  else if (k === 'clap') keys = [[0, H], [WH_B, { ...close, r: 0 }], [WH_HIT1, { x: src.x, y: src.y, z: 2.4, r: s * Math.PI }], [WH_FIRE - 4, { x: src.x, y: src.y, z: 2.0, r: s * Math.PI * 2 }], [WH_FIRE + 1, H]];
  else keys = [[0, H], [WH_B, close], [WH_B + 10, { x: src.x, y: src.y - 30, z: 1.6 }], [WH_HIT1 + 4, { x: src.x, y: src.y - 20, z: 2.2 }], [WH_FIRE - 4, { x: src.x, y: src.y - 50, z: 1.3 }], [WH_FIRE + 1, H]];
  keys.push([WH_END, H]);
  return camKeys(t, keys);
}
function drawWhWorld() {
  if (!cine.init) return; /* 시작 첫 프레임엔 아직 준비 전 */
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key, src = whSource(c), k = Math.min(1, t / 6);
  const g = ctx.createRadialGradient(P.x, P.y - 20, 10, P.x, P.y - 20, 360); g.addColorStop(0, `rgba(40,0,60,${0.75 * k})`); g.addColorStop(1, `rgba(5,0,15,${0.93 * k})`); ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
  // 무지개 오로라 띠
  for (let i = 0; i < 7; i++) { ctx.strokeStyle = `rgba(${RAINBOW[i]},${0.35 * k})`; ctx.lineWidth = 6; ctx.beginPath(); for (let x = -60; x < 500; x += 10) ctx.lineTo(x, 40 + i * 7 + Math.sin(x * 0.02 + t * 0.1 + i * 0.3) * 14); ctx.stroke(); }
  // 광속 잔상 (도약)
  if (t < 16) for (let i = 1; i < 5; i++) { ctx.save(); ctx.globalAlpha = 0.25; ctx.translate(0, i * 18); ctx.filter = `hue-rotate(${i * 60}deg)`; drawPlayer(P); ctx.filter = 'none'; ctx.restore(); }
  if (key === 'evict' && t >= 8) { // 기숙사 수칙 서류 + 락온
    for (let i = 0; i < 10; i++) { const x = ((i * 67 + t * 2) % 520) - 40, y = 60 + ((i * 41 + t * 1.5) % 200); ctx.save(); ctx.translate(x, y); ctx.rotate(i + t * 0.05); ctx.fillStyle = 'rgba(255,250,240,.9)'; ctx.fillRect(-9, -12, 18, 24); ctx.fillStyle = '#c01030'; ctx.fillRect(-6, -8, 12, 2); ctx.fillRect(-6, -3, 9, 1.5); ctx.restore(); }
    const lk = Math.min(1, (t - 8) / 10); ctx.save(); ctx.translate(T.x, T.y - 10); ctx.rotate(t * 0.12); ctx.strokeStyle = `rgba(255,30,30,${lk})`; ctx.lineWidth = 2.5; ctx.shadowColor = '#ff2020'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(0, 0, 32, 0, 5.6); ctx.stroke(); for (let i = 0; i < 4; i++) { ctx.rotate(1.57); ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(40, 0); ctx.stroke(); } ctx.restore();
    text(c.isYean ? 'TARGET: 김예안' : 'TARGET LOCKED', T.x, T.y - 56, 9, '#ff5050');
  }
  // 1차 손바닥 (짝!) → 2차 "한번 더!" 초거대 손바닥
  if (t >= WH_B && t < WH_HIT1 + 8) { const q = Math.min(1, (t - WH_B) / (WH_HIT1 - WH_B)); if (key === 'clap') { rainbowPalm(src.x - 70 + q * 52, src.y, 1.2, 0.3, 0.95, 1); rainbowPalm(src.x + 70 - q * 52, src.y, 1.2, -0.3, 0.95, -1); } else rainbowPalm(src.x - s * 30, src.y - 60 + q * 50, 1.4, s * 0.5, 0.95, s); }
  if (t >= WH_HIT1 + 6 && t <= WH_FIRE + 2) { const q = Math.min(1, (t - WH_HIT1 - 6) / (WH_FIRE - WH_HIT1 - 6)); const sc = 1.5 + q * 2.6;
    if (key === 'clap') { rainbowPalm(src.x - 150 + q * 125, src.y, sc * 0.8, 0.3, 0.95, 1); rainbowPalm(src.x + 150 - q * 125, src.y, sc * 0.8, -0.3, 0.95, -1); }
    else rainbowPalm(src.x - s * 20, src.y - 200 + q * 170, sc, s * 0.4, 0.95, s); }
  if (t >= WH_HIT1 && t < WH_HIT1 + 10) { const q = (t - WH_HIT1) / 10; for (let i = 0; i < 7; i++) { ctx.strokeStyle = `rgba(${RAINBOW[i]},${1 - q})`; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(src.x, src.y, 10 + q * 60 + i * 5, 0, 7); ctx.stroke(); } }
  for (const q of c.parts) { ctx.fillStyle = `rgba(${q.col},${q.t / 24})`; ctx.fillRect(q.x, q.y, 3, 3); }
  if (t > WH_FIRE - 14 && t < WH_FIRE) chargeFX(src.x, src.y, (t - (WH_FIRE - 14)) / 14, RAINBOW[Math.floor(t / 2) % 7]);
  onAirSign(P.x - s * 44, P.y - 70, Math.min(1, t / 8), t);
  drawPlayer(P); text('135cm', P.x, P.y + 42, 8, '#ffe066');
  drawPlayer(T);
  if (T.stunned) for (let i = 0; i < 3; i++) { const an = t * 0.3 + i * 2.1; text('★', T.x + Math.cos(an) * 16, T.y - 46 + Math.sin(an) * 4, 9, '#ffe066'); }
  drawBall();
}
function drawWhUI(c) {
  const t = c.t, sk = c.sk, key = sk.key, k = Math.min(1, t / 6);
  if (key === 'clap' && t >= 4) { ctx.save(); ctx.globalAlpha = 0.6 * k; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; for (const [x, y, dx, dy] of [[14, 14, 1, 1], [GW - 14, 14, -1, 1], [14, GH - 14, 1, -1], [GW - 14, GH - 14, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + dy * 16); ctx.lineTo(x, y); ctx.lineTo(x + dx * 16, y); ctx.stroke(); } ctx.fillStyle = '#ff2020'; if (Math.floor(t / 8) % 2) { ctx.beginPath(); ctx.arc(30, 60, 4, 0, 7); ctx.fill(); } text('REC  4K 60fps', 74, 64, 8, '#fff'); ctx.restore(); } // 방송부 4K 카메라 뷰
  if (t >= WH_HIT1 && t < WH_HIT1 + 3) { ctx.fillStyle = `rgba(255,255,255,${0.6 - (t - WH_HIT1) * 0.2})`; ctx.fillRect(0, 0, GW, GH); }
  if (t >= WH_HIT1 + 4 && t < WH_FIRE + 6) { const q = Math.min(1, (t - WH_HIT1 - 4) / 5), sc = 1 + (1 - q) * 1.8; ctx.save(); ctx.translate(GW / 2, 104); ctx.scale(sc, sc); ctx.rotate(-0.06);
    RAINBOW.forEach((c2, i) => { ctx.fillStyle = `rgb(${c2})`; ctx.font = 'bold 30px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('한번 더-!!', -6 + i, 10 - i * 0.6); }); ctx.fillStyle = '#fff'; ctx.fillText('한번 더-!!', 0, 6); ctx.restore(); }
  if (t >= WH_FIRE - 1 && t < WH_FIRE + 4) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; RAINBOW.forEach((c2, i) => { ctx.fillStyle = `rgba(${c2},.12)`; ctx.fillRect(0, (i * GH) / 7, GW, GH / 7); }); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = k;
  text(sk.title, GW / 2, 22, 12, `rgb(${sk.col})`); text(sk.en, GW / 2, 34, 8, '#fff');
  if (t >= WH_B - 4) sk.lines.forEach((ln, i) => { const st = i ? WH_HIT1 + 2 : WH_B - 4, n = Math.max(0, Math.min(ln.length, Math.floor((t - st) * 1.8))); if (n <= 0) return; const y = 262 + i * 17; ctx.font = `bold ${i ? 11 : 10}px "Malgun Gothic", sans-serif`; const w = ctx.measureText(ln).width + 16; ctx.fillStyle = 'rgba(0,0,0,.7)'; ctx.fillRect(GW / 2 - w / 2, y - 12, w, 16); text(ln.slice(0, n), GW / 2, y, i ? 11 : 10, i ? '#ffe066' : '#fff'); });
  ctx.restore();
}

// ===== 송리나 (MYSTIC): 국영수사과 만점 — 4초 과목별 시네마틱 5종 =====
const RN_B = 25, RN_FIRE = 75, RN_END = 100;
const RN_SKILLS = [
  { key: 'math', subj: '수학', title: '[수학] f(x) 미적분 3D 굴절 스파이크', en: 'Calculus Vector Smash', col: '138,43,226', line: '"이 극댓값 위치에서는... 너희 수비 각도가 존재할 수 없어."' },
  { key: 'kor', subj: '국어', title: '[국어] 문맥의 이해: 은유적 404 페이크', en: 'Metaphorical Context Fake', col: '210,40,40', line: '"행간의 의미를 파악하지 못했군요. 이번 문항은... 오답입니다."' },
  { key: 'eng', subj: '영어', title: '[영어] Grammar Error: 강제 문법 교정 블록', en: 'Grammar Correction Firewall', col: '255,0,255', line: '"주어와 동사의 수일치가 틀렸네요. 처음부터 다시 쓰세요."' },
  { key: 'sci', subj: '과학', title: '[과학] 촉매 반응: 아보가드로 핵융합 서브', en: 'Catalyst Chemical Serve', col: '170,90,255', line: '"아보가드로 수만큼의 반응 열량... 너희 수비진이 감당할 수 있을까?"' },
  { key: 'soc', subj: '사회', title: '[사회] 헌법 제1조: 법률적 권한 몰수', en: 'Constitutional Trial Block', col: '255,200,60', line: '"사회 계약설 위반. 당신의 공격 권한을 법률에 의거해 몰수합니다."' },
];
const RN_TAUNT = {
  start: "오늘 배구 시험의 난이도는 '불수능'입니다. 전원 탈락을 준비하세요.",
  error: ['100점 만점에 0점. 출제자의 의도를 전혀 읽지 못했군요.', '기초 교과서부터 다시 읽고 오세요. 1차원적인 오답입니다.'],
  block: '거기 때릴 확률은 미적분학상 99.8%였습니다. 너무 지루한 공식이네요.',
  miss: '쯧, 계산 변수에 체육관 습도 오차 0.01%가 있었군. 즉시 수정한다.',
  win: '전과목 만점. 여러분과의 데이터 격차는 재수를 해도 극복할 수 없습니다.',
  lose: '말도 안 돼... 채점 오류야! 이 문제는 전원 정답 처리되어야 한다고!',
};
const ELEMENTS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
const KOR_TEXT = ['나랏말ᄊᆞ미 듕귁에 달아', '문ᄍᆞᆼ와로 서르 ᄉᆞᄆᆞᆺ디 아니ᄒᆞᆯᄊᆡ', '[가] 다음 글의 중심 내용으로', '가장 적절한 것은? (2점)', '① 은유는 행간에 숨어 있다', '② 수비는 문맥을 오독했다', '③ 공은 이미 네트 뒤에 있다'];
function rnSource(c) { const P = c.caster, s = P.side === 0 ? 1 : -1; return c.sk.key === 'kor' ? { x: NET_X - s * 12, y: P.y - 34 } : { x: P.x + s * 24, y: P.y - 40 }; }
function rnPath(c) { // 3차 함수처럼 2번 직각 굴절 → 사각지대
  const P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, src = rnSource(c), [mn, mx] = T.side === 0 ? [44, 176] : [256, 388], blind = T.x - mn > mx - T.x ? mn + 6 : mx - 6, mid = NET_X + s * 40;
  return [{ x: src.x, y: src.y }, { x: mid, y: src.y }, { x: mid, y: 200 }, { x: blind, y: 200 }];
}

function updateRina() {
  const c = cine, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, t = ++c.t;
  players.forEach((p) => p.anim++);
  const [mn, mx] = T.side === 0 ? [44, 176] : [256, 388];
  if (!c.init) { c.init = true; c.x0 = P.x; c.parts = []; }
  if (t <= 15) { const q = t / 15, e = 1 - (1 - q) * (1 - q); P.y = P_GROUND_Y - e * 85; if (k === 'kor' || k === 'eng' || k === 'soc') P.x = c.x0 + (NET_X - s * 40 - c.x0) * e; }
  P.state = JUMP; P.vy = 0;
  if (t === 1) sfx('chime'); if (t === RN_B) sfx(k === 'eng' ? 'fail' : k === 'soc' ? 'bell' : 'zap', 0.6);
  if (t > RN_B - 6 && t < RN_FIRE && t % 2 === 0) { const b = rnSource(c); c.parts.push({ x: b.x + (Math.random() - 0.5) * 120, y: b.y + (Math.random() - 0.5) * 80, tx: b.x, ty: b.y, t: 22, ch: k === 'sci' ? ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)] : k === 'eng' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)] : k === 'kor' ? JAMO[Math.floor(Math.random() * JAMO.length)] : k === 'math' ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : '§' }); }
  for (const q of c.parts) { q.x += (q.tx - q.x) * 0.1; q.y += (q.ty - q.y) * 0.1; q.t--; }
  c.parts = c.parts.filter((q) => q.t > 0);
  if (t === RN_FIRE - 14) sfx('charge');
  if (t === RN_FIRE - 1) { hitStop = 4; sfx('suck'); }
  const src = rnSource(c), defense = k === 'eng';
  if (!defense && t < RN_FIRE) { ball.x = src.x; ball.y = src.y; ball.vx = 0; ball.vy = 0; ball.rot += 0.25; }
  if (t === RN_FIRE) {
    heavy(src.x, src.y, k === 'kor' ? 0.9 : 2.0); sfx('flight', 1, 0.7); P.state = JUMP; P.vy = 0;
    if (k === 'eng') { P.blockT = 150; P.blockMode = 'grammar'; popups.push({ text: '문법 교정 방화벽 6초!', x: GW / 2, y: 168, t: 50, color: '#ff4dff' }); cine = null; return; }
    if (k === 'math') { c.path = rnPath(c); c.seg = 0; return; }
    ball.x = src.x; ball.y = src.y;
    if (k === 'kor') { T.freezeT = 38; releaseBall(NET_X + s * 46, 16); popups.push({ text: '문맥 오독! 1.5초 뇌정지', x: GW / 2, y: 168, t: 50, color: '#ff5050' }); }
    if (k === 'sci') { T.mana = 0; T.slowT = 50; releaseBall(T.side === 0 ? mn : mx, 9); sfx('explode'); popups.push({ text: '촉매 반응! 상대 마나(스태미나) 0 + 2초 감속', x: GW / 2, y: 168, t: 50, color: '#c08aff' }); }
    if (k === 'soc') { // 버프 전부 몰수 + 4초 스킬 금지
      for (const f of ['fastT', 'ampT', 'jumpT', 'guardT', 'blockT', 'fwT', 'whirlT', 'sightT', 'pullT']) T[f] = 0;
      T.matrixGuard = false; T.courtGuard = false; if (CHARACTERS[T.char].skill === 'giant' || CHARACTERS[T.char].skill === 'whirl') T.skillT = 0;
      if (party && party.side === T.side) party.caster.skillT = 0;
      T.silenceT = Math.max(T.silenceT || 0, 100);
      releaseBall(Math.max(mn, Math.min(mx, T.x + (T.x - mn > mx - T.x ? -60 : 60))), 12); sfx('thud');
      popups.push({ text: '몰수 승인! 버프 전부 몰수 + 4초 스킬 금지', x: GW / 2, y: 168, t: 50, color: '#ffc83c' });
    }
    cine = null; return;
  }
  if (k === 'math' && t > RN_FIRE && c.path) { // 2번 직각 굴절
    const SEG = 6, i = Math.min(2, Math.floor((t - RN_FIRE - 1) / SEG)), q = Math.min(1, ((t - RN_FIRE) - i * SEG) / SEG), a = c.path[i], b = c.path[i + 1], px = ball.x, py = ball.y;
    ball.x = a.x + (b.x - a.x) * q; ball.y = a.y + (b.y - a.y) * q; ball.vx = ball.x - px; ball.vy = ball.y - py; ball.rot += 0.5; ball.fx = '255,140,0'; pushRibbon(px, py);
    if (q >= 1 && i < 2 && c.seg !== i + 1) { c.seg = i + 1; heavy(b.x, b.y, 1.0); sfx('snap'); }
    if (q >= 1 && i === 2) { ball.vx = s * 1.2; ball.vy = 7; ball.flight = null; ball.unblockable = false; ball.power = true; ball.fx = null; ball.ribbon = [];
      popups.push({ text: 'SOLUTION COMPLETE ✓', x: GW / 2, y: 168, t: 50, color: '#b07cff' }); cine = null; }
  }
}

function rnCam(c) {
  const t = c.t, P = c.caster, T = c.target, s = P.side === 0 ? 1 : -1, k = c.sk.key, H = CAM_HOME;
  if (!c.init) return H;
  const ly = P_GROUND_Y - 85, close = { x: P.x, y: ly - 14, z: 3.4 };
  let keys;
  if (k === 'math') keys = [[0, H], [RN_B, { x: 216, y: 140, z: 0.95, r: s * 0.04 }], [RN_B + 25, { x: (P.x + T.x) / 2, y: 130, z: 1.2 }], [RN_FIRE - 10, close], [RN_FIRE, { ...close, z: 3.8 }], [RN_FIRE + 1, H]];
  else if (k === 'kor') keys = [[0, H], [RN_B, { x: T.x - s * 20, y: T.y - 20, z: 2.0, r: s * 0.03 }], [RN_FIRE - 14, { x: T.x - s * 20, y: T.y - 20, z: 2.3 }], [RN_FIRE - 4, close], [RN_FIRE, close], [RN_FIRE + 1, H]];
  else if (k === 'eng') keys = [[0, H], [RN_B, { x: NET_X, y: 140, z: 1.3 }], [RN_FIRE - 14, { x: NET_X, y: 120, z: 1.5 }], [RN_FIRE - 4, close], [RN_FIRE, close], [RN_FIRE + 1, H]];
  else if (k === 'sci') keys = [[0, H], [RN_B, { x: P.x + s * 24, y: ly - 40, z: 2.4 }], [RN_FIRE - 14, { x: P.x + s * 24, y: ly - 40, z: 2.8, r: s * 0.05 }], [RN_FIRE - 4, close], [RN_FIRE, close], [RN_FIRE + 1, H]];
  else keys = [[0, H], [RN_B, { x: NET_X, y: 130, z: 1.15 }], [RN_FIRE - 14, { x: T.x, y: T.y - 20, z: 1.8 }], [RN_FIRE - 4, close], [RN_FIRE, close], [RN_FIRE + 1, H]];
  keys.push([RN_END, H]);
  return camKeys(t, keys);
}

function drawRinaWorld() {
  const c = cine, t = c.t, P = c.caster, T = c.target, sk = c.sk, s = P.side === 0 ? 1 : -1, key = sk.key;
  if (!c.init) return;
  const k = Math.min(1, t / 6), a1 = Math.min(1, Math.max(0, (t - 4) / 14)), src = rnSource(c);
  if (key === 'math') {
    ctx.fillStyle = `rgba(14,4,30,${0.92 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    persGrid('#8a2be2', a1 * 0.8, 200);
    const o = { x: 60, y: 250 }; ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = '#d6a8ff'; ctx.lineWidth = 2; ctx.shadowColor = '#8a2be2'; ctx.shadowBlur = 10; // 3D 축
    for (const [dx, dy, lab] of [[360, 0, 'x'], [0, -230, 'y'], [-50, 40, 'z']]) { ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + dx, o.y + dy); ctx.stroke(); neon(lab, o.x + dx * 1.04, o.y + dy * 1.04, 12, '#ffffff'); }
    ctx.restore();
    if (t >= RN_B) { // 주황 f(x) 3차 함수 곡선 + 미분식
      const pr = Math.min(1, (t - RN_B) / 25); ctx.save(); ctx.strokeStyle = '#ff8c00'; ctx.lineWidth = 3; ctx.shadowColor = '#ff8c00'; ctx.shadowBlur = 14; ctx.beginPath();
      for (let i = 0; i <= 60 * pr; i++) { const u = i / 60 * 2 - 1, x = 40 + i / 60 * 360, y = 150 - (u * u * u - 0.6 * u) * 160; ctx[i ? 'lineTo' : 'moveTo'](x, y); } ctx.stroke(); ctx.restore();
      neon("f'(x) = 3x² − 0.6 = 0", 216, 50, 14, '#ffb050'); neon('∫ f(x)dx  ·  lim Δx→0', 216, 70, 9, '#d6a8ff');
      const pth = rnPath(c); ctx.save(); ctx.strokeStyle = 'rgba(255,140,0,.6)'; ctx.setLineDash([5, 4]); ctx.lineDashOffset = -t; ctx.lineWidth = 2; ctx.beginPath(); pth.forEach((q, i) => ctx[i ? 'lineTo' : 'moveTo'](q.x, q.y)); ctx.stroke(); ctx.restore();
    }
  }
  if (key === 'kor') { // 훈민정음 결계 + 비문학 지문 홀로그램
    ctx.fillStyle = `rgba(236,224,196,${0.93 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    for (let i = 0; i < 14; i++) { const x = ((i * 53 + t * 3) % 520) - 40, y = 30 + (i * 37) % 200; ctx.save(); ctx.globalAlpha = 0.5 * a1; brushText(JAMO[(i * 7) % JAMO.length], x, y, 16, '#3a2a18'); ctx.restore(); }
    if (t >= RN_B) { const q = Math.min(1, (t - RN_B) / 10), bx = T.x - 90, by = T.y - 120;
      ctx.save(); ctx.globalAlpha = q; ctx.fillStyle = 'rgba(255,253,245,.95)'; ctx.strokeStyle = '#3a2a18'; ctx.lineWidth = 1; ctx.fillRect(bx, by, 180, 112); ctx.strokeRect(bx, by, 180, 112);
      ctx.font = '8px "Malgun Gothic", serif'; ctx.fillStyle = '#222'; ctx.textAlign = 'left'; KOR_TEXT.forEach((l, i) => ctx.fillText(l, bx + 8, by + 16 + i * 13));
      const pr = Math.min(1, (t - RN_B - 12) / 10); if (pr > 0) { ctx.strokeStyle = '#d42020'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(bx + 60, by + 82, 56 * pr, 9, 0, 0, 7); ctx.stroke(); ctx.font = 'bold 11px "Malgun Gothic", sans-serif'; ctx.fillStyle = '#d42020'; ctx.fillText('[출제 의도 오독]', bx + 96, by + 104); }
      ctx.restore(); }
  }
  if (key === 'eng') { // 네온 마젠타 알파벳 방화벽
    ctx.fillStyle = `rgba(20,0,24,${0.85 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= 8) { const h = Math.min(1, (t - 8) / 14) * 270; ctx.save(); ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      for (let col = -2; col <= 2; col++) for (let y = 276; y > 276 - h; y -= 12) { ctx.fillStyle = `rgba(255,0,255,${0.4 + ((y + col * 7 + t) % 24) / 40})`; ctx.shadowColor = '#ff00ff'; ctx.shadowBlur = 8; ctx.fillText('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[(Math.floor(y / 12) + col * 5 + Math.floor(t / 3)) % 26], NET_X + col * 9, y); }
      ctx.restore(); }
    if (t >= RN_B + 10) { const pr = Math.min(1, (t - RN_B - 10) / 8); ctx.save(); ctx.strokeStyle = '#ff2020'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(NET_X - 120, 110); ctx.lineTo(NET_X - 120 + 240 * pr, 106); ctx.stroke(); ctx.restore();
      if (pr >= 1) { text('SYNTAX ERROR:', NET_X, 92, 12, '#ff4040'); text('SUBJECT-VERB MISMATCH', NET_X, 128, 11, '#ff4040'); } }
  }
  if (key === 'sci') { // 주기율표 링 + 원자 궤도 + 보라 플라즈마
    ctx.fillStyle = `rgba(10,4,26,${0.9 * k})`; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= 6) { const q = Math.min(1, (t - 6) / 12);
      ctx.save(); ctx.translate(src.x, src.y); ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
      for (let i = 0; i < 20; i++) { const an = i / 20 * 6.28 + t * 0.06, r = 70 * q; ctx.fillStyle = 'rgba(40,10,70,.9)'; ctx.fillRect(Math.cos(an) * r - 8, Math.sin(an) * r * 0.45 - 7, 16, 13); ctx.strokeStyle = '#c08aff'; ctx.lineWidth = 0.8; ctx.strokeRect(Math.cos(an) * r - 8, Math.sin(an) * r * 0.45 - 7, 16, 13); ctx.fillStyle = '#f0e0ff'; ctx.fillText(ELEMENTS[i], Math.cos(an) * r, Math.sin(an) * r * 0.45 + 3); }
      for (let o = 0; o < 3; o++) { ctx.save(); ctx.rotate(o * 1.05 + t * 0.02); ctx.strokeStyle = 'rgba(200,160,255,.8)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(0, 0, 40 * q, 13 * q, 0, 0, 7); ctx.stroke(); const ea = t * 0.25 + o * 2; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(Math.cos(ea) * 40 * q, Math.sin(ea) * 13 * q, 2.5, 0, 7); ctx.fill(); ctx.restore(); }
      if (t >= RN_B) { const pg = ctx.createRadialGradient(0, 0, 2, 0, 0, 34); pg.addColorStop(0, 'rgba(255,240,255,1)'); pg.addColorStop(0.5, 'rgba(170,90,255,.7)'); pg.addColorStop(1, 'rgba(90,0,200,0)'); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.fill(); }
      ctx.restore(); neon('6.022 × 10²³ mol⁻¹', src.x, src.y - 50, 10, '#e0c0ff'); }
  }
  if (key === 'soc') { // 금빛 헌법전 + 정의의 저울 + 몰수 도장
    const g = ctx.createLinearGradient(0, -100, 0, 300); g.addColorStop(0, `rgba(40,26,0,${0.9 * k})`); g.addColorStop(1, `rgba(90,60,10,${0.9 * k})`); ctx.fillStyle = g; ctx.fillRect(-600, -600, 1650, 1500);
    if (t >= 6) { const q = Math.min(1, (t - 6) / 12); ctx.save(); ctx.translate(NET_X, 130); ctx.scale(q, q); ctx.globalAlpha = q;
      ctx.fillStyle = '#f6ecd0'; ctx.strokeStyle = '#c9a54a'; ctx.lineWidth = 2; ctx.shadowColor = '#ffd84d'; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(-40, -50, -80, -40); ctx.lineTo(-80, 40); ctx.quadraticCurveTo(-40, 30, 0, 40); ctx.quadraticCurveTo(40, 30, 80, 40); ctx.lineTo(80, -40); ctx.quadraticCurveTo(40, -50, 0, -40); ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0; brushText('大韓民國', -40, -10, 12, '#7a5a10'); brushText('憲法', -40, 10, 14, '#7a5a10');
      ctx.font = '7px "Malgun Gothic", serif'; ctx.fillStyle = '#5a4210'; ctx.textAlign = 'center'; ['제1조 ① 대한민국은', '민주공화국이다.', '② 모든 권력은', '국민으로부터 나온다.'].forEach((l, i) => ctx.fillText(l, 40, -18 + i * 11));
      ctx.restore(); drawScales(NET_X, 50, 0.9, Math.sin(t * 0.15) * 0.25, a1); }
    if (t >= RN_B + 8) for (let i = 0; i < 4; i++) { const q = Math.min(1, (t - RN_B - 8 - i * 5) / 6); if (q <= 0) continue; const x = T.x + Math.cos(i * 1.6) * 30 * q, y = T.y - 30 + Math.sin(i * 1.6) * 24 * q;
      ctx.save(); ctx.translate(x, y); ctx.rotate(-0.2 + i * 0.15); ctx.scale(1 + (1 - q), 1 + (1 - q)); ctx.strokeStyle = '#e0103c'; ctx.lineWidth = 2; ctx.strokeRect(-24, -9, 48, 18); ctx.fillStyle = '#e0103c'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(i % 2 ? 'MUTE' : 'ILLEGAL', 0, 4); ctx.restore(); }
  }
  for (const q of c.parts) { ctx.save(); ctx.globalAlpha = q.t / 22; ctx.font = 'bold 9px sans-serif'; ctx.fillStyle = `rgb(${sk.col})`; ctx.textAlign = 'center'; ctx.fillText(q.ch, q.x, q.y); ctx.restore(); }
  if (key !== 'eng' && t > RN_FIRE - 14 && t < RN_FIRE) chargeFX(src.x, src.y, (t - (RN_FIRE - 14)) / 14, sk.col);
  // 보랏빛 1등급 오라
  const gl = ctx.createRadialGradient(P.x, P.y - 14, 4, P.x, P.y - 14, 60); gl.addColorStop(0, 'rgba(180,100,255,.6)'); gl.addColorStop(1, 'rgba(120,40,220,0)'); ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(P.x, P.y - 14, 60, 0, 7); ctx.fill();
  drawPlayer(P); text('1등급', P.x, P.y - 52, 8, '#e0c0ff');
  if (key === 'kor' && t >= RN_B) { ctx.save(); ctx.translate((Math.random() - 0.5) * 1.5, 0); drawPlayer(T); ctx.restore(); text('???', T.x, T.y - 50, 10, '#d42020'); } else drawPlayer(T);
  if (key !== 'eng') drawBall();
}

function drawRinaUI(c) {
  const t = c.t, sk = c.sk, key = sk.key, k = Math.min(1, t / 6), dark = key === 'kor';
  if (key === 'kor' && t >= 4) hanji(0.4 * Math.min(1, t / 10));
  if (t < RN_B) { // 성적표 컷
    const q = Math.min(1, t / 6); ctx.save(); ctx.globalAlpha = q * (t > RN_B - 6 ? (RN_B - t) / 6 : 1);
    ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fillRect(GW / 2 - 110, 70, 220, 120); ctx.strokeStyle = '#8a2be2'; ctx.lineWidth = 2; ctx.strokeRect(GW / 2 - 110, 70, 220, 120);
    text('대학수학능력시험 성적통지표', GW / 2, 88, 10, '#3a1a60');
    ['국어', '수학', '영어', '사회', '과학'].forEach((sub, i) => { const x = GW / 2 - 88 + i * 44; ctx.fillStyle = sub === sk.subj ? 'rgba(138,43,226,.25)' : 'rgba(0,0,0,.05)'; ctx.fillRect(x - 18, 100, 36, 70); text(sub, x, 114, 9, '#3a1a60'); text('100', x, 140, 12, '#8a2be2'); text('1등급', x, 160, 8, '#d42020'); });
    text('송리나', GW / 2, 184, 9, '#333'); ctx.restore();
  }
  if (key === 'sci' && t >= RN_FIRE - 1 && t < RN_FIRE + 3) invertFlash();
  if (key === 'soc' && t >= RN_FIRE - 10 && t < RN_FIRE + 6) { const q = Math.min(1, (t - RN_FIRE + 10) / 4), sc = 1 + (1 - q) * 1.5; ctx.save(); ctx.translate(GW / 2, GH / 2); ctx.scale(sc, sc); ctx.rotate(-0.12); ctx.globalAlpha = q; ctx.strokeStyle = '#e0103c'; ctx.lineWidth = 4; ctx.strokeRect(-70, -24, 140, 48); ctx.fillStyle = '#e0103c'; ctx.font = 'bold 24px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('몰수 승인', 0, 9); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = k;
  text(sk.title, GW / 2, 22, 12, dark ? '#7a1010' : `rgb(${sk.col})`); text(sk.en, GW / 2, 34, 8, dark ? '#333' : '#fff'); text('MYSTIC', GW / 2, 45, 7, '#d080ff');
  if (t >= RN_B) { const ln = sk.line, n = Math.max(0, Math.min(ln.length, Math.floor((t - RN_B) * 1.8))); ctx.font = 'bold 11px "Malgun Gothic", sans-serif'; const w = ctx.measureText(ln).width + 16; ctx.fillStyle = 'rgba(30,0,50,.75)'; ctx.fillRect(GW / 2 - w / 2, 262, w, 17); text(ln.slice(0, n), GW / 2, 274, 11, '#fff'); }
  ctx.restore();
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
    if (k === 'pinball') jmPinPts(c); // 핀볼 경로는 여기서 미리 정함 (그리기에서 만들면 온라인 두 화면이 달라짐)
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
    if (k === 'flash') { sfx('zap'); T.blindT = 75; releaseBall(c.edge, 18); if (CHARACTERS[T.char].skill === 'cmj') cmjReact('beam', T, P); }                       // 3초 눈뽕
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

function say(p, str) { for (let i = speech.length - 1; i >= 0; i--) if (speech[i].p === p) speech.splice(i, 1); speech.push({ p, str, t: 90 }); }

// 수학쌤 도발: 블로킹 성공 / 상대 실책 / 승리
function mathTaunt(kind, p) {
  const sk = CHARACTERS[p.char].skill;
  let str = null;
  if (sk === 'math') str = MATH_TAUNT[kind];
  if (sk === 'jmw') str = JM_TAUNT[kind];
  if (sk === 'gm') str = kind === 'error' && Math.random() < 0.5 ? GM_TAUNT.win : GM_TAUNT[kind];
  if (sk === 'jjh') { const v = JJ_TAUNT[isFem(players[1 - p.side]) ? 'f' : 'm'][kind]; str = Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v; }
  if (sk === 'rina') { const v = RN_TAUNT[kind]; str = Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v; }
  const oSk = (CHARACTERS[players[1 - p.side].char] || {}).skill;
  if (sk === 'yean') { const v = (oSk === 'wh' && YEAN_VS_WH[kind] && Math.random() < 0.7) ? YEAN_VS_WH[kind] : YA_TAUNT[kind]; str = Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v; }
  if (sk === 'wh') { const v = (oSk === 'yean' && WH_VS_YEAN[kind] && Math.random() < 0.7) ? WH_VS_YEAN[kind] : WH_TAUNT[kind]; str = Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v; }
  if (sk === 'cmj') {
    const o = players[1 - p.side], vs = CM_VS[CHARACTERS[o.char].skill];
    if (vs && (kind === 'start' || kind === 'win') && vs[kind]) str = vs[kind];
    else { const v = CM_TAUNT[kind]; str = Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v; }
  }
  if (kind === 'block' && sk !== 'cmj' && CHARACTERS[players[1 - p.side].char].skill === 'cmj' && Math.random() < 0.6) cmjReact('block', players[1 - p.side], p);
  if (str) say(p, str);
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
    // 길면 두 줄로 (가운데 근처 띄어쓰기에서 자름)
    let lines = [b.str];
    if (ctx.measureText(b.str).width > 220) { const mid = b.str.length / 2; let cut = -1; for (let d = 0; d < mid; d++) { if (b.str[Math.floor(mid + d)] === ' ') { cut = Math.floor(mid + d); break; } if (b.str[Math.floor(mid - d)] === ' ') { cut = Math.floor(mid - d); break; } } if (cut > 0) lines = [b.str.slice(0, cut), b.str.slice(cut + 1)]; }
    const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 12, hh = 6 + lines.length * 11;
    const x = Math.max(4, Math.min(GW - w - 4, b.p.x - w / 2)), y = b.p.y - 78 - lines.length * 6;
    ctx.fillStyle = 'rgba(10,20,40,.85)'; ctx.beginPath(); ctx.roundRect(x, y, w, hh, 5); ctx.fill();
    ctx.strokeStyle = '#3cf0ff'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#e8fbff'; ctx.textAlign = 'left'; lines.forEach((l, i) => ctx.fillText(l, x + 6, y + 12 + i * 11));
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

// ----- 위인 강림 (이동우, 랜덤 5종 · 수묵화 연출) -----
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
  if (cine.kind === 'jjh') { drawJjhWorld(); return; }
  if (cine.kind === 'cmj') { drawCmjWorld(); return; }
  if (cine.kind === 'yean') { drawYeanWorld(); return; }
  if (cine.kind === 'rina') { drawRinaWorld(); return; }
  if (cine.kind === 'wh') { drawWhWorld(); return; }
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
// 선택 화면 위/아래: 다른 줄의 같은 칸으로
function selRow(i) { const n = NCHAR, per = Math.ceil(n / 2); return i < per ? Math.min(n - 1, i + per) : i - per; }
function updateSelect() {
  if (solo) {
    const H = players[humanSide], A = players[1 - humanSide], k = H.keys, n = NCHAR;
    players.forEach((p) => p.anim++);
    if (!H.picked) {
      if (pressed.has(k.l)) H.char = (H.char + n - 1) % n;
      if (pressed.has(k.r)) H.char = (H.char + 1) % n;
      if (pressed.has(k.u) || pressed.has(k.d)) H.char = selRow(H.char);
      if (pressed.has(k.a)) { H.picked = true; popups.push({ text: '선택!', x: H.side === 0 ? 108 : 324, y: 200, t: 20, color: H.color }); }
      return;
    }
    if (!A.picked) { // 이제 내 키로 AI 캐릭터 고르기 (-1 = 랜덤)
      if (pressed.has(k.l)) A.char = A.char <= -1 ? n - 1 : A.char - 1;
      if (pressed.has(k.r)) A.char = A.char >= n - 1 ? -1 : A.char + 1;
      if ((pressed.has(k.u) || pressed.has(k.d)) && A.char >= 0) A.char = selRow(A.char);
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
    const k = p.keys, n = NCHAR;
    if (pressed.has(k.l)) p.char = (p.char + n - 1) % n;
    if (pressed.has(k.r)) p.char = (p.char + 1) % n;
    if (pressed.has(k.u) || pressed.has(k.d)) p.char = selRow(p.char);
    if (pressed.has(k.a)) { p.picked = true; popups.push({ text: '선택!', x: bossMode ? bossPanelX(players.indexOf(p)) : duo ? duoPanelX(players.indexOf(p)) : p.side === 0 ? 108 : 324, y: 200, t: 20, color: p.color }); }
  }
  if (players.every((p) => p.picked)) {
    if (++timer >= 20) { state = 'startFadeOut'; timer = 0; }
  }
}

const powerPressed = () => pressed.has('KeyZ') || pressed.has('Enter');

function update() {
  if ((state === 'play' || state === 'slow' || state === 'fadeOut' || state === 'ready') && pressed.has('KeyM') && is308()) { /* M = 경기 중단하고 308호 엔딩 */
    winner = players[0].score >= players[1].score ? 0 : 1; players[winner].state = WIN; players[1 - winner].state = LOSE; cine = null; fade = 0; state = 'e308'; e3Start();
  }
  if (restartReq) {
    // 백스페이스 3번 → 맨 처음 타이틀 화면으로
    restartReq = false; fade = 0; cine = null; setBoss(false); setDuo(false);
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
      else if (MENU[menuIdx] === '온라인 대전') { sfx('pop'); netOpenLobby(); }
      else if (MENU[menuIdx] === '보스전') { state = 'bossMenu'; timer = 0; sfx('pop'); pressed.clear(); }
      else if (MENU[menuIdx] === '모바일 플레이 (베타)') { state = 'mobileSetup'; timer = 0; sfx('pop'); pressed.clear(); }
      else if (MENU[menuIdx] === '같이 플레이' && MOBILE.on) { sfx('pop'); popups.push({ text: '모바일은 1인용만 돼! (베타)', x: GW / 2, y: 290, t: 40, color: '#ffd84d' }); }
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
    if (cine && cine.kind === 'rina') {
      updateRina();
    } else if (cine && cine.kind === 'wh') {
      updateWh();
    } else if (cine && cine.kind === 'yean') {
      updateYean();
    } else if (cine && cine.kind === 'cmj') {
      updateCmj();
    } else if (cine && cine.kind === 'jjh') {
      updateJjh();
    } else if (cine && cine.kind === 'lite') {
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
    } else { tickLite(); if (bossMode) bossTick(); step(true); }
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
  } else if (state === 'e308') {
    if (e3) e3Update(); else state = 'over';
  } else if (state === 'over') {
    step(false);
    timer++;
    if ((timer > 70 && powerPressed()) || (timer >= 211 && !bossMode)) { // 보스전 인증서는 시간 제한 없음
      players.forEach((p) => (p.state = NORMAL));
      if (NET.on) netRematch(); else state = 'title'; // 온라인: 바로 캐릭터 선택으로 (재대결)
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
    ctx.scale(p.side === 0 || ch.faceNet ? 1 : -1, 1); /* 사진은 반전 안 되게 (faceNet이면 항상 네트 쪽을 봄) */
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
    if (!crowdBag.length) { crowdBag = CHARACTERS.slice(0, NCHAR).map((_, i) => i); for (let i = crowdBag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [crowdBag[i], crowdBag[j]] = [crowdBag[j], crowdBag[i]]; } }
    const c = crowdBag.pop(); if (!inUse.has(c)) return c;
  }
  return Math.floor(Math.random() * NCHAR);
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
  if (ch.boss) { drawBossFigure(p); return; }
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
  const row = p.mate ? 1 : 0, my = 52 + row * 12;
  if (duo) text(ch.name, p.side === 0 ? 14 + manaMax(p) * 11 : GW - 14 - manaMax(p) * 11, my + 3, 7, p.color, p.side === 0 ? 'left' : 'right');
  for (let i = 0; i < manaMax(p); i++) {
    const x = p.side === 0 ? 14 + i * 11 : GW - 14 - (manaMax(p) - 1 - i) * 11;
    ctx.beginPath(); ctx.arc(x, my, 4, 0, 7);
    ctx.fillStyle = i < p.mana ? (full && Math.floor(p.anim / 3) % 2 ? '#fff6a0' : '#ffd23f') : 'rgba(0,0,0,.25)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 1; ctx.stroke();
  }
  if (full && ch.skill && p.skillT === 0) {
    const key = duo ? '스킬키' : p.side === 0 ? 'Shift' : '5 / ;';
    text(`${key} → ${ch.skillName}!`, p.side === 0 ? 10 : GW - 10, duo ? 84 + row * 10 : 70, duo ? 8 : 9, '#fff3a0', p.side === 0 ? 'left' : 'right');
  }
}

function drawPopups() {
  for (const e of popups) {
    ctx.globalAlpha = Math.min(1, e.t / 8);
    const sz = Math.min(e.boss ? 12 : 18, (GW - 24) / (e.text.length * 0.8)), half = e.text.length * sz * 0.4; // 긴 글은 화면에 맞게 작게
    text(e.text, Math.max(half + 8, Math.min(GW - half - 8, e.x)), e.y - (30 - e.t) * 0.6, sz, e.color);
    ctx.globalAlpha = 1;
  }
}

// 캐릭터 선택 화면
function drawSelect() {
  ctx.fillStyle = 'rgba(10,20,40,.55)'; ctx.fillRect(0, 0, GW, GH);
  text('캐릭터 선택', GW / 2, 22, 17, '#fff3a0');
  // 2줄 카드 (윗줄 절반, 아랫줄 나머지)
  const n = NCHAR, per = Math.ceil(n / 2), gap = 6, CH = 48, cw = Math.min(46, (GW - 16 - gap * (per - 1)) / per);
  CHARACTERS.slice(0, NCHAR).forEach((c, i) => {
    const row = Math.floor(i / per), col = i % per, inRow = row === 0 ? per : n - per;
    const x = GW / 2 - (inRow * cw + (inRow - 1) * gap) / 2 + col * (cw + gap), y = 34 + row * (CH + 12);
    const gc = GRADE_COLOR[c.grade] || '#fff';
    ctx.fillStyle = 'rgba(255,255,255,.15)';
    ctx.beginPath(); ctx.roundRect(x, y, cw, CH, 5); ctx.fill();
    // 고른 카드는 배경을 1P 파랑 / 2P 빨강으로 칠함 (둘 다 고르면 반반)
    const on = players.filter((p) => p.char === i);
    if (on.length) {
      ctx.save();
      ctx.beginPath(); ctx.roundRect(x, y, cw, CH, 5); ctx.clip();
      on.forEach((p, j) => {
        if (duo || bossMode) { // 2대2·보스전: 고른 사람 수만큼 칸을 나눠 칠함
          const blink = p.picked && Math.floor(p.anim / 2) % 2;
          ctx.globalAlpha = blink ? 0.85 : 0.6; ctx.fillStyle = p.color;
          ctx.fillRect(x + (cw / on.length) * j, y, cw / on.length, CH); ctx.globalAlpha = 1;
          return;
        }
        const half = on.length === 2;
        const blink = p.picked && Math.floor(p.anim / 2) % 2;
        ctx.fillStyle = p.side === 0
          ? (blink ? 'rgba(120,180,255,.85)' : 'rgba(47,124,246,.6)')
          : (blink ? 'rgba(255,140,130,.85)' : 'rgba(242,70,60,.6)');
        ctx.fillRect(half && p.side === 1 ? x + cw / 2 : x, y, half ? cw / 2 : cw, CH);
      });
      ctx.restore();
    }
    ctx.strokeStyle = gc; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.roundRect(x + 1, y + 1, cw - 2, CH - 2, 4); ctx.stroke();
    const im = imgs['char' + i];
    if (im) {
      let h = CH - 16, w = h * im.width / im.height;
      if (w > cw - 6) { h *= (cw - 6) / w; w = cw - 6; } // 카드 안에 맞추기
      ctx.drawImage(im, x + cw / 2 - w / 2, y + CH - 10 - h, w, h);
    }
    text(c.name, x + cw / 2, y + CH - 3, 7);
    text(c.grade, x + cw / 2, y + 7, 5, gc);
    players.forEach((p, pi) => {
      if (p.char !== i) return;
      if (duo || bossMode) { // 2대2·보스전: 1P 2P 3P 4P (왼쪽 팀은 왼쪽 위/아래, 오른쪽 팀은 오른쪽 위/아래)
        const lab = p.ai ? 'AI' : typeof NET !== 'undefined' && NET.on && NET.side === pi ? '나' : (pi + 1) + 'P';
        text(lab, p.side === 0 ? x + 2 : x + cw - 2, pi < 2 ? y - 2 : y + CH + 8, 7, p.color, p.side === 0 ? 'left' : 'right');
        return;
      }
      text(p.ai ? 'AI' : p.side === 0 ? '1P' : '2P', p.side === 0 ? x + 2 : x + cw - 2, y - 2, 8, p.color, p.side === 0 ? 'left' : 'right');
    });
  });
  if (bossMode) { drawBossPanels(); return; }
  if (duo) { drawDuoPanels(); return; }
  // 양쪽 설명 + 큰 미리보기
  players.forEach((p) => {
    const cx = p.side === 0 ? 108 : 324;
    if (p.char < 0) { // AI 랜덤
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(cx - 98, 146, 196, 152, 8); ctx.fill();
      text('?', cx, 228, 50 + Math.sin(p.anim * 0.2) * 3, p.color);
      text('🎲 AI 캐릭터: 랜덤', cx, 170, 13, '#fff3a0');
      const H = players[humanSide];
      text(H.picked ? (H.side === 0 ? 'D/G/R/F로 골라 주기 · Z 확정' : '방향키로 골라 주기 · Enter 확정') : '안 고르면 랜덤!', cx, 274, 9, '#ddd');
      text(H.picked ? '(랜덤 그대로 확정해도 돼)' : '내 캐릭터 먼저 고르기', cx, 289, 9, '#aaa');
      return;
    }
    const c = CHARACTERS[p.char];
    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath(); ctx.roundRect(cx - 98, 146, 196, 152, 8); ctx.fill();
    ctx.save();
    ctx.translate(cx - 50, 238);
    ctx.scale(1.15, 1.15);
    const fake = { ...p, state: NORMAL, hm: 1, hw: 1, skillT: 0 };
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    drawFigure(fake);
    ctx.restore();
    const tx = cx - 10;
    text(c.name, tx, 176, 15, p.color, 'left');
    text(c.grade, tx, 160, 9, GRADE_COLOR[c.grade], 'left');
    text('특수: ' + c.skillName, tx, 196, 11, '#fff3a0', 'left');
    c.desc.forEach((d, i) => {
      // 칸을 넘으면 글자를 작게
      let fs = 9; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`;
      while (ctx.measureText(d).width > cx + 92 - tx && fs > 6) { fs -= 0.5; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`; }
      text(d, tx, 213 + i * 14, fs, '#fff', 'left');
    });
    const H = players[humanSide];
    let keys = p.side === 0 ? 'D/G/R/F 고르기 · Z 선택' : '방향키 고르기 · Enter 선택';
    if (solo && p.ai) keys = H.picked ? (H.side === 0 ? 'D/G/R/F로 골라 주기 · Z 확정' : '방향키로 골라 주기 · Enter 확정') : 'AI (내 캐릭터 먼저)';
    text(p.picked ? (p.ai ? 'AI 준비 완료!' : '준비 완료!') : keys, cx, 290, 10, p.picked ? '#7dff9a' : '#ddd');
  });
}

// 2대2 선택 화면: 4칸 (왼쪽1 왼쪽2 | 오른쪽1 오른쪽2)
function duoPanelX(i) { return [56, 272, 160, 376][i]; }
function drawDuoPanels() {
  players.forEach((p, i) => {
    const cx = duoPanelX(i), c = CHARACTERS[p.char], me = typeof NET !== 'undefined' && NET.on && NET.side === i;
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.roundRect(cx - 50, 160, 100, 140, 8); ctx.fill();
    if (me) { ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - 50, 160, 100, 140, 8); ctx.stroke(); }
    ctx.save(); ctx.translate(cx, 214); ctx.scale(0.8, 0.8);
    ctx.scale(p.side === 0 ? 1 : -1, 1);
    drawFigure({ ...p, state: NORMAL, hm: 1, hw: 1, skillT: 0 });
    ctx.restore();
    text((me ? '나 · ' : '') + (p.ai ? '🤖 AI ' + AI_LEVELS[p.aiLevel ?? aiLevel].name : (i + 1) + 'P') + ' ' + (p.side === 0 ? '왼쪽' : '오른쪽'), cx, 172, 8, p.ai ? '#9fe6b8' : p.color);
    text(c.name, cx, 252, 12, '#fff');
    text(c.grade, cx, 263, 7, GRADE_COLOR[c.grade]);
    let fs = 8; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`;
    while (ctx.measureText(c.skillName).width > 92 && fs > 5) { fs -= 0.5; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`; }
    text(c.skillName, cx, 276, fs, '#fff3a0');
    text(p.picked ? (p.ai ? 'AI 준비 완료! (랜덤)' : '준비 완료!') : '고르는 중...', cx, 292, 9, p.picked ? '#7dff9a' : '#ddd');
  });
  text('왼쪽 팀', 108, 156, 9, SIDE_COLOR[0]); text('오른쪽 팀', 324, 156, 9, SIDE_COLOR[1]);
}

function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, GW, GH);
  if (state === 'e308' && e3) { drawE308(); return; }
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
  else if (state !== 'select') { if (bossMode) drawBossWorld(); players.forEach(drawMatrixField); players.forEach(drawPlayer); drawMatrixHits(); if (bossMode) drawBossWorldTop(); }
  if (state !== 'select' && state !== 'title') drawPartyField();
  if (!isMenu() && state !== 'select' && !(cine && cine.kind === 'history' && cine.t < HIST_FIRE) && !(cine && (cine.kind === 'kim' || cine.kind === 'gm' || cine.kind === 'jmw' || cine.kind === 'jjh' || cine.kind === 'cmj' || cine.kind === 'yean' || cine.kind === 'rina' || cine.kind === 'wh'))) drawBall();
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

  if (!isMenu() && !bossMode) {
    text(players[0].score, 30, 36, 30, '#cfe3ff');
    text(players[1].score, GW - 30, 36, 30, '#ffd6d3');
  }
  if (!isMenu() && !bossMode) players.forEach(drawMana);
  if (bossMode && !isMenu()) drawBossHUD();
  if (!isMenu() && !bossMode && state !== 'over' && state !== 'select' && is308()) { ctx.fillStyle = 'rgba(20,6,20,.6)'; ctx.fillRect(GW / 2 - 52, 284, 104, 14); ctx.globalAlpha = 0.75 + Math.sin(performance.now() / 300) * 0.2; text('M = 308호 엔딩 보기', GW / 2, 294, 9, '#ffd0e0'); ctx.globalAlpha = 1; }
  drawPopups();

  if (state === 'title' || state === 'startFadeOut') {
    text('동성 배구 대전', GW / 2, 82, 36);
    // 메뉴
    MENU.forEach((m, i) => {
      const y = 114 + i * 26, on = i === menuIdx, off = MOBILE.on && m === '같이 플레이';
      ctx.fillStyle = on ? 'rgba(255,240,150,.95)' : 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.roundRect(GW / 2 - 70, y - 19, 140, 26, 8); ctx.fill();
      text(m === '모바일 플레이 (베타)' && MOBILE.on ? '📱 모바일 조작 켜짐 ✓' : m, GW / 2, y, m.length > 8 ? 13 : 16, on ? '#3a2a00' : off ? '#8a8a8a' : '#ffffff');
      if (on) text('▶', GW / 2 - 58 + Math.sin(performance.now() / 150) * 2, y, 12, '#3a2a00');
    });
    text(MOBILE.on ? '메뉴를 터치해서 고르기' : '↑↓(R/F) 고르기 · Z/Enter 선택 · 클릭·터치도 돼', GW / 2, 272, 10, '#ffffff');
    if (dictTest) { ctx.fillStyle = '#ff5050'; ctx.fillRect(GW - 4, GH - 4, 2, 2); } // 개발자용: 독재 100% 켜짐 표시 (오른쪽 아래 작은 점)
  }
  if (state === 'howto') drawHowto();
  if (state === 'side' || state === 'diff') drawSoloSetup();
  if (state === 'bossMenu' || state === 'bossDiff') drawBossMenu();
  if (state === 'mobileSetup') drawMobileSetup();

  if (fade > 0) {
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, GW, GH);
  }

  if (state === 'ready') {
    if (Math.floor(timer / 5) % 2 === 0) text('Ready?', GW / 2, 110, 30, '#fff3a0');
  } else if (state === 'startMsg' && bossMode) {
    drawBossIntro();
  } else if (state === 'startMsg') {
    const s = Math.min(1, (timer + 1) / 12);
    text('게임 시작!', GW / 2, 120, 40 * s, '#fff3a0');
  } else if (state === 'over' && bossMode) {
    drawBossResult();
  } else if (state === 'over') {
    const s = Math.min(1, (timer + 1) / 15);
    text('GAME END', GW / 2, 100, 44 * s, '#fff3a0');
    if (timer > 15) text((winner === 0 ? '왼쪽' : '오른쪽') + (duo ? ' 팀' : '') + ' 승리!', GW / 2, 132, 18);
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
  if (NET.on) { netLoop(now); last = now; acc = 0; requestAnimationFrame(loop); return; } // 온라인: 둘이 같은 프레임씩 맞춰서 진행
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

// ===== 엔딩 컷씬: 308호의 마지막 점호 (김예안 vs 김두현 경기가 끝나면 나옴) =====
// 산나비 느낌: 도트(작은 캔버스를 크게 키움) + 색수차 + 글리치 + 레터박스 + 낙엽
let e3 = null;
const E3_W = 216, E3_H = 152, E3_FLOOR = 112;
const E3_LEAF = ['#d9622b', '#e8a33a', '#b8342a', '#f2c14e', '#8c3b1f', '#c9541f'];
const E3_LS = [['.##..', '####.', '.##.#'], ['...#', '.##.', '###.', '##..'], ['####.', '....#'], ['##..', '###.', '.##.', '...#']].map((f) => { const o = []; f.forEach((r, y) => [...r].forEach((c, x) => { if (c === '#') o.push([x, y]); })); return o; }); /* 낙엽 도트 모양 (빙글빙글 4프레임) */
const E3_TALK = [
  { sp: 'y', lines: ['......308호 문 열 때마다 나던 그 거지 같은 꼬린내.', '이제... 다시는 안 나겠네.'] },
  { sp: 'd', lines: ['...미안하다, 예안아.', '빨래도 자주 하고... 냄새 안 나게 하려고 진짜 노력했는데......', '나 때문에 너까지 쫓겨나게 돼서...'] },
  { sp: 'y', two: true, glitch: true, tear: true, lines: ['......쓸데없는 소리 하지 마, 이 멍청아.', '방 넓어져서 존나 시원하다...... 시원해서 미치겠다고, 씨발......'] },
  { sp: 'd', two: true, lines: ['......고마웠어. 308호 룸메 해줘서.'] },
];
const E3_LOG = ['[ SYSTEM LOG : 기숙사 308호 / 벌점 25점 초과 ]', '[ 상태: 강제 퇴실 수속 집행 중... ]'];
const E3_BYE = ['잘 가라!!', '308호 잊지 마!', '연락해라!', '냄새는 두고 가...', '울지 마 예안아', '양말은 챙겨 가!', '보고 싶을 거다', '308호 영원하라!'];
function is308() { if (duo || (bossMode && !boss308Ready())) return false; const s = players.map((p) => (CHARACTERS[p.char] || {}).skill); return s.includes('yean') && s.includes('sock'); }
function e3Canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function e3Leaf(any) { return { x: Math.random() * (E3_W + 40) - 20, y: any ? Math.random() * E3_H : -6 - Math.random() * 30, vy: 0.25 + Math.random() * 0.3, ph: Math.random() * 7, sw: 0.3 + Math.random() * 0.5, vx: 0, big: Math.random() < 0.25, col: E3_LEAF[Math.floor(Math.random() * E3_LEAF.length)], f: Math.floor(Math.random() * 4) }; }

function e3Start() {
  const yi = players.findIndex((p) => CHARACTERS[p.char].skill === 'yean');
  const di = players.findIndex((p) => CHARACTERS[p.char].skill === 'sock'); // (보스전에선 1 - yi가 보스라서 직접 찾음)
  e3 = { t: 0, ph: 'glitch', pt: 0, yi, di: di >= 0 ? di : 1 - yi, leaves: [], rain: [], petals: [], shards: [], talk: 0, line: 0, ch: 0, hold: 0, gl: 0, sh: 0, tear: null, spr: {}, por: {}, bye: [],
    pix: e3Canvas(E3_W, E3_H), cr: e3Canvas(E3_W, E3_H), cc: e3Canvas(E3_W, E3_H) };
  for (let i = 0; i < 42; i++) e3.leaves.push(e3Leaf(true));
  for (let i = 0; i < 70; i++) e3.rain.push({ x: Math.random() * E3_W, y: Math.random() * E3_H, l: 3 + Math.random() * 4 });
  e3Sound('static');
  e3Music();
}
function e3Go(ph) { e3.ph = ph; e3.pt = 0; }
function e3End() { e3StopAudio(); e3 = null; state = 'over'; timer = 20; players.forEach((p) => { p.y = P_GROUND_Y; }); }

// ----- 소리: 고장 난 TV 지지직 + 슬픈 신스 피아노 + 빗소리 -----
function e3Sound(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx, now = a.currentTime;
    if (type === 'blip') { // 비-빅 타자기
      const o = a.createOscillator(), g = a.createGain(); o.type = 'square'; e3.bl = e3.bl === 1250 ? 1650 : 1250; o.frequency.setValueAtTime(e3.bl, now);
      g.gain.setValueAtTime(0.03, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.04); o.connect(g); g.connect(a.destination); o.start(now); o.stop(now + 0.05); return;
    }
    if (type === 'static') { // 치이이- 파직
      const len = Math.floor(a.sampleRate * 0.7), b = a.createBuffer(1, len, a.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.04 ? 1 : 0.3) * (1 - i / len);
      const n = a.createBufferSource(); n.buffer = b; const f = a.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 900; const g = a.createGain(); g.gain.value = 0.55;
      n.connect(f); f.connect(g); g.connect(a.destination); n.start(now); sfx('zap', 0.5); return;
    }
    if (type === 'shatter') { [2200, 2900, 3700].forEach((hz, i) => { const o = a.createOscillator(), g = a.createGain(); o.type = 'sine'; o.frequency.value = hz; g.gain.setValueAtTime(0.06, now + i * 0.04); g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.5); o.connect(g); g.connect(a.destination); o.start(now + i * 0.04); o.stop(now + i * 0.04 + 0.55); }); return; }
    if (type === 'off') { const o = a.createOscillator(), g = a.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(9000, now); o.frequency.exponentialRampToValueAtTime(200, now + 0.5); g.gain.setValueAtTime(0.06, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.55); o.connect(g); g.connect(a.destination); o.start(now); o.stop(now + 0.6); sfx('thud', 0.6); return; }
  } catch (err) {}
}
function e3Music() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx, now = a.currentTime + 0.5;
    const m = a.createGain(); m.gain.setValueAtTime(0, a.currentTime); m.gain.linearRampToValueAtTime(1, now + 1.5); m.connect(a.destination); e3.master = m;
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2000; lp.connect(m); // 아날로그처럼 먹먹하게
    // 빗소리
    const len = a.sampleRate * 2, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() < 0.003 ? 2.5 : 0.5);
    const rn = a.createBufferSource(); rn.buffer = buf; rn.loop = true; const rf = a.createBiquadFilter(); rf.type = 'bandpass'; rf.frequency.value = 1600; rf.Q.value = 0.4;
    const rg = a.createGain(); rg.gain.value = 0.06; rn.connect(rf); rf.connect(rg); rg.connect(m); rn.start(); e3.rainSrc = rn;
    const hz = (n) => 440 * Math.pow(2, (n - 69) / 12);
    const note = (n, t0, dur, v, type = 'triangle') => {
      const o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain(); o.type = type; o2.type = 'sine'; o.frequency.value = hz(n); o2.frequency.value = hz(n) * 1.004;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + 0.012); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
      o.connect(g); o2.connect(g); g.connect(lp); o.start(t0); o2.start(t0); o.stop(t0 + dur + 0.05); o2.stop(t0 + dur + 0.05);
    };
    // Am - F - C - G - Am - F - Em - Am (느리고 슬프게)
    const prog = [[45, [57, 60, 64, 67]], [41, [53, 57, 60, 64]], [48, [55, 60, 64, 67]], [43, [55, 59, 62, 67]], [45, [57, 60, 64, 67]], [41, [53, 57, 60, 64]], [40, [55, 59, 64, 67]], [45, [57, 60, 64, 69]]];
    const mel = [[76, 0, 74, 1.5], [72, 0, 69, 1], [67, 0, 72, 1.5], [71, 0], [76, 0, 77, 1, 76, 1.5], [72, 0, 69, 1.5], [71, 0, 67, 1], [69, 0]];
    const bar = 2.4;
    for (let k = 0; k < 20; k++) {
      const [b, arp] = prog[k % 8], t0 = now + k * bar;
      note(b, t0, bar * 1.3, 0.1, 'sine');
      arp.forEach((n, i) => { note(n, t0 + (i * bar) / 8, 1.6, 0.04); note(n + (i === 3 ? 0 : 12), t0 + bar / 2 + (i * bar) / 8, 1.3, 0.022); });
      const ml = mel[k % 8]; if (k >= 1) for (let i = 0; i < ml.length; i += 2) note(ml[i], t0 + ml[i + 1] * (bar / 2), 2.4, 0.055);
    }
  } catch (err) {}
}
function e3StopAudio() {
  try { const a = audioCtx, m = e3 && e3.master; if (!a || !m) return; m.gain.cancelScheduledValues(a.currentTime); m.gain.setValueAtTime(m.gain.value, a.currentTime); m.gain.linearRampToValueAtTime(0, a.currentTime + 0.8); const r = e3.rainSrc; setTimeout(() => { try { r && r.stop(); m.disconnect(); } catch (err) {} }, 1000); } catch (err) {}
}

// ----- 진행 -----
function e3Speed() { const e = e3; return e.ph === 'glitch' ? 0.02 : e.ph === 'float' ? 0.05 + Math.min(1, e.pt / 90) * 0.15 : e.ph === 'impact' ? (e.pt < 6 ? 0.1 : 1) : e.ph === 'bye' ? 0.8 : 0.55; }
function e3Update() {
  const e = e3; e.t++; e.pt++;
  players.forEach((p) => p.anim++);
  const sp = e3Speed();
  for (const l of e.leaves) {
    l.ph += 0.05 * sp; l.x += (Math.sin(l.ph) * l.sw + 0.15 + l.vx) * sp; l.y += l.vy * sp * (0.6 + 0.6 * Math.abs(Math.cos(l.ph))) + l.vx * 0; l.vx *= 0.96;
    if (l.y > E3_H + 6 || l.x > E3_W + 40 || l.x < -40) Object.assign(l, e3Leaf(false));
  }
  for (const r of e.rain) { r.y += 5 * sp + 0.05; r.x -= 1.1 * sp; if (r.y > E3_H) { r.y = -5; r.x = Math.random() * (E3_W + 40); } }
  for (const q of e.petals) { q.ph += 0.08 * sp; q.x += (q.vx + Math.sin(q.ph) * 0.3) * sp; q.y += q.vy * sp; q.t -= sp; }
  e.petals = e.petals.filter((q) => q.t > 0);
  for (const q of e.shards) { q.x += q.vx; q.y += q.vy; q.vy += 0.12; q.t--; }
  e.shards = e.shards.filter((q) => q.t > 0);
  for (const b of e.bye) { b.t--; b.y -= 0.25; }
  e.bye = e.bye.filter((b) => b.t > 0);
  if (e.gl > 0) e.gl--;
  e.sh *= 0.85;
  const adv = powerPressed();
  if (pressed.has('Escape')) { e3End(); return; } // Esc = 컷씬 건너뛰기
  if (e.ph === 'glitch') { if (e.pt >= 12) e3Go('float'); }
  else if (e.ph === 'float') {
    if (e.pt % 2 === 0) e.petals.push({ x: 20 + Math.random() * 176, y: E3_FLOOR - 1, vx: (Math.random() - 0.5) * 0.4, vy: -0.25 - Math.random() * 0.45, t: 150, ph: Math.random() * 7 });
    if (e.pt >= 100 || (adv && e.pt > 30)) { e3Go('talk'); e.line = 0; e.ch = 0; e.hold = 0; sfx('buzz', 0.5); }
  } else if (e.ph === 'talk') {
    const T = E3_TALK[e.talk], L = T.lines[e.line];
    if (T.glitch && Math.random() < 0.1) { e.gl = 2 + Math.floor(Math.random() * 3); }
    if (e.ch < L.length) {
      const before = Math.floor(e.ch); e.ch = Math.min(L.length, e.ch + 0.85);
      if (Math.floor(e.ch) !== before && Math.floor(e.ch) % 2 === 0 && L[Math.floor(e.ch) - 1] !== ' ' && L[Math.floor(e.ch) - 1] !== '.') e3Sound('blip');
      if (adv) e.ch = L.length;
    } else {
      e.hold++;
      const last = e.line === T.lines.length - 1;
      if (adv || e.hold > (last ? 62 : 36)) {
        e.hold = 0; e.ch = 0; e.line++;
        if (e.line >= T.lines.length) {
          e.line = T.lines.length - 1; e.ch = 999;
          if (T.tear) e3Go('tear');
          else if (++e.talk >= E3_TALK.length) e3Go('impact');
          else { e.line = 0; e.ch = 0; sfx('buzz', 0.4); }
        }
      }
    }
  } else if (e.ph === 'tear') {
    if (e.pt === 1 && e.ypos) e.tear = { x: e.ypos.x * 2 + 2, y: e.ypos.y * 2 + 14, vy: 0.1 };
    if (e.tear) { e.tear.vy = Math.min(0.9, e.tear.vy + 0.02); e.tear.y += e.tear.vy; }
    if (e.tear && e.tear.y >= E3_FLOOR * 2 - 2) { // 눈물 → 픽셀 파편으로 산산조각
      for (let i = 0; i < 18; i++) { const an = Math.random() * Math.PI * 2, v = 0.6 + Math.random() * 1.8; e.shards.push({ x: e.tear.x, y: e.tear.y, vx: Math.cos(an) * v, vy: Math.sin(an) * v - 1, t: 30 + Math.random() * 20, c: Math.random() < 0.5 ? '#bfe6ff' : '#ffffff' }); }
      e.tear = null; e3Sound('shatter'); e.gl = 6;
    }
    if (e.pt >= 90 && !e.tear) { e.talk++; e.line = 0; e.ch = 0; e3Go('talk'); }
  } else if (e.ph === 'impact') {
    if (e.pt === 1) sfx('suck');
    if (e.pt === 6) { sfx('explode'); sfx('heavy'); sfx('boom'); e.sh = 9; for (const l of e.leaves) { l.vx += (l.x - 108) / 30 * 2.5; l.vy = Math.max(l.vy, 0.4); } for (let i = 0; i < 30; i++) e.shards.push({ px: 1, x: 108, y: E3_FLOOR, vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 4, t: 40 + Math.random() * 30, c: Math.random() < 0.5 ? '#ff2a3a' : '#2a1626' }); }
    if (e.pt === 26) { sfx('thud'); e.sh = 4; }
    if (e.pt >= 110 || (adv && e.pt > 40)) { e3Go('crt'); e3Sound('off'); }
  } else if (e.ph === 'crt') { if (e.pt >= 22) e3Go('room'); }
  else if (e.ph === 'room') { if (e.pt >= 75 || (adv && e.pt > 20)) e3Go('bye'); }
  else if (e.ph === 'bye') { // 기숙사 모두의 배웅 → 둘은 언덕 너머로
    if (e.pt % 22 === 5 && e.pt < 190) { const others = CHARACTERS.slice(0, NCHAR).map((_, i) => i).filter((i) => i !== players[e.yi].char && i !== players[e.di].char); const k = Math.floor(Math.random() * others.length); e.bye.push({ text: E3_BYE[Math.floor(Math.random() * E3_BYE.length)], slot: k % 6, t: 50, y: 0 }); }
    if (e.pt >= 250 || (adv && e.pt > 60)) e3End();
  }
  pressed.clear();
}

// ----- 도트 그림 도우미 -----
function e3Pixelize(im, w, h, tint) { // 사진 → 작은 도트 (색 단계 줄이고 차갑게)
  const c = e3Canvas(w, h), g = c.getContext('2d'); g.drawImage(im, 0, 0, w, h);
  try {
    const d = g.getImageData(0, 0, w, h), a = d.data;
    for (let i = 0; i < a.length; i += 4) {
      if (a[i + 3] < 110) { a[i + 3] = 0; continue; } a[i + 3] = 255;
      for (let k = 0; k < 3; k++) a[i + k] = Math.round(a[i + k] / 40) * 40;
      a[i] = a[i] * 0.85 + tint[0]; a[i + 1] = a[i + 1] * 0.85 + tint[1]; a[i + 2] = a[i + 2] * 0.88 + tint[2];
    }
    g.putImageData(d, 0, 0);
  } catch (err) {}
  return c;
}
function e3Outline(src, col) {
  const c = e3Canvas(src.width + 2, src.height + 2), g = c.getContext('2d');
  for (const [dx, dy] of [[0, 1], [2, 1], [1, 0], [1, 2]]) g.drawImage(src, dx, dy);
  g.globalCompositeOperation = 'source-in'; g.fillStyle = col; g.fillRect(0, 0, c.width, c.height); g.globalCompositeOperation = 'source-over'; g.drawImage(src, 1, 1); return c;
}
function e3Sprite(ci, sc, col = '#05030a', tint = [0, 6, 24]) {
  const key = ci + ':' + sc + col; if (e3.spr[key]) return e3.spr[key];
  const sk = CHARACTERS[ci].skill, cine = sk === 'sock' ? ['cineKdh', 50] : sk === 'yean' ? ['cineYean', 76] : null; /* 엔딩 전용 사진은 작게 */
  const im = (cine && imgs[cine[0]]) || imgs['char' + ci], ch = CHARACTERS[ci]; if (!im) return null;
  const h = Math.max(4, Math.round((cine && imgs[cine[0]] ? cine[1] : ch.h) * sc)), w = Math.max(4, Math.round(cine && imgs[cine[0]] ? (h * im.width) / im.height : ch.w * sc));
  return (e3.spr[key] = e3Outline(e3Pixelize(im, w, h, tint), col));
}
function e3DrawSpr(x, ci, cx, by, sc, alpha = 1, flip = false, col, tint) { // 아래 가운데 기준
  const s = e3Sprite(ci, sc, col, tint); if (!s) return;
  x.save(); x.globalAlpha = alpha; x.translate(Math.round(cx), Math.round(by)); if (flip) x.scale(-1, 1); x.drawImage(s, -Math.round(s.width / 2), -s.height); x.restore();
}
function e3Ball(x, cx, cy) {
  x.fillStyle = '#05030a'; x.fillRect(cx - 4, cy - 3, 8, 6); x.fillRect(cx - 3, cy - 4, 6, 8);
  x.fillStyle = '#f4f0ff'; x.fillRect(cx - 3, cy - 2, 6, 4); x.fillRect(cx - 2, cy - 3, 4, 6);
  x.fillStyle = '#f2c14e'; x.fillRect(cx - 1, cy - 3, 1, 6); x.fillRect(cx + 1, cy - 2, 1, 4);
}
function e3Leaves(x, alpha = 1) {
  x.globalAlpha = alpha;
  for (const l of e3.leaves) {
    const f = E3_LS[(l.f + Math.floor(l.ph * 1.3)) % 4], s = l.big ? 2 : 1;
    x.fillStyle = l.col; for (const [px, py] of f) x.fillRect(Math.round(l.x) + px * s, Math.round(l.y) + py * s, s, s);
  }
  x.globalAlpha = 1;
}

// ----- 1~3막: 경기장 (멈춘 시간) -----
function e3Blob(x, cx, cy, r, col) { x.fillStyle = col; x.beginPath(); x.arc(Math.round(cx), Math.round(cy), r, 0, 7); x.fill(); }
function e3Yard(x, t) { // 기숙사 앞마당: 파스텔 노을 + 커다란 단풍나무 (산나비 느낌 도트 배경)
  const g = x.createLinearGradient(0, 0, 0, E3_FLOOR); g.addColorStop(0, '#e98fb0'); g.addColorStop(0.5, '#f6b8c4'); g.addColorStop(1, '#fbd9c2'); x.fillStyle = g; x.fillRect(0, 0, E3_W, E3_H);
  // 구름
  for (const [cx, cy, w] of [[30, 26, 30], [140, 18, 40], [196, 34, 22]]) { x.fillStyle = '#fbd0dc'; x.fillRect(cx - w / 2, cy, w, 4); x.fillRect(cx - w / 3, cy - 3, (w * 2) / 3, 3); x.fillStyle = '#fde4ea'; x.fillRect(cx - w / 3, cy - 3, w / 3, 2); }
  // 먼 분홍 나무들
  for (let i = 0; i < 12; i++) { const cx = i * 20 + (i % 2) * 6, cy = 92 - (i % 3) * 5; e3Blob(x, cx, cy, 13 + (i % 3) * 3, '#d88aa8'); e3Blob(x, cx - 3, cy - 4, 7, '#e7a2bc'); }
  x.fillStyle = '#c47896'; x.fillRect(0, 96, E3_W, E3_FLOOR - 96);
  // 기숙사 건물 (오른쪽)
  x.fillStyle = '#9a6a82'; x.fillRect(160, 38, 56, E3_FLOOR - 38); x.fillStyle = '#7a4a66'; x.fillRect(156, 34, 60, 5); x.fillStyle = '#86587a'; x.fillRect(160, 39, 56, 2);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const on = (r * 5 + c * 3) % 4 !== 0; x.fillStyle = on ? '#ffe7b0' : '#6a3e5a'; x.fillRect(165 + c * 13, 46 + r * 14, 7, 7); if (on) { x.fillStyle = '#fff4d8'; x.fillRect(165 + c * 13, 46 + r * 14, 3, 2); } }
  x.fillStyle = '#5a2e46'; x.fillRect(180, 98, 14, 14); x.fillStyle = '#fbe2c4'; x.fillRect(176, 92, 22, 5); x.fillStyle = '#5a2e46'; x.font = 'bold 5px "Malgun Gothic", sans-serif'; x.textAlign = 'center'; x.fillText('기숙사', 187, 96);
  // 커다란 단풍나무 (줄기 + 가지)
  x.fillStyle = '#4a2236'; x.fillRect(52, 50, 12, E3_FLOOR - 50); x.fillRect(48, E3_FLOOR - 8, 20, 8); x.fillStyle = '#5e2e44'; x.fillRect(55, 50, 4, E3_FLOOR - 50);
  x.fillStyle = '#4a2236'; for (let i = 0; i < 14; i++) { x.fillRect(60 + i * 2, 52 - i, 3, 3); x.fillRect(52 - i * 2, 56 - i, 3, 3); }
  x.fillStyle = '#3a1a2c'; x.fillRect(57, 74, 3, 6); // 옹이
  // 단풍잎 덩어리 (겹겹이)
  for (const [cx, cy, r, c1, c2] of [[58, 30, 26, '#c94a2e', '#e8743a'], [30, 40, 18, '#d85a32', '#f2a34a'], [88, 38, 20, '#c94a2e', '#f2a34a'], [58, 14, 16, '#e8743a', '#f6c45a'], [104, 26, 12, '#d85a32', '#f6c45a'], [16, 30, 10, '#e8743a', '#f6c45a']]) {
    e3Blob(x, cx, cy, r, c1); e3Blob(x, cx - r * 0.25, cy - r * 0.3, r * 0.65, c2);
    for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? '#f9d97a' : '#a83a26'; x.fillRect(Math.round(cx + Math.cos(i * 2.3) * r * 0.7), Math.round(cy + Math.sin(i * 1.7) * r * 0.6), 1, 1); }
  }
  // 가지에 걸린 리본 + 사직서 종이 (살랑살랑)
  for (const [bx, by, len, col] of [[34, 50, 16, '#7ab8ff'], [44, 54, 22, '#f6e05a'], [76, 52, 18, '#b48aff'], [92, 48, 14, '#ff8aa8']]) for (let i = 0; i < len; i++) { x.fillStyle = i % 4 < 2 ? col : '#ffffff'; x.fillRect(bx + Math.round(Math.sin(t * 0.05 + i * 0.3 + bx) * (i / len) * 2), by + i, 1, 1); }
  for (const [bx, by] of [[66, 58], [24, 52]]) { const sw = Math.round(Math.sin(t * 0.06 + bx) * 1.5); x.fillStyle = '#fffdf6'; x.fillRect(bx + sw, by, 6, 8); x.fillStyle = '#c01030'; x.fillRect(bx + sw + 1, by + 2, 4, 1); x.fillRect(bx + sw + 1, by + 4, 3, 1); x.fillStyle = '#5a2e46'; x.fillRect(bx + 2, by - 4, 1, 4); }
  // 짐 (퇴실 캐리어 + 308 박스)
  x.fillStyle = '#2a1626'; x.fillRect(143, E3_FLOOR - 15, 12, 15); x.fillStyle = '#3a6ab8'; x.fillRect(144, E3_FLOOR - 14, 10, 14); x.fillStyle = '#5a8ad8'; x.fillRect(145, E3_FLOOR - 13, 2, 12); x.fillStyle = '#2a1626'; x.fillRect(147, E3_FLOOR - 18, 4, 1); x.fillRect(147, E3_FLOOR - 18, 1, 3); x.fillRect(150, E3_FLOOR - 18, 1, 3);
  x.fillStyle = '#2a1626'; x.fillRect(156, E3_FLOOR - 11, 13, 11); x.fillStyle = '#c89a5a'; x.fillRect(157, E3_FLOOR - 10, 11, 10); x.fillStyle = '#a87a3a'; x.fillRect(157, E3_FLOOR - 10, 11, 2); x.fillStyle = '#2a1626'; x.font = 'bold 5px monospace'; x.fillText('308', 162.5, E3_FLOOR - 2);
  // 잔디 + 흙층
  x.fillStyle = '#4fae5e'; x.fillRect(0, E3_FLOOR, E3_W, 5); x.fillStyle = '#7ad67a'; for (let i = 0; i < E3_W; i += 3) x.fillRect(i, E3_FLOOR - ((i * 7) % 5 === 0 ? 2 : 1), 1, 2); x.fillStyle = '#3e9a52'; x.fillRect(0, E3_FLOOR + 4, E3_W, 1);
  x.fillStyle = '#6a3e2e'; x.fillRect(0, E3_FLOOR + 5, E3_W, E3_H); x.fillStyle = '#58301f'; for (let i = 0; i < 30; i++) x.fillRect((i * 29) % E3_W, E3_FLOOR + 8 + ((i * 13) % 20), 3, 2); x.fillStyle = '#4a2618'; x.fillRect(0, E3_FLOOR + 16, E3_W, 1);
  // 반짝이는 금빛 먼지
  for (let i = 0; i < 16; i++) { const px = (i * 47 + t * 0.2) % E3_W, py = 20 + ((i * 31 + Math.sin(t * 0.03 + i) * 6) % 80); x.fillStyle = `rgba(255,240,180,${0.4 + 0.4 * Math.sin(t * 0.1 + i)})`; x.fillRect(Math.round(px), Math.round(py), 1, 1); }
}
function e3Scene(x) {
  const e = e3, t = e.t, Y = players[e.yi], D = players[e.di];
  e3Yard(x, t);
  const ip = e.ph === 'impact' ? e.pt : -1, hit = ip >= 6;
  // 사직서 조각 → 자줏빛 픽셀 꽃잎
  for (const q of e.petals) { const k = q.t / 150; x.fillStyle = k > 0.8 ? '#fffdf6' : ['#b04aff', '#ff4a9a', '#7a2cff', '#d86bff'][Math.floor(q.ph) % 4]; x.globalAlpha = Math.min(1, q.t / 30); x.fillRect(Math.round(q.x), Math.round(q.y), k > 0.8 ? 2 : 1, 1); }
  x.globalAlpha = 1;
  if (e.ph === 'float' || e.ph === 'glitch') { x.fillStyle = '#fffdf6'; for (let i = 0; i < 9; i++) x.fillRect(24 + i * 19 + (i % 2) * 5, E3_FLOOR + 1 + (i % 3), 3, 2); }
  // 위치: 허공에 멈춤 → 천천히 내려와 마주 섬 → 대사 → 같이 뛰어올라 공을 내리침
  const ys = Y.side === 0 ? -1 : 1, ds = -ys, SC = 0.3;
  let yx = 108 + ys * 15, dx = 108 + ds * 15, yy = E3_FLOOR, dy = E3_FLOOR, alpha = 1, bx = 108, by = 50 + Math.round(Math.sin(t * 0.05) * 1.5);
  if (e.ph === 'glitch' || e.ph === 'float') {
    const air = e.ph === 'glitch' ? 1 : e.pt < 50 ? 1 : Math.max(0, 1 - (e.pt - 50) / 45), bob = Math.sin(t * 0.05) * 1.5;
    yy = E3_FLOOR - air * (34 + bob); dy = E3_FLOOR - air * (32 - bob); yx = 108 + ys * (15 + air * 10); dx = 108 + ds * (15 + air * 10);
  }
  if (ip >= 0) {
    const up = ip < 6 ? ip / 6 : ip < 14 ? 1 : Math.max(0, 1 - (ip - 14) / 8);
    yy = E3_FLOOR - up * 36; dy = E3_FLOOR - up * 36; yx = 108 + ys * (15 - up * 8); dx = 108 + ds * (15 - up * 8);
    if (ip >= 6) { const k = Math.min(1, (ip - 6) / 5); by = 50 + (E3_FLOOR - 50) * k; }
  }
  // 두현 뒤 씁쓸한 푸른 냄새 아지랑이
  for (let i = 0; i < 18; i++) { const an = i * 0.35 + t * 0.02, r = 10 + Math.sin(t * 0.07 + i) * 2; x.fillStyle = `rgba(90,150,255,${(0.3 + 0.2 * Math.sin(t * 0.1 + i)) * alpha})`; x.fillRect(Math.round(dx + Math.cos(an) * r), Math.round(dy - 9 + Math.sin(an) * r - ((t * 0.3 + i * 5) % 10)), 1, 2); }
  // 그림자
  x.fillStyle = 'rgba(40,20,30,.35)'; for (const [cx, cy] of [[yx, yy], [dx, dy]]) { const k = Math.max(0.3, 1 - (E3_FLOOR - cy) / 50); x.fillRect(Math.round(cx - 5 * k), E3_FLOOR - 1, Math.round(10 * k), 2); }
  e3DrawSpr(x, Y.char, yx, yy, SC, alpha, false, '#2a0618');
  e3DrawSpr(x, D.char, dx, dy, SC, alpha, false, '#061a2a');
  const ys0 = e3Sprite(Y.char, SC, '#2a0618'), ds0 = e3Sprite(D.char, SC, '#061a2a');
  e.ypos = { x: yx, y: yy - (ys0 ? ys0.height : 20) }; e.dpos = { x: dx, y: dy - (ds0 ? ds0.height : 16) };
  if (!(ip >= 12)) { x.fillStyle = 'rgba(255,240,180,.35)'; x.beginPath(); x.arc(bx, by, 7, 0, 7); x.fill(); e3Ball(x, bx, Math.round(by)); }
  // 충돌: 바닥 파쇄 + 충격파 + 균열
  if (hit) {
    const q = ip - 6;
    x.fillStyle = '#2a1626'; x.fillRect(96, E3_FLOOR, 24, 4); x.fillRect(100, E3_FLOOR + 4, 16, 3);
    x.fillStyle = '#ff2a3a'; for (let i = 0; i < 6; i++) { const len = Math.min(70, q * 6) * (0.5 + (i % 3) * 0.25), dir = i % 2 ? 1 : -1; let cx = 108, cy = E3_FLOOR + 2 + (i >> 1) * 4; for (let k = 0; k < len; k += 2) { cx += dir * 2; cy += (Math.sin(k * 0.7 + i) > 0.3 ? 1 : 0) * (i % 3 === 2 ? -0.3 : 0.3); x.fillRect(Math.round(cx), Math.round(cy), 2, 1); } }
    for (let k = 0; k < 3; k++) { const r = q * 4 - k * 12; if (r > 0 && r < 140) { x.strokeStyle = `rgba(255,${k ? 255 : 60},${k ? 255 : 70},${Math.max(0, 1 - r / 140)})`; x.lineWidth = 1; x.beginPath(); x.ellipse(108, E3_FLOOR, r, r * 0.22, 0, 0, 7); x.stroke(); } }
    if (q < 6) { x.fillStyle = `rgba(255,255,255,${1 - q / 6})`; x.fillRect(104, 0, 8, E3_FLOOR); }
  }
  for (const q of e.shards) if (q.px) { x.fillStyle = q.c; x.fillRect(Math.round(q.x), Math.round(q.y), 1, 1); }
  // 슬픈 장면이라 대사·타구 때는 색을 살짝 가라앉힘
  if (e.ph === 'talk' || e.ph === 'tear') { x.fillStyle = 'rgba(40,20,60,.22)'; x.fillRect(0, 0, E3_W, E3_H); }
  if (ip >= 14) { x.fillStyle = 'rgba(30,6,20,.45)'; x.fillRect(0, 0, E3_W, E3_H); }
  // "308호 퇴실 완료" 각인 (도트 글씨)
  if (ip >= 24) {
    const q = Math.min(1, (ip - 24) / 6), sc = 1 + (1 - q) * 1.6;
    x.save(); x.translate(108, 70); x.scale(sc, sc); x.globalAlpha = q; x.textAlign = 'center'; x.font = 'bold 15px "Malgun Gothic", sans-serif';
    x.fillStyle = '#05030a'; x.fillText('[ 308 호  퇴 실  완 료 ]', 1, 1 + 5); x.fillStyle = '#ffb0b8'; x.fillText('[ 308 호  퇴 실  완 료 ]', -1, -1 + 5); x.fillStyle = '#ff2a3a'; x.fillText('[ 308 호  퇴 실  완 료 ]', 0, 5);
    x.fillStyle = '#ff2a3a'; for (let i = -100; i < 100; i += 3) { x.fillRect(i, -12, 2, 1); x.fillRect(i, 18, 2, 1); }
    x.restore();
  }
}

// ----- 4막: 텅 빈 308호 -----
function e3Room(x) {
  const e = e3, t = e.t;
  const g = x.createLinearGradient(0, 0, 0, E3_H); g.addColorStop(0, '#120d1c'); g.addColorStop(1, '#1e1628'); x.fillStyle = g; x.fillRect(0, 0, E3_W, E3_H);
  // 창문 (비 오는 밤) + 달빛
  x.fillStyle = '#3a2c3a'; x.fillRect(128, 26, 56, 44); x.fillStyle = '#0d1630'; x.fillRect(130, 28, 52, 40); x.fillStyle = '#3a2c3a'; x.fillRect(155, 28, 2, 40); x.fillRect(130, 47, 52, 2);
  x.fillStyle = 'rgba(160,190,255,.4)'; for (const r of e.rain) if (r.x > 130 && r.x < 182) x.fillRect(Math.round(r.x), 28 + Math.round(r.y % 40), 1, 2);
  x.fillStyle = 'rgba(150,180,255,.07)'; x.beginPath(); x.moveTo(130, 68); x.lineTo(182, 68); x.lineTo(150, E3_FLOOR + 22); x.lineTo(90, E3_FLOOR + 22); x.fill();
  // 문 + 308 명패
  x.fillStyle = '#2a2030'; x.fillRect(16, 42, 34, E3_FLOOR - 42); x.fillStyle = '#3a2e44'; x.fillRect(18, 44, 30, E3_FLOOR - 44); x.fillStyle = '#c8b070'; x.fillRect(42, 78, 3, 2);
  x.fillStyle = '#d8d0e0'; x.fillRect(24, 50, 18, 8); x.fillStyle = '#1a1420'; x.font = 'bold 7px monospace'; x.textAlign = 'center'; x.fillText('308', 33, 57);
  // 빈 2층 침대 (매트리스 없음)
  x.fillStyle = '#2c2236'; x.fillRect(62, 46, 2, E3_FLOOR - 46); x.fillRect(110, 46, 2, E3_FLOOR - 46); x.fillRect(62, 62, 50, 2); x.fillRect(62, 96, 50, 2); x.fillRect(62, 46, 50, 1);
  // 바닥 (나무)
  x.fillStyle = '#2a1d18'; x.fillRect(0, E3_FLOOR, E3_W, E3_H - E3_FLOOR); x.fillStyle = '#20160f'; for (let i = 0; i < 6; i++) x.fillRect(0, E3_FLOOR + 3 + i * 5, E3_W, 1);
  // 바닥에 쌓인 낙엽
  for (let i = 0; i < 12; i++) { x.fillStyle = E3_LEAF[i % 6]; x.fillRect(120 + ((i * 37) % 80), E3_FLOOR + 2 + ((i * 13) % 14), 2, 1); }
  // 페브리즈 한 통
  x.save(); x.translate(124, E3_FLOOR + 6); x.scale(2, 2); x.translate(-124, -(E3_FLOOR + 6));
  const fx = 112, fy = E3_FLOOR + 4;
  x.fillStyle = '#05030a'; x.fillRect(fx - 1, fy - 17, 10, 18); x.fillStyle = '#7fc8ff'; x.fillRect(fx, fy - 12, 8, 12); x.fillStyle = '#e8f4ff'; x.fillRect(fx + 1, fy - 9, 6, 4); x.fillStyle = '#2a5aa8'; x.fillRect(fx + 1, fy - 16, 6, 4); x.fillRect(fx - 1, fy - 15, 2, 1);
  // 김두현의 냄새나는 헌 양말
  const sx = 128, sy = E3_FLOOR + 6;
  x.fillStyle = '#05030a'; x.fillRect(sx - 1, sy - 10, 7, 12); x.fillRect(sx - 1, sy - 2, 13, 5); x.fillStyle = '#8a8690'; x.fillRect(sx, sy - 9, 5, 9); x.fillRect(sx, sy - 1, 11, 3); x.fillStyle = '#5a5660'; x.fillRect(sx, sy - 9, 5, 2); x.fillRect(sx + 9, sy - 1, 2, 3); x.fillStyle = '#05030a'; x.fillRect(sx + 6, sy, 1, 1); x.fillRect(sx + 2, sy - 4, 1, 1);
  for (let k = 0; k < 3; k++) for (let i = 0; i < 8; i++) { x.fillStyle = `rgba(127,191,90,${0.6 - i * 0.07})`; x.fillRect(sx + 1 + k * 4 + Math.round(Math.sin(t * 0.15 + i * 0.8 + k) * 1.5), sy - 12 - i * 2 - ((t * 0.2) % 2), 1, 1); }
  x.restore();
  x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, 0, E3_W, E3_H);
}

// ----- 5막: 기숙사 모두의 배웅 → 언덕 너머로 -----
const E3_PATH = [[84, 132], [70 + 26, 124 - 2], [118, 108], [138, 98], [152, 86], [168, 76], [182, 66]];
function e3PathAt(s) { const n = E3_PATH.length - 1, f = Math.max(0, Math.min(0.9999, s)) * n, i = Math.floor(f), k = f - i, a = E3_PATH[i], b = E3_PATH[i + 1]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; }
function e3Bye(x) {
  const e = e3, t = e.t, pt = e.pt;
  // 노을 하늘
  const g = x.createLinearGradient(0, 0, 0, E3_H); g.addColorStop(0, '#2a1640'); g.addColorStop(0.45, '#a8405a'); g.addColorStop(0.75, '#f08a4a'); g.addColorStop(1, '#f2c14e'); x.fillStyle = g; x.fillRect(0, 0, E3_W, E3_H);
  // 지는 해 (언덕 뒤)
  x.fillStyle = 'rgba(255,220,140,.35)'; x.fillRect(166, 44, 34, 30); x.fillStyle = '#ffd890'; x.fillRect(172, 48, 22, 22); x.fillRect(169, 51, 28, 16);
  // 줄무늬 구름
  x.fillStyle = 'rgba(255,170,150,.5)'; x.fillRect(20, 30, 50, 2); x.fillRect(34, 34, 40, 1); x.fillRect(120, 22, 46, 2);
  // 언덕 실루엣 + 길
  x.fillStyle = '#3a1a2a'; x.beginPath(); x.moveTo(40, E3_H); for (let i = 0; i <= 40; i++) { const xx = 40 + i * 4.4, yy = 66 + Math.pow(Math.abs(xx - 186) / 150, 1.6) * 80; x.lineTo(xx, Math.min(E3_H, yy)); } x.lineTo(E3_W, 70); x.lineTo(E3_W, E3_H); x.fill();
  x.fillStyle = '#c87850'; for (let i = 0; i < 60; i++) { const [px, py] = e3PathAt(i / 60), w = Math.max(1, Math.round(6 * (1 - i / 60))); x.fillRect(Math.round(px - w / 2), Math.round(py), w, 1); }
  // 언덕 위 단풍나무
  for (const [tx, ty, s] of [[150, 76, 1], [196, 70, 1.2], [126, 92, 1.3], [84, 118, 1.6]]) { x.fillStyle = '#2a1018'; x.fillRect(tx, ty - 8 * s, 1 + Math.round(s - 0.5), 8 * s); x.fillStyle = '#c9541f'; x.fillRect(tx - 4 * s, ty - 14 * s, 9 * s, 6 * s); x.fillStyle = '#e8a33a'; x.fillRect(tx - 3 * s, ty - 16 * s, 6 * s, 3 * s); }
  // 기숙사 건물 (왼쪽)
  x.fillStyle = '#2a1e30'; x.fillRect(0, 54, 52, E3_H - 54); x.fillStyle = '#3a2c40'; x.fillRect(0, 50, 54, 5);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { x.fillStyle = (r * 4 + c + Math.floor(t / 30)) % 7 === 0 ? '#ffd890' : '#f0a860'; x.fillRect(5 + c * 12, 60 + r * 13, 6, 6); }
  x.fillStyle = '#d8d0e0'; x.fillRect(12, 112 - 10, 28, 7); x.fillStyle = '#2a1e30'; x.font = 'bold 6px "Malgun Gothic", sans-serif'; x.textAlign = 'center'; x.fillText('기숙사', 26, 108);
  // 배웅하는 기숙사 모두 (나머지 캐릭터들) — 좌우로 흔들흔들
  const others = CHARACTERS.slice(0, NCHAR).map((_, i) => i).filter((i) => i !== players[e.yi].char && i !== players[e.di].char);
  others.forEach((ci, k) => { const row = k % 2, col = Math.floor(k / 2), cx = 7 + col * 12 + row * 6, by = 136 - (1 - row) * 8 + Math.round(Math.abs(Math.sin(t * 0.2 + k)) * -2);
    x.save(); x.translate(cx, by); x.rotate(Math.sin(t * 0.18 + k * 1.3) * 0.25); x.translate(-cx, -by); e3DrawSpr(x, ci, cx, by, 0.26, 1, false, '#1a0a14', [30, 10, -10]); x.restore(); });
  // 두 사람: 언덕길을 따라 걸어 올라가며 작아지다 사라짐
  const s = Math.max(0, (pt - 30) / 190), [px, py] = e3PathAt(s), sc = 0.26 * (1 - s * 0.7), fade = s > 0.88 ? Math.max(0, 1 - (s - 0.88) / 0.1) : 1, step = Math.round(Math.abs(Math.sin(t * 0.3)) * 1.5);
  const Y = players[e.yi], D = players[e.di];
  if (s < 0.99) { e3DrawSpr(x, D.char, px - 8 * (1 - s) - 1, py - step, Math.max(0.12, sc), fade, false, '#1a0a14', [30, 10, -10]); e3DrawSpr(x, Y.char, px + 8 * (1 - s) + 1, py - (step ? 0 : 1), Math.max(0.12, sc), fade, false, '#1a0a14', [30, 10, -10]); }
  // 노을빛 덮기 + 마지막 페이드
  x.fillStyle = 'rgba(255,120,60,.08)'; x.fillRect(0, 0, E3_W, E3_H);
  if (pt > 225) { x.fillStyle = `rgba(0,0,0,${Math.min(1, (pt - 225) / 25)})`; x.fillRect(0, 0, E3_W, E3_H); }
}

// ----- 화면 합성 (색수차·글리치·레터박스·UI) -----
function e3Chroma(ab) {
  const e = e3;
  for (const [cv, col] of [[e.cr, '#f00'], [e.cc, '#0ff']]) { const c = cv.getContext('2d'); c.globalCompositeOperation = 'source-over'; c.drawImage(e.pix, 0, 0); c.globalCompositeOperation = 'multiply'; c.fillStyle = col; c.fillRect(0, 0, E3_W, E3_H); c.globalCompositeOperation = 'source-over'; }
  ctx.fillStyle = '#000'; ctx.fillRect(-20, -20, GW + 40, GH + 40);
  ctx.drawImage(e.cr, -ab, 0, GW, GH);
  ctx.globalCompositeOperation = 'lighter'; ctx.drawImage(e.cc, ab, 0, GW, GH); ctx.globalCompositeOperation = 'source-over';
}
function e3Wrap(str, w) { const out = []; let cur = ''; for (const chh of str) { if (ctx.measureText(cur + chh).width > w && cur) { out.push(cur); cur = chh === ' ' ? '' : chh; } else cur += chh; } if (cur) out.push(cur); return out; }
function e3Bubble(str, hx, hy, done) { // 산나비식 말풍선 (머리 위)
  ctx.font = 'bold 9px "Malgun Gothic", sans-serif'; ctx.textAlign = 'left';
  const rows = e3Wrap(str || ' ', 196), w = Math.max(30, Math.max(...rows.map((r) => ctx.measureText(r).width)) + 14), h = rows.length * 12 + 8;
  const bx = Math.max(6, Math.min(GW - 6 - w, hx - w / 2)), by = Math.max(34, hy - 10 - h);
  ctx.fillStyle = '#2a2030'; ctx.fillRect(bx - 1, by, w + 2, h); ctx.fillRect(bx, by - 1, w, h + 2);
  ctx.fillStyle = '#fffdf8'; ctx.fillRect(bx, by, w, h);
  const tx = Math.max(bx + 6, Math.min(bx + w - 10, hx - 3)); ctx.fillStyle = '#2a2030'; ctx.fillRect(tx - 1, by + h, 8, 2); ctx.fillRect(tx + 1, by + h + 2, 4, 2); ctx.fillRect(tx + 2, by + h + 4, 2, 1);
  ctx.fillStyle = '#fffdf8'; ctx.fillRect(tx, by + h - 1, 6, 2); ctx.fillRect(tx + 2, by + h + 1, 2, 2);
  ctx.fillStyle = '#2a2030'; rows.forEach((r, i) => ctx.fillText(r, bx + 7, by + 13 + i * 12));
  if (done && Math.floor(e3.t / 6) % 2 === 0) { ctx.fillRect(bx + w - 9, by + h - 6, 5, 2); ctx.fillRect(bx + w - 8, by + h - 4, 3, 1); }
}
function e3TalkUI() {
  const e = e3, T = E3_TALK[e.talk]; if (!T) return;
  const pos = T.sp === 'y' ? e.ypos : e.dpos; if (!pos) return;
  const L = T.lines[e.line], n = e.ph === 'tear' ? L.length : Math.floor(e.ch);
  e3Bubble(L.slice(0, n), pos.x * 2, pos.y * 2, e.ph === 'talk' && n >= L.length);
  // 이름표 (작게)
  ctx.font = 'bold 7px "Malgun Gothic", sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = T.sp === 'y' ? '#ff4a9a' : '#5ab8ff';
  ctx.fillText(T.sp === 'y' ? '308호 김예안' : '308호 김두현', pos.x * 2, E3_FLOOR * 2 + 16);
  if (e.tear) { ctx.fillStyle = '#bfe6ff'; ctx.fillRect(Math.round(e.tear.x), Math.round(e.tear.y), 2, 3); ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(e.tear.x), Math.round(e.tear.y), 1, 1); }
}
function drawE308() {
  const e = e3, x = e.pix.getContext('2d');
  x.imageSmoothingEnabled = false; x.globalAlpha = 1; x.globalCompositeOperation = 'source-over';
  const ph = e.ph;
  if (ph === 'room') e3Room(x); else if (ph === 'bye') e3Bye(x); else e3Scene(x);
  e3Leaves(x, ph === 'room' ? 0.5 : 1);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (e.sh > 0.3) ctx.translate((Math.random() - 0.5) * e.sh, (Math.random() - 0.5) * e.sh);
  if (ph === 'crt') { // CRT TV 꺼지듯 한 줄로
    const q = e.pt / 22; ctx.fillStyle = '#000'; ctx.fillRect(-20, -20, GW + 40, GH + 40);
    if (q < 0.5) { const hh = Math.max(2, GH * (1 - q / 0.5)); ctx.drawImage(e.pix, 0, GH / 2 - hh / 2, GW, hh); ctx.fillStyle = `rgba(255,255,255,${(q / 0.5) * 0.9})`; ctx.fillRect(0, GH / 2 - hh / 2, GW, hh); }
    else if (q < 0.9) { const ww = GW * (1 - (q - 0.5) / 0.4); ctx.fillStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 8; ctx.fillRect(GW / 2 - ww / 2, GH / 2 - 0.5, ww, 1); ctx.shadowBlur = 0; }
    else { ctx.fillStyle = `rgba(255,255,255,${1 - (q - 0.9) / 0.1})`; ctx.fillRect(GW / 2 - 1, GH / 2 - 1, 2, 2); }
  } else {
    let ab = 0.5; if (e.gl > 0) ab = 2 + Math.random() * 2.5; if (ph === 'glitch') ab = 1 + Math.random() * 4;
    e3Chroma(ab);
    if (e.gl > 0 || ph === 'glitch') for (let i = 0; i < 5; i++) { const sy = Math.random() * GH, sh = 3 + Math.random() * 14; ctx.drawImage(e.pix, 0, sy / 2, E3_W, sh / 2, (Math.random() - 0.5) * 34, sy, GW, sh); }
    if (ph === 'glitch') for (let i = 0; i < 60; i++) { const v = Math.floor(Math.random() * 255); ctx.fillStyle = `rgba(${v},${v},${v},${0.5 * (1 - e.pt / 12)})`; ctx.fillRect(Math.floor(Math.random() * 108) * 4, Math.floor(Math.random() * 76) * 4, 4 + Math.random() * 20, 2); }
    if (e.gl > 0 && E3_TALK[e.talk] && E3_TALK[e.talk].glitch) { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,40,60,.9)'; ctx.fillRect(0, 0, GW, GH); ctx.globalCompositeOperation = 'source-over'; } // 붉은 글리치 점멸
    if (ph === 'impact') { // 흑백 네거티브 반전
      const p = e.pt, inv = (p >= 6 && p < 12) || (p >= 14 && p < 17) || (p >= 20 && p < 22);
      if (inv) { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, GW, GH); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, GW, GH); ctx.globalCompositeOperation = 'source-over'; }
      if (p === 6 || p === 7) { ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(0, 0, GW, GH); }
    }
    for (let y = 0; y < GH; y += 2) { ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(0, y, GW, 0.5); } // 주사선
    const vg = ctx.createRadialGradient(GW / 2, GH / 2, 120, GW / 2, GH / 2, 290); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, GW, GH);
    if (ph === 'room' && e.pt < 14) { ctx.fillStyle = `rgba(0,0,0,${1 - e.pt / 14})`; ctx.fillRect(0, 0, GW, GH); }
    if (ph === 'room' && e.pt > 55) { ctx.fillStyle = `rgba(0,0,0,${Math.min(1, (e.pt - 55) / 20)})`; ctx.fillRect(0, 0, GW, GH); }
    if (ph === 'bye' && e.pt < 18) { ctx.fillStyle = `rgba(0,0,0,${1 - e.pt / 18})`; ctx.fillRect(0, 0, GW, GH); }
  }
  ctx.restore();
  ctx.imageSmoothingEnabled = true;
  // 시네마틱 레터박스
  const lb = 30 * Math.min(1, e.t / 12);
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, GW, lb); ctx.fillRect(0, GH - lb, GW, lb);
  // 시스템 로그 (오른쪽 아래)
  if (ph === 'float' || ph === 'glitch') {
    ctx.font = 'bold 8px Consolas, "Malgun Gothic", monospace'; ctx.textAlign = 'right';
    let left = Math.floor(Math.max(0, e.pt - 8) * 1.4);
    E3_LOG.forEach((ln, i) => { const n = Math.min(ln.length, left); left -= ln.length; if (n <= 0) return; const s = ln.slice(0, n); const w = ctx.measureText(ln).width; ctx.fillStyle = 'rgba(5,3,10,.7)'; ctx.fillRect(GW - 14 - w - 4, 240 + i * 13 - 9, w + 8, 12); ctx.fillStyle = i ? '#ffd0d0' : '#ff5a6a'; ctx.fillText(s + (n < ln.length || Math.floor(e.t / 6) % 2 ? '█' : ' '), GW - 14, 240 + i * 13); });
  }
  if (ph === 'talk' || ph === 'tear') e3TalkUI();
  for (const q of e.shards) if (!q.px) { ctx.fillStyle = q.c; ctx.globalAlpha = Math.min(1, q.t / 20); ctx.fillRect(Math.round(q.x), Math.round(q.y), 2, 2); ctx.globalAlpha = 1; }
  if (ph === 'impact' && e.pt >= 30) { const a = Math.min(1, (e.pt - 30) / 12); ctx.globalAlpha = a; text('" 잘 가라, 나의 냄새나던 청춘 (2026) "', GW / 2, 196, 11, '#ffd0d0'); ctx.globalAlpha = 1; }
  if (ph === 'bye') {
    for (const b of e.bye) { const bx = 26 + b.slot * 20, by = 222 - 30 - (50 - b.t) * 0.5; ctx.globalAlpha = Math.min(1, b.t / 12); ctx.font = 'bold 8px "Malgun Gothic", sans-serif'; const w = ctx.measureText(b.text).width + 8; ctx.fillStyle = 'rgba(255,245,230,.92)'; ctx.fillRect(bx - w / 2, by - 9, w, 12); ctx.fillStyle = '#5a2a1a'; ctx.textAlign = 'center'; ctx.fillText(b.text, bx, by); ctx.globalAlpha = 1; }
    if (e.pt > 150 && e.pt < 240) { ctx.globalAlpha = Math.min(1, (e.pt - 150) / 20) * Math.min(1, (240 - e.pt) / 15); text('308호, 퇴실 완료.', GW / 2, 56, 13, '#fff3e0'); ctx.globalAlpha = 1; }
  }
  if (e.t > 40 && ph !== 'crt') { ctx.globalAlpha = 0.45; text(ph === 'talk' ? 'Z/Enter 다음 · Esc 건너뛰기' : 'Esc 건너뛰기', GW - 70, GH - 12, 8, '#ffffff'); ctx.globalAlpha = 1; }
}

// =====================================================================
// ===== 온라인 대전 (v6.0, 2대2는 v6.1) — PeerJS + "똑같이 계산하기"(락스텝) =====
// 원리: 둘 다 같은 랜덤 씨앗으로 같은 게임을 각자 계산함.
//       매 프레임 서로 키 입력만 주고받고, 둘 다 도착한 프레임만 진행 → 두 화면이 항상 같음.
//       키 입력은 NET_DELAY 프레임 뒤에 적용 (0.12초) → 인터넷이 조금 느려도 끊기지 않게.
// 방장 = 왼쪽(파랑), 참가자 = 오른쪽(빨강). 각자 DRGF+Z+Shift 또는 방향키+Enter+; 아무거나 써도 됨.
// =====================================================================
const NET_VERSION = 'v7.4-' + NCHAR;
const NET_PREFIX = 'dsvb26-';      // PeerJS 방 이름 앞에 붙는 글자 (방 코드 4자리랑 합쳐짐)
const NET_DELAY = 3;               // 키 입력 지연 (프레임) — 3 = 0.12초
// 중계(TURN) 서버 (v7.2.1): 학교 와이파이처럼 직접 연결이 막힌 곳에서 이 서버를 거쳐 우회함.
// 직접 연결이 되면 안 씀. 443 포트(일반 https와 같은 길)도 있어서 학교망에서도 잘 통함. Metered 무료 20GB/월
const NET_TURN = { username: '2b3b95430428d9b29c0f90dd', credential: 'r4ocmQdoNqq1uU/k' };
const NET_ICE = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun.relay.metered.ca:80' },
  { urls: 'turn:standard.relay.metered.ca:80', ...NET_TURN },
  { urls: 'turn:standard.relay.metered.ca:80?transport=tcp', ...NET_TURN },
  { urls: 'turn:standard.relay.metered.ca:443', ...NET_TURN },
  { urls: 'turns:standard.relay.metered.ca:443?transport=tcp', ...NET_TURN },
];
function netPeerOpts() { return Object.assign({ config: { iceServers: NET_ICE } }, NET.peerOpts || {}); }
const NET_ROLES = ['l', 'r', 'u', 'd', 'a', 's', 'm', 'e']; // 왼·오·위·아래·공격·스킬·M·Esc
const NET_KEYMAP = { KeyD: 'l', ArrowLeft: 'l', KeyG: 'r', ArrowRight: 'r', KeyR: 'u', ArrowUp: 'u', KeyF: 'd', ArrowDown: 'd',
  KeyZ: 'a', Enter: 'a', ShiftLeft: 's', Numpad5: 's', KeyM: 'm', Escape: 'e' };
const nativeRandom = Math.random;
const NET = {
  ai: [], aiLv: 1, // AI가 채운 자리 번호들, AI 난이도
  // 나간 자리 AI가 이어받기 (방장만 씀): blockIn = 그 자리 입력 무시 중, accept = 이 프레임부터 다시 받음, ctl = 프레임별 '사람↔AI' 바꾸기 예약
  blockIn: {}, accept: {}, ctl: {}, ctlSent: [], rejoinQ: [], backT: 0, rejoinH: 0,
  on: false, lobby: false, picking: false, peer: null, conn: null, conns: [], host: false, side: 0, code: '', mode: 2, n: 2, delay: NET_DELAY,
  sim: 0, sendF: 0, inq: [{}, {}], maxF: [-1, -1], rng: 1, acc: 0, last: 0, stall: 0,
  ldown: new Set(), lpress: new Set(), bs: [],
  hashes: {}, peerHashes: {}, wantSnap: false, desyncs: 0, ui: null,
};

// ----- 랜덤 씨앗 (mulberry32): 둘이 같은 씨앗이면 같은 '랜덤'이 나옴 -----
function netRandom() {
  let t = (NET.rng = (NET.rng + 0x6d2b79f5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function withNetRandom(fn) { const r = Math.random; Math.random = netRandom; try { return fn(); } finally { Math.random = r; } }
// 소리·그림은 각자 화면 일이라 진짜 랜덤 사용 (같은 랜덤 순서를 망치지 않게)
const useNativeRandom = (f) => function () { const r = Math.random; Math.random = nativeRandom; try { return f.apply(this, arguments); } finally { Math.random = r; } };
sfx = useNativeRandom(sfx); e3Sound = useNativeRandom(e3Sound); e3Music = useNativeRandom(e3Music); e3StopAudio = useNativeRandom(e3StopAudio);
// 메뉴 배경에서 뛰어다니는 캐릭터도 꾸미기라서 각자 랜덤 (경기에 영향 없음)
updateCrowd = useNativeRandom(updateCrowd); makeCrowd = useNativeRandom(makeCrowd);

// ----- 키 입력 (온라인 중) -----
function netKey(e, isDown) {
  if (NET.lobby) { // 대기실: 입력창에 글자 쳐야 하니까 그대로 둠
    if (isDown && e.code === 'Escape') netCloseLobby();
    else if (isDown && NET.picking && (e.code === 'Digit1' || e.code === 'Numpad1')) netPickMode(2);
    else if (isDown && NET.picking && (e.code === 'Digit2' || e.code === 'Numpad2')) netPickMode(4);
    else if (isDown && NET.picking && (e.code === 'Digit3' || e.code === 'Numpad3')) netPickMode('boss');
    return;
  }
  if (GAME_KEYS.includes(e.code) || e.code === 'Escape') e.preventDefault();
  const c = norm(e);
  if (isDown && c === 'Backspace' && !e.repeat) { // 백스페이스 3번 = 온라인 나가기
    const now = performance.now(); NET.bs = NET.bs.filter((t) => now - t < 1000); NET.bs.push(now);
    if (NET.bs.length >= 3) { NET.bs = []; netSend({ t: 'bye' }); netEnd('온라인 대전에서 나왔어'); }
    return;
  }
  const role = NET_KEYMAP[c]; if (!role) return;
  if (isDown) { if (!NET.ldown.has(role)) NET.lpress.add(role); NET.ldown.add(role); }
  else NET.ldown.delete(role);
}
addEventListener('blur', () => NET.ldown.clear());
const netBits = (set) => NET_ROLES.reduce((b, r, i) => (set.has(r) ? b | (1 << i) : b), 0);
function netApplyBits(side, inp) { // 숫자로 받은 키 상태 → 게임이 읽는 키 이름으로 바꿔서 down/pressed에 넣기
  const k = players[side].keys, code = { l: k.l, r: k.r, u: k.u, d: k.d, a: k.a, s: k.s, m: 'KeyM', e: 'Escape' };
  NET_ROLES.forEach((r, i) => { if (inp.d & (1 << i)) down.add(code[r]); if (inp.p & (1 << i)) pressed.add(code[r]); });
}

// ----- 보내기 / 받기 -----
// 1대1: 방장 ↔ 참가자 직접 연결
// 2대2: 참가자 3명이 전부 방장한테 연결 → 방장이 받은 키 입력을 나머지한테 전달 (가운데 다리 역할)
const netAlive = (c) => c && c.open;
function netSend(m) { // 방장: 모두에게 / 참가자: 방장에게
  try {
    if (NET.host) NET.conns.forEach((e) => { if (netAlive(e.c) && !e.pending) e.c.send(m); });
    else if (netAlive(NET.conn)) NET.conn.send(m);
  } catch (err) { /* 무시 */ }
}
function netRelay(m, from) { try { NET.conns.forEach((e) => { if (e.slot !== from && netAlive(e.c) && !e.pending) e.c.send(m); }); } catch (err) { /* 무시 */ } }
const netLeftMsg = () => (NET.n === 2 ? '상대가 나갔어' : '누가 나가서 끝났어');
const netVerMsg = '게임 버전이 달라! 모두 새로고침(Ctrl+F5) 해 줘';
function netOnData(m, from) {
  if (!m || typeof m !== 'object') return;
  if (m.t === 'in') {
    if (NET.host) {
      if (NET.blockIn[from] || m.f < (NET.accept[from] || 0)) return; // AI가 대신하는 중인 자리: 무시
      m.k = from; netRelay(m, from); // 방장: 다른 사람들한테 전달
    }
    if (!NET.inq[m.k]) return;
    NET.inq[m.k][m.f] = m; NET.maxF[m.k] = Math.max(NET.maxF[m.k], m.f);
  } else if (m.t === 'hash') {
    if (NET.hashes[m.f] !== undefined) netCompare(m.f, m.h); else (NET.peerHashes[m.f] = NET.peerHashes[m.f] || []).push(m.h);
  } else if (m.t === 'resync') { // 참가자 화면이 어긋났대 → 방장 상태로 맞춰 주기
    if (NET.host) NET.wantSnap = true;
  } else if (m.t === 'away') { // 참가자가 탭을 바꿈 → AI가 대신
    if (NET.host && NET.on) netDrop(from);
  } else if (m.t === 'back') { // 참가자가 돌아옴 → 다시 사람이
    if (NET.host && NET.on) { const e = NET.conns.find((x) => x.slot === from); if (e && NET.blockIn[from] && !NET.rejoinQ.includes(e)) { e.pending = true; e.qT = performance.now(); NET.rejoinQ.push(e); } }
  } else if (m.t === 'rejoin') { // 참가자: 경기 중간에 (다시) 들어감
    if (m.ver !== NET_VERSION) { netSend({ t: 'bye', why: 'ver' }); netLobbyMsg(netVerMsg); return; }
    netRejoinStart(m);
  } else if (m.t === 'wait') { // 참가자: 방에 들어옴, 사람 모이는 중
    if (m.ver !== NET_VERSION) { netSend({ t: 'bye', why: 'ver' }); netLobbyMsg(netVerMsg); return; }
    const team = m.slot % 2 === 0 ? '왼쪽' : '오른쪽';
    if (m.kind === 'boss') { netLobbyMsg(`👑 보스 레이드 파티에 들어왔어!\n파티 ${m.k} / 3명 (방장이 시작하면 바로 출발)`); return; }
    netLobbyMsg(m.n === 2 ? '연결 성공! 시작하는 중...' : `2대2 방에 들어왔어! 나는 ${team} 팀\n모인 사람 ${m.k} / ${m.n}명\n(다 모이거나, 방장이 빈 자리를 AI로 채우면 시작)`);
  } else if (m.t === 'full') {
    NET.full = true; netLobbyMsg('그 방은 꽉 찼어 😢');
  } else if (m.t === 'hello') { // 참가자: 방장이 보낸 씨앗 받기 → 시작
    if (m.ver !== NET_VERSION) { netSend({ t: 'bye', why: 'ver' }); netLobbyMsg(netVerMsg); return; }
    NET.kind = m.kind || ''; if (m.bd !== undefined) bossDiff = m.bd;
    netStart(false, m.seed, m.slot || 1, m.n || 2, m.ai || [], m.lv ?? 1);
  } else if (m.t === 'bye') {
    if (NET.host && NET.on) { const e = NET.conns.find((x) => x.slot === from); if (e) netLost(e); return; } // 경기 중 누가 나감 → AI가 이어받음
    if (NET.host && !NET.on) { const e = NET.conns.find((x) => x.slot === from); if (e) netLost(e); if (m.why === 'ver') netLobbyMsg(netVerMsg); return; }
    if (NET.host) netSend({ t: 'bye' }); // 방장: 나머지한테도 끝났다고 알림
    netEnd(m.why === 'ver' ? netVerMsg : netLeftMsg());
  }
}

// ----- 대기실 화면 (HTML) -----
function netLobbyMsg(t) { if (NET.ui) NET.ui.querySelector('#netMsg').textContent = t; }
function netOpenLobby() {
  NET.lobby = true; down.clear(); pressed.clear();
  if (!NET.ui) {
    const d = document.createElement('div');
    const btn = 'border:0;border-radius:10px;color:#fff;cursor:pointer;font-weight:bold';
    d.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:10;font-family:"Malgun Gothic",sans-serif';
    d.innerHTML = `<div style="background:#1d2340;color:#fff;border:3px solid #ffd84d;border-radius:16px;padding:22px 26px;width:min(420px,90vw);text-align:center;box-shadow:0 10px 40px #000a">
      <div id="netTitle" style="font-size:24px;font-weight:bold;color:#ffd84d;margin-bottom:6px">🌐 온라인 대전</div>
      <div id="netModeSel">
        <div style="font-size:13px;color:#cfd6ff;margin-bottom:14px">몇 대 몇으로 할래?</div>
        <div style="display:flex;gap:10px">
          <button id="netM2" style="${btn};flex:1;padding:16px 6px;font-size:22px;background:#5aa8ff">1 대 1<div style="font-size:12px;font-weight:normal;margin-top:4px">2명 · 원래 크기</div></button>
          <button id="netM4" style="${btn};flex:1;padding:16px 6px;font-size:22px;background:#ff8a3d">2 대 2<div style="font-size:12px;font-weight:normal;margin-top:4px">4명 · 작은 캐릭터</div></button>
        </div>
        <button id="netMB" style="${btn};width:100%;margin-top:10px;padding:12px 6px;font-size:20px;background:#c2185b">👑 보스 레이드<div style="font-size:12px;font-weight:normal;margin-top:3px">최대 3명 협동 · 빈 자리는 AI</div></button>
        <div style="font-size:12px;color:#99a;margin-top:10px">키보드 1 / 2 / 3 으로도 고를 수 있어</div>
      </div>
      <div id="netMain" style="display:none">
        <div id="netDesc" style="font-size:13px;color:#cfd6ff;margin-bottom:16px"></div>
        <button id="netHost" style="${btn};width:100%;padding:12px;font-size:17px;background:#5aa8ff"></button>
        <div style="margin:14px 0 6px;font-size:13px;color:#aab">또는 친구 방 코드 입력</div>
        <div style="display:flex;gap:8px"><input id="netCode" maxlength="4" inputmode="numeric" placeholder="4자리 숫자" style="flex:1;min-width:0;padding:10px;font-size:20px;text-align:center;border-radius:10px;border:2px solid #556;background:#0e1226;color:#fff;letter-spacing:6px">
        <button id="netJoin" style="${btn};padding:10px 16px;font-size:16px;background:#ff6a5a;white-space:nowrap">참여</button></div>
        <div id="netMsg" style="min-height:42px;margin-top:14px;font-size:15px;color:#7dff9a;white-space:pre-line"></div>
        <div id="netAiBox" style="display:none;margin-top:8px;padding:10px;border-radius:10px;background:#0e1226">
          <div style="font-size:13px;color:#cfd6ff;margin-bottom:8px">사람이 다 안 모이면? 빈 자리는 <b>AI</b>로 채우기</div>
          <div style="display:flex;gap:6px;margin-bottom:8px">
            <button class="netLv" data-lv="0" style="${btn};flex:1;padding:7px;font-size:14px;background:#444a66">쉬움</button>
            <button class="netLv" data-lv="1" style="${btn};flex:1;padding:7px;font-size:14px;background:#444a66">보통</button>
            <button class="netLv" data-lv="2" style="${btn};flex:1;padding:7px;font-size:14px;background:#444a66">어려움</button>
          </div>
          <button id="netAiGo" style="${btn};width:100%;padding:10px;font-size:15px;background:#2fbf71">지금 시작 (빈 자리 AI)</button>
        </div>
        <div style="font-size:12px;color:#99a;margin-top:6px;line-height:1.6">조작: 모두 <b>DRGF+Z+Shift</b> 또는 <b>방향키+Enter+;</b> 아무거나<br>나가거나 탭을 바꾸면 AI가 이어받고, 같은 코드로 다시 들어오면 이어서 해<br>나가기: 백스페이스 3번 · 학교 와이파이에선 연결이 막힐 수도 있어</div>
        <button id="netBack" style="${btn};margin-top:12px;margin-right:6px;padding:8px 14px;font-size:14px;background:#444a66">← 모드 다시 고르기</button>
      </div>
      <button id="netClose" style="${btn};margin-top:12px;padding:8px 18px;font-size:14px;background:#444a66">닫기 (Esc)</button></div>`;
    document.body.appendChild(d); NET.ui = d;
    d.querySelector('#netM2').onclick = () => netPickMode(2);
    d.querySelector('#netM4').onclick = () => netPickMode(4);
    d.querySelector('#netMB').onclick = () => netPickMode('boss');
    d.querySelector('#netBack').onclick = netModeScreen;
    d.querySelector('#netHost').onclick = netHost;
    d.querySelector('#netJoin').onclick = () => netJoin(d.querySelector('#netCode').value.trim());
    d.querySelector('#netCode').onkeydown = (e) => { if (e.key === 'Enter') netJoin(e.target.value.trim()); };
    d.querySelector('#netClose').onclick = netCloseLobby;

    d.querySelector('#netAiGo').onclick = () => netHostGo(true);
  }
  NET.ui.style.display = 'flex';
  netModeScreen();
}
function netAiBox() { // 2대2 방장: AI 난이도 버튼 + '지금 시작' (2명 이상 모였을 때만) / 보스전: 보스 난이도
  if (!NET.ui) return;
  const box = NET.ui.querySelector('#netAiBox'), show = NET.host && NET.n === 4 && !!NET.peer && !NET.on;
  box.style.display = show ? '' : 'none'; if (!show) return;
  const lvs = box.querySelectorAll('.netLv');
  if (NET.kind === 'boss') {
    box.firstElementChild.innerHTML = '보스 난이도 고르기 · 빈 자리는 <b>AI 팀원</b>이 채움';
    const names = BOSS_DIFF.map((d) => d.name);
    lvs.forEach((b, i) => { b.textContent = names[i]; b.style.display = ''; b.style.background = i === bossDiff ? BOSS_DIFF[i].col : '#444a66'; b.onclick = () => { bossDiff = i; netAiBox(); }; });
    if (!box.querySelector('.netLv[data-lv="3"]')) { const nb = lvs[0].cloneNode(true); nb.dataset.lv = '3'; lvs[0].parentNode.appendChild(nb); return netAiBox(); }
    const k = 1 + NET.conns.filter((e) => e.open).length, go = box.querySelector('#netAiGo');
    go.disabled = false; go.style.opacity = 1;
    go.textContent = `지금 시작 (${k}명${k < 3 ? ` + AI ${3 - k}명` : ''} · ${BOSS_DIFF[bossDiff].name})`;
    return;
  }
  box.firstElementChild.innerHTML = '사람이 다 안 모이면? 빈 자리는 <b>AI</b>로 채우기';
  lvs.forEach((b, i) => { b.textContent = AI_LEVELS[i] ? AI_LEVELS[i].name : ''; b.style.display = AI_LEVELS[i] ? '' : 'none'; b.onclick = () => { NET.aiLv = i; netAiBox(); }; });
  const k = 1 + NET.conns.filter((e) => e.open).length, cols = ['#2fbf71', '#e0a800', '#ff5a4a'];
  lvs.forEach((b) => { if (AI_LEVELS[+b.dataset.lv]) b.style.background = +b.dataset.lv === NET.aiLv ? cols[NET.aiLv] : '#444a66'; });
  const go = box.querySelector('#netAiGo'), ok = k >= 2;
  go.disabled = !ok; go.style.opacity = ok ? 1 : 0.45;
  go.textContent = ok ? `지금 시작 (빈 자리 ${4 - k}명 AI · ${AI_LEVELS[NET.aiLv].name})` : '친구가 1명 이상 들어오면 시작할 수 있어';
}
function netModeScreen() { // 1대1 / 2대2 고르는 화면
  netCleanup();
  NET.picking = true; NET.kind = '';
  NET.ui.querySelector('#netModeSel').style.display = '';
  NET.ui.querySelector('#netMain').style.display = 'none';
  NET.ui.querySelector('#netTitle').textContent = '🌐 온라인 대전';
}
function netPickMode(n) {
  const boss = n === 'boss'; NET.kind = boss ? 'boss' : ''; if (boss) n = 4;
  NET.picking = false; NET.mode = n;
  const q = (s) => NET.ui.querySelector(s);
  q('#netModeSel').style.display = 'none'; q('#netMain').style.display = '';
  if (boss) {
    q('#netTitle').textContent = '👑 온라인 보스 레이드';
    q('#netDesc').textContent = '최대 3명이 같은 팀(왼쪽)으로 보스와 싸워! 한 명이 방을 만들어 코드를 알려 줘. 빈 자리는 AI 팀원이 채워.';
    q('#netHost').textContent = '방 만들기 (보스전 · 3명 모이면 시작)';
    netLobbyMsg(''); q('#netCode').value = ''; return;
  }
  q('#netTitle').textContent = n === 2 ? '🌐 온라인 1 대 1' : '🌐 온라인 2 대 2';
  q('#netDesc').textContent = n === 2 ? '둘 다 각자 컴퓨터에서 이 게임을 열고, 한 명이 방을 만들어 코드를 알려 줘!'
    : '4명이 각자 컴퓨터에서 열고, 한 명이 방을 만들어 코드를 알려 줘! 들어온 순서대로 왼쪽 → 오른쪽 → 왼쪽 → 오른쪽 팀';
  q('#netHost').textContent = n === 2 ? '방 만들기 (나는 왼쪽)' : '방 만들기 (4명 모이면 시작)';
  netLobbyMsg(''); q('#netCode').value = '';
}
function netCloseLobby() { NET.lobby = false; if (NET.ui) NET.ui.style.display = 'none'; netCleanup(); down.clear(); pressed.clear(); }
function netCleanup() {
  try { if (NET.conn) NET.conn.close(); } catch (err) { /* 무시 */ }
  NET.conns.forEach((e) => { try { e.c.close(); } catch (err) { /* 무시 */ } });
  try { if (NET.peer) NET.peer.destroy(); } catch (err) { /* 무시 */ }
  NET.conn = null; NET.peer = null; NET.conns = []; NET.host = false;
  netAiBox();
}
function netErr(e) { // 연결 에러를 쉬운 말로
  const t = e && e.type;
  if (t === 'peer-unavailable') return '그런 방이 없어! 코드를 다시 확인해 줘';
  if (t === 'network' || t === 'server-error' || t === 'socket-error' || t === 'socket-closed') return '온라인 서버에 연결을 못 했어 😢\n인터넷을 확인하고 다시 해 줘';
  if (t === 'browser-incompatible' || t === 'webrtc') return '이 브라우저에선 온라인이 안 돼. 크롬이나 엣지로 해 줘!';
  return '연결 에러 (' + t + ') — 다시 해 줘';
}
function netHost() {
  if (!window.Peer) { netLobbyMsg('온라인 기능을 못 불러왔어 😢\n인터넷 연결을 확인하고 새로고침 해 줘'); return; }
  netCleanup();
  NET.host = true; NET.n = NET.mode;
  NET.code = String(1000 + Math.floor(nativeRandom() * 9000));
  netLobbyMsg('방 만드는 중...');
  const peer = (NET.peer = new Peer(NET_PREFIX + NET.code, netPeerOpts()));
  peer.on('open', () => { netHostMsg(); netAiBox(); });
  peer.on('error', (e) => { if (e.type === 'unavailable-id') netHost(); else if (e.type !== 'peer-unavailable') netLobbyMsg(netErr(e)); });
  peer.on('connection', (c) => {
    if (NET.on) { // 경기 중: AI가 하고 있는 자리가 있으면 그 자리로 들어옴 (나갔던 자리 먼저)
      NET.conns.filter((x) => x.c.peer === c.peer || (x.pending && !x.open && performance.now() - x.t0 > 8000)).forEach((x) => { NET.conns = NET.conns.filter((y) => y !== x); NET.rejoinQ = NET.rejoinQ.filter((y) => y !== x); try { x.c.close(); } catch (err) { /* 무시 */ } }); // 같은 사람이 다시 연결 / 안 열리는 연결 정리
      const taken = (k) => NET.conns.some((e) => e.slot === k && (e.pending || !NET.blockIn[k])); // 지금 사람이 하고 있거나 누가 들어오는 중
      const free = [...Object.keys(NET.blockIn).filter((k) => NET.blockIn[k]).map(Number), ...netAiNow()].filter((k) => k !== 0 && !taken(k) && !netFixedAi(k));
      if (!free.length) { c.on('open', () => { c.send({ t: 'full' }); setTimeout(() => c.close(), 500); }); return; }
      const slot = free[0], old = NET.conns.find((x) => x.slot === slot);
      if (old) { NET.conns = NET.conns.filter((x) => x !== old); try { old.c.close(); } catch (err) { /* 무시 */ } } // 끊겼는데 아직 남아 있던 옛 연결은 정리
      const e = { c, slot, open: false, pending: true, t0: performance.now() }; NET.conns.push(e); NET.blockIn[slot] = true;
      c.on('data', (m) => netOnData(m, slot));
      c.on('close', () => netLost(e));
      c.on('error', () => netLost(e));
      c.on('open', () => { e.open = true; e.qT = performance.now(); NET.rejoinQ.push(e); });
      return;
    }
    if (NET.conns.length >= netNeed() - 1) { c.on('open', () => { c.send({ t: 'full' }); setTimeout(() => c.close(), 500); }); return; } // 꽉 참
    let slot = NET.kind === 'boss' ? 2 : 1; while (NET.conns.some((e) => e.slot === slot)) slot++; // 빈 자리 (1 = 오른쪽1, 2 = 왼쪽2, 3 = 오른쪽2 / 보스전은 2·3)
    const e = { c, slot, open: false }; NET.conns.push(e);
    c.on('data', (m) => netOnData(m, slot));
    c.on('close', () => netLost(e));
    c.on('error', () => netLost(e));
    c.on('open', () => { e.open = true; netHostCount(); });
  });
}
const netNeed = () => (NET.kind === 'boss' ? 3 : NET.n); // 사람 몇 명까지
function netHostMsg() {
  const k = 1 + NET.conns.filter((e) => e.open).length;
  if (NET.kind === 'boss') { netLobbyMsg(`방 코드: ${NET.code}\n친구한테 알려 줘! 파티 ${k} / 3명 (바로 시작해도 돼)`); return; }
  netLobbyMsg(NET.n === 2 ? `방 코드: ${NET.code}\n친구한테 이 숫자를 알려 줘! (기다리는 중...)` : `방 코드: ${NET.code}\n친구 3명한테 알려 줘! 모인 사람 ${k} / 4명`);
}
function netHostCount() { // 사람이 들어오거나 나갈 때: 모두에게 인원 알려 주고, 다 모이면 시작
  const ready = NET.conns.filter((e) => e.open), k = 1 + ready.length;
  netHostMsg(); netAiBox();
  ready.forEach((e) => e.c.send({ t: 'wait', slot: e.slot, k, n: NET.n, ver: NET_VERSION, kind: NET.kind }));
  if (k === netNeed() && !NET.on) netHostGo(false);
}
function netHostGo(fill) { // 시작! fill = 빈 자리를 AI로 채움
  if (NET.on || !NET.host) return;
  const ready = NET.conns.filter((e) => e.open);
  if (fill && ready.length < 1 && NET.kind !== 'boss') return;
  NET.conns.filter((e) => !e.open).forEach((e) => { NET.conns = NET.conns.filter((x) => x !== e); try { e.c.close(); } catch (err) { /* 무시 */ } }); // 아직 연결 중인 사람은 정리
  const used = [0, ...ready.map((e) => e.slot)], ai = [];
  for (let k = 0; k < NET.n; k++) if (!used.includes(k)) ai.push(k);
  const seed = (nativeRandom() * 4294967296) | 0;
  if (NET.kind === 'boss') NET.aiLv = 2;
  ready.forEach((e) => e.c.send({ t: 'hello', seed, ver: NET_VERSION, n: NET.n, slot: e.slot, ai, lv: NET.aiLv, kind: NET.kind, bd: bossDiff }));
  netStart(true, seed, 0, NET.n, ai, NET.aiLv);
}
function netLost(e) { // 누가 연결이 끊김
  if (!NET.conns.includes(e)) return;
  if (NET.on) { // 경기 중이면 그 자리는 AI가 이어받음 (다시 들어오면 사람이)
    NET.conns = NET.conns.filter((x) => x !== e); NET.rejoinQ = NET.rejoinQ.filter((x) => x !== e);
    try { e.c.close(); } catch (err) { /* 무시 */ }
    if (!e.pending || NET.accept[e.slot] > NET.sim) netDrop(e.slot);
    return;
  }
  NET.conns = NET.conns.filter((x) => x !== e); try { e.c.close(); } catch (err) { /* 무시 */ }
  if (NET.lobby && NET.peer) netHostCount(); // 대기 중이면 자리만 비움
}
function netJoin(code) {
  if (!/^\d{4}$/.test(code)) { netLobbyMsg('방 코드는 숫자 4자리야!'); return; }
  if (!window.Peer) { netLobbyMsg('온라인 기능을 못 불러왔어 😢\n인터넷 연결을 확인하고 새로고침 해 줘'); return; }
  netCleanup(); NET.full = false; netLobbyMsg('연결하는 중...');
  const peer = (NET.peer = new Peer(netPeerOpts()));
  peer.on('open', () => {
    const c = (NET.conn = peer.connect(NET_PREFIX + code, { reliable: true }));
    c.on('data', (m) => netOnData(m, 0));
    c.on('close', () => { if (NET.full) return; if (NET.on || NET.lobby) netEnd(NET.on ? '방장이 나가서 끝났어' : '방이 닫혔어'); });
    c.on('error', () => { if (NET.on) netEnd('연결이 끊겼어'); });
  });
  peer.on('error', (e) => netLobbyMsg(netErr(e)));
}

// ----- 나간 자리 AI가 이어받기 / 다시 들어오기 (방장이 결정 → 방장 입력에 실어서 모두 같은 프레임에 바꿈) -----
function netFixedAi(k) { return NET.kind === 'boss' && k === 1; } // 처음부터 계속 AI여야 하는 자리 (보스전 보스)
function netAiNow() { // 지금 (보낸 예약까지 포함해서) AI인 자리들
  const ai = new Set(NET.ai);
  for (const x of NET.ctlSent) for (const c of x.c) { if (c.ai) ai.add(c.k); else ai.delete(c.k); }
  return [...ai];
}
function netDrop(k) { // 방장: k번 자리를 AI로 (그 사람 입력이 끊긴 프레임부터 빈 입력으로 채움)
  if (!NET.host || !NET.on || k === 0 || NET.blockIn[k]) return;
  NET.blockIn[k] = true;
  for (const fr in NET.ctl) NET.ctl[fr] = NET.ctl[fr].filter((c) => !(c.k === k && !c.ai)); // 돌아오기 예약 취소
  NET.rejoinQ = NET.rejoinQ.filter((e) => e.slot !== k);
  const f = NET.sendF;
  for (let fr = Math.max(NET.maxF[k] + 1, NET.sim); fr < f; fr++) { const m = { t: 'in', k, f: fr, d: 0, p: 0 }; NET.inq[k][fr] = m; NET.maxF[k] = fr; netRelay(m, k); }
  if (!netAiNow().includes(k)) (NET.ctl[f] = NET.ctl[f] || []).push({ k, ai: 1 });
}
function netCanRejoin() { return !cine && ['play', 'ready', 'select', 'slow', 'fadeOut', 'over', 'startMsg', 'startFadeOut'].includes(state); }
function netDoRejoin(e, inp) { // 방장: 프레임 F부터 같이 계산, H부터 그 사람 입력 받음
  const k = e.slot, F = NET.sendF, H = F + NET.delay + 2;
  e.pending = false;
  try {
    e.c.send({ t: 'rejoin', ver: NET_VERSION, n: NET.n, slot: k, f: F, h: H, ai: netAiNow(), lv: NET.aiLv, mode: NET.kind || '', bd: bossDiff });
    for (let j = 1; j < NET.n; j++) if (j !== k) for (const fr in NET.inq[j]) if (+fr >= F) e.c.send(NET.inq[j][fr]); // 이미 받아 둔 다른 사람 입력도 전달
  } catch (err) { /* 무시 */ }
  NET.blockIn[k] = false; NET.accept[k] = H; NET.maxF[k] = H - 1;
  for (let fr = NET.sim; fr < H; fr++) if (!NET.inq[k][fr]) NET.inq[k][fr] = { t: 'in', k, f: fr, d: 0, p: 0 }; // (이 사이는 AI라 안 쓰임)
  (NET.ctl[H] = NET.ctl[H] || []).push({ k, ai: 0 });
  inp.s = netSnapshot(); NET.wantSnap = false;
}
function netRejoinStart(m) { // 참가자: 경기 중간부터 시작 (F 프레임에 방장 상태를 받아서 맞춤)
  NET.lobby = false; if (NET.ui) NET.ui.style.display = 'none';
  if (m.bd !== undefined) bossDiff = m.bd;
  Object.assign(NET, { on: true, host: false, n: m.n, side: m.slot, delay: m.n === 4 ? NET_DELAY + 1 : NET_DELAY, ai: m.ai, aiLv: m.lv, kind: m.mode || '',
    sim: m.f, sendF: m.h, stall: 0, inq: Array.from({ length: m.n }, () => ({})), maxF: Array(m.n).fill(m.f - 1), rejoinH: m.h, backT: performance.now(),
    hashes: {}, peerHashes: {}, wantSnap: false, desyncs: 0, acc: 0, last: performance.now() });
  NET.ldown.clear(); NET.lpress.clear();
  netSetMode(); netAiBox();
  cine = null; e3 = null; down.clear(); pressed.clear();
  popups.push({ text: '다시 들어왔어! 곧 이어서 해', x: GW / 2, y: 150, t: 60, color: '#7dff9a' });
}
function netApplyCtl(list) { // 모두 같은 프레임에: 사람 ↔ AI
  for (const c of list) {
    const p = players[c.k]; if (!p) continue;
    if (c.ai) { if (!NET.ai.includes(c.k)) NET.ai.push(c.k); p.ai = true; p.aiLevel = NET.aiLv; p.aiS = null; popups.push({ text: `${c.k + 1}P 나감 → AI가 이어받음!`, x: GW / 2, y: 120, t: 60, color: '#9fe6b8' }); }
    else { NET.ai = NET.ai.filter((k) => k !== c.k); p.ai = false; p.aiS = null; popups.push({ text: `${c.k + 1}P 돌아옴! 다시 사람이 해`, x: GW / 2, y: 120, t: 60, color: '#ffd84d' }); }
  }
}
function netSetMode() { if (NET.kind === 'boss') setBoss(true); else { setBoss(false); setDuo(NET.n === 4); } }
addEventListener('visibilitychange', () => { // 참가자가 탭을 바꾸면 바로 AI한테 넘김
  if (NET.on && !NET.host && document.visibilityState === 'hidden') netSend({ t: 'away' });
});

// ----- 시작 / 재대결 / 끝 -----
function netStart(host, seed, slot, n, ai = [], lv = 1) {
  NET.lobby = false; if (NET.ui) NET.ui.style.display = 'none';
  const delay = n === 4 ? NET_DELAY + 1 : NET_DELAY; // 2대2는 방장을 한 번 거쳐서 오니까 1프레임 더 여유
  Object.assign(NET, { on: true, host, n, side: slot, delay, ai, aiLv: lv, blockIn: {}, accept: {}, ctl: {}, ctlSent: [], rejoinQ: [], rejoinH: 0, backT: performance.now(), rng: seed | 0, sim: 0, sendF: delay, stall: 0,
    inq: Array.from({ length: n }, () => ({})), maxF: Array(n).fill(-1),
    hashes: {}, peerHashes: {}, wantSnap: false, desyncs: 0, acc: 0, last: performance.now() });
  NET.ldown.clear(); NET.lpress.clear();
  for (let f = 0; f < delay; f++) for (let k = 0; k < n; k++) NET.inq[k][f] = { d: 0, p: 0 }; // 처음 몇 프레임은 빈 입력
  netSetMode(); netAiBox();
  withNetRandom(netReset);
}
function netReset() { // 모두 똑같은 상태에서 출발하도록 전부 초기화 → 캐릭터 선택
  cine = null; fade = 0; dictTest = false; hitStop = 0; shake = 0; punch = 0; e3 = null; solo = false; crowd = null; crowdBag = []; menuIdx = 0; slowTick = 0; lastScorer = 0;
  players.forEach((p, i) => { p.ai = NET.ai.includes(i); p.aiLevel = p.boss ? BOSS_DIFF[bossDiff].ai : NET.aiLv; p.aiS = null; if (!p.boss) p.char = i % NCHAR; p.anim = 0; });
  newGame();
  netRematch();
  popups.length = 0; effects.length = 0; down.clear(); pressed.clear();
}
function netRematch() {
  players.forEach((p) => { p.picked = false; p.state = NORMAL; p.hm = p.boss ? BOSS_SCALE[1] : BODY; p.hw = p.boss ? BOSS_SCALE[0] : BODY; p.skillT = 0; p.shrinkT = 0; p.y = P_GROUND_Y; p.aiS = null;
    if (p.ai) { if (!p.boss) p.char = Math.floor(Math.random() * NCHAR); p.picked = true; } }); // AI 캐릭터는 랜덤 (모두 같은 씨앗이라 똑같이 나옴)
  state = 'select'; timer = 0;
}
function netEnd(msg) {
  const wasOn = NET.on; NET.on = false; netCleanup();
  if (NET.lobby) { netLobbyMsg(msg); return; }
  if (wasOn) {
    e3StopAudio(); restartReq = true; // 다음 프레임에 타이틀로
    setTimeout(() => popups.push({ text: msg, x: GW / 2, y: 280, t: 90, color: '#ffd84d' }), 120);
  }
  down.clear(); pressed.clear();
}

// ----- 한 프레임씩 맞춰서 진행 -----
function netLoop(now) {
  const STEP = 1000 / CONFIG.FPS;
  NET.acc += Math.min(200, now - NET.last); NET.last = now;
  let n = 0;
  while (NET.acc >= STEP && n < 4 && NET.on) {
    NET.acc -= STEP; n++;
    const others = NET.maxF.filter((_, k) => k !== NET.side && !NET.ai.includes(k));
    const peerMax = others.length ? Math.min(...others) : NET.sim; // 제일 느린 사람 기준 (AI 빼고)
    if (netSimStep() && peerMax - NET.sim > NET.delay + 1) netSimStep(); // 내가 뒤처졌으면 한 칸 더
    if (NET.on && NET.sendF < NET.sim + NET.delay) netSendInput();
  }
  if (NET.acc > STEP * 3) NET.acc = STEP * 3; // 기다리는 동안 시간이 쌓이지 않게
  if (NET.host && NET.on && NET.stall > 50 && NET.sim > 100) // 2초 넘게 입력이 안 오는 사람 → AI가 대신 (탭 바꿈·멈춤)
    for (let k = 1; k < NET.n; k++) if (!NET.ai.includes(k) && !NET.inq[k][NET.sim] && !NET.blockIn[k]) netDrop(k);
  if (!NET.host && NET.on && document.visibilityState === 'visible' && NET.ai.includes(NET.side) && NET.sim >= NET.rejoinH && now - NET.backT > 3000) { NET.backT = now; netSend({ t: 'back' }); } // 내 자리를 AI가 하고 있으면 → 다시 나로
  if (NET.stall > 25 * 40 && NET.on) { netSend({ t: 'bye' }); netEnd(NET.host ? '응답 없는 사람이 있어서 끝났어' : '방장 응답이 없어서 끝났어'); }
  draw();
}
function netSendInput() {
  const inp = { t: 'in', k: NET.side, f: NET.sendF, d: netBits(NET.ldown), p: netBits(NET.lpress) };
  NET.lpress.clear();
  if (NET.host) {
    if (NET.rejoinQ.length && (netCanRejoin() || (performance.now() - NET.rejoinQ[0].qT > 8000 && state !== 'e308'))) netDoRejoin(NET.rejoinQ.shift(), inp); // 연출 중이면 끝날 때까지 기다림 (8초 넘으면 그냥)
    const c = NET.ctl[NET.sendF]; if (c) { inp.c = c; delete NET.ctl[NET.sendF]; NET.ctlSent.push({ f: NET.sendF, c }); }
  }
  if (NET.host && !inp.s && NET.wantSnap && !cine && (state === 'play' || state === 'ready' || state === 'select')) { inp.s = netSnapshot(); NET.wantSnap = false; } // 어긋나면 방장 상태로 맞춤
  NET.inq[NET.side][NET.sendF] = inp; NET.sendF++;
  netSend(inp);
}
const NET_EMPTY = { d: 0, p: 0 };
function netSimStep() {
  const f = NET.sim, a0 = NET.inq[0][f];
  if (!a0) { NET.stall++; return false; }
  const aiNext = new Set(NET.ai); if (a0.c) for (const c of a0.c) { if (c.ai) aiNext.add(c.k); else aiNext.delete(c.k); }
  const all = NET.inq.map((q, k) => (aiNext.has(k) ? NET_EMPTY : q[f]));
  if (all.some((x) => !x)) { NET.stall++; return false; }
  if (NET.host) NET.ctlSent = NET.ctlSent.filter((x) => x.f > f);
  NET.stall = 0; NET.inq.forEach((q) => delete q[f]);
  const snap = all[0].s;
  if (NET.hook) NET.hook(f); // (테스트용)
  withNetRandom(() => {
    if (snap) netApplySnap(snap);
    if (a0.c) netApplyCtl(a0.c);
    down.clear(); pressed.clear();
    all.forEach((inp, k) => netApplyBits(k, inp));
    if (hitStop > 0) { hitStop--; punch *= 0.9; } else update();
  });
  if (f % 25 === 0) { // 1초마다 화면이 같은지 확인
    const h = netHash(); NET.hashes[f] = h; netSend({ t: 'hash', f, h });
    if (NET.peerHashes[f]) { NET.peerHashes[f].forEach((ph) => netCompare(f, ph)); delete NET.peerHashes[f]; }
    delete NET.hashes[f - 250];
  }
  NET.sim++;
  return true;
}
function netHash() {
  const r = (v) => (typeof v === 'number' ? Math.round(v * 1000) : v);
  const s = [ball.x, ball.y, ball.vx, ball.vy, ...players.flatMap((p) => [p.x, p.y, p.vy, p.score, p.mana, p.char]),
    state, timer, cine ? cine.kind + cine.t : '-', NET.rng, BOSS ? BOSS.hp + ':' + BOSS.sh + ':' + BOSS.partyHp + ':' + BOSS.rage + ':' + BOSS.time : '-'].map(r).join('|');
  let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) | 0;
  return h;
}
function netCompare(f, h) {
  if (NET.hashes[f] === h) return;
  NET.desyncs++;
  if (NET.host) NET.wantSnap = true; else netSend({ t: 'resync' });
}
const NET_SNAP_SKIP = ['keys', 'color', 'lagQ'];
function netSnapshot() {
  const ps = players.map((p) => { const o = {}; for (const k in p) if (!NET_SNAP_SKIP.includes(k) && typeof p[k] !== 'function' && (typeof p[k] !== 'object' || p[k] === null)) o[k] = p[k]; return o; });
  const b = {}; for (const k in ball) if (typeof ball[k] !== 'object' || ball[k] === null) b[k] = ball[k];
  return JSON.stringify({ ps, b, g: { state, timer, fade, lastScorer, winner, slowTick, hitStop, ballBoost, pinT }, rng: NET.rng, boss: BOSS, bd: bossDiff });
}
function netApplySnap(str) {
  const s = JSON.parse(str);
  s.ps.forEach((o, i) => { Object.assign(players[i], o); players[i].lagQ = []; players[i].aiS = null; });
  Object.assign(ball, s.b); ball.flight = null; ball.hero = null; ball.fx = null; ball.ribbon = []; ball.trail = [];
  ({ state, timer, fade, lastScorer, winner, slowTick, hitStop, ballBoost, pinT } = s.g);
  if (s.bd !== undefined) bossDiff = s.bd; if (bossMode) BOSS = s.boss || null;
  cine = null; NET.rng = s.rng; party = null; e3 = null;
  for (const a of [fakes, strikes, stamps, matrixHits, craters, smokes, glyphs, guardRings]) a.length = 0;
  players.forEach((p, i) => { p.ai = NET.ai.includes(i); if (p.ai) p.aiLevel = p.boss ? BOSS_DIFF[bossDiff].ai : NET.aiLv; });
}

// ----- 화면 위 온라인 표시 -----
function netDraw() {
  if (!NET.on) return;
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  const me = players[NET.side], col = me.side === 0 ? '#7fb8ff' : '#ff8a80';
  if (state === 'select') {
    const bx = me.side === 0 ? 50 : GW - 50;
    ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(bx - 46, 3, 92, 15);
    text(`🌐 나는 ${me.side === 0 ? '왼쪽' : '오른쪽'}${duo ? ' 팀' : ''}`, bx, 14, 9, col);
  } else if (state !== 'e308' && !cine && !isMenu()) {
    const y = me.y - (CHARACTERS[me.char] ? CHARACTERS[me.char].h * me.hm : 50) + 18 + Math.sin(performance.now() / 200) * 2;
    text('▼ 나', me.x, y, 9, col);
  }
  if (NET.stall > 12) { // 상대 입력이 안 오면
    ctx.fillStyle = 'rgba(0,0,0,.65)'; ctx.fillRect(GW / 2 - 90, GH / 2 - 16, 180, 28);
    text('상대 기다리는 중...' + '.'.repeat(Math.floor(performance.now() / 300) % 3), GW / 2, GH / 2 + 3, 12, '#ffd84d');
  }
}
{ const baseDraw = draw; draw = function () { baseDraw(); netDraw(); }; }

// =====================================================================
// ===== 보스전 (v7.0) — '절대 통제자' 마왕 이사장 =====
// 파티 3명(왼쪽) vs 거대 보스(오른쪽). players = [1P, 보스, 2P, 3P]
// 보스도 '선수'라서 공은 AI처럼 받아치고, 스킬 디버프(멈칫·감속·시야 차단…)도 그대로 먹힘.
// 데미지·쉴드·게이지·기믹은 전부 update() 안에서 계산 (온라인에서도 똑같이 나오게 Math.random만 씀)
// 페이즈 1~3 전부 (페이즈 2·3은 맨 끝 v7.1 구역)
// =====================================================================
let bossMode = false;
let BOSS = null;               // 보스전 상태 (HP, 쉴드, 게이지, 기믹, 기록)
let bossDiff = 0;              // 0 노멀 1 하드 2 헬 3 고트
let bossLocal = 1;             // 로컬 보스전 인원 (1 = 혼자, 2 = 둘이 한 키보드)
let bossMenuIdx = 0;
const BOSS_SCALE = [1.5, 1.9]; // 보스 판정 크기 (가로, 세로 배율)
const BOSS_DIFF = [ // 문서 '4단계 난이도' 표 (+ 파티 공격력은 플레이 시간 맞추려고 따로 조정)
  { name: '노멀', en: 'NORMAL', col: '#5fe08a', hp: 1000000, sh: 300000, atk: 1.0, pen: 1, groggy: 250, rot: 500, p3: 625, partyHp: 10, dmg: 5000, ai: 1, gaze: 625, desk: 375, ban: 750, bomb: 550, bend: 450, illu: 500, dis: 600, punish: 200, mute: 75 },
  { name: '하드', en: 'HARD', col: '#5aa8ff', hp: 3000000, sh: 800000, atk: 1.8, pen: 2, groggy: 200, rot: 300, p3: 450, partyHp: 16, dmg: 13000, ai: 2, gaze: 500, desk: 325, ban: 650, bomb: 475, bend: 400, illu: 425, dis: 525, punish: 175, mute: 65 },
  { name: '헬', en: 'HELL', col: '#ff4a4a', hp: 8000000, sh: 2000000, atk: 3.5, pen: 3, groggy: 125, rot: 200, p3: 300, partyHp: 18, dmg: 30000, ai: 2, gaze: 400, desk: 275, ban: 550, bomb: 400, bend: 325, illu: 350, dis: 450, punish: 150, mute: 55 },
  { name: '고트', en: 'GOAT', col: '#ffd23f', hp: 20000000, sh: 5000000, atk: 7.0, pen: 99, groggy: 75, rot: 125, p3: 200, partyHp: 1, dmg: 65000, ai: 2, gaze: 325, desk: 225, ban: 450, bomb: 325, bend: 275, illu: 300, dis: 375, punish: 125, mute: 45 },
];
const BOSS_TIME = 25 * 900;    // 제한 시간 15분 (페이즈 3개)
// ----- 속성 (전뇌 / 화염 / 규율 / 물리) -----
const ELEM = {
  cyber: { name: '전뇌', col: '#3cf0ff', rgb: '60,240,255', ic: '⚡' },
  pyro:  { name: '화염', col: '#ff6a2a', rgb: '255,106,42', ic: '🔥' },
  order: { name: '규율', col: '#ffd23f', rgb: '255,210,63', ic: '⚖' },
  phys:  { name: '물리', col: '#d8d8e8', rgb: '216,216,232', ic: '✊' },
};
const WEAK = { order: 'pyro', cyber: 'phys', phys: 'order', pyro: 'cyber' }; // 쉴드 X는 WEAK[X] 속성에 약함
// 캐릭터별로 쓸 수 있는 속성 (문서 '14인 요약표'). 첫 번째가 기본 속성
const CHAR_ELEM = { sock: ['order'], jmw: ['pyro', 'phys', 'cyber'], giant: ['phys'], whirl: ['phys'], gm: ['pyro', 'order', 'phys'],
  kim: ['order', 'cyber', 'phys', 'pyro'], party: ['pyro'], history: ['pyro', 'phys', 'cyber', 'order'], math: ['cyber', 'phys', 'order'],
  jjh: ['phys', 'order', 'pyro', 'cyber'], cmj: ['cyber', 'pyro', 'phys', 'order'], yean: ['pyro', 'order', 'phys'], rina: ['cyber', 'order', 'phys', 'pyro'], wh: ['cyber', 'order', 'phys'] };
// 세부 스킬별 속성 (문서 '14명 캐릭터 전체 스킬 & 세부 속성 상세표')
const SKILL_ELEM = {
  'cmj:swap': 'cyber', 'cmj:emc2': 'pyro', 'cmj:rootkit': 'cyber', 'cmj:ai': 'phys', 'cmj:time': 'order', 'cmj:bsod': 'cyber', 'cmj:bigbang': 'pyro',
  'history:ship': 'pyro', 'history:arrow': 'phys', 'history:thunder': 'cyber', 'history:hangul': 'order', 'history:gyebaek': 'phys',
  'math:rail': 'cyber', 'math:blade': 'phys', 'math:wave': 'order', 'math:fractal': 'cyber', 'math:euler': 'order',
  'kim:vote': 'order', 'kim:liberty': 'cyber', 'kim:court': 'order', 'kim:grammar': 'phys', 'kim:lincoln': 'pyro',
  'yean:rage': 'pyro', 'yean:evict': 'order', 'yean:scream': 'phys', 'yean:push': 'order', 'yean:pull': 'cyber',
  'rina:math': 'cyber', 'rina:kor': 'order', 'rina:eng': 'phys', 'rina:sci': 'pyro', 'rina:soc': 'order',
  'jmw:meteor': 'pyro', 'jmw:pinball': 'phys', 'jmw:sonic': 'cyber', 'gm:flash': 'pyro', 'gm:grade3': 'order', 'gm:feint': 'phys',
  'jjh:chivalry': 'phys', 'jjh:letter': 'pyro', 'jjh:block': 'cyber', 'wh:broadcast': 'cyber', 'wh:evict': 'order', 'wh:clap': 'phys',
  'party:party': 'pyro', 'lite:giant': 'phys', 'lite:whirl': 'phys', 'sock:sock': 'order', 'meteor:meteor': 'pyro',
};
const BOSS_TRUE = ['kim:lincoln', 'math:euler', 'history:ship', 'yean:evict', 'cmj:bigbang']; // 확정 득점 스킬 = 쉴드 무시 고정 피해
const BOSS_LINES = { // 보스 대사 (실존 인물 이름 없이)
  start: ['교칙 제1조. 랠리는 내가 허락할 때만 한다.', '훈화 말씀이 있겠습니다. 길게.', '자네들, 학생부로 따라오게.'],
  hit: ['감히 이사장실에 공을?!', '벌점 추가다!', '그 정도로는 내 결재가 안 나지.'],
  point: ['교칙 위반! 1점!', '복장 불량!', '기강이 해이하구나.'],
  gaze: ['무궁화 꽃이 피었습니다…', '움직이면 벌점이다.'],
  desk: ['책상 정렬! 출석부 투하!'],
  rage: ['무차별 계도 스파이크!!'],
  groggy: ['크윽… 내 권위가…!'],
  p2: ['학생부 출동! 지금부터 생활지도다!', '두발 검사, 실시!'], p3: ['졸업은… 내가 허락하지 않는다.', '멸망의 졸업식을 시작하지.'],
  ban: ['소지품 검사! 그건 압수다.'], mob: ['선도부, 네트를 막아라!'], mute: ['음소거!!'], punish: ['체벌… 집행.'],
  illu: ['진짜 공을 찾아보거라.'], dis: ['역사가 너희를 심판하리라!'], exec: ['벌점 100점. 즉형 집행이다.'],
};

// ----- 보스 캐릭터 등록 (선택 화면엔 안 나옴: NCHAR 뒤에 붙음) -----
const BOSS_I = CHARACTERS.length;
CHARACTERS.push({ name: '마왕 이사장', gender: 'm', grade: 'BOSS', type: 'sprite', boss: true, w: 64, h: 67, skill: null,
  skillName: '절대 통제', desc: ['절대 통제자', 'The Absolute Chairman'] });
GRADE_COLOR.BOSS = '#ff2a6a';

// ----- 도트 마왕 그리기 (48x64 칸 → 4배 캔버스) — 네트(왼쪽)를 보고 있음 -----
const BOSS_PAL = { K: '#0a0614', h: '#16121e', H: '#2a2433', s: '#e2b48e', S: '#b98563', g: '#ffd23f', G: '#b8860b', r: '#ff2a2a', R: '#8a0c18',
  w: '#f2f2f7', n: '#23284a', N: '#343b66', m: '#151933', t: '#c8102e', c: '#4b1f6e', C: '#7a3aa8', u: '#2a1a30', U: '#5b3a6a', b: '#6b3b12', B: '#8a4b1a', y: '#9a9aa8', e: '#ffe9a0', p: '#ff7ab6' };
function bossGrid(pose) {
  const W = 48, H = 64, g = Array.from({ length: H }, () => Array(W).fill(null));
  const R = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (i >= 0 && i < W && j >= 0 && j < H) g[j][i] = c; };
  const P = (x, y, c) => R(x, y, 1, 1, c);
  // 망토 (뒤)
  R(13, 21, 26, 4, 'c'); R(12, 25, 28, 30, 'c'); R(11, 40, 30, 15, 'c');
  for (let i = 0; i < 6; i++) R(11 + i * 5, 55, 3, 3 + (i % 2) * 2, 'c'); // 망토 끝 들쭉날쭉
  R(38, 24, 2, 30, 'C'); R(12, 26, 1, 28, 'C'); // 망토 안감 빛
  if (pose === 'back') {
    R(13, 20, 26, 38, 'c'); R(15, 22, 22, 33, 'C'); R(17, 24, 18, 30, 'c'); // 등 전체를 덮은 망토
    for (let i = 0; i < 6; i++) R(13 + i * 4, 58, 3, 2 + (i % 2) * 2, 'c');
    R(25, 26, 2, 22, 'U'); // 망토 주름
    R(18, 57, 5, 4, 'm'); R(27, 57, 5, 4, 'm'); R(17, 61, 7, 2, 'K'); R(26, 61, 7, 2, 'K');
    R(16, 6, 17, 16, 'h'); R(17, 5, 15, 2, 'h'); R(18, 21, 12, 2, 'S'); // 뒷머리 + 목
    R(16, 3, 17, 3, 'g'); for (const x of [17, 21, 25, 29]) R(x, 0, 2, 3, 'g'); R(16, 5, 17, 1, 'G');
    R(12, 1, 3, 2, 'u'); R(11, 2, 2, 4, 'u'); R(13, 3, 3, 3, 'u'); R(34, 1, 3, 2, 'u'); R(36, 2, 2, 4, 'u'); R(33, 3, 3, 3, 'u');
  } else {
    // 다리 + 구두 (왼쪽을 봄)
    R(18, 47, 6, 12, 'm'); R(26, 47, 6, 12, 'm'); R(23, 47, 3, 4, 'm');
    R(15, 59, 9, 3, 'K'); R(24, 59, 8, 3, 'K'); P(15, 58, 'K'); P(24, 58, 'K');
    // 양복 몸통
    R(15, 23, 20, 25, 'n'); R(14, 27, 22, 20, 'n'); R(16, 46, 18, 3, 'n');
    R(20, 23, 10, 12, 'w'); // 셔츠
    R(24, 24, 2, 2, 't'); R(23, 26, 4, 9, 't'); R(24, 35, 2, 2, 't'); // 넥타이
    for (let i = 0; i < 10; i++) { P(19 - Math.floor(i / 3), 23 + i, 'N'); P(30 + Math.floor(i / 3), 23 + i, 'N'); } // 라펠
    R(15, 30, 1, 14, 'N'); R(34, 30, 1, 14, 'N');
    // 금 메달 목걸이 (이사장 메달)
    for (let i = 0; i < 7; i++) { P(17 + i, 24 + i, 'g'); P(32 - i, 24 + i, 'g'); }
    R(23, 31, 4, 4, 'g'); R(24, 32, 2, 2, 'G'); P(24, 31, 'e');
    R(17, 39, 16, 1, 'N'); R(21, 40, 2, 1, 'g'); R(27, 40, 2, 1, 'g'); // 단추
    // 뒤쪽 팔
    R(34, 25, 5, 16, 'n'); R(35, 40, 4, 4, 's'); R(35, 43, 4, 1, 'S');
    // 앞쪽 팔 + 의사봉
    R(9, 25, 7, 6, 'n'); R(7, 30, 6, 10, 'n'); R(6, 39, 6, 2, 'w'); R(6, 41, 5, 4, 's'); R(6, 44, 5, 1, 'S');
    for (let i = 0; i < 12; i++) R(7 - Math.floor(i * 0.45), 41 - i, 2, 2, 'b'); // 손잡이 (위로 비스듬히)
    R(-1, 23, 10, 7, 'B'); R(-1, 23, 10, 1, 'b'); R(3, 23, 2, 7, 'g'); R(-1, 29, 10, 1, 'b'); // 의사봉 머리
    // 목 + 얼굴 (왼쪽 옆모습)
    R(20, 20, 8, 4, 's'); R(20, 23, 8, 1, 'S');
    R(16, 8, 15, 14, 's'); R(15, 11, 2, 9, 's'); R(13, 14, 3, 3, 's'); P(13, 16, 'S'); // 코
    R(28, 9, 5, 11, 'h'); R(16, 6, 17, 4, 'h'); R(15, 7, 3, 4, 'h'); R(30, 12, 3, 6, 'h'); // 머리 (올백)
    R(27, 13, 2, 4, 'S'); // 귀
    R(16, 11, 5, 1, 'K'); P(21, 10, 'K'); R(22, 11, 5, 1, 'K'); P(16, 10, 'K'); // 화난 눈썹 (안쪽이 내려감)
    R(17, 13, 3, 2, 'r'); R(23, 13, 3, 2, 'r'); P(17, 13, 'e'); P(23, 13, 'e'); // 빛나는 빨간 눈
    R(15, 18, 10, 2, 'y'); P(14, 19, 'y'); P(25, 19, 'y'); // 콧수염
    R(17, 20, 6, 1, 'R'); // 입
    R(16, 21, 12, 1, 'S');
    // 왕관 + 뿔
    R(16, 3, 17, 3, 'g'); for (const x of [17, 21, 25, 29]) R(x, 0, 2, 3, 'g'); R(16, 5, 17, 1, 'G'); P(18, 4, 'r'); P(24, 4, 'p'); P(30, 4, 'r');
    R(12, 1, 3, 2, 'u'); R(11, 2, 2, 4, 'u'); R(13, 3, 3, 3, 'u'); R(34, 1, 3, 2, 'u'); R(36, 2, 2, 4, 'u'); R(33, 3, 3, 3, 'u');
  }
  // 테두리 (도트 외곽선)
  const out = g.map((row) => row.slice());
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) if (!g[j][i]) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const q = g[j + b] && g[j + b][i + a]; if (q) { out[j][i] = 'K'; break; } }
  return out;
}
function bossCanvas(pose) {
  const g = bossGrid(pose), S = 4, c = document.createElement('canvas'); c.width = 48 * S; c.height = 64 * S;
  const x = c.getContext('2d');
  g.forEach((row, j) => row.forEach((k, i) => { if (k) { x.fillStyle = BOSS_PAL[k]; x.fillRect(i * S, j * S, S, S); } }));
  return c;
}
const BOSS_IMG = { idle: bossCanvas('idle'), back: bossCanvas('back') };
imgs['char' + BOSS_I] = BOSS_IMG.idle; // 시네마틱에서 '상대 사진' 자리에 이 그림이 나옴

// ----- 보스 그리기 (경기 중) -----
function drawBossFigure(p) {
  const ch = CHARACTERS[p.char], B = BOSS, t = p.anim;
  const h = ch.h * p.hm, w = ch.w * p.hw;
  const back = B && B.gaze && B.gaze.ph === 'count';
  const im = back ? BOSS_IMG.back : BOSS_IMG.idle;
  const bob = Math.sin(t * 0.12) * 1.2;
  ctx.scale(p.side === 0 ? 1 : -1, 1); // drawPlayer가 오른쪽 선수를 뒤집으니까 다시 원래대로 (그림은 원래 왼쪽을 봄)
  ctx.translate(0, bob);
  // 어둠의 오라 (보라 불꽃)
  for (let i = 0; i < 6; i++) {
    const a = t * 0.15 + i, fx = Math.sin(a * 1.3) * w * 0.35, fh = 18 + Math.sin(a * 2.1) * 8;
    ctx.fillStyle = `rgba(${B && B.groggyT > 0 ? '120,120,140' : '150,40,220'},${0.16 + 0.06 * Math.sin(a)})`;
    ctx.beginPath(); ctx.ellipse(fx, 32 - h * (0.25 + 0.12 * i), w * 0.3, fh, 0, 0, 7); ctx.fill();
  }
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (B && B.hurtT > 0) ctx.filter = 'brightness(2.2)';
  else if (B && B.groggyT > 0) ctx.filter = 'grayscale(.7) brightness(.8)';
  if (p.state === LOSE) { ctx.translate(0, 32); ctx.rotate(0.25); ctx.translate(0, -32); }
  ctx.drawImage(im, -w / 2, 32 - h, w, h);
  ctx.restore();
  // 눈빛 번쩍
  if (!back && !(B && B.groggyT > 0)) {
    const ex = -w / 2 + w * (18.5 / 48), ey = 32 - h + h * (13.5 / 64), on = 0.5 + 0.5 * Math.sin(t * 0.3);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const dx of [0, w * (6 / 48)]) { const gg = ctx.createRadialGradient(ex + dx, ey, 0, ex + dx, ey, 7); gg.addColorStop(0, `rgba(255,60,60,${0.7 * on})`); gg.addColorStop(1, 'rgba(255,0,0,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(ex + dx, ey, 7, 0, 7); ctx.fill(); }
    ctx.restore();
  }
}

// ----- 보스전 켜기 / 끄기 -----
const PARTY_COLOR = ['#2f7cf6', '#22b8d8', '#8a6bff'];
function setBoss(on) {
  if (!on) {
    if (!bossMode) return;
    bossMode = false; BOSS = null; bossMusicStop();
    players[1] = makePlayer(1); players.length = 2; setDuo(false);
    return;
  }
  setDuo(false); bossMode = true;
  BODY = 0.8; NET_TOP = DUO_NET_TOP; NET_PILLAR_TOP = DUO_PILLAR_TOP; // 파티는 작게 + 네트 낮게
  const b = makePlayer(1);
  Object.assign(b, { char: BOSS_I, boss: true, ai: true, aiLevel: BOSS_DIFF[bossDiff].ai, picked: true, color: '#ff2a6a', hw: BOSS_SCALE[0], hm: BOSS_SCALE[1] });
  players[1] = b;
  for (const i of [2, 3]) {
    const p = makePlayer(0), t = 'P' + i;
    p.keys = { l: t + 'l', r: t + 'r', u: t + 'u', d: t + 'd', a: t + 'a', s: t + 's' };
    p.char = i; p.mate = true; p.color = PARTY_COLOR[i - 1];
    players[i] = p;
  }
  players[0].color = PARTY_COLOR[0];
}
const bossParty = () => [players[0], players[2], players[3]];
const bossIdx = (p) => [0, 2, 3].indexOf(players.indexOf(p)); // 파티 몇 번째 (0·1·2)
function autoElem(p) { // 스킬 자동 락온: 지금 보스 쉴드(약점)에 제일 잘 맞는 내 속성
  const set = CHAR_ELEM[CHARACTERS[p.char].skill] || ['phys'], B = BOSS;
  if (!B) return set[0];
  const tgt = B.orbs && B.orbs.length ? WEAK[B.orbs[0]] : B.sh > 0 ? WEAK[B.shElem] : null;
  if (tgt) { if (set.includes(tgt)) return tgt; const ok = set.find((e) => e !== B.shElem); return ok || set[0]; }
  return set[0];
}
function bossStart() { // 경기 시작
  const D = BOSS_DIFF[bossDiff];
  BOSS = { phase: 1, hp: D.hp, hpMax: D.hp, sh: D.sh, shMax: D.sh, shElem: 'order', shRegenT: 0, groggyT: 0, groggyMax: D.groggy,
    rage: 0, rallyG: 0, brk: 100, partyHp: D.partyHp, partyHpMax: D.partyHp, pts: 0, bpts: 0, time: BOSS_TIME,
    rallyCnt: 0, maxRally: 0, seq: [], fx: null, ballSide: 0, rageArmed: false, buffT: 0, hurtT: 0, fire: 0, cutT: 0,
    gaze: null, gazeArmed: false, gazeNext: -1, desks: [], deskNext: D.desk, nums: [], fusion: null, result: null, lineT: 0,
    cast: null, ban: null, banNext: 0, mobs: [], mobWave: 0, curtainT: 0, noise: 0, sonicArmed: false, bombs: [], zones: [], bombNext: 0, bendNext: 0, bendArmed: 0,
    illuArmed: false, illuNext: 0, disNext: 0, spots: [], orbs: null, orbT: 0, rotT: 0, exec: null, execDone: false, trail: [], shSwitched: false, punishNext: 0, invT: 0,
    stats: { perfect: 0, miss: 0, dmg: [0, 0, 0], sh: [0, 0, 0], recv: [0, 0, 0], clutch: [0, 0, 0] } };
  bossParty().forEach((p) => (p.mpAcc = 0));
  bossSay('start');
  bossMusic(1);
}
function bossSay(kind) { const L = BOSS_LINES[kind]; if (L) say(players[1], L[Math.floor(Math.random() * L.length)]); }
function bossPop(text, col, y = 112, t = 40) { // 가운데 알림: 겹치면 아래로 비켜서 쌓고, 너무 많으면 오래된 것부터 지움
  const mine = popups.filter((q) => q.boss && q.t > 6);
  if (mine.length >= 3) mine[0].t = Math.min(mine[0].t, 6);
  y = 186; // 위쪽은 HUD(랠리·캐스팅·즉형 집행) 자리라서 알림은 가운데 아래 줄에
  for (let k = 0; k < 4 && popups.some((q) => q.boss && q.t > 6 && Math.abs(q.y - y) < 14); k++) y += 15;
  popups.push({ text, x: GW / 2, y, t, color: col, boss: true });
}
function bossNum(val, x, y, col, big) { BOSS.nums.push({ v: Math.round(val), x: Math.max(40, Math.min(GW - 40, x + (Math.random() - 0.5) * 16)), y: Math.max(70, y), t: 34, col, big }); }
function addMP(p, mp) { // 문서의 MP(0~100)를 마나 칸으로: 20 MP = 1칸
  if (!p || p.boss || p.manaLockT > 0) return;
  p.mpAcc = (p.mpAcc || 0) + mp;
  while (p.mpAcc >= 20) { p.mpAcc -= 20; if (p.mana < manaMax(p)) p.mana++; }
  if (p.mana >= manaMax(p)) p.mpAcc = 0;
}
const rallyMult = (n) => (n >= 7 ? 3.5 : n >= 5 ? 2.2 : n >= 3 ? 1.5 : 1);

// ----- 데미지 -----
function bossDamage(amount, o = {}) {
  const B = BOSS; if (!B || B.hp <= 0 || amount <= 0) return 0;
  const b = players[1], src = o.src ?? -1;
  if (B.orbs && B.orbs.length) { if (B.invT <= 0) { B.invT = 30; bossPop('무적! 원소 궤도성부터 부숴', '#d8d8e8', 96, 24); } return 0; } // 페이즈 3 시작: 무적
  if (B.buffT > 0) amount *= 2;            // 교칙 준수율 MAX 버프
  let tru = o.tru;
  if (B.groggyT > 0) { amount *= o.fixed ? 1 : o.hit ? 3 : 1.5; tru = true; } // 그로기: 공 타격은 트루 데미지 300% (스킬 150%, 득점 폭발은 그대로)
  const x = o.x ?? b.x, y = o.y ?? hitTop(b) + 10;
  if (B.sh > 0 && !tru && !o.ignore) { // 속성 보호막이 먼저 받음
    const em = o.pure ? 1 : o.elem === WEAK[B.shElem] ? 2 : o.elem === B.shElem ? 0.5 : 1;
    const sd = amount * em * (o.shMul || 1);
    B.sh -= sd; if (src >= 0) B.stats.sh[src] += sd;
    bossNum(sd, x, y, em === 2 ? '#ffe14a' : em < 1 ? '#9aa0b0' : '#bfe8ff', em === 2);
    if (em === 2) { B.brk -= 5; B.rallyG += 8; if (!o.quiet) bossPop('약점 ' + ELEM[o.elem].ic + ' x2!', ELEM[o.elem].col, 96, 22); }
    if (em < 1) { B.rage += 5; if (!o.quiet) bossPop('반감… (같은 속성)', '#9aa0b0', 96, 22); }
    if (B.sh <= 0) bossShieldBreak(src);
    B.hurtT = 3;
    return sd;
  }
  B.hp -= amount; if (src >= 0) B.stats.dmg[src] += amount;
  bossNum(amount, x, y, tru ? '#ff5aa0' : '#ffffff', amount > B.hpMax * 0.05);
  B.hurtT = 4;
  if (B.hp <= 0) { B.hp = 0; if (src >= 0) B.stats.clutch[src] += 3; bossPhaseClear(); }
  return amount;
}
function bossShieldBreak(src) {
  const B = BOSS; B.sh = 0; B.shRegenT = 25 * 25;
  heavy(players[1].x, 150, 2.6); shake = 14; hitStop = 6; bossSfx('glass');
  bossPop('쉴드 파괴!! 💥 그로기', '#ffffff', 100, 60);
  if (src >= 0) B.stats.clutch[src]++;
  bossGroggy();
}
function bossGroggy() {
  const B = BOSS; if (B.groggyT > 0) return;
  B.groggyT = B.groggyMax; B.brk = 0; B.gaze = null; B.rageArmed = false;
  players[1].freezeT = Math.max(players[1].freezeT || 0, B.groggyMax);
  bossSay('groggy'); bossSfx('drop');
}
function bossPhaseClear() { // 페이즈 체력 0 → 다음 페이즈 (3이면 최종 클리어)
  const B = BOSS; if (B.clearing) return;
  B.clearing = true; cine = null; ball.flight = null; fakes.length = 0; B.cast = null; B.exec = null; ball.bend = null;
  state = B.phase < 3 ? 'bossPhase' : 'bossClear'; timer = 0; hitStop = 10; shake = 18;
  bossSfx('glass'); bossSfx('drop'); bossMusicStop();
}
function bossEnd(win, why) {
  const B = BOSS;
  winner = win ? 0 : 1;
  players.forEach((p) => { p.state = p.side === winner ? WIN : LOSE; p.y = P_GROUND_Y; p.vy = 0; p.skillT = 0; });
  const sec = Math.floor(B.time / 25);
  const score = Math.max(0, (win ? sec * 100 : 0) + B.maxRally * 500 + B.stats.perfect * 200 - B.stats.miss * 1500);
  const rank = !win ? 'F' : score >= 50000 && B.stats.miss === 0 && B.maxRally >= 7 ? 'SSS' : score >= 40000 ? 'SS' : score >= 30000 ? 'S' : score >= 20000 ? 'A' : 'B';
  const best = (arr) => { let k = 0; arr.forEach((v, i) => { if (v > arr[k]) k = i; }); return arr[k] > 0 ? k : -1; };
  const S = B.stats;
  B.result = { win, why, sec, score, rank, titles: [['시공간 파괴자', best(S.dmg), '#ff7ab6'], ['쉴드 브레이커', best(S.sh), '#3cf0ff'], ['철벽의 구원자', best(S.recv), '#7dff9a'], ['클러치 갓', best(S.clutch), '#ffd23f']] };
  state = 'over'; timer = 0; bossMusicStop(); bossSfx(win ? 'win' : 'lose');
}

// ----- 공을 칠 때 (hitBall 앞뒤로 끼어듦) -----
function bossPreHit(p) {
  return { mana0: p.mana, power: p.state === POWER, powerT: p.powerT, fromBoss: !!ball.byBoss, bossPower: !!(ball.byBoss && ball.power), mega: !!ball.mega, by: ball.y };
}
function bossPostHit(p, inp, info) {
  const B = BOSS; if (!B || state !== 'play') return;
  const D = BOSS_DIFF[bossDiff];
  if (p.boss) { // 보스가 공을 침
    if (B.fx) bossApplyFx(info.by, false);
    if (B.groggyT > 0 || p.freezeT > 0) { ball.vx = -(4 + Math.random() * 3); ball.vy = -15; ball.power = false; } // 그로기: 힘없이 툭 넘김
    else if (B.rageArmed) { // 통제도 100% → 무차별 계도 스파이크
      B.rageArmed = false;
      const tx = 40 + Math.random() * 140; releaseBall(tx, 9);
      ball.mega = true; ball.fx = '255,40,60'; ball.power = true;
      heavy(ball.x, ball.y, 2.4); shake = 12; bossSfx('drop'); bossSay('rage');
      bossPop('⚠ 무차별 계도 스파이크!!', '#ff3048', 100, 50);
    } else if (B.sonicArmed) { // 소음 측정기 카운터: 음파 반격공
      B.sonicArmed = false; releaseBall(40 + Math.random() * 140, 10);
      ball.sonic = true; ball.power = true; ball.fx = '120,200,255'; heavy(ball.x, ball.y, 2); shake = 10; bossSfx('drop'); bossSay('mute');
      bossPop('🔊 음소거!! 300% 음파 반격공', '#78c8ff', 100, 46);
    } else if (B.illuArmed) { // 타임루프 시공간 균열: 공이 4개로 (진짜 1 + 환영 3)
      B.illuArmed = false; releaseBall(50 + Math.random() * 120, 13); ball.power = true;
      for (const k of [0.6, 0.85, 1.25]) fakes.push({ x: ball.x, y: ball.y, vx: ball.vx * k, vy: ball.vy * (2 - k) * 0.92, rot: 0, boss: true });
      bossPop('⏳ 타임루프! 진짜 공은 하나뿐 (환영공은 받으면 폭발)', '#c8a0ff', 100, 50); bossSfx('look');
    } else if (B.bendArmed) { // 굴절 마구 (페이즈 2: 3번 / 페이즈 3: 8번 꺾임)
      const n = B.bendArmed; B.bendArmed = 0; releaseBall(50 + Math.random() * 120, 14);
      ball.power = true; ball.bend = { n: p.slowT > 0 ? 1 : n, t: 5 }; ball.fx = '60,240,255';
      bossPop(n > 3 ? '🌀 무회전 시공간 굴절 서브!' : '⚡ 3연속 굴절 마구!', '#3cf0ff', 100, 40); bossSfx('zap');
    } else if (p.state === POWER) { const f = Math.min(1.3, 1 + (D.atk - 1) * 0.05); ball.vx = Math.max(-30, ball.vx * f); ball.vy *= f; bossSfx('drop'); }
    ball.byBoss = true; B.seq = [];
    return;
  }
  // 파티가 공을 침
  const i = bossIdx(p); if (i < 0) return;
  p.mana = info.mana0; // 원래 마나 규칙(스파이크 = 1칸) 대신 MP 규칙
  const elem = autoElem(p);
  if (info.fromBoss) { // 보스 공을 받아냄 = 블로킹
    B.stats.recv[i]++;
    if (info.bossPower) {
      const perfect = info.power;
      bossDamage(D.dmg * (perfect ? 1.5 : 0.5), { elem, src: i, quiet: true });
      B.brk -= perfect ? 15 : 10; addMP(p, perfect ? 15 : 5);
      popups.push({ text: perfect ? 'PERFECT BLOCK!' : 'BLOCK', x: p.x, y: Math.max(84, p.y - 46), t: 24, color: perfect ? '#ffe14a' : '#bfe8ff' });
      if (info.mega) { B.brk -= 25; B.rallyG += 15; B.stats.clutch[i] += 2; bossPop('계도 스파이크를 막아냈다!!', '#7dff9a', 100, 50); }
    } else addMP(p, 5);
    if (ball.sonic) { // 음파 반격공을 받아냄
      if (isWhirl(p)) { bossDamage(D.dmg * 8, { elem: 'phys', src: i }); B.stats.clutch[i] += 2; bossPop('회오리 역반사! 음파를 보스에게 100% 돌려줌', '#d8d8e8', 100, 46); }
      else { B.brk -= 10; popups.push({ text: '음파 받아냄!', x: p.x, y: p.y - 46, t: 22, color: '#78c8ff' }); }
    }
    ball.mega = false; ball.sonic = false;
  }
  ball.byBoss = false; ball.bend = null;
  // 콤보 순서 (같은 사람이 연속으로 치면 처음부터)
  if (B.seq.length && B.seq[B.seq.length - 1].i === i) B.seq = [];
  B.seq.push({ i, elem }); if (B.seq.length > 3) B.seq.shift();
  if (!info.power) { addMP(p, 10); B.fx = { i, send: true, judge: 0.3, combo: 1, elems: [elem], x: p.x }; return; } // 리시브·토스 (넘어가면 약한 피해)
  // 스파이크: 타이밍 판정
  const el = 9 - info.powerT, judge = el <= 2 ? 'P' : el <= 5 ? 'G' : 'B';
  const jm = { P: 2, G: 1, B: 0.3 }[judge];
  if (judge === 'P') B.stats.perfect++;
  if (B.phase === 2 && !B.cast && ++B.noise >= 5) { B.noise = 0; bossCast('mute'); } // 소음 측정기: 스파이크 5번 → 160dB 카운터
  const n = B.seq.length, elems = B.seq.map((q) => q.elem);
  addMP(p, Math.max(({ P: 20, G: 10, B: 0 })[judge], [0, 5, 15, 30][n])); // 판정 MP와 연계 MP 중 큰 쪽
  if (n === 3) B.rallyG += 20;
  let fusion = null;
  if (n === 3 && elems[0] === elems[1] && elems[1] === elems[2]) fusion = 'pure';
  else if (n >= 2) { const a = elems[n - 2], b = elems[n - 1], has = (x, y) => (a === x && b === y) || (a === y && b === x);
    if (has('pyro', 'cyber')) fusion = 'plasma'; else if (has('order', 'pyro')) fusion = 'holy'; else if (has('phys', 'cyber')) fusion = 'cannon'; }
  B.fx = { i, judge: jm, jk: judge, combo: [1, 1, 1.8, 3][n], n, elems, elem, fusion };
  const JC = { P: '#ffe14a', G: '#7dff9a', B: '#9aa0b0' }, JT = { P: 'PERFECT!', G: 'GOOD', B: 'BAD' };
  B.judge = { k: judge, x: ball.x, y: ball.y, t: 16 };
  popups.push({ text: JT[judge] + (n >= 2 ? ` ${n}단 연계` : ''), x: p.x, y: Math.max(84, p.y - 52), t: 22, color: JC[judge] });
  if (fusion) { B.fusion = { k: fusion, t: 46 }; ball.fx = ({ plasma: '170,90,255', holy: '255,120,40', cannon: '60,240,255', pure: ELEM[elem].rgb })[fusion]; }
  if (B.rallyCnt + 1 >= 6) { hitStop = Math.max(hitStop, 5); shake = Math.max(shake, 7); } // 하이 랠리: 멈칫 + 흔들림
  bossSfx('spike', B.rallyCnt + 1);
}
function bossApplyFx(by, landed) { // 보낸 공이 보스(또는 보스 코트)에 닿음 → 피해
  const B = BOSS, f = B.fx; B.fx = null; if (!f) return;
  const D = BOSS_DIFF[bossDiff], b = players[1];
  if (B.orbs && B.orbs.length) { if (!f.send) bossOrbHit(f.elem, f.i, false); return; } // 페이즈 3 무적: 궤도성 부수기
  if (f.send) { bossDamage(D.dmg * 0.3, { elem: f.elems[0], src: f.i, quiet: true, y: by }); return; }
  const top = hitTop(b), head = !landed && by < top + (b.y + 32 - top) * 0.3;
  let dmg = D.dmg * f.judge * f.combo * rallyMult(B.rallyCnt) * (head ? 1.5 : 1);
  const o = { elem: f.elem, src: f.i, y: by };
  if (B.pullT > 0) { dmg *= 1.5; o.pure = true; B.pullT = 0; bossPop('인력 붕괴 적중! x1.5', '#ff6a6a', 96, 24); }
  if (head) { B.brk -= 4; popups.push({ text: '👑 HEAD!', x: b.x, y: top - 6, t: 20, color: '#ffd23f' }); if (B.gaze && B.gaze.ph === 'count') { B.gaze.t -= B.gaze.dur * 0.25; bossPop('머리 적중! 캐스팅 25% 차감', '#ffd23f', 130, 30); }
    if (B.cast) { B.cast.t = Math.max(0, B.cast.t - B.cast.dur * 0.25); bossPop('머리 적중! 캐스팅 25% 차감', '#ffd23f', 130, 30); } }
  if (f.fusion === 'plasma') { if (B.sh > 0 && (B.shElem === 'cyber' || B.shElem === 'pyro')) o.shMul = 2; b.freezeT = Math.max(b.freezeT || 0, 50); B.brk -= 8; bossPop('[플라즈마 과부하] 마비 2초!', '#b65aff', 76, 46); }
  if (f.fusion === 'holy') { if (B.sh > 0) { const cut = B.sh * 0.5; B.sh -= cut; B.stats.sh[f.i] += cut; bossNum(cut, b.x, top, '#ff9a3a', true); } B.fire = 125; bossPop('[성화 징벌] 쉴드 50% 파괴 + 화염 지대!', '#ff8a3a', 76, 46); }
  if (f.fusion === 'cannon') { o.ignore = true; bossPop('[초공간 대포] 방어 완전 무시!', '#3cf0ff', 76, 46); }
  if (f.fusion === 'pure') { if (B.sh > 0) { o.shMul = 3; o.pure = true; } else dmg *= 2; bossPop('[속성 순도 100% 공명] 속성 휠 무시 · 쉴드 300%!', ELEM[f.elem].col, 76, 50); shake = 12; }
  if (f.fusion) { B.rallyG += 10; bossSfx('fusion'); }
  if (B.rallyCnt >= 7) { b.freezeT = Math.max(b.freezeT || 0, 38); popups.push({ text: '하이 랠리! 스턴 1.5초', x: b.x, y: top - 20, t: 24, color: '#ffe14a' }); }
  o.hit = true; bossDamage(dmg, o);
  if (!landed && Math.random() < 0.18) bossSay('hit');
}

// ----- 득점 (step 대신) -----
function bossOnPoint() {
  const B = BOSS, D = BOSS_DIFF[bossDiff];
  cine = null;
  heavy(ball.x, 272, 1.4);
  lastScorer = ball.x < NET_X ? 1 : 0;
  if (lastScorer === 0) { // 파티 득점: 스파이크 피해 + 득점 폭발(최대 HP 5%) + 패턴 브레이크
    B.pts++;
    const src = B.fx ? B.fx.i : B.seq.length ? B.seq[B.seq.length - 1].i : -1;
    if (B.fx) bossApplyFx(ball.y, true);
    if (B.hp > 0) bossDamage(B.hpMax * 0.05, { elem: src >= 0 ? autoElem(bossParty()[src]) : 'phys', src, x: ball.x, y: 230, fixed: true });
    if (B.gaze) { B.gaze = null; B.gazeNext = D.gaze; bossPop('패턴 브레이크!', '#7dff9a', 130, 30); if (src >= 0) B.stats.clutch[src]++; B.rallyG += 15; }
    if (B.cast) { bossPop(`패턴 브레이크! ${B.cast.name} 취소`, '#7dff9a', 130, 34); B.cast = null; if (src >= 0) B.stats.clutch[src]++; B.rallyG += 15; }
    bossPop('득점! 💥 HP 5% 폭발', '#ffe14a', 150, 34);
    if (Math.random() < 0.6) bossSay('hit');
  } else { // 보스 득점: 파티 체력 차감 + 통제도↑ + MP 증발
    B.bpts++; B.stats.miss++;
    const pen = ball.mega || ball.sonic ? D.pen * 2 : D.pen;
    if (B.orbs && B.orbs.length < 4 && bossDiff >= 1) { B.orbs.unshift(ORB_ORDER[3 - B.orbs.length]); bossPop('실점… 원소 구체 하나가 복구됐다', '#c8a0ff', 120, 36); }
    B.partyHp = Math.max(0, B.partyHp - pen);
    B.rage += 15;
    bossParty().forEach((p) => { p.mana = Math.max(0, p.mana - 1); p.mpAcc = 0; });
    bossPop(`실점! 파티 HP -${Math.min(pen, 99)}`, '#ff5a5a', 150, 34);
    if (Math.random() < 0.6) bossSay('point');
  }
  ball.mega = false; ball.sonic = false; ball.bend = null; ball.byBoss = false; B.fx = null; B.seq = []; B.rallyCnt = 0;
  if (B.clearing) return;
  if (B.partyHp <= 0) { bossEnd(false, '파티 체력 0'); return; }
  if (B.bpts >= 15) { bossEnd(false, '보스가 15점 선취'); return; }
  if (B.pts >= 25) { bossEnd(true, '목표 점수 25점 달성'); return; }
  state = 'slow'; timer = 0; slowTick = 0;
}

// ----- 매 프레임 (경기 중) -----
function bossTick() {
  const B = BOSS; if (!B || B.clearing) return;
  const D = BOSS_DIFF[bossDiff], b = players[1];
  if (--B.time <= 0) { B.time = 0; bossEnd(false, '시간 초과'); return; }
  if (B.hurtT > 0) B.hurtT--;
  if (B.buffT > 0) B.buffT--;
  if (B.fusion && --B.fusion.t <= 0) B.fusion = null;
  if (B.judge && --B.judge.t <= 0) B.judge = null;
  for (const n of B.nums) { n.t--; n.y -= 0.8; } B.nums = B.nums.filter((n) => n.t > 0);
  // 그로기
  if (B.groggyT > 0 && --B.groggyT === 0) { B.brk = 100; bossPop('보스가 일어났다!', '#ff7ab6', 120, 30); }
  // 쉴드 재생
  if (B.sh <= 0 && B.groggyT === 0 && B.shRegenT > 0 && --B.shRegenT === 0) { B.sh = B.shMax * 0.5; bossPop(`${ELEM[B.shElem].ic} ${ELEM[B.shElem].name} 쉴드 재생 (50%)`, ELEM[B.shElem].col, 120, 40); }
  // 화염 지대 (성화 징벌): 1초마다 최대 HP 0.8%
  if (B.pullT > 0) B.pullT--;
  if (B.fire > 0) { B.fire--; if (B.fire % 25 === 0) bossDamage(B.hpMax * 0.006, { tru: true, quiet: true, fixed: true }); }
  // 공이 네트를 넘어간 순간 = 랠리
  const side = ball.x < NET_X ? 0 : 1;
  if (side !== B.ballSide) {
    if (side === 1) { B.rallyCnt++; B.maxRally = Math.max(B.maxRally, B.rallyCnt); }
    B.seq = []; B.ballSide = side;
  }
  // 게이지
  if (B.brk <= 0 && B.groggyT === 0) { bossPop('브레이크!! 그로기', '#5aa8ff', 100, 50); bossGroggy(); }
  B.brk = Math.max(0, Math.min(100, B.brk));
  if (B.rage >= 100 && !B.rageArmed && B.groggyT === 0) { B.rage = 0; B.rageArmed = true; bossPop('⚠ 통제도 MAX! 다음 공격 주의', '#ff3048', 120, 50); }
  B.rage = Math.min(100, B.rage);
  if (B.rallyG >= 100) { B.rallyG = 0; B.buffT = 250; bossParty().forEach((p) => { p.mana = manaMax(p); p.mpAcc = 0; }); bossPop('교칙 준수율 100%! 전원 MP 회복 + 10초 데미지 2배', '#ffe14a', 120, 60); bossSfx('fusion'); }
  if (B.invT > 0) B.invT--;
  if (B.phase === 1) bossTickP1(D, b);
  else if (B.phase === 2) bossTickP2(D, b);
  else bossTickP3(D, b);
  if (state !== 'play' || !BOSS || B.clearing) return;
  bossTickCommon(D, b);
  // 마나 칸 표시용
  for (const p of bossParty()) if (p.mana >= manaMax(p)) p.mpAcc = 0;
  if (B.lineT > 0) B.lineT--;
  if (B.bolts) { B.bolts.forEach((q) => q.t--); B.bolts = B.bolts.filter((q) => q.t > 0); }
}
function bossTickP1(D, b) { // 페이즈 1: 선생님의 시선 + 책상 장해물
  const B = BOSS;
  // 기믹 1-1: 선생님의 시선 (보스 HP 80% 이하부터)
  if (!B.gazeArmed && B.hp <= B.hpMax * 0.8) { B.gazeArmed = true; B.gazeNext = 30; }
  if (B.gazeArmed && !B.gaze && B.groggyT === 0 && --B.gazeNext <= 0) { B.gaze = { ph: 'count', t: 0, dur: 75, caught: [] }; bossSay('gaze'); bossSfx('gaze'); }
  const G = B.gaze;
  if (G) {
    if (b.blindT > 0 || B.groggyT > 0) { B.gaze = null; B.gazeNext = D.gaze; bossPop('시야 차단! 선생님의 시선 무효', '#7dff9a', 130, 40); B.rallyG += 15; }
    else if (G.ph === 'count') {
      G.t += b.slowT > 0 ? 0.1 : 1; // 시간 팽창이면 돌아보는 속도 90% 느려짐
      if (G.t >= G.dur) { G.ph = 'look'; G.t = 0; G.pos = bossParty().map((p) => [p.x, p.y, p.state]); bossSfx('look'); }
    } else {
      G.t++;
      bossParty().forEach((p, i) => {
        if (G.caught.includes(i)) return;
        const [x0, y0, s0] = G.pos[i];
        if (Math.abs(p.x - x0) > 1.5 || Math.abs(p.y - y0) > 1.5 || p.state === POWER || p.state === DIVE) {
          G.caught.push(i); p.freezeT = 75; p.stunned = true; B.rage += 20;
          B.bolts = (B.bolts || []).concat({ x: p.x, y: p.y, t: 14 });
          heavy(p.x, p.y - 20, 1.6); bossSfx('zap');
          popups.push({ text: '움직였다! 낙뢰 + 3초 스턴', x: p.x, y: p.y - 60, t: 40, color: '#ffe14a' });
        }
      });
      if (G.t >= 30) { B.gaze = null; B.gazeNext = D.gaze; if (!G.caught.length) { bossPop('완벽한 정지! 교칙 준수 +15%', '#7dff9a', 130, 30); B.rallyG += 15; } }
    }
  }
  // 기믹 1-2: 책상 장해물 쇄도 (15초마다)
  if (--B.deskNext <= 0) {
    B.deskNext = D.desk; bossSay('desk');
    const xs = [], n = 3;
    for (let k = 0; k < n; k++) { let x, tries = 0; do { x = 44 + Math.random() * 132; tries++; } while (tries < 20 && xs.some((q) => Math.abs(q - x) < 34)); xs.push(x); }
    xs.forEach((x, k) => B.desks.push({ x, y: -40 - k * 30, warn: 25 + k * 6, vy: 0, life: 200, kind: k % 2 ? 'book' : 'desk', land: false }));
  }
  for (const d of B.desks) {
    if (d.warn > 0) { d.warn--; continue; }
    if (!d.land) { d.vy += 1.4; d.y += d.vy; if (d.y >= P_GROUND_Y + 32) { d.y = P_GROUND_Y + 32; d.land = true; heavy(d.x, 268, 1); bossSfx('thud');
      bossParty().forEach((p) => { if (Math.abs(p.x - d.x) < 22 && p.y > P_GROUND_Y - 30) { p.freezeT = Math.max(p.freezeT || 0, 25); popups.push({ text: '쿵!', x: p.x, y: p.y - 40, t: 16, color: '#ffb0a0' }); } }); } }
    else d.life--;
    // 키다리 거인화: 밟아 부숨
    for (const p of bossParty()) if (d.land && p.skillT > 0 && CHARACTERS[p.char].skill === 'giant' && Math.abs(p.x - d.x) < 34) { d.life = 0; d.smash = true; bossDamage(D.dmg * 1.5, { elem: 'phys', src: bossIdx(p), quiet: true }); popups.push({ text: '쾅! 거인이 책상을 밟았다', x: d.x, y: 200, t: 24, color: '#d8d8e8' }); }
  }
  B.desks = B.desks.filter((d) => d.life > 0);
}
function bossBlockMove(p) { // 책상에 막힘 (점프하면 넘어감)
  if (!BOSS || p.boss) { p.bx = p.x; return; }
  for (const d of BOSS.desks) {
    if (!d.land || p.y < P_GROUND_Y - 22) continue;
    const half = 22;
    if (Math.abs(p.x - d.x) < half) p.x = (p.bx ?? p.x) <= d.x ? d.x - half : d.x + half;
  }
  p.bx = p.x;
}

// ----- 스킬 -----
function bossOnSkill(p) { // 스킬 발동 순간: 기믹 대응 스킬 자동 선택 + 컷인
  const B = BOSS, c = cine; if (!B || p.boss) return;
  p.mpAcc = 0;
  if (c && c.caster === p) {
    const pick = (arr, key) => { const s = arr.find((x) => x.key === key); if (s) c.sk = s; };
    if (B.gaze && c.kind === 'cmj') { pick(CM_SKILLS, 'time'); bossPop('자동 락온: 시간 팽창 → 선생님의 시선 지연', '#3cf0ff', 140, 40); }
    if (B.gaze && c.kind === 'gm') { pick(GM_SKILLS, 'flash'); bossPop('자동 락온: 두피 반사 빔 → 시야 차단', '#ffe14a', 140, 40); }
    if (B.desks.some((d) => d.land) && c.kind === 'jjh') { pick(JJ_SKILLS, 'chivalry'); bossPop('자동 락온: 뚝배기 파쇄 → 책상 박살', '#ff8a6a', 140, 40); }
    bossAutoPick(c);
    const key = bossSkillKey(c);
    if (BOSS_TRUE.includes(key)) { B.cutT = 14; bossSfx('duck'); }
  }
}
function bossSkillKey(c) { return c.kind + ':' + (c.hero ? c.hero.key : c.sk ? c.sk.key : c.key || c.kind); }
function bossSkillHit(c) { // 스킬 연출이 끝남 → 보스 피해
  const B = BOSS, D = BOSS_DIFF[bossDiff], p = c.caster, i = bossIdx(p);
  if (!B || i < 0 || B.clearing) return;
  const key = bossSkillKey(c), elem = SKILL_ELEM[key] || autoElem(p);
  if (c.banned) { // 소지품 검사: 압수된 속성 스킬
    B.partyHp = Math.max(0, B.partyHp - (D.pen >= 99 ? 99 : 1)); B.rage += 10;
    bossPop(`🚫 압수! ${ELEM[elem].name} 스킬은 금지 → 효과 없음 + 파티 HP -1`, '#ff5a5a', 100, 50);
    if (B.partyHp <= 0) bossEnd(false, '소지품 검사 적발');
    return;
  }
  bossSkillCounter(c, key, elem, i);
  if (!BOSS || B.clearing || state === 'over') return;
  if (B.orbs && B.orbs.length) { bossOrbHit(elem, i, true); return; } // 무적 중엔 스킬이 구체 하나를 부숨
  if (BOSS_TRUE.includes(key)) { bossDamage(B.hpMax * 0.08, { tru: true, src: i, fixed: true }); bossPop('확정 스킬! 쉴드 무시 고정 피해', '#ff5aa0', 92, 44); B.stats.clutch[i] += 2; }
  else if (key === 'yean:pull') { bossDamage(D.dmg * 6, { elem, src: i, ignore: true }); B.brk -= 14; popups.push({ text: '👑 HEAD! 처형 스파이크', x: players[1].x, y: hitTop(players[1]) - 6, t: 30, color: '#ff5060' }); } // 머리 강제 판정 150% (쉴드 무시)
  else { bossDamage(D.dmg * 4, { elem, src: i }); B.brk -= 10; }
  if (key === 'jjh:chivalry' && B.desks.length) { B.desks.forEach((d) => { d.life = 0; d.smash = true; }); bossDamage(D.dmg * 2, { elem: 'phys', src: i, quiet: true }); bossPop('책상 완파! 파편이 보스에게', '#ff8a6a', 120, 40); B.stats.clutch[i]++; }
  if ((key === 'cmj:time' || key === 'gm:flash') && B.gaze) B.stats.clutch[i]++;
}

// ----- 캐릭터 선택 (보스전) -----
function bossPanelX(i) { return [52, 0, 150, 248][i] || 52; }
function bossUpdateSelect() {
  const P = bossParty(), n = NCHAR;
  players.forEach((p) => p.anim++);
  const humans = P.filter((p) => !p.ai);
  for (const p of humans) {
    if (p.picked) continue;
    const k = p.keys;
    if (pressed.has(k.l)) p.char = (p.char + n - 1) % n;
    if (pressed.has(k.r)) p.char = (p.char + 1) % n;
    if (pressed.has(k.u) || pressed.has(k.d)) p.char = selRow(p.char);
    if (pressed.has(k.a)) { p.picked = true; sfx('pop'); popups.push({ text: '선택!', x: bossPanelX(players.indexOf(p)), y: 200, t: 20, color: p.color }); }
  }
  if (!humans.every((p) => p.picked)) return;
  // 사람이 다 골랐으면: 1P가 AI 팀원 캐릭터도 골라 줌 (온라인은 랜덤 자동)
  const A = P.find((p) => p.ai && !p.picked);
  if (A) {
    if (NET.on) { A.char = Math.floor(Math.random() * n); A.picked = true; return; }
    const k = players[0].keys;
    if (pressed.has(k.l)) A.char = A.char <= -1 ? n - 1 : A.char - 1;
    if (pressed.has(k.r)) A.char = A.char >= n - 1 ? -1 : A.char + 1;
    if ((pressed.has(k.u) || pressed.has(k.d)) && A.char >= 0) A.char = selRow(A.char);
    if (pressed.has(k.a)) { if (A.char < 0) A.char = Math.floor(Math.random() * n); A.picked = true; sfx('pop'); popups.push({ text: 'AI: ' + CHARACTERS[A.char].name, x: bossPanelX(players.indexOf(A)), y: 200, t: 30, color: A.color }); }
    return;
  }
  if (++timer >= 25) { state = 'startFadeOut'; timer = 0; }
}
function bossLocalSetup() { // 로컬 보스전 준비 → 캐릭터 선택
  solo = false; setBoss(true);
  players[0].ai = false; players[0].keys = makePlayer(0).keys;
  const two = bossLocal === 2;
  players[2].ai = !two; players[2].aiLevel = 2; if (two) players[2].keys = makePlayer(1).keys; // 둘이: 2P는 방향키
  players[3].ai = true; players[3].aiLevel = 2;
  players.forEach((p) => { p.picked = !!p.boss; p.state = NORMAL; p.hm = p.boss ? BOSS_SCALE[1] : BODY; p.hw = p.boss ? BOSS_SCALE[0] : BODY; p.skillT = 0; p.shrinkT = 0; p.aiS = null; });
  players[0].char = 0; players[2].char = two ? 1 : -1; players[3].char = -1;
  state = 'select'; timer = 0; pressed.clear();
}

// ===== 보스전 그리기 =====
function fmtN(v) { return Math.max(0, Math.round(v)).toLocaleString('en-US'); }
function bar(x, y, w, h, k, c1, c2, bg = 'rgba(0,0,0,.55)') {
  ctx.fillStyle = bg; ctx.fillRect(x, y, w, h);
  const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, c1); g.addColorStop(1, c2 || c1);
  ctx.fillStyle = g; ctx.fillRect(x, y, w * Math.max(0, Math.min(1, k)), h);
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 0.7; ctx.strokeRect(x + 0.35, y + 0.35, w - 0.7, h - 0.7);
}
// 경기장 (선수 뒤): 책상 경고, 화염 지대
function drawBossWorld() {
  const B = BOSS; if (!B) return;
  drawBossP23World();
  const t = players[1].anim;
  if (B.fire > 0) for (let i = 0; i < 12; i++) { // 성화 징벌: 보스 코트 화염 지대
    const x = 240 + i * 16 + Math.sin(t * 0.3 + i) * 3, h = 10 + Math.sin(t * 0.5 + i * 1.7) * 5;
    ctx.fillStyle = `rgba(255,${120 + (i % 3) * 40},40,${0.35 + 0.15 * Math.sin(t * 0.4 + i)})`;
    ctx.beginPath(); ctx.moveTo(x - 6, 272); ctx.quadraticCurveTo(x, 272 - h * 2, x + 6, 272); ctx.fill();
  }
  for (const d of B.desks) {
    if (d.warn > 0) { // 떨어질 자리 경고
      ctx.fillStyle = `rgba(255,40,40,${0.25 + 0.25 * Math.sin(d.warn * 0.8)})`;
      ctx.beginPath(); ctx.ellipse(d.x, 275, 20, 4, 0, 0, 7); ctx.fill();
      text('!', d.x, 262, 12, '#ff4040');
      continue;
    }
    const y = d.y, a = Math.min(1, d.life / 25);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(d.x, y);
    if (d.kind === 'desk') { // 나무 책상
      ctx.fillStyle = '#5a3a1a'; ctx.fillRect(-18, -26, 4, 26); ctx.fillRect(14, -26, 4, 26);
      ctx.fillStyle = '#a8743a'; ctx.fillRect(-21, -30, 42, 6); ctx.fillStyle = '#c99050'; ctx.fillRect(-21, -30, 42, 2);
      ctx.fillStyle = '#7a5226'; ctx.fillRect(-16, -24, 32, 8);
    } else { // 거대 출석부
      ctx.fillStyle = '#1f5a3a'; ctx.fillRect(-16, -34, 32, 34); ctx.fillStyle = '#f2ead2'; ctx.fillRect(13, -32, 3, 30);
      ctx.fillStyle = '#ffd23f'; ctx.fillRect(-12, -26, 20, 9); text('출석부', -2, -19, 6, '#1f3a2a');
    }
    ctx.restore();
  }
}
// 경기장 (선수 앞): 쉴드, 그로기, 시선 캐스팅 바, 낙뢰, 공 오라
function drawBossWorldTop() {
  const B = BOSS; if (!B) return;
  drawBossP23Top();
  const b = players[1], t = b.anim, top = hitTop(b);
  if (B.sh > 0 && !(cine && cine.caster)) { // 속성 보호막 (육각 무늬)
    const E = ELEM[B.shElem], k = B.sh / B.shMax, cx = b.x, cy = (top + b.y + 32) / 2, rx = 58, ry = (b.y + 32 - top) / 2 + 14;
    ctx.save();
    ctx.globalAlpha = 0.18 + 0.22 * k + (B.hurtT > 0 ? 0.3 : 0);
    const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, ry); g.addColorStop(0, `rgba(${E.rgb},0)`); g.addColorStop(0.8, `rgba(${E.rgb},.25)`); g.addColorStop(1, `rgba(${E.rgb},.8)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, 7); ctx.clip();
    ctx.strokeStyle = `rgba(${E.rgb},.7)`; ctx.lineWidth = 0.8;
    for (let j = -6; j <= 6; j++) for (let i = -4; i <= 4; i++) { const hx = cx + i * 14 + (j % 2) * 7, hy = cy + j * 12 + Math.sin(t * 0.05) * 2; ctx.beginPath(); for (let q = 0; q < 6; q++) { const a = q * Math.PI / 3; ctx[q ? 'lineTo' : 'moveTo'](hx + Math.cos(a) * 7, hy + Math.sin(a) * 7); } ctx.closePath(); ctx.stroke(); }
    if (k < 0.4) { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(cx - 20, cy - 30); ctx.lineTo(cx - 6, cy - 8); ctx.lineTo(cx - 14, cy + 6); ctx.lineTo(cx + 2, cy + 26); ctx.moveTo(cx - 6, cy - 8); ctx.lineTo(cx + 16, cy - 14); ctx.stroke(); } // 금
    ctx.restore();
    text(E.ic, cx, top - 10, 10, E.col);
  }
  if (B.groggyT > 0) { // 그로기: 머리 위 별
    for (let i = 0; i < 5; i++) { const a = t * 0.15 + i * 1.26; text('★', b.x + Math.cos(a) * 26, top - 8 + Math.sin(a) * 6, 9, '#ffe14a'); }
    text(`GROGGY ${Math.ceil(B.groggyT / 25)}s`, b.x, top - 24, 10, '#ffe14a');
  }
  if (B.rageArmed) { ctx.fillStyle = `rgba(255,30,50,${0.15 + 0.1 * Math.sin(t * 0.6)})`; ctx.beginPath(); ctx.ellipse(b.x, (top + b.y) / 2, 64, 90, 0, 0, 7); ctx.fill(); }
  if (B.gaze && B.gaze.ph === 'count') { const k = Math.min(1, B.gaze.t / B.gaze.dur); bar(b.x - 40, top - 40, 80, 6, k, '#ff8a3a', '#ff3048'); text('선생님의 시선 캐스팅', b.x, top - 44, 7, '#ffd0c0'); }
  for (const q of B.bolts || []) { // 낙뢰
    ctx.save(); ctx.strokeStyle = `rgba(255,240,120,${q.t / 14})`; ctx.lineWidth = 3; ctx.shadowColor = '#fff6a0'; ctx.shadowBlur = 12;
    ctx.beginPath(); let x = q.x + (Math.random() - 0.5) * 20; ctx.moveTo(x, 0); for (let y = 20; y <= q.y; y += 20) { x = q.x + (Math.random() - 0.5) * 18; ctx.lineTo(x, y); } ctx.stroke(); ctx.restore();
  }
  // 랠리가 길어질수록 공이 강해 보임 (3~5: 속성 오라 / 6+: 스파크 구체)
  if (state === 'play' && !ball.flight && B.rallyCnt >= 3) {
    const hi = B.rallyCnt >= 6, e = B.seq.length ? ELEM[B.seq[B.seq.length - 1].elem] : ELEM.order;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const r = hi ? 34 : 28, g = ctx.createRadialGradient(ball.x, ball.y, 8, ball.x, ball.y, r);
    g.addColorStop(0, `rgba(${hi ? '255,240,140' : e.rgb},.55)`); g.addColorStop(1, `rgba(${hi ? '255,200,40' : e.rgb},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ball.x, ball.y, r, 0, 7); ctx.fill();
    if (hi) for (let i = 0; i < 6; i++) { const a = t * 0.7 + i; ctx.strokeStyle = 'rgba(255,250,200,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ball.x + Math.cos(a) * 18, ball.y + Math.sin(a) * 18); ctx.lineTo(ball.x + Math.cos(a + 0.4) * 30, ball.y + Math.sin(a + 0.4) * 30); ctx.stroke(); }
    ctx.restore();
  }
}
// 화면 고정 UI
function drawBossHUD() {
  const B = BOSS; if (!B || state === 'select') return;
  const D = BOSS_DIFF[bossDiff], now = performance.now();
  if (cine && cine.caster) { // 스킬 시네마틱 중엔 화면을 가리지 않게 (확정 스킬 반전 컷인만)
    if (B.cutT > 0) { ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = `rgba(255,255,255,${B.cutT / 14})`; ctx.fillRect(0, 0, GW, GH); ctx.restore(); }
    return;
  }
  // 판정 링 + 데미지 숫자 (경기장 좌표 = 화면 좌표)
  if (B.judge) { const j = B.judge, k = 1 - j.t / 16; ctx.strokeStyle = { P: '#ffe14a', G: '#7dff9a', B: '#9aa0b0' }[j.k]; ctx.globalAlpha = 1 - k; ctx.lineWidth = 3 - k * 2; ctx.beginPath(); ctx.arc(j.x, j.y, 14 + k * 26, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
  for (const n of B.nums) { ctx.globalAlpha = Math.min(1, n.t / 10); text(fmtN(n.v), n.x, n.y, n.big ? 13 : 9, n.col); ctx.globalAlpha = 1; }
  // ── 상단: 보스 정보 ──
  ctx.fillStyle = 'rgba(8,4,16,.72)'; ctx.fillRect(0, 0, GW, 52);
  ctx.fillStyle = 'rgba(255,42,106,.6)'; ctx.fillRect(0, 52, GW, 1);
  text(`PHASE ${B.phase} · ${BOSS_PHASE[B.phase].name}`, 8, 9, 7, BOSS_PHASE[B.phase].col, 'left');
  text("'절대 통제자' 마왕 이사장", GW / 2, 9, 9, '#ff5a8a');
  const sec = Math.ceil(B.time / 25);
  text(`⏱ ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`, GW - 8, 9, 8, sec < 60 ? '#ff6060' : '#ffffff', 'right');
  bar(40, 13, 352, 10, B.hp / B.hpMax, '#ff4a6a', '#a3122e');
  text(`HP ${fmtN(B.hp)} / ${fmtN(B.hpMax)}`, GW / 2, 21, 7, '#ffffff');
  text(D.en, 20, 21, 6, D.col);
  const E = ELEM[B.shElem];
  if (B.orbs) {
    bar(40, 25, 352, 5, B.orbs.length / 4, '#ffffff', '#9aa0b0');
    const seq = ORB_ORDER.map((e) => (B.orbs.includes(e) ? ELEM[e].ic : '✔')).join(' → ');
    text(`무적! 원소 궤도성 ${seq}`, 40, 37, 6, '#ffffff', 'left');
    text(`다음: ${ELEM[B.orbs[0]].ic}${ELEM[B.orbs[0]].name} 구체 ← ${ELEM[WEAK[B.orbs[0]]].ic}${ELEM[WEAK[B.orbs[0]]].name} 스파이크로`, 392, 37, 6, '#ffe9a0', 'right');
  } else if (B.sh > 0) {
    bar(40, 25, 352, 5, B.sh / B.shMax, E.col, `rgba(${E.rgb},.6)`);
    text(`${E.ic} ${E.name} 쉴드 ${fmtN(B.sh)}` + (B.phase === 3 ? ` · 속성 변경 ${Math.ceil(B.rotT / 25)}s` : ''), 40, 37, 6, E.col, 'left');
    text(`약점: ${ELEM[WEAK[B.shElem]].ic} ${ELEM[WEAK[B.shElem]].name} (x2) · 같은 속성은 반감`, 392, 37, 6, '#ffe9a0', 'right');
  } else {
    bar(40, 25, 352, 5, 0, '#fff');
    text(B.groggyT > 0 ? `그로기! 모든 타격 트루 데미지 x3 (${Math.ceil(B.groggyT / 25)}초)` : `쉴드 파괴됨 · 재생까지 ${Math.ceil(B.shRegenT / 25)}초`, GW / 2, 37, 6, '#ffe14a');
  }
  const gx = [40, 161, 282];
  [['🔴 통제도', B.rage, '#ff3048', '#8a0c18'], ['🟡 교칙 준수율', B.rallyG, '#ffd23f', '#b8860b'], ['🔵 브레이크', B.brk, '#5aa8ff', '#1f4a8a']].forEach(([n, v, c1, c2], i) => {
    bar(gx[i], 46, 110, 4, v / 100, c1, c2); text(n, gx[i], 44, 5.5, '#ddd', 'left'); text(Math.round(v) + '%', gx[i] + 110, 44, 5.5, '#ddd', 'right');
  });
  // ── 가운데: 랠리 · 콤보 ──
  if (B.rallyCnt > 0 && state === 'play') {
    const m = rallyMult(B.rallyCnt), hi = B.rallyCnt >= 7;
    text(`RALLY ${B.rallyCnt}`, GW / 2 - 4, 66, hi ? 12 : 10, hi ? '#ffe14a' : '#ffffff', 'right');
    text(`x${m}`, GW / 2 + 4, 66, hi ? 12 : 10, m >= 2.2 ? '#ff7ab6' : '#7dff9a', 'left');
  }
  if (B.seq.length && state === 'play') { // 1단→2단→3단 + 속성
    const s = B.seq.map((q, i) => `${['리시브', '토스', '스파이크'][i]}${ELEM[q.elem].ic}`).join(' → ');
    text(s, GW / 2, 78, 7, '#cfe8ff');
  }
  if (B.buffT > 0) text(`데미지 2배! ${Math.ceil(B.buffT / 25)}s`, GW / 2, 90, 8, '#ffe14a');
  drawBossP23HUD();
  if (B.fusion) { // 속성 융합 반응 팝업
    const F = { plasma: ['플라즈마 과부하', '#b65aff'], holy: ['성화 징벌', '#ff8a3a'], cannon: ['초공간 대포', '#3cf0ff'], pure: ['속성 공명 100%', '#ffffff'] }[B.fusion.k];
    const k = B.fusion.t / 46, sc = 1 + (1 - k) * 0.2;
    ctx.save(); ctx.globalAlpha = Math.min(1, k * 2); ctx.shadowColor = F[1]; ctx.shadowBlur = 14; text(`⚡ ${F[0]} ⚡`, GW / 2, 166, 15 * sc, F[1]); ctx.restore();
  }
  // 선생님의 시선
  if (B.gaze) {
    const G = B.gaze;
    if (G.ph === 'count') {
      const s = '무궁화 꽃이 피었습니다', n = Math.min(s.length, Math.floor(G.t / G.dur * s.length) + 1);
      ctx.fillStyle = `rgba(120,0,20,${0.12 * G.t / G.dur})`; ctx.fillRect(0, 53, GW, GH - 53);
      text(s.slice(0, n), 108, 150, 14, '#ffb0a0');
      text('보스가 돌아보기 전에 공을 높이 띄우고,', 108, 166, 7, '#ffd0c0'); text('돌아보면 멈춰! (움직이면 낙뢰)', 108, 176, 7, '#ffd0c0');
    } else {
      const on = Math.floor(G.t / 3) % 2;
      ctx.strokeStyle = on ? '#ff2030' : '#ff8080'; ctx.lineWidth = 6; ctx.strokeRect(3, 56, GW - 6, GH - 59);
      text('👁 움직이지 마!!', 108, 156, 18, '#ff3048');
    }
  }
  // ── 하단: 파티 ──
  ctx.fillStyle = 'rgba(8,10,24,.6)'; ctx.fillRect(0, 282, GW, 22);
  bossParty().forEach((p, i) => {
    const x = 6 + i * 100, ch = CHARACTERS[p.char], full = p.mana >= manaMax(p), me = NET.on ? players.indexOf(p) === NET.side : !p.ai;
    text((p.ai ? '🤖' : me && NET.on ? '▶' : '') + ch.name, x, 290, 7, p.color, 'left');
    const k = full ? 1 : (p.mana + (p.mpAcc || 0) / 20) / manaMax(p);
    bar(x, 294, 90, 4, k, full ? '#ffe14a' : '#5aa8ff', full ? '#ff9a3a' : '#2a5aa8');
    if (full && p.skillT === 0) { if (Math.floor(now / 200) % 2) text('READY!', x + 90, 290, 7, '#ffe14a', 'right'); }
    else text(`MP ${Math.round(k * 100)}`, x + 90, 290, 6, '#aab', 'right');
  });
  const hp = B.partyHp, hm = B.partyHpMax;
  text(`파티 HP ${hp}/${hm}`, GW - 6, 290, 7, hp <= hm * 0.3 ? '#ff6060' : '#7dff9a', 'right');
  text(`득점 ${B.pts} : ${B.bpts} 실점`, GW - 6, 300, 7, '#ffffff', 'right');
  // 확정 스킬 컷인: 화면 반전
  if (B.cutT > 0) { ctx.save(); ctx.globalCompositeOperation = 'difference'; ctx.fillStyle = `rgba(255,255,255,${B.cutT / 14})`; ctx.fillRect(0, 0, GW, GH); ctx.restore(); }
  if (state === 'bossClear') { // 페이즈 1 클리어 연출
    const k = Math.min(1, timer / 12);
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, 0.8 - timer * 0.05)})`; ctx.fillRect(0, 0, GW, GH);
    ctx.save(); ctx.shadowColor = '#ff2a6a'; ctx.shadowBlur = 20; text('BOSS DEFEATED', GW / 2, 140, 34 * (0.6 + 0.4 * k), '#ffffff'); ctx.restore();
    if (timer > 30) text('"졸업… 축하…한다…"', GW / 2, 170, 10, '#ff9ab8');
  }
  if (state === 'bossPhase') drawBossPhaseCard();
}
function drawBossIntro() { // 보스 등장 (startMsg)
  const t = timer, k = Math.min(1, t / 14), D = BOSS_DIFF[bossDiff];
  ctx.fillStyle = `rgba(0,0,0,${0.55 * (1 - Math.max(0, (t - 55) / 16))})`; ctx.fillRect(0, 0, GW, GH);
  ctx.save(); ctx.translate(GW / 2, 120);
  const gl = t < 20 && Math.floor(t / 2) % 2 ? (Math.random() - 0.5) * 8 : 0;
  ctx.shadowColor = '#ff2a6a'; ctx.shadowBlur = 18;
  text('BOSS RAID', gl, -34, 11 * k, '#ff5a8a');
  text("'절대 통제자'", gl, -12, 13 * k, '#ffb0c8');
  text('마왕 이사장', gl, 18, 30 * k, '#ffffff');
  ctx.restore();
  if (t > 18) text('The Absolute Chairman', GW / 2, 158, 9, '#ff9ab8');
  if (t > 28) text(`PHASE 1 / 3 — 훈화 말씀의 압박 · ${D.name} (${D.en})`, GW / 2, 180, 10, D.col);
  if (t > 38) text('규율 쉴드는 🔥화염에 약해! 리시브 → 토스 → 스파이크 3단 연계로 큰 피해', GW / 2, 198, 7, '#ffffff');
}
function drawBossResult() { // 결과 + 클리어 인증서
  const text = (str, x, y, size, color = '#fff', align = 'center') => { ctx.font = `bold ${size}px "Malgun Gothic", sans-serif`; ctx.textAlign = align; ctx.fillStyle = color; ctx.fillText(str, x, y); }; // 종이 위라 테두리 없이
  const B = BOSS, R = B && B.result; if (!R) return;
  const k = Math.min(1, timer / 15), D = BOSS_DIFF[bossDiff];
  ctx.fillStyle = `rgba(6,4,14,${0.78 * k})`; ctx.fillRect(0, 0, GW, GH);
  const x0 = 66, y0 = 18, w = 300, h = 268;
  ctx.fillStyle = R.win ? '#f6ecd2' : '#2a2030'; ctx.beginPath(); ctx.roundRect(x0, y0, w, h, 8); ctx.fill();
  ctx.strokeStyle = R.win ? '#b8860b' : '#ff3048'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x0 + 4, y0 + 4, w - 8, h - 8, 6); ctx.stroke();
  const ink = R.win ? '#3a2410' : '#ffd0d8';
  text(R.win ? '📜 보스 레이드 클리어 인증서' : '💀 보스 레이드 실패', GW / 2, y0 + 22, 14, ink);
  text(`'절대 통제자' 마왕 이사장 · ${D.name} · ${R.why}`, GW / 2, y0 + 38, 7, R.win ? '#7a5a2a' : '#ff9ab8');
  if (B.pages) for (let i = 0; i < 26; i++) { const x = (i * 53 + timer * (1 + i % 3)) % (GW + 20) - 10, y = (i * 37 + timer * (2 + i % 4)) % GH; ctx.fillStyle = 'rgba(250,250,240,.85)'; ctx.fillRect(x, y, 10, 13); ctx.fillStyle = '#888'; ctx.fillRect(x + 2, y + 3, 6, 1); ctx.fillRect(x + 2, y + 6, 6, 1); } // 반성문 100장
  const rc = { SSS: '#ff2a6a', SS: '#ff7a2a', S: '#ffb02e', A: '#3aa86a', B: '#3a7ac8', F: '#888' }[R.rank];
  ctx.save(); ctx.shadowColor = rc; ctx.shadowBlur = 6; text(R.rank, x0 + 52, y0 + 92, 42, rc); ctx.restore();
  text('RANK', x0 + 52, y0 + 106, 8, ink);
  const lines = [[`남은 시간 ${R.sec}초 × 100`, R.win ? R.sec * 100 : 0], [`최대 랠리 ${B.maxRally} × 500`, B.maxRally * 500], [`Perfect ${B.stats.perfect}회 × 200`, B.stats.perfect * 200], [`실점 ${B.stats.miss}회 × -1,500`, -B.stats.miss * 1500]];
  lines.forEach(([a, v], i) => { text(a, x0 + 108, y0 + 62 + i * 13, 7, ink, 'left'); text((v < 0 ? '-' : '') + fmtN(Math.abs(v)), x0 + w - 16, y0 + 62 + i * 13, 7, ink, 'right'); });
  ctx.fillStyle = R.win ? '#b8860b' : '#ff3048'; ctx.fillRect(x0 + 108, y0 + 112, w - 124, 1);
  text('최종 점수', x0 + 108, y0 + 124, 9, ink, 'left'); text(fmtN(R.score), x0 + w - 16, y0 + 124, 11, rc, 'right');
  text('파티 기여도', GW / 2, y0 + 148, 9, ink);
  const P = bossParty(), S = B.stats;
  P.forEach((p, i) => {
    const y = y0 + 164 + i * 15, ch = CHARACTERS[p.char];
    text(ch.name, x0 + 18, y, 8, p.color, 'left');
    text(`딜 ${fmtN(S.dmg[i])} · 쉴드 ${fmtN(S.sh[i])} · 리시브 ${S.recv[i]}`, x0 + 82, y, 6, ink, 'left');
    const ts = R.titles.filter((q) => q[1] === i).map((q) => q[0]).join(' · ');
    if (ts) text(ts, x0 + w - 14, y, 6, R.win ? '#a0522d' : '#ffd23f', 'right');
  });
  text('칭호: 시공간 파괴자(최고 딜) · 쉴드 브레이커 · 철벽의 구원자(리시브) · 클러치 갓(결정타)', GW / 2, y0 + 218, 5.5, R.win ? '#7a5a2a' : '#c8a0b0');
  text(R.win ? '🎓 절대 통제자를 쓰러뜨리고 무사히 졸업했다!' : `도달: PHASE ${B.phase} · ${BOSS_PHASE[B.phase].name}`, GW / 2, y0 + 236, 6.5, R.win ? '#a0522d' : '#ff9ab8');
  if (!CERT_EXPORT) { // 버튼 (저장할 땐 안 보이게)
    const by = y0 + 244, ok = timer > 70;
    ctx.fillStyle = R.win ? '#b8860b' : '#ff3048'; ctx.beginPath(); ctx.roundRect(x0 + 24, by, 120, 18, 6); ctx.fill();
    text('📥 인증서 저장 (S)', x0 + 84, by + 12.5, 8, '#ffffff');
    ctx.fillStyle = ok ? (R.win ? '#3a2410' : '#555a70') : 'rgba(120,120,120,.5)'; ctx.beginPath(); ctx.roundRect(x0 + w - 144, by, 120, 18, 6); ctx.fill();
    text(NET.on ? '다시 도전 (Z/Enter)' : '타이틀로 (Z/Enter)', x0 + w - 84, by + 12.5, 8, '#ffffff');
    CERT_BTN = [[x0 + 24, by, 120, 18, 'save'], [x0 + w - 144, by, 120, 18, 'next']];
  } else text(new Date().toLocaleDateString('ko-KR') + ' · 동성 배구 대전', GW / 2, y0 + 256, 7, R.win ? '#7a5a2a' : '#c8a0b0');
}
function drawBossPanels() { // 캐릭터 선택: 파티 3칸 + 보스
  const D = BOSS_DIFF[bossDiff];
  [0, 2, 3].forEach((pi) => {
    const p = players[pi], cx = bossPanelX(pi), me = NET.on ? NET.side === pi : !p.ai;
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.roundRect(cx - 46, 160, 92, 140, 8); ctx.fill();
    if (me) { ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(cx - 46, 160, 92, 140, 8); ctx.stroke(); }
    const lab = p.ai ? '🤖 AI 팀원' : NET.on && NET.side === pi ? '나' : (pi === 0 ? '1P' : '2P') + (bossLocal === 2 && !NET.on ? (pi === 0 ? ' (DRGF·Z)' : ' (방향키·Enter)') : '');
    text(lab, cx, 172, 7, p.ai ? '#9fe6b8' : p.color);
    if (p.char < 0) { text('?', cx, 230, 40, p.color); text('랜덤', cx, 252, 10, '#fff'); text(p.picked ? '' : '1P가 골라 줘 (Z 확정)', cx, 292, 7, '#ddd'); return; }
    const c = CHARACTERS[p.char];
    ctx.save(); ctx.translate(cx, 214); ctx.scale(0.75, 0.75); drawFigure({ ...p, state: NORMAL, hm: 1, hw: 1, skillT: 0, side: 0 }); ctx.restore();
    text(c.name, cx, 252, 11, '#fff');
    const els = (CHAR_ELEM[c.skill] || []).map((e) => ELEM[e].ic).join('');
    text(c.grade + ' ' + els, cx, 264, 7, GRADE_COLOR[c.grade]);
    let fs = 7; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`; while (ctx.measureText(c.skillName).width > 86 && fs > 5) { fs -= 0.5; ctx.font = `bold ${fs}px "Malgun Gothic", sans-serif`; }
    text(c.skillName, cx, 276, fs, '#fff3a0');
    text(p.picked ? (p.ai ? 'AI 준비 완료!' : '준비 완료!') : '고르는 중...', cx, 292, 8, p.picked ? '#7dff9a' : '#ddd');
  });
  ctx.fillStyle = 'rgba(40,0,20,.6)'; ctx.beginPath(); ctx.roundRect(300, 160, 128, 140, 8); ctx.fill();
  ctx.strokeStyle = '#ff2a6a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(300, 160, 128, 140, 8); ctx.stroke();
  ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(BOSS_IMG.idle, 334, 168, 60, 80); ctx.restore();
  text('마왕 이사장', 364, 260, 11, '#ff5a8a'); text('BOSS · 3 PHASES', 364, 272, 7, '#ffb0c8');
  text(`${D.name} (${D.en})`, 364, 286, 9, D.col); text('⚖규율 → ⚡전뇌/🔥화염 → 4속성', 364, 297, 5.5, '#ffe9a0');
  text('파티 (왼쪽 팀)', 150, 156, 9, '#9fd4ff');
}
const BOSS_MENU = ['혼자 (AI 팀원 2명)', '둘이 한 키보드 (+ AI 1명)', '온라인 협동 (최대 3명)'];
function drawBossMenu() {
  ctx.fillStyle = 'rgba(14,4,16,.8)'; ctx.fillRect(0, 0, GW, GH);
  ctx.save(); ctx.imageSmoothingEnabled = false; ctx.globalAlpha = 0.9; ctx.drawImage(BOSS_IMG.idle, 318, 70, 96, 128); ctx.restore();
  ctx.save(); ctx.shadowColor = '#ff2a6a'; ctx.shadowBlur = 14; text('👑 보스 레이드', 160, 40, 22, '#ff5a8a'); ctx.restore();
  text("'절대 통제자' 마왕 이사장", 160, 62, 11, '#ffb0c8');
  if (state === 'bossMenu') {
    BOSS_MENU.forEach((m, i) => { const y = 100 + i * 32, on = i === bossMenuIdx;
      ctx.fillStyle = on ? 'rgba(255,90,140,.95)' : 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.roundRect(40, y - 18, 240, 26, 8); ctx.fill();
      text(m, 160, y, 13, on ? '#2a0010' : MOBILE.on && i === 1 ? '#8a8a8a' : '#ffffff'); });
    text('파티 3명이 리시브 → 토스 → 스파이크로 보스를 때려 눕혀!', 160, 214, 8, '#ffd0e0');
    text('속성 약점 · 융합 반응 · 그로기 · 기믹 파훼', 160, 228, 8, '#ffd0e0');
  } else {
    text('난이도', 160, 84, 12, '#ffffff');
    BOSS_DIFF.forEach((L, i) => { const y = 108 + i * 30, on = i === bossDiff;
      ctx.fillStyle = on ? L.col : 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.roundRect(40, y - 18, 240, 25, 8); ctx.fill();
      text(`${L.name} (${L.en})`, 160, y, 13, on ? '#1a0a10' : L.col); });
    const L = BOSS_DIFF[bossDiff];
    text(`보스 HP ${fmtN(L.hp)} · 쉴드 ${fmtN(L.sh)} · 공격력 x${L.atk}`, 160, 234, 7, '#ffffff');
    text(L.pen >= 99 ? '실점 1번 = 즉시 게임 오버 (원샷 필살)' : `파티 HP ${L.partyHp} · 실점하면 HP -${L.pen} · 그로기 ${L.groggy / 25}초`, 160, 246, 7, '#ffd0e0');
  }
  text(MOBILE.on ? '터치로 고르기 · ⏏ = 뒤로' : '↑↓(R/F) 고르기 · Z/Enter 선택 · Esc 뒤로 · 클릭도 돼', GW / 2, 284, 9, '#aab4c8');
}

// ===== 보스전 소리 (전부 WebAudio로 직접 합성) =====
function bossNoise(a) {
  if (!noiseBuf) { noiseBuf = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2); }
  const n = a.createBufferSource(); n.buffer = noiseBuf; return n;
}
function bossTone(a, type, f0, f1, t0, dur, vol, dest) {
  const o = a.createOscillator(), g = a.createGain(); o.type = type;
  o.frequency.setValueAtTime(f0, t0); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
  o.connect(g); g.connect(dest || a.destination); o.start(t0); o.stop(t0 + dur + 0.02);
}
let bossSfx = function (type, n = 1) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx, now = a.currentTime;
    if (type === 'spike') { // "콰앙-!": 메탈 킥 + 폭발 (랠리가 길수록 더 묵직)
      const k = Math.min(1, 0.55 + n * 0.07);
      bossTone(a, 'sine', 160, 40, now, 0.35, 0.9 * k);
      bossTone(a, 'square', 90, 45, now, 0.12, 0.18 * k);
      const ns = bossNoise(a), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'lowpass'; f.frequency.value = 1400 + n * 200;
      g.gain.setValueAtTime(0.8 * k, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.4); ns.connect(f); f.connect(g); g.connect(a.destination); ns.start(now); ns.stop(now + 0.45);
    } else if (type === 'drop') { // 보스 강타: 서브 베이스 드롭
      bossTone(a, 'sine', 120, 28, now, 0.9, 0.9); bossTone(a, 'triangle', 60, 30, now, 0.7, 0.4);
    } else if (type === 'glass') { // 쉴드 파괴: "콰콰쾅-파근!" 유리 + 전파
      for (let i = 0; i < 9; i++) bossTone(a, 'triangle', 2400 + Math.random() * 3600, 900 + Math.random() * 600, now + i * 0.025, 0.25, 0.12);
      const ns = bossNoise(a), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'highpass'; f.frequency.value = 2500;
      g.gain.setValueAtTime(0.7, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.6); ns.connect(f); f.connect(g); g.connect(a.destination); ns.start(now); ns.stop(now + 0.6);
      bossTone(a, 'sawtooth', 220, 30, now + 0.05, 0.6, 0.25); bossTone(a, 'sine', 90, 25, now, 0.8, 0.8);
    } else if (type === 'fusion') { // 융합 반응: 반짝이는 화음
      [523, 659, 784, 1046].forEach((f, i) => bossTone(a, 'triangle', f, f, now + i * 0.05, 0.5, 0.12));
    } else if (type === 'gaze') { // 무궁화 꽃이…: 오싹한 오르골
      [659, 587, 523, 587, 659, 659, 659].forEach((f, i) => bossTone(a, 'sine', f, f, now + i * 0.38, 0.32, 0.14));
    } else if (type === 'look') { bossTone(a, 'sawtooth', 70, 70, now, 0.5, 0.3); bossTone(a, 'square', 1400, 900, now, 0.25, 0.1);
    } else if (type === 'zap') { for (let i = 0; i < 5; i++) bossTone(a, 'square', 1800 - i * 250, 200, now + i * 0.03, 0.12, 0.12);
    } else if (type === 'thud') { bossTone(a, 'sine', 140, 50, now, 0.25, 0.6);
    } else if (type === 'duck') { // 확정 스킬: 음악 0.2초 음소거 + 초고음 스파크
      if (bossBus) { bossBus.gain.cancelScheduledValues(now); bossBus.gain.setValueAtTime(0.0001, now); bossBus.gain.linearRampToValueAtTime(BOSS_VOL, now + 0.6); }
      bossTone(a, 'sine', 4200, 7800, now + 0.2, 0.4, 0.18);
    } else if (type === 'win') { [392, 523, 659, 784, 1046].forEach((f, i) => bossTone(a, 'square', f, f, now + i * 0.12, 0.4, 0.08));
    } else if (type === 'lose') { [392, 349, 311, 262].forEach((f, i) => bossTone(a, 'sawtooth', f, f * 0.98, now + i * 0.3, 0.5, 0.08)); }
  } catch (err) { /* 소리 실패는 무시 */ }
};
// ----- BGM: 페이즈 1 = 오케스트라 현악 + 베이스 드럼 (정돈된 웅장함) -----
const BOSS_VOL = 0.16;
let bossBus = null, bossTimer = null, bossBeat = 0, bossNextT = 0;
let bossMusic = function (phase) {
  try {
    bossMusicStop();
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const a = audioCtx; bossBus = a.createGain(); bossBus.gain.value = BOSS_VOL; bossBus.connect(a.destination);
    bossBeat = 0; bossNextT = a.currentTime + 0.1;
    if (phase === 2) return bossMusic2(a);
    if (phase === 3) return bossMusic3(a);
    const BPM = 96, beat = 60 / BPM;
    // Dm - B♭ - Gm - A (단조 행진)
    const CH = [[146.8, 174.6, 220], [116.5, 146.8, 174.6], [98, 116.5, 146.8], [110, 138.6, 164.8]];
    const MEL = [587, 0, 523, 587, 698, 0, 659, 587, 523, 0, 466, 523, 587, 0, 554, 0];
    bossTimer = setInterval(() => {
      if (!bossBus) return;
      while (bossNextT < a.currentTime + 0.35) {
        const t = bossNextT, b = bossBeat, bar = Math.floor(b / 4) % 4, chord = CH[bar];
        if (b % 4 === 0) chord.forEach((f) => { // 현악 패드 (톱니파 2개 살짝 어긋나게)
          for (const det of [-4, 5]) { const o = a.createOscillator(), g = a.createGain(), fl = a.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = f * 2; o.detune.value = det;
            fl.type = 'lowpass'; fl.frequency.value = 1300; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05, t + 0.5); g.gain.linearRampToValueAtTime(0.0001, t + beat * 4);
            o.connect(fl); fl.connect(g); g.connect(bossBus); o.start(t); o.stop(t + beat * 4 + 0.05); } });
        if (b % 2 === 0) bossTone(a, 'sine', 95, 38, t, 0.4, 0.9, bossBus);            // 베이스 드럼
        if (b % 16 === 15) for (let i = 0; i < 6; i++) bossTone(a, 'sine', 110, 60, t + i * beat / 6, 0.18, 0.35, bossBus); // 팀파니 롤
        bossTone(a, 'triangle', chord[0] / 2, chord[0] / 2, t, beat * 0.9, 0.35, bossBus); // 베이스
        if (b % 8 === 0) chord.forEach((f) => bossTone(a, 'square', f * 2, f * 2, t, 0.25, 0.04, bossBus)); // 금관 스탭
        const m = MEL[b % 16]; if (m && b >= 16) bossTone(a, 'triangle', m, m, t, beat * 0.8, 0.12, bossBus); // 주선율 (2바퀴째부터)
        bossBeat++; bossNextT += beat;
      }
    }, 90);
  } catch (err) { /* 무시 */ }
};
let bossMusicStop = function () {
  if (bossTimer) clearInterval(bossTimer); bossTimer = null;
  if (bossBus) { try { const a = audioCtx; bossBus.gain.cancelScheduledValues(a.currentTime); bossBus.gain.setValueAtTime(bossBus.gain.value, a.currentTime); bossBus.gain.linearRampToValueAtTime(0, a.currentTime + 0.5); } catch (err) { /* 무시 */ } }
  bossBus = null;
};
bossSfx = useNativeRandom(bossSfx); bossMusic = useNativeRandom(bossMusic); bossMusicStop = useNativeRandom(bossMusicStop);

// ===== 보스전 연결 (기존 함수 앞뒤로 끼우기) =====
{ const baseHit = hitBall; hitBall = function (p, inp) { const info = bossMode && BOSS ? bossPreHit(p) : null; baseHit(p, inp); if (info) bossPostHit(p, inp, info); }; }
{ const baseAi = aiInput; aiInput = function (p) {
  const B = BOSS, idle = { x: 0, y: 0, power: false, skill: false };
  if (bossMode && B && state === 'play' && !cine) {
    if (p.boss && (B.gaze || B.groggyT > 0)) return idle;                                   // 보스: 뒤돌아 있거나 그로기
    if (!p.boss && B.gaze && (B.gaze.ph === 'look' || B.gaze.t > B.gaze.dur - 12)) return idle; // AI 팀원: 돌아보면 얼음
  }
  return baseAi(p);
}; }
{ const baseStart = startGame; startGame = function () { baseStart(); if (bossMode) bossStart(); }; }
{ const baseSel = updateSelect; updateSelect = function () { if (bossMode) { bossUpdateSelect(); return; } baseSel(); }; }
{ const baseU = update; update = function () {
  const c0 = cine, st0 = state;
  if (state === 'bossMenu') {
    players.forEach((p) => p.anim++);
    const up = pressed.has('KeyR') || pressed.has('ArrowUp'), dn = pressed.has('KeyF') || pressed.has('ArrowDown');
    if (up || dn) { bossMenuIdx = (bossMenuIdx + (dn ? 1 : BOSS_MENU.length - 1)) % BOSS_MENU.length; sfx('pop'); }
    if (pressed.has('Escape')) state = 'title';
    else if (powerPressed()) {
      sfx('pop');
      if (bossMenuIdx === 2) { state = 'title'; netOpenLobby(); netPickMode('boss'); }
      else if (bossMenuIdx === 1 && MOBILE.on) popups.push({ text: '모바일은 1인용만 돼! (베타)', x: GW / 2, y: 270, t: 40, color: '#ffd84d' });
      else { bossLocal = bossMenuIdx + 1; state = 'bossDiff'; }
      pressed.clear();
    }
  } else if (state === 'bossDiff') {
    players.forEach((p) => p.anim++);
    const up = pressed.has('KeyR') || pressed.has('ArrowUp'), dn = pressed.has('KeyF') || pressed.has('ArrowDown');
    if (up || dn) { bossDiff = (bossDiff + (dn ? 1 : 3)) % 4; sfx('pop'); }
    if (pressed.has('Escape')) state = 'bossMenu';
    else if (powerPressed()) { sfx('pop'); bossLocalSetup(); }
  } else if (state === 'bossClear') {
    timer++; players.forEach((p) => p.anim++);
    if (timer === 1) { players[1].state = LOSE; bossParty().forEach((p) => (p.state = WIN)); }
    if (timer >= 120) bossEnd(true, '3페이즈 완전 클리어');
  } else if (state === 'bossPhase') { // 페이즈 전환 연출
    timer++; players.forEach((p) => p.anim++);
    if (timer === 1) { players[1].state = LOSE; bossParty().forEach((p) => (p.state = WIN)); }
    if (timer === 60) { shake = 20; bossSfx('drop'); players[1].state = NORMAL; }
    if (timer >= 130) bossNextPhase();
  }
  baseU();
  if (bossMode && st0 !== 'e308' && state === 'e308') bossMusicStop();
  if (bossMode && st0 === 'e308' && state === 'over' && BOSS) { BOSS.hp = 0; BOSS.stats.clutch[0] += 5; bossEnd(true, '308호의 마지막 점호 (즉사 기믹)'); }
  if (bossMode && BOSS && BOSS.cutT > 0) BOSS.cutT--;
  if (bossMode && c0 && cine !== c0 && c0.caster && !c0.caster.boss && c0.kind !== 'dictator') bossSkillHit(c0); // 스킬 연출 끝 → 보스 피해
  if (bossMode && st0 === 'over' && state === 'title') setBoss(false); // 결과 화면 → 타이틀
}; }
function boss308Ready() { const B = BOSS; return !!(B && B.phase === 3 && !(B.orbs && B.orbs.length) && B.hp <= B.hpMax * 0.1 && !B.clearing); } // 308호 즉사 기믹 (김예안+김두현 파티, 페이즈 3 HP 10%)

// =====================================================================
// ===== 보스전 페이즈 2 · 3 (v7.1) =====
// 페이즈 2 '학생주임의 폭주': 전뇌 쉴드 → HP 50%에 화염 쉴드, 소지품 검사, 선도부 넷 블록, 소음 측정기 카운터, 벌점 폭탄, 굴절 마구, 체벌 집행
// 페이즈 3 '멸망의 졸업식': 4색 원소 궤도성(무적) → 4속성 순환 쉴드, 타임루프 환영공, 역사적 재앙 강타, 무회전 굴절 서브, 벌점 100점 즉형 집행, 308호 즉사 기믹
// =====================================================================
const BOSS_PHASE = [null,
  { name: '훈화 말씀의 압박', sub: '입문 & 기믹 적응', col: '#ffd23f' },
  { name: '학생주임의 폭주', sub: '광폭화 & 잡몹 소환', col: '#3cf0ff' },
  { name: '멸망의 졸업식', sub: '최종 전멸기 & 타임어택', col: '#ff2a6a' }];
const ORB_ORDER = ['order', 'cyber', 'phys', 'pyro']; // 4색 원소 구체 파괴 순서 (각각 약점 속성으로)
const ELEM_KEYS = ['cyber', 'pyro', 'order', 'phys'];
const CAST_INFO = { mute: ['소음 측정기 160dB — 음소거!', '#78c8ff'], punish: ['체벌 집행', '#ff5a5a'], illusion: ['타임루프 시공간 균열', '#c8a0ff'], disaster: ['역사적 재앙 강타', '#ff8a3a'] };
const SKILL_ARR = () => ({ cmj: CM_SKILLS, history: HEROES, math: MATH_SKILLS, kim: KIM_SKILLS, yean: YA_SKILLS, rina: RN_SKILLS, jmw: JM_SKILLS, gm: GM_SKILLS, jjh: JJ_SKILLS, wh: WH_SKILLS });

function bossNextPhase() { // 다음 페이즈 시작
  const B = BOSS, D = BOSS_DIFF[bossDiff];
  B.phase++; B.clearing = false;
  Object.assign(B, { hp: B.hpMax, groggyT: 0, brk: 100, rageArmed: false, fire: 0, fx: null, seq: [], gaze: null, desks: [], cast: null, ban: null, mobs: [], bombs: [], zones: [],
    bendArmed: 0, sonicArmed: false, illuArmed: false, spots: [], noise: 0, mobWave: 0, shSwitched: false, punishNext: 0, exec: null, execDone: false, trail: [], shRegenT: 0, orbs: null });
  const heal = D.pen >= 99 ? 0 : Math.ceil(B.partyHpMax * 0.3);
  B.partyHp = Math.min(B.partyHpMax, B.partyHp + heal);
  if (B.phase === 2) { B.sh = B.shMax; B.shElem = 'cyber'; B.banNext = 100; B.bombNext = D.bomb; B.bendNext = D.bend; }
  else { B.sh = 0; B.shElem = 'order'; B.orbs = ORB_ORDER.slice(); B.orbT = 0; B.rotT = D.rot; B.illuNext = D.illu; B.disNext = D.dis; B.bendNext = D.bend; }
  fakes.length = 0; ball.bend = null; ball.sonic = false;
  players.forEach((p) => (p.state = NORMAL));
  resetRound(0);
  bossSay(B.phase === 2 ? 'p2' : 'p3'); bossMusic(B.phase);
  if (heal) popups.push({ text: `파티 HP +${heal} 회복`, x: GW / 2, y: 170, t: 50, color: '#7dff9a' });
}
function bossOrbHit(elem, src, viaSkill) { // 페이즈 3: 원소 구체 부수기 (순서대로, 약점 속성으로)
  const B = BOSS, D = BOSS_DIFF[bossDiff]; if (!B.orbs || !B.orbs.length) return;
  const need = WEAK[B.orbs[0]], cracked = B.orbT >= 25 * 20;
  if (viaSkill || elem === need || cracked) {
    const o = B.orbs.shift(); B.orbT = 0;
    B.burst = { x: players[1].x, y: 120, col: ELEM[o].col, t: 16 };
    bossPop(`${ELEM[o].ic} ${ELEM[o].name} 구체 파괴! (${4 - B.orbs.length}/4)`, ELEM[o].col, 96, 34);
    B.rallyG += 10; if (src >= 0) B.stats.clutch[src]++; bossSfx('glass'); shake = 8;
    if (!B.orbs.length) { // 무적 해제 → 4대 융합 쉴드
      B.orbs = null; B.sh = B.shMax; B.shElem = ELEM_KEYS[Math.floor(Math.random() * 4)]; B.rotT = D.rot;
      bossPop(`무적 해제! 4대 융합 쉴드 전개 (${D.rot / 25}초마다 속성 변경)`, '#ffffff', 112, 60); bossSfx('drop');
    }
  } else { B.rage += 4; if (B.invT <= 0) { B.invT = 25; bossPop(`튕겨냄! 지금은 ${ELEM[need].ic}${ELEM[need].name} 속성이 필요해`, ELEM[need].col, 96, 28); } }
}
function bossCast(k) { // 보스 캐스팅 시작 (머리 맞히기 25% 차감 / 득점·스턴·스킬로 취소)
  const B = BOSS, D = BOSS_DIFF[bossDiff];
  const dur = { mute: D.mute, punish: D.punish, illusion: 50, disaster: 62 }[k];
  B.cast = { k, t: 0, dur, name: CAST_INFO[k][0] };
  if (k === 'disaster') { B.spots = []; for (let i = 0; i < 4; i++) B.spots.push(40 + i * 36 + Math.random() * 24); }
  bossSay({ mute: 'mute', punish: 'punish', illusion: 'illu', disaster: 'dis' }[k]); bossSfx('gaze');
  bossPop(`⚠ 캐스팅: ${B.cast.name}`, CAST_INFO[k][1], 120, 40);
}
function bossCastDone(k) {
  const B = BOSS, D = BOSS_DIFF[bossDiff];
  B.cast = null;
  if (k === 'mute') { B.sonicArmed = true; bossPop('다음 보스 공격 = 음파 반격공!', '#78c8ff', 120, 40); }
  else if (k === 'illusion') { B.illuArmed = true; bossPop('다음 보스 공격 = 환영공 4개!', '#c8a0ff', 120, 40); }
  else if (k === 'punish') { // 코트 전체 물리 대미지
    const pen = D.pen >= 99 ? 99 : Math.max(1, D.pen);
    B.partyHp = Math.max(0, B.partyHp - pen); B.rage += 10; shake = 22; hitStop = 8; bossSfx('drop'); bossSfx('thud');
    bossParty().forEach((p) => { p.freezeT = Math.max(p.freezeT || 0, 30); B.bolts = (B.bolts || []).concat({ x: p.x, y: p.y, t: 14 }); });
    bossPop(`체벌 집행!! 코트 전체 물리 대미지 (파티 HP -${Math.min(pen, 99)})`, '#ff5a5a', 110, 50);
    if (B.partyHp <= 0) bossEnd(false, '체벌 집행');
  } else if (k === 'disaster') { // 운석 + 낙뢰
    shake = 18; bossSfx('drop'); bossSfx('zap');
    for (const x of B.spots) {
      B.bolts = (B.bolts || []).concat({ x, y: 270, t: 16 }); effects.push({ x, y: 270, t: 8 });
      for (const p of bossParty()) if (Math.abs(p.x - x) < 24) {
        if (p.guardT > 0) popups.push({ text: '결사 방어!', x: p.x, y: p.y - 50, t: 24, color: '#ff8a3a' });
        else if (!(p.freezeT > 30)) { p.freezeT = 50; p.stunned = true; B.rage += 8; popups.push({ text: '재앙 강타! 2초 스턴', x: p.x, y: p.y - 50, t: 30, color: '#ff8a3a' }); }
      }
    }
    B.spots = [];
  }
}
function bossTickCommon(D, b) {
  const B = BOSS;
  // 캐스팅 진행 (보스가 멈칫·그로기면 강제 취소)
  if (B.cast) {
    if (b.freezeT > 0 || B.groggyT > 0) { bossPop(`스턴! ${B.cast.name} 캐스팅 강제 취소`, '#7dff9a', 130, 34); B.cast = null; B.rallyG += 15; B.spots = []; }
    else { B.cast.t += b.slowT > 0 ? 0.5 : 1; if (B.cast.t >= B.cast.dur) bossCastDone(B.cast.k); }
  }
  // 굴절 마구: 잔상을 남기며 꺾임
  if (ball.bend) {
    B.trail.push({ x: ball.x, y: ball.y, t: 10 });
    if (--ball.bend.t <= 0 && ball.bend.n > 0 && ball.y < 205) {
      const tx = 40 + Math.random() * 140;
      ball.vx = Math.max(-15, Math.min(15, (tx - ball.x) / 9)); if (ball.x > NET_X && ball.vx > -6) ball.vx = -6;
      ball.vy = Math.max(ball.vy, 1); ball.bend.n--; ball.bend.t = ball.bend.n > 3 ? 3 : 5;
      bossSfx('zap'); effects.push({ x: ball.x, y: ball.y, t: 5 });
    }
    if (ball.y >= BALL_GROUND_Y - 2) ball.bend = null;
  }
  for (const q of B.trail) q.t--; B.trail = B.trail.filter((q) => q.t > 0);
  if (B.burst && --B.burst.t <= 0) B.burst = null;
}
function bossTickP2(D, b) { // 페이즈 2: 학생주임의 폭주
  const B = BOSS;
  if (!B.shSwitched && B.hp <= B.hpMax * 0.5) { // 체력 50% → 화염 쉴드로 실시간 전환
    B.shSwitched = true; B.shElem = 'pyro'; B.sh = B.shMax; B.shRegenT = 0;
    bossPop('⚡전뇌 → 🔥화염 쉴드 전환! 이제 ⚡전뇌 속성에 약해', '#ff6a2a', 112, 60); bossSfx('glass');
  }
  // 2-1 소지품 검사: 속성 하나 압수
  if (B.ban) { if (--B.ban.t <= 0) { B.ban = null; B.banNext = D.ban; bossPop('소지품 검사 끝 (압수 해제)', '#9fe6b8', 120, 30); } }
  else if (--B.banNext <= 0) {
    const e = ELEM_KEYS[Math.floor(Math.random() * 4)]; B.ban = { e, t: 25 * 20 };
    bossSay('ban'); bossSfx('look'); bossPop(`🚫 소지품 검사! ${ELEM[e].ic}${ELEM[e].name} 속성 스킬 압수 (20초)`, '#ff8a8a', 112, 60);
  }
  // 2-2 선도부 2인 삼각 넷 블록 (체력 60%, 30%)
  if (B.mobWave < 1 && B.hp <= B.hpMax * 0.6) bossMobs();
  if (B.mobWave < 2 && B.hp <= B.hpMax * 0.3) { bossMobs(); B.punishNext = 50; }
  if (B.mobs.length) {
    if (--B.curtainT <= 0) { B.mobs = []; bossPop('선도부가 돌아갔다', '#9fe6b8', 120, 30); }
    else if (ball.vx > 0 && !ball.byBoss && ball.power && !(ball.pierce > 0) && !ball.unblockable && ball.x > NET_X - 6 && ball.x < NET_X + 34 && ball.y < NET_TOP + 8 && !(B.reflT > 0)) {
      ball.vx = -Math.abs(ball.vx) * 0.6; ball.vy = Math.min(ball.vy, -4); ball.power = false; B.fx = null; B.reflT = 12;
      const m = B.mobs.find((q) => q.hp > 0); if (m) { m.hp--; m.hurt = 8; }
      B.mobs = B.mobs.filter((q) => q.hp > 0);
      heavy(NET_X + 10, ball.y, 1.2); bossSfx('zap');
      bossPop(B.mobs.length ? '⚡ 선도부 넷 블록! 스파이크 반사' : '선도부 전멸! 장막 해제', B.mobs.length ? '#3cf0ff' : '#7dff9a', 104, 26);
    }
  }
  if (B.reflT > 0) B.reflT--;
  // 체벌 집행 (체력 30% 이하, 그 뒤로 30초마다)
  if (B.punishNext > 0 && --B.punishNext === 0) { if (!B.cast) { bossCast('punish'); B.punishNext = 750; } else B.punishNext = 25; }
  // 벌점 폭탄 투하 → 연소 지대
  if (--B.bombNext <= 0) {
    B.bombNext = D.bomb;
    for (let k = 0; k < 5; k++) B.bombs.push({ x: 40 + k * 30 + Math.random() * 16, y: -30 - k * 18, vy: 0, warn: 25 + k * 4 });
    bossPop('💣 벌점 폭탄 투하!', '#ff8a3a', 120, 30);
  }
  bossBombs();
  // 3연속 굴절 마구 예고
  if (--B.bendNext <= 0) { B.bendNext = D.bend; if (!B.bendArmed) { B.bendArmed = 3; bossPop('⚠ 다음 보스 공격: 3연속 굴절 마구', '#3cf0ff', 120, 34); } }
}
function bossMobs() {
  const B = BOSS; B.mobWave++;
  B.mobs = [{ x: 234, hp: 3 }, { x: 254, hp: 3 }]; B.curtainT = 25 * 20;
  bossSay('mob'); bossSfx('zap');
  bossPop('👮 선도부 2인 삼각 넷 블록! 일반 스파이크는 반사됨', '#3cf0ff', 112, 60);
}
function bossBombs() {
  const B = BOSS;
  for (const m of B.bombs) {
    if (m.warn > 0) { m.warn--; continue; }
    m.vy += 1.2; m.y += m.vy;
    if (m.y >= 262) { m.land = true; B.zones.push({ x: m.x, t: 150 }); effects.push({ x: m.x, y: 270, t: 7 }); bossSfx('thud');
      bossParty().forEach((p) => { if (Math.abs(p.x - m.x) < 18 && p.y > P_GROUND_Y - 30) { p.freezeT = Math.max(p.freezeT || 0, 15); popups.push({ text: '펑!', x: p.x, y: p.y - 40, t: 14, color: '#ff8a3a' }); } }); }
  }
  B.bombs = B.bombs.filter((m) => !m.land);
  for (const z of B.zones) { z.t--; for (const p of bossParty()) if (Math.abs(p.x - z.x) < 15 && p.y > P_GROUND_Y - 10) { p.slowT = Math.max(p.slowT || 0, 6); p.slowK = 0.5; } }
  B.zones = B.zones.filter((z) => z.t > 0);
}
function bossTickP3(D, b) { // 페이즈 3: 멸망의 졸업식
  const B = BOSS;
  if (B.orbs) { if (++B.orbT === 25 * 20) bossPop('구체에 금이 갔다! 이제 아무 속성으로나 부술 수 있어', '#ffffff', 120, 40); }
  else {
    if (B.sh > 0 && --B.rotT <= 0) { // 4대 속성 실시간 변환
      B.rotT = D.rot; const old = B.shElem; do { B.shElem = ELEM_KEYS[Math.floor(Math.random() * 4)]; } while (B.shElem === old);
      bossPop(`쉴드 속성 변경 → ${ELEM[B.shElem].ic}${ELEM[B.shElem].name} (약점 ${ELEM[WEAK[B.shElem]].ic}${ELEM[WEAK[B.shElem]].name})`, ELEM[B.shElem].col, 112, 40); bossSfx('look');
    }
    if (!B.execDone && B.hp <= B.hpMax * 0.15) { // 3-3 벌점 100점 즉형 집행
      B.execDone = true; B.exec = { t: D.p3, max: D.p3, ext: false }; B.cast = null; B.spots = [];
      bossSay('exec'); bossSfx('drop'); shake = 16;
      bossPop(`⚖ 벌점 100점 즉형 집행! ${D.p3 / 25}초 안에 쓰러뜨려!`, '#ff2a6a', 110, 70);
    }
    if (B.exec) { if (--B.exec.t <= 0) { B.exec = null; B.pages = 1; bossEnd(false, '벌점 100점 즉형 집행 (반성문 100장)'); return; } }
    else {
      if (--B.illuNext <= 0) { B.illuNext = D.illu; if (!B.cast && !B.illuArmed) bossCast('illusion'); }
      if (--B.disNext <= 0) { B.disNext = D.dis; if (!B.cast) bossCast('disaster'); }
    }
  }
  if (--B.bendNext <= 0) { B.bendNext = Math.round(D.bend * 1.4); if (!B.bendArmed) { B.bendArmed = 8; bossPop('⚠ 다음 보스 공격: 무회전 시공간 굴절 서브 (8번 꺾임)', '#3cf0ff', 120, 40); } }
  // 3-2 환영공: 받으면 폭발 (세종 해례본 낙하지점 시각화 중이면 티가 남)
  const sight = bossParty().some((p) => p.sightT > 0);
  for (let k = fakes.length - 1; k >= 0; k--) {
    const f = fakes[k]; if (!f.boss) continue;
    f.glitch = sight;
    const hit = bossParty().find((p) => Math.abs(f.x - p.x) < 24 && f.y > hitTop(p) - 12 && f.y < p.y + 32);
    if (hit) {
      fakes.splice(k, 1); effects.push({ x: f.x, y: f.y, t: 8 }); heavy(f.x, f.y, 1.6); bossSfx('glass');
      bossParty().forEach((p) => (p.freezeT = Math.max(p.freezeT || 0, 25))); B.rage += 10;
      bossPop('💥 환영공 폭발! 파티 전원 1초 스턴', '#c8a0ff', 110, 36);
    }
  }
}
// 스킬 발동 순간: 지금 기믹에 맞는 스킬로 자동 선택 (문서 '캐릭터별 기믹 대응' 표)
function bossAutoPick(c) {
  const B = BOSS, ARR = SKILL_ARR()[c.kind] || [];
  const fakesOn = B.illuArmed || (B.cast && B.cast.k === 'illusion') || fakes.some((f) => f.boss);
  const rules = [
    [!!B.exec && !B.exec.ext, 'cmj', 'time', '시간 팽창 → 즉형 집행 타이머 2배'],
    [!!B.exec, 'cmj', 'bigbang', '빅뱅 영역 전개 → 확정 폭딜'], [!!B.exec, 'kim', 'lincoln', '링컨의 기둥 → 확정 폭딜'], [!!B.exec, 'math', 'euler', '오일러 → 확정 폭딜'],
    [!!B.exec, 'history', 'ship', '거북선 → 확정 폭딜'], [!!B.exec, 'yean', 'evict', '벌점 통지서 → 확정 폭딜'],
    [!!(B.cast && B.cast.k === 'disaster'), 'history', 'gyebaek', '계백 결사 방어 → 재앙 강타 막기'], [!!(B.cast && B.cast.k === 'disaster'), 'math', 'euler', '오일러 → 패턴 강제 취소'],
    [fakesOn, 'history', 'hangul', '세종 해례본 → 진짜 공 낙하지점 표시'], [fakesOn, 'rina', 'math', '미적분 3D 굴절 → 환영공 모아 버림'],
    [!!(B.cast && B.cast.k === 'mute'), 'yean', 'scream', '160dB 샤우팅 → 맞불 음파 폭발'],
    [!!(B.cast && B.cast.k === 'punish'), 'wh', 'evict', '벌점 25점 집행 → 체벌 집행 디스펠'], [!!(B.cast && B.cast.k === 'punish'), 'rina', 'soc', '헌법 제1조 → 체벌 집행 디스펠'],
    [!!B.ban, 'rina', 'soc', '헌법 제1조 → 압수령 무효화'], [!!B.ban, 'kim', 'vote', '탄핵 소추 → 검사 권한 봉인'],
    [B.mobs.length > 0, 'math', 'rail', '미적분 레일건 → 선도부·장막 관통'], [B.mobs.length > 0, 'wh', 'clap', '더블 클랩 → 방어막 무시'], [B.mobs.length > 0, 'jmw', 'meteor', '운석 강타 → 잡몹 일괄 제거'],
    [B.zones.length > 0, 'wh', 'clap', '더블 클랩 → 연소 지대 관통'],
    [!!(B.bendArmed || ball.bend), 'math', 'blade', '행렬 대검 → 굴절 마구 방어'],
    [B.desks.length > 0 || B.mobs.length > 0 || B.bombs.length > 0 || fakesOn, 'yean', 'push', '신라천정 → 장해물·잡몹·투사체 전부 반사'],
    [!!(B.cast || B.gaze || B.rageArmed), 'yean', 'pull', '만상천인 → 캐스팅 즉시 취소'],
  ];
  for (const [on, kind, key, msg] of rules) {
    if (!on || c.kind !== kind) continue;
    const s = ARR.find((x) => x.key === key); if (!s) continue;
    if (kind === 'history') c.hero = s; else c.sk = s;
    if (kind === 'kim') c.counter = false;
    bossPop('자동 락온: ' + msg, '#ffe14a', 140, 44);
    break;
  }
  // 소지품 검사: 압수된 속성이면 다른 스킬로 바꿔 봄 (대응 스킬은 그대로)
  if (B.ban) {
    const key = bossSkillKey(c), banCounter = key === 'rina:soc' || key === 'kim:vote';
    if (!banCounter && SKILL_ELEM[key] === B.ban.e) {
      const alt = ARR.find((x) => SKILL_ELEM[c.kind + ':' + x.key] !== B.ban.e);
      if (alt) { if (c.kind === 'history') c.hero = alt; else c.sk = alt; if (c.kind === 'kim' && alt.key !== 'vote') c.counter = false; bossPop(`압수 피함: ${ELEM[B.ban.e].name} 대신 다른 스킬`, '#9fe6b8', 140, 36); }
      else { c.banned = true; bossPop(`⚠ ${ELEM[B.ban.e].name} 스킬밖에 없어… 압수당한다!`, '#ff8a8a', 140, 36); }
    }
  }
}
// 스킬이 기믹을 파훼 (연출이 끝난 순간)
function bossSkillCounter(c, key, elem, i) {
  const B = BOSS, D = BOSS_DIFF[bossDiff];
  const clutch = (n = 1) => (B.stats.clutch[i] += n);
  if (B.ban && (key === 'rina:soc' || key === 'kim:vote')) { B.ban = null; B.banNext = key === 'kim:vote' ? Math.max(D.ban, 250) + 250 : D.ban; bossPop(key === 'kim:vote' ? '탄핵 소추! 검사 권한 봉인' : '헌법 제1조! 압수령 무효', '#ffd23f', 104, 44); clutch(); B.rallyG += 15; }
  if (B.mobs.length && ['math:rail', 'wh:clap', 'jmw:meteor', 'party:party'].includes(key)) { B.mobs = []; bossDamage(D.dmg * 2, { elem, src: i, quiet: true }); bossPop('선도부 제거! 장막 해제', '#7dff9a', 104, 44); clutch(); B.rallyG += 15; }
  if (B.cast && B.cast.k === 'mute' && c.kind === 'yean') { B.cast = null; bossDamage(D.dmg * 12, { elem: 'phys', src: i }); bossPop('맞불 샤우팅! 보스 코트에 음파 대폭발', '#78c8ff', 104, 50); shake = 16; clutch(2); }
  if (B.cast && B.cast.k === 'punish' && (key === 'wh:evict' || key === 'rina:soc')) { B.cast = null; bossPop('체벌 집행 디스펠!', '#7dff9a', 104, 44); clutch(2); B.rallyG += 15; }
  if (B.zones.length && key === 'wh:clap') { B.zones = []; B.bombs = []; bossPop('더블 클랩! 연소 지대 소멸', '#7dff9a', 116, 36); }
  if (key === 'math:blade' && (B.bendArmed || ball.bend)) { B.bendArmed = 0; ball.bend = null; bossPop('행렬 대검! 굴절 마구 봉쇄', '#7dff9a', 116, 36); clutch(); }
  if (key === 'history:hangul' || key === 'rina:math') {
    const had = fakes.some((f) => f.boss) || B.illuArmed || (B.cast && B.cast.k === 'illusion');
    for (let k = fakes.length - 1; k >= 0; k--) if (fakes[k].boss) fakes.splice(k, 1);
    B.illuArmed = false; if (B.cast && B.cast.k === 'illusion') B.cast = null;
    if (had) { bossPop(key === 'rina:math' ? '4개의 공을 한 번에 계산! 환영 소멸' : '훈민정음! 진짜 공만 남았다', '#7dff9a', 116, 40); clutch(); }
  }
  if (key === 'history:gyebaek') { bossParty().forEach((p) => (p.guardT = Math.max(p.guardT || 0, 150))); if (B.cast && B.cast.k === 'disaster') { B.cast = null; B.spots = []; clutch(2); } bossPop('결사 방어막! 파티 전체 6초 보호', '#ff8a3a', 116, 40); }
  if (B.exec && key === 'cmj:time' && !B.exec.ext) { B.exec.ext = true; B.exec.t += B.exec.max; bossPop('시간 팽창! 즉형 집행 타이머 2배', '#3cf0ff', 104, 50); clutch(2); }
  if (BOSS_TRUE.includes(key) && B.cast) { bossPop(`${B.cast.name} 강제 취소!`, '#7dff9a', 116, 36); B.cast = null; B.spots = []; clutch(); }
  if (key === 'yean:push') { // 신라천정: 전 필드 반사 + 벽 꽂힘 스턴 + 쉴드 250%
    const nf = fakes.filter((f) => f.boss).length, n = B.desks.length + B.mobs.length + B.bombs.length + nf;
    B.desks.forEach((d) => { d.life = 0; d.smash = true; }); B.mobs = []; B.bombs = []; B.illuArmed = false;
    for (let q = fakes.length - 1; q >= 0; q--) if (fakes[q].boss) fakes.splice(q, 1);
    if (n) { bossDamage(D.dmg * 1.5 * n, { elem: 'phys', src: i, quiet: true }); bossPop(`신라천정! ${n}개 반사 → 보스에게 꽂힘`, '#c89bff', 104, 44); clutch(); B.rallyG += 15; }
    const b = players[1]; b.freezeT = Math.max(b.freezeT || 0, 100); if (B.groggyT > 0) B.groggyT += 50;
    if (B.sh > 0) bossDamage(D.dmg * 10, { elem, src: i, pure: true });
    bossPop('벽 꽂힘! 보스 4초 행동 불능', '#c89bff', 116, 40);
  }
  if (key === 'yean:pull') { // 만상천인: 캐스팅 즉시 취소 + 인력 붕괴
    const had = B.cast || B.gaze || B.rageArmed;
    if (B.cast) { B.cast = null; B.spots = []; } if (B.gaze) { B.gaze = null; B.gazeNext = D.gaze; } B.rageArmed = false;
    if (had) { bossPop('[PATTERN CANCELLED]', '#ff3040', 92, 50); clutch(2); B.rallyG += 15; }
    B.pullT = 125; bossPop('인력 붕괴! 5초 안 다음 스파이크 1.5배 · 속성 방어 무시', '#ff6a6a', 120, 36);
  }
}

// ----- 페이즈 2·3 그리기 -----
function drawStudent(x, y, t, hurt, flip) { // 선도부원 (코드로 그린 일반 학생)
  ctx.save(); ctx.translate(x, y); if (flip) ctx.scale(-1, 1);
  if (hurt > 0) ctx.filter = 'brightness(2)';
  ctx.fillStyle = '#1a1d33'; ctx.fillRect(-5, -14, 4, 14); ctx.fillRect(1, -14, 4, 14);
  ctx.fillStyle = '#23305a'; ctx.fillRect(-8, -36, 16, 23);
  ctx.fillStyle = '#f2f2f7'; ctx.fillRect(-2, -36, 4, 6);
  ctx.fillStyle = '#c8102e'; ctx.fillRect(-10, -32, 4, 6); ctx.fillStyle = '#ffd23f'; ctx.fillRect(-10, -30, 4, 1); // 완장
  ctx.fillStyle = '#e2b48e'; ctx.beginPath(); ctx.arc(0, -42, 7, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.fillRect(-7, -50, 14, 5); ctx.fillRect(4, -48, 3, 5);
  ctx.fillRect(-4, -43, 2, 2); ctx.fillRect(2, -43, 2, 2);
  ctx.fillStyle = '#23305a'; ctx.fillRect(-11, -26 + Math.sin(t * 0.3) * 1, 22, 4); // 팔짱
  ctx.restore();
}
function drawBossP23World() { // 선수 뒤: 연소 지대, 재앙 표시
  const B = BOSS; if (!B) return;
  const t = players[1].anim;
  for (const z of B.zones) for (let i = 0; i < 3; i++) {
    const x = z.x - 10 + i * 10, h = 10 + Math.sin(t * 0.5 + i + z.x) * 4, a = Math.min(1, z.t / 20);
    ctx.fillStyle = `rgba(255,${90 + i * 40},30,${0.55 * a})`; ctx.beginPath(); ctx.moveTo(x - 6, 272); ctx.quadraticCurveTo(x, 272 - h * 2, x + 6, 272); ctx.fill();
  }
  if (B.cast && B.cast.k === 'disaster') for (const x of B.spots) {
    const k = B.cast.t / B.cast.dur;
    ctx.strokeStyle = `rgba(255,60,40,${0.5 + 0.4 * Math.sin(t * 0.8)})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(x, 274, 24, 5, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = `rgba(255,80,40,${0.15 + 0.3 * k})`; ctx.beginPath(); ctx.ellipse(x, 274, 24 * k, 5 * k, 0, 0, 7); ctx.fill();
    text('☄', x, 40 + k * 200, 14, '#ff8a3a');
  }
  for (const m of B.bombs) {
    if (m.warn > 0) { ctx.fillStyle = `rgba(255,60,40,${0.3 + 0.3 * Math.sin(m.warn)})`; ctx.beginPath(); ctx.ellipse(m.x, 275, 14, 3, 0, 0, 7); ctx.fill(); continue; }
    ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(m.x, m.y, 8, 0, 7); ctx.fill();
    ctx.fillStyle = '#c8102e'; ctx.fillRect(m.x - 7, m.y - 3, 14, 6); text('벌점', m.x, m.y + 2.5, 5, '#fff');
  }
}
function drawBossP23Top() { // 선수 앞: 선도부·장막, 원소 구체, 굴절 잔상, 음파공
  const B = BOSS; if (!B) return;
  const b = players[1], t = b.anim;
  if (B.mobs.length) {
    ctx.save(); // 전기 장막
    ctx.globalAlpha = 0.35 + 0.15 * Math.sin(t * 0.7);
    const g = ctx.createLinearGradient(NET_X, NET_TOP - 110, NET_X, NET_TOP); g.addColorStop(0, 'rgba(60,240,255,0)'); g.addColorStop(1, 'rgba(60,240,255,.6)');
    ctx.fillStyle = g; ctx.fillRect(NET_X - 2, NET_TOP - 110, 30, 110);
    ctx.strokeStyle = '#bff8ff'; ctx.lineWidth = 1.5; ctx.beginPath();
    for (let k = 0; k < 3; k++) { let x = NET_X + 4 + k * 9; ctx.moveTo(x, NET_TOP - 110); for (let y = NET_TOP - 100; y <= NET_TOP; y += 12) { x = NET_X + 4 + k * 9 + (Math.random() - 0.5) * 8; ctx.lineTo(x, y); } }
    ctx.stroke(); ctx.restore();
    B.mobs.forEach((m) => drawStudent(m.x, 276, t, m.hurt = Math.max(0, (m.hurt || 0) - 1), true));
    text(`선도부 넷 블록 ${Math.ceil(B.curtainT / 25)}s`, NET_X + 26, 226, 7, '#bff8ff');
  }
  if (B.orbs) { // 4색 원소 궤도성
    const cx = b.x, cy = (hitTop(b) + b.y + 32) / 2;
    B.orbs.forEach((e, i) => {
      const a = t * 0.06 + i * Math.PI / 2, x = cx + Math.cos(a) * 62, y = cy + Math.sin(a) * 30, first = i === 0, r = first ? 11 : 8;
      const E = ELEM[e], g = ctx.createRadialGradient(x, y, 1, x, y, r * 1.8); g.addColorStop(0, '#fff'); g.addColorStop(0.4, E.col); g.addColorStop(1, `rgba(${E.rgb},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.8, 0, 7); ctx.fill();
      text(E.ic, x, y + 3, first ? 10 : 7, '#fff');
      if (first) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r + 4 + Math.sin(t * 0.4) * 2, 0, 7); ctx.stroke(); }
    });
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, 62, 30, 0, 0, 7); ctx.stroke();
  }
  if (B.burst) { const k = 1 - B.burst.t / 16; ctx.strokeStyle = B.burst.col; ctx.globalAlpha = 1 - k; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(B.burst.x, B.burst.y, 20 + k * 80, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; }
  for (const q of B.trail) { ctx.globalAlpha = q.t / 25; ctx.fillStyle = '#3cf0ff'; ctx.beginPath(); ctx.arc(q.x, q.y, BALL_R * 0.8, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
  if (ball.sonic) for (let i = 0; i < 3; i++) { const r = 24 + ((t * 3 + i * 10) % 30); ctx.strokeStyle = `rgba(120,200,255,${1 - (r - 24) / 30})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ball.x, ball.y, r, 0, 7); ctx.stroke(); }
}
function drawBossP23HUD() { // 화면 고정: 캐스팅 바, 압수, 소음계, 즉형 집행, 308호
  const B = BOSS; if (!B) return;
  const now = performance.now(), D = BOSS_DIFF[bossDiff];
  if (B.cast) { const k = Math.min(1, B.cast.t / B.cast.dur), col = CAST_INFO[B.cast.k][1];
    text('⚠ ' + B.cast.name, GW / 2, 100, 8, col); bar(GW / 2 - 80, 103, 160, 5, k, col, '#ff3048');
    text('머리 맞히기 · 득점 · 스턴 · 대응 스킬로 취소!', GW / 2, 116, 6, '#ffd0c0'); }
  if (B.ban) text(`🚫 압수: ${ELEM[B.ban.e].ic}${ELEM[B.ban.e].name} 스킬 (${Math.ceil(B.ban.t / 25)}s)`, 8, 62, 7, '#ff8a8a', 'left');
  if (B.phase === 2) { let s = '🔊 '; for (let i = 0; i < 5; i++) s += i < B.noise ? '▮' : '▯'; text(s + ' 소음 측정기', GW - 8, 62, 7, B.noise >= 4 ? '#ff8a8a' : '#78c8ff', 'right'); }
  const warn = B.sonicArmed ? '🔊 음파 반격공 대기 중' : B.illuArmed ? '⏳ 환영공 대기 중' : B.bendArmed ? `🌀 굴절 마구 대기 중 (${B.bendArmed}번)` : B.rageArmed ? '⚠ 계도 스파이크 대기 중' : '';
  if (warn) text(warn, GW - 8, 74, 7, '#ffe14a', 'right');
  if (B.exec) { const s = (B.exec.t / 25).toFixed(1), on = Math.floor(now / 250) % 2;
    ctx.fillStyle = `rgba(120,0,20,${0.15 + 0.1 * on})`; ctx.fillRect(0, 53, GW, GH - 53);
    text(`⚖ 벌점 100점 즉형 집행 ${s}초`, GW / 2, 124, 15, on ? '#ff2a6a' : '#ffffff');
    text(B.exec.ext ? '(시간 팽창으로 2배 연장됨)' : '시간 안에 HP 0! 확정 스킬을 퍼부어 · 차명준 시간 팽창 = 타이머 2배', GW / 2, 138, 6.5, '#ffd0d8'); }
  if (boss308Ready() && is308() && Math.floor(now / 300) % 2) text('🚪 M = 308호의 마지막 점호 (즉사 기믹!)', GW / 2, 152, 10, '#ffd0e0');
}
function drawBossPhaseCard() { // 페이즈 전환 연출
  const B = BOSS, t = timer, cur = BOSS_PHASE[B.phase], nx = BOSS_PHASE[B.phase + 1];
  if (t < 60) {
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, 0.8 - t * 0.05)})`; ctx.fillRect(0, 0, GW, GH);
    ctx.save(); ctx.shadowColor = cur.col; ctx.shadowBlur = 18; text(`PHASE ${B.phase} CLEAR`, GW / 2, 140, 30 * Math.min(1, 0.6 + t / 30), '#ffffff'); ctx.restore();
    if (t > 20) text('"크윽… 아직이다…!!"', GW / 2, 168, 10, '#ff9ab8');
  } else {
    const k = Math.min(1, (t - 60) / 14);
    ctx.fillStyle = `rgba(10,0,10,${0.7 * k})`; ctx.fillRect(0, 0, GW, GH);
    const gl = t < 76 && Math.floor(t / 2) % 2 ? (Math.random() - 0.5) * 10 : 0;
    ctx.save(); ctx.shadowColor = nx.col; ctx.shadowBlur = 20;
    text(`PHASE ${B.phase + 1}`, GW / 2 + gl, 112, 16 * k, nx.col);
    text(nx.name, GW / 2 + gl, 146, 28 * k, '#ffffff');
    ctx.restore();
    if (t > 80) text(nx.sub, GW / 2, 168, 10, nx.col);
    if (t > 92) text(B.phase === 1 ? '⚡전뇌 쉴드 (약점 ✊물리) → 체력 50%에 🔥화염 쉴드 (약점 ⚡전뇌)' : '무적! 4색 원소 구체를 ⚖→⚡→✊→🔥 순서로 부숴', GW / 2, 188, 7.5, '#ffffff');
    if (t > 100) text(B.phase === 1 ? '소지품 검사 · 선도부 넷 블록 · 소음 측정기 · 벌점 폭탄 · 굴절 마구 · 체벌 집행' : '환영공 · 재앙 강타 · 굴절 서브 · 벌점 100점 즉형 집행 · 308호', GW / 2, 202, 6.5, '#ffd0e0');
  }
}
// ----- BGM 페이즈 2: 하비 메탈 리프 + 다크 베이스 / 페이즈 3: 합창 + 서브 베이스 드롭 -----
let bossDist = null;
function bossSnare(a, t, v, dest) { const n = bossNoise(a), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'highpass'; f.frequency.value = 1500; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.16); n.connect(f); f.connect(g); g.connect(dest); n.start(t); n.stop(t + 0.2); }
function bossMusic2(a) {
  if (!bossDist) { bossDist = a.createWaveShaper(); const c = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; c[i] = Math.tanh(x * 6); } bossDist.curve = c; }
  const amp = a.createGain(); amp.gain.value = 0.35; const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
  bossDist.disconnect(); bossDist.connect(lp); lp.connect(amp); amp.connect(bossBus);
  const beat = 60 / 150 / 2; // 16분음표
  const RIFF = [82.4, 82.4, 0, 82.4, 98, 82.4, 110, 82.4, 82.4, 0, 82.4, 123.5, 116.5, 110, 98, 92.5]; // E 프리지안 리프
  bossTimer = setInterval(() => {
    if (!bossBus) return;
    while (bossNextT < a.currentTime + 0.3) {
      const t = bossNextT, b = bossBeat, f = RIFF[b % 16] * (Math.floor(b / 32) % 2 ? 1.122 : 1);
      if (f) for (const m of [1, 1.5]) { const o = a.createOscillator(), g = a.createGain(); o.type = 'sawtooth'; o.frequency.value = f * m; g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.01, t + beat * 0.95); o.connect(g); g.connect(bossDist); o.start(t); o.stop(t + beat); }
      if (b % 4 === 0 || b % 16 === 6) bossTone(a, 'sine', 120, 40, t, 0.2, 0.9, bossBus); // 킥
      if (b % 8 === 4) bossSnare(a, t, 0.5, bossBus);
      if (b % 2 === 1) bossSnare(a, t, 0.06, bossBus); // 하이햇 느낌
      if (f && b % 2 === 0) bossTone(a, 'triangle', f / 2, f / 2, t, beat * 1.8, 0.3, bossBus); // 다크 베이스
      bossBeat++; bossNextT += beat;
    }
  }, 80);
}
function bossMusic3(a) {
  const beat = 60 / 84;
  const CH = [[110, 130.8, 164.8], [87.3, 110, 130.8], [98, 123.5, 146.8], [82.4, 103.8, 123.5]]; // Am - F - G - E
  bossTimer = setInterval(() => {
    if (!bossBus) return;
    while (bossNextT < a.currentTime + 0.4) {
      const t = bossNextT, b = bossBeat, chord = CH[Math.floor(b / 4) % 4];
      if (b % 4 === 0) { // 합창 '아—' (톱니파를 모음 필터 2개로)
        chord.forEach((f) => { for (const oct of [2, 4]) { const o = a.createOscillator(), g = a.createGain(); o.type = 'sawtooth'; o.frequency.value = f * oct; o.detune.value = (Math.random() - 0.5) * 14;
          for (const fq of [800, 1150]) { const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fq; bp.Q.value = 6; const gg = a.createGain(); gg.gain.value = 0.5; o.connect(bp); bp.connect(gg); gg.connect(g); }
          g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.09, t + 0.8); g.gain.linearRampToValueAtTime(0.0001, t + beat * 4); g.connect(bossBus); o.start(t); o.stop(t + beat * 4 + 0.05); } });
        bossTone(a, 'sine', 70, 30, t, 1.2, 1.0, bossBus); // 서브 베이스 드롭
      }
      if (b % 2 === 1) bossTone(a, 'sine', 95, 50, t, 0.3, 0.5, bossBus);
      if (b % 8 === 7) for (let i = 0; i < 8; i++) bossTone(a, 'sine', 110, 55, t + i * beat / 8, 0.15, 0.35, bossBus); // 팀파니 롤
      if (b % 4 === 2) bossTone(a, 'sine', chord[2] * 8, chord[2] * 8, t, 1.2, 0.05, bossBus); // 종소리
      bossBeat++; bossNextT += beat;
    }
  }, 90);
}

// =====================================================================
// ===== 클릭·터치 조작 + 모바일 플레이 (베타, v7.2) =====
// - 메뉴·선택 화면은 처음부터 마우스 클릭이나 터치로 고를 수 있음
// - 메뉴 '모바일 플레이 (베타)' → 버튼 배치 2개 중 하나 고르기 → 화면에 터치 버튼이 생김 (1인용만)
// - 터치 버튼은 '가짜 키보드 입력'을 만들어서 기존 키 처리(온라인 포함)를 그대로 씀
// =====================================================================
let CERT_EXPORT = false, CERT_BTN = [];
const MOBILE = { on: false, layout: 'A', ui: null, shown: '', backT: 0 };
try { const v = localStorage.getItem('volley_mobile'); if (v === 'A' || v === 'B') { MOBILE.on = true; MOBILE.layout = v; } } catch (err) { /* 저장 안 돼도 괜찮음 */ }
let mobileIdx = 0;
const MOBILE_OPTS = ['A', 'B', 'off'];

// ----- 가짜 키 입력 -----
function vkey(code, isDown) { window.dispatchEvent(new KeyboardEvent(isDown ? 'keydown' : 'keyup', { code, bubbles: true })); }
const vq = []; let vqT = null;
function vpress(code) { vq.push(code); if (!vqT) vqRun(); } // 차례대로 누름 (한 프레임에 한 번씩 들어가게 간격 둠)
function vqRun() {
  const c = vq.shift(); if (!c) { vqT = null; return; }
  vkey(c, true); setTimeout(() => vkey(c, false), 30);
  vqT = setTimeout(vqRun, 70);
}
function myKeys() { // 지금 내가 쓰는 쪽 키
  const L = makePlayer(0).keys, R = makePlayer(1).keys;
  if (!NET.on && solo && humanSide === 1) return R;
  return L;
}

// ----- 화면 클릭/터치 → 메뉴 고르기 -----
function canvasPos(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * GW, y: (e.clientY - r.top) / r.height * GH }; }
const inR = (p, x, y, w, h) => p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h;
function selCardRect(i) { // drawSelect와 같은 계산
  const n = NCHAR, per = Math.ceil(n / 2), gap = 6, CH = 48, cw = Math.min(46, (GW - 16 - gap * (per - 1)) / per);
  const row = Math.floor(i / per), col = i % per, inRow = row === 0 ? per : n - per;
  return [GW / 2 - (inRow * cw + (inRow - 1) * gap) / 2 + col * (cw + gap), 34 + row * (CH + 12), cw, CH];
}
function selTarget() { // 지금 키를 누르면 움직이는 커서 (누구 캐릭터를 고르는 중인지)
  if (bossMode) {
    const P = bossParty(), me = NET.on ? players[NET.side] : players[0]; // 클릭은 1P 키로 들어감
    if (me && !me.picked) return { p: me, ai: false };
    if (!NET.on && P.every((p) => p.ai || p.picked)) { const A = P.find((p) => p.ai && !p.picked); if (A) return { p: A, ai: true }; }
    return null;
  }
  if (NET.on) { const me = players[NET.side]; return me.picked ? null : { p: me, ai: false }; }
  if (solo) { const H = players[humanSide], A = players[1 - humanSide]; return !H.picked ? { p: H, ai: false } : !A.picked ? { p: A, ai: true } : null; }
  const P = players[0]; return P.picked ? null : { p: P, ai: false };
}
function onCanvasTap(e) {
  if (NET.lobby) return;
  const p = canvasPos(e), k = myKeys();
  if (state === 'title') {
    MENU.forEach((m, i) => { const y = 114 + i * 26; if (inR(p, GW / 2 - 70, y - 19, 140, 26)) { menuIdx = i; vpress('KeyZ'); } });
  } else if (state === 'howto') vpress('KeyZ');
  else if (state === 'side') { if (inR(p, GW / 2 - 172, 110, 160, 120)) vpress('KeyZ'); else if (inR(p, GW / 2 + 12, 110, 160, 120)) vpress('Enter'); }
  else if (state === 'diff') { AI_LEVELS.forEach((L, i) => { const y = 124 + i * 36; if (inR(p, GW / 2 - 80, y - 19, 160, 28)) { aiLevel = i; vpress(players[humanSide].keys.a); } }); }
  else if (state === 'bossMenu') { BOSS_MENU.forEach((m, i) => { const y = 100 + i * 32; if (inR(p, 40, y - 18, 240, 26)) { bossMenuIdx = i; vpress('KeyZ'); } }); }
  else if (state === 'bossDiff') { BOSS_DIFF.forEach((L, i) => { const y = 108 + i * 30; if (inR(p, 40, y - 18, 240, 25)) { bossDiff = i; vpress('KeyZ'); } }); }
  else if (state === 'mobileSetup') { mobileSetupTap(p); }
  else if (state === 'select') {
    const T = selTarget(); if (!T) return;
    let hit = -1; for (let i = 0; i < NCHAR; i++) { const [x, y, w, h] = selCardRect(i); if (inR(p, x, y, w, h)) hit = i; }
    if (hit < 0) { if (p.y > 150) vpress(k.a); return; } // 아래 칸을 누르면 지금 캐릭터로 확정 (AI는 '?'면 랜덤)
    if (hit === T.p.char) { vpress(k.a); return; } // 같은 카드를 한 번 더 = 확정
    const n = T.ai ? NCHAR + 1 : NCHAR, pos = (c) => (c < 0 ? NCHAR : c); // AI 고를 땐 '랜덤(-1)' 칸이 하나 더 있음
    let d = (pos(hit) - pos(T.p.char) + n) % n; const right = d <= n / 2; if (!right) d = n - d;
    for (let i = 0; i < d; i++) vpress(right ? k.r : k.l);
  } else if (state === 'over') {
    if (bossMode && BOSS && BOSS.result) { for (const [x, y, w, h, act] of CERT_BTN) if (inR(p, x, y, w, h)) { if (act === 'save') bossCertDownload(); else if (timer > 70) vpress('KeyZ'); } }
    else if (timer > 70) vpress('KeyZ');
  } else if (state === 'e308') vpress('KeyZ');
}
cv.addEventListener('pointerdown', (e) => { e.preventDefault(); onCanvasTap(e); });
cv.style.touchAction = 'none';

// ----- 인증서 저장 (PNG) -----
function bossCertDownload() {
  if (!BOSS || !BOSS.result) return;
  CERT_EXPORT = true; draw();
  const S = SCALE, c = document.createElement('canvas'); c.width = 300 * S; c.height = 268 * S;
  c.getContext('2d').drawImage(cv, 66 * S, 18 * S, 300 * S, 268 * S, 0, 0, c.width, c.height);
  CERT_EXPORT = false; draw();
  const d = new Date(), ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const name = `dongsung_bossraid_${BOSS.result.rank}_${BOSS_DIFF[bossDiff].en}_${ymd}.png`; // 한글 파일 이름은 일부 브라우저에서 깨져서 영어로
  c.toBlob((blob) => { // 파일로 내려받기 (휴대폰에선 사진/파일 앱에 저장)
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }, 'image/png');
  popups.push({ text: '📥 인증서를 저장했어!', x: GW / 2, y: 296, t: 50, color: '#7dff9a' });
}
addEventListener('keydown', (e) => { if (e.code === 'KeyS' && !e.repeat && state === 'over' && bossMode && BOSS && BOSS.result && !NET.lobby) bossCertDownload(); }, true);

// ----- 모바일 버튼 배치 고르기 화면 -----
const MOB_LAYOUT = { // 화면 비율 기준 위치 (x, y = 0~1, 크기 r = 화면 짧은 쪽 기준)
  A: [['l', 0.08, 0.76, 0.08, '◀'], ['r', 0.24, 0.76, 0.08, '▶'], ['u', 0.16, 0.62, 0.08, '▲'], ['d', 0.16, 0.90, 0.07, '▼'],
      ['a', 0.88, 0.80, 0.11, '공격'], ['s', 0.73, 0.88, 0.075, '스킬']],
  B: [['l', 0.09, 0.84, 0.10, '◀'], ['r', 0.27, 0.84, 0.10, '▶'],
      ['u', 0.82, 0.60, 0.075, '점프'], ['a', 0.93, 0.76, 0.085, '공격'], ['d', 0.82, 0.89, 0.065, '▼'], ['s', 0.70, 0.78, 0.065, '스킬']],
};
const MOB_NAME = { A: ['A. 키보드형', '왼쪽 십자키 + 오른쪽 공격·스킬'], B: ['B. 양손형', '왼손 좌우 이동 · 오른손 점프·공격·아래·스킬'] };
function drawMobileSetup() {
  ctx.fillStyle = 'rgba(8,14,30,.88)'; ctx.fillRect(0, 0, GW, GH);
  text('📱 모바일 플레이 (베타)', GW / 2, 34, 20, '#fff3a0');
  text('편한 버튼 배치를 골라 줘! (1인용 · 터치로 모든 조작)', GW / 2, 54, 9, '#cfd8ea');
  ['A', 'B'].forEach((L, i) => {
    const x = 34 + i * 190, y = 70, w = 174, h = 150, on = mobileIdx === i;
    ctx.fillStyle = on ? 'rgba(255,240,150,.18)' : 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.fill();
    ctx.strokeStyle = on ? '#ffd84d' : '#556'; ctx.lineWidth = on ? 3 : 1.5; ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.stroke();
    // 휴대폰 화면 미리보기
    const px = x + 10, py = y + 10, pw = w - 20, ph = 88;
    ctx.fillStyle = '#5fb8ff'; ctx.fillRect(px, py, pw, ph); ctx.fillStyle = '#e9c97a'; ctx.fillRect(px, py + ph * 0.78, pw, ph * 0.22);
    ctx.fillStyle = '#555'; ctx.fillRect(px + pw / 2 - 1, py + ph * 0.5, 2, ph * 0.5);
    for (const [role, bx, by, r, lab] of MOB_LAYOUT[L]) {
      const cx = px + bx * pw, cy = py + by * ph, rr = r * ph * 0.9;
      ctx.fillStyle = role === 'a' ? 'rgba(255,90,90,.85)' : role === 's' ? 'rgba(255,210,63,.85)' : 'rgba(255,255,255,.75)';
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fill();
      text(lab, cx, cy + 2.5, lab.length > 1 ? 5 : 7, '#222');
    }
    text(MOB_NAME[L][0], x + w / 2, y + 116, 12, on ? '#ffd84d' : '#ffffff');
    text(MOB_NAME[L][1], x + w / 2, y + 132, 7, '#cfd8ea');
    if (MOBILE.on && MOBILE.layout === L) text('✓ 지금 쓰는 중', x + w / 2, y + 145, 7, '#7dff9a');
  });
  const offOn = mobileIdx === 2;
  ctx.fillStyle = offOn ? 'rgba(255,90,90,.9)' : 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.roundRect(GW / 2 - 90, 232, 180, 24, 8); ctx.fill();
  text(MOBILE.on ? '모바일 조작 끄기 (키보드로)' : '뒤로 (키보드로 할래)', GW / 2, 249, 10, offOn ? '#2a0010' : '#ffffff');
  text('화면을 터치하거나 ←→ / Z로 고르기 · 고르면 메뉴로 돌아가', GW / 2, 280, 8, '#aab4c8');
  text('※ 모바일에선 같이 플레이(2인용)는 안 돼 · 혼자 플레이·보스전(혼자)·온라인은 OK', GW / 2, 294, 6.5, '#8a94a8');
}
function mobileChoose(i) {
  const L = MOBILE_OPTS[i];
  if (L === 'off') { MOBILE.on = false; try { localStorage.removeItem('volley_mobile'); } catch (err) { /* 무시 */ } }
  else { MOBILE.on = true; MOBILE.layout = L; try { localStorage.setItem('volley_mobile', L); } catch (err) { /* 무시 */ } mobileBuildUI(); }
  sfx('pop'); state = 'title'; timer = 0; pressed.clear();
  popups.push({ text: L === 'off' ? '모바일 조작 끔' : `📱 ${MOB_NAME[L][0]} 배치로 켰어!`, x: GW / 2, y: 290, t: 50, color: '#7dff9a' });
}
function mobileSetupTap(p) {
  if (inR(p, 34, 70, 174, 150)) mobileChoose(0);
  else if (inR(p, 224, 70, 174, 150)) mobileChoose(1);
  else if (inR(p, GW / 2 - 90, 232, 180, 24)) { if (MOBILE.on) mobileChoose(2); else { state = 'title'; sfx('pop'); } }
}
{ const baseU2 = update; update = function () { // 배치 고르기 화면 키보드 조작
  if (state === 'mobileSetup') {
    players.forEach((p) => p.anim++);
    if (pressed.has('KeyD') || pressed.has('ArrowLeft')) mobileIdx = (mobileIdx + 2) % 3;
    if (pressed.has('KeyG') || pressed.has('ArrowRight') || pressed.has('KeyF') || pressed.has('ArrowDown')) mobileIdx = (mobileIdx + 1) % 3;
    if (pressed.has('KeyR') || pressed.has('ArrowUp')) mobileIdx = (mobileIdx + 2) % 3;
    if (pressed.has('Escape')) { state = 'title'; pressed.clear(); }
    else if (powerPressed()) { if (mobileIdx === 2 && !MOBILE.on) { state = 'title'; } else mobileChoose(mobileIdx); pressed.clear(); }
  }
  baseU2();
}; }

// ----- 터치 버튼 (HTML) -----
function mobileBuildUI() {
  if (MOBILE.ui) MOBILE.ui.remove();
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:5;user-select:none;-webkit-user-select:none;touch-action:none';
  const mk = (role, bx, by, r, lab) => {
    const b = document.createElement('div'); b.dataset.role = role; b.textContent = lab;
    const col = role === 'a' ? 'rgba(255,80,80,.5)' : role === 's' ? 'rgba(255,210,63,.5)' : role === 'm' ? 'rgba(255,120,180,.6)' : role === 'x' ? 'rgba(40,40,60,.6)' : 'rgba(255,255,255,.28)';
    b.style.cssText = `position:absolute;border-radius:50%;background:${col};box-sizing:border-box;
      border:2px solid rgba(255,255,255,.55);color:#fff;font-weight:bold;font-family:"Malgun Gothic",sans-serif;display:flex;align-items:center;justify-content:center;pointer-events:auto;touch-action:none;text-shadow:0 1px 3px #000`;
    b.spec = [bx, by, r / 100, lab]; d.appendChild(b); return b;
  };
  for (const [role, bx, by, r, lab] of MOB_LAYOUT[MOBILE.layout]) mk(role, bx, by, r * 100, lab);
  const back = mk('x', 0.05, 0.07, 4.5, '⏏'); back.style.borderRadius = '30%';
  const m308 = mk('m', 0.5, 0.12, 5, '308'); m308.style.display = 'none'; MOBILE.m308 = m308;
  MOBILE.btns = [...d.children].filter((b) => 'lrudas'.includes(b.dataset.role) && b.dataset.role.length === 1 && b.dataset.role !== 'x');
  // 누르기: 방향키는 손가락을 미끄러뜨리면 옆 버튼으로 바뀜
  const held = new Map(); // pointerId → role
  const code = (role) => myKeys()[role];
  const down = (id, role) => { held.set(id, role); vkey(code(role), true); };
  const up = (id) => { const r = held.get(id); if (r) vkey(code(r), false); held.delete(id); };
  d.addEventListener('pointerdown', (e) => {
    const b = e.target.closest('[data-role]'); if (!b) return; e.preventDefault();
    const role = b.dataset.role;
    if (role === 'x') { mobileBack(); return; }
    if (role === 'm') { vpress('KeyM'); return; }
    try { b.setPointerCapture(e.pointerId); } catch (err) { /* 무시 */ }
    down(e.pointerId, role); b.style.filter = 'brightness(1.8)';
  });
  d.addEventListener('pointermove', (e) => {
    const cur = held.get(e.pointerId); if (!cur || !'lrud'.includes(cur)) return;
    const el = document.elementFromPoint(e.clientX, e.clientY), b = el && el.closest && el.closest('[data-role]');
    const nr = b && 'lrud'.includes(b.dataset.role) ? b.dataset.role : null;
    if (nr && nr !== cur) { up(e.pointerId); down(e.pointerId, nr); MOBILE.btns.forEach((q) => (q.style.filter = q.dataset.role === nr ? 'brightness(1.8)' : '')); }
  });
  const end = (e) => { up(e.pointerId); MOBILE.btns.forEach((q) => (q.style.filter = '')); };
  d.addEventListener('pointerup', end); d.addEventListener('pointercancel', end);
  d.addEventListener('contextmenu', (e) => e.preventDefault());
  document.body.appendChild(d); MOBILE.ui = d; MOBILE.shown = '';
  mobilePlace();
}
function mobilePlace() { // 화면 크기·방향에 맞춰 버튼 자리 계산 (세로면 게임 화면 아래 빈 곳에)
  if (!MOBILE.ui) return;
  const W = innerWidth, H = innerHeight, portrait = H > W, rc = cv.getBoundingClientRect();
  const unit = portrait ? W * 0.78 : Math.min(W, H);
  const zoneTop = portrait ? Math.min(H - 160, rc.bottom + 10) : 0, zoneH = portrait ? H - zoneTop - 6 : H;
  for (const b of MOBILE.ui.children) {
    const [bx, by, r, lab] = b.spec, R = Math.max(18, r * unit);
    let cx = Math.max(R + 4, Math.min(W - R - 4, bx * W)), cy;
    if (b.dataset.role === 'x' || b.dataset.role === 'm') cy = portrait ? Math.max(R + 6, rc.top - R - 6) : by * H; // 위쪽 버튼
    else cy = portrait ? zoneTop + R + (by - 0.55) / 0.42 * Math.max(0, zoneH - 2 * R) : by * H;
    cy = Math.max(R + 4, Math.min(H - R - 4, cy));
    Object.assign(b.style, { left: cx - R + 'px', top: cy - R + 'px', width: 2 * R + 'px', height: 2 * R + 'px', fontSize: (lab.length > 1 ? R * 0.55 : R * 0.8) + 'px' });
  }
}
addEventListener('resize', () => setTimeout(mobilePlace, 50));
addEventListener('orientationchange', () => setTimeout(mobilePlace, 200));
function mobileBack() { // ⏏ 버튼: 메뉴에선 뒤로, 경기 중엔 두 번 누르면 처음 화면으로
  if (['side', 'diff', 'bossMenu', 'bossDiff', 'howto', 'mobileSetup'].includes(state)) { vpress('Escape'); return; }
  if (state === 'title') return;
  const now = performance.now();
  if (now - MOBILE.backT < 1500) { MOBILE.backT = 0; vpress('Backspace'); vpress('Backspace'); vpress('Backspace'); }
  else { MOBILE.backT = now; popups.push({ text: '⏏ 한 번 더 누르면 처음 화면으로', x: GW / 2, y: 150, t: 36, color: '#ffd84d' }); }
}
function mobileSync() { // 상황에 맞게 버튼 보이기/숨기기
  if (!MOBILE.on) { if (MOBILE.ui) { MOBILE.ui.remove(); MOBILE.ui = null; } return; }
  if (!MOBILE.ui) mobileBuildUI();
  const game = !isMenu() && !['select', 'over', 'e308'].includes(state) && !NET.lobby;
  const want = (game ? 'g' : 'm') + (NET.lobby ? 'L' : '');
  if (want !== MOBILE.shown) {
    MOBILE.shown = want;
    MOBILE.btns.forEach((b) => (b.style.display = game ? 'flex' : 'none'));
    MOBILE.ui.style.display = NET.lobby ? 'none' : '';
  }
  const show308 = game && is308();
  if (MOBILE.m308.style.display !== (show308 ? 'flex' : 'none')) MOBILE.m308.style.display = show308 ? 'flex' : 'none';
}
{ const baseD = draw; draw = function () { baseD(); if (!CERT_EXPORT) mobileSync(); }; }
{ const mv = document.querySelector('meta[name=viewport]'); if (mv) mv.content = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'; }
document.body.style.touchAction = 'none'; document.body.style.userSelect = 'none'; document.body.style.webkitUserSelect = 'none';

// ===== 시작 로딩 화면 (v7.3) — 검은 화면 'made by 경목' → 로딩 중... → 메인 화면 (약 3초) =====
// 게임 상태는 안 바꾸고 화면 위에 덮어서 그림. 테스트 자동화(Playwright)에서는 건너뜀.
const INTRO_MADE = 30, INTRO_END = 75;                 // 25FPS 기준: 1.2초 / 3초
const INTRO_SQ = ['RARE', 'EPIC', 'MYTHIC', 'ULTRA', 'LEGENDARY', 'COMMON']; // 둘레 네모 색 = 등급 색
const INTRO_TIPS = ['공중에서 공격 + 방향키 = 스파이크 방향이 바뀌어', '땅에서 공격 + 좌우 = 다이빙', '마나가 다 차면 스킬!', '등급이 높을수록 시네마틱이 화려해', '15점 먼저 내면 승리'];
const INTRO = { t: navigator.webdriver ? INTRO_END : 0, tip: INTRO_TIPS[Math.floor(Math.random() * INTRO_TIPS.length)] };
{ const baseU = update; update = function () {
  if (INTRO.t < INTRO_END) { INTRO.t++; pressed.clear(); return; } // 로딩 중엔 입력 무시
  baseU();
}; }
function drawIntro() {
  const t = INTRO.t, c = ctx;
  c.save(); c.setTransform(SCALE, 0, 0, SCALE, 0, 0); c.textAlign = 'center'; c.textBaseline = 'middle';
  if (t < INTRO_MADE) { // ① 검은 화면 + made by 경목
    c.fillStyle = '#000'; c.fillRect(0, 0, GW, GH);
    c.globalAlpha = Math.max(0, Math.min(1, t / 8, (INTRO_MADE - t) / 6));
    c.fillStyle = '#fff'; c.font = 'bold 22px "Malgun Gothic", sans-serif'; c.fillText('made by 경목', GW / 2, GH / 2);
    c.restore(); return;
  }
  const k = t - INTRO_MADE, dur = INTRO_END - INTRO_MADE;
  c.globalAlpha = Math.min(1, k / 5, (INTRO_END - t) / 6); // 들어올 때·나갈 때 페이드 (나갈 땐 메인 화면이 비쳐 보임)
  // ② 배경: 밤하늘 + 도트 잔디·흙
  const g = c.createLinearGradient(0, 0, 0, GH); g.addColorStop(0, '#0d1a33'); g.addColorStop(0.6, '#1d3557'); g.addColorStop(1, '#0a0a0a');
  c.fillStyle = g; c.fillRect(0, 0, GW, GH);
  for (let x = 0; x < GW; x += 8) { const h = (x * 37) % 3; c.fillStyle = '#2f6b2a'; c.fillRect(x, 232 + h * 2, 8, 8); c.fillStyle = '#5a3a1e'; c.fillRect(x, 240 + h * 2, 8, 64); c.fillStyle = '#4a2f18'; if ((x / 8) % 3 === 1) c.fillRect(x + 2, 254, 3, 3); }
  const vg = c.createRadialGradient(GW / 2, GH / 2, 60, GW / 2, GH / 2, 260); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.7)');
  c.fillStyle = vg; c.fillRect(0, 0, GW, GH);
  // ③ 가운데 네모 + 둘레 등급 색 네모 (차례대로 반짝)
  const cx = GW / 2, cy = 116, on = Math.floor(k / 3) % 6;
  INTRO_SQ.forEach((gr, i) => {
    const sx = cx + (i < 3 ? -58 : 58), sy = cy + ((i % 3) - 1) * 38, lit = i === on, s = lit ? 14 : 10;
    c.fillStyle = GRADE_COLOR[gr]; if (lit) { c.shadowColor = GRADE_COLOR[gr]; c.shadowBlur = 12; }
    c.fillRect(Math.round(sx - s / 2), Math.round(sy - s / 2), s, s); c.shadowBlur = 0;
  });
  c.fillStyle = '#000'; c.fillRect(cx - 34, cy - 34, 68, 68);
  c.fillStyle = '#9a9a9a'; c.fillRect(cx - 30, cy - 30, 60, 60);
  c.fillStyle = '#000'; c.fillRect(cx - 20, cy - 20, 40, 40);
  const sp = Math.min(1, k / (dur - 6)); // 진행도 0 → 1
  c.strokeStyle = GRADE_COLOR[INTRO_SQ[on]]; c.lineWidth = 2; c.strokeRect(cx - 18, cy - 18, 36, 36);
  // 가운데: 도트 배구공이 통통 튀며 빙글
  c.save(); c.translate(cx, cy + 2 - Math.abs(Math.sin(k * 0.35)) * 8); c.rotate(k * 0.3);
  c.fillStyle = '#fff'; c.fillRect(-10, -10, 20, 20); c.fillStyle = '#ffd23f'; c.fillRect(-10, -3, 20, 6); c.fillStyle = '#3d8bff'; c.fillRect(-3, -10, 6, 20);
  c.restore();
  // ④ 로딩 중... + 진행 막대 + 팁
  c.fillStyle = '#fff'; c.font = 'bold 13px "Malgun Gothic", sans-serif';
  c.fillText('로딩 중' + '.'.repeat(1 + (Math.floor(k / 5) % 3)), cx, 182);
  const bw = 160, bx = cx - bw / 2, by = 198;
  c.fillStyle = '#000'; c.fillRect(bx - 2, by - 2, bw + 4, 10); c.fillStyle = '#333'; c.fillRect(bx, by, bw, 6);
  for (let i = 0; i < Math.floor(sp * 16); i++) { c.fillStyle = i % 2 ? '#3ccf5a' : '#4fe36c'; c.fillRect(bx + i * 10, by, 10, 6); }
  c.fillStyle = 'rgba(255,255,255,0.75)'; c.font = 'bold 9px "Malgun Gothic", sans-serif'; c.fillText('TIP · ' + INTRO.tip, cx, 222);
  c.restore();
}
{ const baseD = draw; draw = function () { baseD(); if (INTRO.t < INTRO_END) drawIntro(); }; }
