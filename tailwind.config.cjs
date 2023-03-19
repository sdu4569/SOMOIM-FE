/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
        "slide-down": "slide-down 0.3s ease-in-out",
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
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      aspectRatio: {
        "twenty-nine": "20 / 9",
      },
      backgroundColor: {
        kakao: "#FEE500",
      },
      borderColor: {
        kakao: "#FEE500",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },

    plugins: [],
  },
};
