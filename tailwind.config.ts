import { p } from 'framer-motion/client'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['var(--font-pixel)', 'cursive'], 
    },
  },
  },
  plugins: [],
}

export default config

