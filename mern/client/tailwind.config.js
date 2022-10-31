/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      montserrat: "Montserrat, sans-serif",
      nunito: "Nunito, sans-serif",
    },
    extend: {
      colors: {
        "voiceflow-blue": "#1C4EFF",
        "lighter-blue": "#5AA6FF",
        gray: "rgba(0,0,0,0.5)",
      },
      // fontFamily: {
      //   "montserrat": ["Montserrat", "sans-serif"],
      // }
    },
  },
  variants: {},
  plugins: [],
};
