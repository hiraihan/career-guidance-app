// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    // PERBAIKAN: Path disederhanakan dan sintaks ekstensi file diperbaiki.
    // Ini akan memindai semua file yang relevan di dalam folder 'src'.
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ...
  },
  plugins: [],
}