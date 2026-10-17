import { PLANS, type PlanId } from '../pricing'
import { Stepper } from './Stepper'

type PeopleStepperProps = {
  planId: PlanId
  value: number
  onChange: (n: number) => void
}

export function PeopleStepper({ planId, value, onChange }: PeopleStepperProps) {
  const plan = PLANS[planId]

  return (
    <section className="card">
      <h2 className="card__title">
        多加人数（{plan.name} +{plan.extraPersonRate}元/时/人）
      </h2>
      <Stepper
        value={value}
        onChange={onChange}
        step={1}
        min={0}
        max={20}
        label="额外人数（不含摄影师）"
      />
      <p className="hint muted">
        每多 1 人：方案一 +{PLANS.plan1.extraPersonRate}元/时，方案二 +
        {PLANS.plan2.extraPersonRate}元/时
      </p>
    </section>
  )
}
