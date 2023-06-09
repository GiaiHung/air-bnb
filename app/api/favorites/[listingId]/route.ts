import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface Params {
  listingId?: string
}

export async function POST(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()
  const { listingId } = params

  if (!currentUser) {
    return NextResponse.error()
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }
  const favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  })
  return NextResponse.json(updatedUser)
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()
  const { listingId } = params

  if (!currentUser) {
    return NextResponse.error()
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter((id) => id !== listingId)
  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  })
  return NextResponse.json(updatedUser)
}
