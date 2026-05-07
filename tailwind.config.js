/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './embed.html'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-secondary': '#141414',
        'surface': '#1C1C1C',
        'border-subtle': '#2A2A2A',
        'text-primary': '#F5F1EB',
        'text-secondary': '#A8A29E',
        'text-muted': '#6B6663',
        'accent': '#B91C1C',
        'accent-hover': '#DC2626',
        'accent-deep': '#450A0A',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'label': '0.15em',
      },
    },
  },
};
