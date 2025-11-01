import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ms: {
          primary: '#0078D4',
          primaryHover: '#106EBE',
          orange: '#F25022',
          orangeHover: '#D83B01',
          neutralLight: '#F3F2F1',
          neutral: '#E1DFDD',
          neutralDark: '#605E5C',
          success: '#107C10',
          danger: '#D13438',
          warning: '#FFB900',
        },
      },
    },
  },
  // This section is why the file is needed for our project
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
