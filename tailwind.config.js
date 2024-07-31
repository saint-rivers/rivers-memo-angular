/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    './src/**/*.{html,ts}',
    './lib/components/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '1': '#6d597a',
          '2': '#b56576'
        },
        'secondary': {
          '1': '#eaac8b',
          '2': '#e56b6f'
        }
      },
    }
  },
  plugins: [],
}

