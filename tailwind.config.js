/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': [ "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'peach' : {
          DEFAULT: '#F05C5C',
          dark: '#EC3939',
        },
        'sea' : {
          DEFAULT: '#D2E7EA',
        },
        'pine' : {
          DEFAULT: '#3C6172',
        },
        'palo' : {
          DEFAULT: '#F299C7',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

