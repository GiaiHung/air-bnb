'use client'

import Image from 'next/image'

import React from 'react'

type Props = {
  image?: string | null | undefined
}

const Avatar = ({ image }: Props) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      width="30"
      height="30"
      src={image || '/images/avatar.jpg'}
    />
  )
}

export default Avatar
