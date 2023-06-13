'use client'

import { Range } from 'react-date-range'

interface Props {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation = (props: Props) => {
  return <div>ListingReservation</div>
}

export default ListingReservation
