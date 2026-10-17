// Single source of truth for the site's public URLs. Everything (canonical
// tags, sitemap, Open Graph, JSON-LD) is built from here so the upcoming
// cutover to the standalone domain only involves this file (already final)
// plus `base` in astro.config.mjs.
export const SITE_URL = 'https://jhpaintworx.co.uk';

/** Absolute URL for a site-root-relative path, e.g. 'workshop/' -> site root + 'workshop/'. */
export const absoluteUrl = (path = '') =>
  `${SITE_URL}/${path.startsWith('/') ? path.slice(1) : path}`;
