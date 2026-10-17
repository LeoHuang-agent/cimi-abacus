import { RETOUCH_PRICE } from '../pricing'
import { CuteCarIcon, CuteRetouchIcon, CuteTicketIcon } from './CuteIcons'
import { Stepper } from './Stepper'

type ExtrasCardProps = {
  retouchCount: number
  travelFee: number
  miscFee: number
  onRetouchChange: (n: number) => void
  onTravelChange: (n: number) => void
  onMiscChange: (n: number) => void
}

/** 去掉前导零，空串视为 0；展示时 0 显示为空，避免出现 025 */
function parseMoney(raw: string): number {
  const digits = raw.replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '')
  if (!digits) return 0
  const n = Number(digits)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(999999, Math.round(n))
}

function MoneyInput({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  return (
    <label className="money-input">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="0"
        value={value === 0 ? '' : String(value)}
        onChange={(e) => onChange(parseMoney(e.target.value))}
      />
      <span>元</span>
    </label>
  )
}

export function ExtrasCard({
  retouchCount,
  travelFee,
  miscFee,
  onRetouchChange,
  onTravelChange,
  onMiscChange,
}: ExtrasCardProps) {
  return (
    <section className="card">
      <h2 className="card__title">可选加项</h2>

      <div className="extra-row">
        <div className="extra-row__meta">
          <span className="extra-row__icon extra-row__icon--cute" aria-hidden>
            <CuteRetouchIcon />
          </span>
          <div className="extra-row__label">
            <strong>加修</strong>
            <span>{RETOUCH_PRICE}元/张</span>
          </div>
        </div>
        <Stepper
          value={retouchCount}
          onChange={onRetouchChange}
          step={1}
          min={0}
          max={200}
          size="sm"
        />
      </div>

      <div className="extra-row">
        <div className="extra-row__meta">
          <span className="extra-row__icon extra-row__icon--cute" aria-hidden>
            <CuteCarIcon />
          </span>
          <div className="extra-row__label">
            <strong>车费</strong>
            <span>选填</span>
          </div>
        </div>
        <MoneyInput value={travelFee} onChange={onTravelChange} />
      </div>

      <div className="extra-row">
        <div className="extra-row__meta">
          <span className="extra-row__icon extra-row__icon--cute" aria-hidden>
            <CuteTicketIcon />
          </span>
          <div className="extra-row__label">
            <strong>门票/其他</strong>
            <span>选填</span>
          </div>
        </div>
        <MoneyInput value={miscFee} onChange={onMiscChange} />
      </div>
    </section>
  )
}
