// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // 네트워크 접속 허용
        port: 5173  // 기본 포트
    }
})