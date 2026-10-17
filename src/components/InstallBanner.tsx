import { Capacitor } from '@capacitor/core'
import { useEffect, useState } from 'react'

function isStandalone() {
  if (Capacitor.isNativePlatform()) return true
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function InstallBanner() {
  const [visible, setVisible] = useState(false)
  const [ios, setIos] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem('cimi-install-dismissed') === '1') return
    setIos(isIos())
    setVisible(true)

    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.ready.then(() => setOfflineReady(true))
    }
  }, [])

  if (!visible) return null

  return (
    <div className="install-banner" data-capture-ignore="true">
      <button
        type="button"
        className="install-banner__close"
        aria-label="关闭"
        onClick={() => {
          localStorage.setItem('cimi-install-dismissed', '1')
          setVisible(false)
        }}
      >
        ×
      </button>
      <strong className="install-banner__title">装到手机当 App 用</strong>
      <p className="install-banner__text">
        {ios
          ? 'Safari 底部「分享」→「添加到主屏幕」→ 添加。装好后断网也能报价。'
          : '浏览器菜单 →「添加到主屏幕」/「安装应用」。装好后断网也能报价。'}
      </p>
      <p className="install-banner__status">
        {offlineReady ? '离线资源已就绪 · 可以安装' : '正在准备离线资源…'}
      </p>
    </div>
  )
}
