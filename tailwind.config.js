/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",


  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      height: {
        'heightMedium': '30rem', 
         'formHeight' : '90%'
      },
      
    },
  },
  plugins: [],
}

