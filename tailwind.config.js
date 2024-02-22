/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          0: "rgb(var(--clr-main-0) / <alpha-value>)",
          100: "rgb(var(--clr-main-100) / <alpha-value>)",
          200: "rgb(var(--clr-main-200) / <alpha-value>)",
          300: "rgb(var(--clr-main-300) / <alpha-value>)",
          400: "rgb(var(--clr-main-400) / <alpha-value>)",
        },
        form: "rgb(var(--clr-form) / <alpha-value>)",
        bg: "rgb(var(--clr-bg) / <alpha-value>)",
        border: "rgb(var(--clr-border) / <alpha-value>)",
        accent: "rgb(var(--clr-accent) / <alpha-value>)",
        "accent-light": "rgb(var(--clr-accent-light) / <alpha-value>)",
        danger: "rgb(var(--clr-danger) / <alpha-value>)",
      },
      fontSize: {
        body: "0.875rem",
        heading: "1.125rem",
        title: "1.5rem",
      },
      transitionDuration: {
        fast: "25ms",
        medium: "50ms",
        slow: "150ms",
        snail: "500ms",
      },
    },
  },
  plugins: [],
};
