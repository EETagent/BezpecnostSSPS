module.exports = {
  content: [
    "./src/**/*.{html,css,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-hacked": "#8d9c2f",
        "green-hacked-darker": "#657216",
        "blue-hacked": "#2e5999",
        "blue-hacked-darker": "#1a4067",
        "response-error": "#f3d8da",
        "response-success": "#d5e6de",

        "terminal-bg" : "#252221",
        "terminal-menu-red": "#dd665a",
        "terminal-menu-yellow": "#efbe5c",
        "terminal-menu-green": "#7ac656",
        "terminal-user": "#6384c7",
        "terminal-command": "#78b56c"
      },
      fontFamily: {
        "hacked": ["Hacked"],
        "supply": ["Supply"]
      }
    },
  },
  plugins: [],
}
