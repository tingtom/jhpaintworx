import { defineConfig } from 'astro/config';

// Standalone domain: the config the site ships to https://jhpaintworx.co.uk
// with. Switch `base` to '/' at the domain cutover.
export default defineConfig({
  site: 'https://jhpaintworx.co.uk',
  base: '/jhpaintworx/',
  output: 'static',
  // Inline all CSS into <head>: no render-blocking stylesheet request,
  // and self-hosted fonts (fontsource) bundle into it too.
  build: { inlineStylesheets: 'always' },
});
