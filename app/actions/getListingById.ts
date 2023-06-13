interface Props {
  listingId?: string
}

import prisma from '@/app/libs/prismadb'

export default async function getListingById(params: Props) {
  try {
    const { listingId } = params
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    })
    if (!listing) return null
    return listing
  } catch (error) {
    console.log(error)
  }
}
