import { Image } from '@/components/base/image'
import { Text } from '@/components/base/text'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { Platform, View } from 'react-native'

const CustomSplashScreen = () => {
  const Container = Platform.OS === 'ios' ? View : SafeAreaWrapper
  return (
    <Container className='flex-1'>
      <View className='flex-1 bg-white items-center justify-center'>
        <Image
          className='w-[198px] h-full overflow-hidden rounded-t-xl'
          source={require('@/../assets/images/logo.png')}
          contentFit='contain'
        />
        {/* <View className='absolute flex-1 bottom-6'>
          <Text className='text-sm'>{`Version: -`}</Text>
        </View> */}
      </View>
    </Container>
  )
}

export default CustomSplashScreen
