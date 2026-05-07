/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './embed.html'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#060606',
        'bg-secondary': '#0F0D0B',
        'surface': '#161412',
        'border-subtle': '#2A2420',
        'text-primary': '#F5F1EB',
        'text-secondary': '#A8A29E',
        'text-muted': '#6B6663',
        'accent': '#DC2626',
        'accent-hover': '#EF4444',
        'accent-deep': '#450A0A',
          'ember': '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'label': '0.15em',
      },
    },
  },
};
