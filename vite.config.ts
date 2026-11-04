import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Base path matches the GitHub Pages project URL: https://spacecrafter29.github.io/MathPath/
export default defineConfig({
  base: '/MathPath/',
  plugins: [react(), tailwindcss()],
})
