/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      gloriaHallelujah: ["Gloria Hallelujah"],
      luckiestGuy: ["Luckiest Guy"],
    },
    extend: {
      colors: {
        background: "#06051d",
      },
    },
  },
  plugins: [],
};
