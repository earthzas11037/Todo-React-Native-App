import { create } from 'zustand'

type Notification = {
  title?: string
  body?: string
  data?: { deeplink?: string; link?: string }
}

interface NotificationStore {
  notificationQueue: Notification[]
  notificationVisable: boolean

  addNotification: (noti: Notification) => void
  removeQueue: () => void
  registerPushTokenToServer: (token: string) => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notificationQueue: [],
  notificationVisable: false,

  addNotification: noti => {
    set(state => ({
      notificationQueue: [...state.notificationQueue, noti],
      notificationVisable: true
    }))
  },

  removeQueue: () =>
    set(state => ({
      notificationQueue: state.notificationQueue.slice(1),
      notificationVisable: state.notificationQueue.length > 1
    })),
  registerPushTokenToServer: async (token: string) => {}
}))
