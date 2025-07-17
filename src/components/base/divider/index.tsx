import { dividerTv } from '@/components/base/divider/divider.style'
import { Text } from '@/components/base/text'
import React from 'react'
import { View } from 'react-native'
import { type VariantProps } from 'tailwind-variants'

interface DividerProps extends VariantProps<typeof dividerTv> {
  label?: string
  className?: string
  labelClassName?: string
  lineClassName?: string
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = 'default',
  thickness = 'thin',
  variant = 'solid',
  label,
  className,
  labelClassName,
  lineClassName
}) => {
  const styles = React.useMemo(
    () => dividerTv({ orientation, color, thickness, variant }),
    [orientation, color, thickness, variant]
  )

  return (
    <View className={`${styles.container({ className })}`}>
      <View className={`${styles.line({ className: lineClassName })}`} />
      {label && <Text className={`${styles.label({ className: labelClassName })}`}>{label}</Text>}
      {orientation === 'horizontal' && label && <View className={`${styles.line({ className: lineClassName })}`} />}
    </View>
  )
}
