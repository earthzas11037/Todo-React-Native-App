import React, { forwardRef } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends KeyboardAwareScrollViewProps {
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  children?: React.ReactNode
  useInsetBottom?: boolean
}

const KeyboardAwareScrollViewWapper = forwardRef<KeyboardAwareScrollView, Props>(
  ({ contentContainerStyle, useInsetBottom, ...props }, ref) => {
    const insets = useSafeAreaInsets()

    return (
      <KeyboardAwareScrollView
        ref={ref}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        {...props}
        contentContainerStyle={[contentContainerStyle, useInsetBottom && { paddingBottom: Math.max(insets.bottom) }]}
      >
        {props.children}
      </KeyboardAwareScrollView>
    )
  }
)

export default KeyboardAwareScrollViewWapper
