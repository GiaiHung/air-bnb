'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'

import useCountries from '@/app/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'

interface Props {
  data: Listing
  actionLabel?: string
  reservation?: Reservation
  currentUser?: User | null
  disabled?: boolean
  actionId?: string
  onAction?: (id: string) => void
}

const ListingCard = ({
  data,
  actionLabel,
  reservation,
  currentUser,
  disabled,
  actionId = '',
  onAction,
}: Props) => {
  const router = useRouter()
  const { getByValue } = useCountries()
  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) {
        return
      }
      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice
    return data.price
  }, [reservation, data])

  const reservationDate = useMemo(() => {
    if (!reservation) return null
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)
    return `${format(start, 'PP')} - ${format(end, 'PP')}}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-3">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="listing card"
            fill
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  )
}

export default ListingCard
