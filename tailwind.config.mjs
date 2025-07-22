/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '1024px',
      desktop: '1280px'
    },
    extend: {
      fontFamily: {
        spoqa: ['SpoqaHanSansNeo', 'sans-serif'],
        sans: [
          'SpoqaHanSansNeo',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif'
        ]
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center'
        }
      })
    }
  ]
}
