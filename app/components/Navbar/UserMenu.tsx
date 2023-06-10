'use client'

import { useState, useCallback } from 'react'
import Avatar from './Search/Avatar'
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './Search/MenuItem'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import useRentModal from '@/app/hooks/useRentModal'

type Props = {
  currentUser?: User | null
}

const UserMenu = ({ currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const router = useRouter()

  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  const onRent = useCallback(() => {
    if (!currentUser) {
      toast.error('Please login first')
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full border-[1px] border-neutral-200 px-4 py-2 text-sm font-semibold transition hover:bg-neutral-200 sm:block"
          onClick={onRent}
        >
          AirBnb your home
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px]  border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          {currentUser ? (
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push('/trips')}
              />
              <MenuItem
                label="My favorites"
                onClick={() => router.push('/favorites')}
              />
              <MenuItem
                label="My reservations"
                onClick={() => router.push('/reservations')}
              />
              <MenuItem
                label="My properties"
                onClick={() => router.push('/properties')}
              />
              <MenuItem label="Airbnb your home" onClick={onRent} />
              <hr />
              <MenuItem label="Logout" onClick={() => signOut()} />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default UserMenu
