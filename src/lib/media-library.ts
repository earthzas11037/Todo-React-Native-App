import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { Alert, Platform } from 'react-native'
import Snackbar from 'react-native-snackbar'
import colors from '@/config/theme/colors'
import { format } from 'date-fns'

/**
 * Downloads an image from a URL and saves it to the device's gallery.
 * @param {string} imageUrl - The URL of the image to be saved.
 */
export const saveImageToDevice = async (imageUrl: string) => {
  // Request media library permissions
  const { status } = await MediaLibrary.requestPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'You need to grant storage permission to save images.')
    return
  }

  try {
    const fileUri = FileSystem.cacheDirectory + 'saved-image.jpg' // Local path

    // Download image
    const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri)
    console.log('Downloaded Image URI:', uri)

    // Save image to gallery
    const asset = await MediaLibrary.createAssetAsync(uri)
    await MediaLibrary.createAlbumAsync('Download', asset, false)

    Alert.alert('สำเร็จ', 'บันทึกรูปภาพสำเร็จ!')
  } catch (error) {
    console.error('Error saving image:', error)
    Alert.alert('ข้อผิดพลาด', 'บันทึกรูปภาพไม่สำเร็จ!')
  }
}

export const saveImageToCameraRoll = async (uri?: string) => {
  if (!uri) return
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      throw 'Media Library Permission is required to save photo.'
    }

    if (Platform.OS === 'android') {
      try {
        if (uri.startsWith('http')) {
          let date = format(new Date(), 'yyyyMMddhhmmss')
          let fileUri = FileSystem.documentDirectory + `${date}.jpg`
          uri = (await FileSystem.downloadAsync(uri, fileUri)).uri
        }
      } catch (error) {}
    }
    await MediaLibrary.saveToLibraryAsync(uri)
    Snackbar.show({
      text: 'บันทึกภาพลงเครื่องแล้ว',
      duration: Snackbar.LENGTH_SHORT,
      textColor: colors.white,
      backgroundColor: colors.success[500]
    })
  } catch (error) {
    console.error(error)
    Snackbar.show({
      text: 'บันทึกภาพลงเครื่องไม่สำเร็จ',
      duration: Snackbar.LENGTH_SHORT,
      textColor: colors.white,
      backgroundColor: colors.error[500]
    })
    return null
    // throw error
  }
}
