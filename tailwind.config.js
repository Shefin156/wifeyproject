/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#E63946',
          yellow: '#F4D35E',
        },
        romantic: {
          purple: '#2d1b4e',
          'purple-deep': '#1a0a2e',
          pink: '#e8a0bf',
          'blush': '#f8d7da',
          beige: '#f5e6d3',
          gold: '#d4af37',
          'gold-soft': '#e8d5a3',
        },
      },
      borderRadius: {
        glass: '18px',
        'glass-lg': '24px',
        '2xl': '1rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
