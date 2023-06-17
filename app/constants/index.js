/* eslint-disable react-hooks/rules-of-hooks */
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import Heading from '../components/Helper/Heading'
import CategoryInput from '../components/Navbar/Categories/CategoryInput'
import CountrySelect from '../components/Inputs/CountrySelect'
import Counter from '../components/Counter/Counter'
import ImageUpload from '../components/Inputs/ImageUpload'
import Input from '../components/Inputs/Inputs'
import Calendar from '../listings/[listingId]/Calendar'

const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!',
  },
]

const categoryBodyContent = (category, setCustomValue) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1 mr-2">
            <CategoryInput
              label={item.label}
              icon={item.icon}
              onClick={(category) => setCustomValue('category', category)}
              selected={item.label === category}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const locationBodyContent = (location, setCustomValue, Map) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect
        value={location}
        onChange={(location) => setCustomValue('location', location)}
      />
      <Map center={location?.latlng} />
    </div>
  )
}

const counterBodyContent = (
  guestCount,
  roomCount,
  bathroomCount,
  setCustomValue
) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title="Guests"
        subtitle="How many guests do you allow"
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
      />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you have"
        value={roomCount}
        onChange={(value) => setCustomValue('roomCount', value)}
      />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you have"
        value={bathroomCount}
        onChange={(value) => setCustomValue('bathroomCount', value)}
      />
    </div>
  )
}

const uploadImageBodyContent = (imageSrc, setCustomValue) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place look like!"
      />
      <ImageUpload
        value={imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
      />
    </div>
  )
}

const descriptionBodyContent = (isLoading, register, errors) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet work best"
      />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

const priceBodyContent = (isLoading, register, errors) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input
        id="price"
        label="Price"
        type="number"
        formatPrice
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
}

// For search modal
const searchLocationBodyContent = (location, setLocation, Map) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )
}

const searchDateBodyContent = (dateRange, setDateRange) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
      />
    </div>
  )
}

const searchInfoBodyContent = (
  guestCount,
  roomCount,
  bathroomCount,
  setGuestCount,
  setRoomCount,
  setBathroomCount
) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="More information" subtitle="Find your perfect place!" />
      <Counter
        onChange={(value) => setGuestCount(value)}
        value={guestCount}
        title="Guests"
        subtitle="How many guests are coming?"
      />
      <hr />
      <Counter
        onChange={(value) => setRoomCount(value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you need?"
      />
      <hr />
      <Counter
        onChange={(value) => {
          setBathroomCount(value)
        }}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bahtrooms do you need?"
      />
    </div>
  )
}

export {
  categories,
  categoryBodyContent,
  locationBodyContent,
  counterBodyContent,
  uploadImageBodyContent,
  descriptionBodyContent,
  priceBodyContent,
  searchLocationBodyContent,
  searchDateBodyContent,
  searchInfoBodyContent,
}
