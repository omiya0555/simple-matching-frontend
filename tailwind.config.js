module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          backgroundImage: {
              'login-gradient': "linear-gradient(90deg, rgba(251,195,195,1) 0%, rgba(255,142,186,1) 69%, rgba(255,105,167,1) 100%)",
          },
      },
  },
  plugins: [],
};