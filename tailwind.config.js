const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./entrypoints/**/*.{html,js,jsx,ts,tsx}",
    "./.output/**/*.{html,js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        'horizontal-spin': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'horizontal-spin': 'horizontal-spin 1s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-dotted-background'),
    require('tailwind-scrollbar-hide'),
    // ...
    flowbite.plugin(),
  ],
}

