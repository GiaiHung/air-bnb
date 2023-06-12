import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface Props {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<Props> = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [value, onChange])
  const onReduce = useCallback(() => {
    onChange(value - 1)
  }, [value, onChange])
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="font-bold">{title}</span>
        <span>{subtitle}</span>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onReduce} className="counter-btn">
          <AiOutlineMinus size={18} />
        </button>
        <span className="text-lg text-neutral-600">{value}</span>
        <button onClick={onAdd} className="counter-btn">
          <AiOutlinePlus size={18} />
        </button>
      </div>
    </div>
  )
}

export default Counter
