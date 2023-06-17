export const dynamic = 'force-dynamic'

import getCurrentUser from './actions/getCurrentUser'
import getListings, { ListingsParams } from './actions/getListings'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/Helper/EmptyState'
import ListingCard from './components/Listings/ListingCard'

export const metadata = {
  title: 'Airbnb | Homepage',
}

interface Props {
  searchParams: ListingsParams
}

export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className=" grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
