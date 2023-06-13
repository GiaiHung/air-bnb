import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import useLoginModal from './useLoginModal'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

interface Props {
  listingId: string
  currentUser?: User
}

const useFavorite = ({ listingId, currentUser }: Props) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      if (!currentUser) {
        toast.error('Please login to favorites')
        return loginModal.onOpen()
      }
      try {
        let request
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }
        await request()
        router.refresh()
        toast.success('Your favorites have been updated')
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong() => ')
      }
    },
    [currentUser, loginModal, hasFavorite, listingId, router]
  )

  return { hasFavorite, toggleFavorite }
}

export { useFavorite }
