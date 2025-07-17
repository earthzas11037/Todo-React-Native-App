// Import  global CSS file
import '../../global.css'

import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect, useState } from 'react'
import {
  useFonts,
  NotoSansThai_300Light,
  NotoSansThai_400Regular,
  NotoSansThai_500Medium,
  NotoSansThai_600SemiBold,
  NotoSansThai_700Bold,
  NotoSansThai_800ExtraBold,
  NotoSansThai_900Black
} from '@expo-google-fonts/noto-sans-thai'
import { useColorScheme } from '@/hooks/useColorScheme'
import { loadSelectedTheme } from '@/hooks/useSelectedTheme'
import { useThemeConfig } from '@/config/theme/useThemeConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'
import { FocusAwareStatusBar } from '@/components/base/focus-aware-status-bar'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoadingOverlay from '@/components/ui/LoadingOverlay'
import NotificationQueue from '@/components/ui/NotificationQueue'
import * as Sentry from '@sentry/react-native'
import { useConfigStore } from '@/stores/zustand/config'
import { initializeSentry } from '@/lib/sentry'

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { usePushNotifications } from '@/hooks/usePushNotifications'

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false // Reanimated runs in strict mode by default
})

// Initialize Sentry using the reusable function
const navigationIntegration = initializeSentry()

export const unstable_settings = {
  initialRouteName: '(tabs)'
}

loadSelectedTheme()

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true
})
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

function RootLayout() {
  // push notification
  // usePushNotifications()

  const [appIsReady, setAppIsReady] = useState(false)
  const colorScheme = useColorScheme()
  const { getConfig } = useConfigStore()

  const [fontsLoaded] = useFonts({
    NotoSansThai_300Light,
    NotoSansThai_400Regular,
    NotoSansThai_500Medium,
    NotoSansThai_600SemiBold,
    NotoSansThai_700Bold,
    NotoSansThai_800ExtraBold,
    NotoSansThai_900Black
  })

  useEffect(() => {
    const initLoad = async () => {
      try {
        setAppIsReady(true)
        await SplashScreen.hideAsync()
        // }
      } catch (error) {
        console.error('Error during initialization:', error)
      }
    }

    if (fontsLoaded) initLoad()
  }, [fontsLoaded])

  if (!appIsReady) {
    return null
  }

  return (
    <Providers>
      <FocusAwareStatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found' />
      </Stack>
    </Providers>
  )
}

export default Sentry.wrap(RootLayout)

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig()
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container} className={theme.dark ? `dark` : undefined}>
          <ActionSheetProvider useCustomActionSheet>
            <KeyboardProvider>
              <ThemeProvider value={theme}>
                <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
                <NotificationQueue />
                <LoadingOverlay />
              </ThemeProvider>
            </KeyboardProvider>
          </ActionSheetProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </I18nextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
