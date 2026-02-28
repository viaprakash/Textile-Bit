import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        textile: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b5',
          300: '#e9bb85',
          400: '#df9953',
          500: '#d67d33',
          600: '#c86628',
          700: '#a64e23',
          800: '#854023',
          900: '#6c361f',
          950: '#3a1a0e',
        },
        canvas: {
          50: '#f7f6f3',
          100: '#edeae3',
          200: '#dbd5c8',
          300: '#c5baa6',
          400: '#ae9c83',
          500: '#9d876b',
          600: '#90775f',
          700: '#786250',
          800: '#625145',
          900: '#51433a',
          950: '#2b231e',
        },
      },
      boxShadow: {
        textile: '0 4px 20px rgba(166, 78, 35, 0.15)',
        'textile-lg': '0 10px 40px rgba(166, 78, 35, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
