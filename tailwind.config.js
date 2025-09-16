/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['var(--font-geist)', 'sans-serif'],
      },
      fontWeight: {
        'normal': '600', // Cambiar font-normal de 400 a 600
      },
    },
  },
  plugins: [],
}
