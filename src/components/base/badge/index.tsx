import { badgeTv } from '@/components/base/badge/badge.style'
import { Text } from '@/components/base/text'
import React from 'react'
import { View } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

interface BadgeProps extends VariantProps<typeof badgeTv> {
  content?: string | number
  invisible?: boolean
  children?: React.ReactNode
  className?: string
  badgeClassName?: string
  contentClassName?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  size = 'medium',
  color = 'primary',
  variant = 'standard',
  invisible = false,
  className,
  badgeClassName,
  contentClassName
}) => {
  const styles = React.useMemo(() => badgeTv({ size, color, variant, invisible }), [size, color, variant, invisible])
  const displayContent =
    typeof content === 'number' && variant !== 'dot' ? (content > 99 ? '99+' : content.toString()) : content

  return (
    <View className={`${styles.container({ className })}`}>
      {children}
      {!!content && (
        <View className={`${styles.badge({ className: badgeClassName })}`}>
          <Text className={`${styles.content({ className: contentClassName })}`}>
            {variant !== 'dot' ? displayContent : ''}
          </Text>
        </View>
      )}
    </View>
  )
}
