const colors = require('tailwindcss/colors');

module.exports = {
  experimental: {
    darkModeVariant: true,
  },
  darkMode: 'class',
  dark: 'class',
  purge: false,
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './facade/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // typography: (theme) => ({
      //   // color: theme('colors.brand.light'),
      //   a: {
      //     color: theme('colors.brand.primary'),
      //     transition: 'color 0.2s',
      //     '&:hover': {
      //       color: theme('colors.brand.light'),
      //     },
      //   },
      // }),
      colors: {
        brand: {
          core: '#FF4080', //#ff4080 //rgb(255, 64, 128)
          core200: '#FFCADA',
          core700: '#C80856',
          light: colors.yellow,
          neutral: colors.gray,
          dark: colors.red,
          primary: colors.sky,
          secondary: '#E4E7EB',
        },
        brands: {
          dev: '#0a0a0a',
          twitter: '#1da1f2',
          github: '#181717',
          youtube: '#ff0000',
          facebook: '#1877f2',
          reddit: '#ff4500',
        },
      },
      fontFamily: {
        headings: ['Montserrat', 'Serif'],
      },
      lineHeight: {
        'leading-normal': '4.5',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
