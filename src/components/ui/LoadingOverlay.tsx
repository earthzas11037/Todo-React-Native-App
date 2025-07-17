import useAppStore from '@/stores/zustand/app'
import React, { useRef } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

const LoadingOverlay = () => {
  const animation = useRef<LottieView>(null)
  const { loading, state } = useAppStore()

  if (!loading) return null

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {state === 'HIDE' && (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 120,
              height: 120
              // backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../common/lotties/loading-4.lottie.json')}
          />
        )}
        {state === 'SUCCESS' && (
          <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
              width: 120,
              height: 120
              // backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../common/lotties/loading-success.lottie.json')}
          />
        )}
        {state === 'ERROR' && (
          <LottieView
            autoPlay
            loop={false}
            ref={animation}
            style={{
              width: 120,
              height: 120
              // backgroundColor: '#eee',
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../../common/lotties/loading-error.lottie.json')}
          />
        )}
        {/* <ActivityIndicator size='large' /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  container: {
    alignItems: 'center'
  }
})

export default LoadingOverlay
