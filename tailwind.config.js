module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {
      display: ['hover', 'focus'],
      userSelect: ['hover', 'focus'],
    },
  },
  plugins: [],
};
