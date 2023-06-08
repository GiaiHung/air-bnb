'use client'

import { useState, useCallback } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Modal from './index'
import Heading from '../Helper/Heading'
import Input from '../Inputs/Inputs'
import Button from '../Helper/Button'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const [isShownPassword, setIsShownPassword] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Login successfully!')
        router.refresh()
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    })
    loginModal.onClose()
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Login to your account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        icon={isShownPassword ? AiFillEye : AiFillEyeInvisible}
        type={isShownPassword ? 'text' : 'password'}
        disabled={isLoading}
        required
        register={register}
        onClickIcon={() => setIsShownPassword(!isShownPassword)}
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
        onClick={() => {}}
        icon={FcGoogle}
      />
      <Button
        label="Continue with Github"
        outline
        small
        onClick={() => {}}
        icon={AiFillGithub}
      />
      <div className="flex justify-center gap-1 text-sm">
        <p className="text-center font-light">Don`&apos;`t have an account?</p>
        <span
          className="cursor-pointer font-bold hover:underline"
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
          }}
        >
          Register
        </span>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal
