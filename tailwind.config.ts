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
    bluePrimary: '#0e6db3',
    transparent: 'transparent',
    current: 'currentColor',
    white: '#ffffff',
    purple: '#3f3cbb',
    midnight: '#121063',
    metal: '#565584',
    tahiti: '#3ab7bf',
    silver: '#ecebff',
    'bubble-gum': '#ff77e9',
    bermuda: '#78dcca',
   },
   backgroundImage: {
    'login-backgroundImage': "url('/src/assets/images/login-bg.jpg')",
   },
  },
 },
 plugins: [],
}
export default config
