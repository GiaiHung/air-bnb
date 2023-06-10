'use client'

import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import RentModal from './RentModal'

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal />
    </>
  )
}

export default ModalsProvider
