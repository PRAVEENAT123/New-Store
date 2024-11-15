// tailwind.config.js
module.exports = {
  content: [
    "./**/*.liquid", // Scan all Liquid files
    "./layout/**/*.liquid",
    "./sections/**/*.liquid",
    "./templates/**/*.liquid",
    "./snippets/**/*.liquid",
    "./styles/**/*.css",
    // Add any other directories if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
