'use client'

import { useState, useCallback } from 'react'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './index'
import Heading from '../Helper/Heading'
import Input from '../Inputs/Inputs'
import Button from '../Helper/Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    await axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose()
      })
      .catch((error) => {
        console.log(error.response.data.message)
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-3">
      <hr />
      <Button
        label="Continue with Google"
        outline
        small
        onClick={() => signIn('google')}
        icon={FcGoogle}
      />
      <Button
        label="Continue with Github"
        outline
        small
        onClick={() => signIn('github')}
        icon={AiFillGithub}
      />
      <div className="flex justify-center gap-1 text-sm">
        <p className="text-center font-light">Already have an account?</p>
        <span
          className="cursor-pointer font-bold hover:underline"
          onClick={() => {
            registerModal.onClose()
            loginModal.onOpen()
          }}
        >
          Login
        </span>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal
