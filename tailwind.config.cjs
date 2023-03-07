/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.5s ease-in-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      minWidth: {
        60: "60px",
        80: "80px",
        100: "100px",
      },
      width: {
        10: "10px",
        70: "70px",
        150: "150px",
        200: "200px",
      },
      minHeight: {
        45: "45px",
      },
      maxHeight: {
        120: "120px",
        240: "240px",
      },
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px",
      },
    },
    plugins: [],
  },
};
