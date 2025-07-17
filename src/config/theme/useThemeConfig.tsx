import type { Theme } from '@react-navigation/native'
import { DarkTheme as _DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'

import colors from '@/config/theme/colors'

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[200],
    background: colors.black,
    text: colors.black,
    border: colors.black,
    card: colors.black
  }
}

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[500],
    background: colors.white
  }
}

export function useThemeConfig() {
  const { colorScheme } = useColorScheme()

  if (colorScheme === 'dark') return DarkTheme

  return LightTheme
}
