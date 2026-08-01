import { env } from 'cloudflare:workers';
import type { APIRoute } from 'astro';
import { audit, requireAdmin } from '../../../lib/auth';
import { apiError, json } from '../../../lib/runtime';
import { newsSchema, productSchema, storeSchema } from '../../../lib/validation';

const resources = {
  products: { table: 'products', schema: productSchema },
  news: { table: 'news_posts', schema: newsSchema },
  stores: { table: 'stores', schema: storeSchema },
} as const;

function target(request: Request) {
  const resource = new URL(request.url).searchParams.get('resource') as keyof typeof resources;
  return resources[resource] ? { resource, ...resources[resource] } : null;
}

export const GET: APIRoute = async ({ request }) => {
  await requireAdmin(request, env);
  const t = target(request);
  if (!t) return apiError('지원하지 않는 콘텐츠입니다.');
  const rows = await env.DB.prepare(`SELECT * FROM ${t.table} ORDER BY id DESC`).all();
  return json({ ok: true, items: rows.results });
};

export const POST: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request, env);
  const t = target(request);
  if (!t) return apiError('지원하지 않는 콘텐츠입니다.');
  const parsed = t.schema.safeParse(await request.json());
  if (!parsed.success) return apiError(parsed.error.issues[0]?.message ?? '입력을 확인해 주세요.');
  const d = parsed.data as Record<string, unknown>;
  let result: D1Result;
  if (t.resource === 'products') {
    result = await env.DB.prepare('INSERT INTO products(slug,name,category,thumbnail_url,image_urls,alt_text,summary,description,smartstore_url,status,is_visible,is_featured,sort_order) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(d.slug,d.name,d.category,d.thumbnail_url??null,JSON.stringify(d.image_urls),d.alt_text,d.summary,d.description,d.smartstore_url??null,d.status,d.is_visible?1:0,d.is_featured?1:0,d.sort_order).run();
  } else if (t.resource === 'news') {
    result = await env.DB.prepare('INSERT INTO news_posts(slug,title,thumbnail_url,alt_text,body,external_url,is_visible,published_at) VALUES(?,?,?,?,?,?,?,?)').bind(d.slug,d.title,d.thumbnail_url??null,d.alt_text,d.body,d.external_url??null,d.is_visible?1:0,d.published_at).run();
  } else {
    result = await env.DB.prepare('INSERT INTO stores(name,address,hours,image_url,alt_text,naver_map_url,description,is_visible,sort_order) VALUES(?,?,?,?,?,?,?,?,?)').bind(d.name,d.address,d.hours??null,d.image_url??null,d.alt_text,d.naver_map_url,d.description,d.is_visible?1:0,d.sort_order).run();
  }
  await audit(env, admin.email, 'create', t.resource, String(result.meta.last_row_id));
  return json({ ok: true, id: result.meta.last_row_id }, { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request, env);
  const t = target(request);
  if (!t) return apiError('지원하지 않는 콘텐츠입니다.');
  const parsed = t.schema.safeParse(await request.json());
  if (!parsed.success || !parsed.data.id) return apiError(parsed.success ? 'ID가 필요합니다.' : parsed.error.issues[0]?.message);
  const d = parsed.data as Record<string, unknown>;
  if (t.resource === 'products') {
    await env.DB.prepare('UPDATE products SET slug=?,name=?,category=?,thumbnail_url=?,image_urls=?,alt_text=?,summary=?,description=?,smartstore_url=?,status=?,is_visible=?,is_featured=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(d.slug,d.name,d.category,d.thumbnail_url??null,JSON.stringify(d.image_urls),d.alt_text,d.summary,d.description,d.smartstore_url??null,d.status,d.is_visible?1:0,d.is_featured?1:0,d.sort_order,d.id).run();
  } else if (t.resource === 'news') {
    await env.DB.prepare('UPDATE news_posts SET slug=?,title=?,thumbnail_url=?,alt_text=?,body=?,external_url=?,is_visible=?,published_at=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(d.slug,d.title,d.thumbnail_url??null,d.alt_text,d.body,d.external_url??null,d.is_visible?1:0,d.published_at,d.id).run();
  } else {
    await env.DB.prepare('UPDATE stores SET name=?,address=?,hours=?,image_url=?,alt_text=?,naver_map_url=?,description=?,is_visible=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(d.name,d.address,d.hours??null,d.image_url??null,d.alt_text,d.naver_map_url,d.description,d.is_visible?1:0,d.sort_order,d.id).run();
  }
  await audit(env, admin.email, 'update', t.resource, String(d.id));
  return json({ ok: true });
};

export const DELETE: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request, env);
  const t = target(request);
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!t || !id) return apiError('삭제 대상을 확인해 주세요.');
  await env.DB.prepare(`DELETE FROM ${t.table} WHERE id=?`).bind(id).run();
  await audit(env, admin.email, 'delete', t.resource, String(id));
  return json({ ok: true });
};
