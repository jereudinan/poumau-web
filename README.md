# 파우마우 공식 홈페이지

파우마우의 브랜드 소개, 상품, 오프라인 입점처, 소식, 문의와 관리자 CMS를 제공하는 공식 홈페이지입니다.

## 기술 구성

- Astro 7 + TypeScript + React
- Cloudflare Workers + Static Assets
- Cloudflare D1: 콘텐츠와 문의 이력
- Cloudflare R2: 관리자 업로드 이미지
- Cloudflare Access: 관리자 인증
- Cloudflare Turnstile: 문의 스팸 방지
- Cloudflare Web Analytics: 방문 통계

## 로컬 실행

```powershell
npm install
Copy-Item .dev.vars.example .dev.vars
npm run db:migrate:local
npm run dev
```

관리자 화면은 `/admin`입니다. 로컬에서만 `.dev.vars`의 `DEV_ADMIN_BYPASS=true`가 적용됩니다. 운영 환경에는 이 값을 등록하지 마세요.

## 주요 명령

```powershell
npm run build
npm run test
npm run db:migrate:local
npm run db:migrate:remote
npm run deploy
```

## 공개 전 필수 작업

1. 푸터의 `0000` 사업자 정보를 실제 정보로 교체
2. 개인정보처리방침의 책임자·연락처·시행일 확정
3. Cloudflare Access와 Turnstile 설정
4. D1·R2 바인딩 생성 및 연결
5. 입점처 주소와 현재 입점 여부 검증 후 공개
6. 실제 메인 배너·상품 이미지 등록

전체 절차는 `docs/` 폴더의 문서를 참고하세요.
