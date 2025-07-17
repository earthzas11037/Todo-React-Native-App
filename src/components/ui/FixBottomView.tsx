import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Edge } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'

type Props = {
  children?: any
  style?: StyleProp<ViewStyle>
  noneFocus?: Edge[]
  wrapperStyle?: StyleProp<ViewStyle>
  className?: string
}

const FixBottomView = ({ children, noneFocus, className }: Props) => {
  return (
    <SafeAreaWrapper
      noneFocus={noneFocus || ['top']}
      className={twMerge('bg-white w-full absolute bottom-0 left-0 right-0', className)}
    >
      <View className='flex-row w-full gap-2 px-4 pb-6 pt-2'>{children}</View>
    </SafeAreaWrapper>
  )
}

export default FixBottomView
