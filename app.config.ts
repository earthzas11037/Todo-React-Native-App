/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config'
import type { AppIconBadgeConfig } from 'app-icon-badge/types'

import { ClientEnv, Env } from './env'

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white'
    },
    {
      text: Env.APP_VERSION.toString(),
      type: 'ribbon',
      color: 'white'
    }
  ]
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: Env.SLUG,
  version: Env.APP_VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    url: `https://u.expo.dev/${Env.EAS_PROJECT_ID}`
  },
  assetBundlePatterns: ['**/*'],
  runtimeVersion: Env.APP_VERSION,
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    entitlements: {
      'aps-environment': 'development' // Remove Wraning of ITMS-90078: Missing potentially required entitlement (Push Notification)
    },
    buildNumber: Env.APP_BUILD_NUMBER,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  experiments: {
    typedRoutes: true
  },
  android: {
    permissions: [],
    package: Env.PACKAGE,
    versionCode: parseInt(Env.APP_BUILD_NUMBER)
    // googleServicesFile: './google-services.json' // TODO: ADD
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#FFFFFF',
        image: './assets/images/logo.png',
        imageWidth: 198
      }
    ],
    'expo-localization',
    [
      'expo-router',
      {
        root: './src/app'
      }
    ],
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '34.0.0'
        },
        ios: {
          deploymentTarget: '15.1',
          useFrameworks: 'static'
        }
      }
    ],
    [
      'expo-dev-launcher',
      {
        launchMode: 'most-recent'
      }
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'อนุญาตให้เข้าถึงอัลบั้มภาพ',
        cameraPermission: 'อนุญาตให้เข้าถึงอัลบั้มภาพ'
      }
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: Env.SENTRY_ORG,
        project: Env.SENTRY_PROJECT,
        url: 'https://sentry.io/'
      }
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'อนุญาตให้เข้าถึงอัลบั้มภาพ',
        savePhotosPermission: 'อนุญาตให้เข้าถึงอัลบั้มภาพ',
        isAccessMediaLocationEnabled: true
      }
    ],
    ['expo-font'],
    [
      'expo-notifications',
      {
        icon: './assets/images/notification-logo.png',
        color: '#ffffff',
        defaultChannel: 'default',
        sounds: [],
        enableBackgroundRemoteNotifications: false
      }
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'อนุญาตให้ใช้กล้องถ่ายรูป'
      }
    ],
    ['expo-web-browser']
  ],
  extra: {
    ...ClientEnv,
    router: {
      origin: false
    },
    eas: {
      projectId: Env.EAS_PROJECT_ID
    }
  }
})
