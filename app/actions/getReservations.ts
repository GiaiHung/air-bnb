import prisma from '@/app/libs/prismadb'

interface Props {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: Props) {
  const { listingId, userId, authorId } = params
  const query: any = {}

  if (listingId) {
    query.listingId = listingId
  }
  if (userId) {
    query.userId = userId
  }
  if (authorId) {
    query.authorId = authorId
  }

  const reservations = await prisma.reservation.findMany({
    where: query,
    include: {
      listing: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reservations
}
