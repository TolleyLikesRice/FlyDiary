import Link from 'next/link'

import RootLayout from './layout'

export default function Home() {
  return (
    <RootLayout>
      <Link href={"/dashboard"}>go to dashboard</Link>
    </RootLayout>
  )
}
