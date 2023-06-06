import Navbar from './components/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb',
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
