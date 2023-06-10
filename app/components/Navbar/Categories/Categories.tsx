'use client'

import Container from '../../Container'
import { categories } from '../../../constants'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {}

const Categories = (props: Props) => {
  // This categories section will be hided from other pages
  const params = useSearchParams()
  const pathname = usePathname()
  const category = params?.get('category')
  const isMainPage = pathname || '/'

  if (isMainPage !== '/') {
    return null
  }

  return (
    <Container>
      <div className="my-2 flex items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
