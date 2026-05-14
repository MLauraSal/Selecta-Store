/** @type {import('tailwindcss').Config} */


export default {
  content: [   "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
 theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
   
      colors: {
        primary: "#111111",   // negro
        accent: "#C8A96A",    // dorado
        text: "#FFFFFF",      // blanco
      },
animation: {
  fadeSlide: "fadeSlide 0.25s ease forwards",
},
keyframes: {
  fadeSlide: {
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
},
    },
    keyframes: {
        bounceCart: {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.25)" },
          "60%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        bounceCart: "bounceCart 0.5s ease",
      },
  },
  
  plugins: [],
  
}

