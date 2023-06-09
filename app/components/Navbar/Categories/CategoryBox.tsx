import React from 'react'
import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import qs from 'query-string'

interface Props {
  label: string
  icon: IconType
  selected?: boolean
}

const CategoryBox: React.FC<Props> = ({ label, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }
    // Once the category selected, click again will remove every category
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )
    router.push(url)
  }, [params, label, router])

  return (
    <div
      onClick={handleClick}
      className={`
      flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800
      ${selected ? 'border-b-neutral-800' : 'border-b-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}

export default CategoryBox
