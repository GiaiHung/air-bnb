'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      onClick={() => router.push('/')}
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
