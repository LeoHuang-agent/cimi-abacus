export type PlanId = 'plan1' | 'plan2'

export interface Plan {
  id: PlanId
  name: string
  shortName: string
  tagline: string
  hourlyRate: number
  extraPersonRate: number
  dayPackage: number
  dayHours: number
  gear: string
  icon: 'phone' | 'camera'
}

export const PLANS: Record<PlanId, Plan> = {
  plan1: {
    id: 'plan1',
    name: '方案一',
    shortName: '轻便氛围',
    tagline: '轻便氛围感',
    hourlyRate: 150,
    extraPersonRate: 30,
    dayPackage: 750,
    dayHours: 5,
    gear: 'Canon g7x2 · iPhone XR · iPhone 6',
    icon: 'phone',
  },
  plan2: {
    id: 'plan2',
    name: '方案二',
    shortName: '富士微单',
    tagline: '富士微单质感',
    hourlyRate: 200,
    extraPersonRate: 50,
    dayPackage: 1000,
    dayHours: 5,
    gear: 'Fuji xs20+16-50mm · iPhone · g7x2',
    icon: 'camera',
  },
}

export const RETOUCH_PRICE = 10
export const DEFAULT_DEPOSIT = 100
export const MIN_HOURS = 2
export const STEP_HOURS = 0.5
export const QUICK_HOURS = [2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export interface QuoteInput {
  planId: PlanId
  hours: number
  extraPeople: number
  retouchCount: number
  travelFee: number
  miscFee: number
  deposit: number
}

export interface QuoteLine {
  key: string
  label: string
  amount: number
  kind: 'add' | 'subtract'
}

export interface QuoteResult {
  plan: Plan
  hours: number
  isDayPackage: boolean
  belowMinimum: boolean
  base: number
  peopleCost: number
  addons: number
  gross: number
  deposit: number
  payable: number
  lines: QuoteLine[]
}

/** 按图三：不足 30 分钟按半小时计；向上取到 0.5h 步进 */
export function minutesToBillableHours(minutes: number): number {
  if (!Number.isFinite(minutes) || minutes <= 0) return 0
  const halfHours = Math.ceil(minutes / 30)
  return halfHours * STEP_HOURS
}

export function parseTimeToMinutes(value: string): number | null {
  if (!value || !/^\d{1,2}:\d{2}$/.test(value)) return null
  const [h, m] = value.split(':').map(Number)
  if (h < 0 || h > 23 || m < 0 || m > 59) return null
  return h * 60 + m
}

export function durationFromTimeRange(start: string, end: string): number | null {
  const startMin = parseTimeToMinutes(start)
  const endMin = parseTimeToMinutes(end)
  if (startMin === null || endMin === null) return null
  let diff = endMin - startMin
  if (diff <= 0) diff += 24 * 60
  return minutesToBillableHours(diff)
}

export function clampHours(hours: number): number {
  if (!Number.isFinite(hours)) return MIN_HOURS
  const stepped = Math.round(hours / STEP_HOURS) * STEP_HOURS
  return Math.max(STEP_HOURS, Math.min(12, Number(stepped.toFixed(1))))
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const plan = PLANS[input.planId]
  const hours = clampHours(input.hours)
  const extraPeople = Math.max(0, Math.floor(input.extraPeople))
  const retouchCount = Math.max(0, Math.floor(input.retouchCount))
  const travelFee = Math.max(0, input.travelFee || 0)
  const miscFee = Math.max(0, input.miscFee || 0)
  const deposit = Math.max(0, input.deposit || 0)

  const isDayPackage = hours >= plan.dayHours
  const base = isDayPackage ? plan.dayPackage : plan.hourlyRate * hours
  const peopleCost = extraPeople * plan.extraPersonRate * hours
  const retouchCost = retouchCount * RETOUCH_PRICE
  const addons = retouchCost + travelFee + miscFee
  const gross = base + peopleCost + addons
  const payable = Math.max(0, gross - deposit)

  const lines: QuoteLine[] = []

  if (isDayPackage) {
    lines.push({
      key: 'base',
      label: `${plan.name} 包天 ${plan.dayPackage}元`,
      amount: base,
      kind: 'add',
    })
  } else {
    lines.push({
      key: 'base',
      label: `${plan.name} ${plan.hourlyRate}×${hours} = ${base}元`,
      amount: base,
      kind: 'add',
    })
  }

  if (peopleCost > 0) {
    lines.push({
      key: 'people',
      label: `加人 ${plan.extraPersonRate}×${extraPeople}人×${hours}h = ${peopleCost}元`,
      amount: peopleCost,
      kind: 'add',
    })
  }

  if (retouchCost > 0) {
    lines.push({
      key: 'retouch',
      label: `加修 ${RETOUCH_PRICE}×${retouchCount} = ${retouchCost}元`,
      amount: retouchCost,
      kind: 'add',
    })
  }

  if (travelFee > 0) {
    lines.push({
      key: 'travel',
      label: `车费 ${travelFee}元`,
      amount: travelFee,
      kind: 'add',
    })
  }

  if (miscFee > 0) {
    lines.push({
      key: 'misc',
      label: `门票/其他 ${miscFee}元`,
      amount: miscFee,
      kind: 'add',
    })
  }

  if (deposit > 0) {
    lines.push({
      key: 'deposit',
      label: `扣除定金 -${deposit}元`,
      amount: deposit,
      kind: 'subtract',
    })
  }

  return {
    plan,
    hours,
    isDayPackage,
    belowMinimum: hours < MIN_HOURS,
    base,
    peopleCost,
    addons,
    gross,
    deposit,
    payable,
    lines,
  }
}
