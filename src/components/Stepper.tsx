type StepperProps = {
  value: number
  onChange: (next: number) => void
  step?: number
  min?: number
  max?: number
  size?: 'lg' | 'sm'
  format?: (value: number) => string
  label?: string
}

export function Stepper({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 99,
  size = 'lg',
  format,
  label,
}: StepperProps) {
  const dec = () => onChange(Math.max(min, Number((value - step).toFixed(2))))
  const inc = () => onChange(Math.min(max, Number((value + step).toFixed(2))))

  return (
    <div className={`stepper stepper--${size}`}>
      <button type="button" className="stepper__btn" onClick={dec} aria-label="减少">
        −
      </button>
      <div className="stepper__value">
        <span>{format ? format(value) : value}</span>
        {label ? <small>{label}</small> : null}
      </div>
      <button type="button" className="stepper__btn" onClick={inc} aria-label="增加">
        +
      </button>
    </div>
  )
}
