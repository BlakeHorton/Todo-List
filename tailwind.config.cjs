/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
      transitionDuration: {
        0: '0ms',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
