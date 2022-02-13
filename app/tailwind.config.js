module.exports = {
  content: [],
  theme: {
    extend: {
        fontFamily: {
            poppins: ['Poppins'],
        },
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'yankeesblue': '#161b40',
          'pictonblue': '#43bee5',
          'folly': '#f40058',
          'orangeweb': '#efa500',
          'seagreen': '#41b853'
        }
    },
},
  plugins: [],
  content: [
    './public/*.{html,js}',
    './templates/*.{html,js}',
  ],
}
