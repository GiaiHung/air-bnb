'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listing, Reservation, User } from '@prisma/client'
import { Range } from 'react-date-range'

import useLoginModal from '@/app/hooks/useLoginModal'
import { categories } from '@/app/constants'
import Container from '@/app/components/Container'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import ListingReservation from './ListingReservation'

interface Props {
  reservations?: Reservation[]
  listing: Listing
  currentUser?: User
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

const ListingClient = ({ listing, currentUser, reservations = [] }: Props) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  )
  const { title, id, imageSrc, locationValue } = listing
  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const onReservation = useCallback(async () => {
    if (!currentUser) {
      toast.error('You must be logged in first to make a reservation')
      return loginModal.onOpen()
    }
    setIsLoading(true)
    await axios
      .post('/api/reservation', {
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success('Your reservation has been saved!')
        setDateRange(initialDateRange)
        // Redirect to /trips
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }, [currentUser, dateRange, listing.id, loginModal, router, totalPrice])

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <ListingHead
          id={id}
          title={title}
          locationValue={locationValue}
          imageSrc={imageSrc}
          currentUser={currentUser}
        />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            currentUser={currentUser}
            listing={listing}
            category={category}
          />
          <div className="order-first col-span-7 mb-10 md:order-last md:col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value: any) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
