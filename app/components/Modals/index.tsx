'use client'

import { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Helper/Button'

interface Props {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  disabled?: boolean
  actionLabel: string
  secondaryActionLabel?: string
  secondaryAction?: () => void
}

const Modal: React.FC<Props> = ({
  isOpen,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryActionLabel,
  onSubmit,
  onClose,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return
    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return
  }, [disabled, secondaryAction])

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none">
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
        <div
          className={`translate h-full duration-300 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="translate relative flex h-full w-full flex-col rounded-lg border-0  bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
            {/* Header */}
            <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6 ">
              <button
                className="absolute right-7 border-none p-1 transition hover:opacity-70"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>

            {/* Body */}
            <div className="relative flex-auto p-6">{body}</div>

            {/* Footer */}
            <div className="relative flex flex-col gap-2 border-t-[1px] p-6">
              <div className="flex w-full items-center justify-center gap-4">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  label={actionLabel}
                  onClick={handleSubmit}
                  disabled={disabled}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
