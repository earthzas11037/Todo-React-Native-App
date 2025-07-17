import TablerIconsWithInterop, { TablerIcons } from '@/components/base/icon/TablerIconsInterop'
import React from 'react'
import { SvgProps } from 'react-native-svg'
import { twMerge } from 'tailwind-merge'

interface CustomIconProps {
  name: keyof typeof TablerIcons
  className?: string
  color?: string
  size?: number
}

const CustomIcon: React.FC<CustomIconProps & SvgProps> = ({ name, className, color, size = 24, ...props }) => {
  const IconComponent = TablerIconsWithInterop[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in @tabler/icons-react-native.`)
    return null
  }

  return (
    <IconComponent
      className={twMerge('text-text-primary', className)}
      color={color ?? undefined}
      size={size}
      {...props}
    />
  )
}

export default CustomIcon
