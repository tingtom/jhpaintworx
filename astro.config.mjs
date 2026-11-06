import { defineConfig } from 'astro/config';

// Standalone domain cutover complete: served at https://jhpaintworx.co.uk
// with base at root.
export default defineConfig({
  site: 'https://jhpaintworx.co.uk',
  base: '/',
  output: 'static',
  // Inline all CSS into <head>: no render-blocking stylesheet request,
  // and self-hosted fonts (fontsource) bundle into it too.
  build: { inlineStylesheets: 'always' },
});
