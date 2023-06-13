import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/app/libs/prismadb'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return undefined
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    })
    if (!currentUser) return undefined
    return currentUser
  } catch (error: any) {
    return undefined
  }
}
