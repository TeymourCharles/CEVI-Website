/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
        colors: {
            'custom-colorOne': '#FFD870',    // Custom color name: 'custom-blue'
            'custom-brown': '#936C2F',   // Custom color name: 'custom-green'
            'custom-lightGray': '#474747',     // Custom color name: 'custom-red'
            'custom-darkGray': '#010101',
            'custom-darkGreen': '#024b30',
        },
        listStyleType: {
            circle: 'circle',
          },

        animation: {
            "loop-scroll": "loop-scroll 50s linear infinite",
        },
        keyframes: {
            "loop-scroll": {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(-100%)" },
            },
        },
    },

  },
  plugins: [],
}

