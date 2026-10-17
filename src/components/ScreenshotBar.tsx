import { toBlob } from 'html-to-image'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { CuteCameraShotIcon } from './CuteIcons'

type ScreenshotBarProps = {
  targetRef: RefObject<HTMLElement | null>
}

type Preview = {
  url: string
  blob: Blob
  name: string
}

function timestampName() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `cimi报价_${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}.png`
}

function waitFrames(n = 2) {
  return new Promise<void>((resolve) => {
    const step = (left: number) => {
      if (left <= 0) resolve()
      else requestAnimationFrame(() => step(left - 1))
    }
    step(n)
  })
}

async function captureLongImage(node: HTMLElement): Promise<Blob> {
  const scrollY = window.scrollY
  window.scrollTo(0, 0)
  await waitFrames(2)

  const prev = {
    height: node.style.height,
    maxHeight: node.style.maxHeight,
    overflow: node.style.overflow,
    transform: node.style.transform,
  }

  node.style.height = 'auto'
  node.style.maxHeight = 'none'
  node.style.overflow = 'visible'
  node.style.transform = 'none'
  await waitFrames(2)

  const width = Math.ceil(node.scrollWidth)
  const height = Math.ceil(node.scrollHeight)

  const options = {
    pixelRatio: Math.min(2.5, window.devicePixelRatio || 2),
    cacheBust: true,
    backgroundColor: '#fde8ef',
    width,
    height,
    canvasWidth: width,
    canvasHeight: height,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: 'none',
      margin: '0',
    },
    filter: (el: Element) =>
      !(el instanceof HTMLElement && el.dataset.captureIgnore === 'true'),
  }

  try {
    // 预热一遍，iOS 上更稳定
    await toBlob(node, options)
    const blob = await toBlob(node, options)
    if (!blob) throw new Error('empty image')
    return blob
  } finally {
    node.style.height = prev.height
    node.style.maxHeight = prev.maxHeight
    node.style.overflow = prev.overflow
    node.style.transform = prev.transform
    window.scrollTo(0, scrollY)
  }
}

async function saveToPhotos(blob: Blob, name: string) {
  const file = new File([blob], name, { type: 'image/png' })

  // iOS / 支持分享文件的浏览器：系统分享里可选「存储图像」到相册
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: 'cimi 陪拍报价',
    })
    return 'shared'
  }

  // 其他环境：触发下载（部分安卓会进相册/下载）
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  // 延迟释放，避免部分浏览器下载中断
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000)
  return 'saved'
}

export function ScreenshotBar({ targetRef }: ScreenshotBarProps) {
  const [busy, setBusy] = useState(false)
  const [flash, setFlash] = useState(false)
  const [preview, setPreview] = useState<Preview | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [hint, setHint] = useState('')
  const hideTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current)
      if (preview?.url) URL.revokeObjectURL(preview.url)
    }
  }, [preview?.url])

  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  const dismissPreview = () => {
    clearHideTimer()
    setExpanded(false)
    setPreview((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url)
      return null
    })
  }

  const scheduleAutoHide = () => {
    clearHideTimer()
    hideTimer.current = window.setTimeout(() => {
      if (!expanded) dismissPreview()
    }, 4500)
  }

  const onCapture = async () => {
    const node = targetRef.current
    if (!node || busy) return

    setBusy(true)
    setHint('')
    setExpanded(false)
    try {
      const blob = await captureLongImage(node)
      const name = timestampName()
      const url = URL.createObjectURL(blob)

      // 白闪 + 缩略图（仿系统截图）
      setFlash(true)
      window.setTimeout(() => setFlash(false), 180)

      setPreview((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url)
        return { url, blob, name }
      })
      scheduleAutoHide()
      // 不自动打开分享/下载页，避免跳到 PNG 全屏；点缩略图再保存
      setHint('点左下缩略图可保存')
    } catch {
      setHint('截图失败，请再试')
    } finally {
      setBusy(false)
      window.setTimeout(() => setHint(''), 2800)
    }
  }

  const onSaveAgain = async () => {
    if (!preview) return
    try {
      await saveToPhotos(preview.blob, preview.name)
      setHint('选「存储图像」可进相册')
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        setHint('保存失败')
      }
    }
    window.setTimeout(() => setHint(''), 2800)
  }

  return (
    <>
      {flash ? <div className="shot-flash" data-capture-ignore="true" /> : null}

      {preview ? (
        <div className="shot-preview" data-capture-ignore="true">
          <button
            type="button"
            className={`shot-preview__thumb ${expanded ? 'shot-preview__thumb--hidden' : ''}`}
            onClick={() => {
              clearHideTimer()
              setExpanded(true)
            }}
            aria-label="查看截图"
          >
            <img src={preview.url} alt="报价截图预览" />
          </button>

          {expanded ? (
            <div className="shot-preview__sheet" role="dialog" aria-modal="true">
              <div className="shot-preview__sheet-card">
                <img src={preview.url} alt="完整报价长图" className="shot-preview__full" />
                <div className="shot-preview__actions">
                  <button type="button" className="shot-preview__btn shot-preview__btn--primary" onClick={() => void onSaveAgain()}>
                    保存到相册
                  </button>
                  <button type="button" className="shot-preview__btn" onClick={dismissPreview}>
                    关闭
                  </button>
                </div>
                <p className="shot-preview__tip">iPhone：分享菜单里点「存储图像」</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="screenshot-fab" data-capture-ignore="true">
        {hint ? <span className="screenshot-fab__toast">{hint}</span> : null}
        <button
          type="button"
          className="screenshot-fab__btn"
          onClick={() => void onCapture()}
          disabled={busy}
          aria-label={busy ? '正在生成长图' : '截长图发给客户'}
          title="截长图发给客户"
        >
          {busy ? <span className="screenshot-fab__spin" aria-hidden /> : <CuteCameraShotIcon size={24} />}
        </button>
      </div>
    </>
  )
}
