const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const { getSentryExpoConfig } = require('@sentry/react-native/metro')

// const defaultConfig = getDefaultConfig(__dirname)

// Merge Sentry's Metro config with your existing setup
const sentryConfig = getSentryExpoConfig(__dirname)

// Apply NativeWind and Sentry together
const finalConfig = withNativeWind(sentryConfig, { input: './global.css' })

module.exports = finalConfig
