# HANDOFF — 동성 배구 대전 (v5.11.1 기준 · 새 채팅 인수인계 완전판)

> **새 채팅의 Claude에게**
> 이 문서를 처음부터 끝까지 다 읽고 작업을 이어 가 줘. 특히 **§1 작업 규칙**은 사용자가 직접 정한 거라 꼭 지켜야 해.
> 사용자는 이전 채팅이 너무 길어져서 새 채팅으로 옮긴 거야. 지금까지 결정한 내용이 전부 여기 들어 있어.

---

## 0. 한눈에 보기
- 이름: **동성 배구 대전**. 피카츄 배구처럼 키보드 하나로 둘이 하는 웹 배구 게임. 혼자 플레이(AI전)도 됨
- 배포: http://aidogam.kr/volleyball-game/ (GitHub Pages, 공개 저장소)
- 사용자 컴퓨터 폴더: `C:\Users\user\OneDrive\문서\GitHub\13 배구`
  - Cowork 장치 셸에서는 `$HOME/mnt/13 배구`
- **AI 도감 저장소(fewwarrior11045.github.io)와 완전히 다른 저장소.** AI 도감 폴더에는 절대 넣지 말 것
- 코드는 전부 `game.js` 한 파일(약 6,500줄, 445KB). 실행은 `index.html`
- 캐릭터는 사용자 친구들의 **실제 사진**(배경만 지운 원본 사진)
  - 등급 + 시네마틱 스킬 + 전용 대사가 있음
- 현재 버전: **v5.11.1**

---

## 1. 작업 규칙 (사용자 요청 — 반드시 지키기)
1. 사용자는 **고등학생, 코딩 초보**.
   - **한국어로, 친근하고 짧게, 단계별로** 설명해 줘.
   - 어려운 용어는 쉽게 풀어서 말해 줘.
2. **시키지 않은 수정은 하지 말고 먼저 물어보기.** "ㄱㄱ", "해줘", "ㄲ"라고 하면 바로 진행.
3. 큰 수정 전에는 **"무엇을, 왜 바꾸는지" 한두 줄** 먼저 말하기.
4. 작업이 끝나면 **"📌 Push 후 할 일" 목록 + 커밋 메시지**를 알려 주기.
   - 커밋 메시지 형식: `v1.2 무엇을 했는지 한 줄`
   - 버전: 크게 바뀌면 앞자리(v6.0), 기능·내용이 늘면 가운데(v5.12), 작게 고치면 뒷자리(v5.11.2)
5. **git은 읽기만** (`git status`, `git log`).
   - `git commit`, `pull`, `fetch`, `push`는 하지 말 것. 커밋·푸시는 항상 사용자가 GitHub Desktop에서 함.
   - 작업 시작할 때 `git status`로 Push 안 한 변경이 있는지 먼저 알려 주기 (폴더 연결됐을 때).
6. **사용자 실명·학교는 코드나 게임 화면에 넣지 않기.**
   - 예외: 게임 제목 '동성 배구 대전'은 사용자가 직접 요청한 것.
   - 친구 캐릭터 이름은 사용자가 정해 준 대로 씀.
7. 파일 경로는 `/assets/...`가 아니라 **`assets/...` 상대 경로**로.
8. 저장소를 공개(Public)로 바꾸는 등 공개 관련 변경은 **하기 전에 사용자에게 확인.**
9. **파일 삭제가 필요하면 먼저 물어보기.**
10. 다른 사람의 캐릭터·그림·음악·코드를 베끼지 않기.
    - 무료 소스를 쓰면 출처·라이선스를 README에 적기.
    - 효과음과 음악은 전부 WebAudio로 코드에서 직접 만든 것.
11. 저장 데이터는 브라우저 localStorage에. 키 이름 앞에 **`volley_`** 접두사 (지금은 저장 기능 없음).
12. **큰 작업이 끝날 때마다 이 HANDOFF.md를 알아서 업데이트** (버전 기록 §12에 한 줄 추가).
13. 수정한 뒤에는 꼭 확인하기.
    - `node --check game.js`
    - 미리보기를 만들어서 **진짜 키 입력으로** 실행 테스트 (§11)
    - v5.11.1 버그는 내부 함수만 직접 불러서 테스트하다가 놓친 거였음.
14. 폴더가 연결돼 있으면 파일 수정은 사용자 컴퓨터에서 직접 하기 (python/sed로 제자리 수정).
    - 연결이 안 돼 있으면 수정한 `game.js`와 새 사진을 보내 주고, 사용자가 폴더에 덮어쓰게 안내.
15. **매번 미리보기 html을 만들어서 보내 주기.** 사용자는 다운로드해서 더블클릭으로 바로 실행해 봄.
    - 방법은 §11.
16. 내용 관련 규칙
    - 친구 캐릭터에 실명·사진·놀리는 대사를 넣을 때는 "본인한테 괜찮은지 물어봐 줘"라고 한 줄 알려 주기.
    - 게임 캐릭터가 아닌 실존 인물(선생님, 사감 등)을 욕하거나 폭로하는 내용은 이름 없이 일반 명칭으로 ("노사", "사감실").
    - 실존하는 미성년 친구를 성적으로 다루거나 몸매를 조롱하는 컨셉은 하지 않기 (§13 성도균 참고).
    - 사진은 원본 사진만 오려서 씀. 몸을 그림으로 그려 붙이지 않음.
    - 시네마틱 안의 이펙트·배경·소품은 코드로 그려도 됨.
17. 개발자 전용 키(O 세 번, 0 키)는 화면에 안내하지 않기.

---

## 2. 조작
| | 왼쪽 선수 | 오른쪽 선수 |
|---|---|---|
| 이동 | D / G | ← / → |
| 점프 | R | ↑ |
| 아래 | F | ↓ |
| 공격 | Z | Enter |
| 스킬 | 왼쪽 Shift | 숫자패드 5 또는 ; |

**경기 규칙**
- 공중에서 공격 + 방향키 → 스파이크 방향·세기 7가지
- 땅에서 공격 + 좌우 → 다이빙
- 15점 먼저 내면 승리 (`CONFIG.WIN_SCORE`)
- 마나: 스파이크가 공에 맞을 때마다 1칸. 기본 5칸이 차면 스킬 사용 가능
  - 캐릭터별 `mana` 값이 있으면 그걸 씀: 키다리 3, 김지연 3, 차명준 6

**메뉴**
- 메뉴: `['혼자 플레이','같이 플레이','조작 방법']`. ↑↓(R/F)로 고르고 Z/Enter로 선택
- 혼자 플레이 순서
  1. 내 쪽 고르기 (Z = 왼쪽, Enter = 오른쪽)
  2. 난이도 고르기 (쉬움/보통/어려움)
  3. 캐릭터 고르기. AI 캐릭터는 사람이 안 골라 주면 랜덤
- Esc = 뒤로 / 타이틀

**특수 키**
- 백스페이스 3번 = 타이틀로 리셋 (restartReq)
- 개발자 전용 (화면 안내 X)
  - O 세 번 = 독재 100% 테스트 (dictTest, 오른쪽 아래에 빨간 점)
  - 0 키 = 개발자용 단축 기능
- **M** = 김예안 vs 김두현 경기에서만, 경기를 중단하고 308호 엔딩 보기
  - 그 매치에서만 화면 아래에 "M = 308호 엔딩 보기" 안내가 깜빡임

---

## 3. 파일 구조
```
index.html                 캔버스 864x608 + <script src="game.js">
game.js                    게임 코드 전부
README.md                  조작법·캐릭터 소개 (사용자 폴더 쪽이 최신)
HANDOFF.md                 이 문서
tools/build_preview.py     미리보기 한 파일 만드는 스크립트 (§11)
tools/test_skill.js        진짜 키 입력으로 스킬 테스트 (Playwright)
assets/
  kdh.png            김두현 (얼굴)
  minwook.png        장민욱
  tall.png           키다리
  swim.png           김지연
  hair.png           문경목
  democracy.png      김민주
  wonder.png / wonder_body.png      원더재원 (body가 게임용)
  dongwoo.png / dongwoo_body.png    역사왕 (body가 게임용)
  math.png           박준형 (실제 사진)
  jjh.png            주지혁
  cmj.png            차명준
  yean.png           김예안 (얼굴)
  rina.png           송리나 (책 위에 엎드려 자는 몸 + 책, 머리가 오른쪽)
  woohyun.png        김우현 (얼굴)
  cine_kdh.png       308호 엔딩 전용: 김두현 얼굴+후드티
  cine_yean.png      308호 엔딩 전용: 김예안 전신 (후드티·반바지·크록스)
  cine_yean_face.png 308호 엔딩 전용: 김예안 얼굴만
  face1.png face1_body.png face2.png   예전 기본 얼굴 (지금 안 씀)
(선택) assets/background.png, assets/ball.png — 없으면 코드로 그림 (콘솔에 파일 없음 에러 2개는 정상)
Claude outputs/volleyball-preview.html   미리보기 (커밋 안 해도 되는 파일)
```

---

## 4. 캐릭터 전체 (CHARACTERS 배열 — 순서 = index)
공통 필드: `name, gender('m'|'f'), grade, type:'sprite', img, w, h, skill, (mana), skillName, desc[2]`
- `w`, `h`는 게임 안 그림 크기 (월드 좌표)
- 공에 맞는 범위는 모든 캐릭터가 같음 (그림 크기와 별개)
- `faceNet: true`: 사진이 항상 네트 쪽을 보게 좌우반전. 송리나만 씀
  - 다른 캐릭터는 사진이 안 뒤집히게 그려짐

| # | 이름 | 등급 | skill | 크기 w×h | 스킬 이름 / 설명 |
|---|---|---|---|---|---|
| 0 | 김두현 | POOP | `sock` | 54×57 | 숙성 양말 서브. 냄새 진동, 방독면 심판 레드카드로 **자기 팀 -1점 (트롤 스킬)** |
| 1 | 장민욱 | MYTHIC | `jmw` | 58×58 | 분노 폭주. 3초 시네마틱 3종 |
| 2 | 키다리 | EPIC | `giant` | 30×70 | 거인화. 5초 키 3배, 마나 3 |
| 3 | 김지연 | RARE | `whirl` | 40×68 | 회전 회오리. 10초(250프레임) 2배 크기로 회전, 닿는 공 세게 날림, 마나 3 |
| 4 | 문경목 | MYTHIC | `gm` | 62×54 | 탈모 & 한국사. 3초 시네마틱 3종 |
| 5 | 김민주 | LEGENDARY | `kim` | 34×66 | 민주주의 5장. 시네마틱 5종 (`eyes` 필드 = 사진 속 눈 위치) |
| 6 | 원더재원 | EPIC | `party` | 56×62 | 미러볼 파티. 9초(225프레임) 팬 10명이 빈 곳으로 꽂음, 나 이속↑ 상대 감속 |
| 7 | 역사왕 | LEGENDARY | `history` | 62×56 | 위인 강림 5종 (실명 '이동우'는 동의 대기라 '역사왕'으로 표시) |
| 8 | 박준형 | LEGENDARY | `math` | 36×68 | 수학 강림 5종 |
| 9 | 주지혁 | MYTHIC | `jjh` | 30×66 | 선택적 기사도. 상대 성별에 따라 인격 180° 변신 |
| 10 | 차명준 | ULTRA | `cmj` | 56×60 | 시공간 커널 해킹. 6초 시네마틱 7종, 마나 6 |
| 11 | 김예안 | LEGENDARY | `yean` | 62×46 | 기숙사 퇴사하기. 6초 시네마틱 3종 |
| 12 | 송리나 | MYSTIC | `rina` | 74×66 | 국영수사과 만점. 4초 과목별 5종 + 패시브 |
| 13 | 김우현 | MYTHIC | `wh` | 34×46 | 한번 더! 더블 하이파이브. 4초 3종 (135cm라 일부러 작게) |

- **성별 기본값:** 키다리·김민주·송리나 = 여, 나머지 = 남 (사용자 확인 대기)
  - 김지연은 남으로 설정되어 있음
  - 성별은 주지혁 스킬과 `isFem(p)`에 쓰임
- **등급 색 GRADE_COLOR:** POOP #9a6233, COMMON #3ccf5a, RARE #3d8bff, EPIC #a64dff, MYTHIC #ff3b3b, LEGENDARY #ffd23f, MYSTIC #d35bff, ULTRA #00ffd0
- **캐릭터 고르기 화면:** 2줄 (한 줄에 ceil(n/2)명, 칸 높이 48). 14명이라 7명씩

### 4-1. 밸런스 원칙 (사용자가 정한 것)
- "다 사기라 확정 득점이면 재미없다" → **확정 득점 스킬 금지**
- 예외: **LEGENDARY·ULTRA는 제일 멋진 스킬 1개만 확정 득점**
  - 김민주 `lincoln`, 박준형 `euler`, 역사왕 `ship`(거북선), 김예안 `evict`, 차명준 `bigbang`
- 나머지 스킬: 연출이 끝나면 **진짜 공을 발사**해서 받을 수 있게
  - `releaseBall(목표x, N프레임)`, `skillRelease` + `SKILL_FX` 표
  - 대신 버프·디버프·방어가 붙음
- `releaseBall(tx, N)`: N이 작을수록 빠름. 대략 8 = 거의 못 받음, 11~16 = 받을 수 있음

### 4-2. 캐릭터별 스킬 상세
**장민욱 (jmw, JM_SKILLS) — 3초**
- `meteor` 운석 강타: 상대 납작(flatT 75) + 진짜 공
- `pinball` 10단 반사: 화면 여기저기 엄청 빠르게 튐 (모션), PIN_SEG 3, PINBALL MODE 테두리
  - 공이 잠깐 작아지고 빨라짐 (miniT)
  - 상대 크기 약간 축소
- `sonic` 음파 폭격 (욕설 '삐-'): 상대 조작 방향이 수시로 바뀜 (confuseT/confRev/confNext) + 상대 축소
- 대사: JM_TAUNT

**문경목 (gm, GM_SKILLS) — 3초**
- `flash` 두피 반사 빔: 상대 시야 거의 완전 차단 (blindT, 아주 살짝 약하게 조정됨)
- `grade3` 3등급의 기상: 공이 거의 안 뜸
- `feint` 모근 탈출 낙엽 페인트: 네트 앞 헤어핀처럼 뚝 떨굼
  - 목표: 10번 중 5번 이하로 받음. 뒤에 있으면 거의 못 받음
  - 변수: FEINT_N/DX/FREEZE
- 대사: GM_TAUNT

**김민주 (kim, KIM_SKILLS) — KIM_A 25, B 62, C 100, FIRE 125, HIT 150, END 172**
- `vote` 탄핵 소추: 상대 마나 0 + 10초 마나 봉인 + 내 마나 +2
- `liberty` 자유: 7초 내 이속·점프↑ + 상대 3초 감속
  - (예전에 공 흔들림이 있었는데 네트에 걸려서 제거)
- `court` 삼권분립: 상대 스파이크 7초 약화 + 6초 헌법재판소 방어 (courtGuard)
- `grammar` F!: 4초 점프 금지 + 조작 지연 + 축소
- `lincoln` 링컨의 기둥 (영역 전개): **확정 득점**
- 민주주의 카운터 '독재': DICTATOR_CHANCE 15%

**역사왕 (history, HEROES) — HIST_REVEAL 30, FIRE 74, HIT 86 (실제 125/153/178)**
- `ship` 울돌목 거북선 포격: **확정 득점**
- `arrow` 이성계 편전 3연발 (2발 허상): 5초 감속·점프 봉인 + 내 스파이크 강화
- `thunder` 강감찬 뇌전: 감전 + 연쇄 낙뢰 4번 (strikes)
- `hangul` 세종 해례본: 10초 낙하지점 보임 + 이속↑ + 마나 +2, 상대 2초 혼란
- `gyebaek` 계백 결사 방어: 10초 방어막 (GUARD_FRAMES 250) **+ 5초 회전 회오리** (whirlT 125)
  - 이펙트: 불타는 황산벌, 결사대 창벽, 決死
- 연출: 수묵화

**박준형 (math, MATH_SKILLS) — MATH_FIRE 62 (실제 125)**
- `rail` 미적분 레일건: 넉백 + 4초 감속 + 마나 강탈
- `blade` 행렬 대검: 상대 납작 + 6초 행렬 방패
  - matrixGuard: 바닥에 행렬 격자 + 수식 돔 (사용자 요청으로 멋지게)
  - blade 공은 N=20 (봇도 받을 수 있게)
- `wave` 삼각함수: 상대 조작 지연 + 7초 스파이크 증폭
- `fractal` 만델브로트: 상대가 중앙으로 빨려감 + 분신 공 3개 (N 26)
- `euler` 오일러 복소평면 대성당: **확정 득점** (우주 줌아웃 연출)
- 대사: MATH_TAUNT

**주지혁 (jjh, JJ_SKILLS) — 상대가 여자면 솜사탕 ♥, 남자면 뚝배기 ☠**
- `chivalry`: 살포시 패스 ↔ 뚝배기 파쇄
- `letter`: 러브레터 서브 ↔ 무회전 오물 강탄
- `block`: 푹신한 쿠션 ↔ 철퇴 파리채 블록 (`jjhBlockCheck`)
- 대사: JJ_TAUNT.f / .m

**차명준 (cmj, CM_SKILLS) — v2.0 이펙트 (주술회전·귀멸 느낌 VFX를 직접 코드로)**
- 타이밍: CM_A 25, B 62, C 100, FIRE 125, HIT 150, END 172
- `swap` 양자 얽힘: 위치 교환 + 1.5초 스턴
- `emc2` E=mc²: 방어막 관통 초광속탄
- `rootkit` 404: 4초 조작 상하좌우 반전 + 공 분신
- `ai` 벽력일섬 8련: 직각 8회 굴절
- `time` 시간 팽창: 상대 3초 90% 감속 + 내 마나 절반 회복
- `bsod` 블루스크린: 상대 10초 스킬 봉인 + 5초 방화벽
- `bigbang` 빅뱅 영역 전개: **확정 득점** (코트 사각형이 안 보이게 우주로 덮음)
- 도우미 함수: aiPath, inkSlash, blackFlash, fireDragon, shrineGate, chromaShift, galaxyEye, persGrid, holoKeyboard, terminal, blackHole, drawFirewall
- 대사: CM_TAUNT, CM_VS(상대별 전용 대사), cmjReact (상대가 블록하면 반응)

**김예안 (yean, YA_SKILLS) — 타이밍은 KIM과 같음**
- `rage` 야식 라면 & 욕설 폭격: 멘탈 붕괴 2초
- `evict` 벌점 25점 퇴사 통지서: **확정 득점**
- `scream` 160dB 샤우팅: 4초 반응속도 90% 둔화
- 대사: YA_TAUNT
  - 예전에 김우현 이름이 나오던 자리는 '자치고'로 바꿨음
  - 김우현과 붙으면 YEAN_VS_WH (70%)

**송리나 (rina, RN_SKILLS) — RN_B 25, FIRE 75, END 100 (4초)**
- `math` 미적분 3D 굴절: 직각 2번 꺾임
- `kor` 문맥 오독: 1.5초 뇌정지
- `eng` 문법 교정 방화벽: 6초 블록 (blockMode 'grammar')
- `sci` 촉매 반응: 상대 마나 0 + 2초 감속
- `soc` 헌법 제1조: 상대 버프 전부 몰수 + 4초 스킬 금지
- 패시브(rinaNerf): 상대 스파이크 25% 오답 처리
- 대사: RN_TAUNT

**김우현 (wh, WH_SKILLS) — WH_B 25, WH_HIT1 52, WH_FIRE 75, WH_END 100 (4초)**
- 컨셉: 키 135cm 방송부. "한번 더!" 무지개 손바닥 2연타
  - 1차 짝! → "한번 더-!!" → 2차 초거대 손바닥 쾅
  - ON AIR 네온 간판, 7색 RAINBOW
- `broadcast` 방송부 특보: 공 N 11 + 상대 0.4초 경직(freezeT 10)
- `evict` 벌점 25점 집행: 상대 얼굴로 공 N 12 + 스턴 0.6초(15)
  - **상대가 김예안이면 1초(26) + "TARGET: 김예안" 락온**
- `clap` 더블 클랩: 상대 마나 0 + 방어막 전부 소멸(guardT/blockT/fwT/matrixGuard/courtGuard) + 관통 공(pierce 40) N 11
  - 카메라 360° 회전, 4K REC 화면
- 도우미: rainbowPalm, onAirSign, whSource, updateWh, whCam, drawWhWorld, drawWhUI
- 대사: WH_TAUNT, 김예안과 붙으면 WH_VS_YEAN (70%)
- 사진 woohyun.png: 오른쪽 위 주황 배경 찌꺼기를 지움 (머리 오른쪽 위가 살짝 각짐)

**키다리 / 김지연 / 원더재원 / 김두현**
- 키다리: 1.5초 컷인 후 키 3배 (GIANT_BASE_CM 185)
- 김지연: 1초 컷인 후 회오리
- 원더재원: 미러볼 파티 (PARTY_INTRO 62)
- 김두현: 숙성 양말 서브 (SOCK_REF 26 → CARD 42 → SPRAY 54 → MINUS 74 → END 92)

---

## 5. 코드 구조 (game.js 위에서부터)
| 위치(대략 줄) | 내용 |
|---|---|
| 1 | CONFIG (WIN_SCORE 15, FPS 25, MANA_MAX 5, IMAGES) |
| 12 | CHARACTERS, GRADE_COLOR, SKILL_FRAMES, 각종 연출 상수 |
| 85 | 기본 값: SCALE 2, GW 432, GH 304, NET_X 216, NET_HW 25, NET_TOP 176, NET_PILLAR_TOP 192, BALL_R 20, BALL_GROUND_Y 252, P_GROUND_Y 244 |
| 95 | 이미지 불러오기 loadImg → imgs['char'+i], imgs.cineKdh/cineYean/cineYeanFace |
| 107 | 키 입력 (down, pressed — e.code 값, 예 'KeyZ') |
| 139 | AI: aiSim(공 물리 그대로 예측), aiInput(p) |
| 249 | 선수 makePlayer, startGame, resetRound (모든 상태 타이머 초기화) |
| 330 | updatePlayer (스킬 발동 = 여기) |
| 473 | updateBall |
| 524 | 히어로 볼 (moveHeroBall, EASE, pushRibbon) |
| 651 | step (한 프레임, 득점 처리, 경기 끝 → 'over' 또는 'e308') |
| 856 | 시네마틱 공통 도구: camKeys, CAM_HOME, withFollow, cineCam, drawCineUI |
| 1153 | releaseBall, SKILL_FX, skillRelease |
| 1526~ | 주지혁 → 차명준 → 김예안 → 김우현 → 송리나 → 장민욱 → 문경목 → 김민주 → 수학 → 양말 → 역사 → 파티 → 메테오 |
| ~4856 | 효과음 sfx(type, vol) — WebAudio로 직접 합성 |
| ~5175 | 캐릭터 선택 화면 |
| ~5365 | draw() 메인 그리기, 메뉴 crowd, 조작 방법 화면 |
| ~5930 | chargeFX (응축→폭발), heavy() (묵직한 타격감) |
| ~6027 | 게임 루프 (25FPS 고정) |
| ~6043~끝 | **308호 엔딩 (e3*)** |

### 5-1. state 목록
title, howto, side, diff, select, startFadeOut, startMsg, ready, play, slow, fadeOut, over, **e308**
- `isMenu()` = title/howto/startFadeOut/side/diff

### 5-2. ★ 새 시네마틱 캐릭터 추가 체크리스트 (하나라도 빠지면 버그)
1. `CHARACTERS`에 항목 추가
   - 사진은 `assets/xxx.png` (rembg로 배경 제거, alpha 임계값으로 찌꺼기 정리)
2. `SKILL_FRAMES`에 `xx: 8`
3. updatePlayer의 스킬 발동 블록:
   ```js
   if (ch.skill === 'xx') { cine = { kind: 'xx', t: 0, caster: p, target: players[1 - p.side], sk: XX_SKILLS[랜덤] }; sfx('whoosh'); }
   ```
4. update()의 `state === 'play'` 분기: `else if (cine && cine.kind === 'xx') { updateXx(); }`
5. `cineCam()`에 `if (cine.kind === 'xx') return xxCam(cine);`
   - 첫 프레임 `if (!c.init) return CAM_HOME/H;`
6. `drawCineUI()`에 `drawXxUI(cine)`
7. `drawBeam()`에 `if (cine.kind === 'xx') { drawXxWorld(); return; }`
   - **drawXxWorld 첫 줄에 `if (!cine.init) return;` 필수!**
   - update보다 draw가 먼저 불릴 수 있어서, 이게 없으면 에러가 나고 게임 루프가 멈춤 (v5.11.1 버그)
8. draw()의 `drawBall()` 숨김 목록에 `cine.kind === 'xx'` 추가
9. `mathTaunt(kind, p)`에 대사 연결 (`XX_TAUNT[kind]`, 배열이면 랜덤)
   - kind: start / error(득점) / miss(내 실수) / serve / block / win / lose
10. 테스트: `node --check` → 미리보기 → **tools/test_skill.js로 진짜 키 입력 테스트** → 스크린샷 확인

- 4초 시네마틱 기본 틀: `fx_rina`와 같은 구조 (B 25, FIRE 75, END 100)
- 6초 틀: KIM/YA/CM 구조 (A 25, B 62, C 100, FIRE 125, HIT 150, END 172)

### 5-3. 선수 상태 타이머 (updatePlayer에서 감소, resetRound에서 0)
- 디버프:
  - blindT, freezeT(멈칫, 입력 무시), confuseT + confRev/confNext(방향 반전)
  - flatT/flat(납작), weakT(스파이크 약화), nojumpT, pullT/pullX(끌려감)
  - slowT/slowK, lagT/lagQ(조작 지연), manaLockT, silenceT(스킬 금지)
  - vflipT(상하 반전), shrinkT/shrinkK
- 버프:
  - fastT, jumpT, ampT(스파이크 증폭), sightT(낙하지점 보임), whirlT(회오리)
- 방어:
  - guardT + matrixGuard / courtGuard
  - blockT + blockMode ('soft' / 'swat' / 'grammar'), fwT(방화벽)
- 기타: stunned(별 표시), frozen
- 공 상태: wobbleT, waveT, miniT, pierce, arrowT, unblockable, power, flight, fx, ribbon
- 전역 효과: pinT
- 효과 배열: fakes, strikes, stamps(heroStamp), matrixHits(gye/court/jj/fw), liteParts, crowd, popups, speech, effects, smokes, craters
- 도우미: `isWhirl(p)`, `manaMax(p)`, `isFem(p)`, `say(p, str)` (말풍선, 90프레임, 220px 넘으면 2줄)

### 5-4. AI (혼자 플레이)
- `aiSim(b, n)`: updateBall 물리를 그대로 복사해서 n프레임 앞을 예측
  - 벽, 천장, 네트 기둥, 땅 252
- `aiInput(p)`: 받을 위치로 이동, 접촉 높이 y ≥ 213일 때 공격
  - 서브: 뒤에서 급하게 내려꽂지 않고 평타/로브
  - 넘어가기 직전 공엔 헛점프 안 함
  - meet ≤ 3일 때만 공격키, meet ≤ 1일 때만 방향키
  - 네트 70 이내일 때만 아래로 스파이크
- AI_LEVELS
  ```
  쉬움:   react 14, err 40, spike 0.15, skill 0.01, speed 0.75, move 1
  보통:   react 5,  err 10, spike 0.7,  skill 0.04, speed 1,    move 1.1
  어려움: react 1,  err 0,  spike 1,    skill 0.08, speed 1,    move 1.35
  ```
- 이동: `p.x += inp.x * 6 * slow * (p.ai ? move : 1)`
- 테스트 스크립트: 레벨끼리 대결(승률), 실패 이유 분석

### 5-5. 메뉴
- 제목 '동성 배구 대전'
- 배경에 캐릭터 2~3명이 랜덤으로 뛰어다님
  - 가방(bag) 방식으로 모든 캐릭터가 골고루 나옴
  - 중간에 들어가고 나오며 계속 교대
  - 관련 함수: nextCrowdChar, newRunner, makeCrowd, updateCrowd, drawCrowd

---

## 6. ★ 308호 엔딩 "308호의 마지막 점호" (e3* 함수, game.js 맨 끝)
- **언제:** 김예안 vs 김두현 경기가 끝나면 자동. 또는 그 경기 중 M 키
  - `is308()`: 두 선수 skill이 yean + sock
- **조작:** Z/Enter 대사 넘기기, Esc 전체 건너뛰기. 끝나면 state 'over' (GAME END 화면)
- **방식:**
  - 216×152 도트 캔버스(`e3.pix`)에 그리고 2배로 키움 (imageSmoothing off)
  - 색수차 (빨강/청록 채널을 multiply로 분리해서 어긋나게)
  - 글리치 가로 조각, 주사선, 비네팅, 위아래 검은 레터박스
- **스타일:** 사용자가 **산나비(SANABI) 스크린샷**을 보여 주며 "이런 느낌"이라고 함
  - 밝은 파스텔 도트 배경, 작은 캐릭터, 머리 위 흰 말풍선
  - 게임을 베끼지 말고 그 느낌만 낼 것
- **사진:** 엔딩에서만 cine_kdh.png, cine_yean.png, cine_yean_face.png 사용
  - "작게 보여 줘" 요청 → e3Sprite 높이 kdh 50, yean 76에 배율 0.3
- **진행 단계 `e3.ph`:**
  1. `glitch` (12프레임): TV 지지직 + 노이즈
  2. `float`: 기숙사 앞 단풍나무 마당(`e3Yard`)
     - 배경: 분홍 노을, 분홍 나무들, 기숙사 건물, 큰 단풍나무
     - 가지에 리본과 사직서 종이, 짐 가방과 308 박스, 잔디·흙층, 금빛 먼지
     - 둘이 허공에 멈춰 있다가 천천히 내려옴
     - 사직서 조각 → 자줏빛 픽셀 꽃잎
     - 두현 뒤 푸른 냄새 아지랑이
     - 오른쪽 아래 SYSTEM LOG 타자
  3. `talk`: E3_TALK 대사 4묶음. 머리 위 말풍선(`e3Bubble`) 타자기 + '비-빅' 소리, 이름표
     - 3번째 묶음은 붉은 글리치 점멸
  4. `tear`: 예안 눈물 한 방울이 떨어져 바닥에서 픽셀로 산산조각
  5. `impact`: 둘이 뛰어올라 공을 내리침
     - 흑백 네거티브 반전 깜빡임, 바닥 균열·충격파
     - "[ 308 호 퇴 실 완 료 ]" 각인 + "잘 가라, 나의 냄새나던 청춘 (2026)"
  6. `crt`: CRT TV 꺼지듯 한 줄 → 점
  7. `room`: 텅 빈 308호. 문 명패, 매트리스 없는 2층 침대, 비 오는 창문
     - 페브리즈 한 통 + 김두현의 헌 양말(초록 냄새선)
  8. `bye`: 노을 언덕
     - 기숙사 앞에서 **나머지 캐릭터 모두가 배웅** (흔들흔들 + "잘 가라!!" 등 말풍선 E3_BYE)
     - 둘은 언덕길을 따라 올라가며 작아지다 사라짐, "308호, 퇴실 완료." → 페이드
- **낙엽:** 처음부터 끝까지 계속 떨어짐 (사용자가 "중요"라고 함)
  - 4프레임으로 빙글빙글 도는 도트 낙엽 42개, 장면마다 속도 다름 (e3Speed)
- **소리:** e3Music
  - 슬픈 신스 피아노: Am-F-C-G-Am-F-Em-Am 아르페지오 + 멜로디
  - 빗소리 (노이즈)
  - e3StopAudio로 페이드아웃
- **대사:** 사용자가 쓴 그대로 넣음 (욕설 포함 — 사용자가 "그대로"를 선택함)
- **전체 길이:** 대사를 안 넘기면 약 45초

---

## 7. 이미지 처리 방법 (새 캐릭터 사진 넣을 때)
- 클라우드에서 python + `rembg` 사용. 세션은 `u2net_human_seg`, `isnet-general-use`, `u2net` 중 결과 좋은 걸로
  - 사진이 3024px처럼 크면 자르는 좌표도 배율 맞추기
- 뒤처리
  - alpha < 70~110은 0으로
  - 남은 배경색(주황·흰색 등) 픽셀 제거
  - 제일 큰 덩어리만 남기기 (scipy.ndimage.label)
  - getbbox로 딱 맞게 자르기
- 초록 배경에 합성해서 확인용 이미지를 직접 눈으로 보고 찌꺼기 체크
- 게임 그림 크기 `w, h`는 비율 맞춰서 정하기 (키 큰 캐릭터 h 66~70, 얼굴만 있는 캐릭터 h 46~57)

---

## 8. 대사 시스템
- `mathTaunt(kind, p)`가 대사 허브. 득점·실책·서브(35%)·블록·승패 때 불림
- 캐릭터별 표: MATH_TAUNT, JM_TAUNT, GM_TAUNT, JJ_TAUNT(f/m), CM_TAUNT + CM_VS, YA_TAUNT + YEAN_VS_WH, RN_TAUNT, WH_TAUNT + WH_VS_YEAN
- 대사 안에서 다른 실존 인물(선생님·사감 등)은 일반 명칭으로

---

## 9. 지금까지 사용자 요청/피드백 기록 (결정 이유)
- "시네마틱 ㄹㅇ 미쳤네", "레전더리 시네마틱 너무 좋아" → 시네마틱 퀄리티가 핵심
- "너무 다 확정 득점이라 재미 떨어짐" → 밸런스 개편 (§4-1)
- 프랙탈: 더 끌려가게
- 문경목 빛: 거의 완전 시야 차단 → 나중에 "아주 조금만 약하게"
- 모근 찰나: 헤어핀처럼 떨궈서 10번 중 5번 이하로 받게
- 역사 3등급: 공 덜 띄우기
- 장민욱 핀볼·음파 버프
  - 핀볼: 엄청 빠르게 튀기, 이름 "10단반사", 공 작아지고 빨라짐
  - 음파: 조작 방향 수시로 바뀜 + 상대 축소
- O×3, 0 키는 화면에서 숨김 (개발자 전용)
- 회오리: 15초 → "너무 길다" → **10초**. 김지연·키다리 마나 3
- 박준형 대폭 강화 (다양한 버프/디버프/방어), 행렬 방어막을 진짜 행렬 수식 이펙트로
- 민주주의 강화
- 역사왕 강화, 계백에 회오리 5초 추가, 이동우 스킬 전부 더 화려하게
- 원더재원 버프
- AI 모드: 메뉴 혼자/같이, 내 쪽 Z/Enter 선택, 난이도는 안에서, 캐릭터 안 고르면 랜덤
- AI 수정 이력
  - "어려움은 더 잘해도 됨" → 점프 서브 리시브 개선
  - "AI가 리시브만 하고 공격 안 함" → 공격 추가
  - "진짜 못함, 피카츄 배구 참고" → 물리 예측 방식으로 재작성 (코드를 베끼진 않음)
- 메뉴: 캐릭터들이 랜덤으로 뛰어다니게, 2~3명씩 계속 교대
- 캐릭터 선택: 2줄로, 크기 줄이기
- 차명준 v2.0: 아트 문서대로 훨씬 화려하게
- 송리나: "자는 몸까지 써줘" → 몸+책 사진, 양쪽 다 네트 쪽 보게
- 308호 엔딩
  - 산나비 참고, 슬프게, 낙엽 중요
  - 끝나면 기숙사 모두가 배웅하고 언덕 너머로
  - M으로 스킵, 그 매치에서만 안내
  - 엔딩 전용 사진은 작게
  - 산나비 스크린샷처럼 마당 + 말풍선 스타일
- 김우현: "얼른 출시해" → v5.11. 스킬 쓰면 멈춤 → v5.11.1 수정

---

## 10. 테스트 스크립트 (클라우드 Playwright, rAF 끄고 직접 update/draw 호출하는 방식도 씀)
- `tools/test_skill.js`: **진짜 키 입력**(왼쪽 Shift)으로 스킬을 쓰고 0.5초마다 상태 출력 + 스크린샷 + 에러 출력
  - `cine.t`가 계속 올라가고 마지막에 cine가 비면 정상
- 시네마틱 장면 확인: 스크립트로 `cine={kind,t:0,caster,target,sk}`를 넣고 특정 프레임까지 update 후 draw → canvas 스크린샷
  - **이 방식만 쓰면 첫 프레임 draw 버그를 놓치니까 test_skill.js도 꼭 같이 돌리기**
- 엔딩: `players[0].char=11; players[1].char=0; startGame(); state='play'; pressed.add('KeyM'); update();`
  - 그다음 e3.ph별로 진행시키며 스크린샷

## 11. 미리보기 만드는 법 (사용자가 매번 받아서 실행해 봄)
```
python3 tools/build_preview.py "출력경로/volleyball-preview.html"
```
- `game.js` 안의 `'assets/xxx.png'`를 전부 base64로 바꿔서 `index.html`에 넣은 **한 파일**을 만듦 (약 4MB)
  - 더블클릭만 하면 실행됨
- 만든 다음 **꼭 사용자에게 파일로 보내 주기** ("미리보기 보내 줘"라고 자주 함)
- 기본 출력 위치 `Claude outputs/volleyball-preview.html`은 커밋 안 해도 됨

## 12. 버전 기록
- v1.0 첫 버전: 2인 대전, 스파이크 방향, 다이빙, 점수
- v1.x~v4.x: 캐릭터·등급·시네마틱(탈모빔, 민주주의/독재, 메테오, 파티, 양말, 거인, 회오리, 위인, 수학) 추가, 효과음, 타격감
- v5.0~v5.8
  - 김민주·문경목·장민욱 AAA 시네마틱
  - 확정 득점 밸런스 개편
  - 박준형·민주주의·역사왕·원더재원 강화
  - AI 혼자 플레이 + 난이도, AI 재작성
  - 메뉴 개편, 메뉴 뛰어다니는 캐릭터, 제목 '동성 배구 대전'
  - 주지혁·차명준·김예안 추가, 김두현·주지혁·박준형 사진 교체
  - 캐릭터 선택 2줄, 차명준 v2.0 이펙트
- v5.9 송리나(MYSTIC) 추가
- v5.9.1 송리나 자는 몸까지 스프라이트 확장 + faceNet
- v5.10 김예안·김두현 엔딩 컷씬 "308호의 마지막 점호" (+ M 키, 배웅·언덕 퇴장)
- v5.10.1 엔딩 전용 사진(cine_*.png) 작게 적용
- v5.11 새 캐릭터 김우현(MYTHIC) + 엔딩 산나비 스타일(마당 배경·말풍선)
- v5.11.1 김우현 스킬 쓰면 게임 멈추는 버그 수정 (drawWhWorld 첫 프레임 init 체크) + tools/ 폴더 추가

## 13. 남은 일 / 대기 중
- [ ] 이동우(역사왕) 실명 사용 동의 확인 → 동의하면 이름 바꾸기
- [ ] 성도균 캐릭터
  - 사용자가 낸 원래 컨셉(몸매 조롱/성적 컨셉)은 실존 미성년 친구라서 거절함
  - 대체 컨셉 '탱탱볼 인간' 또는 '에어백 조끼' 중 결정 대기
- [ ] 성별 확인 (키다리·김민주·송리나 = 여, 나머지 남)
- [ ] 실명 동의 확인 알림: 주지혁, 차명준, 김예안, 송리나, 김우현, 김두현
  - 김예안↔김우현 서로 저격 대사(라면·노사 뒷담), 308호 엔딩의 냄새·퇴실 내용 포함
- [ ] README.md에 김우현·308호 엔딩·M 키 반영 (사용자 폴더의 README가 최신이니 그걸 기준으로)
- 아이디어(사용자가 아직 요청 안 함, 먼저 하지 말 것): 휴대폰 터치 버튼, 기록 저장(localStorage `volley_`)
