module.exports = {
  content: [
    "./src/**/*.{html,css,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-hacked": "#8d9c2f",
        "green-hacked-darker": "#657216",
        "response-error": "#f3d8da",
        "response-success": "#d5e6de"
      },
      fontFamily: {
        "hacked": ["Hacked"],
        "supply": ["Supply"]
      }
    },
  },
  plugins: [],
}
