/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'var(--canvas)',
          light: '#F5F8F4',
          dark: '#0B1110',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
          light: '#FFFFFF',
          'light-raised': '#EDF3ED',
          dark: '#151D1A',
          'dark-raised': '#1C2922',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          light: '#14241D',
          'light-muted': '#556B5F',
          dark: '#EFF5EF',
          'dark-muted': '#A4B9AD',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: '#D8E4DA',
          dark: '#314037',
        },
        emerald: {
          accent: 'var(--emerald)',
          light: '#147A4B',
          dark: '#32CF89',
        },
        lime: {
          accent: 'var(--lime)',
          light: '#527B10',
          dark: '#C4F46D',
        },
        cyan: {
          accent: 'var(--cyan)',
          light: '#116979',
          dark: '#79CFDA',
        },
        amber: {
          accent: 'var(--amber)',
          light: '#8D5A12',
          dark: '#F2BC6E',
        },
        danger: {
          accent: 'var(--danger)',
          light: '#A52D28',
          dark: '#F48F87',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
