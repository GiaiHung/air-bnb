'use client'

import { IconType } from 'react-icons'

interface Props {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<Props> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-1 font-semibold transition md:py-2
      ${outline ? 'bg-white' : 'bg-rose-500'}
      ${outline ? 'border-black' : 'border-rose-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${outline ? 'hover:bg-gray-300' : 'hover:bg-rose-600'}
      ${small ? 'text-sm' : 'text-lg'}
      ${small ? 'border-[1px]' : 'border-[2px]'}
    `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={`${outline ? 'text-black' : 'text-white'}`}
          size={24}
        />
      )}
      {label}
    </button>
  )
}

export default Button
