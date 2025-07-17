import React, { useEffect } from 'react'
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import CustomIcon from '@/components/base/icon'
import { Text } from '@/components/base/text'

interface TabBarButtonProps {
  isFocused: boolean
  label: string
  routeName: string
  color: string
  onPress?: () => void
  onLongPress?: () => void
  style?: ViewStyle
}

const AnimatedText = Animated.createAnimatedComponent(Text)

const TabBarButton: React.FC<TabBarButtonProps> = ({
  isFocused,
  label,
  routeName,
  color,
  onPress,
  onLongPress,
  style
}) => {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 })
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      opacity
    }
  })

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={[styles.container, style]}>
      <Animated.View style={animatedIconStyle}>
        <CustomIcon name='IconFolderFilled' className='text-primary-500' />
      </Animated.View>
      <AnimatedText style={[{ color, fontSize: 11 } as TextStyle, animatedTextStyle]}>{label}</AnimatedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4
  }
})

export default TabBarButton
