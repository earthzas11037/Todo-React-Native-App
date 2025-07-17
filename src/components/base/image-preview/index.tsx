import type { ImageProps } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Pressable, Dimensions, FlatList, View, Image as RNImage } from 'react-native'
import CustomIcon from '@/components/base/icon'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import colors from '@/config/theme/colors'
import { saveImageToCameraRoll } from '@/lib/media-library'
import { Zoomable } from '@likashefqet/react-native-image-zoom'
import { Image } from '@/components/base/image'

export type ImgProps = ImageProps & {
  className?: string
  images?: string[]
  onRemove?: (string: string) => void
}

export const ImagePreview = ({
  style,
  className,
  placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  images = [],
  onRemove,
  ...props
}: ImgProps) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const { width: screenWidth } = Dimensions.get('window')
  const [selectedImage, setSelectedImage] = useState<string | null>(props.source?.uri || images[0] || null)
  const [imageHeight, setImageHeight] = useState<number | null>(null) // State to store dynamic height

  useEffect(() => {
    if (!isModalVisible) setSelectedImage(props.source?.uri || images[0] || null)
  }, [isModalVisible])

  useEffect(() => {
    if (selectedImage) {
      RNImage.getSize(selectedImage, (imgWidth, imgHeight) => {
        const aspectRatio = imgWidth / imgHeight
        setImageHeight(screenWidth / aspectRatio) // Calculate height dynamically
      })
    }
  }, [selectedImage])

  const handleOpen = () => {
    setModalVisible(true)
  }

  const handleClose = () => setModalVisible(false)

  const saveImage = async () => {
    if (selectedImage) saveImageToCameraRoll(selectedImage)
  }

  const handleRemove = () => {
    setModalVisible(false)
    onRemove?.(selectedImage || '')
  }

  return (
    <View>
      <TouchableOpacity onPress={handleOpen} activeOpacity={0.8}>
        <Image className={className} placeholder={placeholder} style={style} {...props} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={{ flex: 1 }}
          className='bg-black absolute top-0 left-0 right-0 bottom-0'
          onPress={handleClose}
        ></Pressable>

        <SafeAreaWrapper className='flex-1 justify-center items-center'>
          <Zoomable
            doubleTapScale={3}
            isSingleTapEnabled
            isDoubleTapEnabled
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            {selectedImage && imageHeight && (
              <Image
                style={{
                  width: screenWidth, // Full width
                  height: imageHeight, // Auto-calculated height
                  resizeMode: 'contain'
                }}
                source={{ uri: selectedImage }}
              />
            )}
          </Zoomable>

          <View className='absolute top-10 w-full flex-row justify-end items-center px-4 py-2'>
            <Pressable className='p-3 pr-0' onPress={() => setModalVisible(false)}>
              <CustomIcon name='IconX' size={30} color='white' />
            </Pressable>
          </View>

          <View className='w-full flex-col justify-end items-center px-4 py-2'>
            <FlatList
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              contentContainerStyle={{
                marginTop: 10,
                paddingHorizontal: 10
              }}
              style={{ flexGrow: 0 }}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedImage(item)} activeOpacity={0.8} className='m-2'>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      borderWidth: selectedImage === item ? 2 : 0,
                      borderColor: selectedImage === item ? colors.success[500] : 'transparent'
                    }}
                    source={{ uri: item }}
                  />
                </TouchableOpacity>
              )}
            />
            <View className='w-full flex-row justify-end items-center gap-4'>
              {!!onRemove && (
                <Pressable className='p-3 pr-0' onPress={handleRemove}>
                  <CustomIcon name='IconTrash' size={30} color='white' />
                </Pressable>
              )}

              <Pressable className='p-3 pr-0' onPress={saveImage}>
                <CustomIcon name='IconDownload' size={30} color='white' />
              </Pressable>
            </View>
          </View>
        </SafeAreaWrapper>
      </Modal>
    </View>
  )
}
