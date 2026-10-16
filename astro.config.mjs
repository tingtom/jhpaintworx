import { defineConfig } from 'astro/config';

// Testing on https://tingtom.github.io/jhpaintworx/
// At custom-domain cutover: set base to '/' and site to 'https://jhpaintworx.co.uk'
export default defineConfig({
  site: 'https://tingtom.github.io',
  base: '/jhpaintworx/',
  output: 'static',
  // Inline all CSS into <head>: no render-blocking stylesheet request,
  // and self-hosted fonts (fontsource) bundle into it too.
  build: { inlineStylesheets: 'always' },
});
