import {
  QUICK_HOURS,
  STEP_HOURS,
  clampHours,
  durationFromTimeRange,
} from '../pricing'
import { Stepper } from './Stepper'

type DurationPickerProps = {
  hours: number
  startTime: string
  endTime: string
  onHoursChange: (hours: number) => void
  onTimeChange: (start: string, end: string) => void
}

export function DurationPicker({
  hours,
  startTime,
  endTime,
  onHoursChange,
  onTimeChange,
}: DurationPickerProps) {
  const handleStart = (value: string) => {
    onTimeChange(value, endTime)
    const next = durationFromTimeRange(value, endTime)
    if (next !== null && next > 0) onHoursChange(clampHours(next))
  }

  const handleEnd = (value: string) => {
    onTimeChange(startTime, value)
    const next = durationFromTimeRange(startTime, value)
    if (next !== null && next > 0) onHoursChange(clampHours(next))
  }

  const setHoursManual = (next: number) => {
    onHoursChange(clampHours(next))
    onTimeChange('', '')
  }

  return (
    <section className="card">
      <h2 className="card__title">拍摄时长</h2>

      <div className="time-row">
        <label className="time-field">
          <span>开始</span>
          <input
            type="time"
            value={startTime}
            onChange={(e) => handleStart(e.target.value)}
          />
        </label>
        <span className="time-arrow" aria-hidden>
          →
        </span>
        <label className="time-field">
          <span>结束</span>
          <input
            type="time"
            value={endTime}
            onChange={(e) => handleEnd(e.target.value)}
          />
        </label>
      </div>
      <p className="hint muted">或按开始/结束时间自动计算时长</p>

      <Stepper
        value={hours}
        onChange={setHoursManual}
        step={STEP_HOURS}
        min={STEP_HOURS}
        max={12}
        format={(v) => v.toFixed(1)}
        label="小时（0.5 = 半小时）"
      />

      <div className="chip-grid">
        {QUICK_HOURS.map((h) => {
          const selected = hours === h
          const label = h === 5 ? '5h 包天' : `${h}h`
          return (
            <button
              key={h}
              type="button"
              className={`chip ${selected ? 'chip--active' : ''}`}
              onClick={() => setHoursManual(h)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <p className="hint tip">
        ± 以 0.5h 步进；选 5h 自动按包天价计；不足 30 分钟按半小时计
      </p>
    </section>
  )
}
