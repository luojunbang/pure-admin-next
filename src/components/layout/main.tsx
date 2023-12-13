import Menu from './menu'
import Header from './header'
export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-[320px] pt-[70px]">
      <Header />
      <Menu />
      <div className="">{children}</div>
    </div>
  )
}
