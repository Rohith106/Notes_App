import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        creamblack: {
          "primary": "#1a1a1a",      // Dark charcoal
          "secondary": "#d4af37",    // Elegant gold
          "accent": "#fce6b2",       // Light cream accent
          "neutral": "#fff7e6",      // Cream base
          "base-100": "#fff7e6",     // Background
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  }
}
