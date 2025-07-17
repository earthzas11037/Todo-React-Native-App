import { Text } from '@/components/base/text'
import colors from '@/config/theme/colors'
import React from 'react'
import { View } from 'react-native'
import { Svg, Circle } from 'react-native-svg'

interface ProgressCircleProps {
  progress: number // Value between 0 and 100
  label?: string
  size?: number // Diameter of the circle
  strokeWidth?: number // Thickness of the circle
  color?: string // Color of the progress
  trackColor?: string // Color of the track (background circle)
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  label,
  size = 54,
  strokeWidth = 6,
  color = colors.primary[500],
  trackColor = colors.action.selected
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (progress / 100) * circumference

  return (
    <View className='items-center justify-center' style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Track circle */}
        <Circle stroke={trackColor} fill='none' cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        {/* Progress circle */}
        <Circle
          stroke={color}
          fill='none'
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap='round'
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text variant='Button' className='absolute'>
        {label || Math.round(progress)}%
      </Text>
    </View>
  )
}

export default ProgressCircle
