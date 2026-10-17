import assert from 'node:assert/strict'
import {
  calculateQuote,
  minutesToBillableHours,
  durationFromTimeRange,
  clampHours,
  QUICK_HOURS,
  RETOUCH_PRICE,
} from '../src/pricing.ts'

const checks = []
function ok(name, cond, detail = '') {
  checks.push({ name, pass: !!cond })
  console.log(cond ? 'OK ' : 'FAIL', name, detail)
  if (!cond) assert.fail(`${name} ${detail}`)
}

ok('快捷时长无1h/1.5h', !QUICK_HOURS.includes(1) && !QUICK_HOURS.includes(1.5) && QUICK_HOURS[0] === 2)

const q0 = calculateQuote({
  planId: 'plan2',
  hours: 2,
  extraPeople: 0,
  retouchCount: 0,
  travelFee: 0,
  miscFee: 0,
  deposit: 100,
})
ok('默认 plan2 2h 应付300', q0.payable === 300 && q0.gross === 400, `payable=${q0.payable}`)

const q1 = calculateQuote({
  planId: 'plan1',
  hours: 5,
  extraPeople: 0,
  retouchCount: 0,
  travelFee: 0,
  miscFee: 0,
  deposit: 100,
})
ok('方案一包天 base750 应付650', q1.isDayPackage && q1.base === 750 && q1.payable === 650)

const q2 = calculateQuote({
  planId: 'plan2',
  hours: 5,
  extraPeople: 1,
  retouchCount: 3,
  travelFee: 40,
  miscFee: 10,
  deposit: 100,
})
// 1000 + 250 + 30 + 40 + 10 - 100 = 1230
ok(
  '方案二包天+加人+加修+车费门票',
  q2.payable === 1230 && q2.peopleCost === 250,
  `payable=${q2.payable} addons=${q2.addons}`,
)
ok('无拍立得明细', !q2.lines.some((l) => l.key === 'instax'))
ok('加修单价10', RETOUCH_PRICE === 10)

const q3 = calculateQuote({
  planId: 'plan1',
  hours: 1,
  extraPeople: 0,
  retouchCount: 0,
  travelFee: 0,
  miscFee: 0,
  deposit: 100,
})
ok('未满起订', q3.belowMinimum === true && q3.payable === 50)

ok('20min->0.5', minutesToBillableHours(20) === 0.5)
ok('10:00-12:20->2.5', durationFromTimeRange('10:00', '12:20') === 2.5)
ok('clamp 2.4->2.5', clampHours(2.4) === 2.5)

console.log(`\nAll ${checks.length} pricing tests passed`)
