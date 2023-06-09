'use client'

import { BiSearch } from 'react-icons/bi'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className="w-full rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <div className="flex flex-row items-center justify-between">
        <div className="cursor-pointer px-6 text-sm font-semibold">
          Anywhere
        </div>
        <div className="hidden flex-1 cursor-pointer border-x-[1px] px-6 text-sm font-semibold sm:block">
          Any Week
        </div>
        <div className="flex cursor-pointer items-center gap-2 px-6 text-gray-600">
          <p className="hidden text-sm sm:block">Add Guests</p>
          <div className="grid items-center rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
