'use client'

import { useMemo } from 'react'
import useCountries from '@/app/hooks/useCountries'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { differenceInDays } from 'date-fns'

type Props = {}

const Search = (props: Props) => {
  const searchModal = useSearchModal()
  const params = useSearchParams()
  const { getByValue } = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let duration = differenceInDays(end, start)
      if (duration === 0) {
        duration = 1
      }

      return `${duration} Days`
    }

    return 'Any week'
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`
    }

    return 'Add guests'
  }, [guestCount])

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="cursor-pointer px-6 text-sm font-semibold">
          {locationLabel}
        </div>
        <div className="hidden flex-1 cursor-pointer border-x-[1px] px-6 text-sm font-semibold sm:block">
          {durationLabel}
        </div>
        <div className="flex cursor-pointer items-center gap-2 px-6 text-gray-600">
          <p className="hidden text-sm sm:block">{guestLabel}</p>
          <div className="grid items-center rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
