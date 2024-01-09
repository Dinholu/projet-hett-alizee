/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{html,ts}",
  ],
 theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      keyframes: {
        right: {
          '0%': { transform: 'translateX(550px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        left: {
          '0%': { transform: 'translateX(-550px)' },
          '100%': { transform: 'translateX50px)'},
        },
        down: {
          '0%': { transform: 'translateY(-50px)', },
          '100%': { transform: 'translateY(0px)' },
        },
        up: {
          '0%': { transform: 'translateY(50px)', opacity: '0'},
          '50%': { transform: 'translateY(0px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        openFromMiddle: {
          '0%': {
            height: '0',
            opacity: '1',
            transform: 'translateY(-50%)',
          },
          '100%': {
            height: '100%',
            opacity: '1',
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        'right': 'right 2s',
        'left': 'left 2s',
        'down': 'down 2s',
        'up': 'up 2s',
        'openFromMiddle': 'openFromMiddle 1s',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          '--placeholder': '220 8.9% 46.1%',
          'inpute': '#ff5248',
          'primary': '#ff5248',
          'base-100': '#ffffff',
        }
      }
    ]
  }
}


