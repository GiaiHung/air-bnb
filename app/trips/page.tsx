import EmptyState from '../components/Helper/EmptyState'
import ClientOnly from '../components/ClientOnly'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

interface Props {}

const Trips = async (props: Props) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }
  const reservations = await getReservations({ userId: currentUser.id })
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Look like you haven't reserved any trips"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default Trips
