import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly'
import EmptyState from '@/app/components/Helper/EmptyState'
import React from 'react'
import ListingClient from './ListingClient'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface Props {
  params: {
    listingId?: string
  }
}

const ListDetail = async ({ params }: Props) => {
  const listing = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default ListDetail
