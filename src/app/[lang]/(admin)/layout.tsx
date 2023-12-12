import Main from '@/app/layout/main'

export default function RootLayout({
  children,
  params,
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  const { lang } = params
  return <Main lang={lang}>{children}</Main>
}
