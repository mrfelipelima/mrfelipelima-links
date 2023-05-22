/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        textBase: '#f29849',
        textTitle: '#d4ccb6',
        secondary: '#0d0126',
        secondaryShadow1: '#26027A',
        secondaryShadow2: '#12013B',
        textWhite: '#cccccc',
        formBackground: '#24221f',
        primaryColor: '#f20530',
      },
    },
    fontFamily: {
      sans: 'var(--font-roboto)',
      alt: 'var(--font-popins)',
    },
  },
  plugins: [],
}
