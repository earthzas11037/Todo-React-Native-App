import { tagTv } from '@/components/base/tag/tag.style'
import { Text } from '@/components/base/text'
import React from 'react'
import { View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

interface TagProps extends VariantProps<typeof tagTv> {
  label: string
  icon?: JSX.Element
  className?: string
  labelClassName?: string
  iconClassName?: string
}

export const Tag: React.FC<TagProps> = ({
  label,
  icon,
  size = 'medium',
  color = 'default',
  variant = 'filled',
  disabled = false,
  className,
  labelClassName,
  iconClassName
}) => {
  const styles = React.useMemo(() => tagTv({ size, color, variant, disabled }), [size, color, variant, disabled])

  return (
    <View className={`${styles.container({ className })}`}>
      {icon &&
        React.cloneElement(icon as any, {
          className: `${styles.icon({ className: iconClassName })} ${icon.props.className || ''}`
        })}
      <Text className={`${styles.label({ className: labelClassName })}`}>{label}</Text>
    </View>
  )
}
