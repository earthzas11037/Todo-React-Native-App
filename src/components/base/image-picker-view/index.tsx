import { ImageProps } from 'expo-image'
import { TouchableOpacity, View, ViewProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Image } from '../image'

import CustomIcon from '@/components/base/icon'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { captureImageWithCamera, pickImagesFromGallery } from '@/lib/image-picker'
import React from 'react'
import _ from 'lodash'

type Props = {
  onImageSeleted: (url: string) => void
  containerProps?: ViewProps
  imageProps?: ImageProps
}

export const ImagePickerView = (props: Props) => {
  const [url, setUrl] = React.useState<string | null>((props.imageProps?.source as string) || '')
  const { showActionSheetWithOptions } = useActionSheet()
  const insets = useSafeAreaInsets()

  const handleOnImageSelected = (url: string | null) => {
    if (!url) return
    setUrl(url)
    props.onImageSeleted(url)
  }

  const menuActions = [
    {
      text: 'ถ่ายภาพ',
      onClick: async () => {
        const image = await captureImageWithCamera({ allowsEditing: false, width: 1000 })
        handleOnImageSelected(image)
      }
    },
    {
      text: 'เลือกจากเครื่อง',
      onClick: async () => {
        const image = await pickImagesFromGallery({ allowsMultipleSelection: false, width: 1000 })
        handleOnImageSelected(_.first(image) || '')
      }
    },
    { text: 'ยกเลิก' }
  ]

  const onShowActionSheetPress = () => {
    const options = menuActions?.map(x => x.text) || []

    const cancelButtonIndex = options.length - 1

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        containerStyle: { paddingBottom: insets.bottom },
        textStyle: { fontFamily: 'Noto Sans Thai' }
      },
      buttonIndex => {
        if ((buttonIndex || 0) >= 0 && menuActions && (menuActions?.length || 0) > 0) {
          const index = buttonIndex as number
          menuActions[index]?.onClick?.()
        }
      }
    )
  }

  const onPress = () => {
    onShowActionSheetPress()
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={twMerge('', props.containerProps?.className)}>
        <Image {...props.imageProps} source={url} />
      </View>
      <View className='absolute bottom-[0%] right-[0%] bg-neutral-100 rounded-full p-[4px]'>
        <CustomIcon name='IconCameraFilled' size={12} />
      </View>
    </TouchableOpacity>
  )
}
