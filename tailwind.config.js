module.exports = {
  // ...existing code...
  theme: {
    // ...existing code...
    extend: {
      animation: {
        "slide-in": "slideIn 0.5s ease-out forwards",
        "slide-out": "slideOut 0.5s ease-out forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
      },
      // ...existing code...
    },
  },
  // ...existing code...
};
