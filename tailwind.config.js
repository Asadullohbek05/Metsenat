/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        SfProDisplay: ["SfProDisplay", "sans-serif"],
        SfProText: ["SfProText", "sans-serif"],
      },
      colors: {
        bluePrimary: "#2E5BFF",
        blueSecondary: "#3366FF",
        blueThird: "#3366FF99",

        blackPrimary: "#28293D",
        blackSecondary: "#212121",
        blackThird: "#1D1D1F",

        grayPrimary: "#E0E7FF",
        graySecondary: "#B1B1B8",
        grayThird: "#B5B5C3",

        whiteSecondary: "#F1F1F3",
        pinkPrimary: "#B2B7C1",

        brownPrimary: "#E0E7FF33",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
