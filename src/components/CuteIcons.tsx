type IconProps = {
  size?: number
  className?: string
}

/** 小红书感：圆润填色 + 软描边 + 小星星 */
export function Sparkle({ x, y, s = 1, color = '#ffb4c8' }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0-3.2C.4-1.2 1.2-.4 3.2 0 1.2.4.4 1.2 0 3.2-.4 1.2-1.2.4-3.2 0-1.2-.4-.4-1.2 0-3.2z"
        fill={color}
      />
    </g>
  )
}

export function CutePhoneIcon({ size = 28, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#ffe4ec" />
      <rect x="15" y="8" width="18" height="32" rx="5" fill="#fff" stroke="#f48ca5" strokeWidth="1.8" />
      <rect x="17.5" y="12" width="13" height="18" rx="2" fill="#ffd0de" />
      <circle cx="24" cy="35.5" r="1.6" fill="#f48ca5" />
      <path d="M20 15.5c1.2-1.4 2.6-.4 4 0 1.4-.4 2.8-1.4 4 0" fill="none" stroke="#ff8fb3" strokeWidth="1.3" strokeLinecap="round" />
      <Sparkle x={36} y={12} s={1.1} color="#ff9ec0" />
      <Sparkle x={11} y={30} s={0.8} color="#ffc2d4" />
    </svg>
  )
}

export function CuteCameraIcon({ size = 28, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#ffe8f0" />
      <path
        d="M12 20c0-2.2 1.8-4 4-4h2.2l1.6-2.2c.4-.5 1-.8 1.7-.8h5c.7 0 1.3.3 1.7.8L30 16H32c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V20z"
        fill="#fff"
        stroke="#f48ca5"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="26" r="6.2" fill="#ffb7cc" stroke="#f48ca5" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="3.2" fill="#fff6fa" />
      <circle cx="21.8" cy="24" r="1.1" fill="#fff" />
      <circle cx="33.5" cy="20.5" r="1.4" fill="#ff8fb3" />
      <Sparkle x={37} y={13} s={1} color="#ff9ec0" />
      <path d="M18 13.5c.6-.8 1.5-.3 2.2 0" fill="none" stroke="#ff8fb3" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function CuteRetouchIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#fff0f5" />
      {/* magic wand / brush */}
      <path
        d="M14 34.5l12.5-16.5 4.2 3.2L18.2 37.8c-.5.7-1.5.9-2.2.4l-2.4-1.8c-.7-.5-.9-1.5-.4-2.2z"
        fill="#ffc2d6"
        stroke="#f48ca5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M26 18.5l5.5-7.2c.7-.9 2.1-1 2.9-.2l1.6 1.6c.8.8.7 2.2-.2 2.9L30.5 22" fill="#fff" stroke="#f48ca5" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="33.5" cy="13.5" r="1.3" fill="#ff8fb3" />
      <Sparkle x={38} y={20} s={1.05} color="#ff9ec0" />
      <Sparkle x={12} y={16} s={0.75} color="#ffd0e0" />
      <path d="M20 28c1.8 1.2 3.5 1.4 5.2.4" fill="none" stroke="#ff8fb3" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function CuteInstaxIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#fff3e8" />
      <rect x="13" y="9" width="22" height="30" rx="3.5" fill="#fff" stroke="#f4a98a" strokeWidth="1.8" />
      <rect x="16.5" y="12.5" width="15" height="15" rx="2" fill="#ffd9c2" />
      {/* little sun face in photo */}
      <circle cx="24" cy="20" r="3.6" fill="#ffc28a" />
      <circle cx="22.7" cy="19.2" r="0.55" fill="#c4784a" />
      <circle cx="25.3" cy="19.2" r="0.55" fill="#c4784a" />
      <path d="M22.6 21.2c.7.7 1.9.7 2.6 0" fill="none" stroke="#c4784a" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M17.5 32.5h13" stroke="#f4a98a" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 35.5h9" stroke="#ffd0b8" strokeWidth="2" strokeLinecap="round" />
      <Sparkle x={36} y={14} s={1} color="#ffb088" />
      <Sparkle x={12} y={28} s={0.7} color="#ffd4b8" />
    </svg>
  )
}

export function CuteCarIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#eef7ff" />
      <path
        d="M10 26.5c0-1.2.6-2.3 1.6-2.9l3.2-1.8c1-.6 2.1-.8 3.2-.6l3.3.5c.7.1 1.4.1 2.1 0l3.4-.5c1.1-.2 2.2 0 3.2.6l3.4 2c.9.5 1.5 1.5 1.5 2.6V31c0 1.4-1.1 2.5-2.5 2.5h-1.2c-.3 1.5-1.6 2.6-3.2 2.6s-2.9-1.1-3.2-2.6H20.1c-.3 1.5-1.6 2.6-3.2 2.6s-2.9-1.1-3.2-2.6H12.5C11.1 33.5 10 32.4 10 31v-4.5z"
        fill="#fff"
        stroke="#7eb6e8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 22.5l1.8-4.2c.4-1 1.4-1.6 2.4-1.6h7.5c1.1 0 2 .7 2.4 1.7l1.6 4.1" fill="#cfe8ff" stroke="#7eb6e8" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="16.8" cy="33.2" r="2.3" fill="#9ec9f0" stroke="#7eb6e8" strokeWidth="1.2" />
      <circle cx="31.2" cy="33.2" r="2.3" fill="#9ec9f0" stroke="#7eb6e8" strokeWidth="1.2" />
      <circle cx="24" cy="25.5" r="1.2" fill="#ff9ec0" />
      <Sparkle x={37} y={16} s={0.9} color="#a8d4ff" />
    </svg>
  )
}

export function CuteTicketIcon({ size = 26, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#f3edff" />
      <path
        d="M11 18.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5v3c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5h26c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5v-3c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5H11z"
        fill="#fff"
        stroke="#b79cf0"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M20 17v14" stroke="#d4c2ff" strokeWidth="1.8" strokeDasharray="2.2 2.2" strokeLinecap="round" />
      <circle cx="27" cy="22" r="1.3" fill="#ff9ec0" />
      <circle cx="31.5" cy="22" r="1.3" fill="#ffc28a" />
      <circle cx="29.2" cy="25.8" r="1.3" fill="#9ed9c2" />
      <Sparkle x={36} y={14} s={0.95} color="#c9b0ff" />
      <path d="M14.5 22.5h2.5M14.5 26h2.5" stroke="#b79cf0" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CuteReceiptIcon({ size = 22, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="#ffe8f0" />
      <path
        d="M15 10h18v28l-3-2-3 2-3-2-3 2-3-2-3 2V10z"
        fill="#fff"
        stroke="#f48ca5"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M19 18h10M19 23h10M19 28h6" stroke="#ffb0c8" strokeWidth="2" strokeLinecap="round" />
      <Sparkle x={35} y={14} s={0.85} color="#ff9ec0" />
    </svg>
  )
}

export function CuteCameraShotIcon({ size = 18, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M10 20c0-2 1.6-3.6 3.6-3.6h2.4l1.4-2c.4-.6 1-.9 1.7-.9h9.8c.7 0 1.3.3 1.7.9l1.4 2h2.4c2 0 3.6 1.6 3.6 3.6v12.4c0 2-1.6 3.6-3.6 3.6H13.6c-2 0-3.6-1.6-3.6-3.6V20z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="26.5" r="6" fill="#ffb7cc" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="26.5" r="2.8" fill="#fff6fa" />
      <Sparkle x={36} y={14} s={1} color="#ffd0e0" />
    </svg>
  )
}
