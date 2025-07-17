import { textTv } from '@/components/base/text/text.style'
import { forwardRef, useMemo } from 'react'
import type { TextProps, TextStyle } from 'react-native'
import { I18nManager, StyleSheet, Text as RNText, Platform } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { type VariantProps } from 'tailwind-variants'

interface Props extends TextProps, VariantProps<typeof textTv> {
  className?: string
}

export const Text = forwardRef<RNText, Props>(({ className = '', style, children, variant, color, ...props }, ref) => {
  const textStyle = useMemo(() => twMerge(textTv({ variant, color }), className), [variant, color, className])

  const nStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
        },
        style
      ]) as TextStyle,
    [style]
  )

  return (
    <RNText ref={ref} className={textStyle} style={nStyle} {...props}>
      {children}
    </RNText>
  )
})
