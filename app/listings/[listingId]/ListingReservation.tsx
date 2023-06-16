'use client'

import { Range } from 'react-date-range'
import Calendar from './Calendar'
import Button from '@/app/components/Helper/Button'

interface Props {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-xl font-semibold">$ {price}</div>
        <p className="text-lg font-light text-neutral-500">/ night</p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="flex items-center justify-between p-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold">$ {totalPrice}</p>
      </div>
      <hr />
      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>
    </div>
  )
}

export default ListingReservation
