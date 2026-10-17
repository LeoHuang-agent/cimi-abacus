import { CuteReceiptIcon } from './CuteIcons'

type DepositCardProps = {
  value: number
  onChange: (n: number) => void
}

export function DepositCard({ value, onChange }: DepositCardProps) {
  return (
    <section className="card">
      <div className="deposit-row">
        <div className="deposit-row__label">
          <span className="deposit-row__icon deposit-row__icon--cute" aria-hidden>
            <CuteReceiptIcon size={28} />
          </span>
          <strong>下定定金</strong>
        </div>
        <label className="money-input">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={value}
            onChange={(e) => {
              const n = Number(e.target.value)
              onChange(Number.isFinite(n) && n >= 0 ? Math.round(n) : 0)
            }}
          />
          <span>元</span>
        </label>
      </div>
      <p className="hint muted">默认 100 元（底片全返）；可按沟通修改</p>
    </section>
  )
}
