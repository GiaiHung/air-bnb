'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'

interface Props {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = 'No exact match',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: Props) => {
  const router = useRouter()
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button
            label="Remove all your filters"
            outline
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState
