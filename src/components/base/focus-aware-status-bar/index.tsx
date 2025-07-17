import { useIsFocused } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import * as React from 'react'
import { Platform } from 'react-native'
import { SystemBars } from 'react-native-edge-to-edge'

type Props = { hidden?: boolean; shouldColorScheme?: boolean }
export const FocusAwareStatusBar = ({ hidden = false, shouldColorScheme }: Props) => {
  const isFocused = useIsFocused()
  const { colorScheme } = useColorScheme()

  if (Platform.OS === 'web') return null

  // TODO: dark mode
  const style = 'dark'
  // const style = colorScheme == 'light' ? 'dark' : 'light'
  return isFocused ? <SystemBars style={shouldColorScheme ? colorScheme : style} hidden={hidden} /> : null
}
