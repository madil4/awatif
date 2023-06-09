/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false, // applies background color and foreground color for root element by default
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
