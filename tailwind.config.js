export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        body: ["Pretendard", "sans-serif"],
        heading: ["Pretendard", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "800",
      },
      fontSize: {
        // Tailwind 기본명칭 + 약간 커스텀 추가
        "4xl": ["34px", { lineHeight: "1.25" }], // headline1
        "2xl": ["24px", { lineHeight: "1.25" }], // headline2
        xl: ["20px", { lineHeight: "1.25" }], // headline3
        base: ["16px", { lineHeight: "1.75" }], // title1, body1
        sm: ["14px", { lineHeight: "1.75" }], // title2, body2
        xs: ["12px", { lineHeight: "1.75" }], // body3
      },
      colors: {
        primary: "#1D4ED8",
        secondary: "#64748B",
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
        black: "#111827",
        white: "#FFFFFF",
        blue: "#3465ED",
        gray: {
          900: "#111827",
          700: "#374151",
          500: "#757575",
          300: "#B7B7B7",
          100: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
