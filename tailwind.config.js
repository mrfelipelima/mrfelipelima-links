/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './src/**/*.tsx'],
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
        primaryColor: '#f20530'
      }
    },
    fontFamily: {
      'titles': ['Poppins', 'sans-serif'],
      'body': ['Roboto', 'sans-serif']
    },
  },
  plugins: [],
}
