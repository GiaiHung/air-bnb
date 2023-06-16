'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'

import useCountries from '@/app/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'
import HeartButton from './HearButton'
import Button from '../Helper/Button'

interface Props {
  data: Listing
  actionLabel?: string
  reservation?: Reservation
  currentUser?: User | undefined
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
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="listing card"
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
            className="h-full w-full object-cover transition group-hover:scale-110"
          />
          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <span>night</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            small
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
