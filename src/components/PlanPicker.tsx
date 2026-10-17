import { PLANS, type PlanId } from '../pricing'
import { CuteCameraIcon, CutePhoneIcon } from './CuteIcons'

type PlanPickerProps = {
  value: PlanId
  onChange: (id: PlanId) => void
}

export function PlanPicker({ value, onChange }: PlanPickerProps) {
  const plan = PLANS[value]

  return (
    <section className="card">
      <h2 className="card__title">选拍摄方案</h2>
      <div className="plan-grid">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const p = PLANS[id]
          const selected = id === value
          return (
            <button
              key={id}
              type="button"
              className={`plan-card ${selected ? 'plan-card--active' : ''}`}
              onClick={() => onChange(id)}
            >
              <span className="plan-card__icon plan-card__icon--cute">
                {p.icon === 'phone' ? <CutePhoneIcon size={34} /> : <CuteCameraIcon size={34} />}
              </span>
              <span className="plan-card__name">{p.name}</span>
              <span className="plan-card__price">{p.hourlyRate}元/时</span>
            </button>
          )
        })}
      </div>
      <p className="plan-gear">
        <strong>{plan.tagline}</strong>
        <span> · {plan.gear}</span>
      </p>
    </section>
  )
}
