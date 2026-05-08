// @ts-check

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abrahamsm.com',
  integrations: [tailwind(), react()],
  prefetch: {
    // Preload pages when their links enter the viewport (great with View Transitions)
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    // Inline small stylesheets to cut one round-trip
    inlineStylesheets: 'auto',
  },
});
