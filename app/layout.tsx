'use client'

import { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import RegisterModal from './components/Modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import ModalsProvider from './components/Modals/ModalProviders'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Welcome to AirBnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <ModalsProvider />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
