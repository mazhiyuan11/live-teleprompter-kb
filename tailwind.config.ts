import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7f9',
          100: '#d9eef3',
          200: '#b8dde8',
          300: '#87c6d8',
          400: '#4fa8c1',
          500: '#348da6',
          600: '#2d728c',
          700: '#2a5d73',
          800: '#294e60',
          900: '#264252',
          950: '#142b37',
        },
        warm: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d9b6',
          300: '#e9be87',
          400: '#de9d56',
          500: '#d68435',
          600: '#c76d2a',
          700: '#a55525',
          800: '#854424',
          900: '#6c3920',
          950: '#3a1c10',
        },
        ink: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', '"STSong"', 'serif'],
        body: ['"Noto Sans SC"', '"Source Han Sans SC"', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            'h1, h2, h3, h4': {
              fontFamily: '"Noto Serif SC", "Source Han Serif SC", serif',
              fontWeight: '700',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
