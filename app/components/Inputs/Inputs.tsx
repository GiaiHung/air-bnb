'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { IconType } from 'react-icons'
import { BiDollar } from 'react-icons/bi'

interface Props {
  id: string
  label: string
  icon?: IconType
  message?: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  onClickIcon?: () => void
  errors: FieldErrors
}

const Input: React.FC<Props> = ({
  id,
  label,
  icon: Icon,
  type = 'text',
  disabled,
  formatPrice,
  required,
  register,
  onClickIcon,
  errors,
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar className="absolute left-2 top-5 text-gray-700" size={24} />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required,
        })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-3 pt-6 font-light transition disabled:cursor-not-allowed disabled:opacity-70 
        ${formatPrice ? 'pl-9' : 'pl-4'} 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} 
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
      />
      {Icon && (
        <Icon
          className="absolute right-3 top-5 cursor-pointer"
          size={24}
          onClick={onClickIcon}
        />
      )}
      <label
        className={`
          text-md 
          absolute
          top-5 
          z-10 
          origin-[0] 
          -translate-y-3
          transform
          duration-150 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100 
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
