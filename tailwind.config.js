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
        indigoDark: {
          50: '#e8e7e9',
          100: '#b8b5bb',
          200: '#96919a',
          300: '#665f6c',
          400: '#49404f',
          500: '#1b1023',
          600: '#190f20',
          700: '#130b19',
          800: '#0f0913',
          900: '#0b070f',
        },
        framboesa: {
          50: '#fceaef',
          100: '#f5bfcc',
          200: '#f09fb4',
          300: '#e97492',
          400: '#e5597d',
          500: '#de2f5c',
          600: '#ca2b54',
          700: '#9e2141',
          800: '#7a1a33',
          900: '#5d1427',
        }
      },
    },
    fontFamily: {
      sans: 'var(--font-roboto)',
      titles: 'var(--font-popins)',
    },
  },
  plugins: [],
}
