'use client'

import { useState, useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import useRentModal from '@/app/hooks/useRentModal'
import Modal from './index'
import {
  categoryBodyContent,
  counterBodyContent,
  descriptionBodyContent,
  locationBodyContent,
  priceBodyContent,
  uploadImageBodyContent,
} from '@/app/constants'

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
  const [isLoading, setIsLoading] = useState(false)
  const rentModal = useRentModal()
  const router = useRouter()
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
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')
  const price = watch('price')
  const title = watch('title')
  const description = watch('description')

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)
    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Your place has been resgitered!')
        setStep(STEPS.CATEGORY)
        reset()
        rentModal.onClose()
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong. Please try again'))
      .finally(() => setIsLoading(false))
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
      bodyContent = counterBodyContent(
        guestCount,
        roomCount,
        bathroomCount,
        setCustomValue
      )
      break
    case STEPS.IMAGES:
      bodyContent = uploadImageBodyContent(imageSrc, setCustomValue)
      break
    case STEPS.DESCRIPTION:
      bodyContent = descriptionBodyContent(isLoading, register, errors)
      break
    case STEPS.PRICE:
      bodyContent = priceBodyContent(isLoading, register, errors)
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  )
}

export default RentModal
