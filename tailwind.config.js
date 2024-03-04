/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'main':'#010409',
        'secondary':'#161b22',
        'nav':'rgb(1,4,9,.7)',
        'sandyBrown':'#F0A04B',
        'sidbarLinks':'rgb(132, 141, 151)'
      },
      borderWidth:{
        '1':'1px',
        '.8':'.8px',
        '3':'3px'
      },
      borderColor:{
        'nav':'rgb(55,65,81,1)'
      },
      borderRadius:{
        '16':'16px'
      },
      spacing:{
        '1070':'1070px',
        '50':'50px'
      },
      flexBasis:{
        'auto':'auto'
      }

    },
  },
  plugins: [],
}

