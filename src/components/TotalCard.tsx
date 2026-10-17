import type { QuoteResult } from '../pricing'
import { MIN_HOURS } from '../pricing'

type TotalCardProps = {
  quote: QuoteResult
}

export function TotalCard({ quote }: TotalCardProps) {
  return (
    <section className="card card--total">
      <div className="total-hero">
        <h2 className="card__title total-hero__title">尾款总价</h2>
        <p className="total-amount">
          <span className="total-amount__num">{quote.payable}</span>
          <span className="total-amount__unit">元</span>
        </p>
      </div>
      {quote.belowMinimum ? (
        <p className="warn">未满 {MIN_HOURS}h 起订，金额仍按所选时长计算</p>
      ) : null}
      <ul className="breakdown">
        {quote.lines.map((line) => (
          <li key={line.key} className={`breakdown__item breakdown__item--${line.kind}`}>
            <span>{line.kind === 'subtract' ? '−' : '+'}</span>
            <span>{line.label}</span>
          </li>
        ))}
      </ul>
      <p className="total-gross">合计 {quote.gross} 元（含定金前）</p>
    </section>
  )
}
