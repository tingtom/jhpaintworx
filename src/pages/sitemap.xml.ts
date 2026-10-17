// Hand-rolled sitemap: full control over the canonical host (see src/lib/seo.ts).
// @astrojs/sitemap does not honour the base path cleanly here, and there are few
// enough routes that listing them directly is simpler and final-domain ready.
import { getCollection } from 'astro:content';
import { SITE_URL } from '../lib/seo';

export async function GET() {
  const cats = await getCollection('categories');
  const paths = ['', 'about/', 'services/', 'contact/', 'workshop/', ...cats.map((c) => `workshop/${c.slug}/`)];
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) =>
      `  <url><loc>${SITE_URL}/${p}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${p ? '0.70' : '1.00'}</priority></url>`
    )
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
}
