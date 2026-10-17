export function Header() {
  return (
    <header className="app-header">
      <img src="/favicon.svg" alt="" className="app-header__icon" width={36} height={36} />
      <div>
        <h1 className="app-header__title">cimi 小算盘</h1>
        <p className="app-header__sub">陪拍报价～</p>
      </div>
    </header>
  )
}
