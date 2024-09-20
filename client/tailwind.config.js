/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "abstract-white-and-gray-overlap-circles":
          "url('/src/data/background-img.jpg')",
      },
    },
  },
  plugins: [],
};
