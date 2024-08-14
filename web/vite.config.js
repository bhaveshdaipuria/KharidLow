// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      allow: [
        // Allow access to your project directory
        '/home/vansh/harsh/KharidLow/web',
        // Allow access to slick-carousel fonts
        '/home/vansh/node_modules/slick-carousel/slick/fonts',
      ]
    }
  }
})