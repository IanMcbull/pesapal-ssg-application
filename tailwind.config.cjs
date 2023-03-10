/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      "logo-satisfy": ["Satisfy", "cursive"],
      "logo-zilla": ["Zilla Slab", "serif"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
