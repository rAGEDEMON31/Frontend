import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'aurora-move': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-60%, -55%) scale(1.1)' },
        },
        'aurora-move2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(10%, -10%) scale(1.05)' },
        },
      },
      animation: {
        'aurora-move': 'aurora-move 16s ease-in-out infinite',
        'aurora-move2': 'aurora-move2 22s ease-in-out infinite',
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes:["business"]
  }
}