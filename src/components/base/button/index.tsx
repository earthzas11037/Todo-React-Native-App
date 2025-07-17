import React, { JSX } from 'react'
import type { TouchableWithoutFeedbackProps } from 'react-native'
import { ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native'
import type { VariantProps } from 'tailwind-variants'
import colors from '@/config/theme/colors'
import { buttonTv } from '@/components/base/button/button.style'
import { twMerge } from 'tailwind-merge'
import { LinearGradient } from '@/components/base/linear-gradient'
import { Text } from '@/components/base/text'

type ButtonVariants = VariantProps<typeof buttonTv>
interface Props extends ButtonVariants, Omit<TouchableWithoutFeedbackProps, 'disabled'> {
  label?: string
  loading?: boolean
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  className?: string
  textClassName?: string
  iconClassName?: string
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label,
      loading = false,
      variant = 'contained',
      size = 'medium',
      color = 'primary',
      disabled = false,
      fullWidth = false,
      className = '',
      testID,
      textClassName = '',
      iconClassName = '',
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = React.useState(false)

    const styles = React.useMemo(
      () => buttonTv({ variant, size, color, disabled, fullWidth }),
      [variant, size, color, disabled, fullWidth]
    )

    const isGradient = colors.gradient.primary && color === 'primary' && variant === 'contained' && disabled === false
    const gradientColor = colors.gradient.primary

    const handlePressIn = () => setPressed(true)
    const handlePressOut = () => setPressed(false)

    const dynamicStyle = pressed ? 'opacity-75' : ''

    if (isGradient) {
      return (
        <TouchableWithoutFeedback
          disabled={disabled || loading}
          {...props}
          testID={testID}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            ref={ref}
            {...(gradientColor as any)}
            className={twMerge(`${styles.container({ className })}`, dynamicStyle)}
          >
            {loading ? (
              <ActivityIndicator
                size='small'
                color='white'
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <>
                {startIcon &&
                  React.cloneElement(startIcon as any, {
                    className: `mr-[10px] ${styles.icon({ className: iconClassName })} ${
                      startIcon.props.className || ''
                    }`
                  })}
                <Text
                  testID={testID ? `${testID}-label` : undefined}
                  className={styles.label({ className: textClassName })}
                >
                  {label}
                </Text>
                {endIcon &&
                  React.cloneElement(endIcon as any, {
                    className: `ml-[10px] ${styles.icon({ className: iconClassName })} ${endIcon.props.className || ''}`
                  })}
              </>
            )}
          </LinearGradient>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <TouchableWithoutFeedback
        disabled={disabled || loading}
        {...props}
        // ref={ref}
        testID={testID}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View ref={ref} className={`${styles.container({ className })} ${dynamicStyle}`}>
          {loading ? (
            <ActivityIndicator
              size='small'
              className={styles.indicator()}
              testID={testID ? `${testID}-activity-indicator` : undefined}
            />
          ) : (
            <>
              {startIcon &&
                React.cloneElement(startIcon as any, {
                  className: `mr-[10px] ${styles.icon({ className: iconClassName })} ${startIcon.props.className || ''}`
                })}
              <Text
                testID={testID ? `${testID}-label` : undefined}
                className={styles.label({ className: textClassName })}
              >
                {label}
              </Text>
              {endIcon &&
                React.cloneElement(endIcon as any, {
                  className: `ml-[10px] ${styles.icon({ className: iconClassName })} ${endIcon.props.className || ''}`
                })}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }
)
