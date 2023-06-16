'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Listing, Reservation, User } from '@prisma/client'
import Container from '../components/Container'
import Heading from '../components/Helper/Heading'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/Listings/ListingCard'

type SafeReservation = Omit<Reservation, 'listing'> & {
  listing: Listing
}

interface Props {
  reservations: SafeReservation[]
  currentUser: User
}

const TripsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id)
      await axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success('Reservation canceled successfully')
          router.refresh()
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''))
    },
    [router]
  )

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle={`Where you've been and where you're going`}
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((item) => (
          <ListingCard
            data={item.listing}
            key={item.id}
            actionLabel="Cancel reservation"
            actionId={item.id}
            reservation={item}
            currentUser={currentUser}
            disabled={deletingId === item.id}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
