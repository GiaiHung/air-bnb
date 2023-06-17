'use client'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import RentModal from './RentModal'
import SearchModal from './SearchModal'

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal />
      <SearchModal />
    </>
  )
}

export default ModalsProvider
