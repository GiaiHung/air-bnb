'use client'

import { useState } from 'react'
import Avatar from './Search/Avatar'
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './Search/MenuItem'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

type Props = {}

const UserMenu = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const router = useRouter()

  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 sm:block">
          AirBnb your home
        </div>
        <div
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px]  border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          {/* <>
            <MenuItem label="My trips" onClick={() => router.push('/trips')} />
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
            <MenuItem label="Airbnb your home" onClick={() => {}} />
            <hr />
            <MenuItem label="Logout" onClick={() => {}} />
          </> */}

          <>
            <MenuItem label="Login" onClick={loginModal.onOpen} />
            <MenuItem label="Sign up" onClick={registerModal.onOpen} />
          </>
        </div>
      )}
    </div>
  )
}

export default UserMenu
