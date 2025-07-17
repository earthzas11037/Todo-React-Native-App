import { forwardRef, useMemo } from 'react'
import { I18nManager, Platform, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { tv, VariantProps } from 'tailwind-variants'

const view = tv({
  base: 'rounded-[16px] bg-white', // Base styles
  variants: {
    variant: {
      Normal: Platform.OS === 'ios' ? 'shadow-[0_2px_4px_0px_rgba(0,0,0,0.085)]' : 'shadow-[0_2px_4px_0px_rgb(0,0,0,0.45)]',
      Dark: Platform.OS === 'ios' ? 'shadow-[0_2px_4px_0px_rgb(0,0,0,0.3)]' : 'shadow-[0_2px_4px_0px_rgb(0,0,0,1.5)]',
      Darker: Platform.OS === 'ios' ? 'shadow-[0_2px_4px_0px_rgb(0,0,0,0.75)]' : 'shadow-[0_2px_4px_0px_rgb(0,0,0,3.55)]'
    }
  },
  defaultVariants: {
    variant: 'Normal' // Default variant
  }
})

export interface BaseViewProps extends ViewProps, VariantProps<typeof view> {
  className?: string
}

export const CardContainer = forwardRef<View, BaseViewProps>(
  ({ className = '', style, children, variant, ...props }, ref) => {
    const viewStyle = useMemo(() => twMerge(view({ variant }), className), [variant, className])

    const nStyle = useMemo(
      () =>
        StyleSheet.flatten([
          {
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
          },
          style
        ]) as ViewStyle,
      [style]
    )
    return (
      <View ref={ref} className={twMerge(viewStyle, className)} style={[nStyle, CardStyle.container]} {...props}>
        {children}
      </View>
    )
  }
)

const CardStyle = StyleSheet.create({
  container: {
    // borderRadius: 16,
    // backgroundColor: 'var(--White, #FFF)'
    // boxShadow: '0px 2px 4px 0px',
    boxShadow: Platform.OS === 'ios' ? '0px 2px 4px 0 rgba(0,0,0,0.085)' : '0px 2px 4px 0px rgba(0,0,0,0.1)'
  }
})
