import React from 'react'
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  children?: any
  useInsetBottom?: boolean
  ref?: any
}

const ScrollViewWapper = ({ useInsetBottom = true, ...props }: Props & ScrollViewProps) => {
  const insets = useSafeAreaInsets()
  return (
    <ScrollView
      ref={props.ref}
      {...props}
      style={[props.style]}
      contentContainerStyle={[
        useInsetBottom && { paddingBottom: Math.max(insets.bottom) + 24 },
        props.contentContainerStyle
      ]}
    >
      {props.children}
    </ScrollView>
  )
}

export default ScrollViewWapper
