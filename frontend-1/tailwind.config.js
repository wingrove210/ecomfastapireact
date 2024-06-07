/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      "backgroundImage":{
        "headerNav": 'url(../assets/images/nav_header.png)'
      },
      screens: {
        '12pro': { 'raw': '(max-width: 390px)' },
        '13mini': { 'raw': '(max-width: 375px)' },
      }
    },
    fontFamily: {
    'next': 'Next_Art_Regular',
    'wave': 'Wave'
    }
  },
  plugins: [],
};
