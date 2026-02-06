/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#5E2DFF', // Deep violet
          end: '#A56BFF',   // Lavender
          DEFAULT: '#6B46FF', // Accent/Button purple
        },
        positive: '#10B981', // Green
        negative: '#EF4444', // Red
        neutral: {
          bg: '#FAFBFF', // Very light background
          card: '#FFFFFF',
          muted: '#6B7280', // Gray-500
          strong: '#0F172A', // Near-black
          divider: '#E6E9F2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(15, 23, 42, 0.06)',
        'minor': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'glow': '0 0 15px rgba(107, 70, 255, 0.3)',
      },
      borderRadius: {
        'card': '12px',
        'pill': '24px',
      },
      spacing: {
        '18': '4.5rem', // 72px
        '14': '3.5rem', // 56px
      }
    },
  },
  plugins: [],
}
