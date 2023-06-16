'use client'

import dynamic from 'next/dynamic'

import { Listing, User } from '@prisma/client'
import Avatar from '@/app/components/Navbar/Search/Avatar'
import { IconType } from 'react-icons'
import ListingCategory from './ListingCategory'
import useCountries from '@/app/hooks/useCountries'

interface Props {
  currentUser?: User
  listing: Listing
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
}

const Map = dynamic(() => import('@/app/components/Map/Map'), { ssr: false })

const ListingInfo = ({ currentUser, listing, category }: Props) => {
  const { guestCount, roomCount, bathroomCount } = listing
  const { getByValue } = useCountries()
  const coordinates = getByValue(listing.locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            Hosted by {currentUser?.name}
          </h2>
          <Avatar image={currentUser?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          description={category.description}
          label={category.label}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {listing.description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo
