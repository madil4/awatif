/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}", "./src/js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#005F73",
        "primary-light": "#0A9396",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
