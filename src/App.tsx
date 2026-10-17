import { useMemo, useRef, useState } from 'react'
import { DepositCard } from './components/DepositCard'
import { DurationPicker } from './components/DurationPicker'
import { ExtrasCard } from './components/ExtrasCard'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InstallBanner } from './components/InstallBanner'
import { PeopleStepper } from './components/PeopleStepper'
import { PlanPicker } from './components/PlanPicker'
import { ScreenshotBar } from './components/ScreenshotBar'
import { TotalCard } from './components/TotalCard'
import {
  DEFAULT_DEPOSIT,
  MIN_HOURS,
  calculateQuote,
  type PlanId,
} from './pricing'

export default function App() {
  const captureRef = useRef<HTMLDivElement>(null)
  const [planId, setPlanId] = useState<PlanId>('plan2')
  const [hours, setHours] = useState(MIN_HOURS)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [extraPeople, setExtraPeople] = useState(0)
  const [retouchCount, setRetouchCount] = useState(0)
  const [travelFee, setTravelFee] = useState(0)
  const [miscFee, setMiscFee] = useState(0)
  const [deposit, setDeposit] = useState(DEFAULT_DEPOSIT)

  const quote = useMemo(
    () =>
      calculateQuote({
        planId,
        hours,
        extraPeople,
        retouchCount,
        travelFee,
        miscFee,
        deposit,
      }),
    [planId, hours, extraPeople, retouchCount, travelFee, miscFee, deposit],
  )

  return (
    <div className="app-shell">
      <InstallBanner />
      <div className="capture-root" ref={captureRef}>
        <Header />
        <main className="app-main">
          <PlanPicker value={planId} onChange={setPlanId} />
          <DurationPicker
            hours={hours}
            startTime={startTime}
            endTime={endTime}
            onHoursChange={setHours}
            onTimeChange={(start, end) => {
              setStartTime(start)
              setEndTime(end)
            }}
          />
          <PeopleStepper planId={planId} value={extraPeople} onChange={setExtraPeople} />
          <ExtrasCard
            retouchCount={retouchCount}
            travelFee={travelFee}
            miscFee={miscFee}
            onRetouchChange={setRetouchCount}
            onTravelChange={setTravelFee}
            onMiscChange={setMiscFee}
          />
          <TotalCard quote={quote} />
          <DepositCard value={deposit} onChange={setDeposit} />
          <Footer />
        </main>
      </div>
      <ScreenshotBar targetRef={captureRef} />
    </div>
  )
}
