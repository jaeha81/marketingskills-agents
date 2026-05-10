# 마케팅스킬 에이전트

AI(Claude Code / Codex)에게 마케팅 작업을 시킬 때 사용하는 **전문 프롬프트를 자동으로 생성**해주는 Next.js 대시보드입니다.

## 주요 기능

- **38가지 마케팅 스킬** — CRO, 콘텐츠, 이메일, SNS, 광고 등 카테고리별 정리
- **이중 에이전트 모드** — Claude Code(생성·기획) / Codex(검토·분석) 선택
- **맞춤 프롬프트 생성** — 프로젝트 정보 입력 → 전문가 수준 프롬프트 즉시 생성
- **사용 기록 관리** — 생성 이력 최대 50개 저장, 재활용 가능
- **설정 기본값** — 자주 쓰는 프로젝트명·타겟 고객 저장

## 기술 스택

- Next.js 15 (App Router, Static Export)
- TypeScript
- Tailwind CSS 3.4
- localStorage (서버 전송 없음, 완전 로컬)

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 빌드

```bash
npm run build
```

46개 정적 페이지 생성 (38개 스킬 상세 + 8개 기타 라우트)

## 출처

마케팅 스킬 데이터 원본: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
