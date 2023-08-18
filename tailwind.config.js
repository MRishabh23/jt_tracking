/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html","./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens:{
        'xxs': '380px',
        'xs': '500px'
      },
      colors:{
        'heading': "#385771",
        'mainHead': "#1c4360",
        'primary': "#1c4261",
        'primary1': "#10293B"
      }
    },
  },
  plugins: [],
}

