/// <reference types="astro/client" />

type RuntimeEnv = {
  DB: D1Database;
  MEDIA: R2Bucket;
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  TEAM_DOMAIN?: string;
  POLICY_AUD?: string;
  DEV_ADMIN_BYPASS?: string;
  PUBLIC_SITE_URL?: string;
  CONTACT_RETENTION_YEARS?: string;
};

declare namespace App {
  interface Locals {
    runtime: { env: RuntimeEnv; cf: CfProperties };
  }
}

declare namespace Cloudflare {
  interface Env {
    TURNSTILE_SECRET_KEY?: string;
    PUBLIC_TURNSTILE_SITE_KEY?: string;
    TEAM_DOMAIN?: string;
    POLICY_AUD?: string;
    DEV_ADMIN_BYPASS?: string;
  }
}

interface Window {
  turnstile?: { reset: () => void };
}
