# 시스템 구성

## 요청 흐름

Cloudflare Worker가 Astro SSR과 정적 자산을 제공합니다. 공개 콘텐츠와 문의는 D1을 사용하며 관리자 이미지 파일은 R2에 저장합니다.

## 보안 경계

- `/admin*`, `/api/admin/*`는 Cloudflare Access 정책으로 먼저 보호합니다.
- 관리자 API도 `Cf-Access-Jwt-Assertion`의 서명, 발급자, Audience를 다시 검증합니다.
- 문의는 Turnstile 토큰을 서버에서 검증한 뒤 D1에 저장합니다.
- 업로드는 관리자 인증 후 처리하며 허용 MIME과 10MB 한도를 검사합니다.
- 브라우저에서 최대 폭 2,000px, WebP 품질 86%로 변환한 뒤 업로드합니다.

## 데이터 보존 Worker

`maintenance-worker`는 한국 시간 매일 오전 3시 15분(UTC 18:15)에 완료 후 3년이 지난 문의를 삭제합니다. 개인정보는 남기지 않고 삭제 건수만 `retention_logs`에 기록합니다.
