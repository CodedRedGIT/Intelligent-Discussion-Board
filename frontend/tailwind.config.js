const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx}", "./components/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          dark: "#1450d5",
          darker: "#1249c3",
          light: "#497dee",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
