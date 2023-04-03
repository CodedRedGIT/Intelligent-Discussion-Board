/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')

// eslint-disable-next-line tsdoc/syntax
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/**/*.{js,ts,jsx,tsx}',
    './src/components/**/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.css',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#48BB78',
          dark: '#38A169',
          darker: '#2F855A',
          light: '#81E6D9',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
