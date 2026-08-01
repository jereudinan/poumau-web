# Cloudflare Workers 배포

## 1. GitHub

원격 저장소는 `https://github.com/jereudinan/poumau-web.git`입니다. GitHub 인증을 갱신한 뒤 로컬 저장소를 초기화하고 `main`에 push합니다.

## 2. Cloudflare 리소스

Cloudflare 대시보드 또는 Wrangler에서 다음 리소스를 생성합니다.

- D1: `poumau-web`
- R2: `poumau-media`
- Worker: `poumau-official-web`
- 보존 Worker: `poumau-retention-maintenance`

최초 원격 마이그레이션은 `npm run db:migrate:remote`로 실행합니다.

## 3. 환경 변수

- `TURNSTILE_SECRET_KEY`: secret으로 등록
- `PUBLIC_TURNSTILE_SITE_KEY`: 일반 변수
- `TEAM_DOMAIN`: `https://팀이름.cloudflareaccess.com`
- `POLICY_AUD`: Access Application Audience 값

운영 환경에 `DEV_ADMIN_BYPASS`를 등록하면 안 됩니다.

## 4. Worker Builds

GitHub 저장소와 `main` 브랜치를 연결합니다.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

## 5. 도메인

후이즈의 기존 DNS 레코드를 백업한 다음 네임서버를 Cloudflare로 변경합니다. Worker의 Custom Domain에 `poumau.com`과 `www.poumau.com`을 연결하고 한쪽을 대표 주소로 리디렉션합니다.

## 6. Access

Self-hosted application에 `poumau.com/admin*`과 `poumau.com/api/admin/*`를 등록하고 관리자 이메일 Allow 정책을 설정합니다. Worker API의 JWT 검증값과 동일한 Application Audience를 사용합니다.
