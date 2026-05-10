/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
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
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
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
        surface: {
          50: '#f8f9fc',
          100: '#f1f3f8',
          200: '#e8ebf2',
          300: '#d1d5e0',
          400: '#b0b5c5',
        },
        ink: {
          900: '#0f1117',
          800: '#1a1c2b',
          700: '#2d3044',
          600: '#454860',
          500: '#6b6f8a',
          400: '#9296ae',
          300: '#b8bbc9',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        ember: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
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
        'orbit': {
          from: { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg) translateX(45px) rotate(-360deg)' },
          to: { transform: 'rotate(0deg) translateX(45px) rotate(0deg)' },
        },
        'dash-move': {
          to: { strokeDashoffset: '-20' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.8)' },
        },
        ripple: {
          '0%': { boxShadow: '0 0 0 0 rgba(6,182,212,0.3)' },
          '100%': { boxShadow: '0 0 0 20px rgba(6,182,212,0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '0.8', transform: 'scaleY(1.5)' },
        },
        'node-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(6,182,212,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(6,182,212,0)' },
        },
        'draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'count-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'chart-grow': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        'slide-in-stagger': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
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
          from: { opacity: '0', filter: 'blur(10px)', transform: 'translateY(20px)' },
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-shift': 'gradient-shift 4s ease infinite',
        blink: 'blink 1s step-end infinite',
        morph: 'morph 8s ease-in-out infinite',
        orbit: 'orbit 12s linear infinite',
        'orbit-reverse': 'orbit-reverse 10s linear infinite',
        'dash-move': 'dash-move 1s linear infinite',
        wave: 'wave 1.5s ease-in-out infinite',
        ripple: 'ripple 2s ease-out infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-line': 'pulse-line 2s ease-in-out infinite',
        'node-glow': 'node-glow 2s ease infinite',
        'draw-line': 'draw-line 2s ease forwards',
        'float-gentle': 'float-gentle 3s ease-in-out infinite',
        'count-pulse': 'count-pulse 1s ease infinite',
        'chart-grow': 'chart-grow 1s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-in-stagger': 'slide-in-stagger 0.6s ease forwards',
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeDown: 'fadeDown 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        blurIn: 'blurIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        slideUp: 'slideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        scaleIn: 'scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
