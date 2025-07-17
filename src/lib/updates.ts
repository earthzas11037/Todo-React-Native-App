import { Alert, Linking, Platform } from 'react-native'
import * as Updates from 'expo-updates'
import * as Application from 'expo-application'
import { getLatestAppVersion } from '@/services/api/app'
import { useConfigStore } from '@/stores/zustand/config'
import { checkVersion } from '@/services/api/version'
import { getAppBuildNumber, getAppVersion } from '@/utils/device'

export type AppVersionDTO = {
  version: string
  buildNumber: string
}

// Function to compare versions
const isVersionOlder = (currentVersion: string, requiredVersion: string) => {
  const current = currentVersion.split('.').map(Number)
  const required = requiredVersion.split('.').map(Number)
  for (let i = 0; i < required.length; i++) {
    if ((current[i] || 0) < (required[i] || 0)) return true
    if ((current[i] || 0) > (required[i] || 0)) return false
  }
  return false
}

// Function to check for required app updates
export const checkForMandatoryUpdate = async () => {
  try {
    return false // Temporary
    const config = useConfigStore.getState().config
    const isValidVersion = await checkVersion(getAppVersion(), getAppBuildNumber())

    // const data = await getLatestAppVersion()

    const currentVersion = getAppVersion() // Application.nativeApplicationVersion || '0.0.0'

    if (!isValidVersion) {
      Alert.alert(
        'อัปเดตแอป',
        'จำเป็นต้องอัปเดตแอปของคุณเพื่อใช้งานต่อไป',
        [
          {
            text: 'อัปเดตตอนนี้',
            onPress: () => {
              const storeUrl =
                Platform.OS === 'ios' ? config['deeplink.app.store.ios'] : config['deeplink.app.store.android']
              if (storeUrl) Linking.openURL(storeUrl)
              else Updates.reloadAsync()
            }
          }
        ],
        { cancelable: false } // Force update (no cancel button)
      )
      return true // Indicates mandatory update required
    }
  } catch (error) {
    console.error('Error checking mandatory update:', error)
  }
  return false // No mandatory update required
}

// Function to check OTA updates (only for production builds)
export const checkForOTAUpdate = async () => {
  if (Updates.isEnabled && !__DEV__) {
    try {
      const isValidVersion = await checkVersion(getAppVersion(), getAppBuildNumber())
      if (!isValidVersion) {
        /** Check For Expo Update after Press button because checking expo update take seconds. */
        Alert.alert('มีอัปเดตใหม่', 'พบเวอร์ชันใหม่ของแอป ต้องการอัตเดตตอนนี้หรือไม่?', [
          {
            text: 'อัปเดต',
            onPress: async () => {
              const update = await Updates.checkForUpdateAsync()
              if (update.isAvailable) {
                await Updates.fetchUpdateAsync()
                await Updates.reloadAsync()
              }
            }
          }
        ])
        return true // Indicates OTA update applied
      }
    } catch (error) {
      console.error('Error checking OTA update:', error)
    }
  }
  return false // No OTA update found
}
