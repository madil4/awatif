/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#005F73",
        "primary-light": "#0A9396",
      },
    },
  },
  plugins: [require("preline/plugin"), require("@tailwindcss/forms")],
};
