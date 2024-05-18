/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#01579B",
        primaryBG: "rgba(225,245,254,0.30)",
        textColor: "#003560",
      },
    },
  },
};
