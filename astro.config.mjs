// @ts-check
import { defineConfig } from 'astro/config';

// Static output only: Vercel serves the built `dist/` folder.
export default defineConfig({
  output: 'static',
});
