/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: { main: "1200px" },
      colors: {
        overlay90: "rgba(0,0,0,0.9)",
        overlay80: "rgba(0,0,0,0.8)",
        overlay70: "rgba(0,0,0,0.7)",
        overlay60: "rgba(0,0,0,0.6)",
        overlay50: "rgba(0,0,0,0.5)",
        overlay40: "rgba(0,0,0,0.4)",
        overlay30: "rgba(0,0,0,0.3)",
        overlay20: "rgba(0,0,0,0.2)",
        overlay10: "rgba(0,0,0,0.1)",
        "main-red": "#f73859",
        "main-blue": "#1266dd",
        "main-orange": "#f60",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
        10: "10 10 0%",
      },
      listStyleType: {
        square: "square",
        roman: "upper-roman",
      },
      keyframes: {
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5);",
            transform: "scale(0.5);",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
        },
      },
      animation: {
        "scale-up-center":
          "scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;",
      },
    },
  },
  plugins: [require("daisyui")],
};
