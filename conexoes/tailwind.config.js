/** @type {import('tailwindcss').Config} */
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`;
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'), surface: v('surface'), surface2: v('surface-2'), ink: v('ink'), ink2: v('ink-2'), line: v('line'),
        brand: v('brand'), 'brand-ink': v('brand-ink'), 'brand-soft': v('brand-soft'),
        accent: v('accent'), 'accent-ink': v('accent-ink'),
        e1: v('e1'), e2: v('e2'), e3: v('e3'), e4: v('e4'),
        ok: v('ok'), mid: v('mid'), low: v('low'), bad: v('bad'),
        gold: v('gold'), silver: v('silver'), bronze: v('bronze'),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: { xl2: '1.125rem' },
    },
  },
  plugins: [],
};
