'use client'

import { User } from '@prisma/client'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search/Search'
import UserMenu from './UserMenu'

interface Props {
  currentUser?: User | null
}

export default function Navbar({ currentUser }: Props) {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}
