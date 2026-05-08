/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,tsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"--font-nunito"', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        textPrimary: 'var(--textPrimary)',
        background: 'var(--background)',
      },
    },
  },
  plugins: [],
};
