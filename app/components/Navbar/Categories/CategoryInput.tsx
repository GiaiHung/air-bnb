'use client'

import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  label: string
  icon: IconType
  selected: boolean
  onClick: (value: string) => void
}

const CategoryInput = ({ label, icon: Icon, selected, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <span>
        <Icon size={24} />
      </span>
      <span className="font-semibold">{label}</span>
    </div>
  )
}

export default CategoryInput
