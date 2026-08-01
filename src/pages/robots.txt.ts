import type { APIRoute } from 'astro';
export const GET:APIRoute=()=>new Response('User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nSitemap: https://poumau.com/sitemap.xml\n',{headers:{'content-type':'text/plain; charset=utf-8'}});
