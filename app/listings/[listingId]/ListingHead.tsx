'use client'

import { User } from '@prisma/client'
import Image from 'next/image'

import Heading from '@/app/components/Helper/Heading'
import useCountries from '@/app/hooks/useCountries'
import HeartButton from '@/app/components/Listings/HearButton'

interface Props {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: User | undefined
}

const ListingHead = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}: Props) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)
  return (
    <div>
      <Heading
        title={title}
        subtitle={`${location?.label}, ${location?.region}`}
      />
      <div className="relative mt-4 h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Listing image"
          src={imageSrc}
          fill
          className="w-full object-cover"
          priority
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default ListingHead
