'use client'

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="xl:px-18 lg:px-15 mx-auto max-w-[2520px] px-3 sm:px-5 md:px-10">
      {children}
    </div>
  )
}

export default Container
