'use client'

import { useState, useMemo } from 'react'
import useRentModal from '@/app/hooks/useRentModal'
import Modal from './index'
import { categoryBodyContent, locationBodyContent } from '@/app/constants'
import { FieldValues, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY)
  const rentModal = useRentModal()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })
  const category = watch('category')
  const location = watch('location')
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const Map = useMemo(
    () => dynamic(() => import('../Map/Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  let bodyContent = <div></div>

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }
    return 'Next'
  }, [step])

  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = categoryBodyContent(category, setCustomValue)
      break
    case STEPS.LOCATION:
      bodyContent = locationBodyContent(location, setCustomValue, Map)
      break
    case STEPS.INFO:
      // code block
      break
    case STEPS.IMAGES:
      // code block
      break
    case STEPS.DESCRIPTION:
      // code block
      break
    case STEPS.PRICE:
      // code block
      break
    default:
      return <div></div>
  }

  return (
    <Modal
      title="Airbnb your home"
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  )
}

export default RentModal
