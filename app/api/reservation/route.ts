import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  const body = await req.json()
  const { listingId, totalPrice, startDate, endDate } = body
  if (!currentUser) {
    return NextResponse.error()
  }
  if (!listingId || !totalPrice || !startDate || !endDate) {
    return NextResponse.error()
  }
  const listingAndReservation = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  })

  return NextResponse.json(listingAndReservation)
}
