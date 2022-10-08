/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      OcastaBG: '#151719',
      OcastaNameText: '#5658DD',
      OcastaHeaderText: '#ECEDED',
      OcastaPlainText: '#9CA9B3',
      PrimaryButton: '#6163FF',
      SecondaryButton: '#25282C',
      Alert: '#F04444',
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
