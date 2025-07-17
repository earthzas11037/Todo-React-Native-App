import { useState, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import { useNotificationStore } from '@/stores/zustand/notification'
import { registerForPushNotificationsAsync } from '@/lib/notification'
import { router } from 'expo-router'

/**
 * Custom hook to handle all push notification logic.
 * - Registers for push notifications.
 * - Sets up listeners for received and tapped notifications.
 * - Handles adding notifications to the global state.
 * @returns The expo push token if available.
 */
export const usePushNotifications = () => {
  const { addNotification, registerPushTokenToServer } = useNotificationStore()
  const [expoPushToken, setExpoPushToken] = useState<string>('')

  const notificationListener = useRef<Notifications.EventSubscription | null>(null)
  const responseListener = useRef<Notifications.EventSubscription | null>(null)

  useEffect(() => {
    // This function encapsulates the async logic for setting up notifications
    const setupNotifications = async () => {
      // 1. Register for a push token
      const token = await registerForPushNotificationsAsync()
      if (token) {
        setExpoPushToken(token)
        registerPushTokenToServer(token) // Register token with your backend via Zustand
      }

      // Android specific: get notification channels if needed
      if (Platform.OS === 'android') {
        Notifications.getNotificationChannelsAsync()
        // You can use the channels if needed, otherwise this can be removed
        // .then(value => console.log('Notification Channels:', value ?? []));
      }

      // 2. Set up listener for when a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        addNotification({
          title: notification?.request?.content.title || '',
          body: notification?.request?.content.body || '',
          data: notification?.request?.content.data
        })
      })

      // 3. Set up listener for when a user taps on a notification
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // Handle the response, e.g., navigate to a specific screen
        console.log('Response Listener', response)
        // const deeplink = response.notification.request.content.data?.deeplink
        // if (deeplink) {
        //   router.push(deeplink)
        // }
      })
    }

    setupNotifications()

    // 4. Cleanup function to remove listeners when the component unmounts
    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current)
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current)
    }

    // The dependency array includes the stable functions from your Zustand store.
  }, [addNotification, registerPushTokenToServer])

  return { expoPushToken }
}
