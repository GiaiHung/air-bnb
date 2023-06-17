'use client'

import qs from 'query-string'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import { useRouter, useSearchParams } from 'next/navigation'

import useSearchModal from '@/app/hooks/useSearchModal'

import Modal from './index'
import { CountrySelectValue } from '../Inputs/CountrySelect'
import {
  searchDateBodyContent,
  searchInfoBodyContent,
  searchLocationBodyContent,
} from '@/app/constants'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const searchModal = useSearchModal()
  const params = useSearchParams()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map/Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = dateRange.startDate
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = dateRange.endDate
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    } else {
      return 'Next'
    }
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }
    return 'Back'
  }, [step])

  let bodyContent = <div></div>

  switch (step) {
    case STEPS.LOCATION:
      bodyContent = searchLocationBodyContent(location, setLocation, Map)
      break
    case STEPS.DATE:
      bodyContent = searchDateBodyContent(dateRange, setDateRange)
      break
    case STEPS.INFO:
      bodyContent = searchInfoBodyContent(
        guestCount,
        roomCount,
        bathroomCount,
        setGuestCount,
        setRoomCount,
        setBathroomCount
      )
      break
    default:
      return <div></div>
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal
