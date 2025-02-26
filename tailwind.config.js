module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#ff6b6b',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            code: {
              color: '#24292e',
              backgroundColor: '#f6f8fa',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '85%',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 