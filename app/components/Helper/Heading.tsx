'use client'

interface Props {
  title: string
  subtitle: string
  center?: boolean
}

const Heading: React.FC<Props> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold ">{title}</div>
      <div className="mt-2 text-sm font-light text-gray-500">{subtitle}</div>
    </div>
  )
}

export default Heading
