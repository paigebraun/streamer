/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
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
          light: '#FF8080',
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

