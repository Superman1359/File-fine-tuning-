module.exports = {
  content: ["./{components,pages}/**/*.{tsx,mdx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        brand: "#192C4B",
        accent: "#EA5F48",
      },
      fontFamily: {
        title: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
        body: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: "none",
              color: theme("colors.link"),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
