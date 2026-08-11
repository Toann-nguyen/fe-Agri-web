/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const varScale = (name, shades) =>
  Object.fromEntries(
    shades.map((s) => [s, `rgb(var(--${name}-${s}) / <alpha-value>)`]),
  );
const aliasScale = (targetName, shades) =>
  Object.fromEntries(
    shades.map((s) => [s, `rgb(var(--${targetName}-${s}) / <alpha-value>)`]),
  );

const slateShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const oceanShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-fira-code)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        slate: varScale('slate', slateShades),
        ocean: varScale('ocean', oceanShades),
        coral: varScale('coral', [300, 400, 500, 600, 700]),
        cyan: varScale('cyan', [300, 400, 500, 600, 700]),
        emerald: varScale('emerald', [300, 400, 500, 600]),
        amber: varScale('amber', [200, 300, 400, 500, 600]),
        red: varScale('red', [300, 400, 500, 600]),
        rose: varScale('rose', [100, 200, 300, 400, 500]),
        purple: varScale('purple', [400, 500, 600, 700]),
        orange: varScale('orange', [300, 400, 500, 600]),
        green: varScale('green', [400, 500, 700]),
        teal: varScale('teal', [400, 500]),
        yellow: varScale('yellow', [400, 500]),
        indigo: varScale('indigo', [300, 400, 500]),
        blue: varScale('blue', [300, 500, 600]),
        violet: varScale('violet', [300, 500]),
        gray: aliasScale('slate', [200, 300, 400, 500, 600, 700, 800, 900]),
        ink: aliasScale('slate', [300, 400, 500, 600, 700, 800, 900]),
        ember: aliasScale('coral', [400, 500, 600, 700]),
        surface: aliasScale('slate', [50, 100, 200, 300, 400]),
        white: 'rgb(var(--white) / <alpha-value>)',
        black: 'rgb(var(--black) / <alpha-value>)',
        laravel: '#ff2d20',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.8)' },
        },
        ripple: {
          '0%': { boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 0 20px rgba(6, 182, 212, 0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'node-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(6, 182, 212, 0)' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'chart-grow': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blurIn: {
          from: {
            opacity: '0',
            filter: 'blur(10px)',
            transform: 'translateY(20px)',
          },
          to: { opacity: '1', filter: 'blur(0)', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(60px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'dash-move': {
          to: { strokeDashoffset: '-20' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'count-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        blink: 'blink 1s step-end infinite',
        morph: 'morph 8s ease-in-out infinite',
        wave: 'wave 1.5s ease-in-out infinite',
        ripple: 'ripple 2s ease-out infinite',
        shimmer: 'shimmer 2s infinite',
        'node-glow': 'node-glow 2s ease infinite',
        'draw-line': 'draw-line 2s ease forwards',
        'chart-grow': 'chart-grow 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-down': 'fadeDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'blur-in': 'blurIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'dash-move': 'dash-move 2s linear infinite',
        'float-gentle': 'float-gentle 3s ease-in-out infinite',
        'count-pulse': 'count-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
