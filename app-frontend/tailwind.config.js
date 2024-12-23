/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333", 
        secondary: "#B3B3B3", 
      },
      fontFamily: {
        sacramento: ["Sacramento", "cursive"], 
      },
    },
  },
  plugins: [],
};
