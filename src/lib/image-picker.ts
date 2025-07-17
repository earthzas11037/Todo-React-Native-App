import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import * as ImageManipulator from 'expo-image-manipulator'

interface ImagePickerOptions {
  mediaTypes?: ImagePicker.MediaType[] // Allow selecting photo, video, or both
  allowsMultipleSelection?: boolean // Enable multiple selection
  allowsEditing?: boolean // Allow editing the image
  quality?: number // Image quality (0 to 1)
  width?: number // Optional width for resizing
}

/**
 * Launch the gallery and optionally resize selected images
 */
export const pickImagesFromGallery = async (options: ImagePickerOptions = {}): Promise<string[]> => {
  const {
    mediaTypes = ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection = false,
    allowsEditing = false,
    quality = 1,
    width
  } = options

  // Request gallery permissions
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permission Required', 'Media library access is needed to select photos.')
    return []
  }

  // Launch gallery picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes,
    allowsMultipleSelection,
    allowsEditing,
    quality
  })

  if (!result.canceled) {
    let uris = result.assets.map(asset => asset.uri)

    // Resize images if a width is provided
    if (width) {
      uris = await Promise.all(uris.map(async uri => (await resizeImage(uri, { width, quality })) || uri))
    }

    return uris
  }

  return []
}

/**
 * Launch the camera with dynamic options
 */
export const captureImageWithCamera = async (options: ImagePickerOptions = {}): Promise<string | null> => {
  const { mediaTypes = ['images'], allowsEditing = true, quality = 1, width } = options

  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permission Required', 'Camera access is needed to take photos.')
    return null
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes,
    allowsEditing,
    quality
  })

  if (!result.canceled && result.assets.length > 0) {
    const imageUri = result.assets[0]?.uri
    if (!imageUri) return null

    // Resize if width is provided
    if (width) {
      return await resizeImage(imageUri, { width, quality })
    }

    return imageUri
  }

  return null
}

/**
 * Resize an image to a specific width while maintaining aspect ratio
 */
export const resizeImage = async (
  uri: string,
  options: { width?: number; quality?: number } = {}
): Promise<string | null> => {
  try {
    const { width: targetWidth, quality = 1 } = options
    if (!targetWidth) {
      const imageInfo = await ImageManipulator.manipulateAsync(uri, [], {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG
      }) // Use JPEG for speed

      return imageInfo.uri
    }

    // Get the original image dimensions
    const imageInfo = await ImageManipulator.manipulateAsync(uri, [])
    const { width: originalWidth, height: originalHeight } = imageInfo

    // If width is not provided or the image is already smaller, return the original URI
    if (!targetWidth || originalWidth <= targetWidth) {
      return uri
    }

    // Maintain aspect ratio
    const aspectRatio = originalHeight / originalWidth
    const targetHeight = Math.round(targetWidth * aspectRatio)

    console.log('...')
    // Resize the image
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: targetWidth, height: targetHeight } }],
      { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
    )

    return resizedImage.uri
  } catch (error) {
    console.error('Error resizing image:', error)
    return null
  }
}
