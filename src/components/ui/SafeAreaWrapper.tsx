import React from 'react'
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native'
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  style?: StyleProp<ViewStyle>
  noneFocus?: Edge[]
  children?: React.ReactNode
  className?: string
}

const SafeAreaWrapper = ({ style, noneFocus, children, ...rest }: Props) => {
  const insets = useSafeAreaInsets()

  // Determine padding for edges
  const paddingStyle = {
    paddingTop: noneFocus?.includes('top') ? 0 : insets.top,
    paddingRight: noneFocus?.includes('right') ? 0 : insets.right,
    paddingBottom: noneFocus?.includes('bottom') ? 0 : insets.bottom,
    paddingLeft: noneFocus?.includes('left') ? 0 : insets.left
  }

  return (
    <View style={[styles.container, paddingStyle, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default SafeAreaWrapper
