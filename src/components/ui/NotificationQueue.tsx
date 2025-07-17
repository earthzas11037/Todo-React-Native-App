import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Platform, TouchableHighlight, Vibration, Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useNotificationStore } from '@/stores/zustand/notification'
import { Text } from '@/components/base/text'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { router } from 'expo-router'

const NotificationQueue = () => {
  const { notificationQueue, notificationVisable, removeQueue } = useNotificationStore()
  const translateY = useSharedValue(-200)
  const [timeOutNoti, setTimeOut] = useState(3000)

  async function close() {
    translateY.value = withSpring(-200)
    await new Promise(resolve => setTimeout(resolve, 100))
    removeQueue()
  }

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  useEffect(() => {
    if (notificationVisable) {
      const vibration = async () => {
        Vibration.vibrate()
      }
      vibration()
      translateY.value = withSpring(0)
    }

    if (!notificationVisable || !notificationQueue[0]) return

    const timeout = setTimeout(async () => {
      await close()
    }, timeOutNoti)

    return () => clearTimeout(timeout)
  }, [timeOutNoti, notificationQueue])

  if (!notificationVisable || !notificationQueue[0]) return null

  const noti = notificationQueue[0]
  const notiData = noti?.data
  const link = notiData?.deeplink || notiData?.link || ''

  return (
    <Animated.View style={[styles.overlay]}>
      <Animated.View style={rStyle}>
        <TouchableHighlight
          style={styles.notificationContainer}
          onPress={async () => {
            !!link && router.navigate(link as any)
            await close()
          }}
          underlayColor={'#ededed'}
        >
          <SafeAreaWrapper noneFocus={['bottom']}>
            <View className='flex flex-row items-center'>
              <View>
                {!!noti?.title && (
                  <Text className='font-semibold' numberOfLines={2}>
                    {noti?.title}
                  </Text>
                )}
                {!!noti?.body && <Text numberOfLines={3}>{noti?.body}</Text>}
              </View>
            </View>
          </SafeAreaWrapper>
        </TouchableHighlight>
      </Animated.View>
    </Animated.View>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  overlay: {
    zIndex: 2,
    position: 'absolute'
  },
  modalBackGround: {
    flex: 1,
    alignItems: 'center'
  },
  notificationContainer: {
    backgroundColor: 'white',
    width: width,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: Platform.OS === 'android' ? '#000' : 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    padding: 16
  },
  row: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  shadow: {
    borderRadius: 12
  },
  textContainer: {
    marginLeft: 16,
    flex: 1
  }
})

export default React.memo(NotificationQueue)
