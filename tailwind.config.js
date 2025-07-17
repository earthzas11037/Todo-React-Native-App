const colors = require('./src/config/theme/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        notoSansThai: ['NotoSansThai_400Regular', 'sans-serif'],
        light: ['NotoSansThai_300Light', 'sans-serif'],
        normal: ['NotoSansThai_400Regular', 'sans-serif'],
        medium: ['NotoSansThai_500Medium', 'sans-serif'],
        semibold: ['NotoSansThai_600SemiBold', 'sans-serif'],
        bold: ['NotoSansThai_700Bold', 'sans-serif'],
        extrabold: ['NotoSansThai_800ExtraBold', 'sans-serif'],
        black: ['NotoSansThai_900Black', 'sans-serif']
      },
      colors: colors,
      boxShadow: colors.boxShadow
    }
  },
  plugins: []
}
