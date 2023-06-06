'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {}

const Logo = (props: Props) => {
  const router = useRouter()
  return (
    <Image
      className="hidden h-auto w-auto cursor-pointer md:block"
      width="100"
      height="100"
      alt="logo"
      priority
      src="/images/logo.png"
    />
  )
}

export default Logo
