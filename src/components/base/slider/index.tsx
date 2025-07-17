import React, { useMemo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import RNSlider from '@react-native-community/slider'
import { twMerge } from 'tailwind-merge'
import { VariantProps } from 'tailwind-variants'
import colors from '@/config/theme/colors'
import { Text } from '@/components/base/text'
import { sliderTv } from '@/components/base/slider/slider.style'

interface SliderProps extends VariantProps<typeof sliderTv> {
  className?: string
  style?: ViewStyle
  value: number
  onValueChange: (value: number) => void
  minimumValue?: number
  maximumValue?: number
  step?: number
  thumbTintColor?: string
}

export const Slider: React.FC<SliderProps> = ({
  className,
  style,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  color,
  size,
  thumbTintColor,
  ...props
}) => {
  const sliderStyle = useMemo(() => twMerge(sliderTv({ color, size }), className), [color, size, className])

  const customStyle = useMemo(() => StyleSheet.flatten([style]) as ViewStyle, [style])

  return (
    <View className={twMerge('flex-row items-center gap-2', className)}>
      <Text variant='Time' className='text-text-secondary'>
        {minimumValue}
      </Text>
      <RNSlider
        style={{ flex: 1 }}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={thumbTintColor || colors.primary[500]} // Fallback to a default color
        maximumTrackTintColor={colors.primary.o.light}
        thumbTintColor={thumbTintColor || colors.primary[500]}
        {...props}
      />
      <Text variant='Time' className='text-text-secondary'>
        {maximumValue}
      </Text>
    </View>
  )
}
