'use client'

import useCountries from '@/app/hooks/useCountries'
import Select from 'react-select'
import ReactCountryFlag from 'react-country-flag'

export type CountrySelectValue = {
  flag: string
  value: string
  label: string
  region: string
  latlng: number[]
}

interface Props {
  value: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const { getAll } = useCountries()
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-3">
            <div>
              <ReactCountryFlag countryCode={option.value} svg />
            </div>
            <div className="font-semibold">
              {option.label},
              <span className="ml-1 text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'border-2 p-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  )
}

export default CountrySelect
