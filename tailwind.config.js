/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // HeroUI এর পাথ থাকলে সেটা এখানে যুক্ত করবেন
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#D9383A", // মডার্ন ক্রিপসন রেড
          secondary: "#FCA5A5", // সফ্ট রোজ
          dark: "#1E293B", // স্লেট ডার্ক টেক্সট
          light: "#F8FAFC", // কার্ড ব্যাকগ্রাউন্ড
        },
      },
    },
  },
  plugins: [],
};
