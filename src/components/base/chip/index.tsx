import React from 'react'
import { TouchableOpacity, Pressable } from 'react-native'
import { type VariantProps } from 'tailwind-variants'
import CustomIcon from '@/components/base/icon'
import { chipTv } from '@/components/base/chip/chip.style'
import { Text } from '@/components/base/text'

interface ChipProps extends VariantProps<typeof chipTv> {
  label: string
  icon?: JSX.Element
  deleteIcon?: JSX.Element
  onDelete?: () => void
  onPress?: () => void
  disabled?: boolean
  className?: string
  labelClassName?: string
  iconClassName?: string
  deleteIconClassName?: string
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  deleteIcon,
  color = 'default',
  size = 'medium',
  disabled,
  variant = 'filled',
  fullWidth,
  onPress,
  onDelete,
  className,
  labelClassName,
  iconClassName,
  deleteIconClassName
}) => {
  const styles = React.useMemo(
    () => chipTv({ color, size, disabled, variant, fullWidth }),
    [color, size, disabled, variant, fullWidth]
  )

  return (
    <Pressable className={`${styles.container({ className })}`} onPress={onPress} disabled={disabled}>
      {icon &&
        React.cloneElement(icon as any, {
          className: `${styles.icon({ className: iconClassName })} ${icon.props.className || ''}`
        })}
      <Text className={`${styles.label({ className: labelClassName })}`}>{label}</Text>
      {onDelete && (
        <TouchableOpacity onPress={onDelete}>
          {deleteIcon ? (
            React.cloneElement(deleteIcon as any, {
              className: `${styles.deleteIcon({ className: deleteIconClassName })} ${deleteIcon.props.className || ''}`
            })
          ) : (
            <CustomIcon
              name='IconCircleX'
              size={size == 'small' ? 16 : size == 'medium' ? 20 : 24}
              className={`${styles.deleteIcon({ className: deleteIconClassName })}`}
            />
          )}
        </TouchableOpacity>
      )}
    </Pressable>
  )
}
