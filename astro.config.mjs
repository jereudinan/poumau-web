// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: cloudflare(),
  site: 'https://poumau.com',
  output: 'server',
  trailingSlash: 'never'
});
