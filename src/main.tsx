import { Capacitor } from '@capacitor/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './styles.css'

// 原生 App（Capacitor）已自带离线包，无需 Service Worker
// 浏览器「添加到主屏幕」则注册 SW，实现离线
if (!Capacitor.isNativePlatform()) {
  registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      void registration?.update()
    },
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
