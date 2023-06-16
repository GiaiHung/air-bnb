import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/Helper/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getReservations from '@/app/actions/getReservations'

interface Props {
  params: {
    listingId?: string
  }
}

const ListDetail = async ({ params }: Props) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()
  const reservations = await getReservations(params)

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListDetail
