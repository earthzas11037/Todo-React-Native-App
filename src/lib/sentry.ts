import * as Sentry from '@sentry/react-native'
import { isRunningInExpoGo } from 'expo'
import { Env } from '@env'

export function initializeSentry() {
  if (process.env.APP_ENV !== 'development' && !__DEV__) {
    try {
      const navigationIntegration = Sentry.reactNavigationIntegration({
        enableTimeToInitialDisplay: !isRunningInExpoGo()
      })

      Sentry.init({
        dsn: Env.SENTRY_DSN,
        debug: false, // Disable debug mode in production
        tracesSampleRate: 1.0,
        integrations: [navigationIntegration],
        enableNativeFramesTracking: !isRunningInExpoGo()
      })

      console.log('Sentry initialized successfully')
      return navigationIntegration
    } catch (error) {
      console.error('Sentry initialization failed:', error)
    }
  } else {
    console.log('Sentry is disabled in development mode')
  }
}

/**
 * Capture an error and send it to Sentry.
 * @param error The error object or message
 * @param extraData Optional additional metadata to include
 */
export function captureError(error: any, extraData?: Record<string, any>) {
  try {
    if (!error) return

    // Ensure error is properly formatted before sending to Sentry
    let errorMessage = error

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = new Error(error)
    } else {
      errorMessage = new Error('Unknown error occurred')
    }

    // Send error to Sentry with additional context if available
    Sentry.captureException(errorMessage, {
      extra: extraData
    })

    console.error('Logged Error:', errorMessage, extraData)
  } catch (err) {}
}
