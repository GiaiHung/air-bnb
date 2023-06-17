import prisma from '@/app/libs/prismadb'

export interface ListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: ListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params
    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: new Date(startDate).toISOString() },
                startDate: { lte: new Date(startDate).toISOString() },
              },
              {
                startDate: { lte: new Date(endDate).toISOString() },
                endDate: { gte: new Date(endDate).toISOString() },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    })

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
