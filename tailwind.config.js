/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Primary Palette ---
        surface:  '#EAEFEF', // lightest background
        muted:    '#BFC9D1', // secondary / borders
        dark:     '#25343F', // text & dark surfaces
        accent:   '#FF9B51', // primary action / highlight

        // --- Brand scale (accent-based) ---
        brand: {
          50:  '#fff5ed',
          100: '#ffe9d5',
          200: '#ffd0a8',
          300: '#ffb87a',
          400: '#FF9B51', // base accent
          500: '#f97c2a',
          600: '#e05f10',
          700: '#b8490d',
          800: '#923b10',
          900: '#763310',
          950: '#401708',
        },

        // --- Neutral scale (dark-based) ---
        neutral: {
          50:  '#EAEFEF',
          100: '#d6dfe3',
          200: '#BFC9D1',
          300: '#a2b2be',
          400: '#7f95a5',
          500: '#5f7a8d',
          600: '#4a6070',
          700: '#3a4e5c',
          800: '#2e3f4b',
          900: '#25343F',
          950: '#141e24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
