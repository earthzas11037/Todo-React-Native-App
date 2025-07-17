import { MAIN_PADDINGBOTTOM, MAIN_PADDING_X, MAIN_PADDING_Y } from '@/constants/AppConstants'
import React from 'react'
import { View, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { tv } from 'tailwind-variants'

const containerStyles = tv({
  base: `px-${MAIN_PADDING_X} pb-${MAIN_PADDINGBOTTOM}`
})

interface Props {
  children?: any
  useInsetTop?: boolean
}

const MainLayout = ({ children, useInsetTop, style, ...rest }: Props & ViewProps) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        {
          paddingHorizontal: MAIN_PADDING_X,
          paddingVertical: MAIN_PADDING_Y,
          paddingBottom: MAIN_PADDINGBOTTOM
        },
        useInsetTop && { paddingTop: Math.max(insets.top) },
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}

export default MainLayout
