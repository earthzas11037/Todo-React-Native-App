import { Linking } from 'react-native'

export const openURL = async (url: string) => {
  const supported = await Linking.canOpenURL(url)
  if (supported) {
    // Open the URL
    await Linking.openURL(url)
  } else {
  }
}
