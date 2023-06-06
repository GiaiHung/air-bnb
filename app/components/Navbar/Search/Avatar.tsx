'use client'

import Image from 'next/image'

import React from 'react'

type Props = {}

const Avatar = (props: Props) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      width="30"
      height="30"
      src="/images/avatar.jpg"
    />
  )
}

export default Avatar
