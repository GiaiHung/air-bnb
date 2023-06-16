import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '../../../libs/prismadb'

interface Params {
  reservationId: string
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()
  const { reservationId } = params
  if (!currentUser) {
    return NextResponse.error()
  }
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid request')
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json(reservation)
}
